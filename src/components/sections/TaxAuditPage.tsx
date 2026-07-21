"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, Clock, CheckCircle, Plus, Minus,
  Download, MessageCircle, AlertTriangle, FileText, CreditCard,
  Building2, Users, Globe, Briefcase, Monitor,
  Award, DollarSign, Headphones, UserCheck, LifeBuoy, Receipt,
  BookOpen, CalendarCheck, ShieldCheck, TrendingUp,
  BadgeCheck, AlertCircle, Info, Bell, Activity,
  BarChart3, RefreshCcw, Layers,
  ClipboardList, FileBadge, FileCheck, Database,
  Wallet, Banknote, Scale, Percent, Landmark, PenLine,
  Hash, Building, Search, Clipboard, Send,
} from "lucide-react";
import { faqs } from "@/lib/faqs/TaxAuditPage";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
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

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const quickFacts = [
  { icon: FileText,    label: "Section",     value: "44AB" },
  { icon: TrendingUp,  label: "Threshold",   value: "₹1 Cr (Business) / ₹50L (Profession)" },
  { icon: CalendarCheck,label: "Due Date",   value: "30 September" },
  { icon: ClipboardList,label: "Report",     value: "Form 3CA/3CB + 3CD" },
  { icon: AlertCircle, label: "Penalty",     value: "0.5% of Turnover (Max ₹1.5L)" },
  { icon: Landmark,    label: "Authority",   value: "Income Tax Department" },
];

const whoNeeds = [
  { icon: TrendingUp,  title: "Businesses with Turnover > ₹1 Crore",      desc: "Any business (proprietary, partnership, company) with gross receipts or total sales exceeding ₹1 crore in a financial year must mandatorily get a tax audit under Section 44AB." },
  { icon: Briefcase,   title: "Professionals with Receipts > ₹50 Lakh",   desc: "Doctors, lawyers, engineers, CAs, architects, and other professionals listed under Section 44AA with gross receipts exceeding ₹50 lakh must get their accounts audited." },
  { icon: Scale,       title: "Businesses Opting Out of Sec 44AD",         desc: "Businesses that declared lower profits than the presumptive rate (8% or 6%) under Section 44AD and whose income exceeds the basic exemption limit must get a tax audit." },
  { icon: Building2,   title: "NBFCs and Financial Institutions",           desc: "Non-Banking Financial Companies and other financial entities are mandatorily covered under tax audit irrespective of the turnover threshold due to the nature of their operations." },
  { icon: Landmark,    title: "Banking Companies",                          desc: "All banking companies as defined under the Banking Regulation Act are mandated to get a tax audit done under Section 44AB on an annual basis." },
  { icon: Users,       title: "Companies with Qualifying Turnover",        desc: "Private limited companies, public companies, and OPCs with business turnover exceeding ₹1 crore (or ₹10 crore if 95%+ transactions are digital) require a tax audit." },
  { icon: Globe,       title: "Partnership Firms at Threshold",             desc: "Partnership firms and LLPs with business turnover above ₹1 crore, or professional receipts above ₹50 lakh, must get their accounts audited and file Form 3CB + 3CD." },
  { icon: Database,    title: "Anyone Required by IT Act",                  desc: "Even if you fall below turnover limits, the Income Tax Act mandates a tax audit in certain circumstances — such as opting out of presumptive schemes after claiming them." },
];

const benefits = [
  { icon: ShieldCheck, title: "Mandatory Statutory Compliance",             desc: "Fulfils the legal obligation under Section 44AB. Avoids 0.5% penalty on turnover (max ₹1.5 lakh) and potential prosecution under Section 276B." },
  { icon: Award,       title: "Credibility to Financial Statements",        desc: "An audited set of accounts carries significantly more credibility with banks, investors, government departments and potential business partners." },
  { icon: Banknote,    title: "Enables Bank Loans & Credit Facilities",     desc: "Banks and NBFCs require audited financial statements for sanctioning business loans, overdrafts, and working capital facilities above certain limits." },
  { icon: AlertCircle, title: "Avoids 0.5% Turnover Penalty",              desc: "Section 271B imposes a penalty of 0.5% of total turnover or gross receipts (capped at ₹1.5 lakh) for failure to get accounts audited or submit Form 3CD by due date." },
  { icon: BarChart3,   title: "Enables Carry-Forward of Losses",            desc: "Business losses (other than unabsorbed depreciation) can only be carried forward if the return is filed on time and a tax audit report accompanies the ITR where applicable." },
  { icon: TrendingUp,  title: "Advance Tax Precision",                      desc: "The detailed financial analysis done during a tax audit enables accurate advance tax computation, preventing interest under Sections 234B and 234C." },
  { icon: BadgeCheck,  title: "Clean Income Tax Compliance Record",         desc: "A consistent tax audit history demonstrates financial discipline, reducing likelihood of scrutiny assessments and notices from the Income Tax Department." },
  { icon: Users,       title: "CA Network Assurance",                       desc: "Only a practicing Chartered Accountant can sign a tax audit report, providing an independent expert review of your financial records, transactions, and disclosures." },
];

