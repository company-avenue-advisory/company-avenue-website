"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, MessageCircle,
  Users, ShieldCheck, TrendingUp, Award, Clock, FileText,
  Building2, Globe, UserCheck, BadgeCheck, Star, ChevronRight,
  AlertCircle, CreditCard, Fingerprint, Calendar,
  DollarSign, Lock, AlertTriangle, CircleCheck,
  RefreshCcw, Layers, ClipboardCheck, Briefcase,
  PenLine, Hash, Smartphone, Mail, CheckSquare, Scale,
  Key, BarChart3, Wallet, Target, Shield, BookOpen,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
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

/* ════════════════════════ DATA ════════════════════════ */

const quickFacts = [
  { icon: FileText, label: "Form", value: "DIR-3 KYC / DIR-3 KYC-Web", color: "bg-primary/8 text-primary" },
  { icon: Calendar, label: "Due Date", value: "30 September (every year)", color: "bg-blue-50 text-blue-600" },
  { icon: AlertTriangle, label: "Penalty", value: "₹5,000 for late filing", color: "bg-red-50 text-red-600" },
  { icon: Lock, label: "Consequence", value: "DIN marked DEACTIVATED", color: "bg-orange-50 text-orange-600" },
  { icon: Building2, label: "Authority", value: "Ministry of Corporate Affairs", color: "bg-purple-50 text-purple-600" },
  { icon: RefreshCcw, label: "First-time vs Annual", value: "Full form / Web-based", color: "bg-green-50 text-green-600" },
];

const whoNeeds = [
  { icon: UserCheck, title: "All Directors with Active DIN", desc: "Every person holding an active Director Identification Number must file DIR-3 KYC annually — without exception, regardless of company activity.", color: "bg-primary/8 text-primary" },
  { icon: RefreshCcw, title: "Directors Who Filed Last Year", desc: "Filing is required every year. Filing one year does not exempt you from the next — it is an annual recurring obligation for all DIN holders.", color: "bg-blue-50 text-blue-600" },
  { icon: Globe, title: "Foreign Nationals as Directors", desc: "Foreign nationals serving as directors in Indian companies must file DIR-3 KYC using their passport in lieu of Aadhaar, with apostilled documents.", color: "bg-teal-50 text-teal-600" },
  { icon: Layers, title: "Dormant Directors Not Currently Active", desc: "Directors not currently associated with any company but whose DIN is still APPROVED and not surrendered must file KYC every year.", color: "bg-green-50 text-green-600" },
  { icon: Briefcase, title: "LLP Designated Partners (DPIN)", desc: "Designated partners of LLPs have DPIN which is treated equivalent to DIN. They must complete DIR-3 KYC exactly like company directors.", color: "bg-amber-50 text-amber-600" },
  { icon: Building2, title: "Directors of Struck-off Companies", desc: "Even if your company has been struck off, your DIN still exists in MCA records and requires annual KYC until formally surrendered.", color: "bg-purple-50 text-purple-600" },
  { icon: Clock, title: "Retired Directors with Active DIN", desc: "Directors who have retired from all board positions but have not formally surrendered their DIN must still file annual KYC compliance.", color: "bg-rose-50 text-rose-600" },
  { icon: CheckSquare, title: "New Appointees Filing First Time", desc: "Newly appointed directors filing DIR-3 KYC for the first time must complete the full form with all documents and CA/CS certification.", color: "bg-indigo-50 text-indigo-600" },
];

