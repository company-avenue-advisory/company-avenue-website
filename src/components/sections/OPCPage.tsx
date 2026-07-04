"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, Clock, Building2, BadgeCheck,
  ShieldCheck, FileText, CreditCard, Fingerprint, Hash, Zap,
  CheckCircle, Plus, Minus, Briefcase, Monitor,
  DollarSign, Headphones, UserCheck, LifeBuoy, AlertTriangle,
  Download, MessageCircle, Globe, Scale, Award,
  TrendingUp, Receipt, PenLine, BookOpen, CalendarCheck,
  User, Users, Repeat2, Landmark, ArrowDown, Banknote, ShoppingBag,
} from "lucide-react";

/* ─── animation variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

/* ─── eyebrow ─── */
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
const quickFacts = [
  { icon: Clock,      label: "Registration Time", value: "7–10 Working Days" },
  { icon: User,       label: "Best For",           value: "Solo Entrepreneurs" },
  { icon: Landmark,   label: "Governed By",        value: "Companies Act, 2013" },
  { icon: FileText,   label: "Compliance",         value: "ROC Annual Filing & ITR" },
];

const heroGlance = [
  { icon: User,       label: "Founder",            value: "1 Owner" },
  { icon: ShieldCheck,label: "Liability",           value: "Limited" },
  { icon: Building2,  label: "Legal Status",        value: "Separate Legal Entity" },
  { icon: Repeat2,    label: "Perpetual Succession",value: "Yes" },
  { icon: Users,      label: "Min. Directors",      value: "1" },
  { icon: DollarSign, label: "Min. Capital",        value: "No Minimum" },
  { icon: UserCheck,  label: "Nominee Required",    value: "Yes" },
];

const whoShouldChoose = [
  { icon: Monitor,    title: "Freelancers",              desc: "Formalise your freelance practice with legal protection." },
  { icon: Briefcase,  title: "Independent Consultants",  desc: "Elevate credibility and protect personal assets." },
  { icon: Zap,        title: "IT Professionals",         desc: "Software & tech services with a corporate identity." },
  { icon: Globe,      title: "Digital Agencies",         desc: "Design, marketing & content agencies going solo." },
  { icon: TrendingUp, title: "Startup Founders",         desc: "First-time entrepreneurs testing a business idea." },
  { icon: ShoppingBag, title: "E-commerce Sellers",       desc: "Online sellers wanting a structured business entity." },
];

const benefits = [
  { icon: ShieldCheck, title: "Limited Liability Protection",  desc: "Personal assets are fully protected from business debts and obligations." },
  { icon: Building2,   title: "Separate Legal Identity",       desc: "The OPC can own property, sign contracts, and sue or be sued independently." },
  { icon: Award,       title: "Improved Business Credibility", desc: "Banks, vendors and clients trust incorporated businesses far more than proprietorships." },
  { icon: User,        title: "Complete Ownership Control",    desc: "100% ownership with no board or partner approvals required for decisions." },
  { icon: DollarSign,  title: "Tax & Financial Benefits",      desc: "Better financial discipline, structured accounting and corporate tax benefits." },
  { icon: Repeat2,     title: "Business Continuity",           desc: "A mandatory nominee ensures the business continues in case of unforeseen events." },
];

const comparisonRows = [
  { feature: "Ownership",           sole: "Single Owner",  opc: "Single Owner",   pvt: "2–200 Shareholders" },
  { feature: "Separate Legal Entity",sole: "✗ No",         opc: "✓ Yes",          pvt: "✓ Yes" },
  { feature: "Limited Liability",   sole: "✗ No",          opc: "✓ Yes",          pvt: "✓ Yes" },
  { feature: "Funding Potential",   sole: "✗ Very Low",    opc: "◑ Limited",      pvt: "✓ Excellent" },
  { feature: "Compliance",          sole: "Low",           opc: "Moderate",       pvt: "High" },
  { feature: "Govt. Recognition",   sole: "Low",           opc: "High",           pvt: "High" },
  { feature: "Taxation",            sole: "Slab Rates",    opc: "Corporate",      pvt: "Corporate" },
  { feature: "Business Continuity", sole: "✗ Ends w/owner",opc: "✓ Nominee",      pvt: "✓ Perpetual" },
  { feature: "Scalability",         sole: "Low",           opc: "Medium",         pvt: "High" },
  { feature: "Transferability",     sole: "Difficult",     opc: "Moderate",       pvt: "Easy" },
  { feature: "Investor Friendly",   sole: "✗ No",          opc: "◑ Limited",      pvt: "✓ Yes" },
  { feature: "Annual Filing",       sole: "ITR Only",      opc: "ROC + ITR",      pvt: "ROC + ITR + Audit" },
  { feature: "Suitable For",        sole: "Very Small Biz",opc: "Solo Founders",  pvt: "Startups & SMEs" },
];

