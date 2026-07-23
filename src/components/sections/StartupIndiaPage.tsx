"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, MessageCircle,
  Users, ShieldCheck, TrendingUp, Award, Zap, Clock, FileText,
  Building2, Globe, UserCheck, BadgeCheck, Star,
  Layers, Monitor, Factory, ShoppingBag,
  ChevronRight, AlertCircle, DollarSign,
  PiggyBank, Landmark, Banknote, HeartPulse, GraduationCap, Lightbulb,
  Rocket, FlaskConical, Leaf, Bot, Sprout, CircleDollarSign,
} from "lucide-react";
import { faqs } from "@/lib/faqs/StartupIndiaPage";

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

const heroStats = [
  { value: "7–15 Days", label: "Processing Time" },
  { value: "DPIIT", label: "Recognized Startup" },
  { value: "3 Years", label: "Tax Exemption" },
  { value: "Free", label: "Govt. Application Fee" },
];

const benefits = [
  { icon: PiggyBank, title: "Income Tax Exemption", desc: "Eligible startups can claim 100% tax exemption on profits for 3 consecutive financial years under Section 80-IAC.", color: "bg-green-50 text-green-600" },
  { icon: CircleDollarSign, title: "Angel Tax Exemption", desc: "DPIIT-recognized startups are exempt from Angel Tax (Section 56(2)(viib)) on funds raised from investors.", color: "bg-primary/8 text-primary" },
  { icon: TrendingUp, title: "Easier Fund Raising", desc: "Access to SIDBI Fund of Funds, government seed funds, and recognized investor networks through Startup India.", color: "bg-blue-50 text-blue-600" },
  { icon: ShieldCheck, title: "Self-Certification", desc: "Self-certify compliance under 9 labour laws and 3 environmental laws — no inspector visits for 3–5 years.", color: "bg-teal-50 text-teal-600" },
  { icon: Zap, title: "Fast-Track Patent Filing", desc: "80% rebate on patent fees. Fast-track examination with dedicated IP Facilitation Centre support.", color: "bg-amber-50 text-amber-600" },
  { icon: Landmark, title: "Government Tender Benefits", desc: "Exemption from prior experience and turnover criteria in government procurement. Compete on merit alone.", color: "bg-purple-50 text-purple-600" },
  { icon: Globe, title: "Startup India Learning", desc: "Free access to learning resources, mentorship programs, incubator networks, and international market connect.", color: "bg-rose-50 text-rose-600" },
  { icon: Users, title: "Networking & Ecosystem", desc: "Connect with 100,000+ DPIIT-recognized startups, mentors, investors, and government bodies on the Startup India portal.", color: "bg-indigo-50 text-indigo-600" },
];

const eligibilityItems = [
  { text: "Incorporated as a Pvt. Ltd. Company, LLP, or Registered Partnership Firm", eligible: true },
  { text: "Business is less than 10 years old from date of incorporation", eligible: true },
  { text: "Annual turnover has not exceeded ₹100 Crore in any financial year", eligible: true },
  { text: "Working towards innovation, development, or improvement of a product / service / process", eligible: true },
  { text: "Has a scalable business model with high potential for employment or wealth creation", eligible: true },
  { text: "Not formed by splitting up or restructuring an existing business", eligible: true },
  { text: "Not a subsidiary of or controlled by another entity that is not a startup", eligible: true },
];

const requiredDocs = [
  { icon: FileText, label: "Certificate of Incorporation", note: "Pvt. Ltd. / LLP / Partnership" },
  { icon: FileText, label: "PAN Card", note: "Company / LLP PAN" },
  { icon: Users, label: "Founder Details", note: "Name, designation, contact" },
  { icon: Lightbulb, label: "Business Description", note: "Innovation / scalability pitch" },
  { icon: Globe, label: "Website URL", note: "If available" },
  { icon: FileText, label: "Product / Service Details", note: "What you build / offer" },
  { icon: Banknote, label: "Funding Details", note: "If any investments received" },
  { icon: FileText, label: "Authorization Letter", note: "If applying through CA / agent" },
];

