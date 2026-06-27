"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, MessageCircle,
  Users, ShieldCheck, TrendingUp, Award, Zap, Clock, FileText,
  Building2, Globe, UserCheck, BadgeCheck, Download, Star,
  RefreshCcw, PiggyBank, Layers, Monitor, Factory, ShoppingBag,
  Briefcase, Lock, ChevronRight, Calculator, Wallet, AlertCircle,
  ClipboardList, AlertTriangle, BarChart3, Receipt, Calendar,
  Bell, DollarSign, HeartPulse, Hash, BookOpen, UserPlus, UserMinus,
  Package, Settings, BarChart2, TrendingDown,
} from "lucide-react";

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

/* ══════════════════════════════════════ DATA ══════════════════════════════════════ */

const payslipRows = [
  { label: "Basic Salary", type: "earning", value: "₹35,000" },
  { label: "HRA", type: "earning", value: "₹14,000" },
  { label: "Special Allowance", type: "earning", value: "₹8,500" },
  { label: "Conveyance", type: "earning", value: "₹1,600" },
  { label: "Provident Fund (12%)", type: "deduction", value: "−₹4,200" },
  { label: "ESIC (0.75%)", type: "deduction", value: "−₹439" },
  { label: "Professional Tax", type: "deduction", value: "−₹200" },
  { label: "TDS on Salary", type: "deduction", value: "−₹2,100" },
];

const workflowSteps = [
  { n: "01", icon: UserPlus, title: "Employee Onboarding", desc: "Collect joining documents, bank details, PAN, Aadhaar, and previous employment data for accurate payroll setup." },
  { n: "02", icon: ClipboardList, title: "Attendance & Leave Input", desc: "Integrate attendance data, leave records, LOP calculations, and overtime hours for the pay period." },
  { n: "03", icon: Calculator, title: "Salary & Statutory Computation", desc: "Calculate gross pay, PF, ESIC, Professional Tax, LWF, TDS on salary, reimbursements, and net take-home." },
  { n: "04", icon: FileText, title: "Payslip Generation", desc: "Generate password-protected digital payslips for every employee with a full earnings and deductions breakup." },
  { n: "05", icon: Wallet, title: "Salary Disbursement Support", desc: "Prepare bank transfer files, salary registers, and disbursement reports for your finance team." },
  { n: "06", icon: ShieldCheck, title: "Statutory Filings & Challan", desc: "Deposit PF, ESIC, PT challan and file monthly ECR, ESIC returns before due dates." },
  { n: "07", icon: BarChart3, title: "Monthly Payroll Reports", desc: "Deliver payroll MIS, cost-to-company summary, variance report, and statutory compliance certificate." },
  { n: "08", icon: Hash, title: "Year-End: Form 16 & Audit", desc: "Issue Form 16 Part A & B, file TDS returns (Form 24Q quarterly), and support payroll audit." },
];

const statutoryData = [
  {
    title: "Provident Fund (PF)",
    badge: "EPFO",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-100",
    rows: [
      { label: "Employee Contribution", value: "12% of Basic" },
      { label: "Employer Contribution", value: "12% of Basic (split: EPS + EPF)" },
      { label: "Applicability", value: "Establishments with 20+ employees" },
      { label: "Monthly Challan Deadline", value: "15th of following month" },
      { label: "Annual Return", value: "Form 3A & 6A" },
    ],
  },
  {
    title: "ESIC",
    badge: "ESIC",
    badgeColor: "bg-green-50 text-green-700 border-green-100",
    rows: [
      { label: "Employee Contribution", value: "0.75% of Gross Wages" },
      { label: "Employer Contribution", value: "3.25% of Gross Wages" },
      { label: "Applicability", value: "Employees earning ≤ ₹21,000/month" },
      { label: "Half-Yearly Return Deadline", value: "11th May / 11th Nov" },
      { label: "Benefits", value: "Medical, Maternity, Disability" },
    ],
  },
  {
    title: "Professional Tax",
    badge: "State Tax",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-100",
    rows: [
      { label: "Maximum Amount", value: "₹2,500 per year" },
      { label: "Who Deducts", value: "Employer from employee salary" },
      { label: "Applicability", value: "Applicable in select states" },
      { label: "Filing Frequency", value: "Monthly / Quarterly (state-specific)" },
      { label: "Employer Registration", value: "PT Enrollment Certificate required" },
    ],
  },
  {
    title: "TDS on Salary",
    badge: "Income Tax",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-100",
    rows: [
      { label: "Section", value: "Section 192 of Income Tax Act" },
      { label: "Who Deducts", value: "Employer (as TAN holder)" },
      { label: "Frequency", value: "Monthly deduction" },
      { label: "TDS Return", value: "Form 24Q — Quarterly" },
      { label: "Certificate Issued", value: "Form 16 — Annual" },
    ],
  },
];

