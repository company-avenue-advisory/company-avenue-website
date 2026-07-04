"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  Building2, Users, Briefcase, Award, ShieldCheck, TrendingUp,
  AlertTriangle, BarChart3, Scale, BookOpen, Clock, UserCheck,
  BadgeCheck, DollarSign, Landmark, Info, RefreshCcw,
  AlertCircle, ChevronRight, Wallet, XCircle, Zap, Globe,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";

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
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
        <span itemProp="name" className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }}
            itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="overflow-hidden">
            <p itemProp="text" className="px-5 pb-4 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const quickFacts = [
  { icon: FileText,    label: "Form",         value: "STK-2" },
  { icon: Landmark,    label: "Authority",    value: "MCA / RoC" },
  { icon: Clock,       label: "Timeline",     value: "3-6 Months" },
  { icon: DollarSign,  label: "Starting At",  value: "₹9,999" },
  { icon: AlertCircle, label: "Penalty Risk", value: "Director Disqualification" },
  { icon: ShieldCheck, label: "Protection",   value: "Liability Ends" },
];

const benefits = [
  { icon: DollarSign,  title: "Eliminate Ongoing Compliance Costs",      desc: "Closing a dormant company removes annual ROC filing (AOC-4, MGT-7), GST returns, income tax, PF/ESIC, and director KYC obligations — saving ₹25,000-₹50,000 annually." },
  { icon: ShieldCheck, title: "Protect Directors from Disqualification",  desc: "Section 164(2) disqualifies directors of companies that fail to file annual returns for 3 consecutive years. Strike-off ends this risk and cleans the director&apos;s record." },
  { icon: Scale,       title: "Remove Personal Liability Exposure",       desc: "An inactive company can still attract notices and show-cause orders. Formal strike-off under STK-2 provides legal closure and removes the company from regulatory radar." },
  { icon: RefreshCcw,  title: "Free Up Director Capacity",                desc: "Directors are limited in how many companies they can serve. Closing unused companies frees up directorship slots for new ventures and prevents DIN clutter." },
  { icon: Zap,         title: "Fast Track - No Court Involvement",        desc: "The STK-2 Fast Track Exit route avoids lengthy NCLT proceedings. Eligible companies can be struck off within 3-6 months entirely through the MCA portal." },
  { icon: Award,       title: "Clean Closure - Documented and Legal",     desc: "Unlike simply abandoning a company, formal strike-off via STK-2 creates a legal record of closure, satisfying banks, partners, and investors if enquiries arise." },
  { icon: Globe,       title: "Enables Foreign Director Exits",            desc: "Foreign nationals holding directorships in Indian companies can formally exit the Indian regulatory system by closing unused entities through the STK-2 route." },
  { icon: BadgeCheck,  title: "Creditor Protection via NCLT Route",       desc: "Where creditors exist, the NCLT voluntary winding-up process provides a structured mechanism to settle debts and formally distribute remaining assets before dissolution." },
];

const whoNeeds = [
  { icon: Building2,   title: "Inactive Companies with No Business",     desc: "Companies that were incorporated but never commenced business or stopped operations can use STK-2 to avoid accumulating compliance defaults and director liabilities." },
  { icon: Users,       title: "Companies with NIL Assets and Liabilities",desc: "STK-2 Fast Track Exit is specifically available to companies with nil assets and nil liabilities — the most common profile of shell or dormant entities seeking closure." },
  { icon: Briefcase,   title: "Entrepreneurs Pivoting to New Ventures",   desc: "Founders who registered a company for an idea that did not materialise can cleanly close the entity before launching their actual business to avoid compliance overlap." },
  { icon: TrendingUp,  title: "Companies after Failed Fundraising",       desc: "Startups that registered a holding company or SPV for a deal that did not close can eliminate the entity rather than carrying indefinite compliance obligations." },
  { icon: Landmark,    title: "Subsidiaries No Longer Required",          desc: "Group companies closing a subsidiary after restructuring or post-merger integration can use STK-2 for efficient exit from the subsidiary entity." },
  { icon: AlertCircle, title: "Directors Facing DIN Deactivation Risk",   desc: "Directors whose DIN is at risk due to pending annual filings of an inactive company should prioritise closure to protect their ability to serve on other company boards." },
];