const decisionCards = [
  { label: "I'm just starting", sub: "Small scale, minimal compliance", rec: "sole", badge: "Sole Proprietorship" },
  { label: "I want legal protection", sub: "Solo ownership with corporate benefits", rec: "opc", badge: "One Person Company" },
  { label: "I'll raise investment", sub: "Scale, team & funding in mind", rec: "pvt", badge: "Private Limited" },
];

const eligibility = [
  { n: "01", title: "Indian Citizen",                desc: "Only Indian citizens can incorporate an OPC." },
  { n: "02", title: "Resident in India",             desc: "Must have stayed in India for ≥182 days in the preceding calendar year." },
  { n: "03", title: "One Shareholder",               desc: "Only one natural person can be the sole member of the OPC." },
  { n: "04", title: "One Nominee Required",          desc: "A nominee (Indian citizen & resident) must be named who takes over in case of death/incapacity." },
  { n: "05", title: "Natural Person Only",           desc: "Neither a body corporate nor any other legal entity can be the single member." },
  { n: "06", title: "Single OPC Limit",              desc: "A person cannot incorporate more than one OPC at a time." },
];

const identityDocs = [
  { icon: CreditCard,  label: "PAN Card" },
  { icon: Fingerprint, label: "Aadhaar Card" },
  { icon: FileText,    label: "Passport Size Photograph" },
  { icon: Hash,        label: "Email Address" },
  { icon: Phone,       label: "Mobile Number" },
  { icon: Banknote,    label: "Address Proof (Bank Statement / Utility Bill)" },
];

const officeDocs = [
  { icon: Zap,      label: "Electricity Bill" },
  { icon: PenLine,  label: "NOC from Property Owner" },
  { icon: FileText, label: "Rent Agreement (if rented)" },
  { icon: Receipt,  label: "Property Tax Receipt" },
];

const nomineeDocs = [
  { icon: CreditCard,  label: "Nominee PAN Card" },
  { icon: Fingerprint, label: "Nominee Aadhaar Card" },
  { icon: FileText,    label: "Nominee Address Proof" },
  { icon: Hash,        label: "Nominee Email & Phone" },
];

const registrationSteps = [
  { n: "01", title: "Free Consultation",      desc: "Understand your business and recommend the right structure." },
  { n: "02", title: "DSC Issuance",           desc: "Issue a Digital Signature Certificate for the director." },
  { n: "03", title: "DIN Application",        desc: "Apply for a Director Identification Number via MCA portal." },
  { n: "04", title: "Name Approval",          desc: "Reserve your company name through the RUN service on MCA." },
  { n: "05", title: "SPICe+ Filing",          desc: "Prepare and submit the OPC incorporation form with MCA." },
  { n: "06", title: "Certificate of Incorporation", desc: "Receive the official Certificate of Incorporation with CIN." },
  { n: "07", title: "PAN & TAN Generation",   desc: "PAN and TAN are auto-allotted at the time of incorporation." },
];

const timelineStages = [
  { label: "Documentation",       time: "Day 1" },
  { label: "DSC & DIN",           time: "Day 2–3" },
  { label: "Name Approval",       time: "Day 3–5" },
  { label: "Government Filing",   time: "Day 5–7" },
  { label: "Certificate Issued",  time: "Day 7–10" },
];

const deliverables = [
  { icon: BadgeCheck, label: "Certificate of Incorporation", color: "text-primary bg-primary/8" },
  { icon: CreditCard, label: "PAN",                          color: "text-blue-600 bg-blue-50" },
  { icon: Hash,       label: "TAN",                          color: "text-purple-600 bg-purple-50" },
  { icon: Hash,       label: "CIN",                          color: "text-green-600 bg-green-50" },
  { icon: PenLine,    label: "DSC",                          color: "text-orange-600 bg-orange-50" },
  { icon: FileText,   label: "MOA & AOA",                    color: "text-teal-600 bg-teal-50" },
  { icon: FileText,   label: "Digital Incorporation Docs",   color: "text-rose-600 bg-rose-50" },
];

