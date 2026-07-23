"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, Clock, Users, Building2, BadgeCheck,
  ShieldCheck, TrendingUp, Award, Repeat2, Globe, Landmark,
  FileText, CreditCard, Fingerprint, Hash, PenLine, Banknote,
  CheckCircle, Plus, Minus, ArrowUpRight, Briefcase, Monitor,
  ShoppingBag, Factory, Layers, Zap, DollarSign, Headphones,
  UserCheck, LifeBuoy, Receipt,
} from "lucide-react";
import { faqs } from "@/lib/faqs/PrivateLimitedPage";

/* ─── shared fade-up variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

/* ─── data ─── */
const quickFacts = [
  { icon: Clock, label: "Timeline", value: "7–10 Working Days" },
  { icon: Users, label: "Min. Directors", value: "2 Directors" },
  { icon: Users, label: "Min. Shareholders", value: "2 Shareholders" },
  { icon: Landmark, label: "Authority", value: "Ministry of Corporate Affairs" },
  { icon: BadgeCheck, label: "Certificate", value: "Certificate of Incorporation" },
  { icon: Repeat2, label: "Validity", value: "Lifetime (with annual compliance)" },
];

const whoShouldRegister = [
  { icon: TrendingUp, title: "Technology Startups", desc: "Seeking investment or scaling fast." },
  { icon: Zap, title: "Fundraising Businesses", desc: "Planning angel or VC funding rounds." },
  { icon: ShoppingBag, title: "E-commerce Businesses", desc: "Selling on Amazon, Flipkart or D2C." },
  { icon: Factory, title: "Manufacturing Companies", desc: "Building products at scale." },
  { icon: Briefcase, title: "Professional Service Firms", desc: "Consultancies, law firms, agencies." },
  { icon: Monitor, title: "IT & SaaS Companies", desc: "Software products and digital services." },
  { icon: Globe, title: "Export Businesses", desc: "Selling goods or services internationally." },
  { icon: Layers, title: "Growing SMEs", desc: "Formalising an existing business." },
];

const benefits = [
  { icon: Building2, title: "Separate Legal Entity", desc: "Company exists independently from its owners — it can own assets, sue and be sued." },
  { icon: ShieldCheck, title: "Limited Liability", desc: "Shareholders' personal assets are protected from business debts and obligations." },
  { icon: TrendingUp, title: "Easy Fund Raising", desc: "Attract angel investors, VCs and bank loans with a credible corporate structure." },
  { icon: Award, title: "Higher Business Credibility", desc: "Clients, partners and banks trust a registered company over a proprietorship." },
  { icon: Repeat2, title: "Perpetual Succession", desc: "Company continues to exist regardless of changes in ownership or directors." },
  { icon: Globe, title: "Better Brand Image", desc: "The 'Pvt. Ltd.' suffix elevates your brand position in the market." },
  { icon: Users, title: "Easy Ownership Transfer", desc: "Shares can be transferred freely between members without legal complications." },
  { icon: DollarSign, title: "Tax Planning", desc: "Access deductions, lower corporate tax rates and ESOP structures." },
];

const comparisonRows = [
  { feature: "Minimum Members", pvt: "2", llp: "2", opc: "1" },
  { feature: "Maximum Members", pvt: "200", llp: "Unlimited", opc: "1" },
  { feature: "Separate Legal Entity", pvt: "✓", llp: "✓", opc: "✓" },
  { feature: "Limited Liability", pvt: "✓", llp: "✓", opc: "✓" },
  { feature: "Fund Raising", pvt: "✓✓ Easy", llp: "Limited", opc: "✗" },
  { feature: "Equity Investment", pvt: "✓ Allowed", llp: "Restricted", opc: "✗" },
  { feature: "Annual Compliance", pvt: "Moderate", llp: "Low", opc: "Moderate" },
  { feature: "Suitable For", pvt: "Startups & SMEs", llp: "Professional Firms", opc: "Solo Founders" },
  { feature: "Business Credibility", pvt: "⭐⭐⭐⭐⭐", llp: "⭐⭐⭐⭐", opc: "⭐⭐⭐" },
  { feature: "Scalability", pvt: "High", llp: "Medium", opc: "Low" },
];

