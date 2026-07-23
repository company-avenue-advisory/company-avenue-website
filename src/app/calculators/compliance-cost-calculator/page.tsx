import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ClipboardCheck } from "lucide-react";
import { ComplianceCostCalculator } from "@/components/calculators/ComplianceCostCalculator";
import { CalcInteractionTracker } from "@/components/calculators/CalcInteractionTracker";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Annual Compliance Cost Calculator",
  description:
    "Free annual compliance cost calculator for Pvt Ltd, LLP, OPC, Partnership and Sole Proprietorship. Get an itemised breakdown of ROC filings, audit, ITR, GST and payroll compliance costs for FY 2025-26.",
  keywords: [
    "annual compliance cost calculator India",
    "LLP compliance cost",
    "private limited company compliance cost",
    "ROC filing fees calculator",
    "company compliance calendar cost",
  ],
};

export default function ComplianceCostCalculatorPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/calculators" className="hover:text-white/70 transition-colors">Calculators</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Compliance Cost Calculator</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <ClipboardCheck size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              Free Tool
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            Annual Compliance Cost Calculator
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            Pick your business structure, add your directors/partners, turnover and headcount —
            get an itemised breakdown of every ROC filing, audit, ITR, GST and payroll cost due this year.
          </p>
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container-custom">
          <CalcInteractionTracker name="Compliance Cost Calculator"><ComplianceCostCalculator /></CalcInteractionTracker>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Why compliance cost varies by structure",
                content:
                  "A Pvt Ltd or OPC must file AOC-4 and MGT-7 with the ROC every year plus a mandatory statutory audit — an LLP only files Form 11 and Form 8. Partnerships and proprietorships skip ROC filing entirely.",
              },
              {
                title: "The ₹1 Cr / ₹10 Cr audit threshold",
                content:
                  "Tax audit under Section 44AB kicks in above ₹1 crore turnover — unless over 95% of your transactions are digital, which raises the threshold to ₹10 crore.",
              },
              {
                title: "GST adds a recurring cost",
                content:
                  "GST-registered businesses under ₹5 Cr can opt for the QRMP scheme (quarterly filing) instead of monthly GSTR-1/3B — meaningfully lower professional fees over the year.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
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
