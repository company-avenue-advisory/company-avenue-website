"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Landmark, FileText, BadgeCheck, Repeat2, CheckCircle,
  ArrowRight, Phone, IndianRupee, BarChart3, LineChart, FileSpreadsheet,
  Building2, TrendingUp, Briefcase, ShieldCheck, Award, DollarSign,
  UserCheck, LifeBuoy,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] } }),
};

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left group">
        <span className="font-heading font-semibold text-dark text-sm pr-4 group-hover:text-primary transition-colors">{q}</span>
        <span className="shrink-0 w-6 h-6 rounded-full bg-primary/8 flex items-center justify-center text-primary text-lg font-light">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <p className="text-muted text-sm leading-relaxed pb-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const quickFacts = [
  { icon: Clock, label: "Preparation Time", value: "7–14 Working Days" },
  { icon: Landmark, label: "Mandatory Under", value: "Companies Act 2013, Sec 129" },
  { icon: FileText, label: "ROC Filing", value: "AOC-4 (Annual)" },
  { icon: IndianRupee, label: "Starting From", value: "₹4,999/year" },
  { icon: BadgeCheck, label: "Standard", value: "Schedule III / Ind AS" },
  { icon: Repeat2, label: "Deadline", value: "30 Sept (6 months from FY end)" },
];

const components = [
  { icon: BarChart3, title: "Balance Sheet", desc: "Statement of financial position showing assets, liabilities, and equity as at March 31. Schedule III format as per Companies Act 2013." },
  { icon: LineChart, title: "Profit & Loss Account", desc: "Statement of income and expenditure for the financial year. Shows revenue, costs, EBITDA, depreciation, and net profit/loss." },
  { icon: FileSpreadsheet, title: "Cash Flow Statement", desc: "Shows inflow and outflow of cash from operating, investing, and financing activities during the year." },
  { icon: FileText, title: "Notes to Accounts", desc: "Detailed disclosures and explanations for each line item in the balance sheet and P&L — the most detailed part of financial statements." },
  { icon: Briefcase, title: "Director's Report", desc: "Annual report from the Board of Directors covering business performance, outlook, CSR, risk management, and statutory disclosures." },
  { icon: Award, title: "Auditor's Report", desc: "Independent opinion by the statutory auditor on whether financial statements present a true and fair view of the company's financials." },
];

const whoNeeds = [
  { icon: Building2, title: "Private Limited Companies", desc: "Mandatory annual statutory requirement — AOC-4 and MGT-7 filing with ROC." },
  { icon: TrendingUp, title: "LLPs & Partnerships", desc: "Annual Statement of Accounts for LLPs and partnership firms for tax and compliance purposes." },
  { icon: DollarSign, title: "Startups Fundraising", desc: "Investors, VCs, and banks demand audited financials for due diligence." },
  { icon: Briefcase, title: "Loan Applicants", desc: "Banks require audited financial statements for working capital loans, term loans, and CCs." },
  { icon: ShieldCheck, title: "Government Contractors", desc: "Tenders often require last 3 years of audited financials as eligibility criteria." },
  { icon: Award, title: "Companies Filing GST Audit", desc: "GSTR-9C reconciliation requires certified financial statements from a CA." },
  { icon: LineChart, title: "Tax Filing (ITR-6)", desc: "Companies filing ITR-6 need financial statements as the basis for tax computation." },
  { icon: FileSpreadsheet, title: "Transfer Pricing Cases", desc: "Form 3CEB and transfer pricing documentation rely on audited consolidated financials." },
];

const steps = [
  { n: "01", title: "Books Handover", desc: "Provide tally data, bank statements, invoices, payroll registers, and supporting documents for the financial year." },
  { n: "02", title: "Trial Balance Preparation", desc: "Compile all ledger balances into a Trial Balance reconciled with bank statements and GST returns." },
  { n: "03", title: "Adjusting Entries", desc: "Pass year-end adjustments — depreciation, prepaid expenses, accrued income, provisions for taxes." },
  { n: "04", title: "P&L Preparation", desc: "Prepare Statement of Profit & Loss with revenue, cost of goods, operating expenses, and net profit." },
  { n: "05", title: "Balance Sheet", desc: "Prepare Balance Sheet in Schedule III format with proper classification of assets and liabilities." },
  { n: "06", title: "Notes to Accounts", desc: "Draft detailed notes — accounting policies, related party transactions, contingent liabilities, segment info." },
  { n: "07", title: "Director's Report & Board Approval", desc: "Draft Director's Report, get board approval for financial statements, and pass resolution." },
  { n: "08", title: "Statutory Audit", desc: "Statutory auditor audits the financial statements and issues Auditor's Report. Financial statements finalised." },
];

