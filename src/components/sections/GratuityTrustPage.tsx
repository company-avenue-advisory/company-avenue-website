"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Landmark, FileText, BadgeCheck, Repeat2, CheckCircle,
  ArrowRight, Phone, IndianRupee, Users, ShieldCheck, TrendingUp,
  Award, DollarSign, Building2, HeartPulse, HandHeart,
  UserCheck, LifeBuoy,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] } }),
};

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left group">
        <span className="font-heading font-semibold text-dark text-sm pr-4 group-hover:text-primary transition-colors">{q}</span>
        <span className="shrink-0 w-6 h-6 rounded-full bg-primary/8 flex items-center justify-center text-primary text-lg font-light">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <p className="text-muted text-sm leading-relaxed pb-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const quickFacts = [
  { icon: Clock, label: "Timeline", value: "45–60 Working Days" },
  { icon: Landmark, label: "Authority", value: "Commissioner of Income Tax" },
  { icon: FileText, label: "Act", value: "Payment of Gratuity Act 1972" },
  { icon: IndianRupee, label: "Starting From", value: "₹14,999" },
  { icon: BadgeCheck, label: "Tax Deduction", value: "Section 36(1)(v) — u/s 40A(7)" },
  { icon: Repeat2, label: "Exemption Limit", value: "₹20 Lakh (Section 10(10))" },
];

const gratuityFormula = [
  { label: "Formula", value: "15/26 × Last Drawn Salary × Years of Service" },
  { label: "Eligibility", value: "Minimum 5 years of continuous service" },
  { label: "Last Salary", value: "Basic + DA (Dearness Allowance)" },
  { label: "Max Exempt", value: "₹20,00,000 (Section 10(10) of Income Tax Act)" },
  { label: "Payment Deadline", value: "Within 30 days of becoming payable" },
  { label: "Penalty for Delay", value: "Simple interest @ 10% p.a. from due date" },
];

const whoNeeds = [
  { icon: Building2, title: "Companies (10+ Employees)", desc: "Any establishment with 10 or more employees for at least 1 day is mandatorily covered under the Gratuity Act." },
  { icon: TrendingUp, title: "Startups Scaling Up", desc: "Planning to retain employees long-term and optimise employer tax deductions." },
  { icon: DollarSign, title: "Tax Planning Companies", desc: "Employer contributions to an approved trust are deductible u/s 36(1)(v) — saving corporate tax." },
  { icon: Users, title: "Large Employers", desc: "Companies with 100+ employees where gratuity liability is significant — trust provides better funding control." },
  { icon: Award, title: "PE-Backed Companies", desc: "PE investors often require structured employee benefit trust as part of HR governance." },
  { icon: HeartPulse, title: "Healthcare Organisations", desc: "Hospitals with long-tenured nursing and medical staff with significant gratuity exposure." },
  { icon: HandHeart, title: "NGOs & Institutions", desc: "Schools, colleges, and charitable institutions with 10+ employees." },
  { icon: ShieldCheck, title: "Manufacturing Units", desc: "Factories with long-service blue-collar workers accumulating substantial gratuity liabilities." },
];

const steps = [
  { n: "01", title: "Gratuity Liability Assessment", desc: "Calculate current and projected gratuity liability based on employee count, salary, and tenure." },
  { n: "02", title: "Trust Deed Drafting", desc: "Draft the Gratuity Trust Deed with trustees, trust objectives, investment policy, and benefit rules." },
  { n: "03", title: "Board Approval", desc: "Pass board resolution approving formation of gratuity trust and appointing trustees." },
  { n: "04", title: "Trust Registration", desc: "Register the Trust Deed with the local Sub-Registrar as per the Indian Trusts Act / respective state trusts acts." },
  { n: "05", title: "IT Recognition Application", desc: "Apply to the Commissioner of Income Tax for recognition of the trust u/s 36(1)(v) for employer deduction." },
  { n: "06", title: "CIT Recognition", desc: "Commissioner reviews the trust deed and issues recognition certificate — typically takes 30–45 days." },
  { n: "07", title: "Trust Bank Account", desc: "Open a separate bank account for the trust. Transfer initial contribution from employer." },
  { n: "08", title: "Annual Contributions", desc: "Actuary computes annual contribution based on projected liability. Contribution is deposited before March 31 for deduction in the current FY." },
];

