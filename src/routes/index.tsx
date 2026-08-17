import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Pipeline } from "@/components/landing/pipeline";
import { Bento } from "@/components/landing/bento";
import { Console } from "@/components/landing/console";
import { Insights } from "@/components/landing/insights";
import { FinalCta } from "@/components/landing/cta";
import { Faq, Pricing, SiteFooter } from "@/components/landing/closing";

const TITLE = "Web Miner — Automate scraping workflows with AI";
const DESCRIPTION =
  "Web Miner turns any website into clean, structured data. Build extraction pipelines on a visual canvas, run them on rotating proxies, and deliver JSON to your warehouse.";

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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Web Miner",
          applicationCategory: "BusinessApplication",
          description: DESCRIPTION,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
    ],
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
        <Bento />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
