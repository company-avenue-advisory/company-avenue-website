"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Check, X, ArrowRight, Minus } from "lucide-react";
import Link from "next/link";

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: "teamSize",
    question: "How many founders / partners?",
    options: [
      { value: "1", label: "Just me (1 person)" },
      { value: "2-5", label: "Small team (2–5)" },
      { value: "6+", label: "Larger team (6+)" },
    ],
  },
  {
    id: "funding",
    question: "Do you plan to raise external funding (VC / Angels)?",
    options: [
      { value: "yes", label: "Yes, definitely" },
      { value: "maybe", label: "Maybe in future" },
      { value: "no", label: "No, self-funded" },
    ],
  },
  {
    id: "taxNeeds",
    question: "What matters more for tax?",
    options: [
      { value: "lower_compliance", label: "Lower compliance burden" },
      { value: "tax_efficiency", label: "Better tax efficiency" },
      { value: "dont_know", label: "Not sure yet" },
    ],
  },
  {
    id: "liability",
    question: "Liability preference?",
    options: [
      { value: "limited", label: "Full limited liability (protect personal assets)" },
      { value: "flexible", label: "Flexible — some liability is okay" },
    ],
  },
  {
    id: "esop",
    question: "Do you plan to issue ESOPs to employees?",
    options: [
      { value: "yes", label: "Yes, for talent retention" },
      { value: "no", label: "No, not needed" },
    ],
  },
];

// Comparison matrix
const COMPARISON = [
  { feature: "Minimum Members", pvt: "2 Directors + 2 Shareholders", llp: "2 Designated Partners" },
  { feature: "Registration Cost", pvt: "~₹10,000–20,000", llp: "~₹6,000–10,000" },
  { feature: "Authorized Capital", pvt: "Required (min ₹1 lakh)", llp: "Not required" },
  { feature: "Annual Compliance", pvt: "ROC forms, Board meetings, MGT-7, AOC-4", llp: "Form 8 & 11 (simpler)" },
  { feature: "Compliance Cost", pvt: "Higher (₹15K–30K/yr)", llp: "Lower (₹5K–10K/yr)" },
  { feature: "Audit Requirement", pvt: "Mandatory always", llp: "Only if turnover > ₹40L or contribution > ₹25L" },
  { feature: "Venture Capital Funding", pvt: "✓ Supported (equity model)", llp: "✗ Not preferred by VCs" },
  { feature: "ESOPs to Employees", pvt: "✓ Possible via ESOP scheme", llp: "✗ Not possible" },
  { feature: "Foreign Investment (FDI)", pvt: "✓ Under automatic route", llp: "Limited (govt route)" },
  { feature: "Profit Distribution", pvt: "Only as dividends (DDT applicable)", llp: "Flexible — no DDT on distributed profit" },
  { feature: "Tax Rate (base)", pvt: "25% (turnover ≤ ₹400Cr)", llp: "30% flat" },
  { feature: "Partners' Remuneration", pvt: "Salary to directors (deductible)", llp: "Remuneration to partners (capped, deductible)" },
  { feature: "Perpetual Existence", pvt: "✓ Yes", llp: "✓ Yes" },
  { feature: "Convertibility", pvt: "Can convert to LLP", llp: "Can convert to Pvt Ltd" },
  { feature: "Brand Perception", pvt: "Higher — more credible with clients/banks", llp: "Moderate" },
];

type Answers = Record<string, string>;

function getRecommendation(answers: Answers): {
  winner: "pvt" | "llp" | "both";
  reasons: string[];
  caveats: string[];
} {
  let pvtScore = 0;
  let llpScore = 0;
  const reasons: string[] = [];
  const caveats: string[] = [];

  if (answers.funding === "yes") {
    pvtScore += 3;
    reasons.push("VCs prefer Private Limited companies for equity investment.");
  } else if (answers.funding === "no") {
    llpScore += 2;
    reasons.push("Without external funding, LLP's lower compliance cost is ideal.");
  }

  if (answers.esop === "yes") {
    pvtScore += 2;
    reasons.push("ESOPs can only be issued by companies, not LLPs.");
  }

  if (answers.teamSize === "1") {
    pvtScore += 1;
    caveats.push("With 1 person, consider OPC (One Person Company) too.");
  }

  if (answers.taxNeeds === "lower_compliance") {
    llpScore += 2;
    reasons.push("LLP has significantly lower annual compliance burden.");
  } else if (answers.taxNeeds === "tax_efficiency") {
    llpScore += 1;
    reasons.push("LLP profits distributed to partners avoid dividend distribution tax.");
  }

  if (answers.liability === "limited") {
    pvtScore += 1;
    llpScore += 1;
    reasons.push("Both structures offer limited liability protection to owners.");
  }

  if (pvtScore > llpScore + 1) {
    return { winner: "pvt", reasons, caveats };
  } else if (llpScore > pvtScore + 1) {
    return { winner: "llp", reasons, caveats };
  }
  return { winner: "both", reasons, caveats };
}