const payrollCalendar = [
  { day: "1–5", task: "Collect attendance, leave & LOP data from HR", color: "bg-blue-50 border-blue-100 text-blue-700" },
  { day: "5–7", task: "Process salary computation & review", color: "bg-purple-50 border-purple-100 text-purple-700" },
  { day: "7", task: "Salary disbursement to employees", color: "bg-green-50 border-green-100 text-green-700" },
  { day: "7", task: "Distribute digital payslips", color: "bg-teal-50 border-teal-100 text-teal-700" },
  { day: "15", task: "PF ECR filing & challan payment", color: "bg-primary/5 border-primary/20 text-primary" },
  { day: "15", task: "ESIC challan payment", color: "bg-primary/5 border-primary/20 text-primary" },
  { day: "7 (Qly)", task: "TDS deposit on salary (Section 192)", color: "bg-amber-50 border-amber-100 text-amber-700" },
  { day: "31 (Qly)", task: "File Form 24Q — TDS return", color: "bg-orange-50 border-orange-100 text-orange-700" },
  { day: "31 May", task: "Issue Form 16 to all employees", color: "bg-rose-50 border-rose-100 text-rose-700" },
];

const commonMistakes = [
  { icon: AlertTriangle, title: "Wrong PF Wage Computation", desc: "Including special allowances in PF base that should be excluded — triggers EPFO notices and demands.", color: "text-red-600 bg-red-50" },
  { icon: AlertTriangle, title: "Incorrect TDS Projection", desc: "Failing to update employee's investment declarations mid-year leads to short deduction and interest liability.", color: "text-orange-600 bg-orange-50" },
  { icon: AlertTriangle, title: "ESIC Applicability Errors", desc: "Not enrolling eligible employees or continuing ESIC after salary crosses ₹21,000 — both attract penalties.", color: "text-amber-600 bg-amber-50" },
  { icon: AlertTriangle, title: "Missing Professional Tax", desc: "Not registering in PT-applicable states or filing returns late attracts state-specific penalties.", color: "text-purple-600 bg-purple-50" },
  { icon: AlertTriangle, title: "Late Challan Deposits", desc: "PF and ESIC challans deposited after the 15th attract interest @ 12% p.a. and damages up to 25%.", color: "text-rose-600 bg-rose-50" },
  { icon: AlertTriangle, title: "Incorrect Form 16", desc: "Mismatches between Form 16 and Form 26AS lead to employee income tax notices — employer is liable.", color: "text-blue-600 bg-blue-50" },
];

const penalties = [
  { authority: "EPFO", violation: "Late PF deposit", penalty: "Interest @ 12% p.a. + damages up to 25% of arrears", color: "border-l-blue-500" },
  { authority: "ESIC", violation: "Non-payment / late ESIC", penalty: "Interest @ 12% p.a. + penalty up to ₹5,000 per day", color: "border-l-green-500" },
  { authority: "Income Tax", violation: "Short TDS / non-deduction", penalty: "Interest u/s 201(1A) @ 1.5%/month + penalty equal to tax not deducted", color: "border-l-amber-500" },
  { authority: "Income Tax", violation: "Late Form 24Q filing", penalty: "₹200 per day under Section 234E (capped at TDS amount)", color: "border-l-orange-500" },
  { authority: "Prof. Tax Dept.", violation: "Non-registration / late filing", penalty: "State-specific fines; typically ₹2–5/day per employee", color: "border-l-purple-500" },
  { authority: "Labour Dept.", violation: "LWF non-compliance", penalty: "Fine up to ₹20,000 + possible prosecution under state LWF Act", color: "border-l-rose-500" },
];

