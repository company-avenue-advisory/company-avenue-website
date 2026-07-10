"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR, futureValueLumpsum } from "@/lib/calc";
import { SliderField, Segmented, ResultRow, HeroResult, Note, CTALink, SplitDonut } from "./_shared";

const FREQ = { quarterly: 4, monthly: 12, halfyearly: 2, yearly: 1 } as const;
type Freq = keyof typeof FREQ;

export function FDCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [freq, setFreq] = useState<Freq>("quarterly");

  const res = useMemo(() => {
    const fv = futureValueLumpsum(principal, rate, years, FREQ[freq]);
    return { fv, invested: principal, gains: fv - principal };
  }, [principal, rate, years, freq]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
        <SliderField label="Deposit Amount" value={principal} onChange={setPrincipal} min={5000} max={10000000} step={5000} suffix="₹" />
        <SliderField label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={1} max={12} step={0.1} suffix="%" />
        <SliderField label="Tenure" value={years} onChange={setYears} min={1} max={10} suffix="Years" />
        <Segmented
          label="Compounding Frequency"
          value={freq}
          onChange={setFreq}
          cols={4}
          options={[
            { key: "quarterly", label: "Quarterly" },
            { key: "monthly", label: "Monthly" },
            { key: "halfyearly", label: "Half-Yr" },
            { key: "yearly", label: "Yearly" },
          ]}
        />
        <Note>Most Indian banks compound FD interest quarterly. Interest earned is taxable as per your income slab; TDS applies above ₹40,000/year.</Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.fv} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Maturity Value</p>
          <HeroResult label="Maturity Amount" value={formatINR(res.fv)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label="Principal" value={formatINR(res.invested)} />
            <ResultRow label="Interest Earned" value={formatINR(res.gains)} accent />
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <SplitDonut invested={res.invested} gains={res.gains} investedLabel="Principal" gainsLabel="Interest" />
          </div>
          <CTALink label="Need tax help on FD interest?" href="/services/income-tax-return" />
        </motion.div>
      </div>
    </div>
  );
}