export function LLPvsPvtLtdTool() {
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<"quiz" | "compare">("quiz");

  const allAnswered = QUESTIONS.every((q) => answers[q.id]);
  const rec = allAnswered ? getRecommendation(answers) : null;

  function reset() {
    setAnswers({});
    setShowResult(false);
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit">
        {[
          { key: "quiz", label: "Recommendation Quiz" },
          { key: "compare", label: "Full Comparison Table" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "quiz" | "compare")}
            className={`px-5 py-2 rounded-lg text-sm font-heading font-semibold transition-all ${
              activeTab === tab.key
                ? "bg-white text-primary shadow-sm"
                : "text-slate-500 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "quiz" ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Questions */}
            <div className="space-y-5">
              {QUESTIONS.map((q, i) => (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-card p-5"
                >
                  <p className="text-sm font-heading font-semibold text-dark mb-3">
                    <span className="text-accent mr-2">{i + 1}.</span>
                    {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))
                        }
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                          answers[q.id] === opt.value
                            ? "bg-primary text-white font-heading font-semibold"
                            : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-primary/30 hover:text-primary font-body"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowResult(true)}
                  disabled={!allAnswered}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Scale size={15} /> Get Recommendation
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-colors text-sm font-heading font-semibold"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Result */}
            <div>
              <AnimatePresence mode="wait">
                {!showResult || !rec ? (
                  <motion.div
                    key="pending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-card p-8 flex flex-col items-center justify-center text-center min-h-[400px]"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/6 flex items-center justify-center mb-4">
                      <Scale size={28} className="text-primary/30" />
                    </div>
                    <p className="text-slate-500 font-heading font-medium text-sm">
                      Answer all questions to see your recommendation
                    </p>
                    <p className="text-slate-400 text-xs mt-1">
                      {QUESTIONS.filter((q) => answers[q.id]).length}/{QUESTIONS.length} answered
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-4"
                  >
                    {/* Winner */}
                    <div className="bg-primary rounded-2xl p-6 text-center">
                      <p className="text-white/60 text-xs font-heading font-semibold uppercase tracking-widest mb-2">
                        Our Recommendation
                      </p>
                      <p className="text-white font-heading font-bold text-2xl mb-1">
                        {rec.winner === "pvt"
                          ? "Private Limited Company"
                          : rec.winner === "llp"
                          ? "LLP (Limited Liability Partnership)"
                          : "Either works for you"}
                      </p>
                      <p className="text-white/50 text-xs">
                        Based on your business profile
                      </p>
                    </div>

                    {/* Reasons */}
                    {rec.reasons.length > 0 && (
                      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                        <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest mb-3">
                          Why this recommendation
                        </p>
                        <ul className="space-y-2">
                          {rec.reasons.map((r, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                <Check size={10} className="text-green-600" />
                              </div>
                              <span className="text-sm text-slate-600">{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Caveats */}
                    {rec.caveats.length > 0 && (
                      <div className="bg-accent/6 rounded-xl border border-accent/10 p-4">
                        <p className="text-[10px] font-heading font-bold text-accent uppercase tracking-widest mb-2">
                          Also consider
                        </p>
                        {rec.caveats.map((c, i) => (
                          <p key={i} className="text-xs text-slate-600">
                            {c}
                          </p>
                        ))}
                      </div>
                    )}

                    <Link
                      href={rec.winner === "llp" ? "/services/llp-registration" : "/services/private-limited-company"}
                      className="flex items-center justify-between w-full px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors group"
                    >
                      <span className="text-sm font-heading font-semibold text-primary">
                        Register your{" "}
                        {rec.winner === "llp" ? "LLP" : "Pvt Ltd"} now
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-accent group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="compare"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden"
          >
            {/* Header */}
            <div className="grid grid-cols-3 bg-primary text-white">
              <div className="px-5 py-4 font-heading font-semibold text-sm text-white/60">
                Feature
              </div>
              <div className="px-5 py-4 font-heading font-bold text-sm text-center border-l border-white/10">
                Private Limited
              </div>
              <div className="px-5 py-4 font-heading font-bold text-sm text-center border-l border-white/10">
                LLP
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {COMPARISON.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                >
                  <div className="px-5 py-3.5 text-sm font-heading font-medium text-dark">
                    {row.feature}
                  </div>
                  <div className="px-5 py-3.5 text-sm text-slate-600 text-center border-l border-slate-100">
                    <CellContent value={row.pvt} />
                  </div>
                  <div className="px-5 py-3.5 text-sm text-slate-600 text-center border-l border-slate-100">
                    <CellContent value={row.llp} />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <Link
                href="/services/private-limited-company"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors"
              >
                Register Pvt Ltd <ArrowRight size={14} />
              </Link>
              <Link
                href="/services/llp-registration"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-primary text-primary text-sm font-heading font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors"
              >
                Register LLP <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CellContent({ value }: { value: string }) {
  if (value.startsWith("✓")) {
    return (
      <span className="inline-flex items-center gap-1 text-green-600 font-heading font-semibold text-xs">
        <Check size={12} /> {value.slice(2)}
      </span>
    );
  }
  if (value.startsWith("✗")) {
    return (
      <span className="inline-flex items-center gap-1 text-red-500 font-heading font-semibold text-xs">
        <X size={12} /> {value.slice(2)}
      </span>
    );
  }
  if (value === "N/A") {
    return <Minus size={14} className="text-slate-300 mx-auto" />;
  }
  return <span>{value}</span>;
}
