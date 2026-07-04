import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Our refund and cancellation policy for compliance packages, retainers, and one-off filing services.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title="Refund Policy"
      lastUpdated="4 July 2026"
      intro="Because our services involve professional advisory work and statutory filings with government portals, refunds are handled differently at different stages of an engagement. This page explains exactly how."
    >
      <h2>1. General Principle</h2>
      <p>
        Company Avenue Advisory Private Limited provides professional chartered accountancy, company
        secretarial, and compliance advisory services. Because these services involve professional
        time, and in many cases irreversible submissions to government portals (MCA, GST Network,
        Income Tax e-filing), refunds are assessed based on the stage of work completed at the time of
        a cancellation request — not offered as a blanket right, consistent with standard practice for
        professional services under the Consumer Protection Act, 2019 and its e-commerce rules.
      </p>

      <h2>2. Before Work Has Commenced</h2>
      <p>
        If you cancel an engagement <strong>before we have begun any work</strong> — i.e. before
        document review, drafting, or any government portal submission has started — you are entitled
        to a full refund of any advance paid, less any payment-gateway transaction charges actually
        incurred, processed within 7–10 business days of the cancellation request.
      </p>

      <h2>3. After Work Has Commenced, Before Filing/Submission</h2>
      <p>
        If work has commenced (document review, drafting, preparation of filings) but no submission
        has yet been made to a government portal, a <strong>partial refund</strong> may be issued at
        our discretion, after deducting professional fees for work already performed, calculated on a
        pro-rata or time-spent basis as applicable to your specific package.
      </p>

      <h2>4. After Government Filing or Submission</h2>
      <p>
        Once a filing, application, or submission has been made to any government authority or portal
        on your behalf (including but not limited to the MCA, GST Network, Income Tax Department, or
        any Registrar of Companies), <strong>no refund is possible</strong> for that specific filing.
        Government/statutory fees paid to a third-party portal are non-refundable by their nature and
        are never refunded by us, regardless of the outcome of your application.
      </p>

      <h2>5. Monthly Retainers &amp; Ongoing Packages</h2>
      <p>
        For monthly compliance retainers (Startup Compliance Pack, SME Monthly Retainer, Growth
        Advisory Pack), fees are billed for the calendar month of service and are{" "}
        <strong>non-refundable for the current billing month</strong> once that month has begun,
        since our team allocates dedicated capacity for your account from day one. You may cancel a
        retainer for future months at any time by providing written notice at least 15 days before the
        next billing cycle; no further charges will apply after the current paid month ends.
      </p>

      <h2>6. Annual Packages</h2>
      <p>
        Where you have opted for annual billing (to avail the advertised annual discount), and choose
        to discontinue partway through the year, we will refund the unused portion of the annual fee,
        calculated as: <em>(remaining full months of service) × (the equivalent standard monthly
        rate, not the discounted annual rate)</em> — since the discount was conditional on completing
        the full annual term. Any government/statutory filings already completed during the year are
        deducted at actuals as per Section 4.
      </p>

      <h2>7. Service Delays or Errors on Our Part</h2>
      <p>
        If a delay or error is directly attributable to our team — and not to delays in documents or
        information you were required to provide, or to government portal downtime/processing delays
        outside our control — we will, at your option, either re-perform the affected work at no
        additional cost or issue a partial refund proportionate to the affected component of the
        engagement. Please raise any such concern in writing within 15 days of the issue arising.
      </p>

      <h2>8. How to Request a Refund</h2>
      <p>To request a refund or cancellation, write to us with your engagement/invoice reference at:</p>
      <p>
        Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><br />
        Phone/WhatsApp: <a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a>
      </p>
      <p>
        We will acknowledge your request within 2 business days and communicate the outcome, including
        the refund amount (if any) and expected processing timeline, within 7 business days of
        acknowledgement. Approved refunds are processed to the original mode of payment within
        7–10 business days.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Refund Policy from time to time. The version in force at the time you make
        payment for a service will govern that specific engagement, unless a superseding written
        agreement states otherwise.
      </p>
    </LegalPageLayout>
  );
}
