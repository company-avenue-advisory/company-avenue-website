"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Landmark, FileText, BadgeCheck, Repeat2, CheckCircle,
  ArrowRight, Phone, IndianRupee, Palette, Package, Factory,
  Globe, ShoppingBag, Award, ShieldCheck, TrendingUp,
  UserCheck, LifeBuoy, Zap,
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
  { icon: Clock, label: "Timeline", value: "3–6 Months" },
  { icon: Landmark, label: "Authority", value: "Patent Office (IPO), India" },
  { icon: FileText, label: "Form", value: "Form 1 (Designs Act 2000)" },
  { icon: IndianRupee, label: "Govt Fee", value: "₹1,000–₹4,000" },
  { icon: BadgeCheck, label: "Duration", value: "10 Years (+5 years)" },
  { icon: Repeat2, label: "Max Duration", value: "15 Years Total" },
];

const whoNeeds = [
  { icon: Palette, title: "Product Designers", desc: "Industrial designers creating unique product forms, shapes, and aesthetics." },
  { icon: Package, title: "Packaging Brands", desc: "Companies with distinctive bottle shapes, box designs, and container forms." },
  { icon: Factory, title: "Furniture Makers", desc: "Furniture brands with unique chair, table, or storage designs." },
  { icon: ShoppingBag, title: "Fashion & Jewellery", desc: "Jewellery designers, textile pattern creators, and fashion accessory brands." },
  { icon: Zap, title: "Electronics OEMs", desc: "Hardware companies with distinctive device form factors and UI layouts." },
  { icon: Globe, title: "Automotive Parts", desc: "Auto component manufacturers with unique part designs." },
  { icon: Award, title: "Toy Manufacturers", desc: "Toy companies with unique product shapes and visual designs." },
  { icon: TrendingUp, title: "D2C Brands", desc: "E-commerce brands differentiating through distinctive product aesthetics." },
];

const vsComparison = [
  { aspect: "What it protects", design: "Visual appearance — shape, pattern, ornamentation, colour", patent: "Functional invention — how something works", trademark: "Brand identifier — name, logo, slogan" },
  { aspect: "Duration", design: "10 + 5 years = 15 years", patent: "20 years", trademark: "10 years (renewable indefinitely)" },
  { aspect: "Registration body", design: "Patent Office (Design Wing)", patent: "Patent Office", trademark: "Trade Marks Registry" },
  { aspect: "Key requirement", design: "Novel & original visual design", patent: "Novel, non-obvious, industrially applicable invention", trademark: "Distinctive identifier for goods/services" },
];

const steps = [
  { n: "01", title: "Novelty Search", desc: "Search existing registered designs at the IPO Design database to confirm your design hasn't been registered before." },
  { n: "02", title: "Design Drawings", desc: "Prepare professional drawings/photographs of the design from all angles (front, rear, side, top, bottom views)." },
  { n: "03", title: "Classification", desc: "Identify the correct Locarno Classification for your design (international classification system for industrial designs)." },
  { n: "04", title: "Form 1 Filing", desc: "File Form 1 with the Patent Office (appropriate branch) with all drawings and prescribed government fee." },
  { n: "05", title: "Formal Examination", desc: "Patent Office examines the application for formal requirements — completeness and formal correctness." },
  { n: "06", title: "Substantive Examination", desc: "Design is examined for novelty and originality — whether it's new compared to prior designs." },
  { n: "07", title: "Registration Certificate", desc: "Design Registration Certificate issued with a unique Design Number. Protection backdates to filing date." },
  { n: "08", title: "Renewal (Year 10)", desc: "Renew before the 10-year mark for an additional 5 years (maximum 15-year total protection)." },
];

const faqs = [
  { q: "What is the difference between a design patent and a utility patent?", a: "A Design Registration (under Designs Act 2000) protects only the visual appearance — shape, pattern, ornamentation of a product. A Patent (under Patents Act 1970) protects the functional invention — how something works or how it's made. A product can potentially have both a design registration and a utility patent." },
  { q: "Can I register a software UI/UX as a design?", a: "In India, screen designs and graphical user interfaces (GUIs) have faced challenges in design registration. The Patent Office has been evolving its position. Physical product designs have the most straightforward path to registration. For digital UI protection, copyright law is currently more effective." },
  { q: "What happens if someone copies my registered design?", a: "Design infringement occurs when someone makes, sells, or imports articles embodying your registered design without permission. Remedies include civil suits for damages (up to ₹50,000 per infringement under the Designs Act), injunctions, and account of profits." },
  { q: "What if my design is already publicly known?", a: "A design cannot be registered if it has been published (made available to the public) before the date of application. Prior publication — even by the designer — destroys novelty. Always file before disclosure at trade shows, product launches, or online publication." },
  { q: "Can I get design protection internationally?", a: "India is not yet a member of the Hague System (WIPO). For international design protection, you must file in each country separately. Many companies file in key markets (EU Community Design, US Design Patent) alongside the Indian registration." },
  { q: "How is a design registration different from copyright?", a: "Copyright protects artistic expression automatically (no registration needed), while Design Registration gives you a registered monopoly over the visual design of a manufactured article. For a logo, you may get copyright protection automatically. For a product's shape/design, Design Registration is the specific right." },
];

export function DesignRegistrationPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-primary-700 pt-36 pb-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container-custom relative max-w-3xl">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0} className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-4 block">Intellectual Property • Company Avenue Advisory</motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-heading font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-6">Design Registration<br />in India</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/60 text-lg mb-8">Protect your product's visual appearance — shape, configuration, pattern, and ornamentation — under the Designs Act 2000. Up to 15 years of exclusive protection against copying. Starting ₹4,999.</motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-500 transition-colors shadow-lg">Register Design <ArrowRight size={15} /></Link>
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
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Who Needs It</span><h2 className="font-heading font-bold text-3xl text-dark">Who Should Register a Design?</h2></div>
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
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Comparison</span><h2 className="font-heading font-bold text-3xl text-dark">Design vs Patent vs Trademark</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left font-heading font-semibold rounded-tl-xl">Aspect</th>
                  <th className="py-3 px-4 text-left font-heading font-semibold">Design Registration</th>
                  <th className="py-3 px-4 text-left font-heading font-semibold">Patent</th>
                  <th className="py-3 px-4 text-left font-heading font-semibold rounded-tr-xl">Trademark</th>
                </tr>
              </thead>
              <tbody>
                {vsComparison.map((row, i) => (
                  <tr key={row.aspect} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                    <td className="py-3 px-4 font-heading font-semibold text-dark">{row.aspect}</td>
                    <td className="py-3 px-4 text-muted">{row.design}</td>
                    <td className="py-3 px-4 text-muted">{row.patent}</td>
                    <td className="py-3 px-4 text-muted">{row.trademark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Process</span><h2 className="font-heading font-bold text-3xl text-dark">Design Registration Process</h2></div>
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
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Stop Competitors from Copying Your Design</h2>
          <p className="text-white/60 text-lg mb-8">Design registration gives you 15 years of exclusive rights over your product's visual identity.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold rounded-xl hover:bg-amber-500 transition-colors">Register My Design <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
