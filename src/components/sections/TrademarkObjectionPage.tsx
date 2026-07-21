"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, CheckCircle, Plus, Minus,
  MessageCircle, AlertTriangle, FileText, ShieldCheck,
  BadgeCheck, Bell, RefreshCcw, Globe, Monitor, Award,
  DollarSign, Headphones, Users, Briefcase, Search,
  TrendingUp, BookOpen, CalendarCheck, PenLine, Repeat2,
  AlertCircle, Info, Gavel, Scale, Clock, XCircle,
  ClipboardList, Layers, UserCheck, LifeBuoy, Hash,
} from "lucide-react";
import { faqs } from "@/lib/faqs/TrademarkObjectionPage";

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
  { icon: Clock,          label: "Stage",          value: "Post-Examination" },
  { icon: Gavel,          label: "Authority",       value: "Trade Marks Registry" },
  { icon: Bell,           label: "Deadline",        value: "30 Days" },
  { icon: Scale,          label: "Hearing",         value: "If Reply Insufficient" },
  { icon: AlertTriangle,  label: "Risk",            value: "Abandonment" },
  { icon: FileText,       label: "Form",            value: "TM-M" },
];

const whoNeeds = [
  { icon: FileText,     title: "Objection Recipients",          desc: "Any applicant who received an examination report objection from the Trade Marks Registry." },
  { icon: Clock,        title: "Pending Applicants",            desc: "Businesses with trademark applications currently pending examination or awaiting decision." },
  { icon: Search,       title: "Cited Mark Conflicts",          desc: "Companies whose marks are cited as confusingly similar to existing registered trademarks." },
  { icon: AlertCircle,  title: "Sec 9 Absolute Grounds",        desc: "Marks refused for being descriptive, generic, deceptive, or offensive under Section 9 grounds." },
  { icon: Scale,        title: "Sec 11 Relative Grounds",       desc: "Marks refused for conflicting with existing registered or well-known marks under Section 11." },
  { icon: PenLine,      title: "Descriptive Mark Objections",   desc: "Applicants whose marks are considered too descriptive of the goods or services they offer." },
  { icon: Hash,         title: "Phonetic Similarity Cases",     desc: "Applicants facing objections based on phonetic or visual similarity to existing trademarks." },
  { icon: Award,        title: "Well-Known Mark Conflicts",     desc: "Applicants whose marks conflict with well-known or famous trademarks in the same category." },
];

const benefits = [
  { icon: DollarSign,   title: "Save ₹9,000+ Filing Fee",          desc: "A professional reply prevents your application from being abandoned, saving the initial registration investment." },
  { icon: ShieldCheck,  title: "Keep Application Alive",            desc: "Filing a timely and well-argued reply maintains the trademark application in active status." },
  { icon: Scale,        title: "Expert Legal Arguments",            desc: "Our attorneys craft precise counter-statements addressing each ground of objection with legal authority." },
  { icon: Search,       title: "Citation Removal Request",          desc: "We file targeted requests to remove conflicting citations that block your trademark's progress." },
  { icon: ClipboardList,title: "Concurrent Use Affidavits",         desc: "We draft honest concurrent use affidavits supporting long prior use of your mark in the market." },
  { icon: Gavel,        title: "Hearing Representation",            desc: "Our experts attend the oral hearing before the Trade Marks Registrar and argue your case professionally." },
  { icon: TrendingUp,   title: "Higher Success Rate",               desc: "Professionally drafted replies achieve 60–70% success rate compared to DIY or no-reply approaches." },
  { icon: BadgeCheck,   title: "Brand Protection Continuity",       desc: "A successful reply keeps your trademark application moving toward registration and brand exclusivity." },
];

const processSteps = [
  { n: "01", title: "Review Examination Report",      desc: "Obtain and carefully read the examination report to understand the specific grounds of objection raised." },
  { n: "02", title: "Analyze Grounds of Objection",   desc: "Identify whether objections are under Sec 9 (absolute grounds) or Sec 11 (relative/conflicting marks)." },
  { n: "03", title: "Research Conflicting Citations",  desc: "Investigate cited marks thoroughly — their registration status, goods/services scope, and phonetic similarity." },
  { n: "04", title: "Prepare Legal Counter-Statement", desc: "Draft detailed legal arguments addressing each objection ground with supporting case law and precedents." },
  { n: "05", title: "Compile Supporting Evidence",    desc: "Gather invoices, packaging samples, photographs, and advertising materials proving prior use and distinctiveness." },
  { n: "06", title: "File TM-M Reply on Portal",      desc: "Submit the complete objection reply via the official IP India trademark portal before the 30-day deadline." },
  { n: "07", title: "Attend Hearing if Required",     desc: "If the Registry is not satisfied with the written reply, attend the oral hearing before the Registrar." },
  { n: "08", title: "Await Registry Decision",        desc: "Monitor the application status for acceptance (publication in Trademark Journal) or further decision." },
];

