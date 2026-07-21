"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText, Globe,
  Building2, Users, Briefcase, Award, ShieldCheck, TrendingUp,
  AlertTriangle, BarChart3, Calculator, Scale, BookOpen,
  Clock, ChevronRight, Zap, UserCheck, BadgeCheck, DollarSign,
  Landmark, Info, RefreshCcw, ClipboardList, Stamp, Calendar,
  AlertCircle, HeartPulse, ScrollText, FolderOpen, Gavel,
  CreditCard, Search, Network,
} from "lucide-react";
import { faqs } from "@/lib/faqs/ROCCompliancePage";

/* ══════════════════════════════════════
   ANIMATION
══════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

/* ══════════════════════════════════════
   SHARED SUB-COMPONENTS
══════════════════════════════════════ */
function Eyebrow({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
      <span className="w-6 h-px bg-accent" />
      {label}
      <span className="w-6 h-px bg-accent" />
    </span>
  );
}

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
        <span className="shrink-0 w-6 h-6 rounded-full bg-primary/8 flex items-center justify-center text-primary">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <p itemProp="text" className="px-5 pb-5 text-muted text-sm leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const quickFacts = [
  { label: "Forms", value: "AOC-4 + MGT-7" },
  { label: "AOC-4 Due", value: "30 October" },
  { label: "MGT-7 Due", value: "29 November" },
  { label: "Penalty", value: "₹100/day" },
  { label: "Authority", value: "MCA / RoC" },
  { label: "Required For", value: "All Pvt Ltd Cos" },
];

const whoNeeds = [
  { icon: Building2, title: "All Private Limited Companies", desc: "ROC annual filing is mandatory for every Pvt Ltd company — there is no turnover or profit threshold for this requirement." },
  { icon: Users, title: "One Person Companies (OPCs)", desc: "OPCs incorporated under the Companies Act, 2013 must file AOC-4 (OPC) within 180 days of financial year close." },
  { icon: HeartPulse, title: "Section 8 (Non-Profit) Companies", desc: "Non-profit companies registered under Section 8 must comply with annual filing — their tax-exempt status does not waive MCA obligations." },
  { icon: Landmark, title: "Public Limited Companies", desc: "Public companies have the same annual filing obligations as Pvt Ltd, plus additional disclosure requirements." },
  { icon: RefreshCcw, title: "Dormant Companies (Form MSC-3)", desc: "Companies that have obtained dormant status under Section 455 must still file Form MSC-3 annually to maintain that status." },
  { icon: AlertCircle, title: "Companies Under Strike-Off Process", desc: "Until a company is formally struck off by the RoC, all annual filings remain due. Pending filings can block strike-off." },
  { icon: Calendar, title: "Newly Incorporated Companies", desc: "Companies incorporated in the current year must hold their first AGM within 9 months of the financial year end and file accordingly." },
  { icon: Gavel, title: "Companies in Liquidation", desc: "Even companies under liquidation proceedings must file pending returns until the winding-up order is passed by the tribunal." },
];

const benefits = [
  { icon: DollarSign, title: "Avoid ₹100/Day Late Fees", desc: "Filing on time eliminates the accumulating additional fee that compounds daily with no upper cap under the Companies Act." },
  { icon: ShieldCheck, title: "Maintain Active Company Status", desc: "Timely filing keeps your company marked 'Active' on the MCA portal — essential for operations and banking." },
  { icon: CreditCard, title: "Enable Bank Borrowings & Credit", desc: "Banks and NBFCs verify MCA filing status before sanctioning loans, overdrafts, or trade credit facilities." },
  { icon: Gavel, title: "Avoid Director Prosecution", desc: "Directors of non-compliant companies face disqualification under Section 164(2) and potential prosecution." },
  { icon: BadgeCheck, title: "Required for DIN Renewal", desc: "Director Identification Number (DIN) requires active filing status. DIN deactivation bars directors from all companies." },
  { icon: Briefcase, title: "Government Tender Eligibility", desc: "Most government and PSU tenders require active MCA compliance records as part of vendor qualification." },
  { icon: TrendingUp, title: "Clean ROC Record for Fundraising", desc: "Investors and VCs conduct MCA due diligence. A clean annual filing record accelerates funding rounds." },
  { icon: Award, title: "Protects Director Credibility", desc: "Disqualified directors cannot serve on any company's board for 5 years — a significant professional risk to avoid." },
];

