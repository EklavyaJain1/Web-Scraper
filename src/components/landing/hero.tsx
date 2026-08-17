import { ArrowRight, Bot, Globe, Sparkles, Table2 } from "lucide-react";
import { Reveal, Section } from "./primitives";

const LOGOS = ["Northwind", "Instabasket", "Gustify", "Samsara", "Rippling", "Webflow"];

function Node({
  icon: Icon,
  title,
  subtitle,
  className,
  delay,
}: {
  icon: typeof Globe;
  title: string;
  subtitle: string;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={`animate-float-slow w-[190px] rounded-2xl border border-hairline bg-card p-4 shadow-lift ${className ?? ""}`}
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand">
          <Icon className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-semibold text-ink">{title}</span>
          <span className="block truncate text-[11px] text-muted-foreground">{subtitle}</span>
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        <span className="block h-1.5 w-full rounded-full bg-surface-2" />
        <span className="block h-1.5 w-2/3 rounded-full bg-surface-2" />
      </div>
    </div>
  );
}

function WorkflowCanvas() {
  return (
    <div className="relative mx-auto mt-14 max-w-5xl">
      <div className="relative overflow-hidden rounded-[28px] border border-hairline bg-surface shadow-lift">
        <div className="absolute inset-0 dot-grid opacity-70" />
        <div className="relative flex items-center gap-2 border-b border-hairline bg-card/80 px-4 py-2.5 backdrop-blur">
          <span className="size-2.5 rounded-full bg-surface-2" />
          <span className="size-2.5 rounded-full bg-surface-2" />
          <span className="size-2.5 rounded-full bg-surface-2" />
          <span className="ml-2 truncate text-[12px] text-muted-foreground">
            competitor-pricing.flow
          </span>
        </div>

        <div className="relative px-4 py-10 sm:px-10 sm:py-16">
          <svg
            className="pointer-events-none absolute inset-0 hidden size-full md:block"
            viewBox="0 0 1000 320"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M215 105 C 330 105, 360 170, 470 170"
              className="animate-dash stroke-brand"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M680 170 C 770 170, 790 230, 880 230"
              className="animate-dash stroke-brand"
              fill="none"
              strokeWidth="2"
              style={{ animationDelay: "0.5s" }}
            />
          </svg>

          <div className="relative grid gap-6 sm:grid-cols-3 sm:items-center">
            <Node icon={Globe} title="Website" subtitle="Crawl 1,240 URLs" delay="0s" />
            <Node
              icon={Bot}
              title="AI Brain"
              subtitle="Extract product fields"
              className="sm:mt-12"
              delay="1.2s"
            />
            <Node
              icon={Table2}
              title="Google Sheets"
              subtitle="Append clean rows"
              className="sm:mt-24 sm:ml-auto"
              delay="2.1s"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] dot-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] glow-brand" />

      <Section className="relative pb-8 pt-14 md:pb-12 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-3.5 py-1.5 text-[12px] font-medium text-ink-soft shadow-soft">
              <Sparkles className="size-3.5 text-brand" />
              New — AI extraction agents
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-balance-tight text-[42px] font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-[70px]">
              Automate your scraping workflows with AI.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-soft sm:text-[17px]">
              Web Miner turns any website into clean, structured data. Build extraction pipelines on
              a visual canvas, run them at scale, and deliver results wherever your team works.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[15px] font-semibold text-brand-foreground shadow-lift transition-transform hover:-translate-y-0.5"
              >
                Start Building Free <ArrowRight className="size-4" />
              </a>
              <a
                href="#product"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-surface-2"
              >
                Book a Demo
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={320}>
          <WorkflowCanvas />
        </Reveal>
      </Section>

      <Section className="py-12 md:py-16">
        <Reveal>
          <h2 className="text-center text-[12.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Trusted by engineering teams at
          </h2>
          <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-14">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <span
                  key={`${logo}-${i}`}
                  className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-ink/25"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
