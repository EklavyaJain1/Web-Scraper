import { ArrowRight, Bot, Globe, Sparkles, Server, RefreshCw, TerminalSquare, BrainCircuit } from "lucide-react";
import { Reveal, Section } from "./primitives";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TriggerModal, ScraperStudioModal, SelfHealingModal, MCPOutputModal, LLMExtractModal } from "./node-modals";

function CanvasNode({
  icon: Icon,
  title,
  subtitle,
  style,
  className,
  onClick,
}: {
  icon: typeof Globe;
  title: string;
  subtitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -6, right: 6, top: -6, bottom: 6 }}
      dragElastic={0.08}
      whileHover={{ scale: 1.02, y: -2, boxShadow: "0 12px 24px -4px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`absolute z-10 w-[210px] rounded-xl border border-hairline bg-card/95 backdrop-blur-md p-4 shadow-soft cursor-pointer group ${className ?? ""}`}
      style={style}
    >
      {/* Input Port */}
      <div className="absolute -left-[5px] top-[45px] size-2.5 rounded-full border border-hairline bg-surface shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
      {/* Output Port */}
      <div className="absolute -right-[5px] top-[45px] size-2.5 rounded-full border border-hairline bg-surface shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand mt-0.5">
          <Icon className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[12px] font-semibold leading-snug text-ink">{title}</span>
          <span className="block mt-1 text-[10.5px] leading-snug text-muted-foreground">
            {subtitle}
          </span>
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        <span className="block h-1.5 w-full rounded-full bg-surface-2" />
        <span className="block h-1.5 w-2/3 rounded-full bg-surface-2" />
      </div>
      <span className="mt-2.5 block text-center text-[9px] font-bold text-muted-foreground tracking-[0.05em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Click to configure</span>
    </motion.div>
  );
}

function FlowPath({ d, delay }: { d: string; delay: number }) {
  return (
    <>
      <path d={d} className="animate-dash stroke-brand/30" fill="none" strokeWidth="1.5" />
      <motion.path
        d={d}
        className="stroke-brand"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0.12, pathOffset: 0, opacity: 0 }}
        animate={{ pathOffset: 1, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay }}
      />
    </>
  );
}

