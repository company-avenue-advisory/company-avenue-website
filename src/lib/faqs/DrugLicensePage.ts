// FAQ content for DrugLicensePage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What are the different types of Drug Licenses in India?",
    a: "India has three types of Drug License. Retail: Form 20 for allopathic medicines and Form 21 for homeopathic and ayurvedic medicines. Wholesale: Form 20B for allopathic and Form 21B for homeopathic medicines. Manufacturing: this needs separate GMP (Good Manufacturing Practices) approval from CDSCO. The State Drug Licensing Authority issues retail and wholesale licenses. Manufacturing licenses also involve the Central Drugs Standard Control Organisation (CDSCO).",
  },
  {
    q: "Is a pharmacist mandatory for a Retail Drug License?",
    a: "Yes. To get and keep a Retail Drug License, you need a pharmacist with a B.Pharm or D.Pharm degree, registered with the State Pharmacy Council. The pharmacist must be at the pharmacy in person during business hours. A pharmacist cannot be registered with more than one pharmacy at a time. If the pharmacist is absent during business hours, that is a violation. It can lead to the license being suspended.",
  },
  {
    q: "What are Schedule H and Schedule H1 drugs?",
    a: "Schedule H drugs are prescription medicines. They can be sold only against a valid prescription from a registered doctor. They include antibiotics, steroids and other strong medicines. Schedule H1 is a stricter group, added in 2013, for drugs more likely to be misused. It includes second-line anti-TB drugs, narcotics and some antibiotics. Schedule H1 sales must be recorded in a special Register of Sales, and the drugs stored separately. Neither group can be sold over the counter without a prescription.",
  },
  {
    q: "Can an online pharmacy (e-pharmacy) operate without a Drug License?",
    a: "No. E-pharmacies are not exempt from the Drugs & Cosmetics Act, 1940. The Draft E-Pharmacy Rules 2018 (published for public comment) say every online pharmacy needs a valid Drug License from the State Drug Licensing Authority. They must also meet technology and prescription upload rules. Running an online pharmacy without a Drug License is a crime. E-pharmacies must also follow data protection and prescription checking norms.",
  },
  {
    q: "Which drugs require cold storage, and what certificate is needed?",
    a: "Drugs that need a cold chain include vaccines, biologicals, insulin and its analogues, some antibiotics (such as amoxicillin injections), blood products and diagnostic reagents. Store them at 2–8°C in a fridge or cold room. To get a Drug License for these, submit a cold storage certificate. It confirms you have proper temperature-controlled storage. The Drug Inspector will also check it during the site visit.",
  },
  {
    q: "What is the difference between Form 20 and Form 21?",
    a: "Form 20 is the license for retail sale of allopathic medicines (modern medicine, including Schedule H and H1 drugs). Form 21 is for retail sale of homeopathic medicines. A pharmacy that stocks both usually gets Form 20 and Form 21 together. In the same way, Form 20B covers wholesale of allopathic medicines and Form 21B covers wholesale of homeopathic medicines.",
  },
  {
    q: "What happens if I miss the Drug License renewal deadline?",
    a: "Drug Licenses under the Drugs & Cosmetics Act are valid for 5 years. Apply for renewal before the expiry date. There is typically a 6-month grace period after expiry. You can still renew in that time, with a late fee penalty. After the grace period, the license lapses and you must apply afresh. Running with an expired license is the same as having no license. It draws the same criminal penalties.",
  },
  {
    q: "Is a separate NDPS license required for narcotic drugs?",
    a: "Yes. Narcotic Drugs and Psychotropic Substances (NDPS) are regulated separately under the NDPS Act, 1985. A standard Drug License does not cover them. Pharmacies that stock narcotic painkillers or psychotropic drugs (such as morphine, codeine or Schedule X benzodiazepines) need a separate NDPS license from the State Narcotics Controller. These drugs have strict rules on stock records, reporting and disposal.",
  },
  {
    q: "How are cosmetics distinguished from drugs under the Drugs & Cosmetics Act?",
    a: "The Drugs & Cosmetics Act, 1940 covers both drugs and cosmetics, but separately. A product is a drug if it is meant to diagnose, treat or prevent disease. A cosmetic is something applied on the body to clean, beautify or change appearance. Some products can be both, such as anti-dandruff shampoo, high-SPF sunscreen or medicated soap. These need both drug and cosmetic compliance. Getting the category wrong can lead to regulatory action.",
  },
  {
    q: "What are the consequences of selling drugs without a license?",
    a: "Under Section 27 of the Drugs & Cosmetics Act, 1940, selling drugs without a valid license is a cognizable criminal offence. Penalties include: 2 to 5 years in prison (based on the drug and the offence); a fine; seizure and destruction of the unlicensed drugs; and possible closure of the premises by the Drug Inspector. Penalties are harsher for Schedule H, H1 or NDPS drugs. Drug Inspectors can enter, inspect and seize goods at any time.",
  },
];
