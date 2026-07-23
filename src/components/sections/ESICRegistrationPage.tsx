"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, CheckCircle, Plus, Minus,
  MessageCircle, FileText, CreditCard, Fingerprint,
  Building2, Users, Globe, Briefcase, Monitor, Award,
  DollarSign, Headphones, UserCheck, ShieldCheck,
  BadgeCheck, AlertCircle, Info, Bell, Search,
  TrendingUp, BookOpen, CalendarCheck, Repeat2,
  AlertTriangle, Landmark, Wallet, UserCircle, Receipt,
  ClipboardList, BarChart3, HeartHandshake, Heart,
  Scale, Clock, Shield, Stethoscope, Baby, Siren,
  BriefcaseMedical, Hospital, User, Hash,
} from "lucide-react";
import { faqs } from "@/lib/faqs/ESICRegistrationPage";

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
  { icon: Scale,         label: "Governing Act",    value: "ESI Act, 1948" },
  { icon: Users,         label: "Threshold",        value: "10+ Employees" },
  { icon: Wallet,        label: "Contribution",     value: "3.25% + 0.75%" },
  { icon: Landmark,      label: "Authority",        value: "ESIC" },
  { icon: Heart,         label: "Coverage",         value: "Medical + Sickness + Maternity" },
  { icon: CalendarCheck, label: "Due Date",         value: "15th of Next Month" },
];

const whoNeeds = [
  { icon: Building2,      title: "Factories with 10+ Employees",        desc: "All factories registered under the Factories Act with 10 or more workers must register under ESI Act 1948." },
  { icon: Briefcase,      title: "Shops & Establishments",               desc: "Shops, commercial establishments, and offices in notified areas with 10+ employees earning ≤₹21,000/month." },
  { icon: UserCheck,      title: "Restaurants & Food Outlets",           desc: "Hotels, restaurants, dhabas, canteens, and catering firms with 10+ employees must obtain ESIC registration." },
  { icon: ClipboardList,  title: "Construction Companies",               desc: "Building contractors and construction firms with 10+ labourers at the worksite need ESIC registration." },
  { icon: Monitor,        title: "IT Companies",                         desc: "IT firms, BPOs, and tech establishments with 10+ employees must comply with ESIC in notified areas." },
  { icon: Stethoscope,    title: "Hospitals & Nursing Homes",            desc: "Private hospitals, clinics, and nursing homes with 10+ staff (including healthcare workers) need ESIC." },
  { icon: Users,          title: "Any Business Crossing 10+ Employees",  desc: "Once threshold is crossed with at least some employees earning ≤₹21,000/month, registration is mandatory." },
  { icon: BookOpen,       title: "Educational Institutions",             desc: "Private schools, colleges, and coaching institutes with 10+ employees need to register under ESI." },
];

const keyBenefits = [
  { icon: Stethoscope,   title: "Cashless Medical Treatment",           desc: "Insured employees and their dependants get cashless treatment at ESIC empanelled hospitals across India." },
  { icon: Baby,          title: "Maternity Benefit (26 Weeks Paid)",    desc: "Women employees get 26 weeks of paid maternity leave for the first two children under ESI Act." },
  { icon: Heart,         title: "Sickness Benefit (70% Wages)",         desc: "Certified sick employees receive 70% of average daily wages for up to 91 days in two consecutive benefit periods." },
  { icon: ShieldCheck,   title: "Disability Benefit",                   desc: "Temporary or permanent disablement due to employment injury entitles employees to disablement benefit." },
  { icon: HeartHandshake,title: "Dependent Benefit",                    desc: "Family dependants of an employee who dies due to employment injury receive monthly dependent benefit." },
  { icon: Shield,        title: "Avoid ₹5,000/Day Penalty",            desc: "Non-registration or delayed compliance under ESI Act attracts severe penalties and prosecution." },
  { icon: Users,         title: "Employee Welfare",                     desc: "Demonstrates commitment to employee wellbeing, improving morale, trust, and reducing attrition." },
  { icon: DollarSign,    title: "No Separate Medical Insurance Cost",   desc: "ESIC replaces the need for a separate group mediclaim policy, reducing HR costs significantly." },
];

