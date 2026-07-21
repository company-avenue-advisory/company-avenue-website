"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, Clock, Users, Building2, BadgeCheck,
  ShieldCheck, FileText, CreditCard, Fingerprint, Hash, Zap,
  CheckCircle, Plus, Minus, ArrowUpRight, Briefcase, Monitor,
  DollarSign, Headphones, UserCheck, LifeBuoy,
  MessageCircle, Globe, Award,
  TrendingUp, Receipt, PenLine, BookOpen, CalendarCheck,
  PiggyBank, Home, Handshake, Landmark,
} from "lucide-react";
import { faqs } from "@/lib/faqs/NidhiCompanyPage";

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

const quickFacts = [
  { icon: Clock,     label: "Timeline",         value: "30–45 Days" },
  { icon: Users,     label: "Min. Members",      value: "200 (within 1 yr)" },
  { icon: Users,     label: "Min. Directors",    value: "3 Directors" },
  { icon: DollarSign,label: "Min. Net Owned",    value: "₹10 Lakhs (NOF)" },
  { icon: BookOpen,  label: "Governed by",       value: "Nidhi Rules 2014" },
  { icon: Building2, label: "RBI Regulated",     value: "Exempt (Section 406)" },
];

const whoShouldRegister = [
  { icon: PiggyBank,   title: "Mutual Benefit Societies",    desc: "Groups that pool savings and lend among themselves." },
  { icon: Users,       title: "Community Savings Groups",    desc: "Neighborhood and locality-based thrift collectives." },
  { icon: Briefcase,   title: "Employee Co-operatives",      desc: "Workplace savings groups forming a mutual benefit vehicle." },
  { icon: Home,        title: "Rural Finance Groups",        desc: "Village-level savings and credit organizations." },
  { icon: Handshake,   title: "Thrift & Credit Societies",  desc: "Organized groups offering fixed deposits and loans to members." },
  { icon: Landmark,    title: "Housing Finance Micro-Groups",desc: "Member collectives for housing-related micro-financing." },
  { icon: TrendingUp,  title: "Savings Promotion Bodies",   desc: "Organizations encouraging the culture of saving in communities." },
  { icon: ShieldCheck, title: "Self-Help Groups Scaling Up",desc: "SHGs formalizing their operations under a corporate structure." },
];

const benefits = [
  { icon: PiggyBank,  title: "Accept Deposits from Members",   desc: "Collect fixed deposits, recurring deposits and savings from members legally." },
  { icon: DollarSign, title: "Lend Only to Members",           desc: "Provide secured loans — mortgage, gold or FD-backed — exclusively to members." },
  { icon: ShieldCheck,title: "RBI Exemption",                  desc: "Nidhi companies are exempt from core RBI provisions for NBFCs." },
  { icon: Zap,        title: "Low Setup Cost",                 desc: "Minimum capital of ₹10 lakhs — affordable for community groups." },
  { icon: Handshake,  title: "Community Trust & Proximity",   desc: "Members trust local Nidhi companies more than distant financial institutions." },
  { icon: BadgeCheck, title: "Government Recognition",        desc: "Officially recognised under the Companies Act and Nidhi Rules 2014." },
  { icon: TrendingUp, title: "Tax Benefits for Members",      desc: "Interest earned on deposits by members taxed favorably." },
  { icon: Globe,      title: "Perpetual Existence",           desc: "Nidhi company survives member changes with perpetual corporate existence." },
];

const registrationSteps = [
  { n: "01", title: "Consultation & Planning",    desc: "Understand your group's composition, geography and financial objectives." },
  { n: "02", title: "MOA with Nidhi Objects",     desc: "Draft MOA specifying that the primary object is cultivating savings among members." },
  { n: "03", title: "SPICe+ Incorporation",       desc: "File incorporation application with minimum 3 directors and 7 subscribers." },
  { n: "04", title: "Achieve 200 Members",        desc: "Within 1 year, enroll at least 200 members who each hold at least 10 shares." },
  { n: "05", title: "Net Owned Funds ≥ ₹10L",    desc: "Ensure NOF is at least ₹10 lakhs with minimum 1:20 NOF to deposit ratio." },
  { n: "06", title: "File NDH-1 Form",            desc: "File return of statutory compliances with MCA within 90 days of financial year end." },
  { n: "07", title: "MCA Declaration",            desc: "MCA verifies compliance and records Nidhi status in the MCA21 system." },
  { n: "08", title: "Begin Operations",           desc: "Open member accounts, accept deposits and disburse loans as per Nidhi Rules." },
];

