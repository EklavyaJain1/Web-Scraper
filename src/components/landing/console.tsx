import {
  Activity,
  Bot,
  Briefcase,
  Building2,
  CircleDot,
  Cpu,
  Globe,
  Newspaper,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { Eyebrow, Reveal, Section } from "./primitives";

const TARGETS = [
  { group: "Portfolio", items: ["Aurelia Grand", "Maison Lume", "The Verano"] },
  { group: "Watchlist", items: ["Cove & Ember", "Hotel Selvage"] },
];

const RUN_LOG = [
  { icon: Tag, text: "Reading public rate card — 42 room types" },
  { icon: Briefcase, text: "Parsing public careers board — 18 open roles" },
  { icon: Newspaper, text: "Indexing press releases — 6 since April" },
  { icon: Cpu, text: "Gemini synthesis — cross-signal reasoning" },
];

const SIGNALS = [
  { signal: "Median ADR", value: "€412", delta: "+10.4%", trend: "up" },
  { signal: "Culinary hires", value: "5 roles", delta: "3 chefs de partie", trend: "up" },
  { signal: "F&B mentions", value: "9 press", delta: "3x since Jan", trend: "up" },
  { signal: "Spa inventory", value: "unchanged", delta: "flat", trend: "flat" },
];

export function Console() {
  return (
    <Section id="console" className="py-16 md:py-24">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Intelligence workspace</Eyebrow>
          <h2 className="mt-5 text-[34px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[46px]">
            Complete context on every competitor.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
            Public pricing, public hiring and public announcements flow into one brain — and come
            back out as a prediction your revenue team can act on this week.
          </p>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-10 overflow-hidden rounded-[26px] border border-hairline bg-card shadow-lift">
          <div className="flex items-center gap-2 border-b border-hairline bg-surface px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-surface-2" />
            <span className="size-2.5 rounded-full bg-surface-2" />
            <span className="size-2.5 rounded-full bg-surface-2" />
            <span className="ml-2 truncate text-[12px] text-muted-foreground">
              aurelia-grand · competitive-intelligence
            </span>
          </div>

          <div className="grid lg:grid-cols-[210px_minmax(0,1fr)_260px]">
            <aside className="border-b border-hairline bg-surface p-3 lg:border-b-0 lg:border-r">
              {TARGETS.map((g) => (
                <div key={g.group} className="mb-4">
                  <p className="px-2 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {g.group}
                  </p>
                  {g.items.map((item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] font-medium ${
                        i === 0 && g.group === "Portfolio"
                          ? "bg-card text-ink shadow-soft"
                          : "text-ink-soft"
                      }`}
                    >
                      <Building2 className="size-3.5 shrink-0 text-brand" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </aside>

            <div className="min-w-0 border-b border-hairline p-5 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-tint text-brand">
                  <Bot className="size-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[17px] font-bold tracking-tight text-ink">
                    Strategy Analyst Agent
                  </p>
                  <p className="truncate text-[12.5px] text-muted-foreground">
                    Gemini 2.5 Pro · public sources only
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-hairline bg-surface p-3 text-[13.5px] text-ink">
                What is Aurelia Grand preparing for Q4?
              </div>

              <ul className="mt-4 space-y-2">
                {RUN_LOG.map((r) => (
                  <li
                    key={r.text}
                    className="flex items-center gap-2 text-[13px] text-ink-soft"
                  >
                    <r.icon className="size-3.5 shrink-0 text-brand" />
                    <span className="truncate">{r.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 overflow-hidden rounded-xl border border-hairline">
                <table className="w-full text-left text-[12.5px]">
                  <thead className="bg-surface text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Signal</th>
                      <th className="px-3 py-2 font-semibold">Value</th>
                      <th className="px-3 py-2 font-semibold">Movement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIGNALS.map((s) => (
                      <tr key={s.signal} className="border-t border-hairline">
                        <td className="px-3 py-2 font-medium text-ink">{s.signal}</td>
                        <td className="px-3 py-2 text-ink-soft">{s.value}</td>
                        <td
                          className={`px-3 py-2 ${s.trend === "up" ? "text-brand" : "text-muted-foreground"}`}
                        >
                          {s.delta}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 rounded-xl border border-brand/30 bg-brand-tint p-3.5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-accent-foreground">
                  Predicted move
                </p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink">
                  Aurelia Grand is repositioning toward a fine-dining led experience — five culinary
                  hires plus a 10.4% rate lift point to a restaurant relaunch before December.
                </p>
              </div>
            </div>

            <aside className="p-4">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Sources
              </p>
              <div className="mt-2 space-y-1.5">
                {[
                  { icon: Tag, label: "Public pricing page" },
                  { icon: Briefcase, label: "Public careers board" },
                  { icon: Newspaper, label: "Press releases" },
                  { icon: Globe, label: "Sitemap discovery" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-2 rounded-lg border border-hairline bg-surface px-2.5 py-2 text-[12.5px] text-ink"
                  >
                    <s.icon className="size-3.5 shrink-0 text-brand" />
                    <span className="truncate">{s.label}</span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Collection health
              </p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2 rounded-lg border border-hairline px-2.5 py-2 text-[12.5px] text-ink">
                  <ShieldCheck className="size-3.5 shrink-0 text-brand" />
                  <span className="truncate">Compliant sources only</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-hairline px-2.5 py-2 text-[12.5px] text-ink">
                  <CircleDot className="size-3.5 shrink-0 animate-pulse text-chart-1" />
                  <span className="truncate">Self-healing selectors</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-hairline px-2.5 py-2 text-[12.5px] text-ink">
                  <Activity className="size-3.5 shrink-0 text-brand" />
                  <span className="truncate">Last run 12m ago</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
