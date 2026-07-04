"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  Building2, Users, Briefcase, Award, ShieldCheck, TrendingUp,
  AlertTriangle, Clock, BadgeCheck, DollarSign,
  Landmark, Info, AlertCircle, ChevronRight, Wallet,
  BarChart3, Scale, Banknote, ClipboardList, Zap, RefreshCcw,
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
  { icon: FileText,    label: "Forms",          value: "MGT-14 + SH-7" },
  { icon: Clock,       label: "MGT-14 Due",     value: "Within 30 Days of EGM" },
  { icon: Clock,       label: "Timeline",       value: "7-10 Business Days" },
  { icon: DollarSign,  label: "Starting At",    value: "₹4,999" },
  { icon: Landmark,    label: "Authority",      value: "Registrar of Companies" },
  { icon: BadgeCheck,  label: "Resolution",     value: "Ordinary Resolution" },
];

const benefits = [
  { icon: TrendingUp,  title: "Enables New Equity Fundraising",          desc: "When raising investment rounds, the company must have sufficient authorised capital to issue new shares to investors. Increasing authorised capital is the prerequisite for any equity fundraising." },
  { icon: Users,       title: "Create or Expand ESOP Pool",              desc: "Employee Stock Option Plans require reserved, unissued shares. An increase in authorised capital creates the headroom to grant ESOPs to employees, advisors, and key hires." },
  { icon: Banknote,    title: "Debt-to-Equity Conversion",               desc: "When converting outstanding loans or debentures into equity shares (as part of restructuring or NCD redemption), sufficient authorised share capital must exist to accommodate the new shares." },
  { icon: Scale,       title: "Bonus Share Issuance",                    desc: "Issuing bonus shares (capitalisation of reserves) requires sufficient authorised capital. A company cannot issue bonus shares that would cause paid-up capital to exceed authorised capital." },
  { icon: RefreshCcw,  title: "Rights Issue and Preferential Allotment", desc: "Companies issuing shares to existing shareholders (rights issue) or to specific investors (preferential allotment under SEBI Chapter V) need adequate authorised capital as a baseline." },
  { icon: Zap,         title: "Quick and Straightforward Process",        desc: "Increasing authorised capital requires only an ordinary resolution — not a special resolution. It is one of the most straightforward MCA filings with a 7-10 business day turnaround." },
  { icon: Award,       title: "Strengthens Balance Sheet Optics",        desc: "A higher authorised capital signals ambition and capacity for growth to lenders, investors, and counterparties who review the company&apos;s public MCA records during due diligence." },
  { icon: BadgeCheck,  title: "No Impact on Existing Shareholding",      desc: "Merely increasing the authorised capital does not dilute existing shareholders or affect their economic rights. It only creates headroom for future share issuances." },
];

const whoNeeds = [
  { icon: Building2,   title: "Companies Raising Investment",             desc: "Before any equity funding round (seed, Series A, angel), confirm you have enough authorised capital headroom to issue new shares. Most seed companies need to increase from ₹1 lakh to ₹10-100 lakh." },
  { icon: Users,       title: "Companies Implementing ESOP Schemes",     desc: "ESOP pools typically represent 5-15% of the company. If the authorised capital is insufficient to accommodate the ESOP pool plus future rounds, increase authorised capital first." },
  { icon: Briefcase,   title: "Startups Onboarding Co-Founders",         desc: "When issuing equity to new co-founders or early team members, validate that the authorised capital is sufficient to accommodate the new shareholding at the agreed valuation." },
  { icon: TrendingUp,  title: "Companies Converting Debt to Equity",     desc: "Convertible notes (CCDs, OCDs) that are set to convert require adequate authorised capital at the time of conversion. Plan ahead and increase capital well before the conversion date." },
  { icon: Landmark,    title: "Companies Issuing Bonus Shares",          desc: "Bonus issuances require authorised capital to be at least equal to the post-bonus paid-up capital. Calculate and increase authorised capital before passing the bonus resolution." },
  { icon: AlertCircle, title: "Companies at 90%+ of Authorised Limit",   desc: "If your paid-up capital is approaching the authorised capital limit, proactively increase the authorised capital before conducting any further share issuances to avoid MCA compliance issues." },
];

