"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, MessageCircle,
  BookOpen, CreditCard, BarChart3, DollarSign, Users, ShieldCheck,
  TrendingUp, Award, Zap, Clock, FileText, Building2, Globe,
  Headphones, UserCheck, BadgeCheck, Download, Star,
  Receipt, RefreshCcw, PiggyBank, Layers, Monitor, Factory,
  ShoppingBag, Briefcase, Lock, Database, ChevronRight,
  LayoutDashboard, Calculator, Wallet, Package, AlertCircle,
  TrendingDown, BarChart2, ClipboardList,
} from "lucide-react";
/* ─── animation variant ─── */
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

/* ─── DATA ─── */
const heroSnapshot = [
  { label: "Books", value: "Error-Free" },
  { label: "Reports", value: "Monthly" },
  { label: "Software", value: "TallyPrime / Zoho" },
  { label: "Process", value: "100% Secure" },
  { label: "Compliance", value: "GST + IT Ready" },
  { label: "Support", value: "Dedicated CA" },
];

const painPoints = [
  { icon: Clock, title: "No Time for Books", desc: "Spending hours on spreadsheets instead of growing your business.", color: "bg-rose-50 text-rose-600" },
  { icon: AlertCircle, title: "GST Reconciliation Errors", desc: "Mismatches between books and GST returns causing compliance issues.", color: "bg-amber-50 text-amber-600" },
  { icon: Users, title: "Payroll Complexity", desc: "Managing salaries, PF, ESIC deductions, and TDS manually.", color: "bg-orange-50 text-orange-600" },
  { icon: FileText, title: "Delayed Financial Reports", desc: "No real-time view of your P&L, cash flow, or outstanding balances.", color: "bg-purple-50 text-purple-600" },
  { icon: ShieldCheck, title: "Compliance Gaps", desc: "Missing deadlines for TDS returns, GST filings, and ROC compliance.", color: "bg-blue-50 text-blue-600" },
  { icon: BarChart3, title: "Poor Cash Flow Visibility", desc: "Unable to track receivables, payables, or working capital in real time.", color: "bg-teal-50 text-teal-600" },
];

const workflowSteps = [
  { n: "01", title: "Business Requirement Analysis", desc: "We assess your business type, transaction volume, software preferences, and compliance needs to tailor an accounting plan.", icon: ClipboardList },
  { n: "02", title: "Secure Document Collection", desc: "Bank statements, invoices, expense receipts, and payroll data are collected via a secure portal with strict confidentiality.", icon: Lock },
  { n: "03", title: "Transaction Recording & Bookkeeping", desc: "Every transaction is recorded accurately — sales, purchases, expenses, bank entries, and journal entries.", icon: BookOpen },
  { n: "04", title: "GST & Bank Reconciliation", desc: "We reconcile GST returns with books and match bank statements to ensure zero discrepancies.", icon: RefreshCcw },
  { n: "05", title: "Payroll & Expense Management", desc: "Salaries, reimbursements, PF, ESIC, and TDS are processed accurately and on schedule.", icon: Wallet },
  { n: "06", title: "Monthly Financial Reports", desc: "Receive P&L statements, balance sheets, cash flow reports, and MIS summaries every month.", icon: BarChart3 },
  { n: "07", title: "Compliance & Advisory Support", desc: "Ongoing GST, TDS, and income tax compliance with proactive advisory from our CA team.", icon: ShieldCheck },
];

const softwareList = [
  { name: "TallyPrime", desc: "Most popular ERP for SMEs", color: "bg-blue-50 border-blue-100", text: "text-blue-700", abbr: "TP" },
  { name: "Zoho Books", desc: "Cloud-first accounting", color: "bg-teal-50 border-teal-100", text: "text-teal-700", abbr: "ZB" },
  { name: "QuickBooks", desc: "Used by global businesses", color: "bg-green-50 border-green-100", text: "text-green-700", abbr: "QB" },
  { name: "Busy", desc: "GST-ready accounting", color: "bg-purple-50 border-purple-100", text: "text-purple-700", abbr: "BY" },
  { name: "MS Excel", desc: "Custom MIS & reporting", color: "bg-emerald-50 border-emerald-100", text: "text-emerald-700", abbr: "XL" },
  { name: "Cloud Tools", desc: "Wave, FreshBooks & more", color: "bg-primary/5 border-primary/20", text: "text-primary", abbr: "☁" },
];

