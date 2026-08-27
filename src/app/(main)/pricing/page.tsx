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
import { FEE_SCHEDULE, ADDON_SCHEDULE } from "@/lib/pricing";
import { INCORP_FEE_CARD, inr } from "@/lib/calc-fees";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
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

   Every tier price below is BUILT FROM the client workbooks (27 Aug 2026), not
   quoted from a package sheet: the Basic tier is the incorporation fee card at
   the lowest capital slab, and Standard/Premium add the bundled add-on rates
   from the 'Add on cost' tab. The arithmetic is spelled out in each `note` so a
   client can check it. Sources: CAA_Incorporation_Cost_Calculator_v2 (2).xlsx,
   CAA_LLP_Cost_Calculator_v2.xlsx, Company_Closure_Exit (1).xlsx.
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
      { label: "Basic", price: "₹3,499", note: "Incorporation + PAN + TAN — fee card at ₹1 lakh authorised capital, name approval included" },
      { label: "Standard", price: "₹5,497", note: "Basic + GST registration ₹999 + Udyam ₹999 at bundled rates" },
      { label: "Premium", price: "₹15,494", note: "Standard + DPIIT ₹6,999 + INC-20A ₹1,499 + ADT-1 ₹1,499" },
    ],
    inclusions: [
      "Free structure consultation before you commit to a form",
      "2 × Digital Signature Certificates and SPICe+ name reservation",
      "eMOA, eAOA and AGILE-PRO-S drafted, signed and filed",
      "CRC query handling with one free resubmission on our effort",
      "Certificate of Incorporation, PAN and TAN, plus a 12-month compliance calendar",
    ],
    turnaround: "7–10 working days from complete documents",
    govtFee: "Nil MCA fee up to ₹15L authorised capital · Delhi stamp duty ₹360 at ₹1 lakh capital, ₹2,460 at ₹15 lakh · name reservation ₹1,000 · PAN & TAN ₹143",
    outOfPocket: "2 × DSC ₹4,000 (₹2,000 each, Class 3 two-year) · fresh name attempt ₹999 plus government fee if both reservations lapse",
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
      { label: "Basic", price: "₹3,499", note: "Incorporation, LLP Agreement drafting and Form 3 — all included" },
      { label: "Standard", price: "₹5,497", note: "Basic + GST registration ₹999 + Udyam ₹999 at bundled rates" },
      { label: "Premium", price: "₹12,496", note: "Standard + DPIIT recognition ₹6,999" },
    ],
    inclusions: [
      "RUN-LLP name reservation and FiLLiP incorporation filing",
      "2 × Digital Signature Certificates for designated partners",
      "LLP Agreement drafted, stamped and executed (Standard and above)",
      "Form 3 filed well inside the 30-day statutory window",
      "Written warning on the ₹100/day Form 3 late fee — no cap, and it catches people out",
    ],
    turnaround: "10–14 working days including the LLP Agreement and Form 3",
    govtFee: "RUN-LLP ₹200 · FiLLiP ₹500–₹5,000 by contribution slab · Form 3 ₹50–₹200 · DPIN ₹500 per partner without a DIN · PAN & TAN ₹143 · Delhi agreement stamp duty 1% of contribution, min ₹200, max ₹5,000",
    outOfPocket: "2 × DSC ₹4,000 · franking, stamp paper and notarisation ₹1,799",
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
      { label: "Basic", price: "₹3,499", note: "Incorporation + PAN + TAN — fee card at ₹1 lakh authorised capital, name approval included" },
      { label: "Standard", price: "₹5,497", note: "Basic + GST registration ₹999 + Udyam ₹999 at bundled rates" },
      { label: "Premium", price: "₹8,495", note: "Standard + INC-20A ₹1,499 + ADT-1 ₹1,499" },
    ],
    inclusions: [
      "Nominee identification and INC-3 consent collected first — it is the usual delay",
      "1 × Digital Signature Certificate and SPICe+ filing",
      "eMOA, eAOA and AGILE-PRO-S drafted and filed",
      "COI, PAN and TAN with a 12-month compliance calendar",
      "Conversion advice for the day a co-founder or investor arrives",
    ],
    turnaround: "7–10 working days from complete documents",
    govtFee: "Nil MCA fee up to ₹15L authorised capital · Delhi stamp duty ₹360 at ₹1 lakh capital · name reservation ₹1,000 · PAN & TAN ₹143",
    outOfPocket: "1 × DSC ₹2,000 (plus nominee DSC if needed, ₹2,000)",
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
      { label: "Director add / remove (DIR-12)", price: "₹1,999", note: "Per filing" },
      { label: "Share transfer (SH-4)", price: "₹3,499", note: "Per transfer, incl. stamping guidance" },
      { label: "Allotment of shares (PAS-3)", price: "₹4,999", note: "Per filing" },
      { label: "Increase authorised capital (SH-7)", price: "₹4,999", note: "Per filing; the MCA fee scales with the slab" },
      { label: "Alteration of objects clause", price: "₹7,999" },
      { label: "Adoption of a new set of Articles", price: "₹4,999" },
      { label: "Company name change (INC-24)", price: "₹9,999" },
      { label: "Registered office change", price: "₹2,999", note: "Same city; ₹9,999 for a new ROC in the same State; State-to-State on quote" },
    ],
    inclusions: [
      "Free structure review — we tell you honestly whether conversion is worth it yet",
      "Board and EGM resolutions, notices and altered MOA/AOA drafted from vetted templates",
      "Every form filed inside its statutory window — DIR-12, INC-22, SH-7, MGT-14 (30 days), PAS-3 (15 days)",
      "Statutory registers and MOA/AOA updated, with a full record pack delivered",
      "Written disclosure and a condonation quote before we proceed if past non-compliance surfaces",
    ],
    turnaround: "Documents in 2–3 working days · each form filed inside its statutory window",
    govtFee: "₹200–₹600 per form on the authorised-capital slab · share-transfer stamp duty 0.015% · capital-increase fee scales with the slab · late filing ₹100 per day per form, no cap",
    outOfPocket: "Board or shareholder resolution ₹999 each · share certificates ₹499 each, printed and stamped · DSC for a new director ₹2,000",
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
      { label: "Basic", price: "₹7,999", note: "Incorporation with the Section 8 licence" },
      { label: "Standard", price: "₹17,998", note: "Basic + Form 104 — provisional 12A and 80G ₹9,999, the donation unlock" },
      { label: "Premium", price: "₹26,497", note: "Standard + NGO Darpan ₹1,999 + CSR-1 registration ₹6,500" },
    ],
    inclusions: [
      "Charitable objects workshop — a vague objects clause is the single biggest cause of CRC rejection",
      "Three-year projected income and expenditure statement prepared from your inputs",
      "SPICe+ filed with INC-13, INC-14 and INC-15 declarations",
      "Form 10A filed for 12A and 80G (Standard and above)",
      "80G renewal diarised — provisional runs 3 years, regular 5",
    ],
    turnaround: "Incorporation 15–25 working days · Form 104 (provisional 12A/80G) 30–45 days · NGO Darpan 7–30 days · CSR-1 3–7 days",
    govtFee: "Nominal MCA fee on SPICe+ with the Section 8 licence · Delhi exempts Section 8 from MoA and AoA stamp duty, e-Form duty ₹10 still applies",
    outOfPocket: "2 × DSC ₹4,000 · Form 105 regular registration ₹22,000–₹52,000 by gross-receipts slab · FCRA registration ₹45,000, prior permission ₹30,000",
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
      { label: "Startup India / DPIIT recognition", price: "₹7,999", note: "₹6,999 bundled with an incorporation" },
      { label: "Startup grant readiness pack", price: "₹9,999", note: "Two stages — ₹499 eligibility check first, ₹9,500 only if you proceed" },
      { label: "Section 80-IAC exemption application", price: "₹24,999", note: "₹22,999 bundled" },
      { label: "Udyam (MSME) registration", price: "₹1,999", note: "₹999 bundled" },
      { label: "Trademark application", price: "₹3,499", note: "Per class · ₹2,499 bundled · search + opinion ₹1,499" },
      { label: "IEC (Import-Export Code)", price: "₹1,999", note: "₹1,499 bundled · DGFT fee ₹500" },
      { label: "FSSAI registration or licence", price: "₹3,999", note: "₹3,499 bundled" },
      { label: "NITI Aayog Darpan ID", price: "₹1,999", note: "₹1,499 bundled" },
    ],
    inclusions: [
      "Honest eligibility check first — under 10 years, under ₹100 Cr turnover, and the innovation test",
      "The grant pack is billed in two stages: we charge ₹499 to assess eligibility, and the ₹9,500 balance only if you elect to proceed",
      "Innovation and scalability note drafted by us, not by you",
      "Correct NIC codes on Udyam — the classification drives scheme eligibility later",
      "80% patent and 50% trademark statutory-fee rebates claimed under SIPP",
      "Benefits handover sheet mapping every scheme you become eligible for",
    ],
    turnaround: "Udyam same day · DPIIT filing 3 working days (recognition 2–10) · IEC 1–5 days",
    govtFee: "Nil for DPIIT and Udyam · trademark ₹4,500 per class at the startup/MSME rate, ₹9,000 for a company · IEC ₹500 · FSSAI ₹100–₹7,500/yr",
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
            <a
              href="#fee-schedule"
              className="inline-flex items-center gap-2 px-5 py-3 ml-3 border border-white/25 text-white text-sm font-heading font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Full fee schedule <ArrowRight size={14} />
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


      {/* ── À-la-carte fee schedule ───────────────────────────────────────── */}
      <section id="fee-schedule" className="py-16 bg-background scroll-mt-20">
        <div className="container-custom">
          <div className="max-w-3xl mb-10">
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-3 block">
              Standalone fee schedule
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark leading-tight mb-4">
              Every service, every fee, published
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Buy any of these on its own — no package required. Professional fees are
              exclusive of GST at 18%. Government fees, where payable, are additional and
              recovered at actuals; we never mark them up.
            </p>
          </div>

          {/* Incorporation fee card — our fee moves with authorised capital */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70">
              <p className="font-heading font-bold text-dark text-sm">
                Company incorporation — fee by authorised capital
              </p>
              <p className="text-xs text-muted mt-0.5">
                Private Limited, OPC and Section 8 all read from this card.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="text-left border-b border-slate-100">
                    <th className="px-6 py-3 font-heading font-bold text-dark text-xs uppercase tracking-wider">
                      Authorised capital up to
                    </th>
                    <th className="px-6 py-3 font-heading font-bold text-dark text-xs uppercase tracking-wider text-right">
                      Name already approved
                    </th>
                    <th className="px-6 py-3 font-heading font-bold text-dark text-xs uppercase tracking-wider text-right">
                      Including name approval
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INCORP_FEE_CARD.map((row) => (
                    <tr key={row.upTo}>
                      <td className="px-6 py-3 text-slate-600">{inr(row.upTo)}</td>
                      <td className="px-6 py-3 text-right font-heading font-bold text-dark">{inr(row.without)}</td>
                      <td className="px-6 py-3 text-right font-heading font-bold text-primary">{inr(row.withName)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-6 py-3 text-[11px] text-slate-400 leading-relaxed border-t border-slate-100">
              Capital above {inr(INCORP_FEE_CARD[INCORP_FEE_CARD.length - 1].upTo)} is quoted separately.
              MCA charges no registration fee up to ₹15,00,000 of authorised capital; stamp duty is
              a State levy and varies — run the{" "}
              <Link href="/calculators/company-registration-cost" className="text-primary font-medium hover:underline">
                registration cost calculator
              </Link>{" "}
              for yours.
            </p>
          </div>

          {/* Add-ons, standalone vs bundled */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70">
              <p className="font-heading font-bold text-dark text-sm">
                Add-on registrations — cheaper alongside an incorporation
              </p>
              <p className="text-xs text-muted mt-0.5">
                The bundled rate applies only where the service is bought with a company or LLP registration.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="text-left border-b border-slate-100">
                    <th className="px-6 py-3 font-heading font-bold text-dark text-xs uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 font-heading font-bold text-dark text-xs uppercase tracking-wider text-right">Standalone</th>
                    <th className="px-6 py-3 font-heading font-bold text-dark text-xs uppercase tracking-wider text-right">Bundled</th>
                    <th className="px-6 py-3 font-heading font-bold text-dark text-xs uppercase tracking-wider text-right">You save</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ADDON_SCHEDULE.map((row) => (
                    <tr key={row.label}>
                      <td className="px-6 py-3 text-slate-600 leading-snug">{row.label}</td>
                      <td className="px-6 py-3 text-right font-heading font-bold text-dark whitespace-nowrap">{row.standalone}</td>
                      <td className="px-6 py-3 text-right font-heading font-bold text-primary whitespace-nowrap">{row.bundled}</td>
                      <td className="px-6 py-3 text-right text-accent font-heading font-semibold text-xs whitespace-nowrap">
                        {row.saving ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Everything else, by category */}
          <div className="grid gap-6 lg:grid-cols-2">
            {FEE_SCHEDULE.map((group) => (
              <div
                key={group.category}
                className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70">
                  <p className="font-heading font-bold text-dark text-sm">{group.category}</p>
                </div>
                <dl className="divide-y divide-slate-100">
                  {group.rows.map((row) => (
                    <div key={row.service} className="px-6 py-3 flex items-start justify-between gap-4">
                      <dt className="text-[13px] text-slate-600 leading-snug">
                        {row.service}
                        <span className="block text-[11px] text-slate-400 mt-0.5">
                          {row.basis}
                          {row.note ? ` · ${row.note}` : ""}
                        </span>
                      </dt>
                      <dd className="text-[13px] font-heading font-bold text-dark whitespace-nowrap shrink-0">
                        {row.fee}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-muted leading-relaxed max-w-4xl">
            Fees are per assignment unless the row states otherwise. Where a line reads
            &ldquo;per financial year&rdquo;, &ldquo;per director&rdquo; or &ldquo;per class&rdquo;,
            it is charged for each such year, person or class. Out-of-pocket expenses — travel,
            courier, certified copies — are additional at actuals. Closure is not a discharge:
            under Section 250 the liability of every director, officer and member survives
            dissolution, and the NCLT may restore a struck-off company under Section 252 within
            twenty years.
          </p>
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
