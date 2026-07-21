// FAQ content for IECRegistrationPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  { q: "What is an Import Export Code (IEC)?", a: "IEC is a 10-digit business identification number issued by DGFT, Ministry of Commerce. It is mandatory for any person or business that imports or exports goods/services from India, and is linked to the PAN of the business or individual." },
  { q: "Is IEC registration mandatory?", a: "Yes — without a valid IEC, customs won&apos;t clear goods, banks won&apos;t process foreign trade remittances, and export schemes are inaccessible. Exemptions apply only to personal-use imports/exports and certain government entities." },
  { q: "Who issues the IEC?", a: "The Directorate General of Foreign Trade (DGFT), under the Ministry of Commerce and Industry, issues the IEC. Applications are filed online at dgft.gov.in." },
  { q: "How long does IEC registration take?", a: "Typically 2–5 working days after a complete application is submitted. Applications are filed within 1 business day of receiving all documents. Delays occur only from PAN, bank, or GST data mismatches." },
  { q: "Does the IEC expire?", a: "No — IEC is valid for lifetime with no annual renewal fee. However, holders must update their details (address, bank, GST) annually on the DGFT portal to keep the registration active." },
  { q: "Is GST registration mandatory for IEC?", a: "No. GST is not required to get an IEC, but if your business is GST-registered, link your GSTIN on the DGFT portal. Service exporters also need a GST LUT for zero-rated exports." },
  { q: "Can an individual (sole proprietor) apply for IEC?", a: "Yes. Sole proprietors can apply using their personal PAN and Aadhaar. IEC is issued in the firm's name. Proprietorships, partnerships, LLPs, and private limited companies are all eligible." },
  { q: "Can freelancers exporting services obtain IEC?", a: "Yes. Service exporters — freelancers, IT consultants, designers — should obtain IEC. Banks increasingly require it when processing foreign inward remittances classified as export of services under FEMA." },
  { q: "Can IEC be modified or updated later?", a: "Yes. IEC can be updated online anytime for business name, address, bank details, partner/director info, GSTIN, and activity type. Modification support is available at nominal charges." },
  { q: "What happens if I import or export without an IEC?", a: "It violates the Foreign Trade (Development and Regulation) Act, 1992. Consequences include customs seizure, inability to release shipments, denial of export incentives, bank refusal on remittances, and DGFT penalties." },
  { q: "Can IEC be surrendered or cancelled?", a: "Yes. If a business closes or stops trading, the holder can surrender the IEC to DGFT. DGFT can also cancel it for fraudulent registration or failure to update annual details." },
  { q: "Is a separate IEC required for each branch or state?", a: "No — one IEC covers all branches, factories, and offices of the same entity across India. One IEC per PAN is the rule, though each linked GSTIN may need separate registration on the DGFT portal." },
];
