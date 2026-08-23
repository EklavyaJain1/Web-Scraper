import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./primitives";
import { cn } from "@/lib/utils";

import { Button3D } from "@/components/ui/button-3d";

const NAV: any[] = [];

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
        "sticky top-0 z-50 transition-colors duration-300 bg-background/60 backdrop-blur-xl relative",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-hairline text-ink"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2">
          <a href="#top" aria-label="Web Miner home" className="min-w-0">
            <Logo />
          </a>
        </div>

        <nav className="hidden items-center gap-4 md:flex">
          {NAV.map((item, idx) => (
            <Button3D
              key={item.label}
              as="a"
              href={item.href}
              variant={idx === 0 ? "secondary" : "primary"}
              size="sm"
            >
              {item.label}
            </Button3D>
          ))}
        </nav>
      </div>

      {open && (
        <div className="border-t border-hairline bg-background px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV.map((item, idx) => (
              <Button3D
                key={item.label}
                as="a"
                href={item.href}
                onClick={() => setOpen(false)}
                variant={idx === 0 ? "secondary" : "primary"}
                className="w-full"
              >
                {item.label}
              </Button3D>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