const processSteps = [
  { n: "01", title: "Books Closure (31 March)", desc: "Finalise and reconcile all accounting entries for the financial year ending 31 March." },
  { n: "02", title: "Financial Statement Preparation", desc: "Prepare Balance Sheet, Profit & Loss Account, and Cash Flow Statement per Companies Act 2013 Schedule III." },
  { n: "03", title: "Board Approval of Accounts", desc: "Board of Directors approves the financial statements in a duly convened Board Meeting and signs the accounts." },
  { n: "04", title: "AGM (Annual General Meeting)", desc: "Hold the AGM within 6 months of year end (30 September). Shareholders approve accounts and declare dividend if any." },
  { n: "05", title: "Auditor's Report Finalisation", desc: "Statutory auditor issues the audit report, CARO (if applicable), and signs the financial statements." },
  { n: "06", title: "File AOC-4 (Financial Statements)", desc: "File financial statements with the Registrar of Companies on MCA portal. Due date: 30 days from AGM (latest 30 October)." },
  { n: "07", title: "File MGT-7 (Annual Return)", desc: "File the annual return containing company structure, directors, shareholding, and key changes. Due by 29 November." },
  { n: "08", title: "DIN-3 KYC Status Check", desc: "Verify all directors' DIN KYC is active (DIR-3 KYC due by 30 September each year) to avoid DIN deactivation." },
];

const documents = [
  "Audited financial statements (Balance Sheet, P&L, Cash Flow)",
  "Board meeting minutes approving financials",
  "AGM minutes and notice with attendance register",
  "List of shareholders with shareholding pattern",
  "List of directors with their DIN and address",
  "Auditor's report and CARO (if applicable)",
  "Secretarial audit report (for applicable companies)",
  "Signed balance sheet with director's signatures",
];

const timelineStages = [
  { stage: "01", title: "Books Closure", desc: "Close FY books by April–May." },
  { stage: "02", title: "Audit Completion", desc: "Auditor report by July–August." },
  { stage: "03", title: "Board Meeting", desc: "Board approves accounts." },
  { stage: "04", title: "AGM", desc: "By 30 September (latest)." },
  { stage: "05", title: "File AOC-4", desc: "By 30 October (30 days post AGM)." },
  { stage: "06", title: "File MGT-7", desc: "By 29 November (60 days post AGM)." },
];

const deliverables = [
  "Filed AOC-4 with MCA — SRN receipt",
  "Filed MGT-7 with MCA — SRN receipt",
  "Updated company master data on MCA portal",
  "Board and AGM resolutions on company record",
  "Compliance confirmation report",
  "Next year due-date calendar",
];

const whyUs = [
  { icon: UserCheck, point: "Qualified Company Secretaries and CAs on staff" },
  { icon: Calendar, point: "Proactive deadline reminders — never miss a due date" },
  { icon: Award, point: "10,000+ annual filings completed across India" },
  { icon: ShieldCheck, point: "Error-free SRN generation — first time, every time" },
  { icon: DollarSign, point: "Fixed pricing — ₹4,999/year, no hidden extras" },
  { icon: BookOpen, point: "Includes AGM and Board meeting resolution drafting" },
  { icon: Search, point: "MCA portal expertise — instant SRN tracking" },
  { icon: Clock, point: "Filing completed well before deadline — no last-minute rush" },
];


const relatedServices = [
  { id: "llp-annual-filing", title: "LLP Annual Filing", desc: "Form 8 and Form 11 for LLPs — annual compliance." },
  { id: "director-kyc", title: "Director KYC (DIR-3)", desc: "Annual DIN KYC filing to keep director active." },
  { id: "change-in-directors", title: "Change in Directors", desc: "Appointment or resignation of directors on MCA." },
  { id: "company-closure", title: "Company Closure (STK-2)", desc: "Strike off a dormant or inactive company legally." },
  { id: "increase-authorised-capital", title: "Increase Authorised Capital", desc: "Enhance share capital via SH-7 and MGT-14." },
  { id: "registered-office-change", title: "Registered Office Change", desc: "Update company address on MCA records." },
];

