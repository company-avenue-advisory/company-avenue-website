// FAQ content for LLPPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  { q: "What is an LLP?", a: "A Limited Liability Partnership is a legally recognised business structure under the LLP Act, 2008. It combines the flexibility of a partnership with the limited liability protection of a company. It is a separate legal entity with its own PAN, TAN and LLPIN." },
  { q: "How many partners are required?", a: "A minimum of 2 partners is required. There is no upper limit on the number of partners. At least 2 designated partners are required, and at least one must be a resident of India." },
  { q: "Can an LLP have foreign partners?", a: "Yes. Foreign nationals and NRIs can become partners in an Indian LLP, subject to FDI guidelines. Additional documents such as apostilled identification are required." },
  { q: "How long does LLP registration take?", a: "Typically 7–10 working days after all documents are submitted. The timeline depends on MCA processing speed and document accuracy." },
  { q: "Can the process be completed online?", a: "Yes, 100% online. Document upload, DSC issuance, name reservation, form filing and certificate delivery are all handled digitally. No government office visit required." },
  { q: "Is GST mandatory for an LLP?", a: "Not immediately. GST registration is required only if annual turnover exceeds ₹40 lakhs (goods) or ₹20 lakhs (services), or if you supply inter-state. We advise based on your business plan." },
  { q: "What is the difference between LLP and Partnership Firm?", a: "An LLP is a registered legal entity with limited liability, separate existence and annual compliance requirements. A traditional partnership firm offers no limited liability and partners are personally liable for all obligations." },
  { q: "Can LLP be converted into a Private Limited Company?", a: "Yes. An LLP can be converted to a Private Limited Company under Section 366 of the Companies Act, 2013. We handle the full conversion process." },
  { q: "Do LLPs require annual filing?", a: "Yes. LLPs must file Form 11 (Annual Return) and Form 8 (Statement of Accounts and Solvency) with MCA every year. Non-compliance attracts ₹100 per day penalty." },
  { q: "What are the compliance requirements?", a: "Annual filings include Form 11, Form 8, Income Tax Return and GST returns (if applicable). Additionally, partner changes require Form 4 filing with MCA." },
  { q: "What is LLPIN?", a: "LLPIN stands for Limited Liability Partnership Identification Number. It is a unique identification number issued to every registered LLP by the Ministry of Corporate Affairs — equivalent to CIN for companies." },
  { q: "How much does LLP Registration cost?", a: "Our fees start from ₹4,999 inclusive of government fees, DSC charges and professional fees. The final cost depends on the state of registration and additional services. We provide a full breakdown upfront." },
  { q: "Which structure is better for consultants?", a: "An LLP is generally better for consultants and professional service firms due to lower compliance burden, flexible management and no minimum capital requirement. However, if you plan to raise funding, a Private Limited Company is more appropriate." },
  { q: "Can an LLP raise investment?", a: "LLPs cannot issue equity shares or accept venture capital in the traditional sense. However, partners can bring in capital through profit-sharing arrangements. For equity investment, a Private Limited Company is the preferred structure." },
  { q: "Why choose Company Avenue?", a: "15+ years of experience, 1000+ businesses registered, dedicated CAs for every client, transparent fixed pricing, 100% digital process and lifetime compliance support — Company Avenue is your end-to-end business compliance partner." },
];