const services = [
  { icon: BookOpen, title: "Bookkeeping", desc: "Accurate recording of all financial transactions — sales, purchases, expenses, and receipts.", color: "bg-primary/8 text-primary" },
  { icon: Receipt, title: "Accounts Payable & Receivable", desc: "Track what you owe and what's owed to you. Reduce overdue invoices and improve cash flow.", color: "bg-blue-50 text-blue-600" },
  { icon: RefreshCcw, title: "Bank Reconciliation", desc: "Match every bank transaction with your books to detect errors and prevent fraud.", color: "bg-green-50 text-green-600" },
  { icon: Calculator, title: "GST Accounting", desc: "GST-compliant books, ITC reconciliation, and GSTR data preparation every month.", color: "bg-amber-50 text-amber-600" },
  { icon: Wallet, title: "Payroll Processing", desc: "Salary computation, pay slips, PF / ESIC deductions, and TDS on salary — all handled.", color: "bg-purple-50 text-purple-600" },
  { icon: BarChart3, title: "Financial Statements", desc: "P&L, Balance Sheet, and Cash Flow Statements prepared as per accounting standards.", color: "bg-teal-50 text-teal-600" },
  { icon: LayoutDashboard, title: "MIS Reports", desc: "Custom management information reports — sales analysis, cost tracking, and KPIs.", color: "bg-rose-50 text-rose-600" },
  { icon: Package, title: "Inventory Accounting", desc: "Stock valuation, COGS computation, and inventory reconciliation for product businesses.", color: "bg-orange-50 text-orange-600" },
  { icon: FileText, title: "Year-End Finalization", desc: "Complete year-end books closure — ledger scrutiny, depreciation, provisions, and audit-ready financials.", color: "bg-indigo-50 text-indigo-600" },
];

const dashboardKPIs = [
  { icon: TrendingUp, label: "Monthly Revenue", value: "₹18.4L", change: "+12%", color: "bg-green-50 text-green-600 border-green-100", badge: "text-green-700 bg-green-100" },
  { icon: TrendingDown, label: "Total Expenses", value: "₹11.2L", change: "-4%", color: "bg-rose-50 text-rose-600 border-rose-100", badge: "text-rose-700 bg-rose-100" },
  { icon: DollarSign, label: "Net Profit", value: "₹7.2L", change: "+18%", color: "bg-primary/5 text-primary border-primary/20", badge: "text-primary bg-primary/10" },
  { icon: Wallet, label: "Cash Flow", value: "₹5.8L", change: "Positive", color: "bg-teal-50 text-teal-600 border-teal-100", badge: "text-teal-700 bg-teal-100" },
  { icon: AlertCircle, label: "Outstanding Receivables", value: "₹3.1L", change: "2 Pending", color: "bg-amber-50 text-amber-600 border-amber-100", badge: "text-amber-700 bg-amber-100" },
  { icon: Receipt, label: "GST Summary", value: "₹2.3L", change: "ITC Claimed", color: "bg-purple-50 text-purple-600 border-purple-100", badge: "text-purple-700 bg-purple-100" },
];

const benefits = [
  { icon: PiggyBank, title: "Cost Savings", desc: "Save 40–60% vs. hiring an in-house accountant — no salary, no benefits, no overhead.", color: "bg-green-50 text-green-600" },
  { icon: Award, title: "Expert Accountants", desc: "Qualified CAs and accounting professionals — not junior clerks.", color: "bg-primary/8 text-primary" },
  { icon: BadgeCheck, title: "Error-Free Books", desc: "Multi-level review process ensures accurate, reconciled, audit-ready books.", color: "bg-blue-50 text-blue-600" },
  { icon: ShieldCheck, title: "Compliance Assurance", desc: "Never miss a GST, TDS, or ROC deadline with our proactive compliance calendar.", color: "bg-teal-50 text-teal-600" },
  { icon: BarChart2, title: "Real-Time Reports", desc: "Access your P&L and cash flow dashboard anytime — no waiting for month-end.", color: "bg-amber-50 text-amber-600" },
  { icon: TrendingUp, title: "Better Cash Flow Mgmt", desc: "Track receivables and payables to improve your working capital cycle.", color: "bg-purple-50 text-purple-600" },
  { icon: Layers, title: "Scalability", desc: "Scale from 50 to 5,000 transactions per month — we grow with your business.", color: "bg-orange-50 text-orange-600" },
  { icon: Lock, title: "Data Security", desc: "256-bit encryption, NDA-backed confidentiality, and strict access controls.", color: "bg-rose-50 text-rose-600" },
];