const faqs = [
  { q: "Is gratuity mandatory for all companies?", a: "Yes. Under the Payment of Gratuity Act 1972, every establishment with 10 or more employees (on any day during the preceding 12 months) is mandatorily covered. Once covered, the act continues to apply even if employee count falls below 10." },
  { q: "What is the difference between an approved and non-approved gratuity trust?", a: "An approved gratuity trust (recognised by the Commissioner of Income Tax u/s 36(1)(v)) allows employer contributions to be claimed as tax-deductible expenses. A non-approved trust does not get this deduction — employer can only deduct actual gratuity paid when an employee leaves." },
  { q: "What is the maximum gratuity that is tax-exempt for employees?", a: "The maximum gratuity exempt from income tax for an employee is ₹20 lakh under Section 10(10) of the Income Tax Act. Gratuity above ₹20 lakh is taxable as salary income in the hands of the employee." },
  { q: "What if a company does not set up a gratuity trust?", a: "Companies without an approved trust can still pay gratuity — but they can only claim tax deduction when actual payment is made (not when provisioned). This creates cash flow challenges for large organisations. Additionally, if they cannot pay, employees can file claims with the Controlling Authority." },
  { q: "Can an actuary certificate be avoided?", a: "No. An actuarial valuation is required annually to determine the appropriate contribution to the gratuity trust. The actuary uses mortality tables, salary growth assumptions, and attrition rates to compute the present value of future gratuity obligations." },
  { q: "What is the alternative to a Gratuity Trust?", a: "The most common alternative is a Group Gratuity Policy with LIC (Life Insurance Corporation of India) or private insurers. Premiums paid to LIC are also deductible u/s 36(1)(v). Many SMEs prefer the LIC route as it is simpler than managing a separate trust — but large companies benefit from more control through their own trust." },
];

export function GratuityTrustPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-primary-700 pt-36 pb-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container-custom relative max-w-3xl">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0} className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-4 block">Payroll & HR • Company Avenue Advisory</motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-heading font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-6">Gratuity Trust<br />Registration</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/60 text-lg mb-8">Set up an Income Tax-approved Gratuity Trust under Section 36(1)(v) to make employer gratuity contributions tax-deductible. Mandatory compliance + long-term employee benefit planning. Starting ₹14,999.</motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-500 transition-colors shadow-lg">Set Up Gratuity Trust <ArrowRight size={15} /></Link>
            <a href="tel:+919876543210" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-heading font-medium text-sm rounded-xl hover:bg-white/20 transition-colors border border-white/20"><Phone size={14} /> Call Expert</a>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickFacts.map((f, i) => (
              <motion.div key={f.label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="text-center p-4 rounded-2xl bg-primary/4 border border-primary/8">
                <f.icon size={20} className="text-primary mx-auto mb-2" />
                <p className="text-[11px] text-muted font-heading font-medium mb-0.5">{f.label}</p>
                <p className="text-xs font-heading font-bold text-dark">{f.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Gratuity Formula</span>
              <h2 className="font-heading font-bold text-3xl text-dark mb-6">How Gratuity Is Calculated</h2>
              <div className="bg-white border-2 border-primary/20 rounded-2xl p-6 mb-6">
                <p className="font-heading font-bold text-primary text-lg mb-2">Gratuity = 15/26 × Last Salary × Years of Service</p>
                <p className="text-muted text-sm">Where "Last Salary" = Basic + Dearness Allowance</p>
              </div>
              <div className="space-y-3">
                {gratuityFormula.map((g) => (
                  <div key={g.label} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                    <span className="text-sm text-muted font-heading">{g.label}</span>
                    <span className="text-sm font-heading font-semibold text-dark">{g.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Who Needs It</span>
              <h2 className="font-heading font-bold text-3xl text-dark mb-6">Who Should Set Up a Gratuity Trust?</h2>
              <div className="space-y-3">
                {whoNeeds.map((w) => (
                  <div key={w.title} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5"><w.icon size={15} className="text-primary" /></div>
                    <div>
                      <h3 className="font-heading font-semibold text-dark text-sm">{w.title}</h3>
                      <p className="text-muted text-xs">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Process</span><h2 className="font-heading font-bold text-3xl text-dark">Gratuity Trust Setup Process</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all">
                <span className="font-heading font-black text-3xl text-primary/10 mb-3 block">{s.n}</span>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{s.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">FAQs</span><h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions</h2></div>
          <div className="bg-white rounded-2xl p-6">{faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-dark to-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Protect Your Employees & Save Tax</h2>
          <p className="text-white/60 text-lg mb-8">Set up an approved Gratuity Trust and make employer contributions fully tax-deductible.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold rounded-xl hover:bg-amber-500 transition-colors">Set Up Gratuity Trust <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