const requiredDocs = [
  { icon: FileText,       label: "Original Examination Report" },
  { icon: ClipboardList,  label: "Evidence of Prior Use (Invoices)" },
  { icon: Layers,         label: "Packaging and Product Photos" },
  { icon: PenLine,        label: "Affidavit of Concurrent Use (if needed)" },
  { icon: Search,         label: "Trademark Class Comparison Analysis" },
  { icon: Scale,          label: "Similar Mark Distinction Arguments" },
  { icon: Briefcase,      label: "Company / Brand Credentials" },
  { icon: BadgeCheck,     label: "Power of Attorney (Form TM-48)" },
];

const timelineStages = [
  { label: "Examination Report Received", icon: FileText,   sub: "Day 0" },
  { label: "Objection Analysis",          icon: Search,     sub: "Days 1–3" },
  { label: "Reply Drafted",               icon: PenLine,    sub: "Days 4–12" },
  { label: "Evidence Compiled",           icon: ClipboardList, sub: "Days 13–20" },
  { label: "TM-M Filed",                  icon: BadgeCheck, sub: "By Day 28" },
  { label: "Decision / Hearing",          icon: Gavel,      sub: "6–18 Months" },
];

const deliverables = [
  { icon: FileText,       title: "Written Objection Reply (TM-M)",   desc: "A comprehensive legal counter-statement addressing all grounds of objection point by point." },
  { icon: ClipboardList,  title: "Evidence Bundle",                   desc: "Organized compilation of prior use evidence, invoices, photos, and brand credentials." },
  { icon: Gavel,          title: "Hearing Representation",            desc: "Professional representation at oral hearings before the Trade Marks Registrar (if required)." },
  { icon: Monitor,        title: "Status Tracking",                   desc: "Continuous monitoring of application status and timely updates on Registry decisions." },
];

const whyUsPoints = [
  { icon: Award,        label: "15+ Years Trademark Law Experience" },
  { icon: Scale,        label: "Expert Sec 9 & Sec 11 Objection Handling" },
  { icon: Search,       label: "Thorough Cited Mark Research & Analysis" },
  { icon: FileText,     label: "Professional TM-M Counter-Statement Drafting" },
  { icon: Gavel,        label: "Hearing Representation Before Registrar" },
  { icon: Clock,        label: "Guaranteed Filing Before 30-Day Deadline" },
  { icon: TrendingUp,   label: "60–70% Success Rate with Expert Reply" },
  { icon: Headphones,   label: "24-Hour Response & Client Communication" },
];

const relatedServices = [
  { id: "trademark-registration",  title: "Trademark Registration",    desc: "File your trademark application from scratch." },
  { id: "trademark-renewal",       title: "Trademark Renewal",         desc: "Renew your registered trademark every 10 years." },
  { id: "copyright-registration",  title: "Copyright Registration",    desc: "Protect your creative works and content." },
  { id: "patent-registration",     title: "Patent Registration",       desc: "Secure invention rights and technical IP." },
  { id: "design-registration",     title: "Design Registration",       desc: "Protect the unique visual design of products." },
  { id: "msme-registration",       title: "MSME Registration",         desc: "Lower trademark fees with Udyam certificate." },
];


