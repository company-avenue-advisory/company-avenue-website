"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Globe, Building2, ShieldCheck, TrendingUp, Users, FileText,
  Landmark, BadgeCheck, Repeat2, CreditCard, Fingerprint, Banknote,
  CheckCircle, ArrowRight, Phone, IndianRupee, Briefcase, Factory,
  Zap, ShoppingBag, DollarSign, Award, UserCheck, LifeBuoy, Headphones,
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
  { icon: Clock, label: "Timeline", value: "10–15 Working Days" },
  { icon: Landmark, label: "Authority", value: "MCA + RBI (FEMA)" },
  { icon: FileText, label: "Key Form", value: "SPICe+ / INC-32" },
  { icon: IndianRupee, label: "Starting From", value: "₹14,999" },
  { icon: BadgeCheck, label: "Outcome", value: "Certificate of Incorporation" },
  { icon: Repeat2, label: "FDI Reporting", value: "FCGPR within 30 days" },
];

const whoNeeds = [
  { icon: Globe, title: "Global MNCs", desc: "Entering the Indian market for the first time." },
  { icon: Factory, title: "Manufacturers", desc: "Setting up production or assembly units in India." },
  { icon: ShoppingBag, title: "E-commerce Brands", desc: "Selling to Indian consumers via own platform." },
  { icon: TrendingUp, title: "Technology Companies", desc: "Offering SaaS, IT services, or R&D in India." },
  { icon: Briefcase, title: "Professional Services", desc: "Consultancies, law firms, and advisory firms." },
  { icon: DollarSign, title: "Investment Funds", desc: "Private equity or venture funds deploying capital." },
  { icon: Zap, title: "Startups", desc: "Foreign founders building products for India." },
  { icon: Building2, title: "Trading Companies", desc: "Import/export and distribution businesses." },
];

const benefits = [
  { icon: ShieldCheck, title: "Limited Liability", desc: "Foreign parent's exposure is limited to its investment in the Indian entity." },
  { icon: TrendingUp, title: "100% FDI in Most Sectors", desc: "Automatic route allows full foreign ownership without prior RBI approval in eligible sectors." },
  { icon: Building2, title: "Separate Legal Identity", desc: "Indian Pvt Ltd is a distinct legal entity — can own property, open accounts, sue and be sued." },
  { icon: Award, title: "Brand Credibility", desc: "An Indian incorporated entity commands greater trust among customers, vendors, and employees." },
  { icon: Globe, title: "Easy Profit Repatriation", desc: "Dividends can be repatriated after payment of DDT; royalties and fees also allowed under FEMA." },
  { icon: Users, title: "Access to Local Talent", desc: "Hire Indian employees under Indian labour laws with ESOPs and PF/ESIC compliance." },
  { icon: IndianRupee, title: "Tax Treaties", desc: "Benefit from India's DTAA with 90+ countries — avoid double taxation." },
  { icon: Repeat2, title: "Scalable Structure", desc: "Easy to issue shares, onboard local partners, and convert to public limited company later." },
];

const steps = [
  { n: "01", title: "FEMA Eligibility Check", desc: "Confirm the business sector falls under automatic FDI route or requires prior RBI/Govt approval." },
  { n: "02", title: "Document Collection", desc: "Gather notarised/apostilled documents from the foreign parent company and Indian resident director." },
  { n: "03", title: "DSC & DIN", desc: "Obtain Digital Signature Certificates and Director Identification Numbers for all proposed directors." },
  { n: "04", title: "Name Reservation (RUN)", desc: "Reserve a unique company name on the MCA portal via Reserve Unique Name (RUN) service." },
  { n: "05", title: "SPICe+ Filing", desc: "File integrated incorporation form SPICe+ with MOA, AOA, and all director declarations." },
  { n: "06", title: "Certificate of Incorporation", desc: "MCA issues Certificate of Incorporation with CIN, PAN, and TAN." },
  { n: "07", title: "Bank Account & Capital Infusion", desc: "Open current account; receive share capital remittance from foreign parent via SWIFT." },
  { n: "08", title: "FCGPR Filing (RBI)", desc: "File Form FCGPR on the RBI's FIRMS portal within 30 days of receiving remittance." },
];

const documents = [
  { label: "Certificate of Incorporation of foreign parent (apostilled)" },
  { label: "Board Resolution authorising Indian subsidiary incorporation" },
  { label: "MOA & AOA of foreign parent company" },
  { label: "Passport & address proof of foreign directors" },
  { label: "PAN Card of Indian resident director" },
  { label: "Aadhaar of Indian resident director" },
  { label: "Proof of registered office address in India" },
  { label: "Bank statement / utility bill for address proof" },
];

const timeline = [
  { label: "Documents", time: "Day 1" },
  { label: "DSC & DIN", time: "Day 2–3" },
  { label: "Name Approval", time: "Day 3–5" },
  { label: "SPICe+ Filing", time: "Day 5–7" },
  { label: "COI Issued", time: "Day 10–15" },
  { label: "RBI Filing", time: "+30 days" },
];

const whyUs = [
  { icon: UserCheck, title: "FEMA Specialists", desc: "Expert guidance on FDI routes, sector restrictions, and RBI reporting obligations." },
  { icon: Globe, title: "End-to-End Support", desc: "From incorporation to first FCGPR filing and beyond — one point of contact." },
  { icon: LifeBuoy, title: "Apostille Assistance", desc: "We guide you on document legalisation requirements for every country." },
  { icon: Headphones, title: "Post-Incorporation Compliance", desc: "Annual RBI filings, ROC compliance, and audit support included in our packages." },
];

