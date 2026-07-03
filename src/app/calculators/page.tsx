import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator, IndianRupee, FileText, Building2,
  Scale, Lightbulb, ArrowRight, ShieldCheck, FileCheck, Tag,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Free Business & Tax Calculators | Company Avenue Advisory",
  description:
    "Free online calculators for Indian businesses — GST calculator, income tax calculator (old vs new regime), TDS rate finder, company registration cost estimator, LLP vs Pvt Ltd comparison, and business structure advisor.",
  keywords: [
    "GST calculator India",
    "income tax calculator 2025-26",
    "TDS rate finder",
    "company registration cost calculator",
    "LLP vs pvt ltd comparison",
    "business structure advisor India",
  ],
};

const TOOLS = [
  {
    slug: "gst-calculator",
    icon: Calculator,
    title: "GST Calculator",
    description:
      "Calculate GST amount (inclusive/exclusive) for all slabs — 5%, 12%, 18%, 28%. Get CGST/SGST or IGST split instantly.",
    keywords: ["GST calculator", "CGST SGST IGST", "GST on services India"],
    badge: "Most Used",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    href: "/calculators/gst-calculator",
  },
  {
    slug: "income-tax-calculator",
    icon: IndianRupee,
    title: "Income Tax Calculator",
    description:
      "Compare Old vs New Regime for FY 2025–26. Includes Sec 87A rebate, standard deduction, HRA, 80C, and more.",
    keywords: ["income tax calculator India 2025", "old vs new regime calculator"],
    badge: "Budget 2025",
    color: "bg-green-50 text-green-600 border-green-100",
    href: "/calculators/income-tax-calculator",
  },
  {
    slug: "tds-rate-finder",
    icon: FileText,
    title: "TDS Rate Finder",
    description:
      "Select any payment type and instantly get the applicable TDS section, rate, and threshold limit.",
    keywords: ["TDS on professional fees", "TDS rate India", "section 194J"],
    badge: null,
    color: "bg-purple-50 text-purple-600 border-purple-100",
    href: "/calculators/tds-rate-finder",
  },
  {
    slug: "company-registration-cost",
    icon: Building2,
    title: "Company Registration Cost Calculator",
    description:
      "Estimate registration cost for Pvt Ltd, LLP, OPC, and more. Includes govt fees, stamp duty, DSC, and professional charges by state.",
    keywords: ["company registration cost India", "pvt ltd registration fees 2024"],
    badge: "Popular",
    color: "bg-orange-50 text-orange-600 border-orange-100",
    href: "/calculators/company-registration-cost",
  },
  {
    slug: "llp-vs-pvt-ltd",
    icon: Scale,
    title: "LLP vs Pvt Ltd Comparison",
    description:
      "Answer 5 quick questions to get a personalised recommendation. Plus a full side-by-side comparison table of 14 key parameters.",
    keywords: ["LLP vs pvt ltd", "which company structure India"],
    badge: null,
    color: "bg-slate-50 text-slate-600 border-slate-200",
    href: "/calculators/llp-vs-pvt-ltd",
  },
  {
    slug: "business-structure-advisor",
    icon: Lightbulb,
    title: "Business Structure Advisor",
    description:
      "6-question quiz that recommends the right business structure — Pvt Ltd, LLP, OPC, Partnership, or Sole Proprietorship — with reasoning.",
    keywords: ["what type of company should I register India"],
    badge: "Interactive",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    href: "/calculators/business-structure-advisor",
  },
];

const VERIFY_TOOLS = [
  {
    slug: "gst-verification",
    icon: FileCheck,
    title: "GST Verification",
    description:
      "Instantly check if a GSTIN is active, and pull the registered business name, address and registration date straight from GSTN records.",
    badge: "Most Used",
    color: "bg-green-50 text-green-600 border-green-100",
    href: "/verify/gst-verification",
  },
  {
    slug: "pan-verification",
    icon: ShieldCheck,
    title: "PAN Verification",
    description:
      "Verify a PAN number against name and date of birth, and check its Aadhaar-seeding status — with explicit consent at every step.",
    badge: null,
    color: "bg-blue-50 text-blue-600 border-blue-100",
    href: "/verify/pan-verification",
  },
  {
    slug: "company-verification",
    icon: Building2,
    title: "Company & Director Verification",
    description:
      "Look up any company by CIN/LLPIN, or any director by DIN, and pull live incorporation, capital and appointment data from the MCA registry.",
    badge: "MCA Powered",
    color: "bg-purple-50 text-purple-600 border-purple-100",
    href: "/verify/company-verification",
  },
  {
    slug: "trademark-class-finder",
    icon: Tag,
    title: "Trademark Class Finder",
    description:
      "Describe your business and instantly see which of the 45 NICE trademark classes it likely falls under — then check name availability on IP India.",
    badge: "Free",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    href: "/verify/trademark-class-finder",
  },
];

export default function CalculatorsPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-20">
        <div className="container-custom text-center">
          <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-4 block">
            Free Online Tools
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
            Calculators & Business Tools
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8">
            Free, instant tools to estimate taxes, compare business structures, find TDS rates,
            and calculate registration costs — no signup required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm">
            <span>✓ 10 Free Tools</span>
            <span>✓ FY 2025–26 Updated</span>
            <span>✓ No Registration</span>
            <span>✓ Mobile Friendly</span>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <section className="py-16 bg-background">
        <div className="container-custom">

          {/* Calculators */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                <Calculator size={20} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-dark text-xl">Calculators & Advisors</h2>
                <p className="text-muted text-sm">Estimate taxes, compare structures and find rates.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="group bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white ${tool.color}`}>
                        <Icon size={22} />
                      </div>
                      {tool.badge && (
                        <span className="text-[10px] font-heading font-bold text-accent border border-accent/30 bg-accent/5 px-2.5 py-1 rounded-full">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                      {tool.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{tool.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tool.keywords.map((kw) => (
                        <span key={kw} className="text-[10px] font-body text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                          {kw}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-primary text-xs font-heading font-semibold">
                      Open Tool
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1 text-accent" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Verification Tools */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-dark text-xl">Verification Tools</h2>
                <p className="text-muted text-sm">Live government-data lookups — GST, PAN, MCA and trademark.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VERIFY_TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="group bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white ${tool.color}`}>
                        <Icon size={22} />
                      </div>
                      {tool.badge && (
                        <span className="text-[10px] font-heading font-bold text-accent border border-accent/30 bg-accent/5 px-2.5 py-1 rounded-full">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                      {tool.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{tool.description}</p>
                    <div className="flex items-center gap-1 text-primary text-xs font-heading font-semibold">
                      Open Tool
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1 text-accent" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-5 bg-white rounded-2xl border border-slate-100 shadow-card max-w-3xl mx-auto text-center">
            <p className="text-xs text-muted leading-relaxed">
              <strong className="text-dark">Disclaimer:</strong> All calculators are for
              indicative/educational purposes only. Tax laws and rates are subject to change.
              Please consult a qualified CA/CS for exact figures applicable to your situation.
              Company Avenue Advisory is not liable for decisions made solely based on these
              tool outputs.
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