const benefits = [
  { icon: Key, title: "Keep DIN/DPIN APPROVED", desc: "Active APPROVED status ensures you can sign MCA forms, ROC filings, and all company compliance documents without interruption.", color: "bg-primary/8 text-primary" },
  { icon: DollarSign, title: "Avoid ₹5,000 Late Penalty", desc: "Late filing after 30 September means the DIN gets deactivated and ₹5,000 must be paid to reactivate — avoidable with timely KYC.", color: "bg-blue-50 text-blue-600" },
  { icon: BadgeCheck, title: "Maintain Director Eligibility", desc: "Active DIN is a legal requirement for being a director or designated partner in any company or LLP in India.", color: "bg-teal-50 text-teal-600" },
  { icon: Shield, title: "Prevent Company Filing Rejection", desc: "If any director or partner has an inactive DIN, MCA will reject all company filings — blocking ROC compliance for the entire company.", color: "bg-red-50 text-red-600" },
  { icon: Wallet, title: "Keep Bank Accounts Operational", desc: "Banks verify director DIN status as part of ongoing KYC. Inactive DIN can trigger account review and operational disruptions.", color: "bg-green-50 text-green-600" },
  { icon: TrendingUp, title: "Continue Without Interruption", desc: "Active directors and partners can continue signing forms, attending board meetings, and fulfilling their corporate roles seamlessly.", color: "bg-amber-50 text-amber-600" },
  { icon: Clock, title: "Simple Annual Process", desc: "With professional help, DIR-3 KYC takes just a few minutes. Mobile OTP and email OTP are the only requirements for web-based KYC.", color: "bg-purple-50 text-purple-600" },
  { icon: Award, title: "Peace of Mind for Governance", desc: "Compliance-conscious directors maintain personal credibility with banks, investors, co-directors, and regulatory authorities.", color: "bg-rose-50 text-rose-600" },
];

const processSteps = [
  { n: "01", icon: BarChart3, title: "Check DIN Status on MCA Portal", desc: "Log in to the MCA portal (mca.gov.in) and verify that your DIN or DPIN is currently in APPROVED status. If deactivated, a different process applies." },
  { n: "02", icon: CheckSquare, title: "Determine KYC Type Required", desc: "First-time filers or those with changed mobile/email must file the full DIR-3 KYC form with documents. Returning filers with no changes use DIR-3 KYC-Web with OTP only." },
  { n: "03", icon: FileText, title: "Fill DIR-3 KYC Form", desc: "For full form: enter personal details, permanent address, present address, mobile number, email, and PAN. Attach photo, PAN, Aadhaar, and proof documents." },
  { n: "04", icon: Smartphone, title: "Mobile OTP Verification", desc: "An OTP is sent to the mobile number registered with Aadhaar. This links your Aadhaar identity to your DIN — a mandatory step for Indian residents." },
  { n: "05", icon: Mail, title: "Email OTP Verification", desc: "A second OTP is sent to your personal email address. Both mobile and email OTP must be verified to complete the KYC process successfully." },
  { n: "06", icon: PenLine, title: "CA/CS Certification", desc: "For the full DIR-3 KYC form (first-time or details changed), certification by a CA or CS in practice is mandatory before submission to MCA." },
  { n: "07", icon: ClipboardCheck, title: "Upload to MCA Portal", desc: "The certified form is uploaded to MCA V3 portal. The system validates the DIN, PAN, Aadhaar, mobile, and email in real time." },
  { n: "08", icon: BadgeCheck, title: "Receive APPROVED Status", desc: "Upon successful filing, MCA updates the DIN/DPIN status to APPROVED. You receive SRN acknowledgment instantly on the portal." },
];

const documents = [
  { label: "PAN Card", note: "Mandatory for all Indian directors — must match DIN records" },
  { label: "Aadhaar Card", note: "Mobile number must be linked to Aadhaar for OTP verification" },
  { label: "Personal Mobile Number", note: "Active number linked to Aadhaar — required for OTP" },
  { label: "Personal Email Address", note: "Valid email — receives second OTP verification" },
  { label: "Passport Size Photo", note: "Recent clear photograph in digital format" },
  { label: "Passport (Foreign Nationals)", note: "In lieu of Aadhaar; apostilled copies may be required" },
];

const timeline = [
  { stage: "DIN Status Check", period: "August", desc: "Verify DIN is APPROVED on MCA portal", active: false },
  { stage: "Document Collection", period: "September 1–15", desc: "Gather PAN, Aadhaar, photo, mobile, email", active: false },
  { stage: "Form Preparation", period: "September 15–25", desc: "Fill DIR-3 KYC or initiate web KYC", active: true },
  { stage: "OTP Verification", period: "September 25–28", desc: "Mobile OTP + email OTP confirmed", active: true },
  { stage: "CA/CS Certification", period: "September 28–29", desc: "Certified form signed by CA/CS in practice", active: false },
  { stage: "MCA Approval", period: "By September 30", desc: "DIN marked APPROVED on MCA portal", active: false },
];

