"use client";
import { useRef } from "react";
import { trackEvent } from "@/lib/gtag";

/**
 * Wraps a calculator widget and fires a single `calculator_used` dataLayer event
 * the first time the visitor interacts with it (input, change or click inside
 * the widget) — i.e. when a calculation is actually performed, not on page view.
 * Task 2.2 / Section J. One event per page visit.
 */
export function CalcInteractionTracker({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const fired = useRef(false);
  const onFirst = () => {
    if (fired.current) return;
    fired.current = true;
    trackEvent("calculator_used", { calculator: name });
  };
  return (
    <div onInputCapture={onFirst} onChangeCapture={onFirst} onClickCapture={onFirst}>
      {children}
    </div>
  );
}
