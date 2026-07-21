"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, CheckCircle, Plus, Minus,
  MessageCircle, FileText, CreditCard, Fingerprint,
  Zap, Building2, Users, Globe, Briefcase, Monitor, Award,
  DollarSign, Headphones, ShieldCheck,
  BadgeCheck, AlertCircle, Info, Bell, RefreshCcw,
  Tag, Package, ChevronRight, TrendingUp, BookOpen,
  CalendarCheck, Repeat2, AlertTriangle, Utensils,
  Truck, Store, ShoppingCart, Coffee, Factory,
  ClipboardList, Clock,
} from "lucide-react";
import { faqs } from "@/lib/faqs/FSSAILicensePage";

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
  { icon: Building2,    label: "Authority",      value: "FSSAI" },
  { icon: Tag,          label: "Types",          value: "Basic / State / Central" },
  { icon: DollarSign,   label: "Basic License",  value: "Turnover < ₹12 Lakhs" },
  { icon: TrendingUp,   label: "State License",  value: "₹12L – ₹20 Crores" },
  { icon: Globe,        label: "Central License",value: "> ₹20 Crores / Multi-State" },
  { icon: AlertTriangle,label: "Penalty",        value: "Up to ₹10 Lakhs" },
];

const heroGlance = [
  { label: "Authority",        value: "Food Safety & Standards Authority of India" },
  { label: "Types",            value: "Basic / State / Central" },
  { label: "Validity",         value: "1 to 5 Years" },
  { label: "Penalty",          value: "Up to ₹10 Lakhs" },
  { label: "Basic Duration",   value: "7 Working Days" },
  { label: "Application Mode", value: "FOSCOS Portal (Online)" },
];

const whoNeeds = [
  { icon: Coffee,       title: "Restaurants & Cafés",              desc: "Any dine-in or takeaway food business operating from a premises." },
  { icon: Utensils,     title: "Cloud Kitchens & Tiffin Services", desc: "Online food businesses, home kitchens, and meal delivery services." },
  { icon: Factory,      title: "Food Manufacturers & Processors",  desc: "Units that manufacture, process, or package food products." },
  { icon: Truck,        title: "Food Importers & Exporters",       desc: "Businesses engaged in cross-border food trade require Central FSSAI." },
  { icon: ShoppingCart, title: "E-Commerce Food Sellers",          desc: "Zomato, Swiggy, and other online food platform sellers." },
  { icon: Building2,    title: "Hotels & Caterers",                desc: "Hotels, resorts, and catering businesses serving food commercially." },
  { icon: Store,        title: "Bakeries & Sweet Shops",           desc: "All bakeries, mithai shops, and confectionery businesses." },
  { icon: Package,      title: "Food Traders & Distributors",      desc: "Wholesalers and distributors handling food products in supply chains." },
];

const benefits = [
  { icon: ShieldCheck,  title: "Legal Authorization to Operate",   desc: "FSSAI license is the legal permission to carry out any food business in India under the FSS Act 2006." },
  { icon: Tag,          title: "Mandatory for Zomato/Swiggy",      desc: "Online food platforms require a valid FSSAI license number before onboarding any food business." },
  { icon: BadgeCheck,   title: "Consumer Trust & FSSAI Logo",      desc: "Display the FSSAI logo to build consumer confidence in your food safety standards." },
  { icon: AlertTriangle,title: "Avoid ₹10 Lakh Penalty",          desc: "Operating without FSSAI license attracts fines up to ₹10 lakhs and business closure under Section 63." },
  { icon: Globe,        title: "Enable Food Exports",              desc: "FSSAI Central license is mandatory for businesses engaged in food import and export trade." },
  { icon: Briefcase,    title: "Attract Institutional Buyers",     desc: "Corporates, hotels, and institutions prefer FSSAI-certified suppliers for procurement contracts." },
  { icon: DollarSign,   title: "Bank Loan Eligibility",            desc: "A valid FSSAI license is required by banks as a primary document for food business loans." },
  { icon: ClipboardList,title: "Complete Food Safety Compliance",  desc: "FSSAI registration is the foundation for all other food safety certifications and compliance." },
];

