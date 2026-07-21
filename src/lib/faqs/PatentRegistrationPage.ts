// FAQ content for PatentRegistrationPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What can be patented in India?",
    a: "To qualify for patent protection under the Patents Act 1970, an invention must satisfy three criteria: (1) Novelty — the invention must be new and not disclosed in prior art anywhere in the world; (2) Inventive Step — it must be non-obvious to a person skilled in the relevant field; and (3) Industrial Applicability — it must be capable of being made or used in some kind of industry. The invention must be a product or process, and must not fall under the excluded categories under Section 3 of the Patents Act."
  },
  {
    q: "What cannot be patented in India?",
    a: "Section 3 of the Patents Act 1970 lists several non-patentable inventions in India, including: abstract ideas or theories; mathematical or business methods; algorithms or computer programs per se; literary, dramatic, musical or artistic works; mere discoveries of scientific principles or natural phenomena; methods of medical treatment or surgery on humans or animals; plants and animals (other than microorganisms); traditional knowledge; and inventions whose primary use would be contrary to natural laws. Importantly, software can be patented if it produces a 'technical effect' beyond the normal physical interactions between a program and the computer."
  },
  {
    q: "What is the difference between a provisional and complete patent specification?",
    a: "A provisional specification is a preliminary document that describes the invention in general terms without detailed claims. Filing a provisional secures your priority date — the date from which your invention's novelty is measured — and gives you 12 months to file the complete specification. This is useful when the invention is still being developed. A complete specification contains the full detailed description, drawings, abstract, and most importantly the claims — the legal definition of what is protected. You can also file a complete specification directly without a provisional."
  },
  {
    q: "What is a PCT application and how does it help?",
    a: "A Patent Cooperation Treaty (PCT) application is an international patent filing mechanism administered by WIPO that allows you to seek patent protection in over 150 member countries with a single application filed in one language. You file one PCT application within 12 months of your Indian priority date, and then 'enter national phase' in each desired country within 30 months of priority. This gives you time to assess commercial viability before investing in country-by-country patent prosecution costs. PCT does not result in an 'international patent' — each country grants its own patent — but it significantly simplifies the process."
  },
  {
    q: "How long does it take to get a patent grant in India?",
    a: "The typical timeline from filing to grant in India is 3 to 5 years, though this can vary based on the technology area, the nature of examination objections, and the applicant's response time. The application is automatically published 18 months from filing. You must file a Request for Examination (Form 18) within 48 months. After examination, a First Examination Report is typically issued within 1–3 years of the exam request. Responding to the FER and resolving all objections can take additional time. An expedited examination route exists for startups and specific categories."
  },
  {
    q: "Are patent maintenance fees required after grant?",
    a: "Yes. After a patent is granted in India, annual renewal fees must be paid to keep it in force. Renewal fees are payable from the 3rd year of the application date (not the grant date), and they escalate progressively each year. The fee is paid using Form 4 and can be paid in advance for up to 10 years at a time. If renewal fees are not paid on time, the patent lapses — though it can be restored within 18 months of lapse by paying restoration fees with a proper explanation. Company Avenue manages renewal reminders proactively."
  },
  {
    q: "What are the remedies for patent infringement in India?",
    a: "Patent infringement in India can be addressed through both civil and criminal routes. Civilly, a patent holder can file a suit in the District Court or High Court seeking: a permanent injunction restraining the infringer; recovery of damages or account of profits; seizure and destruction of infringing goods; and delivery-up of infringing articles. Criminal liability under Section 118 of the Patents Act applies to false representation of patent status. Additionally, the patent holder can send a cease and desist notice before initiating formal proceedings."
  },
  {
    q: "What is the working of patent requirement in India?",
    a: "Under Section 146 of the Patents Act, every patent holder and exclusive licensee must file a statement of working (Form 27) every financial year within three months of the end of that year. The statement discloses whether the patented invention is being worked commercially in India, the approximate value of working, and whether public requirement is being met adequately. If a patent is not being worked in India, the government can grant a compulsory license to third parties to manufacture and sell the patented product in the public interest."
  },
  {
    q: "What is patent pooling and cross-licensing?",
    a: "Patent pooling is an arrangement where two or more companies agree to share their patents with each other, often forming a pool that multiple licensees can access under defined terms. Cross-licensing is a bilateral agreement where companies exchange licenses to each other's patents — often used to avoid litigation when both parties hold blocking patents. These arrangements are common in technology-heavy industries like semiconductors, telecommunications, and pharmaceuticals, and can generate significant revenue while reducing litigation risk."
  },
  {
    q: "Do individuals and startups get a fee concession for patent filing in India?",
    a: "Yes, significantly. The Indian Patent Office provides an 80% discount on official patent fees for individuals, DPIIT-recognised startups, and MSMEs. For example, the basic filing fee for a complete specification (up to 30 pages and 10 claims) is ₹8,000 for companies but only ₹1,600 for individuals, startups, and small entities. This concession applies to filing fees, examination fees, renewal fees, and most other official fees throughout the patent prosecution process. To avail this benefit, applicants must file a self-declaration or relevant certificate of eligibility."
  },
];
