"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FileText, CalendarCheck, AlertTriangle, TrendingUp, ShieldCheck,
  BookOpen, CheckCircle, Plus, Minus, ArrowRight, Phone,
  Clock, Award, UserCheck, Headphones, LifeBuoy, Monitor,
  DollarSign, Receipt, BarChart3, RefreshCcw, CreditCard,
  Briefcase, Users, Building2, Globe, Hash, PenLine,
  BadgeCheck, Bell, Activity, ChevronRight, Zap,
  Calculator, Banknote, Scale, Landmark, LineChart,
  PiggyBank, Wallet, ReceiptText, FileClock, FileCheck,
  FileSearch, FileBarChart, IndianRupee, Percent, Target,
} from "lucide-react";
import { faqs } from "@/lib/faqs/AdvanceTaxPage";

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
  { icon: Scale,         label: "IT Sections",      value: "207 – 209" },
  { icon: CalendarCheck, label: "Instalments",       value: "4 per year" },
  { icon: IndianRupee,   label: "Threshold",         value: "Tax > ₹10,000" },
  { icon: Percent,       label: "Interest Rate",     value: "Sec 234B + 234C" },
  { icon: AlertTriangle, label: "Penalty",           value: "1% per month" },
  { icon: ShieldCheck,   label: "Exemption",         value: "Senior citizens (no biz income)" },
];

const whoNeeds = [
  { icon: Briefcase,   title: "Freelancers & Consultants",         desc: "Income from professional services—design, IT, writing, coaching—with no TDS deduction by clients triggers advance tax." },
  { icon: TrendingUp,  title: "Salaried with Capital Gains",       desc: "Employees who sell shares, mutual funds, or property mid-year face additional tax not covered by employer TDS." },
  { icon: Building2,   title: "Business Owners & Proprietors",     desc: "Traders, manufacturers, and retailers with annual income exceeding basic exemption limits are required to pay in advance." },
  { icon: Users,       title: "Company Directors & Partners",       desc: "Directors of private limited companies and LLP partners who receive dividends or profit distributions beyond salary." },
  { icon: LineChart,   title: "Stock & Derivatives Traders",       desc: "F&O traders and intraday equity traders with significant profits from the securities market must pay advance tax quarterly." },
  { icon: Landmark,    title: "Rental Income Earners",             desc: "Individuals and HUFs deriving rental income from residential or commercial property in excess of deductions." },
  { icon: Globe,       title: "NRIs with Indian Income",           desc: "Non-resident Indians earning Indian-sourced income—rent, capital gains, interest—on which TDS is not fully deducted." },
  { icon: UserCheck,   title: "Professionals (CA / Doctor / Lawyer)", desc: "High-earning professionals in practice whose gross receipts cross threshold limits and whose self-assessment tax would exceed ₹10,000." },
];

const benefits = [
  { icon: Percent,       title: "Avoid 1% Monthly Interest (234B & 234C)", desc: "Non-payment or under-payment of advance tax attracts simple interest at 1% per month under Sec 234B (default) and 234C (deferment). Our timely computation and payment ensures zero interest outgo." },
  { icon: PiggyBank,     title: "Smooth Cash-Flow Planning",               desc: "Spreading tax liability across four instalments prevents a lump-sum year-end outflow and helps you plan working capital and investments more efficiently." },
  { icon: Bell,          title: "No Surprise Tax Demand",                  desc: "Accurate advance tax payment means your ITR self-assessment tax demand is minimal or nil, avoiding last-minute cash crunches in March-April." },
  { icon: BadgeCheck,    title: "Better Audit Standing",                   desc: "Regular advance tax payments demonstrate financial discipline and reduce the likelihood of income tax scrutiny or audit selection." },
  { icon: ShieldCheck,   title: "Corporate Governance Compliance",         desc: "For companies and LLPs, proper advance tax compliance is a key metric for statutory auditors and ROC-level governance reviews." },
  { icon: Award,         title: "Avoid Prosecution Risk",                  desc: "Wilful non-payment of advance tax can attract proceedings under Section 276C of the Income Tax Act in addition to interest and penalty." },
  { icon: Calculator,    title: "Professional Financial Planning",         desc: "Our computation covers all income heads—salary, business, capital gains, rental, other sources—to give you a precise tax estimate mid-year." },
  { icon: CheckCircle,   title: "Peace of Mind",                           desc: "Outsource the entire advance tax calendar—estimation, challan generation, payment, and 26AS verification—to our experts." },
];

