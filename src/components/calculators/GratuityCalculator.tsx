"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/calc";
import { Field, Segmented, ResultRow, HeroResult, Note, CTALink } from "./_shared";

export function GratuityCalculator() {
  const [salary, setSalary] = useState("60000");
  const [years, setYears] = useState("8");
  const [covered, setCovered] = useState<"yes" | "no">("yes");

  const res = useMemo(() => {
    const s = parseFloat(salary) || 0;
    const y = parseFloat(years) || 0;
    // Payment of Gratuity Act: (15/26) * salary * years; else (15/30)
    const factor = covered === "yes" ? 15 / 26 : 15 / 30;
    const roundedYears = covered === "yes" ? Math.round(y) : Math.floor(y);
    const raw = factor * s * roundedYears;
    const capped = Math.min(raw, 2000000); // ₹20 lakh statutory cap
    return { raw, capped, eligible: y >= 5, roundedYears };
  }, [salary, years, covered]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
        <Field label="Last Drawn Salary (Basic + DA, monthly)" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} suffix="₹" />
        <Field label="Years of Service" type="number" value={years} onChange={(e) => setYears(e.target.value)} suffix="Years" hint="Minimum 5 years of continuous service required to be eligible." />
        <Segmented
          label="Covered under Payment of Gratuity Act?"
          value={covered}
          onChange={setCovered}
          options={[
            { key: "yes", label: "Yes", desc: "≥10 employees (15/26)" },
            { key: "no", label: "No", desc: "Not covered (15/30)" },
          ]}
        />
        <Note>Gratuity up to ₹20 lakh is tax-exempt. Amounts above the statutory cap are taxable as per your slab.</Note>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <motion.div key={res.capped} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest">Gratuity Payable</p>
          {!res.eligible ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-heading font-semibold text-amber-800">Not yet eligible</p>
              <p className="text-xs text-amber-700 mt-1">Gratuity requires a minimum of 5 years of continuous service.</p>
            </div>
          ) : (
            <HeroResult label="Gratuity Amount" value={formatINR(res.capped)} />
          )}
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <ResultRow label="Years counted" value={`${res.roundedYears} years`} />
            <ResultRow label="Formula factor" value={covered === "yes" ? "15 / 26" : "15 / 30"} />
            <ResultRow label="Calculated gratuity" value={formatINR(res.raw)} accent />
            <div className="border-t border-slate-200 pt-3">
              <ResultRow label="Tax-exempt (capped ₹20L)" value={formatINR(res.capped)} />
            </div>
          </div>
          <CTALink label="Set up a Gratuity Trust for your company" href="/services/gratuity-trust" />
        </motion.div>
      </div>
    </div>
  );
}
