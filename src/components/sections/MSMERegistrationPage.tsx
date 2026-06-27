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
  ChevronRight, AlertCircle, AlertTriangle, DollarSign,
  CreditCard, Fingerprint, Hash, Receipt, RefreshCcw,
  PiggyBank, BarChart3, Package, Landmark, BookOpen,
  Banknote, HeartPulse, GraduationCap, Bell,
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
  { value: "Free", label: "Registration Cost" },
  { value: "1–2 Days", label: "Processing Time" },
  { value: "Lifetime", label: "Certificate Validity" },
  { value: "20+ Schemes", label: "Govt. Benefits" },
];

const msmeCategories = [
  {
    type: "Micro",
    color: "border-green-200 bg-green-50",
    badge: "bg-green-600 text-white",
    icon: Zap,
    iconColor: "text-green-600 bg-green-100",
    investment: "Up to ₹1 Crore",
    turnover: "Up to ₹5 Crore",
    examples: ["Home-based businesses", "Freelancers", "Small shops", "Artisans"],
  },
  {
    type: "Small",
    color: "border-primary/30 bg-primary/[0.03]",
    badge: "bg-primary text-white",
    icon: Building2,
    iconColor: "text-primary bg-primary/10",
    investment: "Up to ₹10 Crore",
    turnover: "Up to ₹50 Crore",
    examples: ["Small manufacturers", "Trading firms", "Service providers", "Restaurants"],
  },
  {
    type: "Medium",
    color: "border-amber-200 bg-amber-50",
    badge: "bg-amber-600 text-white",
    icon: Factory,
    iconColor: "text-amber-600 bg-amber-100",
    investment: "Up to ₹50 Crore",
    turnover: "Up to ₹250 Crore",
    examples: ["Mid-size manufacturers", "Export units", "IT companies", "Logistics firms"],
  },
];

const benefits = [
  { icon: Banknote, title: "Collateral-Free Loans", desc: "Access credit under CGTMSE scheme without pledging assets. Loans up to ₹2 Crore without collateral.", color: "bg-green-50 text-green-600" },
  { icon: TrendingUp, title: "Priority Sector Lending", desc: "Banks are mandated to lend to MSMEs as priority sector. Better loan access and faster processing.", color: "bg-blue-50 text-blue-600" },
  { icon: PiggyBank, title: "Interest Rate Subsidy", desc: "CLCSS provides 15% capital subsidy. Interest subsidy of 1–2% under various central and state schemes.", color: "bg-primary/8 text-primary" },
  { icon: Receipt, title: "Tax Benefits", desc: "Presumptive taxation under 44AD/44ADA. Faster depreciation benefits and deductions on eligible expenditures.", color: "bg-amber-50 text-amber-600" },
  { icon: Landmark, title: "Tender & Procurement", desc: "25% procurement reserved for MSMEs in government tenders. Exemption from Earnest Money Deposit (EMD).", color: "bg-teal-50 text-teal-600" },
  { icon: AlertCircle, title: "Delayed Payment Protection", desc: "MSMED Act mandates payment within 45 days. Buyers pay compound interest @ 3× RBI bank rate if delayed.", color: "bg-purple-50 text-purple-600" },
  { icon: Globe, title: "Export Incentives", desc: "MAI & MDA schemes for export promotion. Duty drawback and participation in international trade fairs.", color: "bg-rose-50 text-rose-600" },
  { icon: GraduationCap, title: "ISO Reimbursement", desc: "Government reimburses ISO certification costs for MSMEs. Improves quality standards and market credibility.", color: "bg-indigo-50 text-indigo-600" },
  { icon: ShieldCheck, title: "Credit Guarantee (CGTMSE)", desc: "Government guarantees 75–85% of the loan to banks. Enables MSMEs to get loans even without track record.", color: "bg-orange-50 text-orange-600" },
  { icon: BarChart3, title: "Technology Upgradation", desc: "CLCSS and TUFS schemes for upgrading plant and machinery. Up to 15% capital subsidy on eligible investments.", color: "bg-cyan-50 text-cyan-600" },
  { icon: Users, title: "Startup & Incubation Support", desc: "Access to government incubators, SIDBI schemes, and startup India recognition benefits for new MSMEs.", color: "bg-violet-50 text-violet-600" },
  { icon: HeartPulse, title: "Subsidised Electricity", desc: "State governments offer electricity duty exemption and concessions in tariff for MSME units.", color: "bg-emerald-50 text-emerald-600" },
];

