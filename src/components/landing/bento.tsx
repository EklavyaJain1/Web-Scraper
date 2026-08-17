import { Braces, Clock, Shield, Zap, Boxes, LineChart } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./primitives";

const CARDS = [
  {
    icon: Shield,
    title: "Bypass Anti-Bots",
    body: "Residential proxy rotation, stealth browsers and CAPTCHA handling built in — no vendor juggling.",
  },
  {
    icon: Clock,
    title: "Scheduled Runs",
    body: "Cron-style schedules with retries, backoff and per-run alerting when a site changes shape.",
  },
  {
    icon: Braces,
    title: "Structured JSON",
    body: "Define a schema once; every run is validated, typed and safe for downstream models.",
  },
  {
    icon: Zap,
    title: "Zero Maintenance",
    body: "AI selectors self-heal after redesigns, so your pipelines keep running while you sleep.",
  },
  {
    icon: Boxes,
    title: "60+ Destinations",
    body: "Push clean rows to Sheets, Postgres, S3, Snowflake, Slack or any webhook.",
  },
  {
    icon: LineChart,
    title: "Run Observability",
    body: "Per-node timings, diffs and failure traces for every execution in your workspace.",
  },
];

export function Bento() {
  return (
    <Section id="solutions" className="py-16 md:py-24">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Platform</Eyebrow>
          <h2 className="mt-5 text-[34px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[46px]">
            Everything a production scraper needs.
          </h2>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 70}>
            <article className="group h-full rounded-2xl border border-hairline bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift">
              <span className="grid size-10 place-items-center rounded-xl border border-hairline bg-surface text-brand transition-colors group-hover:bg-brand-tint">
                <c.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-[17px] font-bold tracking-tight text-ink">{c.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{c.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
