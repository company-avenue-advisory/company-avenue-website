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
  Download, MessageCircle, Globe, Scale, Repeat2, Award,
  TrendingUp, Receipt, PenLine, Layers, BookOpen, CalendarCheck,
  Store, User, Coffee, Scissors, Package, Truck, Wrench, ShoppingCart,
} from "lucide-react";
import { faqs } from "@/lib/faqs/SoleProprietorshipPage";

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
  { icon: Clock,      label: "Timeline",       value: "3–5 Days" },
  { icon: User,       label: "Min. Members",   value: "1 (Owner Only)" },
  { icon: FileText,   label: "Registration",   value: "No Separate Law" },
  { icon: Building2,  label: "Authority",      value: "Various Departments" },
  { icon: ShieldCheck,label: "Liability",      value: "Unlimited" },
  { icon: BadgeCheck, label: "Best For",       value: "Freelancers & Small Shops" },
];

const whoShouldRegister = [
  { icon: Monitor,     title: "Freelancers",          desc: "Designers, developers, writers and digital professionals operating solo." },
  { icon: Store,       title: "Retail Shop Owners",   desc: "Kirana stores, boutiques, stationery shops and standalone retailers." },
  { icon: Coffee,      title: "Home-based Businesses",desc: "Tiffin services, baking businesses, handicraft makers and home tutors." },
  { icon: Briefcase,   title: "Consultants",          desc: "Independent advisors in finance, HR, marketing or management." },
  { icon: Scissors,    title: "Artisans & Craftsmen", desc: "Tailors, jewellery makers, potters and traditional craft artists." },
  { icon: Package,     title: "Food Vendors",         desc: "Street food sellers, caterers, cloud kitchens and food delivery operators." },
  { icon: Wrench,      title: "Service Providers",    desc: "Plumbers, electricians, photographers, beauticians and repair technicians." },
  { icon: ShoppingCart,title: "Traders",              desc: "Wholesalers and retail traders dealing in goods of any category." },
];

const benefits = [
  { icon: DollarSign,  title: "Zero Separate Registration Fees",  desc: "No incorporation fee — proprietorship is set up through existing registrations like GST or Udyam." },
  { icon: User,        title: "Complete Ownership Control",       desc: "100% profits belong to you — no partner or shareholder to share with." },
  { icon: FileText,    title: "Simple Tax Filing",               desc: "Income taxed under ITR-3 or ITR-4 (presumptive) at individual slab rates." },
  { icon: BadgeCheck,  title: "No Mandatory Audit Below 1 Cr",  desc: "Tax audit not required unless turnover crosses ₹1 Crore (₹50L for professionals)." },
  { icon: Building2,   title: "Easy Bank Account Opening",       desc: "Current account opened with GST or Udyam certificate as proof of business." },
  { icon: ShieldCheck, title: "Maximum Privacy",                 desc: "No public filings or disclosure of financials — complete business privacy." },
  { icon: Zap,         title: "Minimal Compliance Burden",       desc: "No annual ROC filings, no board meetings, no statutory audits below threshold." },
  { icon: TrendingUp,  title: "Instant Setup",                   desc: "Begin operations in as little as 3 days — the fastest way to start a business in India." },
];

const registrationSteps = [
  { n: "01", title: "Free Consultation",           desc: "We understand your business type and advise the correct registrations required for your proprietorship." },
  { n: "02", title: "Choose Business Name",        desc: "Select a unique business name that reflects your brand. We check for trademark conflicts." },
  { n: "03", title: "GST Registration",            desc: "If turnover exceeds threshold or inter-state supply is planned, we apply for GSTIN immediately." },
  { n: "04", title: "Current Bank Account",        desc: "We assist in opening a business current account using your GST/Udyam certificate." },
  { n: "05", title: "Udyam (MSME) Registration",  desc: "Register on the Udyam portal to avail government schemes, subsidies and bank priority lending." },
  { n: "06", title: "Professional Tax",            desc: "Apply for Professional Tax enrollment where required by state regulations." },
  { n: "07", title: "Trade License (if needed)",  desc: "Obtain trade/shop-and-establishment license from local municipality if applicable." },
  { n: "08", title: "Begin Operations",           desc: "Your proprietorship is fully set up and ready for business. We provide a compliance calendar." },
];

const timelineStages = [
  { label: "Consultation",     time: "Day 1" },
  { label: "Documents Ready",  time: "Day 1–2" },
  { label: "GST/Udyam Filed",  time: "Day 2" },
  { label: "Processing",       time: "Day 2–4" },
  { label: "Certificates",     time: "Day 3–5" },
  { label: "Business Ready",   time: "Day 3–7" },
];

