// FAQ content for LMPCRegistrationPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is LMPC registration and which law governs it?",
    a: "LMPC stands for Legal Metrology Packaged Commodities. It is a registration/license issued under the Legal Metrology Act, 2009 and the Legal Metrology (Packaged Commodities) Rules, 2011. The registration is mandatory for any person who imports pre-packaged commodities into India or who re-packs commodities into smaller packages for retail sale. The purpose is to ensure that all packaged goods sold in India carry mandatory label declarations including net quantity, MRP (inclusive of all taxes), manufacturing / expiry date, manufacturer / packer name and address, and country of origin.",
  },
  {
    q: "Who is mandated to obtain LMPC registration?",
    a: "Under Rule 27 of the Legal Metrology (Packaged Commodities) Rules, 2011, the following must obtain LMPC registration: (1) every importer of pre-packaged commodities — this includes anyone importing goods for sale under their brand name or as a distributor; (2) every packer who packs commodities in packages for retail sale; (3) every re-packer who repacks bulk commodities into smaller consumer packages. Manufacturers who pack their own goods at their own factory are generally not required to separately register under LMPC (they are covered by production-related rules) unless they also import.",
  },
  {
    q: "What mandatory information must appear on every imported product&apos;s label?",
    a: "Under the Legal Metrology (Packaged Commodities) Rules, every retail package of an imported commodity must display: (1) Name and address of the importer in India; (2) Common name or generic name of the commodity; (3) Net quantity in standard units (grams, kg, liters, ml, meters); (4) Month and year of import / manufacture / expiry (as applicable); (5) Maximum Retail Price (MRP) inclusive of all taxes; (6) Country of origin; (7) Name and address of the original manufacturer abroad; (8) Customer care number or email. Labels must be in English or Hindi. Non-compliance attracts penalties under Section 36 of the Legal Metrology Act.",
  },
  {
    q: "Why is LMPC registration required for Amazon and Flipkart?",
    a: "Amazon India and Flipkart require import vendors to submit their LMPC registration certificate as part of their vendor compliance requirements. This is because the e-commerce platforms are themselves subject to enforcement under the Legal Metrology Act if they facilitate sale of products that do not comply with mandatory labelling requirements. Both platforms have built LMPC verification into their vendor onboarding and periodic compliance checks. Import vendors without a valid LMPC registration certificate face account suspension and cannot list imported products on these marketplaces.",
  },
  {
    q: "What are the penalties for not having LMPC registration?",
    a: "Section 36 of the Legal Metrology Act, 2009 prescribes penalties for importing or packing commodities without registration. The penalty for the first offence is a fine which may extend to ₹25,000. For a subsequent offence, the penalty can extend to ₹50,000 or imprisonment up to one year, or both. Additionally, Legal Metrology officers can seize and confiscate non-compliant goods at ports, warehouses, or retail locations. For e-commerce sellers, non-compliance also results in marketplace account suspension, which is a significant business disruption.",
  },
  {
    q: "How long is the LMPC registration valid and does it need renewal?",
    a: "LMPC registration is typically valid for 5 years from the date of issuance and must be renewed before expiry. The renewal application must be filed with the Controller of Legal Metrology in the respective state before the expiry date. Some states issue registrations valid for 1-3 years depending on their state-specific rules. It is important to track the expiry date and renew in time as selling with an expired LMPC registration is equivalent to selling without registration and attracts the same penalties.",
  },
  {
    q: "Does LMPC registration need to be obtained separately for each state?",
    a: "The need for state-wise LMPC registration depends on where the import/packing activities are conducted. Typically, the LMPC registration is obtained in the state where the principal place of business or import clearance facility is registered. If you have packing operations in multiple states, you may need separate registrations in each state. For e-commerce sellers who import goods centrally from one location and sell pan-India through marketplaces, a single state registration (where the warehouse / clearance is done) typically suffices, though this should be confirmed with the respective Legal Metrology authority.",
  },
  {
    q: "Can MRP be declared on products after import or must it be pre-printed?",
    a: "The MRP and other mandatory label information can be declared through a sticker affixed on the product after import but before sale. This is specifically allowed for imported goods where the original foreign packaging may not contain India-specific information. The sticker must contain all mandatory information as per the Legal Metrology Rules and must be firmly affixed in a manner that it cannot be easily removed. LMPC-registered importers can carry out this stickering/relabelling at their Indian warehouse. The sticker must not cover any mandatory information already on the original packaging.",
  },
];
