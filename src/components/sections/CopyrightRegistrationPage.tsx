"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  Building2, Users, Briefcase, Award, ShieldCheck, TrendingUp,
  AlertTriangle, Clock, BadgeCheck, DollarSign,
  Landmark, Info, AlertCircle, ChevronRight, Wallet,
  Globe, BookOpen, Music, Monitor, Camera, Layers, Scale,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function Eyebrow({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
      <span className="w-6 h-px bg-accent" />{label}<span className="w-6 h-px bg-accent" />
    </span>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
        <span itemProp="name" className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }}
            itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="overflow-hidden">
            <p itemProp="text" className="px-5 pb-4 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const quickFacts = [
  { icon: Globe,       label: "Jurisdiction",    value: "180+ Countries (Berne)" },
  { icon: Clock,       label: "Protection",      value: "60 Years (Author Life+60)" },
  { icon: Clock,       label: "Timeline",        value: "30-60 Business Days" },
  { icon: DollarSign,  label: "Starting At",     value: "₹3,999" },
  { icon: Landmark,    label: "Authority",       value: "Copyright Office, India" },
  { icon: ShieldCheck, label: "Auto-Protection", value: "On Creation (Registration Strengthens)" },
];

const copyrightCategories = [
  { icon: BookOpen, title: "Literary Works",       desc: "Books, articles, blog posts, scripts, song lyrics, computer programs, databases, and any written or printed content qualify as literary works under the Copyright Act." },
  { icon: Music,    title: "Musical Works",         desc: "Original compositions including melody and musical notations are protectable. Note: sound recordings are a separate category from the underlying musical work." },
  { icon: Camera,   title: "Artistic Works",        desc: "Paintings, drawings, sculptures, photographs, logos, architectural plans, maps, and charts are all categorised as artistic works eligible for copyright protection." },
  { icon: Monitor,  title: "Computer Software",     desc: "Source code, object code, and software programs are treated as literary works under Indian copyright law and receive full copyright protection from the moment of creation." },
  { icon: Layers,   title: "Cinematographic Films", desc: "Films, documentaries, animations, and video content including the visual and audio elements are protected as a unified cinematographic work." },
  { icon: FileText, title: "Sound Recordings",      desc: "Any recording of sounds — music, audio books, podcasts, or other recordings — is protected as a sound recording independent of the underlying musical or literary work." },
];

const benefits = [
  { icon: ShieldCheck, title: "Legal Proof of Ownership",              desc: "A copyright registration certificate is prima facie evidence of ownership in any legal dispute. Without registration, proving ownership and creation date becomes difficult and costly in court." },
  { icon: Globe,       title: "Protection in 180+ Countries",          desc: "India is a signatory to the Berne Convention and TRIPS Agreement. Registered copyright in India enjoys automatic protection in all 180+ member countries without separate registration in each." },
  { icon: DollarSign,  title: "Enables Licensing and Royalty Income",  desc: "Registered copyright owners can license their works commercially, collect royalties, and sign publishing or distribution agreements. Registration strengthens the legal basis for royalty enforcement." },
  { icon: Scale,       title: "Basis for Legal Action Against Infringers", desc: "Copyright registration is essential to file a civil suit for infringement, claim damages, seek an injunction, or initiate criminal prosecution for willful infringement under Section 63." },
  { icon: Award,       title: "60-Year Protection Period",             desc: "Copyright protection lasts for the lifetime of the author plus 60 years. For software companies and content businesses, this provides multi-generational protection of valuable IP assets." },
  { icon: TrendingUp,  title: "Increases IP Asset Valuation",          desc: "Registered copyrights are tangible IP assets that can be valued, mortgaged, transferred, or included in balance sheet intangibles — enhancing your company&apos;s overall IP portfolio value." },
  { icon: BadgeCheck,  title: "Prevents Unauthorised Use",             desc: "A registered copyright acts as a deterrent to plagiarism. Infringers know that registered works carry a stronger legal standing for enforcement including police complaints and customs notices." },
  { icon: Users,       title: "Transferable and Inheritable Asset",    desc: "Copyright is a property right. It can be assigned, licensed, inherited, or transferred. Registration creates clear documentation of ownership, simplifying asset transfer and estate planning." },
];

