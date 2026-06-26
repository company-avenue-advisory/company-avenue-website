"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";

const NAV = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Private Limited Company", href: "/services/private-limited-company" },
      { label: "LLP Registration", href: "/services/llp-registration" },
      { label: "One Person Company", href: "/services/one-person-company" },
      { label: "GST Registration", href: "/services/gst-registration" },
      { label: "GST Return Filing", href: "/services/gst-filing" },
      { label: "Income Tax Return", href: "/services/income-tax-return" },
      { label: "Trademark Registration", href: "/services/trademark-registration" },
      { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
      { label: "Payroll Management", href: "/services/payroll-management" },
      { label: "MSME Registration", href: "/services/msme-registration" },
      { label: "Startup India", href: "/services/startup-india" },
      { label: "IEC Registration", href: "/services/iec-registration" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Blogs", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const servicesNav = NAV.find((n) => n.label === "Services");

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
            : "bg-white border-b border-slate-100"
        )}
      >
        <nav
          className="container-custom flex items-center justify-between h-[72px]"
          ref={dropdownRef}
        >
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="relative h-14 w-52">
              <Image
                src="/images/logo.webp"
                alt={COMPANY.fullName}
                fill
                className="object-contain object-left"
                priority
                sizes="208px"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    onClick={() => setServicesOpen((v) => !v)}
                    className="inline-flex items-center gap-1 px-4 py-2 text-sm font-heading font-medium text-slate-600 hover:text-primary rounded-lg hover:bg-slate-50 transition-all"
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "text-slate-400 transition-transform duration-200",
                        servicesOpen ? "rotate-180" : ""
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[420px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] border border-slate-100 p-4"
                      >
                        <div className="grid grid-cols-2 gap-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-primary hover:bg-primary/5 transition-all group"
                            >
                              <ArrowRight
                                size={11}
                                className="text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                              />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <Link
                            href="/services"
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center justify-between px-3 py-2 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary text-sm font-heading font-semibold transition-colors"
                          >
                            View all services
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-heading font-medium text-slate-600 hover:text-primary rounded-lg hover:bg-slate-50 transition-all"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-heading font-medium text-slate-600 hover:text-primary rounded-lg hover:bg-slate-50 transition-all"
            >
              <Phone size={14} />
              Call Now
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 transition-colors shadow-sm"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-0 z-40 bg-white flex flex-col"
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-5 h-[72px] border-b border-slate-100">
              <div className="relative h-12 w-44">
                <Image
                  src="/images/logo.webp"
                  alt={COMPANY.fullName}
                  fill
                  className="object-contain object-left"
                  sizes="176px"
                />
              </div>
              <button
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile links */}
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <nav className="space-y-1">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-700 font-heading font-medium hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown size={15} className="text-slate-400" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 space-y-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white font-heading font-semibold rounded-xl text-sm"
                >
                  Book Consultation
                </Link>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-slate-200 text-slate-700 font-heading font-medium rounded-xl text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  <Phone size={15} />
                  {COMPANY.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
