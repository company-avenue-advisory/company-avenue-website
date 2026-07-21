"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, MessageCircle,
  Users, ShieldCheck, TrendingUp, Award, Zap, Clock, FileText,
  Building2, Globe, UserCheck, BadgeCheck, Star, ChevronRight,
  AlertCircle, CreditCard, Receipt, Landmark, Banknote,
  Fingerprint, BarChart3, Calendar, DollarSign, Scale,
  BookOpen, ClipboardCheck, Briefcase, Home, Factory,
  AlertTriangle, CheckSquare, Layers, RefreshCcw, PenLine,
  Hash, Lock, CircleCheck, Target, BarChart2, Wallet,
} from "lucide-react";
import { faqs } from "@/lib/faqs/LLPAnnualFilingPage";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

function Eyebrow({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
      <span className="w-6 h-px bg-accent" />{label}<span className="w-6 h-px bg-accent" />
    </span>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen(!open)} aria-expanded={open}
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
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }}
            itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
          >
            <p itemProp="text" className="px-5 pb-4 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════ DATA ════════════════════════ */

const quickFacts = [
  { icon: FileText, label: "Forms", value: "Form 11 + Form 8", color: "bg-primary/8 text-primary" },
  { icon: Calendar, label: "Due Dates", value: "Form 11: May 30 / Form 8: Oct 30", color: "bg-blue-50 text-blue-600" },
  { icon: AlertTriangle, label: "Penalty", value: "₹100/day after deadline", color: "bg-red-50 text-red-600" },
  { icon: Landmark, label: "Authority", value: "Registrar of LLPs (MCA)", color: "bg-purple-50 text-purple-600" },
  { icon: Building2, label: "Required for", value: "All active LLPs", color: "bg-green-50 text-green-600" },
  { icon: BarChart3, label: "Financial Year", value: "April to March", color: "bg-amber-50 text-amber-600" },
];

const whoNeeds = [
  { icon: CheckSquare, title: "All LLPs Without Exception", desc: "Filing Form 11 and Form 8 is mandatory by law for every LLP registered with MCA, regardless of business activity or revenue.", color: "bg-primary/8 text-primary" },
  { icon: Scale, title: "Professional LLPs", desc: "CA firms, CS firms, law firms, and other professional service partnerships structured as LLPs must comply every financial year.", color: "bg-blue-50 text-blue-600" },
  { icon: Globe, title: "Technology & IT Service LLPs", desc: "Software, SaaS, app development, and IT service companies operating as LLPs must file annual returns on MCA portal.", color: "bg-teal-50 text-teal-600" },
  { icon: Briefcase, title: "Trading & Distribution LLPs", desc: "Trading firms, distributors, importers, and exporters structured as LLPs are legally required to file both forms annually.", color: "bg-green-50 text-green-600" },
  { icon: Home, title: "Property & Real Estate LLPs", desc: "Real estate developers, brokers, and property management firms operating as LLP must file accounts and annual return.", color: "bg-amber-50 text-amber-600" },
  { icon: Users, title: "Family Business LLPs", desc: "Family-run businesses that adopted LLP structure for liability protection and tax efficiency must comply with annual filing.", color: "bg-purple-50 text-purple-600" },
  { icon: Zap, title: "Startup LLPs in Early Stage", desc: "Even startups in early stage with no revenue must file — LLP law does not grant any exemption based on business age.", color: "bg-rose-50 text-rose-600" },
  { icon: BarChart2, title: "LLPs with NIL Turnover", desc: "Zero-revenue LLPs are one of the most common filers. The law is clear — no activity does not mean no filing obligation.", color: "bg-indigo-50 text-indigo-600" },
];