/* ══════════════════════════════════════
   COMPONENT
══════════════════════════════════════ */
export function ROCCompliancePage() {
  return (
    <main className="overflow-x-hidden" itemScope itemType="https://schema.org/Service">

      {/* ── 1. HERO ── */}
      <section className="relative bg-[#081726] text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/grid.svg')] bg-repeat" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-heading">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-accent">ROC Annual Filing</span>
          </nav>

          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Eyebrow label="MCA Compliance" />
            </motion.div>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              itemProp="name"
            >
              ROC Annual Filing{" "}
              <span className="text-accent">AOC-4 &amp; MGT-7</span>
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl"
              itemProp="description"
            >
              Hassle-free annual ROC compliance for Private Limited Companies — financial statement filing (AOC-4) and annual return (MGT-7) filed accurately and on time. Avoid ₹100/day penalties and director disqualification.
            </motion.p>
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-7 py-3.5 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors"
              >
                File My Annual Returns <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+919953719111"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                <Phone size={15} /> Speak to a CS
              </a>
            </motion.div>
          </div>

          {/* Quick Fact Cards */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-14"
          >
            {quickFacts.map((f, i) => (
              <div key={i} className="bg-white/8 border border-white/10 rounded-2xl px-4 py-4 text-center backdrop-blur-sm">
                <p className="text-accent font-heading font-bold text-base leading-tight">{f.value}</p>
                <p className="text-slate-400 text-xs mt-1 font-heading">{f.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. WHAT IS ROC ANNUAL FILING? ── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Overview" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">
                What is ROC Annual Filing?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-5">
                Every Private Limited Company registered in India must file two mandatory annual forms with the{" "}
                <strong className="text-dark">Registrar of Companies (RoC)</strong> under the Ministry of Corporate Affairs (MCA) every year:{" "}
                <strong className="text-dark">AOC-4</strong> (financial statements) and{" "}
                <strong className="text-dark">MGT-7</strong> (annual return).
              </p>
              <p className="text-muted text-base leading-relaxed mb-5">
                <strong className="text-dark">Form AOC-4</strong> carries the company&apos;s audited Balance Sheet, Profit &amp; Loss Account, Cash Flow Statement, and Directors&apos; Report to the MCA portal. It must be filed within 30 days of the Annual General Meeting (AGM) — typically by <strong className="text-dark">30 October</strong>.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                <strong className="text-dark">Form MGT-7</strong> is the Annual Return — a comprehensive snapshot of the company&apos;s corporate structure including shareholding pattern, registered office, directors, and key changes during the year. It is due within 60 days of the AGM — typically by <strong className="text-dark">29 November</strong>. Failure to file attracts a penalty of{" "}
                <strong className="text-dark">₹100 per day</strong> with no upper cap.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-heading font-semibold text-sm hover:bg-[#0a2444] transition-colors"
                >
                  Get Started Today <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="relative rounded-3xl overflow-hidden shadow-card h-80 lg:h-full min-h-[360px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=85"
                alt="ROC annual filing and corporate compliance"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/20" />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-card max-w-xs">
                <p className="font-heading font-bold text-dark text-sm mb-1">Starting from</p>
                <p className="font-heading font-bold text-primary text-2xl">₹4,999<span className="text-base font-medium text-muted">/year</span></p>
                <p className="text-muted text-xs">AOC-4 + MGT-7 + resolutions</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. WHO NEEDS THIS? ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Applicability" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Who Needs ROC Annual Filing?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              Annual filing is a blanket requirement — there are no revenue or profit exemptions for these entities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoNeeds.map((w, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                  <w.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{w.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. KEY BENEFITS ── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Key Benefits" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Why File On Time?</h2>
            <p className="text-muted mt-4">
              Timely ROC filing is not just a legal obligation — it protects your company&apos;s status, directors&apos; credibility, and business opportunities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                  <b.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{b.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS STEPS ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Our Process" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">8-Step ROC Filing Process</h2>
            <p className="text-muted mt-4">From books closure to final SRN — we handle the entire compliance cycle for your company.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-card relative"
              >
                <span className="absolute top-5 right-5 font-heading font-bold text-4xl text-primary/8 select-none">{s.n}</span>
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mb-4">
                  <span className="text-white font-heading font-bold text-xs">{s.n}</span>
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-2">{s.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. DOCUMENTS REQUIRED ── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow label="Documentation" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">Documents Required</h2>
              <p className="text-muted leading-relaxed mb-8">
                Gather the following documents before initiating the ROC filing process. We coordinate directly with your auditor and management to ensure nothing is missed.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {documents.map((doc, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                    className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4"
                  >
                    <CheckCircle size={15} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-sm font-heading font-medium">{doc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="bg-primary/5 border border-primary/15 rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <AlertTriangle size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-heading font-bold text-dark text-sm">Director Disqualification Risk</p>
                  <p className="text-muted text-xs">Section 164(2) — Companies Act 2013</p>
                </div>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-5">
                Under Section 164(2) of the Companies Act, a director who fails to file annual returns for <strong className="text-dark">3 consecutive financial years</strong> is automatically disqualified. A disqualified director cannot be appointed as a director in any company for <strong className="text-dark">5 years</strong>.
              </p>
              <p className="text-muted text-sm leading-relaxed mb-5">
                The MCA&apos;s ACTIVE scheme (Active Company Tagging Identities and Verification) also marks companies as non-compliant on public records — visible to banks, investors, and regulators.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
                <AlertCircle size={15} className="text-red-600 shrink-0 mt-0.5" />
                <p className="text-red-800 text-xs leading-relaxed">
                  <strong>Important:</strong> The MCA has conducted multiple drives to strike off non-filing companies. Struck-off companies lose the ability to do banking, file GST, or conduct any business transactions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. TIMELINE ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Compliance Calendar" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Annual Compliance Timeline</h2>
            <p className="text-muted mt-4">Key milestones every Private Limited Company must track from April to November.</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-primary/15 z-0" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-5 relative z-10">
              {timelineStages.map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-sm mb-4 shadow-lg border-4 border-slate-50 relative z-10">
                    {t.stage}
                  </div>
                  <h3 className="font-heading font-bold text-dark text-xs mb-2">{t.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Due Date Callout */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mt-12 grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto"
          >
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
              <p className="font-heading font-bold text-amber-800 text-lg">30 October</p>
              <p className="text-amber-700 text-sm font-heading font-semibold mt-1">AOC-4 Due Date</p>
              <p className="text-amber-600 text-xs mt-2">Financial statements with the RoC</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <p className="font-heading font-bold text-blue-800 text-lg">29 November</p>
              <p className="text-blue-700 text-sm font-heading font-semibold mt-1">MGT-7 Due Date</p>
              <p className="text-blue-600 text-xs mt-2">Annual return with the RoC</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 8. WHAT YOU RECEIVE ── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Deliverables" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">What You Receive</h2>
            <p className="text-muted mt-4">Everything you need to prove your company is fully compliant for the financial year.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {deliverables.map((d, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="flex items-start gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-5"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                  <CheckCircle size={16} className="text-accent" />
                </div>
                <p className="text-dark font-heading font-semibold text-sm leading-snug">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. WHY COMPANY AVENUE ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-card h-72 lg:h-full min-h-[340px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85"
                alt="Company Avenue Advisory team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/30" />
            </motion.div>
            <div>
              <Eyebrow label="Why Choose Us" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-8">
                Why Company Avenue Advisory?
              </h2>
              <div className="space-y-4">
                {whyUs.map((w, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                    className="flex items-center gap-4 bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                      <w.icon size={17} className="text-primary" />
                    </div>
                    <p className="text-dark font-heading font-semibold text-sm">{w.point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ── */}
      <section
        className="py-20 bg-white"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-14">
            <Eyebrow label="FAQ" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">
              Frequently Asked Questions
            </h2>
            <p className="text-muted mt-4">Everything you need to know about ROC annual filing for Private Limited Companies in India.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              >
                <FaqItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. RELATED SERVICES ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-14">
            <Eyebrow label="Related Services" />
            <h2 className="font-heading text-3xl font-bold text-dark">You May Also Need</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedServices.map((r, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              >
                <Link
                  href={`/services/${r.id}`}
                  className="group flex items-start justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-card hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <p className="font-heading font-bold text-dark text-sm mb-1 group-hover:text-primary transition-colors">{r.title}</p>
                    <p className="text-muted text-xs leading-relaxed">{r.desc}</p>
                  </div>
                  <ArrowRight size={15} className="text-muted group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. DARK CTA ── */}
      <section className="py-20 bg-[#0F2D52]">
        <div className="container-custom text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Eyebrow label="Get Started" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-5">
              Annual Compliance Made Simple
            </h2>
            <p className="text-slate-300 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Don&apos;t let deadlines sneak up on you. Engage Company Avenue Advisory today and have your AOC-4 and MGT-7 filed correctly, on time, every year.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-8 py-4 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors"
              >
                File Now — ₹4,999/year <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+919953719111"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl font-heading font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                <Phone size={15} /> Call a Company Secretary
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
