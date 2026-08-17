import { useState } from "react";
import { Check, Clock, Database, Globe, Loader2 } from "lucide-react";
import { Reveal, Section } from "./primitives";
import { cn } from "@/lib/utils";

type Demo = {
  id: string;
  tab: string;
  title: string;
  blurb: string;
  model: string;
  sources: string[];
  prompt: string;
  steps: string[];
  columns: string[];
  rows: string[][];
  summaryTitle: string;
  summaryNote: string;
  bars: { label: string; value: string; pct: number }[];
  duration: string;
};

const DEMOS: Demo[] = [
  {
    id: "ecommerce",
    tab: "E-commerce",
    title: "Price Monitor",
    blurb: "A scraper that tracks competitor catalogs, prices and stock levels every hour.",
    model: "Miner Extract v3",
    sources: ["Amazon", "Shopify", "Walmart"],
    prompt: "How did competitor pricing move on our top SKUs this week?",
    steps: ["Crawling 1,240 product URLs", "Normalising price + stock fields"],
    columns: ["Product", "Competitor", "Price", "Change", "Stock"],
    rows: [
      ["Aero Runner 2", "Northwind", "$142.00", "-8%", "In stock"],
      ["Trail Grip Pro", "Torchlight", "$98.50", "+3%", "Low"],
      ["Everyday Tee", "Castleford", "$26.00", "-1%", "In stock"],
      ["Summit Jacket", "Vantage Outfit", "$210.00", "+12%", "Out"],
      ["Oaktree Bundle", "Oaktree Retail", "$31.20", "0%", "In stock"],
    ],
    summaryTitle: "Catalog coverage",
    summaryNote: "1,240 SKUs across 38 competitor domains",
    bars: [
      { label: "Apparel", value: "540 SKUs", pct: 86 },
      { label: "Footwear", value: "310 SKUs", pct: 62 },
      { label: "Outdoor", value: "220 SKUs", pct: 48 },
      { label: "Accessories", value: "170 SKUs", pct: 34 },
    ],
    duration: "Worked for 2 minutes",
  },
  {
    id: "listings",
    tab: "Listings",
    title: "Marketplace Agent",
    blurb: "Collects property and vehicle listings with photos, geo and history in one schema.",
    model: "Miner Extract v3",
    sources: ["Zillow", "Redfin", "Craigslist"],
    prompt: "Find new 2-bed listings under $600k added in the last 24 hours.",
    steps: ["Paginating 46 search pages", "Deduplicating by address hash"],
    columns: ["Address", "City", "Price", "Beds", "Listed"],
    rows: [
      ["118 Alder St", "Portland", "$524,000", "2", "4h ago"],
      ["9 Marina Way", "Oakland", "$589,500", "2", "7h ago"],
      ["77 Cedar Ct", "Austin", "$462,000", "2", "11h ago"],
      ["4 Harbor Loop", "Seattle", "$598,000", "2", "16h ago"],
      ["230 Vine Ave", "Denver", "$511,200", "2", "21h ago"],
    ],
    summaryTitle: "New listings today",
    summaryNote: "312 records, 0 duplicates after matching",
    bars: [
      { label: "Portland", value: "88", pct: 74 },
      { label: "Austin", value: "72", pct: 60 },
      { label: "Denver", value: "65", pct: 52 },
      { label: "Seattle", value: "48", pct: 38 },
    ],
    duration: "Worked for 96 seconds",
  },
  {
    id: "news",
    tab: "News",
    title: "Signal Watcher",
    blurb: "Monitors publications and blogs, extracting entities and sentiment per article.",
    model: "Miner Reason v2",
    sources: ["RSS", "Google News", "Substack"],
    prompt: "Summarise anything published about our category this morning.",
    steps: ["Fetching 214 feed items", "Classifying relevance + sentiment"],
    columns: ["Headline", "Source", "Entity", "Sentiment", "Time"],
    rows: [
      ["Retail data race heats up", "TechPress", "Northwind", "Positive", "06:12"],
      ["Supply chain squeeze", "Ledger", "Torchlight", "Negative", "07:40"],
      ["Pricing wars in apparel", "Marketwire", "Castleford", "Neutral", "08:05"],
      ["Outdoor demand climbs", "Trailhead", "Vantage", "Positive", "08:51"],
      ["Retail media spend up", "AdBeat", "Oaktree", "Positive", "09:20"],
    ],
    summaryTitle: "Coverage sentiment",
    summaryNote: "214 articles processed since midnight",
    bars: [
      { label: "Positive", value: "112", pct: 80 },
      { label: "Neutral", value: "64", pct: 46 },
      { label: "Negative", value: "38", pct: 27 },
      { label: "Unclassified", value: "0", pct: 3 },
    ],
    duration: "Worked for 74 seconds",
  },
  {
    id: "social",
    tab: "Social",
    title: "Audience Miner",
    blurb: "Pulls public profiles, posts and engagement into a clean, joinable table.",
    model: "Miner Extract v3",
    sources: ["LinkedIn", "Reddit", "YouTube"],
    prompt: "Which creators mentioned our product this week?",
    steps: ["Scanning 18 communities", "Resolving handles to profiles"],
    columns: ["Creator", "Platform", "Followers", "Mentions", "Reach"],
    rows: [
      ["@datadigger", "YouTube", "184k", "3", "412k"],
      ["u/scrapewise", "Reddit", "—", "6", "88k"],
      ["Priya Nair", "LinkedIn", "42k", "2", "61k"],
      ["@buildbot", "YouTube", "97k", "1", "120k"],
      ["u/etl_daily", "Reddit", "—", "4", "54k"],
    ],
    summaryTitle: "Share of voice",
    summaryNote: "16 creators, 42 mentions this week",
    bars: [
      { label: "YouTube", value: "18", pct: 70 },
      { label: "Reddit", value: "14", pct: 55 },
      { label: "LinkedIn", value: "7", pct: 30 },
      { label: "Forums", value: "3", pct: 14 },
    ],
    duration: "Worked for 3 minutes",
  },
  {
    id: "apis",
    tab: "APIs",
    title: "Data Delivery",
    blurb: "Ships every run to your warehouse, sheet or endpoint with schema validation.",
    model: "Miner Pipeline",
    sources: ["Postgres", "BigQuery", "Webhook"],
    prompt: "Send last night's run to the warehouse and alert on schema drift.",
    steps: ["Validating 24 fields against schema", "Writing 128k rows to BigQuery"],
    columns: ["Run", "Rows", "Destination", "Schema", "Status"],
    rows: [
      ["run_8841", "128,402", "BigQuery", "Valid", "Delivered"],
      ["run_8840", "96,118", "Postgres", "Valid", "Delivered"],
      ["run_8839", "44,905", "Webhook", "Drift", "Retried"],
      ["run_8838", "112,640", "S3", "Valid", "Delivered"],
      ["run_8837", "78,220", "Sheets", "Valid", "Delivered"],
    ],
    summaryTitle: "Delivery health",
    summaryNote: "99.94% successful writes over 30 days",
    bars: [
      { label: "BigQuery", value: "41%", pct: 82 },
      { label: "Postgres", value: "28%", pct: 56 },
      { label: "Webhook", value: "19%", pct: 38 },
      { label: "S3", value: "12%", pct: 24 },
    ],
    duration: "Worked for 41 seconds",
  },
];

