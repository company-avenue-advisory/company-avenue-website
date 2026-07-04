"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { COMPANY } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const services = [
  "Company Registration",
  "GST Registration / Filing",
  "Income Tax Return",
  "Trademark Registration",
  "Accounting & Bookkeeping",
  "Payroll Management",
  "MSME / Startup India",
  "ROC Compliance",
  "IEC Registration",
  "Other",
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log(data);
    setSubmitted(true);
    reset();
  };

  return (
    <>
      {/* Page hero */}
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-4 block">
              Get In Touch
            </span>
            <h1 className="heading-lg text-white mb-4">
              Let&apos;s Talk About Your Business
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Speak with a compliance expert for free. We&apos;ll understand your needs and recommend the right approach.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="section-pad bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form — 3 cols */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl p-8 shadow-card border border-slate-100">
                <h2 className="heading-sm text-dark mb-6">Book a Free Consultation</h2>

                {submitted ? (
                  <div className="flex flex-col items-center text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="font-heading font-bold text-dark text-lg mb-2">
                      Message Received
                    </h3>
                    <p className="text-muted text-sm max-w-xs">
                      Our team will contact you within 2 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-primary text-sm font-heading font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-heading font-medium text-dark mb-1.5">
                          Full Name *
                        </label>
                        <input
                          {...register("name")}
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-dark placeholder-muted focus:outline-none focus:border-primary transition-colors"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-heading font-medium text-dark mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          {...register("phone")}
                          placeholder="+91 99537 19111"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-dark placeholder-muted focus:outline-none focus:border-primary transition-colors"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-medium text-dark mb-1.5">
                        Email Address *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-dark placeholder-muted focus:outline-none focus:border-primary transition-colors"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-medium text-dark mb-1.5">
                        Service Required *
                      </label>
                      <select
                        {...register("service")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-dark focus:outline-none focus:border-primary transition-colors bg-white"
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-medium text-dark mb-1.5">
                        Message *
                      </label>
                      <textarea
                        {...register("message")}
                        rows={4}
                        placeholder="Describe your requirements..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-dark placeholder-muted focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isSubmitting}
                      className="w-full justify-center"
                    >
                      Send Message
                    </Button>
                    <p className="text-muted text-xs text-center">
                      By submitting, you agree to our Privacy Policy. We respond within 2 hours.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Info — 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100">
                <h3 className="font-heading font-semibold text-dark text-base mb-5">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Address", value: COMPANY.address },
                    { icon: Phone, label: "Phone", value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                    { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                    { icon: Clock, label: "Hours", value: COMPANY.workingHours },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-muted text-xs font-medium">{label}</p>
                        {href ? (
                          <a href={href} className="text-dark text-sm hover:text-primary transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-dark text-sm">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-green-500 rounded-2xl p-5 text-white hover:bg-green-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm">Chat on WhatsApp</p>
                  <p className="text-white/70 text-xs mt-0.5">Typically replies within minutes</p>
                </div>
              </a>

              <div className="bg-primary rounded-2xl p-6 text-white">
                <h4 className="font-heading font-semibold text-base mb-2">
                  Quick Response Promise
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  We respond to all inquiries within 2 business hours. For urgent matters, call us directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
