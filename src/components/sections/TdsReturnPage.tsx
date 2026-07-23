"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, Clock, CheckCircle, Plus, Minus,
  Download, MessageCircle, AlertTriangle, FileText, CreditCard,
  Hash, Building2, Users, Globe, Briefcase, Monitor,
  Award, DollarSign, Headphones, UserCheck, LifeBuoy, Receipt,
  BookOpen, CalendarCheck, ShieldCheck, TrendingUp, Repeat2,
  PenLine, BadgeCheck, AlertCircle, Info, Bell, Activity,
  ChevronRight, BarChart3, RefreshCcw, Layers, Landmark,
  Wallet, Banknote, ClipboardList, FileBadge, FileCheck,
  Send, Percent, Scale, Database, Building,
} from "lucide-react";
import { faqs } from "@/lib/faqs/TdsReturnPage";

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

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const quickFacts = [
  { icon: CalendarCheck, label: "Due Dates",    value: "Quarterly" },
  { icon: FileText,      label: "Forms",         value: "24Q / 26Q / 27Q / 27EQ" },
  { icon: AlertCircle,   label: "Penalty",       value: "₹200/day (Sec 234E)" },
  { icon: Landmark,      label: "Authority",     value: "Income Tax Dept" },
  { icon: FileBadge,     label: "Certificate",   value: "Form 16 / 16A" },
  { icon: Scale,         label: "Late Fee",      value: "Max = TDS Amount" },
];

const whoNeeds = [
  { icon: Briefcase, title: "Employers Deducting Salary TDS",      desc: "Every employer paying salary above the basic exemption limit must deduct TDS under Section 192 and file Form 24Q quarterly." },
  { icon: Users,     title: "Businesses Paying Professionals",      desc: "Entities paying fees to doctors, lawyers, engineers, architects, consultants etc. above ₹30,000/year must deduct TDS under Sec 194J." },
  { icon: Building2, title: "Companies Paying Rent",               desc: "Any person (other than individual/HUF) paying rent above ₹2,40,000/year must deduct TDS @ 10% under Section 194I." },
  { icon: Globe,     title: "Buyers of Immovable Property",        desc: "Buyers of property worth ₹50 lakh or more must deduct 1% TDS under Section 194IA and file Form 26QB online." },
  { icon: DollarSign,title: "Businesses Paying Commissions",       desc: "Entities paying commission, brokerage or contract payments above threshold limits under Sec 194C and 194H must file TDS returns." },
  { icon: Landmark,  title: "Government Departments",              desc: "All Central and State government departments must compulsorily deduct TDS on all eligible payments and file quarterly returns." },
  { icon: Banknote,  title: "Banks Paying Interest",               desc: "Banks and co-operative societies paying interest above ₹40,000/year (₹50,000 for seniors) must deduct TDS under Section 194A." },
  { icon: Percent,   title: "Companies Paying Dividends",          desc: "Domestic companies distributing dividends are required to deduct TDS @ 10% under Section 194 on amounts above ₹5,000." },
];

const benefits = [
  { icon: ShieldCheck,   title: "Avoid ₹200/day Penalty",          desc: "Section 234E imposes a mandatory ₹200/day late filing fee from the due date. Professional filing ensures zero penalties." },
  { icon: FileBadge,     title: "Form 16 Generation for Employees", desc: "Timely filing enables seamless generation and distribution of Form 16/16A certificates to deductees, aiding their ITR filing." },
  { icon: Scale,         title: "Avoid Prosecution Risk",           desc: "Consistent non-deduction or non-filing of TDS returns can result in prosecution under Section 276B with rigorous imprisonment." },
  { icon: BadgeCheck,    title: "Maintain Clean IT Record",         desc: "A clean TDS filing history reflects positively on your business compliance profile with the Income Tax Department." },
  { icon: Users,         title: "Stronger Vendor Relations (Form 16A)", desc: "Timely Form 16A issuance builds trust with contractors and service providers who rely on it for claiming TDS credit." },
  { icon: RefreshCcw,    title: "Accurate 26AS Matching",           desc: "Correct TDS filing ensures deductees' 26AS accurately reflects their TDS credit, preventing ITC mismatches during assessments." },
  { icon: AlertTriangle, title: "Avoid 40% Expense Disallowance",   desc: "Section 40(a)(ia) disallows 30-40% of expenses where TDS was not deducted or deposited. Proper compliance protects your P&L." },
  { icon: TrendingUp,    title: "Maintain Compliance Rating",       desc: "Banks, NBFC lenders, and government tenders increasingly scrutinise TDS compliance history during credit and eligibility assessments." },
];

