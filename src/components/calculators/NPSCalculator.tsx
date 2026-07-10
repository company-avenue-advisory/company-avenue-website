"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR, futureValueSIP } from "@/lib/calc";
import { SliderField, ResultRow, HeroResult, Note, CTALink, SplitDonut } from "./_shared";

export function NPSCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [age, setAge] = useState(30);
  const [rate, setRate] = useState(10);
  const [annuityPct, setAnnuityPct] = useState(40);
  const [annuityRate, setAnnuityRate] = useState(6);
  const retireAge = 60;

  const res = useMemo(() => {
    const years = retireAge - age;
    const corpus = futureValueSIP(monthly, rate, years);
    const invested = monthly * years * 12;
    const annuityCorpus = (corpus * annuityPct) / 100;
    const lumpsum = corpus - annuityCorpus;
    const monthlyPension = (annuityCorpus * (annuityRate / 100)) / 12;
    return { corpus, invested, gains: corpus - invested, lumpsum, annuityCorpus, monthlyPension };
  }, [monthly, age, rate, annuityPct, annuityRate]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
        <SliderField label="Monthly Contribution" value={monthly} onChange={setMonthly} min={500} max={100000} step={500} suffix="₹" />
        <SliderField label="Current Age" value={age} onChange={setAge} min={18} max={59} suffix="Years" />
        <SliderField label="Expected Return (p.a.)" value={rate} onChange={setRate} min={5} max={15} step={0.5} suffix="%" />
        <SliderField label="Annuity Purchase (min 40%)" value={annuityPct} onChange={setAnnuityPct} min={40} max={100} suffix="%" />
        <SliderField label="Annuity Return Rate" value={annuityRate} onChange={setAnnuityRate} min={4} max={10} step={0.5} suffix="%" />
        <Note>At 60, at least 40% of the NPS corpus must buy an annuity (pension); the rest can be withdrawn tax-free (up to 60%).</Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.corpus} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Corpus at 60</p>
          <HeroResult label="Total Corpus" value={formatINR(res.corpus)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label="Total Invested" value={formatINR(res.invested)} />
            <ResultRow label="Interest Earned" value={formatINR(res.gains)} accent />
            <div className="border-t border-slate-200 pt-3 space-y-3">
              <ResultRow label="Lumpsum Withdrawal" value={formatINR(res.lumpsum)} />
              <ResultRow label="Annuity Investment" value={formatINR(res.annuityCorpus)} />
            </div>
          </div>
          <div className="bg-primary/6 border border-primary/10 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-heading font-semibold text-primary">Est. Monthly Pension</span>
            <span className="text-primary font-heading font-bold text-lg">{formatINR(res.monthlyPension)}</span>
          </div>
          <CTALink label="Plan your retirement with experts" />
        </motion.div>
      </div>
    </div>
  );
}
