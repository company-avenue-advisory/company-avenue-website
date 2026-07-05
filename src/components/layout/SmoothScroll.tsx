"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Elements marked data-lenis-prevent (e.g. a scrollable modal) keep
      // native scroll behavior — Lenis otherwise intercepts wheel/touch
      // input document-wide and calling stop()/start() alone doesn't
      // release that grip on nested scrollable elements.
      prevent: (node) => node instanceof HTMLElement && !!node.closest("[data-lenis-prevent]"),
    });
    lenisRef.current = lenis;
    // Also exposed so overlays/modals can call lenis.stop()/start() to
    // pause background smooth-scrolling entirely while open.
    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
