// FAQ content for CompanyNameChangePage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is the RUN service and why is it needed for a name change?",
    a: "RUN (Reserve Unique Name) is an MCA web service that allows companies to check and reserve a new company name before filing the formal name change application. It is required before filing INC-24 to ensure the proposed new name is not already taken by another registered company or closely resembles an existing trademark. The RUN approval is typically valid for 20 days and must be used within that period to file INC-24.",
  },
  {
    q: "What is Form INC-24 and who must sign it?",
    a: "Form INC-24 is the application form filed with the Registrar of Companies for approval of a company name change under Section 13(2) of the Companies Act, 2013. It must be signed digitally by a director of the company using a valid DSC (Digital Signature Certificate). The form requires attachment of the MGT-14 SRN (proving the Special Resolution was filed), the EGM minutes, RUN approval, and any other documents specified by the RoC.",
  },
  {
    q: "How long does the company name change process take?",
    a: "The company name change process typically takes 15 to 25 business days from the date of EGM, subject to timely filing of MGT-14 and INC-24 and absence of RoC queries. The timeline includes: obtaining RUN approval (3-5 days), conducting the EGM (21-day notice period), filing MGT-14 (within 30 days of EGM), filing INC-24, and RoC processing time (5-10 days). Delays can occur if the RoC raises queries or requires additional documentation.",
  },
  {
    q: "What happens to existing contracts, licenses, and registrations after a name change?",
    a: "After the name change, all existing contracts, licenses, and registrations remain valid under the new company name. However, the company must proactively update its name in all regulatory records including PAN (with NSDL/Income Tax Department), GST registration (via GST portal amendment), bank accounts (all branches), MSME Udyam registration, IEC (Importer Exporter Code), trademark registrations, and any state-specific licenses like Shop Act, FSSAI, and Professional Tax. Updated letterheads, rubber stamps, signboards, and website must also reflect the new name.",
  },
  {
    q: "Can the Registrar reject a proposed company name?",
    a: "Yes. The Registrar of Companies can reject a proposed name if it is: (1) identical or too similar to an existing registered company&apos;s name; (2) identical to a trademark registered under the Trade Marks Act; (3) deemed undesirable under the Companies Act guidelines; (4) contains restricted words like Bank, Insurance, Stock Exchange, Reserve Bank, without appropriate central government approval; or (5) suggests association with the government or foreign government without permission. It is advisable to check name availability thoroughly before filing to avoid rejection.",
  },
  {
    q: "Is a Special Resolution mandatory for changing the company name?",
    a: "Yes. Under Section 13(1) of the Companies Act, 2013, changing a company&apos;s name requires passing a Special Resolution — a resolution that receives at least three-fourths (75%) of the votes cast by members voting in person or by proxy at a duly convened EGM. The resolution and its passing must be notified to the RoC via Form MGT-14 within 30 days. An ordinary resolution is not sufficient for a name change.",
  },
  {
    q: "Does the company&apos;s CIN change after a name change?",
    a: "No. The Corporate Identity Number (CIN) of the company does not change when the company name is changed. The CIN is unique to the company and is retained throughout its existence. What changes is the company name prefix in the CIN. For example, if the company was previously U67100MH2010PTC123456 under the old name, the new CIN will reflect the new name but retain the same numeric code. The fresh Certificate of Incorporation issued shows the updated name with the same CIN.",
  },
  {
    q: "What is the post-name-change compliance checklist?",
    a: "After receiving the fresh Certificate of Incorporation in the new name, the company must: (1) Update PAN with Income Tax Department (file Form 49A/49AA amendment); (2) Amend GST registration on the GST portal; (3) Update all bank accounts with the new name and provide the fresh CoI; (4) Update trademark registrations (file TM-P form); (5) Update IEC certificate; (6) Update MSME Udyam certificate; (7) Reprint letterheads, rubber stamps, and boards; (8) Update all signed contracts (addendum or novation); (9) Inform all customers, vendors, and counterparties; (10) Update the company website and all digital assets.",
  },
  {
    q: "What if the proposed new name is identical to a trademark?",
    a: "If the proposed new company name is identical or deceptively similar to a trademark registered under the Trade Marks Act, the RoC will reject the name during RUN or INC-24 review. Additionally, the trademark owner can file an objection. To avoid this, conduct a thorough trademark search on the IP India portal before proposing a new name. If you are the trademark owner yourself, provide proof of trademark ownership during the INC-24 filing to preempt objections.",
  },
];
