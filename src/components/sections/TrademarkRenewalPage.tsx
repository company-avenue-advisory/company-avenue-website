"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Landmark, FileText, BadgeCheck, Repeat2, CheckCircle,
  ArrowRight, Phone, IndianRupee, Award, ShieldCheck, TrendingUp,
  AlertCircle, RefreshCw, Globe, Briefcase, Store, Building2,
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
  { icon: Clock, label: "Renewal Window", value: "6 months before expiry" },
  { icon: Landmark, label: "Authority", value: "Trade Marks Registry" },
  { icon: FileText, label: "Form", value: "TM-R" },
  { icon: IndianRupee, label: "Govt Fee", value: "₹9,000 / class (₹4,500 small)" },
  { icon: BadgeCheck, label: "Renewed For", value: "10 More Years" },
  { icon: Repeat2, label: "Restoration Window", value: "6 months post-expiry" },
];

const renewalTimeline = [
  { label: "File TM-R", time: "6 months before expiry" },
  { label: "Receipt Issued", time: "Same day (online)" },
  { label: "Examination", time: "1–3 months" },
  { label: "Renewal Certificate", time: "3–6 months" },
  { label: "Valid for", time: "10 more years" },
];

const whoNeeds = [
  { icon: Building2, title: "Brand Owners", desc: "Any company with a registered trademark approaching its 10-year mark." },
  { icon: Globe, title: "Export Businesses", desc: "Protecting brand identity in Indian and international markets." },
  { icon: Store, title: "Retail Brands", desc: "Fashion, FMCG, and retail brands with established consumer recognition." },
  { icon: Briefcase, title: "Service Companies", desc: "IT, consulting, and professional service brands." },
  { icon: Award, title: "Franchise Businesses", desc: "Franchisors whose franchisees rely on the trademark." },
  { icon: TrendingUp, title: "Startups", desc: "Post-funding startups formalising and protecting brand assets." },
  { icon: ShieldCheck, title: "Legacy Brands", desc: "Established businesses with trademarks 7–10+ years old." },
  { icon: RefreshCw, title: "IP Portfolio Holders", desc: "Companies with multiple trademark registrations across classes." },
];

const steps = [
  { n: "01", title: "Expiry Date Check", desc: "Verify trademark expiry date on the Trade Marks Registry database (ipindia.gov.in)." },
  { n: "02", title: "TM-R Preparation", desc: "Prepare Form TM-R with trademark number, class, applicant details, and fees." },
  { n: "03", title: "Govt Fee Payment", desc: "Pay official fee: ₹9,000 per class (₹4,500 for small entities and individuals) online." },
  { n: "04", title: "Online Filing", desc: "File TM-R on the IP India e-filing portal. Acknowledgment issued immediately." },
  { n: "05", title: "Registry Examination", desc: "Trade Marks Registry examines the renewal application for any pending objections or issues." },
  { n: "06", title: "Renewal Certificate", desc: "Registry issues Renewal Certificate with new expiry date (10 years from previous expiry)." },
];

const documents = [
  "Trademark registration certificate (TM certificate)",
  "TM-R form completed and signed",
  "Power of Attorney (if filed through agent)",
  "MSME/Startup India certificate (for 50% fee concession)",
  "Payment receipt of official fees",
];

const faqs = [
  { q: "What happens if I miss the trademark renewal deadline?", a: "A trademark can be renewed up to 6 months after its expiry date through a 'Restoration' process under Section 25(3) of the Trademarks Act 1999. You'll pay the normal renewal fee PLUS an additional surcharge. Beyond 6 months post-expiry, the trademark is removed from the register and others can apply for the same mark." },
  { q: "Can someone else register my trademark if I miss renewal?", a: "Yes. Once a trademark is removed from the register (after the 6-month restoration window), it becomes available for registration by any third party. This is why timely renewal is critical — losing brand protection can be devastating for established businesses." },
  { q: "What is the government fee for trademark renewal?", a: "The official TM-R filing fee is ₹9,000 per class for companies (₹4,500 for individuals, startups, and MSMEs — 50% concession). If filing late (within 6 months after expiry), an additional surcharge is levied. Our professional fees are separate." },
  { q: "How do I check when my trademark expires?", a: "Visit the IP India official trademark search portal (ipindia.gov.in → Trademarks → Trademark Search) and enter your trademark number or name. The registration details page shows the registered date, expiry date, and current status." },
  { q: "Can a trademark be renewed indefinitely?", a: "Yes. Under Section 25 of the Trademarks Act 1999, a trademark can be renewed for successive 10-year periods indefinitely, as long as: (1) the renewal fee is paid on time, and (2) the trademark remains in use. Non-use for 5 consecutive years can make it vulnerable to cancellation." },
  { q: "Is trademark renewal per class or per trademark?", a: "Renewal is required per class separately. If your trademark is registered in 3 classes, you must pay ₹9,000 × 3 = ₹27,000 in government fees for renewal across all 3 classes. Each class is renewed on the same form but with separate fee components." },
];

export function TrademarkRenewalPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-primary-700 pt-36 pb-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container-custom relative max-w-3xl">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0} className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-4 block">Intellectual Property • Company Avenue Advisory</motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-heading font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-6">Trademark Renewal<br />(Form TM-R)</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/60 text-lg mb-8">Renew your trademark registration before expiry under Section 25 of the Trademarks Act 1999. Don't let your brand protection lapse — renew for 10 more years. Starting ₹2,999 (excl. govt fees).</motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-500 transition-colors shadow-lg">Renew Trademark <ArrowRight size={15} /></Link>
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

      <section className="py-16 bg-amber-50 border-y border-amber-200">
        <div className="container-custom">
          <div className="flex items-start gap-4 max-w-3xl mx-auto">
            <AlertCircle size={24} className="text-amber-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-heading font-bold text-dark mb-2">Don't Let Your Trademark Lapse</h3>
              <p className="text-muted text-sm leading-relaxed">Trademarks must be renewed every 10 years. You can renew up to 6 months <em>before</em> expiry (preferred) or up to 6 months <em>after</em> expiry with a surcharge (restoration). After the 6-month restoration window, your trademark is cancelled and anyone can register it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Who Needs It</span><h2 className="font-heading font-bold text-3xl text-dark">Who Should Renew Their Trademark?</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whoNeeds.map((w, i) => (
              <motion.div key={w.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4"><w.icon size={18} className="text-primary" /></div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{w.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Process</span><h2 className="font-heading font-bold text-3xl text-dark">Trademark Renewal Process</h2></div>
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
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">FAQs</span><h2 className="font-heading font-bold text-3xl text-dark">Frequently Asked Questions</h2></div>
          <div className="bg-slate-50 rounded-2xl p-6">{faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-dark to-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Protect Your Brand for 10 More Years</h2>
          <p className="text-white/60 text-lg mb-8">Our trademark attorneys file TM-R on time and track renewal status until your certificate arrives.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold rounded-xl hover:bg-amber-500 transition-colors">Renew My Trademark <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