const industries = [
  { icon: Zap, label: "Startups" },
  { icon: Building2, label: "Private Limited Companies" },
  { icon: Users, label: "LLPs & Firms" },
  { icon: ShoppingBag, label: "E-commerce" },
  { icon: Monitor, label: "Agencies & Consultants" },
  { icon: Factory, label: "Manufacturers" },
  { icon: Briefcase, label: "Traders & Distributors" },
  { icon: Globe, label: "Professionals" },
  { icon: Layers, label: "SMEs & Growing Businesses" },
];

const whyUsPoints = [
  { icon: Award, title: "Experienced CAs on Team", desc: "Every account is reviewed by a qualified Chartered Accountant — not just data entry operators." },
  { icon: UserCheck, title: "Dedicated Accountant", desc: "You get a named point of contact who knows your business, not a shared inbox." },
  { icon: Lock, title: "Secure Data Handling", desc: "Bank-grade encryption, strict NDAs, and role-based access for all your financial data." },
  { icon: DollarSign, title: "Transparent Pricing", desc: "Fixed monthly packages with no hidden fees — know exactly what you pay." },
  { icon: Clock, title: "Timely Monthly Reports", desc: "Reports delivered by the 5th of every month so you can plan ahead." },
  { icon: ShieldCheck, title: "End-to-End Compliance", desc: "GST, TDS, income tax, ROC — all under one roof with zero coordination headache." },
];

const faqs = [
  { q: "What accounting packages do you offer?", a: "We offer three tiers: Starter (up to 100 transactions/month), Growth (up to 500 transactions), and Enterprise (unlimited). Each includes bookkeeping, bank reconciliation, and monthly P&L. GST accounting and payroll are available as add-ons or included in higher tiers." },
  { q: "Which accounting software do you support?", a: "We work with TallyPrime, Zoho Books, QuickBooks, Busy, and Microsoft Excel. If you already use a particular software, we adapt to it. For new clients, we recommend Zoho Books or TallyPrime based on your business size and GST requirements." },
  { q: "How do I share documents securely?", a: "We use a secure client portal where you upload bank statements, invoices, and expense receipts. You can also share via Google Drive, Dropbox, or email with encrypted attachments. We never request documents over WhatsApp or unsecured channels." },
  { q: "How often will I receive reports?", a: "Monthly financial reports (P&L, Balance Sheet, Cash Flow) are delivered by the 5th of every month. For Growth and Enterprise plans, a real-time dashboard is also available. Custom MIS reports can be scheduled weekly if needed." },
  { q: "How do you ensure confidentiality of my financial data?", a: "All clients sign a strict Non-Disclosure Agreement (NDA). Data is stored on encrypted servers with role-based access controls. Our team members access only the data required for your specific account." },
  { q: "How is pricing determined?", a: "Pricing is based on your monthly transaction volume and required services. A 100-transaction starter plan begins at ₹2,499/month. We provide a transparent quote after a free assessment call — no hidden charges or surprise bills." },
  { q: "Can you handle accounting for multiple entities?", a: "Yes. We support multi-entity accounting for business groups. Each entity gets a separate set of books, and we can also prepare consolidated financial statements for group reporting." },
  { q: "Do you provide audit support?", a: "Yes. Our CA team provides complete statutory audit support, including preparation of audit schedules, coordination with your auditor, and post-audit adjustments." },
];

const relatedServices = [
  { id: "gst-filing", title: "GST Return Filing", desc: "Monthly & quarterly GST compliance." },
  { id: "income-tax-return", title: "Income Tax Return", desc: "ITR filing for businesses and individuals." },
  { id: "payroll-management", title: "Payroll Management", desc: "Salaries, PF, ESIC & TDS compliance." },
  { id: "private-limited-company", title: "Company Registration", desc: "Start your Pvt. Ltd. company." },
  { id: "tds-return", title: "TDS Return Filing", desc: "Quarterly TDS compliance." },
  { id: "roc-compliance", title: "Annual ROC Compliance", desc: "MCA filings & secretarial work." },
];

