// FAQ content for AccountingBookkeepingPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  { q: "What accounting packages do you offer?", a: "We offer three tiers: Starter (up to 100 transactions/month), Growth (up to 500 transactions), and Enterprise (unlimited). Each includes bookkeeping, bank reconciliation, and monthly P&L. GST accounting and payroll are available as add-ons or included in higher tiers." },
  { q: "Which accounting software do you support?", a: "We work with TallyPrime, Zoho Books, QuickBooks, Busy, and Microsoft Excel. If you already use a particular software, we adapt to it. For new clients, we recommend Zoho Books or TallyPrime based on your business size and GST requirements." },
  { q: "How do I share documents securely?", a: "We use a secure client portal where you upload bank statements, invoices, and expense receipts. You can also share via Google Drive, Dropbox, or email with encrypted attachments. We never request documents over WhatsApp or unsecured channels." },
  { q: "How often will I receive reports?", a: "Monthly financial reports (P&L, Balance Sheet, Cash Flow) are delivered by the 5th of every month. For Growth and Enterprise plans, a real-time dashboard is also available. Custom MIS reports can be scheduled weekly if needed." },
  { q: "How do you ensure confidentiality of my financial data?", a: "All clients sign a strict Non-Disclosure Agreement (NDA). Data is stored on encrypted servers with role-based access controls. Our team members access only the data required for your specific account." },
  { q: "How is pricing determined?", a: "Pricing is based on your monthly transaction volume and required services. A 100-transaction starter plan begins at ₹2,499/month. We provide a transparent quote after a free assessment call — no hidden charges or surprise bills." },
  { q: "Can you handle accounting for multiple entities?", a: "Yes. We support multi-entity accounting for business groups. Each entity gets a separate set of books, and we can also prepare consolidated financial statements for group reporting." },
  { q: "Do you provide audit support?", a: "Yes. Our CA team provides complete statutory audit support, including preparation of audit schedules, coordination with your auditor, and post-audit adjustments." },
];
