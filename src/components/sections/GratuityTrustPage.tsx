"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  Building2, Users, Briefcase, Award, ShieldCheck, TrendingUp,
  AlertTriangle, Clock, BadgeCheck, DollarSign,
  Landmark, Info, AlertCircle, ChevronRight, Wallet,
  BarChart3, BookOpen, Scale, Banknote, ClipboardList, UserCheck,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";
import { faqs } from "@/lib/faqs/GratuityTrustPage";

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
  { icon: DollarSign,  label: "Tax Deduction",   value: "Section 36(1)(v)" },
  { icon: Banknote,    label: "Max Tax-Exempt",   value: "₹20 Lakh per Employee" },
  { icon: Clock,       label: "Timeline",         value: "30-45 Business Days" },
  { icon: DollarSign,  label: "Starting At",      value: "₹14,999" },
  { icon: Landmark,    label: "IT Approval",      value: "Commissioner of IT" },
  { icon: BarChart3,   label: "Accounting",       value: "AS 15 / Ind AS 19" },
];

const benefits = [
  { icon: DollarSign,  title: "Tax Deduction Under Section 36(1)(v)",   desc: "Contributions made to an approved gratuity fund are deductible as a business expense under Section 36(1)(v). This converts what would be a cash outflow into a tax-efficient liability." },
  { icon: ShieldCheck, title: "Off-Balance-Sheet Liability Management",  desc: "Without a trust, gratuity is an unfunded liability on the balance sheet. With an approved trust, the liability is funded externally, improving the company&apos;s financial ratios and creditworthiness." },
  { icon: BarChart3,   title: "AS 15 / Ind AS 19 Compliance",           desc: "Proper accounting treatment under AS 15 (Employee Benefits) and Ind AS 19 requires actuarial valuation of defined benefit obligations. A trust provides the funding mechanism for this." },
  { icon: Users,       title: "Employee Benefit and Retention Tool",     desc: "An approved gratuity trust demonstrates employer commitment to employee welfare. It reassures long-serving employees that their statutory entitlement is ring-fenced and secure." },
  { icon: Scale,       title: "Managed by Independent Trustees",         desc: "Trust assets are managed separately from the company&apos;s operations by appointed trustees. This protects employee benefits even if the company faces financial difficulties." },
  { icon: Award,       title: "Actuarial Valuation for Accurate Provisioning", desc: "Annual actuarial valuation (required under AS 15 / Ind AS 19) ensures the trust corpus is adequate to meet projected gratuity obligations, preventing funding shortfalls." },
  { icon: Banknote,    title: "Maximum Tax Exemption ₹20 Lakh",         desc: "Under the Payment of Gratuity Act, gratuity up to ₹20 lakh per employee is exempt from income tax. The trust structure ensures this exemption is properly administered." },
  { icon: TrendingUp,  title: "Better Cash Flow Management",             desc: "Regular contributions to the trust spread the gratuity cost over the service period rather than creating a large one-time cash outflow when senior employees retire or leave." },
];

const whoNeeds = [
  { icon: Building2,   title: "Companies with 10+ Employees",            desc: "The Payment of Gratuity Act applies to all establishments employing 10 or more persons. Setting up an approved trust provides structured, tax-efficient compliance." },
  { icon: Users,       title: "IT / Technology Companies",               desc: "High-compensation tech companies with large workforces face significant gratuity obligations. An approved trust manages these liabilities efficiently while providing maximum tax benefit." },
  { icon: Briefcase,   title: "Manufacturing Companies with Long-Serving Staff", desc: "Manufacturing companies with blue-collar workers who often complete 5+ years of service face substantial gratuity payouts. A funded trust ensures these are met without cash flow disruption." },
  { icon: TrendingUp,  title: "Listed Companies and Ind AS Filers",      desc: "Ind AS 19 requires actuarial valuation and appropriate funding of defined benefit plans. A gratuity trust provides the funding structure required for Ind AS compliance." },
  { icon: Landmark,    title: "PSUs and Government-Aided Organisations", desc: "Public sector undertakings and government-aided organisations must have approved gratuity trusts under their service rules and relevant ministry guidelines." },
  { icon: Award,       title: "Companies Preparing for IPO or M&A",      desc: "Investors and acquirers assess employee benefit obligations during due diligence. An approved, funded gratuity trust demonstrates proper governance of HR liabilities." },
];

