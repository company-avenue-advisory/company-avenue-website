"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, Clock, Users, Building2, BadgeCheck,
  ShieldCheck, FileText, CreditCard, Fingerprint, Hash, Zap,
  CheckCircle, Plus, Minus, ArrowUpRight, Briefcase, Monitor,
  DollarSign, Headphones, UserCheck, LifeBuoy, AlertTriangle,
  Download, MessageCircle, Globe, Scale, Repeat2, Award,
  TrendingUp, Receipt, PenLine, Layers, BookOpen, CalendarCheck,
} from "lucide-react";

/* ─── animation variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

/* ─── eyebrow component ─── */
function Eyebrow({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
      <span className="w-6 h-px bg-accent" />{label}<span className="w-6 h-px bg-accent" />
    </span>
  );
}

/* ─── data ─── */
const quickFacts = [
  { icon: Clock,      label: "Timeline",           value: "7–10 Working Days" },
  { icon: Users,      label: "Min. Partners",       value: "2 Partners" },
  { icon: Globe,      label: "Max. Partners",       value: "Unlimited" },
  { icon: Building2,  label: "Authority",           value: "MCA (India)" },
  { icon: BadgeCheck, label: "Certificate",         value: "Certificate of Incorporation" },
  { icon: FileText,   label: "Compliance",          value: "Moderate Annual Compliance" },
];

const whoShouldRegister = [
  { icon: Briefcase,  title: "Professional Firms",       desc: "CAs, lawyers, architects and licensed professionals." },
  { icon: UserCheck,  title: "Consultants",              desc: "Management, strategy and business consultants." },
  { icon: Scale,      title: "Law Firms",                desc: "Legal practices and advocacy firms." },
  { icon: Monitor,    title: "IT Service Companies",     desc: "Software services, web development and IT agencies." },
  { icon: Layers,     title: "Marketing Agencies",       desc: "Digital marketing, PR and branding firms." },
  { icon: Users,      title: "Family Businesses",        desc: "Multi-generational businesses with shared ownership." },
  { icon: TrendingUp, title: "Freelancers Scaling Up",   desc: "Independent professionals formalising their practice." },
  { icon: Building2,  title: "SMEs",                    desc: "Small & medium enterprises seeking limited liability." },
];

const benefits = [
  { icon: ShieldCheck, title: "Limited Liability Protection",  desc: "Partners' personal assets are fully protected from business debts and obligations." },
  { icon: Building2,   title: "Separate Legal Entity",         desc: "LLP exists independently — it can own assets, enter contracts and sue or be sued." },
  { icon: FileText,    title: "Lower Compliance Burden",       desc: "Fewer mandatory filings compared to Private Limited Companies." },
  { icon: DollarSign,  title: "No Minimum Capital",            desc: "Start with any amount of capital — no statutory minimum requirement." },
  { icon: Zap,         title: "Flexible Management",           desc: "Partners manage the business directly without board requirements." },
  { icon: Award,       title: "Higher Credibility",            desc: "Formal LLP structure enhances trust with clients and banks." },
  { icon: Users,       title: "Easy Partner Addition",         desc: "New partners can be admitted by amending the LLP agreement." },
  { icon: Repeat2,     title: "Perpetual Succession",          desc: "LLP continues to exist irrespective of changes in partners." },
];

const comparisonRows = [
  { feature: "Separate Legal Entity",     llp: "✓",          pvt: "✓" },
  { feature: "Limited Liability",         llp: "✓",          pvt: "✓" },
  { feature: "Annual Compliance",         llp: "Moderate",   pvt: "High" },
  { feature: "Venture Capital Funding",   llp: "Limited",    pvt: "Excellent" },
  { feature: "Ownership Transfer",        llp: "Moderate",   pvt: "Easy" },
  { feature: "Taxation",                  llp: "Flexible",   pvt: "Corporate" },
  { feature: "Suitable For",              llp: "SMEs & Professionals", pvt: "Startups & Scaleups" },
];

const decisionOptions = [
  { label: "Raising Investment",       recommended: "pvt" },
  { label: "Consulting Business",      recommended: "llp" },
  { label: "Agency",                   recommended: "llp" },
  { label: "Technology Startup",       recommended: "pvt" },
  { label: "Family Business",          recommended: "llp" },
  { label: "Professional Practice",    recommended: "llp" },
];

