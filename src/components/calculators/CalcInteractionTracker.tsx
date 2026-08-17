"use client";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/gtag";

/**
 * Wraps a calculator widget and fires two dataLayer events, at most once each
 * per page visit:
 *
 *   calculator_used      first interaction (input, change or click inside the
 *                        widget). Pre-existing event, kept so the current GTM
 *                        container and its historical reports keep working.
 *
 *   calculator_complete  the visitor reached a RESULT — the event WS-3.2
 *                        specifies, with the `calculator_name` parameter.
 *
 * ── HOW COMPLETION IS DETECTED ────────────────────────────────────────────
 * These calculators compute live as you type; there is no "Calculate" button
 * to hang an event on. So the tracker watches its own subtree for an element
 * marked `data-calc-result` that has actual text in it (the shared HeroResult
 * component carries the attribute, as do the bespoke result panels).
 *
 * Completion is only reported AFTER a first interaction. Several calculators
 * render a result from their default state on mount, and counting that would
 * turn `calculator_complete` into a second pageview metric — it would report
 * 100% completion and measure nothing.
 */
export function CalcInteractionTracker({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);
  const completed = useRef(false);

  const onFirst = () => {
    if (interacted.current) return;
    interacted.current = true;
    trackEvent("calculator_used", { calculator: name });
    // Some widgets render their result synchronously with the interaction that
    // produced it, so check immediately as well as on the next mutation.
    checkComplete();
  };

  const checkComplete = () => {
    if (completed.current || !interacted.current) return;
    const root = rootRef.current;
    if (!root) return;

    const hasResult = Array.from(
      root.querySelectorAll<HTMLElement>("[data-calc-result]")
    ).some((el) => (el.textContent ?? "").trim().length > 0);

    if (!hasResult) return;
    completed.current = true;
    trackEvent("calculator_complete", { calculator_name: name });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new MutationObserver(() => checkComplete());
    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
    });
    return () => observer.disconnect();
    // `name` is stable per page; the refs guard against duplicate events.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      onInputCapture={onFirst}
      onChangeCapture={onFirst}
      onClickCapture={onFirst}
    >
      {children}
    </div>
  );
}