const govtSchemes = [
  { name: "CGTMSE", full: "Credit Guarantee Trust Fund for Micro & Small Enterprises", benefit: "Collateral-free loans up to ₹2 Crore", color: "border-l-blue-500" },
  { name: "CLCSS", full: "Credit Linked Capital Subsidy Scheme", benefit: "15% capital subsidy on technology upgradation", color: "border-l-green-500" },
  { name: "PMEGP", full: "Prime Minister's Employment Generation Programme", benefit: "Subsidy of 15–35% for new enterprises", color: "border-l-amber-500" },
  { name: "MUDRA", full: "Micro Units Development & Refinance Agency", benefit: "Loans ₹10L–₹10Cr without collateral", color: "border-l-purple-500" },
  { name: "ZED Scheme", full: "Zero Defect Zero Effect", benefit: "Quality certification with govt subsidy", color: "border-l-teal-500" },
  { name: "MAI/MDA", full: "Market Access Initiative / Market Development Assistance", benefit: "Export promotion and trade fair support", color: "border-l-rose-500" },
  { name: "NSIC", full: "National Small Industries Corporation Schemes", benefit: "Raw material assistance and marketing support", color: "border-l-indigo-500" },
  { name: "Udyam Assist", full: "Informal Micro Enterprise Registration", benefit: "Registration for street vendors & hawkers", color: "border-l-orange-500" },
];

const eligibleBusinesses = [
  { icon: Factory, label: "Manufacturers" },
  { icon: Briefcase, label: "Service Providers" },
  { icon: ShoppingBag, label: "Traders & Retailers" },
  { icon: Monitor, label: "IT & Tech Companies" },
  { icon: Globe, label: "Export Businesses" },
  { icon: Building2, label: "Private Limited Cos." },
  { icon: Users, label: "LLPs & Firms" },
  { icon: Zap, label: "Startups & Founders" },
  { icon: HeartPulse, label: "Healthcare Providers" },
];

const notEligible = [
  "Large enterprises exceeding investment & turnover thresholds",
  "Public sector undertakings (PSUs) and central government entities",
  "Non-resident Indians (NRIs) owned businesses (case-by-case)",
  "Retail trading businesses (some states have specific rules)",
];

const requiredDocs = [
  { icon: CreditCard, label: "Aadhaar Card", note: "Owner / Proprietor / Director", group: "identity" },
  { icon: Hash, label: "PAN Card", note: "Business PAN (mandatory from 2021)", group: "identity" },
  { icon: FileText, label: "Business Name & Address", note: "Official name as registered", group: "business" },
  { icon: Receipt, label: "Business Activity Type", note: "Manufacturing or Service", group: "business" },
  { icon: Banknote, label: "Bank Account Details", note: "Account number & IFSC", group: "financial" },
  { icon: Package, label: "NIC Code", note: "National Industrial Classification code", group: "business" },
  { icon: Users, label: "Number of Employees", note: "Approximate employee count", group: "business" },
  { icon: BarChart3, label: "Investment & Turnover Data", note: "As per last ITR or declaration", group: "financial" },
];

const registrationSteps = [
  { n: "01", title: "Aadhaar & PAN Verification", desc: "The registration begins with Aadhaar OTP verification of the business owner. PAN is mandatory and linked automatically with ITR data.", icon: Fingerprint },
  { n: "02", title: "Business Details Entry", desc: "Enter business name, address, NIC activity code, investment in plant & machinery, and annual turnover.", icon: FileText },
  { n: "03", title: "Self-Declaration", desc: "The applicant self-certifies the investment and turnover figures. No supporting documents need to be uploaded on the portal.", icon: BookOpen },
  { n: "04", title: "PAN & GSTIN Linking", desc: "For businesses with GST registration, the GSTIN is linked automatically. Turnover is verified via GSTN and ITR databases.", icon: Hash },
  { n: "05", title: "Udyam Registration Number", desc: "Upon successful submission, a unique Udyam Registration Number (URN) is generated instantly.", icon: BadgeCheck },
  { n: "06", title: "Udyam Certificate Download", desc: "The Udyam Certificate with QR code is available for download immediately — valid for lifetime with no renewal required.", icon: Download },
];

