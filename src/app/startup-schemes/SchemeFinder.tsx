"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, RotateCcw, Check, Compass, CalendarCheck } from "lucide-react";
import type { SchemeSummary } from "@/lib/schemes-taxonomy";
import type { TreeQuestion } from "@/lib/schemes";
import { SupportChip, shortName } from "@/components/schemes/scheme-ui";

/**
 * The playbook's five-question decision tree, rebuilt as a stepper.
 * Each answered branch contributes scheme slugs; the results are the union,
 * ranked by how many branches independently recommended each scheme.
 */
export function SchemeFinder({
  questions,
  schemes,
}: {
  questions: TreeQuestion[];
  schemes: SchemeSummary[];
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => questions.map(() => null)
  );

  const done = step >= questions.length;
  const answeredCount = answers.filter((a) => a !== null).length;

  const results = useMemo<SchemeSummary[]>(() => {
    const score = new Map<string, number>();
    answers.forEach((choice, qi) => {
      if (choice === null) return;
      const opt = questions[qi].options[choice];
      opt.schemes.forEach((slug) => score.set(slug, (score.get(slug) ?? 0) + 1));
    });
    return [...score.entries()]
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        const sa = schemes.find((s) => s.slug === a[0]);
        const sb = schemes.find((s) => s.slug === b[0]);
        const fa = sa?.focus === "Startup-Specific" ? 1 : 0;
        const fb = sb?.focus === "Startup-Specific" ? 1 : 0;
        return fb - fa;
      })
      .map(([slug]) => schemes.find((s) => s.slug === slug))
      .filter((s): s is SchemeSummary => Boolean(s))
      .slice(0, 8);
  }, [answers, questions, schemes]);

  const choose = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = optionIndex;
      return next;
    });
    setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers(questions.map(() => null));
    setStep(0);
  };

  const q = questions[Math.min(step, questions.length - 1)];

  return (
    <div className="rounded-3xl bg-gradient-to-br from-dark to-primary-900 p-6 md:p-10 relative overflow-hidden">
      {/* Subtle dot grid, same treatment as the site CTA banner */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent/[0.07] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
          <div>
            <span className="inline-flex items-center gap-2 text-accent text-[11px] font-heading font-bold tracking-widest uppercase mb-2">
              <Compass size={13} /> Scheme Finder
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white leading-tight">
              Find your scheme in 5 questions
            </h2>
            <p className="text-white/45 text-sm mt-2 max-w-lg">
              No sign-up, no email gate. Answer honestly — the point is to rule schemes out as
              much as to rule them in.
            </p>
          </div>

          {(answeredCount > 0 || done) && (
            <button
              onClick={reset}
              className="self-start inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-heading font-semibold px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
            >
              <RotateCcw size={12} /> Start over
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="flex items-center gap-1.5 mb-7">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                answers[i] !== null ? "bg-accent" : i === step ? "bg-white/35" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
            >
              <p className="text-white/35 text-[11px] font-heading font-bold uppercase tracking-widest mb-2">
                Question {step + 1} of {questions.length}
              </p>
              <h3 className="font-heading font-bold text-white text-lg md:text-xl mb-1.5">
                {q.question}
              </h3>
              {q.helper && <p className="text-white/40 text-sm mb-5">{q.helper}</p>}

              <div className="grid sm:grid-cols-2 gap-2.5 mt-5">
                {q.options.map((opt, i) => (
                  <button
                    key={opt.label}
                    onClick={() => choose(i)}
                    className="group text-left bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-accent/40 rounded-xl px-4 py-3.5 transition-all"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block font-heading font-semibold text-white text-sm leading-snug">
                          {opt.label}
                        </span>
                        {opt.hint && (
                          <span className="block text-white/40 text-xs mt-0.5 leading-snug">
                            {opt.hint}
                          </span>
                        )}
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5"
                      />
                    </span>
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-5 inline-flex items-center gap-1.5 text-white/45 hover:text-white text-xs font-heading font-semibold transition-colors"
                >
                  <ArrowLeft size={12} /> Previous question
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <Check size={13} className="text-primary-900" strokeWidth={3} />
                </span>
                <h3 className="font-heading font-bold text-white text-lg md:text-xl">
                  {results.length} schemes worth your time
                </h3>
              </div>
              <p className="text-white/40 text-sm mb-6">
                Ranked by how many of your answers pointed to each one. This is a shortlist, not an
                eligibility ruling — the fine print on entity age, prior funding and shareholding
                decides the rest.
              </p>

              <div className="grid sm:grid-cols-2 gap-2.5">
                {results.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/startup-schemes/${s.slug}`}
                    className="group bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-accent/40 rounded-xl p-4 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <SupportChip support={s.support} dark size="xs" />
                      <ArrowRight
                        size={13}
                        className="text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5"
                      />
                    </div>
                    <p className="font-heading font-semibold text-white text-sm leading-snug">
                      {s.abbr ?? shortName(s)}
                    </p>
                    <p className="text-accent/90 text-xs font-heading font-medium mt-1 leading-snug">
                      {s.amount}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white/[0.05] border border-white/10 rounded-2xl p-4">
                <p className="text-white/60 text-sm flex-1 leading-relaxed">
                  <strong className="text-white font-heading font-semibold">Next step:</strong>{" "}
                  a free 30-minute eligibility screen. We check entity age, DPIIT status, prior
                  government funding and shareholding against each of these — and tell you which
                  ones you cannot win.
                </p>
                <Link
                  href="/contact"
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-dark text-primary-900 hover:text-white text-sm font-heading font-bold rounded-xl transition-colors"
                >
                  <CalendarCheck size={15} /> Book Free Screen
                </Link>
              </div>

              <button
                onClick={() => setStep(questions.length - 1)}
                className="mt-4 inline-flex items-center gap-1.5 text-white/45 hover:text-white text-xs font-heading font-semibold transition-colors"
              >
                <ArrowLeft size={12} /> Change my last answer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
