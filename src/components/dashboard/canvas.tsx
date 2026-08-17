import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  Bot,
  Briefcase,
  Globe,
  GripVertical,
  Link2,
  Newspaper,
  Play,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { Logo } from "@/components/landing/primitives";
import { cn } from "@/lib/utils";

type ModuleKey = "target" | "pricing" | "jobs" | "press" | "brain";

const MODULES: { key: ModuleKey; label: string; hint: string; icon: typeof Globe }[] = [
  { key: "target", label: "Target URL", hint: "Competitor domain", icon: Globe },
  { key: "pricing", label: "Pricing Scraper", hint: "Public rate card", icon: Tag },
  { key: "jobs", label: "Job Scraper", hint: "Public careers board", icon: Briefcase },
  { key: "press", label: "Press Scraper", hint: "Public announcements", icon: Newspaper },
  { key: "brain", label: "Gemini AI Brain", hint: "Synthesis + prediction", icon: Bot },
];

type NodeSpec = {
  key: ModuleKey;
  title: string;
  detail: string;
  icon: typeof Globe;
  x: number;
  y: number;
};

const NODES: NodeSpec[] = [
  { key: "target", title: "Target URL", detail: "aureliagrand.com", icon: Globe, x: 4, y: 38 },
  { key: "pricing", title: "Pricing Scraper", detail: "42 room types", icon: Tag, x: 36, y: 6 },
  { key: "jobs", title: "Job Scraper", detail: "18 open roles", icon: Briefcase, x: 36, y: 38 },
  { key: "press", title: "Press Scraper", detail: "6 releases", icon: Newspaper, x: 36, y: 70 },
  { key: "brain", title: "Gemini AI Brain", detail: "Strategic synthesis", icon: Bot, x: 70, y: 38 },
];

const EDGES = [
  { from: "target", to: "pricing", d: "M 150 200 C 250 200, 250 60, 360 60" },
  { from: "target", to: "jobs", d: "M 150 200 C 250 200, 250 200, 360 200" },
  { from: "target", to: "press", d: "M 150 200 C 250 200, 250 340, 360 340" },
  { from: "pricing", to: "brain", d: "M 520 60 C 620 60, 620 200, 730 200" },
  { from: "jobs", to: "brain", d: "M 520 200 C 620 200, 620 200, 730 200" },
  { from: "press", to: "brain", d: "M 520 340 C 620 340, 620 200, 730 200" },
];

const ALERTS = [
  {
    tone: "high" as const,
    title: "Predicted shift to fine-dining model",
    body: "5 culinary hires + 10.4% ADR lift at Aurelia Grand — restaurant relaunch likely before December.",
    time: "just now",
  },
  {
    tone: "mid" as const,
    title: "Suite rate card withdrawn",
    body: "Maison Lume removed public suite pricing — renovation or repricing window opening.",
    time: "12m",
  },
  {
    tone: "low" as const,
    title: "Spa staffing steady",
    body: "The Verano posted no wellness roles this quarter — no wellness expansion signal.",
    time: "1h",
  },
];