const directorDocs = [
  { icon: CreditCard, label: "PAN Card" },
  { icon: Fingerprint, label: "Aadhaar Card" },
  { icon: FileText, label: "Passport-size Photograph" },
  { icon: Hash, label: "Email Address" },
  { icon: Phone, label: "Mobile Number" },
  { icon: Banknote, label: "Bank Statement or Utility Bill" },
];

const officeDocs = [
  { icon: Zap, label: "Electricity Bill" },
  { icon: Receipt, label: "Property Tax Receipt" },
  { icon: FileText, label: "Rent Agreement (if rented)" },
  { icon: PenLine, label: "No Objection Certificate (NOC)" },
];

const registrationSteps = [
  { n: "01", title: "Free Consultation", desc: "Understand business goals and choose the appropriate company structure." },
  { n: "02", title: "Document Collection", desc: "Collect identity proofs, address proofs and registered office documents." },
  { n: "03", title: "DSC Issuance", desc: "Issue Digital Signature Certificates for all proposed directors." },
  { n: "04", title: "DIN Application", desc: "Apply for Director Identification Numbers via MCA portal." },
  { n: "05", title: "Name Reservation", desc: "Reserve the company name through the RUN (Reserve Unique Name) service." },
  { n: "06", title: "SPICe+ Filing", desc: "Prepare and submit incorporation documents with the MCA." },
  { n: "07", title: "Govt. Verification", desc: "MCA reviews the application and verifies all documents." },
  { n: "08", title: "Certificate Issued", desc: "Receive Certificate of Incorporation along with the CIN." },
  { n: "09", title: "PAN & TAN", desc: "Permanent Account Number and TAN are allotted automatically." },
  { n: "10", title: "Bank & Operations", desc: "Open the company's current account and begin business operations." },
];

const timelineStages = [
  { label: "Consultation", time: "Same Day" },
  { label: "Docs Collected", time: "Day 1" },
  { label: "DSC & DIN", time: "1–2 Days" },
  { label: "Name Approval", time: "2–3 Days" },
  { label: "Govt. Processing", time: "3–5 Days" },
  { label: "Certificate Issued", time: "7–10 Days" },
];

const whatYouReceive = [
  { icon: BadgeCheck, label: "Certificate of Incorporation", color: "text-primary bg-primary/8" },
  { icon: CreditCard, label: "Company PAN", color: "text-blue-600 bg-blue-50" },
  { icon: Hash, label: "Company TAN", color: "text-purple-600 bg-purple-50" },
  { icon: Fingerprint, label: "Director DIN", color: "text-green-600 bg-green-50" },
  { icon: PenLine, label: "Digital Signature", color: "text-orange-600 bg-orange-50" },
  { icon: FileText, label: "MOA & AOA", color: "text-teal-600 bg-teal-50" },
  { icon: Hash, label: "CIN Number", color: "text-rose-600 bg-rose-50" },
];

const postCompliance = [
  { title: "Appoint Auditor", desc: "Appoint a statutory auditor within 30 days of incorporation." },
  { title: "Open Bank Account", desc: "Open a current account in the company name for business transactions." },
  { title: "GST Registration", desc: "Register for GST if turnover exceeds threshold or you trade inter-state." },
  { title: "Accounting Setup", desc: "Set up books of accounts and accounting software from Day 1." },
  { title: "Annual ROC Filing", desc: "File AOC-4 and MGT-7 with MCA every financial year." },
  { title: "Income Tax Return", desc: "File ITR-6 annually with the Income Tax Department." },
  { title: "Board Meetings", desc: "Hold minimum 4 board meetings per year and maintain minutes." },
];

const whyUsPoints = [
  { icon: UserCheck, label: "Experienced Chartered Accountants" },
  { icon: DollarSign, label: "Transparent Pricing — No Hidden Fees" },
  { icon: Headphones, label: "Dedicated Relationship Manager" },
  { icon: Zap, label: "Fast Documentation & Filing" },
  { icon: Monitor, label: "100% Digital Process" },
  { icon: LifeBuoy, label: "End-to-End Compliance Support" },
  { icon: Award, label: "15+ Years of Industry Experience" },
  { icon: Building2, label: "1000+ Businesses Registered" },
];


