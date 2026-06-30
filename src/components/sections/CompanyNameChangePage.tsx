"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Landmark, FileText, BadgeCheck, Repeat2, CheckCircle,
  ArrowRight, Phone, IndianRupee, Pencil, Building2, TrendingUp,
  ShieldCheck, Users, Globe, Award, UserCheck, LifeBuoy,
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
  { icon: Clock, label: "Timeline", value: "15–20 Working Days" },
  { icon: Landmark, label: "Authority", value: "ROC / MCA" },
  { icon: FileText, label: "Key Form", value: "INC-24 + MGT-14" },
  { icon: IndianRupee, label: "Starting From", value: "₹3,999" },
  { icon: BadgeCheck, label: "Outcome", value: "New Certificate of Incorporation" },
  { icon: Repeat2, label: "Requirement", value: "Special Resolution required" },
];

const steps = [
  { n: "01", title: "Name Search & Availability", desc: "Check name availability on MCA portal and verify there's no trademark conflict." },
  { n: "02", title: "Board Resolution", desc: "Pass a Board Resolution proposing the name change and calling for an EGM." },
  { n: "03", title: "Special Resolution (EGM)", desc: "Pass Special Resolution in EGM or through Postal Ballot as per Section 13." },
  { n: "04", title: "File MGT-14", desc: "File MGT-14 with ROC within 30 days of passing the special resolution." },
  { n: "05", title: "File INC-24", desc: "Submit Form INC-24 to ROC for approval of name change with requisite fees." },
  { n: "06", title: "ROC Scrutiny & Approval", desc: "ROC reviews the application and issues approval or raises queries." },
  { n: "07", title: "New Certificate of Incorporation", desc: "ROC issues a fresh Certificate of Incorporation with the new company name and amended MOA/AOA." },
  { n: "08", title: "Update Records", desc: "Update PAN, GST, bank accounts, contracts, signboards, and stationery." },
];

const whoNeeds = [
  { icon: TrendingUp, title: "Rebranding Companies", desc: "Business pivoting to a new brand identity or product focus." },
  { icon: Globe, title: "Mergers & Acquisitions", desc: "Target company renamed post-acquisition by new promoters." },
  { icon: Building2, title: "Business Diversification", desc: "Expanding into new sectors requiring a relevant company name." },
  { icon: Pencil, title: "Name Conflict Resolution", desc: "Changing name to avoid confusion with similar-named companies." },
  { icon: ShieldCheck, title: "Trademark Protection", desc: "Aligning company name with registered trademark." },
  { icon: Users, title: "Promoter Change", desc: "New promoters wanting to reflect their identity in company name." },
  { icon: Award, title: "Market Positioning", desc: "Premium repositioning requiring a more aspirational name." },
  { icon: IndianRupee, title: "Investor Requirement", desc: "Investor mandating a name change as a condition of funding." },
];

const documents = [
  { label: "Board Resolution for EGM notice" },
  { label: "Notice of EGM with proposed special resolution" },
  { label: "Minutes of EGM with special resolution text" },
  { label: "Form MGT-14 (filed before INC-24)" },
  { label: "Latest MOA & AOA of the company" },
  { label: "Certificate of Incorporation (current)" },
  { label: "Latest audited financial statements" },
  { label: "Director's declaration (no pending penalties)" },
];

const faqs = [
  { q: "Can the ROC reject the new company name?", a: "Yes. The ROC can reject the name if it is identical or too similar to an existing company, if it violates the Companies (Incorporation) Rules 2014, or if it infringes a registered trademark. Always run a thorough name search before filing INC-24." },
  { q: "Does a name change affect existing contracts?", a: "No. All existing contracts, rights, and obligations continue under the new name. The company's CIN remains the same. However, it's good practice to inform counterparties in writing about the name change." },
  { q: "Do we need to update GST registration after name change?", a: "Yes. You must file a GST Amendment (non-core amendment) on the GST portal to update the legal name. This requires the new Certificate of Incorporation as supporting document." },
  { q: "Is a Special Resolution mandatory for name change?", a: "Yes. Under Section 13(2) of the Companies Act 2013, altering the MOA to change the company name requires a Special Resolution (3/4th majority) passed in a General Meeting." },
  { q: "How long does a company name change take?", a: "After all documents are ready, the process typically takes 15–20 working days: MGT-14 filing (30-day window) + INC-24 ROC processing (10–15 working days). Expedited processing is sometimes possible." },
  { q: "Can a Private Limited Company change its name to include 'Limited' or vice versa?", a: "No. 'Private Limited' is part of the company type, not the business name. A Pvt Ltd company must retain 'Private Limited' suffix. Conversion from private to public would be a separate process." },
];

export function CompanyNameChangePage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-primary-700 pt-36 pb-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container-custom relative max-w-3xl">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0} className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-4 block">MCA / ROC Compliance • Company Avenue Advisory</motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-heading font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-6">Change Company Name</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/60 text-lg mb-8">Rebrand your company legally via Special Resolution, MGT-14, and INC-24 filing with the ROC. Get a fresh Certificate of Incorporation within 15–20 working days. Starting ₹3,999.</motion.p>
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
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Ideal For</span><h2 className="font-heading font-bold text-3xl text-dark">Who Needs a Name Change?</h2></div>
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
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Documents</span><h2 className="font-heading font-bold text-3xl text-dark">Documents Required</h2></div>
          <div className="space-y-3">
            {documents.map((d, i) => (
              <motion.div key={d.label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100">
                <CheckCircle size={16} className="text-primary shrink-0" />
                <span className="text-sm text-dark">{d.label}</span>
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
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Ready to Rebrand Your Company?</h2>
          <p className="text-white/60 text-lg mb-8">Get your new Certificate of Incorporation with the new name in 15–20 working days.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold rounded-xl hover:bg-amber-500 transition-colors">Start Name Change <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