const benefits = [
  { icon: DollarSign, title: "Avoid ₹100/Day Penalty", desc: "There is no upper cap on LLP late fees. A 3-month delay means ₹9,000+ per form — filing on time costs a fraction of that.", color: "bg-primary/8 text-primary" },
  { icon: ShieldCheck, title: "Maintain Active Legal Status", desc: "MCA can strike off LLPs with persistent non-compliance. Annual filing is the proof of your LLP being a going concern.", color: "bg-blue-50 text-blue-600" },
  { icon: Landmark, title: "Enable Bank Loans & Credit", desc: "Banks verify MCA filing status before sanctioning loans, overdrafts, or credit facilities. Compliance is a pre-condition.", color: "bg-teal-50 text-teal-600" },
  { icon: Lock, title: "Avoid Partner Prosecution", desc: "Designated partners face personal legal liability under Section 69 of the LLP Act for non-filing. Individual risk is high.", color: "bg-red-50 text-red-600" },
  { icon: BadgeCheck, title: "DPIN Renewal Eligibility", desc: "Designated partners must file LLP returns to keep their DPIN active. Lapsed DPIN blocks all future MCA form signing.", color: "bg-green-50 text-green-600" },
  { icon: ClipboardCheck, title: "Clean MCA Record", desc: "A spotless MCA compliance record is essential for tenders, government contracts, bank credit, and investor due diligence.", color: "bg-amber-50 text-amber-600" },
  { icon: Wallet, title: "Maintain Borrowing Capacity", desc: "Lenders assess MCA compliance before credit appraisal. LLPs with pending filings get loan rejections regardless of revenue.", color: "bg-purple-50 text-purple-600" },
  { icon: Award, title: "Partner Credibility", desc: "Partners of compliant LLPs can freely join other companies, serve as directors, and maintain personal credit credibility.", color: "bg-rose-50 text-rose-600" },
];

const processSteps = [
  { n: "01", icon: BookOpen, title: "Close Books as of 31 March", desc: "Finalise all transactions, reconcile bank statements, and close the ledger as on 31st March — the end of each Indian financial year." },
  { n: "02", icon: BarChart3, title: "Prepare P&L and Balance Sheet", desc: "Prepare Profit & Loss account, Balance Sheet, and capital account statements. For LLPs with turnover >₹40L or contribution >₹25L, a CA audit is required." },
  { n: "03", icon: PenLine, title: "Partner Certification", desc: "Designated partners certify Form 8 as true and fair. LLPs requiring CA audit get the accounts audited and certified before filing." },
  { n: "04", icon: FileText, title: "File Form 8 by 30 October", desc: "File Statement of Account & Solvency (Form 8) on MCA portal. This contains financial statements, solvency declaration, and partner contribution details." },
  { n: "05", icon: Users, title: "Prepare Partner Details", desc: "Compile the list of all designated partners with their DPIN, name, contribution amount, and interest percentage as on 31 March." },
  { n: "06", icon: ClipboardCheck, title: "File Form 11 by 30 May", desc: "File Annual Return of LLP (Form 11) disclosing partner details, total contribution, and business activity. Due 60 days after FY end." },
  { n: "07", icon: CheckSquare, title: "Verify DPIN Status", desc: "Confirm all designated partner DPINs are active and KYC-compliant before signing forms. Inactive DPIN blocks form submission on MCA portal." },
  { n: "08", icon: BadgeCheck, title: "MCA Acknowledgment & Record Update", desc: "Receive SRN acknowledgment for both forms. MCA updates LLP master data, and your compliance status becomes current for the year." },
];

const documents = [
  { label: "Annual Accounts (P&L + Balance Sheet)", note: "Certified by partners; audited if turnover >₹40L" },
  { label: "All Partner Details with DPIN", note: "Name, address, DPIN, contribution percentage" },
  { label: "LLP Agreement Copy", note: "Original filed agreement with profit-sharing ratio" },
  { label: "Bank Statements for the Year", note: "All active accounts — April to March" },
  { label: "Contribution Details of Each Partner", note: "Capital contribution as on 31st March" },
  { label: "Business Registration Documents", note: "LLP Certificate of Incorporation from MCA" },
];

