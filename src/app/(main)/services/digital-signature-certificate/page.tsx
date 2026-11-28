import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, KeyRound } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, fitTitle } from "@/lib/seo";
import { STANDALONE_FEES } from "@/lib/calc-fees";
import { formatINR } from "@/lib/calc";
import { CTABanner } from "@/components/sections/CTABanner";
import { SearchQA } from "@/components/seo/SearchQA";

const DSC_LINES = STANDALONE_FEES.filter((f) => f.category === "Digital Signature");

export const metadata: Metadata = {
  alternates: { canonical: "/services/digital-signature-certificate" },
  title: fitTitle("Digital Signature Certificate (DSC) — Apply for DSC Online"),
  description:
    "Apply for a Class 3 Digital Signature Certificate (DSC) online for MCA, GST and income tax filings. DSC charges, documents and the application process, with token delivery.",
  keywords: ["dsc registration", "apply for dsc", "dsc application", "how to apply for dsc", "dsc charges", "digital signature certificate", "digital signature charges"],
};

export default function DigitalSignatureCertificatePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Digital Signature Certificate", path: "/services/digital-signature-certificate" },
      ])} />
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white/70 transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Digital Signature Certificate</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <KeyRound size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">Class 3 DSC</span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            Digital Signature Certificate (DSC) — Apply Online
          </h1>
          <p className="text-white/50 text-base max-w-2xl">
            A DSC lets directors, partners and owners sign MCA, GST and income tax filings online.
            We arrange your Class 3 DSC with online verification and a USB token.
          </p>
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container-custom max-w-3xl space-y-10">
          <div>
            <h2 className="font-heading font-bold text-dark text-xl mb-4">DSC charges</h2>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-card divide-y divide-slate-100">
              {DSC_LINES.map((l) => (
                <div key={l.code} className="flex items-center justify-between p-4 text-sm">
                  <span className="text-dark">{l.service}</span>
                  <span className="font-heading font-semibold text-dark whitespace-nowrap">
                    {l.fee === null ? "On quote" : `${formatINR(l.fee)}${l.onwards ? " onwards" : ""}`}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-muted text-xs mt-2">{DSC_LINES[0]?.basis ?? "Per certificate"}. GST extra.</p>
          </div>

          <div>
            <h2 className="font-heading font-bold text-dark text-xl mb-4">How to apply for DSC</h2>
            <ol className="list-decimal pl-5 space-y-2 text-muted text-sm leading-relaxed">
              <li>Share your PAN, Aadhaar-linked mobile number, email and a photo with us.</li>
              <li>We raise the DSC application with a licensed certifying authority.</li>
              <li>You complete the short online verification (video or OTP) from your phone.</li>
              <li>The DSC is issued and delivered on a USB token, ready for MCA, GST and income tax portals.</li>
            </ol>
          </div>

          <div>
            <h2 className="font-heading font-bold text-dark text-xl mb-4">Who needs a DSC</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted text-sm leading-relaxed">
              <li>Directors and subscribers of a new company, and designated partners of a new LLP.</li>
              <li>Directors signing ROC filings, and authorised signatories for GST and income tax.</li>
              <li>Businesses that file e-tenders or sign documents online.</li>
            </ul>
            <p className="text-sm text-muted mt-4">
              Registering a company or LLP with us? DSCs for all directors are included in the{" "}
              <Link href="/services/private-limited-company" className="text-primary font-semibold">company registration</Link> and{" "}
              <Link href="/services/llp-registration" className="text-primary font-semibold">LLP registration</Link> packages.
            </p>
          </div>
        </div>
      </section>

      <SearchQA path="/services/digital-signature-certificate" />
      <CTABanner />
    </>
  );
}