const processSteps = [
  { n: "01", title: "Actuarial Valuation",                    desc: "Commission an actuarial valuation from a Fellow of the Institute of Actuaries of India (FIAI). The actuary calculates the Present Value of Obligation (PVO) using assumptions for salary growth, attrition, mortality, and discount rate." },
  { n: "02", title: "Trust Deed Drafting",                    desc: "Draft the Trust Deed establishing the Private Gratuity Trust — specifying the settlor (company), trustees (at least two: one employer, one employee representative), beneficiaries, contribution provisions, investment norms, and administration rules." },
  { n: "03", title: "Board Resolution",                       desc: "Pass a Board Resolution authorising: (1) establishment of the gratuity trust; (2) appointment of trustees; (3) initial contribution to the trust corpus; and (4) authorisation to apply for Income Tax approval." },
  { n: "04", title: "Trust Registration",                     desc: "Register the Trust Deed with the Sub-Registrar of Assurances where the trust is situated. Pay stamp duty as applicable in the state. The registered Trust Deed is the foundational legal document." },
  { n: "05", title: "Application for IT Approval",            desc: "File an application before the Commissioner of Income Tax (Exemptions) under Section 2(5) of the Income Tax Act requesting approval of the gratuity trust as an &lsquo;approved gratuity fund&rsquo;." },
  { n: "06", title: "IT Approval Hearing",                    desc: "Attend hearing before the Commissioner of Income Tax. Submit Trust Deed, actuarial valuation report, Board Resolution, and supporting documents. Respond to queries raised by the Income Tax authority." },
  { n: "07", title: "Approval Order",                         desc: "Once satisfied, the Commissioner of Income Tax issues the approval order designating the trust as an &lsquo;approved gratuity fund&rsquo;. This enables Section 36(1)(v) deduction for contributions from the date of approval." },
  { n: "08", title: "Annual Administration",                  desc: "Invest trust corpus as per IT Rules (IRDA-approved funds, government securities). Conduct annual actuarial valuation. Make annual contributions. Maintain trust accounts and file trust income tax return (ITR-7)." },
];

const requiredDocs = [
  { icon: FileText,     label: "Trust Deed (duly registered)" },
  { icon: BarChart3,    label: "Actuarial Valuation Report (FIAI certified)" },
  { icon: Users,        label: "List of Trustees with consent letters" },
  { icon: Building2,    label: "Board Resolution establishing the trust" },
  { icon: FileText,     label: "Certificate of Incorporation of the company" },
  { icon: ClipboardList,label: "Employee register with salary and service details" },
  { icon: Banknote,     label: "Initial Contribution Cheque / Transfer to Trust" },
  { icon: FileText,     label: "PAN Card of the Trust" },
  { icon: BookOpen,     label: "Trust Bank Account Opening Documents" },
  { icon: FileText,     label: "Previous gratuity fund balance (if transferring)" },
];


