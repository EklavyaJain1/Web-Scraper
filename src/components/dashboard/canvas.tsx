import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  Bot,
  Globe,
  Link2,
  Play,
  ShieldCheck,
  Tag,
  Search,
  AlertTriangle,
  Loader2,
  Copy,
  ClipboardCheck,
  HeartPulse,
  CheckCircle2,
  X,
  Wrench,
  ArrowLeft,
} from "lucide-react";
import { Logo } from "@/components/landing/primitives";
import { cn } from "@/lib/utils";
import { runIntelligencePipeline, runSelfHeal, approveHeal } from "@/lib/pipeline";
import type { AlertData, ScraperModule } from "@/lib/pipeline";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

type ModuleKey = "target" | "scrape" | "brain";

const MODULE_CONFIG: Record<
  ModuleKey,
  { label: string; hint: string; icon: typeof Globe }
> = {
  target: { label: "Target URL", hint: "Competitor domain", icon: Globe },
  scrape: { label: "Bright Data Scrape", hint: "Web Unlocker extraction", icon: Tag },
  brain: { label: "Gemini AI Brain", hint: "Strategic synthesis", icon: Bot },
};

// Pipeline node positions (percentage-based)
const NODES = [
  { key: "target" as ModuleKey, title: "Target URL", x: 4, y: 28 },
  { key: "scrape" as ModuleKey, title: "Bright Data Scrape", x: 38, y: 28 },
  { key: "brain" as ModuleKey, title: "Gemini AI Brain", x: 72, y: 28 },
];

const EDGES = [
  { from: "target", to: "scrape", d: "M 150 150 C 250 150, 250 150, 380 150" },
  { from: "scrape", to: "brain", d: "M 540 150 C 640 150, 640 150, 720 150" },
];