const relatedServices = [
  { id: "llp-registration", title: "LLP Registration", desc: "Flexible structure for professional firms." },
  { id: "gst-registration", title: "GST Registration", desc: "Obtain GSTIN for your new company." },
  { id: "trademark-registration", title: "Trademark Registration", desc: "Protect your brand name and logo." },
  { id: "startup-india", title: "Startup India", desc: "DPIIT recognition for tax benefits." },
  { id: "accounting-bookkeeping", title: "Accounting Services", desc: "Books, MIS and financial statements." },
  { id: "roc-compliance", title: "ROC Compliance", desc: "Annual MCA filings handled for you." },
];

/* ─── FAQ accordion ─── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
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
            itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
          >
            <p itemProp="text" className="px-5 pb-4 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── main export ─── */
export function PrivateLimitedPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>

        <div className="container-custom relative z-10 py-20 md:py-28">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Private Limited Company</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">MCA Registered Business Consultants</span>
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Private Limited Company<br />
                <span className="text-primary">Registration in India</span>
              </motion.h1>

              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Start your Private Limited Company with complete assistance from experienced
                Chartered Accountants. We handle name approval, incorporation, PAN, TAN
                and post-registration compliance so you can focus on growing your business.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Book Free Consultation <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111" data-track="call"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to an Expert
                </a>
              </motion.div>

              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-wrap gap-x-5 gap-y-2"
              >
                {["7–10 Days Timeline", "100% Online Process", "Expert CAs & CSs", "Transparent Pricing"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Certificate image */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              <div className="relative max-w-md mx-auto">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] overflow-hidden">
                  <div className="bg-primary px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <BadgeCheck size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-xs">Certificate of Incorporation</p>
                        <p className="text-white/50 text-[10px]">Ministry of Corporate Affairs</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-heading font-semibold bg-green-500/20 text-green-300 border border-green-400/30 px-2.5 py-1 rounded-full">● MCA Issued</span>
                  </div>
                  <div className="relative w-full aspect-[4/3] bg-slate-50">
                    <Image
                      src="/images/pvt_ltd_company_certificate_sample.png"
                      alt="Sample Private Limited Company Certificate of Incorporation issued by MCA"
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                    />
                  </div>
                  <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <p className="text-muted text-[10px]">Validity</p>
                      <p className="font-heading font-bold text-primary text-xs">Perpetual — Lifetime</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted text-[10px]">Starting from</p>
                      <p className="font-heading font-bold text-dark text-xs">₹6,999</p>
                    </div>
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-5 top-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Processing Time</p>
                  <p className="font-heading font-bold text-primary text-sm">7–10 Days</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -left-5 bottom-12 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">PAN & TAN</p>
                  <p className="font-heading font-bold text-green-600 text-sm">Included ✓</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          QUICK FACTS
      ════════════════════════════════════════ */}
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

      {/* ════════════════════════════════════════
          WHAT IS A PVT LTD?
      ════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
                <span className="w-6 h-px bg-accent" />Overview<span className="w-6 h-px bg-accent" />
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is a Private Limited Company?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                A Private Limited Company is one of the most preferred business structures in India — a separate legal entity incorporated under the <strong>Companies Act, 2013</strong> and regulated by the <strong>Ministry of Corporate Affairs (MCA)</strong>.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                It provides <strong>limited liability protection</strong> to shareholders, allows easy transfer of ownership, enhances business credibility and makes it significantly easier to raise investments from angel investors, VCs and financial institutions.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Incorporated under Companies Act, 2013",
                  "Governed by MCA & ROC",
                  "Minimum 2, Maximum 200 shareholders",
                  "Shares cannot be publicly traded",
                ].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                <Image
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=85"
                  alt="Professional business consulting team"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">15+</p>
                <p className="text-white/60 text-xs">Years helping businesses incorporate</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHO SHOULD REGISTER
      ════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" />Ideal For<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Should Register a Pvt. Ltd. Company?</h2>
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
        </div>
      </section>

      {/* ════════════════════════════════════════
          KEY BENEFITS
      ════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" />Benefits<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Key Benefits of a Private Limited Company</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  whileHover={{ y: -4 }}
                  className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                    <Icon size={20} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-dark text-sm mb-2">{b.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          COMPARISON TABLE
      ════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" />Compare<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Which Structure is Right for You?</h2>
            <p className="text-muted mt-3 max-w-xl mx-auto text-sm">Private Limited vs LLP vs One Person Company — side by side.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-100">
            <table className="w-full min-w-[640px] border-collapse bg-white">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-4 text-xs font-heading font-semibold text-muted uppercase tracking-wider w-[35%]">Feature</th>
                  <th className="px-5 py-4 text-center w-[21.6%]">
                    <div className="inline-block bg-primary text-white text-xs font-heading font-bold px-4 py-2 rounded-xl">
                      Private Limited ★
                    </div>
                  </th>
                  <th className="px-5 py-4 text-center text-sm font-heading font-semibold text-slate-500 w-[21.6%]">LLP</th>
                  <th className="px-5 py-4 text-center text-sm font-heading font-semibold text-slate-500 w-[21.6%]">OPC</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-50 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-5 py-3.5 text-sm font-heading font-medium text-slate-600">{row.feature}</td>
                    <td className="px-5 py-3.5 text-center text-sm font-heading font-semibold text-primary bg-primary/[0.025] border-x border-primary/10">
                      {row.pvt}
                    </td>
                    <td className="px-5 py-3.5 text-center text-sm text-slate-500">{row.llp}</td>
                    <td className="px-5 py-3.5 text-center text-sm text-slate-500">{row.opc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-muted text-xs mt-4">
            Not sure which structure fits your business?{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              Book a free consultation →
            </Link>
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          DOCUMENTS REQUIRED
      ════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" />Documents<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Documents Required</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Directors */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                  <Users size={18} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-dark text-base">For Directors</h3>
              </div>
              <ul className="space-y-3">
                {directorDocs.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      <Icon size={13} className="text-slate-500" />
                    </div>
                    <span className="text-dark text-sm">{label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Office */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                  <Building2 size={18} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-dark text-base">For Registered Office</h3>
              </div>
              <ul className="space-y-3">
                {officeDocs.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      <Icon size={13} className="text-slate-500" />
                    </div>
                    <span className="text-dark text-sm">{label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-muted text-xs leading-relaxed">
                  ✓ A home address is acceptable as the registered office address.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          REGISTRATION PROCESS — 10 steps
      ════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" />Process<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">
              Simple, Transparent Registration Process
            </h2>
            <p className="text-muted mt-3 text-sm max-w-xl mx-auto">
              10 clearly defined steps — from consultation to operational business.
            </p>
          </div>

          {/* Desktop 5+5 grid */}
          <div className="hidden lg:block space-y-6">
            {[registrationSteps.slice(0, 5), registrationSteps.slice(5)].map((row, rowIdx) => (
              <div key={rowIdx} className="relative">
                <div className="absolute top-7 left-[calc(10%)] right-[calc(10%)] h-px bg-slate-200 z-0" />
                <div className="grid grid-cols-5 gap-4 relative z-10">
                  {row.map((step, i) => (
                    <motion.div key={step.n} custom={rowIdx * 5 + i} variants={fadeUp}
                      initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="relative w-14 h-14 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center mb-4 shadow-sm hover:border-primary transition-colors">
                        <span className="font-heading font-bold text-primary text-sm">{step.n}</span>
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent border-2 border-white" />
                      </div>
                      <p className="font-heading font-semibold text-dark text-xs mb-1.5 leading-snug">{step.title}</p>
                      <p className="text-muted text-[11px] leading-relaxed">{step.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden relative">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-slate-200 z-0" />
            <div className="space-y-6 relative z-10">
              {registrationSteps.map((step, i) => (
                <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-30px" }}
                  className="flex gap-5 items-start pl-2"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center shrink-0 shadow-sm relative">
                    <span className="font-heading font-bold text-primary text-xs">{step.n}</span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent border-2 border-white" />
                  </div>
                  <div className="pt-2">
                    <p className="font-heading font-semibold text-dark text-sm mb-1">{step.title}</p>
                    <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ESTIMATED TIMELINE
      ════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" />Timeline<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl text-dark">Estimated Timeline</h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            {/* Line */}
            <div className="hidden md:block absolute top-8 left-[8%] right-[8%] h-0.5 bg-slate-100 z-0" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
              {timelineStages.map((stage, i) => (
                <motion.div key={stage.label} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center mb-3 border-2 shadow-sm ${i === timelineStages.length - 1 ? "bg-primary border-primary text-white" : "bg-white border-slate-200"}`}>
                    <span className={`font-heading font-bold text-xs leading-snug text-center px-1 ${i === timelineStages.length - 1 ? "text-white" : "text-primary"}`}>
                      {stage.time}
                    </span>
                  </div>
                  <p className={`font-heading font-semibold text-xs leading-snug ${i === timelineStages.length - 1 ? "text-primary" : "text-dark"}`}>
                    {stage.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHAT YOU RECEIVE
      ════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" />Deliverables<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl text-dark">What You Receive After Registration</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 max-w-5xl mx-auto">
            {whatYouReceive.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true }}
                  className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:shadow-card hover:border-primary/10 transition-all group"
                >
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-3`}>
                    <Icon size={18} />
                  </div>
                  <p className="font-heading font-semibold text-dark text-xs leading-snug">{item.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          POST REGISTRATION COMPLIANCE
      ════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" />Post Registration<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Post-Registration Compliance</h2>
            <p className="text-muted mt-3 text-sm">Stay compliant after incorporation — we handle everything.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 max-w-5xl mx-auto">
            {postCompliance.map((item, i) => (
              <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: "-30px" }}
                className="relative bg-white border border-slate-100 rounded-2xl p-4 text-center group hover:border-primary/20 hover:shadow-sm transition-all duration-300"
              >
                {i < postCompliance.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={14} className="text-slate-300" />
                  </div>
                )}
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3">
                  <span className="font-heading font-bold text-white text-xs">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="font-heading font-semibold text-dark text-xs mb-1.5 leading-snug">{item.title}</p>
                <p className="text-muted text-[11px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY COMPANY AVENUE
      ════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/5] max-w-md shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                <Image
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=85"
                  alt="Company Avenue Advisory professional team"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -right-4 bottom-8 bg-white rounded-2xl p-4 shadow-card border border-slate-100">
                <p className="font-heading font-bold text-2xl text-primary leading-none">1000+</p>
                <p className="text-muted text-xs mt-1">Businesses registered</p>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/8 rounded-2xl -z-10" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
                <span className="w-6 h-px bg-accent" />Why Us<span className="w-6 h-px bg-accent" />
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-8 leading-tight">
                Why Businesses Choose<br />Company Avenue
              </h2>
              <div className="space-y-3">
                {whyUsPoints.map((pt, i) => {
                  const Icon = pt.icon;
                  return (
                    <motion.div key={pt.label} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3 hover:border-primary/15 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/8 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-300">
                        <Icon size={15} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="font-heading font-medium text-dark text-sm">{pt.label}</span>
                      <CheckCircle size={14} className="text-green-500 ml-auto shrink-0" />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FAQ
      ════════════════════════════════════════ */}
      <section className="py-24 bg-white" itemScope itemType="https://schema.org/FAQPage">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" />FAQ<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} index={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          RELATED SERVICES
      ════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <h2 className="font-heading font-bold text-2xl text-dark mb-8 text-center">Related Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedServices.map((s, i) => (
              <motion.div key={s.id} custom={i} variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true }}
              >
                <Link href={`/services/${s.id}`}
                  className="group block bg-white border border-slate-100 rounded-2xl p-4 hover:border-primary/20 hover:shadow-card transition-all duration-300 text-center"
                >
                  <p className="font-heading font-semibold text-dark text-xs mb-1 group-hover:text-primary transition-colors leading-snug">{s.title}</p>
                  <p className="text-muted text-[11px] leading-snug mb-3">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-primary font-heading font-semibold">
                    Learn More <ArrowUpRight size={10} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0F2D52] py-24">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: "36px 36px" }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/[0.03] pointer-events-none" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 text-white/50 text-xs font-heading font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Experts Available Mon–Sat, 9 AM – 7 PM
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight max-w-2xl mx-auto">
              Ready to Register Your<br />Private Limited Company?
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Speak with our experts today and complete your company registration with a simple, transparent and fully digital process.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-[#b8892f] text-white font-heading font-semibold text-sm rounded-xl transition-colors shadow-sm"
              >
                Book Free Consultation <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111" data-track="call"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/8 transition-colors"
              >
                <Phone size={15} /> Call Now
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-white/25 text-xs">
              <span>✓ Free consultation</span>
              <span>✓ No hidden fees</span>
              <span>✓ 7–10 day turnaround</span>
              <span>✓ 100% online</span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
