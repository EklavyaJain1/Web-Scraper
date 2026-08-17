import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./primitives";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Product", href: "#product" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#faq" },
];

export function AnnouncementBar() {
  return (
    <div className="relative z-50 border-b border-hairline bg-brand-tint">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-5 py-2 text-center text-[13px] text-ink-soft">
        <span className="hidden size-1.5 rounded-full bg-brand sm:inline-block animate-pulse-soft" />
        <span>Web Miner raised a $50M Series B to build the web data layer</span>
        <a
          href="#product"
          className="inline-flex items-center gap-1 font-semibold text-accent-foreground underline-offset-4 hover:underline"
        >
          Learn more <ArrowRight className="size-3.5" />
        </a>
      </div>
    </div>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-hairline bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-background/0",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <a href="#top" aria-label="Web Miner home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#cta"
            className="rounded-full border border-hairline px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:bg-surface-2"
          >
            Book a demo
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 rounded-full gradient-brand px-4 py-2 text-[14px] font-semibold text-brand-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Get started <ArrowRight className="size-3.5" />
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid size-9 place-items-center rounded-full border border-hairline text-ink md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-hairline bg-background px-5 py-4 md:hidden">
          <div className="flex flex-col">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-surface-2 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full gradient-brand px-4 py-2.5 text-center text-[15px] font-semibold text-brand-foreground"
            >
              Get started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