const processSteps = [
  { n: "01", title: "Income Estimation",              desc: "We project total income for the financial year across all heads—salary, business profit, capital gains, rent, and other sources—based on current-year data provided by you." },
  { n: "02", title: "Tax Calculation (Old / New Regime)", desc: "Apply applicable slab rates under both regimes, factoring in eligible deductions (80C, 80D, HRA, etc.) to determine which regime is more beneficial and compute gross tax liability." },
  { n: "03", title: "TDS Credit Adjustment",          desc: "Offset TDS already deducted by employers (Form 16), clients (26AS), banks (on interest), and other deductors to arrive at net advance tax payable." },
  { n: "04", title: "Net Advance Tax Determination",  desc: "Calculate the exact amount due per instalment—15% by 15 Jun, 45% by 15 Sep, 75% by 15 Dec, 100% by 15 Mar—ensuring compliance with Sec 208 thresholds." },
  { n: "05", title: "Challan 280 Generation",         desc: "Prepare Challan ITNS 280 online via the IT portal or NSDL with accurate assessment year, PAN, payment type (Advance Tax = Code 100), and amount." },
  { n: "06", title: "Payment Before Due Date",        desc: "Make payment through net banking, debit card, or over-the-counter at authorised banks. Provide you with BSR code and challan serial number for records." },
  { n: "07", title: "26AS Verification",              desc: "Confirm that the advance tax payment is correctly reflected in Form 26AS under Part C within 3-5 banking days of payment." },
  { n: "08", title: "Year-end Reconciliation",        desc: "Prepare a final reconciliation of total advance tax paid versus actual tax liability computed while filing ITR to minimise self-assessment tax or claim refund." },
];

const documents = [
  { icon: FileText,       label: "Estimated Income Statement (current year projections)" },
  { icon: BookOpen,       label: "Previous Year ITR (Form 16 / ITR-V)" },
  { icon: FileSearch,     label: "Current Year TDS Certificates (Form 26AS)" },
  { icon: BarChart3,      label: "Profit & Loss Account (for business income)" },
  { icon: TrendingUp,     label: "Capital Gains Statement (broker statement / sell deed)" },
  { icon: Landmark,       label: "Rental Income Details (rent receipts / agreements)" },
  { icon: CreditCard,     label: "Bank Statements (for interest income)" },
  { icon: Globe,          label: "Foreign Income / DTAA documents (for NRIs)" },
];

const timeline = [
  { stage: "01", label: "Income Estimation",     period: "April – May",    desc: "Project annual income from all sources and estimate total tax liability for the year." },
  { stage: "02", label: "1st Instalment",        period: "By 15 June",     desc: "Pay at least 15% of annual advance tax. Shortfall attracts Sec 234C interest of 1%/month for 3 months." },
  { stage: "03", label: "2nd Instalment",        period: "By 15 September", desc: "Cumulative payment must reach 45% of total advance tax. Revise estimate if income has changed." },
  { stage: "04", label: "3rd Instalment",        period: "By 15 December",  desc: "Cumulative 75% payment due. Update P&L and capital gains data for Q3 revised estimation." },
  { stage: "05", label: "4th Instalment",        period: "By 15 March",     desc: "Full 100% advance tax must be paid. Missing this triggers Sec 234B interest from 1 April onwards." },
  { stage: "06", label: "Year-end Reconciliation", period: "April (ITR Filing)", desc: "Match total advance tax paid with ITR computation. Claim refund or pay minimal self-assessment tax." },
];

const deliverables = [
  { icon: FileBarChart,  label: "Advance Tax Calculation Sheet (all 4 instalments)" },
  { icon: ReceiptText,   label: "Challan 280 Receipt for each instalment (4 copies)" },
  { icon: FileCheck,     label: "26AS Update Confirmation after each payment" },
  { icon: FileClock,     label: "Year-end Reconciliation Report for ITR filing" },
];

