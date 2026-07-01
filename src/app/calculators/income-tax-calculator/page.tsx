import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, IndianRupee } from "lucide-react";
import { IncomeTaxCalculator } from "@/components/calculators/IncomeTaxCalculator";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Income Tax Calculator FY 2025-26 — Old vs New Regime | Company Avenue Advisory",
  description:
    "Free income tax calculator for FY 2025-26. Compare Old vs New regime with Sec 87A rebate, standard deduction, HRA, 80C, 80D. Budget 2025 updated — zero tax up to ₹12L in new regime.",
  keywords: [
    "income tax calculator India 2025",
    "old vs new tax regime calculator",
    "income tax calculator FY 2025-26",
    "new regime tax calculator",
    "87A rebate calculator",
    "income tax after budget 2025",
  ],
};

export default function IncomeTaxCalculatorPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/calculators" className="hover:text-white/70 transition-colors">Calculators</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Income Tax Calculator</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <IndianRupee size={22} className="text-white" />
            </div>
            <span className="inline-flex items-center gap-1.5 text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              Budget 2025 Updated
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            Income Tax Calculator FY 2025–26
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            Compare Old Regime vs New Regime taxes with all major deductions — 80C, 80D, HRA,
            Home Loan. Includes Budget 2025 rebate: zero tax up to ₹12L in New Regime.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <IncomeTaxCalculator />

          {/* Key changes section */}
          <div className="mt-12">
            <h2 className="font-heading font-bold text-dark text-xl mb-6">
              Key Changes in Budget 2025 — New Tax Regime
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Zero Tax up to ₹12L",
                  desc: "Section 87A rebate increased to ₹60,000 — effectively nil tax for income ≤ ₹12L (new regime)",
                },
                {
                  title: "Std Deduction ₹75,000",
                  desc: "Standard deduction for salaried individuals raised to ₹75,000 in the New Regime",
                },
                {
                  title: "Revised Slabs",
                  desc: "New regime has 7 slabs from 0% to 30%. First slab of 0% now extends to ₹4L (was ₹3L)",
                },
                {
                  title: "Old Regime unchanged",
                  desc: "Old regime slabs and deductions (80C, 80D, HRA, etc.) remain the same for FY 2025–26",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-slate-100 shadow-card p-5"
                >
                  <h3 className="font-heading font-bold text-primary text-sm mb-2">{item.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
