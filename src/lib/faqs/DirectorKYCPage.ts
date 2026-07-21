// FAQ content for DirectorKYCPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is DIR-3 KYC and why is it mandatory?",
    a: "DIR-3 KYC is the annual Know Your Customer filing mandated by the Ministry of Corporate Affairs for every person holding a Director Identification Number (DIN) or Designated Partner Identification Number (DPIN). It was introduced in 2018 under Companies (Amendment) Act, 2017 to reduce the proliferation of shell companies by verifying that DIN holders are real, traceable persons. Non-compliance results in DIN deactivation — blocking all corporate filings.",
  },
  {
    q: "When is DIR-3 KYC due every year?",
    a: "DIR-3 KYC must be filed by 30th September every year for all DIN/DPIN holders. MCA deactivates all non-compliant DINs on 1st October each year. Late filing is allowed by filing the full DIR-3 KYC form (not web form) with a ₹5,000 fee to reactivate the DIN. The September 30 deadline is strictly enforced with no grace period.",
  },
  {
    q: "What is the difference between DIR-3 KYC full form and DIR-3 KYC-Web?",
    a: "DIR-3 KYC-Web is the simplified web-based form for directors who have already filed DIR-3 KYC previously and have no change in their mobile number or email address. It requires only OTP verification — no documents, no CA/CS certification. The full DIR-3 KYC form (with documents and CA/CS certification) is required for: (1) first-time KYC filers, (2) directors whose mobile number or email has changed, or (3) reactivation after DIN deactivation.",
  },
  {
    q: "What happens if I miss the 30 September deadline?",
    a: "If DIR-3 KYC is not filed by 30 September, MCA marks the DIN as DEACTIVATED. A deactivated DIN cannot sign any MCA form — blocking ROC filings, LLP filings, changes in company information, and all other MCA submissions where the director or partner is required to sign. To reactivate, the director must file the full DIR-3 KYC form (not web form) with a ₹5,000 fee.",
  },
  {
    q: "Can DIR-3 KYC be filed after the 30 September deadline?",
    a: "Yes — late filing is allowed. After the deadline, the DIN gets deactivated and you must file the full DIR-3 KYC form (with documents and CA/CS certification) with a ₹5,000 fee. The DIN is restored to APPROVED status once MCA processes the form. There is no annual 'window close' — you can file at any time, but the ₹5,000 penalty applies for every year you missed.",
  },
  {
    q: "Do retired directors or former directors need to file DIR-3 KYC?",
    a: "Yes. As long as the DIN is active (APPROVED status) in MCA records, the holder must file DIR-3 KYC every year — even if they are not currently associated with any company or LLP. The obligation ends only when the DIN is formally surrendered to MCA. Many retired directors are unaware of this and face deactivated DINs which cause problems if they wish to join another company later.",
  },
  {
    q: "How does DPIN for LLP designated partners work for DIR-3 KYC?",
    a: "DPIN (Designated Partner Identification Number) for LLP partners is treated exactly the same as DIN for company directors under MCA rules. Designated partners holding DPIN must file DIR-3 KYC every year by 30 September. The same forms, same deadline, same ₹5,000 late fee, and same consequences apply. If DPIN is deactivated, the LLP cannot file Form 8, Form 11, or any other MCA filing.",
  },
  {
    q: "Is Aadhaar OTP mandatory for DIR-3 KYC — what if my mobile is not linked?",
    a: "For Indian residents, Aadhaar-linked mobile OTP is mandatory for DIR-3 KYC. If your mobile is not linked to Aadhaar, you must first visit an Aadhaar enrolment centre to link your mobile, then proceed with KYC. There is no alternative for Indian nationals — Aadhaar seeding is a requirement under the MCA notification. We assist clients in getting Aadhaar-mobile linking done before initiating the KYC process.",
  },
  {
    q: "What is the process for foreign directors who don't have Aadhaar?",
    a: "Foreign nationals serving as Indian company directors do not have Aadhaar. They file DIR-3 KYC using their passport as identity proof instead of Aadhaar. The form must be certified by a CA or CS in India. For documents outside India, apostille certification is typically required. The mobile OTP is sent to the foreign mobile number registered with MCA. We have handled foreign director KYC for directors based in the USA, UK, UAE, Singapore, and other countries.",
  },
  {
    q: "Which form should I use — DIR-3 KYC or DIR-3 KYC-Web?",
    a: "Use DIR-3 KYC-Web if: (1) you have filed DIR-3 KYC before, (2) your mobile number and email registered on MCA have not changed, and (3) your DIN is APPROVED. Use the full DIR-3 KYC form if: (1) you are filing for the first time, (2) your mobile or email has changed, (3) your DIN is deactivated and you need reactivation, or (4) you are a foreign national. When in doubt, our team will determine the correct form based on your DIN history.",
  },
  {
    q: "Can a company's ROC filing be rejected because of a director's inactive DIN?",
    a: "Yes — and this is a critical risk. MCA's portal validates the DIN status of all signing directors before accepting any company filing. If even one director or designated partner has a deactivated DIN, the company cannot file AOC-4, MGT-7, or any other ROC form. This means the entire company's compliance can be blocked by one director's failure to file DIR-3 KYC. Companies with multiple directors should track KYC status for all directors proactively.",
  },
];