const whyUs = [
  "Expert CA team with 15+ years in direct tax compliance across all income categories",
  "Personalised advance tax calendar with reminder alerts for all 4 due dates",
  "Computation covers all income heads—salary, business, capital gains, rent, foreign income",
  "Old regime vs new regime comparison to maximise tax savings before each instalment",
  "Challan 280 generation, online payment assistance, and BSR code verification",
  "26AS cross-check after every payment to ensure correct credit in tax records",
  "Mid-year revision service if income changes significantly (job switch, asset sale, bonus)",
  "Seamless handoff to ITR filing with pre-reconciled advance tax data",
];


const relatedServices = [
  { id: "tds-return",              title: "TDS Return Filing",       desc: "Quarterly TDS returns on time." },
  { id: "income-tax-return",       title: "Income Tax Return",       desc: "Expert ITR filing for all categories." },
  { id: "tax-audit",               title: "Tax Audit (Sec 44AB)",    desc: "Statutory audit under the IT Act." },
  { id: "accounting-bookkeeping",  title: "Accounting & Bookkeeping", desc: "Accurate books, MIS & statements." },
  { id: "gst-filing",              title: "GST Return Filing",       desc: "Monthly, quarterly & annual returns." },
  { id: "payroll-management",      title: "Payroll Management",      desc: "Salaries & statutory compliance." },
];

