"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/calc";
import { Field, ResultRow, HeroResult, Note, CTALink, SplitDonut } from "./_shared";

export function SalaryCalculator() {
  const [ctc, setCtc] = useState("1200000");
  const [bonusPct, setBonusPct] = useState("0");
  const [pt, setPt] = useState("2400");

  const res = useMemo(() => {
    const annualCtc = parseFloat(ctc) || 0;
    const bonus = (annualCtc * (parseFloat(bonusPct) || 0)) / 100;
    const gross = annualCtc - bonus;
    const basic = gross * 0.5; // assume 50% basic
    const employerPf = Math.min(basic, 180000) * 0.12; // capped at 15k/mo basic for statutory
    const employeePf = Math.min(basic, 180000) * 0.12;
    const grossSalary = gross - employerPf; // employer PF is part of CTC, not paid in hand
    const professionalTax = parseFloat(pt) || 0;
    const taxableIncome = grossSalary - 50000; // std deduction
    const incomeTax = estimateTaxNewRegime(taxableIncome);
    const takeHomeAnnual = grossSalary - employeePf - professionalTax - incomeTax;
    return {
      annualCtc,
      grossSalary,
      basic,
      employeePf,
      employerPf,
      professionalTax,
      incomeTax,
      takeHomeAnnual,
      takeHomeMonthly: takeHomeAnnual / 12,
      totalDeductions: employeePf + professionalTax + incomeTax,
    };
  }, [ctc, bonusPct, pt]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
        <Field label="Annual CTC" type="number" value={ctc} onChange={(e) => setCtc(e.target.value)} suffix="₹" />
        <Field label="Variable / Bonus" type="number" value={bonusPct} onChange={(e) => setBonusPct(e.target.value)} suffix="%" hint="Portion of CTC paid as performance bonus (excluded from monthly in-hand)." />
        <Field label="Professional Tax (annual)" type="number" value={pt} onChange={(e) => setPt(e.target.value)} suffix="₹" hint="Varies by state; max ₹2,500/year." />
        <Note>
          Estimates assume Basic = 50% of gross, 12% employee PF, ₹50,000 standard deduction and New Regime tax slabs
          (FY 2025–26). Actual figures depend on your salary structure.
        </Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.takeHomeMonthly} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">In-Hand Salary</p>
          <HeroResult label="Monthly Take-Home" value={formatINR(res.takeHomeMonthly)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label="Gross Salary (annual)" value={formatINR(res.grossSalary)} />
            <ResultRow label="Employee PF" value={`− ${formatINR(res.employeePf)}`} accent />
            <ResultRow label="Professional Tax" value={`− ${formatINR(res.professionalTax)}`} accent />
            <ResultRow label="Income Tax (est.)" value={`− ${formatINR(res.incomeTax)}`} accent />
            <div className="border-t border-slate-200 pt-3">
              <ResultRow label="Annual Take-Home" value={formatINR(res.takeHomeAnnual)} />
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <SplitDonut invested={res.takeHomeAnnual} gains={res.totalDeductions} investedLabel="In-hand" gainsLabel="Deductions" />
          </div>
          <CTALink label="Need payroll setup for your company?" href="/services/payroll-management" />
        </motion.div>
      </div>
    </div>
  );
}

// Simplified New Regime tax (FY 2025-26) with 87A rebate up to 7L taxable
function estimateTaxNewRegime(taxable: number): number {
  if (taxable <= 700000) return 0;
  const slabs: [number, number][] = [
    [300000, 0],
    [700000, 0.05],
    [1000000, 0.1],
    [1200000, 0.15],
    [1500000, 0.2],
    [Infinity, 0.3],
  ];
  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of slabs) {
    if (taxable > prev) {
      tax += (Math.min(taxable, limit) - prev) * rate;
      prev = limit;
    } else break;
  }
  return tax * 1.04; // + 4% cess
}