const processSteps = [
  { n: "01", title: "Determine License Type",                desc: "Assess your annual turnover and operation scope to determine whether you need Basic, State, or Central FSSAI license." },
  { n: "02", title: "Gather All Required Documents",         desc: "Collect business registration proof, PAN, Aadhaar, premises photos, food product list, and water test reports." },
  { n: "03", title: "Apply on FOSCOS Portal",                desc: "Submit your application on the FSSAI FOSCOS portal (fssai.gov.in) with all required details and documents." },
  { n: "04", title: "Fee Payment Online",                    desc: "Pay the applicable license fee online based on your license type and duration (1–5 years)." },
  { n: "05", title: "Document Scrutiny by FSSAI",            desc: "The FSSAI officer reviews your submitted documents and may request additional information or clarification." },
  { n: "06", title: "Premises Inspection",                   desc: "For State and Central licenses, FSSAI conducts a physical inspection of your food premises for hygiene compliance." },
  { n: "07", title: "License Granted & Issued",              desc: "Upon successful verification and inspection, the FSSAI license certificate is issued with your 14-digit FSSAI number." },
  { n: "08", title: "Display & Annual Renewal",              desc: "Display the FSSAI number at your premises and on all food labels. Renew 30 days before expiry every year." },
];

const timelineStages = [
  { label: "Application Filed",      icon: FileText,     color: "bg-primary" },
  { label: "Document Scrutiny",      icon: ClipboardList,color: "bg-blue-600" },
  { label: "Fee Payment",            icon: DollarSign,   color: "bg-indigo-600" },
  { label: "FSSAI Review",           icon: BadgeCheck,   color: "bg-violet-600" },
  { label: "Premises Inspection",    icon: Building2,    color: "bg-amber-500" },
  { label: "License Certificate",    icon: Award,        color: "bg-green-600" },
];

const requiredDocs = [
  { icon: FileText,    label: "Business Registration Proof" },
  { icon: CreditCard,  label: "Proprietor / Partner PAN Card" },
  { icon: Fingerprint, label: "Proprietor / Partner Aadhaar" },
  { icon: Monitor,     label: "Photographs of Food Premises (all sides)" },
  { icon: ClipboardList,label: "Food Safety Management Plan" },
  { icon: Package,     label: "List of Food Products to be Handled" },
  { icon: AlertCircle, label: "Water Test Report (for manufacturing units)" },
  { icon: Building2,   label: "Address Proof of Food Premises" },
  { icon: Users,       label: "Employee Medical Certificates (Form IX)" },
];

const deliverables = [
  { icon: Award,      title: "FSSAI License Certificate",        desc: "Official certificate with your unique 14-digit FSSAI registration/license number." },
  { icon: CalendarCheck,title: "License Validity Certificate",   desc: "Certificate confirming license validity period (1 to 5 years) for your food business." },
  { icon: Tag,        title: "FSSAI Logo Usage Rights",          desc: "Legal right to display the FSSAI logo on your food products, packaging, and signage." },
  { icon: Store,      title: "Display Certificate for Premises", desc: "Certificate to be displayed prominently at your food business premises as required by law." },
];

const whyUs = [
  { icon: Award,       label: "FSSAI Specialists with 15+ Years Experience" },
  { icon: ClipboardList,label: "Complete Document Preparation Assistance" },
  { icon: Monitor,     label: "End-to-End FOSCOS Portal Filing" },
  { icon: ShieldCheck, label: "License Type Determination Guidance" },
  { icon: Repeat2,     label: "Renewal Reminders & Annual Renewal Support" },
  { icon: DollarSign,  label: "Transparent, Fixed Pricing — No Hidden Fees" },
  { icon: Zap,         label: "Fast Processing with Expert Follow-Ups" },
  { icon: Headphones,  label: "Dedicated Support Throughout the Process" },
];

