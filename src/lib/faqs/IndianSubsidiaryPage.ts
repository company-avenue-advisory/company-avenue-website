// FAQ content for IndianSubsidiaryPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  { q: "Which sectors require prior RBI/Govt approval for FDI?", a: "Sectors like defence (beyond 74%), banking (private sector beyond 49%), media, pharmaceuticals (brownfield beyond 74%), and certain others require approval. Most sectors including IT, manufacturing, e-commerce (B2B), and hospitality allow 100% FDI under the automatic route." },
  { q: "Is an Indian resident director mandatory?", a: "Yes. Under Section 149(3) of the Companies Act 2013, every company must have at least one director who has stayed in India for at least 182 days during the previous calendar year." },
  { q: "What is Form FCGPR and when must it be filed?", a: "Form FCGPR (Foreign Currency – Gross Provisional Return) is filed on RBI's FIRMS portal to report FDI received. It must be filed within 30 days of receiving the share capital remittance from the foreign parent." },
  { q: "Can the Indian subsidiary repatriate profits to the parent?", a: "Yes. Dividends can be freely repatriated after payment of Dividend Distribution Tax (DDT). Royalties, technical service fees, and management fees can also be remitted subject to FEMA/DTAA provisions." },
  { q: "What is the minimum capital requirement?", a: "There is no prescribed minimum paid-up capital under the Companies Act 2013. However, the foreign parent must remit the agreed share capital in foreign currency, which triggers the FCGPR filing with RBI." },
  { q: "How long does the entire process take?", a: "MCA incorporation typically takes 10–15 working days after all apostilled documents are ready. The FCGPR filing must follow within 30 days of capital receipt. Allow 4–6 weeks total from document collection to a fully operational subsidiary." },
];