const postCompliance = [
  { icon: BookOpen,     title: "Maintain Books of Accounts",     desc: "Proper books must be maintained from the date of incorporation." },
  { icon: CalendarCheck,title: "Annual Financial Statements",    desc: "Prepare and file audited financials with MCA every year." },
  { icon: Receipt,      title: "Income Tax Return",              desc: "File ITR annually regardless of income." },
  { icon: FileText,     title: "ROC Annual Filing",              desc: "File AOC-4 and MGT-7 with MCA within due dates." },
  { icon: Scale,        title: "Statutory Audit",                desc: "Annual audit by a Chartered Accountant is mandatory." },
  { icon: Users,        title: "Board Meeting Compliance",       desc: "Hold at least one board meeting every 6 months." },
];

const commonMistakes = [
  { title: "Choosing OPC despite planning fundraising",     desc: "OPC cannot issue shares to investors. Switch to Pvt. Ltd. before seeking equity funding." },
  { title: "Using residential address without NOC",         desc: "Registered office needs an NOC from the property owner even for residential addresses." },
  { title: "Selecting unsuitable business activity",        desc: "Activities like banking, insurance & NBFC cannot be conducted under OPC." },
  { title: "Ignoring annual compliance",                    desc: "Late ROC filings attract ₹100/day penalty — set up compliance reminders from Day 1." },
  { title: "Choosing the wrong nominee",                    desc: "Nominee must be an Indian citizen and resident. Verify eligibility before filing." },
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
  { q: "What is a One Person Company (OPC)?", a: "An OPC is a company incorporated under the Companies Act, 2013 with only one member who is also typically the director. It combines the benefits of a Private Limited Company — such as limited liability and separate legal identity — with the simplicity of sole ownership." },
  { q: "Who can register an OPC?", a: "Only Indian citizens who are residents of India (stayed ≥182 days in India in the preceding calendar year) can incorporate an OPC. Foreign nationals and NRIs are not eligible." },
  { q: "Can NRIs register an OPC?", a: "No. NRIs and foreign nationals are not eligible to incorporate an OPC. If you are an NRI, a Private Limited Company would be the appropriate structure." },
  { q: "Can an OPC have employees?", a: "Yes. An OPC can hire employees. The single member owns the company, but the company can employ any number of staff under proper employment contracts." },
  { q: "Is GST mandatory for an OPC?", a: "GST registration is required only if annual turnover exceeds ₹40 lakhs (goods) or ₹20 lakhs (services), or if you supply goods/services inter-state. We advise based on your specific business plan." },
  { q: "Can an OPC raise funding?", a: "An OPC cannot issue equity shares to investors. If you plan to raise angel or VC funding, conversion to a Private Limited Company is required before seeking investment." },
  { q: "Can an OPC convert into a Private Limited Company?", a: "Yes. An OPC can be converted into a Private Limited Company voluntarily or mandatorily (when paid-up capital exceeds ₹50 lakhs or average annual turnover exceeds ₹2 crore for 3 consecutive years). We handle the full conversion process." },
  { q: "What is the role of a nominee in an OPC?", a: "A nominee is an Indian citizen and resident named in the MOA. In the event of the member's death or incapacity, the nominee takes over the OPC, ensuring business continuity. The nominee must give written consent at the time of incorporation." },
  { q: "How many directors are required for an OPC?", a: "A minimum of 1 director is required. The sole member can also be the sole director. A maximum of 15 directors can be appointed." },
  { q: "Can an OPC own property?", a: "Yes. As a separate legal entity, an OPC can own movable and immovable property in its own name, independent of the member." },
  { q: "What are the annual compliance requirements?", a: "OPCs must file AOC-4 (financial statements), MGT-7A (annual return), Income Tax Return, and maintain books of accounts. A statutory audit by a CA is mandatory. Board meetings must be held at least twice a year." },
  { q: "Can OPC have turnover above ₹2 crore?", a: "If an OPC's average annual turnover exceeds ₹2 crore for 3 consecutive financial years, or paid-up capital exceeds ₹50 lakhs, it must mandatorily convert to a Private Limited Company." },
  { q: "How much does OPC registration cost?", a: "Our OPC registration package starts from ₹4,999 inclusive of government fees, DSC, DIN, name filing, incorporation and PAN/TAN. The final quote depends on your state of registration. We provide a full cost breakdown upfront." },
  { q: "How long does OPC registration take?", a: "Typically 7–10 working days from the time all documents are submitted and verified. DSC issuance, name approval and MCA processing are the key steps determining the timeline." },
  { q: "Can I register an OPC completely online?", a: "Yes, 100% online. Document collection, DSC, DIN, name reservation, SPICe+ filing, and certificate delivery are all handled digitally through our secure platform. No government office visit is required." },
];

