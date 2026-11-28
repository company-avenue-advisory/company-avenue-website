import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, fitTitle } from "@/lib/seo";
import Link from "next/link";
import { ChevronRight, Building2 } from "lucide-react";
import { CompanyVerification } from "@/components/tools/CompanyVerification";
import { CTABanner } from "@/components/sections/CTABanner";
import { ToolNextStep } from "@/components/tools/ToolNextStep";

const FAQS = [
  {
    "question": "What is a CIN number?",
    "answer": "CIN is the Corporate Identification Number. It is a unique 21-character code that the Ministry of Corporate Affairs gives every company it registers."
  },
  {
    "question": "Where can I find a company's CIN?",
    "answer": "Companies print their CIN on letterheads, invoices, websites and the certificate of incorporation. You can also find it by searching the company's name on our free company name search."
  },
  {
    "question": "Is this CIN check free?",
    "answer": "Yes. The CIN check is free. It shows data from the MCA registry."
  },
  {
    "question": "Can I search an LLP here?",
    "answer": "Yes. Enter the LLP's LLPIN in the same box to see its details."
  }
];

export const metadata: Metadata = {
  alternates: { canonical: "/verify/cin-search" },
  title: fitTitle("CIN Number Check — Search Company Details by CIN (Free)"),
  description: "Free CIN number check. Search any company by its CIN (Corporate Identification Number) and see status, incorporation date, RoC, capital and registered address from MCA data.",
  keywords: ["cin number check", "company details by cin number", "search company by cin", "mca cin search", "cin verification", "find cin number of company", "cin no search"],
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Verification Tools", path: "/verify" },
          { name: "CIN Number Search", path: "/verify/cin-search" },
        ])} />
      <JsonLd data={faqSchema(FAQS)} />
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/verify" className="hover:text-white/70 transition-colors">Verify</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">{"CIN Number Search"}</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              Free · MCA Data
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            {"CIN Number Check — Company Details by CIN"}
          </h1>
          <p className="text-white/50 text-base max-w-2xl">{"Enter a company's CIN (or an LLP's LLPIN) to see its status, incorporation date, RoC, capital and registered address. Free, and pulled from the Ministry of Corporate Affairs registry."}</p>
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container-custom">
          <CompanyVerification initialType="cin" />

          <div className="mt-12 max-w-3xl">
            <h2 className="font-heading font-bold text-dark text-xl mb-4">{"How to check company details by CIN"}</h2>
            <ol className="list-decimal pl-5 space-y-2 text-muted text-sm leading-relaxed">
              {["Keep \"CIN\" selected in the tool above.", "Type the 21-character CIN exactly as printed on the company's letterhead, invoice or certificate of incorporation.", "Complete the quick security check and press Verify.", "Read the result: status, category, class, incorporation date, RoC, paid-up and authorised capital and registered address."].map((s) => <li key={s}>{s}</li>)}
            </ol>
          </div>

          <div className="mt-10 max-w-3xl">
            <h2 className="font-heading font-bold text-dark text-xl mb-4">{"When a CIN search helps"}</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted text-sm leading-relaxed">
              {["Checking a new vendor, client or employer is a real, active company before you sign or pay.", "Confirming the exact registered name and address for an invoice, agreement or GST record.", "Seeing whether a company is Active, Strike Off or under another status before you deal with it.", "Finding the RoC and incorporation date for your own company's compliance records."].map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>

          <div className="mt-10 max-w-3xl">
            <h2 className="font-heading font-bold text-dark text-xl mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQS.map((f) => (
                <div key={f.question} className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{f.question}</h3>
                  <p className="text-muted text-sm leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-sm text-muted max-w-3xl">
            Know the name but not the CIN? Use our <Link href="/verify/company-name-search" className="text-primary font-semibold">company name search</Link>. Looking for a director? Try the <Link href="/verify/din-search" className="text-primary font-semibold">DIN number search</Link>.
          </p>
        </div>
      </section>

      <div className="container-custom">
        <ToolNextStep
          intro="Looked up a company or director on the MCA registry? These are the filings that keep that record clean."
          ctaLabel="Review my company's compliance"
          ctaHref="/contact"
          services={[
            { label: "ROC Compliance", href: "/services/roc-compliance", desc: "AOC-4, MGT-7 and every annual filing a company owes the Registrar." },
            { label: "Director KYC (DIR-3)", href: "/services/director-kyc", desc: "Yearly director KYC, so your DIN stays active." },
            { label: "Change in Directors", href: "/services/change-in-directors", desc: "Appointment, resignation and DIR-12 filing, done properly." },
          ]}
        />
      </div>

      <CTABanner />
    </>
  );
}