const whoNeeds = [
  { icon: BookOpen,   title: "Authors and Writers",                    desc: "Books, articles, scripts, and any written content benefit from copyright registration as definitive proof of authorship date and ownership for publishing and licensing." },
  { icon: Monitor,    title: "Software and Technology Companies",      desc: "Source code, SaaS platforms, mobile applications, and databases are valuable assets. Copyright registration protects these investments from unauthorised copying or reverse engineering." },
  { icon: Camera,     title: "Designers and Visual Artists",           desc: "Logo designers, photographers, graphic artists, and illustrators should register their creative works to enforce ownership against clients who misuse work beyond agreed scope." },
  { icon: Music,      title: "Musicians and Composers",                desc: "Songwriters, music producers, and composers should register both the musical composition and sound recording separately to maximise protection of their creative output." },
  { icon: Layers,     title: "Film and Content Producers",             desc: "Production companies, YouTube creators, and OTT content producers benefit from copyright registration of films, scripts, and audio-visual works to enable licensing and prevent piracy." },
  { icon: Briefcase,  title: "Businesses with Original Content",       desc: "Marketing materials, training manuals, website content, brand stories, and product catalogues created in-house should be copyright-registered to prevent competitor duplication." },
];

const processSteps = [
  { n: "01", title: "Work Categorisation",               desc: "Identify the category of your work (literary, artistic, musical, software, film, or sound recording) as this determines the application form and fee applicable under the Copyright Act." },
  { n: "02", title: "Prepare the Application",           desc: "Complete the copyright application (Form XIV) with details of the work, its nature, year of creation, author details, and ownership. For software, a redacted version of source code may be required." },
  { n: "03", title: "File Online at Copyright Office",   desc: "File the application at the Copyright Office portal (copyright.gov.in) with the requisite government fee. Upload two copies of the work as required by the Copyright Office." },
  { n: "04", title: "Diary Number Issuance",             desc: "The Copyright Office issues a Diary Number immediately upon successful submission. This Diary Number is the reference for tracking the status of your application." },
  { n: "05", title: "Mandatory 30-Day Waiting Period",   desc: "There is a mandatory waiting period of 30 days during which any third party can file an objection to the registration of the copyright. This is a statutory requirement under the Act." },
  { n: "06", title: "Objection Examination (If Any)",    desc: "If an objection is received, both parties are given a hearing. If no objection is raised within 30 days, the Copyright Office proceeds to examine the application independently." },
  { n: "07", title: "Copyright Office Examination",      desc: "The Copyright Office examines the application for completeness, correctness, and eligibility. Queries (if any) are communicated to the applicant. Timely response is critical." },
  { n: "08", title: "Registration Certificate",          desc: "Upon satisfactory examination and no valid objection, the Copyright Office issues the Copyright Registration Certificate with the unique registration number and effective date of registration." },
];

const requiredDocs = [
  { icon: FileText,   label: "Completed Form XIV (Copyright Application)" },
  { icon: FileText,   label: "Two Copies of the Work (printed / digital)" },
  { icon: BookOpen,   label: "Source Code (partial / redacted) for software" },
  { icon: Users,      label: "Author&apos;s Identity Proof (PAN/Passport)" },
  { icon: Building2,  label: "Applicant Identity Proof (if organisation)" },
  { icon: FileText,   label: "NOC from Publisher (if work already published)" },
  { icon: Award,      label: "Power of Attorney (if filed through agent)" },
  { icon: DollarSign, label: "Government Fee Payment Receipt" },
];

