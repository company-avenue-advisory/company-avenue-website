import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { ChevronRight, Building2 } from "lucide-react";
import { CompanyVerification } from "@/components/tools/CompanyVerification";
import { CTABanner } from "@/components/sections/CTABanner";
import { ToolNextStep } from "@/components/tools/ToolNextStep";

export const metadata: Metadata = {
  alternates: { canonical: "/verify/company-verification" },
  title: "Company & Director Verification — CIN/DIN Lookup",
  description:
    "Free MCA lookup tool. Verify any company by CIN/LLPIN or any director by DIN — get incorporation date, status, capital structure, and appointment history.",
  keywords: ["CIN verification", "DIN lookup", "MCA company search", "company verification India", "director verification"],
};

export default function CompanyVerificationPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Verification Tools", path: "/verify" },
          { name: "Company & Director Verification", path: "/verify/company-verification" },
        ])} />
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/verify" className="hover:text-white/70 transition-colors">Verify</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Company & Director Verification</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              MCA Powered
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            Company & Director Verification
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            Look up any company by CIN or LLPIN, or any director by DIN, and pull live data
            straight from the Ministry of Corporate Affairs registry.
          </p>
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container-custom">
          <CompanyVerification />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "What is a CIN?",
                content:
                  "The Corporate Identification Number — a unique 21-character code assigned to every company registered with the MCA, encoding its category, state, and year of incorporation.",
              },
              {
                title: "What is a DIN?",
                content:
                  "The Director Identification Number — an 8-digit unique ID every individual must hold before being appointed as a director of any Indian company.",
              },
              {
                title: "Use Case",
                content:
                  "Before signing a contract with a company, or accepting someone as a co-director, confirm their registration status and appointment history are genuine.",
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

      {/* WS-5.5 — contextual route from this free tool into the paid service. */}
      <div className="container-custom">
        <ToolNextStep
          intro="Looked up a company or director on the MCA registry? These are the filings that keep that record clean."
          ctaLabel="Review my company's compliance"
          ctaHref="/contact"
          services={[
          {
            label: "ROC Compliance",
            href: "/services/roc-compliance",
            desc: "AOC-4, MGT-7 and every annual filing a company owes the Registrar.",
          },
          {
            label: "Director KYC (DIR-3)",
            href: "/services/director-kyc",
            desc: "Annual director KYC before the 30 September deadline — avoid a deactivated DIN.",
          },
          {
            label: "Change in Directors",
            href: "/services/change-in-directors",
            desc: "Appointment, resignation and DIR-12 filing, done properly.",
          },
          ]}
        />
      </div>

      <CTABanner />
    </>
  );
}
