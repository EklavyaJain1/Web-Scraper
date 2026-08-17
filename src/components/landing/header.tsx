import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./primitives";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Product", href: "#product" },
  { label: "Workspace", href: "#console" },
  { label: "Pricing", href: "#pricing" },
  { label: "Live Demo", href: "/dashboard" },
];

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
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-hairline bg-background/85 backdrop-blur-xl" : "border-transparent",
      )}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:px-8 md:grid-cols-3">
        <a href="#top" aria-label="Web Miner home" className="min-w-0">
          <Logo />
        </a>

        <nav className="hidden items-center justify-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-2 md:flex">
          <a
            href="#cta"
            className="rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
          >
            Sign in
          </a>
          <a
            href="#cta"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid size-9 shrink-0 place-items-center rounded-full border border-hairline text-ink md:hidden"
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
              className="mt-3 rounded-full bg-brand px-4 py-2.5 text-center text-[15px] font-semibold text-brand-foreground"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
