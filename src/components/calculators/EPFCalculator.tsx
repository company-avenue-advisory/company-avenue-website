"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/calc";
import { SliderField, ResultRow, HeroResult, Note, CTALink, SplitDonut } from "./_shared";

export function EPFCalculator() {
  const [basic, setBasic] = useState(25000);
  const [age, setAge] = useState(30);
  const [rate, setRate] = useState(8.25);
  const [growth, setGrowth] = useState(5);
  const retireAge = 58;

  const res = useMemo(() => {
    const months = (retireAge - age) * 12;
    let monthlyBasic = basic;
    let balance = 0;
    let totalContribution = 0;
    for (let m = 0; m < months; m++) {
      const empShare = monthlyBasic * 0.12;
      // Employer: 8.33% to pension (EPS, capped), 3.67% to EPF
      const employerEpf = monthlyBasic * 0.0367;
      const monthlyContribution = empShare + employerEpf;
      balance = (balance + monthlyContribution) * (1 + rate / 100 / 12);
      totalContribution += monthlyContribution;
      // annual salary growth
      if ((m + 1) % 12 === 0) monthlyBasic *= 1 + growth / 100;
    }
    return { fv: balance, invested: totalContribution, gains: balance - totalContribution, months };
  }, [basic, age, rate, growth]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-6">
        <SliderField label="Monthly Basic + DA" value={basic} onChange={setBasic} min={5000} max={200000} step={1000} suffix="₹" />
        <SliderField label="Current Age" value={age} onChange={setAge} min={18} max={57} suffix="Years" />
        <SliderField label="EPF Interest Rate (p.a.)" value={rate} onChange={setRate} min={7} max={10} step={0.05} suffix="%" />
        <SliderField label="Annual Salary Growth" value={growth} onChange={setGrowth} min={0} max={15} step={0.5} suffix="%" />
        <Note>Employee contributes 12% of Basic+DA; employer adds 3.67% to EPF (8.33% goes to the EPS pension scheme). Retirement age assumed 58. Current EPF rate is 8.25%.</Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.fv} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Corpus at Retirement (58)</p>
          <HeroResult label="EPF Corpus" value={formatINR(res.fv)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label="Total Contribution" value={formatINR(res.invested)} />
            <ResultRow label="Interest Earned" value={formatINR(res.gains)} accent />
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <SplitDonut invested={res.invested} gains={res.gains} investedLabel="Contribution" gainsLabel="Interest" />
          </div>
          <CTALink label="Register your company for PF/EPF" href="/services/pf-registration" />
        </motion.div>
      </div>
    </div>
  );
}
