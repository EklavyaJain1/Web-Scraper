import { createFileRoute } from "@tanstack/react-router";
import { IntelligenceCanvas } from "@/components/dashboard/canvas";

const TITLE = "Dashboard — Web Miner Scraper Pipeline";
const DESCRIPTION =
  "Run self-healing web scrapers with Bright Data and analyze results with Gemini AI. View strategic alerts from your scraped data.";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IntelligenceCanvas,
});
