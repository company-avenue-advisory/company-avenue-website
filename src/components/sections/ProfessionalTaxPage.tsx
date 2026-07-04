"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  Building2, Users, Globe, Briefcase, Monitor, Award,
  DollarSign, Headphones, ShieldCheck, BadgeCheck, AlertCircle,
  CalendarCheck, RefreshCcw, MapPin, Layers, CreditCard,
  AlertTriangle, Zap, UserCheck, Receipt, ChevronRight,
  TrendingUp, BookOpen, Star, MessageCircle,
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
  { icon: MapPin,        label: "Applicable",       value: "21 States (Varies)" },
  { icon: DollarSign,   label: "Threshold",         value: "Generally ₹15,000/month" },
  { icon: Building2,    label: "Authority",          value: "State Government (PT Officer)" },
  { icon: UserCheck,    label: "Employer Liability", value: "Must Deduct & Deposit" },
  { icon: BadgeCheck,   label: "Max PT Per Year",    value: "₹2,500 Per Employee" },
  { icon: ShieldCheck,  label: "Deductibility",      value: "Sec 16 Income Tax Deduction" },
];

const whoNeeds = [
  { icon: Building2,   title: "Registered Employers",          desc: "All employers operating in states where PT is applicable are legally required to obtain PT registration." },
  { icon: Users,       title: "Salaried Individuals",          desc: "Salaried employees in applicable states have PT deducted by employers and deposited with the state authority." },
  { icon: Briefcase,   title: "Self-Employed Professionals",   desc: "CAs, Doctors, Lawyers, Architects and other professionals must register independently and pay PT annually." },
  { icon: Layers,      title: "Partnership Firms",             desc: "Partnership firms with employees or partners drawing remuneration in PT states must comply with PT laws." },
  { icon: Globe,       title: "LLPs",                          desc: "Limited Liability Partnerships operating in applicable states need PT registration as an employer entity." },
  { icon: Monitor,     title: "Companies",                     desc: "All incorporated companies — private, public, OPC — operating in PT-applicable states must register and comply." },
  { icon: Zap,         title: "Freelancers Above Threshold",   desc: "Freelancers earning above the state-prescribed PT threshold must register and pay PT as self-employed persons." },
  { icon: Award,       title: "Directors Drawing Remuneration",desc: "Directors receiving remuneration from a company in a PT state are liable to PT, which is deducted by the company." },
];

const benefits = [
  { icon: AlertTriangle, title: "Avoid State Penalties",          desc: "Non-compliance attracts penalties of up to 10% per month on unpaid PT — registration prevents costly interest charges." },
  { icon: DollarSign,   title: "Income Tax Deduction (Sec 16)",   desc: "Professional Tax paid is fully deductible from your taxable salary income under Section 16(iii) of the Income Tax Act." },
  { icon: Receipt,      title: "Clean Payroll Compliance",        desc: "Proper PT deduction and documentation ensures your payroll process is legally compliant and audit-ready at all times." },
  { icon: ShieldCheck,  title: "Enables GST Registration",        desc: "In states like Maharashtra, a valid PT registration is often required as a prerequisite for obtaining GST registration." },
  { icon: Globe,        title: "State Business Licence Compliance",desc: "PT registration forms part of the mandatory state business licence requirements and ensures full regulatory compliance." },
  { icon: CheckCircle,  title: "Employee Deductions Documented",   desc: "All PT deductions from employee salaries are properly documented in payroll records, ensuring transparency and accuracy." },
  { icon: AlertCircle,  title: "Avoid ROC / State Notices",        desc: "Registered and compliant companies avoid state authority notices, show-cause letters, and regulatory disruptions." },
  { icon: Users,        title: "Clean HR Records",                 desc: "Professional Tax compliance keeps HR and payroll records clean, making statutory audits and labour inspections smooth." },
];

