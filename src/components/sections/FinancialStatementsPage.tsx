"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  Building2, Users, Briefcase, Award, ShieldCheck, TrendingUp,
  AlertTriangle, Clock, BadgeCheck, DollarSign,
  Landmark, Info, AlertCircle, ChevronRight, Wallet,
  BarChart3, BookOpen, Database, Scale, Banknote, ClipboardList,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";
import { faqs } from "@/lib/faqs/FinancialStatementsPage";

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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
        <span itemProp="name" className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }}
            itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="overflow-hidden">
            <p itemProp="text" className="px-5 pb-4 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const quickFacts = [
  { icon: FileText,    label: "Statements",    value: "P&L, Balance Sheet, Cash Flow" },
  { icon: Landmark,    label: "Compliance",    value: "Schedule III (Companies Act)" },
  { icon: Clock,       label: "Timeline",      value: "3-7 Business Days" },
  { icon: DollarSign,  label: "Starting At",   value: "₹4,999/year" },
  { icon: FileText,    label: "For Filing",    value: "AOC-4, Form 3CB, ITR" },
  { icon: BadgeCheck,  label: "Standards",     value: "Ind AS / AS (ICAI)" },
];

const statementTypes = [
  { icon: TrendingUp,  title: "Profit & Loss Account",       desc: "Comprehensive income statement showing revenues, cost of goods sold, gross profit, operating expenses, EBITDA, depreciation, interest, and net profit/loss for the financial year." },
  { icon: BarChart3,   title: "Balance Sheet",                desc: "Financial position statement showing equity and liabilities on one side and non-current assets, current assets, and other assets on the other — compliant with Schedule III format." },
  { icon: Banknote,    title: "Cash Flow Statement",          desc: "Mandatory for most companies — shows cash generated and used in operating, investing, and financing activities, reconciled with opening and closing bank balance." },
  { icon: ClipboardList, title: "Notes to Accounts",         desc: "Detailed disclosures required under Schedule III including accounting policies, contingent liabilities, related party transactions, segment information, and statutory notes." },
  { icon: FileText,    title: "Directors&apos; Report",       desc: "Annual report from the Board of Directors covering financial highlights, CSR activities, risk management, remuneration policy, and other statutory disclosures required under the Companies Act." },
  { icon: BookOpen,    title: "Schedules and Annexures",      desc: "Supporting schedules for fixed assets, investments, loans, borrowings, and other financial statement items that provide granular detail not shown in the main statements." },
];

const benefits = [
  { icon: ShieldCheck, title: "Mandatory for AOC-4 Filing",           desc: "Companies must file audited financial statements with the Registrar of Companies in Form AOC-4. Without properly prepared statements in Schedule III format, the ROC filing cannot be completed." },
  { icon: Banknote,    title: "Essential for Bank Loan Sanction",      desc: "Every bank and NBFC requires at least 2-3 years of audited financial statements for evaluating term loans, working capital, overdraft, and project finance applications." },
  { icon: BarChart3,   title: "Required for Tax Audit (Form 3CB)",     desc: "Businesses above the Section 44AB threshold must have audited financial statements for the CA to certify Form 3CB + 3CD. No financial statements means no tax audit report." },
  { icon: TrendingUp,  title: "Investor and Due Diligence Ready",      desc: "Investors, private equity firms, and strategic acquirers demand professionally prepared, audited financial statements as the starting point for any due diligence process." },
  { icon: Scale,       title: "Ind AS and AS Compliance",              desc: "Large companies must prepare Ind AS-compliant statements while smaller companies follow AS (Accounting Standards). Non-compliance attracts qualifications in the statutory audit report." },
  { icon: Award,       title: "Accurate ITR Filing",                   desc: "The income tax return for companies (ITR-6) is directly derived from the financial statements. Errors in the financials cascade into incorrect ITR, attracting scrutiny and notices." },
  { icon: Database,    title: "GST Reconciliation",                    desc: "Financial statements must be reconciled with GST returns (GSTR-1, 3B, 9). Unexplained differences between financial statement turnover and GST turnover attract GST audit and notice." },
  { icon: Users,       title: "Stakeholder Reporting",                 desc: "Financial statements are the primary accountability document for shareholders, creditors, employees, and regulators. Their accuracy directly impacts trust in the management team." },
];

const whoNeeds = [
  { icon: Building2,   title: "All Private Limited Companies",         desc: "Every Pvt Ltd company must prepare audited financial statements annually for ROC filing (AOC-4), regardless of turnover or profit levels." },
  { icon: Landmark,    title: "LLPs with Turnover Above ₹40 Lakh",    desc: "LLPs with turnover exceeding ₹40 lakh or contribution exceeding ₹25 lakh must prepare and get accounts audited and file them with the MCA." },
  { icon: Users,       title: "Proprietorships and Partnerships Seeking Loans", desc: "While not always mandatory, banks require professionally prepared financial statements to process credit facilities for sole proprietorships and partnership firms." },
  { icon: TrendingUp,  title: "Companies with Tax Audit Requirement",  desc: "Businesses and professionals above Section 44AB thresholds must have CA-prepared and certified financial statements as the basis for Form 3CB/3CD tax audit reporting." },
  { icon: Briefcase,   title: "Startups Raising Funds",                desc: "Investors perform financial due diligence on audited statements. Startups preparing for seed, Series A, or any institutional funding must have proper financial statements ready." },
  { icon: Database,    title: "Companies Filing for Government Tenders", desc: "Most government and PSU tenders require submission of audited financial statements for the past 2-3 years as part of technical and financial eligibility criteria." },
];

