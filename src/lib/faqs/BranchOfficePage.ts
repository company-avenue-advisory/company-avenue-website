// FAQ content for BranchOfficePage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  { q: "What is the difference between Branch Office and Liaison Office?", a: "A Branch Office can earn revenue from Indian customers and carry out most business activities of the parent. A Liaison Office can only do promotion, communication, and liaison activities — it cannot earn any income in India. Both require prior RBI approval via Form FNC." },
  { q: "Can a Branch Office manufacture goods in India?", a: "No. A Branch Office cannot undertake manufacturing or processing activities in India. It can conduct trading, professional/consultancy services, research, or export promotion. For manufacturing, a Subsidiary (Pvt Ltd) is the appropriate structure." },
  { q: "What is the profitability requirement for a Branch Office?", a: "The foreign parent must have a profit-making track record for the immediately preceding 5 years. The net worth must also be at least USD 100,000 or its equivalent. This is verified from audited financial statements." },
  { q: "How is a Project Office different?", a: "A Project Office is specifically for executing a contract secured from an Indian company. RBI allows automatic approval for project offices where the project is funded by inward remittance, or where an Indian company gives the contract and no outward remittance is required during the project period." },
  { q: "What annual filings are required for a Branch/LO?", a: "Every Branch/LO must file: (1) Annual Activity Certificate (AAC) from a CA certifying all activities were within RBI-permitted scope; (2) Form FLA (Foreign Liabilities and Assets) with RBI by July 15 each year; (3) ROC annual return under Section 380–386 of Companies Act 2013." },
  { q: "Can a Liaison Office be converted to a Branch Office?", a: "Yes, with prior RBI approval. The conversion application must demonstrate that the foreign company now meets the profitability and net worth requirements for a Branch Office, and the business scope needs to be expanded from liaison to earning activities." },
];
