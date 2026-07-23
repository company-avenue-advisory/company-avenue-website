import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { TDSRateFinder } from "@/components/calculators/TDSRateFinder";
import { CalcInteractionTracker } from "@/components/calculators/CalcInteractionTracker";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "TDS Rate Finder 2025 — Section, Rate & Threshold",
  description:
    "Find TDS rates for any payment type instantly — professional fees (194J), rent (194I), contract (194C), salary (192), and 15+ more. Includes section, threshold, and notes.",
  keywords: [
    "TDS rate finder India",
    "TDS on professional fees",
    "TDS rate chart 2025",
    "section 194J TDS",
    "TDS on rent section 194I",
    "TDS threshold limit",
  ],
};

export default function TDSRateFinderPage() {
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
            <span className="text-white/70">TDS Rate Finder</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <FileText size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              Free Tool
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            TDS Rate Finder
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            Search any payment type and instantly find the applicable TDS section, rate for
            individuals and companies, threshold limit, and important notes. Covers 18+
            payment categories.
          </p>
        </div>
      </div>

      {/* Tool */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <CalcInteractionTracker name="TDS Rate Finder"><TDSRateFinder /></CalcInteractionTracker>

          {/* Quick reference */}
          <div className="mt-12">
            <h2 className="font-heading font-bold text-dark text-xl mb-6">
              Most Common TDS Sections
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { section: "192", type: "Salary", rate: "As per slab", threshold: "Basic exemption" },
                { section: "194C", type: "Contract Payment", rate: "1% (Ind) / 2% (Co.)", threshold: "₹30,000 / ₹1,00,000" },
                { section: "194J", type: "Professional/Technical Fees", rate: "10% / 2%", threshold: "₹30,000" },
                { section: "194I", type: "Rent", rate: "10% / 2%", threshold: "₹2,40,000 p.a." },
                { section: "194H", type: "Commission / Brokerage", rate: "5%", threshold: "₹15,000" },
                { section: "194A", type: "Interest", rate: "10%", threshold: "₹40,000 / ₹50,000" },
              ].map((item) => (
                <div
                  key={item.section}
                  className="bg-white rounded-2xl border border-slate-100 shadow-card p-4 flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                    <span className="text-xs font-heading font-bold text-primary">{item.section}</span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-dark text-sm">{item.type}</p>
                    <p className="text-accent text-xs font-heading font-semibold mt-0.5">
                      {item.rate}
                    </p>
                    <p className="text-muted text-xs mt-0.5">Threshold: {item.threshold}</p>
                  </div>
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