const deliverables = [
  "DIR-3 KYC acknowledgment (SRN from MCA portal)",
  "DIN/DPIN status changed to APPROVED on MCA master data",
  "Updated personal details reflected in MCA director database",
  "Copy of filed DIR-3 KYC form for your compliance records",
  "CA/CS certification letter (for full form filings)",
  "WhatsApp confirmation with filing details and SRN",
];

const whyUs = [
  { icon: Award, title: "DIN KYC Specialists", desc: "Thousands of DIR-3 KYC filings handled for directors and designated partners across India — our team knows every scenario." },
  { icon: Clock, title: "Deadline Reminder System", desc: "We send timely reminders to directors and companies in our network well before 30 September — no last-minute panic." },
  { icon: Fingerprint, title: "Aadhaar OTP Assistance", desc: "We guide you through the Aadhaar-linked OTP process in real time — especially helpful for directors less familiar with MCA portal." },
  { icon: Scale, title: "CA/CS Certification In-house", desc: "No need to find a CA or CS separately — our in-house professionals certify DIR-3 KYC forms as part of our service package." },
  { icon: Globe, title: "Foreign Director Support", desc: "Special process for foreign nationals — apostille guidance, passport-based KYC, and embassy document support." },
  { icon: DollarSign, title: "Lowest Price at ₹699/Director", desc: "Industry-lowest flat fee per director. Volume discounts for companies with multiple directors. No hidden charges." },
  { icon: Shield, title: "Reactivation Support", desc: "If your DIN is already deactivated, we handle the reactivation filing with ₹5,000 fee and full documentation support." },
  { icon: TrendingUp, title: "Pan-India Remote Service", desc: "File from anywhere in India. Secure document upload, OTP coordination, and instant acknowledgment — all online." },
];

