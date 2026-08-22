import {
  Bot,
  Check,
  Database,
  Filter,
  Globe,
  MousePointer2,
  Timer,
  BrainCircuit,
  MapPin,
  Wand2,
  Play,
  Server,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { Eyebrow, Reveal, Section } from "./primitives";
import { 
  TriggerModal, 
  ScraperStudioModal, 
  SelfHealingModal, 
  MCPOutputModal, 
  LLMExtractModal,
  FilterModal,
  WarehouseModal,
  GeoNetworkModal,
  MistralPredictionModal
} from "./node-modals";

const TOOLS = [
  { icon: Play, label: "CLI" },
  { icon: MapPin, label: "Scrape" },
  { icon: Globe, label: "Extract" },
  { icon: BrainCircuit, label: "AI" },
  { icon: Filter, label: "Filter" },
  { icon: Wand2, label: "Heal" },
  { icon: Database, label: "Output" },
];

const STEPS = [
  {
    id: "trigger",
    icon: Timer,
    kind: "CLI Command",
    title: "bdata scraper create",
    detail: "Create a new scraper with AI from a URL description",
  },
  {
    id: "geo",
    icon: MapPin,
    kind: "Scrape",
    title: "bdata scraper run",
    detail: "Run the scraper and get structured JSON data",
  },
  {
    id: "scraper",
    icon: Globe,
    kind: "Extract",
    title: "Bright Data Web Unlocker",
    detail: "Proxy rotation, anti-bot bypass, clean HTML",
  },
  {
    id: "llm",
    icon: BrainCircuit,
    kind: "AI Analysis",
    title: "Gemini 2.5 Flash",
    detail: "Extract strategic insights from scraped content",
  },
  {
    id: "filter",
    icon: Filter,
    kind: "Self-Heal",
    title: "bdata scraper heal",
    detail: "Auto-repair broken selectors when site changes",
  },
  {
    id: "predict",
    icon: Wand2,
    kind: "Approve",
    title: "bdata scraper approve",
    detail: "Approve or reject the AI-generated fix",
  },
  {
    id: "warehouse",
    icon: Database,
    kind: "Dashboard",
    title: "Live Alerts",
    detail: "View results in the Web Miner dashboard",
  },
];

const BULLETS = [
  "✓ Track new AI model releases across Anthropic, OpenAI, Kimi, and Cursor.",
  "✓ Filter out noise by applying custom logical operators on LLM-extracted changelogs.",
  "✓ Send instant alerts to your engineering Slack channel when context windows or pricing change.",
];


export function Pipeline() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <Section id="product" className="py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>Visual builder</Eyebrow>
            <h2 className="mt-5 text-[34px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[46px]">
              Self-Healing Scraper Pipeline.
            </h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-soft">
              Scrape any public website with Bright Data, analyze content with Gemini AI, and watch the scraper automatically repair itself when the site changes its layout. The entire pipeline runs from your terminal.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Scrape public websites using Bright Data's Web Unlocker and proxy network.",
                "Analyze content with Gemini AI to extract strategic insights automatically.",
                "Self-heal broken selectors when websites change their HTML structure.",
              ].map((b) => (
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
                    <div key={s.id}>
                      <div 
                        className="relative cursor-pointer"
                        onClick={() => setActiveModal(s.id)}
                      >
                        <div className="rounded-2xl border border-hairline bg-card p-3.5 shadow-soft transition-all hover:border-brand/50 hover:shadow-lift hover:scale-[1.01] active:scale-[0.99] group">
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
                          <p className="mt-2 text-[12px] text-muted-foreground">
                            {s.detail}
                          </p>
                          <span className="mt-2.5 block text-[9px] font-bold text-muted-foreground tracking-[0.05em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Click to configure</span>
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
                    </div>
                  ))}

                  <div className="rounded-2xl border border-hairline bg-surface p-3.5">
                    <p className="flex items-center gap-2 text-[12px] font-semibold text-ink">
                      <Database className="size-3.5 text-brand" /> AI Insight Output
                    </p>
                    <pre className="mt-2 overflow-x-auto font-mono text-[11px] leading-relaxed text-ink-soft">
                      {`{
  "tone": "high",
  "title": "New pricing tier detected",
  "body": "Company added enterprise plan",
  "time": "just now"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Node Modals from node-modals.tsx */}
            <TriggerModal open={activeModal === "trigger"} onOpenChange={(v) => !v && setActiveModal(null)} />
            <GeoNetworkModal open={activeModal === "geo"} onOpenChange={(v) => !v && setActiveModal(null)} />
            <ScraperStudioModal open={activeModal === "scraper"} onOpenChange={(v) => !v && setActiveModal(null)} />
            <LLMExtractModal open={activeModal === "llm"} onOpenChange={(v) => !v && setActiveModal(null)} />
            <FilterModal open={activeModal === "filter"} onOpenChange={(v) => !v && setActiveModal(null)} />
            <MistralPredictionModal open={activeModal === "predict"} onOpenChange={(v) => !v && setActiveModal(null)} />
            <WarehouseModal open={activeModal === "warehouse"} onOpenChange={(v) => !v && setActiveModal(null)} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
