"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR, futureValueLumpsum } from "@/lib/calc";
import { SliderField, ResultRow, HeroResult, Note, CTALink, SplitDonut } from "./_shared";

export function LumpsumCalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const res = useMemo(() => {
    const fv = futureValueLumpsum(amount, rate, years, 1);
    return { fv, invested: amount, gains: fv - amount };
  }, [amount, rate, years]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
        <SliderField label="Total Investment" value={amount} onChange={setAmount} min={10000} max={10000000} step={10000} suffix="₹" />
        <SliderField label="Expected Return (p.a.)" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
        <SliderField label="Investment Period" value={years} onChange={setYears} min={1} max={40} suffix="Years" />
        <Note>A lumpsum is a one-time investment compounded annually. Market-linked returns are not guaranteed.</Note>
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
          <CTALink label="Plan your investments with our advisors" />
        </motion.div>
      </div>
    </div>
  );
}