const processSteps = [
  { n: "01", title: "Check State Applicability",          desc: "Verify whether the state where your business operates levies Professional Tax and identify the applicable slab rates and thresholds." },
  { n: "02", title: "PT Registration Application",        desc: "Submit the PT registration application to the state Professional Tax authority (PT Officer) with all required documents." },
  { n: "03", title: "Enrollment Certificate (EC)",        desc: "Obtain the Enrollment Certificate — required for self-employed persons and professionals who pay PT on their own account." },
  { n: "04", title: "Registration Certificate (RC)",      desc: "Employers receive the Registration Certificate enabling them to deduct PT from employee salaries and deposit with the state." },
  { n: "05", title: "Monthly / Annual Salary Deduction",  desc: "Deduct the applicable PT amount from employee salaries each month or at the frequency mandated by the respective state." },
  { n: "06", title: "Deposit with State Authority",       desc: "Deposit the deducted PT with the state government treasury as per the due dates specified by the state PT authority." },
  { n: "07", title: "Half-Yearly / Annual Returns Filing",desc: "File PT returns with the state authority as per the prescribed schedule — half-yearly or annual depending on the state." },
  { n: "08", title: "Renewal & Compliance Maintenance",   desc: "Maintain ongoing compliance by renewing registration where required and keeping PT records updated as employee count changes." },
];

const requiredDocs = [
  { icon: CreditCard,  label: "Business PAN Card" },
  { icon: FileText,    label: "Business Registration Certificate" },
  { icon: Receipt,     label: "Bank Account Details" },
  { icon: Users,       label: "List of Employees with Monthly Salary" },
  { icon: UserCheck,   label: "Employer Authorised Signatory Details" },
  { icon: MapPin,      label: "Business Address Proof" },
];

const timelineStages = [
  { label: "State Applicability Check", icon: MapPin,        days: "Day 1" },
  { label: "Document Collection",       icon: FileText,      days: "Day 1–2" },
  { label: "Application Submission",    icon: CheckCircle,   days: "Day 2–3" },
  { label: "EC / RC Issuance",          icon: BadgeCheck,    days: "Day 3–7" },
  { label: "Payroll Integration",       icon: Receipt,       days: "Day 7–10" },
  { label: "First Deposit & Return",    icon: CalendarCheck, days: "As per state" },
];

const deliverables = [
  { icon: BadgeCheck,   label: "PT Enrollment Certificate (EC)",   desc: "For self-employed professionals paying PT on own account." },
  { icon: ShieldCheck,  label: "PT Registration Certificate (RC)", desc: "For employers authorised to deduct and deposit PT." },
  { icon: Receipt,      label: "Monthly / Annual Deposit Receipts", desc: "Proof of PT deposited with the state treasury." },
  { icon: FileText,     label: "Return Acknowledgments",           desc: "Filed PT return acknowledgments for your records." },
];

const whyUs = [
  { icon: Award,       label: "15+ Years State Tax Compliance Experience" },
  { icon: MapPin,      label: "Pan-India Coverage — All 21 PT States" },
  { icon: ShieldCheck, label: "Dual Registration: EC + RC in One Engagement" },
  { icon: RefreshCcw,  label: "Return Filing & Renewal Reminders Included" },
  { icon: DollarSign,  label: "Transparent, State-Specific Fixed Pricing" },
  { icon: Monitor,     label: "100% Digital Process — No Physical Visit Required" },
  { icon: Headphones,  label: "Dedicated Compliance Manager Assigned" },
  { icon: Zap,         label: "Fast 3–7 Day Registration Turnaround" },
];

const relatedServices = [
  { id: "pf-registration",        title: "PF Registration",            desc: "Provident Fund registration for employers." },
  { id: "esic-registration",      title: "ESIC Registration",          desc: "Employee State Insurance compliance." },
  { id: "payroll-management",     title: "Payroll Management",         desc: "End-to-end salary and deductions management." },
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping",   desc: "Accurate books and financial records." },
  { id: "gst-registration",       title: "GST Registration",           desc: "GSTIN for your business." },
  { id: "private-limited-company",title: "Private Limited Company",    desc: "Company incorporation services." },
];

