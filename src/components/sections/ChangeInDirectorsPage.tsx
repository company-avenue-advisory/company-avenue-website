"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, MessageCircle,
  Users, ShieldCheck, TrendingUp, Award, Zap, Clock, FileText,
  Building2, Globe, UserCheck, BadgeCheck, Download, Star,
  Layers, Briefcase, ChevronRight, AlertCircle, CreditCard,
  Receipt, Landmark, Banknote, Fingerprint, RefreshCcw,
  UserPlus, UserMinus, BookOpen, Scale, Gavel, PenLine,
  ClipboardList, ArrowLeftRight, DollarSign, KeyRound, HeartHandshake,
  CircleAlert, CheckSquare, Target, Lightbulb, BarChart3, GitBranch,
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

const heroFacts = [
  { value: "DIR-12 + PAS-3 + SH-4", label: "Key Forms" },
  { value: "7–10 Days", label: "Timeline" },
  { value: "MCA", label: "Authority" },
  { value: "Required", label: "Board Meeting" },
  { value: "Applicable", label: "Stamp Duty" },
  { value: "Board Resolution Date", label: "Effective From" },
];

const whoNeeds = [
  { icon: UserPlus, title: "New Investor Directors", desc: "Companies bringing new investor-nominated directors onto their board after a funding round." },
  { icon: Zap, title: "Post-Funding Startups", desc: "Startups allotting new equity shares to angels, VCs, or series investors after closing a round." },
  { icon: UserMinus, title: "Director Exits", desc: "Companies removing resigned, retired, or disqualified directors to maintain clean MCA records." },
  { icon: Award, title: "ESOP Allotment", desc: "Companies issuing Employee Stock Option Plan shares to eligible employees after option exercise." },
  { icon: AlertCircle, title: "Death or Disqualification", desc: "Companies handling director vacancy due to death, insolvency, or Section 164 disqualification." },
  { icon: ArrowLeftRight, title: "Share Buyback", desc: "Companies repurchasing their own shares from existing shareholders to return capital." },
  { icon: RefreshCcw, title: "Debt-to-Equity Conversion", desc: "Companies converting outstanding debt instruments or CCDs into equity shares for lenders." },
  { icon: HeartHandshake, title: "Family Succession", desc: "Family businesses transferring shares via inheritance, gift, or succession planning arrangements." },
];

const benefits = [
  { icon: CheckSquare, title: "Legal MCA Ownership Transfer", desc: "DIR-12 and SH-4 filings ensure share ownership is legally updated on MCA records.", color: "bg-primary/8 text-primary" },
  { icon: ShieldCheck, title: "Corporate Governance Compliance", desc: "Maintain full RoC compliance by keeping director and shareholder records current.", color: "bg-blue-50 text-blue-600" },
  { icon: Globe, title: "Accurate MCA Public Records", desc: "Reflect correct ownership structure on publicly accessible MCA Master Data.", color: "bg-teal-50 text-teal-600" },
  { icon: Landmark, title: "Bank Record Update", desc: "New shareholders can update their bank mandate and receive dividend / interest payments correctly.", color: "bg-green-50 text-green-600" },
  { icon: BarChart3, title: "Cap Table Accuracy", desc: "An accurate cap table reflecting post-filing ownership builds investor trust and fundraising credibility.", color: "bg-amber-50 text-amber-600" },
  { icon: UserMinus, title: "Outgoing Director Protection", desc: "Formal DIR-12 filing protects the outgoing director from liability for post-resignation decisions.", color: "bg-purple-50 text-purple-600" },
  { icon: TrendingUp, title: "Future Fundraising Ready", desc: "Clean governance records are a prerequisite for due diligence in future funding rounds.", color: "bg-rose-50 text-rose-600" },
  { icon: Scale, title: "Regulatory Protection", desc: "Timely filings protect company and all officers from MCA penalties and adjudication orders.", color: "bg-indigo-50 text-indigo-600" },
];