export function IntelligenceCanvas() {
  const [running, setRunning] = useState(false);
  const [activeModules, setActiveModules] = useState<ModuleKey[]>([]);
  const [moduleStates, setModuleStates] = useState<
    Record<ModuleKey, "idle" | "running" | "done" | "error">
  >({ target: "idle", scrape: "idle", brain: "idle" });
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [rawScrape, setRawScrape] = useState("");
  const [structuredData, setStructuredData] = useState("");
  const [targetUrl, setTargetUrl] = useState("https://news.ycombinator.com");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [collectorId, setCollectorId] = useState("c_mt4buklh24bcxhyzu0");

  // Self-healing state
  const [healInstruction, setHealInstruction] = useState("");
  const [healRunning, setHealRunning] = useState(false);
  const [healResult, setHealResult] = useState<{ success: boolean; output?: string; error?: string } | null>(null);
  const [showHealPanel, setShowHealPanel] = useState(false);

  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = useCallback(async () => {
    // Clear previous state
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setActiveModules([]);
    setAlerts([]);
    setRawScrape("");
    setStructuredData("");
    setErrorMsg("");
    setHealResult(null);
    setModuleStates({ target: "idle", scrape: "idle", brain: "idle" });

    // Animate module activation with delays
    const order: ModuleKey[] = ["target", "scrape", "brain"];
    order.forEach((k, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setActiveModules((prev) => [...prev, k]);
          setModuleStates((prev) => ({ ...prev, [k]: "running" }));
        }, 200 + i * 800),
      );
    });

    try {
      const result = await runIntelligencePipeline({ data: { url: targetUrl } });

      // Mark all modules as done
      setModuleStates({ target: "done", scrape: "done", brain: "done" });

      if (result.collectorId) setCollectorId(result.collectorId);

      if (result.success && result.alerts) {
        setAlerts(result.alerts);
        if (result.rawScrape) setRawScrape(result.rawScrape);
        if (result.structuredData) setStructuredData(result.structuredData);
        toast.success("Pipeline completed", {
          description: `Generated ${result.alerts.length} strategic alerts`,
        });
      } else {
        setErrorMsg(result.error || "Failed to process target.");
        setModuleStates((prev) => ({ ...prev, brain: "error" }));
        toast.error("Pipeline failed", { description: result.error });
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
      setModuleStates({ target: "done", scrape: "error", brain: "error" });
      toast.error("Pipeline error", { description: err.message });
    } finally {
      setRunning(false);
    }
  }, [targetUrl]);

  const handleSelfHeal = useCallback(async () => {
    if (!healInstruction.trim() || !collectorId) return;
    setHealRunning(true);
    setHealResult(null);

    try {
      const result = await runSelfHeal({
        data: { collectorId, instruction: healInstruction },
      });
      setHealResult(result);
      if (result.success) {
        toast.success("Self-healing completed", {
          description: "Scraper has been repaired. Run pipeline again to verify.",
        });
      } else {
        toast.error("Healing failed", { description: result.error });
      }
    } catch (err: any) {
      setHealResult({ success: false, error: err.message });
      toast.error("Healing error", { description: err.message });
    } finally {
      setHealRunning(false);
    }
  }, [healInstruction, collectorId]);

  const handleApproveHeal = useCallback(
    async (approve: boolean) => {
      try {
        const result = await approveHeal({ data: { collectorId, approve } });
        if (result.success) {
          toast.success(approve ? "Heal approved" : "Heal rejected");
          setHealResult(null);
        }
      } catch (err: any) {
        toast.error("Approval failed", { description: err.message });
      }
    },
    [collectorId],
  );

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-hairline px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" className="mr-2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-ink">
            <ArrowLeft className="size-4" />
          </Link>
          <Logo />
          <div className="relative ml-4 flex max-w-sm items-center">
            <Search className="absolute left-3 size-4 text-muted-foreground" />
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="h-8 w-[300px] rounded-full border border-hairline bg-surface pl-9 pr-3 text-[12px] font-medium text-ink focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              placeholder="Enter target URL to scrape..."
            />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {/* Collector ID badge */}
          <span className="hidden items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 py-1.5 text-[11px] font-medium text-ink-soft sm:inline-flex font-mono">
            <Tag className="size-3 text-brand" /> {collectorId}
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 py-1.5 text-[11.5px] font-medium text-ink-soft sm:inline-flex">
            <ShieldCheck className="size-3.5 text-brand" /> Live Extraction
          </span>
          <button
            type="button"
            onClick={() => setShowHealPanel(!showHealPanel)}
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-2 text-[13px] font-semibold text-ink shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <HeartPulse className="size-3.5" /> Self-Heal
          </button>
          <button
            type="button"
            onClick={run}
            disabled={running || !targetUrl}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[13.5px] font-semibold text-brand-foreground shadow-soft transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {running ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Play className="size-3.5" />
            )}{" "}
            {running ? "Running…" : "Run pipeline"}
          </button>
        </div>
      </header>

      {/* Self-Healing Panel */}
      {showHealPanel && (
        <div className="border-b border-hairline bg-surface/50 px-6 py-4">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Wrench className="size-4 text-brand" />
                <h3 className="text-[13px] font-semibold text-ink">
                  Self-Healing — <span className="font-mono text-brand">{collectorId}</span>
                </h3>
              </div>
              <button onClick={() => setShowHealPanel(false)} className="text-muted-foreground hover:text-ink">
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Describe the layout change or broken selector, and Bright Data's AI will repair the scraper.
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={healInstruction}
                onChange={(e) => setHealInstruction(e.target.value)}
                placeholder="e.g. 'The title selector changed from .titleline to .story-title'"
                className="flex-1 rounded-lg border border-hairline bg-card px-3 py-2 text-[12.5px] text-ink placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
              <button
                onClick={handleSelfHeal}
                disabled={healRunning || !healInstruction.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-[13px] font-semibold text-brand-foreground shadow-soft disabled:opacity-60"
              >
                {healRunning ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <HeartPulse className="size-3.5" />
                )}
                {healRunning ? "Healing…" : "Heal"}
              </button>
            </div>

            {/* Heal result */}
            {healResult && (
              <div
                className={cn(
                  "mt-3 rounded-lg border p-3 text-[12px]",
                  healResult.success
                    ? "border-success/50 bg-success/10 text-success"
                    : "border-destructive/50 bg-destructive/10 text-destructive",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <pre className="max-h-[100px] overflow-auto whitespace-pre-wrap font-mono text-[11px]">
                    {healResult.success ? healResult.output : healResult.error}
                  </pre>
                  {healResult.success && (
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => handleApproveHeal(true)}
                        className="rounded bg-success/20 px-2 py-1 text-[11px] font-semibold text-success hover:bg-success/30"
                      >
                        <CheckCircle2 className="mr-1 inline size-3" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleApproveHeal(false)}
                        className="rounded bg-destructive/20 px-2 py-1 text-[11px] font-semibold text-destructive hover:bg-destructive/30"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid flex-1 grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_320px]">
        {/* Sidebar — Modules */}
        <aside className="border-b border-hairline bg-surface p-4 lg:border-b-0 lg:border-r">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Pipeline Modules
          </p>
          <div className="mt-3 space-y-2">
            {(Object.keys(MODULE_CONFIG) as ModuleKey[]).map((key) => {
              const m = MODULE_CONFIG[key];
              const st = moduleStates[key];
              const Icon = m.icon;
              return (
                <div
                  key={key}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border bg-card p-2.5 shadow-soft transition-colors",
                    st === "running" && "border-brand/50",
                    st === "done" && "border-success/50",
                    st === "error" && "border-destructive/50",
                    st === "idle" && "border-hairline",
                  )}
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-ink">
                      {m.label}
                    </span>
                    <span className="block truncate text-[11px] text-muted-foreground">
                      {m.hint}
                    </span>
                  </span>
                  <span className="shrink-0">
                    {st === "running" && (
                      <Loader2 className="size-3.5 animate-spin text-brand" />
                    )}
                    {st === "done" && (
                      <CheckCircle2 className="size-3.5 text-success" />
                    )}
                    {st === "error" && (
                      <AlertTriangle className="size-3.5 text-destructive" />
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Connections
          </p>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-hairline bg-card px-2.5 py-2 text-[12.5px] text-ink">
            <Link2 className="size-3.5 shrink-0 text-brand" /> 2 edges · 3
            nodes
          </div>

          {/* Collector info */}
          <p className="mt-6 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Collector
          </p>
          <div className="mt-2 rounded-xl border border-hairline bg-card px-2.5 py-2 text-[11.5px] text-ink">
            <div className="flex items-center gap-1.5">
              <Tag className="size-3 shrink-0 text-brand" />
              <span className="font-mono">{collectorId}</span>
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">
              Target: news.ycombinator.com
            </div>
          </div>
        </aside>

        {/* Canvas — Node graph */}
        <main className="relative min-h-[520px] overflow-hidden bg-background lg:h-[calc(100vh-61px)]">
          <div className="absolute inset-0 dot-grid" />
          <div className="relative mx-auto h-full w-full max-w-[980px] px-4 py-6">
            <div className="relative h-[320px] w-full">
              {/* SVG edges */}
              <svg
                className="pointer-events-none absolute inset-0 size-full"
                viewBox="0 0 900 320"
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
                      activeModules.includes(e.to as ModuleKey)
                        ? "animate-dash opacity-100"
                        : "opacity-25",
                    )}
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </svg>

              {/* Nodes */}
              {NODES.map((n) => {
                const st = moduleStates[n.key];
                return (
                  <div
                    key={n.key}
                    className={cn(
                      "absolute w-[172px] rounded-2xl border bg-card p-3 shadow-lift transition-all duration-500",
                      st === "running" && "border-brand shadow-lift",
                      st === "done" && "border-success/50 shadow-lift",
                      st === "error" && "border-destructive/50",
                      st === "idle" && "border-ink/15 opacity-90",
                    )}
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-lg",
                          st === "done"
                            ? "bg-success/10 text-success"
                            : st === "error"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-brand-tint text-brand",
                        )}
                      >
                        {(() => { const Icon = MODULE_CONFIG[n.key].icon; return <Icon className="size-4" />; })()}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[12.5px] font-semibold text-ink">
                          {n.title}
                        </span>
                        <span className="block truncate text-[11px] text-muted-foreground">
                          {n.key === "target" ? targetUrl : MODULE_CONFIG[n.key].hint}
                        </span>
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                      <span
                        className={cn(
                          "block h-full rounded-full transition-all duration-700",
                          st === "done"
                            ? "w-full bg-success"
                            : st === "running"
                              ? "w-3/4 bg-brand animate-pulse"
                              : st === "error"
                                ? "w-full bg-destructive"
                                : "w-0 bg-brand",
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* Sidebar — Live Alerts */}
        <aside className="border-t border-hairline bg-surface p-4 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Live Alerts
            </p>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                running
                  ? "border-brand/30 bg-brand/10 text-brand"
                  : alerts.length > 0
                    ? "border-success/30 bg-success-tint text-success"
                    : "border-hairline bg-surface-2 text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  running
                    ? "bg-brand animate-pulse"
                    : alerts.length > 0
                      ? "bg-success"
                      : "bg-muted-foreground/50",
                )}
              />
              {running ? "Processing" : alerts.length > 0 ? "Connected" : "Idle"}
            </span>
          </div>

          <div className="mt-3 space-y-2.5">
            {/* Error display */}
            {errorMsg && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 shadow-soft">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-destructive" />
                  <p className="text-[12.5px] font-semibold text-destructive">
                    {errorMsg}
                  </p>
                </div>
              </div>
            )}

            {/* Alert cards */}
            {alerts.map((a, i) => (
              <article
                key={i}
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
                    {a.tone === "high"
                      ? "Strategic"
                      : a.tone === "mid"
                        ? "Watch"
                        : "Info"}
                  </span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {a.time}
                  </span>
                </div>
                <p className="mt-2 text-[13.5px] font-semibold leading-snug text-ink">
                  {a.title}
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
                  {a.body}
                </p>
              </article>
            ))}

            {/* Empty state */}
            {alerts.length === 0 && !errorMsg && !running && (
              <p className="rounded-xl border border-dashed border-hairline p-4 text-[12.5px] text-muted-foreground">
                Run the pipeline to stream strategic insights here.
              </p>
            )}
            {running && alerts.length === 0 && !errorMsg && (
              <div className="flex items-center gap-2 rounded-xl border border-dashed border-brand/30 bg-brand/5 p-4 text-[12.5px] text-brand">
                <Loader2 className="size-3.5 animate-spin" />
                Scraping target and synthesizing insights...
              </div>
            )}
          </div>

          {/* Raw scrape preview */}
          {rawScrape && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Raw Scrape Preview
                </p>
                <button
                  onClick={() => copyText(rawScrape)}
                  className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-surface-2"
                >
                  {copied ? (
                    <ClipboardCheck className="size-3 text-success" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="mt-2 max-h-[120px] overflow-auto rounded-xl border border-hairline bg-card p-2.5 font-mono text-[10px] leading-relaxed text-ink-soft shadow-soft">
                {rawScrape}
              </pre>
            </div>
          )}

          {/* Structured data preview */}
          {structuredData && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Structured JSON Data
                </p>
                <button
                  onClick={() => copyText(structuredData)}
                  className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-surface-2"
                >
                  <Copy className="size-3" />
                  Copy
                </button>
              </div>
              <pre className="mt-2 max-h-[150px] overflow-auto rounded-xl border border-brand/20 bg-brand/5 p-2.5 font-mono text-[10px] leading-relaxed text-ink-soft shadow-soft">
                {structuredData}
              </pre>
            </div>
          )}

          {/* Status indicators */}
          <div className="mt-5 space-y-2">
            <div className="flex items-center gap-2 rounded-xl border border-hairline bg-card px-2.5 py-2 text-[12.5px] text-ink">
              <Activity className="size-3.5 shrink-0 text-brand" />{" "}
              {running ? "Pipeline Active" : "Pipeline Idle"}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-hairline bg-card px-2.5 py-2 text-[12.5px] text-ink">
              <Bot className="size-3.5 shrink-0 text-brand" /> Gemini AI Brain
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-hairline bg-card px-2.5 py-2 text-[12.5px] text-ink">
              <Tag className="size-3.5 shrink-0 text-brand" /> Collector: <span className="font-mono text-[11px]">{collectorId}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
