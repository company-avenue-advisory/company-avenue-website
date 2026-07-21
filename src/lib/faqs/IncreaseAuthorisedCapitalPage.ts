// FAQ content for IncreaseAuthorisedCapitalPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is authorised share capital and how is it different from paid-up capital?",
    a: "Authorised share capital (also called nominal capital) is the maximum value of shares a company is legally allowed to issue as stated in its Memorandum of Association (MOA). Paid-up capital is the amount actually issued to shareholders and received as payment. A company with an authorised capital of ₹10 lakh may have issued shares worth only ₹5 lakh — i.e., ₹5 lakh paid-up capital. The company cannot issue more shares than the authorised capital allows. To issue additional shares beyond the current authorised capital, the company must first increase the authorised capital.",
  },
  {
    q: "Is an ordinary resolution or special resolution required for capital increase?",
    a: "Under Section 61 of the Companies Act, 2013, alteration of share capital (including increase in authorised capital) requires only an Ordinary Resolution — i.e., a simple majority (more than 50%) of members voting. A Special Resolution (3/4 majority) is NOT required for this purpose. This makes increasing authorised capital relatively straightforward. However, the ordinary resolution must be passed at a properly convened EGM (or AGM) or through postal ballot with proper notice.",
  },
  {
    q: "What are Forms MGT-14 and SH-7 and when must they be filed?",
    a: "Form MGT-14 is filed with the Registrar of Companies to notify the passing of certain types of resolutions including those for alteration of the MOA. It must be filed within 30 days of passing the ordinary resolution at the EGM. Form SH-7 is the specific form used to notify the Registrar of an increase in authorised share capital under Section 64 of the Companies Act. It must also be filed within 30 days of passing the resolution. Both forms are filed online on the MCA portal with digital signatures of a director.",
  },
  {
    q: "What ROC fees apply when increasing authorised share capital?",
    a: "The ROC charges a filing fee for Form SH-7 based on the amount of increase in authorised capital. The fee structure (for companies other than small companies and OPCs) is approximately: ₹500 for increase up to ₹1 lakh; ₹1,000 for increase up to ₹5 lakh; ₹1,500 for increase up to ₹10 lakh; ₹2,000 for increase up to ₹25 lakh; ₹5,000 for increase up to ₹1 crore; and higher for larger amounts. Stamp duty on the altered MOA is payable additionally as per the relevant state&apos;s stamp duty rates — typically 0.1% to 0.2% of the increase amount.",
  },
  {
    q: "How long does it take to complete the authorised capital increase?",
    a: "The complete process typically takes 7 to 10 business days from the date of the EGM, subject to timely document preparation and MCA portal processing. The timeline includes: convening the EGM (minimum 21 days notice for non-exempt cases, or shorter with shareholder consent in writing), filing MGT-14 and SH-7 within 30 days of the resolution, and MCA portal processing time of 2-5 business days. Emergency increases (for imminent funding) can be expedited by obtaining shareholder consent in writing without holding a physical EGM.",
  },
  {
    q: "Can the authorised capital be increased without holding a physical EGM?",
    a: "Yes. Under Section 110 of the Companies Act, certain businesses that would ordinarily require shareholder approval at an EGM can be conducted through postal ballot — a written voting process without a physical meeting. Additionally, under the Companies Act, if all shareholders give their written consent to pass a resolution without holding a meeting (under Section 186 of the Act read with relevant provisions), an EGM may not be required. We advise on the fastest and most practical route based on the company&apos;s shareholding structure and urgency.",
  },
  {
    q: "Does increasing authorised capital affect the company&apos;s existing shareholders?",
    a: "No. Merely increasing the authorised share capital does not in any way affect the existing shareholders&apos; economic rights, shareholding percentage, or voting rights. It simply creates headroom — the maximum number of shares the company is allowed to issue increases. The actual issuance of new shares (which would dilute existing shareholders) is a separate process requiring its own board and shareholder approvals, including preemption rights compliance. Increasing authorised capital is a purely administrative step to enable future share issuances.",
  },
  {
    q: "What is the maximum authorised capital a Private Limited Company can have?",
    a: "There is no statutory upper limit on the authorised share capital of a Private Limited Company in India. However, the higher the authorised capital, the higher the ROC filing fees (on SH-7) and stamp duty on the altered MOA. Most early-stage startups start with ₹1-5 lakh authorised capital. After a Series A or B fundraising, they may need ₹5-50 crore of authorised capital to accommodate investor shares plus an ESOP pool. Large established companies may have authorised capital in the thousands of crores. The practical consideration is balancing administrative costs against the headroom needed for at least the next 2-3 years.",
  },
];
