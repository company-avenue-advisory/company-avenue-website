"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ArrowRight, ArrowLeft, Check, RefreshCw } from "lucide-react";
import Link from "next/link";

interface Step {
  id: string;
  question: string;
  hint?: string;
  options: { value: string; label: string; icon: string }[];
}

const STEPS: Step[] = [
  {
    id: "founders",
    question: "How many founders / owners will there be?",
    hint: "This determines which structures are eligible",
    options: [
      { value: "1", label: "Just me (1 person)", icon: "👤" },
      { value: "2-5", label: "2 to 5 people", icon: "👥" },
      { value: "6+", label: "More than 5", icon: "🏢" },
    ],
  },
  {
    id: "purpose",
    question: "What is the primary purpose of your business?",
    options: [
      { value: "profit", label: "Profit-driven business", icon: "💰" },
      { value: "nonprofit", label: "Social / charitable / NGO", icon: "🤝" },
      { value: "professional", label: "Professional services (CA, Doctor, etc.)", icon: "⚕️" },
    ],
  },
  {
    id: "funding",
    question: "Do you plan to raise external investment?",
    hint: "VC/Angel funding, Series A, equity investment",
    options: [
      { value: "yes", label: "Yes — planning to raise VC/Angel funding", icon: "🚀" },
      { value: "maybe", label: "Maybe in 2–3 years", icon: "🤔" },
      { value: "no", label: "No — self-funded or bootstrapped", icon: "🔒" },
    ],
  },
  {
    id: "turnover",
    question: "What is your expected annual turnover in Year 1?",
    options: [
      { value: "small", label: "Under ₹20 Lakhs", icon: "🌱" },
      { value: "medium", label: "₹20 Lakhs – ₹1 Crore", icon: "📈" },
      { value: "large", label: "Above ₹1 Crore", icon: "🏆" },
    ],
  },
  {
    id: "liability",
    question: "How important is personal asset protection?",
    hint: "Limited liability protects your personal assets from business debts",
    options: [
      { value: "critical", label: "Critical — I must protect personal assets", icon: "🛡️" },
      { value: "preferred", label: "Preferred but not essential", icon: "⚖️" },
      { value: "not_needed", label: "Not important for my case", icon: "📋" },
    ],
  },
  {
    id: "compliance",
    question: "How much ongoing compliance burden can you handle?",
    options: [
      { value: "minimal", label: "Minimal — I want the simplest structure", icon: "✅" },
      { value: "moderate", label: "Moderate is fine if benefits are good", icon: "📊" },
      { value: "high", label: "Happy to invest in compliance for credibility", icon: "🏛️" },
    ],
  },
];

