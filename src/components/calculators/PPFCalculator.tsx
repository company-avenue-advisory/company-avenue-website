"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/calc";
import { SliderField, ResultRow, HeroResult, Note, CTALink, SplitDonut } from "./_shared";

export function PPFCalculator() {
  const [yearly, setYearly] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);

  const res = useMemo(() => {
    // Yearly deposit compounded annually
    let balance = 0;
    for (let y = 0; y < years; y++) {
      balance = (balance + yearly) * (1 + rate / 100);
    }
    const invested = yearly * years;
    return { fv: balance, invested, gains: balance - invested };
  }, [yearly, rate, years]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
        <SliderField label="Yearly Investment" value={yearly} onChange={setYearly} min={500} max={150000} step={500} suffix="₹" />
        <SliderField label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={6} max={9} step={0.1} suffix="%" />
        <SliderField label="Tenure" value={years} onChange={setYears} min={15} max={50} suffix="Years" />
        <Note>PPF has a 15-year lock-in (extendable in 5-year blocks). Max ₹1.5 lakh/year. Current rate is 7.1%. Interest is fully tax-free (EEE).</Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.fv} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Maturity Value</p>
          <HeroResult label="Maturity Amount" value={formatINR(res.fv)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label="Total Invested" value={formatINR(res.invested)} />
            <ResultRow label="Total Interest" value={formatINR(res.gains)} accent />
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <SplitDonut invested={res.invested} gains={res.gains} investedLabel="Invested" gainsLabel="Interest" />
          </div>
          <CTALink label="Maximise your 80C tax savings" href="/services/income-tax-return" />
        </motion.div>
      </div>
    </div>
  );
}