const processSteps = [
  { n: "01", title: "Eligibility Check",                  desc: "Confirm the company has not commenced business or stopped operations, has NIL outstanding liabilities, has filed all GST returns, income tax returns, and cleared all bank accounts." },
  { n: "02", title: "Board Resolution",                    desc: "Pass a board resolution authorising the filing of Form STK-2 for voluntary strike-off and appointing a director or representative to sign the application." },
  { n: "03", title: "Indemnity Bond and Affidavit",        desc: "Each director must execute an indemnity bond (STK-3) and a sworn affidavit (STK-4) declaring that the company has no liabilities and all statutory obligations have been met." },
  { n: "04", title: "Statement of Accounts",               desc: "Prepare a statement of accounts made up to a date not more than 30 days before filing. This must be certified by a practising Chartered Accountant to confirm nil assets and liabilities." },
  { n: "05", title: "File Form STK-2 on MCA Portal",      desc: "Upload Form STK-2 on the MCA portal with all attachments: board resolution, indemnity bonds, director affidavits, CA-certified statement of accounts, and no-objection certificates." },
  { n: "06", title: "Public Notice by RoC",                desc: "After receiving the STK-2 application, the Registrar of Companies publishes a public notice in the Official Gazette giving 30 days for any objection from creditors or the public." },
  { n: "07", title: "Objection Period",                    desc: "During the 30-day public notice period, any creditor, regulatory authority, or interested party can file a formal objection. If no objection is received, the process moves to final dissolution." },
  { n: "08", title: "Strike-Off Order and Dissolution",    desc: "If no valid objection is received, the RoC issues the final order striking off the company name from the register. The company is legally dissolved and ceases to exist." },
];

const requiredDocs = [
  { icon: FileText,    label: "Form STK-2 (signed with DSC)" },
  { icon: FileText,    label: "Indemnity Bond Form STK-3 (all directors)" },
  { icon: FileText,    label: "Affidavit Form STK-4 (all directors)" },
  { icon: BookOpen,    label: "CA-Certified Statement of Accounts (within 30 days)" },
  { icon: Users,       label: "Board Resolution authorising STK-2 filing" },
  { icon: Building2,   label: "Certificate of Incorporation (CoI)" },
  { icon: FileText,    label: "PAN Card of the Company" },
  { icon: CheckCircle, label: "GST Cancellation Order (if registered)" },
  { icon: BarChart3,   label: "Bank Account Closure Confirmation Letter" },
  { icon: BadgeCheck,  label: "Income Tax Return acknowledgements (all years)" },
];

const faqs = [
  {
    q: "What is Form STK-2 and who can file it?",
    a: "Form STK-2 is the application form for voluntary strike-off (closure) of a private limited company under Section 248(2) of the Companies Act, 2013. It can be filed by companies that have not commenced business within one year of incorporation, or companies that have not been carrying on any business for the past two financial years and have not applied for dormant status. The company must have nil assets and nil liabilities to be eligible for this Fast Track Exit route.",
  },
  {
    q: "What is the difference between STK-2 Fast Track Exit and NCLT winding-up?",
    a: "STK-2 Fast Track Exit is a voluntary, MCA portal-based administrative process for companies with nil assets and nil liabilities. It is faster (3-6 months), cost-effective, and requires no court or tribunal involvement. NCLT voluntary winding-up under the Insolvency and Bankruptcy Code is used when a company has assets, liabilities, or creditors to settle. It involves appointing a liquidator, settling all claims, distributing remaining assets to shareholders, and obtaining a dissolution order from the NCLT. STK-2 is preferable when the company is truly dormant with zero financial obligations.",
  },
  {
    q: "Can a company with outstanding GST or income tax liabilities apply for STK-2?",
    a: "No. A company must clear all outstanding statutory liabilities including GST (all pending returns must be filed and GST registration cancelled), income tax (all ITRs filed, no pending demands), PF, ESIC, and any other regulatory dues before applying for strike-off via STK-2. The CA-certified statement of accounts must confirm nil liabilities. Any pending liabilities will result in rejection of the application by the Registrar.",
  },
  {
    q: "How long does the STK-2 process take?",
    a: "The STK-2 strike-off process typically takes 3 to 6 months from the date of filing the application. This includes the 30-day public notice period during which any objections can be raised, the review period by the Registrar of Companies, and the time for issuance of the final strike-off order. If objections are raised or documents are deficient, the process may take longer.",
  },
  {
    q: "What happens to directors after the company is struck off?",
    a: "Once the company is struck off, the directors are relieved of all future compliance obligations related to that company. Their directorship in the dissolved company is automatically terminated. The strike-off also removes the risk of disqualification under Section 164(2) for non-filing, and their DIN remains active for use in other companies. The indemnity bonds signed during the process ensure personal liability for any undisclosed liabilities that emerge post-dissolution.",
  },
  {
    q: "Can a struck-off company be restored?",
    a: "Yes. Under Section 252 of the Companies Act, a struck-off company can be restored to the register by an order of the NCLT within 20 years of the date of dissolution. A dissolved company can be revived if it is established that the strike-off was unjustified or if a legal dispute requires the company&apos;s continued existence. However, restoration requires NCLT proceedings and payment of all pending statutory dues along with late fees.",
  },
  {
    q: "What documents must each director sign for STK-2?",
    a: "Each director of the company must individually sign and execute: (1) Form STK-3 — an indemnity bond on stamp paper declaring that all liabilities have been settled and indemnifying against any future claims; and (2) Form STK-4 — a sworn affidavit before a Notary or Magistrate declaring that the information provided is true and the company has ceased operations and has nil assets and liabilities. All directors must sign regardless of their active participation in the company.",
  },
  {
    q: "Is it mandatory to close the bank account before filing STK-2?",
    a: "Yes. All bank accounts of the company must be closed and a bank account closure letter from the bank must be obtained before filing Form STK-2. The company cannot have any active bank accounts at the time of filing. The CA-certified statement of accounts must reflect a nil bank balance and the Registrar verifies the same. An active bank account with even a zero balance can cause rejection of the application.",
  },
];

