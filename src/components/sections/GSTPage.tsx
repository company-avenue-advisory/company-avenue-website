"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, Clock, CheckCircle, Plus, Minus,
  Download, MessageCircle, AlertTriangle, FileText, CreditCard,
  Fingerprint, Hash, Zap, Building2, Users, Globe, ShoppingBag,
  Briefcase, Monitor, Award, DollarSign, Headphones, UserCheck,
  LifeBuoy, Receipt, BookOpen, CalendarCheck, ShieldCheck,
  TrendingUp, Repeat2, Landmark, PenLine, Banknote, BadgeCheck,
  Store, Factory, Truck, UtensilsCrossed, Calculator, ArrowUpRight,
  Info, ChevronRight, Package,
} from "lucide-react";
import { faqs } from "@/lib/faqs/GSTPage";

/* ─── animation variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

/* ─── Eyebrow ─── */
function Eyebrow({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
      <span className="w-6 h-px bg-accent" />{label}<span className="w-6 h-px bg-accent" />
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const heroSnapshot = [
  { label: "GSTIN Issuance",    value: "2–7 Working Days" },
  { label: "Registration Type", value: "Regular / Composition" },
  { label: "Threshold",         value: "₹20L / ₹40L*" },
  { label: "Validity",          value: "Lifetime" },
  { label: "Government Portal", value: "GSTN" },
  { label: "Compliance",        value: "Monthly / Quarterly" },
];

const quickFacts = [
  { icon: Clock,      label: "Registration Time", value: "2–7 Working Days" },
  { icon: Briefcase,  label: "Applicable For",    value: "Businesses & Professionals" },
  { icon: FileText,   label: "Registration Type", value: "Regular / Composition" },
  { icon: Landmark,   label: "Authority",         value: "GST Network (GSTN)" },
  { icon: CreditCard, label: "PAN Required",      value: "Yes" },
  { icon: Monitor,    label: "Digital Process",   value: "100% Online" },
];

const whoShouldRegister = [
  { icon: Store,          title: "Retail Shops",        desc: "All goods retailers above threshold." },
  { icon: Factory,        title: "Manufacturers",       desc: "Product manufacturers and processors." },
  { icon: Briefcase,      title: "Service Providers",   desc: "Consultants, agencies, professionals." },
  { icon: ShoppingBag,    title: "E-commerce Sellers",  desc: "Amazon, Flipkart & D2C sellers (mandatory)." },
  { icon: Monitor,        title: "Freelancers",         desc: "Digital services and remote professionals." },
  { icon: Globe,          title: "Importers",           desc: "Businesses importing goods into India." },
  { icon: Truck,          title: "Exporters",           desc: "Exporters benefit from zero-rated supply." },
  { icon: Package,        title: "Wholesalers",         desc: "Distributors and wholesale traders." },
  { icon: UtensilsCrossed,title: "Restaurants",         desc: "Food service businesses and cloud kitchens." },
  { icon: Users,          title: "Consultants",         desc: "Management and strategy consultants." },
  { icon: Zap,            title: "IT Companies",        desc: "Software, SaaS and IT service firms." },
  { icon: TrendingUp,     title: "Agencies",            desc: "Marketing, PR, digital and creative agencies." },
];

const benefits = [
  { icon: Receipt,    title: "Legally Collect GST",           desc: "Issue GST-compliant invoices and legally collect tax from customers." },
  { icon: DollarSign, title: "Claim Input Tax Credit",        desc: "Offset GST paid on purchases against GST collected — reducing your tax burden." },
  { icon: Globe,      title: "Sell Across India",             desc: "Inter-state supply requires GST registration. Unlock the full Indian market." },
  { icon: ShoppingBag,title: "Register on E-commerce Platforms", desc: "Amazon, Flipkart and other marketplaces mandate GSTIN for all sellers." },
  { icon: Award,      title: "Improve Business Credibility",  desc: "GSTIN demonstrates compliance and builds trust with clients, vendors and banks." },
  { icon: TrendingUp, title: "Expand Business Easily",        desc: "Open branches, register as an ISD, and scale operations across states seamlessly." },
];

const gstTypes = [
  { title: "Regular GST",               sub: "Most Common",    color: "border-primary/20 bg-primary/3", badge: "bg-primary text-white",   desc: "For businesses exceeding the threshold limit requiring full ITC and compliance." },
  { title: "Composition Scheme",        sub: "Small Business", color: "border-green-200 bg-green-50",  badge: "bg-green-600 text-white",  desc: "Simplified quarterly filing with lower tax rates for small taxpayers up to ₹1.5 crore." },
  { title: "Casual Taxable Person",     sub: "Temporary",      color: "border-blue-200 bg-blue-50",    badge: "bg-blue-600 text-white",   desc: "For temporary businesses, exhibitions, or seasonal traders who don't have a fixed place." },
  { title: "Non-Resident Taxable Person",sub: "Foreign",       color: "border-purple-200 bg-purple-50",badge: "bg-purple-600 text-white", desc: "Foreign businesses supplying taxable goods or services within India." },
  { title: "Input Service Distributor", sub: "Multi-Branch",   color: "border-amber-200 bg-amber-50",  badge: "bg-amber-600 text-white",  desc: "Distribute input tax credit across multiple branches from a head office." },
  { title: "Tax Deductor / Collector",  sub: "Govt / E-com",   color: "border-rose-200 bg-rose-50",    badge: "bg-rose-600 text-white",   desc: "Government entities and e-commerce operators responsible for TDS/TCS under GST." },
];

const registrationSteps = [
  { n: "01", title: "Free Consultation",       desc: "Assess your business and determine the right GST registration type." },
  { n: "02", title: "Document Collection",     desc: "Gather identity, address, business, and bank proofs via our secure portal." },
  { n: "03", title: "Application Preparation", desc: "Our GST specialists prepare Form REG-01 accurately with correct details." },
  { n: "04", title: "GST Portal Submission",   desc: "Submit the application on the GSTN portal and obtain ARN (Application Reference Number)." },
  { n: "05", title: "Department Verification", desc: "GST officer reviews documents. Additional info may be requested via Form REG-03." },
  { n: "06", title: "GSTIN Issued",            desc: "Receive your GSTIN, GST Certificate and login credentials on the registered email." },
];

const timelineStages = [
  { label: "Consultation",        time: "Day 1" },
  { label: "Documentation",       time: "Day 2" },
  { label: "Application Filed",   time: "Day 3" },
  { label: "Verification",        time: "Day 4–6" },
  { label: "GST Certificate",     time: "Day 7" },
];

const deliverables = [
  { icon: Hash,       label: "GSTIN",                  color: "text-primary bg-primary/8" },
  { icon: FileText,   label: "GST Certificate",        color: "text-blue-600 bg-blue-50" },
  { icon: BadgeCheck, label: "GST Login Credentials",  color: "text-green-600 bg-green-50" },
  { icon: Receipt,    label: "ARN",                    color: "text-purple-600 bg-purple-50" },
  { icon: BookOpen,   label: "Application Records",    color: "text-orange-600 bg-orange-50" },
  { icon: CheckCircle,label: "Registration Confirmation", color: "text-teal-600 bg-teal-50" },
];

const comparisonRows = [
  { feature: "Eligibility",       comp: "Turnover ≤ ₹1.5 Cr",       reg: "All Businesses" },
  { feature: "Turnover Limit",    comp: "₹1.5 Crore",                reg: "No Upper Limit" },
  { feature: "Tax Rates",         comp: "1% / 2% / 5% (flat)",       reg: "5% / 12% / 18% / 28%" },
  { feature: "Input Tax Credit",  comp: "✗ Not Available",            reg: "✓ Fully Available" },
  { feature: "Compliance",        comp: "Quarterly returns (GSTR-4)", reg: "Monthly / Quarterly" },
  { feature: "Suitable For",      comp: "Small local businesses",     reg: "Growing businesses" },
  { feature: "Monthly Filing",    comp: "No (Quarterly only)",        reg: "Yes (GSTR-1 & GSTR-3B)" },
  { feature: "Business Expansion",comp: "Limited",                    reg: "Fully supported" },
];

const postCompliance = [
  { icon: Receipt,      title: "Issue GST Invoices",         desc: "Every taxable supply must be accompanied by a GST-compliant invoice." },
  { icon: BookOpen,     title: "Maintain Records",           desc: "Keep purchase, sale, and ITC records for a minimum of 6 years." },
  { icon: FileText,     title: "File GST Returns",           desc: "File GSTR-1, GSTR-3B monthly/quarterly and GSTR-9 annually." },
  { icon: DollarSign,   title: "Pay GST Liability",          desc: "Deposit tax collected minus ITC claimed on or before due dates." },
  { icon: Repeat2,      title: "Reconcile Input Tax Credit", desc: "Match ITC in GSTR-2B with purchase records to avoid mismatches." },
  { icon: CalendarCheck,title: "Annual Compliance",          desc: "File GSTR-9 (Annual Return) and GSTR-9C (Reconciliation) where applicable." },
];

const commonMistakes = [
  { title: "Wrong Business Constitution",  desc: "Selecting proprietorship when the entity is a company leads to rejection. Match the GST application with your actual legal structure." },
  { title: "Incorrect HSN / SAC Code",     desc: "Choosing the wrong Harmonised System Nomenclature or Service Accounting Code results in compliance issues and incorrect tax rates." },
  { title: "Invalid Address Proof",        desc: "Document date, name, and address must match exactly with the GST application. Expired or mismatched documents are common rejection reasons." },
  { title: "Bank Account Mismatch",        desc: "The cancelled cheque or bank statement must be in the business or proprietor name as per PAN." },
  { title: "Choosing Wrong Registration Type", desc: "Selecting Composition when you supply inter-state or to other registered dealers is not allowed and leads to compliance penalties." },
  { title: "Ignoring Future Compliance",   desc: "GST registration is just the start. Missing GSTR-1 and GSTR-3B deadlines attracts ₹50–₹200/day late fees plus interest." },
];

const whyUsPoints = [
  { icon: Award,      label: "GST Specialists with 15+ Years Experience" },
  { icon: UserCheck,  label: "Dedicated Relationship Manager" },
  { icon: Zap,        label: "Fast Turnaround — 2–7 Working Days" },
  { icon: DollarSign, label: "Transparent Pricing — No Hidden Fees" },
  { icon: Globe,      label: "PAN India Support, All 29 States" },
  { icon: LifeBuoy,   label: "Lifetime Compliance Assistance" },
  { icon: Monitor,    label: "100% Digital Process" },
  { icon: Headphones, label: "24-Hour Response Time" },
];

const relatedServices = [
  { id: "gst-filing",              title: "GST Return Filing",         desc: "Monthly, quarterly & annual returns." },
  { id: "private-limited-company", title: "Private Limited Company",   desc: "Incorporate before GST registration." },
  { id: "msme-registration",       title: "MSME Registration",         desc: "Udyam certificate for small businesses." },
  { id: "iec-registration",        title: "IEC Registration",          desc: "Import Export Code for traders." },
  { id: "accounting-bookkeeping",  title: "Accounting Services",       desc: "Books, MIS and compliance support." },
  { id: "trademark-registration",  title: "Trademark Registration",    desc: "Protect your brand name." },
];


/* ─── GSTIN Explainer data ─── */
const gstinParts = [
  { chars: "07",     label: "State Code",   desc: "Two-digit state/UT code (07 = Delhi)", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { chars: "ABCDE",  label: "PAN",          desc: "10-character PAN of the taxpayer",     color: "bg-purple-50 border-purple-200 text-purple-700" },
  { chars: "1234",   label: "Entity No.",   desc: "How many registrations in that state",  color: "bg-green-50 border-green-200 text-green-700" },
  { chars: "F",      label: "Alphabet",     desc: "Always 'Z' (reserved)",                color: "bg-amber-50 border-amber-200 text-amber-700" },
  { chars: "1",      label: "Default",      desc: "Blank by default",                     color: "bg-orange-50 border-orange-200 text-orange-700" },
  { chars: "Z",      label: "Alphabet",     desc: "Always 'Z' (reserved)",                color: "bg-amber-50 border-amber-200 text-amber-700" },
  { chars: "5",      label: "Checksum",     desc: "Alpha/numeric check digit",            color: "bg-rose-50 border-rose-200 text-rose-700" },
];

/* ─── Eligibility Checker ─── */
type EligStep = { id: string; q: string; opts: { label: string; val: string }[] };
const eligSteps: EligStep[] = [
  { id: "turnover",  q: "What is your annual turnover?",           opts: [{ label: "Below Threshold", val: "below" }, { label: "Above Threshold", val: "above" }] },
  { id: "ecommerce", q: "Are you selling on Amazon / Flipkart?",   opts: [{ label: "Yes", val: "yes" }, { label: "No", val: "no" }] },
  { id: "interstate",q: "Do you supply goods/services interstate?", opts: [{ label: "Yes", val: "yes" }, { label: "No", val: "no" }] },
  { id: "online",    q: "Are you providing online services?",      opts: [{ label: "Yes", val: "yes" }, { label: "No", val: "no" }] },
  { id: "biztype",   q: "What is your business type?",            opts: [
    { label: "Proprietorship", val: "prop" }, { label: "OPC", val: "opc" },
    { label: "LLP", val: "llp" },             { label: "Private Limited", val: "pvt" },
    { label: "Freelancer", val: "free" },     { label: "NGO", val: "ngo" },
  ]},
];

function getRecommendation(answers: Record<string, string>): { status: "mandatory" | "recommended" | "optional"; msg: string } {
  if (answers.turnover === "above") return { status: "mandatory", msg: "GST Registration is Mandatory — your turnover exceeds the threshold." };
  if (answers.ecommerce === "yes")  return { status: "mandatory", msg: "GST Registration is Mandatory — e-commerce sellers must register regardless of turnover." };
  if (answers.interstate === "yes") return { status: "mandatory", msg: "GST Registration is Mandatory — inter-state supply always requires GST registration." };
  if (answers.online === "yes")     return { status: "recommended", msg: "GST Registration is Recommended — online service providers often need GSTIN for compliance and credibility." };
  if (answers.biztype === "ngo")    return { status: "optional", msg: "GST Registration may not be mandatory — NGOs are generally exempt unless they supply taxable services." };
  return { status: "recommended", msg: "GST Registration is Recommended — even if not mandatory, a GSTIN improves credibility and enables ITC benefits." };
}

function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const current = eligSteps[step];

  function choose(val: string) {
    const next = { ...answers, [current.id]: val };
    setAnswers(next);
    if (step + 1 < eligSteps.length) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function reset() { setStep(0); setAnswers({}); setDone(false); }

  const rec = done ? getRecommendation(answers) : null;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-7 md:p-10 shadow-card max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-heading font-bold text-dark text-lg">GST Eligibility Checker</p>
          <p className="text-muted text-xs mt-0.5">Answer 5 quick questions</p>
        </div>
        {(step > 0 || done) && (
          <button onClick={reset} className="text-xs text-muted hover:text-primary transition-colors font-heading font-semibold">
            Start Over
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: done ? "100%" : `${(step / eligSteps.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key={step}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
          >
            <p className="font-heading font-semibold text-dark text-base mb-5">
              <span className="text-primary text-sm mr-2">{step + 1}/{eligSteps.length}</span>
              {current.q}
            </p>
            <div className="flex flex-wrap gap-3">
              {current.opts.map((opt) => (
                <motion.button key={opt.val} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => choose(opt.val)}
                  className="px-5 py-2.5 border-2 border-slate-200 rounded-xl font-heading font-semibold text-sm text-dark hover:border-primary hover:bg-primary/5 transition-all"
                >
                  {opt.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="result"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <div className={`rounded-2xl p-6 mb-5 ${
              rec?.status === "mandatory"    ? "bg-red-50 border border-red-200" :
              rec?.status === "recommended"  ? "bg-amber-50 border border-amber-200" :
                                              "bg-green-50 border border-green-200"
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  rec?.status === "mandatory"   ? "bg-red-100" :
                  rec?.status === "recommended" ? "bg-amber-100" : "bg-green-100"
                }`}>
                  <Info size={16} className={
                    rec?.status === "mandatory"   ? "text-red-500" :
                    rec?.status === "recommended" ? "text-amber-500" : "text-green-600"
                  } />
                </div>
                <div>
                  <p className={`font-heading font-bold text-base mb-1 ${
                    rec?.status === "mandatory"   ? "text-red-700" :
                    rec?.status === "recommended" ? "text-amber-700" : "text-green-700"
                  }`}>
                    {rec?.status === "mandatory" ? "Mandatory" : rec?.status === "recommended" ? "Recommended" : "Optional"}
                  </p>
                  <p className="text-dark text-sm leading-relaxed">{rec?.msg}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/contact"
                className="flex-1 text-center py-3 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors"
              >
                Apply Now <ArrowRight size={13} className="inline ml-1" />
              </Link>
              <button onClick={reset}
                className="px-5 py-3 border border-slate-200 text-dark font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-colors"
              >
                Retake
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── FAQ Item ─── */
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

/* ─── Sticky Sidebar ─── */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">Get Your GSTIN Fast</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Our GST specialists handle the complete registration process end-to-end.</p>
        <div className="space-y-2 mb-5">
          {["Free Consultation", "Document Review", "Portal Filing", "GSTIN in 2–7 Days"].map(pt => (
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

      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Download size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">GST Checklist</p>
        </div>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">Download the complete GST registration document checklist as PDF.</p>
        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
          <Download size={13} /> Download PDF
        </button>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "5000+", l: "Registrations" }, { v: "98%", l: "Approved" }, { v: "15+", l: "Years Exp." }, { v: "2–7", l: "Days" }].map(s => (
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

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
export function GSTPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gst-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gst-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>

        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">GST Registration</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">GST Registration Experts • Government-Compliant Filing</span>
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                GST Registration<br />
                <span className="text-primary">Made Simple</span>
              </motion.h1>

              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Register your business under Goods &amp; Services Tax (GST) with expert guidance. Whether you&apos;re a startup, freelancer, e-commerce seller, or established business — we&apos;ll help you obtain your GSTIN quickly and compliantly.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Apply for GST Registration <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Free GST Consultation
                </a>
              </motion.div>

              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["GST Experts", "PAN India Service", "Fast Documentation", "Dedicated CA Support"].map(pt => (
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
                        <Receipt size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-xs">GST Registration Certificate</p>
                        <p className="text-white/50 text-[10px]">Goods & Services Tax Network (GSTN)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-heading font-semibold bg-green-500/20 text-green-300 border border-green-400/30 px-2.5 py-1 rounded-full">● Official</span>
                  </div>
                  <div className="relative w-full aspect-[4/3] bg-slate-50">
                    <Image
                      src="/images/gst-certificate.jpg"
                      alt="Sample GST Registration Certificate issued by GSTN"
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
                      <p className="text-muted text-[10px]">GSTIN Issued</p>
                      <p className="font-heading font-bold text-green-600 text-xs">✓ GSTN Portal</p>
                    </div>
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-5 top-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Processing Time</p>
                  <p className="font-heading font-bold text-primary text-sm">2–7 Days</p>
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

      {/* ── WHAT IS GST ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=85"
                  alt="GST tax filing and business compliance"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">2–7</p>
                <p className="text-white/60 text-xs">Days to GSTIN</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is GST Registration?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                <strong>Goods and Services Tax (GST)</strong> is India&apos;s unified indirect tax system that replaced multiple taxes like VAT, Service Tax, and Excise Duty. Businesses registered under GST receive a unique <strong>GST Identification Number (GSTIN)</strong>.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                With a GSTIN, you can legally collect GST from customers, claim <strong>Input Tax Credit (ITC)</strong> on purchases, conduct interstate trade, and establish credibility with banks, clients, and vendors.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["One Nation One Tax", "Input Tax Credit", "Nationwide Compliance", "Better Business Credibility"].map(pt => (
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

      {/* ── ELIGIBILITY CHECKER ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Eyebrow label="Eligibility Checker" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">
              Do You Need GST Registration?
            </h2>
            <p className="text-muted text-base max-w-lg mx-auto">
              Answer 5 quick questions to find out if GST registration is mandatory, recommended, or optional for your business.
            </p>
          </div>
          <EligibilityChecker />
        </div>
      </section>

      {/* ── WHO SHOULD REGISTER ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Who Needs GST" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Should Register for GST?</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {whoShouldRegister.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="group bg-white border border-slate-100 rounded-2xl p-4 hover:border-primary/20 hover:shadow-card transition-all duration-300 text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-3 mx-auto transition-colors duration-300">
                    <Icon size={17} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-heading font-semibold text-dark text-xs mb-1">{item.title}</p>
                  <p className="text-muted text-[11px] leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors"
            >
              Check My Eligibility <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Benefits" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">GST Registration Benefits</h2>
          </div>
          <div className="space-y-8">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div key={b.title}
                  initial={{ opacity: 0, x: isEven ? -24 : 24 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}
                >
                  {!isEven && <div className="hidden lg:block" />}
                  <div className={`bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-card transition-all ${!isEven ? "lg:order-first" : ""}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0">
                        <Icon size={22} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-dark text-lg mb-2">{b.title}</h3>
                        <p className="text-muted text-sm leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  </div>
                  {isEven && <div className="hidden lg:block" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GST TYPES ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Registration Types" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Types of GST Registration</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gstTypes.map((t, i) => (
              <motion.div key={t.title} custom={i} variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: "-40px" }}
                className={`border rounded-2xl p-6 hover:shadow-card transition-all duration-300 group ${t.color}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-heading font-bold px-3 py-1 rounded-full ${t.badge}`}>{t.sub}</span>
                </div>
                <h3 className="font-heading font-bold text-dark text-base mb-2">{t.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TWO-COLUMN: MAIN CONTENT + STICKY SIDEBAR ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">

          <div className="space-y-24 min-w-0">

            {/* REGISTRATION PROCESS */}
            <section>
              <Eyebrow label="Registration Process" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">GST Registration Process — Step by Step</h2>
              <div className="relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200" aria-hidden="true" />
                <div className="space-y-6">
                  {registrationSteps.map((step, i) => (
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

            {/* REQUIRED DOCUMENTS */}
            <section>
              <Eyebrow label="Documents Required" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">GST Registration Document Checklist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { title: "Business & Identity Proof", color: "bg-blue-50 border-blue-100", iconBg: "bg-blue-100 text-blue-600",
                    docs: [{ icon: CreditCard, label: "PAN Card" }, { icon: FileText, label: "Business Constitution Proof" }, { icon: Fingerprint, label: "Aadhaar Card" }, { icon: FileText, label: "Passport Size Photograph" }] },
                  { title: "Office Address Proof", color: "bg-green-50 border-green-100", iconBg: "bg-green-100 text-green-600",
                    docs: [{ icon: Zap, label: "Electricity Bill" }, { icon: FileText, label: "Rent Agreement (if rented)" }, { icon: PenLine, label: "NOC from Property Owner" }, { icon: Building2, label: "Ownership Proof" }] },
                  { title: "Bank Proof", color: "bg-purple-50 border-purple-100", iconBg: "bg-purple-100 text-purple-600",
                    docs: [{ icon: Banknote, label: "Cancelled Cheque" }, { icon: FileText, label: "Bank Statement (latest)" }] },
                  { title: "Company Documents (if applicable)", color: "bg-amber-50 border-amber-100", iconBg: "bg-amber-100 text-amber-600",
                    docs: [{ icon: FileText, label: "MOA & AOA" }, { icon: BadgeCheck, label: "Certificate of Incorporation" }, { icon: Users, label: "Director/Partner Details" }] },
                ].map((group) => (
                  <div key={group.title} className={`border rounded-2xl p-5 ${group.color}`}>
                    <p className="font-heading font-bold text-dark text-sm mb-4">{group.title}</p>
                    <div className="space-y-2.5">
                      {group.docs.map((doc) => {
                        const Icon = doc.icon;
                        return (
                          <motion.div key={doc.label} whileHover={{ x: 4 }}
                            className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-white/80"
                          >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${group.iconBg}`}>
                              <Icon size={12} />
                            </div>
                            <span className="text-dark text-xs font-medium">{doc.label}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <button className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-heading font-semibold text-sm rounded-xl hover:bg-primary hover:text-white transition-all">
                  <Download size={14} /> Download GST Registration Checklist
                </button>
              </div>
            </section>

            {/* GSTIN EXPLAINER */}
            <section>
              <Eyebrow label="GSTIN Format" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-3">Understanding Your GSTIN</h2>
              <p className="text-muted text-sm mb-8">Every GSTIN is a unique 15-character code. Here&apos;s what each part means:</p>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="font-heading font-bold text-2xl md:text-3xl text-center tracking-[0.2em] text-dark mb-6">
                  <span className="text-blue-600">07</span>
                  <span className="text-purple-600">ABCDE1234</span>
                  <span className="text-green-600">F</span>
                  <span className="text-amber-600">1</span>
                  <span className="text-amber-600">Z</span>
                  <span className="text-rose-600">5</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {gstinParts.map((part) => (
                    <motion.div key={part.label} whileHover={{ y: -3, scale: 1.02 }}
                      className={`border rounded-xl p-4 cursor-default transition-all ${part.color}`}
                    >
                      <p className="font-heading font-bold text-lg mb-1 tracking-widest">{part.chars}</p>
                      <p className="font-heading font-semibold text-xs mb-1">{part.label}</p>
                      <p className="text-[11px] opacity-80 leading-snug">{part.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section>
              <Eyebrow label="Timeline" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Your GST Registration Timeline</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {timelineStages.map((stage, i) => (
                  <motion.div key={stage.label} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="show" viewport={{ once: true }}
                    className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:shadow-card hover:border-primary/15 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-white font-heading font-bold text-xs flex items-center justify-center mx-auto mb-3">
                      {i + 1}
                    </div>
                    <p className="font-heading font-bold text-dark text-xs mb-1">{stage.label}</p>
                    <p className="text-primary text-[11px] font-heading font-semibold">{stage.time}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* DELIVERABLES */}
            <section>
              <Eyebrow label="What You Receive" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Government Deliverables</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {deliverables.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.label} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:shadow-card transition-all group"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${item.color}`}>
                        <Icon size={18} />
                      </div>
                      <p className="text-dark text-[11px] font-heading font-semibold leading-snug">{item.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* COMPOSITION VS REGULAR */}
            <section>
              <Eyebrow label="Scheme Comparison" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Composition vs Regular GST</h2>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-card mb-8">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="text-left px-5 py-4 font-heading font-semibold text-sm">Feature</th>
                      <th className="px-5 py-4 font-heading font-semibold text-sm text-center">Composition Scheme</th>
                      <th className="px-5 py-4 font-heading font-semibold text-sm text-center bg-accent/20">Regular GST</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr key={row.feature}
                        className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-primary/3 transition-colors`}
                      >
                        <td className="px-5 py-3.5 text-dark text-sm font-medium">{row.feature}</td>
                        <td className="px-5 py-3.5 text-muted text-sm text-center">{row.comp}</td>
                        <td className="px-5 py-3.5 text-sm text-center font-heading font-semibold text-primary bg-amber-50/40">{row.reg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Small Local Business", rec: "Composition Scheme", color: "border-green-200 bg-green-50", badge: "bg-green-600 text-white", desc: "Low turnover, local sales, simplified compliance." },
                  { label: "Growing Business",     rec: "Regular GST",        color: "border-primary/20 bg-primary/3", badge: "bg-primary text-white", desc: "ITC benefits, interstate trade, e-commerce, scaling." },
                ].map((card) => (
                  <div key={card.label} className={`border rounded-2xl p-5 ${card.color}`}>
                    <p className="text-muted text-xs mb-1">{card.label}</p>
                    <p className="font-heading font-bold text-dark text-base mb-2">→ {card.rec}</p>
                    <p className="text-muted text-xs">{card.desc}</p>
                    <span className={`inline-block mt-3 text-xs font-heading font-bold px-3 py-1 rounded-full ${card.badge}`}>Recommended</span>
                  </div>
                ))}
              </div>
            </section>

            {/* POST COMPLIANCE */}
            <section>
              <Eyebrow label="Post Registration" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-3">Post Registration Compliance</h2>
              <p className="text-muted text-sm mb-8">GST Registration is only the first step. Timely return filing is mandatory to avoid penalties.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {postCompliance.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors duration-300">
                        <Icon size={16} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <p className="font-heading font-bold text-dark text-sm mb-1">{item.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* COMMON MISTAKES */}
            <section>
              <Eyebrow label="Common Mistakes" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Avoid These GST Registration Mistakes</h2>
              <div className="space-y-3">
                {commonMistakes.map((m, i) => (
                  <motion.div key={m.title} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="show" viewport={{ once: true }}
                    className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-amber-200 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center shrink-0 transition-colors">
                      <AlertTriangle size={15} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm mb-1">{m.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* WHY COMPANY AVENUE */}
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Eyebrow label="Why Us" />
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">Why Choose Company Avenue for GST?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {whyUsPoints.map((pt) => {
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
                    { v: "5000+", l: "GST Registrations",    c: "bg-primary text-white" },
                    { v: "98%",   l: "Approval Success",     c: "bg-accent text-dark" },
                    { v: "15+",   l: "Years Experience",     c: "bg-slate-800 text-white" },
                    { v: "24 hrs",l: "Response Time",        c: "bg-green-600 text-white" },
                  ].map((s) => (
                    <motion.div key={s.l} whileHover={{ y: -4 }}
                      className={`${s.c} rounded-2xl p-6 text-center shadow-card`}
                    >
                      <p className="font-heading font-bold text-3xl leading-none mb-1">{s.v}</p>
                      <p className="text-xs opacity-80 leading-snug">{s.l}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* DOWNLOAD CENTER */}
            <section>
              <Eyebrow label="Download Center" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">Free GST Resources</h2>
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-7 shadow-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "GST Registration Checklist", sub: "Complete document list",          icon: FileText,    color: "bg-blue-50 text-blue-600" },
                  { title: "GST Compliance Calendar",    sub: "All return due dates",             icon: CalendarCheck,color: "bg-green-50 text-green-600" },
                  { title: "Return Due Date Guide",      sub: "GSTR-1, 3B, 9 deadlines",         icon: BookOpen,    color: "bg-purple-50 text-purple-600" },
                  { title: "Business GST Guide",         sub: "GST explained for SMEs",           icon: Award,       color: "bg-amber-50 text-amber-600" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title}
                      className="border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all cursor-pointer"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color}`}>
                        <Icon size={18} />
                      </div>
                      <p className="font-heading font-bold text-dark text-sm mb-1">{item.title}</p>
                      <p className="text-muted text-xs mb-3">{item.sub}</p>
                      <button className="inline-flex items-center gap-1.5 text-primary text-xs font-heading font-semibold hover:gap-2.5 transition-all">
                        <Download size={12} /> Download Free
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* RELATED CALCULATORS */}
            <section>
              <Eyebrow label="Tools" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">GST Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "GST Calculator",           sub: "Calculate GST on any amount",    live: false },
                  { title: "Reverse GST Calculator",   sub: "Find base price from GST-inclusive amount", live: false },
                  { title: "GST Invoice Calculator",   sub: "Generate invoice GST breakdown",  live: false },
                  { title: "Input Tax Credit Calc",    sub: "Estimate your ITC benefits",      live: false },
                ].map((item) => (
                  <div key={item.title}
                    className="relative border border-slate-100 rounded-2xl p-5 bg-white hover:shadow-card transition-all group overflow-hidden"
                  >
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-heading font-bold px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">Coming Soon</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3">
                      <Calculator size={18} className="text-primary" />
                    </div>
                    <p className="font-heading font-bold text-dark text-sm mb-1">{item.title}</p>
                    <p className="text-muted text-xs leading-relaxed">{item.sub}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section itemScope itemType="https://schema.org/FAQPage">
              <div className="text-center mb-10">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-2">
                {faqs.map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
              </div>
            </section>

          </div>{/* end main content */}

          {/* ── STICKY SIDEBAR ── */}
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
              <motion.div key={s.id} custom={i} variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true }}
              >
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
              <pattern id="cta-gst-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-gst-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Get Started Today" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Get Your GST Registration<br />Without the Hassle
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              From document verification to GSTIN issuance, Company Avenue Advisory manages the complete registration process so you can focus on growing your business with confidence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-accent-light transition-colors"
              >
                Apply for GST Registration <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Talk to a GST Expert
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
