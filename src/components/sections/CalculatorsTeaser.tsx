"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, IndianRupee, FileText, Building2, Scale, Lightbulb, ClipboardCheck, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const TOOLS = [
  {
    icon: Calculator,
    label: "GST Calculator",
    desc: "Inclusive/exclusive, CGST/SGST split",
    href: "/calculators/gst-calculator",
    color: "text-blue-600 bg-blue-50 group-hover:bg-blue-600",
  },
  {
    icon: IndianRupee,
    label: "Income Tax Calculator",
    desc: "Old vs New Regime — FY 2025–26",
    href: "/calculators/income-tax-calculator",
    color: "text-green-600 bg-green-50 group-hover:bg-green-600",
  },
  {
    icon: FileText,
    label: "TDS Rate Finder",
    desc: "Section, rate & threshold lookup",
    href: "/calculators/tds-rate-finder",
    color: "text-purple-600 bg-purple-50 group-hover:bg-purple-600",
  },
  {
    icon: Building2,
    label: "Registration Cost Estimator",
    desc: "Pvt Ltd, LLP, OPC — state-wise",
    href: "/calculators/company-registration-cost",
    color: "text-orange-600 bg-orange-50 group-hover:bg-orange-600",
  },
  {
    icon: Scale,
    label: "LLP vs Pvt Ltd",
    desc: "Side-by-side comparison + quiz",
    href: "/calculators/llp-vs-pvt-ltd",
    color: "text-slate-600 bg-slate-100 group-hover:bg-slate-600",
  },
  {
    icon: Lightbulb,
    label: "Structure Advisor",
    desc: "6-question quiz → right entity",
    href: "/calculators/business-structure-advisor",
    color: "text-amber-600 bg-amber-50 group-hover:bg-amber-600",
  },
  {
    icon: ClipboardCheck,
    label: "Compliance Cost Calculator",
    desc: "Itemised annual filing cost breakdown",
    href: "/calculators/compliance-cost-calculator",
    color: "text-rose-600 bg-rose-50 group-hover:bg-rose-600",
  },
];

export function CalculatorsTeaser() {
  return (
    <section className="section-pad bg-white">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Free Online Tools"
          title="Calculators & Business Tools"
          subtitle="Instant answers to your tax and compliance questions — no signup, no cost."
        />

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  href={tool.href}
                  className="group flex flex-col items-center text-center p-5 rounded-2xl border border-slate-100 hover:border-primary/20 shadow-card hover:shadow-card-hover transition-all duration-300 bg-white h-full"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:text-white ${tool.color}`}
                  >
                    <Icon size={20} />
                  </div>
                  <p className="text-xs font-heading font-bold text-dark mb-1 group-hover:text-primary transition-colors leading-snug">
                    {tool.label}
                  </p>
                  <p className="text-[10px] text-muted leading-relaxed">{tool.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors shadow-sm"
          >
            View All Tools <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