const partnerDocs = [
  { icon: CreditCard,   label: "PAN Card" },
  { icon: Fingerprint,  label: "Aadhaar Card" },
  { icon: FileText,     label: "Passport Size Photograph" },
  { icon: Hash,         label: "Email Address" },
  { icon: Phone,        label: "Mobile Number" },
  { icon: Building2,    label: "Address Proof" },
];

const officeDocs = [
  { icon: Zap,      label: "Electricity Bill" },
  { icon: FileText, label: "Rent Agreement (if rented)" },
  { icon: PenLine,  label: "NOC from Property Owner" },
  { icon: Receipt,  label: "Property Tax Receipt" },
];

const registrationSteps = [
  { n: "01", title: "Free Consultation",        desc: "Understand your business and recommend the right structure." },
  { n: "02", title: "Document Verification",    desc: "Collect and verify all partner and office documents securely." },
  { n: "03", title: "DSC Issuance",             desc: "Issue Digital Signature Certificates for all designated partners." },
  { n: "04", title: "DPIN Allocation",          desc: "Apply for Designated Partner Identification Numbers." },
  { n: "05", title: "LLP Name Reservation",     desc: "Reserve the LLP name via RUN-LLP on the MCA portal." },
  { n: "06", title: "Incorporation Filing",     desc: "Prepare and file FiLLiP (Form for Incorporation of LLP) with MCA." },
  { n: "07", title: "Govt. Verification",       desc: "MCA reviews the application and verifies submitted documents." },
  { n: "08", title: "Certificate Issued",       desc: "Receive the Certificate of Incorporation with LLPIN." },
  { n: "09", title: "PAN & TAN",                desc: "PAN and TAN are auto-allotted along with incorporation." },
  { n: "10", title: "Current Account",          desc: "Open the LLP's current account and begin business operations." },
];

const timelineStages = [
  { label: "Consultation",        time: "Same Day" },
  { label: "Documents",           time: "Day 1" },
  { label: "DSC",                 time: "Day 1" },
  { label: "Name Reservation",    time: "2–3 Days" },
  { label: "Govt. Processing",    time: "3–5 Days" },
  { label: "Certificate Issued",  time: "7–10 Days" },
];

const deliverables = [
  { icon: BadgeCheck, label: "Certificate of Incorporation", color: "text-primary bg-primary/8" },
  { icon: Hash,       label: "LLPIN",                        color: "text-blue-600 bg-blue-50" },
  { icon: CreditCard, label: "PAN",                          color: "text-purple-600 bg-purple-50" },
  { icon: Hash,       label: "TAN",                          color: "text-green-600 bg-green-50" },
  { icon: PenLine,    label: "DSC",                          color: "text-orange-600 bg-orange-50" },
  { icon: Users,      label: "Partner Identification",       color: "text-teal-600 bg-teal-50" },
  { icon: FileText,   label: "LLP Agreement",                color: "text-rose-600 bg-rose-50" },
];

const postCompliance = [
  { icon: BookOpen,     title: "Maintain Books of Accounts",   desc: "Maintain proper books from the date of incorporation." },
  { icon: CalendarCheck,title: "Annual Return (Form 11)",      desc: "File with MCA within 60 days of end of financial year." },
  { icon: FileText,     title: "Statement of Accounts (8)",    desc: "Submit audited accounts to MCA each financial year." },
  { icon: Receipt,      title: "Income Tax Return",            desc: "File ITR annually even if the LLP has no income." },
  { icon: BadgeCheck,   title: "GST Compliance",               desc: "Monthly/quarterly returns if GST-registered." },
  { icon: Users,        title: "Partner Updates",              desc: "File Form 4 whenever a partner is added or removed." },
];

const commonMistakes = [
  { title: "Choosing the Wrong Structure",       desc: "LLP is not ideal if you plan to raise VC funding or equity investment." },
  { title: "Using an Unavailable Name",          desc: "Check name availability on MCA before preparing documents." },
  { title: "Submitting Incorrect Documents",     desc: "Mismatched PAN/Aadhaar details are a leading cause of rejection." },
  { title: "Ignoring Annual Compliance",         desc: "Non-filing of Form 11/8 attracts heavy penalties." },
  { title: "Mixing Personal & Business Finances",desc: "Always open a separate current account for LLP transactions." },
  { title: "Delaying GST Registration",         desc: "Register for GST as soon as turnover crosses the threshold." },
  { title: "No NOC for Registered Office",       desc: "Always obtain NOC from property owner for the registered address." },
];

