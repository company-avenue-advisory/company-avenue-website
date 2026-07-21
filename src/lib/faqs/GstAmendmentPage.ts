// FAQ content for GstAmendmentPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What fields can be amended in GST registration?",
    a: "GST registration fields are classified as 'core' and 'non-core'. Non-core fields (email, phone, bank details, additional places of business within the same state) can be amended online without officer approval and take effect immediately. Core fields—legal name, principal place of business, addition or deletion of partners/directors, business constitution—require submission of REG-14, document upload, and officer approval within 15 working days."
  },
  {
    q: "What cannot be amended in GST registration?",
    a: "The PAN linked to a GST registration cannot be amended under any circumstances, as GSTIN is PAN-based. If PAN changes (e.g., proprietorship to company), a fresh GST registration is required. Similarly, the state of registration cannot be changed through amendment—inter-state migration requires a fresh registration in the new state and cancellation of the old one. Constitution of business (e.g., individual to HUF) also requires fresh registration."
  },
  {
    q: "How long does a GST amendment take?",
    a: "Non-core field amendments take effect immediately upon submission without requiring officer approval. Core field amendments are processed within 15 working days from the date of REG-14 filing. If the officer issues a clarification notice (REG-03), the 15-day clock restarts from the date you respond via REG-04. In practice, most amendments are approved within 7–10 working days in the absence of discrepancies."
  },
  {
    q: "Can I cancel my GST registration voluntarily?",
    a: "Yes. Any GST-registered taxpayer can apply for voluntary cancellation by filing REG-16 on the GST portal if they have discontinued business, transferred the business (merger, sale), or their turnover has permanently fallen below the registration threshold. However, before cancellation, all pending GSTR-1, GSTR-3B returns must be filed, all outstanding tax/interest paid, and GSTR-10 must be filed after the cancellation order."
  },
  {
    q: "What is the difference between GST suspension and cancellation?",
    a: "GST suspension is a temporary status where the GSTIN is blocked—usually triggered by non-filing of returns (GSTR-3B not filed for 6 consecutive months for monthly filers). During suspension, the taxpayer cannot make taxable supplies and buyers cannot claim ITC on purchases from the suspended GSTIN. Cancellation is a permanent removal of the GSTIN. Suspension can be reversed by filing pending returns; cancellation requires revocation (REG-21) within 30 days or a High Court order after 90 days."
  },
  {
    q: "What pending returns must be filed before cancellation?",
    a: "All GSTR-1 (outward supply details) and GSTR-3B (tax summary) returns must be filed up to the date of the cancellation application. If you are under the QRMP scheme, all quarterly returns and IFF entries must be current. The GST portal will not allow the cancellation application to be submitted if there are outstanding returns. Additionally, all tax, interest, and late fees must be cleared."
  },
  {
    q: "How can I revoke a GST cancellation?",
    a: "If your GST registration was cancelled by the tax officer (suo motu cancellation for non-compliance), you can apply for revocation within 30 days of the cancellation order using Form REG-21. The application must include a reason for revocation, compliance with pending returns, and payment of dues. After 30 days but within 90 days, revocation is allowed with the Additional Commissioner's approval. Beyond 90 days, a High Court writ petition (mandamus) is required."
  },
  {
    q: "What ITC must be reversed upon GST cancellation?",
    a: "At the time of cancellation, the taxpayer must reverse Input Tax Credit on: (1) stock of goods on hand as on the cancellation date (inputs in finished goods, semi-finished goods, raw materials); (2) capital goods on which ITC was claimed, proportionate to remaining useful life; and (3) any transitional credit claimed. The amount of ITC reversal is declared in GSTR-10 (final return). Failure to reverse leads to demand with interest and penalty."
  },
  {
    q: "What is GSTR-10 and when must it be filed?",
    a: "GSTR-10 is the Final Return that every cancelled GST taxpayer must file within 3 months of the date of the cancellation order (REG-19) or the effective date of cancellation, whichever is later. It contains details of closing stock (inputs, semi-finished and finished goods, capital goods), ITC reversed on such stock, and tax payable. Non-filing of GSTR-10 attracts a late fee of ₹200/day (₹100 CGST + ₹100 SGST) after the due date."
  },
  {
    q: "What is the difference between a GST inactive GSTIN and a cancelled GSTIN?",
    a: "An 'inactive' or 'suspended' GSTIN occurs when a taxpayer fails to file returns for a specified period—6 consecutive GSTR-3B months for monthly filers—and the portal auto-suspends the registration. The GSTIN still exists but is blocked. A 'cancelled' GSTIN is permanently removed from the GST system after REG-19 is issued. Buyers cannot claim ITC from either, but the consequences differ: suspension is reversible upon filing returns; cancellation requires formal revocation."
  },
  {
    q: "Can I add a new place of business through amendment?",
    a: "Yes. Adding an additional place of business (warehouse, branch, factory) within the same state as the principal place of business can be done through a non-core amendment (immediate effect). Adding a place of business in a different state requires a fresh GST registration in that state—multi-state businesses must maintain separate GSTINs for each state where they have operations, as GST is a state-level tax."
  },
  {
    q: "Will my existing GST certificates and ARNs remain valid after amendment?",
    a: "After a core field amendment is approved, the GST portal issues a fresh registration certificate reflecting the updated details. The GSTIN number itself does not change—only the details on the certificate are updated. All previously filed returns, challan payments, and ARNs remain valid and linked to the GSTIN. Your buyers' ITC already claimed using your old invoices remains valid."
  },
];
