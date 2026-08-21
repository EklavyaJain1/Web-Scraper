import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";
import * as cheerio from "cheerio";

// Initialize Gemini AI (Ensure GEMINI_API_KEY is set in your environment)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const runIntelligencePipeline = createServerFn({ method: "POST" })
  .validator((d: { url: string }) => d)
  .handler(async ({ data }) => {
    try {
      console.log(`Pipeline Started for URL: ${data.url}`);
      
      // 1. Fetch Target URL
      const response = await fetch(data.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.statusText}`);
      }
      
      const html = await response.text();
      console.log("HTML fetched successfully, extracting text...");

      // 2. Extract Text using Cheerio
      const $ = cheerio.load(html);
      
      // Remove scripts, styles, etc.
      $('script, style, noscript, iframe, img, svg, video').remove();
      
      let textContent = $('body').text();
      textContent = textContent.replace(/\s+/g, ' ').trim();
      
      // Limit text to avoid token limits (e.g., first 12,000 chars)
      const limitedText = textContent.substring(0, 12000);
      console.log(`Extracted text of length: ${limitedText.length}`);

      // 3. Gemini AI Brain
      const prompt = `
You are a competitive intelligence AI. Analyze the following text extracted from a company website: ${data.url}.
Extract exactly 3 strategic alerts based on the content (e.g. pricing changes, new jobs, press announcements, product features, or general strategic insights).

Format your response strictly as a JSON array of objects. Do not include markdown blocks like \`\`\`json.
Each object must have:
- "tone": strictly one of "high", "mid", or "low"
- "title": a short headline (max 8 words)
- "body": a concise 1-sentence description of the insight
- "time": "just now"

Text Content:
${limitedText}
`;

      console.log("Calling Gemini AI...");
      const aiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = aiResponse.text || "";
      // Strip markdown code block if present
      const jsonString = responseText.replace(/```json/i, '').replace(/```/g, '').trim();
      
      try {
        const alerts = JSON.parse(jsonString);
        console.log("Pipeline executed successfully!");
        return { success: true, alerts };
      } catch (parseError) {
        console.error("Failed to parse AI response:", jsonString);
        return { success: false, error: "Failed to parse AI insights.", rawAIOutput: jsonString };
      }

    } catch (error: any) {
      console.error("Pipeline Error:", error);
      return { success: false, error: error.message || "An unknown error occurred" };
    }
  });
