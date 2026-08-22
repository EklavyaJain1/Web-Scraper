import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI
const geminiApiKey = process.env["GEMINI_API_KEY"];
const ai = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

const BRIGHT_DATA_API_KEY = process.env["BRIGHT_DATA_API_KEY"] || "";

// Real collector ID from bdata scraper create
const COLLECTOR_ID = "c_mt4f331h17e4wjcvxk";

// Bright Data API endpoints
const BRIGHT_DATA_SCRAPE_API = "https://api.brightdata.com/webscraper";
const BRIGHT_DATA_UNLOCKER_API = "https://api.brightdata.com/request";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ScraperModule = {
  key: string;
  label: string;
  status: "idle" | "running" | "done" | "error";
  output?: string;
  error?: string;
};

export type PipelineResult = {
  success: boolean;
  alerts?: AlertData[];
  rawScrape?: string;
  structuredData?: string;
  error?: string;
  collectorId?: string;
  modules?: ScraperModule[];
};

export type AlertData = {
  tone: "high" | "mid" | "low";
  title: string;
  body: string;
  time: string;
};

// ---------------------------------------------------------------------------
// Fast scrape — uses Bright Data Web Unlocker API directly
// ---------------------------------------------------------------------------

async function scrapeWithWebUnlocker(url: string): Promise<string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${BRIGHT_DATA_API_KEY}`,
  };

  const body = {
    url,
    format: "markdown",
    zone: "unblocker",
  };

  try {
    const response = await fetch(BRIGHT_DATA_UNLOCKER_API, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Bright Data API error: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    return text.trim();
  } catch (err: any) {
    console.warn("Web Unlocker failed, falling back to direct fetch:", err.message);
    return fallbackFetch(url);
  }
}

async function fallbackFetch(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.statusText}`);
  }

  return response.text();
}

// ---------------------------------------------------------------------------
// Text extraction from HTML (used for fallback path)
// ---------------------------------------------------------------------------

import * as cheerio from "cheerio";

function extractTextFromHtml(html: string): string {
  const $ = cheerio.load(html);
  $("script, style, noscript, iframe, img, svg, video").remove();
  let text = $("body").text();
  text = text.replace(/\s+/g, " ").trim();
  return text.substring(0, 15_000);
}

// ---------------------------------------------------------------------------
// Main pipeline server function
// ---------------------------------------------------------------------------

export const runIntelligencePipeline = createServerFn({ method: "POST" })
  .validator((d: { url: string }) => d)
  .handler(async ({ data }): Promise<PipelineResult> => {
    const targetMod: ScraperModule = { key: "target", label: "Target URL", status: "running" };
    const scrapeMod: ScraperModule = { key: "scrape", label: "Bright Data Scrape", status: "idle" };
    const brainMod: ScraperModule = { key: "brain", label: "Gemini AI Brain", status: "idle" };
    const modules: ScraperModule[] = [targetMod, scrapeMod, brainMod];

    try {
      console.log(`[Pipeline] Starting for URL: ${data.url}`);

      // --- Module 1: Scrape the target (fast Web Unlocker) ---
      targetMod.status = "done";
      scrapeMod.status = "running";

      let scrapedContent: string;

      try {
        scrapedContent = await scrapeWithWebUnlocker(data.url);
      } catch (scrapeErr: any) {
        console.warn("[Pipeline] Fallback chain:", scrapeErr.message);
        scrapedContent = await fallbackFetch(data.url);
        scrapedContent = extractTextFromHtml(scrapedContent);
      }

      scrapeMod.status = "done";
      scrapeMod.output = scrapedContent.substring(0, 500) + "...";

      console.log(`[Pipeline] Content length: ${scrapedContent.length}`);

      // --- Module 2: Gemini AI Analysis ---
      if (!ai) {
        brainMod.status = "error";
        brainMod.error = "GEMINI_API_KEY not configured";
        return {
          success: false,
          error:
            "Gemini API key not configured. Set GEMINI_API_KEY in your .env file.",
          rawScrape: scrapedContent.substring(0, 2000),
          collectorId: COLLECTOR_ID,
          modules,
        };
      }

      brainMod.status = "running";

      const prompt = `You are a competitive intelligence AI analyzing data scraped from: ${data.url}

The data was collected using Bright Data Web Unlocker (collector: ${COLLECTOR_ID}).

Extract exactly 3 strategic alerts based on the content (e.g. pricing changes, new features, product launches, hiring signals, or strategic insights).

Format your response strictly as a JSON array of objects. Do NOT include markdown code blocks.
Each object must have:
- "tone": strictly one of "high", "mid", or "low"
- "title": a short headline (max 8 words)
- "body": a concise 1-sentence description of the insight
- "time": "just now"

Scraped Content:
${scrapedContent.substring(0, 12_000)}`;

      const aiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const responseText = aiResponse.text || "";
      const jsonString = responseText
        .replace(/```json/i, "")
        .replace(/```/g, "")
        .trim();

      try {
        const alerts: AlertData[] = JSON.parse(jsonString);
        brainMod.status = "done";

        console.log("[Pipeline] Success! Generated", alerts.length, "alerts");

        return {
          success: true,
          alerts,
          rawScrape: scrapedContent.substring(0, 2000),
          collectorId: COLLECTOR_ID,
          modules,
        };
      } catch (parseError) {
        console.error("[Pipeline] Failed to parse AI response:", jsonString);
        brainMod.status = "error";
        brainMod.error = "Failed to parse AI response";
        return {
          success: false,
          error: "Failed to parse AI response into structured alerts.",
          rawScrape: jsonString,
          collectorId: COLLECTOR_ID,
          modules,
        };
      }
    } catch (error: any) {
      console.error("[Pipeline] Error:", error);
      return {
        success: false,
        error: error.message || "An unknown error occurred",
        collectorId: COLLECTOR_ID,
        modules,
      };
    }
  });

// ---------------------------------------------------------------------------
// Self-healing server function — triggers Bright Data scraper heal via API
// ---------------------------------------------------------------------------

export const runSelfHeal = createServerFn({ method: "POST" })
  .validator((d: { collectorId: string; instruction: string }) => d)
  .handler(async ({ data }) => {
    try {
      if (!BRIGHT_DATA_API_KEY) {
        return { success: false, error: "BRIGHT_DATA_API_KEY not configured" };
      }

      const response = await fetch(`${BRIGHT_DATA_SCRAPE_API}/heal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BRIGHT_DATA_API_KEY}`,
        },
        body: JSON.stringify({
          collector_id: data.collectorId,
          instruction: data.instruction,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { success: false, error: `API error: ${response.status} - ${errorText}` };
      }

      const output = await response.text();
      return { success: true, output };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

// ---------------------------------------------------------------------------
// Approve/Reject heal via API
// ---------------------------------------------------------------------------

export const approveHeal = createServerFn({ method: "POST" })
  .validator((d: { collectorId: string; approve: boolean }) => d)
  .handler(async ({ data }) => {
    try {
      if (!BRIGHT_DATA_API_KEY) {
        return { success: false, error: "BRIGHT_DATA_API_KEY not configured" };
      }

      const response = await fetch(`${BRIGHT_DATA_SCRAPE_API}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BRIGHT_DATA_API_KEY}`,
        },
        body: JSON.stringify({
          collector_id: data.collectorId,
          approve: data.approve,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { success: false, error: `API error: ${response.status} - ${errorText}` };
      }

      const output = await response.text();
      return { success: true, output };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
