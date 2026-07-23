"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Globe, Building2, ShieldCheck, TrendingUp, Users, FileText,
  Landmark, BadgeCheck, Repeat2, CheckCircle, ArrowRight, Phone,
  IndianRupee, Briefcase, Factory, Zap, DollarSign, Award,
  UserCheck, LifeBuoy, Headphones, AlertCircle,
} from "lucide-react";
import { faqs } from "@/lib/faqs/BranchOfficePage";

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

const officeTypes = [
  { type: "Branch Office (BO)", desc: "Can earn revenue from Indian customers. Must be profitable for 5 consecutive years in home country.", fee: "₹1 lakh security deposit" },
  { type: "Liaison Office (LO)", desc: "Only promotional / liaison activities. Cannot earn income in India. Acts as communication channel.", fee: "No security deposit" },
  { type: "Project Office (PO)", desc: "For specific project contracts in India. Auto-approval for projects with RBI conditions.", fee: "Project-specific" },
];

const quickFacts = [
  { icon: Clock, label: "Timeline", value: "30–60 Working Days" },
  { icon: Landmark, label: "Authority", value: "RBI + MCA" },
  { icon: FileText, label: "RBI Form", value: "Form FNC (Branch/LO)" },
  { icon: IndianRupee, label: "Starting From", value: "₹19,999" },
  { icon: BadgeCheck, label: "Outcome", value: "RBI Approval Letter" },
  { icon: Repeat2, label: "Annual Return", value: "Form FLA by July 15" },
];

const whoNeeds = [
  { icon: Globe, title: "Foreign Banks", desc: "Opening banking operations in India under RBI banking license." },
  { icon: Factory, title: "Manufacturers", desc: "Testing Indian market before committing to a full subsidiary." },
  { icon: Briefcase, title: "Consulting Firms", desc: "Serving Indian clients while maintaining parent company structure." },
  { icon: TrendingUp, title: "Market Researchers", desc: "Conducting market surveys and liaison activities only (LO)." },
  { icon: Building2, title: "Construction Companies", desc: "Executing specific infrastructure or project contracts (PO)." },
  { icon: Zap, title: "Tech Companies", desc: "Providing technical support or R&D services for parent." },
  { icon: DollarSign, title: "Trading Houses", desc: "Import/export activities through branch operations." },
  { icon: Users, title: "NGOs & Foundations", desc: "Conducting charitable or development activities in India." },
];

const steps = [
  { n: "01", title: "Eligibility Assessment", desc: "Verify that the foreign company meets RBI criteria (profitable for 5 years for BO)." },
  { n: "02", title: "Document Preparation", desc: "Collect apostilled parent company documents, audited financials, and board resolution." },
  { n: "03", title: "Form FNC Filing", desc: "Submit Form FNC to an Authorised Dealer (AD) bank in India with all documents." },
  { n: "04", title: "AD Bank Scrutiny", desc: "Bank reviews documents and forwards application to RBI for approval." },
  { n: "05", title: "RBI Approval", desc: "RBI grants approval letter with Unique Identification Number (UIN) in 4–8 weeks." },
  { n: "06", title: "MCA Registration", desc: "Register with Registrar of Companies as foreign company under Section 380 of Companies Act." },
  { n: "07", title: "PAN & Tax Registrations", desc: "Obtain PAN, TAN, and GST registration for the India operations." },
  { n: "08", title: "Commence Operations", desc: "Open bank account and begin permitted activities as per RBI approval." },
];

const documents = [
  { label: "Certificate of Incorporation of foreign parent (apostilled)" },
  { label: "Memorandum & Articles of Association (apostilled)" },
  { label: "Audited financial statements for last 3–5 years" },
  { label: "Board Resolution for opening Branch/LO in India" },
  { label: "Bankers' report from parent's overseas bank" },
  { label: "Details of proposed activities in India" },
  { label: "Proof of address of proposed office in India" },
  { label: "Passport copies of authorised representatives" },
];


export function BranchOfficePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-primary-700 pt-36 pb-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0} className="inline-flex items-center gap-2 text-accent text-xs font-heading font-bold tracking-widest uppercase mb-4 block">
              Company Formation • Company Avenue Advisory
            </motion.span>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
              Branch / Liaison /<br />Project Office in India
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/60 text-lg leading-relaxed mb-8 max-w-2xl">
              Set up a Branch Office, Liaison Office, or Project Office in India with prior RBI approval under FEMA. Full application support, AD bank coordination, and annual compliance. Starting ₹19,999.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-500 transition-colors shadow-lg">
                Get Started <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111" data-track="call" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-heading font-medium text-sm rounded-xl hover:bg-white/20 transition-colors border border-white/20">
                <Phone size={14} /> Talk to Expert
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
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

      {/* Office Types */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Types</span>
            <h2 className="font-heading font-bold text-3xl text-dark">Branch, Liaison, or Project Office?</h2>
            <p className="text-muted mt-3 max-w-xl mx-auto">RBI recognises three types of foreign offices in India — each with different permitted activities.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {officeTypes.map((o, i) => (
              <motion.div key={o.type} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all">
                <h3 className="font-heading font-bold text-dark mb-3">{o.type}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{o.desc}</p>
                <span className="inline-block text-xs font-heading font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full">{o.fee}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Needs It */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Ideal For</span>
            <h2 className="font-heading font-bold text-3xl text-dark">Who Should Set Up an India Office?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whoNeeds.map((w, i) => (
              <motion.div key={w.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                  <w.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{w.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Process</span>
            <h2 className="font-heading font-bold text-3xl text-dark">Registration Steps</h2>
          </div>
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

      {/* Documents */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Checklist</span>
            <h2 className="font-heading font-bold text-3xl text-dark">Documents Required</h2>
          </div>
          <div className="space-y-3">
            {documents.map((d, i) => (
              <motion.div key={d.label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
                <CheckCircle size={16} className="text-primary shrink-0" />
                <span className="text-sm text-dark">{d.label}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">All foreign documents must be notarised and apostilled by the competent authority in the home country.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">FAQs</span>
            <h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions</h2>
          </div>
          <div className="bg-white rounded-2xl p-6">
            {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-dark to-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Set Up Your India Presence Today</h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Expert RBI application support, AD bank coordination, and annual compliance — handled by FEMA specialists.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold rounded-xl hover:bg-amber-500 transition-colors">
              Start Application <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
