"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, CheckCircle, Plus, Minus,
  MessageCircle, FileText, CreditCard, Fingerprint,
  Zap, Building2, Users, Globe, Briefcase, Monitor, Award,
  DollarSign, Headphones, ShieldCheck, BadgeCheck, Info,
  TrendingUp, BookOpen, CalendarCheck, BarChart2, PieChart,
  Layers, Target, RefreshCcw, AlertTriangle, Percent,
  ClipboardList, FileCheck, Calculator, Scale,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function Eyebrow({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
      <span className="w-6 h-px bg-accent" />{label}<span className="w-6 h-px bg-accent" />
    </span>
  );
}

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */

const heroGlance = [
  { label: "Methods",   value: "DCF / NAV / Comparable / Book Value" },
  { label: "Purpose",   value: "Funding / M&A / ESOP / Tax" },
  { label: "Report",    value: "CA Certified" },
  { label: "Timeline",  value: "5–10 Days" },
  { label: "Standards", value: "ICAI Valuation Standards" },
  { label: "Required",  value: "Companies Act (Share Transfers)" },
];

const quickFacts = [
  { icon: BarChart2,    label: "Methods",    value: "DCF / NAV / Comparable" },
  { icon: Target,       label: "Purpose",    value: "Funding / M&A / ESOP" },
  { icon: BadgeCheck,   label: "Report",     value: "CA Certified" },
  { icon: CalendarCheck,label: "Timeline",   value: "5–10 Days" },
  { icon: ShieldCheck,  label: "Standards",  value: "ICAI Standards" },
  { icon: FileText,     label: "Required By",value: "Companies Act" },
];

const whoNeeds = [
  { icon: TrendingUp,   title: "Startups Raising Funding",       desc: "Angel and VC investors require a certified valuation to benchmark the funding round price." },
  { icon: Building2,    title: "Companies Doing M&A",            desc: "Mergers, acquisitions, and business combinations need independent valuation for fair pricing." },
  { icon: Users,        title: "ESOP Issuance",                  desc: "Companies issuing employee stock options need FMV certification on the grant date." },
  { icon: RefreshCcw,   title: "Share Buyback",                  desc: "Buyback of shares requires a CA-certified valuation under the Companies Act, 2013." },
  { icon: Scale,        title: "Shareholder Disputes",           desc: "Shareholder exit disputes, minority buyouts, and litigation require independent valuation." },
  { icon: BookOpen,     title: "Succession Planning",            desc: "Business inheritance, family settlements, and succession planning require fair valuation." },
  { icon: Globe,        title: "FDI Investments (Rule 11UA)",    desc: "Foreign direct investment under FEMA requires share valuation at fair market value." },
  { icon: Percent,      title: "ESOP Grants under Startup Plans",desc: "Startup equity plans and ESOP trusts require annual FMV valuation per Income Tax rules." },
];

const benefits = [
  { icon: BadgeCheck,    title: "CA-Certified Independent Report",    desc: "A certified report from a Chartered Accountant holds legal validity and regulatory acceptance." },
  { icon: TrendingUp,    title: "Credible for Negotiations",          desc: "A professional valuation creates an independent benchmark for investor and buyer negotiations." },
  { icon: ShieldCheck,   title: "Regulatory Compliance (Rule 11UA)",  desc: "Mandatory for FDI transactions under FEMA — avoids penalties and ensures FEMA compliance." },
  { icon: Users,         title: "ESOP at Fair Market Value",          desc: "Enables ESOP grants at the legally determined FMV, protecting both employer and employees." },
  { icon: DollarSign,    title: "Lender and Bank Confidence",         desc: "Banks and NBFCs use business valuations to assess loan eligibility and credit worthiness." },
  { icon: BarChart2,     title: "Investor Benchmark",                 desc: "Sets the valuation floor for funding rounds — prevents undervaluation and dilution." },
  { icon: Scale,         title: "Dispute Resolution",                 desc: "An independent valuation is strong evidence in shareholder disputes and court proceedings." },
  { icon: AlertTriangle, title: "Avoid Angel Tax (Section 56)",       desc: "Proper certified valuation protects against angel tax liability on amounts above FMV." },
];

