"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, CheckCircle, Plus, Minus,
  MessageCircle, FileText, CreditCard, Fingerprint,
  Hash, Building2, Users, Globe, Briefcase, Monitor, Award,
  DollarSign, Headphones, UserCheck, ShieldCheck,
  BadgeCheck, AlertCircle, Info, Bell, Search,
  TrendingUp, BookOpen, CalendarCheck, Repeat2,
  AlertTriangle, Landmark, Wallet, UserCircle, Receipt,
  ClipboardList, BarChart3, HeartHandshake, PiggyBank,
  Scale, Clock, Shield,
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

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */

const quickFacts = [
  { icon: Scale,         label: "Governing Act",    value: "EPF & MP Act 1952" },
  { icon: Users,         label: "Threshold",        value: "20+ Employees" },
  { icon: Wallet,        label: "Contribution",     value: "12% + 12%" },
  { icon: Landmark,      label: "Authority",        value: "EPFO" },
  { icon: FileText,      label: "Monthly Form",     value: "ECR Filing" },
  { icon: CalendarCheck, label: "Due Date",         value: "15th of Next Month" },
];

const whoNeeds = [
  { icon: Building2,    title: "Companies with 20+ Employees",      desc: "Any establishment reaching 20 employees is mandatorily required to register under EPF Act 1952." },
  { icon: Monitor,      title: "IT & Tech Companies",               desc: "Software firms, BPOs, and tech startups with 20+ staff must register regardless of business age." },
  { icon: Briefcase,    title: "Manufacturing Firms",               desc: "Factories and production units with 20+ workers need PF registration from day of crossing threshold." },
  { icon: HeartHandshake,title: "NGOs with Staff",                 desc: "Non-governmental organisations and charitable trusts with 20+ paid employees must comply." },
  { icon: BookOpen,     title: "Educational Institutions",          desc: "Schools, colleges, coaching centres and other educational bodies with 20+ employees need PF." },
  { icon: UserCheck,    title: "Restaurants & Hospitality",         desc: "Hotels, restaurants, food chains, and hospitality businesses with 20+ staff must register." },
  { icon: ClipboardList,title: "Construction Companies",            desc: "Builders, contractors, and real estate firms with ongoing staff of 20+ need PF compliance." },
  { icon: Users,        title: "Any Employer Crossing 20 Staff",    desc: "Once the threshold is crossed — even temporarily — registration becomes mandatory immediately." },
];

const keyBenefits = [
  { icon: Shield,       title: "Legal Compliance",                  desc: "Avoid penalty of ₹5,000 per day for non-registration plus prosecution under EPF Act 1952." },
  { icon: PiggyBank,    title: "Employee Retirement Security",      desc: "Ensures every employee builds a retirement corpus through systematic monthly contributions." },
  { icon: FileText,     title: "PF Passbook for Employees",         desc: "Employees can view their PF balance and contribution history online via EPFO member portal." },
  { icon: Hash,         title: "UAN Generation",                    desc: "Each employee gets a Universal Account Number (UAN) that stays with them across all employers." },
  { icon: ShieldCheck,  title: "EDLI Life Insurance Cover",         desc: "Employees' Deposit Linked Insurance scheme provides life insurance cover of up to ₹7 lakh." },
  { icon: Landmark,     title: "Pension Benefit (EPS)",             desc: "Employees' Pension Scheme ensures monthly pension to employees post retirement." },
  { icon: DollarSign,   title: "Tax Deduction for Employer",        desc: "Employer's PF contribution is fully deductible under Section 36(1)(iv) of Income Tax Act." },
  { icon: TrendingUp,   title: "Employee Retention Tool",           desc: "PF benefits improve employee satisfaction and reduce attrition in competitive job markets." },
];

