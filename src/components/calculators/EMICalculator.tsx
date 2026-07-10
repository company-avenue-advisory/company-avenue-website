"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { calcEMI, formatINR } from "@/lib/calc";
import { SliderField, ResultRow, HeroResult, Note, CTALink, SplitDonut } from "./_shared";

export function EMICalculator({ variant = "generic" }: { variant?: "generic" | "home" }) {
  const isHome = variant === "home";
  const [amount, setAmount] = useState(isHome ? 5000000 : 1000000);
  const [rate, setRate] = useState(isHome ? 8.5 : 11);
  const [years, setYears] = useState(isHome ? 20 : 5);

  const res = useMemo(() => calcEMI(amount, rate, years * 12), [amount, rate, years]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
        <SliderField
          label={isHome ? "Home Loan Amount" : "Loan Amount"}
          value={amount}
          onChange={setAmount}
          min={isHome ? 500000 : 50000}
          max={isHome ? 100000000 : 20000000}
          step={isHome ? 100000 : 25000}
          suffix="₹"
        />
        <SliderField label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={5} max={24} step={0.1} suffix="%" />
        <SliderField label="Loan Tenure" value={years} onChange={setYears} min={1} max={isHome ? 30 : 20} suffix="Years" />
        <Note>
          EMI is calculated on a reducing-balance basis. Actual rates depend on your credit profile, lender and
          {isHome ? " property value (LTV)." : " loan type."}
        </Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.emi} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Monthly EMI</p>
          <HeroResult label="EMI" value={formatINR(res.emi)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label="Principal Amount" value={formatINR(res.principal)} />
            <ResultRow label="Total Interest" value={formatINR(res.interest)} accent />
            <div className="border-t border-slate-200 pt-3">
              <ResultRow label="Total Payable" value={formatINR(res.total)} />
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <SplitDonut invested={res.principal} gains={res.interest} investedLabel="Principal" gainsLabel="Interest" />
          </div>
          <CTALink label={isHome ? "Need a home loan compliance check?" : "Need help with business loan documentation?"} />
        </motion.div>
      </div>
    </div>
  );
}
