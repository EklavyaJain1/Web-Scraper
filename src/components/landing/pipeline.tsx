import {
  Bot,
  Braces,
  Check,
  Database,
  Filter,
  Globe,
  MousePointer2,
  Play,
  Repeat,
  Timer,
} from "lucide-react";
import { Eyebrow, Reveal, Section } from "./primitives";

const TOOLS = [
  { icon: Play, label: "Trigger" },
  { icon: Globe, label: "Web Scraper" },
  { icon: Bot, label: "LLM Extract" },
  { icon: Filter, label: "Filter" },
  { icon: Repeat, label: "Loop" },
  { icon: Database, label: "Warehouse" },
];

const STEPS = [
  {
    icon: Timer,
    kind: "Trigger",
    title: "Every day at 06:00",
    detail: "Schedule · UTC",
  },
  {
    icon: Globe,
    kind: "Web Scraper",
    title: "Crawl competitor catalog",
    detail: "1,240 pages · rotating proxies",
  },
  {
    icon: Bot,
    kind: "LLM Extraction",
    title: "Extract price, stock, SKU",
    detail: "Schema validated · 99.4% match",
  },
];

const BULLETS = [
  "Compose scrapers from typed nodes — no glue code.",
  "Preview every step with live sample output.",
  "Version, branch and roll back any pipeline.",
];

export function Pipeline() {
  return (
    <Section id="product" className="py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>Visual builder</Eyebrow>
            <h2 className="mt-5 text-[34px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[46px]">
              Drag, drop, and automate without code.
            </h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-soft">
              Every scraper is a pipeline of nodes on a canvas. Connect a trigger to a crawler, hand
              the HTML to an AI extractor, and land structured rows in your warehouse.
            </p>
            <ul className="mt-7 space-y-3">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] text-ink">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                    <Check className="size-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-[24px] border border-hairline bg-card shadow-lift">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
              <span className="text-[12px] font-semibold text-ink">Pipeline editor</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                <MousePointer2 className="size-3" /> Live
              </span>
            </div>

            <div className="grid grid-cols-[92px_minmax(0,1fr)] sm:grid-cols-[140px_minmax(0,1fr)]">
              <aside className="border-r border-hairline bg-surface p-2.5 sm:p-3">
                <p className="px-1 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Nodes
                </p>
                <div className="space-y-1">
                  {TOOLS.map((t) => (
                    <div
                      key={t.label}
                      className="flex items-center gap-2 rounded-lg border border-transparent px-2 py-1.5 text-[12px] font-medium text-ink-soft hover:border-hairline hover:bg-card"
                    >
                      <t.icon className="size-3.5 shrink-0 text-brand" />
                      <span className="truncate">{t.label}</span>
                    </div>
                  ))}
                </div>
              </aside>

              <div className="relative dot-grid p-4 sm:p-6">
                <div className="space-y-4">
                  {STEPS.map((s, i) => (
                    <div key={s.kind} className="relative">
                      <div className="rounded-2xl border border-hairline bg-card p-3.5 shadow-soft">
                        <div className="flex items-center gap-2.5">
                          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand">
                            <s.icon className="size-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                              {s.kind}
                            </p>
                            <p className="truncate text-[13.5px] font-semibold text-ink">
                              {s.title}
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 truncate text-[12px] text-muted-foreground">
                          {s.detail}
                        </p>
                      </div>
                      {i < STEPS.length - 1 && (
                        <svg
                          className="mx-auto block h-8 w-6"
                          viewBox="0 0 24 32"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 0 C 12 16, 12 16, 12 32"
                            className="animate-dash stroke-brand"
                            fill="none"
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                    </div>
                  ))}

                  <div className="rounded-2xl border border-hairline bg-surface p-3.5">
                    <p className="flex items-center gap-2 text-[12px] font-semibold text-ink">
                      <Braces className="size-3.5 text-brand" /> Output preview
                    </p>
                    <pre className="mt-2 overflow-x-auto font-mono text-[11px] leading-relaxed text-ink-soft">
{`{ "sku": "NW-4412",
  "price": 129.00,
  "in_stock": true }`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