const processSteps = [
  { n: "01", title: "Information Request & Document Collection",   desc: "We send you a structured information request — financial statements, business plan, cap table, and other key data." },
  { n: "02", title: "Financial Statement Review & Normalization",  desc: "We analyse and normalise 3 years of audited financials, adjusting for one-time items, related-party transactions, and accounting anomalies." },
  { n: "03", title: "Industry & Market Analysis",                  desc: "We research comparable companies, sector benchmarks, market multiples, and macro-economic factors relevant to your business." },
  { n: "04", title: "Select Valuation Methodology",               desc: "We select the most appropriate method — DCF for growth businesses, NAV for asset-heavy companies, Comparable for benchmarking." },
  { n: "05", title: "Build Detailed Financial Model",              desc: "We construct a multi-year financial model incorporating revenue growth assumptions, cost structure, capex, and working capital." },
  { n: "06", title: "Apply Methodology & Compute Value Range",    desc: "We apply the selected methodology to derive a defendable valuation range with a point estimate and supporting rationale." },
  { n: "07", title: "Sensitivity Analysis",                        desc: "We stress-test key assumptions (growth rate, discount rate, multiples) to show the value range under different scenarios." },
  { n: "08", title: "CA Certification & Final Report Delivery",   desc: "The completed valuation report is reviewed, certified by a qualified CA, and delivered in PDF and Excel format." },
];

const requiredDocs = [
  { icon: FileText,     label: "Audited Financial Statements (3 Years)" },
  { icon: BarChart2,    label: "Business Plan / Financial Projections" },
  { icon: Layers,       label: "Cap Table (Shareholding Structure)" },
  { icon: TrendingUp,   label: "Customer / Revenue Data" },
  { icon: BarChart2,    label: "Industry Benchmarks (if available)" },
  { icon: ClipboardList,label: "Contracts and Assets List" },
  { icon: AlertTriangle,label: "Pending Litigation Details (if any)" },
  { icon: CreditCard,   label: "PAN / CIN of the Company" },
];

const timelineStages = [
  { label: "Document Collection",   icon: ClipboardList,  days: "Day 1–2" },
  { label: "Financial Analysis",    icon: BarChart2,       days: "Day 2–4" },
  { label: "Market Research",       icon: Globe,           days: "Day 3–5" },
  { label: "Model Building",        icon: Calculator,      days: "Day 4–7" },
  { label: "Sensitivity Analysis",  icon: Percent,         days: "Day 7–9" },
  { label: "CA Sign-off & Report",  icon: FileCheck,       days: "Day 9–10" },
];

const deliverables = [
  { icon: FileText,    title: "Certified Business Valuation Report",   desc: "Comprehensive report detailing methodology, assumptions, analysis, and final value range." },
  { icon: Calculator,  title: "Financial Model (Excel)",               desc: "Fully editable financial model with revenue projections, cost structure, and valuation workings." },
  { icon: BarChart2,   title: "DCF / NAV Workings",                   desc: "Detailed computation of discounted cash flows or net asset value as applicable." },
  { icon: Percent,     title: "Sensitivity Analysis",                  desc: "Scenario table showing value range under different growth and discount rate assumptions." },
  { icon: BadgeCheck,  title: "CA Certificate",                        desc: "Signed CA certificate (Form 3CEB if required for cross-border transactions)." },
];

