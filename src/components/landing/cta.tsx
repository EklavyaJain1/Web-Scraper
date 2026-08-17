import { ArrowRight } from "lucide-react";
import { Reveal } from "./primitives";

export function FinalCta() {
  return (
    <section id="cta" className="relative overflow-hidden px-5 py-20 sm:px-8 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-brand-tint" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] glow-brand" />
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-50" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="text-[36px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[54px]">
            Ready to put your data on autopilot?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-soft">
            Start free with 1,000 page credits. No credit card, no infrastructure to babysit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15px] font-semibold text-brand-foreground shadow-lift transition-transform hover:-translate-y-0.5"
            >
              Get Started Free <ArrowRight className="size-4" />
            </a>
            <a
              href="#product"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-7 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-surface-2"
            >
              Talk to sales
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