const processSteps = [
  { n: "01", title: "Check Eligibility",         desc: "Verify if your establishment has 20 or more employees. Count all categories including contract staff." },
  { n: "02", title: "EPFO Portal Registration",  desc: "Register the establishment on the EPFO Unified Portal (unifiedportal-emp.epfindia.gov.in) with complete details." },
  { n: "03", title: "UAN Allotment",             desc: "Generate Universal Account Numbers for all existing employees and new joiners through the employer portal." },
  { n: "04", title: "Monthly ECR Preparation",   desc: "Prepare the Electronic Challan cum Return with each employee's wage and PF contribution details." },
  { n: "05", title: "Challan Payment by 15th",   desc: "Upload the ECR and pay the PF challan through net banking or NEFT before the 15th of each month." },
  { n: "06", title: "Monthly ECR Upload",        desc: "Upload the approved ECR on the EPFO portal after payment to complete the monthly compliance cycle." },
  { n: "07", title: "Annual PF Return",          desc: "File the annual return with updated employee details and contribution summary for the financial year." },
  { n: "08", title: "PF Withdrawal Support",     desc: "Assist employees with PF claim forms (19, 10C, 31) for settlement during resignation or retirement." },
];

const requiredDocs = [
  { icon: CreditCard,   label: "PAN Card of Company / LLP / Firm" },
  { icon: FileText,     label: "Business Registration Certificate" },
  { icon: Landmark,     label: "Bank Account Details (Cancelled Cheque)" },
  { icon: ClipboardList,label: "List of Employees with Salary Details" },
  { icon: Fingerprint,  label: "Aadhaar + PAN of All Employees" },
  { icon: BadgeCheck,   label: "Digital Signature of Authorised Signatory" },
  { icon: Building2,    label: "Address Proof of Establishment" },
  { icon: Receipt,      label: "GST Certificate or Udyam Certificate" },
];

const timelineStages = [
  { label: "Documents Collected",    icon: FileText },
  { label: "EPFO Registration",      icon: Landmark },
  { label: "PF Code Issued",         icon: BadgeCheck },
  { label: "UAN Generated",          icon: Hash },
  { label: "First ECR Filed",        icon: Receipt },
  { label: "Ongoing Compliance",     icon: Repeat2 },
];

const deliverables = [
  "PF Registration Number (Establishment Code)",
  "ECR Portal Access Credentials",
  "UAN for All Existing Employees",
  "Monthly ECR Filed Receipts",
  "Annual PF Return Acknowledgment",
  "Guidance on Employee PF Withdrawal",
];

const whyUsPoints = [
  { icon: Award,        label: "15+ Years of PF Compliance Experience" },
  { icon: Shield,       label: "Zero-Penalty Guarantee — Always On Time" },
  { icon: Headphones,   label: "Dedicated PF Relationship Manager" },
  { icon: Monitor,      label: "100% Digital, EPFO Portal-Based Process" },
  { icon: ClipboardList,label: "Accurate ECR Preparation Every Month" },
  { icon: DollarSign,   label: "Transparent Fixed Monthly Pricing" },
  { icon: Bell,         label: "Proactive Due Date Reminders" },
  { icon: UserCheck,    label: "Employee PF Withdrawal Assistance" },
];

const relatedServices = [
  { id: "esic-registration",      title: "ESIC Registration",           desc: "ESI compliance for establishments with 10+ employees." },
  { id: "professional-tax",       title: "Professional Tax",            desc: "State-level professional tax registration and returns." },
  { id: "payroll-management",     title: "Payroll Management",          desc: "End-to-end payroll processing with full compliance." },
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping",    desc: "Accurate books maintained by qualified accountants." },
  { id: "private-limited-company",title: "Private Limited Company",     desc: "Incorporate your business before compliance." },
  { id: "gst-registration",       title: "GST Registration",            desc: "GSTIN registration and return filing support." },
];