const processSteps = [
  { n: "01", title: "Gather Payment Data",        desc: "Collect all payment records — salary, professional fees, rent, contract payments, commissions — for the quarter. Identify each deductee's PAN and payment category." },
  { n: "02", title: "Calculate TDS Liability",    desc: "Apply the correct TDS rate per section (192, 194C, 194J, etc.) to each payment. Account for lower deduction certificates (Form 13) and Nil deduction cases." },
  { n: "03", title: "Pay TDS Challan (ITNS 281)", desc: "Deposit the calculated TDS amount with the government via Challan ITNS 281 through authorised banks or the IT portal. Monthly deadlines apply (7th of next month, March by 30th April)." },
  { n: "04", title: "Prepare e-TDS Return",       desc: "Prepare the quarterly TDS return file (24Q for salary, 26Q for non-salary residents, 27Q for non-residents, 27EQ for TCS) using NSDL's RPU utility." },
  { n: "05", title: "File on TRACES / Income Tax Portal", desc: "Upload the prepared .fvu file on the Income Tax e-filing portal. Validate using DSC or EVC. Obtain the 15-digit token number as acknowledgment." },
  { n: "06", title: "Generate Form 16 / 16A",    desc: "After successful filing and challan matching on TRACES, download and generate Form 16 (salary) and Form 16A (non-salary) certificates for all deductees." },
  { n: "07", title: "Distribute to Deductees",   desc: "Issue Form 16/16A to respective employees, contractors, and service providers within the prescribed deadline. Employees need Form 16 for ITR filing." },
  { n: "08", title: "Reconcile with 26AS",        desc: "Verify that TDS credits appear correctly in each deductee's 26AS / Annual Information Statement (AIS) on the IT portal. Raise TRACES correction if discrepancies found." },
];

const requiredDocs = [
  { icon: FileBadge,    label: "TAN Certificate" },
  { icon: Receipt,      label: "Challan Payment Receipts (ITNS 281)" },
  { icon: Hash,         label: "Deductee PAN List" },
  { icon: CalendarCheck,label: "Payment Details with Dates & Amounts" },
  { icon: CreditCard,   label: "Bank Statements" },
  { icon: FileText,     label: "Previous Quarter TDS Return Files" },
  { icon: ClipboardList,label: "Salary Register / Payment Vouchers" },
  { icon: Database,     label: "Lower Deduction Certificates (if any)" },
];

const timelineStages = [
  { stage: "01", title: "Data Collection",     desc: "Gather all quarterly payment records, deductee PAN details and challan information." },
  { stage: "02", title: "TDS Calculation",     desc: "Compute correct TDS for each payment type applying applicable section rates and thresholds." },
  { stage: "03", title: "Challan Payment",     desc: "Deposit TDS with government via ITNS 281 before the 7th of the following month." },
  { stage: "04", title: "Return Preparation",  desc: "Prepare validated .fvu file using RPU utility with all deductee and challan details mapped." },
  { stage: "05", title: "TRACES Filing",       desc: "Upload return on IT portal, authenticate via DSC/EVC and obtain 15-digit acknowledgment token." },
  { stage: "06", title: "Certificate Issuance", desc: "Download and issue Form 16/16A to all deductees within the prescribed due date." },
];

const deliverables = [
  "Filed TDS Return (24Q / 26Q / 27Q / 27EQ) with acknowledgment token",
  "Form 16 certificates for all salaried employees (annual / Part A & B)",
  "Form 16A for all non-salary deductees (contractors, professionals, landlords)",
  "Challan payment receipts and BIN (BSR code + date + serial + amount)",
  "TRACES portal acknowledgment and token number",
  "26AS matching verification report per deductee",
  "Correction return (if required) for rectifying any errors",
  "Quarterly compliance summary with section-wise TDS breakup",
];

const whyUsPoints = [
  { icon: Award,       label: "15+ Years of TDS Compliance Experience" },
  { icon: UserCheck,   label: "Dedicated TDS Compliance Manager" },
  { icon: Bell,        label: "Auto Reminders for Quarterly Due Dates" },
  { icon: RefreshCcw,  label: "26AS Reconciliation Included" },
  { icon: DollarSign,  label: "Transparent Fixed Quarterly Pricing" },
  { icon: LifeBuoy,    label: "Year-round Support & Corrections" },
  { icon: Monitor,     label: "100% Digital — No Physical Visit Required" },
  { icon: Headphones,  label: "24-Hour Average Response Time" },
];