export function IntelligenceCanvas() {
  const [running, setRunning] = useState(false);
  const [active, setActive] = useState<ModuleKey[]>([]);
  const [visible, setVisible] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setActive([]);
    setVisible(0);
    const order: ModuleKey[] = ["target", "pricing", "jobs", "press", "brain"];
    order.forEach((k, i) => {
      timers.current.push(
        window.setTimeout(() => setActive((prev) => [...prev, k]), 350 + i * 500),
      );
    });
    ALERTS.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setVisible(i + 1), 2600 + i * 500));
    });
    timers.current.push(window.setTimeout(() => setRunning(false), 4400));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-hairline px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Logo />
          <span className="hidden truncate rounded-full border border-hairline bg-surface px-2.5 py-1 text-[11.5px] font-medium text-ink-soft sm:inline">
            aurelia-grand · competitive-intelligence
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 py-1.5 text-[11.5px] font-medium text-ink-soft sm:inline-flex">
            <ShieldCheck className="size-3.5 text-brand" /> Public data only
          </span>
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[13.5px] font-semibold text-brand-foreground shadow-soft transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            <Play className="size-3.5" /> {running ? "Running…" : "Run pipeline"}
          </button>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_320px]">
        {/* Modules */}
        <aside className="border-b border-hairline bg-surface p-4 lg:border-b-0 lg:border-r">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Intelligence Modules
          </p>
          <div className="mt-3 space-y-2">
            {MODULES.map((m) => (
              <div
                key={m.key}
                draggable
                className={cn(
                  "flex cursor-grab items-center gap-2.5 rounded-xl border border-hairline bg-card p-2.5 shadow-soft transition-colors active:cursor-grabbing",
                  active.includes(m.key) && "border-brand/50",
                )}
              >
                <GripVertical className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand">
                  <m.icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold text-ink">
                    {m.label}
                  </span>
                  <span className="block truncate text-[11px] text-muted-foreground">{m.hint}</span>
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Connections
          </p>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-hairline bg-card px-2.5 py-2 text-[12.5px] text-ink">
            <Link2 className="size-3.5 shrink-0 text-brand" /> 6 edges · 5 nodes
          </div>
        </aside>

        {/* Canvas */}
        <main className="relative min-h-[520px] overflow-hidden bg-background">
          <div className="absolute inset-0 dot-grid" />
          <div className="relative mx-auto h-full w-full max-w-[980px] px-4 py-6">
            <div className="relative h-[440px] w-full">
              <svg
                className="pointer-events-none absolute inset-0 size-full"
                viewBox="0 0 900 400"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {EDGES.map((e, i) => (
                  <path
                    key={e.d}
                    d={e.d}
                    fill="none"
                    strokeWidth="2"
                    className={cn(
                      "stroke-brand transition-opacity duration-500",
                      active.includes(e.to as ModuleKey)
                        ? "animate-dash opacity-100"
                        : "opacity-25",
                    )}
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </svg>

              {NODES.map((n) => (
                <div
                  key={n.key}
                  className={cn(
                    "absolute w-[172px] rounded-2xl border bg-card p-3 shadow-lift transition-all duration-500",
                    active.includes(n.key)
                      ? "border-brand shadow-lift"
                      : "border-ink/15 opacity-90",
                  )}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand">
                      <n.icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[12.5px] font-semibold text-ink">
                        {n.title}
                      </span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {n.detail}
                      </span>
                    </span>
                  </div>
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                    <span
                      className={cn(
                        "block h-full rounded-full bg-brand transition-all duration-700",
                        active.includes(n.key) ? "w-full" : "w-0",
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Live alerts */}
        <aside className="border-t border-hairline bg-surface p-4 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Live Alerts
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success-tint px-2.5 py-1 text-[11px] font-semibold text-success">
              <span className="size-1.5 animate-pulse rounded-full bg-success" />
              Self-Healing Active
            </span>
          </div>

          <div className="mt-3 space-y-2.5">
            {ALERTS.slice(0, visible).map((a) => (
              <article
                key={a.title}
                className="animate-rise rounded-xl border border-hairline bg-card p-3 shadow-soft"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "truncate rounded-full px-2 py-0.5 text-[10.5px] font-semibold",
                      a.tone === "high"
                        ? "bg-brand text-brand-foreground"
                        : a.tone === "mid"
                          ? "bg-brand-tint text-accent-foreground"
                          : "bg-surface-2 text-ink-soft",
                    )}
                  >
                    {a.tone === "high" ? "Strategic" : a.tone === "mid" ? "Watch" : "Info"}
                  </span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{a.time}</span>
                </div>
                <p className="mt-2 text-[13.5px] font-semibold leading-snug text-ink">{a.title}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{a.body}</p>
              </article>
            ))}

            {visible === 0 && (
              <p className="rounded-xl border border-dashed border-hairline p-4 text-[12.5px] text-muted-foreground">
                Run the pipeline to stream strategic insights here.
              </p>
            )}
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex items-center gap-2 rounded-xl border border-hairline bg-card px-2.5 py-2 text-[12.5px] text-ink">
              <Activity className="size-3.5 shrink-0 text-brand" /> Proxy pool healthy · 0 blocks
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-hairline bg-card px-2.5 py-2 text-[12.5px] text-ink">
              <ShieldCheck className="size-3.5 shrink-0 text-brand" /> robots.txt respected
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
