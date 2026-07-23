import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calculator } from "lucide-react";
import { GSTCalculator } from "@/components/calculators/GSTCalculator";
import { CalcInteractionTracker } from "@/components/calculators/CalcInteractionTracker";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "GST Calculator — Inclusive & Exclusive",
  description:
    "Free online GST calculator for India. Calculate GST for all slabs (5%, 12%, 18%, 28%), inclusive or exclusive mode, CGST/SGST or IGST split. Updated for FY 2025-26.",
  keywords: [
    "GST calculator India",
    "GST calculator online free",
    "GST inclusive exclusive calculator",
    "CGST SGST calculator",
    "IGST calculator",
    "GST on services India",
  ],
};

export default function GSTCalculatorPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/calculators" className="hover:text-white/70 transition-colors">Calculators</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">GST Calculator</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Calculator size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              Free Tool
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            GST Calculator
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            Calculate GST instantly for all rate slabs — 5%, 12%, 18%, 28%. Supports
            inclusive/exclusive mode and CGST/SGST vs IGST split. Updated for FY 2025–26.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <CalcInteractionTracker name="GST Calculator"><GSTCalculator /></CalcInteractionTracker>

          {/* Info section */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "What is GST?",
                content:
                  "Goods and Services Tax (GST) is India's unified indirect tax levied on supply of goods and services. It replaced VAT, Service Tax, Excise Duty and other levies.",
              },
              {
                title: "CGST vs SGST vs IGST",
                content:
                  "For intra-state transactions: CGST (Central) + SGST (State) each at half the rate. For inter-state: IGST at full rate, collected by Centre and distributed to destination state.",
              },
              {
                title: "GST Rate Slabs",
                content:
                  "5% — Essential goods (food, healthcare). 12% — Standard goods/services. 18% — Most services. 28% — Luxury goods, automobiles, tobacco. Some items are exempt (0%).",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-slate-100 shadow-card p-5"
              >
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{item.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