const faqs = [
  {
    q: "Is copyright automatic or does it require registration in India?",
    a: "Under the Copyright Act, 1957, copyright protection is automatic from the moment of creation of an original work. You do not need to register copyright to obtain protection. However, registration is strongly recommended because: (1) it creates a public record of ownership; (2) it is prima facie evidence of ownership in legal disputes; (3) it enables you to file a civil suit more effectively; and (4) it is required for customs border protection against infringing imports. Unregistered works are harder to enforce in practice.",
  },
  {
    q: "What is the Berne Convention and how does it help Indian copyright holders?",
    a: "The Berne Convention for the Protection of Literary and Artistic Works is an international treaty with 180+ member countries. Under this convention, a copyright registered in one member country automatically receives protection in all other member countries without the need for separate registration in each country. India is a signatory to the Berne Convention. This means a book, software, or film copyrighted in India is automatically protected in the USA, UK, EU, and 177 other countries, making it ideal for global content businesses.",
  },
  {
    q: "How long does copyright protection last in India?",
    a: "Under the Copyright Act, 1957, copyright protection lasts for the lifetime of the author plus 60 years. Specifically: for literary, dramatic, musical, and artistic works — the author&apos;s life plus 60 years from the year of death; for cinematographic films, sound recordings, and photographs — 60 years from the year of publication; for government and international organisation works — 60 years from publication. Anonymous works: 60 years from publication. After this period, the work enters the public domain.",
  },
  {
    q: "What is the mandatory 30-day waiting period in copyright registration?",
    a: "Section 45 of the Copyright Act requires the Copyright Office to wait 30 days after an application is filed before proceeding to examination. During this period, any third party who believes they have a claim to the work can file a formal objection (caveat). If an objection is received, both parties are given an opportunity of hearing before the Registrar of Copyrights. This objection mechanism prevents fraudulent registration of another person&apos;s work. After 30 days with no objection, the registration proceeds.",
  },
  {
    q: "Can software code be copyrighted?",
    a: "Yes. Computer programs (including source code and object code) are classified as literary works under Section 2(o) of the Copyright Act, 1957. Software is fully eligible for copyright registration in India. When filing, you need to provide a portion of the source code (the Copyright Office allows submission of a representative portion to protect trade secrets). Copyright registration of software provides protection against unauthorised copying, reverse engineering for competitive purposes, and distribution of the software without permission.",
  },
  {
    q: "What are the penalties for copyright infringement in India?",
    a: "Copyright infringement is both a civil wrong and a criminal offence under Indian law. Civil remedies include: damages (actual or statutory), account of profits, injunction (temporary or permanent), and delivery of infringing copies. Criminal penalties under Section 63 of the Copyright Act include imprisonment of 6 months to 3 years and a fine of ₹50,000 to ₹2,00,000 for the first offence. Repeat offences carry higher penalties. Wilful infringement for commercial purposes can lead to imprisonment of 1 to 3 years.",
  },
  {
    q: "Can a company own a copyright?",
    a: "Yes. A company or other legal entity can own copyright as the &ldquo;author&rdquo; in specific circumstances. Under the Copyright Act, when a work is created by an employee in the course of employment, the employer (including a company) is deemed the first owner of the copyright unless there is an agreement to the contrary. For works created under a contract of service or apprenticeship, the employer owns the copyright. Companies can also acquire copyright by assignment from individual creators through properly executed assignment agreements.",
  },
  {
    q: "What is the difference between copyright and trademark?",
    a: "Copyright protects original creative expressions — books, music, software, films, and artistic works — automatically from creation, with registration strengthening enforcement. It prevents copying of the specific expression. Trademark protects brand identifiers — company names, logos, slogans — that distinguish goods and services in the market. It must be registered to get full statutory protection and must be renewed every 10 years. Copyright and trademark can co-exist for the same asset: a logo can be protected by both copyright (as artistic work) and trademark (as brand identifier).",
  },
];

