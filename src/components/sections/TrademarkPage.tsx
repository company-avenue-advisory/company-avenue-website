"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, CheckCircle, Plus, Minus, Download,
  MessageCircle, AlertTriangle, FileText, CreditCard, Fingerprint,
  Hash, Zap, Building2, Users, Globe, Briefcase, Monitor, Award,
  DollarSign, Headphones, UserCheck, LifeBuoy, ShieldCheck,
  BadgeCheck, AlertCircle, Info, Bell, RefreshCcw, Search,
  Tag, Package, Layers, Palette, Volume2, ChevronRight,
  TrendingUp, BookOpen, CalendarCheck, PenLine, Repeat2,
} from "lucide-react";
import { faqs } from "@/lib/faqs/TrademarkPage";

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
const heroGlance = [
  { label: "Protection",   value: "Brand Identity" },
  { label: "Validity",     value: "10 Years" },
  { label: "Renewable",    value: "Unlimited Times" },
  { label: "Coverage",     value: "Across India" },
  { label: "Authority",    value: "CGPDTM" },
  { label: "Application",  value: "100% Online" },
];

const quickFacts = [
  { icon: ShieldCheck,  label: "Protection Period", value: "10 Years" },
  { icon: Repeat2,      label: "Renewal",           value: "Every 10 Years" },
  { icon: Globe,        label: "Registration",      value: "Nationwide" },
  { icon: Monitor,      label: "Application Mode",  value: "Online" },
  { icon: BadgeCheck,   label: "Ownership",         value: "Exclusive Rights" },
  { icon: RefreshCcw,   label: "Transferable",      value: "Yes" },
];

const whatCanBeTrademarked = [
  { icon: Tag,      title: "Brand Name",         desc: "Your company or product name." },
  { icon: Layers,   title: "Logo",               desc: "Design marks and device marks." },
  { icon: FileText, title: "Word Mark",          desc: "Distinctive words or phrases." },
  { icon: Palette,  title: "Device Mark",        desc: "Artistic or graphical symbols." },
  { icon: PenLine,  title: "Slogan / Tagline",   desc: "Catchphrases that identify your brand." },
  { icon: Package,  title: "Packaging",          desc: "Distinctive product packaging." },
  { icon: Hash,     title: "Product Name",       desc: "Unique names for specific products." },
  { icon: Layers,   title: "Shape",              desc: "Three-dimensional shape of goods." },
  { icon: Palette,  title: "Color Combination",  desc: "Distinctive color patterns or combos." },
  { icon: Volume2,  title: "Sound Mark",         desc: "Audio signatures or jingles." },
  { icon: Briefcase,title: "Service Mark",       desc: "Marks identifying services." },
  { icon: Tag,      title: "Collective Mark",    desc: "Marks for associations or groups." },
];

const whyRegister = [
  { icon: ShieldCheck,  title: "Protect Brand Identity",    desc: "Secure exclusive rights to your brand name, logo and marks against unauthorized use." },
  { icon: AlertTriangle,title: "Prevent Copycats",          desc: "Legal grounds to stop competitors from using confusingly similar marks in your industry." },
  { icon: BadgeCheck,   title: "Legal Ownership",           desc: "The ® symbol provides presumptive evidence of ownership and validity in legal proceedings." },
  { icon: TrendingUp,   title: "Increase Brand Value",      desc: "Registered trademarks are intangible assets that enhance business valuation and investor confidence." },
  { icon: DollarSign,   title: "Licensing Opportunities",   desc: "License your trademark to generate royalty income while maintaining brand ownership." },
  { icon: Globe,        title: "Business Expansion",        desc: "A registered trademark facilitates franchising, partnerships and market expansion strategies." },
  { icon: Award,        title: "Investor Confidence",       desc: "Investors and acquirers value IP-protected businesses significantly more than unprotected ones." },
  { icon: Users,        title: "Customer Trust",            desc: "The ® symbol signals authenticity and builds lasting consumer confidence in your brand." },
];

