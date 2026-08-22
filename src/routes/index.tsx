import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Pipeline } from "@/components/landing/pipeline";
import { Bento } from "@/components/landing/bento";
import { Console } from "@/components/landing/console";
import { Insights } from "@/components/landing/insights";
import { SiteFooter } from "@/components/landing/closing";

const TITLE = "Web Miner — Self-Healing Web Scraper with AI";
const DESCRIPTION =
  "Web Miner is a self-healing web scraper powered by Bright Data and Gemini AI. It automatically repairs broken selectors when websites change their layout, keeping your data pipelines running.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <Pipeline />
        <Console />
        <Insights />
        <Bento />
      </main>
      <SiteFooter />
    </div>
  );
}
