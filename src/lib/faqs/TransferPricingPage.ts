// FAQ content for TransferPricingPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is transfer pricing and why does it matter?",
    a: "Transfer pricing refers to the prices charged for transactions between related parties (associated enterprises) across international borders. Indian tax law under Sections 92–92F requires these transactions to be at 'arm's length' — i.e., the same price that unrelated parties would agree to. This prevents profit shifting to low-tax jurisdictions. Non-compliance attracts significant penalties and can trigger prolonged tax scrutiny.",
  },
  {
    q: "Who needs to file Form 3CEB?",
    a: "Any person who has entered into international transactions with an associated enterprise (AE) where the aggregate transaction value is ₹1 crore or more in a financial year must get an accountant's report in Form 3CEB. Additionally, companies with specified domestic transactions (between domestic related parties) of ₹20 crore or more are also required to comply.",
  },
  {
    q: "What is the arm's length price?",
    a: "The arm's length price (ALP) is the price at which a transaction would occur between two unrelated parties acting independently in similar conditions. Under Indian TP regulations, the ALP is determined using one of five prescribed methods. If the actual transaction price deviates from the ALP, the difference is treated as a TP adjustment and taxed accordingly.",
  },
  {
    q: "Which TP method applies to my company?",
    a: "The choice of method depends on the nature of the transaction and the availability of comparable data. CUP (Comparable Uncontrolled Price) is preferred for commodity transactions. RPM (Resale Price Method) suits distribution arrangements. CPM (Cost Plus Method) fits manufacturing. TNMM (Transactional Net Margin Method) is widely used for services and complex transactions. PSM (Profit Split Method) applies where both parties make unique, valuable contributions.",
  },
  {
    q: "Can I get an Advance Pricing Agreement (APA)?",
    a: "Yes. The CBDT's APA program allows taxpayers to agree in advance on the ALP or the TP method for future international transactions. A Unilateral APA covers India's tax authority only; a Bilateral APA involves India and one treaty partner; a Multilateral APA covers multiple countries simultaneously. APAs provide certainty for up to 5 future years and can also cover 4 prior years through a rollback provision.",
  },
  {
    q: "What is Country-by-Country Reporting (CbCR)?",
    a: "CbCR is required for Indian constituent entities of multinational groups whose consolidated group revenue exceeds ₹5,500 crore (approximately EUR 750 million). They must file Form 3CEAA (master file) and 3CEAB (CbCR notification) with the Income Tax Department. CbCR provides tax authorities worldwide with a breakdown of profits, taxes paid, and economic activity across jurisdictions.",
  },
  {
    q: "What are the penalties for non-compliance with TP regulations?",
    a: "The penalties are significant. If the actual transaction price is not at arm's length and a TP adjustment is made, a penalty of 2% of the transaction value applies. If the TP documentation is incomplete or incorrect, the same 2% penalty applies. Additional interest on the tax shortfall and potential prosecution risk for wilful concealment make compliance essential.",
  },
  {
    q: "What is a Safe Harbour Rule in transfer pricing?",
    a: "The CBDT has notified Safe Harbour Rules under Rule 10TD for specific transaction categories — IT and ITES services, knowledge process outsourcing, intra-group loans, corporate guarantees, and certain auto-component transactions. If a taxpayer's margin falls within the safe harbour range, the tax department will not question the arm's length nature of the transaction, providing significant compliance relief.",
  },
  {
    q: "How is a 'related party' or 'associated enterprise' defined under Section 92A?",
    a: "Section 92A defines an associated enterprise broadly. Key triggers include: direct or indirect shareholding of 26% or more; board or management control; provision of more than 50% of the loan capital; exclusive supply arrangements; intellectual property dependence; and participation in the management, control, or capital of each other. The definition is wide enough to capture most group company relationships.",
  },
  {
    q: "Can a TP adjustment cause double taxation?",
    a: "Yes. If India makes a TP upward adjustment in your hands, the corresponding transaction in the other country may be taxed again, creating double taxation. Relief is available through the DTAA's Mutual Agreement Procedure (MAP), under which the competent authorities of both countries negotiate to eliminate double taxation. A Bilateral APA agreed in advance prevents this issue entirely.",
  },
];
