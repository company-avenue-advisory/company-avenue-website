import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Search, ShieldCheck, Database, AlertTriangle } from "lucide-react";
import { CompanyNameSearch } from "@/components/tools/CompanyNameSearch";
import { CTABanner } from "@/components/sections/CTABanner";
import { CompanyNameFAQ } from "@/components/tools/CompanyNameFAQ";

export const metadata: Metadata = {
  title: "Company Name Search & Availability Check Online India (Free) | Company Avenue Advisory",
  description:
    "Free company name search and availability checker for India. Instantly check if your proposed Private Limited, LLP, OPC or Limited company name is already registered with the MCA — powered by real Ministry of Corporate Affairs data.",
  keywords: [
    "company name search India",
    "company name availability check",
    "MCA company name search",
    "check company name online free",
    "check if company name is available India",
    "private limited company name search",
    "LLP name availability check",
    "MCA name availability",
    "new company name check India",
    "business name search India free",
    "company name checker online",
    "is my company name taken",
  ],
};

export default function CompanyNameSearchPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/verify" className="hover:text-white/70 transition-colors">Verify</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Company Name Search</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Search size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              Free Tool · Government Data
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            Company Name Search &amp; Availability Check
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            Planning to register a Private Limited Company, LLP, OPC or start a new business in
            India? Check if your proposed company name is already taken — searched live against
            the Ministry of Corporate Affairs&rsquo; official Company Master Data, covering all
            4 million+ registered companies across every state and Registrar of Companies (RoC).
          </p>
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container-custom">
          <CompanyNameSearch />

          {/* Trust strip */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 p-4">
              <Database size={18} className="text-primary shrink-0" />
              <p className="text-xs text-muted">Sourced from MCA&rsquo;s official Company Master Data via data.gov.in</p>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 p-4">
              <ShieldCheck size={18} className="text-primary shrink-0" />
              <p className="text-xs text-muted">Checks Pvt Ltd, LLP, Limited &amp; OPC suffix variants automatically</p>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 p-4">
              <AlertTriangle size={18} className="text-primary shrink-0" />
              <p className="text-xs text-muted">Exact-match only — not a substitute for the official MCA RUN check</p>
            </div>
          </div>

          {/* SEO content block */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-dark text-2xl mb-4">
              How Company Name Search Works in India
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Before you can register a <strong className="text-dark">Private Limited Company</strong>,{" "}
              <strong className="text-dark">LLP</strong>, <strong className="text-dark">One Person Company (OPC)</strong> or
              any other entity with the Ministry of Corporate Affairs (MCA), your proposed name must
              be checked for availability. A company name search tells you whether an identical or
              deceptively similar name is already registered anywhere in India — across every state
              and every Registrar of Companies (RoC), from RoC-Mumbai to RoC-Delhi to RoC-Chennai.
            </p>
            <p className="text-muted text-sm leading-relaxed mb-4">
              This free company name checker queries the government&rsquo;s own{" "}
              <strong className="text-dark">Company Master Data</strong> — the same underlying
              dataset that powers the official MCA portal — and automatically checks your proposed
              name against the most common legal suffixes founders actually register under:{" "}
              <em>Private Limited</em>, <em>Limited</em>, <em>LLP</em>, and <em>OPC Private Limited</em>.
            </p>
            <h2 className="font-heading font-bold text-dark text-2xl mb-4 mt-10">
              Why Company Name Availability Matters
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Filing a SPICe+ incorporation application with a name that&rsquo;s already taken —
              or too similar to an existing registered company or trademark — is one of the most
              common reasons name-reservation (Part A) applications get rejected. Checking name
              availability upfront saves the government fee, the professional fee, and the 2–3 days
              you&rsquo;d otherwise lose to a rejected application.
            </p>
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <CompanyNameFAQ />
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
