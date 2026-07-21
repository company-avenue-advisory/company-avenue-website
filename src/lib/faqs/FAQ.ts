// FAQ content for FAQ.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "How long does Company Registration take?",
    a: "A Private Limited Company is typically incorporated in 7–10 business days after all documents are submitted. This includes DIN/DSC issuance, name approval and Certificate of Incorporation from the MCA.",
  },
  {
    q: "Which business structure should I choose?",
    a: "It depends on your business goals. A Pvt. Ltd. is ideal for startups seeking investment. An LLP works well for professional firms and service businesses. A Sole Proprietorship suits solo operators with lower compliance needs. We guide you through this during your free consultation.",
  },
  {
    q: "Is GST registration mandatory?",
    a: "GST is mandatory if your annual turnover exceeds ₹40 lakhs (goods) or ₹20 lakhs (services). Inter-state suppliers and all e-commerce sellers must register regardless of turnover. Voluntary registration is also available and often beneficial.",
  },
  {
    q: "How much does Trademark Registration cost?",
    a: "Government fees start at ₹4,500 per class for individuals, startups and MSMEs and ₹9,000 per class for others. Our professional fees are transparent and provided upfront. We handle end-to-end filing, examination response and follow-up.",
  },
  {
    q: "Can the complete registration process be done online?",
    a: "Yes, 100%. Our process is fully digital — document collection, verification, application filing and certificate delivery are all done online. You never need to visit any government office or our office.",
  },
  {
    q: "Do you provide annual compliance services after registration?",
    a: "Absolutely. We offer annual compliance packages covering ROC filings, ITR, GST returns, TDS returns and more. Your dedicated relationship manager proactively reminds you of all statutory deadlines.",
  },
];