const processSteps = [
  { n: "01", icon: Gavel, title: "Board Resolution for Change", desc: "Pass board resolution approving director appointment/removal or share allotment/transfer. Maintain signed minutes of meeting." },
  { n: "02", icon: FileText, title: "File DIR-12 within 30 Days", desc: "File e-Form DIR-12 on MCA portal within 30 days of board resolution. Attach signed resolution, consent, and resignation/appointment documents." },
  { n: "03", icon: UserCheck, title: "Obtain DIN for New Director", desc: "If the incoming director doesn't have a Director Identification Number, apply for DIN via SPICe+ or DIR-3 form before DIR-12 filing." },
  { n: "04", icon: PenLine, title: "Share Transfer Deed / Allotment Letter", desc: "For share changes: prepare SH-4 (Transfer Form) for transfer or allotment letter for fresh issuance. Pay stamp duty on transfer." },
  { n: "05", icon: ClipboardList, title: "File PAS-3 or SH-4 with MCA", desc: "File PAS-3 (Return of Allotment) within 30 days of allotment, or SH-4 (Transfer Form) for share transfer — with ROC fees as applicable." },
  { n: "06", icon: BookOpen, title: "Update Register of Members & Directors", desc: "Update the company's statutory registers — Register of Directors (Section 170) and Register of Members (Section 88) — with new details." },
  { n: "07", icon: RefreshCcw, title: "MCA Master Data Update", desc: "Verify that MCA Master Data for the company reflects updated directors and shareholding. Download updated Certificate of Incorporation (CoI) if required." },
  { n: "08", icon: BadgeCheck, title: "Revised COI if Applicable", desc: "If company name or registered office changed simultaneously, obtain revised COI. Otherwise, MCA auto-updates director/shareholder details on the master record." },
];

const requiredDocs = [
  "Board/EGM resolution (signed + dated)",
  "New director's DIN + PAN + Aadhaar copy",
  "Share transfer deed — Form SH-4",
  "Stamp duty payment receipt (state-specific)",
  "DIR-2: Consent to act as director",
  "Resignation letter (for outgoing director)",
  "Allotment letter (for new share issuance)",
  "Share certificate (existing holder)",
  "Memorandum and Articles of Association",
  "Certificate of Incorporation",
  "List of existing directors with DINs",
  "Address proof of new director",
];

const timelineStages = [
  { n: "01", label: "Board Resolution", sub: "Day 0", color: "bg-primary text-white", connector: true },
  { n: "02", label: "DIR-12 Filing", sub: "Within 30 Days", color: "bg-blue-600 text-white", connector: true },
  { n: "03", label: "DIN Verification", sub: "Concurrent", color: "bg-teal-600 text-white", connector: true },
  { n: "04", label: "Share Transfer / Allotment", sub: "As Applicable", color: "bg-amber-500 text-white", connector: true },
  { n: "05", label: "PAS-3 / SH-4 Filing", sub: "Within 30 Days", color: "bg-purple-600 text-white", connector: true },
  { n: "06", label: "MCA Update", sub: "7–10 Working Days", color: "bg-green-600 text-white", connector: false },
];

const deliverables = [
  "Filed DIR-12 with MCA SRN acknowledgment",
  "Filed PAS-3 (allotment) or SH-4 (share transfer) acknowledgment",
  "Updated MCA master data — directors and shareholders",
  "Updated Register of Members (Section 88)",
  "Updated Register of Directors (Section 170)",
  "Certified copy of board/EGM resolution",
  "Share certificate (new) for allottee / transferee",
  "MCA filing receipts for all submitted forms",
];