const registrationSteps = [
  { n: "01", icon: UserCheck, title: "Eligibility Assessment", desc: "We review your incorporation date, turnover, entity type, and business model to confirm DPIIT recognition eligibility." },
  { n: "02", icon: FileText, title: "Document Collection", desc: "Gather incorporation certificate, PAN, founder KYC, business pitch deck, and any funding information." },
  { n: "03", icon: Monitor, title: "Startup India Portal Registration", desc: "Create your profile on the Startup India portal (startupindia.gov.in) with complete business details." },
  { n: "04", icon: Rocket, title: "DPIIT Recognition Application", desc: "Submit Form 2 (online self-certification) with business description, innovation details, and supporting documents." },
  { n: "05", icon: ShieldCheck, title: "Review & Verification", desc: "DPIIT reviews the application. We track status and respond to any queries raised during the review process." },
  { n: "06", icon: BadgeCheck, title: "Recognition Certificate Issued", desc: "DPIIT issues the official Startup India Recognition Certificate with a unique recognition number — valid until eligibility criteria are met." },
];

const taxBenefits = [
  {
    title: "Income Tax Exemption",
    section: "Section 80-IAC",
    badge: "bg-green-50 text-green-700 border-green-200",
    desc: "Eligible DPIIT-recognized startups can apply for 100% exemption on profits for 3 consecutive financial years out of the first 10 years since incorporation. Requires approval from the Inter-Ministerial Board (IMB).",
    points: ["Applicable to Pvt. Ltd. & LLPs", "3 out of first 10 years", "IMB approval required", "No carry forward restrictions"],
  },
  {
    title: "Angel Tax Exemption",
    section: "Section 56(2)(viib)",
    badge: "bg-primary/5 text-primary border-primary/20",
    desc: "DPIIT-recognized startups are fully exempt from Angel Tax on funds received from investors above fair market value. This removes a major compliance burden for early-stage fundraising.",
    points: ["Full exemption from Angel Tax", "Applies to all DPIIT-recognized startups", "No cap on funding amount", "Covers domestic investors"],
  },
  {
    title: "Patent Fee Rebate",
    section: "IP Support",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    desc: "Startups receive 80% rebate on patent filing fees and fast-track examination. An IP Facilitation Centre provides free advisory on patents, trademarks, design, and copyright.",
    points: ["80% rebate on patent fees", "Fast-track IP examination", "Free IP facilitation support", "Trademark & design support"],
  },
  {
    title: "Government Tender Relaxation",
    section: "Public Procurement",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    desc: "Recognized startups are exempt from prior experience and turnover requirements in government procurement. EMD (Earnest Money Deposit) exemption also available in certain tender processes.",
    points: ["No prior experience required", "No turnover criteria", "EMD exemption possible", "Compete on merit"],
  },
];

const whoShouldApply = [
  { icon: Monitor, label: "Tech Startups" },
  { icon: Layers, label: "SaaS Companies" },
  { icon: Factory, label: "Deep Tech & Manufacturing" },
  { icon: ShoppingBag, label: "D2C Brands" },
  { icon: HeartPulse, label: "HealthTech & Clinics" },
  { icon: CircleDollarSign, label: "FinTech Startups" },
  { icon: GraduationCap, label: "EdTech Companies" },
  { icon: Bot, label: "AI / ML Companies" },
  { icon: Sprout, label: "AgriTech Startups" },
  { icon: Leaf, label: "CleanTech & GreenTech" },
  { icon: FlaskConical, label: "BioTech & Life Sciences" },
  { icon: Globe, label: "Export-Oriented Startups" },
];

const whyUsPoints = [
  { icon: Award, title: "Startup Registration Specialists", desc: "We've guided 500+ startups through DPIIT recognition. We know exactly what DPIIT looks for in the application." },
  { icon: FileText, title: "Complete Documentation Support", desc: "From business pitch preparation to innovation description — we handle every document that strengthens your application." },
  { icon: Rocket, title: "End-to-End Application Filing", desc: "We manage your entire Startup India portal registration and DPIIT application so you focus on building." },
  { icon: UserCheck, title: "Dedicated Expert Assigned", desc: "One CA/expert manages your application from assessment to certificate delivery with regular status updates." },
  { icon: Clock, title: "Fast-Track Processing", desc: "We know the process inside-out. Most applications are submitted within 2 business days of document receipt." },
  { icon: DollarSign, title: "Transparent, Fixed Pricing", desc: "No hidden fees. One flat professional fee covering eligibility check, documentation, and complete filing." },
  { icon: ShieldCheck, title: "Post-Recognition Support", desc: "We help you leverage your recognition — tax exemption applications, patent filings, and scheme benefits after certification." },
  { icon: TrendingUp, title: "Funding Readiness Guidance", desc: "Post-recognition, we advise on SIDBI Fund of Funds, government grants, and angel investor readiness." },
];