const requiredDocs = [
  { icon: CreditCard,  label: "PAN Card of the Owner" },
  { icon: Fingerprint, label: "Aadhaar Card of the Owner" },
  { icon: Building2,   label: "Business Address Proof" },
  { icon: FileText,    label: "Latest Bank Statement (3 months)" },
  { icon: Zap,         label: "Utility Bill for Business Address" },
  { icon: Hash,        label: "Passport-size Photographs" },
];

const deliverables = [
  { icon: BadgeCheck, label: "GST Certificate (GSTIN)",         color: "text-primary bg-primary/8" },
  { icon: Award,      label: "Udyam Registration Certificate",  color: "text-blue-600 bg-blue-50" },
  { icon: Building2,  label: "Current Bank Account Support",    color: "text-purple-600 bg-purple-50" },
  { icon: FileText,   label: "Professional Tax RC",             color: "text-green-600 bg-green-50" },
  { icon: Hash,       label: "Trade/Shop License (if needed)",  color: "text-orange-600 bg-orange-50" },
  { icon: CalendarCheck, label: "Annual Compliance Calendar",   color: "text-teal-600 bg-teal-50" },
];

const whyUsPoints = [
  { icon: Award,       label: "15+ Years of Business Registration Experience" },
  { icon: Building2,   label: "5,000+ Proprietorships Assisted" },
  { icon: UserCheck,   label: "Dedicated Chartered Accountant Support" },
  { icon: DollarSign,  label: "Starting at just ₹1,999 — Fully Transparent" },
  { icon: Zap,         label: "Fastest Setup — Ready in 3–5 Days" },
  { icon: Monitor,     label: "100% Online, No Office Visit Needed" },
  { icon: LifeBuoy,    label: "Post-Registration ITR and GST Filing Support" },
  { icon: Headphones,  label: "Dedicated Relationship Manager Assigned" },
];


