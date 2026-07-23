import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Building2 } from "lucide-react";
import { CompanyRegistrationCalculator } from "@/components/calculators/CompanyRegistrationCalculator";
import { CalcInteractionTracker } from "@/components/calculators/CalcInteractionTracker";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Company Registration Cost Calculator India 2025",
  description:
    "Estimate company registration costs in India — Pvt Ltd, LLP, OPC, Partnership. Includes government fees, state-wise stamp duty, DSC cost, and professional charges. Free tool.",
  keywords: [
    "company registration cost India 2025",
    "pvt ltd registration fees",
    "LLP registration cost",
    "OPC registration charges",
    "company registration stamp duty",
    "MCA registration fees",
  ],
};

export default function CompanyRegistrationCostPage() {
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
            <span className="text-white/70">Registration Cost</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              Free Estimator
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            Company Registration Cost Calculator
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            Select your entity type and state to get an instant cost breakdown — government
            fees, stamp duty, DSC, and professional charges. Covers all major states.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <CalcInteractionTracker name="Company Registration Cost"><CompanyRegistrationCalculator /></CalcInteractionTracker>

          {/* Cost components explained */}
          <div className="mt-12">
            <h2 className="font-heading font-bold text-dark text-xl mb-6">
              What&apos;s Included in the Registration Cost?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Government / MCA Fee",
                  desc: "ROC filing fees paid to the Ministry of Corporate Affairs via the SPICe+ form. Based on authorized capital.",
                },
                {
                  title: "Stamp Duty",
                  desc: "State-specific levy on the Memorandum of Association (MOA) or LLP Agreement. Varies by state and capital.",
                },
                {
                  title: "DSC — Digital Signature",
                  desc: "Mandatory for each director/partner to sign MCA forms digitally. Typically ₹1,500 per person.",
                },
                {
                  title: "Professional Fees",
                  desc: "CA/CS charges for drafting documents, applying for name approval, filing all forms, and post-incorporation support.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-slate-100 shadow-card p-5"
                >
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{item.title}</h3>
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
