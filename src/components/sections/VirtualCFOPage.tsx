"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  Building2, Users, Globe, Briefcase, Monitor, Award,
  DollarSign, Headphones, ShieldCheck, BadgeCheck,
  CalendarCheck, RefreshCcw, TrendingUp, BookOpen,
  Star, MessageCircle, Layers, UserCheck, Receipt,
  BarChart2, PieChart, Zap, Target, Lightbulb,
  ChevronRight, Clock, Mail,
} from "lucide-react";
import { faqs } from "@/lib/faqs/VirtualCFOPage";

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
      <span className="w-6 h-px bg-accent" />
      {label}
      <span className="w-6 h-px bg-accent" />
    </span>
  );
}

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */

const quickFacts = [
  { icon: Target,       label: "For",         value: "Startups & Growing SMEs" },
  { icon: RefreshCcw,   label: "Engagement",  value: "Monthly Retainer" },
  { icon: BarChart2,    label: "Includes",    value: "MIS + Budgeting + IR" },
  { icon: Award,        label: "CA Team",     value: "CAs with 15+ Years Exp." },
  { icon: DollarSign,   label: "Cost",        value: "1/10th of Full-Time CFO" },
  { icon: Zap,          label: "Response",    value: "Same-Day Critical Issues" },
];

const whoNeeds = [
  { icon: TrendingUp,  title: "VC-Funded Startups",              desc: "Startups with investor funding need board-grade financial reporting, burn rate analysis, and runway projections that a Virtual CFO provides month after month." },
  { icon: Globe,       title: "Pre-IPO Companies",               desc: "Companies preparing for public listing need SEBI-compliant financials, internal controls, and investor-grade reporting — all part of our Virtual CFO mandate." },
  { icon: Monitor,     title: "E-Commerce Businesses",           desc: "Fast-scaling e-commerce companies need unit economics, contribution margin analysis, and working capital management that a dedicated Virtual CFO delivers." },
  { icon: Building2,   title: "Manufacturing SMEs",              desc: "Manufacturing businesses benefit from cost accounting, inventory controls, capacity analysis, and efficiency reporting that a Virtual CFO structures and monitors." },
  { icon: Briefcase,   title: "Import-Export Companies",         desc: "Companies with cross-border trade need forex risk management, LC analysis, duty optimisation, and transfer pricing advice — core Virtual CFO competencies." },
  { icon: Layers,      title: "SaaS Companies",                  desc: "SaaS businesses require MRR, ARR, churn, LTV/CAC metrics, and cohort analysis. A Virtual CFO builds and monitors these metrics every month." },
  { icon: Users,       title: "Family Businesses Professionalising", desc: "Family businesses transitioning to professional management need structured MIS, governance frameworks, and independent financial oversight." },
  { icon: UserCheck,   title: "Companies Without Finance Head",  desc: "Growing companies between the founder-managing-finances stage and needing a full-time CFO get CFO-level expertise at a fraction of the cost." },
];

const benefits = [
  { icon: Award,       title: "Senior CA Expertise at Fraction of Cost",  desc: "Get CAs with 15+ years of CFO-level experience for 1/10th of the cost of a full-time CFO. No recruiting, no benefits, no notice period." },
  { icon: BarChart2,   title: "Monthly MIS and Management Reports",        desc: "Structured monthly MIS covering P&L, Balance Sheet, Cash Flow, and KPIs — delivered in formats ready for investors and board members." },
  { icon: TrendingUp,  title: "Fundraising Support",                       desc: "From building the financial model and Information Memorandum to preparing investor Q&A — we support your entire fundraising process end to end." },
  { icon: Users,       title: "Investor Communication Support",            desc: "Prepare investor decks, respond to due diligence queries, and manage ongoing investor reporting with CA-backed accuracy and credibility." },
  { icon: FileText,    title: "Board Reporting Preparation",               desc: "Monthly and quarterly board packs with management commentary, variance analysis, and forward-looking projections — ready for presentation." },
  { icon: DollarSign,  title: "Cash Flow Management",                      desc: "13-week rolling cash flow forecasts, payment planning, and working capital optimisation to ensure you never run short of operational liquidity." },
  { icon: ShieldCheck, title: "Tax Planning Strategy",                     desc: "Proactive tax planning to minimise income tax, optimise GST input credits, and structure transactions efficiently — saving money every year." },
  { icon: Lightbulb,   title: "Cost Reduction Advisory",                   desc: "Identify cost inefficiencies, benchmark expenses, and recommend cost reduction strategies — a Virtual CFO pays for itself in savings alone." },
];