const faqs = [
  { q: "Which sectors require prior RBI/Govt approval for FDI?", a: "Sectors like defence (beyond 74%), banking (private sector beyond 49%), media, pharmaceuticals (brownfield beyond 74%), and certain others require approval. Most sectors including IT, manufacturing, e-commerce (B2B), and hospitality allow 100% FDI under the automatic route." },
  { q: "Is an Indian resident director mandatory?", a: "Yes. Under Section 149(3) of the Companies Act 2013, every company must have at least one director who has stayed in India for at least 182 days during the previous calendar year." },
  { q: "What is Form FCGPR and when must it be filed?", a: "Form FCGPR (Foreign Currency – Gross Provisional Return) is filed on RBI's FIRMS portal to report FDI received. It must be filed within 30 days of receiving the share capital remittance from the foreign parent." },
  { q: "Can the Indian subsidiary repatriate profits to the parent?", a: "Yes. Dividends can be freely repatriated after payment of Dividend Distribution Tax (DDT). Royalties, technical service fees, and management fees can also be remitted subject to FEMA/DTAA provisions." },
  { q: "What is the minimum capital requirement?", a: "There is no prescribed minimum paid-up capital under the Companies Act 2013. However, the foreign parent must remit the agreed share capital in foreign currency, which triggers the FCGPR filing with RBI." },
  { q: "How long does the entire process take?", a: "MCA incorporation typically takes 10–15 working days after all apostilled documents are ready. The FCGPR filing must follow within 30 days of capital receipt. Allow 4–6 weeks total from document collection to a fully operational subsidiary." },
];

export function IndianSubsidiaryPage() {
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
              Indian Subsidiary<br />Registration
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/60 text-lg leading-relaxed mb-8 max-w-2xl">
              Incorporate a wholly-owned Private Limited Company in India as a foreign subsidiary. Full FEMA/RBI compliance, apostilled document handling, and post-incorporation support — from ₹14,999.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-500 transition-colors shadow-lg">
                Start Registration <ArrowRight size={15} />
              </Link>
              <a href="tel:+919876543210" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-heading font-medium text-sm rounded-xl hover:bg-white/20 transition-colors border border-white/20">
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

      {/* What Is It */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Overview</span>
              <h2 className="font-heading font-bold text-3xl text-dark mb-4">What is an Indian Subsidiary?</h2>
              <p className="text-muted leading-relaxed mb-4">
                An Indian Subsidiary is a Private Limited Company incorporated in India where the majority of shares (or all shares) are held by a foreign parent company. It is governed by the Companies Act 2013 and must comply with FEMA (Foreign Exchange Management Act) for any cross-border transactions.
              </p>
              <p className="text-muted leading-relaxed">
                Unlike a Branch or Liaison Office (which require prior RBI approval), a subsidiary is a separate legal entity with full operational independence. It can conduct all business activities permitted under India's FDI policy.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} className="space-y-3">
              {[
                "Incorporated as Private Limited Company under Companies Act 2013",
                "Governed by FEMA 1999 for all cross-border transactions",
                "Minimum 1 Indian resident director mandatory (Sec 149(3))",
                "FDI under automatic route for most sectors — no prior approval",
                "FCGPR must be filed with RBI within 30 days of capital receipt",
                "Annual filings: ROC (AOC-4, MGT-7) + RBI (FLA Return by July 15)",
                "Can issue ESOPs, raise local debt, and list on Indian exchanges later",
              ].map((pt) => (
                <div key={pt} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100">
                  <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-dark">{pt}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who Needs It */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Ideal For</span>
            <h2 className="font-heading font-bold text-3xl text-dark">Who Should Register an Indian Subsidiary?</h2>
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

      {/* Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Advantages</span>
            <h2 className="font-heading font-bold text-3xl text-dark">Benefits of an Indian Subsidiary</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <motion.div key={b.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                  <b.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{b.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">How It Works</span>
            <h2 className="font-heading font-bold text-3xl text-dark">Step-by-Step Registration Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="relative p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all">
                <span className="font-heading font-black text-3xl text-primary/10 mb-3 block">{s.n}</span>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{s.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Required</span>
            <h2 className="font-heading font-bold text-3xl text-dark">Documents Checklist</h2>
          </div>
          <div className="max-w-2xl mx-auto grid gap-3">
            {documents.map((d, i) => (
              <motion.div key={d.label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100">
                <CheckCircle size={16} className="text-primary shrink-0" />
                <span className="text-sm text-dark">{d.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Duration</span>
            <h2 className="font-heading font-bold text-3xl text-dark">Expected Timeline</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-0">
            {timeline.map((t, i) => (
              <div key={t.label} className="flex items-center">
                <div className="text-center px-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-xs mx-auto mb-2">{i + 1}</div>
                  <p className="font-heading font-semibold text-dark text-xs">{t.label}</p>
                  <p className="text-muted text-[11px]">{t.time}</p>
                </div>
                {i < timeline.length - 1 && <div className="w-8 h-0.5 bg-primary/20 mx-1 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Why Us</span>
            <h2 className="font-heading font-bold text-3xl text-dark">Why Choose Company Avenue Advisory?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyUs.map((w, i) => (
              <motion.div key={w.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
                  <w.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{w.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">FAQs</span>
            <h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions</h2>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6">
            {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-dark to-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Ready to Enter the Indian Market?</h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Our FEMA experts handle incorporation, RBI filings, and post-registration compliance — end to end.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold rounded-xl hover:bg-amber-500 transition-colors">
              Start Registration <ArrowRight size={16} />
            </Link>
            <a href="tel:+919876543210" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-heading font-medium rounded-xl hover:bg-white/20 transition-colors border border-white/20">
              <Phone size={15} /> Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