const softwareList = [
  { name: "Keka HR", desc: "End-to-end payroll & HRMS", color: "bg-rose-50 border-rose-100", text: "text-rose-700", abbr: "KK" },
  { name: "Zoho Payroll", desc: "Cloud payroll for SMEs", color: "bg-teal-50 border-teal-100", text: "text-teal-700", abbr: "ZP" },
  { name: "GreytHR", desc: "Statutory-first payroll", color: "bg-blue-50 border-blue-100", text: "text-blue-700", abbr: "GH" },
  { name: "RazorpayX Payroll", desc: "Auto-compliance payroll", color: "bg-indigo-50 border-indigo-100", text: "text-indigo-700", abbr: "RP" },
  { name: "TallyPrime", desc: "Payroll in ERP", color: "bg-primary/5 border-primary/20", text: "text-primary", abbr: "TP" },
  { name: "MS Excel", desc: "Custom payroll & MIS", color: "bg-emerald-50 border-emerald-100", text: "text-emerald-700", abbr: "XL" },
];

const services = [
  { icon: Calculator, title: "Salary Computation", desc: "Gross to net salary calculation including all earnings, statutory deductions, LOP, and arrears.", color: "bg-primary/8 text-primary" },
  { icon: FileText, title: "Payslip Generation", desc: "Password-protected digital payslips with full breakup — sent directly to employees.", color: "bg-blue-50 text-blue-600" },
  { icon: ClipboardList, title: "Attendance & Leave Integration", desc: "Process data from biometric / HRMS systems for LOP, overtime, and comp-off calculations.", color: "bg-green-50 text-green-600" },
  { icon: Receipt, title: "Reimbursements & Bonuses", desc: "Handle medical reimbursements, fuel claims, performance bonuses, and ad-hoc payments.", color: "bg-amber-50 text-amber-600" },
  { icon: ShieldCheck, title: "PF, ESIC & PT Filing", desc: "Monthly ECR, ESIC returns, Professional Tax filing, and challan generation on time.", color: "bg-teal-50 text-teal-600" },
  { icon: Hash, title: "TDS on Salary & Form 16", desc: "Monthly TDS computation, Form 24Q quarterly filing, and Form 16 issuance for all employees.", color: "bg-purple-50 text-purple-600" },
  { icon: UserPlus, title: "Employee Onboarding Payroll", desc: "Pro-rated salary for joiners mid-month including arrears and retroactive adjustments.", color: "bg-rose-50 text-rose-600" },
  { icon: UserMinus, title: "Full & Final Settlement", desc: "Exit payroll — gratuity, leave encashment, notice pay, and statutory dues settlement.", color: "bg-orange-50 text-orange-600" },
  { icon: BarChart3, title: "Payroll MIS & Reports", desc: "Monthly cost-to-company report, department-wise payroll summary, and variance analysis.", color: "bg-indigo-50 text-indigo-600" },
];

const benefits = [
  { icon: PiggyBank, title: "60% Cost Reduction", desc: "No payroll staff salary, no software license, no compliance penalties — pure savings." },
  { icon: Award, title: "CA-Supervised Accuracy", desc: "Every payroll run is reviewed by a Chartered Accountant before salaries are processed." },
  { icon: BadgeCheck, title: "Zero Compliance Misses", desc: "PF, ESIC, PT, TDS — all statutory deposits and filings handled before due dates." },
  { icon: Lock, title: "Bank-Grade Data Security", desc: "Encrypted payroll data, signed NDAs, and role-based access — your data never leaves secure systems." },
  { icon: RefreshCcw, title: "Scalable for Any Team Size", desc: "From 5 to 5,000 employees — our process scales without compromising accuracy." },
  { icon: Bell, title: "Proactive Due Date Alerts", desc: "Never miss a challan deadline — you get reminders and confirmations for every filing." },
];

