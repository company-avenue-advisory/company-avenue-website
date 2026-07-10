"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR, futureValueRD } from "@/lib/calc";
import { SliderField, ResultRow, HeroResult, Note, CTALink, SplitDonut } from "./_shared";

export function RDCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(7);
  const [months, setMonths] = useState(24);

  const res = useMemo(() => {
    const fv = futureValueRD(monthly, rate, months);
    const invested = monthly * months;
    return { fv, invested, gains: fv - invested };
  }, [monthly, rate, months]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
        <SliderField label="Monthly Deposit" value={monthly} onChange={setMonthly} min={500} max={100000} step={500} suffix="₹" />
        <SliderField label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={1} max={12} step={0.1} suffix="%" />
        <SliderField label="Tenure" value={months} onChange={setMonths} min={6} max={120} step={1} suffix="Months" />
        <Note>Recurring Deposit interest is compounded quarterly. A fixed amount is deposited every month for the chosen tenure.</Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.fv} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Maturity Value</p>
          <HeroResult label="Maturity Amount" value={formatINR(res.fv)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label="Total Deposited" value={formatINR(res.invested)} />
            <ResultRow label="Interest Earned" value={formatINR(res.gains)} accent />
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <SplitDonut invested={res.invested} gains={res.gains} investedLabel="Deposited" gainsLabel="Interest" />
          </div>
          <CTALink label="Plan your savings smartly" />
        </motion.div>
      </div>
    </div>
  );
}
