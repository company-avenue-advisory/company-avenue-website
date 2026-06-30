"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FileText, CalendarCheck, AlertTriangle, TrendingUp, ShieldCheck,
  BookOpen, CheckCircle, Plus, Minus, ArrowRight, Phone,
  Clock, Award, UserCheck, Headphones, LifeBuoy, Monitor,
  DollarSign, Receipt, BarChart3, RefreshCcw, CreditCard,
  Briefcase, Users, Building2, Globe, Hash, PenLine,
  BadgeCheck, Bell, Activity, ChevronRight, Zap,
  Edit3, XCircle, AlertCircle, RotateCcw, FileMinus,
  Layers, Store, Merge, Shuffle, ToggleLeft, Ban,
  FileX, FileCheck, FileClock, FileSearch, ClipboardList,
  Landmark, Home, Scale, Archive, Trash2, ReceiptText,
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

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */

const quickFacts = [
  { icon: Globe,        label: "GST Portal",          value: "gst.gov.in" },
  { icon: Edit3,        label: "Amendment Form",       value: "REG-14" },
  { icon: FileX,        label: "Cancellation Form",    value: "REG-16" },
  { icon: Clock,        label: "Processing Time",      value: "15 working days" },
  { icon: UserCheck,    label: "Approving Authority",  value: "GST Officer" },
  { icon: CalendarCheck,label: "Effective Date",       value: "Date of order" },
];

const whoNeeds = [
  { icon: Home,         title: "Businesses Changing Address",       desc: "Any change in principal or additional place of business address requires amendment in GST registration to maintain accurate records." },
  { icon: PenLine,      title: "Businesses Changing Trade Name",    desc: "If the trade name, brand name, or legal name of the business is updated, GST registration must be amended via REG-14 accordingly." },
  { icon: Shuffle,      title: "Changing Business Constitution",    desc: "Proprietorship converting to LLP or partnership converting to private limited company must update constitution-related details where permissible." },
  { icon: Archive,      title: "Businesses Closing Down",           desc: "Any business permanently discontinuing operations, winding up, or dissolving must apply for voluntary cancellation via Form REG-16." },
  { icon: Ban,          title: "Dormant Businesses (No Turnover)",  desc: "Businesses that have been dormant for extended periods with no taxable supplies and no intention to resume may apply for cancellation." },
  { icon: TrendingUp,   title: "Below Threshold Limit",             desc: "Businesses whose aggregate turnover drops below the GST registration threshold (₹20 lakh / ₹40 lakh for goods) can apply for cancellation." },
  { icon: ToggleLeft,   title: "Composition Scheme Switchers",      desc: "Businesses switching to or from the composition scheme must update their registration category; wrong categorisation leads to compliance issues." },
  { icon: Merge,        title: "Merged / Acquired Businesses",      desc: "Post-merger or acquisition, the acquired entity's GSTIN must be cancelled and supplies transferred to the surviving entity's registration." },
];

const benefits = [
  { icon: ShieldCheck,  title: "Maintain Accurate GST Records",      desc: "Correct details on your GSTIN ensure all business transactions, e-way bills, and ITC flows are correctly attributed without disputes." },
  { icon: Bell,         title: "Avoid Notices for Incorrect Details", desc: "GST officers regularly verify registration details. Outdated information—wrong address, old trade name—triggers notices and scrutiny." },
  { icon: BadgeCheck,   title: "Clean GSTIN Status",                  desc: "An active, correctly registered GSTIN improves vendor trust, smoothens B2B transactions, and simplifies bank financing." },
  { icon: AlertCircle,  title: "Avoid Prosecution for Fake GSTINs",  desc: "Continuing to use a GSTIN after business closure or showing a cancelled GSTIN as active in invoices attracts penalties under Section 122." },
  { icon: RefreshCcw,   title: "Proper ITC Reconciliation",           desc: "Correct registration details ensure GSTR-2B data flows accurately to buyers, preserving their ITC eligibility without mismatch notices." },
  { icon: FileMinus,    title: "Eliminate Unnecessary Compliance",    desc: "After cancellation, the obligation to file monthly/quarterly GST returns ends, reducing administrative burden and late fee risk." },
  { icon: BookOpen,     title: "Clean Books After Closure",           desc: "Proper cancellation with GSTR-10 (final return) ensures complete ITC reversal and a clean audit trail for wound-up businesses." },
  { icon: Scale,        title: "Regulatory Compliance Maintained",    desc: "Both amendment and cancellation done correctly protect directors, partners, and proprietors from personal liability for GST non-compliance." },
];

