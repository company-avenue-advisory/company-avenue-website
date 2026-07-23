"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText, Globe,
  Building2, Users, Briefcase, Award, ShieldCheck, TrendingUp,
  AlertTriangle, BarChart3, Calculator, Layers, Scale, BookOpen,
  Clock, ChevronRight, Zap, UserCheck, Repeat2, BadgeCheck,
  DollarSign, Landmark, Info, RefreshCcw, HeartPulse, Search,
  DatabaseZap, ClipboardList, Stamp, SendHorizonal, Network,
} from "lucide-react";
import { faqs } from "@/lib/faqs/TransferPricingPage";

/* ══════════════════════════════════════
   ANIMATION
══════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

/* ══════════════════════════════════════
   SHARED SUB-COMPONENTS
══════════════════════════════════════ */
function Eyebrow({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
      <span className="w-6 h-px bg-accent" />
      {label}
      <span className="w-6 h-px bg-accent" />
    </span>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <span itemProp="name" className="font-heading font-semibold text-dark text-sm leading-snug">
          {q}
        </span>
        <span className="shrink-0 w-6 h-6 rounded-full bg-primary/8 flex items-center justify-center text-primary">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <p itemProp="text" className="px-5 pb-5 text-muted text-sm leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const quickFacts = [
  { label: "Section", value: "92–92F" },
  { label: "Form", value: "3CEB" },
  { label: "Threshold", value: "Intl. Txns ≥ ₹1 Crore" },
  { label: "Due Date", value: "30 November" },
  { label: "Methods", value: "CUP/RPM/CPM/TNMM/PSM" },
  { label: "Penalty", value: "2% of Txn Value" },
];

const whoNeeds = [
  { icon: Building2, title: "Indian Subsidiaries of MNCs", desc: "Indian arms of foreign multinationals must benchmark all cross-border related-party transactions annually." },
  { icon: Globe, title: "Overseas Related-Party Transactions", desc: "Any Indian company with imports, exports, or service transactions with foreign group entities." },
  { icon: DollarSign, title: "Management Fee Recipients", desc: "Companies receiving management services, IT support, or shared services from their parent entity abroad." },
  { icon: Landmark, title: "Inter-Company Lenders", desc: "Indian companies extending loans to or receiving loans from foreign associate enterprises." },
  { icon: Users, title: "Cross-Border Joint Ventures", desc: "JVs involving non-resident partners where income or cost allocation crosses the international border." },
  { icon: Award, title: "ESOP Beneficiaries", desc: "Indian employees receiving stock options from a foreign parent — the recharge creates an international transaction." },
  { icon: BadgeCheck, title: "Royalty-Paying Entities", desc: "Indian HQs or subsidiaries paying royalties, technical fees, or brand licence fees to overseas entities." },
  { icon: Network, title: "Cross-Border Service Arrangements", desc: "Back-office BPO/KPO services, software development, or any inter-company service arrangement with non-residents." },
];

const benefits = [
  { icon: ShieldCheck, title: "Avoid 2% Penalty", desc: "A documented TP study is your primary defence against the 2% penalty on the transaction value for non-compliance." },
  { icon: Globe, title: "OECD Guideline Compliance", desc: "Study aligned with OECD transfer pricing guidelines and BEPS Action Plans for global consistency." },
  { icon: Search, title: "Minimise TP Risk in Audit", desc: "Robust documentation reduces the risk of TP additions and adjustments during Income Tax scrutiny." },
  { icon: Landmark, title: "APA Support", desc: "We assist with Unilateral, Bilateral, and Multilateral Advance Pricing Agreements for 5-year price certainty." },
  { icon: Scale, title: "Arm's Length Defence", desc: "Comprehensive economic analysis and comparables selection provide a legally defensible arm's length position." },
  { icon: Repeat2, title: "Reduce Double Taxation", desc: "Proper documentation enables effective use of DTAA MAP (Mutual Agreement Procedure) to eliminate double tax." },
  { icon: ClipboardList, title: "Functional Analysis Clarity", desc: "FAR (Functions, Assets, Risks) analysis provides a clear economic picture of each entity's role in the group." },
  { icon: BarChart3, title: "CbCR Compliance", desc: "We prepare Country-by-Country Report (3CEAA/3CEAB) for Indian constituent entities of large MNC groups." },
];

const processSteps = [
  { n: "01", title: "Identify International Transactions", desc: "Map all transactions with associated enterprises (AEs) — goods, services, loans, intangibles, and guarantees." },
  { n: "02", title: "Functional Analysis (FAR)", desc: "Document functions performed, assets employed, and risks assumed by each entity in the value chain." },
  { n: "03", title: "Comparability Analysis", desc: "Identify economically comparable transactions or companies using databases (Prowess, Capitaline, TP Catalyst)." },
  { n: "04", title: "Select Transfer Pricing Method", desc: "Choose the most appropriate method: CUP, RPM, CPM, TNMM, or Profit Split based on transaction characteristics." },
  { n: "05", title: "Benchmarking Study", desc: "Run statistical analysis on comparable set; compute arm's length price or margin range using the selected method." },
  { n: "06", title: "Prepare 3CEB Report", desc: "Draft the accountant's report in Form 3CEB covering all international transactions with mandated disclosures." },
  { n: "07", title: "CA Certification", desc: "A Chartered Accountant certifies the Form 3CEB after due diligence review of all underlying documents." },
  { n: "08", title: "File with ITR + Maintain Records", desc: "Submit 3CEB with the Income Tax Return and maintain complete documentation for 8 years as required by law." },
];

const documents = [
  "Related party contracts and intercompany agreements",
  "Audited financial statements of both entities",
  "Business description and functional profile",
  "Group structure chart with shareholding details",
  "Management accounts and MIS reports",
  "Comparable uncontrolled transaction data",
  "Intercompany pricing policies",
  "Prior year TP study (if any)",
];

const timelineStages = [
  { stage: "01", title: "Transaction Identification", desc: "List all AE transactions and classify by nature." },
  { stage: "02", title: "FAR Analysis", desc: "Functional interview and economic profiling of each entity." },
  { stage: "03", title: "Method Selection", desc: "Apply method selection hierarchy per Rule 10C." },
  { stage: "04", title: "Benchmarking", desc: "Database search, comparables filtering, arm's length range." },
  { stage: "05", title: "Report Drafting", desc: "Prepare TP Study Report and Form 3CEB draft." },
  { stage: "06", title: "3CEB Certification", desc: "CA review, certification, and filing with ITR." },
];

const deliverables = [
  "Transfer Pricing Study Report (detailed)",
  "Form 3CEB — CA certified and signed",
  "Benchmarking analysis with database excerpts",
  "Functional interview notes (FAR documentation)",
  "Economic analysis document",
  "Comparability analysis workings",
];

const whyUs = [
  { icon: Award, point: "Team of experienced CAs with international tax expertise" },
  { icon: DatabaseZap, point: "Access to premium TP databases — Prowess, Capitaline, TP Catalyst" },
  { icon: Globe, point: "OECD and BEPS-aligned documentation approach" },
  { icon: ShieldCheck, point: "Legally defensible arm's length analysis" },
  { icon: Landmark, point: "APA filing and MAP representation support" },
  { icon: BarChart3, point: "Country-by-Country Reporting (CbCR) assistance" },
  { icon: UserCheck, point: "Dedicated TP expert assigned to your engagement" },
  { icon: Clock, point: "Delivery before 30 November deadline — guaranteed" },
];


const relatedServices = [
  { id: "tax-audit", title: "Tax Audit (3CD)", desc: "Mandatory audit for businesses above turnover threshold." },
  { id: "income-tax-return", title: "Income Tax Return", desc: "ITR filing for companies and individuals." },
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping", desc: "Accurate books and financial statements." },
  { id: "roc-compliance", title: "ROC Annual Filing", desc: "AOC-4 and MGT-7 annual compliance." },
  { id: "tds-return", title: "TDS Return Filing", desc: "Quarterly TDS compliance and payment." },
  { id: "advance-tax", title: "Advance Tax Planning", desc: "Quarterly advance tax computation and payment." },
];

/* ══════════════════════════════════════
   COMPONENT
══════════════════════════════════════ */
export function TransferPricingPage() {
  return (
    <main className="overflow-x-hidden" itemScope itemType="https://schema.org/Service">

      {/* ── 1. HERO ── */}
      <section className="relative bg-[#081726] text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/grid.svg')] bg-repeat" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-heading">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-accent">Transfer Pricing Study</span>
          </nav>

          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Eyebrow label="International Tax Compliance" />
            </motion.div>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              itemProp="name"
            >
              Transfer Pricing Study{" "}
              <span className="text-accent">&amp; Form 3CEB</span>
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl"
              itemProp="description"
            >
              Comprehensive transfer pricing documentation for Indian entities with cross-border related-party transactions. OECD-aligned benchmarking, Form 3CEB certification, and APA support — all before the 30 November deadline.
            </motion.p>
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-7 py-3.5 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors"
              >
                Start Your TP Study <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+919953719111" data-track="call"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                <Phone size={15} /> Call Our TP Expert
              </a>
            </motion.div>
          </div>

          {/* Quick Fact Cards */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-14"
          >
            {quickFacts.map((f, i) => (
              <div key={i} className="bg-white/8 border border-white/10 rounded-2xl px-4 py-4 text-center backdrop-blur-sm">
                <p className="text-accent font-heading font-bold text-base leading-tight">{f.value}</p>
                <p className="text-slate-400 text-xs mt-1 font-heading">{f.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. WHAT IS TRANSFER PRICING? ── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Overview" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">
                What is Transfer Pricing?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-5">
                Transfer pricing refers to the prices at which transactions occur between associated enterprises (AEs) — companies that are related through common ownership or control across international borders. Indian tax law under{" "}
                <strong className="text-dark">Sections 92 to 92F of the Income Tax Act, 1961</strong> mandates that all such transactions be conducted at an <em>arm&apos;s length price</em> (ALP).
              </p>
              <p className="text-muted text-base leading-relaxed mb-5">
                An arm&apos;s length price is the price that independent, unrelated parties would agree to for a comparable transaction in similar market conditions. If your company charges below-market prices for services rendered to an overseas parent, or pays above-market royalties to a foreign licensor, the Income Tax Department can make an adjustment — treating the difference as additional taxable income in India.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                A Transfer Pricing Study is a detailed economic report that documents your transactions, benchmarks prices against comparable market data, and certifies through{" "}
                <strong className="text-dark">Form 3CEB</strong> that all international related-party transactions are at arm&apos;s length. This study is mandatory when your aggregate international transactions with AEs exceed ₹1 crore in any financial year.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-heading font-semibold text-sm hover:bg-[#0a2444] transition-colors"
                >
                  Get a Free Consultation <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="relative rounded-3xl overflow-hidden shadow-card h-80 lg:h-full min-h-[360px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=85"
                alt="Transfer pricing analysis and benchmarking"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/20" />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-card max-w-xs">
                <p className="font-heading font-bold text-dark text-sm mb-1">Starting from</p>
                <p className="font-heading font-bold text-primary text-2xl">₹29,999</p>
                <p className="text-muted text-xs">Comprehensive TP Study + 3CEB</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. WHO NEEDS THIS? ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Applicability" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Who Needs a Transfer Pricing Study?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              If any of these describe your business, you are likely required to comply with Indian TP regulations.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoNeeds.map((w, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                  <w.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{w.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. KEY BENEFITS ── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Key Benefits" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Why Commission a TP Study?</h2>
            <p className="text-muted mt-4">
              Beyond statutory compliance, a well-crafted transfer pricing study provides significant business and legal value.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                  <b.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{b.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS STEPS ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Our Process" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">8-Step Transfer Pricing Process</h2>
            <p className="text-muted mt-4">A structured, methodical approach ensures your TP documentation is rigorous and audit-ready.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-card relative"
              >
                <span className="absolute top-5 right-5 font-heading font-bold text-4xl text-primary/8 select-none">{s.n}</span>
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mb-4">
                  <span className="text-white font-heading font-bold text-xs">{s.n}</span>
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{s.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. DOCUMENTS REQUIRED ── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow label="Documentation" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">Documents Required</h2>
              <p className="text-muted leading-relaxed mb-8">
                Transfer pricing documentation in India is governed by Rule 10D. The following documents form the core of a compliant TP file. We guide you through collection and organisation.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {documents.map((doc, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                    className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4"
                  >
                    <CheckCircle size={15} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-sm font-heading font-medium">{doc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="bg-primary/5 border border-primary/15 rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Info size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-heading font-bold text-dark text-sm">Rule 10D Documentation</p>
                  <p className="text-muted text-xs">Mandatory record maintenance</p>
                </div>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-5">
                Under Rule 10D of the Income Tax Rules, every person required to maintain information and documentation must keep these records for a period of <strong className="text-dark">8 years</strong> from the end of the relevant assessment year.
              </p>
              <p className="text-muted text-sm leading-relaxed mb-5">
                Failure to maintain prescribed documentation not only attracts a 2% penalty on the transaction value but also shifts the burden of proof entirely to the taxpayer during assessment.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
                <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-amber-800 text-xs leading-relaxed">
                  TP documentation must be in place <strong>before</strong> the due date of filing the Income Tax Return. It need not be filed but must be produced within 30 days of a notice from the Assessing Officer.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. TIMELINE ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Timeline" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">6-Stage Engagement Timeline</h2>
            <p className="text-muted mt-4">From kickoff to 3CEB certification — a typical engagement takes 3–6 weeks depending on complexity.</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-primary/15 z-0" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-5 relative z-10">
              {timelineStages.map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-sm mb-4 shadow-lg border-4 border-slate-50 relative z-10">
                    {t.stage}
                  </div>
                  <h3 className="font-heading font-bold text-dark text-xs mb-2">{t.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. WHAT YOU RECEIVE ── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Deliverables" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">What You Receive</h2>
            <p className="text-muted mt-4">Every TP engagement from Company Avenue Advisory delivers a complete, audit-ready documentation package.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {deliverables.map((d, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="flex items-start gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-5"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                  <CheckCircle size={16} className="text-accent" />
                </div>
                <p className="text-dark font-heading font-semibold text-sm leading-snug">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. WHY COMPANY AVENUE ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-card h-72 lg:h-full min-h-[340px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=85"
                alt="Company Avenue Advisory transfer pricing team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/30" />
            </motion.div>
            <div>
              <Eyebrow label="Why Choose Us" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-8">
                Why Company Avenue Advisory?
              </h2>
              <div className="space-y-4">
                {whyUs.map((w, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                    className="flex items-center gap-4 bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                      <w.icon size={17} className="text-primary" />
                    </div>
                    <p className="text-dark font-heading font-semibold text-sm">{w.point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ── */}
      <section
        className="py-20 bg-white"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-14">
            <Eyebrow label="FAQ" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">
              Frequently Asked Questions
            </h2>
            <p className="text-muted mt-4">Everything you need to know about transfer pricing compliance in India.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              >
                <FaqItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. RELATED SERVICES ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-14">
            <Eyebrow label="Related Services" />
            <h2 className="font-heading text-3xl font-bold text-dark">You May Also Need</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedServices.map((r, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              >
                <Link
                  href={`/services/${r.id}`}
                  className="group flex items-start justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-card hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <p className="font-heading font-bold text-dark text-sm mb-1 group-hover:text-primary transition-colors">{r.title}</p>
                    <p className="text-muted text-xs leading-relaxed">{r.desc}</p>
                  </div>
                  <ArrowRight size={15} className="text-muted group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. DARK CTA ── */}
      <section className="py-20 bg-[#0F2D52]">
        <div className="container-custom text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Eyebrow label="Get Started" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-5">
              30 November Deadline Is Approaching
            </h2>
            <p className="text-slate-300 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Don&apos;t wait until October. Commission your Transfer Pricing Study now and ensure your Form 3CEB is certified and ready well before the deadline.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-8 py-4 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors"
              >
                Start TP Study — ₹29,999 <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+919953719111" data-track="call"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl font-heading font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                <Phone size={15} /> Call Our TP Expert
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