const faqs = [
  {
    q: "Who must register for PF — what is the 20-employee threshold?",
    a: "Under the Employees' Provident Funds and Miscellaneous Provisions Act, 1952, every establishment with 20 or more employees is mandatorily required to register. All categories of employees are counted — permanent, contract, and probationary. Once the threshold is crossed, registration must be done within 30 days. After registration, the employer continues to be covered even if headcount falls below 20.",
  },
  {
    q: "Can an employer voluntarily register for PF with fewer than 20 employees?",
    a: "Yes. Under Section 1(4) of the EPF Act, an employer and the majority of employees can agree to voluntarily cover the establishment. The employer must apply to the Regional PF Commissioner and once accepted, all provisions of the Act apply as if the establishment was mandatorily covered. This is useful for attracting employees who value retirement benefits.",
  },
  {
    q: "What is the employee and employer PF contribution breakdown?",
    a: "The employee contributes 12% of basic wages + dearness allowance to the EPF account. The employer also contributes 12% — but this is split: 3.67% goes to the EPF account and 8.33% goes to the Employees' Pension Scheme (EPS). Additionally, the employer pays 0.50% towards EDLI (insurance) and 0.85% as administrative charges, making the total employer outgo approximately 13.15% of basic salary.",
  },
  {
    q: "How does PF withdrawal work and what forms are required?",
    a: "Employees can withdraw PF using online claims via the EPFO member portal (using UAN + Aadhaar-seeded account) or physical forms. Form 19 is used for final PF settlement, Form 10C for EPS withdrawal or scheme certificate, and Form 31 for partial advances (house purchase, education, medical emergencies). Online claims are generally settled within 3-5 working days, while physical claims may take 15-20 days.",
  },
  {
    q: "What is UAN and how does it help employees switching jobs?",
    a: "UAN (Universal Account Number) is a 12-digit number allotted by EPFO to each member. It stays constant throughout an employee's career regardless of how many employers they work for. When switching jobs, the employee simply provides the UAN to the new employer who links a new member ID under the same UAN. This allows seamless transfer of PF balance without withdrawal, preserving the continuity of contributions.",
  },
  {
    q: "What is the difference between Form 19 and Form 10C?",
    a: "Form 19 is for settlement of the EPF (Provident Fund) account — the accumulated PF corpus with interest. Form 10C is for claiming the EPS (Pension Scheme) balance — it allows either withdrawal of pension corpus (if service is less than 10 years) or a scheme certificate for employees with 10+ years of service who want to preserve pension benefits. Both can be filed simultaneously for full and final PF settlement.",
  },
  {
    q: "Is PF calculated on total salary or basic salary?",
    a: "PF contributions are calculated on 'basic wages' which includes basic salary and dearness allowance (DA), but typically excludes HRA, conveyance, special allowance, and other non-standard components. The statutory ceiling for contribution calculation is ₹15,000 per month — meaning even if basic salary exceeds ₹15,000, the employer's obligation is capped at 12% of ₹15,000 (₹1,800) unless employer opts to contribute on actual salary.",
  },
  {
    q: "What is the EDLI insurance cover under PF and how much is the maximum?",
    a: "EDLI (Employees' Deposit Linked Insurance) is a life insurance scheme linked to PF membership. In the event of an employee's death during service, the nominee receives a lump sum benefit. The maximum EDLI benefit was enhanced to ₹7 lakh. The employer pays 0.50% of basic wages as EDLI premium — there is no employee contribution. The minimum assurance benefit is ₹2.5 lakh.",
  },
  {
    q: "Is the employer's PF contribution tax-deductible?",
    a: "Yes. The employer's contribution to the EPF is fully deductible as a business expense under Section 36(1)(iv) of the Income Tax Act, 1961. However, the deduction is available only if the contribution is deposited on or before the due date — if deposited late, the deduction is disallowed for that year. Timely payment is therefore critical both for compliance and tax efficiency.",
  },
  {
    q: "What happens during an EPFO inspection — what records must an employer maintain?",
    a: "EPFO officers conduct surprise inspections under Section 13 of the EPF Act. Employers must maintain: Form 3A (member-wise contribution register), Form 6A (annual statement), wages register, attendance register, Form 5 (new employees), Form 10 (employees leaving), ECR challans, and bank payment receipts for the past 5 years. Non-maintenance of records attracts penalties and prosecution. Company Avenue keeps all records updated and inspection-ready.",
  },
];

