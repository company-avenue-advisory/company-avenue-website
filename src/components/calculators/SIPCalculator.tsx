"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR, futureValueSIP } from "@/lib/calc";
import { SliderField, ResultRow, HeroResult, Note, CTALink, SplitDonut } from "./_shared";

export function SIPCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const res = useMemo(() => {
    const fv = futureValueSIP(monthly, rate, years);
    const invested = monthly * years * 12;
    return { fv, invested, gains: fv - invested };
  }, [monthly, rate, years]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
        <SliderField label="Monthly Investment" value={monthly} onChange={setMonthly} min={500} max={200000} step={500} suffix="₹" />
        <SliderField label="Expected Return (p.a.)" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
        <SliderField label="Investment Period" value={years} onChange={setYears} min={1} max={40} suffix="Years" />
        <Note>SIP returns are market-linked and not guaranteed. This uses the standard SIP future-value formula with monthly compounding.</Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.fv} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Maturity Value</p>
          <HeroResult label="Total Value" value={formatINR(res.fv)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label="Invested Amount" value={formatINR(res.invested)} />
            <ResultRow label="Estimated Returns" value={formatINR(res.gains)} accent />
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <SplitDonut invested={res.invested} gains={res.gains} />
          </div>
          <CTALink label="Grow wealth with expert financial planning" />
        </motion.div>
      </div>
    </div>
  );
}