const whyUsPoints = [
  { icon: Award,        label: "ICAI-Registered CAs with Valuation Experience" },
  { icon: ShieldCheck,  label: "Reports Accepted by SEBI, RBI, and Income Tax Department" },
  { icon: BarChart2,    label: "Multiple Methodologies — DCF, NAV, Comparable" },
  { icon: Zap,          label: "Fast Turnaround — 5 to 10 Business Days" },
  { icon: Monitor,      label: "100% Digital Process — No Office Visits" },
  { icon: DollarSign,   label: "Transparent Pricing — No Hidden Fees" },
  { icon: Headphones,   label: "Dedicated CA Point of Contact" },
  { icon: FileCheck,    label: "Compliant with Rule 11UA, Companies Act & ICAI Standards" },
];

const relatedServices = [
  { id: "private-limited-company", title: "Private Limited Company",  desc: "Incorporate your company for valuation." },
  { id: "startup-india",           title: "Startup India Recognition", desc: "DPIIT recognition and tax benefits." },
  { id: "accounting-bookkeeping",  title: "Accounting & Bookkeeping", desc: "Accurate books for credible valuation." },
  { id: "financial-statements",    title: "Financial Statements",     desc: "Audited financials for valuation basis." },
  { id: "virtual-cfo",             title: "Virtual CFO Services",     desc: "Ongoing financial strategy and advisory." },
  { id: "income-tax-return",       title: "Income Tax Return",        desc: "ITR filing and tax compliance support." },
];

const faqs = [
  {
    q: "When is business valuation mandatory under Indian law?",
    a: "Business valuation is mandatory in several situations under Indian law: (1) FDI transactions — Rule 11UA of the Income Tax Rules requires CA-certified valuation for share issuance to non-residents under FEMA; (2) Share transfers under the Companies Act, 2013 require registered valuer certification; (3) ESOP grants require FMV determination under Income Tax Rules; (4) Mergers and demergers under NCLT proceedings require an independent valuation report.",
  },
  {
    q: "Which valuation method is best for startups?",
    a: "For startups, the Discounted Cash Flow (DCF) method is most commonly used — it values the business based on projected future cash flows discounted at an appropriate rate. However, DCF requires reliable financial projections. For early-stage startups with limited history, the Comparable Company Method (market multiples of similar funded startups) or Revenue Multiple approach may supplement DCF. The appropriate method depends on the startup's stage, industry, and the purpose of valuation.",
  },
  {
    q: "Which method is used for asset-heavy companies?",
    a: "The Net Asset Value (NAV) method is most appropriate for asset-heavy businesses such as real estate companies, investment holding companies, manufacturing businesses with significant fixed assets, and financial institutions. NAV computes the fair market value of all assets minus liabilities to derive the business's intrinsic worth. It is also used alongside DCF as a cross-check ('floor value') for most businesses.",
  },
  {
    q: "How is a pre-revenue startup valued?",
    a: "Pre-revenue startups are typically valued using: (1) Revenue multiples — applying industry EV/Revenue multiples to projected revenues; (2) Market approach — comparing with recent funding rounds of similar startups; (3) Scorecard method — benchmarking against funded startups adjusting for team, product, market, and traction; (4) Venture Capital method — working backwards from exit value to present value. A combination of methods is used to present a credible, defensible valuation.",
  },
  {
    q: "How is the valuation determined for ESOP grants?",
    a: "For ESOP grants, the valuation determines the Fair Market Value (FMV) of shares on the grant date, as required under Rule 3(9) of the Income Tax Rules (for listed companies) and per ICAI guidance for unlisted companies. The FMV on the grant date forms the exercise price. If ESOPs are granted below FMV, the difference is treated as a perquisite in the employee's hands at vesting, and TDS must be deducted. A fresh valuation is typically required for each ESOP grant round.",
  },
  {
    q: "What is Rule 11UA and when does it apply?",
    a: "Rule 11UA of the Income Tax Rules, 1962 governs the determination of Fair Market Value (FMV) of unlisted shares for income tax purposes. It applies primarily when a company issues shares to non-residents (FDI) under FEMA, or when shares are sold at a price that may trigger Section 56(2)(viib) (angel tax). Under Rule 11UA, the FMV must be computed using the net asset value method or DCF method, and must be certified by a Merchant Banker or a Chartered Accountant.",
  },
  {
    q: "Can a valuation report be challenged by the Income Tax Department?",
    a: "Yes. The Income Tax Department can scrutinise and challenge a valuation report under Section 56(2)(viib) — the 'angel tax' provision. If a company issues shares to a resident investor at a price higher than the FMV as computed under Rule 11UA, the excess amount is taxed as income in the company's hands. A professionally certified, well-documented valuation report with clear methodology, supportable assumptions, and sensitivity analysis significantly reduces the risk of challenge and creates a strong legal defence.",
  },
  {
    q: "How long is a valuation report valid?",
    a: "A business valuation report is typically valid for 6 months for most regulatory purposes in India (e.g., FDI, FEMA, ROC filings). After 6 months, a fresh valuation is recommended as business performance, market conditions, and financial position may have changed materially. For ESOP purposes, many companies obtain an annual valuation that is used for the entire financial year's grant rounds. The specific validity period depends on the regulatory requirement for which the valuation is being used.",
  },
  {
    q: "What is angel tax and how does proper valuation help?",
    a: "Angel tax refers to the tax imposed under Section 56(2)(viib) of the Income Tax Act on the amount received by a company from a resident investor in excess of the Fair Market Value of shares issued. For example, if a startup issues shares at ₹100 each but the FMV as per Rule 11UA is ₹60, the excess ₹40 per share is taxed as 'income from other sources.' A properly certified valuation at or above the issue price protects the company from this liability and is the strongest defence in case of scrutiny.",
  },
  {
    q: "Is a CA certificate required, and what form is used?",
    a: "Yes, a CA certificate is required for valuation reports used for regulatory purposes. For cross-border transactions (FDI, share transfers to non-residents), Form 3CEB is required under Section 92E of the Income Tax Act. For domestic transactions and ESOP valuations, a certificate from a practicing CA or Merchant Banker on their letterhead is the standard requirement. The specific form depends on the transaction type — our team identifies the correct certification requirement for your situation.",
  },
];

