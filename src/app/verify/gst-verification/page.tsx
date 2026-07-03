import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileCheck } from "lucide-react";
import { GSTVerification } from "@/components/tools/GSTVerification";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "GST Verification Online — Check GSTIN Status | Company Avenue Advisory",
  description:
    "Free GSTIN verification tool. Enter any GSTIN and instantly see legal name, trade name, registration status, and address — sourced live from GSTN.",
  keywords: ["GSTIN verification online", "GST number check", "verify GST number", "GSTIN status check"],
};

export default function GSTVerificationPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/verify" className="hover:text-white/70 transition-colors">Verify</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">GST Verification</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <FileCheck size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              Free Tool
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            GST Verification
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            Check any GSTIN instantly. Get the registered legal name, trade name, status, business
            type and address — pulled live from the GST Network.
          </p>
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container-custom">
          <GSTVerification />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Why verify a GSTIN?",
                content:
                  "Before paying a vendor or onboarding a client, confirm their GST registration is real and active — protects your input tax credit and reduces fraud risk.",
              },
              {
                title: "What is a GSTIN?",
                content:
                  "A 15-character code: 2-digit state code, 10-character PAN, entity code, default 'Z', and a checksum digit — unique to every GST-registered business.",
              },
              {
                title: "Data Source",
                content:
                  "Results are fetched live from the GST Network via a verified API partner — the same registry data the government portal itself uses.",
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

      <CTABanner />
    </>
  );
}