const faqs = [
  { q: "Are financial statements mandatory for all companies?", a: "Yes. Under Section 129 of the Companies Act 2013, every company must prepare and present financial statements at every Annual General Meeting (AGM). These must comply with Schedule III format (Division I for AS companies, Division II for Ind AS companies)." },
  { q: "What is the difference between AS and Ind AS?", a: "Accounting Standards (AS) are issued by ICAI and apply to most Indian companies. Indian Accounting Standards (Ind AS) are India's converged IFRS standards and apply mandatorily to: (1) listed companies, (2) companies with net worth ≥₹250 crore, and (3) holding/subsidiary/JV/associate of such companies." },
  { q: "What is the penalty for not filing AOC-4?", a: "Under Section 137, failure to file AOC-4 within 30 days of AGM (or 60 days for OPCs) attracts: ₹100 per day of default. Additionally, directors can be prosecuted, and repeated non-filing can lead to striking off the company." },
  { q: "What if the company had no business activity during the year?", a: "Even a dormant or inactive company must prepare a 'Nil' financial statement and file AOC-4 with MCA. The Balance Sheet will show only the share capital contributed and the profit & loss account will be nil. Failure to file is still a default." },
  { q: "Is a Chartered Accountant required for preparing financial statements?", a: "Preparation can technically be done by management, but statutory audit by a Chartered Accountant is mandatory for all companies under Section 139 of the Companies Act 2013. The auditor's report is an integral part of the financial statements filed with MCA." },
  { q: "What documents do I need to provide for financial statement preparation?", a: "You need: bank statements for all accounts, Tally/accounting software data export, purchase and sales invoices, expense vouchers and receipts, payroll records, loan agreements and repayment schedules, fixed asset register, TDS certificates (Form 16A/26AS), and GST returns (GSTR-1, GSTR-3B)." },
];

export function FinancialStatementsPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-primary-700 pt-36 pb-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container-custom relative max-w-3xl">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0} className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-4 block">Accounting & Finance • Company Avenue Advisory</motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-heading font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-6">Financial Statements<br />Preparation & Filing</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/60 text-lg mb-8">Mandatory annual financial statements — Balance Sheet, P&L, Cash Flow, and Notes to Accounts — prepared in Schedule III format under the Companies Act 2013. Audit-ready, investor-ready. Starting ₹4,999/year.</motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-500 transition-colors shadow-lg">Get Started <ArrowRight size={15} /></Link>
            <a href="tel:+919876543210" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-heading font-medium text-sm rounded-xl hover:bg-white/20 transition-colors border border-white/20"><Phone size={14} /> Call Expert</a>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickFacts.map((f, i) => (
              <motion.div key={f.label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="text-center p-4 rounded-2xl bg-primary/4 border border-primary/8">
                <f.icon size={20} className="text-primary mx-auto mb-2" />
                <p className="text-[11px] text-muted font-heading font-medium mb-0.5">{f.label}</p>
                <p className="text-xs font-heading font-bold text-dark">{f.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Components</span><h2 className="font-heading font-bold text-3xl text-dark">What's Included in Financial Statements?</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {components.map((c, i) => (
              <motion.div key={c.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4"><c.icon size={18} className="text-primary" /></div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{c.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Who Needs It</span><h2 className="font-heading font-bold text-3xl text-dark">Who Needs Financial Statements?</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whoNeeds.map((w, i) => (
              <motion.div key={w.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4"><w.icon size={18} className="text-primary" /></div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{w.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Process</span><h2 className="font-heading font-bold text-3xl text-dark">How We Prepare Your Financials</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="bg-white p-6 rounded-2xl border border-slate-100">
                <span className="font-heading font-black text-3xl text-primary/10 mb-3 block">{s.n}</span>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{s.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">FAQs</span><h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions</h2></div>
          <div className="bg-slate-50 rounded-2xl p-6">{faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-dark to-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Get Audit-Ready Financials on Time</h2>
          <p className="text-white/60 text-lg mb-8">Statutory-compliant Balance Sheet, P&L, and Notes to Accounts — prepared by expert CAs and filed before the deadline.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold rounded-xl hover:bg-amber-500 transition-colors">Prepare My Financials <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