const processSteps = [
  { n: "01", title: "Login to GST Portal",              desc: "Access gst.gov.in with your GST credentials. Navigate to 'Services > Registration > Amendment of Registration' or 'Cancellation of Registration'." },
  { n: "02", title: "File REG-14 with Changes",         desc: "For amendments, select the field to be changed (core vs non-core), enter the corrected details, and upload supporting documents." },
  { n: "03", title: "Upload Supporting Documents",      desc: "Attach proof of address change (electricity bill, rent agreement), name change certificate, MOA amendment, or other applicable documents." },
  { n: "04", title: "GST Officer Review & Approval",    desc: "The jurisdictional GST officer reviews the application within 15 working days. May issue REG-03 (notice for clarification); respond via REG-04." },
  { n: "05", title: "Apply REG-16 for Cancellation",    desc: "For cancellation, file REG-16 stating reason—business closure, turnover below threshold, merger, or voluntary cancellation after fulfilment of obligations." },
  { n: "06", title: "File All Pending Returns",         desc: "Before cancellation is approved, ensure all GSTR-1, GSTR-3B, and any other pending returns up to the date of application are filed and taxes paid." },
  { n: "07", title: "Pay Outstanding GST Liability",    desc: "Discharge all outstanding GST dues including interest and late fees. The system will not allow cancellation with pending tax liability." },
  { n: "08", title: "Receive REG-19 + File GSTR-10",   desc: "Once the officer issues REG-19 (Cancellation Order), file GSTR-10 (Final Return) within 3 months, declaring stock on hand and reversing ITC." },
];

const amendmentDocs = [
  { icon: Home,       label: "Proof of address change (electricity bill / rent agreement / lease deed)" },
  { icon: PenLine,    label: "Name change certificate from MCA / registrar" },
  { icon: FileText,   label: "MOA / AOA amendment (for companies changing authorised capital or objects)" },
  { icon: Users,      label: "Board resolution for change (for companies / LLPs)" },
  { icon: UserCheck,  label: "Partner/director addition: PAN, Aadhaar, photo of new partner/director" },
  { icon: Globe,      label: "Additional place of business proof (NOC + address proof)" },
];

const cancellationDocs = [
  { icon: FileText,    label: "Cancellation reason letter on business letterhead" },
  { icon: BookOpen,    label: "Details of last filed return (period, ARN, date)" },
  { icon: BarChart3,   label: "Stock statement as on cancellation date (for GSTR-10)" },
  { icon: CreditCard,  label: "Bank statement (last 3 months for verification)" },
  { icon: ClipboardList, label: "Details of capital goods / inputs on which ITC was claimed" },
  { icon: ReceiptText, label: "Final dues payment challan (if outstanding)" },
];

const timeline = [
  { stage: "01", label: "Application Filing",        period: "Day 1",             desc: "Submit REG-14 (amendment) or REG-16 (cancellation) on the GST portal with all required documents." },
  { stage: "02", label: "Officer Review",             period: "Days 1–7",          desc: "Jurisdictional GST officer examines the application and documents. Status reflects as 'Pending for Processing'." },
  { stage: "03", label: "Clarification (if needed)", period: "Days 7–10",         desc: "If the officer issues REG-03 seeking clarification or additional documents, respond via REG-04 within 7 working days." },
  { stage: "04", label: "Approval / Rejection",      period: "By Day 15",         desc: "Officer issues approval order. If rejected, grounds are stated and you may rectify and refile. Most amendments are approved within 7–10 days." },
  { stage: "05", label: "Certificate Update",         period: "Day 15–17",         desc: "For amendments: updated GST registration certificate is available on the portal. For cancellations: REG-19 order issued." },
  { stage: "06", label: "Post-approval Actions",      period: "Within 3 months",   desc: "For cancellations: file GSTR-10 (final return) within 3 months of REG-19 date; declare and reverse ITC on remaining stock." },
];

const deliverables = [
  { icon: FileCheck,    label: "Amended GST Registration Certificate (updated)" },
  { icon: Monitor,      label: "Updated GSTIN records on GST portal confirmed" },
  { icon: FileX,        label: "REG-19 Cancellation Order (for cancellation cases)" },
  { icon: FileClock,    label: "GSTR-10 Final Return filing (for cancelled registrations)" },
];

