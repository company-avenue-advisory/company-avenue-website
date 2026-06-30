"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Landmark, FileText, BadgeCheck, Repeat2, CheckCircle,
  ArrowRight, Phone, IndianRupee, XCircle, Building2, AlertCircle,
  ShieldCheck, Users, TrendingUp, Award, UserCheck, LifeBuoy,
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

const methods = [
  { title: "STK-2 Strike Off (Section 248)", desc: "For dormant or inactive companies. Fastest route — file STK-2 with ROC after clearing all dues and pending filings.", time: "3–6 months" },
  { title: "Fast Track Exit (FTE)", desc: "MCA scheme for companies with NIL assets & liabilities. Directors apply directly via MCA portal.", time: "3–4 months" },
  { title: "Voluntary Winding Up (NCLT)", desc: "For companies with assets/creditors. Liquidator appointed, assets distributed, NCLT dissolution order obtained.", time: "12–24 months" },
];

const quickFacts = [
  { icon: Clock, label: "Timeline (STK-2)", value: "3–6 Months" },
  { icon: Landmark, label: "Authority", value: "ROC / NCLT" },
  { icon: FileText, label: "Key Form", value: "STK-2 (Strike Off)" },
  { icon: IndianRupee, label: "Starting From", value: "₹7,999" },
  { icon: BadgeCheck, label: "Outcome", value: "Company Dissolved" },
  { icon: Repeat2, label: "Revival Window", value: "20 years (post dissolution)" },
];

const prerequisites = [
  "No pending litigation or legal proceedings",
  "All ROC annual returns filed up to date",
  "All Income Tax returns filed and dues cleared",
  "GST registration cancelled (GSTR-10 final return filed)",
  "No outstanding bank loans or creditor dues",
  "TAN surrendered / TDS dues cleared",
  "Company bank account closed",
  "No assets or liabilities (for STK-2/FTE route)",
];

const steps = [
  { n: "01", title: "Eligibility Assessment", desc: "Determine the appropriate closure route based on company's financial status and pending filings." },
  { n: "02", title: "Clear Pending Filings", desc: "File all overdue ROC returns, ITRs, and GST returns. Pay all outstanding fees and penalties." },
  { n: "03", title: "Close Operations", desc: "Settle all creditor dues, close bank accounts, and surrender all licenses and registrations." },
  { n: "04", title: "Board & Member Resolution", desc: "Pass board resolution and special resolution in EGM authorising closure of the company." },
  { n: "05", title: "Indemnity Bond & Affidavit", desc: "All directors sign indemnity bond (STK-3) and affidavit (STK-4) on stamp paper." },
  { n: "06", title: "File STK-2", desc: "Submit Form STK-2 on MCA portal with statement of accounts, board resolution, and supporting documents." },
  { n: "07", title: "ROC Scrutiny & Public Notice", desc: "ROC publishes notice in Official Gazette inviting objections for 30 days." },
  { n: "08", title: "Strike Off & Dissolution", desc: "If no objections, ROC strikes off the company name from the register — dissolution complete." },
];

const faqs = [
  { q: "Can a company with outstanding dues be struck off?", a: "No. All statutory dues — including ROC fees, income tax, TDS, GST, and any creditor liabilities — must be cleared before filing STK-2. Attempting to close with pending dues can result in prosecution of directors." },
  { q: "What happens to a company's assets when it's wound up?", a: "In an STK-2 closure, the company should have NIL assets. In a voluntary winding up via NCLT, a liquidator is appointed who realises and distributes assets: first to secured creditors, then unsecured, then shareholders." },
  { q: "Can a struck-off company be revived?", a: "Yes. Under Section 252(1), any person aggrieved by the strike off can apply to NCLT within 20 years for revival. However, in practice, revival is expensive and time-consuming — it's better to do proper closure." },
  { q: "Is NCLT (court) required for company closure?", a: "No, for the STK-2 / FTE route (for inactive/dormant companies), the process is handled administratively through the ROC without any court involvement. NCLT is required only for voluntary winding up when the company has creditors or ongoing operations." },
  { q: "What is the difference between Strike Off and Winding Up?", a: "Strike Off (STK-2) is an administrative dissolution for inactive companies with NIL assets/liabilities. Winding Up (via NCLT) is a formal insolvency/liquidation process where a liquidator distributes remaining assets to stakeholders before dissolution." },
  { q: "How long can a company remain inactive before forced strike off?", a: "Under Section 248, the ROC can initiate strike off if a company has not commenced business within 2 years of incorporation, OR has not filed financial statements/annual returns for 2 consecutive years. This can lead to director disqualification." },
];

export function CompanyClosurePage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-primary-700 pt-36 pb-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container-custom relative max-w-3xl">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0} className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-4 block">MCA / ROC Compliance • Company Avenue Advisory</motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-heading font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-6">Company Closure<br />(Strike Off & Wind Up)</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/60 text-lg mb-8">Legally dissolve your company via STK-2 strike off or voluntary winding up through NCLT. Expert CA support to clear all pending filings, close registrations, and achieve clean dissolution. Starting ₹7,999.</motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-500 transition-colors shadow-lg">Start Closure <ArrowRight size={15} /></Link>
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
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Options</span><h2 className="font-heading font-bold text-3xl text-dark">Closure Methods Available</h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            {methods.map((m, i) => (
              <motion.div key={m.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all">
                <h3 className="font-heading font-bold text-dark mb-3">{m.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{m.desc}</p>
                <span className="inline-block text-xs font-heading font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full">Timeline: {m.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Before Filing</span><h2 className="font-heading font-bold text-3xl text-dark">Prerequisites for Closure</h2></div>
          <div className="max-w-2xl mx-auto grid gap-3">
            {prerequisites.map((p, i) => (
              <motion.div key={p} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
                <CheckCircle size={16} className="text-primary shrink-0" />
                <span className="text-sm text-dark">{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Process</span><h2 className="font-heading font-bold text-3xl text-dark">Step-by-Step Closure Process</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="bg-white p-6 rounded-2xl border border-slate-100">
                <span className="font-heading font-black text-3xl text-primary/10 mb-3 block">{s.n}</span>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{s.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
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
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Shut Down Cleanly & Legally</h2>
          <p className="text-white/60 text-lg mb-8">Our experts clear all pending filings, settle dues, and file the strike-off application on your behalf.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold rounded-xl hover:bg-amber-500 transition-colors">Start Company Closure <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
