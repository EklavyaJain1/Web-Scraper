import { ArrowUpRight, Quote } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./primitives";

const CASES = [
  {
    company: "Northwind Retail",
    metric: "18h → 4min",
    title: "Competitive pricing refreshed in near real time",
    body: "Replaced a brittle in-house crawler with 40 Web Miner flows feeding the pricing warehouse.",
  },
  {
    company: "Instabasket",
    metric: "2.1M pages/day",
    title: "Catalog coverage across 300 grocery domains",
    body: "Schema validation caught every store redesign before it reached downstream models.",
  },
  {
    company: "Gustify",
    metric: "-72% cost",
    title: "One platform instead of five scraping vendors",
    body: "Proxies, browsers, scheduling and delivery consolidated into a single workspace.",
  },
];

const QUOTES = [
  {
    quote:
      "Our analysts build their own scrapers now. Engineering hasn't touched a crawler in six months.",
    name: "Marcus Webb",
    role: "Head of Data, Northwind",
  },
  {
    quote:
      "Web Miner survived three site redesigns in a week and told us about each one before we noticed.",
    name: "Priya Nair",
    role: "Data Platform Lead, Instabasket",
  },
  {
    quote: "We went from a scraping backlog to same-day requests. It changed how we plan research.",
    name: "Katherine Duh",
    role: "Market Intelligence, Gustify",
  },
];

export function UseCases() {
  return (
    <Section id="use-cases" className="pt-4">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <Eyebrow>Case studies</Eyebrow>
            <h2 className="mt-5 text-[32px] font-semibold leading-[1.12] text-ink sm:text-[42px]">
              Teams shipping data pipelines in days
            </h2>
          </div>
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-accent-foreground hover:underline"
          >
            See all stories <ArrowUpRight className="size-4" />
          </a>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {CASES.map((c, i) => (
          <Reveal key={c.company} delay={i * 90}>
            <article className="flex h-full flex-col rounded-3xl border border-hairline bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {c.company}
              </span>
              <span className="mt-4 font-display text-3xl font-semibold text-brand">{c.metric}</span>
              <h3 className="mt-4 text-[16.5px] font-semibold leading-snug text-ink">{c.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{c.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Testimonials() {
  return (
    <Section className="pt-4">
      <div className="grid gap-4 md:grid-cols-3">
        {QUOTES.map((q, i) => (
          <Reveal key={q.name} delay={i * 90}>
            <figure className="flex h-full flex-col justify-between rounded-3xl border border-hairline bg-surface p-6">
              <Quote className="size-5 text-brand-soft" />
              <blockquote className="mt-4 text-[15.5px] leading-relaxed text-ink">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-brand-tint text-[12px] font-semibold text-accent-foreground">
                  {q.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-ink">{q.name}</span>
                  <span className="block text-[12.5px] text-muted-foreground">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
