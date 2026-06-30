"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Landmark, FileText, BadgeCheck, Repeat2, CheckCircle,
  ArrowRight, Phone, IndianRupee, Package, ShoppingBag, Factory,
  Globe, Store, UtensilsCrossed, Award, ShieldCheck,
  TrendingUp, UserCheck, LifeBuoy,
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
  { icon: Clock, label: "Timeline", value: "15–25 Working Days" },
  { icon: Landmark, label: "Authority", value: "State Legal Metrology Dept." },
  { icon: FileText, label: "Rules", value: "LMPC Rules 2011" },
  { icon: IndianRupee, label: "Starting From", value: "₹3,999" },
  { icon: BadgeCheck, label: "Validity", value: "5 Years (Renewable)" },
  { icon: Repeat2, label: "Penalty (Default)", value: "Up to ₹25,000" },
];

const mandatoryDeclarations = [
  "Name & address of manufacturer / packer / importer",
  "Net quantity (weight, volume, count)",
  "Month and year of manufacture / packing",
  "Maximum Retail Price (MRP) incl. all taxes",
  "Consumer care details (name, address, phone)",
  "Country of origin (for imported goods)",
  "FSSAI license number (for food products)",
  "Best before / expiry date (for perishables)",
];

const whoNeeds = [
  { icon: Factory, title: "FMCG Manufacturers", desc: "Any company manufacturing packaged consumer goods for retail sale." },
  { icon: Globe, title: "Importers", desc: "Companies importing pre-packaged goods for sale in India must register as importers." },
  { icon: ShoppingBag, title: "Food Processors", desc: "Packaged food items — snacks, beverages, cereals, condiments, etc." },
  { icon: Package, title: "Cosmetic Brands", desc: "Packaged cosmetics, personal care, and hygiene products." },
  { icon: UtensilsCrossed, title: "Kitchen Products", desc: "Packaged spices, oils, flour, and other culinary items." },
  { icon: Store, title: "E-commerce Sellers", desc: "Online sellers packing and labelling their own products for delivery." },
  { icon: TrendingUp, title: "Private Label Brands", desc: "Retailers launching their own brand on third-party manufactured goods." },
  { icon: Award, title: "Pharmaceutical Products", desc: "OTC medicines and health supplements sold as packaged commodities." },
];

const steps = [
  { n: "01", title: "Category Determination", desc: "Identify if you are a manufacturer, packer, or importer — each has different registration requirements." },
  { n: "02", title: "State Authority Identification", desc: "Identify the Controller of Legal Metrology in your state (state-specific registration)." },
  { n: "03", title: "Label Design Review", desc: "Review all product labels to ensure mandatory declarations comply with LMPC Rules 2011." },
  { n: "04", title: "Document Preparation", desc: "Prepare application with business details, list of products, and sample labels." },
  { n: "05", title: "Application Filing", desc: "Submit application to State Controller of Legal Metrology with prescribed fees." },
  { n: "06", title: "Inspection (if required)", desc: "Inspector may visit manufacturing/packing premises to verify compliance." },
  { n: "07", title: "Registration Certificate", desc: "LMPC registration certificate issued — display registration number on all packages." },
];

const documents = [
  "GST Registration Certificate",
  "FSSAI License (for food products)",
  "Certificate of Incorporation / Partnership Deed",
  "Factory / trade license",
  "Sample labels with all mandatory declarations",
  "List of products with HSN codes",
  "Import Export Code (IEC) — for importers",
  "Country of origin declaration (for importers)",
];

const faqs = [
  { q: "Who needs LMPC registration?", a: "Every manufacturer or packer of pre-packaged commodities meant for retail sale, and every importer of pre-packaged goods, must register under the Legal Metrology (Packaged Commodities) Rules 2011 with the State Controller of Legal Metrology." },
  { q: "Is LMPC the same as BIS certification?", a: "No. LMPC (Legal Metrology Packaged Commodities) deals with labelling requirements — MRP, quantity, manufacturer details. BIS (Bureau of Indian Standards) is a quality certification for products meeting specific quality standards. Many products need both." },
  { q: "What is the penalty for non-compliant packaging?", a: "Non-compliance with LMPC Rules can result in fines up to ₹25,000 for first offence and up to ₹50,000 for repeat offences. The product can also be seized and destroyed. Manufacturers, packers, and dealers can all be held liable." },
  { q: "Is LMPC registration required for e-commerce sellers?", a: "Yes. If you pack your own products and sell online, you are considered a 'packer' under LMPC rules and must register. Marketplace sellers who sell manufacturer-packed products in original packaging are typically not required to register separately." },
  { q: "What is the registration number format on packages?", a: "The LMPC registration number must be displayed on the package label as 'Reg. No. [State Code][Number]' or as specified by the respective state authority. Format varies slightly by state." },
  { q: "Is LMPC registration state-specific?", a: "Yes. LMPC registration is obtained from the State Controller of Legal Metrology in each state where manufacturing/packing occurs. Importers register with the Central or State authority based on the port of entry and distribution scope." },
];

export function LMPCRegistrationPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-primary-700 pt-36 pb-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container-custom relative max-w-3xl">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0} className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-4 block">Startup & MSME • Company Avenue Advisory</motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-heading font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-6">LMPC Registration<br />for Packaged Goods</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/60 text-lg mb-8">Register under Legal Metrology (Packaged Commodities) Rules 2011. Mandatory for all manufacturers, packers, and importers of pre-packaged goods sold in India. Starting ₹3,999.</motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-500 transition-colors shadow-lg">Register Now <ArrowRight size={15} /></Link>
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
              <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Mandatory Label Declarations</span>
              <h2 className="font-heading font-bold text-3xl text-dark mb-6">What Must Be on Every Package?</h2>
              <p className="text-muted leading-relaxed mb-6">Under LMPC Rules 2011, every pre-packaged commodity sold in India must carry these mandatory declarations. Missing or incorrect information can lead to product seizure and fines.</p>
              <div className="space-y-3">
                {mandatoryDeclarations.map((d) => (
                  <div key={d} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100">
                    <CheckCircle size={15} className="text-primary shrink-0" />
                    <span className="text-sm text-dark">{d}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Who Needs It</span>
              <h2 className="font-heading font-bold text-3xl text-dark mb-6">Industries That Need LMPC Registration</h2>
              <div className="grid grid-cols-2 gap-3">
                {whoNeeds.map((w) => (
                  <div key={w.title} className="bg-white p-4 rounded-xl border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center mb-3">
                      <w.icon size={15} className="text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-dark text-xs mb-1">{w.title}</h3>
                    <p className="text-muted text-[11px] leading-relaxed">{w.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Process</span><h2 className="font-heading font-bold text-3xl text-dark">Registration Process</h2></div>
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
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Ensure Your Packaging Is 100% Compliant</h2>
          <p className="text-white/60 text-lg mb-8">Label design review, LMPC registration, and ongoing compliance support for packaged goods businesses.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold rounded-xl hover:bg-amber-500 transition-colors">Get LMPC Registration <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
