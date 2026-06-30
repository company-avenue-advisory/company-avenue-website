"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Landmark, FileText, BadgeCheck, Repeat2, CheckCircle,
  ArrowRight, Phone, IndianRupee, Store, UtensilsCrossed, Building2,
  ShieldCheck, Briefcase, Factory, Package, TrendingUp,
  UserCheck, LifeBuoy, Headphones, Award,
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
  { icon: Clock, label: "Timeline", value: "7–15 Working Days" },
  { icon: Landmark, label: "Authority", value: "Municipal Corporation" },
  { icon: FileText, label: "Act", value: "Shop & Establishment Act" },
  { icon: IndianRupee, label: "Starting From", value: "₹1,499" },
  { icon: BadgeCheck, label: "Validity", value: "1 Year (Renewable)" },
  { icon: Repeat2, label: "Penalty (Default)", value: "₹5,000–₹50,000" },
];

const whoNeeds = [
  { icon: UtensilsCrossed, title: "Restaurants & Cafes", desc: "Hotels, dhabas, cloud kitchens, and food delivery businesses." },
  { icon: Store, title: "Retail Shops", desc: "Any shop selling goods — grocery, clothing, electronics, pharmacy." },
  { icon: Factory, title: "Factories & Units", desc: "Small manufacturing units and processing facilities." },
  { icon: Building2, title: "Offices & Workspaces", desc: "Corporate offices, coworking spaces, and service centres." },
  { icon: Package, title: "Warehouses", desc: "Storage facilities, logistics hubs, and distribution centres." },
  { icon: Briefcase, title: "Service Providers", desc: "Beauty salons, repair shops, laundries, and service businesses." },
  { icon: TrendingUp, title: "E-commerce Sellers", desc: "Businesses with a physical warehouse or fulfilment centre." },
  { icon: ShieldCheck, title: "Healthcare Clinics", desc: "Clinics, diagnostic labs, and healthcare service providers." },
];

const benefits = [
  { icon: ShieldCheck, title: "Legal Authorisation", desc: "Official permission from local body to conduct trade at your premises." },
  { icon: Award, title: "Bank Account Opening", desc: "Most banks require a Trade License as KYC document for business current accounts." },
  { icon: TrendingUp, title: "GST Registration", desc: "Required as an address proof document for GST registration in many states." },
  { icon: Building2, title: "Avoid Closure & Fines", desc: "Prevent municipal raids, forced closure notices, and heavy penalties." },
  { icon: Briefcase, title: "Tender Eligibility", desc: "Government tenders and procurement often require a valid Trade License." },
  { icon: Package, title: "FSSAI Application", desc: "Trade License is a prerequisite for FSSAI Basic Registration for food businesses." },
  { icon: Store, title: "Lease Renewal", desc: "Landlords and property managers often insist on a valid Trade License." },
  { icon: UserCheck, title: "Consumer Trust", desc: "Registered businesses command greater credibility with customers." },
];

const steps = [
  { n: "01", title: "Determine Jurisdiction", desc: "Identify which Municipal Corporation/Panchayat governs your business premises." },
  { n: "02", title: "Document Collection", desc: "Gather identity proof, address proof, NOC from landlord, and property tax receipts." },
  { n: "03", title: "Application Preparation", desc: "Fill the Trade License application form specifying business type and activity." },
  { n: "04", title: "Fee Payment", desc: "Pay the prescribed municipal fee (varies by city and business type/size)." },
  { n: "05", title: "Inspection (if required)", desc: "Municipal inspector may visit premises to verify compliance with building, fire, and health norms." },
  { n: "06", title: "License Issued", desc: "Trade License issued within 7–15 days — valid for 1 year and renewable annually." },
];

const documents = [
  "PAN Card of proprietor / company",
  "Aadhaar / identity proof of owner",
  "Business address proof (rent agreement / ownership documents)",
  "NOC from landlord (for rented premises)",
  "Proof of property tax payment",
  "Photograph of business premises",
  "Nature of business / activity description",
  "Fire NOC (for restaurants, hotels, large establishments)",
];

const faqs = [
  { q: "Is Trade License the same as GST registration?", a: "No. Trade License is issued by the local municipal body (city/town/panchayat) and authorises you to conduct trade at a specific premises. GST is a central/state tax registration. Both are different registrations — many businesses need both." },
  { q: "Is a Trade License required for home-based businesses?", a: "In many cities, even home-based businesses operating commercially may need a Trade License. The requirement varies by state and municipal regulations. It's advisable to check with your local municipal body — penalties for operating without one can be significant." },
  { q: "What is the renewal process for a Trade License?", a: "Trade Licenses are typically valid for 1 year and must be renewed annually before expiry. Most municipal corporations now allow online renewal. Late renewal attracts a surcharge. Our team handles timely renewals with reminders before due dates." },
  { q: "What is the penalty for operating without a Trade License?", a: "Penalties vary by state and city, typically ranging from ₹5,000 to ₹50,000. Some municipal authorities can seal or forcibly close the business. Repeated violations may lead to criminal prosecution under the local municipal act." },
  { q: "Does the Trade License need to be displayed at the premises?", a: "Yes. Most municipal acts require the Trade License to be prominently displayed at the business premises at all times during operating hours. Failure to display may attract a fine during inspections." },
  { q: "Can a Trade License be transferred on sale of business?", a: "No. Trade Licenses are not transferable. When a business is sold or ownership changes, the new owner must apply for a fresh Trade License. The old license must be surrendered." },
];

export function TradeLicensePage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-primary-700 pt-36 pb-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container-custom relative max-w-3xl">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0} className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-4 block">Startup & MSME • Company Avenue Advisory</motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-heading font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-6">Trade License<br />Registration</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/60 text-lg mb-8">Get your Trade License from the Municipal Corporation — mandatory for all commercial establishments before commencing operations. Avoid fines up to ₹50,000 and business closure. Starting ₹1,499.</motion.p>
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
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Who Needs It</span><h2 className="font-heading font-bold text-3xl text-dark">Businesses That Need a Trade License</h2></div>
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
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Benefits</span><h2 className="font-heading font-bold text-3xl text-dark">Why You Need a Trade License</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <motion.div key={b.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4"><b.icon size={18} className="text-primary" /></div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{b.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Process</span><h2 className="font-heading font-bold text-3xl text-dark">How to Get Your Trade License</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Documents</span><h2 className="font-heading font-bold text-3xl text-dark">Documents Required</h2></div>
          <div className="space-y-3">
            {documents.map((d, i) => (
              <motion.div key={d} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
                <CheckCircle size={16} className="text-primary shrink-0" />
                <span className="text-sm text-dark">{d}</span>
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
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Get Your Trade License in 7–15 Days</h2>
          <p className="text-white/60 text-lg mb-8">We handle the entire application process with your local Municipal Corporation.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold rounded-xl hover:bg-amber-500 transition-colors">Apply for Trade License <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