const relatedServices = [
  { id: "private-limited-company", title: "Company Registration", desc: "Incorporate your Pvt. Ltd. company." },
  { id: "llp-registration", title: "LLP Registration", desc: "Register your LLP firm." },
  { id: "msme-registration", title: "MSME / Udyam Registration", desc: "Unlock MSME government benefits." },
  { id: "gst-registration", title: "GST Registration", desc: "Obtain GSTIN for your startup." },
  { id: "trademark-registration", title: "Trademark Registration", desc: "Protect your startup's brand." },
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping", desc: "Investor-ready books & reports." },
];

// (no inline components needed)

/* ══════════ STICKY SIDEBAR ══════════ */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">Startup India Registration</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Get DPIIT recognition with expert assistance. Free eligibility check included.</p>
        <div className="space-y-2 mb-5">
          {["Eligibility Assessment", "Documentation Support", "Application Filing", "Startup India Portal Registration", "DPIIT Recognition Assistance"].map(pt => (
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
          >Book Free Consultation</Link>
          <a href="https://wa.me/919953719111" data-track="whatsapp" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          ><MessageCircle size={13} /> WhatsApp</a>
        </div>
      </div>

      {/* Quick facts */}
      <div className="bg-primary rounded-2xl p-5 text-white">
        <p className="font-heading font-bold text-sm mb-4">Quick Facts</p>
        <div className="space-y-3">
          {[
            { label: "Authority", value: "DPIIT, Govt. of India" },
            { label: "Govt. Fee", value: "₹0 — Free" },
            { label: "Portal", value: "startupindia.gov.in" },
            { label: "Processing", value: "7–15 Working Days" },
            { label: "Tax Exemption", value: "Up to 3 Years" },
            { label: "Angel Tax", value: "Fully Exempt" },
          ].map(f => (
            <div key={f.label} className="flex items-center justify-between">
              <span className="text-white/50 text-xs">{f.label}</span>
              <span className="text-white text-xs font-heading font-semibold">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Nav */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-sm mb-3">Quick Navigation</p>
        <div className="space-y-1">
          {[
            { href: "#what-is", label: "What is Startup India?" },
            { href: "#benefits", label: "Benefits & Schemes" },
            { href: "#eligibility", label: "Eligibility Criteria" },
            { href: "#documents", label: "Required Documents" },
            { href: "#process", label: "Registration Process" },
            { href: "#tax", label: "Tax Benefits" },
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

      {/* Stats */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "500+", l: "Startups Registered" }, { v: "100%", l: "Success Rate" }, { v: "15+", l: "Years Exp." }, { v: "2 Days", l: "Avg. Submission" }].map(s => (
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
export function StartupIndiaPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="startup-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#startup-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Startup India Registration</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">DPIIT Recognition Assistance • Startup India Experts • Fast Processing</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Startup India<br /><span className="text-primary">DPIIT Recognition</span><br />Registration
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Get DPIIT Startup India Recognition to unlock tax exemptions, angel tax relief, funding opportunities, patent rebates, and exclusive startup benefits — handled end-to-end by our experts.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Get Startup India Recognition <ArrowRight size={15} />
                </Link>
                <Link href="#eligibility"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <CheckCircle size={14} /> Free Eligibility Check
                </Link>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["DPIIT Recognition Assistance", "Startup India Experts", "End-to-End Documentation", "Fast Processing"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Startup India Certificate */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              <div className="relative max-w-md mx-auto">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] overflow-hidden">
                  {/* Card header */}
                  <div className="bg-primary px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <Rocket size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-xs">Startup India Recognition Certificate</p>
                        <p className="text-white/50 text-[10px]">Dept. for Promotion of Industry & Internal Trade (DPIIT)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-heading font-semibold bg-green-500/20 text-green-300 border border-green-400/30 px-2.5 py-1 rounded-full">● DPIIT Issued</span>
                  </div>
                  {/* Certificate image */}
                  <div className="relative w-full aspect-[4/3] bg-slate-50">
                    <Image
                      src="/images/startup-sahay-startup-india-certificate.webp"
                      alt="Sample Startup India DPIIT Recognition Certificate"
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                    />
                  </div>
                  {/* Card footer */}
                  <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <p className="text-muted text-[10px]">Recognition</p>
                      <p className="font-heading font-bold text-primary text-xs">DPIIT Recognized Startup</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted text-[10px]">Tax Exemption</p>
                      <p className="font-heading font-bold text-green-600 text-xs">Eligible ✓</p>
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-5 top-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Angel Tax</p>
                  <p className="font-heading font-bold text-primary text-sm">Fully Exempt ✓</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -left-5 bottom-12 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Processing Time</p>
                  <p className="font-heading font-bold text-green-600 text-sm">7–15 Days</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Hero stats strip */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center hover:border-primary/20 hover:bg-primary/[0.02] transition-colors">
                <p className="font-heading font-bold text-primary text-xl leading-none mb-1">{s.value}</p>
                <p className="text-muted text-xs">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ MAIN CONTENT + STICKY SIDEBAR ══ */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* ── WHAT IS STARTUP INDIA ── */}
            <section id="what-is">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Overview" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  What is Startup India Registration?
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <p className="text-muted text-base leading-relaxed">
                    <strong className="text-dark">Startup India</strong> is a flagship initiative of the Government of India launched in January 2016. The <strong className="text-dark">DPIIT (Department for Promotion of Industry and Internal Trade)</strong> grants official recognition to eligible startups, making them part of India&apos;s regulated startup ecosystem.
                  </p>
                  <p className="text-muted text-base leading-relaxed">
                    DPIIT Recognition is not the same as company registration. It&apos;s an <strong className="text-dark">additional government certification</strong> that certifies your innovative business model and unlocks a stack of exclusive benefits unavailable to regular businesses.
                  </p>
                  <p className="text-muted text-base leading-relaxed">
                    Any Pvt. Ltd., LLP, or registered partnership firm that is less than 10 years old, with turnover below ₹100 Crore, and working towards innovation or scalability can apply — <strong className="text-dark">completely free of government charges</strong>.
                  </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-3"
                >
                  {[
                    { icon: Rocket, title: "Government-Backed Startup Ecosystem", desc: "Access to 100,000+ recognized startups, investors, and mentors on the official portal." },
                    { icon: PiggyBank, title: "3 Years Income Tax Exemption", desc: "Eligible startups can claim 100% tax exemption on profits for 3 consecutive years." },
                    { icon: ShieldCheck, title: "Labour & Environment Law Relief", desc: "Self-certify compliance under 9 labour laws and 3 environmental laws — no inspector visits." },
                    { icon: Zap, title: "Patent Filing at 20% of Normal Cost", desc: "80% rebate on patent fees with fast-track examination." },
                  ].map(item => (
                    <div key={item.title} className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-card hover:border-primary/15 transition-all">
                      <div className="w-8 h-8 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                        <item.icon size={15} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-dark text-sm">{item.title}</p>
                        <p className="text-muted text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ── BENEFITS ── */}
            <section id="benefits">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Benefits" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  8 Benefits of Startup India Recognition
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  A single DPIIT certificate unlocks an entire ecosystem of government support, financial relief, and regulatory ease.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">
                {benefits.map((b, i) => (
                  <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card-hover hover:border-primary/20 transition-all group col-span-1"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${b.color} group-hover:scale-105 transition-transform`}>
                      <b.icon size={18} />
                    </div>
                    <p className="font-heading font-bold text-dark text-sm mb-1.5">{b.title}</p>
                    <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── ELIGIBILITY ── */}
            <section id="eligibility">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Eligibility Criteria" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Is Your Startup Eligible?
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Check each criterion below. All conditions must be met simultaneously to qualify for DPIIT recognition.
                </p>
              </motion.div>
              <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card">
                <div className="bg-primary px-5 py-3.5 flex items-center gap-2">
                  <CheckCircle size={15} className="text-accent" />
                  <p className="font-heading font-bold text-white text-sm">DPIIT Recognition Eligibility Checklist</p>
                </div>
                <div className="divide-y divide-slate-50">
                  {eligibilityItems.map((item, i) => (
                    <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="shrink-0 w-7 h-7 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
                        <CheckCircle size={14} className="text-green-600" />
                      </div>
                      <p className="text-dark text-sm font-heading font-medium leading-snug">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-amber-50 border-t border-amber-100 px-5 py-3 flex items-start gap-2">
                  <AlertCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-amber-700 text-xs font-heading font-medium leading-relaxed">If you&apos;re unsure about any criterion — especially &quot;innovation&quot; and &quot;scalability&quot; — our experts will assess your business model during the free consultation.</p>
                </div>
              </div>
            </section>

            {/* ── REQUIRED DOCUMENTS ── */}
            <section id="documents">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Documents Required" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  What You Need to Apply
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  The Startup India portal requires minimal documentation. Most information is entered online — no bulk document uploads.
                </p>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                {requiredDocs.map((doc, i) => (
                  <motion.div key={doc.label} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-card hover:border-primary/20 transition-all group text-center"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/15 transition-colors">
                      <doc.icon size={18} className="text-primary" />
                    </div>
                    <p className="font-heading font-semibold text-dark text-xs mb-1">{doc.label}</p>
                    <p className="text-muted text-[10px] leading-relaxed">{doc.note}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
                className="bg-primary/5 border border-primary/15 rounded-2xl p-5 flex items-start gap-3"
              >
                <Lightbulb size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-semibold text-primary text-sm mb-1">The Business Description Matters Most</p>
                  <p className="text-muted text-xs leading-relaxed">DPIIT&apos;s primary evaluation is based on your business pitch — how innovative and scalable your model is. We help craft a compelling, DPIIT-compliant description that maximizes approval chances.</p>
                </div>
              </motion.div>
            </section>

            {/* ── PROCESS TIMELINE ── */}
            <section id="process">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Registration Process" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  How We Get You DPIIT Recognized
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  A structured 6-step process from eligibility assessment to certificate delivery — completely managed by our team.
                </p>
              </motion.div>
              <div className="relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent hidden md:block" />
                <div className="space-y-4">
                  {registrationSteps.map((step, i) => (
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
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {[
                  { label: "Documents Ready", time: "Day 1–2", color: "bg-blue-50 border-blue-100 text-blue-700" },
                  { label: "Application Submitted", time: "Day 2–3", color: "bg-primary/5 border-primary/20 text-primary" },
                  { label: "Certificate Issued", time: "Day 7–15", color: "bg-green-50 border-green-100 text-green-700" },
                ].map(t => (
                  <div key={t.label} className={`border rounded-2xl p-4 text-center ${t.color}`}>
                    <p className="font-heading font-bold text-sm">{t.time}</p>
                    <p className="text-xs opacity-70 mt-0.5">{t.label}</p>
                  </div>
                ))}
              </motion.div>
            </section>

            {/* ── TAX BENEFITS ── */}
            <section id="tax">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Tax Benefits" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Tax & Financial Benefits Explained
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  DPIIT recognition unlocks significant financial benefits that can save your startup lakhs every year.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {taxBenefits.map((t, i) => (
                  <motion.div key={t.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-card transition-all"
                  >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                      <p className="font-heading font-bold text-dark text-sm">{t.title}</p>
                      <span className={`text-[10px] font-heading font-semibold px-2.5 py-1 rounded-full border ${t.badge}`}>{t.section}</span>
                    </div>
                    <div className="p-5">
                      <p className="text-muted text-xs leading-relaxed mb-4">{t.desc}</p>
                      <div className="space-y-1.5">
                        {t.points.map(p => (
                          <div key={p} className="flex items-center gap-2">
                            <CheckCircle size={12} className="text-primary shrink-0" />
                            <span className="text-dark text-xs">{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── WHO SHOULD APPLY ── */}
            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Who Should Apply" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Built for Every Type of Startup
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Any sector, any stage — if you&apos;re building something innovative and scalable, DPIIT recognition is for you.
                </p>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {whoShouldApply.map((w, i) => (
                  <motion.div key={w.label} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="flex items-center gap-3 p-4 border border-slate-100 rounded-2xl bg-white hover:shadow-card hover:border-primary/20 hover:bg-primary/[0.02] transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors shrink-0">
                      <w.icon size={16} className="text-primary" />
                    </div>
                    <p className="font-heading font-semibold text-dark text-xs leading-snug">{w.label}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── WHY US ── */}
            <section id="why-us">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Why Company Avenue" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Why Startups Choose Us
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  500+ startups have received their DPIIT recognition through Company Avenue. Here&apos;s what makes us different.
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
                  Everything founders ask before getting their DPIIT recognition.
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

      {/* ══ BOTTOM CTA ══ */}
      <section className="bg-gradient-to-br from-primary to-[#154D8C] py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-5">
              <span className="w-6 h-px bg-accent" />Ready to Register Your Startup?<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white leading-tight tracking-tight mb-5">
              Get Your Startup India Recognition<br />and Unlock Exclusive Government Benefits
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Get your Startup India Recognition with expert assistance from Company Avenue and unlock exclusive government benefits, tax exemptions, funding opportunities, and startup ecosystem support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-accent-light transition-colors shadow-lg shadow-accent/20"
              >
                Get Started Today <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111" data-track="call"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 border border-white/20 transition-colors"
              >
                <Phone size={14} /> Talk to an Expert
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {["₹0 Government Fee", "Income Tax Exemption Eligible", "Angel Tax Fully Exempt", "7–15 Day Processing"].map(pt => (
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
