import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar, SiteNav } from "@/components/landing/header";
import { Hero, Stats } from "@/components/landing/hero";
import { Showcase } from "@/components/landing/showcase";
import {
  BuildSection,
  FeatureGrid,
  Integrations,
  Security,
} from "@/components/landing/features";
import { Testimonials, UseCases } from "@/components/landing/social";
import { Faq, FinalCta, Pricing, SiteFooter } from "@/components/landing/closing";

const TITLE = "Web Miner — Build, run and scale web scrapers";
const DESCRIPTION =
  "Web Miner turns any website into clean, structured data. Build extraction flows visually, run them on rotating proxies, and deliver results to your warehouse.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
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
      <AnnouncementBar />
      <SiteNav />
      <main>
        <Hero />
        <Stats />
        <Showcase />
        <BuildSection />
        <FeatureGrid />
        <Integrations />
        <UseCases />
        <Testimonials />
        <Security />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