export function CompanyClosurePage() {
  return (
    <main className="overflow-x-hidden" itemScope itemType="https://schema.org/Service">

      {/* HERO */}
      <section className="relative bg-[#081726] text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "36px 36px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-heading">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-accent">Company Closure</span>
          </nav>
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Eyebrow label="Strike Off / Dissolution" />
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" itemProp="name">
              Company Closure{" "}
              <span className="text-accent">(STK-2 Fast Track)</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl" itemProp="description">
              Close your inactive Private Limited Company legally and permanently using the MCA STK-2 Fast Track Exit route. Eliminate compliance obligations, protect directors from disqualification, and get a formal dissolution order — without any NCLT proceedings.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-7 py-3.5 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors">
                Start Company Closure <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-white/10 transition-colors">
                <Phone size={15} /> Talk to an Expert
              </a>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-14">
            {quickFacts.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white/8 border border-white/10 rounded-2xl px-4 py-4 text-center backdrop-blur-sm">
                  <Icon size={18} className="text-accent mx-auto mb-2" />
                  <p className="text-accent font-heading font-bold text-sm leading-tight">{f.value}</p>
                  <p className="text-slate-400 text-xs mt-1 font-heading">{f.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* WHAT IS COMPANY CLOSURE */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Overview" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">
                What is Company Strike-Off?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-5">
                Company strike-off is the legal process of removing a company&apos;s name from the Registrar of Companies records under <strong className="text-dark">Section 248 of the Companies Act, 2013</strong>. Once struck off, the company ceases to exist as a legal entity.
              </p>
              <p className="text-muted text-base leading-relaxed mb-5">
                The <strong className="text-dark">STK-2 Fast Track Exit</strong> scheme provides a simplified, non-judicial route for companies that have nil assets, nil liabilities, and have not commenced or ceased business — avoiding costly and time-consuming NCLT winding-up proceedings.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                Over <strong className="text-dark">3 lakh companies</strong> are struck off by the MCA each year. Voluntary strike-off via STK-2 is far preferable to involuntary strike-off, which carries legal consequences for directors and leaves compliance records unresolved.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["NIL Liabilities Required", "All Returns Must Be Filed", "No NCLT Required", "30-Day Public Notice"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-primary/5 border border-primary/15 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <Scale size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-dark text-sm">STK-2 vs NCLT Winding Up</p>
                    <p className="text-muted text-xs">Choose the right closure method</p>
                  </div>
                </div>
                <div className="space-y-3 mb-5">
                  {[
                    { label: "Eligibility", stk: "NIL assets & liabilities",  nclt: "Companies with assets/liabilities" },
                    { label: "Timeline",    stk: "3-6 months",                nclt: "12-24 months" },
                    { label: "Cost",        stk: "Low (from ₹9,999)",         nclt: "High (liquidator fees)" },
                    { label: "Tribunal",    stk: "Not required",              nclt: "NCLT proceedings required" },
                    { label: "Creditors",   stk: "Must be NIL",               nclt: "Settlement via liquidator" },
                  ].map((row) => (
                    <div key={row.label} className="grid grid-cols-3 gap-2 text-xs">
                      <span className="text-muted font-heading font-semibold">{row.label}</span>
                      <span className="text-green-700 bg-green-50 rounded-lg px-2 py-1 text-center">{row.stk}</span>
                      <span className="text-slate-600 bg-slate-100 rounded-lg px-2 py-1 text-center">{row.nclt}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                  <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">
                    <strong>Note:</strong> Companies with pending liabilities, creditors, or assets must use the NCLT voluntary winding-up route instead of STK-2.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHO NEEDS */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Applicability" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Who Should Close Their Company?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              If your company falls into any of these categories, voluntary strike-off via STK-2 is the right move.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whoNeeds.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{w.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Key Benefits" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Benefits of Closing Your Company Properly</h2>
            <p className="text-muted mt-4">
              Formal closure eliminates ongoing costs, protects directors, and gives you legal certainty.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{b.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Our Process" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">STK-2 Filing Process - Step by Step</h2>
            <p className="text-muted mt-4">From eligibility check to final dissolution order — we manage the entire closure process.</p>
          </div>
          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200 hidden md:block" aria-hidden="true" />
            <div className="space-y-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="flex gap-5 relative">
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
        </div>
      </section>

      {/* DOCUMENTS REQUIRED */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow label="Documentation" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">Documents Required for STK-2</h2>
              <p className="text-muted leading-relaxed mb-8">
                All documents must be complete and accurate before filing. Our team prepares every document end-to-end.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {requiredDocs.map((doc, i) => {
                  const Icon = doc.icon;
                  return (
                    <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                      className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-primary" />
                      </div>
                      <span className="text-dark text-xs font-medium">{doc.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-red-50 border border-red-200 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <XCircle size={20} className="text-red-500" />
                  <p className="font-heading font-bold text-dark text-sm">STK-2 Disqualifiers</p>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-4">Your company <strong className="text-dark">cannot</strong> use STK-2 if any of the following apply:</p>
                <div className="space-y-2">
                  {[
                    "Company has any outstanding bank loans or trade liabilities",
                    "GST registration is active and returns are pending",
                    "Income tax returns not filed for all years",
                    "Company is a party to any pending litigation",
                    "Company has any pending regulatory inquiry or investigation",
                    "Company has issued debentures or has secured creditors",
                    "Company has active bank accounts with any balance",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <XCircle size={13} className="text-red-500 shrink-0 mt-0.5" />
                      <span className="text-dark text-xs leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 bg-white border border-red-100 rounded-xl p-3 flex items-start gap-2">
                  <Info size={13} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">
                    If any of the above apply, you must use NCLT voluntary winding-up. We can guide you through both routes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TIMELINE & PRICING */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Timeline &amp; Pricing" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Timeline &amp; Investment</h2>
            <p className="text-muted mt-4">Transparent pricing with no hidden charges. Fixed-fee engagement.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Clock size={18} className="text-white" />
                </div>
                <p className="font-heading font-bold text-dark">Timeline</p>
              </div>
              <div className="space-y-3">
                {[
                  { phase: "Document Preparation",  time: "5-7 days" },
                  { phase: "Pre-Filing Compliance", time: "15-30 days" },
                  { phase: "STK-2 Filing",           time: "1-2 days" },
                  { phase: "RoC Public Notice",      time: "30 days" },
                  { phase: "Final Strike-Off Order", time: "30-60 days" },
                  { phase: "Total (Approx.)",        time: "3-6 months" },
                ].map((item) => (
                  <div key={item.phase} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <span className="text-xs text-muted">{item.phase}</span>
                    <span className="text-xs font-heading font-semibold text-dark">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary rounded-3xl p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Wallet size={18} className="text-accent" />
                <p className="font-heading font-semibold text-base">Starting at ₹9,999</p>
              </div>
              <p className="text-white/60 text-xs mb-6 leading-relaxed">
                All-inclusive professional fee. Includes document preparation, STK-2 filing, CA certification of accounts, and compliance clearance support.
              </p>
              <div className="space-y-2 mb-6">
                {["STK-2 Form Filing", "CA Certified Accounts", "Director Affidavits (STK-4)", "Indemnity Bonds (STK-3)", "GST/IT Clearance Support", "Closure Certificate"].map(pt => (
                  <div key={pt} className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-accent shrink-0" />
                    <span className="text-white/80 text-xs">{pt}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact"
                className="w-full py-3 bg-accent text-dark text-xs font-heading font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors">
                Start Closure Process <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" itemScope itemType="https://schema.org/FAQPage">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-14">
            <Eyebrow label="FAQ" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Frequently Asked Questions</h2>
            <p className="text-muted mt-4">Everything you need to know about closing a company in India via STK-2.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                <FaqItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
