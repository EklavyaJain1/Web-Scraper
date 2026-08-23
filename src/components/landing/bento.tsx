"use client";

import { Braces, Clock, Shield, Zap, Boxes, LineChart } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./primitives";
import { TiltCard } from "@/components/ui/tilt-card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CARDS = [
  {
    icon: Shield,
    title: "Self-Healing Selectors",
    body: "When a website changes its HTML, Bright Data AI automatically repairs broken CSS selectors.",
  },
  {
    icon: Clock,
    title: "Bright Data CLI",
    body: "Entire workflow runs from the terminal — bdata scraper create, run, heal, approve.",
  },
  {
    icon: Braces,
    title: "AI Analysis",
    body: "Gemini AI processes scraped content and extracts strategic insights, not just raw data.",
  },
  {
    icon: Zap,
    title: "Zero Maintenance",
    body: "Scrapers adapt to website redesigns automatically — no manual selector updates needed.",
  },
  {
    icon: Boxes,
    title: "Live Dashboard",
    body: "Visual pipeline with real-time status, alerts, and raw scrape preview.",
  },
  {
    icon: LineChart,
    title: "Open Source",
    body: "Fully open source hackathon submission — clone, configure, and run in minutes.",
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

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 perspective-[1000px]">
        {CARDS.map((c, i) => {
          return (
            <div key={c.title}>
              <Reveal delay={i * 70}>
                <TiltCard>
                  <article className="group h-full rounded-2xl border border-hairline bg-card p-6 transition-all hover:-translate-y-2 hover:border-brand/40 shadow-soft hover:shadow-lift bg-gradient-to-br from-card to-card hover:from-surface hover:to-card">
                    <span className="grid size-10 place-items-center rounded-xl border border-hairline bg-surface text-brand transition-colors group-hover:bg-brand-tint group-hover:shadow-[0_0_15px_rgba(74,100,200,0.4)]">
                      <c.icon className="size-5" />
                    </span>
                    <h3 className="mt-5 text-[17px] font-bold tracking-tight text-ink">{c.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{c.body}</p>
                  </article>
                </TiltCard>
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