const processSteps = [
  { n: "01", title: "Check Current Authorised Capital",      desc: "Verify the current authorised share capital from the Memorandum of Association (MOA) and compare it with the paid-up capital. Determine the required increase amount based on planned funding or ESOP requirements." },
  { n: "02", title: "Board Meeting and Resolution",          desc: "Convene a Board of Directors meeting and pass a Board Resolution recommending the increase in authorised share capital and recommending it for shareholder approval at an EGM or through postal ballot." },
  { n: "03", title: "EGM or Postal Ballot",                  desc: "Hold an Extraordinary General Meeting (EGM) or conduct a postal ballot. Pass an Ordinary Resolution (simple majority) approving the increase in authorised capital and alteration of the MOA accordingly." },
  { n: "04", title: "Calculate ROC Filing Fee",              desc: "The ROC charges a filing fee on Form SH-7 based on the amount of increase in authorised capital. Fee slabs range from ₹500 (for increase up to ₹1 lakh) to ₹1,500 for increase up to ₹10 lakh, and higher for larger increases." },
  { n: "05", title: "File MGT-14 (Special Resolution Filing)", desc: "File Form MGT-14 on the MCA portal within 30 days of passing the ordinary resolution at the EGM. Attach certified copies of the EGM notice, minutes, and the ordinary resolution." },
  { n: "06", title: "File SH-7 (Notice of Capital Increase)", desc: "File Form SH-7 on the MCA portal within 30 days of passing the resolution. This form notifies the Registrar of the increase in authorised share capital. Attach the altered MOA reflecting the new capital." },
  { n: "07", title: "Pay Stamp Duty on Altered MOA",         desc: "Pay the applicable stamp duty on the altered Memorandum of Association as per the Stamp Act of the state in which the registered office is located. This is additional to the ROC filing fee." },
  { n: "08", title: "Updated MOA and MCA Records",           desc: "Once SH-7 is processed, the MCA portal updates the company&apos;s authorised share capital. The company can now proceed with the planned share issuance — fundraising, ESOP grant, or bonus issuance." },
];

const requiredDocs = [
  { icon: FileText,    label: "Board Resolution recommending capital increase" },
  { icon: FileText,    label: "EGM Notice (for shareholders)" },
  { icon: FileText,    label: "EGM Minutes with Ordinary Resolution" },
  { icon: FileText,    label: "Altered Memorandum of Association (MOA)" },
  { icon: ClipboardList, label: "Current MOA showing existing authorised capital" },
  { icon: Building2,   label: "Certificate of Incorporation" },
  { icon: DollarSign,  label: "ROC Fee Challan for SH-7" },
  { icon: FileText,    label: "Stamp Duty on Altered MOA" },
];

