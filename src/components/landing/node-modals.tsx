import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Webhook,
  Clock,
  Terminal,
  Send,
  Check,
  Bot,
  RotateCcw,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Server,
  Copy,
  ClipboardCheck,
  Sparkles,
  Filter,
  Database,
  MapPin,
  Wand2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/*  1. Trigger Node Modal                                              */
/* ------------------------------------------------------------------ */

type TriggerMode = "webhook" | "cron" | "manual";

function TriggerModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [mode, setMode] = useState<TriggerMode>("webhook");
  const [sent, setSent] = useState(false);

  const modes: { id: TriggerMode; label: string; icon: typeof Globe; desc: string }[] = [
    { id: "webhook", label: "Webhook", icon: Webhook, desc: "Receive events via HTTP POST" },
    { id: "cron", label: "Cron Schedule", icon: Clock, desc: "Run on a recurring schedule" },
    { id: "manual", label: "Manual API Call", icon: Terminal, desc: "Trigger via REST endpoint" },
  ];

  const handleSendTest = () => {
    setSent(true);
    toast.success("Test event sent!", {
      description: `POST /api/trigger → 200 OK  (${mode} mode)`,
      duration: 3000,
    });
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-hairline text-foreground shadow-lift">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Globe className="size-5 text-brand" />
            Trigger Configuration
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose how the pipeline is triggered
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`w-full flex items-center gap-3 rounded-xl border p-3 transition-all text-left ${
                mode === m.id
                  ? "border-brand bg-brand/5 shadow-soft"
                  : "border-hairline bg-surface hover:bg-surface-2"
              }`}
            >
              <span
                className={`grid size-9 place-items-center rounded-lg ${
                  mode === m.id ? "bg-brand text-brand-foreground" : "bg-surface-2 text-muted-foreground"
                }`}
              >
                <m.icon className="size-4" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium">{m.label}</span>
                <span className="block text-xs text-muted-foreground">{m.desc}</span>
              </span>
              {mode === m.id && <Check className="size-4 text-brand" />}
            </button>
          ))}
        </div>

        <button
          onClick={handleSendTest}
          disabled={sent}
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:bg-brand/90 disabled:opacity-60"
        >
          {sent ? (
            <>
              <CheckCircle2 className="size-4" /> Event Sent
            </>
          ) : (
            <>
              <Send className="size-4" /> Send Test Event
            </>
          )}
        </button>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Scraper Studio Modal                                            */
/* ------------------------------------------------------------------ */

function ScraperStudioModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [url, setUrl] = useState("https://anthropic.com/news");
  const [collectorId, setCollectorId] = useState("");
  const [ipRotation, setIpRotation] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-hairline text-foreground shadow-lift">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Bot className="size-5 text-brand" />
            Bright Data Scraper Studio
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Configure extraction target & collector
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Target URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border border-hairline bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Collector ID</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={collectorId}
                onChange={(e) => setCollectorId(e.target.value)}
                className="flex-1 rounded-lg border border-hairline bg-surface px-3 py-2 text-sm font-mono text-brand placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
              <span className="rounded-md bg-success/10 border border-success/20 px-2 py-1 text-[10px] font-bold text-success">
                ACTIVE
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-hairline bg-surface p-3">
            <div>
              <span className="block text-sm font-medium">IP Rotation Proxy</span>
              <span className="block text-xs text-muted-foreground">Rotate IPs to avoid rate limiting</span>
            </div>
            <Switch checked={ipRotation} onCheckedChange={setIpRotation} />
          </div>

          <button
            onClick={() => {
              toast.success("Scraper configuration saved", {
                description: `Target: ${url} • Collector: ${collectorId}`,
              });
              onOpenChange(false);
            }}
            className="w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:bg-brand/90"
          >
            Save Configuration
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Self-Healing Modal                                              */
/* ------------------------------------------------------------------ */

interface Selector {
  path: string;
  status: "ok" | "broken" | "repairing" | "healed";
}

function SelfHealingModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const initialSelectors: Selector[] = [
    { path: ".pricing-card > h3.plan-name", status: "ok" },
    { path: "#features-table td:nth-child(2)", status: "ok" },
    { path: "div.rate-limit > span.value", status: "ok" },
    { path: "button.cta-upgrade[data-plan]", status: "ok" },
  ];

  const [selectors, setSelectors] = useState<Selector[]>(initialSelectors);
  const [simulating, setSimulating] = useState(false);

  const handleSimulate = () => {
    if (simulating) return;
    setSimulating(true);

    // Step 1: Break selectors
    setSelectors((prev) =>
      prev.map((s) => ({ ...s, status: "broken" as const }))
    );

    // Step 2: Start repairing after 1.5s
    setTimeout(() => {
      setSelectors((prev) =>
        prev.map((s) => ({ ...s, status: "repairing" as const }))
      );
    }, 1500);

    // Step 3: Heal them one by one
    initialSelectors.forEach((_, idx) => {
      setTimeout(() => {
        setSelectors((prev) =>
          prev.map((s, i) => (i <= idx ? { ...s, status: "healed" as const } : s))
        );
      }, 2200 + idx * 400);
    });

    // Step 4: Reset after full animation
    setTimeout(() => {
      setSimulating(false);
      toast.success("All selectors auto-repaired!", {
        description: `${initialSelectors.length} DOM selectors healed in 2.1s`,
      });
    }, 2200 + initialSelectors.length * 400 + 300);
  };

  // Reset when modal closes
  useEffect(() => {
    if (!open) {
      setSelectors(initialSelectors);
      setSimulating(false);
    }
  }, [open]);

  const statusConfig = {
    ok: { color: "text-muted-foreground", bg: "bg-surface", icon: Check, iconColor: "text-muted-foreground/50" },
    broken: { color: "text-destructive line-through", bg: "bg-destructive/10 border-destructive/30", icon: AlertTriangle, iconColor: "text-destructive" },
    repairing: { color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/30 animate-pulse", icon: RotateCcw, iconColor: "text-amber-500 animate-spin" },
    healed: { color: "text-success", bg: "bg-success/10 border-success/30", icon: CheckCircle2, iconColor: "text-success" },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-hairline text-foreground shadow-lift">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Shield className="size-5 text-brand" />
            Self-Healing Engine
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Auto-repair DOM selectors when layouts change
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-2 font-mono text-xs">
          <AnimatePresence mode="popLayout">
            {selectors.map((sel) => {
              const cfg = statusConfig[sel.status];
              const StatusIcon = cfg.icon;
              return (
                <motion.div
                  key={sel.path}
                  layout
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 rounded-lg border border-hairline p-2.5 transition-all ${cfg.bg}`}
                >
                  <StatusIcon className={`size-3.5 shrink-0 ${cfg.iconColor}`} />
                  <span className={`flex-1 ${cfg.color} transition-all`}>{sel.path}</span>
                  {sel.status === "healed" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="rounded bg-success/20 px-1.5 py-0.5 text-[9px] font-bold text-success"
                    >
                      FIXED
                    </motion.span>
                  )}
                  {sel.status === "broken" && (
                    <span className="rounded bg-destructive/20 px-1.5 py-0.5 text-[9px] font-bold text-destructive">
                      BROKEN
                    </span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <button
          onClick={handleSimulate}
          disabled={simulating}
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 shadow-soft"
        >
          <AlertTriangle className="size-4" />
          {simulating ? "Simulating..." : "Simulate Website Layout Shift"}
        </button>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  4. MCP Output Modal                                                */
/* ------------------------------------------------------------------ */

const SAMPLE_JSON = {
  tool: "dev-tool-intelligence",
  source: "cursor.sh",
  extracted_at: "2025-08-19T07:43:00Z",
  data: {
    model_name: "Cursor Pro",
    pricing_tier: "pro",
    monthly_price: "$20/mo",
    rate_limit: "500 req/day",
    features: ["AI Code Completion", "Multi-file Editing", "Codebase Context"],
  },
};

const CURSOR_SNIPPET = `// .cursor/mcp.json
{
  "mcpServers": {
    "dev-tool-intel": {
      "command": "npx",
      "args": ["-y", "@webminer/mcp-server"],
      "env": {                "WEBMINER_API_KEY": "wm_live_your_key_here"
      }
    }
  }
}`;

function MCPOutputModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CURSOR_SNIPPET);
      setCopied(true);
      toast.success("Copied to clipboard!", {
        description: "Paste into .cursor/mcp.json to connect",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy — try manually");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-hairline text-foreground shadow-lift">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Server className="size-5 text-brand" />
            MCP Server Output
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Generated JSON payload & Cursor IDE integration
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          {/* JSON Output */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Extracted Payload</span>
            <pre className="max-h-[200px] overflow-auto rounded-lg border border-hairline bg-surface p-3 text-xs leading-relaxed shadow-inner">
              <code className="text-success">{JSON.stringify(SAMPLE_JSON, null, 2)}</code>
            </pre>
          </div>

          {/* Cursor Snippet */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Cursor IDE Config Snippet
            </span>
            <pre className="rounded-lg border border-hairline bg-surface p-3 text-xs leading-relaxed shadow-inner">
              <code className="text-brand">{CURSOR_SNIPPET}</code>
            </pre>
          </div>

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:bg-brand/90"
          >
            {copied ? (
              <>
                <ClipboardCheck className="size-4" /> Copied!
              </>
            ) : (
              <>
                <Copy className="size-4" /> Copy Cursor IDE Snippet
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  5. LLM Extract Modal                                               */
/* ------------------------------------------------------------------ */

function LLMExtractModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [prompt, setPrompt] = useState("Extract the pricing tier, monthly price, and rate limits from the provided HTML text. Format as JSON matching the schema.");
  const [model, setModel] = useState("gpt-4o-mini");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-hairline text-foreground shadow-lift">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Sparkles className="size-5 text-brand" />
            LLM Extract Node
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Define structured extraction rules and prompts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Schema Editor */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">JSON Schema (Target Output)</label>
            <div className="rounded-lg border border-hairline bg-surface shadow-inner p-3 font-mono text-[11px] text-brand">
              <pre className="whitespace-pre-wrap">
{`{
  "company_name": "string",
  "update_type": "string",
  "model_name": "string",
  "context_window": "string",
  "pricing": "string"
}`}
              </pre>
            </div>
          </div>

          {/* Model Selection */}
          <div className="flex items-center justify-between rounded-xl border border-hairline bg-surface p-3">
            <div>
              <span className="block text-sm font-medium">Extraction Model</span>
              <span className="block text-xs text-muted-foreground">Select the LLM for parsing</span>
            </div>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="rounded-md border border-hairline bg-surface-2 px-2 py-1 text-xs text-foreground focus:border-brand focus:outline-none"
            >
              <option value="gpt-4o-mini">GPT-4o Mini (Fast)</option>
              <option value="gpt-4o">GPT-4o (Accurate)</option>
              <option value="claude-3-haiku">Claude 3 Haiku</option>
            </select>
          </div>

          {/* Prompt Fine-Tuning */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">System Prompt Fine-Tuning</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-20 w-full resize-none rounded-lg border border-hairline bg-surface px-3 py-2 text-[11px] text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand shadow-inner"
            />
          </div>

          <button
            onClick={() => {
              toast.success("Extraction rules saved", {
                description: `Model: ${model} • Schema configured`,
              });
              onOpenChange(false);
            }}
            className="w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:bg-brand/90"
          >
            Save Extraction Rules
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Filter Node Modal (NEW)                                         */
/* ------------------------------------------------------------------ */

function FilterModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [condition, setCondition] = useState("major_release");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-hairline text-foreground shadow-lift">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Filter className="size-5 text-brand" />
            Filter Logic
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Only proceed if data meets criteria
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Filter Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full rounded-lg border border-hairline bg-surface px-3 py-2 text-sm text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value="major_release">Update is a Major Release</option>
              <option value="context_window">Context Window Changed</option>
              <option value="pricing_change">Pricing Reduced</option>
            </select>
          </div>
          
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-600 dark:text-amber-400">
            <strong>Rule Summary:</strong> Only updates categorized as a "Major Release" (e.g. Claude 3.5 Sonnet) will be forwarded to the next node. Minor patches are ignored.
          </div>

          <button
            onClick={() => {
              toast.success("Filter condition updated");
              onOpenChange(false);
            }}
            className="w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:bg-brand/90"
          >
            Apply Filter
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Warehouse Modal (NEW)                                           */
/* ------------------------------------------------------------------ */

function WarehouseModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [provider, setProvider] = useState("supabase");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-hairline text-foreground shadow-lift">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Database className="size-5 text-brand" />
            Data Warehouse
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Where to store the extracted data
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Database Provider</label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full rounded-lg border border-hairline bg-surface px-3 py-2 text-sm text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value="supabase">Supabase</option>
              <option value="postgres">PostgreSQL</option>
              <option value="snowflake">Snowflake</option>
              <option value="bigquery">BigQuery</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Table Name</label>
            <input
              type="text"
              defaultValue="ai_model_releases"
              className="w-full rounded-lg border border-hairline bg-surface px-3 py-2 text-sm font-mono text-brand placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <button
            onClick={() => {
              toast.success("Database connection verified");
              onOpenChange(false);
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:bg-brand/90"
          >
            <CheckCircle2 className="size-4" /> Save Connection
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Geo Network Modal (NEW)                                         */
/* ------------------------------------------------------------------ */

function GeoNetworkModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [country, setCountry] = useState("US");
  const [proxyType, setProxyType] = useState("residential");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-hairline text-foreground shadow-lift">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <MapPin className="size-5 text-brand" />
            Geo Network Routing
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Route scraping traffic through specific localized networks
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Target Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg border border-hairline bg-surface px-3 py-2 text-sm text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="IN">India</option>
              <option value="JP">Japan</option>
              <option value="DE">Germany</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Proxy Type</label>
            <select
              value={proxyType}
              onChange={(e) => setProxyType(e.target.value)}
              className="w-full rounded-lg border border-hairline bg-surface px-3 py-2 text-sm text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value="residential">Residential (High Success Rate)</option>
              <option value="datacenter">Datacenter (Fast & Cheap)</option>
              <option value="mobile">Mobile (Highest Anonymity)</option>
            </select>
          </div>

          <div className="rounded-xl border border-brand/30 bg-brand/5 p-3 flex items-start gap-3">
            <span className="relative flex size-2.5 mt-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2.5 bg-brand"></span>
            </span>
            <div className="text-xs text-brand-foreground">
              <strong>Routing Active:</strong> Traffic will be routed through {proxyType} IPs in the selected region.
            </div>
          </div>

          <button
            onClick={() => {
              toast.success("Geo Routing Configured");
              onOpenChange(false);
            }}
            className="w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:bg-brand/90"
          >
            Apply Routing
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  9. Mistral Prediction Modal (NEW)                                  */
/* ------------------------------------------------------------------ */

function MistralPredictionModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [target, setTarget] = useState("release_date");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-hairline text-foreground shadow-lift">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Wand2 className="size-5 text-brand" />
            Mistral AI Prediction Engine
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Forecast trends based on historical scrape data
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Mistral API Key</label>
            <input
              type="password"
              placeholder="Enter your Mistral API key..."
              className="w-full rounded-lg border border-hairline bg-surface px-3 py-2 text-sm font-mono text-muted-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Prediction Target</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full rounded-lg border border-hairline bg-surface px-3 py-2 text-sm text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value="release_date">Predict Next Model Release Date</option>
              <option value="pricing_trend">Forecast Pricing Trend (3 months)</option>
              <option value="context_window">Predict Next Context Window Size</option>
            </select>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-hairline bg-surface p-3">
            <div>
              <span className="block text-sm font-medium">Model</span>
              <span className="block text-xs text-muted-foreground">mistral-large-latest</span>
            </div>
          </div>

          <button
            onClick={() => {
              toast.success("Prediction Settings Saved");
              onOpenChange(false);
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:bg-brand/90"
          >
            <CheckCircle2 className="size-4" /> Save Configuration
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { 
  TriggerModal, 
  ScraperStudioModal, 
  SelfHealingModal, 
  MCPOutputModal, 
  LLMExtractModal,
  FilterModal,
  WarehouseModal,
  GeoNetworkModal,
  MistralPredictionModal
};
