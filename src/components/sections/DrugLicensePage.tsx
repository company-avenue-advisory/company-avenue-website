"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, CheckCircle, Plus, Minus,
  MessageCircle, AlertTriangle, FileText, CreditCard, Fingerprint,
  Zap, Building2, Users, Globe, Briefcase, Monitor, Award,
  DollarSign, Headphones, ShieldCheck, BadgeCheck, AlertCircle,
  Info, Bell, RefreshCcw, ChevronRight, TrendingUp, BookOpen,
  CalendarCheck, Package, Thermometer, FlaskConical, Pill,
  Stethoscope, Activity, HelpCircle, ClipboardList, MapPin,
  UserCheck, Scale, Lock,
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
      <span className="w-6 h-px bg-accent" />{label}<span className="w-6 h-px bg-accent" />
    </span>
  );
}

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const heroGlance = [
  { label: "Authority",  value: "State Drug Controller" },
  { label: "Retail",     value: "Form 20 / Form 21" },
  { label: "Wholesale",  value: "Form 20B / Form 21B" },
  { label: "Governed by", value: "Drugs & Cosmetics Act 1940" },
  { label: "Validity",   value: "5 Years (then renewal)" },
  { label: "Penalty",    value: "Up to 5 Yrs Imprisonment" },
];

const quickFacts = [
  { icon: Building2,    label: "Authority",       value: "State Drug Controller" },
  { icon: FileText,     label: "Retail License",  value: "Form 20 / Form 21" },
  { icon: Package,      label: "Wholesale",        value: "Form 20B / Form 21B" },
  { icon: Scale,        label: "Governed By",      value: "Drugs & Cosmetics Act 1940" },
  { icon: CalendarCheck,label: "Validity",         value: "5 Years" },
  { icon: AlertTriangle,label: "Penalty",          value: "Up to 5 Years Imprisonment" },
];

const whoNeeds = [
  { icon: Pill,         title: "Pharmacies & Medical Stores",        desc: "All retail pharmacies and medical stores dispensing allopathic, homeopathic, or ayurvedic medicines." },
  { icon: Package,      title: "Drug Wholesalers & Distributors",    desc: "Businesses that purchase drugs in bulk from manufacturers and distribute to retailers or institutions." },
  { icon: FlaskConical, title: "Pharmaceutical Manufacturers",       desc: "Companies manufacturing any drug, vaccine, or biological product require a manufacturing drug license." },
  { icon: Stethoscope,  title: "Hospital Pharmacies",                desc: "In-house pharmacies within hospitals, clinics, and nursing homes dispensing to inpatients and outpatients." },
  { icon: Monitor,      title: "Online Pharmacies (E-Pharmacy)",     desc: "Digital pharmacy platforms must comply with the Draft E-Pharmacy Rules 2018 and hold a valid Drug License." },
  { icon: Activity,     title: "Ayurvedic / Homeopathic Sellers",    desc: "Sellers of ASU (Ayurvedic, Siddha, Unani) and homeopathic medicines require appropriate drug licenses." },
  { icon: Users,        title: "Veterinary Medicine Dealers",        desc: "Dealers supplying veterinary drugs, vaccines, and medicines for animal treatment require a separate license." },
  { icon: ClipboardList,title: "Diagnostic Kit Distributors",        desc: "Distributors of diagnostic kits and reagents (classified as drugs under the Act) need a wholesale drug license." },
];