const industries = [
  { icon: Zap, label: "Startups" },
  { icon: Building2, label: "Private Limited Companies" },
  { icon: Users, label: "LLPs & Partnerships" },
  { icon: ShoppingBag, label: "E-commerce & D2C" },
  { icon: Monitor, label: "IT & SaaS Companies" },
  { icon: Factory, label: "Manufacturing Units" },
  { icon: HeartPulse, label: "Healthcare & Clinics" },
  { icon: Briefcase, label: "Professional Firms" },
  { icon: Globe, label: "NGOs & Trusts" },
];

const whyUsPoints = [
  { icon: Award, title: "Experienced CAs on Payroll Team", desc: "Not HR executives — our payroll is run and reviewed by qualified Chartered Accountants with deep statutory knowledge." },
  { icon: UserCheck, title: "Dedicated Payroll Manager", desc: "One named person manages your account. No rotating support agents, no lost context." },
  { icon: Lock, title: "Strict Confidentiality", desc: "NDA-backed engagement. Salary data is never shared externally — stored on encrypted, access-controlled systems." },
  { icon: DollarSign, title: "Transparent Fixed Pricing", desc: "Per-employee monthly pricing with zero hidden fees. Your cost scales only when your team grows." },
  { icon: Clock, title: "Guaranteed Processing Timeline", desc: "Payroll processed by the 5th, payslips out by the 7th, challans deposited by the 15th — every month." },
  { icon: ShieldCheck, title: "End-to-End Statutory Coverage", desc: "PF, ESIC, PT, LWF, TDS, Form 16 — every obligation covered with documentary proof." },
];

const faqs = [
  { q: "What is payroll processing and what does it include?", a: "Payroll processing is the complete cycle of calculating employee compensation — including salary, allowances, statutory deductions (PF, ESIC, PT, TDS), reimbursements, and bonuses — and disbursing net pay. It also includes statutory filings such as PF ECR, ESIC returns, Form 24Q (TDS), and issuance of Form 16." },
  { q: "What statutory deductions are mandatory in Indian payroll?", a: "In India, mandatory payroll deductions include: Provident Fund (12% employee + 12% employer on basic), ESIC (0.75% employee + 3.25% employer for eligible employees), Professional Tax (state-specific, up to ₹2,500/year), TDS on salary under Section 192, and Labour Welfare Fund (state-specific). Each has separate registration, deposit, and filing requirements." },
  { q: "What is the PF ECR and when is it due?", a: "The Electronic Challan cum Return (ECR) is the monthly PF contribution statement filed on the EPFO Unified Portal. It must be filed and the challan paid by the 15th of every month for the previous month. Delay attracts interest @ 12% p.a. and damages ranging from 5% to 25% of arrears." },
  { q: "What is Form 16 and when must it be issued?", a: "Form 16 is the annual TDS certificate issued by an employer to every employee from whose salary TDS has been deducted. Part A (TDS summary from TRACES) and Part B (detailed salary breakup and deductions) must be issued by 31st May for the preceding financial year." },
  { q: "What is Full & Final Settlement in payroll?", a: "Full & Final Settlement (FnF) is the last payroll processed when an employee exits the organisation. It includes: balance salary, leave encashment (EL balance), gratuity (if eligible), notice pay deduction or payout, deduction of any loans/advances, and final Form 16 issuance. It must comply with the Payment of Gratuity Act and Shops & Establishments Act." },
  { q: "Is PF applicable to all businesses?", a: "PF is mandatory for establishments with 20 or more employees. However, smaller employers can voluntarily register. Once registered, all employees earning up to ₹15,000/month basic are mandatorily enrolled. Employees earning above ₹15,000 can opt out of voluntary PF if they were not PF members before joining." },
  { q: "Can you handle payroll for remote or contract employees?", a: "Yes. We handle payroll for full-time employees, remote workers, fixed-term contract staff, and freelancers on payroll. For contract staff, we also handle TDS under Section 194C/194J where applicable. Statutory deductions are applied based on actual employment status." },
  { q: "How do you handle payroll for new joiners and exits mid-month?", a: "New joiner salaries are pro-rated from the date of joining. Exit payroll includes the final month salary pro-rated to last working day, leave encashment, notice pay adjustment, gratuity computation, and recovery of any outstanding dues — all reconciled in the FnF statement." },
  { q: "What happens if we miss a PF or ESIC deadline?", a: "Late PF deposits attract interest @ 12% p.a. under Section 7Q and damages from 5% to 25% under Section 14B of the EPF Act. ESIC late payments attract 12% interest. Beyond interest, EPFO and ESIC inspectors can conduct establishment inspections and levy additional penalties. We ensure zero missed deadlines with a proactive compliance calendar." },
  { q: "How is payroll data shared securely?", a: "Employee data is collected via a secure client portal. Payroll outputs — salary registers, payslips, MIS — are shared via encrypted documents. All team members sign NDAs. We do not request or share payroll data over WhatsApp or unencrypted email attachments." },
  { q: "What payroll software do you use?", a: "We work with Keka HR, Zoho Payroll, GreytHR, RazorpayX Payroll, TallyPrime, and MS Excel. If you already use a specific HRMS or payroll tool, we adapt to it. For new clients, we recommend the best fit based on your team size, industry, and statutory requirements." },
  { q: "How much does outsourced payroll cost?", a: "Our pricing is per-employee per-month. Plans start from ₹150–₹250 per employee/month depending on services included. Full compliance (PF + ESIC + PT + TDS + Form 16) is included in our standard plan. A free consultation call helps us provide an exact quote for your team size." },
];

