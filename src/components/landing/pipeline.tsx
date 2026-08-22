import {
  Check,
  MousePointer2,
  Activity,
  Globe,
  BrainCircuit,
  FlaskConical,
  TerminalSquare,
  SearchCode,
  ShieldCheck,
  Code2
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
  { icon: Activity, label: "Monitor" },
  { icon: ShieldCheck, label: "Unlocker" },
  { icon: BrainCircuit, label: "Gemini AI" },
  { icon: SearchCode, label: "DOM Diff" },
  { icon: FlaskConical, label: "Validation" },
  { icon: TerminalSquare, label: "CLI Prompt" },
];

const STEPS = [
  {
    id: "monitor",
    icon: Activity,
    kind: "Detection",
    title: "DOM Monitor",
    detail: "Detects when a target CSS selector (e.g., .price-tag) fails or returns null data.",
  },
  {
    id: "unlocker",
    icon: Globe,
    kind: "Ingestion",
    title: "Bright Data Web Unlocker",
    detail: "Bypasses anti-bot measures to fetch the raw, unblocked HTML of the new page structure.",
  },
  {
    id: "ai",
    icon: BrainCircuit,
    kind: "Analysis",
    title: "Gemini 2.5 Flash",
    detail: "Analyzes the DOM diff, understands the context, and generates a robust new selector.",
  },
  {
    id: "test",
    icon: FlaskConical,
    kind: "Verification",
    title: "Automated Testing",
    detail: "Runs a headless check to ensure the new selector extracts the correct data type.",
  },
  {
    id: "handoff",
    icon: TerminalSquare,
    kind: "Resolution",
    title: "Developer Handoff",
    detail: "Pauses the pipeline and prompts the developer via CLI to approve the AI's fix.",
  },
];

export function Pipeline() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <Section id="architecture" className="py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>Self-Healing Architecture</Eyebrow>
            <h2 className="mt-5 text-[34px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[46px]">
              Scrapers that fix themselves.
            </h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-soft">
              The biggest problem with web scraping is maintenance. Websites change their layouts, class names are obfuscated, and scrapers break. We built a closed-loop AI system to detect failures and repair them autonomously.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Zero downtime: Failures are caught and analyzed instantly.",
                "Gemini AI compares old vs new DOM structures to find the missing data.",
                "No rogue changes: You maintain full control with CLI-based approval.",
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
              <span className="text-[12px] font-semibold text-ink">Autonomous Repair Loop</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                <MousePointer2 className="size-3" /> Live
              </span>
            </div>

            <div className="grid grid-cols-[92px_minmax(0,1fr)] sm:grid-cols-[140px_minmax(0,1fr)]">
              <aside className="border-r border-hairline bg-surface p-2.5 sm:p-3">
                <p className="px-1 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Modules
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
                        // Keep modal interactions disabled for this demo or map them to existing modals
                        // onClick={() => setActiveModal(s.id)}
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
                      <Code2 className="size-3.5 text-brand" /> AI Generated Fix
                    </p>
                    <pre className="mt-2 overflow-x-auto font-mono text-[11px] leading-relaxed text-ink-soft">
                      {`{
  "status": "requires_approval",
  "issue": "Class .price-tag changed to .Pricing__value_v2",
  "proposed_selector": "div[data-test-id='product-price'] span.Pricing__value_v2",
  "confidence_score": 0.98
}`}
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