const benefits = [
  { icon: ShieldCheck,  title: "Legal Authorization to Sell/Distribute",  desc: "Obtain complete legal authority to sell, stock, distribute, or exhibit drugs under State Drug Controller rules." },
  { icon: AlertTriangle,title: "Avoid Criminal Prosecution",               desc: "Selling drugs without a license attracts imprisonment of up to 5 years — a Drug License keeps you legally protected." },
  { icon: Briefcase,    title: "Pharma Dealership / Distributorship",      desc: "Pharmaceutical manufacturers and brands require authorized dealers to hold a valid wholesale Drug License." },
  { icon: DollarSign,   title: "Bank Loan Eligibility",                    desc: "A valid Drug License is a prerequisite document for business loans and financial assistance for pharmacy businesses." },
  { icon: Building2,    title: "Supply to Hospitals & Institutions",       desc: "Only licensed wholesale dealers can supply drugs to hospitals, clinics, nursing homes, and government institutions." },
  { icon: Globe,        title: "Import / Export of Drugs",                 desc: "Import licenses and export authorization require a valid Drug License as a foundational compliance document." },
  { icon: Monitor,      title: "Online Pharmacy Compliance",               desc: "Operating an e-pharmacy without a Drug License violates both the Drugs & Cosmetics Act and IT Act provisions." },
  { icon: Award,        title: "Credibility in Healthcare Supply Chain",   desc: "A licensed pharmacy earns trust from manufacturers, distributors, and patients as a verified drug retailer." },
];

const processSteps = [
  { n: "01", title: "Determine License Type",                   desc: "Identify whether you need a Retail (Form 20/21), Wholesale (Form 20B/21B), or Manufacturing license based on your business activity." },
  { n: "02", title: "Hire Qualified Pharmacist",               desc: "A registered pharmacist (B.Pharm or D.Pharm) is mandatory for a Retail Drug License and must be present during business hours." },
  { n: "03", title: "Prepare Premises",                        desc: "Set up premises as per minimum area requirements (10 sq meters for retail). Install cold storage if dealing in Schedule 2 drugs like vaccines." },
  { n: "04", title: "Compile All Required Documents",          desc: "Gather all premises, pharmacist, identity, and business documents as specified by the State Drug Licensing Authority." },
  { n: "05", title: "Apply to State Drug Licensing Authority", desc: "Submit the application to the State Drug Control Department along with prescribed fee and all supporting documents." },
  { n: "06", title: "Site Inspection by Drug Inspector",       desc: "The State Drug Inspector visits your premises to verify the physical setup, storage conditions, and document compliance." },
  { n: "07", title: "License Granted After Inspection",        desc: "Upon successful inspection and verification, the Drug License is issued in the prescribed Form by the Licensing Authority." },
  { n: "08", title: "Annual Renewal & Pharmacist Registration",desc: "Drug Licenses are valid for 5 years. Annual renewal of pharmacist registration and timely license renewal are mandatory." },
];

const requiredDocs = [
  { icon: MapPin,       label: "Premises Proof (Own/Rented with Dimensions)" },
  { icon: UserCheck,    label: "Registered Pharmacist Certificate" },
  { icon: BookOpen,     label: "Educational Certificates (B.Pharm / D.Pharm)" },
  { icon: CreditCard,   label: "PAN + Aadhaar of Owner / Pharmacist" },
  { icon: Briefcase,    label: "Business Registration Documents" },
  { icon: FileText,     label: "Site Plan with Dimensions (min. 10 sq m for Retail)" },
  { icon: Thermometer,  label: "Cold Storage Certificate (if applicable for vaccines)" },
  { icon: Fingerprint,  label: "Authorized Person Declaration" },
];

const timelineSteps = [
  { label: "Document Collection",       icon: ClipboardList },
  { label: "Application Submission",    icon: FileText },
  { label: "Drug Inspector Review",     icon: BadgeCheck },
  { label: "Site Inspection",           icon: MapPin },
  { label: "Scrutiny & Verification",   icon: ShieldCheck },
  { label: "License Issued",            icon: Award },
];

const deliverables = [
  { icon: FileText,  title: "Drug License — Form 20/21 (Retail)",           desc: "Official license certificate authorizing retail sale of allopathic (Form 20) and homeopathic (Form 21) medicines." },
  { icon: Package,   title: "Drug License — Form 20B/21B (Wholesale)",       desc: "Wholesale drug license for distribution of allopathic (Form 20B) and homeopathic (Form 21B) medicines." },
  { icon: BadgeCheck,title: "State Drug Control Dept Registration Number",   desc: "Unique registration number issued by the State Drug Licensing Authority for business identification." },
  { icon: UserCheck, title: "Pharmacist Registration Linked to License",     desc: "Pharmacist's registration is formally linked to and verified as part of the Drug License issuance." },
  { icon: Award,     title: "License Display Certificate",                   desc: "Certificate to be prominently displayed at your registered pharmacy or drug outlet premises." },
];