const commonMistakes = [
  { icon: AlertTriangle, title: "Wrong NIC Code Selection", desc: "Selecting an incorrect activity code (NIC) results in wrong classification and may disqualify you from sector-specific schemes.", color: "text-red-600 bg-red-50" },
  { icon: AlertTriangle, title: "Incorrect Investment Declaration", desc: "Investment should be net of depreciation as per the Income Tax Act. Over-stating or under-stating can trigger re-classification.", color: "text-orange-600 bg-orange-50" },
  { icon: AlertTriangle, title: "Not Updating Post-Registration", desc: "If your turnover or investment crosses the threshold, the certificate must be updated — failing to do so is non-compliant.", color: "text-amber-600 bg-amber-50" },
  { icon: AlertTriangle, title: "Using Old Udyog Aadhaar", desc: "Udyog Aadhaar registrations made before July 2020 were not automatically migrated. A fresh Udyam registration is required.", color: "text-purple-600 bg-purple-50" },
  { icon: AlertTriangle, title: "Multiple Registrations", desc: "Only one Udyam Registration per PAN is allowed. Multiple registrations for the same entity are invalid and can be cancelled.", color: "text-rose-600 bg-rose-50" },
  { icon: AlertTriangle, title: "Not Linking GSTIN", desc: "Businesses with GST registration must link their GSTIN to Udyam. Missing this step creates data mismatches in government databases.", color: "text-blue-600 bg-blue-50" },
];

const faqs = [
  { q: "What is Udyam Registration and is it the same as MSME Registration?", a: "Yes. Udyam Registration is the official government portal for MSME (Micro, Small and Medium Enterprises) registration under the MSMED Act 2006. It replaced the earlier Udyog Aadhaar Memorandum (UAM) system in July 2020. The Udyam Certificate issued after registration is the official proof of MSME status." },
  { q: "Is Udyam Registration mandatory?", a: "Udyam Registration is not legally mandatory for all businesses, but it is effectively mandatory to avail any government MSME benefits — including collateral-free loans, government procurement, subsidies, and scheme benefits. Without registration, businesses cannot access the MSMED Act protection for delayed payments." },
  { q: "What are the investment and turnover limits for MSMEs?", a: "As of the revised 2020 definition: Micro — Investment up to ₹1 Crore and Turnover up to ₹5 Crore; Small — Investment up to ₹10 Crore and Turnover up to ₹50 Crore; Medium — Investment up to ₹50 Crore and Turnover up to ₹250 Crore. Both investment AND turnover criteria must be met — whichever is higher determines the category." },
  { q: "What documents are required for Udyam Registration?", a: "Udyam Registration is a self-declaration process. You need: Aadhaar Card (for OTP verification), PAN Card (mandatory), business name, address, NIC code, bank account details, and approximate investment and turnover figures. No physical document uploads are required on the portal." },
  { q: "How long does Udyam Registration take?", a: "Once you have your Aadhaar OTP and all details ready, the registration is completed in 15–30 minutes online. The Udyam Certificate is issued instantly with a unique Udyam Registration Number. Our team completes the process within 1 working day." },
  { q: "Is Udyam Certificate valid for lifetime?", a: "Yes. The Udyam Certificate has no expiry date and is valid for the lifetime of the enterprise. However, it must be updated annually with turnover and investment data based on the previous year's ITR, and whenever the business details change significantly." },
  { q: "Can a Proprietorship firm register for Udyam?", a: "Yes. All business structures — proprietorship, partnership, LLP, private limited company, OPC, Hindu Undivided Family (HUF), co-operative societies, and trusts — can register under Udyam, provided they meet the investment and turnover criteria." },
  { q: "Can I migrate from old Udyog Aadhaar to Udyam?", a: "Yes, but migration is not automatic. Businesses that registered under the old Udyog Aadhaar system before July 1, 2020 must re-register on the Udyam portal. The old UAM registrations were valid only until March 31, 2021 — after which fresh Udyam Registration is required." },
  { q: "Is Udyam Registration free?", a: "Yes. Udyam Registration on the official government portal (udyamregistration.gov.in) is completely free of charge. There are no government fees. Company Avenue charges a professional service fee for end-to-end assistance, accurate classification, and certificate delivery." },
  { q: "What happens if my business crosses MSME limits?", a: "If your investment or turnover exceeds the MSME threshold during a financial year, you must update your Udyam Registration. You will retain MSME status for that year and the following year (one-year grace period), but after that the enterprise will be re-classified or de-registered." },
  { q: "How does the 45-day payment protection work?", a: "Under the MSMED Act, buyers must pay MSME suppliers within 45 days of delivery/acceptance. If payment is delayed beyond 45 days, the buyer is liable to pay compound interest at 3× the RBI bank rate. MSMEs can file for recovery through the MSME Samadhan portal or file cases before the MSME Facilitation Council." },
  { q: "Can I get a loan just by showing the Udyam Certificate?", a: "The Udyam Certificate makes you eligible for priority sector lending and collateral-free loans under CGTMSE. Banks will still assess your creditworthiness, business plan, and repayment capacity. However, MSME status significantly improves loan approval chances and interest rates." },
];

