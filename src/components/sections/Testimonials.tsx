"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const testimonials = [
  {
    name: "Arjun Sharma",
    role: "Founder, TechBridge Solutions",
    rating: 5,
    text: "Company Avenue handled our entire Pvt. Ltd. registration and GST setup in under 10 days. Completely transparent, professional and available whenever we needed them.",
    avatar: "AS",
    avatarBg: "bg-blue-100 text-blue-700",
  },
  {
    name: "Priya Mehta",
    role: "CEO, Retail Ventures India",
    rating: 5,
    text: "Three years of accounting and payroll support — zero errors, always on time. They genuinely feel like an in-house finance team rather than an external firm.",
    avatar: "PM",
    avatarBg: "bg-purple-100 text-purple-700",
  },
  {
    name: "Rohan Kapoor",
    role: "MD, Kapoor Exports",
    rating: 5,
    text: "Got our IEC registration and trademark done in record time. The team is highly knowledgeable and the pricing is completely upfront with no surprises.",
    avatar: "RK",
    avatarBg: "bg-green-100 text-green-700",
  },
  {
    name: "Neha Singh",
    role: "Co-Founder, HealthFirst Clinics",
    rating: 5,
    text: "Switched to Company Avenue for annual ROC filings and ITR. Seamless, fully digital, and their team proactively reminds us of all compliance deadlines.",
    avatar: "NS",
    avatarBg: "bg-rose-100 text-rose-700",
  },
  {
    name: "Vikram Patel",
    role: "Director, Patel Manufacturing",
    rating: 5,
    text: "Excellent MSME and Startup India registration support. Their compliance expertise gave us the confidence to focus completely on scaling our operations.",
    avatar: "VP",
    avatarBg: "bg-amber-100 text-amber-700",
  },
];

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let id: ReturnType<typeof setInterval>;
    const start = () => {
      id = setInterval(() => {
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 10) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollBy({ left: 320, behavior: "smooth" });
        }
      }, 3500);
    };
    start();
    el.addEventListener("mouseenter", () => clearInterval(id));
    el.addEventListener("mouseleave", start);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-24 bg-white" id="testimonials">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Client Stories"
          title="What Our Clients Say"
          subtitle="Real reviews from founders, directors and business owners we have helped grow."
          className="mb-14"
        />

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex-shrink-0 w-80 md:w-96 snap-start"
            >
              <div className="h-full bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-card hover:border-primary/10 transition-all duration-300 flex flex-col">
                <Quote size={22} className="text-slate-200 mb-4" />

                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm shrink-0 ${t.avatarBg}`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-dark text-sm">{t.name}</p>
                    <p className="text-muted text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google aggregate */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
              <span className="font-heading font-bold text-[#4285F4] text-lg">G</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                ))}
                <span className="font-heading font-bold text-dark text-sm ml-1">4.9</span>
              </div>
              <p className="text-muted text-xs mt-0.5">Based on 200+ Google Reviews</p>
            </div>
          </div>
          <a
            href="#"
            className="text-primary text-sm font-heading font-semibold hover:underline"
          >
            Read All Reviews →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