const processSteps = [
  { n: "01", title: "ESIC Portal Registration",        desc: "Register the establishment on the ESIC portal (esic.gov.in) with business and employer details." },
  { n: "02", title: "Employee IP Number Generation",   desc: "Register each eligible employee on the ESIC portal to generate their unique Insurance Person (IP) number." },
  { n: "03", title: "Monthly Contribution Calculation",desc: "Calculate ESIC contribution: 3.25% employer + 0.75% employee on gross wages of employees earning ≤₹21,000." },
  { n: "04", title: "Challan Payment by 15th",         desc: "Pay the ESIC challan online through net banking or NEFT before the 15th of the following month." },
  { n: "05", title: "Half-Yearly Returns Filing",      desc: "File half-yearly returns: April–September (filed by November 11) and October–March (filed by May 11)." },
  { n: "06", title: "ESIC Pehchan Cards",              desc: "Facilitate generation of ESIC health cards (Pehchan Cards) for all insured employees and their families." },
  { n: "07", title: "Medical Claim Support",           desc: "Guide employees through the process of availing ESIC medical benefits at panel hospitals." },
  { n: "08", title: "Annual Compliance Check",         desc: "Annual review of employee headcount, wage changes, and ESIC coverage applicability changes." },
];

const requiredDocs = [
  { icon: FileText,     label: "Business Registration Certificate" },
  { icon: CreditCard,   label: "PAN Card of the Establishment" },
  { icon: ClipboardList,label: "List of Employees with Salary & Aadhaar" },
  { icon: Landmark,     label: "Bank Account Details (Cancelled Cheque)" },
  { icon: BadgeCheck,   label: "Digital Signature of Authorised Signatory" },
  { icon: Building2,    label: "Address Proof of Establishment" },
  { icon: Fingerprint,  label: "Aadhaar of All Eligible Employees" },
  { icon: Receipt,      label: "GST Certificate or Udyam Certificate" },
];

const timelineStages = [
  { label: "Documents Collected",     icon: FileText },
  { label: "ESIC Registration",       icon: Landmark },
  { label: "Employer Code Issued",    icon: BadgeCheck },
  { label: "IP Numbers Generated",    icon: Hash },
  { label: "Pehchan Cards Issued",    icon: Heart },
  { label: "Ongoing Compliance",      icon: Repeat2 },
];

const deliverables = [
  "ESIC Registration Number (Employer Code)",
  "Employee IP Numbers for All Insured Staff",
  "ESIC Pehchan Health Cards for Employees",
  "Monthly Contribution Payment Receipts",
  "Half-Yearly Return Acknowledgments",
  "Guidance on Employee Medical Claim Process",
];

const whyUsPoints = [
  { icon: Award,        label: "15+ Years of ESIC Compliance Experience" },
  { icon: Shield,       label: "Zero-Penalty Guarantee — Always On Time" },
  { icon: Headphones,   label: "Dedicated ESIC Relationship Manager" },
  { icon: Monitor,      label: "100% Digital, ESIC Portal-Based Process" },
  { icon: ClipboardList,label: "Accurate Half-Yearly Return Filing" },
  { icon: DollarSign,   label: "Transparent Fixed Monthly Pricing" },
  { icon: Bell,         label: "Return Deadline Reminders Included" },
  { icon: UserCheck,    label: "Employee Pehchan Card Assistance" },
];

