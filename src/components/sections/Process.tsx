"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    n: "01",
    title: "Free Consultation",
    desc: "Understand your business requirements and recommend the right structure.",
  },
  {
    n: "02",
    title: "Document Collection",
    desc: "Collect and verify all required documents securely through our digital portal.",
  },
  {
    n: "03",
    title: "Application Preparation",
    desc: "Prepare government applications accurately and ensure complete compliance.",
  },
  {
    n: "04",
    title: "Government Filing",
    desc: "Submit to the relevant authority and monitor progress in real time.",
  },
  {
    n: "05",
    title: "Approval & Certification",
    desc: "Receive your certificate, PAN, TAN or GSTIN delivered digitally.",
  },
  {
    n: "06",
    title: "Ongoing Support",
    desc: "Annual compliance, taxation and advisory — we stay with your business.",
  },
];

export function Process() {
  return (
    <section className="py-14 md:py-24 bg-white">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Our Process"
          title="Simple, Transparent & Hassle-Free Registration Process"
          subtitle="A clear 6-step journey from consultation to certification — no jargon, no surprises."
          className="mb-12 md:mb-20"
        />

        {/* Desktop — horizontal timeline */}
        <div className="hidden lg:block">
          {/* Connector line */}
          <div className="relative mb-8">
            <div className="absolute top-7 left-[calc(100%/12)] right-[calc(100%/12)] h-px bg-slate-200 z-0" />
            <div className="grid grid-cols-6 gap-4 relative z-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step number circle */}
                  <div className="relative w-14 h-14 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center mb-4 shadow-sm group-hover:border-primary transition-colors">
                    <span className="font-heading font-bold text-primary text-base">{step.n}</span>
                    {/* Accent dot */}
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent border-2 border-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-dark text-sm mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile — vertical timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-6 top-6 bottom-6 w-px bg-slate-200 z-0" />
          <div className="space-y-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-5 items-start pl-2"
              >
                <div className="w-12 h-12 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center shrink-0 shadow-sm relative">
                  <span className="font-heading font-bold text-primary text-sm">{step.n}</span>
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent border-2 border-white" />
                </div>
                <div className="pt-2">
                  <h3 className="font-heading font-semibold text-dark text-sm mb-1">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