const timeline = [
  { stage: "Books Closure", period: "31 March", desc: "All transactions finalised for the FY", active: false },
  { stage: "Accounts Preparation", period: "April", desc: "P&L, Balance Sheet, audit if required", active: false },
  { stage: "Form 11 Filing", period: "By 30 May", desc: "Annual Return with partner details filed", active: true },
  { stage: "AGM Equivalent", period: "Optional", desc: "Partners review financials (recommended)", active: false },
  { stage: "Form 8 Filing", period: "By 30 Oct", desc: "Statement of Accounts & Solvency filed", active: true },
  { stage: "MCA Confirmation", period: "Ongoing", desc: "SRN acknowledgment & master data updated", active: false },
];

const deliverables = [
  "Filed Form 8 (Statement of Account & Solvency) with MCA acknowledgment",
  "Filed Form 11 (Annual Return of LLP) with MCA acknowledgment",
  "SRN (Service Request Numbers) for both Form 8 and Form 11",
  "Updated MCA LLP master data record showing compliance",
  "Copies of filed forms for your records",
  "CA certification letter (if audit was required)",
];

const whyUs = [
  { icon: Award, title: "LLP Compliance Specialists", desc: "Dedicated team handling LLP Form 8 and Form 11 filings for hundreds of LLPs across India every financial year." },
  { icon: Clock, title: "Deadline-Driven Process", desc: "We track your LLP due dates proactively and initiate filing 30 days before deadline — no last-minute rush." },
  { icon: FileText, title: "Complete Documentation", desc: "We prepare, verify, and certify all accounts before filing — ensuring error-free submissions on MCA portal." },
  { icon: Scale, title: "In-house CA for Audit", desc: "LLPs requiring statutory audit get it done in-house — single point of contact for accounts and compliance." },
  { icon: ShieldCheck, title: "No Penalty Guarantee", desc: "We commit to filing within statutory deadlines. If we miss due to our error, we cover the penalty." },
  { icon: DollarSign, title: "Transparent Fixed Pricing", desc: "Flat annual fee starting at ₹3,999 — all inclusive. No hidden charges for audit, certification, or revisions." },
  { icon: UserCheck, title: "Dedicated Relationship Manager", desc: "One expert manages your LLP compliance year after year — familiar with your structure and partners." },
  { icon: TrendingUp, title: "Pan-India Service Coverage", desc: "Service all LLPs registered anywhere in India — remote-first process with secure document handling." },
];


const relatedServices = [
  { id: "roc-compliance", title: "ROC Compliance", desc: "Annual filing for private limited companies." },
  { id: "director-kyc", title: "Director KYC (DIR-3)", desc: "Keep DIN/DPIN active with annual KYC." },
  { id: "llp-registration", title: "LLP Registration", desc: "Register a new Limited Liability Partnership." },
  { id: "company-closure", title: "Company Closure (Strike-off)", desc: "Close LLP or company on MCA portal." },
  { id: "change-in-directors", title: "Change in Directors", desc: "Add or remove designated partners in LLP." },
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping", desc: "Maintain clean books for compliance filing." },
];

