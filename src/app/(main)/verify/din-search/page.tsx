import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, fitTitle } from "@/lib/seo";
import Link from "next/link";
import { ChevronRight, UserSearch } from "lucide-react";
import { CompanyVerification } from "@/components/tools/CompanyVerification";
import { CTABanner } from "@/components/sections/CTABanner";
import { ToolNextStep } from "@/components/tools/ToolNextStep";

const FAQS = [
  {
    "question": "What is a DIN number?",
    "answer": "DIN is the Director Identification Number. It is an 8-digit unique ID that a person must have before becoming a director of an Indian company."
  },
  {
    "question": "Can I search a director by name?",
    "answer": "This tool searches by DIN. If you only have a company name, first look up the company with our company name search or CIN search, then use the DIN of the director."
  },
  {
    "question": "Is the DIN search free?",
    "answer": "Yes. The DIN search is free and shows data from the MCA registry."
  },
  {
    "question": "What if my DIN shows as deactivated?",
    "answer": "A DIN can be deactivated if yearly director KYC is not filed. Our Director KYC service can help you file it and restore the DIN."
  }
];

export const metadata: Metadata = {
  alternates: { canonical: "/verify/din-search" },
  title: fitTitle("DIN Number Search — Director Details & Company Directorships"),
  description: "Free DIN number search. Enter a Director Identification Number (DIN) to see the director's name and every company and LLP they are linked to, from MCA data.",
  keywords: ["din number search", "director search mca", "company director search", "din verification", "din status check", "mca director search", "find director details"],
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Verification Tools", path: "/verify" },
          { name: "DIN Number Search", path: "/verify/din-search" },
        ])} />
      <JsonLd data={faqSchema(FAQS)} />
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-16">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs font-heading mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/verify" className="hover:text-white/70 transition-colors">Verify</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">{"DIN Number Search"}</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <UserSearch size={22} className="text-white" />
            </div>
            <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase">
              Free · MCA Data
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
            {"DIN Number Search — Director Details"}
          </h1>
          <p className="text-white/50 text-base max-w-2xl">{"Enter a DIN to see the director's name and the companies and LLPs they are or were linked to, with dates. Free, from the Ministry of Corporate Affairs registry."}</p>
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container-custom">
          <CompanyVerification initialType="din" />

          <div className="mt-12 max-w-3xl">
            <h2 className="font-heading font-bold text-dark text-xl mb-4">{"How to search a director by DIN"}</h2>
            <ol className="list-decimal pl-5 space-y-2 text-muted text-sm leading-relaxed">
              {["Select \"DIN\" in the tool above (it opens on DIN for you).", "Type the 8-digit DIN exactly as given.", "Complete the quick security check and press Verify.", "Read the result: the director's name and each company or LLP with designation, start date and end date."].map((s) => <li key={s}>{s}</li>)}
            </ol>
          </div>

          <div className="mt-10 max-w-3xl">
            <h2 className="font-heading font-bold text-dark text-xl mb-4">{"When a DIN search helps"}</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted text-sm leading-relaxed">
              {["Checking a proposed co-director or partner before you bring them on board.", "Seeing which other companies a director is linked to, for due diligence.", "Confirming your own DIN details before a filing.", "Checking past appointments when a director has resigned."].map((s) => <li key={s}>{s}</li>)}
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
            Have a CIN instead? Use the <Link href="/verify/cin-search" className="text-primary font-semibold">CIN number check</Link>. Need to file director KYC? See <Link href="/services/director-kyc" className="text-primary font-semibold">Director KYC (DIR-3 KYC)</Link>.
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
