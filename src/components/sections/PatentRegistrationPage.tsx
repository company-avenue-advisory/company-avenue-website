"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  MessageCircle, ShieldCheck, BadgeCheck, Globe, Monitor, Repeat2,
  Award, DollarSign, Headphones, Building2, Users, Briefcase,
  Search, Zap, TrendingUp, BookOpen, CalendarCheck, ChevronRight,
  Info, Bell, AlertTriangle, Lightbulb, FlaskConical, Cpu, Microscope,
  PenLine, Package, RefreshCcw, CreditCard, Fingerprint, Download,
} from "lucide-react";
import { faqs } from "@/lib/faqs/PatentRegistrationPage";

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
  { icon: FileText,     label: "Governing Act",      value: "Patents Act 1970" },
  { icon: Building2,    label: "Authority",           value: "Indian Patent Office" },
  { icon: CalendarCheck,label: "Duration",            value: "20 Years" },
  { icon: Globe,        label: "Types",               value: "Ordinary/Convention/PCT" },
  { icon: Search,       label: "Search Report",       value: "~18 Months" },
  { icon: BadgeCheck,   label: "Examination",         value: "Within 48 Months" },
];

const whoNeeds = [
  { icon: Lightbulb,   title: "Inventors & Innovators",         desc: "Individual inventors with novel ideas or technical solutions that meet patentability criteria." },
  { icon: Cpu,         title: "Tech Startups",                  desc: "Technology companies developing unique software systems, hardware devices, or innovative processes." },
  { icon: FlaskConical,title: "Pharmaceutical Companies",       desc: "Pharma firms developing new drug formulations, compounds, synthesis methods, or delivery systems." },
  { icon: Package,     title: "FMCG Product Companies",         desc: "Consumer goods manufacturers with innovative product formulations, packaging, or manufacturing processes." },
  { icon: Building2,   title: "Manufacturing Companies",        desc: "Industrial manufacturers with novel machinery, production processes, or engineering solutions." },
  { icon: BookOpen,    title: "Research Institutions & Universities", desc: "Academic and R&D institutions with patentable inventions emerging from research projects." },
  { icon: Zap,         title: "Engineers with Novel Processes", desc: "Engineers and technical professionals with inventive process improvements or unique solutions." },
  { icon: Microscope,  title: "Medical Device Developers",      desc: "Companies designing new diagnostic equipment, surgical tools, implants, or monitoring devices." },
];

const benefits = [
  { icon: ShieldCheck,  title: "20-Year Monopoly",              desc: "Exclusive rights to manufacture, sell, and use your invention in India for 20 years from filing date." },
  { icon: DollarSign,   title: "License & Royalty Income",      desc: "License your patent to companies and earn recurring royalty income without manufacturing yourself." },
  { icon: TrendingUp,   title: "Attract Investors & Acquirers", desc: "Patents signal innovation and R&D capability, significantly boosting company valuation and investor appeal." },
  { icon: AlertTriangle,title: "Block Competitors",             desc: "Legally prevent competitors from copying, manufacturing, using, or selling your patented invention." },
  { icon: Globe,        title: "Technology Transfer Deals",     desc: "Monetise your IP through technology transfer agreements with Indian and global corporations." },
  { icon: Award,        title: "IP Portfolio Building",         desc: "Build a defensible intellectual property portfolio that becomes a core business asset." },
  { icon: BadgeCheck,   title: "Enforcement Against Infringement", desc: "Take legal action against infringers — injunctions, damages, and accounts of profits through courts." },
  { icon: RefreshCcw,   title: "Global Protection via PCT",     desc: "File one international application under PCT to seek protection in 150+ countries simultaneously." },
];

