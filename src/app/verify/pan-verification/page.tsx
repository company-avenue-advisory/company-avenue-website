import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { PANVerification } from "@/components/tools/PANVerification";
import { CTABanner } from "@/components/sections/CTABanner";
import { ToolNextStep } from "@/components/tools/ToolNextStep";

export const metadata: Metadata = {
  alternates: { canonical: "/verify/pan-verification" },
  title: "PAN Verification Online — Verify PAN Card Details",
  description:
    "Free PAN verification tool. Confirm a PAN number matches the given name and date of birth, and check Aadhaar-seeding status — with explicit consent.",
  keywords: ["PAN verification online", "verify PAN card", "PAN card status check", "PAN Aadhaar link status"],
};

export default function PANVerificationPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Verification Tools", path: "/verify" },
          { name: "PAN Verification Online", path: "/verify/pan-verification" },
        ])} />
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/verify" className="hover:text-white/70 transition-colors">Verify</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">PAN Verification</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <ShieldCheck size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              Free Tool
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            PAN Verification
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            Confirm a PAN card is genuine and matches the holder&rsquo;s name and date of birth.
            Requires explicit consent — nothing is stored beyond the request.
          </p>
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container-custom">
          <PANVerification />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Why verify a PAN?",
                content:
                  "Confirm a director, vendor, or client's PAN is real before onboarding them — a standard KYC step for registrations, payroll, and vendor empanelment.",
              },
              {
                title: "Consent, always",
                content:
                  "PAN verification touches personal data (name, DOB). We require explicit consent before every check, and don't retain your inputs after the response is returned.",
              },
              {
                title: "Aadhaar-Seeding Status",
                content:
                  "The result also shows whether the PAN is linked to Aadhaar — required for e-filing income tax returns without penalty under current rules.",
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
          intro="A verified PAN is the starting point for most registrations and filings."
          ctaLabel="Get help with a tax filing"
          ctaHref="/contact"
          services={[
          {
            label: "Income Tax Return Filing",
            href: "/services/income-tax-return",
            desc: "ITR prepared and filed by a CA, with every deduction claimed correctly.",
          },
          {
            label: "TDS Return Filing",
            href: "/services/tds-return",
            desc: "Quarterly TDS returns, challans and Form 16/16A handled end to end.",
          },
          {
            label: "Private Limited Company",
            href: "/services/private-limited-company",
            desc: "Company PAN and TAN are issued with your Certificate of Incorporation.",
          },
          ]}
        />
      </div>

      <CTABanner />
    </>
  );
}