const processSteps = [
  { n: "01", title: "Books of Accounts Review",           desc: "Review all accounting entries in Tally or accounting software — purchases, sales, expenses, bank entries, journal entries — and identify errors, missing entries, or unreconciled items." },
  { n: "02", title: "Bank Reconciliation",                desc: "Reconcile every bank account balance as per books with bank statements. Identify and clear outstanding cheques, ECS mismatches, and bank charges not recorded in books." },
  { n: "03", title: "Fixed Asset Register Update",        desc: "Update the fixed asset register with all additions and disposals during the year. Compute depreciation as per Companies Act Schedule II rates (SLM or WDV method as applicable)." },
  { n: "04", title: "Closing Stock Verification",         desc: "Obtain and verify the closing stock statement. Reconcile with purchase and sales records. Apply the consistent valuation method (FIFO/weighted average) as per accounting policies." },
  { n: "05", title: "Ledger Scrutiny and Provisions",     desc: "Scrutinise all ledger balances. Make year-end provisions for expenses payable, audit fees, income tax, gratuity, leave encashment, and any other accruals required by accounting standards." },
  { n: "06", title: "Financial Statement Preparation",    desc: "Prepare the Trading Account, Profit & Loss Account, and Balance Sheet in Schedule III format (for companies) or standard format (for firms/proprietorships) with complete notes to accounts." },
  { n: "07", title: "Schedules and Notes to Accounts",    desc: "Prepare all supporting schedules and disclosure notes as required — related party transactions, segment reporting, statutory dues, contingent liabilities, lease disclosures, and accounting policies." },
  { n: "08", title: "Director/Partner Approval",          desc: "Present the draft financial statements to the board of directors or partners for review and approval. Incorporate feedback and prepare the final signed set for statutory audit and MCA/IT filing." },
];

const requiredDocs = [
  { icon: BookOpen,    label: "Tally / Accounting Software Data (trial balance)" },
  { icon: Database,    label: "Bank Statements (all accounts, full year)" },
  { icon: FileText,    label: "Sales Invoices and Purchase Bills" },
  { icon: ClipboardList, label: "Fixed Asset Details (purchases, disposals)" },
  { icon: BarChart3,   label: "Closing Stock Statement (quantity and value)" },
  { icon: Users,       label: "Salary and HR Records" },
  { icon: FileText,    label: "Loan Agreements and Repayment Schedules" },
  { icon: Banknote,    label: "TDS Challans and Form 26AS" },
  { icon: FileText,    label: "GST Returns (GSTR-1, 3B, 9)" },
  { icon: Building2,   label: "Prior Year Audited Statements (for comparison)" },
];


