import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Phone,
  Clock,
  Rocket,
  Building2,
  Users,
  User,
  GitMerge,
  HeartHandshake,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description:
    "Transparent, fixed-fee pricing from Company Avenue Advisory — Private Limited, LLP, OPC and Section 8 (NGO) registration, LLP-to-Pvt Ltd conversion, DPIIT/Udyam startup registrations, plus Startup Compliance Pack, SME Monthly Retainer and Growth Advisory retainers. No hidden costs.",
  keywords: [
    "private limited company registration fees india",
    "llp registration cost india",
    "one person company registration price",
    "section 8 company registration fees",
    "llp to private limited conversion cost",
    "dpiit startup india registration fees",
    "udyam msme registration charges",
    "compliance package pricing India",
    "CA firm monthly retainer cost",
    "startup compliance package price",
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

/* ──────────────────────────────────────────────────────────────────────────
   Hero services — the six registration mandates founders come to us for.
   Fees, package contents, SLAs and government-fee notes are taken from the
   CAPL Service Planning Workbook v2.0 (03 Aug 2026); all professional fees
   there are marked "(proposed)" pending the Principal's sign-off.
   ────────────────────────────────────────────────────────────────────────── */

interface HeroService {
  slug: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  summary: string;
  tiers: { label: string; price: string; note?: string }[];
  inclusions: string[];
  turnaround: string;
  govtFee: string;
  outOfPocket?: string;
  retainer?: string;
  featured?: boolean;
  relatedHref?: string;
  relatedLabel?: string;
}

const HERO_SERVICES: HeroService[] = [
  {
    slug: "private-limited-company",
    name: "Private Limited Company Registration",
    category: "Most chosen structure",
    icon: Building2,
    summary:
      "The structure investors expect — separate legal entity, limited liability and a cap table that can take equity. Incorporated through SPICe+ with PAN and TAN included.",
    tiers: [
      { label: "Basic", price: "₹9,999", note: "Incorporation + PAN + TAN" },
      { label: "Standard", price: "₹12,999", note: "Adds GST registration, Udyam and bank a/c support" },
      { label: "Premium", price: "₹14,999", note: "Adds DPIIT, first board minutes, share certificates, INC-20A" },
    ],
    inclusions: [
      "Free structure consultation before you commit to a form",
      "2 × Digital Signature Certificates and SPICe+ name reservation",
      "eMOA, eAOA and AGILE-PRO-S drafted, signed and filed",
      "CRC query handling with one free resubmission on our effort",
      "Certificate of Incorporation, PAN and TAN, plus a 12-month compliance calendar",
    ],
    turnaround: "7–10 working days from complete documents",
    govtFee: "Nil MCA fee up to ₹15L authorised capital; Delhi stamp duty ≈ ₹2,500–3,000 at actuals",
    outOfPocket: "2 × DSC ≈ ₹3,000 · notarisation ≈ ₹500 · RUN re-run ₹1,000 if a name is rejected",
    retainer: "Ladders into the Startup Compliance Pack at ₹7,999/month",
    featured: true,
    relatedHref: "/services/private-limited-company",
    relatedLabel: "Service details",
  },
  {
    slug: "llp-registration",
    name: "LLP Registration",
    category: "Partners, lighter compliance",
    icon: Users,
    summary:
      "Partnership flexibility with limited liability and materially lighter annual compliance than a company — the right call when you are not raising equity.",
    tiers: [
      { label: "Basic", price: "₹5,999", note: "Incorporation + PAN + TAN" },
      { label: "Standard", price: "₹8,499", note: "Adds LLP Agreement drafting and Form 3 filing" },
      { label: "Premium", price: "₹11,999", note: "Adds GST, Udyam and DPIIT recognition" },
    ],
    inclusions: [
      "RUN-LLP name reservation and FiLLiP incorporation filing",
      "2 × Digital Signature Certificates for designated partners",
      "LLP Agreement drafted, stamped and executed (Standard and above)",
      "Form 3 filed well inside the 30-day statutory window",
      "Written warning on the ₹100/day Form 3 late fee — no cap, and it catches people out",
    ],
    turnaround: "10–14 working days including the LLP Agreement and Form 3",
    govtFee: "FiLLiP ₹500–₹2,000 by contribution slab · Form 3 ₹50–₹200 · Delhi stamp duty 1% of contribution (min ≈ ₹500)",
    outOfPocket: "2 × DSC ≈ ₹3,000 · notarisation ≈ ₹500",
    retainer: "Startup Compliance Pack ₹7,999/month (LLP variant: Form 8, Form 11, ITR-5, GST)",
    relatedHref: "/services/llp-registration",
    relatedLabel: "Service details",
  },
  {
    slug: "one-person-company",
    name: "One Person Company (OPC)",
    category: "Solo founder",
    icon: User,
    summary:
      "A private limited company with a single shareholder and a mandatory nominee — corporate identity and a liability shield without needing a co-founder.",
    tiers: [
      { label: "Basic", price: "₹6,499", note: "Incorporation + PAN + TAN" },
      { label: "Standard", price: "₹8,999", note: "Adds GST registration and Udyam" },
      { label: "Premium", price: "₹12,999", note: "Adds DPIIT, INC-20A and first board minutes" },
    ],
    inclusions: [
      "Nominee identification and INC-3 consent collected first — it is the usual delay",
      "1 × Digital Signature Certificate and SPICe+ filing",
      "eMOA, eAOA and AGILE-PRO-S drafted and filed",
      "COI, PAN and TAN with a 12-month compliance calendar",
      "Conversion advice for the day a co-founder or investor arrives",
    ],
    turnaround: "7–10 working days from complete documents",
    govtFee: "Nil MCA fee up to ₹15L authorised capital; stamp duty at actuals",
    outOfPocket: "1 × DSC ≈ ₹1,500 (plus nominee DSC if needed) · notarisation ≈ ₹500",
    retainer: "Startup Compliance Pack ₹7,999/month",
    relatedHref: "/services/one-person-company",
    relatedLabel: "Service details",
  },
  {
    slug: "llp-to-private-limited",
    name: "LLP → Private Limited Conversion",
    category: "Ready to raise",
    icon: GitMerge,
    summary:
      "Convert an LLP into a private limited company so you can issue equity, run an ESOP pool and take institutional money. Scoped after a free structure review — cost turns on partner count, capital and asset transfer.",
    tiers: [
      { label: "LLP → Pvt Ltd conversion", price: "On quote", note: "Scoped on a free review — written quote before any work starts" },
      { label: "Director add / remove", price: "₹2,999" },
      { label: "Share transfer", price: "₹3,999" },
      { label: "Increase authorised capital", price: "₹4,999", note: "Plus slab advice; MCA fee scales with the slab" },
      { label: "MOA / AOA amendment", price: "₹6,999" },
      { label: "Company name change", price: "₹9,999" },
      { label: "Registered office change", price: "₹2,999", note: "Same city; ₹19,999+ for a state change (RD approval, 2–4 months)" },
    ],
    inclusions: [
      "Free structure review — we tell you honestly whether conversion is worth it yet",
      "Board and EGM resolutions, notices and altered MOA/AOA drafted from vetted templates",
      "Every form filed inside its statutory window — DIR-12, INC-22, SH-7, MGT-14 (30 days), PAS-3 (15 days)",
      "Statutory registers and MOA/AOA updated, with a full record pack delivered",
      "Written disclosure and a condonation quote before we proceed if past non-compliance surfaces",
    ],
    turnaround: "Documents in 2–3 working days · each form filed inside its statutory window",
    govtFee: "Per form at actuals · share-transfer stamp duty 0.015% · capital-increase fee scales with the slab",
    relatedHref: "/services/llp-to-company",
    relatedLabel: "Service details",
  },
  {
    slug: "section-8-company",
    name: "Section 8 Company (NGO)",
    category: "Not-for-profit",
    icon: HeartHandshake,
    summary:
      "A not-for-profit company for charitable objects — with 12A and 80G, the registrations that actually unlock donations and CSR funding.",
    tiers: [
      { label: "Basic", price: "₹14,999", note: "Incorporation with the Section 8 licence" },
      { label: "Standard", price: "₹19,999", note: "Adds 12A and 80G filing — the donation unlock" },
      { label: "Premium", price: "₹29,999", note: "Adds Niti Aayog Darpan, CSR-1 and a first-year compliance calendar" },
    ],
    inclusions: [
      "Charitable objects workshop — a vague objects clause is the single biggest cause of CRC rejection",
      "Three-year projected income and expenditure statement prepared from your inputs",
      "SPICe+ filed with INC-13, INC-14 and INC-15 declarations",
      "Form 10A filed for 12A and 80G (Standard and above)",
      "80G renewal diarised — provisional runs 3 years, regular 5",
    ],
    turnaround: "Incorporation 15–25 working days · 12A/80G 1–3 months (department-dependent)",
    govtFee: "Nominal MCA fee on SPICe+ with the Section 8 licence; stamp duty at actuals",
    outOfPocket: "2 × DSC ≈ ₹3,000 · declarations and notarisation ≈ ₹1,000",
    retainer: "NGO compliance retainer ₹4,999/month (books, ITR-7, annual filings)",
    relatedHref: "/services/section-8-company",
    relatedLabel: "Service details",
  },
  {
    slug: "startup-registrations",
    name: "Startup Registrations — Schemes & Certificates",
    category: "Unlock the benefits",
    icon: Rocket,
    summary:
      "DPIIT recognition, Udyam, trademark and the licence stack — the certificates that unlock tax holidays, fee rebates, collateral-free credit and government scheme eligibility.",
    tiers: [
      { label: "Startup India / DPIIT Recognition", price: "₹4,999 – ₹11,999", note: "Standard: we write the innovation note · Premium adds the 80-IAC application" },
      { label: "Udyam (MSME) Registration", price: "₹999", note: "Free inside any Standard or Premium incorporation package" },
      { label: "Trademark search + filing", price: "₹2,999", note: "Per class · ₹5,999 with objection-reply cover" },
      { label: "IEC (Import-Export Code)", price: "₹1,999" },
      { label: "FSSAI Food Licence", price: "₹1,499 – ₹7,999", note: "Basic / State / Central by turnover and activity" },
      { label: "Govt scheme & seed fund advisory", price: "from ₹24,999", note: "SISFS, MUDRA, CGTMSE, PMEGP and Stand-Up India" },
    ],
    inclusions: [
      "Honest eligibility check first — under 10 years, under ₹100 Cr turnover, and the innovation test",
      "Innovation and scalability note drafted by us, not by you (DPIIT Standard and above)",
      "Correct NIC codes on Udyam — the classification drives scheme eligibility later",
      "80% patent and 50% trademark statutory-fee rebates claimed under SIPP",
      "Benefits handover sheet mapping every scheme you become eligible for",
    ],
    turnaround: "Udyam same day · DPIIT filing 3 working days (recognition 2–10) · IEC 1–5 days",
    govtFee: "Nil for DPIIT and Udyam · trademark ₹4,500 per class at the startup/MSME rate · IEC ₹500 · FSSAI ₹100–₹7,500/yr",
    retainer: "Feeds directly into government scheme applications — see the scheme directory",
    featured: true,
    relatedHref: "/startup-schemes",
    relatedLabel: "Browse 69 govt schemes",
  },
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
            No surprise bills, no per-task invoicing. Fixed-fee registration services to get the
            entity right, and monthly retainers for the compliance that never stops. Every plan
            includes a dedicated CA and direct WhatsApp access.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm">
            <span>✓ Fixed Monthly Fee</span>
            <span>✓ Dedicated CA</span>
            <span>✓ No Hidden Costs</span>
            <span>✓ Free 15-min Consultation</span>
          </div>
          <div className="mt-8">
            <a
              href="#startup-services"
              className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-dark text-primary-900 hover:text-white text-sm font-heading font-bold rounded-xl transition-colors"
            >
              Jump to Registration &amp; Startup Services <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Monthly retainers ─────────────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-3 block">
              Monthly retainers
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark leading-tight">
              Compliance that runs on its own
            </h2>
          </div>

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
        </div>
      </section>

      {/* ── Startup funding & growth services ─────────────────────────────── */}
      <section id="startup-services" className="py-16 bg-white scroll-mt-20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-3 block">
              Registration &amp; startup services
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark leading-tight mb-4">
              Six services founders start with
            </h2>
            <p className="text-muted text-base leading-relaxed">
              One-time, fixed-fee engagements — quoted in writing before we start, with government
              fees billed separately at actuals. Get the entity and the certificates right and
              every{" "}
              <Link href="/startup-schemes" className="text-primary font-medium hover:underline">
                government scheme
              </Link>{" "}
              and bank facility downstream becomes winnable. Each one ladders naturally into a
              monthly retainer once you are running.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {HERO_SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.slug}
                  className={`relative bg-white rounded-2xl p-6 sm:p-7 flex flex-col ${
                    svc.featured
                      ? "border-2 border-primary/40 shadow-card-hover"
                      : "border border-slate-100 shadow-card"
                  }`}
                >
                  <div className="flex items-start gap-3.5 mb-4">
                    <span className="w-11 h-11 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon size={19} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-heading font-bold text-accent uppercase tracking-widest block mb-0.5">
                        {svc.category}
                      </span>
                      <h3 className="font-heading font-bold text-dark text-lg leading-snug">
                        {svc.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted text-sm leading-relaxed mb-5">{svc.summary}</p>

                  {/* Tiers */}
                  <div className="rounded-xl bg-background border border-slate-100 divide-y divide-slate-100 mb-4">
                    {svc.tiers.map((t) => (
                      <div
                        key={t.label}
                        className="flex items-center justify-between gap-4 px-4 py-2.5"
                      >
                        <div className="min-w-0">
                          <p className="text-[13px] font-heading font-semibold text-dark leading-snug">
                            {t.label}
                          </p>
                          {t.note && (
                            <p className="text-[11px] text-muted leading-snug mt-0.5">{t.note}</p>
                          )}
                        </div>
                        <p className="font-heading font-bold text-primary text-[15px] shrink-0">
                          {t.price}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Inclusions */}
                  <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest mb-2.5">
                    What&rsquo;s included
                  </p>
                  <ul className="space-y-2 mb-5 flex-1">
                    {svc.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] text-slate-600">
                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Meta */}
                  <div className="space-y-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-heading font-medium text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
                      <Clock size={11} className="text-accent shrink-0" />
                      {svc.turnaround}
                    </span>
                    <p className="text-[11px] text-muted leading-relaxed">
                      <strong className="text-slate-600 font-heading font-semibold">
                        Government fee:
                      </strong>{" "}
                      {svc.govtFee}
                    </p>
                    {svc.outOfPocket && (
                      <p className="text-[11px] text-muted leading-relaxed">
                        <strong className="text-slate-600 font-heading font-semibold">
                          Out of pocket:
                        </strong>{" "}
                        {svc.outOfPocket}
                      </p>
                    )}
                    {svc.retainer && (
                      <p className="text-[11px] text-accent-dark leading-relaxed font-medium">
                        {svc.retainer}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2.5 mt-auto">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors"
                    >
                      Book a Free Consultation <ArrowRight size={14} />
                    </Link>
                    {svc.relatedHref && (
                      <Link
                        href={svc.relatedHref}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 text-slate-600 text-sm font-heading font-medium rounded-xl hover:border-primary hover:text-primary transition-colors"
                      >
                        {svc.relatedLabel}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section note */}
          <div className="mt-8 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="p-5 bg-background rounded-2xl border border-slate-100">
              <p className="text-xs text-muted leading-relaxed">
                <strong className="text-dark">How billing works.</strong> 50% advance on
                engagement, balance before the final filing or handover. Government fees are
                payable 100% in advance at actuals. If a name or form is rejected we resubmit once
                free on our effort; the fresh government fee is to your account. Work only starts
                after the engagement letter, KYC/AML and DPDP consent are in place.
              </p>
            </div>
            <div className="p-5 bg-background rounded-2xl border border-slate-100">
              <p className="text-xs text-muted leading-relaxed">
                <strong className="text-dark">No guarantee of sanction.</strong> On DPIIT
                recognition, Section 8 licences and any government scheme or loan, approval sits
                with the registrar, committee or bank — never with a consultant. We commit to an
                honest eligibility view before you pay, a filing built to the evaluator&rsquo;s
                format, and a documented follow-up cadence. Rejection is not a refund event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact strip + global note ───────────────────────────────────── */}
      <section className="pb-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <p className="text-muted text-sm">
              Not sure which package fits? Talk to a CA — it&rsquo;s free.
            </p>
            <a
              href={`tel:${COMPANY.phone}`}
              data-track="call"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors"
            >
              <Phone size={13} /> Call {COMPANY.phone}
            </a>
          </div>

          <div className="mt-10 p-5 bg-background rounded-2xl border border-slate-100 max-w-3xl mx-auto text-center">
            <p className="text-xs text-muted leading-relaxed">
              <strong className="text-dark">Note:</strong> All prices are exclusive of applicable
              GST. Government/statutory fees (stamp duty, ROC fees, etc.) are billed separately at
              actuals where applicable. Final pricing may vary based on complexity — confirmed in
              writing before engagement begins. Professional fees are refundable only where work
              has not commenced; government fees once paid are non-refundable, as set out in our{" "}
              <Link href="/refund-policy" className="text-primary font-medium hover:underline">
                Refund Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