const whyUs = [
  { icon: Award,        label: "Drug License Specialists with 15+ Years Experience" },
  { icon: ShieldCheck,  label: "End-to-End Document Preparation & Review" },
  { icon: BadgeCheck,   label: "Pharmacist Compliance & Registration Guidance" },
  { icon: Building2,    label: "Premises Setup Advice (Area + Storage)" },
  { icon: FileText,     label: "Site Inspection Preparation Support" },
  { icon: DollarSign,   label: "Transparent, Fixed Pricing from ₹6,999" },
  { icon: Monitor,      label: "100% Handled by Our Team" },
  { icon: Headphones,   label: "24-Hour Response Time & Ongoing Support" },
];

const relatedServices = [
  { id: "fssai-license",            title: "FSSAI License",              desc: "Food business operator license for food establishments." },
  { id: "trade-license",            title: "Trade License",              desc: "Municipal license to operate your business premises." },
  { id: "msme-registration",        title: "MSME Registration",          desc: "Udyam certificate for MSME benefits and recognition." },
  { id: "gst-registration",         title: "GST Registration",           desc: "GSTIN for your pharmacy or drug distribution business." },
  { id: "accounting-bookkeeping",   title: "Accounting & Bookkeeping",   desc: "Maintain proper drug sale records and financial accounts." },
  { id: "private-limited-company",  title: "Company Incorporation",      desc: "Incorporate your pharma business as Private Limited." },
];

