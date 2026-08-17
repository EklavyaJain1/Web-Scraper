import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Fingerprint,
  Gauge,
  Network,
  ShieldCheck,
  Table2,
  Workflow,
} from "lucide-react";
import { Eyebrow, Reveal, Section } from "./primitives";

const NODES = [
  { label: "Start URL", x: "6%", y: "12%" },
  { label: "Crawl pages", x: "34%", y: "4%" },
  { label: "Extract fields", x: "34%", y: "48%" },
  { label: "Clean + dedupe", x: "64%", y: "24%" },
  { label: "Send to warehouse", x: "64%", y: "70%" },
];

export function BuildSection() {
  return (
    <Section id="build">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Build</Eyebrow>
          <h2 className="mt-5 text-[34px] font-semibold leading-[1.1] text-ink sm:text-[44px]">
            Let your experts build the scrapers
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-soft">
            Understanding a page is the only prerequisite to scraping it. The people who already
            know the data build the flows themselves — drag nodes, point at elements, ship. No
            learning curve, no engineering backlog.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#use-cases"
              className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-[14.5px] font-semibold text-brand-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Explore scrapers <ArrowRight className="size-4" />
            </a>
            <a
              href="#faq"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-5 py-2.5 text-[14.5px] font-medium text-ink hover:bg-surface-2"
            >
              <BookOpen className="size-4 text-brand" /> Read docs
            </a>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="relative h-[360px] overflow-hidden rounded-[26px] border border-hairline bg-surface shadow-lift">
            <div className="absolute inset-0 grid-faint opacity-70" />
            <svg className="absolute inset-0 size-full" aria-hidden="true">
              <path
                d="M120 70 C200 70, 200 40, 260 40"
                className="stroke-brand-soft"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M120 70 C200 70, 200 200, 260 200"
                className="stroke-brand-soft"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M400 40 C460 40, 460 105, 505 105"
                className="stroke-brand-soft"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M400 200 C460 200, 460 270, 505 270"
                className="stroke-brand-soft"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            {NODES.map((n, i) => (
              <div
                key={n.label}
                className="absolute animate-float rounded-2xl border border-hairline bg-card px-3.5 py-2.5 text-[12.5px] font-medium text-ink shadow-soft"
                style={{ left: n.x, top: n.y, animationDelay: `${i * 0.5}s` }}
              >
                <span className="mr-2 inline-block size-1.5 rounded-full bg-brand align-middle" />
                {n.label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

const FEATURES = [
  {
    icon: CalendarClock,
    title: "Schedules that never drift",
    body: "Run every minute, hour or day with retries, backoff and run history you can audit.",
    wide: true,
  },
  {
    icon: Network,
    title: "Global proxy rotation",
    body: "Residential and datacenter pools across 12 regions, rotated per request.",
  },
  {
    icon: Fingerprint,
    title: "Anti-bot handling",
    body: "Headless browsers, stealth fingerprints and CAPTCHA solving handled for you.",
  },
  {
    icon: Table2,
    title: "Structured output",
    body: "Define a schema once; every run returns validated JSON, CSV or warehouse rows.",
  },
  {
    icon: Workflow,
    title: "Visual flow builder",
    body: "Compose crawl, extract, enrich and deliver steps on one canvas.",
    wide: true,
  },
  {
    icon: Gauge,
    title: "Live monitoring",
    body: "Alerts on schema drift, blocked pages and volume anomalies before they hurt.",
  },
];

export function FeatureGrid() {
  return (
    <Section className="pt-4">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Platform</Eyebrow>
          <h2 className="mt-5 text-[32px] font-semibold leading-[1.12] text-ink sm:text-[42px]">
            Everything a serious scraping stack needs
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            The plumbing nobody wants to maintain — proxies, browsers, retries, schemas and
            delivery — built in from day one.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 70} className={f.wide ? "md:col-span-2" : ""}>
            <div className="group h-full rounded-3xl border border-hairline bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
              <span className="grid size-10 place-items-center rounded-2xl bg-brand-tint text-accent-foreground">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-[17px] font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const ROW_A = ["Shopify", "Amazon", "LinkedIn", "Zillow", "Google", "Reddit", "Yelp", "eBay"];
const ROW_B = ["Postgres", "BigQuery", "Snowflake", "Sheets", "Slack", "Airtable", "S3", "Webhook"];

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className="flex shrink-0 gap-3 pr-3"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${reverse ? 44 : 38}s linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap rounded-2xl border border-hairline bg-card px-5 py-3 text-[14px] font-medium text-ink-soft shadow-soft"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <Section id="integrations" className="pt-4">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Integrations</Eyebrow>
          <h2 className="mt-5 text-[32px] font-semibold leading-[1.12] text-ink sm:text-[40px]">
            Scrape from anywhere, deliver everywhere
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            120+ sources and destinations, plus a REST API and webhooks for the rest.
          </p>
        </div>
      </Reveal>
      <div className="mt-10 space-y-3">
        <MarqueeRow items={ROW_A} />
        <MarqueeRow items={ROW_B} reverse />
      </div>
    </Section>
  );
}

const TRUST = [
  { icon: ShieldCheck, title: "SOC 2 Type II", body: "Independently audited controls and yearly penetration testing." },
  { icon: Fingerprint, title: "Data isolation", body: "Per-workspace encryption keys with configurable retention windows." },
  { icon: Network, title: "Compliance aware", body: "Robots-aware crawling, rate limits and region-pinned processing." },
];

export function Security() {
  return (
    <Section className="pt-4">
      <Reveal>
        <div className="rounded-[28px] border border-hairline bg-surface p-8 shadow-soft md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Eyebrow>Enterprise</Eyebrow>
              <h2 className="mt-5 text-[30px] font-semibold leading-[1.12] text-ink sm:text-[36px]">
                Built for teams with real compliance reviews
              </h2>
              <p className="mt-4 text-[15.5px] text-ink-soft">
                SSO, audit logs, role-based access and private networking — available on every
                enterprise workspace.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {TRUST.map((t) => (
                <div key={t.title} className="rounded-2xl border border-hairline bg-card p-5">
                  <t.icon className="size-5 text-brand" />
                  <h3 className="mt-4 text-[15px] font-semibold text-ink">{t.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
