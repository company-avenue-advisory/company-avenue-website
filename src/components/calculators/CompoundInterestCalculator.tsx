"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR, futureValueLumpsum } from "@/lib/calc";
import { SliderField, Segmented, ResultRow, HeroResult, Note, CTALink, SplitDonut } from "./_shared";

const FREQ = { yearly: 1, halfyearly: 2, quarterly: 4, monthly: 12 } as const;
type Freq = keyof typeof FREQ;

export function CompoundInterestCalculator() {
  const [mode, setMode] = useState<"compound" | "simple">("compound");
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);
  const [freq, setFreq] = useState<Freq>("yearly");

  const res = useMemo(() => {
    let fv: number;
    if (mode === "simple") {
      const interest = (principal * rate * years) / 100;
      fv = principal + interest;
    } else {
      fv = futureValueLumpsum(principal, rate, years, FREQ[freq]);
    }
    return { fv, invested: principal, gains: fv - principal };
  }, [mode, principal, rate, years, freq]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
        <Segmented
          label="Interest Type"
          value={mode}
          onChange={setMode}
          options={[
            { key: "compound", label: "Compound", desc: "Interest on interest" },
            { key: "simple", label: "Simple", desc: "Flat on principal" },
          ]}
        />
        <SliderField label="Principal Amount" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000} suffix="₹" />
        <SliderField label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
        <SliderField label="Time Period" value={years} onChange={setYears} min={1} max={40} suffix="Years" />
        {mode === "compound" && (
          <Segmented
            label="Compounding Frequency"
            value={freq}
            onChange={setFreq}
            cols={4}
            options={[
              { key: "yearly", label: "Yearly" },
              { key: "halfyearly", label: "Half-Yr" },
              { key: "quarterly", label: "Quarterly" },
              { key: "monthly", label: "Monthly" },
            ]}
          />
        )}
        <Note>Compound interest grows faster with higher compounding frequency. Simple interest is charged only on the principal.</Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.fv} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Total Value</p>
          <HeroResult label="Maturity Amount" value={formatINR(res.fv)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label="Principal" value={formatINR(res.invested)} />
            <ResultRow label="Total Interest" value={formatINR(res.gains)} accent />
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <SplitDonut invested={res.invested} gains={res.gains} investedLabel="Principal" gainsLabel="Interest" />
          </div>
          <CTALink label="Need investment advisory?" />
        </motion.div>
      </div>
    </div>
  );
}