const faqs = [
  {
    q: "What is DIR-3 KYC and why is it mandatory?",
    a: "DIR-3 KYC is the annual Know Your Customer filing mandated by the Ministry of Corporate Affairs for every person holding a Director Identification Number (DIN) or Designated Partner Identification Number (DPIN). It was introduced in 2018 under Companies (Amendment) Act, 2017 to reduce the proliferation of shell companies by verifying that DIN holders are real, traceable persons. Non-compliance results in DIN deactivation — blocking all corporate filings.",
  },
  {
    q: "When is DIR-3 KYC due every year?",
    a: "DIR-3 KYC must be filed by 30th September every year for all DIN/DPIN holders. MCA deactivates all non-compliant DINs on 1st October each year. Late filing is allowed by filing the full DIR-3 KYC form (not web form) with a ₹5,000 fee to reactivate the DIN. The September 30 deadline is strictly enforced with no grace period.",
  },
  {
    q: "What is the difference between DIR-3 KYC full form and DIR-3 KYC-Web?",
    a: "DIR-3 KYC-Web is the simplified web-based form for directors who have already filed DIR-3 KYC previously and have no change in their mobile number or email address. It requires only OTP verification — no documents, no CA/CS certification. The full DIR-3 KYC form (with documents and CA/CS certification) is required for: (1) first-time KYC filers, (2) directors whose mobile number or email has changed, or (3) reactivation after DIN deactivation.",
  },
  {
    q: "What happens if I miss the 30 September deadline?",
    a: "If DIR-3 KYC is not filed by 30 September, MCA marks the DIN as DEACTIVATED. A deactivated DIN cannot sign any MCA form — blocking ROC filings, LLP filings, changes in company information, and all other MCA submissions where the director or partner is required to sign. To reactivate, the director must file the full DIR-3 KYC form (not web form) with a ₹5,000 fee.",
  },
  {
    q: "Can DIR-3 KYC be filed after the 30 September deadline?",
    a: "Yes — late filing is allowed. After the deadline, the DIN gets deactivated and you must file the full DIR-3 KYC form (with documents and CA/CS certification) with a ₹5,000 fee. The DIN is restored to APPROVED status once MCA processes the form. There is no annual 'window close' — you can file at any time, but the ₹5,000 penalty applies for every year you missed.",
  },
  {
    q: "Do retired directors or former directors need to file DIR-3 KYC?",
    a: "Yes. As long as the DIN is active (APPROVED status) in MCA records, the holder must file DIR-3 KYC every year — even if they are not currently associated with any company or LLP. The obligation ends only when the DIN is formally surrendered to MCA. Many retired directors are unaware of this and face deactivated DINs which cause problems if they wish to join another company later.",
  },
  {
    q: "How does DPIN for LLP designated partners work for DIR-3 KYC?",
    a: "DPIN (Designated Partner Identification Number) for LLP partners is treated exactly the same as DIN for company directors under MCA rules. Designated partners holding DPIN must file DIR-3 KYC every year by 30 September. The same forms, same deadline, same ₹5,000 late fee, and same consequences apply. If DPIN is deactivated, the LLP cannot file Form 8, Form 11, or any other MCA filing.",
  },
  {
    q: "Is Aadhaar OTP mandatory for DIR-3 KYC — what if my mobile is not linked?",
    a: "For Indian residents, Aadhaar-linked mobile OTP is mandatory for DIR-3 KYC. If your mobile is not linked to Aadhaar, you must first visit an Aadhaar enrolment centre to link your mobile, then proceed with KYC. There is no alternative for Indian nationals — Aadhaar seeding is a requirement under the MCA notification. We assist clients in getting Aadhaar-mobile linking done before initiating the KYC process.",
  },
  {
    q: "What is the process for foreign directors who don't have Aadhaar?",
    a: "Foreign nationals serving as Indian company directors do not have Aadhaar. They file DIR-3 KYC using their passport as identity proof instead of Aadhaar. The form must be certified by a CA or CS in India. For documents outside India, apostille certification is typically required. The mobile OTP is sent to the foreign mobile number registered with MCA. We have handled foreign director KYC for directors based in the USA, UK, UAE, Singapore, and other countries.",
  },
  {
    q: "Which form should I use — DIR-3 KYC or DIR-3 KYC-Web?",
    a: "Use DIR-3 KYC-Web if: (1) you have filed DIR-3 KYC before, (2) your mobile number and email registered on MCA have not changed, and (3) your DIN is APPROVED. Use the full DIR-3 KYC form if: (1) you are filing for the first time, (2) your mobile or email has changed, (3) your DIN is deactivated and you need reactivation, or (4) you are a foreign national. When in doubt, our team will determine the correct form based on your DIN history.",
  },
  {
    q: "Can a company's ROC filing be rejected because of a director's inactive DIN?",
    a: "Yes — and this is a critical risk. MCA's portal validates the DIN status of all signing directors before accepting any company filing. If even one director or designated partner has a deactivated DIN, the company cannot file AOC-4, MGT-7, or any other ROC form. This means the entire company's compliance can be blocked by one director's failure to file DIR-3 KYC. Companies with multiple directors should track KYC status for all directors proactively.",
  },
];

const relatedServices = [
  { id: "roc-compliance", title: "ROC Compliance", desc: "Annual ROC filing for private limited companies." },
  { id: "llp-annual-filing", title: "LLP Annual Filing", desc: "Form 11 + Form 8 filing for LLPs on MCA." },
  { id: "change-in-directors", title: "Change in Directors", desc: "Appointment or removal of company directors." },
  { id: "company-closure", title: "Company Closure", desc: "Strike off company or LLP from MCA records." },
  { id: "increase-authorised-capital", title: "Increase Authorised Capital", desc: "Enhance your company's share capital on MCA." },
  { id: "registered-office-change", title: "Registered Office Change", desc: "Update company address in MCA master data." },
];

