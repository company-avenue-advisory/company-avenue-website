"use client";
import { useState } from "react";
import Link from "next/link";
import { CalendarCheck, ArrowRight, X, RotateCcw } from "lucide-react";
import type { SchemeLink } from "@/lib/schemes-taxonomy";

type Answer = "yes" | "no" | "unsure";
const OPTIONS: { key: Answer; label: string }[] = [
  { key: "yes", label: "Yes" },
  { key: "no", label: "No" },
  { key: "unsure", label: "Not sure" },
];

/**
 * Replaces a bare "book a call" link with a 20-second self-check against the
 * scheme's own (already-verified) eligibility bullets — no new criteria are
 * authored here, so there is no fresh statutory claim to get wrong. The
 * result reuses scheme.caaServices, the same priced links already curated
 * per scheme for the "How CAA helps" section below.
 */
export function EligibilityCheck({
  eligibility,
  caaServices,
}: {
  eligibility: string[];
  caaServices?: SchemeLink[];
}) {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Partial<Record<number, Answer>>>({});
  const [showResult, setShowResult] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-dark text-primary-900 hover:text-white text-sm font-heading font-bold rounded-xl transition-colors"
      >
        <CalendarCheck size={15} /> Check My Eligibility — Free
      </button>
    );
  }

  const allAnswered = eligibility.every((_, i) => answers[i]);
  const noCount = Object.values(answers).filter((a) => a === "no").length;
  const unsureCount = Object.values(answers).filter((a) => a === "unsure").length;

  const close = () => {
    setOpen(false);
    setAnswers({});
    setShowResult(false);
  };

  return (
    <div className="w-full rounded-2xl bg-white/[0.06] border border-white/10 p-5 sm:p-6 relative">
      <button
        onClick={close}
        aria-label="Close eligibility check"
        className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
      >
        <X size={16} />
      </button>

      {!showResult ? (
        <>
          <p className="text-white/40 text-[11px] font-heading font-bold uppercase tracking-widest mb-4 pr-6">
            Answer honestly — 20 seconds, no sign-up
          </p>
          <div className="space-y-4">
            {eligibility.map((e, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0"
              >
                <p className="text-white text-sm leading-snug flex-1">{e}</p>
                <div className="flex gap-1.5 shrink-0">
                  {OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setAnswers((prev) => ({ ...prev, [i]: opt.key }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors ${
                        answers[i] === opt.key
                          ? opt.key === "yes"
                            ? "bg-green-500 text-white"
                            : opt.key === "no"
                              ? "bg-rose-500 text-white"
                              : "bg-white/25 text-white"
                          : "bg-white/[0.06] text-white/50 hover:bg-white/10"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            disabled={!allAnswered}
            onClick={() => setShowResult(true)}
            className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-dark disabled:opacity-30 disabled:cursor-not-allowed text-primary-900 hover:text-white text-sm font-heading font-bold rounded-xl transition-colors"
          >
            See My Result <ArrowRight size={14} />
          </button>
        </>
      ) : (
        <div className="pr-6">
          {noCount === 0 && unsureCount === 0 ? (
            <>
              <p className="text-white font-heading font-bold text-base mb-2">
                You look eligible on paper
              </p>
              <p className="text-white/55 text-sm leading-relaxed mb-5">
                You said yes to every criterion here. This self-check is not a sanction guarantee —
                the next step is a free 30-minute screen where we verify it properly and start the
                application.
              </p>
            </>
          ) : noCount > 0 ? (
            <>
              <p className="text-white font-heading font-bold text-base mb-2">
                {noCount} of {eligibility.length} criteria not met yet
              </p>
              <p className="text-white/55 text-sm leading-relaxed mb-4">
                That&apos;s usually one or two things to sort first. For this scheme, that&apos;s
                typically:
              </p>
              {caaServices && caaServices.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {caaServices.map((s) => (
                    <Link
                      key={s.href + s.label}
                      href={s.href}
                      className="inline-flex items-center gap-1.5 text-[12px] font-heading font-medium text-white/80 bg-white/[0.08] border border-white/10 hover:border-accent/40 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {s.label} <ArrowRight size={11} className="text-accent" />
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-white font-heading font-bold text-base mb-2">
                A few things worth confirming
              </p>
              <p className="text-white/55 text-sm leading-relaxed mb-5">
                You weren&apos;t sure about {unsureCount} of {eligibility.length} criteria — exactly
                what a free eligibility screen is for.
              </p>
            </>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-dark text-primary-900 hover:text-white text-sm font-heading font-bold rounded-xl transition-colors"
            >
              <CalendarCheck size={15} /> Book Free Eligibility Screen
            </Link>
            <button
              onClick={() => {
                setAnswers({});
                setShowResult(false);
              }}
              className="inline-flex items-center gap-1.5 text-white/45 hover:text-white text-xs font-heading font-semibold transition-colors"
            >
              <RotateCcw size={12} /> Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