/* ════════════════════════ SIDEBAR ════════════════════════ */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">LLP Annual Filing</p>
        <p className="text-muted text-xs mb-1 leading-relaxed">Form 11 + Form 8 — filed on MCA portal</p>
        <p className="text-2xl font-heading font-bold text-primary mb-4">
          ₹3,999<span className="text-sm font-normal text-muted">/year</span>
        </p>
        <div className="space-y-2 mb-5">
          {["Form 11 Annual Return", "Form 8 Accounts & Solvency", "DPIN Status Check", "MCA Acknowledgment", "Penalty Avoidance"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <a href="tel:+919953719111"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          ><Phone size={13} /> Call Now</a>
          <Link href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          >File LLP Returns</Link>
          <a href="https://wa.me/919953719111" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          ><MessageCircle size={13} /> WhatsApp</a>
        </div>
      </div>

      <div className="bg-primary rounded-2xl p-5 text-white">
        <p className="font-heading font-bold text-sm mb-4">Filing Deadlines</p>
        <div className="space-y-3">
          {[
            { label: "Form 11 Due Date", value: "30 May (annual)" },
            { label: "Form 8 Due Date", value: "30 Oct (annual)" },
            { label: "Late Fee", value: "₹100/day per form" },
            { label: "Penalty Cap", value: "No upper limit" },
            { label: "Authority", value: "MCA / Registrar of LLPs" },
            { label: "Audit Threshold", value: "Turnover >₹40L or Contribution >₹25L" },
          ].map(f => (
            <div key={f.label} className="flex items-start justify-between gap-2">
              <span className="text-white/50 text-xs shrink-0">{f.label}</span>
              <span className="text-white text-xs font-heading font-semibold text-right">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-sm mb-3">Quick Navigation</p>
        <div className="space-y-1">
          {[
            { href: "#what-is", label: "What is LLP Annual Filing?" },
            { href: "#who-needs", label: "Who Needs This?" },
            { href: "#benefits", label: "Key Benefits" },
            { href: "#process", label: "Filing Process" },
            { href: "#documents", label: "Documents Required" },
            { href: "#timeline", label: "Filing Timeline" },
            { href: "#deliverables", label: "What You Receive" },
            { href: "#why-us", label: "Why Company Avenue" },
            { href: "#faq", label: "FAQs" },
          ].map(item => (
            <a key={item.href} href={item.href}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-muted font-heading font-medium hover:bg-primary/5 hover:text-primary transition-colors group"
            >
              <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-heading font-semibold text-red-800 text-xs mb-1">Penalty Alert</p>
            <p className="text-red-700 text-xs leading-relaxed">₹100/day per form with NO upper cap. A 6-month delay = ₹18,000 in late fees alone.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════ MAIN EXPORT ════════════════════════ */
export function LLPAnnualFilingPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="llp-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#llp-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">LLP Annual Filing</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">Form 11 + Form 8 • Deadline-Driven • Penalty-Free Filing</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                LLP Annual Filing<br /><span className="text-primary">Form 11 + Form 8</span><br />MCA Compliance
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                File your LLP&apos;s Annual Return (Form 11) and Statement of Account &amp; Solvency (Form 8) on time. Avoid ₹100/day penalties, maintain active LLP status, and protect your designated partners from personal liability.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  File LLP Returns <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to Expert
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["Both Form 11 & Form 8 Filing", "DPIN Status Verification", "CA Audit if Required", "Penalty-Free Guarantee"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Quick Fact Cards */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {quickFacts.map((f, i) => (
                  <div key={i} className={`${f.color} rounded-2xl p-5 border border-white/60`}>
                    <f.icon size={22} className="mb-3" />
                    <p className="font-heading font-bold text-sm leading-tight mb-1">{f.value}</p>
                    <p className="text-xs opacity-70">{f.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-red-700 text-xs leading-relaxed font-heading font-medium">
                  Penalty of ₹100/day per form with no cap. File on time to avoid compounding late fees.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ WHAT IS LLP ANNUAL FILING ══ */}
      <section id="what-is" className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Understanding LLP Compliance" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-6 leading-tight">
                What is LLP Annual Filing?
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                Every Limited Liability Partnership (LLP) registered in India must file two annual forms with the Ministry of Corporate Affairs (MCA): <strong className="text-dark">Form 11</strong> and <strong className="text-dark">Form 8</strong>. This is a mandatory compliance requirement under the Limited Liability Partnership Act, 2008 — there is no exception for small LLPs, dormant LLPs, or LLPs with zero turnover.
              </p>
              <p className="text-muted leading-relaxed mb-5">
                <strong className="text-dark">Form 11 (Annual Return)</strong> contains the names and details of all designated partners, their DPIN numbers, capital contribution, and a summary of business activities during the year. It must be filed by <strong className="text-dark">30th May</strong> every year.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                <strong className="text-dark">Form 8 (Statement of Account &amp; Solvency)</strong> contains the financial statements — Profit &amp; Loss account, Balance Sheet, and a declaration of solvency by the designated partners. LLPs with turnover exceeding ₹40 lakh or contribution exceeding ₹25 lakh must get their accounts audited by a CA before filing Form 8. The due date is <strong className="text-dark">30th October</strong> every year.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Form 11 Due", value: "30 May" },
                  { label: "Form 8 Due", value: "30 Oct" },
                  { label: "Penalty/Day/Form", value: "₹100" },
                  { label: "Audit Trigger", value: ">₹40L Turnover" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-100">
                    <p className="font-heading font-bold text-primary text-xl">{s.value}</p>
                    <p className="text-muted text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="relative rounded-3xl overflow-hidden shadow-[0_12px_60px_rgba(15,45,82,0.12)] aspect-[4/3]"
            >
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=85"
                alt="LLP Annual Filing Form 11 Form 8 MCA Compliance India"
                fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-heading font-bold text-lg leading-tight">LLP Compliance Made Simple</p>
                <p className="text-white/70 text-sm mt-1">Expert filing of Form 11 and Form 8 — deadline guaranteed</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ WHO NEEDS ══ */}
      <section id="who-needs" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Applicability" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">Who Needs LLP Annual Filing?</h2>
            <p className="text-muted max-w-2xl mx-auto">Every LLP registered with MCA must file Form 11 and Form 8. The law provides no exemptions based on turnover, age, or activity level.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoNeeds.map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-card transition-shadow"
              >
                <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon size={20} />
                </div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{item.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ KEY BENEFITS ══ */}
      <section id="benefits" className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Why File on Time" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">Key Benefits of Timely LLP Filing</h2>
            <p className="text-muted max-w-2xl mx-auto">Compliance isn&apos;t just about avoiding penalties — it protects your LLP&apos;s legal standing, credit eligibility, and your partners&apos; personal credibility.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-card transition-shadow"
              >
                <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon size={20} />
                </div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{item.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section id="process" className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <Eyebrow label="Filing Process" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">Step-by-Step LLP Filing Process</h2>
              <p className="text-muted leading-relaxed mb-8">Our structured process ensures both Form 11 and Form 8 are prepared, certified, and filed before their respective due dates — with complete accuracy.</p>
              <div className="bg-primary/8 rounded-2xl p-5 border border-primary/15">
                <p className="font-heading font-semibold text-primary text-sm mb-2">Two Critical Deadlines</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-heading font-bold flex items-center justify-center shrink-0">11</div>
                    <p className="text-dark text-xs"><strong>Form 11</strong> — Annual Return — due <strong>30 May</strong></p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent text-white text-xs font-heading font-bold flex items-center justify-center shrink-0">8</div>
                    <p className="text-dark text-xs"><strong>Form 8</strong> — Accounts &amp; Solvency — due <strong>30 October</strong></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {processSteps.map((step, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="flex items-start gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary text-white font-heading font-bold text-xs flex items-center justify-center">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-dark text-sm mb-1">{step.title}</h3>
                    <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ DOCUMENTS ══ */}
      <section id="documents" className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Eyebrow label="Checklist" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">Documents Required</h2>
              <p className="text-muted">Have these documents ready when you engage us — we&apos;ll prepare and verify everything before filing.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents.map((doc, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-slate-100"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/8 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <FileText size={15} />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-dark text-sm">{doc.label}</p>
                    <p className="text-muted text-xs mt-0.5">{doc.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-amber-800 text-xs leading-relaxed">
                <strong>CA Audit Required:</strong> If your LLP&apos;s annual turnover exceeds ₹40 lakh or total partner contribution exceeds ₹25 lakh, accounts must be audited by a Chartered Accountant before Form 8 can be filed. Our package includes CA audit for eligible LLPs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section id="timeline" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Annual Cycle" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">LLP Compliance Timeline</h2>
            <p className="text-muted max-w-2xl mx-auto">Understanding the LLP annual compliance cycle helps you plan accounts and filing without last-minute rush.</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute top-[28px] left-0 right-0 h-0.5 bg-slate-200 z-0" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
              {timeline.map((item, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-3 ${item.active ? "bg-primary border-primary text-white" : "bg-white border-slate-200 text-slate-400"}`}>
                    <span className="font-heading font-bold text-xs">{i + 1}</span>
                  </div>
                  <p className={`font-heading font-bold text-xs mb-1 ${item.active ? "text-primary" : "text-dark"}`}>{item.stage}</p>
                  <p className={`text-[10px] font-semibold mb-1 ${item.active ? "text-accent" : "text-muted"}`}>{item.period}</p>
                  <p className="text-muted text-[10px] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ DELIVERABLES + SIDEBAR ══ */}
      <section id="deliverables" className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Eyebrow label="What You Get" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-6">What You Receive</h2>
              <p className="text-muted leading-relaxed mb-8">Our LLP annual filing package delivers complete MCA compliance — from preparation to filed acknowledgment — for both mandatory forms.</p>
              <div className="space-y-3">
                {deliverables.map((d, i) => (
                  <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-slate-100"
                  >
                    <CircleCheck size={18} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-dark text-sm">{d}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 bg-primary rounded-2xl p-6 text-white">
                <p className="font-heading font-bold text-base mb-2">Starting at ₹3,999/year</p>
                <p className="text-white/70 text-sm mb-4">All-inclusive — Form 11, Form 8, DPIN check, CA certification, MCA filing, and SRN acknowledgment.</p>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary font-heading font-bold text-sm rounded-xl hover:bg-white/90 transition-colors"
                >
                  Get Started <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div>
              <StickySidebar />
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY COMPANY AVENUE ══ */}
      <section id="why-us" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Our Advantage" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">Why Choose Company Avenue?</h2>
            <p className="text-muted max-w-2xl mx-auto">We&apos;ve filed hundreds of LLP annual returns across India. Our deadline-driven process ensures you never pay a penalty.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-card transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/8 text-primary flex items-center justify-center mb-4">
                  <item.icon size={20} />
                </div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{item.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Eyebrow label="Frequently Asked Questions" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">LLP Annual Filing FAQs</h2>
              <p className="text-muted">Everything you need to know about Form 11, Form 8, and LLP compliance in India.</p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ══ RELATED SERVICES ══ */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Eyebrow label="Explore More" />
            <h2 className="font-heading font-bold text-3xl text-dark mb-4">Related Services</h2>
            <p className="text-muted">Complete your LLP compliance and business growth with these connected services.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedServices.map((svc, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Link href={`/services/${svc.id}`}
                  className="group flex flex-col bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all h-full"
                >
                  <p className="font-heading font-semibold text-dark text-sm mb-1 group-hover:text-primary transition-colors">{svc.title}</p>
                  <p className="text-muted text-xs leading-relaxed flex-1">{svc.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-primary text-xs font-heading font-semibold">
                    Learn More <ArrowRight size={12} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DARK CTA ══ */}
      <section className="py-20 bg-[#0F2D52]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="font-heading font-semibold text-accent text-sm tracking-widest uppercase mb-4">File Before the Deadline</p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6 leading-tight">
                Don&apos;t Let ₹100/Day Penalties Accumulate on Your LLP
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-10 max-w-xl mx-auto">
                Form 11 by 30 May. Form 8 by 30 October. Our team files both forms on time, every year — with full preparation, CA certification, and MCA acknowledgment included.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-heading font-bold text-sm rounded-xl hover:bg-[#c4963f] transition-colors"
                >
                  File LLP Returns Now <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/5 transition-colors"
                >
                  <Phone size={15} /> Call Our LLP Expert
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