const whyUs = [
  "Experienced GST practitioners with deep knowledge of REG-14, REG-16, and GSTR-10 procedures",
  "Core vs non-core field classification guidance — we identify which changes require officer approval",
  "Complete document checklist and preparation assistance for error-free first-time submission",
  "Tracking of application status and proactive response to REG-03 clarification notices",
  "Pending return compliance check before cancellation to avoid rejection",
  "ITC reversal computation on remaining stock and capital goods for GSTR-10 accuracy",
  "End-to-end support from filing to final order — no back-and-forth for you",
  "Post-cancellation advisory on ongoing obligations (GSTR-10 deadline, ITC recovery by department)",
];

const faqs = [
  {
    q: "What fields can be amended in GST registration?",
    a: "GST registration fields are classified as 'core' and 'non-core'. Non-core fields (email, phone, bank details, additional places of business within the same state) can be amended online without officer approval and take effect immediately. Core fields—legal name, principal place of business, addition or deletion of partners/directors, business constitution—require submission of REG-14, document upload, and officer approval within 15 working days."
  },
  {
    q: "What cannot be amended in GST registration?",
    a: "The PAN linked to a GST registration cannot be amended under any circumstances, as GSTIN is PAN-based. If PAN changes (e.g., proprietorship to company), a fresh GST registration is required. Similarly, the state of registration cannot be changed through amendment—inter-state migration requires a fresh registration in the new state and cancellation of the old one. Constitution of business (e.g., individual to HUF) also requires fresh registration."
  },
  {
    q: "How long does a GST amendment take?",
    a: "Non-core field amendments take effect immediately upon submission without requiring officer approval. Core field amendments are processed within 15 working days from the date of REG-14 filing. If the officer issues a clarification notice (REG-03), the 15-day clock restarts from the date you respond via REG-04. In practice, most amendments are approved within 7–10 working days in the absence of discrepancies."
  },
  {
    q: "Can I cancel my GST registration voluntarily?",
    a: "Yes. Any GST-registered taxpayer can apply for voluntary cancellation by filing REG-16 on the GST portal if they have discontinued business, transferred the business (merger, sale), or their turnover has permanently fallen below the registration threshold. However, before cancellation, all pending GSTR-1, GSTR-3B returns must be filed, all outstanding tax/interest paid, and GSTR-10 must be filed after the cancellation order."
  },
  {
    q: "What is the difference between GST suspension and cancellation?",
    a: "GST suspension is a temporary status where the GSTIN is blocked—usually triggered by non-filing of returns (GSTR-3B not filed for 6 consecutive months for monthly filers). During suspension, the taxpayer cannot make taxable supplies and buyers cannot claim ITC on purchases from the suspended GSTIN. Cancellation is a permanent removal of the GSTIN. Suspension can be reversed by filing pending returns; cancellation requires revocation (REG-21) within 30 days or a High Court order after 90 days."
  },
  {
    q: "What pending returns must be filed before cancellation?",
    a: "All GSTR-1 (outward supply details) and GSTR-3B (tax summary) returns must be filed up to the date of the cancellation application. If you are under the QRMP scheme, all quarterly returns and IFF entries must be current. The GST portal will not allow the cancellation application to be submitted if there are outstanding returns. Additionally, all tax, interest, and late fees must be cleared."
  },
  {
    q: "How can I revoke a GST cancellation?",
    a: "If your GST registration was cancelled by the tax officer (suo motu cancellation for non-compliance), you can apply for revocation within 30 days of the cancellation order using Form REG-21. The application must include a reason for revocation, compliance with pending returns, and payment of dues. After 30 days but within 90 days, revocation is allowed with the Additional Commissioner's approval. Beyond 90 days, a High Court writ petition (mandamus) is required."
  },
  {
    q: "What ITC must be reversed upon GST cancellation?",
    a: "At the time of cancellation, the taxpayer must reverse Input Tax Credit on: (1) stock of goods on hand as on the cancellation date (inputs in finished goods, semi-finished goods, raw materials); (2) capital goods on which ITC was claimed, proportionate to remaining useful life; and (3) any transitional credit claimed. The amount of ITC reversal is declared in GSTR-10 (final return). Failure to reverse leads to demand with interest and penalty."
  },
  {
    q: "What is GSTR-10 and when must it be filed?",
    a: "GSTR-10 is the Final Return that every cancelled GST taxpayer must file within 3 months of the date of the cancellation order (REG-19) or the effective date of cancellation, whichever is later. It contains details of closing stock (inputs, semi-finished and finished goods, capital goods), ITC reversed on such stock, and tax payable. Non-filing of GSTR-10 attracts a late fee of ₹200/day (₹100 CGST + ₹100 SGST) after the due date."
  },
  {
    q: "What is the difference between a GST inactive GSTIN and a cancelled GSTIN?",
    a: "An 'inactive' or 'suspended' GSTIN occurs when a taxpayer fails to file returns for a specified period—6 consecutive GSTR-3B months for monthly filers—and the portal auto-suspends the registration. The GSTIN still exists but is blocked. A 'cancelled' GSTIN is permanently removed from the GST system after REG-19 is issued. Buyers cannot claim ITC from either, but the consequences differ: suspension is reversible upon filing returns; cancellation requires formal revocation."
  },
  {
    q: "Can I add a new place of business through amendment?",
    a: "Yes. Adding an additional place of business (warehouse, branch, factory) within the same state as the principal place of business can be done through a non-core amendment (immediate effect). Adding a place of business in a different state requires a fresh GST registration in that state—multi-state businesses must maintain separate GSTINs for each state where they have operations, as GST is a state-level tax."
  },
  {
    q: "Will my existing GST certificates and ARNs remain valid after amendment?",
    a: "After a core field amendment is approved, the GST portal issues a fresh registration certificate reflecting the updated details. The GSTIN number itself does not change—only the details on the certificate are updated. All previously filed returns, challan payments, and ARNs remain valid and linked to the GSTIN. Your buyers' ITC already claimed using your old invoices remains valid."
  },
];