const registrationSteps = [
  { n: "01", title: "Trademark Search",          desc: "Comprehensive search of the trademark registry to check availability and identify conflicts." },
  { n: "02", title: "Class Selection",           desc: "Identify the correct trademark class(es) for your goods or services from the 45 international classes." },
  { n: "03", title: "Application Filing",        desc: "Prepare and submit TM-A application on the IP India portal with all required documents." },
  { n: "04", title: "Government Examination",    desc: "The Trade Marks Registry examines the application for distinctiveness and potential conflicts." },
  { n: "05", title: "Objection (if any)",        desc: "If an examination report raises objections, we draft and file a professional counter-statement." },
  { n: "06", title: "Journal Publication",       desc: "Accepted marks are published in the Trade Marks Journal for public opposition (4 months)." },
  { n: "07", title: "Trademark Registration",    desc: "Upon successful publication and no opposition, the Registration Certificate is issued." },
];

const lifecycleSteps = [
  { label: "Brand Created",      icon: Tag },
  { label: "Trademark Search",   icon: Search },
  { label: "Application Filed",  icon: FileText },
  { label: "Examination",        icon: BadgeCheck },
  { label: "Publication",        icon: BookOpen },
  { label: "Certificate Issued", icon: Award },
  { label: "Renewal (10 Yrs)",   icon: Repeat2 },
];

const requiredDocs = [
  { icon: CreditCard,  label: "Applicant PAN Card" },
  { icon: Fingerprint, label: "Applicant Aadhaar Card" },
  { icon: Layers,      label: "Logo / Mark (if applicable)" },
  { icon: FileText,    label: "Business Registration Document" },
  { icon: BadgeCheck,  label: "MSME Certificate (optional – lower fee)" },
  { icon: PenLine,     label: "Power of Attorney (Form TM-48)" },
  { icon: Building2,   label: "Address Proof" },
  { icon: Briefcase,   label: "Business Activity Details" },
];

const objectionReasons = [
  "Similar or identical existing registered mark",
  "Generic or descriptive brand name",
  "Incorrect trademark class selected",
  "Incomplete or incorrect application",
  "Improper representation of the mark",
  "Mark lacks distinctiveness",
];

const objectionHelp = [
  "Professional counter-statement drafting",
  "Evidence preparation and submission",
  "Hearing representation before the Registry",
  "Timely response within statutory deadlines",
  "Expert trademark law guidance",
  "Strategy for overcoming descriptiveness objections",
];

const renewalCards = [
  { label: "Validity",          value: "10 Years",       icon: ShieldCheck, color: "bg-primary/5 border-primary/20 text-primary" },
  { label: "Renewal Window",    value: "Before Expiry",  icon: CalendarCheck, color: "bg-green-50 border-green-200 text-green-700" },
  { label: "Grace Period",      value: "Applicable",     icon: Bell, color: "bg-amber-50 border-amber-200 text-amber-700" },
  { label: "Protection",        value: "Unlimited Renewals", icon: Repeat2, color: "bg-blue-50 border-blue-200 text-blue-700" },
];

const benefits = [
  { icon: BadgeCheck,   title: "Exclusive Ownership",          desc: "Only you can use the mark for your goods/services in India." },
  { icon: ShieldCheck,  title: "Legal Protection",             desc: "Sue infringers for damages and injunction in civil and criminal courts." },
  { icon: Award,        title: "Brand Recognition",            desc: "The ® symbol builds authority and consumer trust over time." },
  { icon: Globe,        title: "Franchise Opportunities",      desc: "Registered marks are essential for franchising your business model." },
  { icon: DollarSign,   title: "Licensing Income",             desc: "Earn royalties by licensing your trademark to third parties." },
  { icon: Users,        title: "Customer Confidence",          desc: "Consumers trust registered brands over unregistered ones." },
  { icon: Monitor,      title: "Online Marketplace Protection",desc: "Amazon, Flipkart & other platforms prioritise registered trademark holders." },
  { icon: TrendingUp,   title: "Business Valuation",           desc: "Registered IP significantly increases your business's market value." },
];