const whyUsPoints = [
  { icon: Award, title: "MCA Compliance Specialists", desc: "1,500+ director changes and share transfers handled across Pvt. Ltd., OPC, and Section 8 companies." },
  { icon: Clock, title: "DIR-12 Filed Within Deadline", desc: "We ensure DIR-12 is filed well within the 30-day window — never miss the deadline, never pay late fees." },
  { icon: Scale, title: "End-to-End Share Transfer", desc: "Complete SH-4 drafting, stamp duty guidance (state-specific), and MCA filing included in our service." },
  { icon: UserCheck, title: "DIN Acquisition Support", desc: "We help new directors obtain DIN through DIR-3/SPICe+ before DIR-12 filing — no bottlenecks." },
  { icon: FileText, title: "Document Preparation", desc: "Board resolutions, DIR-2 consents, resignation letters, and allotment letters drafted professionally." },
  { icon: ShieldCheck, title: "Zero Penalty Track Record", desc: "Timely filings mean no ₹500/day late fees. Our process ensures every deadline is met without exception." },
  { icon: TrendingUp, title: "Cap Table Advisory", desc: "Post-filing, we help you maintain an accurate cap table for investor reporting and future fundraising." },
  { icon: Globe, title: "Nationwide MCA Filing", desc: "We file with ROC offices across all states — Maharashtra, Delhi, Karnataka, Tamil Nadu, and more." },
];

const faqs = [
  {
    q: "What is the timeline for filing DIR-12 after board resolution?",
    a: "DIR-12 must be filed with the MCA within 30 days of the board resolution appointing or removing a director. If a new director is appointed, the filing clock starts from the date of the board resolution, not the date of consent. Filing beyond 30 days attracts a late fee of ₹500 per day for each day of default.",
  },
  {
    q: "What is the penalty for delayed DIR-12 filing?",
    a: "The penalty for late DIR-12 filing is ₹500 per day for each day of default, payable by the company and every officer in default. Under the Companies (Amendment) Act, 2019, the MCA also adjudicates officers for non-compliance. Prompt filing eliminates all additional costs.",
  },
  {
    q: "What documents are needed for appointing a new director?",
    a: "Key documents include: valid DIN (or proof of DIN application), PAN card, Aadhaar card, DIR-2 (Consent to Act as Director — signed and notarized), residential proof not older than 2 months, and a declaration that the director is not disqualified under Section 164 of the Companies Act, 2013.",
  },
  {
    q: "Can a foreign national become a director of an Indian company?",
    a: "Yes, foreign nationals can be appointed as directors of Indian private limited companies. They must obtain a Director Identification Number (DIN). Aadhaar is not required for foreign directors. Documents such as passport (apostilled or notarized) and proof of address are submitted. At least one director must be an Indian resident (person who has stayed in India for at least 182 days in the previous calendar year).",
  },
  {
    q: "What is the minimum director requirement for a Pvt. Ltd. company?",
    a: "A Private Limited Company must have a minimum of 2 directors and a maximum of 15 directors at all times. At least 1 director must be a resident director — i.e., a person who has stayed in India for a total of at least 182 days during the previous calendar year. If a company falls below 2 directors, it must appoint a new director immediately.",
  },
  {
    q: "What is the process for removing a director?",
    a: "A director cannot be removed by the board alone. The process under Section 169 requires: (1) Special notice of 14 days to the company from a shareholder proposing removal, (2) the company gives a copy to the director being removed, (3) the director may make written representation, (4) an ordinary resolution is passed at the general meeting. DIR-12 is then filed within 30 days of the resolution.",
  },
  {
    q: "What is the stamp duty on share transfer?",
    a: "Stamp duty on share transfer varies by state. At the central level under the Indian Stamp Act as amended in 2020, the rate is 0.015% of the consideration value for demat shares. For physical shares, the rate is typically 0.25% of the consideration. Maharashtra, Delhi, and other states may have slightly different rules. Stamp duty must be paid on the Share Transfer Deed (SH-4) before filing.",
  },
  {
    q: "How does ESOP allotment work under PAS-3?",
    a: "When employees exercise ESOP options: (1) the board approves an ESOP scheme at a general meeting; (2) employees vest and exercise their options; (3) the board passes an allotment resolution for each exercise; (4) PAS-3 (Return of Allotment) is filed with MCA within 30 days of each allotment board resolution. The form includes allottee details, number of shares, and face/premium value.",
  },
  {
    q: "What is Form PAS-3?",
    a: "Form PAS-3 is the Return of Allotment of Securities, filed under Section 39(4) of the Companies Act, 2013. It must be filed within 30 days of any allotment of shares or other securities. It includes details of allottees, class of shares, face value, premium, and consideration. Late filing attracts additional fees up to 12 times the normal ROC fee.",
  },
  {
    q: "What shareholder approval is needed for share allotment?",
    a: "It depends on the type of allotment: (1) Preferential allotment to specific persons requires a special resolution at an Extra-ordinary General Meeting (EGM) — requires 75% shareholder approval; (2) Rights Issue to existing shareholders in proportion to their holding needs only a board resolution; (3) ESOP allotment requires shareholder approval for the ESOP scheme, though individual allotments are by board resolution. Bonus shares also need shareholder approval.",
  },
];