export function FinancialStatementsPage() {
  return (
    <main className="overflow-x-hidden" itemScope itemType="https://schema.org/Service">

      {/* HERO */}
      <section className="relative bg-[#081726] text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "36px 36px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-heading">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-accent">Financial Statements</span>
          </nav>
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Eyebrow label="Accounting &amp; Compliance" />
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" itemProp="name">
              Financial Statement{" "}
              <span className="text-accent">Preparation</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl" itemProp="description">
              Expert preparation of P&amp;L Account, Balance Sheet, Cash Flow Statement, and Notes to Accounts in Schedule III format. Ready for statutory audit, ROC filing (AOC-4), tax audit (Form 3CB), bank submissions, and investor due diligence.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-7 py-3.5 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors">
                Prepare My Financials <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111" data-track="call"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-white/10 transition-colors">
                <Phone size={15} /> Talk to a CA
              </a>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-14">
            {quickFacts.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white/8 border border-white/10 rounded-2xl px-4 py-4 text-center backdrop-blur-sm">
                  <Icon size={18} className="text-accent mx-auto mb-2" />
                  <p className="text-accent font-heading font-bold text-sm leading-tight">{f.value}</p>
                  <p className="text-slate-400 text-xs mt-1 font-heading">{f.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* WHAT IS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Overview" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">
                What Are Financial Statements?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-5">
                Financial statements are the formal records of the financial activities and position of a business. Under the <strong className="text-dark">Companies Act, 2013 and Schedule III</strong>, every registered company must prepare a complete set of financial statements comprising the Profit &amp; Loss Account, Balance Sheet, Cash Flow Statement, Statement of Changes in Equity, and Notes to Accounts.
              </p>
              <p className="text-muted text-base leading-relaxed mb-5">
                For companies, these statements must be prepared in the <strong className="text-dark">Schedule III format</strong> and comply with <strong className="text-dark">Ind AS or AS</strong> as applicable. They form the basis for statutory audit, ROC filing (AOC-4), tax audit (Form 3CB), income tax return (ITR-6), and bank loan applications.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                The 2021 Schedule III amendment added significant new disclosures including <strong className="text-dark">ageing analysis of debtors/creditors, 8 mandatory financial ratios, CSR disclosures, and crypto asset reporting</strong> — making professional preparation more important than ever.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Schedule III Format", "Ind AS / AS Compliant", "Mandatory for AOC-4", "Audit Ready"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-primary/5 border border-primary/15 rounded-3xl p-8">
                <Eyebrow label="What We Prepare" />
                <p className="font-heading font-bold text-dark text-base mb-5">Components of Financial Statements</p>
                <div className="space-y-3">
                  {statementTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div key={type.title} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                        <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-heading font-semibold text-dark text-xs mb-0.5">{type.title}</p>
                          <p className="text-muted text-xs leading-snug">{type.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHO NEEDS */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Applicability" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Who Needs Financial Statement Preparation?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              Professional financial statement preparation is essential for compliance, fundraising, and business credibility.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whoNeeds.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{w.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Key Benefits" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Why Professional Financial Statement Preparation Matters</h2>
            <p className="text-muted mt-4">Properly prepared financial statements unlock compliance, credit, and capital.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{b.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Our Process" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Financial Statement Preparation - Step by Step</h2>
            <p className="text-muted mt-4">Our CAs follow a rigorous 8-step process to ensure accuracy and compliance.</p>
          </div>
          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200 hidden md:block" aria-hidden="true" />
            <div className="space-y-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="flex gap-5 relative">
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
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow label="Documentation" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">Documents Required</h2>
              <p className="text-muted leading-relaxed mb-8">
                Share these documents at the start of the engagement. The better organised your records, the faster and more accurate the financial statements.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {requiredDocs.map((doc, i) => {
                  const Icon = doc.icon;
                  return (
                    <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                      className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-primary" />
                      </div>
                      <span className="text-dark text-xs font-medium">{doc.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <Info size={18} className="text-blue-600" />
                  <p className="font-heading font-bold text-dark text-sm">New Schedule III Disclosures (2021)</p>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-4">The 2021 amendment added these mandatory disclosures to financial statements:</p>
                <div className="space-y-2">
                  {[
                    "Ageing analysis of trade receivables (4 buckets)",
                    "Ageing analysis of trade payables (4 buckets)",
                    "8 mandatory financial ratios with prior year comparison",
                    "CSR spending details and unspent amounts",
                    "Cryptocurrency / VDA holdings disclosure",
                    "Benami property details (if any)",
                    "Security of assets given as collateral",
                    "Loans to related parties and investments by company",
                    "MSME dues beyond 45-day payment timeline",
                    "Undisclosed income / assets from income tax proceedings",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertTriangle size={12} className="text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-dark text-xs leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TIMELINE & PRICING */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Timeline &amp; Pricing" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Timeline &amp; Investment</h2>
            <p className="text-muted mt-4">Fast turnaround with CA-certified quality.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Clock size={18} className="text-white" />
                </div>
                <p className="font-heading font-bold text-dark">Timeline</p>
              </div>
              <div className="space-y-3">
                {[
                  { phase: "Books Review & Reconciliation", time: "1-2 days" },
                  { phase: "Adjustments & Provisions",     time: "1-2 days" },
                  { phase: "Statement Preparation",        time: "1-2 days" },
                  { phase: "Notes and Schedules",          time: "1 day" },
                  { phase: "Review and Client Approval",   time: "1 day" },
                  { phase: "Total (Simple Entities)",      time: "3-7 business days" },
                ].map((item) => (
                  <div key={item.phase} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <span className="text-xs text-muted">{item.phase}</span>
                    <span className="text-xs font-heading font-semibold text-dark">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary rounded-3xl p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Wallet size={18} className="text-accent" />
                <p className="font-heading font-semibold text-base">Starting at ₹4,999/year</p>
              </div>
              <p className="text-white/60 text-xs mb-6 leading-relaxed">
                All-inclusive annual fee. Includes books review, financial statement preparation in Schedule III format, notes to accounts, and director approval set.
              </p>
              <div className="space-y-2 mb-6">
                {["Profit & Loss Account", "Balance Sheet (Schedule III)", "Cash Flow Statement", "Notes to Accounts", "8 Mandatory Ratios", "2021 Amendment Disclosures", "GST Reconciliation Support", "Audit-Ready Set"].map(pt => (
                  <div key={pt} className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-accent shrink-0" />
                    <span className="text-white/80 text-xs">{pt}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact"
                className="w-full py-3 bg-accent text-dark text-xs font-heading font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors">
                Prepare My Financials <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" itemScope itemType="https://schema.org/FAQPage">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-14">
            <Eyebrow label="FAQ" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Frequently Asked Questions</h2>
            <p className="text-muted mt-4">Everything about financial statement preparation, Schedule III, and Ind AS compliance.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                <FaqItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