const processSteps = [
  { n: "01", title: "Patentability Search",              desc: "Conduct a thorough novelty and prior-art search to assess whether the invention meets patentability criteria before investment." },
  { n: "02", title: "Patent Draft Preparation",          desc: "Prepare complete patent specification including detailed description, claims, abstract, and technical drawings or diagrams." },
  { n: "03", title: "File Provisional or Complete Spec", desc: "File a provisional specification to establish a priority date, followed by complete specification within 12 months, or file complete spec directly." },
  { n: "04", title: "Filing at Indian Patent Office",    desc: "Submit application at the relevant Patent Office — Chennai, Delhi, Mumbai, or Kolkata — based on applicant's jurisdiction." },
  { n: "05", title: "Publication after 18 Months",       desc: "Application is automatically published in the Official Patent Journal 18 months from earliest filing or priority date." },
  { n: "06", title: "Request for Examination",           desc: "File Form 18 requesting substantive examination within 48 months of filing. Early publication and examination is possible on request." },
  { n: "07", title: "Examination Report Response",       desc: "Respond to First Examination Report (FER) objections — addressing patentability, novelty, and claim clarity issues raised by the examiner." },
  { n: "08", title: "Grant & Annual Renewal",            desc: "Patent granted after examination satisfaction. Annual renewal fees (Form 4) must be paid from the 3rd year onwards." },
];

const requiredDocs = [
  { icon: FileText,    label: "Detailed Description of Invention" },
  { icon: PenLine,     label: "Claims (Scope of Protection)" },
  { icon: Briefcase,   label: "Drawings / Diagrams (if applicable)" },
  { icon: BookOpen,    label: "Abstract" },
  { icon: BadgeCheck,  label: "Power of Attorney (if through agent)" },
  { icon: Globe,       label: "Priority Document (for convention)" },
  { icon: CreditCard,  label: "Applicant Identity Proof" },
  { icon: Fingerprint, label: "Address & Contact Details" },
];

const timelineStages = [
  { label: "Filing",              icon: FileText,      desc: "Application filed with priority date" },
  { label: "Publication",         icon: BookOpen,      desc: "Published after 18 months" },
  { label: "Exam Request",        icon: Search,        desc: "Form 18 filed within 48 months" },
  { label: "FER Issued",          icon: AlertTriangle, desc: "Examination Report received" },
  { label: "Response Filed",      icon: PenLine,       desc: "Counter-statement submitted" },
  { label: "Patent Granted",      icon: Award,         desc: "Certificate issued" },
];

const deliverables = [
  "Filing receipt with application number",
  "Patent Application Number (PAN for IP)",
  "Publication notice in Patent Journal",
  "Examination report response assistance",
  "Patent Grant Certificate",
  "Annual renewal reminders & support",
];

const whyUsPoints = [
  { icon: Award,       label: "Patent Specialists with 15+ Years of IP Experience" },
  { icon: Search,      label: "Comprehensive Prior-Art & Novelty Search" },
  { icon: PenLine,     label: "Expert Patent Drafting — Specification & Claims" },
  { icon: ShieldCheck, label: "Examination Report & FER Objection Handling" },
  { icon: Globe,       label: "PCT & International Patent Filing Support" },
  { icon: DollarSign,  label: "Transparent, Fixed Fee Pricing" },
  { icon: Monitor,     label: "End-to-End Digital Process" },
  { icon: Headphones,  label: "Dedicated IP Advisor & 24-Hour Response" },
];