const whyUsPoints = [
  { icon: UserCheck, title: "Accurate NIC Code Selection", desc: "Wrong NIC codes cause scheme ineligibility. We select the precise code for your business activity." },
  { icon: Award, title: "Correct Classification", desc: "We assess your investment and turnover to ensure accurate Micro/Small/Medium classification." },
  { icon: Lock, title: "Secure Aadhaar Handling", desc: "Your Aadhaar OTP process is handled with strict confidentiality — no data retention." },
  { icon: DollarSign, title: "Scheme Advisory Included", desc: "Post-registration, we advise which government schemes you qualify for based on your business profile." },
  { icon: Clock, title: "Same-Day Certificate Delivery", desc: "Registration completed and certificate shared within 1 business day of receiving documents." },
  { icon: RefreshCcw, title: "Update & Modification Support", desc: "We assist with annual updates, re-classification, GSTIN linking, and address/activity changes." },
];

const relatedServices = [
  { id: "private-limited-company", title: "Company Registration", desc: "Incorporate your Pvt. Ltd. company." },
  { id: "gst-registration", title: "GST Registration", desc: "Obtain GSTIN for your business." },
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping", desc: "Books, MIS & financial statements." },
  { id: "income-tax-return", title: "Income Tax Return", desc: "ITR filing for businesses." },
  { id: "llp-registration", title: "LLP Registration", desc: "Register your LLP firm." },
  { id: "trademark-registration", title: "Trademark Registration", desc: "Protect your brand identity." },
];

/* ══════════ ELIGIBILITY CHECKER ══════════ */
type CheckerState = { employees?: string; investment?: string; turnover?: string };

function getCategory(a: CheckerState): { cat: string; note: string; color: string } {
  const inv = a.investment;
  const turn = a.turnover;
  if (inv === "above50cr" || turn === "above250cr")
    return { cat: "Not Eligible", note: "Your enterprise exceeds Medium Enterprise thresholds. Udyam registration is not applicable.", color: "text-red-600 bg-red-50 border-red-200" };
  if (inv === "above10cr" || turn === "above50cr")
    return { cat: "Medium Enterprise", note: "Investment up to ₹50 Cr and Turnover up to ₹250 Cr. Eligible for Medium MSME registration.", color: "text-amber-700 bg-amber-50 border-amber-200" };
  if (inv === "above1cr" || turn === "above5cr")
    return { cat: "Small Enterprise", note: "Investment up to ₹10 Cr and Turnover up to ₹50 Cr. Eligible for Small MSME registration.", color: "text-primary bg-primary/5 border-primary/25" };
  return { cat: "Micro Enterprise", note: "Investment up to ₹1 Cr and Turnover up to ₹5 Cr. Eligible for Micro MSME registration — maximum benefits.", color: "text-green-700 bg-green-50 border-green-200" };
}

const checkerSteps = [
  { id: "investment", q: "What is your approximate investment in plant & machinery / equipment?", opts: [
    { label: "Up to ₹1 Crore", val: "upto1cr" },
    { label: "₹1 Cr – ₹10 Crore", val: "above1cr" },
    { label: "₹10 Cr – ₹50 Crore", val: "above10cr" },
    { label: "Above ₹50 Crore", val: "above50cr" },
  ]},
  { id: "turnover", q: "What is your approximate annual turnover?", opts: [
    { label: "Up to ₹5 Crore", val: "upto5cr" },
    { label: "₹5 Cr – ₹50 Crore", val: "above5cr" },
    { label: "₹50 Cr – ₹250 Crore", val: "above50cr" },
    { label: "Above ₹250 Crore", val: "above250cr" },
  ]},
];