const processSteps = [
  { n: "01", title: "Appointment of Practicing CA",          desc: "Formally appoint a practising Chartered Accountant (CA) as your tax auditor. The CA must not have any disqualification and the client must upload the CA details on the IT portal to initiate the audit." },
  { n: "02", title: "Financial Statement Preparation",        desc: "Prepare the complete financial statements — Trading Account, Profit & Loss Account, and Balance Sheet. Ensure books are updated in Tally or accounting software with all transactions for the financial year." },
  { n: "03", title: "Verification of Books of Accounts",     desc: "The CA verifies all books of accounts — cash book, ledger, purchase register, sales register, salary register, fixed asset register — and reconciles them with the bank statements and source documents." },
  { n: "04", title: "Analysis of Transactions",              desc: "The auditor analyses key transactions including loans, related-party dealings, payments above thresholds, cash receipts/payments above ₹2 lakh, compliance with Section 40A(3), TDS deductions, and MSME payments." },
  { n: "05", title: "Drafting Form 3CD Clauses",             desc: "Prepare the 44-clause Form 3CD report covering business details, depreciation, loans taken/repaid, payment to specified persons, TDS compliance, capital expenditure, speculative losses, and more." },
  { n: "06", title: "CA Signing and Certification",          desc: "After thorough review and client approval of all disclosures, the practicing CA digitally signs the audit report (Form 3CA/3CB) and Form 3CD using their DSC registered on the IT portal." },
  { n: "07", title: "Upload on Income Tax Portal",           desc: "The signed audit report is uploaded on the Income Tax e-filing portal under the client's login. The CA accepts the uploaded report via their own login to complete the filing process." },
  { n: "08", title: "Acknowledgment and ITR Filing",         desc: "Obtain the acknowledgment of the uploaded audit report. Use the audited financials and Form 3CD disclosures to accurately file the Income Tax Return (ITR-3, ITR-5, or ITR-6) before 31st October." },
];

const requiredDocs = [
  { icon: BookOpen,      label: "Books of Accounts (Tally / Excel)" },
  { icon: CreditCard,    label: "Bank Statements (All Accounts)" },
  { icon: Receipt,       label: "Sales and Purchase Invoices" },
  { icon: Users,         label: "Salary Register & HR Records" },
  { icon: Database,      label: "Stock Records / Inventory Statements" },
  { icon: Banknote,      label: "Loan Documents & Repayment Schedules" },
  { icon: Building2,     label: "Fixed Asset Register with Depreciation" },
  { icon: FileText,      label: "Previous Year Tax Audit Report & ITR" },
  { icon: ClipboardList, label: "GST Returns (GSTR-1, 3B, 9)" },
  { icon: FileBadge,     label: "TDS Challans and Form 26AS" },
];

const timelineStages = [
  { stage: "01", title: "CA Engagement",      desc: "Appoint a practicing CA and upload auditor details on the IT portal." },
  { stage: "02", title: "Books Review",        desc: "CA verifies all books, registers, and bank statements for the full year." },
  { stage: "03", title: "Transaction Analysis", desc: "Deep-dive into related party deals, loans, TDS, cash, MSME payments." },
  { stage: "04", title: "Report Drafting",     desc: "All 44 clauses of Form 3CD are drafted and discussed with the client." },
  { stage: "05", title: "CA Certification",    desc: "CA digitally signs Form 3CA/3CB and Form 3CD using registered DSC." },
  { stage: "06", title: "IT Portal Upload",    desc: "Report uploaded and accepted; acknowledgment downloaded for ITR filing." },
];

