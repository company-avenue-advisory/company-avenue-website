"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Landmark, FileText, BadgeCheck, Repeat2, CheckCircle,
  ArrowRight, Phone, IndianRupee, Shield, Users, Building2,
  ShieldCheck, Award, TrendingUp, Briefcase, UserCheck, LifeBuoy,
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
  { icon: Clock, label: "Timeline", value: "30–60 Working Days" },
  { icon: Landmark, label: "Authority", value: "State Controlling Authority" },
  { icon: FileText, label: "Act", value: "PSARA 2005" },
  { icon: IndianRupee, label: "Starting From", value: "₹9,999" },
  { icon: BadgeCheck, label: "Validity", value: "5 Years (Renewable)" },
  { icon: Repeat2, label: "Security Deposit", value: "₹1 lakh – ₹3 lakh" },
];

const whoNeeds = [
  { icon: Shield, title: "Security Agencies", desc: "Any company providing armed or unarmed security guards to clients." },
  { icon: Building2, title: "Corporate Security", desc: "In-house security divisions spun off as separate agencies." },
  { icon: Users, title: "Event Security", desc: "Agencies providing crowd management and event security services." },
  { icon: TrendingUp, title: "Facility Management", desc: "FM companies offering integrated security solutions." },
  { icon: Briefcase, title: "Investigation Agencies", desc: "Detective and private investigation firms with guard deployment." },
  { icon: ShieldCheck, title: "Bank & ATM Security", desc: "Agencies specialising in financial institution security." },
  { icon: Award, title: "Industrial Security", desc: "Agencies guarding factories, warehouses, and industrial sites." },
  { icon: UserCheck, title: "Residential Security", desc: "Gated community and housing society security management firms." },
];

const steps = [
  { n: "01", title: "Eligibility Check", desc: "Verify the promoters meet character and background verification requirements under PSARA 2005." },
  { n: "02", title: "Business Registration", desc: "Ensure the security agency is registered as a company, LLP, or firm before PSARA application." },
  { n: "03", title: "Security Deposit", desc: "Deposit ₹1 lakh (up to 100 guards) or ₹3 lakh (above 100 guards) with State Controlling Authority." },
  { n: "04", title: "Training Compliance", desc: "Ensure guards have completed 100-hour training at an NSDC/NSGDF-affiliated training institute." },
  { n: "05", title: "Application Filing", desc: "Submit PSARA application to State Controlling Authority with all required documents and deposit proof." },
  { n: "06", title: "Police Verification", desc: "Background verification of promoters and key management personnel by state police." },
  { n: "07", title: "Authority Inspection", desc: "State Controlling Authority may inspect training facilities and review compliance." },
  { n: "08", title: "License Issued", desc: "PSARA license issued for 5 years upon satisfactory completion of all requirements." },
];

const documents = [
  "Certificate of Incorporation / Partnership Deed",
  "PAN and address proof of the agency",
  "Identity and address proof of all directors/partners",
  "Character certificates from police (for directors)",
  "Security deposit payment receipt",
  "Proof of training institute tie-up (NSDC/NSGDF affiliated)",
  "List of trained personnel with training certificates",
  "Details of arms licenses (if armed security provided)",
];

const faqs = [
  { q: "Who needs a PSARA license?", a: "Any person or entity providing security guards, bouncers, or security personnel to third parties for a fee must obtain a PSARA license. This includes traditional security agencies, event security companies, and integrated facility management firms with security divisions." },
  { q: "Is PSARA a national or state-level license?", a: "PSARA is state-specific — you need a separate license for each state where you deploy security personnel. The State Controlling Authority (typically a senior IPS officer) issues the license. Operations across multiple states require multiple PSARA licenses." },
  { q: "What is the consequence of operating without PSARA?", a: "Operating a private security agency without PSARA is a criminal offence under Section 4(1) of the PSARA Act 2005. Penalties include imprisonment of up to 1 year and/or a fine up to ₹25,000 for first offence, scaling up for repeat offences." },
  { q: "What training is required for security guards?", a: "All security personnel must undergo a minimum 100-hour training covering physical fitness, unarmed combat, fire safety, first aid, and professional conduct at an institute recognised by the National Skill Development Corporation (NSDC) or the National Security Guard Development Force (NSGDF)." },
  { q: "Can a foreign-owned company obtain a PSARA license?", a: "PSARA has specific restrictions on foreign investment in private security agencies. The precise FDI limits are regulated separately. Foreign companies typically operate through joint ventures with Indian security agencies that hold the PSARA license." },
  { q: "What is the renewal process for PSARA license?", a: "PSARA licenses are valid for 5 years and must be renewed before expiry. The renewal application is filed with the State Controlling Authority with updated documents, security deposit continuation proof, and compliance records of the previous 5-year period." },
];

export function PSARALicensePage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-primary-700 pt-36 pb-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container-custom relative max-w-3xl">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0} className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-4 block">Startup & MSME • Company Avenue Advisory</motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-heading font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-6">PSARA License<br />for Security Agencies</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/60 text-lg mb-8">Obtain your Private Security Agencies Regulation Act (PSARA) 2005 license from the State Controlling Authority. Mandatory for all private security agencies in India. Starting ₹9,999.</motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-500 transition-colors shadow-lg">Apply Now <ArrowRight size={15} /></Link>
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
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Who Needs It</span><h2 className="font-heading font-bold text-3xl text-dark">Who Requires a PSARA License?</h2></div>
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
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Process</span><h2 className="font-heading font-bold text-3xl text-dark">PSARA License Application Process</h2></div>
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
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Get Your PSARA License in 30–60 Days</h2>
          <p className="text-white/60 text-lg mb-8">Complete State Controlling Authority application support, police verification coordination, and training compliance.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold rounded-xl hover:bg-amber-500 transition-colors">Apply for PSARA License <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