/* ── FAQ Item ── */
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
        <span itemProp="name" className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <p itemProp="text" className="px-5 pb-4 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Sticky Sidebar ── */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">Get Your Business Valued</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">CA-certified valuation report in 5–10 business days.</p>
        <div className="space-y-2 mb-5">
          {["CA-Certified Report", "DCF / NAV / Comparable", "Excel Model Included", "ICAI Standards Compliant"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <a
            href="tel:+919953719111"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          >
            <Phone size={13} /> Call Now
          </a>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          >
            Book Consultation
          </Link>
          <a
            href="https://wa.me/919953719111"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={13} /> WhatsApp
          </a>
        </div>
      </div>
      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <BarChart2 size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Starting Price</p>
        </div>
        <p className="font-heading font-bold text-3xl text-white mb-1">₹14,999</p>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">Includes CA certificate, Excel model, and full valuation report.</p>
        <Link
          href="/contact"
          className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          Get Quote <ArrowRight size={13} />
        </Link>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { v: "500+", l: "Reports Done" },
            { v: "ICAI", l: "Standards" },
            { v: "5–10", l: "Days TAT" },
            { v: "100%", l: "Acceptance" },
          ].map(s => (
            <div key={s.l} className="text-center">
              <p className="font-heading font-bold text-primary text-lg leading-none">{s.v}</p>
              <p className="text-muted text-[10px] mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export function BusinessValuationPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="bv-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bv-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Business Valuation</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">CA-Certified Valuation • ICAI Standards</span>
              </motion.div>
              <motion.h1
                custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Business Valuation<br />
                <span className="text-primary">That Stands Up to Scrutiny</span>
              </motion.h1>
              <motion.p
                custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Independent, CA-certified business valuation reports for funding rounds, M&A, ESOPs, FDI compliance, and shareholder disputes. Built on ICAI standards and accepted by regulators.
              </motion.p>
              <motion.div
                custom={3} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Get Your Business Valued <ArrowRight size={15} />
                </Link>
                <a
                  href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Free Consultation
                </a>
              </motion.div>
              <motion.div
                custom={4} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-wrap gap-x-5 gap-y-2"
              >
                {["DCF / NAV / Comparable", "CA Certified Report", "Excel Model Included", "5–10 Day Turnaround"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero card */}
            <motion.div
              initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                      <BarChart2 size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">Valuation at a Glance</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />ICAI Compliant
                  </span>
                </div>
                <div className="space-y-2.5 mb-5">
                  {heroGlance.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.4 + i * 0.07 }}
                      className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                    >
                      <span className="text-xs text-muted">{item.label}</span>
                      <span className="text-xs font-heading font-semibold text-dark">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-primary/5 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted">Starting from</p>
                    <p className="font-heading font-bold text-primary text-xl">₹14,999</p>
                  </div>
                  <Link
                    href="/contact"
                    className="px-4 py-2 bg-primary text-white text-xs font-heading font-semibold rounded-lg hover:bg-[#0a2444] transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── QUICK FACTS ── */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickFacts.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:shadow-card hover:border-primary/10 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mx-auto mb-3 transition-colors duration-300">
                    <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="text-[10px] font-heading font-semibold text-muted uppercase tracking-wider mb-1">{f.label}</p>
                  <p className="font-heading font-bold text-dark text-sm leading-snug">{f.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT IS BUSINESS VALUATION ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=85"
                  alt="Business valuation and financial analysis"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">500+</p>
                <p className="text-white/60 text-xs">Reports Certified</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is Business Valuation?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                <strong>Business valuation</strong> is the process of determining the economic worth of a business or its equity shares. In India, it is governed by the <strong>Companies Act, 2013</strong>, FEMA regulations, and ICAI Valuation Standards, and is required for a wide range of transactions including FDI, M&A, ESOPs, and dispute resolution.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                A professionally prepared, CA-certified valuation report provides an independent, defensible estimate of value using recognised methodologies — DCF, Net Asset Value, Comparable Company Analysis, or a combination — that is accepted by regulators, banks, and courts.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Regulatory Compliance", "Investor Negotiations", "ESOP Grant Pricing", "Dispute Resolution"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHO NEEDS THIS ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Who Needs This" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">Who Needs a Business Valuation?</h2>
            <p className="text-muted text-base max-w-2xl mx-auto">Business valuation is required across a wide range of corporate transactions, regulatory filings, and dispute situations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whoNeeds.map((item, i) => {
              const Icon = item.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isEven ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                  className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-card hover:border-primary/15 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Icon size={19} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-dark text-sm mb-1">{item.title}</h3>
                    <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── KEY BENEFITS ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Key Benefits" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Benefits of a Certified Valuation</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true }}
                  className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors duration-300">
                    <Icon size={17} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-heading font-bold text-dark text-sm mb-1">{b.title}</p>
                  <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TWO-COLUMN: MAIN + SIDEBAR ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* VALUATION METHODS */}
            <section>
              <Eyebrow label="Valuation Methods" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">Business Valuation Methodologies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    method: "DCF — Discounted Cash Flow",
                    icon: TrendingUp,
                    color: "bg-blue-50 border-blue-100",
                    iconColor: "bg-blue-100 text-blue-600",
                    best: "Best for: Growth startups, SaaS, recurring revenue businesses",
                    desc: "Values the business based on projected future free cash flows, discounted back to present value using a Weighted Average Cost of Capital (WACC). Most widely accepted by investors and regulators.",
                    points: ["Future cash flow projection (5–10 years)", "Terminal value computation", "WACC / discount rate determination", "Sensitivity on growth and discount rate"],
                  },
                  {
                    method: "NAV — Net Asset Value",
                    icon: Layers,
                    color: "bg-green-50 border-green-100",
                    iconColor: "bg-green-100 text-green-600",
                    best: "Best for: Asset-heavy businesses, holding companies, real estate",
                    desc: "Values the business as the fair market value of all assets minus all liabilities. Provides an intrinsic 'floor value' for the business and is mandatory for certain Companies Act transactions.",
                    points: ["Fair value of tangible assets", "Fair value of intangible assets", "All liabilities at market value", "Net value per share computation"],
                  },
                  {
                    method: "Comparable Company Analysis",
                    icon: BarChart2,
                    color: "bg-purple-50 border-purple-100",
                    iconColor: "bg-purple-100 text-purple-600",
                    best: "Best for: Benchmarking, cross-checks, M&A transactions",
                    desc: "Values the business by applying revenue or EBITDA multiples derived from comparable listed companies or recent private market transactions. Provides a market-based reference point.",
                    points: ["Peer group selection", "EV/Revenue or EV/EBITDA multiples", "Control premium / minority discount", "Market conditions adjustment"],
                  },
                  {
                    method: "Book Value Method",
                    icon: BookOpen,
                    color: "bg-amber-50 border-amber-100",
                    iconColor: "bg-amber-100 text-amber-700",
                    best: "Best for: Small businesses, simple balance sheet companies",
                    desc: "Values the business at the net book value of assets as recorded in the audited balance sheet. While simpler, it may not reflect fair market value and is used primarily for cross-checks.",
                    points: ["Audited balance sheet basis", "Shareholders' equity per share", "Adjusted for revaluation reserves", "Often used as regulatory minimum"],
                  },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.method} className={`border rounded-2xl p-6 hover:shadow-card transition-all ${m.color}`}>
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${m.iconColor}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="font-heading font-bold text-dark text-sm mb-0.5">{m.method}</p>
                          <p className="text-[11px] text-muted leading-snug">{m.best}</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed mb-3">{m.desc}</p>
                      <ul className="space-y-1">
                        {m.points.map(pt => (
                          <li key={pt} className="flex items-center gap-2 text-xs text-dark">
                            <CheckCircle size={11} className="text-primary shrink-0" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* PROCESS */}
            <section>
              <Eyebrow label="Our Process" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Valuation Process — Step by Step</h2>
              <div className="relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200" aria-hidden="true" />
                <div className="space-y-6">
                  {processSteps.map((step, i) => (
                    <motion.div
                      key={step.n}
                      custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true, margin: "-40px" }}
                      className="flex gap-5 relative"
                    >
                      <div className="w-11 h-11 rounded-full bg-primary text-white font-heading font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-sm">
                        {step.n}
                      </div>
                      <div className="bg-white border border-slate-100 rounded-2xl p-4 flex-1 hover:shadow-card hover:border-primary/15 transition-all duration-300">
                        <p className="font-heading font-bold text-dark text-sm mb-1">{step.title}</p>
                        <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* DOCUMENTS REQUIRED */}
            <section>
              <Eyebrow label="Documents Required" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Documents Required for Valuation</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {requiredDocs.map(doc => {
                    const Icon = doc.icon;
                    return (
                      <motion.div
                        key={doc.label}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                          <Icon size={14} className="text-primary" />
                        </div>
                        <span className="text-dark text-xs font-medium">{doc.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 flex items-center gap-3">
                  <Info size={15} className="text-primary shrink-0" />
                  <p className="text-dark text-xs leading-relaxed">We send you a structured data request template. You can share documents securely via our portal, email, or WhatsApp. All documents are kept strictly confidential.</p>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section>
              <Eyebrow label="Timeline" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Valuation Timeline — 5 to 10 Days</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                  {timelineStages.map((stage, i) => {
                    const Icon = stage.icon;
                    return (
                      <div key={stage.label} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-2 shadow-sm">
                            <Icon size={17} className="text-white" />
                          </div>
                          <p className="text-xs font-heading font-semibold text-dark leading-snug max-w-[76px]">{stage.label}</p>
                          <p className="text-[10px] text-muted mt-0.5">{stage.days}</p>
                        </div>
                        {i < timelineStages.length - 1 && (
                          <ArrowRight size={14} className="text-slate-400 shrink-0 hidden sm:block" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
                  <CalendarCheck size={16} className="text-amber-500 shrink-0" />
                  <p className="text-dark text-xs leading-relaxed">Timeline depends on the completeness of documents provided. Expedited delivery in 3–5 days available on request for an additional fee.</p>
                </div>
              </div>
            </section>

            {/* WHAT YOU RECEIVE */}
            <section>
              <Eyebrow label="Deliverables" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">What You Receive</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {deliverables.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <motion.div
                      key={d.title}
                      custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-300">
                        <Icon size={17} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-dark text-sm mb-1">{d.title}</p>
                        <p className="text-muted text-xs leading-relaxed">{d.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* WHY COMPANY AVENUE */}
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Eyebrow label="Why Us" />
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">Why Choose Company Avenue for Business Valuation?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {whyUsPoints.map(pt => {
                      const Icon = pt.icon;
                      return (
                        <div key={pt.label} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                            <Icon size={14} className="text-primary" />
                          </div>
                          <span className="text-dark text-xs font-medium leading-snug">{pt.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { v: "500+",  l: "Valuations Done",   c: "bg-primary text-white" },
                    { v: "ICAI",  l: "Standards",         c: "bg-accent text-dark" },
                    { v: "5–10",  l: "Days Turnaround",   c: "bg-slate-800 text-white" },
                    { v: "100%",  l: "Regulatory Accept.", c: "bg-green-600 text-white" },
                  ].map(s => (
                    <motion.div key={s.l} whileHover={{ y: -4 }} className={`${s.c} rounded-2xl p-6 text-center shadow-card`}>
                      <p className="font-heading font-bold text-3xl leading-none mb-1">{s.v}</p>
                      <p className="text-xs opacity-80 leading-snug">{s.l}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ANGEL TAX INFO BANNER */}
            <section>
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-7 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                  <AlertTriangle size={22} className="text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-heading font-bold text-dark text-base mb-2">Protect Against Angel Tax — Section 56(2)(viib)</p>
                  <p className="text-muted text-sm leading-relaxed">
                    If your startup receives investment above Fair Market Value from a resident Indian, the excess amount is taxed as income. A CA-certified valuation at or above the issue price is the strongest protection. We prepare valuation reports specifically designed to withstand Income Tax scrutiny.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 px-5 py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors whitespace-nowrap"
                >
                  Protect Now
                </Link>
              </div>
            </section>

            {/* FAQ */}
            <section itemScope itemType="https://schema.org/FAQPage">
              <div className="text-center mb-10">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-2">
                {faqs.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
              </div>
            </section>

          </div>
          <div className="hidden xl:block sticky top-24 self-start"><StickySidebar /></div>
        </div>
      </div>

      {/* ── RELATED SERVICES ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <h2 className="font-heading font-bold text-2xl text-dark mb-8 text-center">Related Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedServices.map((s, i) => (
              <motion.div key={s.id} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Link
                  href={`/services/${s.id}`}
                  className="group block bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all duration-300 h-full"
                >
                  <p className="font-heading font-bold text-dark text-sm mb-1 group-hover:text-primary transition-colors">{s.title}</p>
                  <p className="text-muted text-xs mb-3">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-xs font-heading font-semibold group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={11} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-bv" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-bv)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Get Valued" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Know What Your<br />Business is Worth
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              A certified business valuation is more than a number — it is a legal document, a negotiation tool, and a regulatory requirement. Let Company Avenue Advisory deliver a report that is accurate, defensible, and ready for any transaction.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-[#c49540] transition-colors"
              >
                Start My Valuation <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+919953719111"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Speak to a CA
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
