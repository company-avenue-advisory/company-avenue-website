// FAQ content for LLPAnnualFilingPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What are Form 11 and Form 8 for LLPs?",
    a: "Form 11 is the Annual Return of LLP filed with MCA. It contains details of designated partners, total contribution, and business activities during the year. Form 8 is the Statement of Account and Solvency — it contains financial statements (P&L and Balance Sheet) and a solvency declaration by partners. Both must be filed each year within their respective due dates.",
  },
  {
    q: "How is LLP annual filing different from Pvt Ltd company filing?",
    a: "Private Limited companies file AOC-4 (financial statements), MGT-7 (annual return), and ADT-1 (auditor appointment) every year. LLPs file Form 8 and Form 11. LLP compliance is significantly simpler — no board meetings required, no MGT-14 for resolutions, no DPT-3 for deposits, and lower penalty structure. This is one of the key advantages of the LLP structure for small businesses.",
  },
  {
    q: "What are the due dates and penalties for LLP annual filing?",
    a: "Form 11 (Annual Return) is due by 30th May each year — 60 days after the end of the financial year (31 March). Form 8 (Statement of Account & Solvency) is due by 30th October each year. The penalty for late filing is ₹100 per day per form, with no upper cap. This means a 6-month delay accumulates ₹18,000 in penalties (₹9,000 per form), making timely compliance critical.",
  },
  {
    q: "What if the LLP has NIL turnover for the year?",
    a: "LLPs with zero turnover must still file both Form 11 and Form 8. There is no exemption under the LLP Act for NIL turnover or NIL activity. In fact, NIL turnover LLPs are among the most common filers in India — many startups and holding LLPs with no operations still file faithfully every year to keep their LLP active and clean on MCA records.",
  },
  {
    q: "What is the contribution statement in Form 8?",
    a: "The contribution statement in Form 8 discloses the capital contribution made by each designated partner and partner to the LLP as on 31st March. This is a mandatory disclosure. If the total contribution exceeds ₹25 lakh, the accounts must be audited by a Chartered Accountant before Form 8 can be signed and filed. This is the primary trigger for mandatory CA audit in LLPs.",
  },
  {
    q: "What are the obligations of a designated partner in LLP compliance?",
    a: "Designated partners (similar to directors in a company) are responsible for signing both Form 8 and Form 11 on MCA portal using their DPIN. They are personally liable for any non-compliance under Section 69 of the LLP Act. This means they can face personal prosecution for late filing — making it critical for designated partners to ensure timely filing every year.",
  },
  {
    q: "Is a CA audit mandatory for LLPs?",
    a: "Statutory audit by a CA is mandatory for LLPs only when: (1) annual turnover exceeds ₹40 lakh, or (2) total partner contribution exceeds ₹25 lakh. Below these thresholds, LLPs can file accounts certified by designated partners without a CA audit. However, having a CA review the accounts is recommended for accuracy even below the mandatory audit threshold.",
  },
  {
    q: "Is LLP compliance cheaper than Pvt Ltd company compliance?",
    a: "Yes — significantly. LLP compliance (Form 8 + Form 11) is simpler and less expensive than Pvt Ltd compliance (AOC-4 + MGT-7 + board meetings + auditor appointment + DIR-3 KYC for directors + DPT-3 if deposits). LLPs don't need to hold board meetings, pass board resolutions, or maintain minutes books. This lower compliance cost is a major advantage for small businesses and professionals choosing the LLP structure.",
  },
  {
    q: "Can the LLP file after the due date — and what does it cost?",
    a: "Yes, late filing is permitted with a ₹100 per day additional fee per form (on top of regular government fees). Since there is no maximum cap on the penalty, long delays become very expensive. For example, filing Form 8 one year late means ₹36,500 in late fees for that single form alone. We strongly advise filing on time — our package covers deadline-driven filing to avoid all penalties.",
  },
  {
    q: "What happens if a designated partner's DPIN becomes inactive?",
    a: "If a designated partner's DPIN is deactivated (due to missing DIR-3 KYC), they cannot sign or submit any MCA form. This effectively blocks the LLP from filing Form 8, Form 11, or any other e-form until the DPIN is restored. To reactivate, the partner must complete DIR-3 KYC (with ₹5,000 fee if filing after September 30). This is why we check DPIN status before initiating every LLP filing.",
  },
  {
    q: "What documents are required for LLP annual filing?",
    a: "You need the annual accounts (P&L and Balance Sheet as on 31 March), details of all designated partners with their DPIN, the original LLP Agreement with profit-sharing ratios, bank statements for the full financial year, individual partner contribution amounts, and the LLP Incorporation Certificate. For LLPs requiring audit, a CA-certified audit report is also needed before Form 8 can be filed.",
  },
];