const relatedServices = [
  { id: "gst-filing",           title: "GST Return Filing",      desc: "Monthly & quarterly GST returns." },
  { id: "income-tax-return",    title: "Income Tax Return",      desc: "ITR for individuals & businesses." },
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping", desc: "Accurate books & MIS reports." },
  { id: "payroll-management",   title: "Payroll Management",     desc: "Salary, PF, ESI & TDS managed." },
  { id: "tax-audit",            title: "Tax Audit (Sec 44AB)",   desc: "Statutory audit by practicing CA." },
  { id: "advance-tax",          title: "Advance Tax Planning",   desc: "Quarterly advance tax computation." },
];


/* ─── FAQ Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
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
        <p className="font-heading font-bold text-dark text-base mb-1">File TDS Returns On Time</p>
        <p className="text-muted text-xs mb-4 leading-relaxed">Avoid ₹200/day penalty. We handle your quarterly TDS filing end-to-end.</p>
        <div className="space-y-2 mb-5">
          {["Quarterly Filing Managed", "Form 16/16A Generation", "26AS Reconciliation", "Zero Late Fee Guarantee"].map(pt => (
            <div key={pt} className="flex items-center gap-2">
              <CheckCircle size={13} className="text-primary shrink-0" />
              <span className="text-dark text-xs">{pt}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <a href="tel:+919953719111" data-track="call"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
          >
            <Phone size={13} /> Call Now
          </a>
          <Link href="/contact"
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          >
            Book Consultation
          </Link>
          <a href="https://wa.me/919953719111" data-track="whatsapp" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={13} /> WhatsApp Us
          </a>
        </div>
      </div>

      <div className="bg-primary rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Wallet size={16} className="text-accent" />
          <p className="font-heading font-semibold text-sm">Starting at ₹2,499</p>
        </div>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">Per quarter. Includes filing, challan reconciliation, and Form 16/16A generation.</p>
        <Link href="/contact" className="w-full py-2.5 bg-accent text-dark text-xs font-heading font-bold rounded-xl transition-colors flex items-center justify-center gap-2 hover:bg-amber-400">
          Get Started <ArrowRight size={13} />
        </Link>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "5,000+", l: "Returns Filed" }, { v: "100%", l: "On-time" }, { v: "15+", l: "Years Exp." }, { v: "24h", l: "Response" }].map(s => (
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
export function TdsReturnPage() {
  return (
    <div className="bg-white" itemScope itemType="https://schema.org/FAQPage">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="tds-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#tds-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>

        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">TDS Return Filing</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">TDS Experts • Zero Penalty Filing • PAN India</span>
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                TDS Return Filing<br /><span className="text-primary">Stress-Free & On Time</span>
              </motion.h1>

              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Avoid the ₹200/day Section 234E penalty. We handle your complete quarterly TDS compliance — from challan payment and return filing on TRACES to Form 16/16A generation and 26AS reconciliation.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  File TDS Return <ArrowRight size={15} />
                </Link>
                <a href="tel:+919953719111" data-track="call"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to TDS Expert
                </a>
              </motion.div>

              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["24Q / 26Q / 27Q / 27EQ", "Form 16 & 16A Generation", "TRACES Reconciliation", "Correction Returns"].map(pt => (
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
                      <FileBadge size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm">TDS Compliance Snapshot</p>
                      <p className="text-muted text-xs">Company Avenue Advisory</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Active
                  </span>
                </div>
                <div className="space-y-2.5 mb-5">
                  {[
                    { label: "Return Forms", value: "24Q / 26Q / 27Q / 27EQ" },
                    { label: "Filing Frequency", value: "Quarterly" },
                    { label: "Penalty Risk", value: "₹200/day (Sec 234E)" },
                    { label: "TDS Certificate", value: "Form 16 / Form 16A" },
                  ].map((item, i) => (
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
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted font-heading font-semibold">Compliance Health</p>
                    <span className="text-xs text-green-600 font-heading font-bold">Compliant</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-green-500 rounded-full"
                      initial={{ width: 0 }} animate={{ width: "95%" }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                    />
                  </div>
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

      {/* ── WHAT IS TDS RETURN FILING ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=85"
                  alt="TDS return filing and tax compliance India"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                <p className="font-heading font-bold text-2xl">5,000+</p>
                <p className="text-white/60 text-xs">TDS Returns Filed</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Eyebrow label="Overview" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                What is TDS Return Filing?
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                <strong>Tax Deducted at Source (TDS)</strong> is a mechanism under the Income Tax Act where the payer (deductor) deducts a percentage of tax from each payment — salary, professional fees, rent, interest, contract payments — and deposits it with the Central Government on behalf of the payee (deductee).
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                Every TAN holder must file <strong>quarterly TDS returns</strong> reporting all deductions made during the quarter. The return maps each payment to the deductee&apos;s PAN and the challan through which TDS was deposited, enabling the government and deductees to verify tax credits in <strong>Form 26AS / AIS</strong>.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Failure to file on time attracts a <strong>mandatory ₹200/day fee</strong> under Section 234E — with no provision for waiver. Non-deduction risks 40% expense disallowance plus interest under Section 201(1A).
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Quarterly Return Filing", "Challan Reconciliation", "Form 16 / 16A Issue", "26AS Matching"].map(pt => (
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
            <Eyebrow label="Applicability" />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">Who Needs to File TDS Returns?</h2>
            <p className="text-muted text-base max-w-2xl mx-auto">Any entity that deducts TDS from payments is legally required to file quarterly TDS returns. Here are the most common categories.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoNeeds.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/15 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                    <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{item.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
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
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-3">Benefits of Timely TDS Return Filing</h2>
            <p className="text-muted text-base max-w-2xl mx-auto">Timely TDS compliance protects your business from financial penalties, legal risk and damaged professional relationships.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:bg-white hover:border-primary/15 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                    <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{item.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TWO-COLUMN: MAIN + STICKY SIDEBAR ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* PROCESS STEPS */}
            <section>
              <Eyebrow label="Filing Process" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">TDS Return Filing — Step by Step</h2>
              <div className="relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200" aria-hidden="true" />
                <div className="space-y-6">
                  {processSteps.map((step, i) => (
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

            {/* DOCUMENTS REQUIRED */}
            <section>
              <Eyebrow label="Documents Required" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">Documents for TDS Return Filing</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
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
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <Info size={15} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">
                    <strong>Important:</strong> Ensure all deductee PAN numbers are correct before filing. Wrong PANs result in TDS at the higher rate of 20% and deny deductees their 26AS credit.
                  </p>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section>
              <Eyebrow label="Timeline" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">TDS Filing Timeline — 6 Key Stages</h2>
              <div className="relative">
                {/* connecting line */}
                <div className="hidden md:block absolute top-[28px] left-[14%] right-[14%] h-px bg-slate-200" aria-hidden="true" />
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {timelineStages.map((s, i) => (
                    <motion.div key={s.stage} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-primary text-white font-heading font-bold text-sm flex items-center justify-center mb-3 shadow-sm z-10 relative border-4 border-white">
                        {s.stage}
                      </div>
                      <p className="font-heading font-bold text-dark text-xs mb-1 leading-snug">{s.title}</p>
                      <p className="text-muted text-[11px] leading-snug">{s.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* WHAT YOU RECEIVE */}
            <section>
              <Eyebrow label="Deliverables" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-10">What You Receive</h2>
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-card">
                <div className="space-y-3">
                  {deliverables.map((d, i) => (
                    <motion.div key={i} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle size={12} className="text-primary" />
                      </div>
                      <span className="text-dark text-sm leading-snug">{d}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                  <div>
                    <p className="font-heading font-bold text-dark text-base">Starting at ₹2,499 / quarter</p>
                    <p className="text-muted text-xs">All-inclusive. No hidden charges.</p>
                  </div>
                  <Link href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors"
                  >
                    Get Started <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </section>

            {/* WHY COMPANY AVENUE */}
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Eyebrow label="Why Us" />
                  <h2 className="font-heading font-bold text-3xl text-dark mb-8">Why Choose Company Avenue for TDS Filing?</h2>
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
                    { v: "5,000+", l: "TDS Returns Filed", c: "bg-primary text-white" },
                    { v: "₹0",     l: "Late Penalties",    c: "bg-accent text-dark" },
                    { v: "15+",    l: "Years Experience",  c: "bg-slate-800 text-white" },
                    { v: "24 hrs", l: "Response Time",     c: "bg-green-600 text-white" },
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

            {/* PENALTY EXPLAINER */}
            <section>
              <Eyebrow label="Penalty & Risk" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">Consequences of TDS Non-Compliance</h2>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-dark text-sm leading-relaxed">
                  <strong>Warning:</strong> TDS non-compliance triggers ₹200/day mandatory fees, interest, 40% expense disallowance, prosecution risk and denied tax credit for deductees. Protect your compliance record.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: AlertCircle,   title: "Section 234E Late Fee",       desc: "₹200/day from due date to actual filing. Cannot be waived. Maximum capped at TDS amount. Automatic system levy.",                color: "text-red-600 bg-red-50" },
                  { icon: TrendingUp,    title: "Interest under Sec 201(1A)",   desc: "1% per month on undeducted TDS and 1.5% per month on deducted-but-not-deposited TDS from due date to payment date.", color: "text-orange-600 bg-orange-50" },
                  { icon: Scale,         title: "40% Expense Disallowance",    desc: "Section 40(a)(ia) disallows 30% of payments where TDS was not deducted — directly impacting your taxable income.",       color: "text-amber-600 bg-amber-50" },
                  { icon: BadgeCheck,    title: "Assessee-in-Default Status",  desc: "Company becomes liable for the TDS amount plus interest, treated as tax dues recoverable via demand notice under Sec 201.", color: "text-purple-600 bg-purple-50" },
                  { icon: AlertTriangle, title: "Prosecution under Sec 276B",  desc: "Wilful failure to deposit TDS can result in rigorous imprisonment of 3 months to 7 years plus fine under Sec 276B.",      color: "text-rose-600 bg-rose-50" },
                  { icon: Activity,      title: "Deductee 26AS Credit Denied", desc: "If return is not filed or wrong PAN used, deductees cannot claim TDS credit — creating liability disputes and undue hardship.", color: "text-blue-600 bg-blue-50" },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div key={p.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true }}
                      className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card transition-all group"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${p.color}`}>
                        <Icon size={15} />
                      </div>
                      <p className="font-heading font-bold text-dark text-sm mb-1">{p.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{p.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* TDS FORMS GUIDE */}
            <section>
              <Eyebrow label="TDS Forms Guide" />
              <h2 className="font-heading font-bold text-3xl text-dark mb-6">TDS Return Forms — Complete Guide</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { form: "Form 24Q", badge: "bg-blue-600 text-white", color: "bg-blue-50 border-blue-100", sub: "Quarterly — Salary TDS", desc: "Filed by employers deducting TDS from employee salaries under Section 192. Contains annex I (challan details) and annex II (employee salary breakup, deductions). Due quarterly." },
                  { form: "Form 26Q", badge: "bg-primary text-white", color: "bg-primary/5 border-primary/20", sub: "Quarterly — Non-Salary (Residents)", desc: "Filed for TDS on payments to resident individuals and entities — professional fees (194J), rent (194I), interest (194A), contract (194C), commission (194H), dividend, etc." },
                  { form: "Form 27Q", badge: "bg-purple-600 text-white", color: "bg-purple-50 border-purple-100", sub: "Quarterly — Non-Residents", desc: "Filed for TDS deducted on payments to non-residents and foreign companies under Chapter XVII-B — royalty, technical fees, interest, capital gains (DTAA provisions apply)." },
                  { form: "Form 27EQ", badge: "bg-green-600 text-white", color: "bg-green-50 border-green-100", sub: "Quarterly — TCS", desc: "Filed by sellers collecting Tax Collected at Source (TCS) under Section 206C — on sale of scrap, timber, minerals, liquor, vehicles above ₹10L, overseas remittances above ₹7L." },
                ].map((item, i) => (
                  <motion.div key={item.form} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="show" viewport={{ once: true }}
                    className={`border rounded-2xl p-6 hover:shadow-card transition-all ${item.color}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-heading font-bold px-3 py-1 rounded-full ${item.badge}`}>{item.form}</span>
                      <span className="text-muted text-xs">{item.sub}</span>
                    </div>
                    <p className="text-dark text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section itemScope itemType="https://schema.org/FAQPage">
              <div className="text-center mb-10">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions</h2>
                <p className="text-muted text-base mt-3 max-w-lg mx-auto">Everything you need to know about TDS return filing, forms, penalties and compliance in India.</p>
              </div>
              <div className="space-y-2">
                {faqs.map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
              </div>
            </section>

          </div>{/* end main content */}
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
      <section className="py-24 bg-[#0F2D52] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="cta-tds" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#cta-tds)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Eyebrow label="Get Started Today" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Never Pay ₹200/Day Penalty Again<br /><span className="text-accent">File TDS Returns On Time</span>
            </h2>
            <p className="text-white/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              Company Avenue Advisory handles your complete quarterly TDS compliance — from challan payments and TRACES filing to Form 16/16A generation and 26AS reconciliation. Starting at ₹2,499 per quarter.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors"
              >
                File My TDS Return <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111" data-track="call"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone size={14} /> Talk to a TDS Expert
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