const relatedServices = [
  { id: "private-limited-company", title: "Private Limited Company", desc: "Scale your business with equity & investment." },
  { id: "gst-registration",         title: "GST Registration",         desc: "Obtain GSTIN for your new OPC." },
  { id: "trademark-registration",   title: "Trademark Registration",   desc: "Protect your brand name and logo." },
];

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
        <p className="font-heading font-bold text-dark text-base mb-1">Need Expert Assistance?</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Talk to our CAs before choosing your business structure.</p>
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

      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Download size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Document Checklist</p>
        </div>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">Download the complete OPC registration checklist as PDF.</p>
        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
          <Download size={13} /> Download PDF
        </button>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "7–10", l: "Day Timeline" }, { v: "1000+", l: "OPCs Formed" }, { v: "15+", l: "Years Exp." }, { v: "100%", l: "Online" }].map(s => (
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
export function OPCPage() {
  const [activeDecision, setActiveDecision] = useState<string | null>(null);

  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="opc-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#opc-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>

        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">One Person Company</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">MCA Registered Business Incorporation Experts</span>
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                One Person Company<br />
                <span className="text-primary">(OPC) Registration in India</span>
              </motion.h1>

              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Start your business with limited liability while remaining the sole owner. Register an OPC online with complete MCA compliance, expert CA guidance, and end-to-end documentation support.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Register Your OPC <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to an Expert
                </a>
              </motion.div>

              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["MCA Filing Experts", "End-to-End Documentation", "Dedicated CA Support", "PAN & TAN Included"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — glass card */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">OPC at a Glance</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Active
                  </span>
                </div>
                <div className="space-y-2.5">
                  {heroGlance.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div key={item.label}
                        initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.4 + i * 0.07 }}
                        className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center">
                            <Icon size={13} className="text-primary" />
                          </div>
                          <span className="text-xs text-muted">{item.label}</span>
                        </div>
                        <span className="text-xs font-heading font-semibold text-dark">{item.value}</span>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-5 flex items-center justify-between bg-primary/5 rounded-xl p-3">
                  <div>
                    <p className="text-xs text-muted">Starting from</p>
                    <p className="font-heading font-bold text-primary text-xl">₹4,999</p>
                  </div>
                  <Link href="/contact"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickFacts.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.label} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="bg-white border border-slate-100 rounded-2xl p-5 text-center hover:shadow-card hover:border-primary/10 transition-all duration-300 group"
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

      {/* ── WHAT IS OPC ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is a One Person Company?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                A <strong>One Person Company (OPC)</strong> is a company structure introduced under the <strong>Companies Act, 2013</strong> that allows a single entrepreneur to incorporate a company with all the benefits of a Private Limited Company — while retaining 100% ownership and control.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Unlike a sole proprietorship, an OPC provides <strong>limited liability protection</strong>, a <strong>separate legal identity</strong>, better credibility with banks and clients, and business continuity through a mandatory nominee.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Separate Legal Entity", "Limited Liability", "Greater Credibility", "Easier Business Expansion"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                <Image
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=85"
                  alt="Solo entrepreneur managing a business"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">100%</p>
                <p className="text-white/60 text-xs">Single Ownership</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD CHOOSE OPC ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Ideal For" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Should Choose an OPC?</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {whoShouldChoose.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all duration-300 text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-3 mx-auto transition-colors duration-300">
                    <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-heading font-semibold text-dark text-xs mb-1">{item.title}</p>
                  <p className="text-muted text-[11px] leading-relaxed">{item.desc}</p>
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
            <Eyebrow label="Benefits" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Why Register as an OPC?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="group border border-slate-100 rounded-2xl p-6 hover:shadow-card hover:border-primary/15 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                    <Icon size={20} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-base mb-2">{b.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Business Structure Comparison" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">
              OPC vs Sole Proprietorship vs Private Limited
            </h2>
            <p className="text-muted text-base max-w-xl mx-auto">
              Choose the right structure based on your ownership goals, compliance appetite and growth plans.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-card mb-10">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left px-5 py-4 font-heading font-semibold text-sm">Feature</th>
                  <th className="px-5 py-4 font-heading font-semibold text-sm text-center">Sole Proprietorship</th>
                  <th className="px-5 py-4 font-heading font-semibold text-sm text-center bg-accent/20">
                    <span className="flex items-center justify-center gap-1.5">
                      <User size={13} /> One Person Company
                    </span>
                  </th>
                  <th className="px-5 py-4 font-heading font-semibold text-sm text-center">Private Limited</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature}
                    className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-primary/3 transition-colors`}
                  >
                    <td className="px-5 py-3.5 text-dark text-sm font-medium">{row.feature}</td>
                    <td className="px-5 py-3.5 text-muted text-sm text-center">{row.sole}</td>
                    <td className="px-5 py-3.5 text-sm text-center font-heading font-semibold text-primary bg-amber-50/40">{row.opc}</td>
                    <td className="px-5 py-3.5 text-muted text-sm text-center">{row.pvt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Decision cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {decisionCards.map((card) => (
              <motion.button key={card.rec} onClick={() => setActiveDecision(activeDecision === card.rec ? null : card.rec)}
                whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}
                className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                  activeDecision === card.rec
                    ? "border-primary bg-primary text-white shadow-lg"
                    : "border-slate-200 bg-white hover:border-primary/30 hover:shadow-card"
                }`}
              >
                <p className={`font-heading font-bold text-base mb-1 ${activeDecision === card.rec ? "text-white" : "text-dark"}`}>{card.label}</p>
                <p className={`text-xs mb-3 ${activeDecision === card.rec ? "text-white/70" : "text-muted"}`}>{card.sub}</p>
                <span className={`inline-flex items-center gap-1.5 text-xs font-heading font-semibold px-3 py-1 rounded-full ${
                  activeDecision === card.rec ? "bg-white/20 text-white" : "bg-primary/8 text-primary"
                }`}>
                  <ArrowRight size={11} /> {card.badge}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NOT SOLE PROPRIETORSHIP ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="OPC vs Proprietorship" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Why Not Just Use a Sole Proprietorship?</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertTriangle size={16} className="text-red-500" />
                </div>
                <h3 className="font-heading font-bold text-dark text-lg">Sole Proprietorship Problems</h3>
              </div>
              <div className="space-y-3">
                {["Unlimited liability — personal assets at risk", "No separate legal identity", "Lower credibility with banks and clients", "Difficult to access business loans", "Business ends with the owner's death"].map(pt => (
                  <div key={pt} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Minus size={10} className="text-red-500" />
                    </div>
                    <span className="text-dark text-sm">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <h3 className="font-heading font-bold text-dark text-lg">OPC Advantages</h3>
              </div>
              <div className="space-y-3">
                {["Limited liability — personal assets protected", "Company status — separate legal entity", "Higher credibility with banks and clients", "Better access to business financing", "Perpetual succession via nominee"].map(pt => (
                  <div key={pt} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle size={10} className="text-green-600" />
                    </div>
                    <span className="text-dark text-sm">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY ── */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Eligibility" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Can Register an OPC?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {eligibility.map((e, i) => (
              <motion.div key={e.n} custom={i} variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true, margin: "-40px" }}
                className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-card transition-all duration-300"
              >
                <span className="inline-block font-heading font-bold text-3xl text-primary/15 mb-3 leading-none">{e.n}</span>
                <h3 className="font-heading font-bold text-dark text-base mb-2">{e.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TWO-COLUMN: MAIN CONTENT + STICKY SIDEBAR ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">

          {/* ── MAIN CONTENT ── */}
          <div className="space-y-24 min-w-0">

            {/* DOCUMENT CHECKLIST */}
            <section>
              <Eyebrow label="Documents Required" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">OPC Registration Document Checklist</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Identity & Address Proof", docs: identityDocs, color: "bg-blue-50 border-blue-100", iconBg: "bg-blue-100 text-blue-600" },
                  { title: "Registered Office Docs", docs: officeDocs, color: "bg-green-50 border-green-100", iconBg: "bg-green-100 text-green-600" },
                  { title: "Nominee Documents", docs: nomineeDocs, color: "bg-purple-50 border-purple-100", iconBg: "bg-purple-100 text-purple-600" },
                ].map((group) => (
                  <div key={group.title} className={`border rounded-2xl p-5 ${group.color}`}>
                    <p className="font-heading font-bold text-dark text-sm mb-4">{group.title}</p>
                    <div className="space-y-2.5">
                      {group.docs.map((doc) => {
                        const Icon = doc.icon;
                        return (
                          <motion.div key={doc.label} whileHover={{ x: 4 }}
                            className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-white/80 cursor-default"
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
                  <Download size={14} /> Download OPC Document Checklist
                </button>
              </div>
            </section>

            {/* REGISTRATION PROCESS */}
            <section>
              <Eyebrow label="Registration Process" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">How to Register an OPC — Step by Step</h2>
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

            {/* TIMELINE */}
            <section>
              <Eyebrow label="Estimated Timeline" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Your OPC Registration Timeline</h2>
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
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Government Deliverables After OPC Registration</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
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

            {/* POST COMPLIANCE */}
            <section>
              <Eyebrow label="Post Registration" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-3">Post Registration Compliance</h2>
              <p className="text-muted text-sm mb-8">Compliance ensures your OPC remains legally active and avoids MCA penalties.</p>
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

            {/* OPC TO PVT LTD CONVERSION */}
            <section>
              <div className="bg-primary rounded-3xl p-8 md:p-10 overflow-hidden relative">
                <div className="absolute inset-0 opacity-5">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs><pattern id="cvt-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1.5" fill="white" />
                    </pattern></defs>
                    <rect width="100%" height="100%" fill="url(#cvt-dots)" />
                  </svg>
                </div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <Eyebrow label="Growth Path" />
                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4 leading-tight">
                      OPC to Private Limited Company Conversion
                    </h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      Businesses often begin as OPCs and later convert into Private Limited Companies as they expand, hire co-founders, or seek equity investment. Conversion is mandatory when paid-up capital exceeds ₹50 lakhs or average turnover exceeds ₹2 crore for 3 years.
                    </p>
                    <Link href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-dark font-heading font-semibold text-sm rounded-xl hover:bg-accent-light transition-colors"
                    >
                      Planning to scale? Talk to our advisors <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    {[
                      { icon: TrendingUp, label: "Business Idea" },
                      { icon: User,       label: "Register as OPC" },
                      { icon: TrendingUp, label: "Business Grows" },
                      { icon: Building2,  label: "Convert to Pvt. Ltd." },
                    ].map((step, i) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.label} className="flex flex-col items-center">
                          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-5 py-3 w-52 text-center">
                            <Icon size={14} className="text-accent shrink-0" />
                            <span className="text-white text-sm font-heading font-semibold">{step.label}</span>
                          </div>
                          {i < 3 && <ArrowDown size={16} className="text-white/40 my-1" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* COMMON MISTAKES */}
            <section>
              <Eyebrow label="Common Mistakes" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Avoid These OPC Registration Mistakes</h2>
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
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">Why Choose Company Avenue?</h2>
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
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { v: "1000+", l: "Businesses Registered", c: "bg-primary text-white" },
                      { v: "98%",   l: "Client Satisfaction",   c: "bg-accent text-dark" },
                      { v: "15+",   l: "Years Experience",      c: "bg-slate-800 text-white" },
                      { v: "24 hrs",l: "Response Time",         c: "bg-green-600 text-white" },
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
              </div>
            </section>

            {/* DOWNLOAD CENTER */}
            <section>
              <Eyebrow label="Download Center" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-8">Free Resources for OPC Registration</h2>
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-7 shadow-card grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: "OPC Registration Checklist", sub: "Complete document list as PDF", icon: FileText, color: "bg-blue-50 text-blue-600" },
                  { title: "Annual Compliance Calendar", sub: "Filing deadlines for OPCs",    icon: CalendarCheck, color: "bg-green-50 text-green-600" },
                  { title: "Business Structure Guide",   sub: "OPC vs Pvt Ltd vs LLP comparison", icon: Scale, color: "bg-purple-50 text-purple-600" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title}
                      className="border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all group cursor-pointer"
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {relatedServices.map((s, i) => (
              <motion.div key={s.id} custom={i} variants={fadeUp} initial="hidden"
                whileInView="show" viewport={{ once: true }}
              >
                <Link href={`/services/${s.id}`}
                  className="group block bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all duration-300"
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
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Get Started Today" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Start Your Business with the<br />Protection of a Company
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you&apos;re a freelancer, consultant, or first-time entrepreneur, an OPC offers the perfect balance between ownership, legal protection, and credibility. Let Company Avenue handle the paperwork while you focus on building your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-accent-light transition-colors shadow-glow-accent"
              >
                Register Your OPC Today <ArrowRight size={15} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Book Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