const faqs = [
  {
    q: "Which states have Professional Tax in India?",
    a: "Professional Tax is levied in 21 states including Maharashtra, Karnataka, West Bengal, Tamil Nadu, Andhra Pradesh, Telangana, Gujarat, Madhya Pradesh, Assam, Bihar, Jharkhand, Kerala, Meghalaya, Odisha, Puducherry, Sikkim, Tripura, and a few others. States like Delhi, Rajasthan, Haryana, Punjab, and Uttar Pradesh do not levy PT. The slab rates and thresholds vary significantly from state to state.",
  },
  {
    q: "Is Professional Tax applicable on Directors' remuneration?",
    a: "Yes. Directors who draw remuneration from a company are treated as employees for PT purposes in most states. The company must deduct PT from director remuneration as it would from any other employee's salary and deposit it with the state PT authority within the prescribed due dates.",
  },
  {
    q: "What is the difference between Enrollment Certificate (EC) and Registration Certificate (RC)?",
    a: "The Enrollment Certificate (EC) is for self-employed professionals — CAs, Doctors, Lawyers, Architects — who pay PT directly on their own account. The Registration Certificate (RC) is for employers who deduct PT from employees' salaries and deposit it with the state authority. Employers often need both if they are also professionals.",
  },
  {
    q: "What is the maximum Professional Tax amount?",
    a: "The Constitution of India caps Professional Tax at ₹2,500 per person per year. Each state determines its own slabs within this constitutional ceiling. Karnataka levies ₹2,400/year on higher salary brackets, Maharashtra charges up to ₹2,500/year, and other states have their own slabs — always below ₹2,500.",
  },
  {
    q: "Can I claim deduction for Professional Tax under Income Tax?",
    a: "Yes. Under Section 16(iii) of the Income Tax Act, the amount of Professional Tax actually paid during the financial year is allowed as a deduction from your gross salary income. This deduction is available to both employed individuals (on PT deducted by employer) and self-employed professionals (on PT paid directly).",
  },
  {
    q: "When is Professional Tax due — what are the due dates?",
    a: "Due dates for PT deposit and return filing vary by state. In Maharashtra, salary PT returns are filed half-yearly (31st March and 30th September). In Karnataka, it is monthly by the 20th. In West Bengal, returns are annual. You must check the specific state's PT rules for accurate due dates applicable to your business.",
  },
  {
    q: "What are the penalties for non-payment of Professional Tax?",
    a: "Penalties for PT non-compliance vary by state but are typically severe. Maharashtra, for example, levies a penalty of 1.25% per month on unpaid PT plus interest. Karnataka imposes 1.25% per month. Many states also impose a lump sum penalty for late registration. Timely registration and deposit are critical to avoid these charges.",
  },
  {
    q: "Does Professional Tax apply to LLPs?",
    a: "Yes. LLPs operating in PT-applicable states are required to register under PT as employers. Partners drawing remuneration from the LLP may also be liable to PT as self-employed persons depending on the state's rules. The LLP must deduct PT from employee salaries and deposit with the state authority.",
  },
  {
    q: "How do I register for Professional Tax in multiple states?",
    a: "If your business operates in multiple PT states, you need separate PT registrations in each applicable state — there is no central or unified PT registration. Company Avenue Advisory handles multi-state PT registrations simultaneously, giving each state's application the correct local treatment and ensuring timely returns in all states.",
  },
  {
    q: "Is Professional Tax applicable on part-time employees?",
    a: "PT applicability on part-time employees depends on the state. Most states determine PT liability based on the monthly gross salary earned, not employment type. If a part-time employee earns above the state's threshold in a month, PT is deductible. Some states explicitly exempt part-time employees — our team will advise based on your state's rules.",
  },
  {
    q: "What happens if a new employee joins mid-year?",
    a: "When a new employee joins, you must begin deducting PT from the first salary payment if their salary crosses the PT threshold. The employer deposits the deducted amount and includes the new employee in the periodic return filing. The employee does not need a separate PT registration — the employer's RC covers all employees.",
  },
  {
    q: "Is PT registration required before starting operations?",
    a: "PT registration timelines vary by state. In Maharashtra, you must register within 30 days of employing any person. Karnataka requires registration before you start deducting. It is best practice to obtain PT Registration Certificate (RC) before making your first salary payment to avoid penalties for delayed registration.",
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
        <p className="font-heading font-bold text-dark text-base mb-1">Register for Professional Tax</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">
          Get your EC and RC certificates fast. Our experts handle all state-specific requirements.
        </p>
        <div className="space-y-2 mb-5">
          {["All 21 PT States Covered", "EC + RC Registration", "Return Filing Included", "Multi-State Support"].map((pt) => (
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
          <BadgeCheck size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Starting from</p>
        </div>
        <p className="font-heading font-bold text-3xl text-accent mb-1">₹1,999</p>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">
          Includes EC / RC registration and first return filing.
        </p>
        <Link
          href="/contact"
          className="w-full block text-center py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold rounded-xl transition-colors"
        >
          Get Started Today
        </Link>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { v: "21", l: "PT States" },
            { v: "5,000+", l: "Clients" },
            { v: "15+", l: "Years Exp." },
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
export function ProfessionalTaxPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pt-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pt-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Professional Tax Registration</span>
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
                  State Tax Compliance Experts • All 21 PT States
                </span>
              </motion.div>
              <motion.h1
                custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Professional Tax<br />
                <span className="text-primary">Registration Made Simple</span>
              </motion.h1>
              <motion.p
                custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Professional Tax (PT) is a state-level tax applicable to employers, employees, and self-employed professionals across 21 states. Non-compliance attracts steep penalties. Let Company Avenue handle your EC, RC, returns, and ongoing compliance.
              </motion.p>
              <motion.div
                custom={3} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Register for PT Now <ArrowRight size={15} />
                </Link>
                <a
                  href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Free PT Consultation
                </a>
              </motion.div>
              <motion.div
                custom={4} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-wrap gap-x-5 gap-y-2"
              >
                {["All PT States Covered", "EC + RC Both Certificates", "Return Filing Included", "Multi-State Support"].map((pt) => (
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
                      <Receipt size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">PT at a Glance</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Compliant
                  </span>
                </div>
                <div className="space-y-2.5 mb-5">
                  {[
                    { label: "Applicable States",  value: "21 States" },
                    { label: "Threshold",           value: "~₹15,000/month salary" },
                    { label: "Authority",           value: "State Govt (PT Officer)" },
                    { label: "Max PT Per Year",     value: "₹2,500 per employee" },
                    { label: "Employer Duty",       value: "Deduct & Deposit PT" },
                    { label: "IT Deductibility",    value: "Section 16(iii)" },
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
                    <p className="text-xs text-muted">Registration starts from</p>
                    <p className="font-heading font-bold text-primary text-xl">₹1,999</p>
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

      {/* ── WHAT IS PROFESSIONAL TAX ── */}
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
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=85"
                  alt="Professional Tax Registration in India"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">21</p>
                <p className="text-white/60 text-xs">States Covered</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is Professional Tax?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                <strong>Professional Tax (PT)</strong> is a state-level tax levied on individuals earning income through employment, professions, trade, callings, or other means. It is authorised under <strong>Article 276</strong> of the Constitution of India and currently applicable in <strong>21 states</strong>.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                Employers are responsible for <strong>deducting PT</strong> from employees&apos; monthly salaries and depositing it with the state authority. Self-employed professionals pay PT directly. The maximum PT is <strong>₹2,500 per person per year</strong>, and it is fully deductible from income under <strong>Section 16(iii)</strong> of the Income Tax Act.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Non-compliance attracts penalties of up to <strong>10% per month</strong> on unpaid amounts. Early registration and consistent compliance is the only way to avoid these charges.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["State-Specific Slabs", "Employer & Employee Both Liable", "Max ₹2,500/Year", "IT Sec 16(iii) Deductible"].map((pt) => (
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

      {/* ── WHO NEEDS PT ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Who Needs This" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">
              Who Needs Professional Tax Registration?
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto">
              PT is mandatory for a wide range of employers and professionals in applicable states. Here&apos;s who needs to register.
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
              Benefits of PT Registration & Compliance
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto">
              Timely Professional Tax registration and compliance protects your business from penalties and brings genuine financial benefits.
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
            <Eyebrow label="Registration Process" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">
              Professional Tax Registration — Step by Step
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto">
              Our streamlined process gets your PT certificates issued quickly with zero errors.
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

            {/* DOCUMENTS REQUIRED */}
            <section>
              <Eyebrow label="Documents Required" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">
                Documents Needed for PT Registration
              </h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {requiredDocs.map((doc) => {
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
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle size={15} className="text-amber-500 shrink-0" />
                  <p className="text-dark text-xs leading-relaxed">
                    Documents required vary by state. Our team will provide a state-specific checklist once we know your location and business type.
                  </p>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section>
              <Eyebrow label="Timeline" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">
                PT Registration Timeline
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
                          <p className="text-[10px] text-muted mt-0.5">{stage.days}</p>
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
                    Most states issue the EC and RC within <strong>3–7 working days</strong> of application. Same-day acknowledgments are available in several states for online applications.
                  </p>
                </div>
              </div>
            </section>

            {/* WHAT YOU RECEIVE */}
            <section>
              <Eyebrow label="What You Receive" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">
                Deliverables from Company Avenue
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

            {/* PT STATES INFO */}
            <section>
              <Eyebrow label="State Coverage" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-6">
                States Where Professional Tax Applies
              </h2>
              <p className="text-muted text-sm mb-8 leading-relaxed">
                Professional Tax is a state subject and currently levied in 21 states. The slab rates, thresholds, due dates, and procedures vary significantly. We handle PT compliance across all applicable states.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-card">
                  <div className="relative rounded-2xl overflow-hidden aspect-video mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85"
                      alt="Professional Tax states in India compliance"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                  <p className="font-heading font-bold text-dark text-sm mb-3">Major PT States</p>
                  <div className="flex flex-wrap gap-2">
                    {["Maharashtra", "Karnataka", "West Bengal", "Tamil Nadu", "Andhra Pradesh", "Telangana", "Gujarat", "Kerala", "Odisha", "Assam"].map((state) => (
                      <span key={state} className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-xs font-heading font-semibold text-primary">
                        {state}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-heading font-semibold text-muted">
                      +11 more
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { state: "Maharashtra",    threshold: "₹7,500+/month",  max: "₹2,500/year",  freq: "Monthly/Annual" },
                    { state: "Karnataka",      threshold: "₹15,000+/month", max: "₹2,400/year",  freq: "Monthly" },
                    { state: "West Bengal",    threshold: "₹10,000+/month", max: "₹2,500/year",  freq: "Annual" },
                    { state: "Tamil Nadu",     threshold: "₹21,001+/month", max: "₹2,500/year",  freq: "Half-yearly" },
                    { state: "Andhra Pradesh", threshold: "₹15,000+/month", max: "₹2,500/year",  freq: "Monthly" },
                  ].map((row) => (
                    <div key={row.state} className="bg-slate-50 border border-slate-100 rounded-xl p-4 grid grid-cols-4 gap-2 text-center">
                      <div>
                        <p className="text-[10px] text-muted mb-0.5">State</p>
                        <p className="font-heading font-bold text-dark text-xs">{row.state}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted mb-0.5">Threshold</p>
                        <p className="font-heading font-semibold text-dark text-xs">{row.threshold}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted mb-0.5">Max PT</p>
                        <p className="font-heading font-semibold text-dark text-xs">{row.max}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted mb-0.5">Filing</p>
                        <p className="font-heading font-semibold text-dark text-xs">{row.freq}</p>
                      </div>
                    </div>
                  ))}
                  <p className="text-muted text-xs text-center mt-2">
                    Rates indicative. Verify with our team for exact current slabs.
                  </p>
                </div>
              </div>
            </section>

            {/* WHY COMPANY AVENUE */}
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Eyebrow label="Why Us" />
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">
                    Why Choose Company Avenue for PT?
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
                    { v: "21",    l: "PT States Served",  c: "bg-primary text-white" },
                    { v: "5,000+",l: "Businesses Helped", c: "bg-accent text-dark" },
                    { v: "15+",   l: "Years Experience",  c: "bg-slate-800 text-white" },
                    { v: "3–7",   l: "Days to Register",  c: "bg-green-600 text-white" },
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

            {/* FAQ */}
            <section itemScope itemType="https://schema.org/FAQPage">
              <div className="text-center mb-10">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl text-dark">
                  Frequently Asked Questions — Professional Tax
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

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-pt" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-pt)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Get Compliant Today" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Avoid PT Penalties.<br />Register in 3–7 Days.
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Professional Tax non-compliance costs 10% per month in penalties. Let Company Avenue Advisory handle your EC, RC, return filing, and ongoing compliance across all applicable states — so you can focus on running your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors"
              >
                Register for Professional Tax <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+919953719111"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Speak to a PT Expert
              </a>
            </div>
            <p className="text-white/40 text-xs mt-6">
              Starting at ₹1,999 • All 21 PT states covered • EC + RC registration included
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
