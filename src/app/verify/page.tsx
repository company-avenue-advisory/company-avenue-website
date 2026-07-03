import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Building2, Tag, FileCheck, Search, ArrowRight } from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Free Business Verification Tools — GST, PAN, MCA & Trademark | Company Avenue Advisory",
  description:
    "Free instant verification tools for Indian businesses — GSTIN verification, PAN verification, company/director (CIN/DIN) lookup, and a trademark class finder.",
  keywords: [
    "GSTIN verification online",
    "PAN verification online",
    "CIN verification",
    "DIN lookup",
    "trademark class finder India",
  ],
};

const TOOLS = [
  {
    slug: "gst-verification",
    icon: FileCheck,
    title: "GST Verification",
    description:
      "Instantly check if a GSTIN is active, and pull the registered business name, address and registration date straight from GSTN records.",
    badge: "Most Used",
    color: "bg-green-50 text-green-600 border-green-100",
  },
  {
    slug: "pan-verification",
    icon: ShieldCheck,
    title: "PAN Verification",
    description:
      "Verify a PAN number against name and date of birth, and check its Aadhaar-seeding status — with explicit consent at every step.",
    badge: null,
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    slug: "company-verification",
    icon: Building2,
    title: "Company & Director Verification",
    description:
      "Look up any company by CIN/LLPIN, or any director by DIN, and pull live incorporation, capital and appointment data from the MCA registry.",
    badge: "MCA Powered",
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    slug: "trademark-class-finder",
    icon: Tag,
    title: "Trademark Class Finder",
    description:
      "Describe your business and instantly see which of the 45 NICE trademark classes it likely falls under — then check name availability on IP India.",
    badge: "Free",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    slug: "company-name-search",
    icon: Search,
    title: "Company Name Search",
    description:
      "Check if your proposed company name is already registered — searched live against the MCA's Company Master Data across Pvt Ltd, LLP, Limited and OPC suffixes.",
    badge: "New",
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
];

export default function VerifyHubPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-20">
        <div className="container-custom text-center">
          <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-4 block">
            Free Verification Tools
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
            Verify Any Business, Instantly
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8">
            Real government-data lookups — GST, PAN, MCA company &amp; director records, and
            trademark class guidance. Free to use, no signup required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm">
            <span>✓ Live Government Data</span>
            <span>✓ No Signup</span>
            <span>✓ Instant Results</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.slug}
                  href={`/verify/${tool.slug}`}
                  className="group bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white ${tool.color}`}
                    >
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

          <div className="mt-12 p-5 bg-white rounded-2xl border border-slate-100 shadow-card max-w-3xl mx-auto text-center">
            <p className="text-xs text-muted leading-relaxed">
              <strong className="text-dark">Disclaimer:</strong> These tools query live government
              and registry data for informational purposes. Company Avenue Advisory does not store
              submitted PAN/GST/CIN details beyond the request needed to fetch results. For
              legal or compliance decisions, please consult a qualified CA/CS.
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