const commonMistakes = [
  { title: "Skipping Trademark Search",     desc: "Filing without a comprehensive search risks objections and wasted fees. We conduct thorough registry searches before filing." },
  { title: "Wrong Class Selection",         desc: "Filing in the incorrect class provides no protection for your actual business. Class selection is critical — we guide you to the right ones." },
  { title: "Generic Brand Name",            desc: "Descriptive or generic names like 'Best Shoes' cannot be trademarked. Your mark must be distinctive to qualify for registration." },
  { title: "Incomplete Documents",          desc: "Missing Power of Attorney, incorrect logo format, or mismatched applicant details are leading causes of application rejection." },
  { title: "Ignoring Objection Notices",    desc: "Failing to respond to an examination report within 30 days leads to deemed abandonment of your application." },
  { title: "Missing Renewal Deadline",      desc: "A lapsed trademark loses its registered status. Set up renewal reminders well before the 10-year expiry date." },
];

const whyUsPoints = [
  { icon: Award,        label: "Trademark Specialists with 15+ Years Experience" },
  { icon: Search,       label: "Comprehensive Pre-filing Trademark Search" },
  { icon: Layers,       label: "Accurate Class Selection Guidance" },
  { icon: ShieldCheck,  label: "Objection & Hearing Assistance" },
  { icon: Repeat2,      label: "Trademark Renewal Reminders & Support" },
  { icon: DollarSign,   label: "Transparent, Fixed Pricing" },
  { icon: Monitor,      label: "100% Digital Process" },
  { icon: Headphones,   label: "24-Hour Response Time" },
];

const brandJourney = [
  { step: "01", title: "Business Registration",   link: "/services/private-limited-company", desc: "Incorporate your company" },
  { step: "02", title: "Trademark Registration",  link: "/services/trademark-registration",  desc: "Protect your brand identity", active: true },
  { step: "03", title: "GST Registration",        link: "/services/gst-registration",        desc: "Obtain your GSTIN" },
  { step: "04", title: "MSME Registration",       link: "/services/msme-registration",       desc: "Udyam certificate & benefits" },
  { step: "05", title: "Startup India",           link: "/services/startup-india",           desc: "DPIIT recognition" },
  { step: "06", title: "Brand Growth",            link: "/services",                         desc: "Accounting, compliance & advisory" },
  { step: "07", title: "Trademark Renewal",       link: "/services/trademark-registration",  desc: "Renew every 10 years" },
];

const relatedServices = [
  { id: "private-limited-company", title: "Private Limited Company", desc: "Incorporate before trademarking." },
  { id: "one-person-company",      title: "OPC Registration",        desc: "Solo business incorporation." },
  { id: "gst-registration",        title: "GST Registration",        desc: "GSTIN for your brand." },
  { id: "msme-registration",       title: "MSME Registration",       desc: "Reduced trademark fee with MSME." },
  { id: "startup-india",           title: "Startup India",           desc: "DPIIT recognition & benefits." },
  { id: "roc-compliance",          title: "Business Advisory",       desc: "Complete compliance support." },
];


/* ── Trademark Class data ── */
const classMapping: Record<string, { classes: number[]; note: string }> = {
  restaurant:    { classes: [43], note: "Food service, restaurants, cafés, catering." },
  software:      { classes: [9, 42], note: "Software products (Cl. 9) and software services/SaaS (Cl. 42)." },
  clothing:      { classes: [25], note: "Apparel, garments, footwear and headgear." },
  hospital:      { classes: [44], note: "Medical, healthcare and veterinary services." },
  consultancy:   { classes: [35, 45], note: "Business consulting (Cl. 35) and legal/personal advisory (Cl. 45)." },
  education:     { classes: [41], note: "Educational services, coaching, training and e-learning." },
  cosmetics:     { classes: [3], note: "Cosmetics, toiletries, beauty products and fragrances." },
  construction:  { classes: [37], note: "Building construction, renovation and repair services." },
  ecommerce:     { classes: [35], note: "Online retail services and marketplace platforms." },
  technology:    { classes: [9, 42], note: "Tech products (Cl. 9) and IT services (Cl. 42)." },
  pharma:        { classes: [5], note: "Pharmaceutical products, medicines, health supplements." },
  food:          { classes: [29, 30], note: "Processed food (Cl. 29) and beverages/condiments (Cl. 30)." },
};

