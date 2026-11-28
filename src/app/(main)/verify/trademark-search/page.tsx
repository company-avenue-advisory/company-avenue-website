import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Search, ExternalLink } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, fitTitle } from "@/lib/seo";
import { CTABanner } from "@/components/sections/CTABanner";
import { SearchQA } from "@/components/seo/SearchQA";

export const metadata: Metadata = {
  alternates: { canonical: "/verify/trademark-search" },
  title: fitTitle("Trademark Search & Trademark Status Check — How to Do It Free"),
  description:
    "Trademark search and trademark status check in India, step by step: search the IP India public register, check a trademark application status, and download the registration certificate.",
  keywords: ["trademark search", "trademark status", "check trademark status", "trademark availability check", "trademark certificate download", "ip india trademark search"],
};

const PUBLIC_SEARCH = "https://tmrsearch.ipindia.gov.in/tmrpublicsearch/";
const E_REGISTER = "https://tmrsearch.ipindia.gov.in/estatus";

export default function TrademarkSearchPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Verification Tools", path: "/verify" },
        { name: "Trademark Search & Status", path: "/verify/trademark-search" },
      ])} />
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/verify" className="hover:text-white/70 transition-colors">Verify</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Trademark Search &amp; Status</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Search size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">Free · IP India</span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            Trademark Search &amp; Trademark Status Check
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            How to search the trademark register, check if a brand name is available, track your
            trademark status and download the certificate — all on the official IP India site.
          </p>
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container-custom max-w-3xl space-y-10">
          <div>
            <h2 className="font-heading font-bold text-dark text-xl mb-4">How to do a trademark search (availability check)</h2>
            <ol className="list-decimal pl-5 space-y-2 text-muted text-sm leading-relaxed">
              <li>Find your class first with our free <Link href="/verify/trademark-class-finder" className="text-primary font-semibold">trademark class finder</Link>.</li>
              <li>Open the <a href={PUBLIC_SEARCH} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold">IP India public search <ExternalLink size={12} className="inline" /></a> and log in with the OTP sent to your email or mobile.</li>
              <li>Choose a word mark search, type your brand name, and select the class.</li>
              <li>Try the search with &quot;starts with&quot;, &quot;contains&quot; and &quot;match with&quot; options, and with spelling changes, to catch similar marks.</li>
              <li>Note any similar marks in the same or related classes. A similar earlier mark is the most common reason for an objection.</li>
            </ol>
          </div>

          <div>
            <h2 className="font-heading font-bold text-dark text-xl mb-4">How to check trademark status</h2>
            <ol className="list-decimal pl-5 space-y-2 text-muted text-sm leading-relaxed">
              <li>Open the <a href={E_REGISTER} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold">IP India trademark e-register <ExternalLink size={12} className="inline" /></a> and log in with OTP.</li>
              <li>Search by your application number (it is on your filing receipt).</li>
              <li>Read the status shown, and open the documents section for any examination report or notice.</li>
              <li>If the status shows an objection or opposition, it needs a reply within the time given in the notice. See our <Link href="/services/trademark-objection" className="text-primary font-semibold">trademark objection reply</Link> service.</li>
            </ol>
          </div>

          <div>
            <h2 className="font-heading font-bold text-dark text-xl mb-4">How to download the trademark certificate</h2>
            <p className="text-muted text-sm leading-relaxed">
              Once your mark is registered, the registration certificate is available in the documents for
              your application on the e-register. Look it up by application number as above and download it.
              If you cannot find it, we can check your application for you.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
            <p className="text-dark text-sm leading-relaxed">
              Found your name is free? Protect it before someone else files.{" "}
              <Link href="/services/trademark-registration" className="text-primary font-semibold hover:underline">
                Trademark registration online →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <SearchQA path="/verify/trademark-search" />
      <CTABanner />
    </>
  );
}