const processSteps = [
  { n: "01", title: "Onboarding Call & Scope Agreement",     desc: "We understand your business, current accounting setup, reporting needs, investor requirements, and agree on the Virtual CFO engagement scope and deliverables." },
  { n: "02", title: "Books Access Setup",                    desc: "We gain secure access to your accounting system — Tally, Zoho Books, QuickBooks, or others — and review the current state of your books." },
  { n: "03", title: "Month 1 Diagnostic Report",             desc: "A comprehensive diagnostic of your financial health — books quality, missing entries, pending compliances, and key financial ratios — delivered within 30 days." },
  { n: "04", title: "MIS Template Setup",                    desc: "We design and configure your custom MIS template: P&L, Balance Sheet, Cash Flow, KPI dashboard, and budget vs actuals — tailored to your business." },
  { n: "05", title: "Monthly Reporting Cycle",               desc: "Every month we close the books, prepare MIS, analyse variances, and deliver the report with management commentary within 7 working days of month-end." },
  { n: "06", title: "Board Presentation Support",            desc: "We prepare and present board packs, attend board meetings virtually, and handle CFO-level queries from board members and investors." },
  { n: "07", title: "Budget vs Actuals Tracking",            desc: "Quarterly budget preparation, ongoing tracking of actual performance against budget, and monthly variance commentary to keep the business on track." },
  { n: "08", title: "Ongoing Advisory",                      desc: "Continuous advisory on tax planning, compliance calendar, fundraising strategy, transfer pricing, and any critical financial decisions as they arise." },
];

const ongoingDocs = [
  { icon: Receipt,      label: "Monthly Bank Statements" },
  { icon: FileText,     label: "Sales / Purchase Data" },
  { icon: DollarSign,   label: "Expense Vouchers" },
  { icon: Users,        label: "Payroll Data" },
  { icon: Briefcase,    label: "Loan Statements" },
  { icon: BarChart2,    label: "Previous Financial Statements" },
];

const timelineStages = [
  { label: "Onboarding & Scope",      icon: Target,        time: "Week 1" },
  { label: "Books Access Setup",      icon: Monitor,       time: "Week 1–2" },
  { label: "Diagnostic Report",       icon: FileText,      time: "End of Month 1" },
  { label: "MIS Template Live",       icon: BarChart2,     time: "Month 2" },
  { label: "Monthly Reporting Live",  icon: CalendarCheck, time: "Month 2+" },
  { label: "Board Support Active",    icon: Users,         time: "Ongoing" },
];

const deliverables = [
  { icon: BarChart2,   label: "Monthly MIS Report",            desc: "P&L, Balance Sheet, Cash Flow — board-ready every month." },
  { icon: TrendingUp,  label: "Budget vs Actuals Tracker",     desc: "Monthly variance analysis with management commentary." },
  { icon: FileText,    label: "Fundraising Financial Model",   desc: "Investor-grade model with projections (if needed)." },
  { icon: Users,       label: "Board Pack Preparation",        desc: "Quarterly board packs with analysis and outlook." },
  { icon: ShieldCheck, label: "Tax Calendar",                  desc: "Proactive tax compliance calendar to avoid notices." },
  { icon: DollarSign,  label: "Cash Flow Forecast",            desc: "13-week rolling cash flow and liquidity management." },
];

const whyUs = [
  { icon: Award,       label: "CAs with 15+ Years CFO-Level Experience" },
  { icon: BarChart2,   label: "Custom MIS Built for Your Business" },
  { icon: TrendingUp,  label: "Fundraising & Investor Relations Support" },
  { icon: Users,       label: "Board Meeting Attendance (Virtual)" },
  { icon: ShieldCheck, label: "Tax Planning Included Every Month" },
  { icon: Zap,         label: "Same-Day Response for Critical Issues" },
  { icon: Monitor,     label: "All Major Accounting Software Supported" },
  { icon: Headphones,  label: "Dedicated Senior CA as Your CFO Partner" },
];