/* ── FAQ Item ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <span itemProp="name" className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
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
        <p className="font-heading font-bold text-dark text-base mb-1">Reply to Your Objection</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Expert legal reply drafted and filed within 30-day deadline.</p>
        <div className="bg-primary/5 rounded-xl p-3 flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted">Starting from</p>
            <p className="font-heading font-bold text-primary text-xl">₹4,999</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Success Rate</p>
            <p className="font-heading font-bold text-green-600 text-xl">60–70%</p>
          </div>
        </div>
        <div className="space-y-2 mb-5">
          {["Examination Report Analysis", "Legal Counter-Statement", "Evidence Bundle Prep", "TM-M Filing on Portal", "Hearing Representation"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <a href="tel:+919953719111"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          ><Phone size={13} /> Call Now</a>
          <Link href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          >Book Consultation</Link>
          <a href="https://wa.me/919953719111" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          ><MessageCircle size={13} /> WhatsApp</a>
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={14} className="text-amber-600" />
          <p className="font-heading font-semibold text-dark text-sm">Deadline Alert</p>
        </div>
        <p className="text-muted text-xs leading-relaxed mb-3">Trademark objection replies must be filed within <strong className="text-dark">30 days</strong> of the examination report date. Don&apos;t miss the deadline.</p>
        <Link href="/contact"
          className="block text-center w-full py-2.5 bg-amber-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-amber-600 transition-colors"
        >File Before Deadline</Link>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "500+", l: "Objections Handled" }, { v: "65%", l: "Avg. Success Rate" }, { v: "15+", l: "Years Exp." }, { v: "30d", l: "Deadline Met" }].map(s => (
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
export function TrademarkObjectionPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="obj-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#obj-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link><span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link><span>/</span>
            <span className="text-dark">Trademark Objection Reply</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">Trademark Objection Experts • Save Your Application</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Trademark Objection<br /><span className="text-primary">Reply Service</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Received a trademark examination report? Don&apos;t let your application lapse. Our IP attorneys draft a strong legal counter-statement and file your TM-M reply before the 30-day deadline.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  File My Objection Reply <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Free Expert Consultation
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["30-Day Deadline Guaranteed", "Legal Counter-Statement", "Hearing Representation", "60–70% Success Rate"].map(pt => (
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
                      <Scale size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">Objection Reply at a Glance</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />Act Now
                  </span>
                </div>
                <div className="space-y-2.5 mb-5">
                  {[
                    { label: "Stage",          value: "Post-Examination" },
                    { label: "Reply Form",     value: "TM-M" },
                    { label: "Deadline",       value: "30 Days" },
                    { label: "Authority",      value: "Trade Marks Registry" },
                    { label: "Success Rate",   value: "60–70% (Expert Reply)" },
                    { label: "Risk",           value: "Abandonment if No Reply" },
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
                    <p className="text-xs text-muted">Reply service from</p>
                    <p className="font-heading font-bold text-primary text-xl">₹4,999</p>
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

      {/* ── WHAT IS TRADEMARK OBJECTION ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=85"
                  alt="Trademark objection reply legal process"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">500+</p>
                <p className="text-white/60 text-xs">Objections Resolved</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is a Trademark Objection?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                A <strong>trademark objection</strong> is raised by the Trade Marks Registry in an <strong>Examination Report</strong> when the examiner finds issues with a trademark application. The applicant must file a formal reply within <strong>30 days</strong> to save the application from being deemed abandoned.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Objections can be based on <strong>absolute grounds</strong> (Section 9 — descriptive, generic, or deceptive marks) or <strong>relative grounds</strong> (Section 11 — conflicting with existing registered trademarks). A well-crafted professional reply is essential to protect your brand investment.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Section 9 — Absolute Grounds", "Section 11 — Relative Grounds", "30-Day Reply Deadline", "Expert Legal Arguments"].map(pt => (
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

      {/* ── OBJECTION TYPES CALLOUT ── */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-red-100 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle size={18} className="text-red-500" />
                </div>
                <div>
                  <p className="font-heading font-bold text-dark text-base">Section 9 — Absolute Grounds</p>
                  <p className="text-muted text-xs">Mark has inherent registrability issues</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  "Mark is descriptive of the goods/services",
                  "Mark is generic or commonly used in trade",
                  "Mark is deceptive or misleading to consumers",
                  "Mark is purely a geographic name",
                  "Mark is offensive or contrary to public morality",
                  "Mark lacks distinctiveness overall",
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5 bg-red-50/50 rounded-xl px-3 py-2">
                    <XCircle size={12} className="text-red-400 shrink-0 mt-0.5" />
                    <span className="text-dark text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-amber-100 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Scale size={18} className="text-amber-500" />
                </div>
                <div>
                  <p className="font-heading font-bold text-dark text-base">Section 11 — Relative Grounds</p>
                  <p className="text-muted text-xs">Conflict with existing trademarks</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  "Mark identical to existing registered trademark",
                  "Mark similar enough to cause consumer confusion",
                  "Conflict in the same or similar class of goods",
                  "Similar mark registered by a competitor brand",
                  "Phonetically similar to a cited trademark",
                  "Conflict with a well-known or famous trademark",
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5 bg-amber-50/50 rounded-xl px-3 py-2">
                    <AlertCircle size={12} className="text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-dark text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO NEEDS THIS ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Who Needs This" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Needs Trademark Objection Reply?</h2>
            <p className="text-muted text-base max-w-2xl mx-auto mt-3">If you&apos;ve received an examination report from the Trade Marks Registry, you need to act immediately.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whoNeeds.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title}
                  custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
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

      {/* ── KEY BENEFITS ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Key Benefits" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Benefits of Professional Objection Reply</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true }}
                  className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors duration-300">
                    <Icon size={17} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-heading font-bold text-dark text-sm mb-1">{b.title}</p>
                  <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
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
              <Eyebrow label="Our Process" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Trademark Objection Reply — Step by Step</h2>
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
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Documents Required for Objection Reply</h2>
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
                  <p className="text-dark text-xs leading-relaxed">The strength of evidence — especially invoices and product photos showing prior use — is the most critical factor in a successful objection reply. Our team helps you identify and compile the most relevant evidence.</p>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section>
              <Eyebrow label="Timeline" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Trademark Objection Reply Timeline</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {timelineStages.map((stage, i) => {
                    const Icon = stage.icon;
                    return (
                      <div key={stage.label} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
                        <div className="flex flex-col items-center text-center min-w-[80px]">
                          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-2 shadow-sm">
                            <Icon size={17} className="text-white" />
                          </div>
                          <p className="text-xs font-heading font-semibold text-dark leading-snug">{stage.label}</p>
                          <p className="text-[10px] text-accent font-heading font-bold mt-0.5">{stage.sub}</p>
                        </div>
                        {i < timelineStages.length - 1 && (
                          <div className="hidden sm:block flex-1 h-px bg-slate-200 mx-2" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
                  <Clock size={15} className="text-amber-600 shrink-0" />
                  <p className="text-dark text-xs leading-relaxed"><strong>Critical:</strong> The 30-day deadline from the examination report date is statutory. Missing it causes automatic abandonment of the application. We file your reply well in advance of the deadline.</p>
                </div>
              </div>
            </section>

            {/* DELIVERABLES */}
            <section>
              <Eyebrow label="What You Receive" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">What You Receive</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {deliverables.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-card hover:border-primary/15 transition-all group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-300">
                        <Icon size={19} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-dark text-sm mb-1">{item.title}</p>
                        <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
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
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">Why Choose Company Avenue for Trademark Objection?</h2>
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
                    { v: "500+",  l: "Objections Handled", c: "bg-primary text-white" },
                    { v: "65%",   l: "Avg Success Rate",   c: "bg-accent text-dark" },
                    { v: "15+",   l: "Years Experience",   c: "bg-slate-800 text-white" },
                    { v: "30d",   l: "Deadline Guarantee", c: "bg-green-600 text-white" },
                  ].map(s => (
                    <motion.div key={s.l} whileHover={{ y: -4 }} className={`${s.c} rounded-2xl p-6 text-center shadow-card`}>
                      <p className="font-heading font-bold text-3xl leading-none mb-1">{s.v}</p>
                      <p className="text-xs opacity-80 leading-snug">{s.l}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* IMAGE SECTION */}
            <section>
              <Eyebrow label="Our Approach" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">Expert Legal Strategy for Every Objection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-3xl overflow-hidden aspect-video shadow-[0_8px_32px_rgba(15,45,82,0.08)] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&q=85"
                    alt="Legal expertise in trademark objection"
                    fill className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Search,   title: "Thorough Cited Mark Analysis",      desc: "We research cited marks in depth — their registration status, similarity, and scope — to identify the strongest distinction arguments." },
                    { icon: Scale,    title: "Tailored Legal Strategy",            desc: "Each objection gets a custom strategy based on the specific grounds, the mark type, and the strength of prior use evidence." },
                    { icon: Gavel,    title: "Hearing-Ready Representation",       desc: "If the written reply is insufficient, our attorneys are ready to present oral arguments before the Trade Marks Registrar." },
                    { icon: Clock,    title: "Deadline-First Filing",              desc: "We guarantee your reply is filed well within the 30-day statutory deadline — never a day late." },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-3 hover:shadow-card transition-all group">
                        <div className="w-9 h-9 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-300">
                          <Icon size={15} className="text-primary group-hover:text-white transition-colors duration-300" />
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

            {/* FAQ */}
            <section itemScope itemType="https://schema.org/FAQPage">
              <div className="text-center mb-10">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions</h2>
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
            <defs><pattern id="cta-obj" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#cta-obj)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Act Before the Deadline" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Don&apos;t Let Your Trademark<br />Application Lapse
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              A trademark examination objection is not the end — it&apos;s a challenge that can be overcome with the right legal strategy. Company Avenue Advisory drafts a powerful counter-statement, compiles your evidence, and files your TM-M reply before the 30-day deadline to give your brand the best chance of registration.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-[#e2b96a] transition-colors"
              >
                File My Objection Reply <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Speak to a Trademark Attorney
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