const whyUsPoints = [
  { icon: Award,       label: "15+ Years of Industry Experience" },
  { icon: Building2,   label: "1000+ Businesses Successfully Registered" },
  { icon: UserCheck,   label: "Experienced Chartered Accountants" },
  { icon: DollarSign,  label: "Transparent Pricing — No Hidden Fees" },
  { icon: Zap,         label: "Fast Documentation & Filing" },
  { icon: Monitor,     label: "100% Digital Process" },
  { icon: LifeBuoy,    label: "Post Registration Compliance Support" },
  { icon: Headphones,  label: "Dedicated Relationship Manager" },
];

const faqs = [
  { q: "What is an LLP?", a: "A Limited Liability Partnership is a legally recognised business structure under the LLP Act, 2008. It combines the flexibility of a partnership with the limited liability protection of a company. It is a separate legal entity with its own PAN, TAN and LLPIN." },
  { q: "How many partners are required?", a: "A minimum of 2 partners is required. There is no upper limit on the number of partners. At least 2 designated partners are required, and at least one must be a resident of India." },
  { q: "Can an LLP have foreign partners?", a: "Yes. Foreign nationals and NRIs can become partners in an Indian LLP, subject to FDI guidelines. Additional documents such as apostilled identification are required." },
  { q: "How long does LLP registration take?", a: "Typically 7–10 working days after all documents are submitted. The timeline depends on MCA processing speed and document accuracy." },
  { q: "Can the process be completed online?", a: "Yes, 100% online. Document upload, DSC issuance, name reservation, form filing and certificate delivery are all handled digitally. No government office visit required." },
  { q: "Is GST mandatory for an LLP?", a: "Not immediately. GST registration is required only if annual turnover exceeds ₹40 lakhs (goods) or ₹20 lakhs (services), or if you supply inter-state. We advise based on your business plan." },
  { q: "What is the difference between LLP and Partnership Firm?", a: "An LLP is a registered legal entity with limited liability, separate existence and annual compliance requirements. A traditional partnership firm offers no limited liability and partners are personally liable for all obligations." },
  { q: "Can LLP be converted into a Private Limited Company?", a: "Yes. An LLP can be converted to a Private Limited Company under Section 366 of the Companies Act, 2013. We handle the full conversion process." },
  { q: "Do LLPs require annual filing?", a: "Yes. LLPs must file Form 11 (Annual Return) and Form 8 (Statement of Accounts and Solvency) with MCA every year. Non-compliance attracts ₹100 per day penalty." },
  { q: "What are the compliance requirements?", a: "Annual filings include Form 11, Form 8, Income Tax Return and GST returns (if applicable). Additionally, partner changes require Form 4 filing with MCA." },
  { q: "What is LLPIN?", a: "LLPIN stands for Limited Liability Partnership Identification Number. It is a unique identification number issued to every registered LLP by the Ministry of Corporate Affairs — equivalent to CIN for companies." },
  { q: "How much does LLP Registration cost?", a: "Our fees start from ₹4,999 inclusive of government fees, DSC charges and professional fees. The final cost depends on the state of registration and additional services. We provide a full breakdown upfront." },
  { q: "Which structure is better for consultants?", a: "An LLP is generally better for consultants and professional service firms due to lower compliance burden, flexible management and no minimum capital requirement. However, if you plan to raise funding, a Private Limited Company is more appropriate." },
  { q: "Can an LLP raise investment?", a: "LLPs cannot issue equity shares or accept venture capital in the traditional sense. However, partners can bring in capital through profit-sharing arrangements. For equity investment, a Private Limited Company is the preferred structure." },
  { q: "Why choose Company Avenue?", a: "15+ years of experience, 1000+ businesses registered, dedicated CAs for every client, transparent fixed pricing, 100% digital process and lifetime compliance support — Company Avenue is your end-to-end business compliance partner." },
];

const relatedServices = [
  { id: "private-limited-company", title: "Private Limited Company", desc: "Best for startups raising investment." },
  { id: "gst-registration",         title: "GST Registration",         desc: "GSTIN for your new LLP." },
  { id: "trademark-registration",   title: "Trademark Registration",   desc: "Protect your brand name." },
  { id: "accounting-bookkeeping",   title: "Accounting Services",       desc: "Books, MIS and statements." },
  { id: "startup-india",            title: "Startup India",             desc: "DPIIT recognition & benefits." },
  { id: "annual-filing",            title: "Annual Compliance",         desc: "Form 11, Form 8 & ITR filing." },
];