/* ─── FAQ Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
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
        <p className="font-heading font-bold text-dark text-base mb-1">Get a Free Accounting Quote</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Tell us your transaction volume and we&apos;ll send a transparent quote within 24 hours.</p>
        <div className="space-y-2 mb-5">
          {["Error-Free Books", "Monthly Financial Reports", "GST-Ready Accounting", "Secure Data Handling"].map(pt => (
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
            <MessageCircle size={13} /> WhatsApp
          </a>
        </div>
      </div>
      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Download size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Accounting Checklist</p>
        </div>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">Download our monthly accounting document checklist as PDF.</p>
        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
          <Download size={13} /> Download PDF
        </button>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "500+", l: "Clients Served" }, { v: "99%", l: "Accuracy Rate" }, { v: "15+", l: "Years Exp." }, { v: "24h", l: "Response Time" }].map(s => (
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
export function AccountingBookkeepingPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="acc-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#acc-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Accounting & Bookkeeping</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">Accounting Experts • Error-Free Books • Compliance Ready</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Professional Accounting &<br /><span className="text-primary">Bookkeeping Services</span><br />for Growing Businesses
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Outsource your accounting to qualified CAs and get error-free books, monthly MIS reports, GST-ready records, and complete financial compliance — so you can focus on what you do best.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Book Free Consultation <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to an Expert
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["Expert Chartered Accountants", "Secure Document Handling", "GST & Compliance Ready", "Monthly Financial Reports"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            {/* Hero Dashboard Card */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                      <LayoutDashboard size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">Accounting Snapshot</p>
                      <p className="text-muted text-[10px]">Live business overview</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-heading font-semibold bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full">● Live</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {heroSnapshot.map((s) => (
                    <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                      <p className="font-heading font-bold text-dark text-sm leading-none mb-0.5">{s.value}</p>
                      <p className="text-muted text-[10px]">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Revenue Recorded", pct: 100, color: "bg-primary" },
                    { label: "Expenses Reconciled", pct: 87, color: "bg-accent" },
                    { label: "GST ITC Matched", pct: 94, color: "bg-green-500" },
                  ].map(b => (
                    <div key={b.label}>
                      <div className="flex justify-between text-[10px] text-muted mb-1">
                        <span>{b.label}</span><span className="font-semibold text-dark">{b.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div className={`h-full rounded-full ${b.color}`}
                          initial={{ width: 0 }} animate={{ width: `${b.pct}%` }}
                          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-muted">Books updated today</span>
                  </div>
                  <span className="text-[10px] font-heading font-semibold text-primary">June 2026 ↗</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24">

            {/* ── WHY OUTSOURCE ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Why Outsource" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Are These Challenges Slowing<br />Your Business Down?
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Most business owners spend 10+ hours a week on accounting tasks. Here&apos;s what our clients were dealing with before they outsourced.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {painPoints.map((p, i) => (
                  <motion.div key={p.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="flex items-start gap-4 p-5 border border-slate-100 rounded-2xl bg-white hover:shadow-card-hover hover:border-slate-200 transition-all group"
                  >
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${p.color}`}>
                      <p.icon size={18} />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-dark text-sm mb-1">{p.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 bg-primary/5 border border-primary/15 rounded-2xl p-5 flex items-center gap-4"
              >
                <CheckCircle size={20} className="text-primary shrink-0" />
                <p className="text-primary text-sm font-heading font-semibold">Company Avenue solves all of the above with a single, affordable monthly plan.</p>
              </motion.div>
            </section>

            {/* ── WORKFLOW TIMELINE ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Our Process" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  How Our Accounting Workflow Works
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  A structured, repeatable process that ensures accuracy, compliance, and timely delivery every month.
                </p>
              </motion.div>
              <div className="relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent hidden md:block" />
                <div className="space-y-4">
                  {workflowSteps.map((step, i) => (
                    <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                      className="flex gap-5 group"
                    >
                      <div className="shrink-0 relative z-10">
                        <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:bg-accent transition-colors duration-300">
                          <step.icon size={18} className="text-white" />
                        </div>
                      </div>
                      <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/20 transition-all">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-heading font-bold text-accent tracking-widest">{step.n}</span>
                          <p className="font-heading font-semibold text-dark text-sm">{step.title}</p>
                        </div>
                        <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── SOFTWARE WE USE ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Software" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Accounting Software We Work With
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  We adapt to your preferred accounting platform — or recommend the best fit for your business size.
                </p>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {softwareList.map((sw, i) => (
                  <motion.div key={sw.name} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className={`flex items-center gap-4 p-5 border rounded-2xl ${sw.color} hover:shadow-card transition-all group cursor-default`}
                  >
                    <div className={`shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center font-heading font-bold text-sm ${sw.color} ${sw.text}`}>
                      {sw.abbr}
                    </div>
                    <div>
                      <p className={`font-heading font-bold text-sm ${sw.text}`}>{sw.name}</p>
                      <p className="text-muted text-[11px] leading-snug">{sw.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── SERVICES INCLUDED ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Services Included" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Everything Covered Under One Plan
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  From daily bookkeeping to year-end finalization — no need to hire multiple vendors.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {services.map((svc, i) => (
                  <motion.div key={svc.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card-hover hover:border-primary/20 transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${svc.color} group-hover:scale-105 transition-transform`}>
                      <svc.icon size={18} />
                    </div>
                    <p className="font-heading font-semibold text-dark text-sm mb-1.5">{svc.title}</p>
                    <p className="text-muted text-xs leading-relaxed">{svc.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── BENEFITS ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Benefits" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Why Outsourced Accounting<br />Makes Business Sense
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  The numbers are compelling. Here&apos;s what businesses gain when they outsource their accounting.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((b, i) => (
                  <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="flex items-start gap-4 p-5 border border-slate-100 rounded-2xl bg-white hover:shadow-card hover:border-primary/15 transition-all group"
                  >
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${b.color} group-hover:scale-105 transition-transform`}>
                      <b.icon size={18} />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-dark text-sm mb-1">{b.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── INDUSTRIES ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Industries We Serve" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Trusted by Businesses Across Industries
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Our accounting team understands the specific compliance and reporting needs of your industry.
                </p>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {industries.map((ind, i) => (
                  <motion.div key={ind.label} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="flex items-center gap-3 p-4 border border-slate-100 rounded-2xl bg-white hover:shadow-card hover:border-primary/20 hover:bg-primary/[0.02] transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <ind.icon size={16} className="text-primary" />
                    </div>
                    <p className="font-heading font-semibold text-dark text-xs leading-snug">{ind.label}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── WHY CHOOSE US ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Why Company Avenue" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  What Makes Us Different
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Beyond accurate books — we&apos;re a proactive accounting partner that helps you make smarter financial decisions.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyUsPoints.map((pt, i) => (
                  <motion.div key={pt.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:shadow-card hover:border-primary/15 transition-all group"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <pt.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm mb-1">{pt.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{pt.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── FAQ ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Everything you need to know before outsourcing your accounting.
                </p>
              </motion.div>
              <div className="space-y-2">
                {faqs.map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
              </div>
            </section>

            {/* ── RELATED SERVICES ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Explore More" />
                <h2 className="font-heading font-bold text-2xl text-dark tracking-tight mb-8">Related Services</h2>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {relatedServices.map((svc, i) => (
                  <motion.div key={svc.id} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <Link href={`/services/${svc.id}`}
                      className="flex items-center justify-between gap-2 p-4 border border-slate-100 rounded-2xl bg-white hover:shadow-card hover:border-primary/20 hover:bg-primary/[0.02] transition-all group"
                    >
                      <div>
                        <p className="font-heading font-semibold text-dark text-sm group-hover:text-primary transition-colors">{svc.title}</p>
                        <p className="text-muted text-xs mt-0.5">{svc.desc}</p>
                      </div>
                      <ChevronRight size={15} className="text-muted group-hover:text-primary shrink-0 transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

          </div>{/* end left column */}

          {/* ── STICKY SIDEBAR ── */}
          <div className="hidden xl:block sticky top-24 self-start"><StickySidebar /></div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-gradient-to-br from-primary to-[#154D8C] py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-5">
              <span className="w-6 h-px bg-accent" />Get Started Today<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white leading-tight tracking-tight mb-5">
              Outsource Your Accounting &<br />Focus on Growing Your Business
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Join 500+ businesses that trust Company Avenue for accurate, compliant, and timely accounting. Start with a free consultation — no commitment required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-accent-light transition-colors shadow-lg shadow-accent/20"
              >
                Book Free Consultation <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 border border-white/20 transition-colors"
              >
                <Phone size={14} /> Talk to an Expert
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {["No Long-Term Lock-ins", "Fixed Monthly Pricing", "Start in 48 Hours", "Dedicated CA Support"].map(pt => (
                <div key={pt} className="flex items-center gap-2">
                  <CheckCircle size={13} className="text-accent" />
                  <span className="text-white/70 text-sm">{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