/* Small connector dots at path endpoints */
function ConnectorDot({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r="4" className="fill-brand/60" />;
}

function TerminalStream() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const messages = [
      "[INFO] Initializing extraction...",
      "[DATA] Fetching cursor.sh/pricing",
      "[INFO] Parsing DOM tree...",
      "[MATCH] Schema Match: c_xxxx",
      "[SUCCESS] Extracted 42 fields.",
      "[SYNC] Pushing to MCP Server...",
      "[OK] Live update complete.",
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        const msg = messages[i] ?? "";
        i++;
        setLogs((prev) => [...prev.slice(-3), msg]);
      } else {
        i = 0;
        setLogs([]);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-[210px] hidden md:block overflow-hidden rounded-xl border border-hairline bg-[#0D0D0D] p-3 shadow-lift font-mono text-[10px] z-10 absolute"
      style={{ left: "72%", top: "62%" }}
    >
      <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
        <TerminalSquare className="size-3.5 text-brand" />
        <span className="text-white/60 font-mono text-[10px] uppercase tracking-wider">terminal_stream.log</span>
      </div>
      <div className="space-y-1.5 text-white/80 min-h-[70px] font-mono text-[10px]">
        {logs.map((log, idx) => (
          <motion.div
            key={`${idx}-${log}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${
              log?.includes("SUCCESS") || log?.includes("OK")
                ? "text-success"
                : log?.includes("MATCH")
                  ? "text-brand-tint"
                  : ""
            }`}
          >
            {log}
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1.5 h-3 bg-brand ml-1 align-middle"
        />
      </div>
    </div>
  );
}

/*
  Layout (absolute‐positioned within viewBox 0 0 1000 420):

  Node A  "Target Developer Sites"    → left:  40px,  top: 80px   (center-right edge ≈ 250, 135)
  Node B  "Scraper Studio"            → left: 390px,  top: 45px   (center-left  ≈ 390, 100)  (center-right ≈ 600, 100)
  Node C  "Scraper Heal"              → left: 390px,  top: 225px  (center-left  ≈ 390, 280)
  Node D  "MCP Server"                → left: 730px,  top: 120px  (center-left  ≈ 730, 175)
  Terminal                            → left: 730px,  top: 280px

  Connections:
    A → B :  from (250, 135)  to (390, 100)
    B → D :  from (600, 100)  to (730, 175)
    B → C :  from (500, 155)  to (500, 225)     (vertical drop from bottom of B to top of C)
    D → Terminal: from (840, 240) to (840, 280)  (short vertical)
*/

function WorkflowCanvas() {
  const [activeModal, setActiveModal] = useState<"trigger" | "scraper" | "heal" | "mcp" | "llm" | null>(null);

  /* ---- Node dimensions (approx) ----
     Each CanvasNode is w-[210px]. The inner content makes them ~110px tall.
     In the SVG viewBox coordinate system (1000 × 420) the wrapper div maps
     percentage-based positions to actual pixels.  We place nodes using
     percentage left/top on the wrapper, and draw SVG paths in viewBox coords.
  */

  // ---- Percentage positions for each node (left, top) ----
  const nodeA = { left: "2%", top: "18%" }; // Target Developer Sites
  const nodeB = { left: "27%", top: "8%" }; // Scraper Studio
  const nodeC = { left: "27%", top: "56%" }; // Scraper Heal
  const nodeE = { left: "52%", top: "8%" }; // LLM Extract
  const nodeD = { left: "77%", top: "22%" }; // MCP Server

  // ---- SVG viewBox coordinates matching the above percentages ----
  // viewBox is 1000 × 420.  node width ≈ 210px ≈ 21% of 1000.
  // node height ≈ 110px ≈ 26% of 420.

  const paths = {
    AtoB: "M 230 130 C 250 130, 250 88, 270 88",
    BtoE: "M 480 88 C 500 88, 500 88, 520 88",
    BtoC: "M 375 143 C 375 175, 375 205, 375 235",
    EtoD: "M 730 88 C 750 88, 750 147, 770 147",
  };

  return (
    <div
      className="relative mx-auto mt-14 max-w-6xl"
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        const glow = document.getElementById("mouse-glow");
        if (glow) {
          glow.style.background = `radial-gradient(800px circle at ${e.clientX - left}px ${e.clientY - top}px, rgba(139, 92, 246, 0.08), transparent 40%)`;
        }
      }}
    >
      <div className="relative overflow-hidden rounded-xl border border-hairline bg-surface shadow-soft group">
        <div className="absolute inset-0 grid-faint opacity-100" />
        <div
          id="mouse-glow"
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* Title bar */}
        <div className="relative flex items-center border-b border-hairline bg-card/80 px-4 py-2.5 backdrop-blur z-20">
          <div className="flex gap-2 w-1/3">
            <span className="size-2.5 rounded-full bg-surface-2" />
            <span className="size-2.5 rounded-full bg-surface-2" />
            <span className="size-2.5 rounded-full bg-surface-2" />
          </div>
          <div className="flex-1 text-center truncate text-[12px] font-medium text-muted-foreground">
            Dev Tool Intelligence Tool
          </div>
          <div className="w-1/3"></div>
        </div>

        {/* Canvas body — fixed aspect ratio container */}
        <div className="relative w-full z-10" style={{ paddingBottom: "42%" /* 420/1000 */ }}>
          {/* SVG connection lines */}
          <svg
            className="pointer-events-none absolute inset-0 size-full hidden md:block"
            viewBox="0 0 1000 420"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {/* A → B */}
            <FlowPath d={paths.AtoB} delay={0} />
            <ConnectorDot cx={230} cy={130} />
            <ConnectorDot cx={270} cy={88} />

            {/* B → E */}
            <FlowPath d={paths.BtoE} delay={0.6} />
            <ConnectorDot cx={480} cy={88} />
            <ConnectorDot cx={520} cy={88} />

            {/* E → D */}
            <FlowPath d={paths.EtoD} delay={1.2} />
            <ConnectorDot cx={730} cy={88} />
            <ConnectorDot cx={770} cy={147} />

            {/* B → C */}
            <FlowPath d={paths.BtoC} delay={1.8} />
            <ConnectorDot cx={375} cy={143} />
            <ConnectorDot cx={375} cy={235} />
          </svg>

          {/* Absolutely positioned nodes */}
          <CanvasNode
            icon={Globe}
            title="Target Developer Sites"
            subtitle="Cursor Docs, Pricing & Changelogs"
            style={{ left: nodeA.left, top: nodeA.top }}
            onClick={() => setActiveModal("trigger")}
          />
          <CanvasNode
            icon={Bot}
            title="Bright Data Scraper Studio"
            subtitle="Extract JSON Schema (Collector ID: c_xxxx)"
            style={{ left: nodeB.left, top: nodeB.top }}
            onClick={() => setActiveModal("scraper")}
          />
          <CanvasNode
            icon={BrainCircuit}
            title="LLM Extract Node"
            subtitle="Parse with Schema & Prompt Fine-tuning"
            style={{ left: nodeE.left, top: nodeE.top }}
            onClick={() => setActiveModal("llm")}
          />
          <CanvasNode
            icon={RefreshCw}
            title="Bright Data Scraper Heal"
            subtitle="Auto-Repair Selectors on Layout Change"
            style={{ left: nodeC.left, top: nodeC.top }}
            onClick={() => setActiveModal("heal")}
          />
          <CanvasNode
            icon={Server}
            title="MCP Server / Dev Dashboard"
            subtitle="Serve Structured JSON to Cursor IDE & Web UI"
            style={{ left: nodeD.left, top: nodeD.top }}
            onClick={() => setActiveModal("mcp")}
          />
          <TerminalStream />

          {/* Node Modals */}
          <TriggerModal open={activeModal === "trigger"} onOpenChange={(v) => !v && setActiveModal(null)} />
          <ScraperStudioModal open={activeModal === "scraper"} onOpenChange={(v) => !v && setActiveModal(null)} />
          <LLMExtractModal open={activeModal === "llm"} onOpenChange={(v) => !v && setActiveModal(null)} />
          <SelfHealingModal open={activeModal === "heal"} onOpenChange={(v) => !v && setActiveModal(null)} />
          <MCPOutputModal open={activeModal === "mcp"} onOpenChange={(v) => !v && setActiveModal(null)} />
        </div>
      </div>
    </div>
  );
}

import { Hero as AnimatedHero } from "@/components/ui/animated-hero";

export function Hero() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] dot-grid opacity-80 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      
      <Section className="relative pb-8 pt-4 md:pb-12 md:pt-6">
        <AnimatedHero />

        <Reveal delay={320}>
          <WorkflowCanvas />
        </Reveal>
      </Section>

      <Section className="py-12 md:py-16">
        <Reveal>
          <h2 className="text-center text-[12.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Powered by
          </h2>
          <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-14">
              {["Bright Data", "Gemini AI", "TanStack", "React 19", "Tailwind CSS", "shadcn/ui", "Bright Data", "Gemini AI", "TanStack", "React 19", "Tailwind CSS", "shadcn/ui"].map((logo, i) => (
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
