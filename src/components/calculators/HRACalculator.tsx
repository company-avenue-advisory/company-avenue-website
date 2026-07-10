"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/calc";
import { Field, Segmented, ResultRow, HeroResult, Note, CTALink } from "./_shared";

export function HRACalculator() {
  const [basic, setBasic] = useState("600000");
  const [da, setDa] = useState("0");
  const [hra, setHra] = useState("300000");
  const [rent, setRent] = useState("240000");
  const [city, setCity] = useState<"metro" | "nonmetro">("metro");

  const res = useMemo(() => {
    const b = (parseFloat(basic) || 0) + (parseFloat(da) || 0);
    const hraReceived = parseFloat(hra) || 0;
    const rentPaid = parseFloat(rent) || 0;
    const rule1 = hraReceived;
    const rule2 = city === "metro" ? 0.5 * b : 0.4 * b;
    const rule3 = Math.max(0, rentPaid - 0.1 * b);
    const exempt = Math.max(0, Math.min(rule1, rule2, rule3));
    const taxable = Math.max(0, hraReceived - exempt);
    return { exempt, taxable, rule1, rule2, rule3, hraReceived };
  }, [basic, da, hra, rent, city]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
        <Field label="Basic Salary (annual)" type="number" value={basic} onChange={(e) => setBasic(e.target.value)} suffix="₹" />
        <Field label="Dearness Allowance (annual)" type="number" value={da} onChange={(e) => setDa(e.target.value)} suffix="₹" hint="Enter 0 if not applicable." />
        <Field label="HRA Received (annual)" type="number" value={hra} onChange={(e) => setHra(e.target.value)} suffix="₹" />
        <Field label="Total Rent Paid (annual)" type="number" value={rent} onChange={(e) => setRent(e.target.value)} suffix="₹" />
        <Segmented
          label="City of Residence"
          value={city}
          onChange={setCity}
          options={[
            { key: "metro", label: "Metro", desc: "Delhi, Mumbai, Kolkata, Chennai" },
            { key: "nonmetro", label: "Non-Metro", desc: "All other cities" },
          ]}
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.exempt} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">HRA Exemption (Sec 10(13A))</p>
          <HeroResult label="Exempt HRA" value={formatINR(res.exempt)} />
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <p className="text-[11px] font-heading font-semibold text-muted uppercase tracking-wide">Least of the three is exempt</p>
            <ResultRow label="Actual HRA received" value={formatINR(res.rule1)} />
            <ResultRow label={`${city === "metro" ? "50%" : "40%"} of Basic + DA`} value={formatINR(res.rule2)} />
            <ResultRow label="Rent paid − 10% of Basic + DA" value={formatINR(res.rule3)} />
            <div className="border-t border-slate-200 pt-3">
              <ResultRow label="Taxable HRA" value={formatINR(res.taxable)} accent />
            </div>
          </div>
          <Note>HRA exemption is only available under the Old Tax Regime. The New Regime does not allow this deduction.</Note>
          <CTALink label="Need help filing your ITR?" href="/services/income-tax-return" />
        </motion.div>
      </div>
    </div>
  );
}
