"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Info, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";

type CompanyType = "pvtltd" | "llp" | "opc" | "partnership" | "section8";

interface StateStampDuty {
  name: string;
  pvtltdRate: number; // % of authorized capital
  llpRate: number; // % of contribution
  min: number; // minimum stamp duty
}

const STATES: StateStampDuty[] = [
  { name: "Delhi", pvtltdRate: 0.05, llpRate: 0.05, min: 100 },
  { name: "Maharashtra", pvtltdRate: 0.15, llpRate: 0.10, min: 200 },
  { name: "Karnataka", pvtltdRate: 0.15, llpRate: 0.10, min: 200 },
  { name: "Tamil Nadu", pvtltdRate: 0.20, llpRate: 0.15, min: 200 },
  { name: "Telangana", pvtltdRate: 0.15, llpRate: 0.10, min: 200 },
  { name: "Gujarat", pvtltdRate: 0.15, llpRate: 0.10, min: 150 },
  { name: "Uttar Pradesh", pvtltdRate: 0.10, llpRate: 0.08, min: 100 },
  { name: "West Bengal", pvtltdRate: 0.10, llpRate: 0.08, min: 100 },
  { name: "Rajasthan", pvtltdRate: 0.15, llpRate: 0.10, min: 150 },
  { name: "Madhya Pradesh", pvtltdRate: 0.10, llpRate: 0.08, min: 100 },
  { name: "Haryana", pvtltdRate: 0.10, llpRate: 0.08, min: 100 },
  { name: "Punjab", pvtltdRate: 0.10, llpRate: 0.08, min: 100 },
  { name: "Kerala", pvtltdRate: 0.15, llpRate: 0.10, min: 150 },
  { name: "Andhra Pradesh", pvtltdRate: 0.15, llpRate: 0.10, min: 150 },
  { name: "Other", pvtltdRate: 0.10, llpRate: 0.08, min: 100 },
];

// ROC govt fee for Pvt Ltd (SPICe+) based on authorized capital
function calcROCFee(capital: number): number {
  if (capital <= 1_00_000) return 500;
  if (capital <= 5_00_000) return 2_000;
  if (capital <= 10_00_000) return 3_000;
  if (capital <= 25_00_000) return 4_000;
  if (capital <= 50_00_000) return 5_000;
  if (capital <= 1_00_00_000) return 10_000;
  return 20_000;
}

// LLP govt fee based on contribution
function calcLLPFee(contribution: number): number {
  if (contribution <= 1_00_000) return 500;
  if (contribution <= 5_00_000) return 2_000;
  if (contribution <= 10_00_000) return 3_000;
  return 5_000;
}

