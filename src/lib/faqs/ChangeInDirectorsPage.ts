// FAQ content for ChangeInDirectorsPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is the timeline for filing DIR-12 after board resolution?",
    a: "DIR-12 must be filed with the MCA within 30 days of the board resolution appointing or removing a director. If a new director is appointed, the filing clock starts from the date of the board resolution, not the date of consent. Filing beyond 30 days attracts a late fee of ₹500 per day for each day of default.",
  },
  {
    q: "What is the penalty for delayed DIR-12 filing?",
    a: "The penalty for late DIR-12 filing is ₹500 per day for each day of default, payable by the company and every officer in default. Under the Companies (Amendment) Act, 2019, the MCA also adjudicates officers for non-compliance. Prompt filing eliminates all additional costs.",
  },
  {
    q: "What documents are needed for appointing a new director?",
    a: "Key documents include: valid DIN (or proof of DIN application), PAN card, Aadhaar card, DIR-2 (Consent to Act as Director — signed and notarized), residential proof not older than 2 months, and a declaration that the director is not disqualified under Section 164 of the Companies Act, 2013.",
  },
  {
    q: "Can a foreign national become a director of an Indian company?",
    a: "Yes, foreign nationals can be appointed as directors of Indian private limited companies. They must obtain a Director Identification Number (DIN). Aadhaar is not required for foreign directors. Documents such as passport (apostilled or notarized) and proof of address are submitted. At least one director must be an Indian resident (person who has stayed in India for at least 182 days in the previous calendar year).",
  },
  {
    q: "What is the minimum director requirement for a Pvt. Ltd. company?",
    a: "A Private Limited Company must have a minimum of 2 directors and a maximum of 15 directors at all times. At least 1 director must be a resident director — i.e., a person who has stayed in India for a total of at least 182 days during the previous calendar year. If a company falls below 2 directors, it must appoint a new director immediately.",
  },
  {
    q: "What is the process for removing a director?",
    a: "A director cannot be removed by the board alone. The process under Section 169 requires: (1) Special notice of 14 days to the company from a shareholder proposing removal, (2) the company gives a copy to the director being removed, (3) the director may make written representation, (4) an ordinary resolution is passed at the general meeting. DIR-12 is then filed within 30 days of the resolution.",
  },
  {
    q: "What is the stamp duty on share transfer?",
    a: "Stamp duty on share transfer varies by state. At the central level under the Indian Stamp Act as amended in 2020, the rate is 0.015% of the consideration value for demat shares. For physical shares, the rate is typically 0.25% of the consideration. Maharashtra, Delhi, and other states may have slightly different rules. Stamp duty must be paid on the Share Transfer Deed (SH-4) before filing.",
  },
  {
    q: "How does ESOP allotment work under PAS-3?",
    a: "When employees exercise ESOP options: (1) the board approves an ESOP scheme at a general meeting; (2) employees vest and exercise their options; (3) the board passes an allotment resolution for each exercise; (4) PAS-3 (Return of Allotment) is filed with MCA within 30 days of each allotment board resolution. The form includes allottee details, number of shares, and face/premium value.",
  },
  {
    q: "What is Form PAS-3?",
    a: "Form PAS-3 is the Return of Allotment of Securities, filed under Section 39(4) of the Companies Act, 2013. It must be filed within 30 days of any allotment of shares or other securities. It includes details of allottees, class of shares, face value, premium, and consideration. Late filing attracts additional fees up to 12 times the normal ROC fee.",
  },
  {
    q: "What shareholder approval is needed for share allotment?",
    a: "It depends on the type of allotment: (1) Preferential allotment to specific persons requires a special resolution at an Extra-ordinary General Meeting (EGM) — requires 75% shareholder approval; (2) Rights Issue to existing shareholders in proportion to their holding needs only a board resolution; (3) ESOP allotment requires shareholder approval for the ESOP scheme, though individual allotments are by board resolution. Bonus shares also need shareholder approval.",
  },
];
