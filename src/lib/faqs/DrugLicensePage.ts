// FAQ content for DrugLicensePage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What are the different types of Drug Licenses in India?",
    a: "Drug Licenses in India are classified into: Retail Drug License (Form 20 for allopathic medicines; Form 21 for homeopathic and ayurvedic medicines), Wholesale Drug License (Form 20B for allopathic; Form 21B for homeopathic medicines), and Manufacturing Drug License (requires separate GMP — Good Manufacturing Practices — approval from CDSCO). Retail and wholesale licenses are issued by the State Drug Licensing Authority, while manufacturing licenses also involve the Central Drugs Standard Control Organisation (CDSCO).",
  },
  {
    q: "Is a pharmacist mandatory for a Retail Drug License?",
    a: "Yes. A registered pharmacist holding a B.Pharm or D.Pharm degree and registered with the State Pharmacy Council is mandatory for obtaining and maintaining a Retail Drug License. The pharmacist must be physically present at the pharmacy during business hours. A licensed pharmacist cannot be registered with more than one pharmacy at a time. Absence of the pharmacist during business hours is a compliance violation that can lead to suspension of the license.",
  },
  {
    q: "What are Schedule H and Schedule H1 drugs?",
    a: "Schedule H drugs are prescription medicines that can only be dispensed against a valid prescription from a registered medical practitioner. They include antibiotics, steroids, and other potent medicines. Schedule H1 is a more stringent sub-category introduced in 2013 and covers drugs with higher abuse potential — including second-line anti-TB drugs, narcotics, and certain antibiotics. Schedule H1 drugs require special recording in the Register of Sales and must be stored separately. Both categories prohibit over-the-counter sale without prescription.",
  },
  {
    q: "Can an online pharmacy (e-pharmacy) operate without a Drug License?",
    a: "No. E-pharmacies are not exempt from the Drugs & Cosmetics Act, 1940. The Draft E-Pharmacy Rules 2018 (published for public comment) require all online pharmacies to hold a valid Drug License issued by the State Drug Licensing Authority, in addition to meeting technology and prescription upload requirements. Operating an online pharmacy without a Drug License is a criminal offence. Additionally, e-pharmacies must comply with data protection and prescription verification norms.",
  },
  {
    q: "Which drugs require cold storage, and what certificate is needed?",
    a: "Drugs that require cold chain management include vaccines, biologicals, insulin and insulin analogues, certain antibiotics (like amoxicillin injections), blood products, and diagnostic reagents. These must be stored at 2–8°C in a refrigerator or cold room. To obtain a Drug License for such drugs, the applicant must submit a cold storage certificate confirming that appropriate temperature-controlled storage is available at the premises. The Drug Inspector will also verify the cold storage during the site inspection.",
  },
  {
    q: "What is the difference between Form 20 and Form 21?",
    a: "Form 20 is the drug license issued for retail sale of allopathic medicines (western or modern medicine including Schedule H and H1 drugs). Form 21 is issued for retail sale of homeopathic medicines. A complete retail pharmacy that stocks both types of medicines is typically issued both Form 20 and Form 21 together. Similarly, Form 20B covers wholesale distribution of allopathic medicines, while Form 21B covers wholesale distribution of homeopathic medicines.",
  },
  {
    q: "What happens if I miss the Drug License renewal deadline?",
    a: "Drug Licenses issued under the Drugs & Cosmetics Act are valid for 5 years. The license holder must apply for renewal before the expiry date. A grace period of 6 months is typically available after expiry, during which renewal can be applied for with a late fee penalty. If the license expires beyond the grace period without renewal, the license lapses and a fresh application must be filed. Operating with an expired Drug License is equivalent to operating without a license and attracts the same criminal penalties.",
  },
  {
    q: "Is a separate NDPS license required for narcotic drugs?",
    a: "Yes. Narcotic Drugs and Psychotropic Substances (NDPS) are regulated separately under the NDPS Act, 1985 and are not covered by a standard Drug License. Pharmacies that stock narcotic analgesics or psychotropic substances (such as morphine, codeine, or benzodiazepines in Schedule X) must obtain a separate NDPS license from the State Narcotics Controller. Such drugs are subject to strict stock records, reporting, and disposal procedures.",
  },
  {
    q: "How are cosmetics distinguished from drugs under the Drugs & Cosmetics Act?",
    a: "The Drugs & Cosmetics Act, 1940 regulates both drugs and cosmetics, but separately. A product is classified as a drug if it is intended for use in diagnosis, treatment, or prevention of disease. Cosmetics are defined as substances intended for external body application for cleansing, beautifying, or altering appearance. Some products can be classified as both — for example, anti-dandruff shampoos, sunscreens with high SPF, or medicated soaps — and would require both drug and cosmetic compliance. Misclassification can lead to regulatory action.",
  },
  {
    q: "What are the consequences of selling drugs without a license?",
    a: "Under Section 27 of the Drugs & Cosmetics Act, 1940, selling drugs without a valid license is a cognizable criminal offence. Penalties include: imprisonment for a term of 2 to 5 years (depending on the nature of the drug and offence), a monetary fine, seizure and destruction of the unlicensed drugs, and potential closure of premises by the Drug Inspector. For drugs covered under Schedule H, H1, or NDPS, the penalties are more severe. Drug Inspectors have powers to enter, inspect, and seize goods at any time.",
  },
];
