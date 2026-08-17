import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Reveal, Section, useCountUp } from "./primitives";

const CASE_STUDIES = [
  { people: "Maya Arvidsson", company: "Shopify", tone: "top-[6%] left-[2%]", delay: "0s" },
  { people: "Josh Rider", company: "Instacart", tone: "top-[34%] left-[-1%]", delay: "1.2s" },
  { people: "Ritu Khanna", company: "Gusto", tone: "top-[10%] right-[2%]", delay: "0.6s" },
  { people: "Shelby Belak", company: "Samsara", tone: "top-[38%] right-[-1%]", delay: "1.8s" },
];

const LOGOS = [
  "Shopify",
  "Instacart",
  "Gusto",
  "Samsara",
  "Rippling",
  "Webflow",
  "Notion",
  "Ramp",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function Hero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] glow-brand" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] grid-faint opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <Section className="relative pb-10 pt-16 md:pb-14 md:pt-24">
        <div className="relative">
          {CASE_STUDIES.map((c) => (
            <div
              key={c.company}
              className={`absolute hidden xl:flex ${c.tone} animate-float items-center gap-2.5 rounded-2xl border border-hairline bg-card/90 px-3 py-2.5 shadow-soft backdrop-blur`}
              style={{ animationDelay: c.delay }}
            >
              <span className="grid size-8 place-items-center rounded-full bg-brand-tint text-[11px] font-semibold text-accent-foreground">
                {initials(c.people)}
              </span>
              <span className="text-left">
                <span className="block text-[13px] font-semibold text-ink">{c.people}</span>
                <span className="block text-[11px] text-muted-foreground">
                  {c.company} · Case study
                </span>
              </span>
            </div>
          ))}

          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-3.5 py-1.5 text-[12px] font-medium text-ink-soft shadow-soft">
                <Sparkles className="size-3.5 text-brand" />
                Introducing visual scraper agents
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-balance-tight text-[42px] font-semibold leading-[1.04] text-ink sm:text-6xl md:text-[68px]">
                Build, share, optimize & control scrapers
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-soft sm:text-[17px]">
                Web Miner turns any website into clean, structured data. Design extraction flows
                visually, run them at scale, and pipe results wherever your team already works.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-[15px] font-semibold text-brand-foreground shadow-lift transition-transform hover:-translate-y-0.5"
                >
                  Get started free <ArrowRight className="size-4" />
                </a>
                <a
                  href="#product"
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-6 py-3 text-[15px] font-medium text-ink shadow-soft transition-colors hover:bg-surface-2"
                >
                  <Play className="size-4 text-brand" /> Book a demo
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <p className="mt-4 text-[12.5px] text-muted-foreground">
                No credit card required · 1,000 free page credits
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="py-10 md:py-12">
        <Reveal>
          <h2 className="text-center text-[13px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            The scraping infrastructure powering data-driven teams
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {LOGOS.map((logo) => (
              <span
                key={logo}
                className="text-center font-display text-lg font-semibold tracking-tight text-ink/35 transition-colors hover:text-ink/70"
              >
                {logo}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>
    </div>
  );
}

function Stat({ label, target, suffix, note }: { label: string; target: number; suffix: string; note: string }) {
  const { ref, value } = useCountUp(target);
  return (
    <div className="rounded-3xl border border-hairline bg-card p-8 shadow-soft">
      <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-4 font-display text-5xl font-semibold text-ink md:text-6xl">
        <span ref={ref}>{value.toLocaleString()}</span>
        <span className="text-brand">{suffix}</span>
      </p>
      <p className="mt-3 text-[14px] text-ink-soft">{note}</p>
    </div>
  );
}

export function Stats() {
  return (
    <Section className="py-6 md:py-10">
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal>
          <Stat
            label="Pages scraped"
            target={128000000}
            suffix="+"
            note="Running live across customer workspaces"
          />
        </Reveal>
        <Reveal delay={120}>
          <Stat
            label="Scrapers deployed"
            target={94000}
            suffix="+"
            note="Deployed worldwide on scheduled runs"
          />
        </Reveal>
      </div>
    </Section>
  );
}