const relatedServices = [
  { id: "gst-filing",             title: "GST Return Filing",       desc: "Monthly, quarterly & annual GST returns." },
  { id: "gst-registration",       title: "GST Registration",        desc: "New GSTIN for your business quickly." },
  { id: "accounting-bookkeeping", title: "Accounting & Bookkeeping", desc: "Accurate books, MIS & statements." },
  { id: "tds-return",             title: "TDS Return Filing",       desc: "Quarterly TDS returns on time." },
  { id: "income-tax-return",      title: "Income Tax Return",       desc: "Expert ITR filing for all categories." },
  { id: "roc-compliance",         title: "Annual ROC Compliance",   desc: "Secretarial & statutory filings." },
];

/* ══════════════════════════════════════════════════════════
   FAQ ITEM
══════════════════════════════════════════════════════════ */
function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp} custom={i}
      className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-full bg-primary/8 flex items-center justify-center text-primary">
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 pt-1 bg-white text-muted text-sm leading-relaxed border-t border-slate-100">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export function GstAmendmentPage() {
  return (
    <main className="overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-[#081726] pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] rounded-full bg-primary/30 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            variants={fadeUp} initial="hidden" animate="show"
            className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-heading"
          >
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-accent">GST Amendment / Cancellation</span>
          </motion.nav>

          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
              <Eyebrow label="GST Registration Services" />
            </motion.div>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-4xl md:text-5xl lg:text-[54px] font-heading font-extrabold text-white leading-tight mb-5"
            >
              GST Registration{" "}
              <span className="text-accent">Amendment &amp; Cancellation</span>
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl"
            >
              Expert filing of REG-14 (amendment) and REG-16 (cancellation) on the GST portal —
              from core field changes and address updates to voluntary cancellation, GSTR-10 final
              return, and complete ITC reversal compliance.
            </motion.p>
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={4}
              className="flex flex-wrap gap-3"
            >
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-[#081726] font-heading font-bold px-7 py-3.5 rounded-xl hover:bg-amber-400 transition-colors text-sm"
              >
                Get Started — ₹1,499 <ArrowRight size={15} />
              </Link>
              <a href="tel:+919876543210"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-heading font-semibold px-7 py-3.5 rounded-xl hover:border-accent hover:text-accent transition-colors text-sm"
              >
                <Phone size={14} /> Call an Expert
              </a>
            </motion.div>
          </div>

          {/* Quick Fact Cards */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={5}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-14"
          >
            {quickFacts.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label} variants={fadeUp} custom={6 + i}
                initial="hidden" animate="show"
                className="bg-white/6 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm"
              >
                <Icon size={22} className="text-accent mx-auto mb-2" />
                <p className="text-white font-heading font-bold text-sm leading-tight">{value}</p>
                <p className="text-slate-400 text-[10px] mt-1 font-heading">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS GST AMENDMENT / CANCELLATION ────────────── */}
      <section className="bg-white py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Understanding the Process" />
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-5 leading-tight">
                What Is GST Amendment &amp; Cancellation?
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                <strong className="text-dark">GST Amendment</strong> (Form REG-14) is the formal
                process of updating incorrect or changed details in your GST registration certificate —
                such as business address, trade name, partners/directors, or additional places of
                business. GST registration details are not static; businesses evolve, and the
                registration must accurately reflect current reality to avoid compliance issues.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                <strong className="text-dark">GST Cancellation</strong> (Form REG-16) is the permanent
                removal of a GSTIN from the tax system when a business discontinues, merges with
                another entity, or voluntarily opts out because its turnover falls below the{" "}
                <strong className="text-dark">mandatory registration threshold</strong>. Cancellation
                must be accompanied by GSTR-10 (Final Return) filed within 3 months of the
                cancellation order (REG-19).
              </p>
              <p className="text-muted leading-relaxed mb-6">
                Both processes are critical — incorrect registration details trigger GST notices
                and ITC disputes; failure to cancel a dormant GSTIN accumulates late filing fees
                and potential prosecution. Company Avenue Advisory handles both end-to-end.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white font-heading font-semibold px-6 py-3 rounded-xl hover:bg-[#0a2444] transition-colors text-sm"
                >
                  Start My Application <ArrowRight size={14} />
                </Link>
                <a href="tel:+919876543210"
                  className="inline-flex items-center gap-2 border border-slate-200 text-dark font-heading font-semibold px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-colors text-sm"
                >
                  <Phone size={14} /> Speak to an Expert
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" custom={2} viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden h-[460px] shadow-card"
            >
              <Image
                src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&q=85"
                alt="GST registration form on laptop"
                fill sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081726]/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                    <Edit3 size={20} className="text-accent mx-auto mb-2" />
                    <p className="text-white font-heading font-bold text-xs">Amendment</p>
                    <p className="text-slate-300 text-[10px] mt-1">REG-14 form</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                    <XCircle size={20} className="text-accent mx-auto mb-2" />
                    <p className="text-white font-heading font-bold text-xs">Cancellation</p>
                    <p className="text-slate-300 text-[10px] mt-1">REG-16 form</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHO NEEDS THIS ───────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Who It Applies To" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              Who Needs GST Amendment or Cancellation?
            </h2>
            <p className="text-muted leading-relaxed">
              Any GST-registered business whose registration details have changed or whose
              registration is no longer required must act promptly to maintain compliance.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoNeeds.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 hover:border-primary/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{title}</h3>
                <p className="text-muted text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY BENEFITS ─────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Why It Matters" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              Key Benefits of Timely Amendment &amp; Cancellation
            </h2>
            <p className="text-muted leading-relaxed">
              Correct and current GST registration details are a foundation of clean GST compliance,
              ITC eligibility, and protection from legal risk.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-card transition-shadow group"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{title}</h3>
                <p className="text-muted text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ────────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Our Process" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              How We Handle Amendment &amp; Cancellation
            </h2>
            <p className="text-muted leading-relaxed">
              Steps 1–4 cover GST Amendment (REG-14); Steps 5–8 cover GST Cancellation (REG-16 to GSTR-10).
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map(({ n, title, desc }, i) => (
              <motion.div
                key={n} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                className={`rounded-2xl p-6 shadow-card border relative ${i < 4 ? "bg-white border-primary/10" : "bg-primary/5 border-primary/20"}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-heading font-extrabold text-3xl text-primary/10 leading-none">{n}</span>
                  {i < 4
                    ? <span className="text-[10px] font-heading font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Amendment</span>
                    : <span className="text-[10px] font-heading font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">Cancellation</span>
                  }
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{title}</h3>
                <p className="text-muted text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS REQUIRED ───────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Documents Checklist" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              Documents Required
            </h2>
            <p className="text-muted leading-relaxed">
              Document requirements differ for amendment and cancellation. Here is a comprehensive
              checklist for both scenarios.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Amendment docs */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Edit3 size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-dark text-base">For GST Amendment (REG-14)</h3>
                  <p className="text-muted text-xs">Core field changes requiring officer approval</p>
                </div>
              </div>
              <div className="space-y-3">
                {amendmentDocs.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3">
                    <Icon size={15} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs font-heading font-medium leading-snug">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cancellation docs */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" custom={2} viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <XCircle size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-dark text-base">For GST Cancellation (REG-16)</h3>
                  <p className="text-muted text-xs">Voluntary cancellation and final return filing</p>
                </div>
              </div>
              <div className="space-y-3">
                {cancellationDocs.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3">
                    <Icon size={15} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-dark text-xs font-heading font-medium leading-snug">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Processing Timeline" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              GST Amendment &amp; Cancellation Timeline
            </h2>
            <p className="text-muted leading-relaxed">
              Typical processing timeline from application filing to final order and post-approval compliance.
            </p>
          </motion.div>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[8.33%] right-[8.33%] h-0.5 bg-slate-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              {timeline.map(({ stage, label, period, desc }, i) => (
                <motion.div
                  key={stage} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-heading font-extrabold text-lg shadow-lg mb-4 z-10 relative">
                    {stage}
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-1">{label}</h3>
                  <span className="text-accent font-heading font-semibold text-xs mb-2">{period}</span>
                  <p className="text-muted text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU RECEIVE ─────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" custom={1} viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden h-[400px] shadow-card"
            >
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=85"
                alt="Business documents and compliance"
                fill sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081726]/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                  <p className="text-accent font-heading font-bold text-xs uppercase tracking-wider mb-1">Starting at</p>
                  <p className="text-white font-heading font-extrabold text-3xl">₹1,499</p>
                  <p className="text-slate-300 text-xs mt-1">Amendment or Cancellation — complete service</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Deliverables" />
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-5 leading-tight">
                What You Receive
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                From application filing to final order and post-approval compliance — we deliver
                documented proof at every stage.
              </p>
              <div className="space-y-4">
                {deliverables.map(({ icon: Icon, label }, i) => (
                  <motion.div
                    key={label} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl px-5 py-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <span className="font-heading font-semibold text-dark text-sm">{label}</span>
                    <CheckCircle size={16} className="text-green-500 ml-auto shrink-0" />
                  </motion.div>
                ))}
              </div>
              <Link href="/contact"
                className="mt-8 inline-flex items-center gap-2 bg-primary text-white font-heading font-semibold px-7 py-3.5 rounded-xl hover:bg-[#0a2444] transition-colors text-sm"
              >
                Get Started Today <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY COMPANY AVENUE ───────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Why Choose Us" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              Why Company Avenue Advisory?
            </h2>
            <p className="text-muted leading-relaxed">
              Trusted by businesses across India for accurate, hassle-free GST amendment and
              cancellation services.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whyUs.map((point, i) => (
              <motion.div
                key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm"
              >
                <CheckCircle size={16} className="text-accent shrink-0 mt-0.5" />
                <span className="text-dark text-sm leading-relaxed font-heading">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Common Questions" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              GST Amendment &amp; Cancellation — FAQs
            </h2>
            <p className="text-muted leading-relaxed">
              Detailed answers on REG-14, REG-16, GSTR-10, ITC reversal, and revocation procedures.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-3"
          >
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} i={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Eyebrow label="Explore More" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-4">
              Related Services
            </h2>
            <p className="text-muted leading-relaxed">
              Keep your GST and overall compliance in order with these complementary services.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map(({ id, title, desc }, i) => (
              <motion.div
                key={id} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
              >
                <Link
                  href={`/services/${id}`}
                  className="group block bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-card hover:border-primary/20 transition-all"
                >
                  <h3 className="font-heading font-bold text-dark text-sm mb-2 group-hover:text-primary transition-colors">{title}</h3>
                  <p className="text-muted text-xs mb-4">{desc}</p>
                  <span className="inline-flex items-center gap-1 text-primary font-heading font-semibold text-xs group-hover:gap-2 transition-all">
                    Learn More <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK CTA ─────────────────────────────────────────── */}
      <section className="bg-[#0F2D52] py-20">
        <div className="container-custom text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Eyebrow label="Get Started" />
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-5 leading-tight">
              Keep Your GST Registration Accurate.<br />
              <span className="text-accent">Amend or Cancel — the Right Way.</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Our GST experts file REG-14 or REG-16, track officer responses, handle
              clarifications, and complete GSTR-10 — ensuring zero notices and clean compliance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-[#081726] font-heading font-bold px-8 py-4 rounded-xl hover:bg-amber-400 transition-colors text-base"
              >
                Get Started — ₹1,499 <ArrowRight size={16} />
              </Link>
              <a href="tel:+919876543210"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-heading font-semibold px-8 py-4 rounded-xl hover:border-accent hover:text-accent transition-colors text-base"
              >
                <Phone size={16} /> Call +91 98765 43210
              </a>
            </div>
            <p className="text-slate-400 text-xs mt-6 font-heading">
              <Clock size={11} className="inline mr-1" /> Response within 2 business hours &nbsp;|&nbsp; PAN India service
            </p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
