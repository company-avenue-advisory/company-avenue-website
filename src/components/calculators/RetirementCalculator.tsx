"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR, futureValueSIP } from "@/lib/calc";
import { SliderField, ResultRow, HeroResult, Note, CTALink } from "./_shared";

export function RetirementCalculator() {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [preReturn, setPreReturn] = useState(12);
  const [postReturn, setPostReturn] = useState(7);
  const lifeExpectancy = 85;

  const res = useMemo(() => {
    const yearsToRetire = retireAge - age;
    const yearsInRetirement = lifeExpectancy - retireAge;
    // Expense at retirement (inflation-adjusted)
    const futureMonthlyExpense = monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetire);
    const annualExpense = futureMonthlyExpense * 12;
    // Real return during retirement (inflation-adjusted)
    const realRate = (1 + postReturn / 100) / (1 + inflation / 100) - 1;
    // Corpus needed (present value of annuity for retirement years)
    const corpusNeeded =
      realRate === 0
        ? annualExpense * yearsInRetirement
        : annualExpense * ((1 - Math.pow(1 + realRate, -yearsInRetirement)) / realRate) * (1 + realRate);
    // Monthly SIP needed to reach corpus
    const i = preReturn / 12 / 100;
    const n = yearsToRetire * 12;
    const monthlySIP =
      i === 0 ? corpusNeeded / n : corpusNeeded / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const projected = futureValueSIP(monthlySIP, preReturn, yearsToRetire);
    return { corpusNeeded, monthlySIP, futureMonthlyExpense, yearsToRetire, yearsInRetirement, projected };
  }, [age, retireAge, monthlyExpense, inflation, preReturn, postReturn]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
        <SliderField label="Current Age" value={age} onChange={setAge} min={18} max={55} suffix="Years" />
        <SliderField label="Retirement Age" value={retireAge} onChange={setRetireAge} min={45} max={70} suffix="Years" />
        <SliderField label="Current Monthly Expense" value={monthlyExpense} onChange={setMonthlyExpense} min={10000} max={500000} step={5000} suffix="₹" />
        <SliderField label="Expected Inflation" value={inflation} onChange={setInflation} min={2} max={12} step={0.5} suffix="%" />
        <SliderField label="Return Before Retirement" value={preReturn} onChange={setPreReturn} min={6} max={18} step={0.5} suffix="%" />
        <SliderField label="Return After Retirement" value={postReturn} onChange={setPostReturn} min={4} max={12} step={0.5} suffix="%" />
        <Note>Assumes life expectancy of 85 years. The retirement corpus must fund your inflation-adjusted expenses for {res.yearsInRetirement} years.</Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.corpusNeeded} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Retirement Plan</p>
          <HeroResult label="Corpus Needed" value={formatINR(res.corpusNeeded)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label="Years to Retirement" value={`${res.yearsToRetire} years`} />
            <ResultRow label="Monthly expense at retirement" value={formatINR(res.futureMonthlyExpense)} accent />
            <ResultRow label="Years in retirement" value={`${res.yearsInRetirement} years`} />
          </div>
          <div className="bg-primary/6 border border-primary/10 rounded-xl px-4 py-3.5 flex items-center justify-between">
            <span className="text-sm font-heading font-semibold text-primary">Monthly SIP Required</span>
            <span className="text-primary font-heading font-bold text-lg">{formatINR(res.monthlySIP)}</span>
          </div>
          <CTALink label="Build a retirement plan with our advisors" />
        </motion.div>
      </div>
    </div>
  );
}