/* ─── FAQ accordion item ─── */
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

/* ─── cost estimator ─── */
function CostEstimator() {
  const [state, setState] = useState("Delhi");
  const [partners, setPartners] = useState("2");
  const [gst, setGst] = useState(false);
  const [trademark, setTrademark] = useState(false);
  const [accounting, setAccounting] = useState(false);
  const [result, setResult] = useState<null | { gov: number; prof: number; total: number }>(null);

  const estimate = () => {
    const govBase = state === "Delhi" || state === "Maharashtra" ? 1200 : 900;
    const profBase = 3800;
    const extras = (gst ? 1499 : 0) + (trademark ? 4500 : 0) + (accounting ? 2999 : 0);
    const partnerAdd = (parseInt(partners) - 2) * 400;
    setResult({ gov: govBase + partnerAdd, prof: profBase + extras, total: govBase + partnerAdd + profBase + extras });
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
          <DollarSign size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-dark text-base">Estimate Your LLP Registration Cost</h3>
          <p className="text-muted text-xs">Indicative pricing — final quote provided on consultation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-xs font-heading font-semibold text-muted mb-1.5">State</label>
          <select value={state} onChange={e => setState(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-dark bg-white focus:outline-none focus:border-primary"
          >
            {["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh", "Gujarat", "Other"].map(s =>
              <option key={s}>{s}</option>
            )}
          </select>
        </div>
        <div>
          <label className="block text-xs font-heading font-semibold text-muted mb-1.5">Number of Partners</label>
          <select value={partners} onChange={e => setPartners(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-dark bg-white focus:outline-none focus:border-primary"
          >
            {["2", "3", "4", "5", "6+"].map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-2.5 mb-6">
        {[
          { label: "Include GST Registration", val: gst, set: setGst },
          { label: "Include Trademark Registration", val: trademark, set: setTrademark },
          { label: "Include Monthly Accounting", val: accounting, set: setAccounting },
        ].map(item => (
          <label key={item.label} className="flex items-center gap-3 cursor-pointer group">
            <div onClick={() => item.set(!item.val)}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${item.val ? "bg-primary border-primary" : "border-slate-300"}`}
            >
              {item.val && <CheckCircle size={12} className="text-white" />}
            </div>
            <span className="text-dark text-sm">{item.label}</span>
          </label>
        ))}
      </div>

      <button onClick={estimate}
        className="w-full py-3 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors mb-4"
      >
        Estimate Cost
      </button>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2"
          >
            <p className="font-heading font-semibold text-dark text-sm mb-3">Estimated Registration Package</p>
            <div className="flex justify-between text-sm"><span className="text-muted">Government Fees</span><span className="font-medium text-dark">₹{result.gov.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted">Professional Fees</span><span className="font-medium text-dark">₹{result.prof.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between text-sm font-heading font-bold border-t border-slate-200 pt-2 mt-2">
              <span className="text-dark">Total Estimate</span>
              <span className="text-primary text-base">₹{result.total.toLocaleString("en-IN")}</span>
            </div>
            <p className="text-muted text-[11px] mt-2 leading-relaxed">* Actual cost may vary depending on state, capital contribution and additional registrations required.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── sticky sidebar ─── */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">Need Expert Assistance?</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Talk to our Chartered Accountants before choosing your business structure.</p>
        <div className="space-y-2 mb-5">
          {["Free Consultation", "Transparent Pricing", "End-to-End Registration", "Dedicated Relationship Manager"].map(pt => (
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

      {/* Download checklist */}
      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Download size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Document Checklist</p>
        </div>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">Download the complete LLP registration document checklist as PDF.</p>
        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
          <Download size={13} /> Download PDF
        </button>
      </div>

      {/* Quick stats */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "7–10", l: "Day Timeline" }, { v: "1000+", l: "LLPs Formed" }, { v: "15+", l: "Years Exp." }, { v: "100%", l: "Online" }].map(s => (
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
export function LLPPage() {
  const [decisionChoice, setDecisionChoice] = useState<string | null>(null);
  const recommended = decisionOptions.find(d => d.label === decisionChoice)?.recommended;

  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="llp-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#llp-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>

        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">LLP Registration</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">Trusted by Startups & Professionals Across India</span>
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Limited Liability Partnership<br />
                <span className="text-primary">(LLP) Registration in India</span>
              </motion.h1>

              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Register your LLP with complete assistance from experienced Chartered Accountants. We handle DSC, DPIN, name reservation, MCA incorporation, PAN, TAN and post-registration compliance through a transparent, fully digital process.
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
                {["7–10 Days Timeline", "100% Online Process", "Expert CAs", "Transparent Pricing"].map(pt => (
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
                        <Scale size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-xs">LLP Certificate of Incorporation</p>
                        <p className="text-white/50 text-[10px]">Ministry of Corporate Affairs</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-heading font-semibold bg-green-500/20 text-green-300 border border-green-400/30 px-2.5 py-1 rounded-full">● MCA Issued</span>
                  </div>
                  <div className="relative w-full aspect-[4/3] bg-slate-50">
                    <Image
                      src="/images/llp-certificate-sample.webp"
                      alt="Sample LLP Certificate of Incorporation issued by MCA"
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
                      <p className="font-heading font-bold text-dark text-xs">₹4,999</p>
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
                  <p className="text-[10px] text-muted font-heading">LLPIN & PAN</p>
                  <p className="font-heading font-bold text-green-600 text-sm">Included ✓</p>
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

      {/* ── TWO-COLUMN: content left, sticky sidebar right ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">

          {/* ── MAIN CONTENT ── */}
          <div className="space-y-24 min-w-0">

            {/* WHAT IS LLP */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <Eyebrow label="Overview" />
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                    What is a Limited Liability Partnership?
                  </h2>
                  <p className="text-slate-500 text-base leading-relaxed mb-5">
                    An LLP combines the operational flexibility of a traditional partnership with the legal protection of a company. Registered under the <strong>LLP Act, 2008</strong>, it is a separate legal entity allowing partners to enjoy limited liability with fewer compliance requirements than a Private Limited Company.
                  </p>
                  <p className="text-slate-500 text-base leading-relaxed mb-6">
                    LLPs are widely preferred by consultants, professional firms, agencies, service providers, architects, lawyers and small businesses seeking credibility without heavy corporate compliance.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Registered under LLP Act, 2008",
                      "Governed by MCA",
                      "Minimum 2, Unlimited partners",
                      "Separate legal identity",
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
                    <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=85"
                      alt="Professional LLP business consultation"
                      fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                    <p className="font-heading font-bold text-2xl">LLP Act</p>
                    <p className="text-white/60 text-xs">2008</p>
                  </div>
                </div>
              </div>
            </section>

            {/* WHO SHOULD REGISTER */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Ideal For" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Should Register an LLP?</h2>
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

            {/* LLP vs PRIVATE LIMITED */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Compare" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">
                  Should You Register an LLP or a Private Limited Company?
                </h2>
                <p className="text-muted mt-3 text-sm max-w-xl mx-auto">Use our interactive guide to find the right structure for your business.</p>
              </div>

              {/* Side-by-side cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {[
                  {
                    title: "Private Limited Company",
                    icon: Building2,
                    color: "border-slate-200",
                    badge: "bg-slate-100 text-slate-600",
                    items: ["Fundraising & Investors", "Startup Ecosystem", "Equity Distribution", "High Growth Businesses"],
                    key: "pvt",
                  },
                  {
                    title: "LLP",
                    icon: Scale,
                    color: "border-primary/30",
                    badge: "bg-primary/10 text-primary",
                    items: ["Professional Services", "Consulting Firms", "Agencies & Freelancers", "Lower Compliance Need"],
                    key: "llp",
                  },
                ].map(card => {
                  const Icon = card.icon;
                  const isRec = recommended === card.key;
                  return (
                    <motion.div key={card.key}
                      animate={{ scale: isRec ? 1.02 : 1, boxShadow: isRec ? "0 8px 32px rgba(15,45,82,0.12)" : "none" }}
                      transition={{ duration: 0.3 }}
                      className={`bg-white border-2 ${isRec ? "border-primary" : card.color} rounded-2xl p-6 transition-all duration-300`}
                    >
                      {isRec && (
                        <div className="mb-3">
                          <span className="text-xs font-heading font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">★ Recommended for you</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isRec ? "bg-primary" : "bg-slate-100"}`}>
                          <Icon size={18} className={isRec ? "text-white" : "text-slate-600"} />
                        </div>
                        <p className="font-heading font-bold text-dark text-base">{card.title}</p>
                      </div>
                      <p className="text-xs font-heading font-semibold text-muted uppercase tracking-wider mb-3">Suitable for</p>
                      <ul className="space-y-2">
                        {card.items.map(it => (
                          <li key={it} className="flex items-center gap-2">
                            <CheckCircle size={12} className="text-primary shrink-0" />
                            <span className="text-dark text-sm">{it}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>

              {/* Comparison table */}
              <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-100 mb-8">
                <table className="w-full min-w-[500px] border-collapse bg-white">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left px-5 py-4 text-xs font-heading font-semibold text-muted uppercase tracking-wider w-[40%]">Feature</th>
                      <th className="px-5 py-4 text-center w-[30%]">
                        <div className="inline-block bg-primary text-white text-xs font-heading font-bold px-4 py-2 rounded-xl">LLP ★</div>
                      </th>
                      <th className="px-5 py-4 text-center text-sm font-heading font-semibold text-slate-500 w-[30%]">Private Limited</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr key={row.feature} className={`border-b border-slate-50 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                        <td className="px-5 py-3.5 text-sm font-heading font-medium text-slate-600">{row.feature}</td>
                        <td className="px-5 py-3.5 text-center text-sm font-heading font-semibold text-primary bg-primary/[0.025] border-x border-primary/10">{row.llp}</td>
                        <td className="px-5 py-3.5 text-center text-sm text-slate-500">{row.pvt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Interactive decision guide */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <p className="font-heading font-semibold text-dark text-sm mb-4 text-center">
                  What best describes your business?
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {decisionOptions.map(opt => (
                    <button key={opt.label}
                      onClick={() => setDecisionChoice(decisionChoice === opt.label ? null : opt.label)}
                      className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold border transition-all ${
                        decisionChoice === opt.label
                          ? "bg-primary text-white border-primary"
                          : "bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {recommended && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-heading font-semibold ${
                        recommended === "llp" ? "bg-primary/10 text-primary" : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      <CheckCircle size={16} />
                      We recommend: <strong>{recommended === "llp" ? "LLP Registration" : "Private Limited Company"}</strong>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* BENEFITS */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Benefits" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Key Benefits of an LLP</h2>
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
            </section>

            {/* DOCUMENTS REQUIRED */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Documents" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Documents Required</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "For Partners", icon: Users, docs: partnerDocs },
                  { title: "For Registered Office", icon: Building2, docs: officeDocs },
                ].map(card => {
                  const CardIcon = card.icon;
                  return (
                    <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5 }}
                      className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                          <CardIcon size={18} className="text-primary" />
                        </div>
                        <h3 className="font-heading font-bold text-dark text-base">{card.title}</h3>
                      </div>
                      <ul className="space-y-3">
                        {card.docs.map(({ icon: Icon, label }) => (
                          <li key={label} className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                              <Icon size={13} className="text-slate-500" />
                            </div>
                            <span className="text-dark text-sm">{label}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* REGISTRATION PROCESS */}
            <section>
              <div className="text-center mb-16">
                <Eyebrow label="Process" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">LLP Registration Process</h2>
                <p className="text-muted mt-3 text-sm max-w-xl mx-auto">10 transparent steps from consultation to operational LLP.</p>
              </div>

              {/* Desktop 5+5 */}
              <div className="hidden lg:block space-y-8">
                {[registrationSteps.slice(0, 5), registrationSteps.slice(5)].map((row, rowIdx) => (
                  <div key={rowIdx} className="relative">
                    <div className="absolute top-7 left-[calc(10%)] right-[calc(10%)] h-px bg-slate-200 z-0" />
                    <div className="grid grid-cols-5 gap-4 relative z-10">
                      {row.map((step, i) => (
                        <motion.div key={step.n} custom={rowIdx * 5 + i} variants={fadeUp} initial="hidden"
                          whileInView="show" viewport={{ once: true, margin: "-40px" }}
                          className="flex flex-col items-center text-center"
                        >
                          <div className="relative w-14 h-14 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center mb-4 shadow-sm">
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
            </section>

            {/* ESTIMATED TIMELINE */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Timeline" />
                <h2 className="font-heading font-bold text-3xl text-dark">Estimated Timeline</h2>
              </div>
              <div className="relative max-w-3xl mx-auto">
                <div className="hidden md:block absolute top-8 left-[8%] right-[8%] h-0.5 bg-slate-100 z-0" />
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
                  {timelineStages.map((stage, i) => (
                    <motion.div key={stage.label} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center mb-3 border-2 shadow-sm ${i === timelineStages.length - 1 ? "bg-primary border-primary" : "bg-white border-slate-200"}`}>
                        <span className={`font-heading font-bold text-xs leading-snug text-center px-1 ${i === timelineStages.length - 1 ? "text-white" : "text-primary"}`}>{stage.time}</span>
                      </div>
                      <p className={`font-heading font-semibold text-xs leading-snug ${i === timelineStages.length - 1 ? "text-primary" : "text-dark"}`}>{stage.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* COST ESTIMATOR */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Pricing" />
                <h2 className="font-heading font-bold text-3xl text-dark">Estimate Your LLP Registration Cost</h2>
              </div>
              <CostEstimator />
            </section>

            {/* GOVERNMENT DELIVERABLES */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Deliverables" />
                <h2 className="font-heading font-bold text-3xl text-dark">What You Receive After Registration</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {deliverables.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.label} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:shadow-card hover:border-primary/10 transition-all"
                    >
                      <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-3`}>
                        <Icon size={18} />
                      </div>
                      <p className="font-heading font-semibold text-dark text-xs leading-snug">{item.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* POST-REGISTRATION COMPLIANCE */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Post Registration" />
                <h2 className="font-heading font-bold text-3xl text-dark">Post-Registration Compliance</h2>
                <p className="text-muted mt-3 text-sm">Stay compliant — we handle everything after incorporation.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {postCompliance.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex items-start gap-4 bg-white border border-slate-100 rounded-2xl p-4 hover:border-primary/15 hover:shadow-sm transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-dark text-sm mb-1">{item.title}</p>
                        <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* COMMON MISTAKES */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Watch Out" />
                <h2 className="font-heading font-bold text-3xl text-dark">Avoid These Common Registration Mistakes</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {commonMistakes.map((m, i) => (
                  <motion.div key={m.title} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="show" viewport={{ once: true }}
                    className="bg-amber-50 border border-amber-100 rounded-2xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle size={15} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-dark text-sm mb-1">{m.title}</p>
                        <p className="text-slate-600 text-xs leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* DOWNLOAD CHECKLIST */}
            <section className="bg-primary rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <Eyebrow label="Free Resource" />
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4 leading-tight">
                    Download LLP Registration Checklist
                  </h2>
                  <p className="text-white/60 text-base leading-relaxed">
                    A professionally designed PDF with the complete document checklist required for LLP Registration. Share with your partners before starting the process.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <button className="flex items-center justify-center gap-2 py-4 bg-white text-primary font-heading font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                    <Download size={16} /> Download Checklist PDF
                  </button>
                  <button className="flex items-center justify-center gap-2 py-4 bg-green-500 text-white font-heading font-semibold text-sm rounded-xl hover:bg-green-600 transition-colors">
                    <MessageCircle size={16} /> Share via WhatsApp
                  </button>
                </div>
              </div>
            </section>

            {/* WHY COMPANY AVENUE */}
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden aspect-[4/5] max-w-md shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                    <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=85"
                      alt="Company Avenue Advisory professional team"
                      fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                  </div>
                  <div className="absolute -right-4 bottom-8 bg-white rounded-2xl p-4 shadow-card border border-slate-100">
                    <p className="font-heading font-bold text-2xl text-primary leading-none">1000+</p>
                    <p className="text-muted text-xs mt-1">Businesses registered</p>
                  </div>
                </div>
                <div>
                  <Eyebrow label="Why Us" />
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-8 leading-tight">
                    Why Businesses Choose Company Avenue
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
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section itemScope itemType="https://schema.org/FAQPage">
              <div className="text-center mb-12">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
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
              <motion.div key={s.id} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
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

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden bg-[#0F2D52] py-24">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: "36px 36px" }}
        />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 text-white/50 text-xs font-heading font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Experts Available Mon–Sat, 9 AM – 7 PM
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight max-w-2xl mx-auto">
              Ready to Register Your LLP?
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Start your business confidently with expert guidance from Company Avenue Advisory. Our professionals ensure a smooth, transparent and hassle-free LLP registration process from start to finish.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-[#b8892f] text-white font-heading font-semibold text-sm rounded-xl transition-colors shadow-sm"
              >
                Book Free Consultation <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/8 transition-colors"
              >
                <Phone size={15} /> Speak to an Expert
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
