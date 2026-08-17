import { createFileRoute } from "@tanstack/react-router";
import { IntelligenceCanvas } from "@/components/dashboard/canvas";

const TITLE = "Intelligence Canvas — Web Miner CI Workspace";
const DESCRIPTION =
  "Build a node-based competitive intelligence pipeline: target URL, public pricing, careers and press scrapers feeding a Gemini brain that predicts a competitor's next move.";

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
