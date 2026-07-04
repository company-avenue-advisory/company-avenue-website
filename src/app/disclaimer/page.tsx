import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimers regarding the general information, calculators, and verification tools on this website.",
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      lastUpdated="4 July 2026"
      intro="Please read this disclaimer carefully before relying on any content, calculator, or tool on this website. It clarifies what this website is — and, importantly, what it is not."
    >
      <h2>1. General Information Only</h2>
      <p>
        The content published on this Website — including service descriptions, guides, blog
        articles, and FAQ content — is provided for general informational purposes only. It reflects
        our understanding of applicable Indian law (including the Companies Act 2013, Income Tax Act
        1961, Central Goods and Services Tax Act 2017, and related rules) as of the date of
        publication, and is not intended as, and should not be construed as, legal, tax, or
        professional advice for your specific circumstances.
      </p>

      <h2>2. No Client Relationship Formed by Browsing</h2>
      <p>
        Viewing this Website, using a free calculator or verification tool, or submitting a contact
        form does not create a chartered accountant–client or company secretary–client relationship
        between you and Company Avenue Advisory Private Limited. Such a relationship is formed only
        upon our mutual written agreement in a formal engagement letter, following which advice is
        given specific to your facts.
      </p>

      <h2>3. Calculators Are Estimates, Not Filings</h2>
      <p>
        The GST Calculator, Income Tax Calculator, TDS Rate Finder, Company Registration Cost
        Calculator, Annual Compliance Cost Calculator, and other tools on this Website produce{" "}
        <strong>indicative estimates only</strong>, based on publicly available rate schedules and
        rules at the time of writing. They:
      </p>
      <ul>
        <li>Do not account for every exemption, deduction, presumptive-taxation option, or sector-specific rule that may apply to your business.</li>
        <li>May not reflect the very latest rate or rule change if published after our last update.</li>
        <li>Are not a substitute for a return, form, or filing accepted by any government authority.</li>
      </ul>
      <p>Always confirm exact figures with a qualified professional before filing or making a financial decision.</p>

      <h2>4. Verification Tools Reflect Third-Party Data</h2>
      <p>
        Our GST Verification, PAN Verification, Company &amp; Director Verification, and Company
        Name Search tools retrieve data from government-linked sources (GST Network, the Ministry of
        Corporate Affairs&rsquo; Company Master Data via the Open Government Data Platform) through
        licensed third-party API providers. We do not control, and cannot guarantee, the completeness,
        accuracy, or real-time availability of this underlying data:
      </p>
      <ul>
        <li>GST Network or MCA source systems may occasionally be delayed, under maintenance, or temporarily unreachable, in which case a tool may return an error rather than a result.</li>
        <li>The Company Name Search tool checks exact-name matches across common legal-entity suffixes and descriptive word combinations — it does not perform the phonetic-similarity or trademark-conflict checks that the official MCA name-reservation process applies, and a name shown as &ldquo;available&rdquo; is not a guarantee of approval.</li>
        <li>The Trademark Class Finder suggests likely NICE classification classes based on keyword matching and is not a substitute for an official trademark search on the IP India portal or professional trademark advice.</li>
      </ul>
      <p>Always cross-check with the relevant official government portal (MCA, GST, IP India) before relying on any result for a legal filing or business decision.</p>

      <h2>5. No Guarantee of Outcome</h2>
      <p>
        References on this Website to typical timelines, approval likelihoods, or outcomes for
        registrations and filings (e.g. trademark registration, company incorporation) are based on
        general experience and publicly available processing norms. Actual timelines and outcomes
        depend on facts specific to your application and the discretion of the relevant government
        authority, and cannot be guaranteed by us.
      </p>

      <h2>6. Reviews &amp; Testimonials</h2>
      <p>
        Client reviews displayed on this Website are sourced from our verified Google Business
        Profile via the Google Places API and reflect genuine, independently submitted reviews. Past
        results described in any review or testimonial do not guarantee similar outcomes for your
        specific matter.
      </p>

      <h2>7. Third-Party Links</h2>
      <p>
        This Website may link to third-party websites (including government portals such as the MCA,
        GST, and IP India websites) for your convenience. We are not responsible for the content,
        accuracy, or availability of any linked external website.
      </p>

      <h2>8. Professional Advice Recommended</h2>
      <p>
        Before making any business, tax, or legal decision, we strongly recommend consulting directly
        with a qualified Chartered Accountant, Company Secretary, or legal professional who can review
        your specific facts. You can reach our team for a free consultation at{" "}
        <a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a> or{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted under applicable law, Company Avenue Advisory Private Limited
        disclaims all liability for any loss or damage arising from reliance on general information,
        calculator outputs, or verification-tool results published on this Website, in the absence of
        a formal engagement letter covering the specific matter in question.
      </p>

      <h2>10. Changes to This Disclaimer</h2>
      <p>
        We may revise this Disclaimer from time to time to reflect changes in our services or
        applicable law. The &ldquo;Last updated&rdquo; date at the top of this page indicates the most
        recent revision.
      </p>
    </LegalPageLayout>
  );
}
