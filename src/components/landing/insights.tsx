import { Bot, Flag, RefreshCw, Scale } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./primitives";
import { TiltCard } from "@/components/ui/tilt-card";

function CostCard() {
  return (
    <div className="relative grid h-[260px] place-items-center overflow-hidden rounded-2xl border border-hairline bg-surface">
      <div className="absolute inset-0 dot-grid opacity-60" />
      {["left-6 top-8", "right-8 top-12", "left-10 bottom-10", "right-6 bottom-14"].map(
        (pos, i) => (
          <span
            key={pos}
            className={`absolute ${pos} animate-float-slow grid size-10 place-items-center rounded-xl border border-hairline bg-card shadow-soft`}
            style={{ animationDelay: `${i * 0.7}s` }}
          >
            <Scale className="size-4 text-ink/25" />
          </span>
        ),
      )}
      <div className="relative text-center">
        <p className="text-[12.5px] text-muted-foreground">Selector repair time</p>
        <p className="mt-1 font-display text-5xl font-extrabold tracking-tight text-ink">
          Auto<span className="text-2xl">.</span>
        </p>
        <p className="mt-1 text-[13px] text-ink-soft">
          <span className="line-through">Manual fix</span>{" "}
          <span className="font-semibold text-brand">AI heal</span>
        </p>
      </div>
    </div>
  );
}

function LoopCard() {
  return (
    <div className="relative grid h-[260px] place-items-center overflow-hidden rounded-2xl border border-hairline bg-surface">
      <div className="absolute inset-0 dot-grid opacity-60" />
      <svg viewBox="0 0 240 240" className="absolute size-[230px]" aria-hidden="true">
        <circle cx="120" cy="120" r="96" fill="none" className="stroke-hairline" strokeWidth="1" />
        <circle
          cx="120"
          cy="120"
          r="70"
          fill="none"
          className="animate-dash stroke-brand"
          strokeWidth="1.5"
        />
      </svg>
      {[
        { label: "Collect", cls: "top-6 left-1/2 -translate-x-1/2" },
        { label: "Synthesize", cls: "bottom-12 right-6" },
        { label: "Predict", cls: "bottom-12 left-6" },
      ].map((n) => (
        <span
          key={n.label}
          className={`absolute ${n.cls} rounded-full border border-hairline bg-card px-3 py-1 text-[11.5px] font-semibold text-ink shadow-soft`}
        >
          {n.label}
        </span>
      ))}
      <span className="relative grid size-16 place-items-center rounded-2xl gradient-brand shadow-lift">
        <Bot className="size-7 text-brand-foreground" />
      </span>
    </div>
  );
}

function AlertCard() {
  return (
    <div className="relative h-[260px] overflow-hidden rounded-2xl border border-hairline bg-surface">
      <div className="absolute inset-0 grid-faint opacity-70" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 320 260" aria-hidden="true">
        <path
          d="M60 60 C 150 60, 150 150, 250 150"
          fill="none"
          className="animate-dash stroke-brand"
          strokeWidth="1.5"
        />
      </svg>
      <span className="absolute left-8 top-12 size-4 rounded border border-ink/20 bg-card" />
      <span className="absolute right-12 top-24 size-4 rounded border border-ink/20 bg-card" />
      <div className="absolute bottom-8 left-6 right-6 rounded-xl border border-hairline bg-card p-3.5 shadow-lift">
        <p className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
          <Flag className="size-3.5 text-brand" /> Alert
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
          Maison Lume quietly removed its <span className="font-semibold text-brand">suite</span>{" "}
          rate card — likely renovation or repricing.
        </p>
      </div>
    </div>
  );
}

const CARDS = [
  {
    render: CostCard,
    title: "Self-healing selectors",
    body: "When a website changes its layout, Bright Data's AI automatically repairs broken CSS selectors.",
  },
  {
    render: LoopCard,
    title: "AI-powered analysis",
    body: "Gemini reads scraped content and extracts strategic insights, not just raw data.",
  },
  {
    render: AlertCard,
    title: "Terminal-first workflow",
    body: "The entire pipeline runs from the CLI — bdata scraper create, run, heal, approve.",
  },
];

export function Insights() {
  return (
    <Section id="insights" className="py-16 md:py-24">
      <Reveal>
        <Eyebrow>Signal</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-[34px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[46px]">
          Optimize how you watch the market.
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-3 perspective-[1000px]">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 90}>
            <TiltCard>
              <div className="h-full group transition-transform duration-300 hover:-translate-y-2">
                <c.render />
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft transition-colors group-hover:text-ink">
                  <span className="font-semibold text-ink">{c.title}</span> {c.body}
                </p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-8 flex items-center gap-2 text-[13px] text-muted-foreground">
          <RefreshCw className="size-3.5 text-brand" /> Scrapers self-heal when websites change their
          layout — no manual intervention needed.
        </div>
      </Reveal>
    </Section>
  );
}