const timelineStages = [
  { label: "Incorporation",  time: "Day 1–15" },
  { label: "200 Members",    time: "Within 1 yr" },
  { label: "₹10L NOF",       time: "Within 1 yr" },
  { label: "NDH-1 Filed",    time: "90 Days After FY" },
  { label: "RBI Exemption",  time: "Auto (if compliant)" },
  { label: "Full Operations",time: "Post NDH-1" },
];

const directorDocs = [
  { icon: CreditCard,  label: "PAN Card of all Directors" },
  { icon: Fingerprint, label: "Aadhaar Card of all Directors" },
  { icon: FileText,    label: "Passport-size Photographs" },
  { icon: Hash,        label: "Email & Mobile Numbers" },
  { icon: Building2,   label: "Residential Address Proof" },
  { icon: Globe,       label: "Digital Signature Certificate" },
];

const firmDocs = [
  { icon: PenLine,    label: "MOA with Nidhi objects clause" },
  { icon: FileText,   label: "AOA (Articles of Association)" },
  { icon: Zap,        label: "Registered Office Address Proof" },
  { icon: DollarSign, label: "Net Owned Funds Proof (within 1 yr)" },
];

const deliverables = [
  { icon: BadgeCheck,  label: "Certificate of Incorporation",  color: "text-primary bg-primary/8" },
  { icon: PenLine,     label: "Nidhi Status (NDH-1 Filed)",    color: "text-blue-600 bg-blue-50" },
  { icon: CreditCard,  label: "Company PAN & TAN",             color: "text-purple-600 bg-purple-50" },
  { icon: ShieldCheck, label: "RBI Exemption Confirmation",    color: "text-green-600 bg-green-50" },
  { icon: FileText,    label: "Member Register Template",      color: "text-orange-600 bg-orange-50" },
  { icon: CalendarCheck, label: "Compliance Calendar",        color: "text-teal-600 bg-teal-50" },
];

const whyUsPoints = [
  { icon: Award,       label: "15+ Years of Experience in NBFC & Nidhi Structures" },
  { icon: Building2,   label: "200+ Nidhi Companies Successfully Formed" },
  { icon: UserCheck,   label: "Expert CA & CS for Nidhi Compliance" },
  { icon: DollarSign,  label: "Fixed Transparent Pricing — Starting ₹14,999" },
  { icon: Zap,         label: "MOA Drafting with Correct Nidhi Objects" },
  { icon: Monitor,     label: "MCA SPICe+ Filing & NDH-1 Compliance Support" },
  { icon: LifeBuoy,    label: "Annual ROC & Income Tax Filing Support" },
  { icon: Headphones,  label: "Dedicated Compliance Manager for Nidhi Rules" },
];


