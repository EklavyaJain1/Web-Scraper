"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Typewriter({
  text,
  delay = 0,
  speed = 40,
  className = "",
  cursor = true,
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  cursor?: boolean;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setFinished(true);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, started]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && (!finished || started) && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[0.5em] h-[1em] bg-current ml-0.5 align-middle"
        />
      )}
    </span>
  );
}