export function GratuityTrustPage() {
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
            <span className="text-accent">Gratuity Trust Registration</span>
          </nav>
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Eyebrow label="Employee Benefits Compliance" />
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" itemProp="name">
              Private Gratuity{" "}
              <span className="text-accent">Trust Registration</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl" itemProp="description">
              Set up an Income Tax-approved private gratuity trust to claim Section 36(1)(v) deductions, comply with AS 15 / Ind AS 19, manage off-balance-sheet employee liabilities, and protect employee gratuity entitlements. Includes actuarial valuation coordination and IT approval.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-7 py-3.5 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors">
                Set Up Gratuity Trust <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111" data-track="call"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-white/10 transition-colors">
                <Phone size={15} /> Talk to a CA
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
                What is a Private Gratuity Trust?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-5">
                A Private Gratuity Trust is a trust created by an employer to fund and manage the company&apos;s gratuity obligation to employees under the <strong className="text-dark">Payment of Gratuity Act, 1972</strong>. When approved by the Commissioner of Income Tax, contributions to this trust become deductible under <strong className="text-dark">Section 36(1)(v)</strong>.
              </p>
              <p className="text-muted text-base leading-relaxed mb-5">
                Gratuity is calculated as <strong className="text-dark">(15/26) x Last Salary x Years of Service</strong>. With average salaries rising, a company with 200+ employees can face a gratuity liability of ₹5-20 crore. A funded trust manages this systematically rather than as a sudden cash outflow.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                Under <strong className="text-dark">AS 15 and Ind AS 19</strong>, the gratuity obligation must be actuarially valued and disclosed annually. The trust provides the funding structure required for proper accounting treatment and clean audit opinion on financial statements.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Section 36(1)(v) Deduction", "Actuarial Valuation Required", "AS 15 / Ind AS 19 Compliant", "IT Commissioner Approval"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-primary/5 border border-primary/15 rounded-3xl p-8">
                <Eyebrow label="Gratuity Formula" />
                <p className="font-heading font-bold text-dark text-base mb-5">Gratuity Calculation</p>
                <div className="bg-primary rounded-2xl p-5 text-white text-center mb-5">
                  <p className="font-heading font-bold text-lg mb-1">Gratuity = 15/26 &times; Last Salary &times; Years</p>
                  <p className="text-white/60 text-xs">Where Salary = Basic + Dearness Allowance</p>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Max Tax-Exempt Amount",   value: "₹20 Lakh per employee" },
                    { label: "Minimum Qualifying Service", value: "5 years continuous service" },
                    { label: "15/26 Factor",            value: "15 days per year of service" },
                    { label: "Death / Disability",      value: "Payable even below 5 years" },
                    { label: "Tax Section",             value: "Section 10(10) - Exempt" },
                    { label: "Deduction Section",       value: "Section 36(1)(v) - Trust contribution" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                      <span className="text-xs text-muted">{item.label}</span>
                      <span className="text-xs font-heading font-semibold text-dark">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                  <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">
                    <strong>Note:</strong> Without an approved trust, gratuity contributions are NOT deductible in the year of provision — only when actual payment is made.
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Who Should Set Up a Gratuity Trust?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              Any employer with significant gratuity obligations benefits from a structured, IT-approved trust.
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Benefits of an Approved Gratuity Trust</h2>
            <p className="text-muted mt-4">Tax efficiency, accounting compliance, and employee protection in one structured framework.</p>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Gratuity Trust Setup Process - Step by Step</h2>
            <p className="text-muted mt-4">From actuarial valuation to Income Tax approval — we manage the complete process.</p>
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

      {/* DOCUMENTS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow label="Documentation" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">Documents Required</h2>
              <p className="text-muted leading-relaxed mb-8">
                The following documents are needed for trust deed registration and Income Tax approval application.
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
              <div className="bg-primary rounded-3xl p-8 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet size={18} className="text-accent" />
                  <p className="font-heading font-semibold text-base">Starting at ₹14,999</p>
                </div>
                <p className="text-white/60 text-xs mb-5 leading-relaxed">
                  Comprehensive fee for trust deed drafting, registration coordination, IT approval application, and first-year administration setup.
                </p>
                <div className="space-y-2 mb-5">
                  {[
                    "Trust Deed Drafting",
                    "Trustee Appointment Support",
                    "Actuarial Valuation Coordination",
                    "Trust Registration Coordination",
                    "IT Approval Application",
                    "IT Commissioner Hearing Support",
                    "PAN and Bank Account Opening",
                    "Annual Trust Account Setup",
                  ].map(pt => (
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
                      { phase: "Trust Deed and Registration", time: "10-15 days" },
                      { phase: "IT Approval Process",         time: "20-30 days" },
                      { phase: "Total",                       time: "30-45 business days" },
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
                  Set Up Gratuity Trust <ArrowRight size={13} />
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
            <p className="text-muted mt-4">Everything about private gratuity trust setup, IT approval, actuarial valuation, and AS 15 compliance.</p>
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