const faqs = [
  {
    q: "What is authorised share capital and how is it different from paid-up capital?",
    a: "Authorised share capital (also called nominal capital) is the maximum value of shares a company is legally allowed to issue as stated in its Memorandum of Association (MOA). Paid-up capital is the amount actually issued to shareholders and received as payment. A company with an authorised capital of ₹10 lakh may have issued shares worth only ₹5 lakh — i.e., ₹5 lakh paid-up capital. The company cannot issue more shares than the authorised capital allows. To issue additional shares beyond the current authorised capital, the company must first increase the authorised capital.",
  },
  {
    q: "Is an ordinary resolution or special resolution required for capital increase?",
    a: "Under Section 61 of the Companies Act, 2013, alteration of share capital (including increase in authorised capital) requires only an Ordinary Resolution — i.e., a simple majority (more than 50%) of members voting. A Special Resolution (3/4 majority) is NOT required for this purpose. This makes increasing authorised capital relatively straightforward. However, the ordinary resolution must be passed at a properly convened EGM (or AGM) or through postal ballot with proper notice.",
  },
  {
    q: "What are Forms MGT-14 and SH-7 and when must they be filed?",
    a: "Form MGT-14 is filed with the Registrar of Companies to notify the passing of certain types of resolutions including those for alteration of the MOA. It must be filed within 30 days of passing the ordinary resolution at the EGM. Form SH-7 is the specific form used to notify the Registrar of an increase in authorised share capital under Section 64 of the Companies Act. It must also be filed within 30 days of passing the resolution. Both forms are filed online on the MCA portal with digital signatures of a director.",
  },
  {
    q: "What ROC fees apply when increasing authorised share capital?",
    a: "The ROC charges a filing fee for Form SH-7 based on the amount of increase in authorised capital. The fee structure (for companies other than small companies and OPCs) is approximately: ₹500 for increase up to ₹1 lakh; ₹1,000 for increase up to ₹5 lakh; ₹1,500 for increase up to ₹10 lakh; ₹2,000 for increase up to ₹25 lakh; ₹5,000 for increase up to ₹1 crore; and higher for larger amounts. Stamp duty on the altered MOA is payable additionally as per the relevant state&apos;s stamp duty rates — typically 0.1% to 0.2% of the increase amount.",
  },
  {
    q: "How long does it take to complete the authorised capital increase?",
    a: "The complete process typically takes 7 to 10 business days from the date of the EGM, subject to timely document preparation and MCA portal processing. The timeline includes: convening the EGM (minimum 21 days notice for non-exempt cases, or shorter with shareholder consent in writing), filing MGT-14 and SH-7 within 30 days of the resolution, and MCA portal processing time of 2-5 business days. Emergency increases (for imminent funding) can be expedited by obtaining shareholder consent in writing without holding a physical EGM.",
  },
  {
    q: "Can the authorised capital be increased without holding a physical EGM?",
    a: "Yes. Under Section 110 of the Companies Act, certain businesses that would ordinarily require shareholder approval at an EGM can be conducted through postal ballot — a written voting process without a physical meeting. Additionally, under the Companies Act, if all shareholders give their written consent to pass a resolution without holding a meeting (under Section 186 of the Act read with relevant provisions), an EGM may not be required. We advise on the fastest and most practical route based on the company&apos;s shareholding structure and urgency.",
  },
  {
    q: "Does increasing authorised capital affect the company&apos;s existing shareholders?",
    a: "No. Merely increasing the authorised share capital does not in any way affect the existing shareholders&apos; economic rights, shareholding percentage, or voting rights. It simply creates headroom — the maximum number of shares the company is allowed to issue increases. The actual issuance of new shares (which would dilute existing shareholders) is a separate process requiring its own board and shareholder approvals, including preemption rights compliance. Increasing authorised capital is a purely administrative step to enable future share issuances.",
  },
  {
    q: "What is the maximum authorised capital a Private Limited Company can have?",
    a: "There is no statutory upper limit on the authorised share capital of a Private Limited Company in India. However, the higher the authorised capital, the higher the ROC filing fees (on SH-7) and stamp duty on the altered MOA. Most early-stage startups start with ₹1-5 lakh authorised capital. After a Series A or B fundraising, they may need ₹5-50 crore of authorised capital to accommodate investor shares plus an ESOP pool. Large established companies may have authorised capital in the thousands of crores. The practical consideration is balancing administrative costs against the headroom needed for at least the next 2-3 years.",
  },
];