const relatedServices = [
  { id: "trade-license",          title: "Trade License",            desc: "Municipal license to operate your business premises." },
  { id: "gst-registration",       title: "GST Registration",         desc: "Get your GSTIN for tax-compliant business operations." },
  { id: "msme-registration",      title: "MSME Registration",        desc: "Udyam certificate for small business benefits." },
  { id: "startup-india",          title: "Startup India",            desc: "DPIIT recognition and startup scheme benefits." },
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping", desc: "Professional accounting for your food business." },
  { id: "private-limited-company",title: "Private Limited Company",  desc: "Incorporate your food business as a company." },
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
        <p className="font-heading font-bold text-dark text-base mb-1">Get Your FSSAI License</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Our FSSAI experts handle everything — from license type determination to certificate delivery.</p>
        <div className="space-y-2 mb-5">
          {["License Type Guidance", "Complete Document Support", "FOSCOS Portal Filing", "Renewal Reminders"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="bg-primary/5 border border-primary/15 rounded-xl p-3 mb-4">
          <p className="text-xs text-muted mb-1">Starting price</p>
          <p className="font-heading font-bold text-primary text-lg leading-none">₹1,999 <span className="text-xs text-muted font-normal">(Basic)</span></p>
        </div>
        <div className="space-y-2">
          <a href="tel:+919953719111"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          ><Phone size={13} /> Call Now</a>
          <Link href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          >Book Free Consultation</Link>
          <a href="https://wa.me/919953719111" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          ><MessageCircle size={13} /> WhatsApp</a>
        </div>
      </div>
      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">FSSAI License Types</p>
        </div>
        <div className="space-y-2.5">
          {[
            { type: "Basic",   range: "< ₹12 Lakhs",          price: "₹1,999" },
            { type: "State",   range: "₹12L – ₹20 Crores",    price: "₹3,999" },
            { type: "Central", range: "> ₹20 Crores / Multi-State", price: "₹7,999" },
          ].map(item => (
            <div key={item.type} className="bg-white/10 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-heading font-bold text-white text-xs">{item.type}</span>
                <span className="font-heading font-bold text-accent text-sm">{item.price}</span>
              </div>
              <span className="text-white/60 text-[11px]">{item.range}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { v: "2,000+", l: "Licenses Filed" },
            { v: "7 Days", l: "Basic License" },
            { v: "15+",    l: "Years Exp." },
            { v: "24h",    l: "Response" },
          ].map(s => (
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
export function FSSAILicensePage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="fssai-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fssai-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">FSSAI Food License</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">FSSAI Experts • 2,000+ Licenses Filed</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                FSSAI Food License<br /><span className="text-primary">Registration Made Easy</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Legally operate your food business with the right FSSAI license — Basic, State, or Central. Mandatory for restaurants, cloud kitchens, Zomato/Swiggy, manufacturers, and all food businesses in India.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Apply for FSSAI License <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Free Consultation
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["All License Types", "FOSCOS Portal Filing", "Document Support", "PAN India Service"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                      <Utensils size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">FSSAI License at a Glance</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Active
                  </span>
                </div>
                <div className="space-y-2.5 mb-5">
                  {heroGlance.map((item, i) => (
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
                    <p className="text-xs text-muted">Starts from</p>
                    <p className="font-heading font-bold text-primary text-xl">₹1,999</p>
                    <p className="text-[11px] text-muted">Basic Registration</p>
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

      {/* ── WHAT IS FSSAI ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)] relative">
                <Image
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85"
                  alt="FSSAI food license registration for food businesses"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">2,000+</p>
                <p className="text-white/60 text-xs">Licenses Obtained</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is an FSSAI Food License?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                The <strong>FSSAI license</strong> (Food Safety and Standards Authority of India) is a mandatory license required by every food business operator (FBO) in India. It is governed by the <strong>Food Safety and Standards Act, 2006</strong> and regulated by FSSAI, the apex food regulatory body under the Ministry of Health and Family Welfare.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Every entity involved in the food sector — from manufacturers, processors, packers, distributors, retailers, caterers, and importers/exporters — must obtain the appropriate FSSAI registration or license before commencing operations. Failure to comply invites penalties of up to <strong>₹10 lakhs</strong> and business closure.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Legal Food Business Operation", "Mandatory for Zomato/Swiggy", "14-Digit FSSAI Number", "Consumer Trust & Brand Authority"].map(pt => (
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
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">Who Needs an FSSAI License?</h2>
            <p className="text-muted text-base max-w-2xl mx-auto">Any person or entity engaged in food production, processing, storage, distribution, sale, catering, or import/export in India requires an FSSAI license or registration.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoNeeds.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-card hover:border-primary/20 transition-all duration-300"
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

      {/* ── BENEFITS ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Key Benefits" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Key Benefits of FSSAI License</h2>
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

      {/* ── PROCESS ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Registration Process" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">FSSAI License Registration Process</h2>
            <p className="text-muted text-base max-w-2xl mx-auto mt-3">Our experts handle every step of the FSSAI application process — from license type determination to certificate delivery.</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
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
        </div>
      </section>

      {/* ── TWO COLUMN: MAIN + SIDEBAR ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* DOCUMENTS REQUIRED */}
            <section>
              <Eyebrow label="Documents Required" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">FSSAI License Document Checklist</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {requiredDocs.map(doc => {
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
                  <Info size={15} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">Document requirements may vary based on license type (Basic/State/Central) and nature of food business. Our team will provide you a customised document checklist after a brief consultation.</p>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section>
              <Eyebrow label="Timeline" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">FSSAI License Processing Timeline</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
                  {timelineStages.map((stage, i) => {
                    const Icon = stage.icon;
                    return (
                      <div key={stage.label} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                        <div className="flex flex-col items-center text-center">
                          <div className={`w-11 h-11 rounded-xl ${stage.color} flex items-center justify-center mb-2 shadow-sm`}>
                            <Icon size={17} className="text-white" />
                          </div>
                          <p className="text-xs font-heading font-semibold text-dark leading-snug max-w-[76px]">{stage.label}</p>
                        </div>
                        {i < timelineStages.length - 1 && (
                          <ChevronRight size={14} className="text-slate-400 shrink-0 hidden sm:block" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { type: "Basic Registration",  time: "7 Working Days",   color: "bg-green-50 border-green-200 text-green-700" },
                    { type: "State License",        time: "30–60 Working Days",color: "bg-blue-50 border-blue-200 text-blue-700" },
                    { type: "Central License",      time: "60–90 Working Days",color: "bg-amber-50 border-amber-200 text-amber-700" },
                  ].map(item => (
                    <div key={item.type} className={`border rounded-2xl p-4 text-center ${item.color}`}>
                      <Clock size={18} className="mx-auto mb-2 opacity-70" />
                      <p className="font-heading font-bold text-sm mb-0.5">{item.type}</p>
                      <p className="font-heading font-semibold text-xs opacity-80">{item.time}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 bg-primary/5 border border-primary/15 rounded-xl p-4 flex items-center gap-3">
                  <Info size={15} className="text-primary shrink-0" />
                  <p className="text-dark text-xs leading-relaxed">Timelines are indicative. Inspection scheduling and FSSAI workload may affect actual processing time. Our team follows up proactively at every stage to expedite the process.</p>
                </div>
              </div>
            </section>

            {/* WHAT YOU RECEIVE */}
            <section>
              <Eyebrow label="What You Receive" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">What You Receive from Company Avenue</h2>
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
                        <h3 className="font-heading font-bold text-dark text-sm mb-1">{item.title}</h3>
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
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">Why Choose Company Avenue for FSSAI License?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {whyUs.map(pt => {
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
                    { v: "2,000+", l: "Licenses Filed",    c: "bg-primary text-white" },
                    { v: "100%",   l: "Legal Compliance",  c: "bg-accent text-dark" },
                    { v: "15+",    l: "Years Experience",  c: "bg-slate-800 text-white" },
                    { v: "24 hrs", l: "Response Time",     c: "bg-green-600 text-white" },
                  ].map(s => (
                    <motion.div key={s.l} whileHover={{ y: -4 }} className={`${s.c} rounded-2xl p-6 text-center shadow-card`}>
                      <p className="font-heading font-bold text-3xl leading-none mb-1">{s.v}</p>
                      <p className="text-xs opacity-80 leading-snug">{s.l}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <div className="text-center mb-10">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions — FSSAI License</h2>
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
            <defs>
              <pattern id="cta-fssai" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-fssai)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Start Your Food Business Legally" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Get Your FSSAI License<br />Before You Sell Your First Dish
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Company Avenue Advisory manages your entire FSSAI license journey — from determining the right license type to filing on the FOSCOS portal, inspection coordination, and annual renewal — so you can focus on growing your food business with confidence and compliance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-[#e0b86a] transition-colors"
              >
                Apply for FSSAI License <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Speak to an FSSAI Expert
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {["Basic from ₹1,999", "State from ₹3,999", "Central from ₹7,999", "No Hidden Fees"].map(pt => (
                <div key={pt} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-accent" />
                  <span className="text-white/80 text-sm">{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
