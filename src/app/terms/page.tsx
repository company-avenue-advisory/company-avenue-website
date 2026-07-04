import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the Company Avenue Advisory website and engagement of our chartered accountancy and compliance services.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="4 July 2026"
      intro="These Terms govern your use of this website and, separately, form the general framework under which Company Avenue Advisory provides professional services. Please read them carefully."
    >
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using {COMPANY.website} (the &ldquo;Website&rdquo;), you agree to be bound by
        these Terms of Service. If you do not agree, please do not use the Website. These Terms apply
        in addition to, and do not replace, the specific engagement letter or service agreement signed
        between you and Company Avenue Advisory Private Limited (CIN {COMPANY.cin}) for any
        professional service.
      </p>

      <h2>2. Nature of This Website</h2>
      <p>
        This Website provides general information about our services, free calculators and
        verification tools, and a means to contact us. Nothing on this Website constitutes a formal
        client engagement, a professional opinion, or advice that can be relied upon for any specific
        transaction or decision. A professional client relationship with Company Avenue Advisory is
        formed only upon execution of a written engagement letter.
      </p>

      <h2>3. Free Tools — Calculators &amp; Verification Tools</h2>
      <p>
        This Website offers free calculators (GST, income tax, TDS, compliance cost, and others) and
        verification tools (GSTIN, PAN, CIN/DIN lookup, company name search, trademark class finder).
        These tools are provided for general informational and educational purposes only:
      </p>
      <ul>
        <li>Calculator outputs are estimates based on publicly available rate schedules and rules current at the time of writing; they do not account for every individual circumstance, exemption, or recent regulatory change.</li>
        <li>Verification tools query third-party and government-sourced data (including the Ministry of Corporate Affairs&rsquo; Company Master Data and GST Network records) and reflect that data as available at the time of the query — they are not a substitute for the official government verification channels (e.g. the MCA portal, GST portal) before any legal filing.</li>
        <li>We do not guarantee the completeness, accuracy, or currency of any output from these tools, and we accept no liability for decisions made solely on the basis of them.</li>
      </ul>

      <h2>4. Professional Services</h2>
      <p>
        Where you engage us for chartered accountancy, company secretarial, tax, or advisory
        services, the specific scope, fees, timelines, and responsibilities of each party will be set
        out in a separate written engagement letter, which shall take precedence over these Terms in
        the event of any conflict. Our services are rendered in accordance with the standards and
        Code of Ethics prescribed by the Institute of Chartered Accountants of India (ICAI) and other
        applicable professional bodies.
      </p>

      <h2>5. Fees &amp; Payment</h2>
      <p>
        Package pricing displayed on this Website (see our{" "}
        <a href="/pricing">Pricing &amp; Packages</a> page) is indicative and exclusive of applicable
        GST unless stated otherwise. Government and statutory fees (stamp duty, ROC filing fees, and
        similar third-party charges) are billed separately at actuals. Final pricing for your specific
        engagement will be confirmed in writing before work begins. Refunds, where applicable, are
        governed by our <a href="/refund-policy">Refund Policy</a>.
      </p>

      <h2>6. Your Responsibilities</h2>
      <p>As a user of this Website or a client of our services, you agree to:</p>
      <ul>
        <li>Provide accurate, complete, and current information when contacting us, using our tools, or engaging our services.</li>
        <li>Not use this Website for any unlawful purpose, or in a manner that could damage, disable, or impair it.</li>
        <li>Not attempt to gain unauthorised access to any part of the Website, our systems, or data of other users.</li>
        <li>Not use automated means (bots, scrapers) to extract data from this Website, including our free verification tools, at a volume inconsistent with normal individual use.</li>
      </ul>

      <h2>7. Intellectual Property</h2>
      <p>
        All content on this Website — including text, graphics, logos, tool designs, and underlying
        code — is the property of Company Avenue Advisory Private Limited or its licensors and is
        protected under applicable Indian copyright and trademark law. You may not reproduce,
        distribute, or create derivative works from this content without our prior written consent,
        other than for personal, non-commercial reference.
      </p>

      <h2>8. Third-Party Links &amp; Data Sources</h2>
      <p>
        This Website links to and, in the case of our verification tools, retrieves data from
        third-party and government sources (including the Ministry of Corporate Affairs, GST Network,
        Open Government Data Platform, and Google). We do not control these sources and are not
        responsible for their accuracy, availability, or content.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted under applicable law, Company Avenue Advisory Private Limited
        shall not be liable for any indirect, incidental, or consequential loss arising from your use
        of this Website or reliance on any free tool, calculator, or general information published on
        it. Our liability in connection with any professional service is governed exclusively by the
        terms of the relevant engagement letter.
      </p>

      <h2>10. Indemnity</h2>
      <p>
        You agree to indemnify and hold harmless Company Avenue Advisory Private Limited, its
        directors, employees, and consultants from any claim arising out of your misuse of this
        Website or breach of these Terms.
      </p>

      <h2>11. Governing Law &amp; Jurisdiction</h2>
      <p>
        These Terms are governed by the laws of India. Any dispute arising out of or in connection
        with these Terms or your use of this Website shall be subject to the exclusive jurisdiction
        of the courts at New Delhi, India.
      </p>

      <h2>12. Changes to These Terms</h2>
      <p>
        We may revise these Terms from time to time. Continued use of the Website after any revision
        constitutes acceptance of the updated Terms. The &ldquo;Last updated&rdquo; date at the top of
        this page reflects the most recent revision.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these Terms may be directed to{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or {COMPANY.phone}.
      </p>
    </LegalPageLayout>
  );
}
