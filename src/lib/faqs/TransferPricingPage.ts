// FAQ content for TransferPricingPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is transfer pricing and why does it matter?",
    a: "Transfer pricing is about the prices related parties (associated enterprises) charge each other across borders. Indian tax law under Sections 92–92F says these prices must be at 'arm's length'. That means the same price unrelated parties would agree on. This stops profits being shifted to low-tax countries. Not complying can bring heavy penalties and long tax scrutiny.",
  },
  {
    q: "Who needs to file Form 3CEB?",
    a: "You need an accountant's report in Form 3CEB if your international transactions with an associated enterprise (AE) total ₹1 crore or more in a financial year. Companies must also comply if their specified domestic transactions with related parties in India are ₹20 crore or more.",
  },
  {
    q: "What is the arm's length price?",
    a: "The arm's length price (ALP) is the price two unrelated parties would agree on in similar conditions. Indian TP rules set out five methods to work out the ALP. If your actual price is different from the ALP, the gap is treated as a TP adjustment and taxed.",
  },
  {
    q: "Which TP method applies to my company?",
    a: "The choice of method depends on the nature of the transaction and the availability of comparable data. CUP (Comparable Uncontrolled Price) is preferred for commodity transactions. RPM (Resale Price Method) suits distribution arrangements. CPM (Cost Plus Method) fits manufacturing. TNMM (Transactional Net Margin Method) is widely used for services and complex transactions. PSM (Profit Split Method) applies where both parties make unique, valuable contributions.",
  },
  {
    q: "Can I get an Advance Pricing Agreement (APA)?",
    a: "Yes. Under the CBDT's APA program, you can agree the ALP or the TP method in advance for future international transactions. A Unilateral APA covers only India's tax authority. A Bilateral APA covers India and one treaty partner. A Multilateral APA covers several countries at once. An APA gives certainty for up to 5 future years. A rollback can also cover 4 past years.",
  },
  {
    q: "What is Country-by-Country Reporting (CbCR)?",
    a: "CbCR applies to Indian entities of multinational groups whose total group revenue is above ₹5,500 crore (about EUR 750 million). They must file Form 3CEAA (master file) and 3CEAB (CbCR notification) with the Income Tax Department. CbCR shows tax authorities around the world how profits, taxes paid and business activity are split across countries.",
  },
  {
    q: "What are the penalties for non-compliance with TP regulations?",
    a: "The penalties are heavy. If your price is not at arm's length and a TP adjustment is made, a penalty of 2% of the transaction value applies. The same 2% penalty applies if your TP documents are incomplete or wrong. You also pay interest on the tax shortfall. Wilful concealment can lead to prosecution.",
  },
  {
    q: "What is a Safe Harbour Rule in transfer pricing?",
    a: "The CBDT has notified Safe Harbour Rules under Rule 10TD for some types of transactions. These include IT and ITES services, knowledge process outsourcing, loans within a group, corporate guarantees and some auto-component deals. If your margin is within the safe harbour range, the tax department will not question whether the price is at arm's length. This gives you real relief on compliance.",
  },
  {
    q: "How is a 'related party' or 'associated enterprise' defined under Section 92A?",
    a: "Section 92A gives a wide meaning to associated enterprise. The main triggers are: a direct or indirect shareholding of 26% or more; control of the board or management; lending more than 50% of the loan capital; exclusive supply deals; dependence on intellectual property; and taking part in each other's management, control or capital. Most group company relationships fall within it.",
  },
  {
    q: "Can a TP adjustment cause double taxation?",
    a: "Yes. If India makes an upward TP adjustment, the same transaction may be taxed again in the other country. That is double taxation. You can get relief through the DTAA's Mutual Agreement Procedure (MAP). Under MAP, the tax authorities of both countries negotiate to remove the double tax. A Bilateral APA agreed in advance avoids the problem completely.",
  },
];
