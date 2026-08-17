import { ArrowRight, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow, Logo, Reveal, Section } from "./primitives";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "For trying scrapers on real pages.",
    features: ["1,000 page credits", "3 scheduled flows", "CSV & JSON export", "Community support"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$99",
    cadence: "per month",
    blurb: "For teams running production pipelines.",
    features: [
      "250,000 page credits",
      "Unlimited flows & schedules",
      "Proxy rotation + anti-bot",
      "Warehouse & webhook delivery",
      "Schema drift alerts",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual",
    blurb: "For compliance-heavy, high-volume work.",
    features: ["Volume credits", "SSO & audit logs", "Private networking", "Dedicated support"],
    cta: "Talk to sales",
    featured: false,
  },
];

const FAQS = [
  {
    q: "Do I need to write code to build a scraper?",
    a: "No. You point at the page, select the fields you want, and Web Miner generates the extraction schema. Code is optional — you can drop into JavaScript or Python steps whenever you need custom logic.",
  },
  {
    q: "How does Web Miner handle blocking and CAPTCHAs?",
    a: "Every run goes through rotating residential and datacenter proxies with realistic browser fingerprints. CAPTCHA solving, retries and backoff are automatic, and blocked pages are reported per run.",
  },
  {
    q: "What happens when a website changes its layout?",
    a: "Runs are validated against your schema. When a field disappears or changes shape, you get a drift alert with a diff of the affected selectors before the bad data reaches downstream systems.",
  },
  {
    q: "Where can I send the data?",
    a: "Postgres, BigQuery, Snowflake, S3, Google Sheets, Airtable, Slack, or any HTTP endpoint. There is also a REST API and signed webhooks for each completed run.",
  },
  {
    q: "Is scraping with Web Miner compliant?",
    a: "Web Miner respects robots directives and rate limits by default, pins processing to the region you choose, and gives you retention controls. You remain responsible for the sources you target.",
  },
];

export function Pricing() {
  return (
    <Section id="pricing" className="pt-4">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-5 text-[32px] font-semibold leading-[1.12] text-ink sm:text-[42px]">
            Simple plans, page-based credits
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            Pay for the pages you actually extract. No per-seat pricing, no proxy surcharges.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 90}>
            <div
              className={
                p.featured
                  ? "relative flex h-full flex-col rounded-3xl border-2 border-brand bg-card p-7 shadow-lift"
                  : "relative flex h-full flex-col rounded-3xl border border-hairline bg-card p-7 shadow-soft"
              }
            >
              {p.featured && (
                <span className="absolute -top-3 left-7 rounded-full gradient-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-[15px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {p.name}
              </h3>
              <p className="mt-4 font-display text-4xl font-semibold text-ink">
                {p.price}
                <span className="ml-2 text-[13px] font-medium text-muted-foreground">
                  {p.cadence}
                </span>
              </p>
              <p className="mt-3 text-[14.5px] text-ink-soft">{p.blurb}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14.5px] text-ink-soft">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" /> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={
                  p.featured
                    ? "mt-7 inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-[14.5px] font-semibold text-brand-foreground shadow-soft"
                    : "mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-[14.5px] font-semibold text-ink hover:bg-surface-2"
                }
              >
                {p.cta}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Faq() {
  return (
    <Section id="faq" className="pt-4">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-5 text-[30px] font-semibold leading-[1.12] text-ink sm:text-[38px]">
            Questions, answered
          </h2>
          <p className="mt-4 text-[15.5px] text-ink-soft">
            Still curious? Our team replies to demo requests within one business day.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-hairline">
                <AccordionTrigger className="text-left text-[15.5px] font-medium text-ink">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[14.5px] leading-relaxed text-ink-soft">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section id="cta">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-hairline bg-surface px-6 py-16 text-center shadow-lift md:px-16">
          <div className="pointer-events-none absolute inset-0 glow-brand" />
          <div className="pointer-events-none absolute inset-0 grid-faint opacity-40" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-[34px] font-semibold leading-[1.08] text-ink sm:text-[48px]">
              Turn the web into your data warehouse
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[16px] text-ink-soft">
              Start free with 1,000 page credits. Build your first scraper in under ten minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#top"
                className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-[15px] font-semibold text-brand-foreground shadow-lift transition-transform hover:-translate-y-0.5"
              >
                Get started free <ArrowRight className="size-4" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-6 py-3 text-[15px] font-medium text-ink hover:bg-surface-2"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

const FOOTER = [
  { title: "Product", links: ["Flow builder", "Proxies", "Scheduling", "Integrations", "Pricing"] },
  { title: "Use cases", links: ["E-commerce", "Real estate", "News", "Social", "Lead data"] },
  { title: "Resources", links: ["Docs", "API reference", "Changelog", "Blog", "Status"] },
  { title: "Company", links: ["About", "Careers", "Customers", "Security", "Contact"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink-soft">
              The web data platform for teams who need structured, reliable and monitored scraping
              at scale.
            </p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.title}>
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#top" className="text-[14px] text-ink-soft hover:text-ink">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-hairline pt-6 text-[13px] text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Web Miner, Inc. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#top" className="hover:text-ink">
              Privacy
            </a>
            <a href="#top" className="hover:text-ink">
              Terms
            </a>
            <a href="#top" className="hover:text-ink">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