const COMPANY_TYPES: { key: CompanyType; label: string; desc: string }[] = [
  { key: "pvtltd", label: "Private Limited", desc: "Most popular, scalable" },
  { key: "llp", label: "LLP", desc: "Flexible, low compliance" },
  { key: "opc", label: "One Person Company", desc: "Solo founder entity" },
  { key: "partnership", label: "Partnership Firm", desc: "Simple, 2–20 partners" },
  { key: "section8", label: "Section 8 (NGO)", desc: "Non-profit company" },
];

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function CompanyRegistrationCalculator() {
  const [companyType, setCompanyType] = useState<CompanyType>("pvtltd");
  const [state, setState] = useState("Delhi");
  const [capital, setCapital] = useState("");
  const [directors, setDirectors] = useState("2");
  const [result, setResult] = useState<{
    rocFee: number;
    stampDuty: number;
    dscCost: number;
    nameApproval: number;
    professional: number;
    total: number;
    breakdown: { label: string; amount: number; note: string }[];
  } | null>(null);

  function calculate() {
    const cap = parseFloat(capital) || 0;
    const dir = parseInt(directors) || 2;
    const stateData = STATES.find((s) => s.name === state) || STATES[STATES.length - 1];

    let rocFee = 0;
    let stampDuty = 0;
    let nameApproval = 1000;
    let dscCost = dir * 1_500;
    let professional = 0;

    switch (companyType) {
      case "pvtltd":
        rocFee = calcROCFee(cap || 1_00_000);
        stampDuty = Math.max(
          stateData.min,
          ((cap || 1_00_000) * stateData.pvtltdRate) / 100
        );
        professional = 9_999;
        break;
      case "llp":
        rocFee = calcLLPFee(cap || 1_00_000);
        stampDuty = Math.max(
          stateData.min,
          ((cap || 1_00_000) * stateData.llpRate) / 100
        );
        professional = 5_999;
        nameApproval = 200;
        break;
      case "opc":
        rocFee = calcROCFee(cap || 1_00_000);
        stampDuty = Math.max(
          stateData.min,
          ((cap || 1_00_000) * stateData.pvtltdRate) / 100
        );
        professional = 7_999;
        dscCost = 1_500;
        break;
      case "partnership":
        rocFee = 0;
        stampDuty = 1_000;
        professional = 2_999;
        dscCost = 0;
        nameApproval = 0;
        break;
      case "section8":
        rocFee = 2_000;
        stampDuty = Math.max(
          stateData.min,
          ((cap || 1_00_000) * stateData.pvtltdRate) / 100
        );
        professional = 14_999;
        break;
    }

    const total = rocFee + stampDuty + dscCost + nameApproval + professional;

    const breakdown = [
      { label: "Govt / ROC Filing Fee", amount: rocFee, note: "MCA processing charges" },
      { label: "Stamp Duty", amount: stampDuty, note: `${state} — on authorized capital` },
      { label: "DSC (Digital Signature)", amount: dscCost, note: `${dir} director(s) × ₹1,500` },
      { label: "Name Approval (RUN/FiLLiP)", amount: nameApproval, note: "Name reservation fee" },
      { label: "Professional Fee", amount: professional, note: "CA/CS consultation & filing" },
    ].filter((b) => b.amount > 0);

    setResult({ rocFee, stampDuty, dscCost, nameApproval, professional, total, breakdown });
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
        <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">
          Registration Details
        </p>

        {/* Company Type */}
        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            Entity Type
          </label>
          <div className="space-y-2">
            {COMPANY_TYPES.map((ct) => (
              <button
                key={ct.key}
                onClick={() => setCompanyType(ct.key)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                  companyType === ct.key
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-50 border border-slate-200 hover:border-primary/30"
                }`}
              >
                <div>
                  <span
                    className={`text-sm font-heading font-semibold ${
                      companyType === ct.key ? "text-white" : "text-dark"
                    }`}
                  >
                    {ct.label}
                  </span>
                  <span
                    className={`block text-[11px] font-body ${
                      companyType === ct.key ? "text-white/70" : "text-muted"
                    }`}
                  >
                    {ct.desc}
                  </span>
                </div>
                {companyType === ct.key && (
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            State of Registration
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-dark text-sm transition-all bg-white"
          >
            {STATES.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Capital */}
        {companyType !== "partnership" && (
          <div>
            <label className="block text-sm font-heading font-semibold text-dark mb-2">
              {companyType === "llp" ? "Total Contribution (₹)" : "Authorized Capital (₹)"}
            </label>
            <input
              type="number"
              placeholder={companyType === "llp" ? "e.g. 100000" : "e.g. 100000 (default ₹1L)"}
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-dark text-sm transition-all"
            />
            <p className="text-xs text-muted mt-1">
              Minimum recommended:{" "}
              {companyType === "llp" ? "₹1,00,000" : "₹1,00,000 authorized capital"}
            </p>
          </div>
        )}

        {/* Directors */}
        {["pvtltd", "opc", "section8"].includes(companyType) && (
          <div>
            <label className="block text-sm font-heading font-semibold text-dark mb-2">
              Number of Directors / Promoters
            </label>
            <div className="flex gap-2">
              {["1", "2", "3", "4"].map((n) => (
                <button
                  key={n}
                  onClick={() => setDirectors(n)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all ${
                    directors === n
                      ? "bg-primary text-white"
                      : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-primary/30"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={calculate}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors"
          >
            <Building2 size={15} /> Estimate Cost
          </button>
          <button
            onClick={() => { setCapital(""); setDirectors("2"); setResult(null); }}
            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-colors"
            title="Reset"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* Result Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-center py-16"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/6 flex items-center justify-center mb-4">
                <Building2 size={28} className="text-primary/30" />
              </div>
              <p className="text-slate-500 font-heading font-medium text-sm">
                Select entity type, state, and capital
              </p>
              <p className="text-slate-400 text-xs mt-1">Fee estimate will appear here</p>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">
                Cost Estimate
              </p>

              {/* Total */}
              <div className="bg-primary rounded-2xl p-5 text-center">
                <p className="text-white/60 text-xs font-heading font-medium mb-1">
                  Total Estimated Cost
                </p>
                <p className="text-white font-heading font-bold text-4xl">
                  {formatINR(result.total)}
                </p>
                <p className="text-white/40 text-xs mt-2">
                  Indicative estimate — actual cost may vary
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2">
                {result.breakdown.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl"
                  >
                    <div>
                      <p className="text-sm font-heading font-semibold text-dark">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-muted font-body">{item.note}</p>
                    </div>
                    <span className="font-heading font-semibold text-sm text-dark">
                      {formatINR(item.amount)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 p-3 bg-accent/6 rounded-xl border border-accent/10">
                <Info size={13} className="text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  This is an indicative estimate. Stamp duty rates vary by state and are subject
                  to change. GST at 18% is applicable on professional fees. Contact us for
                  an exact quote.
                </p>
              </div>

              <Link
                href="/contact"
                className="flex items-center justify-between w-full px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors group"
              >
                <span className="text-sm font-heading font-semibold text-primary">
                  Get an exact quote — Book Free Consultation
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
    </div>
  );
}