const relatedServices = [
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping",  desc: "Foundation for CFO-level reporting." },
  { id: "financial-statements",   title: "Financial Statements",       desc: "Audited P&L, Balance Sheet, Cash Flow." },
  { id: "business-valuation",     title: "Business Valuation",        desc: "CA-certified valuation for funding rounds." },
  { id: "payroll-management",     title: "Payroll Management",        desc: "Complete salary and statutory compliance." },
  { id: "gst-filing",             title: "GST Filing",                desc: "Monthly GSTR returns and reconciliation." },
  { id: "income-tax-return",      title: "Income Tax Return",         desc: "Business and director ITR filing." },
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
        <span itemProp="name" className="font-heading font-semibold text-dark text-sm leading-snug">
          {q}
        </span>
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
            <p itemProp="text" className="px-5 pb-4 text-muted text-sm leading-relaxed">
              {a}
            </p>
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
        <p className="font-heading font-bold text-dark text-base mb-1">Hire a Virtual CFO Today</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">
          Senior CA expertise. Monthly MIS. Board support. Fundraising assistance.
        </p>
        <div className="space-y-2 mb-5">
          {["MIS Delivered by Day 7", "Board Meeting Attendance", "Fundraising Support", "Tax Planning Included"].map((pt) => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <a
            href="tel:+919953719111" data-track="call"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          >
            <Phone size={13} /> Call Now
          </a>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          >
            Book Free Consultation
          </Link>
          <a
            href="https://wa.me/919953719111" data-track="whatsapp"
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
          <p className="font-heading font-semibold text-sm">Starting from</p>
        </div>
        <p className="font-heading font-bold text-3xl text-accent mb-1">₹9,999</p>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">
          Per month. Includes MIS, tax planning, and board support.
        </p>
        <Link
          href="/contact"
          className="w-full block text-center py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold rounded-xl transition-colors"
        >
          Start Free Onboarding Call
        </Link>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { v: "500+", l: "Companies" },
            { v: "15+",  l: "Years Exp." },
            { v: "₹50Cr+", l: "Funds Raised" },
            { v: "24h", l: "Response" },
          ].map((s) => (
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
export function VirtualCFOPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="vcfo-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vcfo-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Virtual CFO Services</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                ))}
                <span className="text-amber-700 text-xs font-heading font-semibold">
                  Trusted CFO Partner • Startups & SMEs Since 2009
                </span>
              </motion.div>
              <motion.h1
                custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Your Virtual CFO —<br />
                <span className="text-primary">CFO Expertise at 1/10th Cost</span>
              </motion.h1>
              <motion.p
                custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Get a Senior CA with 15+ years of CFO-level experience managing your MIS, financial strategy, investor relations, board reporting, and tax planning — all on a monthly retainer that costs a fraction of a full-time CFO.
              </motion.p>
              <motion.div
                custom={3} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Hire Your Virtual CFO <ArrowRight size={15} />
                </Link>
                <a
                  href="tel:+919953719111" data-track="call"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Free CFO Consultation
                </a>
              </motion.div>
              <motion.div
                custom={4} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-wrap gap-x-5 gap-y-2"
              >
                {["Monthly MIS by Day 7", "Fundraising Support", "Board Meeting Attendance", "Tax Planning Included"].map((pt) => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>
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
                      <p className="font-heading font-bold text-dark text-sm">Virtual CFO at a Glance</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Active
                  </span>
                </div>
                <div className="space-y-2.5 mb-5">
                  {[
                    { label: "Best For",       value: "Startups & Growing SMEs" },
                    { label: "Engagement",     value: "Monthly Retainer" },
                    { label: "Includes",       value: "MIS + Budgeting + IR" },
                    { label: "CA Experience",  value: "15+ Years CFO-Level" },
                    { label: "Cost vs CFO",    value: "~1/10th of Full-Time" },
                    { label: "Response Time",  value: "Same-Day Critical Issues" },
                  ].map((item, i) => (
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
                    <p className="font-heading font-bold text-primary text-xl">₹9,999<span className="text-sm font-normal text-muted">/month</span></p>
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
                  key={f.label} custom={i} variants={fadeUp} initial="hidden"
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

      {/* ── WHAT IS VIRTUAL CFO ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)] relative">
                <Image
                  src="https://images.unsplash.com/photo-1551135049-8a33b5883817?w=800&q=85"
                  alt="Virtual CFO services for startups and SMEs"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">500+</p>
                <p className="text-white/60 text-xs">Companies Served</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is a Virtual CFO?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                A <strong>Virtual CFO (vCFO)</strong> is a senior Chartered Accountant who acts as your Chief Financial Officer on a part-time, retainer basis. You get CFO-level financial leadership, strategic oversight, investor relations support, and board-ready reporting — without the cost of a full-time executive.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                At Company Avenue Advisory, our Virtual CFO team brings <strong>15+ years of real CFO experience</strong> to startups and growing SMEs. We handle everything from monthly MIS and cash flow forecasting to fundraising models and transfer pricing — at <strong>1/10th the cost</strong> of a full-time hire.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Whether you are a VC-funded startup preparing for a board meeting or an SME trying to get your financial house in order, a Virtual CFO brings the structure, discipline, and expertise your business needs to scale confidently.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Board-Ready MIS Monthly", "Fundraising Financial Model", "Tax Planning Proactive", "Same-Day Critical Response"].map((pt) => (
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

      {/* ── WHO NEEDS ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Who Needs This" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">
              Who Benefits from a Virtual CFO?
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto">
              A Virtual CFO is ideal for any business that has outgrown founder-led finance but is not yet ready for a full-time CFO.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoNeeds.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors duration-300">
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
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">
              What Our Virtual CFO Service Delivers
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto">
              Every engagement is built to give you board-grade financial leadership, investor-ready reporting, and proactive strategic advice.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {benefits.map((item, i) => {
              const Icon = item.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isEven ? -16 : 16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
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

      {/* ── PROCESS ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="How It Works" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">
              How We Onboard and Work Together
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto">
              Our structured onboarding process gets you from zero to a fully operational Virtual CFO engagement in 30 days.
            </p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200" aria-hidden="true" />
            <div className="space-y-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.n} custom={i} variants={fadeUp} initial="hidden"
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
        </div>
      </section>

      {/* ── TWO-COLUMN MAIN + SIDEBAR ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* DOCUMENTS */}
            <section>
              <Eyebrow label="Ongoing Documents" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">
                Data We Need from You Each Month
              </h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {ongoingDocs.map((doc) => {
                    const Icon = doc.icon;
                    return (
                      <motion.div
                        key={doc.label} whileHover={{ x: 4 }}
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
                  <Clock size={15} className="text-primary shrink-0" />
                  <p className="text-dark text-xs leading-relaxed">
                    Send data by the <strong>5th of each month</strong>. We deliver the complete MIS report by the <strong>7th working day</strong> — board-ready and error-checked.
                  </p>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section>
              <Eyebrow label="Engagement Timeline" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">
                Virtual CFO Engagement Timeline
              </h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {timelineStages.map((stage, i) => {
                    const Icon = stage.icon;
                    return (
                      <div key={stage.label} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-2 shadow-sm">
                            <Icon size={17} className="text-white" />
                          </div>
                          <p className="text-xs font-heading font-semibold text-dark leading-snug max-w-[80px]">
                            {stage.label}
                          </p>
                          <p className="text-[10px] text-muted mt-0.5">{stage.time}</p>
                        </div>
                        {i < timelineStages.length - 1 && (
                          <ChevronRight size={14} className="text-slate-400 shrink-0 hidden sm:block" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 bg-primary/5 border border-primary/15 rounded-xl p-4 flex items-center gap-3">
                  <CalendarCheck size={15} className="text-primary shrink-0" />
                  <p className="text-dark text-xs leading-relaxed">
                    Full Virtual CFO operations are typically live by <strong>end of Month 2</strong>. The first diagnostic report and MIS template are delivered in Month 1 as part of onboarding.
                  </p>
                </div>
              </div>
            </section>

            {/* WHAT YOU RECEIVE */}
            <section>
              <Eyebrow label="What You Receive" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">
                Monthly Deliverables from Your Virtual CFO
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {deliverables.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-300">
                        <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-dark text-sm mb-1">{item.label}</p>
                        <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* COMPARISON: VCFO vs FULL CFO */}
            <section>
              <Eyebrow label="Value Comparison" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-6">
                Virtual CFO vs Full-Time CFO
              </h2>
              <p className="text-muted text-sm mb-8 leading-relaxed">
                Most growing businesses do not need a full-time CFO. A Virtual CFO delivers the same quality of financial leadership at a fraction of the cost and without HR, recruitment, or notice period risk.
              </p>
              <div className="bg-white border border-slate-100 rounded-3xl shadow-card overflow-hidden">
                <div className="grid grid-cols-3 bg-primary px-6 py-4">
                  <p className="font-heading font-bold text-white text-sm">Feature</p>
                  <p className="font-heading font-bold text-accent text-sm text-center">Virtual CFO</p>
                  <p className="font-heading font-bold text-white/60 text-sm text-center">Full-Time CFO</p>
                </div>
                {[
                  { feature: "Monthly Cost",           vcfo: "₹9,999 – ₹49,999",      cfo: "₹4L – ₹7L/month" },
                  { feature: "MIS Reporting",          vcfo: "Included",               cfo: "Included" },
                  { feature: "Board Attendance",       vcfo: "Virtual (in-person opt)",cfo: "In-person" },
                  { feature: "Fundraising Support",    vcfo: "Included",               cfo: "Included" },
                  { feature: "Tax Planning",           vcfo: "Included",               cfo: "Separate team" },
                  { feature: "Notice Period Risk",     vcfo: "None (30-day notice)",   cfo: "3–6 months" },
                  { feature: "Recruitment Cost",       vcfo: "Zero",                   cfo: "₹2L – ₹5L" },
                  { feature: "CA Team Backing",        vcfo: "Full CA firm support",   cfo: "Individual only" },
                ].map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-3 px-6 py-3.5 border-b border-slate-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                  >
                    <p className="text-dark text-xs font-medium">{row.feature}</p>
                    <p className="text-primary text-xs font-heading font-semibold text-center">{row.vcfo}</p>
                    <p className="text-muted text-xs text-center">{row.cfo}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* MIS SNAPSHOT */}
            <section>
              <Eyebrow label="Monthly Reporting" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-6">
                What Your Monthly MIS Looks Like
              </h2>
              <p className="text-muted text-sm mb-8 leading-relaxed">
                Every MIS report is customised to your business. Here is what a typical Monthly MIS from Company Avenue covers.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative rounded-3xl overflow-hidden aspect-video shadow-[0_8px_32px_rgba(15,45,82,0.08)]">
                  <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=85"
                    alt="Monthly MIS reporting and financial dashboard"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                <div className="space-y-3">
                  {[
                    { icon: BarChart2,  title: "P&L Statement",           desc: "Revenue, costs, EBITDA, PAT — with department-wise drill-down and YoY comparison." },
                    { icon: PieChart,   title: "Balance Sheet Summary",    desc: "Assets, liabilities, net worth snapshot — highlighting key movements from prior month." },
                    { icon: TrendingUp, title: "Cash Flow Statement",      desc: "Operating, investing, financing cash flows — with 13-week forward forecast." },
                    { icon: Target,     title: "Budget vs Actuals",         desc: "Variance analysis against approved budget with management commentary on key variances." },
                    { icon: Zap,        title: "KPI Dashboard",            desc: "Revenue metrics, margins, burn rate, runway, working capital, and business-specific KPIs." },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex gap-3 bg-white border border-slate-100 rounded-xl p-4 hover:shadow-card transition-all group">
                        <div className="w-8 h-8 rounded-lg bg-primary/8 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-300">
                          <Icon size={14} className="text-primary group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <p className="font-heading font-bold text-dark text-xs mb-0.5">{item.title}</p>
                          <p className="text-muted text-[11px] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* WHY COMPANY AVENUE */}
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Eyebrow label="Why Us" />
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">
                    Why Choose Company Avenue as Your Virtual CFO?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {whyUs.map((pt) => {
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
                    { v: "500+",  l: "Companies Served",  c: "bg-primary text-white" },
                    { v: "₹50Cr+",l: "Funds Raised",      c: "bg-accent text-dark" },
                    { v: "15+",   l: "Years Experience",  c: "bg-slate-800 text-white" },
                    { v: "24h",   l: "Critical Response", c: "bg-green-600 text-white" },
                  ].map((s) => (
                    <motion.div
                      key={s.l} whileHover={{ y: -4 }}
                      className={`${s.c} rounded-2xl p-6 text-center shadow-card`}
                    >
                      <p className="font-heading font-bold text-3xl leading-none mb-1">{s.v}</p>
                      <p className="text-xs opacity-80 leading-snug">{s.l}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* TESTIMONIAL / SOCIAL PROOF */}
            <section>
              <Eyebrow label="Client Outcomes" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">
                What Our Virtual CFO Clients Experience
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    outcome: "Series A in 6 Months",
                    detail: "A SaaS startup used our Virtual CFO service to build a fundraising model, clean up their books, and close a ₹12 Cr Series A round within 6 months of engagement.",
                    tag: "SaaS Startup",
                    icon: TrendingUp,
                    color: "bg-blue-50 border-blue-100",
                    iconColor: "bg-blue-100 text-blue-600",
                  },
                  {
                    outcome: "40% Cost Reduction",
                    detail: "A manufacturing SME identified ₹18L in annual cost savings within 3 months through our Virtual CFO cost analysis and procurement benchmarking.",
                    tag: "Manufacturing SME",
                    icon: DollarSign,
                    color: "bg-green-50 border-green-100",
                    iconColor: "bg-green-100 text-green-600",
                  },
                  {
                    outcome: "Board-Ready in 60 Days",
                    detail: "A family business professionalising operations went from no MIS to full board-grade reporting within 60 days of Virtual CFO onboarding.",
                    tag: "Family Business",
                    icon: Award,
                    color: "bg-amber-50 border-amber-100",
                    iconColor: "bg-amber-100 text-amber-600",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.outcome}
                      whileHover={{ y: -4 }}
                      className={`border rounded-2xl p-6 ${item.color} transition-all`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${item.iconColor}`}>
                        <Icon size={18} />
                      </div>
                      <p className="font-heading font-bold text-dark text-base mb-2">{item.outcome}</p>
                      <p className="text-muted text-xs leading-relaxed mb-3">{item.detail}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-heading font-bold px-2.5 py-1 bg-white/60 border border-white/80 rounded-full text-slate-600">
                        {item.tag}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* ACCOUNTING SOFTWARE */}
            <section>
              <Eyebrow label="Software We Support" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-6">
                Accounting Platforms We Work With
              </h2>
              <p className="text-muted text-sm mb-8">
                We are software-agnostic. Our Virtual CFO team works with your existing accounting platform — no migration required.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {["Tally ERP 9", "Tally Prime", "Zoho Books", "QuickBooks", "FreshBooks", "Busy Accounting"].map((sw) => (
                  <div
                    key={sw}
                    className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:border-primary/20 hover:shadow-card transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-2">
                      <Monitor size={18} className="text-primary" />
                    </div>
                    <p className="font-heading font-semibold text-dark text-xs leading-snug">{sw}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section itemScope itemType="https://schema.org/FAQPage">
              <div className="text-center mb-10">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl text-dark">
                  Frequently Asked Questions — Virtual CFO
                </h2>
              </div>
              <div className="space-y-2">
                {faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </section>

          </div>
          <div className="hidden xl:block sticky top-24 self-start">
            <StickySidebar />
          </div>
        </div>
      </div>

      {/* ── RELATED SERVICES ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <h2 className="font-heading font-bold text-2xl text-dark mb-8 text-center">Related Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedServices.map((s, i) => (
              <motion.div
                key={s.id} custom={i} variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true }}
              >
                <Link
                  href={`/services/${s.id}`}
                  className="group block bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all duration-300 h-full"
                >
                  <p className="font-heading font-bold text-dark text-sm mb-1 group-hover:text-primary transition-colors">
                    {s.title}
                  </p>
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

      {/* ── CONTACT STRIP ── */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center">
                <Phone size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-heading font-bold text-dark text-sm">Call Us</p>
                <a href="tel:+919953719111" data-track="call" className="text-primary text-xs font-heading font-semibold hover:underline">
                  +91 99537 19111
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                <MessageCircle size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-heading font-bold text-dark text-sm">WhatsApp</p>
                <a href="https://wa.me/919953719111" data-track="whatsapp" target="_blank" rel="noopener noreferrer" className="text-green-600 text-xs font-heading font-semibold hover:underline">
                  Chat Now
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center">
                <Mail size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-heading font-bold text-dark text-sm">Email Us</p>
                <Link href="/contact" className="text-primary text-xs font-heading font-semibold hover:underline">
                  Send a Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-vcfo" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-vcfo)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Get Started Today" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Stop Managing Finance Alone.<br />
              <span className="text-accent">Hire Your Virtual CFO.</span>
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Join 500+ startups and SMEs that trust Company Avenue Advisory for CFO-level financial leadership. Monthly MIS, fundraising support, board reporting, and proactive tax planning — all for less than ₹10,000 a month.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors"
              >
                Start Your Free Onboarding Call <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+919953719111" data-track="call"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Talk to a Senior CA
              </a>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              {["No long-term lock-in", "30-day notice period", "MIS live in 30 days", "Senior CA assigned day 1"].map((pt) => (
                <div key={pt} className="flex items-center gap-2">
                  <CheckCircle size={13} className="text-accent" />
                  <span className="text-white/70 text-xs">{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