const relatedServices = [
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping", desc: "Books, MIS & financial statements." },
  { id: "gst-filing", title: "GST Return Filing", desc: "Monthly & quarterly GST returns." },
  { id: "income-tax-return", title: "Income Tax Return", desc: "ITR filing for businesses." },
  { id: "tds-return", title: "TDS Return Filing", desc: "Quarterly TDS compliance." },
  { id: "private-limited-company", title: "Company Registration", desc: "Start your Pvt. Ltd. company." },
  { id: "roc-compliance", title: "Annual ROC Compliance", desc: "MCA filings & secretarial." },
];

/* ─── Sticky Sidebar ─── */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">Get a Free Payroll Quote</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Tell us your team size and we&apos;ll send a transparent, per-employee quote within 24 hours.</p>
        <div className="space-y-2 mb-5">
          {["On-Time Salary Processing", "PF, ESIC & TDS Compliance", "Digital Payslips for Every Employee", "Dedicated Payroll Manager"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <a href="tel:+919876543210"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          >
            <Phone size={13} /> Call Now
          </a>
          <Link href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          >
            Book Free Consultation
          </Link>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={13} /> WhatsApp
          </a>
        </div>
      </div>

      {/* Quick Nav */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-sm mb-3">Quick Navigation</p>
        <div className="space-y-1">
          {[
            { href: "#services", label: "Services Included" },
            { href: "#statutory", label: "Statutory Deductions" },
            { href: "#workflow", label: "Payroll Process" },
            { href: "#calendar", label: "Compliance Calendar" },
            { href: "#penalties", label: "Penalties & Risks" },
            { href: "#software", label: "Software We Use" },
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

      {/* Download */}
      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Download size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Payroll Checklist</p>
        </div>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">Download the monthly payroll document checklist and compliance calendar as PDF.</p>
        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
          <Download size={13} /> Download PDF
        </button>
      </div>

      {/* Stats */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "1000+", l: "Employees Managed" }, { v: "100%", l: "On-Time Filing" }, { v: "15+", l: "Years Exp." }, { v: "24h", l: "Response Time" }].map(s => (
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

/* ══════════════════════════════════════ MAIN EXPORT ══════════════════════════════════════ */
export function PayrollManagementPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="payroll-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#payroll-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>

        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Payroll Management</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">Payroll Experts • Statutory Compliant • Guaranteed On-Time</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Payroll Management<br /><span className="text-primary">Services for Indian</span><br />Businesses
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                End-to-end payroll outsourcing — salary computation, payslips, PF, ESIC, TDS, Form 16, and full compliance. Handled by qualified CAs so you never miss a deadline or a rupee.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Book Free Consultation <ArrowRight size={15} />
                </Link>
                <a href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to an Expert
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-6 gap-y-2">
                {["CA-Reviewed Payroll", "Zero Missed Deadlines", "Secure & Confidential", "Form 16 Included"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Payslip mockup card */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }} className="relative"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] p-6 max-w-md mx-auto">
                {/* Payslip header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="font-heading font-bold text-dark text-sm">Monthly Payslip</p>
                    <p className="text-muted text-[11px]">June 2026 · Auto-generated</p>
                  </div>
                  <span className="text-[10px] font-heading font-semibold bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full">● Processed</span>
                </div>
                {/* Employee row */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-4">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-dark text-xs">Rahul Sharma</p>
                    <p className="text-muted text-[10px]">Senior Manager · EMP-2041</p>
                  </div>
                  <p className="font-heading font-bold text-primary text-sm">₹52,061</p>
                </div>
                {/* Earnings / Deductions */}
                <div className="space-y-1.5">
                  {payslipRows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                      <span className="text-muted text-[11px]">{row.label}</span>
                      <span className={`text-[11px] font-heading font-semibold ${row.type === "deduction" ? "text-rose-500" : "text-green-600"}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Net pay */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-muted text-[10px] uppercase tracking-wider">Net Take-Home</p>
                    <p className="font-heading font-bold text-dark text-2xl">₹52,061</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted text-[10px]">Compliance</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-green-600 text-[11px] font-heading font-semibold">All filed</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -right-4 top-12 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
              >
                <p className="text-[10px] text-muted font-heading">PF Deposited</p>
                <p className="font-heading font-bold text-primary text-sm">15th June ✓</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -left-4 bottom-16 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
              >
                <p className="text-[10px] text-muted font-heading">Form 16 Issued</p>
                <p className="font-heading font-bold text-green-600 text-sm">100% Done ✓</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ MAIN CONTENT + STICKY SIDEBAR ══ */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* ── SERVICES INCLUDED ── */}
            <section id="services">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Services Included" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Everything Payroll, Under One Roof
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  From the first employee to the last statutory filing — every component of Indian payroll is handled end-to-end.
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

            {/* ── PAYSLIP ANATOMY ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Payslip Deep-Dive" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  What Goes Into a Payslip?
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Every payslip we generate is fully compliant, detailed, and password-protected. Here&apos;s a live salary structure breakdown for a ₹59,100 CTC employee.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Earnings */}
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card"
                >
                  <div className="bg-green-50 border-b border-green-100 px-5 py-3 flex items-center justify-between">
                    <p className="font-heading font-bold text-green-700 text-sm">Earnings</p>
                    <span className="text-[11px] font-heading font-semibold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">Gross: ₹59,100</span>
                  </div>
                  <div className="p-4 space-y-2">
                    {[
                      { label: "Basic Salary", value: "₹35,000", note: "~59% of CTC" },
                      { label: "HRA", value: "₹14,000", note: "40% of Basic" },
                      { label: "Special Allowance", value: "₹8,500", note: "Taxable" },
                      { label: "Conveyance Allowance", value: "₹1,600", note: "Exempt up to ₹1,600" },
                    ].map(r => (
                      <div key={r.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                        <div>
                          <p className="text-dark text-xs font-heading font-medium">{r.label}</p>
                          <p className="text-muted text-[10px]">{r.note}</p>
                        </div>
                        <p className="font-heading font-semibold text-green-600 text-sm">{r.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
                {/* Deductions */}
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card"
                >
                  <div className="bg-rose-50 border-b border-rose-100 px-5 py-3 flex items-center justify-between">
                    <p className="font-heading font-bold text-rose-700 text-sm">Deductions</p>
                    <span className="text-[11px] font-heading font-semibold bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full">Total: ₹6,939</span>
                  </div>
                  <div className="p-4 space-y-2">
                    {[
                      { label: "Provident Fund (12%)", value: "₹4,200", note: "Employee share on Basic" },
                      { label: "ESIC (0.75%)", value: "₹439", note: "On gross if ≤ ₹21,000" },
                      { label: "Professional Tax", value: "₹200", note: "State-specific" },
                      { label: "TDS on Salary", value: "₹2,100", note: "Based on projected annual income" },
                    ].map(r => (
                      <div key={r.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                        <div>
                          <p className="text-dark text-xs font-heading font-medium">{r.label}</p>
                          <p className="text-muted text-[10px]">{r.note}</p>
                        </div>
                        <p className="font-heading font-semibold text-rose-600 text-sm">−{r.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
              {/* Net pay bar */}
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 bg-primary rounded-2xl p-5 flex items-center justify-between"
              >
                <div>
                  <p className="text-white/60 text-xs font-heading">Net Take-Home Pay</p>
                  <p className="font-heading font-bold text-white text-2xl">₹52,061</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs font-heading">Employer CTC</p>
                  <p className="font-heading font-bold text-accent text-xl">₹66,693</p>
                  <p className="text-white/40 text-[10px]">incl. employer PF + ESIC</p>
                </div>
              </motion.div>
            </section>

            {/* ── STATUTORY DEDUCTIONS ── */}
            <section id="statutory">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Statutory Compliance" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Statutory Deductions We Handle
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Indian payroll has four major statutory obligations — each with distinct rates, thresholds, and filing timelines that we manage end-to-end.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {statutoryData.map((s, i) => (
                  <motion.div key={s.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-card transition-all"
                  >
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                      <p className="font-heading font-bold text-dark text-sm">{s.title}</p>
                      <span className={`text-[10px] font-heading font-semibold px-2.5 py-1 rounded-full border ${s.badgeColor}`}>{s.badge}</span>
                    </div>
                    <div className="p-4 space-y-2">
                      {s.rows.map(r => (
                        <div key={r.label} className="flex items-start justify-between gap-4 py-1.5 border-b border-slate-50 last:border-0">
                          <span className="text-muted text-[11px] shrink-0">{r.label}</span>
                          <span className="text-dark text-[11px] font-heading font-semibold text-right">{r.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── WORKFLOW TIMELINE ── */}
            <section id="workflow">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Our Process" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  End-to-End Payroll Workflow
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  A structured 8-step process repeated every month with the same accuracy and the same deadlines — no exceptions.
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

            {/* ── COMPLIANCE CALENDAR ── */}
            <section id="calendar">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Compliance Calendar" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Monthly Payroll Due Date Calendar
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Missing even one of these deadlines can trigger penalties. We track every due date across PF, ESIC, TDS, and PT for you.
                </p>
              </motion.div>
              <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card">
                <div className="bg-primary px-5 py-4 flex items-center gap-3">
                  <Calendar size={16} className="text-accent" />
                  <p className="font-heading font-bold text-white text-sm">Monthly Payroll Compliance Calendar</p>
                </div>
                <div className="divide-y divide-slate-50">
                  {payrollCalendar.map((item, i) => (
                    <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                      className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className={`shrink-0 w-14 text-center px-2 py-1.5 rounded-xl border text-[11px] font-heading font-bold ${item.color}`}>
                        {item.day}
                      </div>
                      <p className="text-dark text-xs font-heading font-medium leading-snug">{item.task}</p>
                      <CheckCircle size={14} className="text-green-500 ml-auto shrink-0" />
                    </motion.div>
                  ))}
                </div>
                <div className="bg-amber-50 border-t border-amber-100 px-5 py-3 flex items-center gap-2">
                  <Bell size={13} className="text-amber-600 shrink-0" />
                  <p className="text-amber-700 text-xs font-heading font-medium">We send proactive reminders before every deadline and confirmation receipts after every filing.</p>
                </div>
              </div>
            </section>

            {/* ── COMMON MISTAKES ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Risk Awareness" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Common Payroll Mistakes That Cost Businesses
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  These are the most frequent errors we fix when onboarding new clients. Every one of them triggers regulatory notices or financial penalties.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonMistakes.map((m, i) => (
                  <motion.div key={m.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="flex items-start gap-4 p-5 border border-slate-100 rounded-2xl bg-white hover:shadow-card transition-all"
                  >
                    <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${m.color}`}>
                      <m.icon size={16} />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-dark text-sm mb-1">{m.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── PENALTIES TABLE ── */}
            <section id="penalties">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Penalties & Risks" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Penalties for Payroll Non-Compliance
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  The cost of non-compliance is always higher than the cost of outsourcing. Here&apos;s what&apos;s at stake.
                </p>
              </motion.div>
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-card bg-white">
                <div className="grid grid-cols-3 bg-primary px-5 py-3 text-white text-[11px] font-heading font-bold uppercase tracking-wider">
                  <span>Authority</span><span>Violation</span><span>Penalty</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {penalties.map((p, i) => (
                    <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                      className={`grid grid-cols-3 gap-2 px-5 py-4 hover:bg-slate-50/50 transition-colors border-l-[3px] ${p.color}`}
                    >
                      <span className="text-dark text-xs font-heading font-semibold">{p.authority}</span>
                      <span className="text-muted text-xs">{p.violation}</span>
                      <span className="text-rose-600 text-xs font-heading font-medium">{p.penalty}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-4 bg-primary/5 border border-primary/15 rounded-2xl p-5 flex items-center gap-3"
              >
                <ShieldCheck size={18} className="text-primary shrink-0" />
                <p className="text-primary text-sm font-heading font-semibold">Company Avenue maintains a 100% on-time compliance record across all statutory filings — every month.</p>
              </motion.div>
            </section>

            {/* ── SOFTWARE ── */}
            <section id="software">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Software We Use" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Payroll Software We Work With
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  We adapt to your existing HRMS or recommend the best payroll platform for your team size and statutory needs.
                </p>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {softwareList.map((sw, i) => (
                  <motion.div key={sw.name} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className={`flex items-center gap-4 p-5 border rounded-2xl ${sw.color} hover:shadow-card transition-all`}
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

            {/* ── BENEFITS ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Why Outsource" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Why Smart Businesses Outsource Payroll
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  In-house payroll sounds simple until the EPFO notice arrives. Here&apos;s the business case for outsourcing.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {benefits.map((b, i) => (
                  <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                      <b.icon size={18} className="text-primary" />
                    </div>
                    <p className="font-heading font-bold text-dark text-sm mb-1.5">{b.title}</p>
                    <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── INDUSTRIES ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Industries We Serve" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Payroll for Every Business Type
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Every industry has unique payroll structures — from shift workers to ESOPs. Our team handles them all.
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

            {/* ── WHY US ── */}
            <section id="why-us">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Why Company Avenue" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  What Makes Us Different
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  We&apos;re not a payroll software — we&apos;re a CA-led payroll team that takes end-to-end ownership.
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
            <section id="faq">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Everything employers ask before outsourcing payroll — answered.
                </p>
              </motion.div>
              <div className="space-y-2">
                {faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
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

          </div>{/* end main column */}

          {/* ── STICKY SIDEBAR ── */}
          <div className="hidden xl:block sticky top-24 self-start"><StickySidebar /></div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-gradient-to-br from-primary to-[#154D8C] py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-5">
              <span className="w-6 h-px bg-accent" />Get Started Today<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white leading-tight tracking-tight mb-5">
              Outsource Payroll to Company Avenue<br />and Never Miss a Deadline Again
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Join 200+ businesses that run error-free, fully compliant payroll every month without lifting a finger. Start with a free consultation — get an exact quote for your team size.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-accent-light transition-colors shadow-lg shadow-accent/20"
              >
                Book Free Consultation <ArrowRight size={15} />
              </Link>
              <a href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 border border-white/20 transition-colors"
              >
                <Phone size={14} /> Talk to an Expert
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {["Per-Employee Pricing", "No Lock-in Contracts", "Start in 48 Hours", "100% Compliance Guarantee"].map(pt => (
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
