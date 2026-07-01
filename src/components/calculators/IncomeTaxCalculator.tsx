"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IndianRupee, TrendingDown, Info, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";

type AgeGroup = "below60" | "60to80" | "above80";
type EmploymentType = "salaried" | "selfemployed";

function formatINR(n: number, compact = false) {
  if (compact) {
    if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(2)}L`;
    if (n >= 1_000) return `₹${(n / 1_000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

// New Regime slabs FY 2025-26 (Budget 2025)
function calcNewRegimeTax(taxableIncome: number): number {
  const slabs = [
    { limit: 4_00_000, rate: 0 },
    { limit: 8_00_000, rate: 0.05 },
    { limit: 12_00_000, rate: 0.10 },
    { limit: 16_00_000, rate: 0.15 },
    { limit: 20_00_000, rate: 0.20 },
    { limit: 24_00_000, rate: 0.25 },
    { limit: Infinity, rate: 0.30 },
  ];
  let tax = 0;
  let prev = 0;
  for (const slab of slabs) {
    if (taxableIncome <= prev) break;
    const chunk = Math.min(taxableIncome, slab.limit) - prev;
    tax += chunk * slab.rate;
    prev = slab.limit;
  }
  return tax;
}

// Old Regime slabs FY 2025-26
function calcOldRegimeTax(taxableIncome: number, age: AgeGroup): number {
  const exemption = age === "below60" ? 2_50_000 : age === "60to80" ? 3_00_000 : 5_00_000;
  if (taxableIncome <= exemption) return 0;

  let tax = 0;
  if (age === "above80") {
    const above5 = Math.max(0, Math.min(taxableIncome, 10_00_000) - 5_00_000);
    const above10 = Math.max(0, taxableIncome - 10_00_000);
    tax = above5 * 0.20 + above10 * 0.30;
  } else {
    const limit5 = 5_00_000;
    const above2_5 = Math.max(0, Math.min(taxableIncome, limit5) - exemption);
    const above5 = Math.max(0, Math.min(taxableIncome, 10_00_000) - limit5);
    const above10 = Math.max(0, taxableIncome - 10_00_000);
    tax = above2_5 * 0.05 + above5 * 0.20 + above10 * 0.30;
  }
  return tax;
}

function addCess(tax: number) {
  return tax + tax * 0.04;
}

function applySurcharge(tax: number, income: number) {
  if (income > 5_00_00_000) return tax + tax * 0.37;
  if (income > 2_00_00_000) return tax + tax * 0.25;
  if (income > 1_00_00_000) return tax + tax * 0.15;
  if (income > 50_00_000) return tax + tax * 0.10;
  return tax;
}

export function IncomeTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState("");
  const [empType, setEmpType] = useState<EmploymentType>("salaried");
  const [age, setAge] = useState<AgeGroup>("below60");
  const [deduction80C, setDeduction80C] = useState("");
  const [deduction80D, setDeduction80D] = useState("");
  const [hraExemption, setHraExemption] = useState("");
  const [homeLoan, setHomeLoan] = useState("");
  const [otherDeductions, setOtherDeductions] = useState("");
  const [result, setResult] = useState<{
    newTax: number;
    oldTax: number;
    newTaxable: number;
    oldTaxable: number;
    savings: number;
    betterRegime: "new" | "old";
  } | null>(null);

  function calculate() {
    const income = parseFloat(grossIncome) || 0;
    if (income <= 0) return;

    const stdDeductNew = empType === "salaried" ? 75_000 : 0;
    const stdDeductOld = empType === "salaried" ? 50_000 : 0;
    const c80 = Math.min(parseFloat(deduction80C) || 0, 1_50_000);
    const c80D = Math.min(parseFloat(deduction80D) || 0, age === "below60" ? 25_000 : 50_000);
    const hra = parseFloat(hraExemption) || 0;
    const loan = Math.min(parseFloat(homeLoan) || 0, 2_00_000);
    const other = parseFloat(otherDeductions) || 0;

    const newTaxable = Math.max(0, income - stdDeductNew);
    let newTax = calcNewRegimeTax(newTaxable);
    // 87A rebate: up to ₹60,000 if net taxable income ≤ ₹12,00,000
    if (newTaxable <= 12_00_000) {
      newTax = Math.max(0, newTax - 60_000);
    }
    newTax = applySurcharge(newTax, newTaxable);
    newTax = addCess(newTax);

    const totalOldDeductions = stdDeductOld + c80 + c80D + hra + loan + other;
    const oldTaxable = Math.max(0, income - totalOldDeductions);
    let oldTax = calcOldRegimeTax(oldTaxable, age);
    // 87A rebate: up to ₹12,500 if net taxable income ≤ ₹5,00,000
    if (oldTaxable <= 5_00_000) {
      oldTax = Math.max(0, oldTax - 12_500);
    }
    oldTax = applySurcharge(oldTax, oldTaxable);
    oldTax = addCess(oldTax);

    const betterRegime: "new" | "old" = newTax <= oldTax ? "new" : "old";
    const savings = Math.abs(oldTax - newTax);

    setResult({ newTax, oldTax, newTaxable, oldTaxable, savings, betterRegime });
  }

  function reset() {
    setGrossIncome("");
    setDeduction80C("");
    setDeduction80D("");
    setHraExemption("");
    setHomeLoan("");
    setOtherDeductions("");
    setResult(null);
  }

  const inputCls =
    "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-dark text-sm transition-all";

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Input Panel */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-4">
        <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest mb-2">
          Your Details — FY 2025–26
        </p>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-1.5">
            Gross Annual Income (₹)
          </label>
          <input
            type="number"
            placeholder="e.g. 1200000"
            value={grossIncome}
            onChange={(e) => setGrossIncome(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-1.5">
            Employment Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: "salaried", l: "Salaried" },
              { k: "selfemployed", l: "Self-Employed" },
            ].map((o) => (
              <button
                key={o.k}
                onClick={() => setEmpType(o.k as EmploymentType)}
                className={`py-2 rounded-xl text-xs font-heading font-semibold transition-all ${
                  empType === o.k
                    ? "bg-primary text-white"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-primary/30"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-heading font-semibold text-dark mb-1.5">
            Age Group
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: "below60", l: "< 60" },
              { k: "60to80", l: "60–80" },
              { k: "above80", l: "80+" },
            ].map((o) => (
              <button
                key={o.k}
                onClick={() => setAge(o.k as AgeGroup)}
                className={`py-2 rounded-xl text-xs font-heading font-semibold transition-all ${
                  age === o.k
                    ? "bg-primary text-white"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-primary/30"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>

        {/* Old regime deductions */}
        <div className="border-t border-slate-100 pt-4">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest mb-3">
            Old Regime Deductions
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-heading font-medium text-slate-500 mb-1">
                80C (max ₹1.5L) — PF, PPF, ELSS, LIC
              </label>
              <input
                type="number"
                placeholder="0"
                value={deduction80C}
                onChange={(e) => setDeduction80C(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-medium text-slate-500 mb-1">
                80D — Medical Insurance Premium
              </label>
              <input
                type="number"
                placeholder="0"
                value={deduction80D}
                onChange={(e) => setDeduction80D(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-medium text-slate-500 mb-1">
                HRA Exemption (if applicable)
              </label>
              <input
                type="number"
                placeholder="0"
                value={hraExemption}
                onChange={(e) => setHraExemption(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-medium text-slate-500 mb-1">
                Home Loan Interest — Sec 24(b) (max ₹2L)
              </label>
              <input
                type="number"
                placeholder="0"
                value={homeLoan}
                onChange={(e) => setHomeLoan(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-medium text-slate-500 mb-1">
                Other Deductions (NPS, 80G, etc.)
              </label>
              <input
                type="number"
                placeholder="0"
                value={otherDeductions}
                onChange={(e) => setOtherDeductions(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={calculate}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors"
          >
            <IndianRupee size={15} /> Calculate Tax
          </button>
          <button
            onClick={reset}
            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-colors"
            title="Reset"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* Result Panel */}
      <div className="lg:col-span-3 space-y-4">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-card p-8 flex flex-col items-center justify-center text-center min-h-[300px]"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/6 flex items-center justify-center mb-4">
                <IndianRupee size={28} className="text-primary/30" />
              </div>
              <p className="text-slate-500 font-heading font-medium text-sm">
                Enter your income and click Calculate
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Old vs New regime comparison will appear here
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              {/* Winner banner */}
              <div
                className={`rounded-2xl px-5 py-4 flex items-center gap-3 ${
                  result.betterRegime === "new"
                    ? "bg-green-50 border border-green-200"
                    : "bg-blue-50 border border-blue-200"
                }`}
              >
                <TrendingDown
                  size={20}
                  className={result.betterRegime === "new" ? "text-green-600" : "text-blue-600"}
                />
                <div>
                  <p
                    className={`text-sm font-heading font-bold ${
                      result.betterRegime === "new" ? "text-green-800" : "text-blue-800"
                    }`}
                  >
                    {result.betterRegime === "new" ? "New Regime" : "Old Regime"} saves you{" "}
                    {formatINR(result.savings)}
                  </p>
                  <p
                    className={`text-xs ${
                      result.betterRegime === "new" ? "text-green-600" : "text-blue-600"
                    }`}
                  >
                    The {result.betterRegime === "new" ? "New" : "Old"} Regime is better for you
                  </p>
                </div>
              </div>

              {/* Side-by-side comparison */}
              <div className="grid grid-cols-2 gap-4">
                {/* Old Regime */}
                <div
                  className={`rounded-2xl p-5 border ${
                    result.betterRegime === "old"
                      ? "border-primary bg-primary/4"
                      : "border-slate-100 bg-white shadow-card"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-heading font-bold text-dark">Old Regime</p>
                    {result.betterRegime === "old" && (
                      <span className="text-[10px] font-heading font-bold text-accent border border-accent/30 bg-accent/8 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <RegimeRow label="Gross Income" value={formatINR(parseFloat(grossIncome))} />
                  <RegimeRow
                    label="Total Deductions"
                    value={formatINR(
                      parseFloat(grossIncome) - result.oldTaxable
                    )}
                    muted
                  />
                  <RegimeRow label="Taxable Income" value={formatINR(result.oldTaxable)} />
                  <div className="border-t border-slate-200 mt-3 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-heading font-bold text-dark">
                        Tax Payable
                      </span>
                      <span className="text-base font-heading font-bold text-primary">
                        {formatINR(result.oldTax)}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted mt-0.5">(incl. 4% cess)</p>
                  </div>
                </div>

                {/* New Regime */}
                <div
                  className={`rounded-2xl p-5 border ${
                    result.betterRegime === "new"
                      ? "border-primary bg-primary/4"
                      : "border-slate-100 bg-white shadow-card"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-heading font-bold text-dark">New Regime</p>
                    {result.betterRegime === "new" && (
                      <span className="text-[10px] font-heading font-bold text-accent border border-accent/30 bg-accent/8 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <RegimeRow label="Gross Income" value={formatINR(parseFloat(grossIncome))} />
                  <RegimeRow
                    label={`Std Deduction${empType === "salaried" ? " (₹75K)" : " (NIL)"}`}
                    value={empType === "salaried" ? "−₹75,000" : "NIL"}
                    muted
                  />
                  <RegimeRow label="Taxable Income" value={formatINR(result.newTaxable)} />
                  {result.newTaxable <= 12_00_000 && (
                    <RegimeRow label="87A Rebate" value="Applied" muted />
                  )}
                  <div className="border-t border-slate-200 mt-3 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-heading font-bold text-dark">
                        Tax Payable
                      </span>
                      <span className="text-base font-heading font-bold text-primary">
                        {formatINR(result.newTax)}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted mt-0.5">(incl. 4% cess)</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 p-3 bg-accent/6 rounded-xl border border-accent/10">
                <Info size={13} className="text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600">
                  Calculation based on FY 2025–26 tax slabs. Budget 2025 brought zero tax
                  for income up to ₹12L (new regime). Consult a CA for exact computation
                  including surcharge, rebates, and special income.
                </p>
              </div>

              <Link
                href="/services/income-tax-return"
                className="flex items-center justify-between w-full px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors group"
              >
                <span className="text-sm font-heading font-semibold text-primary">
                  File your ITR with expert CAs
                </span>
                <ArrowRight
                  size={14}
                  className="text-accent group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RegimeRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-xs text-slate-500 font-body">{label}</span>
      <span className={`text-xs font-heading font-semibold ${muted ? "text-muted" : "text-dark"}`}>
        {value}
      </span>
    </div>
  );
}