export function Showcase() {
  const [active, setActive] = useState(DEMOS[0]!.id);
  const demo = DEMOS.find((d) => d.id === active) ?? DEMOS[0]!;

  return (
    <Section id="product" className="pt-6">
      <Reveal>
        <div className="flex flex-wrap justify-center gap-2">
          {DEMOS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActive(d.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-[13.5px] font-medium transition-all",
                d.id === active
                  ? "border-transparent gradient-brand text-brand-foreground shadow-soft"
                  : "border-hairline bg-card text-ink-soft hover:bg-surface-2 hover:text-ink",
              )}
            >
              {d.tab}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div
          key={demo.id}
          className="mt-8 overflow-hidden rounded-[28px] border border-hairline bg-surface p-2 shadow-lift"
          style={{ animation: "rise 0.5s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <div className="grid gap-2 lg:grid-cols-[1.55fr_1fr]">
            {/* Conversation panel */}
            <div className="rounded-[22px] border border-hairline bg-card p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-hairline pb-4">
                <div>
                  <h3 className="font-display text-[17px] font-semibold text-ink">{demo.title}</h3>
                  <p className="mt-1 max-w-md text-[13.5px] text-ink-soft">{demo.blurb}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-hairline bg-surface-2 px-2.5 py-1 text-[11.5px] font-medium text-ink-soft">
                    {demo.model}
                  </span>
                  <div className="flex -space-x-1.5">
                    {demo.sources.map((s) => (
                      <span
                        key={s}
                        title={s}
                        className="grid size-7 place-items-center rounded-full border border-hairline bg-brand-tint text-[10px] font-semibold text-accent-foreground"
                      >
                        {s.slice(0, 2)}
                      </span>
                    ))}
                    <span className="grid size-7 place-items-center rounded-full border border-hairline bg-surface-2 text-[10px] font-semibold text-muted-foreground">
                      +5
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-semibold text-background">
                  M
                </span>
                <p className="rounded-2xl rounded-tl-sm bg-surface-2 px-4 py-2.5 text-[14px] text-ink">
                  {demo.prompt}
                </p>
              </div>

              <div className="mt-5 space-y-2">
                {demo.steps.map((step, i) => (
                  <div
                    key={step}
                    className="flex items-center gap-2.5 rounded-xl border border-hairline bg-surface px-3 py-2 text-[13px] text-ink-soft"
                  >
                    {i === demo.steps.length - 1 ? (
                      <Loader2 className="size-3.5 animate-spin text-brand" />
                    ) : (
                      <Check className="size-3.5 text-brand" />
                    )}
                    {step}
                  </div>
                ))}
              </div>

              <div className="mt-5 overflow-x-auto rounded-2xl border border-hairline">
                <table className="w-full min-w-[520px] border-collapse text-left text-[13px]">
                  <thead>
                    <tr className="bg-surface-2 text-[11.5px] uppercase tracking-[0.08em] text-muted-foreground">
                      {demo.columns.map((c) => (
                        <th key={c} className="px-3.5 py-2.5 font-semibold">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {demo.rows.map((row) => (
                      <tr key={row.join()} className="border-t border-hairline">
                        {row.map((cell, i) => (
                          <td
                            key={i}
                            className={cn(
                              "px-3.5 py-2.5",
                              i === 0 ? "font-medium text-ink" : "text-ink-soft",
                            )}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
                <Clock className="size-3.5" /> {demo.duration}
              </p>
            </div>

            {/* Summary panel */}
            <div className="rounded-[22px] border border-hairline bg-card p-5 sm:p-6">
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <Database className="size-3.5 text-brand" /> Run summary
              </div>
              <h4 className="mt-3 font-display text-[19px] font-semibold text-ink">
                {demo.summaryTitle}
              </h4>
              <p className="mt-1 text-[13.5px] text-ink-soft">{demo.summaryNote}</p>

              <div className="mt-6 space-y-4">
                {demo.bars.map((bar, i) => (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-ink-soft">{bar.label}</span>
                      <span className="font-medium text-ink">{bar.value}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full gradient-brand transition-[width] duration-700"
                        style={{ width: `${bar.pct}%`, transitionDelay: `${i * 90}ms` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-hairline bg-surface p-4">
                <div className="flex items-center gap-2 text-[13px] font-medium text-ink">
                  <Globe className="size-4 text-brand" /> Proxy pool healthy
                </div>
                <p className="mt-1.5 text-[12.5px] text-ink-soft">
                  0 blocks in the last 10,000 requests · 12 regions active
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
