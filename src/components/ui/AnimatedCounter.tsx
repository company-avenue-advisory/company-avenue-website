"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ value, suffix = "", duration = 2 }: AnimatedCounterProps) {
  // IMPORTANT (SEO): initialise to the real `value`, not 0. This is what the
  // server renders and what the first client render hydrates — so the real
  // number is always in the initial HTML payload that Google reads, even if JS
  // never runs. The count-up is a client-only enhancement layered on top.
  const [count, setCount] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    // Respect reduced-motion: keep the static real value, skip the animation.
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }

    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60);
    const increment = end / totalFrames;
    let frame = 0;
    setCount(0); // begin the count-up from 0 only now that we're animating on screen

    const timer = setInterval(() => {
      frame++;
      start = Math.min(start + increment, end);
      setCount(Math.floor(start));
      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
