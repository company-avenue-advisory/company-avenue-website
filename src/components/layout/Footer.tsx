import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowRight, Linkedin, Twitter, Facebook } from "lucide-react";
import { COMPANY, SERVICES } from "@/lib/constants";

const SHARE_URL = encodeURIComponent(COMPANY.website + "/");
const SHARE_TITLE = encodeURIComponent(
  "Company Avenue Advisory | Trusted CA & CS Services for All Your Corporate Needs"
);

const SOCIAL_LINKS = [
  { icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${SHARE_URL}`, label: "Share on Facebook" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/company-avenue-advisory-pvt-ltd/", label: "Follow us on LinkedIn" },
  { icon: Twitter, href: `https://x.com/intent/tweet?text=${SHARE_TITLE}&url=${SHARE_URL}`, label: "Share on X" },
];

export function Footer() {
  const popularServices = SERVICES.slice(0, 6);

  return (
    <footer className="bg-dark text-white">
      {/* Newsletter banner */}
      <div className="border-b border-white/10">
        <div className="container-custom py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading font-bold text-xl text-white">
                Stay ahead of compliance deadlines
              </h3>
              <p className="text-white/50 text-sm mt-1">
                Get timely updates on GST, ITR, ROC, and more.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent/50 transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl text-sm font-heading font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-5">
              <div className="relative h-14 w-56">
                <Image
                  src="/images/logo.webp"
                  alt={COMPANY.fullName}
                  fill
                  className="object-contain object-left"
                  sizes="224px"
                />
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              India&apos;s trusted compliance partner for startups, MSMEs, and growing businesses. 
              15+ years of expert service across tax, legal, and corporate compliance.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-accent mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm">{COMPANY.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-accent shrink-0" />
                <a href={`tel:${COMPANY.phone}`} className="text-white/50 text-sm hover:text-white transition-colors">
                  {COMPANY.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-accent shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="text-white/50 text-sm hover:text-white transition-colors">
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={15} className="text-accent shrink-0" />
                <span className="text-white/50 text-sm">{COMPANY.workingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-accent/20 flex items-center justify-center transition-colors"
                >
                  <Icon size={15} className="text-white/60 hover:text-accent" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-5 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5">
              {popularServices.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.id}`}
                    className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 text-accent transition-opacity"
                    />
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-accent text-sm hover:text-accent-light transition-colors font-medium"
                >
                  View all services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-5 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "How-To Guides", href: "/guides" },
                { label: "Document Templates", href: "/templates" },
                { label: "Business Resources", href: "/resources" },
                { label: "Blog", href: "/blog" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-5 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Refund Policy", href: "/refund-policy" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Sitemap", href: "/sitemap.xml" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>
            © {new Date().getFullYear()} {COMPANY.fullName}. All rights reserved.
          </p>
          <p>
            GSTIN: {COMPANY.gstin} &nbsp;|&nbsp; CIN: {COMPANY.cin}
          </p>
          <p>
            Designed & built with precision in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