/* ── Eligibility Checker ── */
type EligAnswers = { protect?: string; bizType?: string; status?: string };

function getEligRec(a: EligAnswers): { rec: string; classes: string; next: string } {
  const classHint =
    a.bizType === "llp" || a.bizType === "pvtltd" ? "Class selection depends on your business activity — consult our experts." :
    a.bizType === "individual" ? "Individual applicants qualify for the reduced government fee of ₹4,500/class." :
    "Our team will identify the right trademark class for your business.";
  return {
    rec: "Trademark Registration Recommended",
    classes: classHint,
    next: a.status === "using" ? "File immediately to secure priority over competitors." : "File before launch to secure ™ rights from day one.",
  };
}

const eligSteps = [
  { id: "protect", q: "What do you want to protect?", opts: [
    { label: "Business Name", val: "bizname" }, { label: "Logo", val: "logo" },
    { label: "Brand Name",    val: "brand" },   { label: "Slogan", val: "slogan" },
    { label: "Product Name",  val: "product" }, { label: "Packaging", val: "pack" },
  ]},
  { id: "bizType", q: "What is your business type?", opts: [
    { label: "Individual / Proprietor", val: "individual" }, { label: "Startup", val: "startup" },
    { label: "LLP",                     val: "llp" },         { label: "Private Limited", val: "pvtltd" },
    { label: "OPC",                     val: "opc" },         { label: "Partnership", val: "partnership" },
  ]},
  { id: "status", q: "Current status of your brand?", opts: [
    { label: "Already Using the Brand",  val: "using" },
    { label: "Launching Soon",           val: "launching" },
    { label: "Registered Business",      val: "registered" },
    { label: "Personal Brand",           val: "personal" },
  ]},
];