const relatedServices = [
  { id: "private-limited-company", title: "Private Limited Company", desc: "Standard incorporation under Companies Act." },
  { id: "accounting-bookkeeping",  title: "Accounting Services",     desc: "Books, MIS and compliance statements." },
  { id: "roc-compliance",          title: "ROC Compliance",          desc: "Annual returns and event-based filings." },
  { id: "gst-registration",        title: "GST Registration",        desc: "GST compliance for your Nidhi Company." },
  { id: "pf-registration",         title: "PF Registration",         desc: "Employee provident fund registration." },
  { id: "income-tax-return",       title: "Income Tax Return",       desc: "Annual ITR filing for Nidhi Companies." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <span className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <p className="px-5 pb-4 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function NidhiCompanyPage() {
  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="nidhi-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#nidhi-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Nidhi Company Registration</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">India&apos;s Trusted Nidhi Company Experts</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Nidhi Company<br /><span className="text-primary">Registration in India</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Register your Nidhi Company under the Companies Act 2013 and Nidhi Rules 2014. We handle MOA drafting, SPICe+ filing, NDH-1 compliance and ongoing MCA filings — all in one streamlined package.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm">
                  Book Free Consultation <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111" className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all">
                  <Phone size={14} /> Talk to an Expert
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["30–45 Days Timeline", "RBI Exempt Structure", "NDH-1 Support", "Starting ₹14,999"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="relative">
              <div className="relative max-w-md mx-auto">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] overflow-hidden">
                  <div className="bg-primary px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center"><PiggyBank size={14} className="text-accent" /></div>
                      <div>
                        <p className="font-heading font-bold text-white text-xs">Nidhi Company Certificate</p>
                        <p className="text-white/50 text-[10px]">MCA — Nidhi Rules 2014</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-heading font-semibold bg-green-500/20 text-green-300 border border-green-400/30 px-2.5 py-1 rounded-full">● RBI Exempt</span>
                  </div>
                  <div className="relative w-full aspect-[4/3] bg-slate-50">
                    <Image src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=85"
                      alt="Nidhi company savings and community finance"
                      fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw" priority
                    />
                  </div>
                  <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div><p className="text-muted text-[10px]">Min. Net Owned Funds</p><p className="font-heading font-bold text-primary text-xs">₹10 Lakhs</p></div>
                    <div className="text-right"><p className="text-muted text-[10px]">Starting from</p><p className="font-heading font-bold text-dark text-xs">₹14,999</p></div>
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-5 top-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Processing Time</p>
                  <p className="font-heading font-bold text-primary text-sm">30–45 Days</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -left-5 bottom-12 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">RBI NBFC Exempt</p>
                  <p className="font-heading font-bold text-green-600 text-sm">Yes ✓</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickFacts.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.label} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:shadow-card hover:border-primary/10 transition-all group"
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

      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* WHAT IS */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <Eyebrow label="Overview" />
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">What is a Nidhi Company?</h2>
                  <p className="text-slate-500 text-base leading-relaxed mb-5">
                    A Nidhi Company is a unique type of company under <strong>Section 406 of the Companies Act 2013</strong> and governed by the <strong>Nidhi Rules 2014</strong>. Its primary purpose is to cultivate the habit of saving and thrift among its members and to receive deposits and lend money only among those members.
                  </p>
                  <p className="text-slate-500 text-base leading-relaxed mb-6">
                    Nidhi Companies function as mutual benefit societies — they are exempt from most RBI regulations applicable to NBFCs, making them the most accessible form of licensed financial institution for community groups, cooperatives and local savings bodies.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {["Governed by Nidhi Rules 2014", "RBI NBFC exempt", "Minimum 200 members in 1 year", "₹10 Lakh Net Owned Funds"].map(pt => (
                      <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <CheckCircle size={13} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-dark text-xs leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                    <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=85"
                      alt="Nidhi company community savings" fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                    <p className="font-heading font-bold text-2xl">Nidhi</p>
                    <p className="text-white/60 text-xs">Rules 2014</p>
                  </div>
                </div>
              </div>
            </section>

            {/* WHO SHOULD */}
            <section className="bg-slate-50 rounded-3xl p-10">
              <div className="text-center mb-12">
                <Eyebrow label="Ideal For" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Should Register a Nidhi Company?</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {whoShouldRegister.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                      className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors duration-300">
                        <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <p className="font-heading font-semibold text-dark text-sm mb-1">{item.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* BENEFITS */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Advantages" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Key Benefits of Nidhi Company</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                      className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/10 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                        <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-heading font-semibold text-dark text-sm mb-2">{b.title}</h3>
                      <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* PROCESS */}
            <section className="bg-slate-50 rounded-3xl p-10">
              <div className="text-center mb-12">
                <Eyebrow label="Process" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Registration Process</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {registrationSteps.map((step, i) => (
                  <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                    className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                      <span className="font-heading font-bold text-white text-xs">{step.n}</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-dark text-sm mb-1">{step.title}</h3>
                      <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* DOCUMENTS */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Checklist" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Documents Required</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-heading font-bold text-dark text-base mb-5 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center"><Users size={14} className="text-primary" /></span>
                    For Directors
                  </h3>
                  <div className="space-y-3">
                    {directorDocs.map(d => { const Icon = d.icon; return (
                      <div key={d.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <Icon size={15} className="text-primary shrink-0" />
                        <span className="text-dark text-sm">{d.label}</span>
                      </div>
                    ); })}
                  </div>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-heading font-bold text-dark text-base mb-5 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center"><Building2 size={14} className="text-primary" /></span>
                    For the Company
                  </h3>
                  <div className="space-y-3">
                    {firmDocs.map(d => { const Icon = d.icon; return (
                      <div key={d.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <Icon size={15} className="text-primary shrink-0" />
                        <span className="text-dark text-sm">{d.label}</span>
                      </div>
                    ); })}
                  </div>
                  <div className="mt-5 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <p className="text-amber-800 text-xs leading-relaxed">
                      <strong>Important:</strong> Within 1 year of incorporation you must have 200 members, ₹10L NOF, and file NDH-1. Plan your member drive before registration.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section className="bg-slate-50 rounded-3xl p-10">
              <div className="text-center mb-12">
                <Eyebrow label="Timeline" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Registration & Compliance Timeline</h2>
                <p className="text-muted mt-3 text-sm">Incorporation in 30–45 days; full Nidhi status achieved within 1 year</p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-0">
                {timelineStages.map((stage, i) => (
                  <div key={stage.label} className="flex md:flex-col items-center gap-3 md:gap-0 flex-1">
                    <div className="flex flex-col md:flex-row items-center gap-0 flex-1 w-full">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">{i + 1}</div>
                        <div className="md:hidden w-px h-8 bg-slate-200 mt-2" />
                      </div>
                      {i < timelineStages.length - 1 && <div className="hidden md:block h-px flex-1 bg-slate-200 mx-2" />}
                    </div>
                    <div className="text-center md:mt-3 pb-4 md:pb-0">
                      <p className="font-heading font-semibold text-dark text-xs">{stage.label}</p>
                      <p className="text-muted text-[10px] mt-0.5">{stage.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DELIVERABLES */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Deliverables" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">What You Receive</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {deliverables.map((d, i) => { const Icon = d.icon; return (
                  <motion.div key={d.label} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                    className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-card transition-all"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${d.color}`}><Icon size={16} /></div>
                    <span className="font-heading font-semibold text-dark text-sm leading-snug">{d.label}</span>
                  </motion.div>
                ); })}
              </div>
            </section>

            {/* WHY US */}
            <section className="bg-primary rounded-3xl p-10 text-white">
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
                  <span className="w-6 h-px bg-accent" />Why Choose Us<span className="w-6 h-px bg-accent" />
                </span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-white">Why Company Avenue?</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {whyUsPoints.map((pt) => { const Icon = pt.icon; return (
                  <div key={pt.label} className="flex items-center gap-3 bg-white/10 rounded-2xl p-4">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0"><Icon size={16} className="text-accent" /></div>
                    <span className="font-heading font-semibold text-white text-sm leading-snug">{pt.label}</span>
                  </div>
                ); })}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-3 max-w-3xl mx-auto">
                {faqs.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
              </div>
            </section>

            {/* RELATED */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Explore More" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Related Services</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedServices.map((s, i) => (
                  <motion.div key={s.id} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
                    <Link href={"/services/" + s.id} className="flex items-center justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all group">
                      <div>
                        <p className="font-heading font-semibold text-dark text-sm mb-1">{s.title}</p>
                        <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
                      </div>
                      <ArrowUpRight size={16} className="text-muted group-hover:text-primary shrink-0 transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <div className="hidden xl:block sticky top-24 space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
              <p className="font-heading font-bold text-dark text-base mb-1">Register Your Nidhi Company</p>
              <p className="text-muted text-xs mb-4 leading-relaxed">Expert CA assistance for Nidhi incorporation and NDH-1 compliance.</p>
              <div className="space-y-2 mb-5">
                {["Free Expert Consultation", "MOA with Nidhi Objects", "SPICe+ Filing", "NDH-1 Annual Compliance"].map(pt => (
                  <div key={pt} className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-primary shrink-0" />
                    <span className="text-dark text-xs">{pt}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <a href="tel:+919953719111" className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors">
                  <Phone size={13} /> Call Now
                </a>
                <Link href="/contact" className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors">
                  Book Consultation
                </Link>
                <a href="https://wa.me/919953719111" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors">
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {[{ v: "30–45", l: "Days Timeline" }, { v: "200+", l: "Nidhis Formed" }, { v: "15+", l: "Years Exp." }, { v: "₹14,999", l: "Starting Price" }].map(s => (
                  <div key={s.l} className="text-center">
                    <p className="font-heading font-bold text-primary text-lg leading-none">{s.v}</p>
                    <p className="text-muted text-[10px] mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">Launch Your Community Finance Company</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Nidhi Company — India&apos;s simplest RBI-exempt financial institution. Expert CA support. Starting at ₹14,999.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors shadow-lg">
                Get Started Today <ArrowRight size={16} />
              </Link>
              <a href="tel:+919953719111" className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/10 transition-colors">
                <Phone size={15} /> +91 99537 19111
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