/* ── FAQ Item ── */
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

/* ── Sticky Sidebar ── */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">Register PF Today</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Stay penalty-free. Our PF experts handle registration, UAN generation, and monthly ECR filing.</p>
        <div className="space-y-2 mb-5">
          {["PF Registration & Code", "UAN for All Employees", "Monthly ECR Filing", "Annual PF Returns"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="bg-primary/5 rounded-xl p-3 mb-4">
          <p className="text-xs text-muted">Registration starts from</p>
          <p className="font-heading font-bold text-primary text-xl">₹2,999</p>
          <p className="text-[10px] text-muted">+ ₹1,499/month ECR filing</p>
        </div>
        <div className="space-y-2">
          <a href="tel:+919876543210"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          ><Phone size={13} /> Call Now</a>
          <Link href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          >Book Consultation</Link>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          ><MessageCircle size={13} /> WhatsApp</a>
        </div>
      </div>
      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Monthly Due Date Alert</p>
        </div>
        <p className="text-white/60 text-xs mb-1 leading-relaxed">PF challan due: <strong className="text-white">15th of every month</strong></p>
        <p className="text-white/60 text-xs leading-relaxed">Late payment attracts interest @ 12% p.a. + damages.</p>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "2,500+", l: "PF Registrations" }, { v: "100%", l: "Timely Filing" }, { v: "15+", l: "Years Exp." }, { v: "24h", l: "Response" }].map(s => (
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
export function PFRegistrationPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="pf-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#pf-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link><span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link><span>/</span>
            <span className="text-dark">PF Registration & ECR Filing</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-blue-700 text-xs font-heading font-semibold">Labour Law Compliance Experts • EPFO Registered</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                PF Registration &amp;<br /><span className="text-primary">ECR Filing Service</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Mandatory for every employer with 20+ employees. Register on the EPFO portal, generate UAN for all employees, and ensure timely monthly ECR filing — all managed by our compliance experts.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Register PF Now <ArrowRight size={15} />
                </Link>
                <a href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Free Consultation
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["EPFO Portal Experts", "UAN Generation", "Monthly ECR Filing", "Zero Penalty Promise"].map(pt => (
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
                      <Landmark size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">PF Registration at a Glance</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Compliant
                  </span>
                </div>
                <div className="space-y-2.5 mb-5">
                  {[
                    { label: "Governing Act",      value: "EPF & MP Act, 1952" },
                    { label: "Employee Threshold", value: "20+ Employees" },
                    { label: "Contribution Rate",  value: "12% Employer + 12% Employee" },
                    { label: "Authority",          value: "EPFO (Labour Ministry)" },
                    { label: "Monthly Form",       value: "ECR (Electronic Challan cum Return)" },
                    { label: "Payment Due",        value: "15th of Next Month" },
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
                <div className="bg-primary/5 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted">Registration starts from</p>
                    <p className="font-heading font-bold text-primary text-xl">₹2,999</p>
                  </div>
                  <Link href="/contact"
                    className="px-4 py-2 bg-primary text-white text-xs font-heading font-semibold rounded-lg hover:bg-[#0a2444] transition-colors"
                  >Get Started</Link>
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

      {/* ── WHAT IS PF REGISTRATION ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)] relative">
                <Image
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=85"
                  alt="PF registration and employee provident fund compliance"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">2,500+</p>
                <p className="text-white/60 text-xs">PF Registrations Done</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is PF Registration?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                <strong>Provident Fund (PF) Registration</strong> is mandatory for every establishment employing 20 or more persons. Governed by the <strong>Employees' Provident Funds and Miscellaneous Provisions Act, 1952</strong>, it requires employers to register on the EPFO portal and contribute 12% of each employee's basic wages every month.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                The <strong>ECR (Electronic Challan cum Return)</strong> is filed monthly by the employer, detailing each employee's wage and PF contribution. The challan must be paid by the <strong>15th of the following month</strong>. Failure to register or file on time attracts penalties of ₹5,000 per day plus interest at 12% per annum on delayed payments.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Mandatory for 20+ employees", "12% employer contribution", "Monthly ECR filing", "Employee UAN issued"].map(pt => (
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
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Needs PF Registration?</h2>
            <p className="text-muted text-base max-w-2xl mx-auto mt-3">Any establishment that has employed 20 or more persons on any day during the preceding 12 months must register immediately.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoNeeds.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                    <Icon size={19} className="text-primary group-hover:text-white transition-colors duration-300" />
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
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Benefits of PF Registration</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {keyBenefits.map((item, i) => {
              const Icon = item.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div key={item.title}
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

      {/* ── TWO-COLUMN: MAIN + SIDEBAR ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* PROCESS */}
            <section>
              <Eyebrow label="Registration Process" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">PF Registration &amp; ECR Filing — Step by Step</h2>
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
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Documents Required for PF Registration</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
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
                <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 flex items-center gap-3">
                  <Info size={15} className="text-primary shrink-0" />
                  <p className="text-dark text-xs leading-relaxed">All documents must be self-attested. Company Avenue's team will guide you through exact format requirements and verify documents before submission to avoid rejection.</p>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section>
              <Eyebrow label="Timeline" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">PF Registration Timeline</h2>
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
                          <p className="text-xs font-heading font-semibold text-dark leading-snug max-w-[80px]">{stage.label}</p>
                        </div>
                        {i < timelineStages.length - 1 && (
                          <ArrowRight size={14} className="text-slate-400 shrink-0 hidden sm:block" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Registration Completion", value: "3–7 Working Days" },
                    { label: "UAN Generation", value: "Immediate on Portal" },
                    { label: "First ECR Due", value: "15th of Following Month" },
                  ].map(t => (
                    <div key={t.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                      <p className="text-[10px] text-muted uppercase tracking-wider mb-1">{t.label}</p>
                      <p className="font-heading font-bold text-primary text-sm">{t.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* WHAT YOU RECEIVE */}
            <section>
              <Eyebrow label="Deliverables" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">What You Receive</h2>
              <p className="text-muted text-sm mb-8">Upon completion of PF registration and setup, you receive the following from Company Avenue Advisory.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {deliverables.map((d, i) => (
                  <motion.div key={d} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="show" viewport={{ once: true }}
                    className="flex items-start gap-3 bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-card hover:border-primary/15 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                      <CheckCircle size={15} className="text-green-600" />
                    </div>
                    <span className="text-dark text-sm font-medium leading-snug pt-1">{d}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* PF CONTRIBUTION BREAKDOWN */}
            <section>
              <Eyebrow label="Contribution Details" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">PF Contribution Breakdown</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <UserCircle size={15} className="text-blue-600" />
                      </div>
                      <p className="font-heading font-bold text-dark text-base">Employee Contribution</p>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { label: "To EPF Account",  value: "12% of Basic + DA", highlight: true },
                        { label: "Total Deduction", value: "12% of Basic + DA", highlight: false },
                      ].map(row => (
                        <div key={row.label} className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${row.highlight ? "bg-primary text-white" : "bg-slate-50 border border-slate-100"}`}>
                          <span className={`text-xs font-medium ${row.highlight ? "text-white/80" : "text-muted"}`}>{row.label}</span>
                          <span className={`text-xs font-heading font-bold ${row.highlight ? "text-white" : "text-dark"}`}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                        <Building2 size={15} className="text-green-600" />
                      </div>
                      <p className="font-heading font-bold text-dark text-base">Employer Contribution</p>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { label: "To EPF (PF Account)",        value: "3.67%" },
                        { label: "To EPS (Pension Scheme)",    value: "8.33%" },
                        { label: "EDLI (Insurance)",           value: "0.50%" },
                        { label: "Admin Charges",              value: "0.85%" },
                        { label: "Total Employer Outgo",       value: "~13.15%", highlight: true },
                      ].map(row => (
                        <div key={row.label} className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${row.highlight ? "bg-primary text-white" : "bg-slate-50 border border-slate-100"}`}>
                          <span className={`text-xs font-medium ${row.highlight ? "text-white/80" : "text-muted"}`}>{row.label}</span>
                          <span className={`text-xs font-heading font-bold ${row.highlight ? "text-white" : "text-dark"}`}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">The statutory wage ceiling for PF contribution is <strong>₹15,000/month</strong>. Employers may opt to contribute on actual basic salary if it exceeds this limit, but the minimum obligation is capped at ₹15,000.</p>
                </div>
              </div>
            </section>

            {/* WHY COMPANY AVENUE */}
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Eyebrow label="Why Us" />
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">Why Choose Company Avenue for PF Compliance?</h2>
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
                    { v: "2,500+", l: "PF Registrations",  c: "bg-primary text-white" },
                    { v: "100%",   l: "On-Time ECR Filing", c: "bg-accent text-dark" },
                    { v: "15+",    l: "Years Experience",   c: "bg-slate-800 text-white" },
                    { v: "24 hrs", l: "Response Time",      c: "bg-green-600 text-white" },
                  ].map(s => (
                    <motion.div key={s.l} whileHover={{ y: -4 }} className={`${s.c} rounded-2xl p-6 text-center shadow-card`}>
                      <p className="font-heading font-bold text-3xl leading-none mb-1">{s.v}</p>
                      <p className="text-xs opacity-80 leading-snug">{s.l}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* PENALTIES SECTION */}
            <section>
              <Eyebrow label="Penalties" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">Penalties for Non-Compliance</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: AlertCircle, title: "Non-Registration Penalty", desc: "₹5,000 per day for delay in registration after crossing the 20-employee threshold under Section 14B of the EPF Act.", color: "bg-red-50 border-red-200" },
                  { icon: Clock,       title: "Delayed Payment Interest", desc: "Interest at 12% per annum on delayed PF payment. Damages from 5% to 25% depending on delay period under Sec. 7Q.", color: "bg-orange-50 border-orange-200" },
                  { icon: AlertTriangle, title: "Prosecution Risk",       desc: "Non-payment of PF is a cognisable offence — the employer can be prosecuted with imprisonment up to 3 years.", color: "bg-amber-50 border-amber-200" },
                  { icon: Search,      title: "EPFO Inspection",         desc: "EPFO officers conduct surprise audits. Non-maintenance of statutory records attracts additional penalties.", color: "bg-yellow-50 border-yellow-200" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className={`border rounded-2xl p-5 ${item.color}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0">
                          <Icon size={16} className="text-red-500" />
                        </div>
                        <div>
                          <p className="font-heading font-bold text-dark text-sm mb-1">{item.title}</p>
                          <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-5 bg-primary rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-accent shrink-0" />
                  <p className="text-white text-sm font-heading font-semibold">Stay penalty-free — register today and let us handle the compliance.</p>
                </div>
                <Link href="/contact"
                  className="shrink-0 px-4 py-2.5 bg-accent text-dark text-xs font-heading font-bold rounded-xl hover:bg-accent/90 transition-colors"
                >
                  Register Now <ArrowRight size={12} className="inline ml-1" />
                </Link>
              </div>
            </section>

            {/* FAQ */}
            <section itemScope itemType="https://schema.org/FAQPage">
              <div className="text-center mb-10">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions — PF Registration</h2>
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
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="cta-pf" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#cta-pf)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Get Started Today" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Register PF &amp; File ECR<br />Without the Stress
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Company Avenue Advisory handles your complete PF compliance — from EPFO registration and UAN generation to monthly ECR filing and annual returns. Stay penalty-free and keep your employees covered with zero effort on your part.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-accent/90 transition-colors"
              >
                Register PF Now <ArrowRight size={15} />
              </Link>
              <a href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Speak to a PF Expert
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