export function IncreaseAuthorisedCapitalPage() {
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
            <span className="text-accent">Increase Authorised Capital</span>
          </nav>
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Eyebrow label="MCA / Corporate Filing" />
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" itemProp="name">
              Increase Authorised{" "}
              <span className="text-accent">Share Capital</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl" itemProp="description">
              Expand your company&apos;s authorised capital with precision — EGM ordinary resolution, Form MGT-14 within 30 days, altered MOA, and Form SH-7 filing. Essential before funding rounds, ESOP creation, bonus issuance, or debt-to-equity conversion.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-7 py-3.5 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors">
                Increase Capital Now <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-white/10 transition-colors">
                <Phone size={15} /> Talk to a CS
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

      {/* WHAT IS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Overview" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">
                What is Increase in Authorised Share Capital?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-5">
                Authorised share capital is the maximum value of shares a company can issue as specified in its <strong className="text-dark">Memorandum of Association (MOA)</strong>. A company cannot issue paid-up capital exceeding its authorised capital without first increasing it through an <strong className="text-dark">Ordinary Resolution</strong> and filing with the RoC.
              </p>
              <p className="text-muted text-base leading-relaxed mb-5">
                The process under <strong className="text-dark">Section 61</strong> of the Companies Act, 2013 requires: (1) EGM Ordinary Resolution approving the increase; (2) <strong className="text-dark">Form MGT-14</strong> filed within 30 days; (3) Altered MOA reflecting new capital; and (4) <strong className="text-dark">Form SH-7</strong> filed with the Registrar of Companies within 30 days.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                Most Indian startups incorporate with ₹1-10 lakh authorised capital and need to increase it before their first funding round, ESOP pool creation, or convertible note conversion. ROC filing fees on SH-7 and stamp duty on the altered MOA are additional to professional fees.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Ordinary Resolution (Simple Majority)", "MGT-14 within 30 Days", "Altered MOA Required", "SH-7 Filing with RoC"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-primary/5 border border-primary/15 rounded-3xl p-8">
                <Eyebrow label="When to Increase Capital" />
                <p className="font-heading font-bold text-dark text-base mb-5">Common Triggers for Capital Increase</p>
                <div className="space-y-3">
                  {[
                    { trigger: "Angel / Seed Funding Round",       detail: "Need headroom for new investor shares" },
                    { trigger: "Series A / B Investment",          detail: "Institutional investors need large block" },
                    { trigger: "ESOP Pool Creation",               detail: "Typically 5-15% reserved for employees" },
                    { trigger: "Convertible Note Conversion",      detail: "CCDs/NCDs converting to equity shares" },
                    { trigger: "Bonus Share Issuance",             detail: "Paid-up capital cannot exceed authorised" },
                    { trigger: "Rights Issue to Existing Members", detail: "Additional shares to existing shareholders" },
                    { trigger: "Co-Founder Equity Issuance",       detail: "New co-founder joining needs shares" },
                  ].map((item) => (
                    <div key={item.trigger} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                      <CheckCircle size={13} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-heading font-semibold text-dark text-xs">{item.trigger}</p>
                        <p className="text-muted text-xs">{item.detail}</p>
                      </div>
                    </div>
                  ))}
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Who Needs to Increase Authorised Capital?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              Any company planning new share issuances must first verify and increase its authorised capital if needed.
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Why Increase Authorised Share Capital?</h2>
            <p className="text-muted mt-4">Create the headroom your company needs for growth, funding, and employee equity.</p>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Capital Increase Process - Step by Step</h2>
            <p className="text-muted mt-4">From EGM resolution to updated MCA records — completed in 7-10 business days.</p>
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

      {/* DOCUMENTS & PRICING */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow label="Documentation" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">Documents Required</h2>
              <p className="text-muted leading-relaxed mb-8">
                We draft all resolutions, altered MOA, and file both MGT-14 and SH-7 on your behalf.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
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
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading font-bold text-dark text-sm mb-2">Stamp Duty on Altered MOA</p>
                    <p className="text-muted text-xs leading-relaxed">
                      Stamp duty on the altered MOA is payable under the relevant State Stamp Act. Rates vary by state — typically 0.1% to 0.2% of the increase in authorised capital. For example, in Maharashtra, stamp duty on MOA alteration for a ₹10 lakh capital increase is approximately ₹1,000. This is separate from professional fees and ROC filing fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-primary rounded-3xl p-8 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet size={18} className="text-accent" />
                  <p className="font-heading font-semibold text-base">Starting at ₹4,999</p>
                </div>
                <p className="text-white/60 text-xs mb-5 leading-relaxed">
                  Professional fee inclusive of Board Resolution, EGM documents, altered MOA, MGT-14 and SH-7 filing. ROC filing fees and stamp duty are charged at actuals.
                </p>
                <div className="space-y-2 mb-5">
                  {["Board and EGM Resolution Drafting", "Altered MOA Preparation", "MGT-14 Filing (within 30 days)", "SH-7 Filing with RoC", "Stamp Duty Computation", "MCA Portal Tracking", "Updated Company Records Confirmation"].map(pt => (
                    <div key={pt} className="flex items-center gap-2">
                      <CheckCircle size={12} className="text-accent shrink-0" />
                      <span className="text-white/80 text-xs">{pt}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 mb-5">
                  <p className="text-white/60 text-xs mb-2">Timeline:</p>
                  <div className="space-y-1">
                    {[
                      { phase: "Document Preparation",   time: "1-2 days" },
                      { phase: "EGM (if required)",      time: "1-21 days" },
                      { phase: "MGT-14 + SH-7 Filing",   time: "1-2 days" },
                      { phase: "MCA Processing",         time: "2-5 days" },
                      { phase: "Total",                  time: "7-10 business days" },
                    ].map(item => (
                      <div key={item.phase} className="flex justify-between text-xs">
                        <span className="text-white/60">{item.phase}</span>
                        <span className="text-white font-heading font-semibold">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/contact"
                  className="w-full py-3 bg-accent text-dark text-xs font-heading font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors">
                  Increase Capital Now <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50" itemScope itemType="https://schema.org/FAQPage">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-14">
            <Eyebrow label="FAQ" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Frequently Asked Questions</h2>
            <p className="text-muted mt-4">Everything about increasing authorised share capital, MGT-14, SH-7, and MCA compliance.</p>
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
