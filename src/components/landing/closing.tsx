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
    name: "Open Source",
    price: "$0",
    cadence: "forever",
    blurb: "Full self-healing scraper, fully open source.",
    features: [
      "Bright Data Scraper Studio integration",
      "AI-powered self-healing selectors",
      "Gemini AI analysis pipeline",
      "Dashboard with live alerts",
    ],
    cta: "Clone & Run",
    featured: true,
  },
  {
    name: "Built with",
    price: "",
    cadence: "",
    blurb: "The technologies powering Web Miner.",
    features: [
      "Bright Data CLI & Scraper Studio",
      "Google Gemini AI (gemini-2.5-flash)",
      "TanStack Start + React 19",
      "Tailwind CSS v4 + shadcn/ui",
    ],
    cta: "View Source",
    featured: false,
  },
  {
    name: "Hackathon",
    price: "",
    cadence: "",
    blurb: "Built for Into the Scrape-Verse 2026.",
    features: [
      "Self-healing is the core theme",
      "Terminal-first workflow",
      "Open source submission",
      "Reproducible by judges",
    ],
    cta: "See Evidence",
    featured: false,
  },
];

const FAQS = [
  {
    q: "What is Web Miner?",
    a: "Web Miner is a self-healing web scraper built for the Into the Scrape-Verse hackathon. It uses Bright Data's Scraper Studio to extract data from websites, and Gemini AI to analyze the results.",
  },
  {
    q: "How does self-healing work?",
    a: "When a target website changes its HTML structure, Bright Data's scraper detects broken selectors and uses AI to automatically repair them. You approve or reject the fix via the bdata CLI.",
  },
  {
    q: "What technologies power this?",
    a: "Bright Data CLI and Scraper Studio for scraping, Google Gemini AI (gemini-2.5-flash) for analysis, TanStack Start + React for the frontend, and Tailwind CSS + shadcn/ui for the design system.",
  },
  {
    q: "How do I run this myself?",
    a: "Clone the repo, run npm install, set up your .env file with API keys (see .env.example), authenticate with Bright Data via bdata login, then run npm run dev.",
  },
  {
    q: "Is this a real product?",
    a: "This is a hackathon submission for Into the Scrape-Verse (WeMakeDevs + Bright Data). The frontend is a demo dashboard showcasing the self-healing scraper pipeline.",
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
              See it in action
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[16px] text-ink-soft">
              Run the self-healing scraper pipeline and watch it adapt to website changes in real-time.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-[15px] font-semibold text-brand-foreground shadow-lift transition-transform hover:-translate-y-0.5"
              >
                Try the Demo <ArrowRight className="size-4" />
              </a>
              <a
                href="https://github.com/EklavyaJain1/gumloop-reimagined"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-6 py-3 text-[15px] font-medium text-ink hover:bg-surface-2"
              >
                View Source
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

const FOOTER = [
  { title: "Hackathon", links: ["Into the Scrape-Verse", "WeMakeDevs", "Bright Data", "Prizes", "Rules"] },
  { title: "Tech Stack", links: ["Bright Data CLI", "Scraper Studio", "Gemini AI", "TanStack Start", "shadcn/ui"] },
  { title: "Resources", links: ["README", "Setup Guide", "Evidence", "Source Code", "License"] },
  { title: "Links", links: ["GitHub Repo", "Demo Video", "Build Log", "Contact"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink-soft">
              A self-healing web scraper built for the Into the Scrape-Verse hackathon.
              Powered by Bright Data and Gemini AI.
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
          <span>© {new Date().getFullYear()} Web Miner — Hackathon Project</span>
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