/* ════════════════════════ SIDEBAR ════════════════════════ */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">Director KYC — DIR-3</p>
        <p className="text-muted text-xs mb-1 leading-relaxed">Annual KYC for DIN/DPIN holders</p>
        <p className="text-2xl font-heading font-bold text-primary mb-4">
          ₹699<span className="text-sm font-normal text-muted">/director</span>
        </p>
        <div className="space-y-2 mb-5">
          {["DIN Status Verification", "Full Form or Web KYC", "CA/CS Certification", "Aadhaar OTP Assistance", "MCA APPROVED Status"].map(pt => (
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
          >File DIR-3 KYC</Link>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          ><MessageCircle size={13} /> WhatsApp</a>
        </div>
      </div>

      <div className="bg-primary rounded-2xl p-5 text-white">
        <p className="font-heading font-bold text-sm mb-4">Key Deadlines</p>
        <div className="space-y-3">
          {[
            { label: "Annual Due Date", value: "30 September" },
            { label: "Late Filing Fee", value: "₹5,000 (fixed)" },
            { label: "Consequence", value: "DIN DEACTIVATED" },
            { label: "First-time Filing", value: "Full Form + CA/CS" },
            { label: "Annual Web KYC", value: "OTP-based only" },
            { label: "Authority", value: "Ministry of Corp Affairs" },
          ].map(f => (
            <div key={f.label} className="flex items-start justify-between gap-2">
              <span className="text-white/50 text-xs shrink-0">{f.label}</span>
              <span className="text-white text-xs font-heading font-semibold text-right">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-sm mb-3">Quick Navigation</p>
        <div className="space-y-1">
          {[
            { href: "#what-is", label: "What is DIR-3 KYC?" },
            { href: "#who-needs", label: "Who Needs This?" },
            { href: "#benefits", label: "Key Benefits" },
            { href: "#process", label: "Filing Process" },
            { href: "#documents", label: "Documents Required" },
            { href: "#timeline", label: "KYC Timeline" },
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

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={16} className="text-orange-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-heading font-semibold text-orange-800 text-xs mb-1">DIN at Risk</p>
            <p className="text-orange-700 text-xs leading-relaxed">Miss Sep 30 and your DIN becomes DEACTIVATED. Costs ₹5,000 + form re-filing to restore.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════ MAIN EXPORT ════════════════════════ */
export function DirectorKYCPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="kyc-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#kyc-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Director KYC</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">DIR-3 KYC • Annual DIN Compliance • ₹699/Director</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Director KYC<br /><span className="text-primary">DIR-3 KYC Filing</span><br />Annual DIN Compliance
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Keep your DIN or DPIN in APPROVED status on MCA portal with annual DIR-3 KYC filing. Avoid ₹5,000 penalty, prevent DIN deactivation, and maintain your eligibility as a director or designated partner in India.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  File DIR-3 KYC <ArrowRight size={15} />
                </Link>
                <a href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to Expert
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["Annual KYC by 30 September", "Full Form + Web KYC", "CA/CS Certification", "Aadhaar OTP Assistance"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Quick Fact Cards */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {quickFacts.map((f, i) => (
                  <div key={i} className={`${f.color} rounded-2xl p-5 border border-white/60`}>
                    <f.icon size={22} className="mb-3" />
                    <p className="font-heading font-bold text-sm leading-tight mb-1">{f.value}</p>
                    <p className="text-xs opacity-70">{f.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-start gap-3">
                <Lock size={18} className="text-orange-500 shrink-0 mt-0.5" />
                <p className="text-orange-700 text-xs leading-relaxed font-heading font-medium">
                  Miss 30 September and MCA marks your DIN as DEACTIVATED — blocking all corporate filings until ₹5,000 is paid.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ WHAT IS DIR-3 KYC ══ */}
      <section id="what-is" className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Understanding DIR-3 KYC" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-6 leading-tight">
                What is Director KYC (DIR-3 KYC)?
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                DIR-3 KYC is the annual Know Your Customer compliance filing mandated by the Ministry of Corporate Affairs for every holder of a <strong className="text-dark">Director Identification Number (DIN)</strong> or <strong className="text-dark">Designated Partner Identification Number (DPIN)</strong>. Introduced in 2018 under Companies (Amendment) Act, 2017, it ensures that every DIN holder is a verifiable, real person — a measure to combat shell companies and fraudulent directorships.
              </p>
              <p className="text-muted leading-relaxed mb-5">
                Every DIN holder must file DIR-3 KYC by <strong className="text-dark">30th September each year</strong>. MCA automatically deactivates all DINs that are not KYC-compliant on 1st October. A deactivated DIN means the person <strong className="text-dark">cannot sign any MCA form</strong> — effectively blocking their company or LLP from filing any ROC compliance documents.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                There are two types of filing: <strong className="text-dark">DIR-3 KYC</strong> (full form with documents, required for first-time filers, changed mobile/email, or reactivation) and <strong className="text-dark">DIR-3 KYC-Web</strong> (simplified OTP-only form for returning filers with no detail changes). Our team handles both efficiently.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Annual Due Date", value: "30 Sept" },
                  { label: "Late Filing Fee", value: "₹5,000" },
                  { label: "Our Price", value: "₹699" },
                  { label: "DIN Restored", value: "Same Day" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-100">
                    <p className="font-heading font-bold text-primary text-xl">{s.value}</p>
                    <p className="text-muted text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="relative rounded-3xl overflow-hidden shadow-[0_12px_60px_rgba(15,45,82,0.12)] aspect-[4/3]"
            >
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85"
                alt="Director KYC DIR-3 KYC DIN compliance India MCA"
                fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-heading font-bold text-lg leading-tight">Keep Your DIN Active</p>
                <p className="text-white/70 text-sm mt-1">Annual DIR-3 KYC — fast, affordable, expert-handled</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ WHO NEEDS ══ */}
      <section id="who-needs" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Applicability" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">Who Needs DIR-3 KYC?</h2>
            <p className="text-muted max-w-2xl mx-auto">Every DIN or DPIN holder in India — active, dormant, or retired — must file DIR-3 KYC by 30 September every year without exception.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoNeeds.map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-card transition-shadow"
              >
                <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon size={20} />
                </div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{item.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ KEY BENEFITS ══ */}
      <section id="benefits" className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Why File on Time" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">Key Benefits of DIR-3 KYC Compliance</h2>
            <p className="text-muted max-w-2xl mx-auto">Timely DIR-3 KYC protects your DIN, your company&apos;s compliance chain, and your personal credibility as a corporate officer.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-card transition-shadow"
              >
                <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon size={20} />
                </div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{item.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section id="process" className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <Eyebrow label="KYC Process" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">Step-by-Step DIR-3 KYC Process</h2>
              <p className="text-muted leading-relaxed mb-8">Our streamlined process handles DIR-3 KYC filing from DIN status check to MCA APPROVED confirmation — typically completed in 1–2 business days.</p>
              <div className="space-y-4">
                <div className="bg-primary/8 rounded-2xl p-5 border border-primary/15">
                  <p className="font-heading font-semibold text-primary text-sm mb-3">Two Types of DIR-3 KYC</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary text-white text-[10px] font-heading font-bold flex items-center justify-center shrink-0">WEB</div>
                      <div>
                        <p className="text-dark text-xs font-heading font-semibold">DIR-3 KYC-Web</p>
                        <p className="text-muted text-xs">Returning filers, no detail changes — OTP only, no documents</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent text-white text-[10px] font-heading font-bold flex items-center justify-center shrink-0">FULL</div>
                      <div>
                        <p className="text-dark text-xs font-heading font-semibold">DIR-3 KYC (Full Form)</p>
                        <p className="text-muted text-xs">First-time, changed details, reactivation — documents + CA/CS certification</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
                  <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-amber-800 text-xs leading-relaxed">Aadhaar-linked mobile number is mandatory for Indian residents. Ensure your Aadhaar is seeded with your active mobile before initiating KYC.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {processSteps.map((step, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="flex items-start gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary text-white font-heading font-bold text-xs flex items-center justify-center">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-dark text-sm mb-1">{step.title}</h3>
                    <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ DOCUMENTS ══ */}
      <section id="documents" className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Eyebrow label="Checklist" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">Documents Required</h2>
              <p className="text-muted">For DIR-3 KYC-Web (returning filers): only mobile OTP + email OTP needed. For full form: documents below are required.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents.map((doc, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-slate-100"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/8 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <FileText size={15} />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-dark text-sm">{doc.label}</p>
                    <p className="text-muted text-xs mt-0.5">{doc.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
                <Smartphone size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-blue-800 text-xs leading-relaxed"><strong>Web KYC only needs:</strong> Mobile number linked to Aadhaar (for OTP) + personal email (for OTP). No documents, no CA/CS signature required.</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex items-start gap-3">
                <Globe size={16} className="text-purple-600 shrink-0 mt-0.5" />
                <p className="text-purple-800 text-xs leading-relaxed"><strong>Foreign nationals:</strong> Passport + apostilled address proof + CA/CS certification. No Aadhaar required — mobile OTP on foreign number.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section id="timeline" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Annual Cycle" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">DIR-3 KYC Filing Timeline</h2>
            <p className="text-muted max-w-2xl mx-auto">Plan your Director KYC filing well before the September 30 deadline to avoid last-minute OTP issues or document delays.</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute top-[28px] left-0 right-0 h-0.5 bg-slate-200 z-0" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
              {timeline.map((item, i) => (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-3 ${item.active ? "bg-primary border-primary text-white" : "bg-white border-slate-200 text-slate-400"}`}>
                    <span className="font-heading font-bold text-xs">{i + 1}</span>
                  </div>
                  <p className={`font-heading font-bold text-xs mb-1 ${item.active ? "text-primary" : "text-dark"}`}>{item.stage}</p>
                  <p className={`text-[10px] font-semibold mb-1 ${item.active ? "text-accent" : "text-muted"}`}>{item.period}</p>
                  <p className="text-muted text-[10px] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ DELIVERABLES + SIDEBAR ══ */}
      <section id="deliverables" className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Eyebrow label="What You Get" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-6">What You Receive</h2>
              <p className="text-muted leading-relaxed mb-8">Our DIR-3 KYC service delivers complete DIN compliance — from status check to MCA APPROVED confirmation — handled by our expert CA/CS team.</p>
              <div className="space-y-3">
                {deliverables.map((d, i) => (
                  <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-slate-100"
                  >
                    <CircleCheck size={18} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-dark text-sm">{d}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 bg-primary rounded-2xl p-6 text-white">
                <p className="font-heading font-bold text-base mb-2">₹699 per Director — All Inclusive</p>
                <p className="text-white/70 text-sm mb-4">DIN check, form preparation, Aadhaar OTP assistance, CA/CS certification, MCA filing, and SRN acknowledgment — everything covered.</p>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary font-heading font-bold text-sm rounded-xl hover:bg-white/90 transition-colors"
                >
                  File DIR-3 KYC <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div>
              <StickySidebar />
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY COMPANY AVENUE ══ */}
      <section id="why-us" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <Eyebrow label="Our Advantage" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">Why Choose Company Avenue?</h2>
            <p className="text-muted max-w-2xl mx-auto">We make DIR-3 KYC effortless. Our team handles the full process — and keeps track of deadlines so you don&apos;t have to.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-card transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/8 text-primary flex items-center justify-center mb-4">
                  <item.icon size={20} />
                </div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{item.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Eyebrow label="Frequently Asked Questions" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">Director KYC FAQs</h2>
              <p className="text-muted">Everything you need to know about DIR-3 KYC, DIN compliance, and annual filing requirements.</p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ══ RELATED SERVICES ══ */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Eyebrow label="Explore More" />
            <h2 className="font-heading font-bold text-3xl text-dark mb-4">Related Services</h2>
            <p className="text-muted">Complete your corporate compliance stack with these connected services from Company Avenue.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedServices.map((svc, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Link href={`/services/${svc.id}`}
                  className="group flex flex-col bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all h-full"
                >
                  <p className="font-heading font-semibold text-dark text-sm mb-1 group-hover:text-primary transition-colors">{svc.title}</p>
                  <p className="text-muted text-xs leading-relaxed flex-1">{svc.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-primary text-xs font-heading font-semibold">
                    Learn More <ArrowRight size={12} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DARK CTA ══ */}
      <section className="py-20 bg-[#0F2D52]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="font-heading font-semibold text-accent text-sm tracking-widest uppercase mb-4">File Before 30 September</p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6 leading-tight">
                Don&apos;t Let Your DIN Get Deactivated This Year
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-10 max-w-xl mx-auto">
                DIR-3 KYC by 30 September keeps your DIN APPROVED. Miss the deadline and you pay ₹5,000 to reactivate — plus block your company&apos;s entire compliance chain. File now for ₹699/director.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-heading font-bold text-sm rounded-xl hover:bg-[#c4963f] transition-colors"
                >
                  File DIR-3 KYC Now <ArrowRight size={15} />
                </Link>
                <a href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/5 transition-colors"
                >
                  <Phone size={15} /> Call Our KYC Expert
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
