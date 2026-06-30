"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Landmark, FileText, BadgeCheck, CheckCircle, ArrowRight,
  Phone, IndianRupee, TrendingUp, Users, Building2, Award,
  ShieldCheck, DollarSign, Repeat2, UserCheck, LifeBuoy,
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
  { icon: Clock, label: "Timeline", value: "7–10 Working Days" },
  { icon: Landmark, label: "Authority", value: "ROC / MCA" },
  { icon: FileText, label: "Key Form", value: "SH-7 + MGT-14" },
  { icon: IndianRupee, label: "Starting From", value: "₹2,999" },
  { icon: BadgeCheck, label: "Outcome", value: "Updated MOA & ROC Record" },
  { icon: Repeat2, label: "Prerequisite", value: "Ordinary Resolution" },
];

const whoNeeds = [
  { icon: TrendingUp, title: "Fundraising Startups", desc: "Increasing cap before issuing new equity shares to investors." },
  { icon: Users, title: "Growing Companies", desc: "Expanding authorised capital to accommodate employee ESOPs." },
  { icon: DollarSign, title: "FDI Recipients", desc: "Raising authorised capital before fresh FDI infusion." },
  { icon: Building2, title: "Bonus Issue Companies", desc: "Capital increase required before issuing bonus shares to shareholders." },
  { icon: Award, title: "Pre-IPO Companies", desc: "Increasing authorised capital as part of pre-IPO restructuring." },
  { icon: ShieldCheck, title: "Merger Targets", desc: "Target company aligning authorised capital for share swap arrangements." },
  { icon: IndianRupee, title: "Loan Conversion", desc: "Converting debt to equity requires sufficient authorised capital." },
  { icon: Repeat2, title: "Rights Issue", desc: "Offering new shares to existing shareholders in a rights issue." },
];

const steps = [
  { n: "01", title: "Review MOA", desc: "Check the Capital Clause (Clause V) of the Memorandum of Association for current authorised capital." },
  { n: "02", title: "Calculate New Capital", desc: "Determine the new authorised capital amount and additional stamp duty / ROC fees payable." },
  { n: "03", title: "Board Resolution", desc: "Pass a board resolution proposing the increase and convening a General Meeting." },
  { n: "04", title: "Ordinary Resolution (GM)", desc: "Pass an Ordinary Resolution in the General Meeting to increase authorised capital under Section 61." },
  { n: "05", title: "File SH-7", desc: "Submit Form SH-7 to ROC within 30 days of passing the resolution, with ROC filing fees." },
  { n: "06", title: "File MGT-14", desc: "File MGT-14 with a certified copy of the resolution within 30 days." },
  { n: "07", title: "ROC Confirmation", desc: "ROC updates the company's master data with the new authorised capital on MCA portal." },
  { n: "08", title: "MOA Amendment", desc: "Incorporate the new Capital Clause in the MOA and update company records." },
];

const documents = [
  "Board resolution proposing capital increase",
  "Notice of General Meeting with agenda",
  "Minutes of General Meeting with ordinary resolution",
  "Altered MOA showing new Capital Clause",
  "Latest audited financials",
  "Form SH-7 (signed by director + practising CA/CS)",
  "Form MGT-14 with certified resolution copy",
  "Proof of payment of additional stamp duty on increased capital",
];

const faqs = [
  { q: "What is the difference between authorised capital and paid-up capital?", a: "Authorised capital is the maximum share capital a company is permitted to issue as per its MOA. Paid-up capital is the actual amount shareholders have invested. A company can only issue shares up to its authorised capital limit." },
  { q: "What are the ROC fees for increasing authorised capital?", a: "ROC filing fees for SH-7 are based on the increased amount: ₹5,000 for increase up to ₹1 lakh, ₹3,000 for every additional ₹1 lakh up to ₹5 lakh, and so on. Additionally, state-wise stamp duty applies on the increased MOA capital clause." },
  { q: "Is a Special Resolution required for authorised capital increase?", a: "No. Under Section 61(1)(a) of the Companies Act 2013, increasing authorised share capital requires only an Ordinary Resolution (simple majority) in a General Meeting — unlike reduction of capital which needs a Special Resolution." },
  { q: "Can we increase authorised capital and issue shares simultaneously?", a: "Yes, but the capital increase must be completed first (SH-7 filed and ROC database updated). Only after the authorised capital is increased can you allot new shares via PAS-3 filing." },
  { q: "What is the time limit for filing SH-7?", a: "Form SH-7 must be filed with ROC within 30 days of passing the ordinary resolution. Late filing attracts additional fees per day. MGT-14 also needs to be filed within 30 days of the resolution date." },
  { q: "Does increasing authorised capital affect the company's tax liability?", a: "No, authorised capital increase does not directly affect corporate tax. However, any fresh paid-up capital infused through share allotment is subject to securities premium accounting and must comply with Section 56(2)(viib) (Angel Tax provisions for non-listed companies)." },
];

export function IncreaseAuthorisedCapitalPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-primary-700 pt-36 pb-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container-custom relative max-w-3xl">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0} className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-4 block">MCA / ROC Compliance • Company Avenue Advisory</motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-heading font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-6">Increase Authorised<br />Share Capital</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/60 text-lg mb-8">Increase your company's authorised share capital via Ordinary Resolution, Form SH-7, and MGT-14 filing with ROC under Section 61 of Companies Act 2013. Starting ₹2,999 (excl. govt fees).</motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-500 transition-colors shadow-lg">Get Started <ArrowRight size={15} /></Link>
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
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Ideal For</span><h2 className="font-heading font-bold text-3xl text-dark">Who Needs to Increase Authorised Capital?</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whoNeeds.map((w, i) => (
              <motion.div key={w.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4"><w.icon size={18} className="text-primary" /></div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{w.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Process</span><h2 className="font-heading font-bold text-3xl text-dark">Step-by-Step Process</h2></div>
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
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Checklist</span><h2 className="font-heading font-bold text-3xl text-dark">Documents Required</h2></div>
          <div className="space-y-3">
            {documents.map((d, i) => (
              <motion.div key={d} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100">
                <CheckCircle size={16} className="text-primary shrink-0" />
                <span className="text-sm text-dark">{d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">FAQs</span><h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions</h2></div>
          <div className="bg-slate-50 rounded-2xl p-6">{faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-dark to-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Ready to Raise Your Capital Ceiling?</h2>
          <p className="text-white/60 text-lg mb-8">Increase authorised capital in 7–10 working days with full ROC compliance support.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold rounded-xl hover:bg-amber-500 transition-colors">Increase Capital Now <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
