import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight, Search, ShieldCheck, Database, AlertTriangle, Zap, Gift,
  Fingerprint, Award, FileCheck2, Landmark, Ban, IndianRupee,
  Check, X, ArrowRight, Building2,
} from "lucide-react";
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

const HERO_STATS = [
  { icon: Database, label: "4M+ Entities in DB" },
  { icon: Building2, label: "Pvt · LLP · OPC · Ltd" },
  { icon: Zap, label: "Instant Result" },
  { icon: Gift, label: "100% Free" },
];

const RULES = [
  {
    icon: Fingerprint, tint: "bg-blue-50 text-blue-600 ring-blue-100",
    title: "Must Be Unique",
    body: "Your name cannot be identical or deceptively similar to any existing company, LLP or trademark in India. MCA checks both spelling and phonetic similarity.",
  },
  {
    icon: Award, tint: "bg-purple-50 text-purple-600 ring-purple-100",
    title: "Trademark Clearance",
    body: "Run a trademark search before filing. A trademarked name can be objected even after ROC approval — run both checks together.",
  },
  {
    icon: FileCheck2, tint: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    title: "Entity Suffix Required",
    body: "Must end with the correct suffix — Private Limited, Limited, LLP or OPC Private Limited. Abbreviations like Pvt. Ltd. are accepted.",
  },
  {
    icon: Landmark, tint: "bg-amber-50 text-amber-600 ring-amber-100",
    title: "Regulated Words Need Approval",
    body: "Words like Bank, Insurance, SEBI, RBI, Stock Exchange, Venture Capital or NBFC need prior regulator approval before ROC filing.",
  },
  {
    icon: Ban, tint: "bg-rose-50 text-rose-600 ring-rose-100",
    title: "Prohibited Words",
    body: "Names implying government links (National, Central, State, Republic, President, Parliament) need special permission. Offensive names are rejected.",
  },
  {
    icon: IndianRupee, tint: "bg-teal-50 text-teal-600 ring-teal-100",
    title: "Minimum Capital for Some Words",
    body: "Words like International, Globe, Universal, Continental or Inter need ₹5 lakh authorised capital. Hindustan, India or Bharat need ₹50 lakh.",
  },
];

const DOS = [
  "Choose a name that reflects your business activity or product",
  "Keep it short, memorable and easy to spell & pronounce",
  "Run both MCA and trademark checks before filing",
  "Add the correct legal suffix (Private Limited, LLP, etc.)",
  "Reserve your domain name alongside the company name",
  "Check for exact AND phonetically similar names",
];

const DONTS = [
  "Don't use plural forms of existing company names",
  "Don't combine two existing registered names",
  "Don't use a different tense or number of an existing name",
  "Don't use government-implying words without permission",
  "Don't use banned or restricted words",
  "Don't just add a number or symbol to an existing name",
];

const PROCESS = [
  { n: 1, title: "Name Check", body: "Search MCA database + trademark registry for conflicts." },
  { n: 2, title: "RUN / SPICe+", body: "File RUN (Reserve Unique Name) on MCA21 — valid 20 days." },
  { n: 3, title: "DIN & DSC", body: "Get Director Identification Numbers & Digital Signatures." },
  { n: 4, title: "MOA / AOA", body: "Draft & file Memorandum and Articles of Association." },
  { n: 5, title: "COI Issued", body: "Certificate of Incorporation issued by ROC — you're live!" },
];

export default function CompanyNameSearchPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-dark via-primary-900 to-secondary pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:26px_26px]" />
        <div className="absolute -right-20 top-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="container-custom relative">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/verify" className="hover:text-white/70 transition-colors">Verify</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Company Name Search</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-accent" />
            <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase">
              Free · Instant · MCA Data Verified
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4 leading-[1.1] max-w-3xl">
            Check if your company or LLP name{" "}
            <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
              will clear MCA approval
            </span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            Search live against 4 million+ registered companies, LLPs &amp; entities on the
            MCA / ROC master database — before you spend ₹1,000 on RUN. Instant availability
            score, no login.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-white/70 text-sm">
                <s.icon size={15} className="text-accent" />
                <span className="font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search + content */}
      <section className="relative py-14 bg-background">
        <div className="container-custom">
          {/* Search tool — pulled up over the hero */}
          <div className="-mt-24 relative z-10 max-w-4xl mx-auto">
            <CompanyNameSearch />

            {/* Trust strip */}
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                { icon: Database, text: "Sourced from MCA's official Company Master Data via data.gov.in" },
                { icon: ShieldCheck, text: "Checks Pvt Ltd, LLP, Limited & OPC suffix variants automatically" },
                { icon: AlertTriangle, text: "Exact-match check — not a substitute for the official MCA RUN check" },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 p-3.5">
                  <t.icon size={17} className="text-primary shrink-0" />
                  <p className="text-[11px] text-muted leading-snug">{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* MCA naming rules */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <span className="h-px w-8 bg-accent" />
              <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase">MCA Naming Rules</span>
              <span className="h-px w-8 bg-accent" />
            </div>
            <h2 className="font-heading font-bold text-dark text-2xl md:text-3xl text-center mb-3">
              Rules for Company Name Approval in India
            </h2>
            <p className="text-muted text-sm text-center max-w-2xl mx-auto mb-10">
              Your name must pass MCA&rsquo;s screening before RUN (Reserve Unique Name) is approved.
              Know the rules before you apply.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {RULES.map((r) => (
                <div key={r.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ring-1 mb-4 ${r.tint}`}>
                    <r.icon size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-base mb-2">{r.title}</h3>
                  <p className="text-muted text-[13px] leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Do's & Don'ts */}
          <div className="mt-20 max-w-5xl mx-auto">
            <h2 className="font-heading font-bold text-dark text-2xl md:text-3xl text-center mb-10">
              Choosing a Company Name — Do&rsquo;s &amp; Don&rsquo;ts
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 md:p-7">
                <h3 className="flex items-center gap-2 font-heading font-bold text-emerald-700 text-lg mb-5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center"><Check size={16} /></span>
                  Do&rsquo;s
                </h3>
                <ul className="space-y-3">
                  {DOS.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-6 md:p-7">
                <h3 className="flex items-center gap-2 font-heading font-bold text-rose-700 text-lg mb-5">
                  <span className="w-7 h-7 rounded-lg bg-rose-100 flex items-center justify-center"><X size={16} /></span>
                  Don&rsquo;ts
                </h3>
                <ul className="space-y-3">
                  {DONTS.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <X size={16} className="text-rose-500 shrink-0 mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Process timeline */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <span className="h-px w-8 bg-accent" />
              <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase">Process</span>
              <span className="h-px w-8 bg-accent" />
            </div>
            <h2 className="font-heading font-bold text-dark text-2xl md:text-3xl text-center mb-3">
              How to Register a Company After Name Approval
            </h2>
            <p className="text-muted text-sm text-center max-w-2xl mx-auto mb-12">
              Name availability is step one. Company Avenue handles the complete registration end-to-end.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-3 relative">
              {PROCESS.map((p) => (
                <div key={p.n} className="relative flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-heading font-bold text-lg shadow-md mb-4 relative z-10">
                    {p.n}
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-1.5">{p.title}</h3>
                  <p className="text-muted text-[12px] leading-relaxed max-w-[180px]">{p.body}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/services/private-limited-company"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-heading font-bold rounded-xl hover:brightness-110 transition shadow-sm">
                Register My Company with Avenue <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* SEO content block */}
          <div className="mt-20 max-w-3xl mx-auto">
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