interface Structure {
  name: string;
  href: string;
  tagline: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

const STRUCTURES: Record<string, Structure> = {
  pvtltd: {
    name: "Private Limited Company",
    href: "/services/private-limited-company",
    tagline: "Best for growth-oriented businesses and funded startups",
    pros: [
      "Limited liability for all shareholders",
      "Can raise VC/Angel funding easily",
      "Issue ESOPs to employees",
      "High brand credibility",
      "Perpetual existence",
    ],
    cons: [
      "Higher annual compliance cost (ROC filings, board meetings)",
      "Mandatory audit always",
      "More paperwork to set up",
    ],
    bestFor: "Startups planning VC funding, tech companies, B2B businesses needing credibility",
  },
  llp: {
    name: "LLP (Limited Liability Partnership)",
    href: "/services/llp-registration",
    tagline: "Best for professionals and service businesses",
    pros: [
      "Limited liability protection",
      "Lower annual compliance vs Pvt Ltd",
      "No mandatory audit below ₹40L turnover",
      "Flexible profit distribution",
      "No DDT on distributed profits",
    ],
    cons: [
      "VCs don't typically fund LLPs",
      "Cannot issue ESOPs",
      "FDI requires government approval",
    ],
    bestFor: "Professionals (CA firms, law firms), consultants, service businesses, small trading firms",
  },
  opc: {
    name: "One Person Company (OPC)",
    href: "/services/one-person-company",
    tagline: "Best for solo founders wanting limited liability",
    pros: [
      "Only 1 director needed",
      "Full limited liability protection",
      "Better credibility than sole proprietorship",
      "No need to share ownership",
    ],
    cons: [
      "Only 1 shareholder allowed",
      "Cannot raise VC funding directly",
      "Must convert to Pvt Ltd after ₹2Cr turnover",
    ],
    bestFor: "Solo entrepreneurs, freelancers wanting a corporate structure, single-person businesses",
  },
  partnership: {
    name: "Partnership Firm",
    href: "/services/partnership-firm",
    tagline: "Simplest multi-person structure",
    pros: [
      "Easiest and cheapest to set up",
      "Minimal compliance",
      "Flexible operations",
      "No minimum capital required",
    ],
    cons: [
      "Unlimited personal liability",
      "No perpetual existence",
      "Cannot raise equity funding",
      "Partners fully liable for business debts",
    ],
    bestFor: "Very small local businesses, family businesses, retail shops with 2–3 partners",
  },
  section8: {
    name: "Section 8 Company (NGO)",
    href: "/services/section-8-company",
    tagline: "Best for non-profit and social enterprises",
    pros: [
      "Trusted structure for charities/NGOs",
      "Tax exemptions (80G, 12A)",
      "Receive CSR funds from corporates",
      "Limited liability",
    ],
    cons: [
      "Profits cannot be distributed to members",
      "Strict regulatory requirements",
      "Higher setup complexity",
    ],
    bestFor: "Social enterprises, educational institutions, charities, foundations, welfare organizations",
  },
  soleproprietorship: {
    name: "Sole Proprietorship",
    href: "/services/sole-proprietorship",
    tagline: "Simplest structure for individual traders",
    pros: [
      "Zero registration cost (just GST/tax registration)",
      "Complete control",
      "Simplest tax filing (ITR-3 or 4)",
      "No audits for small businesses",
    ],
    cons: [
      "Unlimited personal liability",
      "No separate legal identity",
      "Cannot raise investment",
      "Dissolves on owner's death",
    ],
    bestFor: "Micro-businesses, small traders, individual freelancers, e-commerce sellers just starting out",
  },
};

type Answers = Record<string, string>;

function getRecommendation(answers: Answers): string[] {
  const { founders, purpose, funding, turnover, liability, compliance } = answers;

  if (purpose === "nonprofit") return ["section8"];
  if (founders === "1" && funding === "no" && turnover === "small") {
    if (liability === "not_needed") return ["soleproprietorship", "opc"];
    return ["opc", "soleproprietorship"];
  }
  if (founders === "1") return ["opc", "pvtltd"];
  if (funding === "yes") return ["pvtltd"];
  if (
    purpose === "professional" &&
    (funding === "no" || funding === "maybe") &&
    founders !== "1"
  ) {
    return ["llp", "pvtltd"];
  }
  if (turnover === "small" && compliance === "minimal" && liability === "not_needed") {
    return ["partnership", "llp"];
  }
  if (turnover === "small" && founders !== "1") return ["llp", "pvtltd"];
  if (compliance === "high" || funding === "maybe" || turnover === "large") return ["pvtltd", "llp"];
  return ["pvtltd", "llp"];
}

export function BusinessStructureAdvisor() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);

  function selectOption(value: string) {
    const newAnswers = { ...answers, [STEPS[step].id]: value };
    setAnswers(newAnswers);
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep(step + 1), 180);
    } else {
      setTimeout(() => setShowResult(true), 200);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  }

  const recommendations = showResult ? getRecommendation(answers) : [];
  const primary = recommendations[0] ? STRUCTURES[recommendations[0]] : null;
  const secondary = recommendations[1] ? STRUCTURES[recommendations[1]] : null;

  if (showResult && primary) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-3">
            <span className="w-6 h-px bg-accent" /> Your Recommendation <span className="w-6 h-px bg-accent" />
          </span>
          <h3 className="heading-sm text-dark">Based on your answers</h3>
        </div>

        {/* Primary recommendation */}
        <div className="bg-primary rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/[0.03] -translate-y-32 translate-x-32" />
          <div className="relative z-10">
            <span className="inline-block bg-accent text-white text-[10px] font-heading font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
              Best Match
            </span>
            <h4 className="text-white font-heading font-bold text-2xl mb-1">{primary.name}</h4>
            <p className="text-white/60 text-sm mb-5">{primary.tagline}</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-white/40 text-[10px] font-heading font-semibold uppercase tracking-widest mb-2">
                  Advantages
                </p>
                <ul className="space-y-1.5">
                  {primary.pros.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check size={12} className="text-green-400 shrink-0 mt-0.5" />
                      <span className="text-white/70 text-xs">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-white/40 text-[10px] font-heading font-semibold uppercase tracking-widest mb-2">
                  Considerations
                </p>
                <ul className="space-y-1.5">
                  {primary.cons.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="text-yellow-400 text-xs shrink-0 mt-0.5">⚠</span>
                      <span className="text-white/70 text-xs">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex-1">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-heading font-semibold mb-0.5">
                  Best for
                </p>
                <p className="text-white/70 text-xs">{primary.bestFor}</p>
              </div>
              <Link
                href={primary.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-heading font-semibold rounded-xl transition-colors shrink-0"
              >
                Get Started <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary recommendation */}
        {secondary && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
            <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest mb-3">
              Also consider
            </p>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-heading font-bold text-dark mb-1">{secondary.name}</h4>
                <p className="text-muted text-sm mb-3">{secondary.tagline}</p>
                <ul className="space-y-1">
                  {secondary.pros.slice(0, 3).map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check size={11} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-xs">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={secondary.href}
                className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors shrink-0"
              >
                Learn More <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 text-slate-600 text-sm font-heading font-semibold rounded-xl hover:border-primary hover:text-primary transition-colors"
          >
            <RefreshCw size={14} /> Start Over
          </button>
          <Link
            href="/contact"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors"
          >
            Book Free Expert Consultation <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    );
  }

  const currentStep = STEPS[step];
  const progress = ((step) / STEPS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-heading font-medium text-muted">
            Question {step + 1} of {STEPS.length}
          </span>
          <span className="text-xs font-heading font-medium text-primary">
            {Math.round(progress)}% complete
          </span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-primary/8 flex items-center justify-center">
              <Lightbulb size={16} className="text-primary" />
            </div>
            <span className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">
              Business Structure Advisor
            </span>
          </div>
          <h3 className="font-heading font-bold text-dark text-xl mb-2 mt-4">
            {currentStep.question}
          </h3>
          {currentStep.hint && (
            <p className="text-sm text-muted mb-5">{currentStep.hint}</p>
          )}

          <div className="space-y-3 mt-6">
            {currentStep.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selectOption(opt.value)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all hover:border-primary hover:bg-primary/4 group ${
                  answers[currentStep.id] === opt.value
                    ? "border-primary bg-primary/6"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <span className="text-2xl">{opt.icon}</span>
                <span
                  className={`font-heading font-semibold text-sm ${
                    answers[currentStep.id] === opt.value
                      ? "text-primary"
                      : "text-dark group-hover:text-primary"
                  }`}
                >
                  {opt.label}
                </span>
                {answers[currentStep.id] === opt.value && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check size={11} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => { if (step > 0) setStep(step - 1); }}
          disabled={step === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-heading font-semibold hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <button
          onClick={reset}
          className="text-sm text-muted hover:text-slate-700 transition-colors font-heading font-medium"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