function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<CheckerState>({});
  const [done, setDone] = useState(false);

  function choose(val: string) {
    const next = { ...answers, [checkerSteps[step].id]: val } as CheckerState;
    setAnswers(next);
    if (val === "above50cr") { setAnswers(next); setDone(true); return; }
    if (step + 1 < checkerSteps.length) setStep(step + 1);
    else setDone(true);
  }
  function reset() { setStep(0); setAnswers({}); setDone(false); }
  const result = done ? getCategory(answers) : null;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-7 md:p-10 shadow-card max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-heading font-bold text-dark text-lg">MSME Eligibility Checker</p>
          <p className="text-muted text-xs mt-0.5">2 quick questions to find your MSME category</p>
        </div>
        {(step > 0 || done) && (
          <button onClick={reset} className="text-xs text-muted hover:text-primary font-heading font-semibold transition-colors">Reset</button>
        )}
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: done ? "100%" : `${(step / checkerSteps.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
          >
            <p className="font-heading font-semibold text-dark text-base mb-5">
              <span className="text-primary text-sm mr-2">{step + 1}/{checkerSteps.length}</span>
              {checkerSteps[step].q}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {checkerSteps[step].opts.map(opt => (
                <motion.button key={opt.val} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => choose(opt.val)}
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl font-heading font-semibold text-sm text-dark hover:border-primary hover:bg-primary/5 transition-all text-left"
                >{opt.label}</motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
            <div className={`border rounded-2xl p-5 mb-5 ${result?.color}`}>
              <p className="text-xs font-heading font-semibold uppercase tracking-wider mb-1 opacity-60">Your MSME Category</p>
              <p className="font-heading font-bold text-2xl mb-2">{result?.cat}</p>
              <p className="text-sm leading-relaxed opacity-80">{result?.note}</p>
            </div>
            <div className="flex gap-3">
              <Link href="/contact"
                className="flex-1 text-center py-3 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors"
              >
                Register Now <ArrowRight size={13} className="inline ml-1" />
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

/* ══════════ STICKY SIDEBAR ══════════ */
function StickySidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
        <p className="font-heading font-bold text-dark text-base mb-1">Register Your MSME Today</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">₹0 government fee. Certificate in 1 business day. Start with a free consultation.</p>
        <div className="space-y-2 mb-5">
          {["100% Online Process", "Lifetime Valid Certificate", "Collateral-Free Loan Eligibility", "20+ Govt. Scheme Access"].map(pt => (
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
          >Book Free Consultation</Link>
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
            { label: "Govt. Fee", value: "₹0 — Free" },
            { label: "Process", value: "100% Online" },
            { label: "Authority", value: "Ministry of MSME" },
            { label: "Portal", value: "udyamregistration.gov.in" },
            { label: "Validity", value: "Lifetime" },
            { label: "Amendment", value: "Free, anytime" },
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
            { href: "#eligibility", label: "Eligibility & Categories" },
            { href: "#benefits", label: "Benefits & Schemes" },
            { href: "#documents", label: "Required Documents" },
            { href: "#process", label: "Registration Process" },
            { href: "#mistakes", label: "Common Mistakes" },
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
          {[{ v: "2000+", l: "MSMEs Registered" }, { v: "1 Day", l: "Avg. Processing" }, { v: "100%", l: "Success Rate" }, { v: "Free", l: "Govt. Fee" }].map(s => (
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
export function MSMERegistrationPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="msme-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#msme-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">MSME / Udyam Registration</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">Govt. Certified • Free Registration • 1-Day Processing</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                MSME / Udyam<br /><span className="text-primary">Registration Online</span><br />for Indian Businesses
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Register your business under Udyam and unlock collateral-free loans, government subsidies, priority procurement, and 20+ exclusive MSME benefits — completely free registration.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Register Now — It&apos;s Free <ArrowRight size={15} />
                </Link>
                <a href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to an Expert
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["₹0 Government Fee", "Lifetime Valid Certificate", "1 Business Day Processing", "20+ Scheme Benefits"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Udyam Certificate Image */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              {/* Certificate image card */}
              <div className="relative max-w-md mx-auto">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] overflow-hidden">
                  {/* Card header */}
                  <div className="bg-primary px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <BadgeCheck size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-xs">Udyam Registration Certificate</p>
                        <p className="text-white/50 text-[10px]">Ministry of Micro, Small & Medium Enterprises</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-heading font-semibold bg-green-500/20 text-green-300 border border-green-400/30 px-2.5 py-1 rounded-full">● Official</span>
                  </div>
                  {/* Certificate image — place your sample certificate here */}
                  <div className="relative w-full aspect-[4/3] bg-slate-50">
                    <Image
                      src="/images/udyam-certificate.jpg"
                      alt="Sample Udyam Registration Certificate issued by Ministry of MSME"
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                      onError={(e) => {
                        // Fallback placeholder if image not yet added
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    {/* Fallback placeholder shown until image is added */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center p-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center">
                        <BadgeCheck size={28} className="text-primary" />
                      </div>
                      
                    </div>
                  </div>
                  {/* Certificate footer */}
                  <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <p className="text-muted text-[10px]">Validity</p>
                      <p className="font-heading font-bold text-primary text-xs">Lifetime — No Renewal</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted text-[10px]">QR Verified</p>
                      <p className="font-heading font-bold text-green-600 text-xs">✓ Govt. Portal</p>
                    </div>
                  </div>
                </div>
                {/* Floating stat badges */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-5 top-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Govt. Schemes</p>
                  <p className="font-heading font-bold text-primary text-sm">20+ Benefits</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -left-5 bottom-12 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Registration Fee</p>
                  <p className="font-heading font-bold text-green-600 text-sm">₹0 — Free</p>
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

            {/* ── ELIGIBILITY & CATEGORIES ── */}
            <section id="eligibility">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Eligibility & Categories" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  MSME Classification: Micro, Small & Medium
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Classification is based on both investment in plant & machinery/equipment AND annual turnover. Both criteria must be satisfied — whichever results in the higher category applies.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                {msmeCategories.map((cat, i) => (
                  <motion.div key={cat.type} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className={`border-2 rounded-3xl p-6 hover:shadow-card transition-all ${cat.color}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${cat.iconColor}`}>
                        <cat.icon size={20} />
                      </div>
                      <span className={`text-xs font-heading font-bold px-3 py-1.5 rounded-full ${cat.badge}`}>{cat.type}</span>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="bg-white/60 rounded-xl p-3">
                        <p className="text-muted text-[10px] uppercase tracking-wider mb-0.5">Investment Limit</p>
                        <p className="font-heading font-bold text-dark text-sm">{cat.investment}</p>
                      </div>
                      <div className="bg-white/60 rounded-xl p-3">
                        <p className="text-muted text-[10px] uppercase tracking-wider mb-0.5">Annual Turnover Limit</p>
                        <p className="font-heading font-bold text-dark text-sm">{cat.turnover}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {cat.examples.map(ex => (
                        <div key={ex} className="flex items-center gap-2">
                          <CheckCircle size={12} className="text-primary shrink-0" />
                          <span className="text-dark text-xs">{ex}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Eligibility Checker */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <EligibilityChecker />
              </motion.div>

              {/* Who is eligible / not eligible */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                      <CheckCircle size={14} className="text-green-600" />
                    </div>
                    <p className="font-heading font-bold text-dark text-sm">Who Should Register</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {eligibleBusinesses.map(b => (
                      <div key={b.label} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
                        <b.icon size={13} className="text-primary shrink-0" />
                        <span className="text-dark text-xs font-heading font-medium">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                      <AlertCircle size={14} className="text-red-600" />
                    </div>
                    <p className="font-heading font-bold text-dark text-sm">Not Eligible</p>
                  </div>
                  <div className="space-y-2.5">
                    {notEligible.map(n => (
                      <div key={n} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5 text-red-500 text-[10px] font-bold">✕</span>
                        <p className="text-muted text-xs leading-relaxed">{n}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-muted text-xs leading-relaxed">Note: Joint ventures and foreign-owned entities may have specific conditions. Consult our team for clarity.</p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ── BENEFITS ── */}
            <section id="benefits">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Benefits" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  12 Benefits of Udyam Registration
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  The Udyam Certificate is your key to a wide ecosystem of government support, financial benefits, and legal protections.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

              {/* Govt Schemes */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="mt-10"
              >
                <h3 className="font-heading font-bold text-xl text-dark mb-5">Key Government Schemes for MSMEs</h3>
                <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-card bg-white">
                  <div className="grid grid-cols-3 bg-primary px-5 py-3 text-white text-[11px] font-heading font-bold uppercase tracking-wider">
                    <span>Scheme</span><span>Full Name</span><span>Key Benefit</span>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {govtSchemes.map((s, i) => (
                      <motion.div key={s.name} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                        className={`grid grid-cols-3 gap-2 px-5 py-4 hover:bg-slate-50/50 transition-colors border-l-[3px] ${s.color}`}
                      >
                        <span className="font-heading font-bold text-dark text-xs">{s.name}</span>
                        <span className="text-muted text-xs">{s.full}</span>
                        <span className="text-primary text-xs font-heading font-medium">{s.benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>

            {/* ── REQUIRED DOCUMENTS ── */}
            <section id="documents">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Documents Required" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  What You Need to Register
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  Udyam is a self-declaration process — no document uploads required. You just need the following information ready.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
                  <p className="font-heading font-semibold text-primary text-sm mb-1">No Physical Document Upload Required</p>
                  <p className="text-muted text-xs leading-relaxed">Udyam Registration is a self-declaration process on the government portal. No document scanning or uploading is needed. Investment and turnover data is auto-verified from your ITR and GSTN.</p>
                </div>
              </motion.div>
            </section>

            {/* ── PROCESS TIMELINE ── */}
            <section id="process">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Registration Process" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  How Udyam Registration Works
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  A fully online, paperless process that takes 30 minutes — and we handle the entire thing for you.
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
              {/* Timeline badge */}
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {[
                  { label: "Documents Ready", time: "Day 0", color: "bg-blue-50 border-blue-100 text-blue-700" },
                  { label: "Registration Submitted", time: "Day 1 (Morning)", color: "bg-primary/5 border-primary/20 text-primary" },
                  { label: "Certificate Delivered", time: "Day 1 (Evening)", color: "bg-green-50 border-green-100 text-green-700" },
                ].map(t => (
                  <div key={t.label} className={`border rounded-2xl p-4 text-center ${t.color}`}>
                    <p className="font-heading font-bold text-sm">{t.time}</p>
                    <p className="text-xs opacity-70 mt-0.5">{t.label}</p>
                  </div>
                ))}
              </motion.div>
            </section>

            {/* ── COMMON MISTAKES ── */}
            <section id="mistakes">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Common Mistakes" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Mistakes to Avoid During Registration
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  These errors lead to wrong classification, scheme ineligibility, or compliance issues. We verify every detail before submitting.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonMistakes.map((m, i) => (
                  <motion.div key={m.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                    className="flex items-start gap-4 p-5 border border-slate-100 rounded-2xl bg-white hover:shadow-card transition-all"
                  >
                    <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${m.color}`}>
                      <m.icon size={16} />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-dark text-sm mb-1">{m.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-5 flex items-start gap-3"
              >
                <Bell size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-semibold text-amber-800 text-sm mb-1">Post-Registration: Annual Update Obligation</p>
                  <p className="text-amber-700 text-xs leading-relaxed">After registration, your investment and turnover data must be updated annually based on your filed ITR. If your enterprise crosses the Medium Enterprise limit, it must be reported and the registration will be de-classified. Non-compliance may lead to cancellation of MSME benefits.</p>
                </div>
              </motion.div>
            </section>

            {/* ── WHY US ── */}
            <section id="why-us">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <Eyebrow label="Why Company Avenue" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark tracking-tight leading-tight mb-4">
                  Why Businesses Choose Us for MSME Registration
                </h2>
                <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">
                  The portal is free — but accuracy matters. Wrong classification or NIC code can disqualify you from lakhs in scheme benefits.
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
                  Everything business owners ask before getting their Udyam Certificate.
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
              <span className="w-6 h-px bg-accent" />Get Your Udyam Certificate<span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white leading-tight tracking-tight mb-5">
              Register Your MSME Today &<br />Unlock ₹Crores in Government Benefits
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Join 2,000+ businesses that have obtained their Udyam Certificate through Company Avenue. Zero government fees. Certificate in 1 business day. No paperwork headache.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-accent-light transition-colors shadow-lg shadow-accent/20"
              >
                Register Now — It&apos;s Free <ArrowRight size={15} />
              </Link>
              <a href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 border border-white/20 transition-colors"
              >
                <Phone size={14} /> Talk to an Expert
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {["₹0 Government Fee", "Lifetime Valid Certificate", "20+ Scheme Benefits Unlocked", "1-Day Processing"].map(pt => (
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
