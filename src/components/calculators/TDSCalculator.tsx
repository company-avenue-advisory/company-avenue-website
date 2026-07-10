"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/calc";
import { Field, Segmented, ResultRow, HeroResult, Note, CTALink } from "./_shared";

type Payment = {
  label: string;
  section: string;
  rateInd: number;
  rateOther: number;
  threshold: number;
};

const PAYMENTS: Payment[] = [
  { label: "Professional / Technical Fees (194J)", section: "194J", rateInd: 10, rateOther: 10, threshold: 30000 },
  { label: "Contractor Payment (194C)", section: "194C", rateInd: 1, rateOther: 2, threshold: 30000 },
  { label: "Rent — Land / Building (194I)", section: "194I(b)", rateInd: 10, rateOther: 10, threshold: 240000 },
  { label: "Rent — Plant / Machinery (194I)", section: "194I(a)", rateInd: 2, rateOther: 2, threshold: 240000 },
  { label: "Commission / Brokerage (194H)", section: "194H", rateInd: 5, rateOther: 5, threshold: 15000 },
  { label: "Interest other than securities (194A)", section: "194A", rateInd: 10, rateOther: 10, threshold: 40000 },
  { label: "Purchase of Goods (194Q)", section: "194Q", rateInd: 0.1, rateOther: 0.1, threshold: 5000000 },
  { label: "Purchase of Property (194IA)", section: "194IA", rateInd: 1, rateOther: 1, threshold: 5000000 },
  { label: "Dividend (194)", section: "194", rateInd: 10, rateOther: 10, threshold: 5000 },
];

export function TDSCalculator() {
  const [idx, setIdx] = useState(0);
  const [amount, setAmount] = useState("100000");
  const [payee, setPayee] = useState<"ind" | "other">("ind");
  const [hasPan, setHasPan] = useState<"yes" | "no">("yes");

  const res = useMemo(() => {
    const p = PAYMENTS[idx];
    const amt = parseFloat(amount) || 0;
    const baseRate = payee === "ind" ? p.rateInd : p.rateOther;
    // 206AA: no PAN → higher of 20% or applicable rate
    const rate = hasPan === "no" ? Math.max(20, baseRate) : baseRate;
    const applies = amt > p.threshold;
    const tds = applies ? (amt * rate) / 100 : 0;
    return { p, amt, rate, applies, tds, net: amt - tds };
  }, [idx, amount, payee, hasPan]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-2">Nature of Payment</label>
          <select
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-dark text-sm transition-all bg-white"
          >
            {PAYMENTS.map((p, i) => (
              <option key={p.label} value={i}>{p.label}</option>
            ))}
          </select>
        </div>
        <Field label="Payment Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} suffix="₹" />
        <Segmented
          label="Payee (Deductee) Type"
          value={payee}
          onChange={setPayee}
          options={[
            { key: "ind", label: "Individual / HUF" },
            { key: "other", label: "Company / Firm" },
          ]}
        />
        <Segmented
          label="PAN Available?"
          value={hasPan}
          onChange={setHasPan}
          options={[
            { key: "yes", label: "Yes" },
            { key: "no", label: "No (Sec 206AA)", desc: "Min 20%" },
          ]}
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.tds} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">TDS to Deduct</p>
          <HeroResult label="TDS Amount" value={formatINR(res.tds)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label="Section" value={res.p.section} />
            <ResultRow label="Applicable Rate" value={`${res.rate}%`} accent />
            <ResultRow label="Threshold" value={formatINR(res.p.threshold)} />
            <ResultRow label="Gross Payment" value={formatINR(res.amt)} />
            <div className="border-t border-slate-200 pt-3">
              <ResultRow label="Net Payable to Payee" value={formatINR(res.net)} />
            </div>
          </div>
          {!res.applies && res.amt > 0 && (
            <Note>Payment is below the ₹{res.p.threshold.toLocaleString("en-IN")} threshold — no TDS is required for this section.</Note>
          )}
          <CTALink label="Need TDS return filing help?" href="/services/tds-return" />
        </motion.div>
      </div>
    </div>
  );
}
