// FAQ content for LMPCRegistrationPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is LMPC registration and which law governs it?",
    a: "LMPC stands for Legal Metrology Packaged Commodities. It is a registration issued under the Legal Metrology Act, 2009 and the Legal Metrology (Packaged Commodities) Rules, 2011. You must have it if you import pre-packaged goods into India, or re-pack goods into smaller packs for retail sale. It makes sure every packaged product sold in India shows the required label details. These include net quantity, MRP (inclusive of all taxes), manufacturing or expiry date, maker or packer name and address, and country of origin.",
  },
  {
    q: "Who is mandated to obtain LMPC registration?",
    a: "Under Rule 27 of the Legal Metrology (Packaged Commodities) Rules, 2011, these must get LMPC registration: (1) every importer of pre-packaged goods, including anyone importing to sell under their brand or as a distributor; (2) every packer who packs goods for retail sale; (3) every re-packer who repacks bulk goods into smaller consumer packs. Manufacturers who pack their own goods at their own factory usually do not need a separate LMPC registration, as production rules cover them. This changes if they also import.",
  },
  {
    q: "What mandatory information must appear on every imported product&apos;s label?",
    a: "Under the Legal Metrology (Packaged Commodities) Rules, every retail pack of an imported product must show: (1) the importer's name and address in India; (2) the common or generic name of the product; (3) net quantity in standard units (grams, kg, liters, ml, meters); (4) month and year of import, manufacture or expiry (as applicable); (5) Maximum Retail Price (MRP) inclusive of all taxes; (6) country of origin; (7) the original maker's name and address abroad; (8) a customer care number or email. Labels must be in English or Hindi. Breaking these rules draws penalties under Section 36 of the Legal Metrology Act.",
  },
  {
    q: "Why is LMPC registration required for Amazon and Flipkart?",
    a: "Amazon India and Flipkart ask import vendors for their LMPC registration certificate. The reason is that the platforms themselves can face action under the Legal Metrology Act if they sell badly labelled products. Both check LMPC when onboarding vendors and in regular reviews. Import vendors without a valid certificate can have their accounts suspended. They cannot list imported products on these marketplaces.",
  },
  {
    q: "What are the penalties for not having LMPC registration?",
    a: "Section 36 of the Legal Metrology Act, 2009 prescribes penalties for importing or packing commodities without registration. The penalty for the first offence is a fine which may extend to ₹25,000. For a subsequent offence, the penalty can extend to ₹50,000 or imprisonment up to one year, or both. Additionally, Legal Metrology officers can seize and confiscate non-compliant goods at ports, warehouses, or retail locations. For e-commerce sellers, non-compliance also results in marketplace account suspension, which is a significant business disruption.",
  },
  {
    q: "How long is the LMPC registration valid and does it need renewal?",
    a: "LMPC registration is typically valid for 5 years from the date of issue. Renew it before it expires. File the renewal with the state's Controller of Legal Metrology before the expiry date. Some states issue registrations valid for 1-3 years under their own rules. Track the expiry date and renew on time. Selling with an expired registration is the same as selling without one, with the same penalties.",
  },
  {
    q: "Does LMPC registration need to be obtained separately for each state?",
    a: "It depends on where you import or pack. Typically, you get LMPC registration in the state of your principal place of business or import clearance facility. If you pack in several states, you may need a registration in each. Some e-commerce sellers import centrally from one place and sell across India through marketplaces. For them, one registration in the warehouse or clearance state typically suffices. Confirm this with the Legal Metrology authority.",
  },
  {
    q: "Can MRP be declared on products after import or must it be pre-printed?",
    a: "You can show the MRP and other required details on a sticker. Put it on after import but before sale. This is allowed for imported goods whose foreign packaging lacks India-specific details. The sticker must carry all details required by the Legal Metrology Rules. It must be stuck firmly so it cannot be easily removed. LMPC-registered importers can do this at their Indian warehouse. The sticker must not hide any required details already on the original pack.",
  },
];
