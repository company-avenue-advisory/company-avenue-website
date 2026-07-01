import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Scale } from "lucide-react";
import { LLPvsPvtLtdTool } from "@/components/calculators/LLPvsPvtLtdTool";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "LLP vs Private Limited Company — Which is Better? | Company Avenue Advisory",
  description:
    "Compare LLP vs Private Limited Company in India — funding, compliance, taxes, liability, ESOPs, and more. Take our 5-question quiz for a personalized recommendation.",
  keywords: [
    "LLP vs pvt ltd India",
    "LLP vs private limited company comparison",
    "which company structure India",
    "LLP or pvt ltd for startup",
    "difference between LLP and private limited",
  ],
};

export default function LLPvsPvtLtdPage() {
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
            <span className="text-white/70">LLP vs Pvt Ltd</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Scale size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              Comparison Tool
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            LLP vs Private Limited Company
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            Answer 5 quick questions to get a personalised recommendation. Or browse our
            full side-by-side comparison of 14 parameters to decide what&apos;s right for your
            business.
          </p>
        </div>
      </div>

      {/* Tool */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <LLPvsPvtLtdTool />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
