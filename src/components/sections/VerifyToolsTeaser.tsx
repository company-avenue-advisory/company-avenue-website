"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileCheck, ShieldCheck, Building2, Tag, Search, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const TOOLS = [
  {
    icon: FileCheck,
    label: "GST Verification",
    desc: "Check any GSTIN, live",
    href: "/verify/gst-verification",
    color: "text-green-600 bg-green-50 group-hover:bg-green-600",
  },
  {
    icon: ShieldCheck,
    label: "PAN Verification",
    desc: "Name, DOB & Aadhaar-link check",
    href: "/verify/pan-verification",
    color: "text-blue-600 bg-blue-50 group-hover:bg-blue-600",
  },
  {
    icon: Building2,
    label: "Company & Director Lookup",
    desc: "CIN / LLPIN / DIN — MCA data",
    href: "/verify/company-verification",
    color: "text-purple-600 bg-purple-50 group-hover:bg-purple-600",
  },
  {
    icon: Tag,
    label: "Trademark Class Finder",
    desc: "Find your NICE class instantly",
    href: "/verify/trademark-class-finder",
    color: "text-amber-600 bg-amber-50 group-hover:bg-amber-600",
  },
  {
    icon: Search,
    label: "Company Name Search",
    desc: "Check name availability, live",
    href: "/verify/company-name-search",
    color: "text-rose-600 bg-rose-50 group-hover:bg-rose-600",
  },
];

export function VerifyToolsTeaser() {
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Free Verification Tools"
          title="Verify Any Business, Instantly"
          subtitle="Real government-data lookups — GST, PAN, MCA company & director records, and trademark class guidance."
        />

        <div className="mt-8 md:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  href={tool.href}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl border border-slate-100 hover:border-primary/20 shadow-card hover:shadow-card-hover transition-all duration-300 bg-white h-full"
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:text-white ${tool.color}`}
                  >
                    <Icon size={24} />
                  </div>
                  <p className="text-sm font-heading font-bold text-dark mb-1 group-hover:text-primary transition-colors leading-snug">
                    {tool.label}
                  </p>
                  <p className="text-[11px] text-muted leading-relaxed">{tool.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors shadow-sm"
          >
            View All Verification Tools <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
