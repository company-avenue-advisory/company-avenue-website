"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, MessageCircle,
  Users, ShieldCheck, TrendingUp, Award, Zap, Clock, FileText,
  Building2, Globe, UserCheck, BadgeCheck, Download, Star,
  Layers, Monitor, Factory, ShoppingBag, Briefcase, Lock,
  ChevronRight, AlertCircle, DollarSign, CreditCard,
  Receipt, PiggyBank, BarChart3, Landmark, Banknote,
  HeartPulse, Fingerprint, Hash, RefreshCcw, Package,
  Truck, Plane, Ship, CircleDollarSign, BarChart2,
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
  { value: "2–5 Days", label: "Processing Time" },
  { value: "DGFT", label: "Issued By" },
  { value: "Lifetime", label: "Validity" },
  { value: "Free", label: "Govt. Application Fee" },
];

const benefits = [
  { icon: Truck, title: "Import & Export Legally", desc: "IEC is mandatory for customs clearance of any import or export.", color: "bg-primary/8 text-primary" },
  { icon: Globe, title: "International Market Access", desc: "Sell on global marketplaces and supply to international buyers.", color: "bg-blue-50 text-blue-600" },
  { icon: Ship, title: "Easy Customs Clearance", desc: "IEC is required at every port for customs clearance of goods.", color: "bg-teal-50 text-teal-600" },
  { icon: PiggyBank, title: "Government Export Incentives", desc: "Access duty drawback, RoDTEP, and MEIS/SEIS schemes exclusively for IEC holders.", color: "bg-green-50 text-green-600" },
  { icon: TrendingUp, title: "Global Business Expansion", desc: "Trade with customers across 200+ countries legally and efficiently.", color: "bg-amber-50 text-amber-600" },
  { icon: RefreshCcw, title: "Lifetime Validity", desc: "Valid for lifetime — no renewal, no recurring fee, no expiry.", color: "bg-purple-50 text-purple-600" },
  { icon: BadgeCheck, title: "No Annual Renewal", desc: "No recurring filings or annual fee — register once, use forever.", color: "bg-rose-50 text-rose-600" },
  { icon: Award, title: "Better Business Credibility", desc: "Banks, buyers, and logistics partners recognize IEC-registered businesses as legitimate trade entities.", color: "bg-indigo-50 text-indigo-600" },
];

const whoNeeds = [
  { icon: Plane, label: "Exporters" },
  { icon: Truck, label: "Importers" },
  { icon: Factory, label: "Manufacturers" },
  { icon: ShoppingBag, label: "E-commerce Sellers" },
  { icon: Globe, label: "Service Exporters" },
  { icon: Monitor, label: "Amazon Global Sellers" },
  { icon: Zap, label: "Startups" },
  { icon: Building2, label: "MSMEs" },
  { icon: Briefcase, label: "Traders & Distributors" },
  { icon: Users, label: "Consultants Exporting Services" },
  { icon: Ship, label: "Freight & Logistics Firms" },
  { icon: Layers, label: "Import-Export Agents" },
];

const requiredDocs = [
  { icon: CreditCard, label: "PAN Card", note: "Business / Individual PAN" },
  { icon: Fingerprint, label: "Aadhaar Card", note: "Proprietor / Director / Partner" },
  { icon: FileText, label: "Business Registration", note: "Pvt. Ltd. / LLP / Partnership cert." },
  { icon: Receipt, label: "GST Certificate", note: "If GST registered" },
  { icon: Landmark, label: "Address Proof", note: "Utility bill / rent agreement" },
  { icon: Banknote, label: "Bank Account Details", note: "Account no. & IFSC code" },
  { icon: FileText, label: "Cancelled Cheque", note: "Current account preferred" },
  { icon: Hash, label: "Digital Signature", note: "Class 3 DSC (if required)" },
];

const registrationSteps = [
  { n: "01", icon: UserCheck, title: "Consultation & Eligibility Check", desc: "We review your entity type and trade requirements to confirm the right IEC application approach." },
  { n: "02", icon: FileText, title: "Document Collection", desc: "Submit PAN, Aadhaar, business registration, bank details, and address proof via our secure portal." },
  { n: "03", icon: Monitor, title: "DGFT Portal Registration", desc: "Create your DGFT profile with accurate business information and GSTIN linking." },
  { n: "04", icon: Globe, title: "IEC Application Submission", desc: "File the online application (ANF 2A) with all required details and documents." },
  { n: "05", icon: ShieldCheck, title: "Verification", desc: "DGFT verifies against PAN, bank, and GST data. We track status and handle deficiency notices." },
  { n: "06", icon: BadgeCheck, title: "IEC Certificate Issued", desc: "Your 10-digit IEC code is issued by DGFT and the e-IEC certificate is available for download — valid for lifetime." },
];