const deliverables = [
  "Form 3CA (if audited under any other law) or Form 3CB (standalone tax audit) — signed by practicing CA",
  "Form 3CD — comprehensive 44-clause audit report with all required disclosures",
  "Audited Financial Statements — Trading Account, P&L, Balance Sheet",
  "Signed and Dated Audit Report with CA membership number and UDIN",
  "IT Portal Acknowledgment / Filing Receipt for the audit report",
  "Observations and qualifications noted by the auditor (if any)",
  "Clause-wise working papers and supporting computations",
  "Guidance note on ITR filing based on audit findings and adjustments required",
];

const whyUsPoints = [
  { icon: Award,      label: "Senior CAs with 15+ Years Audit Experience" },
  { icon: UserCheck,  label: "Dedicated Engagement Manager" },
  { icon: Bell,       label: "Proactive Reminders Before September 30" },
  { icon: RefreshCcw, label: "Books Cleanup & Reconciliation Included" },
  { icon: DollarSign, label: "Transparent Fixed Pricing — No Surprises" },
  { icon: LifeBuoy,   label: "Post-Audit Support for IT Department Queries" },
  { icon: Monitor,    label: "100% Digital Workflow — No Physical Visits" },
  { icon: Headphones, label: "24-Hour Average Response Time" },
];

const relatedServices = [
  { id: "tds-return",           title: "TDS Return Filing",        desc: "Quarterly TDS compliance managed." },
  { id: "income-tax-return",    title: "Income Tax Return",        desc: "ITR for all business categories." },
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping", desc: "Books, MIS & year-end closing." },
  { id: "advance-tax",          title: "Advance Tax Planning",     desc: "Quarterly advance tax computation." },
  { id: "gst-filing",           title: "GST Return Filing",        desc: "Monthly & annual GST compliance." },
  { id: "roc-compliance",       title: "ROC Compliance",           desc: "Annual filings & secretarial work." },
];