const faqs = [
  {
    q: "What are the different types of Drug Licenses in India?",
    a: "Drug Licenses in India are classified into: Retail Drug License (Form 20 for allopathic medicines; Form 21 for homeopathic and ayurvedic medicines), Wholesale Drug License (Form 20B for allopathic; Form 21B for homeopathic medicines), and Manufacturing Drug License (requires separate GMP — Good Manufacturing Practices — approval from CDSCO). Retail and wholesale licenses are issued by the State Drug Licensing Authority, while manufacturing licenses also involve the Central Drugs Standard Control Organisation (CDSCO).",
  },
  {
    q: "Is a pharmacist mandatory for a Retail Drug License?",
    a: "Yes. A registered pharmacist holding a B.Pharm or D.Pharm degree and registered with the State Pharmacy Council is mandatory for obtaining and maintaining a Retail Drug License. The pharmacist must be physically present at the pharmacy during business hours. A licensed pharmacist cannot be registered with more than one pharmacy at a time. Absence of the pharmacist during business hours is a compliance violation that can lead to suspension of the license.",
  },
  {
    q: "What are Schedule H and Schedule H1 drugs?",
    a: "Schedule H drugs are prescription medicines that can only be dispensed against a valid prescription from a registered medical practitioner. They include antibiotics, steroids, and other potent medicines. Schedule H1 is a more stringent sub-category introduced in 2013 and covers drugs with higher abuse potential — including second-line anti-TB drugs, narcotics, and certain antibiotics. Schedule H1 drugs require special recording in the Register of Sales and must be stored separately. Both categories prohibit over-the-counter sale without prescription.",
  },
  {
    q: "Can an online pharmacy (e-pharmacy) operate without a Drug License?",
    a: "No. E-pharmacies are not exempt from the Drugs & Cosmetics Act, 1940. The Draft E-Pharmacy Rules 2018 (published for public comment) require all online pharmacies to hold a valid Drug License issued by the State Drug Licensing Authority, in addition to meeting technology and prescription upload requirements. Operating an online pharmacy without a Drug License is a criminal offence. Additionally, e-pharmacies must comply with data protection and prescription verification norms.",
  },
  {
    q: "Which drugs require cold storage, and what certificate is needed?",
    a: "Drugs that require cold chain management include vaccines, biologicals, insulin and insulin analogues, certain antibiotics (like amoxicillin injections), blood products, and diagnostic reagents. These must be stored at 2–8°C in a refrigerator or cold room. To obtain a Drug License for such drugs, the applicant must submit a cold storage certificate confirming that appropriate temperature-controlled storage is available at the premises. The Drug Inspector will also verify the cold storage during the site inspection.",
  },
  {
    q: "What is the difference between Form 20 and Form 21?",
    a: "Form 20 is the drug license issued for retail sale of allopathic medicines (western or modern medicine including Schedule H and H1 drugs). Form 21 is issued for retail sale of homeopathic medicines. A complete retail pharmacy that stocks both types of medicines is typically issued both Form 20 and Form 21 together. Similarly, Form 20B covers wholesale distribution of allopathic medicines, while Form 21B covers wholesale distribution of homeopathic medicines.",
  },
  {
    q: "What happens if I miss the Drug License renewal deadline?",
    a: "Drug Licenses issued under the Drugs & Cosmetics Act are valid for 5 years. The license holder must apply for renewal before the expiry date. A grace period of 6 months is typically available after expiry, during which renewal can be applied for with a late fee penalty. If the license expires beyond the grace period without renewal, the license lapses and a fresh application must be filed. Operating with an expired Drug License is equivalent to operating without a license and attracts the same criminal penalties.",
  },
  {
    q: "Is a separate NDPS license required for narcotic drugs?",
    a: "Yes. Narcotic Drugs and Psychotropic Substances (NDPS) are regulated separately under the NDPS Act, 1985 and are not covered by a standard Drug License. Pharmacies that stock narcotic analgesics or psychotropic substances (such as morphine, codeine, or benzodiazepines in Schedule X) must obtain a separate NDPS license from the State Narcotics Controller. Such drugs are subject to strict stock records, reporting, and disposal procedures.",
  },
  {
    q: "How are cosmetics distinguished from drugs under the Drugs & Cosmetics Act?",
    a: "The Drugs & Cosmetics Act, 1940 regulates both drugs and cosmetics, but separately. A product is classified as a drug if it is intended for use in diagnosis, treatment, or prevention of disease. Cosmetics are defined as substances intended for external body application for cleansing, beautifying, or altering appearance. Some products can be classified as both — for example, anti-dandruff shampoos, sunscreens with high SPF, or medicated soaps — and would require both drug and cosmetic compliance. Misclassification can lead to regulatory action.",
  },
  {
    q: "What are the consequences of selling drugs without a license?",
    a: "Under Section 27 of the Drugs & Cosmetics Act, 1940, selling drugs without a valid license is a cognizable criminal offence. Penalties include: imprisonment for a term of 2 to 5 years (depending on the nature of the drug and offence), a monetary fine, seizure and destruction of the unlicensed drugs, and potential closure of premises by the Drug Inspector. For drugs covered under Schedule H, H1, or NDPS, the penalties are more severe. Drug Inspectors have powers to enter, inspect, and seize goods at any time.",
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
        <p className="font-heading font-bold text-dark text-base mb-1">Get Your Drug License Today</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">
          Our compliance experts handle everything — from document preparation to license receipt.
        </p>
        <div className="space-y-2 mb-5">
          {[
            "Retail & Wholesale License",
            "Pharmacist Compliance Guidance",
            "Site Inspection Support",
            "Renewal & Annual Compliance",
          ].map((pt) => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <a
            href="tel:+919876543210"
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
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={13} /> WhatsApp
          </a>
        </div>
      </div>
      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Pill size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Drug License</p>
        </div>
        <p className="text-white/60 text-xs mb-3 leading-relaxed">Starting from</p>
        <p className="font-heading font-bold text-3xl text-accent mb-1">₹6,999</p>
        <p className="text-white/50 text-[11px]">All inclusive. No hidden charges.</p>
        <Link
          href="/contact"
          className="mt-4 w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          Get Started <ArrowRight size={13} />
        </Link>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { v: "2,000+", l: "Licenses Issued" },
            { v: "98%", l: "Success Rate" },
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
export function DrugLicensePage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dl-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dl-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Drug License</span>
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
                  Pharmacy & Drug Compliance Experts
                </span>
              </motion.div>
              <motion.h1
                custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Drug License<br />
                <span className="text-primary">Registration in India</span>
              </motion.h1>
              <motion.p
                custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Legally operate your pharmacy, wholesale drug distribution, or pharmaceutical manufacturing business. Get your Drug License under the Drugs & Cosmetics Act, 1940 with expert assistance.
              </motion.p>
              <motion.div
                custom={3} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Apply for Drug License <ArrowRight size={15} />
                </Link>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Free Expert Consultation
                </a>
              </motion.div>
              <motion.div
                custom={4} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-wrap gap-x-5 gap-y-2"
              >
                {[
                  "Retail & Wholesale Licenses",
                  "Pharmacist Compliance",
                  "Site Inspection Support",
                  "PAN India Services",
                ].map((pt) => (
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
                      <Pill size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">Drug License at a Glance</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Licensed
                  </span>
                </div>
                <div className="space-y-2.5 mb-5">
                  {heroGlance.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
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
                    <p className="text-xs text-muted">Starting from</p>
                    <p className="font-heading font-bold text-primary text-xl">₹6,999</p>
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
                  key={f.label}
                  custom={i} variants={fadeUp} initial="hidden"
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

      {/* ── WHAT IS DRUG LICENSE ── */}
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
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=85"
                  alt="Drug license pharmacy compliance India"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">2,000+</p>
                <p className="text-white/60 text-xs">Licenses Granted</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is a Drug License?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                A <strong>Drug License</strong> is a mandatory authorization issued by the <strong>State Drug Licensing Authority</strong> under the <strong>Drugs & Cosmetics Act, 1940</strong> and the Drugs & Cosmetics Rules, 1945. It is required for any person or entity wishing to sell, stock, exhibit, distribute, or manufacture drugs in India.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                The license comes in different forms — <strong>Retail (Form 20/21)</strong> for pharmacies, <strong>Wholesale (Form 20B/21B)</strong> for distributors, and a separate <strong>Manufacturing license</strong> for pharma manufacturers. Operating without a Drug License is a cognizable criminal offence with penalties up to 5 years imprisonment.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Legal Drug Sales Authority",
                  "Pharmacist Registration Required",
                  "Cold Storage Compliance",
                  "5-Year License Validity",
                ].map((pt) => (
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
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">Who Needs a Drug License?</h2>
            <p className="text-muted text-base max-w-2xl mx-auto">
              Any business involved in selling, distributing, or manufacturing drugs in India is legally required to hold a valid Drug License.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whoNeeds.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
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
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Key Benefits" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Benefits of Getting a Drug License</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  custom={i} variants={fadeUp} initial="hidden"
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
              <Eyebrow label="Registration Process" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">
                Drug License Registration — Step by Step
              </h2>
              <div className="relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200" aria-hidden="true" />
                <div className="space-y-6">
                  {processSteps.map((step, i) => (
                    <motion.div
                      key={step.n}
                      custom={i} variants={fadeUp} initial="hidden"
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
            <section className="bg-slate-50 -mx-4 px-4 py-12 rounded-3xl">
              <Eyebrow label="Documents Required" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">
                Drug License Document Checklist
              </h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {requiredDocs.map((doc) => {
                    const Icon = doc.icon;
                    return (
                      <motion.div
                        key={doc.label}
                        whileHover={{ x: 4 }}
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
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
                  <Info size={15} className="text-amber-600 shrink-0" />
                  <p className="text-dark text-xs leading-relaxed">
                    Documents vary by license type. Retail licenses require a qualified pharmacist&apos;s certificate. Cold storage certificates are needed only if dealing in vaccines, biologicals, or insulin products.
                  </p>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section>
              <Eyebrow label="Timeline" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Drug License Approval Timeline</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                  {timelineSteps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.label} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-2 shadow-sm">
                            <Icon size={17} className="text-white" />
                          </div>
                          <p className="text-xs font-heading font-semibold text-dark leading-snug max-w-[80px]">
                            {step.label}
                          </p>
                        </div>
                        {i < timelineSteps.length - 1 && (
                          <ChevronRight size={14} className="text-slate-400 shrink-0 hidden sm:block" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Document Collection", duration: "2–3 Days", color: "bg-blue-50 border-blue-100 text-blue-700" },
                    { label: "Application Review",   duration: "7–14 Days", color: "bg-amber-50 border-amber-100 text-amber-700" },
                    { label: "License Issuance",     duration: "15–30 Days (after inspection)", color: "bg-green-50 border-green-100 text-green-700" },
                  ].map((t) => (
                    <div key={t.label} className={`border rounded-xl p-4 text-center ${t.color}`}>
                      <p className="font-heading font-bold text-sm mb-0.5">{t.label}</p>
                      <p className="text-xs opacity-80">{t.duration}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-primary/5 border border-primary/15 rounded-xl p-4 flex items-center gap-3">
                  <Info size={15} className="text-primary shrink-0" />
                  <p className="text-dark text-xs leading-relaxed">
                    Total timeline is typically <strong>30–60 days</strong> from application submission, subject to Drug Inspector availability for site inspection and completeness of documents.
                  </p>
                </div>
              </div>
            </section>

            {/* DELIVERABLES */}
            <section>
              <Eyebrow label="What You Receive" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">
                What You Receive After Drug License Registration
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {deliverables.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <motion.div
                      key={d.title}
                      custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-300">
                        <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-dark text-sm mb-1">{d.title}</p>
                        <p className="text-muted text-xs leading-relaxed">{d.desc}</p>
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
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">
                    Why Choose Company Avenue for Drug License?
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
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                  <Image
                    src="https://images.unsplash.com/photo-1563213126-a4273aed2016?w=800&q=85"
                    alt="Company Avenue Advisory drug license compliance team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              </div>
            </section>

            {/* COMPLIANCE REMINDER */}
            <section>
              <div className="bg-red-50 border border-red-200 rounded-3xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <AlertCircle size={22} className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-dark text-xl mb-2">
                      Operating Without a Drug License? This Is What&apos;s at Stake
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      The Drugs & Cosmetics Act, 1940 mandates drug licenses for all drug-related businesses. Non-compliance carries serious consequences.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: Lock,          label: "Criminal Prosecution",      desc: "Imprisonment of 2–5 years under Section 27 of the Act." },
                    { icon: DollarSign,    label: "Heavy Financial Penalties",  desc: "Monetary fines in addition to criminal prosecution." },
                    { icon: AlertTriangle, label: "Seizure of Premises & Drugs",desc: "Drug Inspectors can seize your stock and seal your premises." },
                  ].map((risk) => {
                    const RiskIcon = risk.icon;
                    return (
                      <div key={risk.label} className="bg-white/60 rounded-2xl p-4 border border-red-100">
                        <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center mb-3">
                          <RiskIcon size={16} className="text-red-500" />
                        </div>
                        <p className="font-heading font-bold text-dark text-sm mb-1">{risk.label}</p>
                        <p className="text-muted text-xs leading-relaxed">{risk.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors"
                  >
                    Get Licensed Today <ArrowRight size={14} />
                  </Link>
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 text-dark font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                  >
                    <Phone size={14} /> Speak to an Expert
                  </a>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section itemScope itemType="https://schema.org/FAQPage">
              <div className="text-center mb-10">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl text-dark">
                  Frequently Asked Questions
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
                key={s.id}
                custom={i} variants={fadeUp} initial="hidden"
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
              <pattern id="cta-dl" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-dl)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Get Licensed Today" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Don&apos;t Risk Operating<br />Without a Drug License
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Company Avenue Advisory handles your Drug License application end-to-end — from document preparation and pharmacist compliance to site inspection support and license receipt. Stay compliant, stay protected.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-[#c4943f] transition-colors"
              >
                Apply for Drug License <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Speak to a Compliance Expert
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