const whyImportant = [
  { icon: Truck, title: "Mandatory for Imports", desc: "No goods can be imported without a valid IEC — customs will not release shipments.", color: "bg-primary/8 text-primary", border: "border-primary/20" },
  { icon: Plane, title: "Mandatory for Exports", desc: "All exporters must quote IEC in shipping bills and export documentation.", color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
  { icon: Ship, title: "Required for Customs", desc: "IEC is the primary identifier at Indian ports and airports for every customs declaration.", color: "bg-teal-50 text-teal-600", border: "border-teal-100" },
  { icon: CircleDollarSign, title: "Needed for Foreign Payments", desc: "Banks require IEC when processing foreign remittances for trade transactions under FEMA.", color: "bg-green-50 text-green-600", border: "border-green-100" },
  { icon: BarChart3, title: "Enables Export Schemes", desc: "RoDTEP, MEIS, SEIS, Advance Authorisation — all require a valid IEC.", color: "bg-amber-50 text-amber-600", border: "border-amber-100" },
  { icon: TrendingUp, title: "Supports Global Expansion", desc: "Without IEC, you legally cannot participate in cross-border commerce.", color: "bg-purple-50 text-purple-600", border: "border-purple-100" },
];

const govtBenefits = [
  {
    title: "Duty Drawback Scheme",
    badge: "CBIC",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-100",
    desc: "Claim refund of customs duties paid on imported inputs used in exported goods. IEC is mandatory.",
    points: ["Refund of import duties on inputs", "Available for all exporters", "Filed through customs after export", "IEC mandatory for claims"],
  },
  {
    title: "RoDTEP Scheme",
    badge: "DGFT",
    badgeColor: "bg-green-50 text-green-700 border-green-100",
    desc: "Remission of embedded taxes and levies on exported products not covered under other schemes.",
    points: ["Covers taxes not refunded elsewhere", "Available to all IEC holders", "Automatic credit in ICEGATE", "Covers 8,555+ tariff lines"],
  },
  {
    title: "Export Promotion Schemes",
    badge: "Commerce Ministry",
    badgeColor: "bg-primary/5 text-primary border-primary/20",
    desc: "Access MEIS, SEIS, Advance Authorisation, EPCG, and other export incentive schemes for IEC holders.",
    points: ["Advance Authorisation for imports", "EPCG for capital goods", "Export credit from banks", "Trade facilitation support"],
  },
  {
    title: "Export Financing",
    badge: "ECGC / EXIM Bank",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-100",
    desc: "Access pre/post-shipment credit, ECGC export insurance, and EXIM Bank financing with a valid IEC.",
    points: ["Pre & post-shipment finance", "ECGC export credit insurance", "EXIM Bank buyer credit", "Priority sector lending"],
  },
];

const whyUsPoints = [
  { icon: Award, title: "DGFT Registration Experts", desc: "1,000+ IEC registrations handled across proprietorships, companies, LLPs, and individuals." },
  { icon: FileText, title: "End-to-End Registration", desc: "From DGFT portal setup to application submission — every step handled for you." },
  { icon: Clock, title: "Fast 2-Day Processing", desc: "Applications submitted within 1 business day of receiving complete documents." },
  { icon: UserCheck, title: "Complete Documentation", desc: "All documents verified before submission — zero deficiency notices, zero rejections." },
  { icon: DollarSign, title: "Transparent Fixed Pricing", desc: "One flat fee for the entire process. No surprises, no add-ons." },
  { icon: ShieldCheck, title: "Dedicated Relationship Manager", desc: "One expert manages your IEC from application to certificate with regular updates." },
  { icon: TrendingUp, title: "Post-Registration Guidance", desc: "After IEC, get clarity on RoDTEP, duty drawback, and export scheme eligibility." },
  { icon: Globe, title: "Business Expansion Support", desc: "Connect with export promotion resources, FIEO guidance, and international trade advisory." },
];

const faqs = [
  { q: "What is an Import Export Code (IEC)?", a: "IEC is a 10-digit business identification number issued by DGFT, Ministry of Commerce. It is mandatory for any person or business that imports or exports goods/services from India, and is linked to the PAN of the business or individual." },
  { q: "Is IEC registration mandatory?", a: "Yes — without a valid IEC, customs won't clear goods, banks won't process foreign trade remittances, and export schemes are inaccessible. Exemptions apply only to personal-use imports/exports and certain government entities." },
  { q: "Who issues the IEC?", a: "The Directorate General of Foreign Trade (DGFT), under the Ministry of Commerce and Industry, issues the IEC. Applications are filed online at dgft.gov.in." },
  { q: "How long does IEC registration take?", a: "Typically 2–5 working days after a complete application is submitted. Applications are filed within 1 business day of receiving all documents. Delays occur only from PAN, bank, or GST data mismatches." },
  { q: "Does the IEC expire?", a: "No — IEC is valid for lifetime with no annual renewal fee. However, holders must update their details (address, bank, GST) annually on the DGFT portal to keep the registration active." },
  { q: "Is GST registration mandatory for IEC?", a: "No. GST is not required to get an IEC, but if your business is GST-registered, link your GSTIN on the DGFT portal. Service exporters also need a GST LUT for zero-rated exports." },
  { q: "Can an individual (sole proprietor) apply for IEC?", a: "Yes. Sole proprietors can apply using their personal PAN and Aadhaar. IEC is issued in the firm's name. Proprietorships, partnerships, LLPs, and private limited companies are all eligible." },
  { q: "Can freelancers exporting services obtain IEC?", a: "Yes. Service exporters — freelancers, IT consultants, designers — should obtain IEC. Banks increasingly require it when processing foreign inward remittances classified as export of services under FEMA." },
  { q: "Can IEC be modified or updated later?", a: "Yes. IEC can be updated online anytime for business name, address, bank details, partner/director info, GSTIN, and activity type. Modification support is available at nominal charges." },
  { q: "What happens if I import or export without an IEC?", a: "It violates the Foreign Trade (Development and Regulation) Act, 1992. Consequences include customs seizure, inability to release shipments, denial of export incentives, bank refusal on remittances, and DGFT penalties." },
  { q: "Can IEC be surrendered or cancelled?", a: "Yes. If a business closes or stops trading, the holder can surrender the IEC to DGFT. DGFT can also cancel it for fraudulent registration or failure to update annual details." },
  { q: "Is a separate IEC required for each branch or state?", a: "No — one IEC covers all branches, factories, and offices of the same entity across India. One IEC per PAN is the rule, though each linked GSTIN may need separate registration on the DGFT portal." },
];

const relatedServices = [
  { id: "gst-registration", title: "GST Registration", desc: "Obtain GSTIN for your business." },
  { id: "startup-india", title: "Startup India Registration", desc: "DPIIT recognition & startup benefits." },
  { id: "msme-registration", title: "MSME / Udyam Registration", desc: "Unlock MSME government benefits." },
  { id: "private-limited-company", title: "Company Registration", desc: "Incorporate your Pvt. Ltd. company." },
  { id: "trademark-registration", title: "Trademark Registration", desc: "Protect your export brand." },
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping", desc: "Export-ready books & compliance." },
];

/* ══════════ STICKY SIDEBAR ══════════ */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">Import Export Code Registration</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Get your DGFT IEC in 2–5 days. Free eligibility check included.</p>
        <div className="space-y-2 mb-5">
          {["Eligibility Check", "DGFT Registration", "Documentation Support", "Online Filing", "Expert Assistance"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <a href="tel:+919876543210"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          ><Phone size={13} /> Call Now</a>
          <Link href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          >Apply for IEC</Link>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          ><MessageCircle size={13} /> WhatsApp</a>
        </div>
      </div>

      {/* Quick facts */}
      <div className="bg-primary rounded-2xl p-5 text-white">
        <p className="font-heading font-bold text-sm mb-4">Quick Facts</p>
        <div className="space-y-3">
          {[
            { label: "Issuing Authority", value: "DGFT, Govt. of India" },
            { label: "Govt. Fee", value: "₹0 — Free" },
            { label: "Portal", value: "dgft.gov.in" },
            { label: "Processing Time", value: "2–5 Working Days" },
            { label: "Validity", value: "Lifetime — No Renewal" },
            { label: "Digit Code", value: "10-Digit PAN-Based" },
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
            { href: "#what-is", label: "What is IEC?" },
            { href: "#benefits", label: "Benefits of IEC" },
            { href: "#who-needs", label: "Who Needs IEC?" },
            { href: "#documents", label: "Documents Required" },
            { href: "#process", label: "Registration Process" },
            { href: "#importance", label: "Why IEC is Important" },
            { href: "#schemes", label: "Govt. Schemes" },
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
          {[{ v: "1000+", l: "IECs Issued" }, { v: "2 Days", l: "Avg. Processing" }, { v: "100%", l: "Success Rate" }, { v: "Free", l: "Govt. Fee" }].map(s => (
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
export function IECRegistrationPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="iec-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#iec-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">IEC Registration</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">DGFT Authorized • End-to-End Documentation • Nationwide Service</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Import Export Code<br /><span className="text-primary">(IEC) Registration</span><br />Online — DGFT
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Get your Import Export Code from DGFT and start trading globally. Full documentation, DGFT portal filing, and post-registration support included.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Get IEC Registration <ArrowRight size={15} />
                </Link>
                <a href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to an Expert
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["DGFT Authorized Registration", "End-to-End Documentation", "Quick Processing", "Nationwide Service"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — IEC Certificate */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              <div className="relative max-w-md mx-auto">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] overflow-hidden">
                  <div className="bg-primary px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <Globe size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-xs">Importer Exporter Code Certificate</p>
                        <p className="text-white/50 text-[10px]">Directorate General of Foreign Trade (DGFT)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-heading font-semibold bg-green-500/20 text-green-300 border border-green-400/30 px-2.5 py-1 rounded-full">● DGFT Issued</span>
                  </div>
                  <div className="relative w-full aspect-[4/3] bg-slate-50">
                    <Image
                      src="/images/CERTIFICATE-OF-IMPORTER-EXPORTER-CODE-IEC-1.jpg"
                      alt="Sample Import Export Code IEC Certificate issued by DGFT"
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                    />
                  </div>
                  <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <p className="text-muted text-[10px]">Validity</p>
                      <p className="font-heading font-bold text-primary text-xs">Lifetime — No Renewal</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted text-[10px]">Trade Status</p>
                      <p className="font-heading font-bold text-green-600 text-xs">Global Trade Ready ✓</p>
                    </div>
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-5 top-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Processing Time</p>
                  <p className="font-heading font-bold text-primary text-sm">2–5 Days</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -left-5 bottom-12 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Govt. Fee</p>
                  <p className="font-heading font-bold text-green-600 text-sm">₹0 — Free</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Hero stats strip */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {heroStats.map(s => (
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

            {/* ── WHAT IS IEC ── */}
            <section id="what-is">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Overview" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  What is Import Export Code (IEC)?
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-4">
                  <p className="text-muted text-base leading-relaxed">
                    The <strong className="text-dark">Import Export Code (IEC)</strong> is a mandatory 10-digit business identification number issued by the <strong className="text-dark">Directorate General of Foreign Trade (DGFT)</strong>, Ministry of Commerce, Government of India. Required by every person or business that imports or exports goods and services from India.
                  </p>
                  <p className="text-muted text-base leading-relaxed">
                    Linked to your PAN, IEC is a <strong className="text-dark">one-time registration with lifetime validity</strong> — no annual renewal, no recurring compliance, and no government fee.
                  </p>
                  <p className="text-muted text-base leading-relaxed">
                    Without IEC, customs won't clear shipments, banks won't process foreign remittances, and you can't claim export incentives or duty drawback.
                  </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-3">
                  {[
                    { icon: Globe, title: "Issued by DGFT, Govt. of India", desc: "The only government ID required for all cross-border trade transactions." },
                    { icon: RefreshCcw, title: "Lifetime Validity, Zero Renewal", desc: "Register once. Use forever. No annual fee, no expiry, no recurring compliance." },
                    { icon: BadgeCheck, title: "Not the Same as GST", desc: "GST covers taxation; IEC authorizes customs clearance and international trade." },
                    { icon: Truck, title: "Mandatory for Customs Clearance", desc: "Every import/export declaration at Indian ports must quote a valid IEC." },
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
                  8 Benefits of IEC Registration
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  A single IEC code unlocks the full scope of international trade — legally, financially, and commercially.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {benefits.map((b, i) => (
                  <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card-hover hover:border-primary/20 transition-all group"
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

            {/* ── WHO NEEDS IEC ── */}
            <section id="who-needs">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Who Needs IEC" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Who Needs an Import Export Code?
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Any individual or business importing goods, exporting goods/services, or receiving foreign remittances must have an IEC.
                </p>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {whoNeeds.map((w, i) => (
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
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-5 flex items-start gap-3"
              >
                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-amber-700 text-sm font-heading font-medium leading-relaxed">
                  <strong>Exemptions:</strong> Imports/exports for personal use not connected to trade or business, and imports/exports by government ministries and departments are exempt from IEC requirement.
                </p>
              </motion.div>
            </section>

            {/* ── REQUIRED DOCUMENTS ── */}
            <section id="documents">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Documents Required" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Documents Needed for IEC Registration
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  IEC registration is entirely online. Keep these documents ready for quick submission.
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
                <BadgeCheck size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-semibold text-primary text-sm mb-1">Fully Online — No Physical Submission</p>
                  <p className="text-muted text-xs leading-relaxed">IEC registration is 100% online via the DGFT portal. All documents are uploaded digitally — no physical visit to DGFT offices required.</p>
                </div>
              </motion.div>
            </section>

            {/* ── PROCESS TIMELINE ── */}
            <section id="process">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Registration Process" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  How We Register Your IEC
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  A clean, 6-step process from consultation to certificate — completed in 2–5 working days.
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
                  { label: "Documents Ready", time: "Day 1", color: "bg-blue-50 border-blue-100 text-blue-700" },
                  { label: "Application Submitted", time: "Day 1–2", color: "bg-primary/5 border-primary/20 text-primary" },
                  { label: "IEC Certificate Issued", time: "Day 2–5", color: "bg-green-50 border-green-100 text-green-700" },
                ].map(t => (
                  <div key={t.label} className={`border rounded-2xl p-4 text-center ${t.color}`}>
                    <p className="font-heading font-bold text-sm">{t.time}</p>
                    <p className="text-xs opacity-70 mt-0.5">{t.label}</p>
                  </div>
                ))}
              </motion.div>
            </section>

            {/* ── WHY IEC IS IMPORTANT ── */}
            <section id="importance">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Business Importance" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Why IEC is Critical for Your Business
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  IEC is not just a compliance requirement — it's the legal foundation of your international trade operations.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {whyImportant.map((w, i) => (
                  <motion.div key={w.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className={`bg-white border ${w.border} rounded-2xl p-5 hover:shadow-card transition-all group`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${w.color} group-hover:scale-105 transition-transform`}>
                      <w.icon size={18} />
                    </div>
                    <p className="font-heading font-bold text-dark text-sm mb-1.5">{w.title}</p>
                    <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── GOVT BENEFITS & SCHEMES ── */}
            <section id="schemes">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Govt. Schemes" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Government Benefits for IEC Holders
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  IEC unlocks government export incentive schemes worth crores. Here are the key benefits.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {govtBenefits.map((s, i) => (
                  <motion.div key={s.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-card transition-all"
                  >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                      <p className="font-heading font-bold text-dark text-sm">{s.title}</p>
                      <span className={`text-[10px] font-heading font-semibold px-2.5 py-1 rounded-full border ${s.badgeColor}`}>{s.badge}</span>
                    </div>
                    <div className="p-5">
                      <p className="text-muted text-xs leading-relaxed mb-4">{s.desc}</p>
                      <div className="space-y-1.5">
                        {s.points.map(p => (
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

            {/* ── WHY US ── */}
            <section id="why-us">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Why Company Avenue" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Why Businesses Choose Us for IEC Registration
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Over 1,000 IEC registrations handled. Zero rejection rate. Certificate in 2 days.
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
                  Common questions from importers and exporters before registering their IEC.
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
            <defs><pattern id="iec-cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#iec-cta-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-5">
              <span className="w-6 h-px bg-accent" />Expand Your Business Beyond Borders<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white leading-tight tracking-tight mb-5">
              Get Your IEC and Start<br />Trading with the World
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Register your IEC with complete DGFT support, documentation assistance, and expert guidance for businesses entering international trade.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-accent-light transition-colors shadow-lg shadow-accent/20"
              >
                Apply for IEC <ArrowRight size={15} />
              </Link>
              <a href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 border border-white/20 transition-colors"
              >
                <Phone size={14} /> Schedule Free Consultation
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {["₹0 Government Fee", "Lifetime Validity", "2–5 Day Processing", "DGFT Expert Assistance"].map(pt => (
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