const relatedServices = [
  { id: "gst-registration",        title: "GST Registration",        desc: "Get your GSTIN in 3–5 working days." },
  { id: "msme-registration",       title: "MSME Registration",       desc: "Udyam certificate & government benefits." },
  { id: "income-tax-return",       title: "Income Tax Return",       desc: "File ITR-3/4 for your proprietorship." },
  { id: "accounting-bookkeeping",  title: "Accounting Services",     desc: "Books, GST returns and MIS reports." },
  { id: "private-limited-company", title: "Private Limited Company", desc: "Upgrade when your business scales up." },
  { id: "trade-license",           title: "Trade License",           desc: "Shop & Establishment registration." },
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

export function SoleProprietorshipPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="sp-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sp-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>

        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Sole Proprietorship</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">Fastest Way to Start a Business in India</span>
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Sole Proprietorship<br />
                <span className="text-primary">Registration in India</span>
              </motion.h1>

              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Set up your sole proprietorship legally in 3–5 days. We handle GST registration, Udyam certificate, bank account support, shop license and all compliance — so you can focus on your business.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Book Free Consultation <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to an Expert
                </a>
              </motion.div>

              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["3–5 Days Setup", "Starting ₹1,999", "GST + Udyam Included", "100% Online"].map(pt => (
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
              <div className="relative max-w-md mx-auto">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] overflow-hidden">
                  <div className="bg-primary px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <User size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-xs">Sole Proprietorship Setup</p>
                        <p className="text-white/50 text-[10px]">GST + Udyam + Bank Account</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-heading font-semibold bg-green-500/20 text-green-300 border border-green-400/30 px-2.5 py-1 rounded-full">● Live in Days</span>
                  </div>
                  <div className="relative w-full aspect-[4/3] bg-slate-50">
                    <Image
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=85"
                      alt="Solo entrepreneur running their own business"
                      fill className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                    />
                  </div>
                  <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <p className="text-muted text-[10px]">Setup Time</p>
                      <p className="font-heading font-bold text-primary text-xs">3–5 Days</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted text-[10px]">Starting from</p>
                      <p className="font-heading font-bold text-dark text-xs">₹1,999</p>
                    </div>
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-5 top-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Setup Time</p>
                  <p className="font-heading font-bold text-primary text-sm">3–5 Days</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -left-5 bottom-12 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">GST Included</p>
                  <p className="font-heading font-bold text-green-600 text-sm">Yes ✓</p>
                </motion.div>
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
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                    What is a Sole Proprietorship?
                  </h2>
                  <p className="text-slate-500 text-base leading-relaxed mb-5">
                    A Sole Proprietorship is the simplest, most common and quickest business structure in India. It is owned and managed by a single individual with no distinction between the owner and the business. There is no separate registration law — the business gets recognition through registrations like GST, Udyam, shop license or professional tax.
                  </p>
                  <p className="text-slate-500 text-base leading-relaxed mb-6">
                    Ideal for freelancers, small shop owners, home-based businesses and individual service providers, a sole proprietorship allows you to start instantly with minimal cost and maximum control over your business.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Single owner — 100% control",
                      "No separate legal entity",
                      "Income taxed at personal slab rates",
                      "Easiest to set up and close",
                    ].map(pt => (
                      <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <CheckCircle size={13} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-dark text-xs leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85"
                      alt="Sole proprietor managing their business"
                      fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                    <p className="font-heading font-bold text-2xl">100%</p>
                    <p className="text-white/60 text-xs">Your Business</p>
                  </div>
                </div>
              </div>
            </section>

            {/* WHO SHOULD */}
            <section className="bg-slate-50 rounded-3xl p-10">
              <div className="text-center mb-12">
                <Eyebrow label="Ideal For" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Should Choose Sole Proprietorship?</h2>
                <p className="text-muted mt-3 text-sm max-w-xl mx-auto">Perfect for individuals starting small, testing a business idea or running a personal service brand.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {whoShouldRegister.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true, margin: "-40px" }}
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
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Key Benefits of Sole Proprietorship</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true, margin: "-40px" }}
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

            {/* REGISTRATION PROCESS */}
            <section className="bg-slate-50 rounded-3xl p-10">
              <div className="text-center mb-12">
                <Eyebrow label="Process" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">How We Set Up Your Proprietorship</h2>
                <p className="text-muted mt-3 text-sm max-w-xl mx-auto">A clear, step-by-step process from consultation to your first day of business.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {registrationSteps.map((step, i) => (
                  <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="show" viewport={{ once: true, margin: "-40px" }}
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
                <p className="text-muted mt-3 text-sm">Minimal paperwork — most of what you already have at home.</p>
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {requiredDocs.map(d => {
                      const Icon = d.icon;
                      return (
                        <div key={d.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <Icon size={15} className="text-primary shrink-0" />
                          <span className="text-dark text-sm">{d.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <p className="text-amber-800 text-xs leading-relaxed">
                      <strong>Tip:</strong> If your business address is your home address, a utility bill in your name is sufficient. If it is a rented commercial space, a rent agreement and NOC from the landlord are required.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section className="bg-slate-50 rounded-3xl p-10">
              <div className="text-center mb-12">
                <Eyebrow label="Timeline" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Setup Timeline</h2>
                <p className="text-muted mt-3 text-sm">From consultation to fully operational in as little as 3–7 days</p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-0">
                {timelineStages.map((stage, i) => (
                  <div key={stage.label} className="flex md:flex-col items-center gap-3 md:gap-0 flex-1">
                    <div className="flex flex-col md:flex-row items-center gap-0 flex-1 w-full">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">
                          {i + 1}
                        </div>
                        <div className="md:hidden w-px h-8 bg-slate-200 mt-2" />
                      </div>
                      {i < timelineStages.length - 1 && (
                        <div className="hidden md:block h-px flex-1 bg-slate-200 mx-2" />
                      )}
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
                {deliverables.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <motion.div key={d.label} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true, margin: "-40px" }}
                      className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-card transition-all"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${d.color}`}>
                        <Icon size={16} />
                      </div>
                      <span className="font-heading font-semibold text-dark text-sm leading-snug">{d.label}</span>
                    </motion.div>
                  );
                })}
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
                {whyUsPoints.map((pt) => {
                  const Icon = pt.icon;
                  return (
                    <div key={pt.label} className="flex items-center gap-3 bg-white/10 rounded-2xl p-4">
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-accent" />
                      </div>
                      <span className="font-heading font-semibold text-white text-sm leading-snug">{pt.label}</span>
                    </div>
                  );
                })}
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
                  <motion.div key={s.id} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  >
                    <Link href={"/services/" + s.id}
                      className="flex items-center justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all group"
                    >
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
              <p className="font-heading font-bold text-dark text-base mb-1">Start Your Proprietorship Today</p>
              <p className="text-muted text-xs mb-4 leading-relaxed">Get fully set up in 3–5 days with expert CA guidance.</p>
              <div className="space-y-2 mb-5">
                {["Free Expert Consultation", "GST + Udyam Registration", "Bank Account Support", "Compliance Calendar"].map(pt => (
                  <div key={pt} className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-primary shrink-0" />
                    <span className="text-dark text-xs">{pt}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <a href="tel:+919953719111"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
                >
                  <Phone size={13} /> Call Now
                </a>
                <Link href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
                >
                  Book Consultation
                </Link>
                <a href="https://wa.me/919953719111" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
                >
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {[{ v: "3–5", l: "Days Setup" }, { v: "5000+", l: "Proprietorships" }, { v: "15+", l: "Years Exp." }, { v: "₹1,999", l: "Starting Price" }].map(s => (
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

      {/* ── CTA ── */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
              Start Your Business in 3 Days
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Get your GST, Udyam certificate and bank account support — all in one affordable package. Starting at ₹1,999.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
              >
                Get Started Today <ArrowRight size={16} />
              </Link>
              <a href="tel:+919953719111"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/10 transition-colors"
              >
                <Phone size={15} /> +91 99537 19111
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