export function CopyrightRegistrationPage() {
  return (
    <main className="overflow-x-hidden" itemScope itemType="https://schema.org/Service">

      {/* HERO */}
      <section className="relative bg-[#081726] text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "36px 36px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-heading">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-accent">Copyright Registration</span>
          </nav>
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Eyebrow label="Intellectual Property" />
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" itemProp="name">
              Copyright{" "}
              <span className="text-accent">Registration in India</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl" itemProp="description">
              Protect your creative works — books, software, music, films, and designs — with official copyright registration. Get a Certificate of Registration from the Copyright Office with 60-year protection across 180+ countries under the Berne Convention.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-7 py-3.5 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors">
                Register Copyright <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-white/10 transition-colors">
                <Phone size={15} /> Talk to an Expert
              </a>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-14">
            {quickFacts.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white/8 border border-white/10 rounded-2xl px-4 py-4 text-center backdrop-blur-sm">
                  <Icon size={18} className="text-accent mx-auto mb-2" />
                  <p className="text-accent font-heading font-bold text-sm leading-tight">{f.value}</p>
                  <p className="text-slate-400 text-xs mt-1 font-heading">{f.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* WHAT IS COPYRIGHT */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Overview" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">
                What is Copyright and Why Register?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-5">
                Copyright is an <strong className="text-dark">exclusive legal right</strong> that protects original creative works — literary, artistic, musical, and dramatic works, films, and software — from unauthorised copying, reproduction, or distribution. It is governed by the <strong className="text-dark">Copyright Act, 1957</strong> in India.
              </p>
              <p className="text-muted text-base leading-relaxed mb-5">
                While copyright arises <strong className="text-dark">automatically on creation</strong>, registration with the Copyright Office provides crucial advantages: it creates a public record, serves as prima facie evidence of ownership in disputes, and enables enforcement including criminal complaints, civil suits, and customs actions against infringing imports.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                India is a member of the <strong className="text-dark">Berne Convention</strong> (180+ countries) and <strong className="text-dark">TRIPS Agreement</strong>, ensuring that copyright registered in India enjoys automatic protection globally. Protection lasts for the <strong className="text-dark">author&apos;s lifetime plus 60 years</strong>.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Automatic on Creation", "60 Years Protection", "Berne Convention Member", "Criminal Enforcement"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-primary/5 border border-primary/15 rounded-3xl p-8">
                <Eyebrow label="Categories of Works" />
                <p className="font-heading font-bold text-dark text-base mb-5">What Can Be Copyrighted?</p>
                <div className="space-y-3">
                  {copyrightCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <div key={cat.title} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                        <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-heading font-semibold text-dark text-xs mb-0.5">{cat.title}</p>
                          <p className="text-muted text-xs leading-snug">{cat.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHO NEEDS */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Applicability" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Who Should Register Copyright?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              Copyright registration is valuable for any creator, business, or organisation that produces original content.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whoNeeds.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{w.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Key Benefits" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Why Register Your Copyright?</h2>
            <p className="text-muted mt-4">Registration converts your automatic copyright into an enforceable, commercially valuable legal asset.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{b.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Our Process" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Copyright Registration Process - Step by Step</h2>
            <p className="text-muted mt-4">From application to Certificate of Registration — we manage the complete process.</p>
          </div>
          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200 hidden md:block" aria-hidden="true" />
            <div className="space-y-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="flex gap-5 relative">
                  <div className="w-11 h-11 rounded-full bg-primary text-white font-heading font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-sm">
                    {step.n}
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl p-4 flex-1 hover:shadow-card hover:border-primary/15 transition-all duration-300">
                    <p className="font-heading font-bold text-dark text-sm mb-1">{step.title}</p>
                    <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow label="Documentation" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">Documents Required</h2>
              <p className="text-muted leading-relaxed mb-8">
                Requirements vary by work category. We guide you on exactly what to submit for your specific type of work.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {requiredDocs.map((doc, i) => {
                  const Icon = doc.icon;
                  return (
                    <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                      className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-primary" />
                      </div>
                      <span className="text-dark text-xs font-medium">{doc.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <Info size={18} className="text-blue-600" />
                  <p className="font-heading font-bold text-dark text-sm">Copyright vs Trademark vs Patent</p>
                </div>
                <div className="space-y-3">
                  {[
                    { type: "Copyright",  protects: "Creative works (books, code, music)", period: "Life + 60 years", auto: "Yes (registration strengthens)" },
                    { type: "Trademark",  protects: "Brand identifiers (name, logo, slogan)", period: "10 years (renewable)", auto: "No (must be registered)" },
                    { type: "Patent",     protects: "Inventions and innovations", period: "20 years", auto: "No (must be registered)" },
                  ].map((row) => (
                    <div key={row.type} className="bg-white border border-blue-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-heading font-bold text-dark text-sm">{row.type}</span>
                        <span className="text-xs text-blue-600 font-heading font-semibold">{row.period}</span>
                      </div>
                      <p className="text-muted text-xs mb-1"><strong>Protects:</strong> {row.protects}</p>
                      <p className="text-muted text-xs"><strong>Automatic:</strong> {row.auto}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TIMELINE & PRICING */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Timeline &amp; Pricing" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Timeline &amp; Investment</h2>
            <p className="text-muted mt-4">Affordable, all-inclusive copyright registration with expert IP support.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Clock size={18} className="text-white" />
                </div>
                <p className="font-heading font-bold text-dark">Timeline</p>
              </div>
              <div className="space-y-3">
                {[
                  { phase: "Application Filing",        time: "1-2 days" },
                  { phase: "Diary Number Issuance",     time: "Same day" },
                  { phase: "Mandatory Waiting Period",  time: "30 days" },
                  { phase: "Office Examination",        time: "15-30 days" },
                  { phase: "Certificate Issuance",      time: "5-10 days" },
                  { phase: "Total (Approx.)",           time: "30-60 business days" },
                ].map((item) => (
                  <div key={item.phase} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <span className="text-xs text-muted">{item.phase}</span>
                    <span className="text-xs font-heading font-semibold text-dark">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary rounded-3xl p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Wallet size={18} className="text-accent" />
                <p className="font-heading font-semibold text-base">Starting at ₹3,999</p>
              </div>
              <p className="text-white/60 text-xs mb-6 leading-relaxed">
                Includes government fee, Form XIV preparation, application filing, and follow-up until certificate issuance.
              </p>
              <div className="space-y-2 mb-6">
                {["Work Category Analysis", "Form XIV Preparation", "Government Fee Included", "Objection Period Monitoring", "Query Response Support", "Registration Certificate"].map(pt => (
                  <div key={pt} className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-accent shrink-0" />
                    <span className="text-white/80 text-xs">{pt}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact"
                className="w-full py-3 bg-accent text-dark text-xs font-heading font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors">
                Register Copyright Now <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" itemScope itemType="https://schema.org/FAQPage">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-14">
            <Eyebrow label="FAQ" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Frequently Asked Questions</h2>
            <p className="text-muted mt-4">All you need to know about copyright registration in India.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                <FaqItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
