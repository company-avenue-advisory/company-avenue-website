import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Company Avenue Advisory collects, uses, and protects your personal data, in accordance with the Digital Personal Data Protection Act, 2023.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="4 July 2026"
      intro="This policy explains what personal data Company Avenue Advisory Private Limited collects, why, and how it is protected — in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and other applicable Indian law."
    >
      <h2>1. Who We Are</h2>
      <p>
        Company Avenue Advisory Private Limited (&ldquo;CAA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;), CIN {COMPANY.cin}, is the Data Fiduciary responsible for personal data
        processed through {COMPANY.website} and in the course of providing chartered accountancy,
        company secretarial and business compliance services. Our registered/operating office is at{" "}
        {COMPANY.address}.
      </p>

      <h2>2. What Personal Data We Collect</h2>
      <p>We collect personal data in three ways:</p>
      <ul>
        <li>
          <strong>Directly from you</strong> — name, phone number, email address, company name,
          business details, and any documents you share with us (e.g. PAN, GSTIN, incorporation
          certificates, financial statements) when you contact us, use a free tool on this website,
          or engage us for a service.
        </li>
        <li>
          <strong>Automatically, through your use of the website</strong> — IP address, browser
          type, pages visited, and referral source, via standard analytics. We do not use this data
          to identify individual visitors beyond what is necessary to operate and improve the site.
        </li>
        <li>
          <strong>Through our free verification tools</strong> — where you voluntarily submit a
          GSTIN, PAN, CIN, DIN, or company name to check its status against public government
          records. These submissions are used solely to make the requested lookup and are not
          stored by us beyond the time needed to return the result to you.
        </li>
      </ul>

      <h2>3. Why We Process Your Data (Purpose)</h2>
      <p>In accordance with Section 5 of the DPDP Act, we process personal data only for clearly stated purposes:</p>
      <ul>
        <li>To respond to enquiries made via our contact forms, phone, or WhatsApp.</li>
        <li>To provide, invoice, and deliver the compliance or advisory services you engage us for.</li>
        <li>To verify GSTIN, PAN, CIN, DIN, or company-name details you submit through our free tools.</li>
        <li>To send service-related communication (filing reminders, compliance deadlines, engagement updates).</li>
        <li>To comply with our own legal, regulatory, and professional (ICAI) record-keeping obligations.</li>
        <li>With your explicit consent, to send newsletters or promotional updates — you may withdraw this consent at any time.</li>
      </ul>
      <p>We do not sell, rent, or trade your personal data to any third party for their marketing purposes.</p>

      <h2>4. Legal Basis &amp; Consent</h2>
      <p>
        We process your personal data on the basis of your consent (given when you submit a form,
        start a chat, or engage our services) or, where applicable, for a &ldquo;legitimate use&rdquo;
        recognised under Section 7 of the DPDP Act — such as when you have voluntarily provided your
        data for a specific purpose (e.g. a free GST verification lookup) and processing is limited to
        that purpose. Where we rely on consent, you may withdraw it at any time by writing to{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>, without affecting the lawfulness of
        processing carried out before withdrawal.
      </p>

      <h2>5. How We Share Your Data</h2>
      <p>We share personal data only in the following limited circumstances:</p>
      <ul>
        <li>
          <strong>Government and regulatory portals</strong> — when filing on your behalf (e.g. GST
          Network, Ministry of Corporate Affairs, Income Tax e-filing), as necessary to deliver the
          service you have engaged us for.
        </li>
        <li>
          <strong>Verified third-party API providers</strong> — our free verification tools query
          government-sourced data through licensed API partners (e.g. GSTIN/PAN/MCA verification
          providers). Your query is forwarded only to complete the specific lookup you requested.
        </li>
        <li>
          <strong>Service providers acting on our behalf</strong> — such as cloud hosting, email
          delivery, or payment processing providers, bound by confidentiality obligations.
        </li>
        <li><strong>Where required by law</strong> — to comply with a court order, regulatory directive, or statutory obligation.</li>
      </ul>
      <p>We do not transfer personal data outside India except where our hosting or API service providers process data on servers located outside India, in which case we take reasonable steps to ensure equivalent protection.</p>

      <h2>6. Data Retention</h2>
      <p>
        We retain client engagement records (documents, filings, correspondence) for as long as
        required under the Companies Act, 2013, Income Tax Act, 1961, and applicable ICAI
        record-keeping guidelines — generally a minimum of 8 years from the end of the relevant
        financial year, unless a longer period is legally mandated. Data submitted through free
        website tools (GST/PAN/company verification) is not retained once the result is returned to
        you, other than in anonymised, aggregated form for service-improvement purposes.
      </p>

      <h2>7. Your Rights as a Data Principal</h2>
      <p>Under the DPDP Act, you have the right to:</p>
      <ul>
        <li>Obtain a summary of the personal data we hold about you and the processing activities carried out.</li>
        <li>Request correction, completion, or updating of your personal data.</li>
        <li>Request erasure of personal data that is no longer necessary for the purpose it was collected, subject to our legal retention obligations.</li>
        <li>Withdraw consent at any time (see Section 4).</li>
        <li>Nominate another individual to exercise these rights on your behalf in the event of death or incapacity.</li>
        <li>Register a grievance with us, and if unresolved, with the Data Protection Board of India.</li>
      </ul>
      <p>To exercise any of these rights, write to us using the contact details in Section 10.</p>

      <h2>8. Security Measures</h2>
      <p>
        We use reasonable technical and organisational safeguards to protect personal data against
        unauthorised access, alteration, disclosure, or destruction — including access-controlled
        systems, encrypted transmission (HTTPS/TLS) for all data submitted through this website, and
        server-side handling of all API keys used by our verification tools so that credentials are
        never exposed to your browser. No system is completely secure, and we cannot guarantee
        absolute security of data transmitted over the internet.
      </p>

      <h2>9. Cookies</h2>
      <p>
        This website uses essential cookies required for the site to function and, where enabled,
        analytics cookies to understand aggregate visitor behaviour. We do not use cookies for
        cross-site advertising tracking. You can control or disable cookies through your browser
        settings; some site features may not function correctly if you do so.
      </p>

      <h2>10. Grievance Redressal &amp; Contact</h2>
      <p>
        For any question, concern, or grievance regarding this Privacy Policy or how your personal
        data is processed, please contact:
      </p>
      <p>
        <strong>CA Jatin Aggarwal</strong>, Principal Consultant<br />
        Email: <a href="mailto:jatin@companyavenueadvisory.com">jatin@companyavenueadvisory.com</a><br />
        General enquiries: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><br />
        Phone: <a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a><br />
        Address: {COMPANY.address}
      </p>
      <p>
        If you are not satisfied with our response, you may lodge a complaint with the{" "}
        <strong>Data Protection Board of India</strong> as constituted under the DPDP Act, 2023.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or
        applicable law. The &ldquo;Last updated&rdquo; date at the top of this page indicates when it
        was last revised. Material changes will be reflected on this page; we encourage you to review
        it periodically.
      </p>
    </LegalPageLayout>
  );
}