const relatedServices = [
  { id: "trademark-registration",  title: "Trademark Registration",   desc: "Protect your brand name and logo." },
  { id: "copyright-registration",  title: "Copyright Registration",   desc: "Protect creative works and software." },
  { id: "design-registration",     title: "Design Registration",      desc: "Protect product appearance and aesthetics." },
  { id: "startup-india",           title: "Startup India",            desc: "DPIIT recognition & 80% patent fee waiver." },
  { id: "msme-registration",       title: "MSME Registration",        desc: "MSME status for patent fee discounts." },
  { id: "private-limited-company", title: "Private Limited Company",  desc: "Incorporate before filing patents." },
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
        <p className="font-heading font-bold text-dark text-base mb-1">Protect Your Invention</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Our patent specialists handle search, drafting, filing, FER responses, and renewal.</p>
        <div className="space-y-2 mb-5">
          {["Prior-Art Search Included", "Expert Patent Drafting", "FER Objection Handling", "PCT Filing Support", "Annual Renewal Reminders"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
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
          <Download size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Patent Checklist</p>
        </div>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">Download our complete patent registration checklist as PDF.</p>
        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
          <Download size={13} /> Download PDF
        </button>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "500+", l: "Patents Filed" }, { v: "95%", l: "Success Rate" }, { v: "15+", l: "Years Exp." }, { v: "24h", l: "Response" }].map(s => (
            <div key={s.l} className="text-center">
              <p className="font-heading font-bold text-primary text-lg leading-none">{s.v}</p>
              <p className="text-muted text-[10px] mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <div className="flex items-start gap-2 mb-2">
          <Info size={13} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="font-heading font-bold text-dark text-xs">Fee Concession</p>
        </div>
        <p className="text-muted text-[11px] leading-relaxed">Individuals, startups, and MSMEs get an <strong>80% discount</strong> on official patent fees.</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export function PatentRegistrationPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="pt-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#pt-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link><span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link><span>/</span>
            <span className="text-dark">Patent Registration</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">Intellectual Property Experts • Patents Act 1970</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Patent Registration<br /><span className="text-primary">in India — Secure Your Invention</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Protect your novel invention with a 20-year monopoly under the Patents Act 1970. From patentability search to grant — our IP specialists manage the complete patent registration process across India.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  File My Patent <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111" data-track="call"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Free Patent Consultation
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["Prior-Art Search Included", "Expert Patent Drafting", "PCT International Filing", "80% Fee Concession for Startups"].map(pt => (
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
                      <Lightbulb size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">Patent at a Glance</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Protected
                  </span>
                </div>
                <div className="space-y-2.5 mb-5">
                  {[
                    { label: "Governing Act",  value: "Patents Act 1970" },
                    { label: "Duration",       value: "20 Years from Filing" },
                    { label: "Authority",      value: "Indian Patent Office" },
                    { label: "Types",          value: "Ordinary / Convention / PCT" },
                    { label: "Exam Request",   value: "Within 48 Months" },
                    { label: "Fee (Individual)", value: "₹1,600 | Company: ₹8,000" },
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
                    <p className="text-xs text-muted">Filing starts from</p>
                    <p className="font-heading font-bold text-primary text-xl">₹24,999</p>
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

      {/* ── WHAT IS PATENT REGISTRATION ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)] relative">
                <Image
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=85"
                  alt="Patent registration and intellectual property protection in India"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">20 Yrs</p>
                <p className="text-white/60 text-xs">Monopoly Period</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is Patent Registration?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                A <strong>patent</strong> is a statutory right granted by the Government of India to an inventor, giving them exclusive rights to manufacture, sell, and use their invention for a period of <strong>20 years</strong> from the date of filing. It is governed by the <strong>Patents Act 1970</strong> and administered by the Indian Patent Office with offices in Chennai, Delhi, Mumbai, and Kolkata.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Patent registration is the process of legally protecting a novel, inventive, and industrially applicable invention. Once granted, the patent owner holds a territorial monopoly — no one else can manufacture, use, sell, or import the patented invention in India without authorisation. Patents can be licensed, sold, or used as collateral, making them powerful business assets.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Exclusive Manufacturing Rights", "Royalty & License Income", "Blocks Competitor Copying", "Global PCT Protection"].map(pt => (
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
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">Who Needs Patent Registration?</h2>
            <p className="text-muted text-base max-w-2xl mx-auto">Any individual or organisation with a novel, inventive, and industrially applicable invention should consider patent registration to protect their competitive advantage.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoNeeds.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="group bg-white border border-slate-100 rounded-2xl p-6 hover:border-primary/20 hover:shadow-card transition-all duration-300"
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
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Benefits of Patent Registration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {benefits.map((item, i) => {
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

      {/* ── TWO-COLUMN MAIN + SIDEBAR ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* PROCESS */}
            <section>
              <Eyebrow label="Registration Process" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Patent Registration Process — Step by Step</h2>
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
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Patent Registration Document Checklist</h2>
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
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                  <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">The patent specification (description + claims) is the most critical document and must be drafted with precision. Our patent attorneys ensure claims are broad enough to provide comprehensive protection while meeting patentability requirements.</p>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section>
              <Eyebrow label="Timeline" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Patent Registration Timeline</h2>
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
                          <p className="text-xs font-heading font-semibold text-dark leading-snug max-w-[72px]">{stage.label}</p>
                          <p className="text-[10px] text-muted leading-snug max-w-[72px]">{stage.desc}</p>
                        </div>
                        {i < timelineStages.length - 1 && (
                          <ChevronRight size={14} className="text-slate-400 shrink-0 hidden sm:block" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 bg-primary/5 border border-primary/15 rounded-xl p-4 flex items-center gap-3">
                  <Info size={15} className="text-primary shrink-0" />
                  <p className="text-dark text-xs leading-relaxed">Patent grant in India typically takes <strong>3–5 years</strong> from filing. Expedited examination is available for startups and certain technology areas. Annual renewal fees are required from Year 3 onwards to maintain patent validity.</p>
                </div>
              </div>
            </section>

            {/* WHAT YOU RECEIVE */}
            <section>
              <Eyebrow label="Deliverables" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">What You Receive</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div className="space-y-3">
                  {deliverables.map((d, i) => (
                    <motion.div key={d} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex items-start gap-3 bg-white border border-slate-100 rounded-2xl px-5 py-4 hover:shadow-card hover:border-primary/15 transition-all"
                    >
                      <CheckCircle size={15} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-dark text-sm font-medium">{d}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_8px_32px_rgba(15,45,82,0.08)] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&q=85"
                    alt="Patent grant certificate and IP documentation"
                    fill className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </div>
            </section>

            {/* WHY COMPANY AVENUE */}
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Eyebrow label="Why Us" />
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">Why Choose Company Avenue for Patent Registration?</h2>
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
                    { v: "500+",  l: "Patents Filed",     c: "bg-primary text-white" },
                    { v: "95%",   l: "Success Rate",      c: "bg-accent text-dark" },
                    { v: "15+",   l: "Years Experience",  c: "bg-slate-800 text-white" },
                    { v: "24 hrs",l: "Response Time",     c: "bg-green-600 text-white" },
                  ].map(s => (
                    <motion.div key={s.l} whileHover={{ y: -4 }} className={`${s.c} rounded-2xl p-6 text-center shadow-card`}>
                      <p className="font-heading font-bold text-3xl leading-none mb-1">{s.v}</p>
                      <p className="text-xs opacity-80 leading-snug">{s.l}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* PCT SECTION */}
            <section>
              <Eyebrow label="International Patents" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">Protect Your Invention Globally via PCT</h2>
              <p className="text-muted text-sm mb-8 leading-relaxed">The Patent Cooperation Treaty (PCT) allows you to file a single international patent application covering 150+ countries. It is the most cost-effective route for inventors seeking global protection.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div className="rounded-3xl overflow-hidden aspect-video shadow-[0_8px_32px_rgba(15,45,82,0.08)] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=85"
                    alt="International patent protection via PCT"
                    fill className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 content-start">
                  {[
                    { icon: Globe,       title: "150+ Countries",       desc: "Single PCT filing provides entry to over 150 WIPO member states." },
                    { icon: CalendarCheck,title:"30-Month Window",       desc: "30 months from priority date to enter national phase in each country." },
                    { icon: DollarSign,  title: "Cost Efficient",        desc: "Defer national filing costs while assessing commercial viability globally." },
                    { icon: ShieldCheck, title: "Priority Protected",    desc: "Indian priority date is preserved across all PCT member countries." },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-card transition-all group">
                        <div className="w-8 h-8 rounded-lg bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-2 transition-colors duration-300">
                          <Icon size={14} className="text-primary group-hover:text-white transition-colors duration-300" />
                        </div>
                        <p className="font-heading font-bold text-dark text-xs mb-1">{item.title}</p>
                        <p className="text-muted text-[11px] leading-relaxed">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 flex items-start gap-3">
                <Bell size={15} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-dark text-sm mb-1">File Indian + PCT Together</p>
                  <p className="text-muted text-xs leading-relaxed">For maximum protection, file your Indian provisional application first to secure the priority date, then file a PCT application within 12 months. This strategy gives you global protection while minimising upfront costs.</p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section itemScope itemType="https://schema.org/FAQPage">
              <div className="text-center mb-10">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions — Patent Registration</h2>
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
            <defs><pattern id="cta-pt" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#cta-pt)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Protect Your Invention" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Your Innovation Deserves<br />Legal Protection
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Don&apos;t let competitors copy your invention. Company Avenue Advisory manages your entire patent journey — from novelty search and specification drafting to filing, examination response, grant, and annual renewal — so your innovation is protected for 20 years.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-[#c49340] transition-colors"
              >
                File My Patent Now <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111" data-track="call"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Speak to a Patent Expert
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