const relatedServices = [
  { id: "pf-registration",       title: "PF Registration",              desc: "EPF compliance for 20+ employee establishments." },
  { id: "professional-tax",      title: "Professional Tax",             desc: "State-level professional tax registration and filing." },
  { id: "payroll-management",    title: "Payroll Management",           desc: "End-to-end payroll processing with statutory compliance." },
  { id: "accounting-bookkeeping",title: "Accounting & Bookkeeping",     desc: "Accurate books maintained by qualified accountants." },
  { id: "private-limited-company",title: "Private Limited Company",     desc: "Incorporate your business before labour law compliance." },
  { id: "gst-registration",      title: "GST Registration",             desc: "GSTIN registration and GST return filing support." },
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
        <p className="font-heading font-bold text-dark text-base mb-1">Register ESIC Today</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Our ESI experts handle registration, employee IP numbers, monthly contributions, and half-yearly returns.</p>
        <div className="space-y-2 mb-5">
          {["ESIC Employer Registration", "IP Numbers for Employees", "Monthly ECR Contribution", "Half-Yearly Returns"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="bg-primary/5 rounded-xl p-3 mb-4">
          <p className="text-xs text-muted">Registration starts from</p>
          <p className="font-heading font-bold text-primary text-xl">₹2,999</p>
          <p className="text-[10px] text-muted">+ ₹1,499/month ongoing compliance</p>
        </div>
        <div className="space-y-2">
          <a href="tel:+919953719111" data-track="call"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          ><Phone size={13} /> Call Now</a>
          <Link href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          >Book Consultation</Link>
          <a href="https://wa.me/919953719111" data-track="whatsapp" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          ><MessageCircle size={13} /> WhatsApp</a>
        </div>
      </div>
      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Monthly Due Date Alert</p>
        </div>
        <p className="text-white/60 text-xs mb-1 leading-relaxed">ESIC challan due: <strong className="text-white">15th of every month</strong></p>
        <p className="text-white/60 text-xs leading-relaxed">Half-yearly returns: Nov 11 &amp; May 11 annually.</p>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "2,000+", l: "ESIC Registrations" }, { v: "100%", l: "Timely Filing" }, { v: "15+", l: "Years Exp." }, { v: "24h", l: "Response" }].map(s => (
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
export function ESICRegistrationPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="esic-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#esic-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link><span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link><span>/</span>
            <span className="text-dark">ESIC Registration & Returns</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-green-700 text-xs font-heading font-semibold">Labour Law Compliance Experts • ESIC Registered</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                ESIC Registration &amp;<br /><span className="text-primary">Returns Filing Service</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Mandatory for every employer with 10+ employees earning ≤₹21,000/month. Register on the ESIC portal, generate IP numbers, and file monthly contributions and half-yearly returns — fully managed by our compliance experts.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Register ESIC Now <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111" data-track="call"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Free Consultation
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["ESIC Portal Registration", "IP Number Generation", "Monthly Contributions", "Zero Penalty Promise"].map(pt => (
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
                      <Heart size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">ESIC Registration at a Glance</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Compliant
                  </span>
                </div>
                <div className="space-y-2.5 mb-5">
                  {[
                    { label: "Governing Act",       value: "ESI Act, 1948" },
                    { label: "Employee Threshold",  value: "10+ Employees" },
                    { label: "Wage Ceiling",        value: "≤ ₹21,000/month" },
                    { label: "Employer Rate",       value: "3.25% of Gross Wages" },
                    { label: "Employee Rate",       value: "0.75% of Gross Wages" },
                    { label: "Payment Due",         value: "15th of Next Month" },
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

      {/* ── WHAT IS ESIC REGISTRATION ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)] relative">
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85"
                  alt="ESIC registration and employee state insurance compliance"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">2,000+</p>
                <p className="text-white/60 text-xs">ESIC Registrations Done</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is ESIC Registration?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                <strong>ESIC (Employee State Insurance Corporation) Registration</strong> is mandatory for every establishment with 10 or more employees earning ≤₹21,000/month. Governed by the <strong>Employees&apos; State Insurance Act, 1948</strong>, it provides comprehensive social security — medical care, sickness benefits, maternity benefits, disability coverage, and more.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                Employers contribute <strong>3.25% of gross wages</strong> and employees contribute <strong>0.75%</strong>, totalling 4% of gross wages. Monthly contributions must be paid by the <strong>15th of the following month</strong>, and <strong>half-yearly returns</strong> are filed twice a year. Non-compliance attracts penalties of ₹5,000 per day and prosecution.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Mandatory for 10+ employees", "4% total contribution", "Cashless hospital treatment", "Maternity + sickness cover"].map(pt => (
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
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Needs ESIC Registration?</h2>
            <p className="text-muted text-base max-w-2xl mx-auto mt-3">Any establishment in notified areas with 10 or more employees — at least some earning ≤₹21,000/month — must register under the ESI Act.</p>
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
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Benefits of ESIC Registration</h2>
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
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">ESIC Registration &amp; Compliance — Step by Step</h2>
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
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Documents Required for ESIC Registration</h2>
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
                  <p className="text-dark text-xs leading-relaxed">All employee documents including Aadhaar are required for IP number generation. Company Avenue will prepare and submit the ESIC Form 1 (Employer&apos;s Registration Form) and Form 1A (Family Declaration) on your behalf.</p>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section>
              <Eyebrow label="Timeline" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">ESIC Registration Timeline</h2>
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
                    { label: "IP Number Generation",    value: "Immediate on Portal" },
                    { label: "Half-Yearly Returns",     value: "Nov 11 & May 11" },
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
              <p className="text-muted text-sm mb-8">Upon ESIC registration and employee setup, you receive the following from Company Avenue Advisory.</p>
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

            {/* ESIC CONTRIBUTION BREAKDOWN */}
            <section>
              <Eyebrow label="Contribution Details" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">ESIC Contribution Breakdown</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <User size={15} className="text-blue-600" />
                      </div>
                      <p className="font-heading font-bold text-dark text-base">Employee Contribution</p>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { label: "ESIC Contribution",   value: "0.75% of Gross Wages", highlight: true },
                        { label: "Wage Ceiling",        value: "₹21,000/month (₹25,000 for PwD)", highlight: false },
                        { label: "Minimum Wage Exemption", value: "< ₹176/day — NIL", highlight: false },
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
                        { label: "ESIC Contribution",      value: "3.25% of Gross Wages", highlight: true },
                        { label: "New Registered Establishments", value: "0% for first 3 years*", highlight: false },
                        { label: "Total ESIC Rate",         value: "4.00% of Gross Wages", highlight: false },
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
                  <p className="text-dark text-xs leading-relaxed">*New establishments in certain notified industries may get concessional employer contribution of 0% for the first 3 years. ESIC contributions are calculated on <strong>gross wages</strong> (unlike PF which is on basic). An example: for ₹15,000 gross wages — employer pays ₹487.50 and employee pays ₹112.50.</p>
                </div>
              </div>
            </section>

            {/* ESIC BENEFITS DETAIL */}
            <section>
              <Eyebrow label="Employee Benefits" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">ESIC Benefits for Employees &amp; Dependants</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    icon: Stethoscope, color: "bg-blue-50 border-blue-200",
                    title: "Medical Benefit", iconColor: "text-blue-600",
                    desc: "Full medical care for insured employees and their families. OPD, specialist consultation, hospitalisation, surgery, and diagnostic tests at ESIC hospitals and panel clinics — all cashless.",
                  },
                  {
                    icon: Heart, color: "bg-red-50 border-red-200",
                    title: "Sickness Benefit", iconColor: "text-red-500",
                    desc: "70% of average daily wages paid for up to 91 days in two consecutive benefit periods per year when certified sick. Extended sickness benefit (up to 2 years) for specified long-term ailments.",
                  },
                  {
                    icon: Baby, color: "bg-pink-50 border-pink-200",
                    title: "Maternity Benefit", iconColor: "text-pink-600",
                    desc: "26 weeks of fully paid maternity leave (for first two children), 12 weeks for third child. 6 weeks for miscarriage or MTP. Confinement expenses also covered.",
                  },
                  {
                    icon: ShieldCheck, color: "bg-green-50 border-green-200",
                    title: "Disablement Benefit", iconColor: "text-green-600",
                    desc: "Temporary disablement: 90% of wages till recovery. Permanent disablement: lifelong pension proportionate to degree of disablement, assessed by ESIC medical board.",
                  },
                  {
                    icon: HeartHandshake, color: "bg-purple-50 border-purple-200",
                    title: "Dependent Benefit", iconColor: "text-purple-600",
                    desc: "Monthly pension to dependants of insured employees who die due to employment injury. Widow gets 3/5th of benefit, children get 2/5th equally split.",
                  },
                  {
                    icon: Award, color: "bg-amber-50 border-amber-200",
                    title: "Funeral Expenses", iconColor: "text-amber-600",
                    desc: "Lump sum of ₹15,000 payable to eldest surviving member or person performing last rites of a deceased insured employee.",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className={`border rounded-2xl p-5 ${item.color}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0">
                          <Icon size={16} className={item.iconColor} />
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
            </section>

            {/* WHY COMPANY AVENUE */}
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Eyebrow label="Why Us" />
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">Why Choose Company Avenue for ESIC Compliance?</h2>
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
                    { v: "2,000+", l: "ESIC Registrations", c: "bg-primary text-white" },
                    { v: "100%",   l: "On-Time Returns",     c: "bg-accent text-dark" },
                    { v: "15+",    l: "Years Experience",    c: "bg-slate-800 text-white" },
                    { v: "24 hrs", l: "Response Time",       c: "bg-green-600 text-white" },
                  ].map(s => (
                    <motion.div key={s.l} whileHover={{ y: -4 }} className={`${s.c} rounded-2xl p-6 text-center shadow-card`}>
                      <p className="font-heading font-bold text-3xl leading-none mb-1">{s.v}</p>
                      <p className="text-xs opacity-80 leading-snug">{s.l}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* PENALTIES */}
            <section>
              <Eyebrow label="Penalties" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">Penalties for ESIC Non-Compliance</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: AlertCircle,   title: "Non-Registration Penalty",  desc: "₹5,000 per day for every day of delay in registering after crossing the 10-employee threshold under Section 85 of ESI Act.", color: "bg-red-50 border-red-200" },
                  { icon: Clock,         title: "Interest on Delayed Payment",desc: "12% per annum on late contribution payments plus damages ranging from 5% to 25% depending on the duration of delay.", color: "bg-orange-50 border-orange-200" },
                  { icon: AlertTriangle, title: "Return Non-Filing Penalty",  desc: "Failure to file half-yearly returns by Nov 11 or May 11 invites prosecution. Penalties also apply for incorrect returns.", color: "bg-amber-50 border-amber-200" },
                  { icon: Search,        title: "ESIC Inspection Risk",       desc: "Social Security Officers can inspect records without notice. Non-maintenance of Form 6 and wages register attracts prosecution.", color: "bg-yellow-50 border-yellow-200" },
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
                  <p className="text-white text-sm font-heading font-semibold">Stay penalty-free — register today and let us handle all ESIC compliance.</p>
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
                <h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions — ESIC Registration</h2>
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
            <defs><pattern id="cta-esic" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#cta-esic)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Get Started Today" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Register ESIC &amp; Protect<br />Your Employees
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Company Avenue Advisory manages your complete ESIC compliance — from employer registration and employee IP number generation to monthly contributions, Pehchan card issuance, and half-yearly return filing. Give your employees comprehensive health coverage while staying penalty-free.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-accent/90 transition-colors"
              >
                Register ESIC Now <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111" data-track="call"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Speak to an ESIC Expert
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
