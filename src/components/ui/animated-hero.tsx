import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button3D } from "@/components/ui/button-3d";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["AI", "scale", "confidence", "precision", "Bright Data"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-6 py-6 md:py-10 items-center justify-center flex-col text-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-3.5 py-1.5 text-[12px] font-medium text-ink-soft shadow-soft">
              <Sparkles className="size-3.5 text-brand" />
              New — AI extraction agents
            </span>
          </div>
          
          <div className="flex gap-4 flex-col">
            <h1 className="text-[42px] sm:text-6xl md:text-[70px] max-w-4xl tracking-tighter text-center font-extrabold leading-[1.02] text-ink">
              <span className="text-ink">Automate your scraping workflows with</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 text-brand">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-extrabold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-[16px] leading-relaxed text-ink-soft sm:text-[17px]">
              <span className="font-extrabold text-xl text-ink">Web Miner</span> is a self-healing web scraper that automatically repairs broken selectors
              when websites change their layout.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Button3D
              as="a"
              href="/dashboard"
              variant="primary"
              size="lg"
            >
              Try the Demo <ArrowRight className="size-4 ml-2" />
            </Button3D>
            <Button3D
              as="a"
              href="https://github.com/EklavyaJain1/gumloop-reimagined"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              View Source
            </Button3D>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