/* ─── FAQ Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white"
    >
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <span itemProp="name" className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
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

/* ─── Sticky Sidebar ─── */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">Get Your Tax Audit Done</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Expert CA-certified audit. Complete Form 3CA/3CB + 3CD before 30 September.</p>
        <div className="space-y-2 mb-5">
          {["Form 3CA/3CB + 3CD Filing", "Senior CA Certification", "Books Review Included", "Zero Penalty Guarantee"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <a href="tel:+919953719111"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          >
            <Phone size={13} /> Call Now
          </a>
          <Link href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          >
            Book Free Consultation
          </Link>
          <a href="https://wa.me/919953719111" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={13} /> WhatsApp Us
          </a>
        </div>
      </div>

      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Wallet size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Starting at ₹9,999</p>
        </div>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">Includes Form 3CB + 3CD, CA signing, portal upload, and acknowledgment.</p>
        <Link href="/contact" className="w-full py-2.5 bg-accent text-dark text-xs font-heading font-bold rounded-xl transition-colors flex items-center justify-center gap-2 hover:bg-amber-400">
          Start Audit Now <ArrowRight size={13} />
        </Link>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "2,500+", l: "Audits Done" }, { v: "100%", l: "On-time" }, { v: "15+", l: "Years Exp." }, { v: "24h", l: "Response" }].map(s => (
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

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
export function TaxAuditPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="ta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#ta-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>

        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Tax Audit (Section 44AB)</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">CA-Certified Tax Audit • Form 3CD • Before 30 Sept</span>
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Tax Audit under<br /><span className="text-primary">Section 44AB</span>
              </motion.h1>

              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Avoid the 0.5% turnover penalty. Our senior Chartered Accountants conduct your complete tax audit — verifying books, preparing all 44 clauses of Form 3CD, signing the report, and uploading it on the IT portal before 30 September.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Start Tax Audit <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to Our CA
                </a>
              </motion.div>

              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["Form 3CA / 3CB + 3CD", "44-Clause Report", "CA Digital Signing", "IT Portal Upload"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                      <Search size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">Tax Audit Snapshot</p>
                      <p className="text-muted text-xs">Section 44AB — FY 2024–25</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Active
                  </span>
                </div>
                <div className="space-y-2.5 mb-5">
                  {[
                    { label: "Applicable Section", value: "Section 44AB" },
                    { label: "Business Threshold", value: "Turnover > ₹1 Crore" },
                    { label: "Profession Threshold", value: "Receipts > ₹50 Lakh" },
                    { label: "Report Due Date", value: "30 September" },
                  ].map((item, i) => (
                    <motion.div key={item.label}
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.4 + i * 0.07 }}
                      className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                    >
                      <span className="text-xs text-muted">{item.label}</span>
                      <span className="text-xs font-heading font-semibold text-dark">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted font-heading font-semibold">Audit Readiness</p>
                    <span className="text-xs text-green-600 font-heading font-bold">Ready</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-green-500 rounded-full"
                      initial={{ width: 0 }} animate={{ width: "88%" }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                    />
                  </div>
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
                <motion.div key={f.label} custom={i} variants={fadeUp} initial="hidden"
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

      {/* ── WHAT IS TAX AUDIT ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85"
                  alt="Tax audit section 44AB India chartered accountant"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">2,500+</p>
                <p className="text-white/60 text-xs">Audits Completed</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is Tax Audit under Section 44AB?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                A <strong>Tax Audit under Section 44AB</strong> of the Income Tax Act is a mandatory statutory audit conducted by a practicing Chartered Accountant (CA) for taxpayers whose business turnover exceeds <strong>₹1 crore</strong> or professional receipts exceed <strong>₹50 lakh</strong> in a financial year.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                The auditor prepares <strong>Form 3CA or 3CB</strong> (audit report) along with <strong>Form 3CD</strong> — a comprehensive 44-clause statement covering all material aspects of the taxpayer&apos;s financial affairs, tax compliance, and accounting methods.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                The audit report must be uploaded on the Income Tax portal by <strong>30 September</strong> of the assessment year. Failure attracts a penalty of <strong>0.5% of turnover (maximum ₹1.5 lakh)</strong> under Section 271B.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["CA-Signed Audit Report", "44-Clause Form 3CD", "Books Verification", "IT Portal Filing"].map(pt => (
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
            <Eyebrow label="Applicability" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">Who Needs a Tax Audit?</h2>
            <p className="text-muted text-base max-w-2xl mx-auto">Section 44AB covers a wide range of taxpayers. Determine if your business or profession qualifies for mandatory tax audit this year.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoNeeds.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                    <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{item.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
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
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">Benefits of Getting a Tax Audit Done</h2>
            <p className="text-muted text-base max-w-2xl mx-auto">A professionally conducted tax audit does far more than just fulfil a legal obligation — it strengthens your financial credibility and protects your business.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:bg-white hover:border-primary/15 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                    <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{item.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TWO-COLUMN: MAIN + STICKY SIDEBAR ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* PROCESS STEPS */}
            <section>
              <Eyebrow label="Audit Process" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Tax Audit Process — Step by Step</h2>
              <div className="relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200" aria-hidden="true" />
                <div className="space-y-6">
                  {processSteps.map((step, i) => (
                    <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden"
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
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Documents Needed for Tax Audit</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {requiredDocs.map((doc) => {
                    const Icon = doc.icon;
                    return (
                      <motion.div key={doc.label} whileHover={{ x: 4 }}
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
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                  <Info size={15} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">
                    <strong>Pro tip:</strong> Ensure your books are closed and reconciled with bank statements before engaging the auditor. Clean, organised books significantly reduce audit time and cost.
                  </p>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section>
              <Eyebrow label="Timeline" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Tax Audit Timeline — 6 Key Stages</h2>
              <div className="relative">
                <div className="hidden md:block absolute top-[28px] left-[14%] right-[14%] h-px bg-slate-200" aria-hidden="true" />
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {timelineStages.map((s, i) => (
                    <motion.div key={s.stage} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-primary text-white font-heading font-bold text-sm flex items-center justify-center mb-3 shadow-sm z-10 relative border-4 border-white">
                        {s.stage}
                      </div>
                      <p className="font-heading font-bold text-dark text-xs mb-1 leading-snug">{s.title}</p>
                      <p className="text-muted text-[11px] leading-snug">{s.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* WHAT YOU RECEIVE */}
            <section>
              <Eyebrow label="Deliverables" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">What You Receive</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="space-y-3">
                  {deliverables.map((d, i) => (
                    <motion.div key={i} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle size={12} className="text-primary" />
                      </div>
                      <span className="text-dark text-sm leading-snug">{d}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                  <div>
                    <p className="font-heading font-bold text-dark text-base">Starting at ₹9,999</p>
                    <p className="text-muted text-xs">All-inclusive. No hidden charges. Tailored by turnover.</p>
                  </div>
                  <Link href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors"
                  >
                    Start Audit <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </section>

            {/* FORM 3CD CLAUSES EXPLAINER */}
            <section>
              <Eyebrow label="Form 3CD" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">What Does Form 3CD Cover?</h2>
              <p className="text-muted text-sm mb-8 max-w-2xl">Form 3CD contains 44 clauses spanning every critical aspect of your business. Here are the key reporting areas our CA thoroughly verifies and discloses.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: Briefcase,    title: "Business & Nature Details",       desc: "Clause 1–8: Name, address, PAN, nature of business or profession, and accounting period." },
                  { icon: BookOpen,     title: "Method of Accounting",            desc: "Clause 9–10: Cash vs. mercantile basis; changes in method and their quantitative impact on profits." },
                  { icon: Database,     title: "Depreciation & Fixed Assets",     desc: "Clause 18: Depreciation computed as per Income Tax rules (Appendix I rates) vs. books — adjustments disclosed." },
                  { icon: Scale,        title: "Cash Payments & Sec 40A(3)",      desc: "Clause 21: Payments above ₹10,000 in cash to a single person disallowed under 40A(3) — requires complete disclosure." },
                  { icon: Users,        title: "Related Party Transactions",      desc: "Clause 23: Payments to partners, directors, relatives, or associated entities exceeding reasonable limits are disclosed here." },
                  { icon: Banknote,     title: "Loans & Repayments",             desc: "Clause 31: Cash loans or deposits above ₹20,000, MSME payment defaults beyond 45 days — statutory disclosure required." },
                  { icon: FileBadge,    title: "TDS Compliance",                  desc: "Clause 34: Amounts on which TDS was required but not deducted — section-wise listing impacts 40(a)(ia) disallowances." },
                  { icon: TrendingUp,   title: "Speculative & Derivative Losses", desc: "Clause 15: Details of speculation business income/loss, derivatives trading — impacts set-off eligibility under IT Act." },
                  { icon: ShieldCheck,  title: "Crypto / VDA Disclosures",        desc: "Clause 13 (extended from FY22-23): Treatment of Virtual Digital Assets, applicable tax rate (30%), and transaction details." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors duration-300">
                        <Icon size={16} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <p className="font-heading font-bold text-dark text-sm mb-1">{item.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
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
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">Why Choose Company Avenue for Tax Audit?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {whyUsPoints.map((pt) => {
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
                    { v: "2,500+", l: "Audits Done",        c: "bg-primary text-white" },
                    { v: "₹0",     l: "Penalties Incurred", c: "bg-accent text-dark" },
                    { v: "15+",    l: "Years Experience",   c: "bg-slate-800 text-white" },
                    { v: "24 hrs", l: "Response Time",      c: "bg-green-600 text-white" },
                  ].map((s) => (
                    <motion.div key={s.l} whileHover={{ y: -4 }}
                      className={`${s.c} rounded-2xl p-6 text-center shadow-card`}
                    >
                      <p className="font-heading font-bold text-3xl leading-none mb-1">{s.v}</p>
                      <p className="text-xs opacity-80 leading-snug">{s.l}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* PENALTY EXPLAINER */}
            <section>
              <Eyebrow label="Penalty & Risk" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">Consequences of Missing Tax Audit</h2>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-dark text-sm leading-relaxed">
                  <strong>Warning:</strong> Missing the 30 September deadline for tax audit attracts 0.5% turnover penalty, loss of carry-forward rights, and increased scrutiny from the IT Department. Engage your CA early.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: AlertCircle,   title: "Section 271B Penalty",          desc: "0.5% of total sales/turnover/gross receipts or ₹1,50,000, whichever is lower. No waiver provision unless valid reason accepted by AO.", color: "text-red-600 bg-red-50" },
                  { icon: TrendingUp,    title: "Loss Carry-Forward Rights Lost", desc: "Business losses (excluding unabsorbed depreciation) cannot be carried forward if return is not filed by due date — audit non-completion cascades.", color: "text-orange-600 bg-orange-50" },
                  { icon: Scale,         title: "ITR Due Date Extended to Oct 31", desc: "If audit report is required, ITR due date shifts to 31st October. Missing this due date attracts late filing fee under Section 234F and interest.", color: "text-amber-600 bg-amber-50" },
                  { icon: BadgeCheck,    title: "Higher Scrutiny Probability",   desc: "Non-filing of audit report flags the ITR for enhanced scrutiny. The assessing officer may initiate proceedings under Sec 142 or 143(2).", color: "text-purple-600 bg-purple-50" },
                  { icon: AlertTriangle, title: "Disallowances Under Sec 40",    desc: "Expenses not properly verified and disclosed in Form 3CD may be disallowed during assessment — directly increasing your tax liability.", color: "text-rose-600 bg-rose-50" },
                  { icon: Activity,      title: "CA Compliance Issues",          desc: "If the appointed CA does not submit the report, both auditor and client face compliance issues. Client must revoke and re-appoint another CA.", color: "text-blue-600 bg-blue-50" },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div key={p.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card transition-all group"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${p.color}`}>
                        <Icon size={15} />
                      </div>
                      <p className="font-heading font-bold text-dark text-sm mb-1">{p.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{p.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* PRESUMPTIVE TAXATION EXPLAINER */}
            <section>
              <Eyebrow label="44AD / 44ADA" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-6">Avoid Tax Audit with Presumptive Taxation</h2>
              <p className="text-muted text-sm mb-8">If your turnover/receipts are within limits and you declare the prescribed presumptive income, you can avoid a tax audit entirely. Here&apos;s how:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    scheme: "Section 44AD",
                    badge: "bg-blue-600 text-white",
                    color: "bg-blue-50 border-blue-100",
                    sub: "For Eligible Businesses",
                    limit: "Turnover ≤ ₹2 Crore",
                    rate: "8% (cash) / 6% (digital) of turnover",
                    who: "Individuals, HUF, Partnership Firms (not companies/LLPs)",
                    caveat: "If declared income < 8%/6% and income > basic exemption limit → Sec 44AB audit mandatory.",
                  },
                  {
                    scheme: "Section 44ADA",
                    badge: "bg-purple-600 text-white",
                    color: "bg-purple-50 border-purple-100",
                    sub: "For Specified Professionals",
                    limit: "Gross Receipts ≤ ₹50 Lakh",
                    rate: "50% of gross receipts as presumptive income",
                    who: "Doctors, Lawyers, CAs, Engineers, Architects, Consultants",
                    caveat: "If declared income < 50% and income > basic exemption limit → tax audit under Sec 44AB required.",
                  },
                ].map((item) => (
                  <motion.div key={item.scheme}
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                    className={`border rounded-2xl p-6 hover:shadow-card transition-all ${item.color}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-heading font-bold px-3 py-1 rounded-full ${item.badge}`}>{item.scheme}</span>
                      <span className="text-muted text-xs">{item.sub}</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex gap-2"><span className="text-xs text-muted w-20 shrink-0">Limit:</span><span className="text-dark text-xs font-medium">{item.limit}</span></div>
                      <div className="flex gap-2"><span className="text-xs text-muted w-20 shrink-0">Rate:</span><span className="text-dark text-xs font-medium">{item.rate}</span></div>
                      <div className="flex gap-2"><span className="text-xs text-muted w-20 shrink-0">Eligible:</span><span className="text-dark text-xs font-medium">{item.who}</span></div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                      <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-dark text-[11px] leading-relaxed">{item.caveat}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section itemScope itemType="https://schema.org/FAQPage">
              <div className="text-center mb-10">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions</h2>
                <p className="text-muted text-base mt-3 max-w-lg mx-auto">Everything you need to know about tax audit under Section 44AB, Form 3CD, thresholds, and compliance requirements.</p>
              </div>
              <div className="space-y-2">
                {faqs.map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
              </div>
            </section>

          </div>{/* end main content */}
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
                <Link href={`/services/${s.id}`}
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
      <section className="py-24 bg-[#0F2D52] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="cta-ta" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#cta-ta)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Get Started Today" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Get Your Tax Audit Done<br /><span className="text-accent">Before 30 September</span>
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Company Avenue Advisory&apos;s senior Chartered Accountants conduct your complete Section 44AB tax audit — books verification, Form 3CD preparation, CA signing, and IT portal filing. Starting at ₹9,999. No hidden charges.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors"
              >
                Start My Tax Audit <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Talk to Our CA
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
