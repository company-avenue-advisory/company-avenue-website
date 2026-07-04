import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Phone } from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description:
    "Transparent, fixed-fee compliance packages for Indian startups and SMEs — Startup Compliance Pack, SME Monthly Retainer, Growth Advisory, and ROC Standalone filing. No hidden costs.",
  keywords: [
    "compliance package pricing India",
    "CA firm monthly retainer cost",
    "GST ROC compliance pricing",
    "startup compliance package price",
    "SME accounting retainer cost",
  ],
};

interface Package {
  name: string;
  for: string;
  price: string;
  priceNote: string;
  annual?: string;
  inclusions: string[];
  badge?: string;
  featured?: boolean;
}

const PACKAGES: Package[] = [
  {
    name: "Startup Compliance Pack",
    for: "New Pvt Ltd / LLP",
    price: "₹7,999",
    priceNote: "/month + GST",
    annual: "₹84,999/yr — save ₹16,000",
    inclusions: [
      "GST registration + GSTR-1/3B filing",
      "TDS return filing (26Q/24Q)",
      "ROC compliance (AOC-4, MGT-7)",
      "DIR-3 KYC for directors",
      "Income Tax Return (ITR-6/5)",
      "Dedicated CA + WhatsApp support",
    ],
  },
  {
    name: "SME Monthly Retainer",
    for: "Turnover ₹50L – ₹5Cr",
    price: "₹18,000",
    priceNote: "/month + GST",
    annual: "Save ₹36,000/yr on annual billing",
    badge: "Most Popular",
    featured: true,
    inclusions: [
      "Everything in Startup Compliance Pack",
      "Monthly bookkeeping & GSTR-2B reconciliation",
      "Payroll processing with PF/ESI",
      "Quarterly P&L and Balance Sheet",
      "Tax-planning review",
      "Same-day CA availability + notice handling",
    ],
  },
  {
    name: "Growth Advisory Pack",
    for: "Turnover ₹5Cr+ / investor-facing",
    price: "from ₹40,000",
    priceNote: "/month + GST",
    annual: "Custom pricing after discovery call",
    inclusions: [
      "Everything in SME Monthly Retainer",
      "Monthly MIS reporting",
      "Virtual CFO advisory",
      "Tax structuring",
      "Due-diligence & investor-ready financials",
      "Labour/HR compliance + quarterly strategy call",
    ],
  },
];

const ROC_STANDALONE = {
  name: "ROC Standalone",
  for: "Deadline-driven filers with overdue ROC/MCA obligations",
  price: "~₹15,000",
  priceNote: "one-off",
  inclusions: ["AOC-4", "MGT-7 / MGT-7A", "DIR-3 KYC", "ADT-1", "DPT-3"],
};

const SME_TIERS = [
  { turnover: "₹50L – ₹1Cr", price: "₹18,000/mo" },
  { turnover: "₹1Cr – ₹3Cr", price: "₹22,000/mo" },
  { turnover: "₹3Cr – ₹5Cr", price: "₹28,000/mo" },
];

export default function PricingPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-20">
        <div className="container-custom text-center">
          <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-4 block">
            Pricing & Packages
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
            Transparent, Fixed-Fee Compliance
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8">
            No surprise bills, no per-task invoicing. Pick the package that matches your stage —
            every plan includes a dedicated CA and direct WhatsApp access.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm">
            <span>✓ Fixed Monthly Fee</span>
            <span>✓ Dedicated CA</span>
            <span>✓ No Hidden Costs</span>
            <span>✓ Free 15-min Consultation</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-white rounded-2xl p-7 flex flex-col ${
                  pkg.featured
                    ? "border-2 border-primary shadow-card-hover lg:-mt-4 lg:mb-4"
                    : "border border-slate-100 shadow-card"
                }`}
              >
                {pkg.badge && (
                  <span className="absolute -top-3 left-7 bg-primary text-white text-[10px] font-heading font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                    {pkg.badge}
                  </span>
                )}
                <p className="font-heading font-bold text-dark text-lg mb-1">{pkg.name}</p>
                <p className="text-muted text-xs mb-5">{pkg.for}</p>
                <div className="mb-1">
                  <span className="font-heading font-bold text-dark text-3xl">{pkg.price}</span>
                  <span className="text-muted text-sm">{pkg.priceNote}</span>
                </div>
                {pkg.annual && <p className="text-accent text-xs font-medium mb-6">{pkg.annual}</p>}
                <ul className="space-y-3 mb-7 flex-1">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={15} className="text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-heading font-semibold transition-colors ${
                    pkg.featured
                      ? "bg-primary text-white hover:bg-primary-800"
                      : "border border-primary text-primary hover:bg-primary/5"
                  }`}
                >
                  Get Started <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          {/* SME tiers detail */}
          <div className="mt-12 bg-white rounded-2xl border border-slate-100 shadow-card p-6 max-w-3xl mx-auto">
            <p className="font-heading font-bold text-dark text-sm mb-4">
              SME Monthly Retainer — Pricing by Turnover
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SME_TIERS.map((tier) => (
                <div key={tier.turnover} className="text-center p-4 rounded-xl bg-background">
                  <p className="text-muted text-xs mb-1">{tier.turnover}</p>
                  <p className="font-heading font-bold text-primary text-lg">{tier.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ROC Standalone */}
          <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-card p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="font-heading font-bold text-dark text-sm">{ROC_STANDALONE.name}</p>
              <p className="text-muted text-xs mb-2">{ROC_STANDALONE.for}</p>
              <p className="text-xs text-slate-500">{ROC_STANDALONE.inclusions.join(" · ")}</p>
            </div>
            <div className="text-center shrink-0">
              <p className="font-heading font-bold text-dark text-2xl">{ROC_STANDALONE.price}</p>
              <p className="text-muted text-xs">{ROC_STANDALONE.priceNote}</p>
            </div>
          </div>

          {/* Contact strip */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <p className="text-muted text-sm">Not sure which package fits? Talk to a CA — it&rsquo;s free.</p>
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors"
            >
              <Phone size={13} /> Call {COMPANY.phone}
            </a>
          </div>

          <div className="mt-10 p-5 bg-white rounded-2xl border border-slate-100 shadow-card max-w-3xl mx-auto text-center">
            <p className="text-xs text-muted leading-relaxed">
              <strong className="text-dark">Note:</strong> All prices are exclusive of applicable GST.
              Government/statutory fees (stamp duty, ROC fees, etc.) are billed separately at actuals
              where applicable. Final pricing may vary based on complexity — confirmed in writing
              before engagement begins.
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
