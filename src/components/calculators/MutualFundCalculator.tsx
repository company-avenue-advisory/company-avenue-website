"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR, futureValueSIP, futureValueLumpsum } from "@/lib/calc";
import { SliderField, Segmented, ResultRow, HeroResult, Note, CTALink, SplitDonut } from "./_shared";

export function MutualFundCalculator() {
  const [mode, setMode] = useState<"sip" | "lumpsum">("sip");
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const res = useMemo(() => {
    if (mode === "sip") {
      const fv = futureValueSIP(amount, rate, years);
      const invested = amount * years * 12;
      return { fv, invested, gains: fv - invested };
    }
    const fv = futureValueLumpsum(amount, rate, years, 1);
    return { fv, invested: amount, gains: fv - amount };
  }, [mode, amount, rate, years]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
        <Segmented
          label="Investment Type"
          value={mode}
          onChange={setMode}
          options={[
            { key: "sip", label: "Monthly SIP", desc: "Invest every month" },
            { key: "lumpsum", label: "Lumpsum", desc: "One-time investment" },
          ]}
        />
        <SliderField
          label={mode === "sip" ? "Monthly Investment" : "Investment Amount"}
          value={amount}
          onChange={setAmount}
          min={mode === "sip" ? 500 : 10000}
          max={mode === "sip" ? 200000 : 10000000}
          step={mode === "sip" ? 500 : 10000}
          suffix="₹"
        />
        <SliderField label="Expected Return (p.a.)" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
        <SliderField label="Investment Period" value={years} onChange={setYears} min={1} max={40} suffix="Years" />
        <Note>Mutual fund returns are subject to market risk. Read all scheme-related documents carefully.</Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.fv} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Projected Value</p>
          <HeroResult label="Total Value" value={formatINR(res.fv)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label="Invested Amount" value={formatINR(res.invested)} />
            <ResultRow label="Estimated Returns" value={formatINR(res.gains)} accent />
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <SplitDonut invested={res.invested} gains={res.gains} />
          </div>
          <CTALink label="Talk to our financial advisors" />
        </motion.div>
      </div>
    </div>
  );
}
