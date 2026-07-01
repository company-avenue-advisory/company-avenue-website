"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Info, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";

const GST_RATES = [5, 12, 18, 28] as const;
type GSTRate = (typeof GST_RATES)[number];

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n);
}

export function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState<GSTRate>(18);
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");
  const [gstType, setGstType] = useState<"intrastate" | "interstate">("intrastate");
  const [result, setResult] = useState<{
    base: number;
    gst: number;
    cgst?: number;
    sgst?: number;
    igst?: number;
    total: number;
  } | null>(null);

  function calculate() {
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    let base: number, gst: number, total: number;
    if (mode === "exclusive") {
      base = val;
      gst = (val * rate) / 100;
      total = val + gst;
    } else {
      total = val;
      base = (val * 100) / (100 + rate);
      gst = val - base;
    }
    const r: typeof result = { base, gst, total };
    if (gstType === "intrastate") {
      r.cgst = gst / 2;
      r.sgst = gst / 2;
    } else {
      r.igst = gst;
    }
    setResult(r);
  }

  function reset() {
    setAmount("");
    setResult(null);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            Amount (₹)
          </label>
          <input
            type="number"
            min="0"
            placeholder="Enter amount, e.g. 10000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-dark text-base transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            GST Rate
          </label>
          <div className="grid grid-cols-4 gap-2">
            {GST_RATES.map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={`py-2.5 rounded-xl text-sm font-heading font-semibold transition-all ${
                  rate === r
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-primary/8 hover:text-primary border border-slate-200"
                }`}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            Calculation Mode
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "exclusive", label: "Add GST", desc: "GST added on top" },
              { key: "inclusive", label: "Extract GST", desc: "GST inside amount" },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key as "exclusive" | "inclusive")}
                className={`py-2.5 px-3 rounded-xl text-sm font-heading font-semibold transition-all text-left ${
                  mode === m.key
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-primary/8 hover:text-primary border border-slate-200"
                }`}
              >
                {m.label}
                <span className={`block text-[10px] font-body font-normal mt-0.5 ${mode === m.key ? "text-white/70" : "text-muted"}`}>
                  {m.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">
            Transaction Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "intrastate", label: "Intra-State", desc: "CGST + SGST" },
              { key: "interstate", label: "Inter-State", desc: "IGST only" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setGstType(t.key as "intrastate" | "interstate")}
                className={`py-2.5 px-3 rounded-xl text-sm font-heading font-semibold transition-all text-left ${
                  gstType === t.key
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-primary/8 hover:text-primary border border-slate-200"
                }`}
              >
                {t.label}
                <span className={`block text-[10px] font-body font-normal mt-0.5 ${gstType === t.key ? "text-white/70" : "text-muted"}`}>
                  {t.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={calculate}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors shadow-sm"
          >
            <Calculator size={16} /> Calculate GST
          </button>
          <button
            onClick={reset}
            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-colors"
            title="Reset"
          >
            <RefreshCw size={16} />
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
                <Calculator size={28} className="text-primary/30" />
              </div>
              <p className="text-slate-500 font-heading font-medium text-sm">
                Enter an amount and click Calculate
              </p>
              <p className="text-slate-400 text-xs mt-1">Your breakdown will appear here</p>
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
                GST Breakdown
              </p>

              <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                <ResultRow label="Base Amount" value={formatINR(result.base)} />
                {result.cgst !== undefined && (
                  <>
                    <ResultRow
                      label={`CGST @ ${rate / 2}%`}
                      value={formatINR(result.cgst)}
                      accent
                    />
                    <ResultRow
                      label={`SGST @ ${rate / 2}%`}
                      value={formatINR(result.sgst!)}
                      accent
                    />
                  </>
                )}
                {result.igst !== undefined && (
                  <ResultRow label={`IGST @ ${rate}%`} value={formatINR(result.igst)} accent />
                )}
                <div className="border-t border-slate-200 pt-3">
                  <ResultRow label="Total GST" value={formatINR(result.gst)} />
                </div>
                <div className="bg-primary rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-white/80 text-sm font-heading font-semibold">
                    Total Amount
                  </span>
                  <span className="text-white font-heading font-bold text-lg">
                    {formatINR(result.total)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 p-3 bg-accent/6 rounded-xl border border-accent/10">
                <Info size={13} className="text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600">
                  {gstType === "intrastate"
                    ? "CGST goes to Central Govt; SGST to State Govt. Both are equal halves of total GST."
                    : "IGST applies on inter-state supply — collected by Central Govt and distributed to destination state."}
                </p>
              </div>

              <Link
                href="/contact"
                className="flex items-center justify-between w-full px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors group"
              >
                <span className="text-sm font-heading font-semibold text-primary">
                  Need GST Registration or Filing help?
                </span>
                <ArrowRight size={14} className="text-accent group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-600 font-body">{label}</span>
      <span
        className={`text-sm font-heading font-semibold ${
          accent ? "text-accent" : "text-dark"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