function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<EligAnswers>({});
  const [done, setDone] = useState(false);

  const current = eligSteps[step];
  function choose(val: string) {
    const next = { ...answers, [current.id]: val } as EligAnswers;
    setAnswers(next);
    if (step + 1 < eligSteps.length) setStep(step + 1); else setDone(true);
  }
  function reset() { setStep(0); setAnswers({}); setDone(false); }
  const rec = done ? getEligRec(answers) : null;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-7 md:p-10 shadow-card max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-heading font-bold text-dark text-lg">Trademark Eligibility Checker</p>
          <p className="text-muted text-xs mt-0.5">3 quick questions to check your trademark eligibility</p>
        </div>
        {(step > 0 || done) && (
          <button onClick={reset} className="text-xs text-muted hover:text-primary font-heading font-semibold transition-colors">Start Over</button>
        )}
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: done ? "100%" : `${(step / eligSteps.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
          >
            <p className="font-heading font-semibold text-dark text-base mb-5">
              <span className="text-primary text-sm mr-2">{step + 1}/{eligSteps.length}</span>{current.q}
            </p>
            <div className="flex flex-wrap gap-3">
              {current.opts.map(opt => (
                <motion.button key={opt.val} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => choose(opt.val)}
                  className="px-5 py-2.5 border-2 border-slate-200 rounded-xl font-heading font-semibold text-sm text-dark hover:border-primary hover:bg-primary/5 transition-all"
                >{opt.label}</motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="font-heading font-bold text-green-700 text-base mb-1">{rec?.rec}</p>
                  <p className="text-muted text-xs leading-relaxed">{rec?.classes}</p>
                </div>
              </div>
              <div className="bg-white/60 rounded-xl px-4 py-3 flex items-center gap-2">
                <Info size={13} className="text-primary shrink-0" />
                <p className="text-dark text-xs">{rec?.next}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/contact"
                className="flex-1 text-center py-3 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors"
              >
                Start Trademark Registration <ArrowRight size={13} className="inline ml-1" />
              </Link>
              <button onClick={reset}
                className="px-5 py-3 border border-slate-200 text-dark font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-colors"
              >Retake</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Class Finder ── */
function ClassFinder() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ classes: number[]; note: string } | null>(null);
  const [searched, setSearched] = useState(false);

  function search() {
    const q = query.toLowerCase().trim();
    let found: { classes: number[]; note: string } | null = null;
    for (const [key, val] of Object.entries(classMapping)) {
      if (q.includes(key) || key.includes(q)) { found = val; break; }
    }
    setResult(found);
    setSearched(true);
  }

  const suggestions = ["Restaurant", "Software", "Clothing", "Hospital", "Consultancy", "Education", "Cosmetics", "Construction", "E-commerce", "Technology", "Pharma", "Food"];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-card max-w-2xl mx-auto">
      <p className="font-heading font-bold text-dark text-lg mb-1">Trademark Class Finder</p>
      <p className="text-muted text-xs mb-5">Enter your business category to find the right trademark class(es)</p>
      <div className="flex gap-3 mb-4">
        <input
          type="text" value={query} onChange={e => { setQuery(e.target.value); setSearched(false); }}
          onKeyDown={e => e.key === "Enter" && search()}
          placeholder="e.g. Restaurant, Software, Clothing..."
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-dark focus:outline-none focus:border-primary transition-colors"
        />
        <button onClick={search}
          className="px-5 py-2.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors flex items-center gap-2"
        >
          <Search size={14} /> Search
        </button>
      </div>
      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {suggestions.map(s => (
          <button key={s} onClick={() => { setQuery(s); setResult(null); setSearched(false); }}
            className="px-3 py-1 text-xs font-heading font-semibold border border-slate-200 rounded-full text-muted hover:border-primary hover:text-primary transition-all"
          >{s}</button>
        ))}
      </div>
      <AnimatePresence>
        {searched && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {result ? (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                <p className="font-heading font-bold text-dark text-sm mb-3">Recommended Trademark Class(es)</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {result.classes.map(c => (
                    <span key={c} className="px-3 py-1 bg-primary text-white text-xs font-heading font-bold rounded-full">Class {c}</span>
                  ))}
                </div>
                <p className="text-muted text-xs mb-3 leading-relaxed">{result.note}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Info size={11} className="text-primary" />
                  There are 45 trademark classes — 34 for goods and 11 for services.
                </p>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="font-heading font-semibold text-dark text-sm mb-1">Category not found automatically</p>
                <p className="text-muted text-xs mb-3">Your business may span multiple classes. Our experts will identify the exact classes for you.</p>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 text-xs text-primary font-heading font-semibold hover:gap-3 transition-all"
                >
                  Get Expert Class Guidance <ArrowRight size={11} />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <p className="text-muted text-[11px] mt-4">Need help choosing? <Link href="/contact" className="text-primary font-semibold hover:underline">Talk to our trademark experts →</Link></p>
    </div>
  );
}

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
        <p className="font-heading font-bold text-dark text-base mb-1">Protect Your Brand Today</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Our trademark experts handle search, filing, objections and renewal.</p>
        <div className="space-y-2 mb-5">
          {["Free Trademark Search", "Expert Class Selection", "Objection Handling", "Renewal Reminders"].map(pt => (
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
      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Download size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Trademark Checklist</p>
        </div>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">Download the complete trademark registration checklist as PDF.</p>
        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
          <Download size={13} /> Download PDF
        </button>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "5000+", l: "Applications" }, { v: "98%", l: "Success Rate" }, { v: "15+", l: "Years Exp." }, { v: "24h", l: "Response" }].map(s => (
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
export function TrademarkPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="tm-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#tm-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link><span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link><span>/</span>
            <span className="text-dark">Trademark Registration</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">Intellectual Property Experts • Protect Your Brand</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Trademark Your Brand<br /><span className="text-primary">Before Someone Else Does</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Your brand name, logo, slogan, and identity are valuable business assets. Register your trademark with expert assistance and secure exclusive legal rights to your brand across India.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Register My Trademark <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Free Trademark Consultation
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["Expert Filing Assistance", "Trademark Search Included", "Objection Support", "PAN India Services"].map(pt => (
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
                      <ShieldCheck size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">Trademark at a Glance</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Protected
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
                    <p className="text-xs text-muted">Filing starts from</p>
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

      {/* ── WHAT IS A TRADEMARK ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                <Image
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=85"
                  alt="Trademark registration and brand protection"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">5,000+</p>
                <p className="text-white/60 text-xs">Trademarks Filed</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is a Trademark?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                A <strong>trademark</strong> is a legally registered intellectual property that protects your brand name, logo, slogan, product name, packaging, or any distinctive mark that identifies your business. It is governed by the <strong>Trade Marks Act, 1999</strong> in India.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Registration grants you <strong>exclusive rights</strong> to use the mark commercially, the right to use the <strong>® symbol</strong>, and legal grounds to take action against copycats and infringers across India.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Exclusive Rights", "Brand Recognition", "Legal Protection", "Valuable Business Asset"].map(pt => (
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
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">Can You Register Your Brand?</h2>
            <p className="text-muted text-base max-w-lg mx-auto">Answer 3 quick questions to check your trademark eligibility and next steps.</p>
          </div>
          <EligibilityChecker />
        </div>
      </section>

      {/* ── WHY REGISTER ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Why It Matters" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Why Register a Trademark?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whyRegister.map((item, i) => {
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

      {/* ── WHAT CAN BE TRADEMARKED ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="What Qualifies" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">What Can Be Trademarked?</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {whatCanBeTrademarked.map((item, i) => {
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
        </div>
      </section>

      {/* ── CLASS FINDER ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Eyebrow label="Class Finder" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">Find the Right Trademark Class</h2>
            <p className="text-muted text-base max-w-lg mx-auto">There are 45 trademark classes — 34 for goods and 11 for services. Choose the wrong one and you get no protection.</p>
          </div>
          <ClassFinder />
        </div>
      </section>

      {/* ── TWO-COLUMN: MAIN + SIDEBAR ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* REGISTRATION PROCESS */}
            <section>
              <Eyebrow label="Registration Process" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Trademark Registration Process — Step by Step</h2>
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

            {/* TRADEMARK LIFECYCLE */}
            <section>
              <Eyebrow label="Trademark Lifecycle" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">The Complete Trademark Lifecycle</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {lifecycleSteps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.label} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-2 shadow-sm">
                            <Icon size={17} className="text-white" />
                          </div>
                          <p className="text-xs font-heading font-semibold text-dark leading-snug max-w-[72px]">{step.label}</p>
                        </div>
                        {i < lifecycleSteps.length - 1 && (
                          <ChevronRight size={14} className="text-slate-400 shrink-0 hidden sm:block" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 bg-primary/5 border border-primary/15 rounded-xl p-4 flex items-center gap-3">
                  <Info size={15} className="text-primary shrink-0" />
                  <p className="text-dark text-xs leading-relaxed">From application to certificate typically takes <strong>18–24 months</strong>. You can use ™ immediately after filing. The ® symbol is only available after registration.</p>
                </div>
              </div>
            </section>

            {/* REQUIRED DOCUMENTS */}
            <section>
              <Eyebrow label="Documents Required" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Trademark Registration Document Checklist</h2>
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
                <div className="flex justify-center">
                  <button className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-heading font-semibold text-sm rounded-xl hover:bg-primary hover:text-white transition-all">
                    <Download size={14} /> Download Trademark Checklist
                  </button>
                </div>
              </div>
            </section>

            {/* TRADEMARK SEARCH */}
            <section>
              <Eyebrow label="Trademark Search" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">Why Trademark Search Matters</h2>
              <p className="text-muted text-sm mb-8">A comprehensive search before filing significantly reduces the chance of objections or rejection — protecting your investment and timeline.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div className="rounded-3xl overflow-hidden aspect-video shadow-[0_8px_32px_rgba(15,45,82,0.08)] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=85"
                    alt="Trademark search and brand analysis"
                    fill className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 content-start">
                  {[
                    { icon: ShieldCheck, title: "Avoid Conflicts",          desc: "Identify identical or similar marks before investing in filing fees." },
                    { icon: AlertCircle, title: "Reduce Objections",        desc: "Filing after search dramatically lowers examination objection risk." },
                    { icon: DollarSign,  title: "Protect Investment",       desc: "Avoid wasted government fees on applications likely to fail." },
                    { icon: Zap,         title: "Faster Registration",      desc: "Clean applications move through the registry process more quickly." },
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
            </section>

            {/* OBJECTION HANDLING */}
            <section>
              <Eyebrow label="Objection Handling" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Trademark Objection Handling</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                      <AlertTriangle size={15} className="text-red-500" />
                    </div>
                    <p className="font-heading font-bold text-dark text-base">Common Reasons for Objection</p>
                  </div>
                  <div className="space-y-2.5">
                    {objectionReasons.map(reason => (
                      <div key={reason} className="flex items-start gap-3 bg-white/60 rounded-xl px-3 py-2.5">
                        <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Minus size={8} className="text-red-500" />
                        </div>
                        <span className="text-dark text-xs">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
                      <CheckCircle size={15} className="text-green-600" />
                    </div>
                    <p className="font-heading font-bold text-dark text-base">How Company Avenue Helps</p>
                  </div>
                  <div className="space-y-2.5">
                    {objectionHelp.map(help => (
                      <div key={help} className="flex items-start gap-3 bg-white/60 rounded-xl px-3 py-2.5">
                        <CheckCircle size={12} className="text-green-600 shrink-0 mt-0.5" />
                        <span className="text-dark text-xs">{help}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* RENEWAL */}
            <section>
              <Eyebrow label="Trademark Renewal" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">Trademark Renewal</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {renewalCards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <motion.div key={card.label} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className={`border rounded-2xl p-5 text-center hover:shadow-card transition-all ${card.color}`}
                    >
                      <Icon size={20} className="mx-auto mb-2 opacity-80" />
                      <p className="font-heading font-semibold text-xs mb-1 opacity-80">{card.label}</p>
                      <p className="font-heading font-bold text-sm">{card.value}</p>
                    </motion.div>
                  );
                })}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4">
                <Bell size={20} className="text-amber-500 shrink-0" />
                <div className="flex-1">
                  <p className="font-heading font-bold text-dark text-sm">Never Let Your Trademark Expire</p>
                  <p className="text-muted text-xs mt-0.5">We proactively remind you before your trademark expiry date and handle the renewal process.</p>
                </div>
                <Link href="/contact"
                  className="shrink-0 px-4 py-2 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
                >
                  Set Reminder
                </Link>
              </div>
            </section>

            {/* BENEFITS */}
            <section>
              <Eyebrow label="Benefits" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Benefits of a Registered Trademark</h2>
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
            </section>

            {/* COMMON MISTAKES */}
            <section>
              <Eyebrow label="Common Mistakes" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Avoid These Trademark Registration Mistakes</h2>
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
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">Why Choose Company Avenue for Trademark?</h2>
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
                    { v: "5,000+", l: "Trademarks Filed",   c: "bg-primary text-white" },
                    { v: "98%",    l: "Successful Filing",  c: "bg-accent text-dark" },
                    { v: "15+",    l: "Years Experience",   c: "bg-slate-800 text-white" },
                    { v: "24 hrs", l: "Response Time",      c: "bg-green-600 text-white" },
                  ].map(s => (
                    <motion.div key={s.l} whileHover={{ y: -4 }} className={`${s.c} rounded-2xl p-6 text-center shadow-card`}>
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
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">Free Trademark Resources</h2>
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-7 shadow-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Trademark Registration Checklist", sub: "All documents in one list",       icon: FileText,   color: "bg-blue-50 text-blue-600" },
                  { title: "Trademark Class Guide",            sub: "All 45 classes explained",        icon: BookOpen,   color: "bg-green-50 text-green-600" },
                  { title: "Brand Protection Handbook",        sub: "Complete IP guide for businesses",icon: ShieldCheck,color: "bg-purple-50 text-purple-600" },
                  { title: "Trademark Renewal Guide",          sub: "Renewal process & timelines",     icon: Repeat2,    color: "bg-amber-50 text-amber-600" },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all cursor-pointer">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color}`}><Icon size={18} /></div>
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

            {/* RELATED TOOLS */}
            <section>
              <Eyebrow label="Tools" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">Trademark Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Trademark Class Finder",       sub: "Find right class for your business" },
                  { title: "Trademark Cost Estimator",     sub: "Estimate total registration cost" },
                  { title: "Brand Name Checklist",         sub: "Check if your name is trademarkable" },
                  { title: "Registration Progress Tracker",sub: "Track your application status" },
                ].map(item => (
                  <div key={item.title} className="relative border border-slate-100 rounded-2xl p-5 bg-white hover:shadow-card transition-all overflow-hidden">
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-heading font-bold px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">Coming Soon</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3">
                      <Search size={18} className="text-primary" />
                    </div>
                    <p className="font-heading font-bold text-dark text-sm mb-1">{item.title}</p>
                    <p className="text-muted text-xs leading-relaxed">{item.sub}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* BRAND JOURNEY */}
            <section>
              <Eyebrow label="Brand Protection Journey" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Your Complete Brand Protection Journey</h2>
              <div className="relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200" aria-hidden="true" />
                <div className="space-y-4">
                  {brandJourney.map((item, i) => (
                    <motion.div key={item.step} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex gap-5 relative"
                    >
                      <div className={`w-11 h-11 rounded-full font-heading font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-sm ${item.active ? "bg-accent text-dark" : "bg-primary text-white"}`}>
                        {item.step}
                      </div>
                      <Link href={item.link}
                        className={`flex-1 flex items-center justify-between rounded-2xl p-4 border transition-all group hover:shadow-card ${item.active ? "border-accent/30 bg-accent/5" : "border-slate-100 bg-white hover:border-primary/15"}`}
                      >
                        <div>
                          <p className={`font-heading font-bold text-sm mb-0.5 ${item.active ? "text-dark" : "text-dark group-hover:text-primary transition-colors"}`}>{item.title}</p>
                          <p className="text-muted text-xs">{item.desc}</p>
                        </div>
                        {item.active
                          ? <span className="text-[10px] font-heading font-bold px-2.5 py-1 bg-accent text-dark rounded-full shrink-0">Current</span>
                          : <ArrowRight size={14} className="text-muted group-hover:text-primary transition-colors shrink-0" />
                        }
                      </Link>
                    </motion.div>
                  ))}
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
            <defs><pattern id="cta-tm" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#cta-tm)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Protect Your Brand" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Protect the Brand<br />You&apos;re Building
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Your brand deserves legal protection from day one. Company Avenue Advisory manages everything — from trademark search and class selection to filing, objection handling, and renewal — so you can focus on growing your business with confidence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-accent-light transition-colors"
              >
                Register My Trademark <ArrowRight size={15} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Speak to an IP Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
