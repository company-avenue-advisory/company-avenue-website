"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Landmark, FileText, BadgeCheck, Repeat2, CheckCircle,
  ArrowRight, Phone, IndianRupee, Copyright, BookOpen, Monitor,
  Music, Globe, Palette, Award, ShieldCheck, TrendingUp,
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

const workTypes = [
  { icon: BookOpen, type: "Literary Works", examples: "Books, novels, articles, poems, lyrics, source code, databases" },
  { icon: Music, type: "Musical Works", examples: "Compositions, songs, ringtones, background scores" },
  { icon: Palette, type: "Artistic Works", examples: "Paintings, sculptures, logos, photographs, architectural designs" },
  { icon: Monitor, type: "Computer Programs", examples: "Software, mobile apps, algorithms, firmware" },
  { icon: Globe, type: "Cinematographic Films", examples: "Movies, documentaries, web series, video content" },
  { icon: Copyright, type: "Sound Recordings", examples: "Podcasts, audiobooks, music recordings, voice-overs" },
];

const quickFacts = [
  { icon: Clock, label: "Timeline", value: "3–12 Months" },
  { icon: Landmark, label: "Authority", value: "Copyright Office, DPIIT" },
  { icon: FileText, label: "Form", value: "Form XIV" },
  { icon: IndianRupee, label: "Starting From", value: "₹2,999" },
  { icon: BadgeCheck, label: "Duration", value: "Life + 60 Years" },
  { icon: Repeat2, label: "Protection", value: "Berne Convention (170+ countries)" },
];

const benefits = [
  { icon: ShieldCheck, title: "Legal Presumption of Ownership", desc: "Registration creates a legal presumption that the registered person is the owner — shifts burden of proof in litigation." },
  { icon: Award, title: "Statutory Evidence", desc: "Copyright certificate is admissible as evidence in court without further proof of authenticity." },
  { icon: TrendingUp, title: "Licensing Income", desc: "Formally license your work to publishers, streaming platforms, or businesses for recurring royalty income." },
  { icon: Globe, title: "International Protection", desc: "India is a signatory to the Berne Convention — copyright protection automatically extends to 170+ countries." },
  { icon: Monitor, title: "Software Protection", desc: "Source code and software programs are protected as 'literary works' — effective tool against piracy." },
  { icon: IndianRupee, title: "IP Asset Valuation", desc: "Registered copyright can be valued as a business asset for loans, M&A, and investor diligence." },
  { icon: UserCheck, title: "Moral Rights", desc: "Authors retain the right to be identified and the right to prevent distortion of their work (Sections 57)." },
  { icon: Copyright, title: "Derivative Work Control", desc: "Only the copyright owner can authorize translations, adaptations, or derivative works of the original." },
];

const steps = [
  { n: "01", title: "Work Assessment", desc: "Identify the category of work and confirm it qualifies for copyright protection under the Copyright Act 1957." },
  { n: "02", title: "Authorship Documentation", desc: "Document proof of creation date — git commits (for code), manuscript versions, email trails, recording timestamps." },
  { n: "03", title: "Form XIV Preparation", desc: "Prepare Form XIV with title, author, publisher, year of creation, and nature of work." },
  { n: "04", title: "Fee Payment", desc: "Pay official fee: ₹500 (literary/dramatic/musical/artistic), ₹2,000 (cinematograph films), ₹2,000 (sound recordings)." },
  { n: "05", title: "Filing with Copyright Office", desc: "Submit Form XIV online or physically to the Copyright Office, New Delhi." },
  { n: "06", title: "Waiting Period", desc: "Copyright Office issues a Diary Number immediately. A 30-day public notice period follows." },
  { n: "07", title: "Objection Handling", desc: "If any third party objects during the notice period, we respond on your behalf with supporting evidence." },
  { n: "08", title: "Registration Certificate", desc: "Copyright Registration Certificate (Extracts of Register) issued — typically 3–12 months from filing." },
];

const faqs = [
  { q: "Does copyright exist without registration?", a: "Yes. Copyright is an automatic right that arises the moment an original work is created and fixed in a tangible form. You do NOT need to register it to own copyright. However, registration creates a legal record, shifts the burden of proof, and is essential for enforcement in court." },
  { q: "Can software / source code be copyrighted?", a: "Yes. Computer programs and source code are classified as 'literary works' under Section 2(o) of the Copyright Act 1957 and are fully protectable. Many IT companies register their software to protect against competitors copying their code." },
  { q: "How long does copyright last in India?", a: "For literary, dramatic, musical, and artistic works: the author's lifetime + 60 years after death. For anonymous/pseudonymous works: 60 years from publication. For cinematograph films and sound recordings: 60 years from the year of publication." },
  { q: "What is the Berne Convention and does it protect my work internationally?", a: "The Berne Convention (1886) is an international treaty for copyright protection. India is a signatory — meaning copyright registered in India automatically receives protection in all 170+ Berne Convention member countries without any additional registration formalities." },
  { q: "Can I copyright a company logo?", a: "A logo can be protected both as a trademark (for brand distinctiveness) and as a copyright (for artistic expression). These are complementary protections. For maximum protection, it's advisable to register the logo both as a trademark and copyright." },
  { q: "What constitutes copyright infringement?", a: "Reproducing, distributing, displaying, performing, or creating derivative works of a copyrighted work without the owner's permission constitutes infringement. Remedies include civil suits for damages, account of profits, and injunctions, as well as criminal prosecution with imprisonment up to 3 years and fines." },
];

export function CopyrightRegistrationPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-primary-700 pt-36 pb-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container-custom relative max-w-3xl">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0} className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-4 block">Intellectual Property • Company Avenue Advisory</motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="font-heading font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-6">Copyright<br />Registration</motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/60 text-lg mb-8">Protect your creative works — books, software, music, films, logos, and artwork — under the Copyright Act 1957. Registration with the Copyright Office, DPIIT provides legal presumption of ownership. Starting ₹2,999.</motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-500 transition-colors shadow-lg">Register Copyright <ArrowRight size={15} /></Link>
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
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">What Can Be Protected</span><h2 className="font-heading font-bold text-3xl text-dark">Types of Works Eligible for Copyright</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {workTypes.map((w, i) => (
              <motion.div key={w.type} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-card transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4"><w.icon size={18} className="text-primary" /></div>
                <h3 className="font-heading font-semibold text-dark text-sm mb-2">{w.type}</h3>
                <p className="text-muted text-xs leading-relaxed">{w.examples}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Benefits</span><h2 className="font-heading font-bold text-3xl text-dark">Why Register Your Copyright?</h2></div>
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
          <div className="text-center mb-12"><span className="text-accent text-xs font-heading font-bold tracking-widest uppercase mb-3 block">Process</span><h2 className="font-heading font-bold text-3xl text-dark">Copyright Registration Process</h2></div>
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
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Protect Your Creative Work Today</h2>
          <p className="text-white/60 text-lg mb-8">Copyright registration for books, software, music, films, and art — handled by IP specialists.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold rounded-xl hover:bg-amber-500 transition-colors">Register Copyright <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