/* ══════════════════════════════════════════════════════════
   FAQ ITEM
══════════════════════════════════════════════════════════ */
function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp} custom={i}
      className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-full bg-primary/8 flex items-center justify-center text-primary">
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 pt-1 bg-white text-muted text-sm leading-relaxed border-t border-slate-100">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export function AdvanceTaxPage() {
  return (
    <main className="overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-[#081726] pt-24 pb-20 relative overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] rounded-full bg-primary/30 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            variants={fadeUp} initial="hidden" animate="show"
            className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-heading"
          >
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-accent">Advance Tax</span>
          </motion.nav>

          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
              <Eyebrow label="Direct Tax Compliance" />
            </motion.div>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-4xl md:text-5xl lg:text-[54px] font-heading font-extrabold text-white leading-tight mb-5"
            >
              Advance Tax Calculation &{" "}
              <span className="text-accent">Payment Services</span>
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl"
            >
              Expert computation of quarterly advance tax instalments under Sec 207–209,
              Challan 280 filing, 26AS verification, and year-end reconciliation — so you
              never pay 1% monthly interest under Sec 234B or 234C.
            </motion.p>
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={4}
              className="flex flex-wrap gap-3"
            >
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-[#081726] font-heading font-bold px-7 py-3.5 rounded-xl hover:bg-amber-400 transition-colors text-sm"
              >
                Get Started — ₹1,999 <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111" data-track="call"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-heading font-semibold px-7 py-3.5 rounded-xl hover:border-accent hover:text-accent transition-colors text-sm"
              >
                <Phone size={14} /> Call an Expert
              </a>
            </motion.div>
          </div>

          {/* Quick Fact Cards */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={5}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-14"
          >
            {quickFacts.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label} variants={fadeUp} custom={6 + i}
                initial="hidden" animate="show"
                className="bg-white/6 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm"
              >
                <Icon size={22} className="text-accent mx-auto mb-2" />
                <p className="text-white font-heading font-bold text-sm leading-tight">{value}</p>
                <p className="text-slate-400 text-[10px] mt-1 font-heading">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS ADVANCE TAX ─────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Understanding the Obligation" />
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-5 leading-tight">
                What Is Advance Tax?
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                <strong className="text-dark">Advance Tax</strong>, commonly called &ldquo;pay-as-you-earn&rdquo; tax, is
                the income tax payable in the same financial year in which you earn the income — rather
                than as a lump sum at the end of the year while filing your ITR. Governed by{" "}
                <strong className="text-dark">Sections 207 to 219</strong> of the Income Tax Act, 1961,
                it requires taxpayers to estimate their annual income and pay tax in{" "}
                <strong className="text-dark">four quarterly instalments</strong>.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                If your estimated tax liability after TDS exceeds{" "}
                <strong className="text-dark">₹10,000 in a financial year</strong>, you are legally
                obligated to pay advance tax by the prescribed dates — 15 June, 15 September,
                15 December, and 15 March. Failure to pay or underpayment triggers{" "}
                <strong className="text-dark">interest under Sections 234B and 234C</strong> at 1%
                per month on the shortfall, which can significantly inflate your total tax outgo.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                Company Avenue Advisory handles the complete advance tax cycle — from mid-year
                income estimation, regime selection, and TDS offset, to Challan 280 generation,
                payment, and year-end reconciliation with your ITR data.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white font-heading font-semibold px-6 py-3 rounded-xl hover:bg-[#0a2444] transition-colors text-sm"
                >
                  Calculate My Advance Tax <ArrowRight size={14} />
                </Link>
                <a href="tel:+919953719111" data-track="call"
                  className="inline-flex items-center gap-2 border border-slate-200 text-dark font-heading font-semibold px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-colors text-sm"
                >
                  <Phone size={14} /> Speak to an Expert
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" custom={2} viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden h-[440px] shadow-card"
            >
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=85"
                alt="Advance tax calculation on laptop"
                fill sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081726]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <p className="text-white font-heading font-bold text-sm">Instalments at a Glance</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {[
                    { due: "15 Jun", pct: "15%" },
                    { due: "15 Sep", pct: "45%" },
                    { due: "15 Dec", pct: "75%" },
                    { due: "15 Mar", pct: "100%" },
                  ].map(({ due, pct }) => (
                    <div key={due} className="bg-white/15 rounded-xl px-3 py-2 flex justify-between items-center">
                      <span className="text-slate-200 text-xs font-heading">{due}</span>
                      <span className="text-accent font-heading font-bold text-sm">{pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHO NEEDS THIS ───────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Who It Applies To" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              Who Needs to Pay Advance Tax?
            </h2>
            <p className="text-muted leading-relaxed">
              Any individual, HUF, firm, LLP, or company with estimated tax liability
              above ₹10,000 (after TDS) must pay advance tax. Here are the most common categories.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoNeeds.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 hover:border-primary/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{title}</h3>
                <p className="text-muted text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY BENEFITS ─────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Why It Matters" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              Key Benefits of Timely Advance Tax Payment
            </h2>
            <p className="text-muted leading-relaxed">
              Beyond legal compliance, proactive advance tax management delivers real financial
              advantages for individuals and businesses.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-card transition-shadow group"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{title}</h3>
                <p className="text-muted text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ────────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Our Process" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              How We Handle Your Advance Tax
            </h2>
            <p className="text-muted leading-relaxed">
              An 8-step end-to-end process from income estimation to year-end ITR reconciliation.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map(({ n, title, desc }, i) => (
              <motion.div
                key={n} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 relative"
              >
                <span className="font-heading font-extrabold text-3xl text-primary/10 mb-3 block leading-none">{n}</span>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{title}</h3>
                <p className="text-muted text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS REQUIRED ───────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Documents Checklist" />
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-5 leading-tight">
                Documents Required for Advance Tax Computation
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Gather these documents to enable accurate estimation of your advance tax
                liability. We provide a detailed checklist on engagement.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {documents.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                    <Icon size={16} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs font-heading font-medium leading-snug">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" custom={2} viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden h-[400px] shadow-card"
            >
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85"
                alt="Tax documents and spreadsheets"
                fill sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-8">
                  <p className="text-white font-heading font-extrabold text-4xl mb-2">4</p>
                  <p className="text-slate-200 font-heading font-semibold text-sm">Quarterly Instalments</p>
                  <p className="text-slate-300 text-xs mt-1">Fully managed by our team</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Annual Calendar" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              Advance Tax Payment Timeline
            </h2>
            <p className="text-muted leading-relaxed">
              A clear view of the advance tax calendar from income estimation to year-end ITR reconciliation.
            </p>
          </motion.div>
          <div className="relative">
            {/* connecting line */}
            <div className="hidden lg:block absolute top-8 left-[8.33%] right-[8.33%] h-0.5 bg-slate-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              {timeline.map(({ stage, label, period, desc }, i) => (
                <motion.div
                  key={stage} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-heading font-extrabold text-lg shadow-lg mb-4 z-10 relative">
                    {stage}
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-1">{label}</h3>
                  <span className="text-accent font-heading font-semibold text-xs mb-2">{period}</span>
                  <p className="text-muted text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU RECEIVE ─────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" custom={1} viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden h-[380px] shadow-card"
            >
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85"
                alt="CA professional reviewing tax documents"
                fill sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081726]/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                  <p className="text-accent font-heading font-bold text-xs uppercase tracking-wider mb-1">Starting at</p>
                  <p className="text-white font-heading font-extrabold text-3xl">₹1,999</p>
                  <p className="text-slate-300 text-xs mt-1">All 4 instalments covered</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Deliverables" />
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-5 leading-tight">
                What You Receive
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Every engagement includes four documented deliverables covering the full advance
                tax cycle, from computation to year-end reconciliation.
              </p>
              <div className="space-y-4">
                {deliverables.map(({ icon: Icon, label }, i) => (
                  <motion.div
                    key={label} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl px-5 py-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <span className="font-heading font-semibold text-dark text-sm">{label}</span>
                    <CheckCircle size={16} className="text-green-500 ml-auto shrink-0" />
                  </motion.div>
                ))}
              </div>
              <Link href="/contact"
                className="mt-8 inline-flex items-center gap-2 bg-primary text-white font-heading font-semibold px-7 py-3.5 rounded-xl hover:bg-[#0a2444] transition-colors text-sm"
              >
                Get Started Today <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY COMPANY AVENUE ───────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Why Choose Us" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              Why Company Avenue Advisory?
            </h2>
            <p className="text-muted leading-relaxed">
              Trusted by thousands of taxpayers across India for accurate, timely advance tax
              computation and filing.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whyUs.map((point, i) => (
              <motion.div
                key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm"
              >
                <CheckCircle size={16} className="text-accent shrink-0 mt-0.5" />
                <span className="text-dark text-sm leading-relaxed font-heading">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Common Questions" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              Advance Tax — Frequently Asked Questions
            </h2>
            <p className="text-muted leading-relaxed">
              Everything you need to know about advance tax calculation, payment, and compliance.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-3"
          >
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} i={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Explore More" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              Related Services
            </h2>
            <p className="text-muted leading-relaxed">
              Round out your direct tax compliance with these complementary services.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map(({ id, title, desc }, i) => (
              <motion.div
                key={id} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
              >
                <Link
                  href={`/services/${id}`}
                  className="group block bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-card hover:border-primary/20 transition-all"
                >
                  <h3 className="font-heading font-bold text-dark text-sm mb-2 group-hover:text-primary transition-colors">{title}</h3>
                  <p className="text-muted text-xs mb-4">{desc}</p>
                  <span className="inline-flex items-center gap-1 text-primary font-heading font-semibold text-xs group-hover:gap-2 transition-all">
                    Learn More <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK CTA ─────────────────────────────────────────── */}
      <section className="bg-[#0F2D52] py-20">
        <div className="container-custom text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Eyebrow label="Get Started" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-5 leading-tight">
              Stop Paying 1% Monthly Interest.<br />
              <span className="text-accent">Pay Advance Tax On Time — Every Time.</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Our experts estimate your income, compute instalments across all income heads,
              generate Challan 280, and reconcile with your ITR — all for a flat fee of ₹1,999.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-[#081726] font-heading font-bold px-8 py-4 rounded-xl hover:bg-amber-400 transition-colors text-base"
              >
                Get Started — ₹1,999 <ArrowRight size={16} />
              </Link>
              <a href="tel:+919953719111" data-track="call"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-heading font-semibold px-8 py-4 rounded-xl hover:border-accent hover:text-accent transition-colors text-base"
              >
                <Phone size={16} /> Call +91 99537 19111
              </a>
            </div>
            <p className="text-slate-400 text-xs mt-6 font-heading">
              <Clock size={11} className="inline mr-1" /> Response within 2 business hours &nbsp;|&nbsp; PAN India service
            </p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