const relatedServices = [
  { id: "roc-compliance", title: "ROC Annual Compliance", desc: "Annual returns, financial statements, and MCA filings." },
  { id: "director-kyc", title: "Director KYC (DIR-3 KYC)", desc: "Annual DIN KYC filing to keep director status active." },
  { id: "increase-authorised-capital", title: "Increase Authorised Capital", desc: "File SH-7 to raise your company's authorised share capital." },
  { id: "company-closure", title: "Company Closure (Strike Off)", desc: "Formal MCA strike-off and winding up of company." },
  { id: "registered-office-change", title: "Registered Office Change", desc: "Update and file new registered office address with MCA." },
  { id: "llp-annual-filing", title: "LLP Annual Filing", desc: "Form 8 and Form 11 annual compliance for LLPs." },
];

/* ══════════ STICKY SIDEBAR ══════════ */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">Change in Directors / Shareholders</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">DIR-12, PAS-3, SH-4 filing with MCA. Starting at ₹4,999.</p>
        <div className="space-y-2 mb-5">
          {["DIR-12 Filing (Director Change)", "PAS-3 / SH-4 (Share Change)", "Board Resolution Drafting", "Register Updates", "MCA Compliance"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Link href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          ><ArrowRight size={13} /> Get Started</Link>
          <a href="tel:+919953719111"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          ><Phone size={13} /> Call an Expert</a>
          <a href="https://wa.me/919953719111" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          ><MessageCircle size={13} /> WhatsApp</a>
        </div>
      </div>

      {/* Quick facts */}
      <div className="bg-primary rounded-2xl p-5 text-white">
        <p className="font-heading font-bold text-sm mb-4">Key Compliance Facts</p>
        <div className="space-y-3">
          {[
            { label: "DIR-12 Deadline", value: "30 Days" },
            { label: "Late Fee", value: "₹500/day" },
            { label: "PAS-3 Deadline", value: "30 Days" },
            { label: "Min. Directors (Pvt. Ltd.)", value: "2 Directors" },
            { label: "Resident Director", value: "182 Days/Year" },
            { label: "Authority", value: "MCA (ROC)" },
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
            { href: "#what-is", label: "What is Director Change?" },
            { href: "#who-needs", label: "Who Needs This?" },
            { href: "#benefits", label: "Key Benefits" },
            { href: "#process", label: "Filing Process" },
            { href: "#documents", label: "Documents Required" },
            { href: "#timeline", label: "Timeline" },
            { href: "#deliverables", label: "What You Receive" },
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
          {[{ v: "1500+", l: "Changes Filed" }, { v: "7 Days", l: "Avg. Completion" }, { v: "0%", l: "Penalty Rate" }, { v: "₹4,999", l: "Starting Price" }].map(s => (
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
export function ChangeInDirectorsPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dir-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#dir-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-dark">Change in Directors / Shareholders</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">MCA Compliance Experts • DIR-12 • PAS-3 • SH-4</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Change in Directors<br /><span className="text-primary">or Shareholders</span><br />
                <span className="text-2xl md:text-3xl text-muted font-medium">DIR-12 · PAS-3 · SH-4</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Appoint or remove directors, transfer shares, or allot new equity — fully compliant DIR-12, PAS-3, and SH-4 filings with MCA, handled end-to-end.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Start Filing Now <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to an Expert
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["MCA Authorized Filing", "30-Day Deadline Guaranteed", "Zero Penalty Record", "Nationwide Service"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Floating Card Visual */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              <div className="relative max-w-md mx-auto">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] overflow-hidden">
                  <div className="bg-primary px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <Users size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-xs">Director & Shareholder Change</p>
                        <p className="text-white/50 text-[10px]">Ministry of Corporate Affairs (MCA)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-heading font-semibold bg-green-500/20 text-green-300 border border-green-400/30 px-2.5 py-1 rounded-full">● MCA Portal</span>
                  </div>
                  <div className="p-5 space-y-3">
                    {[
                      { icon: FileText, label: "Form DIR-12", sub: "Director Appointment / Resignation", status: "Filed within 30 days", color: "text-blue-600 bg-blue-50" },
                      { icon: BarChart3, label: "Form PAS-3", sub: "Return of Allotment", status: "Filed within 30 days", color: "text-teal-600 bg-teal-50" },
                      { icon: ArrowLeftRight, label: "Form SH-4", sub: "Share Transfer Deed", status: "On share transfer", color: "text-purple-600 bg-purple-50" },
                    ].map(form => (
                      <div key={form.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${form.color}`}>
                          <form.icon size={15} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-heading font-semibold text-dark text-xs">{form.label}</p>
                          <p className="text-muted text-[10px] truncate">{form.sub}</p>
                        </div>
                        <span className="text-[10px] font-heading font-semibold text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full shrink-0">{form.status}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <p className="text-muted text-[10px]">Starting At</p>
                      <p className="font-heading font-bold text-primary text-sm">₹4,999</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted text-[10px]">Processing</p>
                      <p className="font-heading font-bold text-green-600 text-xs">7–10 Days ✓</p>
                    </div>
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-5 top-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">DIR-12 Deadline</p>
                  <p className="font-heading font-bold text-primary text-sm">30 Days</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -left-5 bottom-12 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Late Penalty</p>
                  <p className="font-heading font-bold text-rose-600 text-sm">₹500/day</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Hero 6 fact cards */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-16"
          >
            {heroFacts.map(s => (
              <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center hover:border-primary/20 hover:bg-primary/[0.02] transition-colors">
                <p className="font-heading font-bold text-primary text-sm leading-snug mb-1">{s.value}</p>
                <p className="text-muted text-[10px]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ MAIN CONTENT + STICKY SIDEBAR ══ */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* ── WHAT IS DIRECTOR / SHAREHOLDER CHANGE ── */}
            <section id="what-is">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Overview" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  What is Change in Directors / Shareholders?
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center">
                <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-4">
                  <p className="text-muted text-base leading-relaxed">
                    Under the <strong className="text-dark">Companies Act, 2013</strong>, every change in the board of directors or the shareholding structure of a company must be formally intimated to the <strong className="text-dark">Ministry of Corporate Affairs (MCA)</strong> through prescribed e-forms filed on the MCA portal.
                  </p>
                  <p className="text-muted text-base leading-relaxed">
                    A <strong className="text-dark">Change in Directors</strong> is reported via <strong className="text-dark">Form DIR-12</strong>, which covers both appointments and resignations. Any fresh allotment of shares (like ESOP or funding round allotment) is reported via <strong className="text-dark">Form PAS-3</strong>, while share transfers between parties use <strong className="text-dark">Form SH-4</strong>.
                  </p>
                  <p className="text-muted text-base leading-relaxed">
                    Missing these deadlines — typically 30 days from the board resolution — results in penalties of <strong className="text-dark">₹500 per day</strong> per default and can expose every officer of the company to adjudication proceedings by the RoC.
                  </p>
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
                    <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-amber-800 text-sm leading-relaxed">
                      <strong>Note:</strong> Failure to file DIR-12 also means the outgoing director remains legally responsible for the company&apos;s decisions — a serious personal liability risk.
                    </p>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <div className="relative rounded-2xl overflow-hidden shadow-card aspect-[4/3]">
                    <Image
                      src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=85"
                      alt="Directors in a board meeting discussing company governance changes"
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-xs font-heading font-semibold">Corporate Governance Compliance</p>
                      <p className="text-white/70 text-[10px]">Changes effective from the date of board resolution</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {[
                      { label: "DIR-12", sub: "Director Change" },
                      { label: "PAS-3", sub: "Share Allotment" },
                      { label: "SH-4", sub: "Share Transfer" },
                    ].map(f => (
                      <div key={f.label} className="bg-primary/5 border border-primary/15 rounded-xl p-3 text-center">
                        <p className="font-heading font-bold text-primary text-sm">{f.label}</p>
                        <p className="text-muted text-[10px] mt-0.5">{f.sub}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ── WHO NEEDS THIS ── */}
            <section id="who-needs" className="scroll-mt-20">
              <div className="bg-slate-50 rounded-3xl p-8 md:p-12">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                  <Eyebrow label="Who Needs This" />
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                    Who Needs a Director / Shareholder Change Filing?
                  </h2>
                  <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                    Any company undergoing board changes, share transfers, or equity allotments must file with MCA. Here are the most common scenarios.
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {whoNeeds.map((w, i) => (
                    <motion.div key={w.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                      className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/20 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                        <w.icon size={18} className="text-primary" />
                      </div>
                      <p className="font-heading font-bold text-dark text-sm mb-1.5">{w.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── KEY BENEFITS ── */}
            <section id="benefits" className="scroll-mt-20">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Key Benefits" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  8 Benefits of Timely MCA Filing
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Filing DIR-12, PAS-3, and SH-4 on time is not just compliance — it protects every stakeholder in your company.
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

            {/* ── PROCESS STEPS ── */}
            <section id="process" className="scroll-mt-20">
              <div className="bg-slate-50 rounded-3xl p-8 md:p-12">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                  <Eyebrow label="Our Process" />
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                    8-Step Filing Process
                  </h2>
                  <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                    Our structured process ensures every form is filed accurately, every deadline is met, and every statutory register is updated correctly.
                  </p>
                </motion.div>
                <div className="relative">
                  <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent hidden md:block" />
                  <div className="space-y-4">
                    {processSteps.map((step, i) => (
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
              </div>
            </section>

            {/* ── DOCUMENTS REQUIRED ── */}
            <section id="documents" className="scroll-mt-20">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Documents Required" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Documents Needed for Filing
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Gather these documents before starting. Our team verifies each document for accuracy before submission.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {requiredDocs.map((doc, i) => (
                  <motion.div key={doc} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-card hover:border-primary/20 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                      <CheckCircle size={14} className="text-primary" />
                    </div>
                    <p className="text-dark text-sm font-heading font-medium leading-snug">{doc}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
                className="bg-primary/5 border border-primary/15 rounded-2xl p-5 flex items-start gap-3"
              >
                <BadgeCheck size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-semibold text-primary text-sm mb-1">Document Checklist Provided</p>
                  <p className="text-muted text-xs leading-relaxed">Our team provides a tailored document checklist based on your specific change type — director appointment, removal, share transfer, or allotment. All documents are verified before MCA submission.</p>
                </div>
              </motion.div>
            </section>

            {/* ── TIMELINE VISUAL ── */}
            <section id="timeline" className="scroll-mt-20">
              <div className="bg-slate-50 rounded-3xl p-8 md:p-12">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                  <Eyebrow label="Filing Timeline" />
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                    From Board Resolution to MCA Update
                  </h2>
                  <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                    The complete filing journey from board resolution to updated MCA records — typically completed in 7–10 working days.
                  </p>
                </motion.div>
                {/* Timeline */}
                <div className="relative">
                  {/* Connecting line on desktop */}
                  <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {timelineStages.map((stage, i) => (
                      <motion.div key={stage.n} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                        className="flex flex-col items-center text-center group"
                      >
                        <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center mb-3 ${stage.color} shadow-sm group-hover:scale-105 transition-transform relative z-10`}>
                          <span className="font-heading font-bold text-base leading-none">{stage.n}</span>
                        </div>
                        <p className="font-heading font-semibold text-dark text-xs mb-1 leading-snug">{stage.label}</p>
                        <p className="text-muted text-[10px]">{stage.sub}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  {[
                    { label: "Board Resolution Signed", time: "Day 0", color: "bg-blue-50 border-blue-100 text-blue-700" },
                    { label: "MCA Forms Filed", time: "Within 30 Days", color: "bg-primary/5 border-primary/20 text-primary" },
                    { label: "MCA Master Updated", time: "7–10 Working Days", color: "bg-green-50 border-green-100 text-green-700" },
                  ].map(t => (
                    <div key={t.label} className={`border rounded-2xl p-4 text-center ${t.color}`}>
                      <p className="font-heading font-bold text-sm">{t.time}</p>
                      <p className="text-xs opacity-70 mt-0.5">{t.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── WHAT YOU RECEIVE ── */}
            <section id="deliverables" className="scroll-mt-20">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Deliverables" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  What You Receive After Filing
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  A complete filing package — all MCA acknowledgments, updated registers, and compliance evidence for your records.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {deliverables.map((d, i) => (
                  <motion.div key={d} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-card hover:border-primary/20 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                      <Download size={14} className="text-green-600" />
                    </div>
                    <p className="text-dark text-sm font-heading font-medium leading-snug">{d}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── WHY COMPANY AVENUE ── */}
            <section id="why-us" className="scroll-mt-20">
              <div className="bg-slate-50 rounded-3xl p-8 md:p-12">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                  <Eyebrow label="Why Company Avenue" />
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                    Why Businesses Trust Us with MCA Filings
                  </h2>
                  <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                    1,500+ director and shareholder changes processed. Zero penalties. Zero rejections. We know MCA inside out.
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {whyUsPoints.map((w, i) => (
                    <motion.div key={w.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                      className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/20 transition-all group flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                        <w.icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-dark text-sm mb-1">{w.title}</p>
                        <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="scroll-mt-20">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="FAQs" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Answers to the most common questions on director changes, share transfers, and allotments.
                </p>
              </motion.div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <motion.div key={faq.q} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                    <FaqItem q={faq.q} a={faq.a} />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── RELATED SERVICES ── */}
            <section className="scroll-mt-20">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Related Services" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  You May Also Need
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Explore related MCA compliance services offered by Company Avenue.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedServices.map((s, i) => (
                  <motion.div key={s.id} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                    <Link href={`/services/${s.id}`}
                      className="block bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/20 hover:bg-primary/[0.02] transition-all group"
                    >
                      <p className="font-heading font-bold text-dark text-sm mb-1.5 group-hover:text-primary transition-colors">{s.title}</p>
                      <p className="text-muted text-xs leading-relaxed mb-3">{s.desc}</p>
                      <div className="flex items-center gap-1 text-primary text-xs font-heading font-semibold">
                        Learn More <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

          </div>

          {/* ── STICKY SIDEBAR ── */}
          <div className="hidden xl:block">
            <div className="sticky top-24">
              <StickySidebar />
            </div>
          </div>
        </div>
      </div>

      {/* ══ DARK CTA ══ */}
      <section className="bg-[#0F2D52] py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-6">
              <span className="w-6 h-px bg-accent" />Get Started Today<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-6 max-w-3xl mx-auto leading-tight">
              Don&apos;t Miss the 30-Day<br />
              <span className="text-accent">DIR-12 Filing Deadline</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Every day past 30 days costs ₹500 in penalties. Our experts file your DIR-12, PAS-3, or SH-4 accurately and on time — starting at ₹4,999.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-heading font-bold text-sm rounded-xl hover:bg-accent-dark transition-colors shadow-glow-accent"
              >
                Start Filing Now <ArrowRight size={16} />
              </Link>
              <a href="tel:+919953719111"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/10 transition-colors"
              >
                <Phone size={15} /> Call an Expert
              </a>
            </div>
            <p className="text-white/30 text-xs mt-8">Director Change · Share Transfer · ESOP Allotment · Debt-to-Equity · MCA Compliance</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
