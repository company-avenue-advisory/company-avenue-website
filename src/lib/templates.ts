// ─────────────────────────────────────────────────────────────────────────────
// Ready-to-use business document templates.
//
// Each `body` is boilerplate you can copy or download and adapt. Placeholders in
// [SQUARE BRACKETS] must be replaced. These are general drafts — have material
// contracts reviewed by a qualified professional before signing.
// ─────────────────────────────────────────────────────────────────────────────

export interface Template {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** lucide-react icon name */
  icon: string;
  /** tailwind classes for the card icon chip */
  accent: string;
  /** short format label, e.g. "Editable · Word/Docs" */
  format: string;
  /** key placeholders the user must fill */
  fields: string[];
  body: string;
}

export const TEMPLATE_CATEGORIES = [
  "HR & Employment",
  "Company Secretarial",
  "Agreements & Contracts",
  "Finance & Invoicing",
] as const;

export const TEMPLATES: Template[] = [
  // ── HR & Employment ─────────────────────────────────────────────────────
  {
    slug: "job-offer-letter",
    title: "Job Offer Letter",
    description:
      "A clean, professional offer letter covering role, CTC, joining date and standard terms — ready to send to your selected candidate.",
    category: "HR & Employment",
    icon: "Mail",
    accent: "bg-blue-50 text-blue-600 border-blue-100",
    format: "Editable letter",
    fields: ["Candidate name", "Designation", "CTC / salary", "Joining date", "Reporting manager"],
    body: `[COMPANY LETTERHEAD]

Date: [DD/MM/YYYY]

[CANDIDATE NAME]
[Candidate Address]

Dear [CANDIDATE NAME],

Subject: Offer of Employment — [DESIGNATION]

We are pleased to offer you the position of [DESIGNATION] at [COMPANY NAME] ("the Company"). We were impressed with your background and believe you will be a valuable addition to our team.

The key terms of your offer are as follows:

1. Designation: [DESIGNATION], reporting to [REPORTING MANAGER].
2. Date of Joining: [DD/MM/YYYY].
3. Place of Work: [LOCATION] (subject to transfer as per business needs).
4. Annual CTC: INR [AMOUNT] per annum. A detailed salary breakup is provided in Annexure A.
5. Probation: You will be on probation for a period of [SIX (6)] months, extendable at the Company's discretion.
6. Notice Period: [30 / 60 / 90] days after confirmation ([15] days during probation).
7. Working Hours: [9:30 AM to 6:30 PM], [Monday to Friday/Saturday].

This offer is contingent upon (a) satisfactory background and reference verification, (b) submission of the documents listed in Annexure B, and (c) your not being under any conflicting obligation to a previous employer.

Your employment will be governed by the Company's policies as amended from time to time. Please confirm your acceptance by signing and returning a copy of this letter by [DD/MM/YYYY].

We look forward to welcoming you aboard.

Warm regards,

_____________________
[NAME]
[Designation], Human Resources
[COMPANY NAME]

Accepted and agreed:

_____________________
[CANDIDATE NAME]        Date: [DD/MM/YYYY]`,
  },
  {
    slug: "appointment-letter",
    title: "Appointment / Confirmation Letter",
    description:
      "Issued on joining (or on confirmation after probation) — formalises the employment relationship and references the company's policies.",
    category: "HR & Employment",
    icon: "FileCheck",
    accent: "bg-indigo-50 text-indigo-600 border-indigo-100",
    format: "Editable letter",
    fields: ["Employee name", "Employee ID", "Designation", "Date of joining", "Department"],
    body: `[COMPANY LETTERHEAD]

Date: [DD/MM/YYYY]

[EMPLOYEE NAME]
Employee ID: [EMP ID]

Dear [EMPLOYEE NAME],

Subject: Letter of Appointment

With reference to your application and the interviews you had with us, we are pleased to appoint you as [DESIGNATION] in the [DEPARTMENT] department of [COMPANY NAME], with effect from [DATE OF JOINING], on the following terms and conditions:

1. Remuneration: Your compensation shall be as detailed in Annexure A, subject to statutory deductions (TDS, PF, ESI, Professional Tax as applicable).

2. Duties: You shall perform the duties assigned to you diligently and shall not engage in any other employment or business during your tenure without prior written consent.

3. Confidentiality: You shall keep confidential all proprietary information of the Company and its clients, during and after your employment.

4. Working Hours & Leave: As per the Company's HR policy, as amended from time to time.

5. Notice Period: Either party may terminate this employment by giving [30/60/90] days' written notice or salary in lieu thereof.

6. Governing Law: This appointment is governed by the laws of India, and disputes shall be subject to the jurisdiction of the courts at [CITY].

Please sign the duplicate copy of this letter as a token of your acceptance.

For [COMPANY NAME],

_____________________
[NAME], [Designation]

I accept the above terms and conditions.

_____________________
[EMPLOYEE NAME]        Date: [DD/MM/YYYY]`,
  },
  {
    slug: "employee-nda",
    title: "Employee Non-Disclosure Agreement",
    description:
      "Protects your confidential information, client data and IP when onboarding an employee — a concise, enforceable one-way NDA.",
    category: "HR & Employment",
    icon: "Lock",
    accent: "bg-slate-50 text-slate-600 border-slate-200",
    format: "Editable agreement",
    fields: ["Employee name", "Company name", "Effective date", "Jurisdiction (city)"],
    body: `EMPLOYEE NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on [DD/MM/YYYY] between:

[COMPANY NAME], a company incorporated under the Companies Act, 2013, having its registered office at [ADDRESS] ("Company"); and

[EMPLOYEE NAME], residing at [ADDRESS] ("Employee").

1. CONFIDENTIAL INFORMATION
"Confidential Information" means all non-public information disclosed by the Company, including business plans, customer and vendor lists, pricing, source code, designs, financials, and trade secrets, in any form.

2. OBLIGATIONS
The Employee shall: (a) use Confidential Information solely to perform their duties; (b) not disclose it to any third party; and (c) protect it with at least the same care as their own confidential information.

3. EXCLUSIONS
Obligations do not apply to information that is publicly available, already known to the Employee without duty of confidence, or required to be disclosed by law.

4. INTELLECTUAL PROPERTY
All work product, inventions and materials created by the Employee in the course of employment shall be the sole property of the Company.

5. TERM & SURVIVAL
These obligations apply during employment and shall survive for [THREE (3)] years after its termination. Trade secrets remain protected for as long as they qualify as such under law.

6. RETURN OF MATERIALS
On termination, the Employee shall return or destroy all Confidential Information and copies thereof.

7. GOVERNING LAW
This Agreement is governed by the laws of India; courts at [CITY] shall have exclusive jurisdiction.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

For [COMPANY NAME]                Employee

_____________________            _____________________
[NAME], [Designation]            [EMPLOYEE NAME]`,
  },
  {
    slug: "experience-relieving-letter",
    title: "Experience & Relieving Letter",
    description:
      "Issued on an employee's exit — confirms tenure, designation and clearance, and thanks them for their service.",
    category: "HR & Employment",
    icon: "FileText",
    accent: "bg-green-50 text-green-600 border-green-100",
    format: "Editable letter",
    fields: ["Employee name", "Designation", "Tenure (from–to)", "Last working day"],
    body: `[COMPANY LETTERHEAD]

Date: [DD/MM/YYYY]

TO WHOMSOEVER IT MAY CONCERN

This is to certify that [MR./MS. EMPLOYEE NAME] (Employee ID: [EMP ID]) was employed with [COMPANY NAME] as [DESIGNATION] from [DD/MM/YYYY] to [DD/MM/YYYY].

During [his/her] tenure with us, [he/she] was found to be [sincere, hardworking and professional], and handled [his/her] responsibilities to our satisfaction.

[He/She] has been relieved from the services of the Company with effect from the close of business on [LAST WORKING DAY], and has completed all exit formalities and clearances.

We thank [MR./MS. EMPLOYEE NAME] for [his/her] contribution and wish [him/her] success in [his/her] future endeavours.

For [COMPANY NAME],

_____________________
[NAME]
[Designation], Human Resources`,
  },

  // ── Company Secretarial ─────────────────────────────────────────────────
  {
    slug: "board-resolution-bank-account",
    title: "Board Resolution — Open Bank Account",
    description:
      "Standard board resolution authorising the opening and operation of a company current account — required by every bank at onboarding.",
    category: "Company Secretarial",
    icon: "Landmark",
    accent: "bg-amber-50 text-amber-600 border-amber-100",
    format: "Editable resolution",
    fields: ["Company name", "CIN", "Bank name & branch", "Authorised signatory(ies)", "Meeting date"],
    body: `[COMPANY NAME]
CIN: [CIN]
Registered Office: [ADDRESS]

CERTIFIED TRUE COPY OF THE RESOLUTION PASSED AT THE MEETING OF THE BOARD OF DIRECTORS HELD ON [DD/MM/YYYY] AT [TIME] AT THE REGISTERED OFFICE OF THE COMPANY

OPENING OF BANK ACCOUNT

"RESOLVED THAT a Current Account be opened in the name of the Company, [COMPANY NAME], with [BANK NAME], [BRANCH], and that the said bank be and is hereby authorised to honour cheques, bills of exchange and other instruments drawn, accepted or made on behalf of the Company.

RESOLVED FURTHER THAT the account be operated by [NAME(S) OF AUTHORISED SIGNATORY(IES)], [singly / jointly], and that the bank's account opening documents be signed accordingly.

RESOLVED FURTHER THAT [MR./MS. NAME], [Director/Company Secretary], be and is hereby authorised to submit the necessary documents, sign the account opening forms, and do all such acts and deeds as may be necessary to give effect to this resolution."

For [COMPANY NAME]

_____________________
[NAME]
[Director]
DIN: [DIN]`,
  },
  {
    slug: "board-resolution-appoint-director",
    title: "Board Resolution — Appoint Director",
    description:
      "Resolution for the appointment of an additional director, to be followed by filing DIR-12 with the MCA.",
    category: "Company Secretarial",
    icon: "UserPlus",
    accent: "bg-purple-50 text-purple-600 border-purple-100",
    format: "Editable resolution",
    fields: ["Company name", "New director name", "DIN", "Meeting date"],
    body: `[COMPANY NAME]
CIN: [CIN]
Registered Office: [ADDRESS]

CERTIFIED TRUE COPY OF THE RESOLUTION PASSED AT THE MEETING OF THE BOARD OF DIRECTORS HELD ON [DD/MM/YYYY]

APPOINTMENT OF ADDITIONAL DIRECTOR

"RESOLVED THAT pursuant to Section 161 of the Companies Act, 2013 and the Articles of Association of the Company, [MR./MS. NAME] (DIN: [DIN]), who has submitted consent in Form DIR-2 and a declaration in Form DIR-8, be and is hereby appointed as an Additional Director of the Company with effect from [DD/MM/YYYY], to hold office up to the date of the next Annual General Meeting.

RESOLVED FURTHER THAT [MR./MS. NAME], [Director/Company Secretary], be and is hereby authorised to file the requisite Form DIR-12 with the Registrar of Companies and to do all acts necessary to give effect to this resolution."

For [COMPANY NAME]

_____________________
[NAME]
[Director]
DIN: [DIN]`,
  },
  {
    slug: "notice-board-meeting",
    title: "Notice of Board Meeting",
    description:
      "Formal notice convening a board meeting with agenda — issued at least 7 days in advance as required under the Companies Act.",
    category: "Company Secretarial",
    icon: "CalendarClock",
    accent: "bg-rose-50 text-rose-600 border-rose-100",
    format: "Editable notice",
    fields: ["Company name", "Meeting date & time", "Venue", "Agenda items"],
    body: `[COMPANY NAME]
CIN: [CIN]
Registered Office: [ADDRESS]

NOTICE OF BOARD MEETING

Date: [DD/MM/YYYY]

To,
The Members of the Board of Directors,
[COMPANY NAME]

Dear Sir/Madam,

Notice is hereby given that a meeting of the Board of Directors of the Company will be held as under:

Day & Date : [DAY], [DD/MM/YYYY]
Time       : [HH:MM AM/PM]
Venue      : [VENUE / Video Conference]

to transact the following business:

AGENDA
1. To grant leave of absence, if any.
2. To confirm the minutes of the previous Board Meeting held on [DD/MM/YYYY].
3. [AGENDA ITEM 3].
4. [AGENDA ITEM 4].
5. Any other matter with the permission of the Chair.

You are requested to make it convenient to attend the meeting. If you wish to participate through video conferencing, please intimate the undersigned in advance.

For [COMPANY NAME]

_____________________
[NAME]
[Director / Company Secretary]`,
  },

  // ── Agreements & Contracts ──────────────────────────────────────────────
  {
    slug: "mutual-nda",
    title: "Mutual Non-Disclosure Agreement",
    description:
      "A balanced two-way NDA for exploring a partnership, deal or vendor relationship where both sides share confidential information.",
    category: "Agreements & Contracts",
    icon: "Handshake",
    accent: "bg-teal-50 text-teal-600 border-teal-100",
    format: "Editable agreement",
    fields: ["Party A name", "Party B name", "Effective date", "Purpose", "Jurisdiction"],
    body: `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is made on [DD/MM/YYYY] between:

[PARTY A NAME], having its office at [ADDRESS] ("Party A"); and
[PARTY B NAME], having its office at [ADDRESS] ("Party B").

Party A and Party B are individually a "Party" and collectively the "Parties".

1. PURPOSE
The Parties wish to explore [PURPOSE — e.g. a potential business relationship] ("Purpose") and, in connection therewith, may disclose confidential information to each other.

2. CONFIDENTIAL INFORMATION
"Confidential Information" means any non-public information disclosed by one Party (the "Disclosing Party") to the other (the "Receiving Party"), whether oral, written or electronic, that is marked or reasonably understood to be confidential.

3. OBLIGATIONS
The Receiving Party shall: (a) use Confidential Information solely for the Purpose; (b) not disclose it to third parties except to employees/advisors on a need-to-know basis who are bound by similar obligations; and (c) protect it with reasonable care.

4. EXCLUSIONS
Confidential Information does not include information that is or becomes public through no fault of the Receiving Party, was lawfully known prior to disclosure, or is independently developed.

5. TERM
This Agreement is effective from the date above and confidentiality obligations survive for [TWO (2)] years from the date of disclosure.

6. NO LICENCE / NO OBLIGATION
Nothing herein grants any licence to intellectual property or obliges either Party to proceed with any transaction.

7. GOVERNING LAW
This Agreement is governed by the laws of India; courts at [CITY] shall have exclusive jurisdiction.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.

Party A                          Party B

_____________________            _____________________
Name:                            Name:
Designation:                     Designation:`,
  },
  {
    slug: "consultant-freelancer-agreement",
    title: "Consultant / Freelancer Agreement",
    description:
      "Engage an independent contractor with clear scope, fees, IP assignment and confidentiality — protects both sides of a services engagement.",
    category: "Agreements & Contracts",
    icon: "Briefcase",
    accent: "bg-orange-50 text-orange-600 border-orange-100",
    format: "Editable agreement",
    fields: ["Client name", "Consultant name", "Scope of work", "Fees & payment terms", "Term"],
    body: `CONSULTANCY SERVICES AGREEMENT

This Agreement is made on [DD/MM/YYYY] between:

[CLIENT NAME], having its office at [ADDRESS] ("Client"); and
[CONSULTANT NAME], having its address at [ADDRESS] ("Consultant").

1. SCOPE OF SERVICES
The Consultant shall provide the following services ("Services"): [DESCRIBE SCOPE / attach Annexure A]. The Consultant is an independent contractor and not an employee, agent or partner of the Client.

2. TERM
This Agreement commences on [START DATE] and continues until [END DATE / completion of Services], unless terminated earlier under Clause 7.

3. FEES & PAYMENT
The Client shall pay the Consultant [INR AMOUNT / rate] as per the schedule in Annexure A. Invoices are payable within [15/30] days. Applicable taxes (GST) shall be charged extra. TDS will be deducted as per law.

4. INTELLECTUAL PROPERTY
All deliverables and work product created under this Agreement shall, upon full payment, be the exclusive property of the Client. The Consultant assigns all rights therein to the Client.

5. CONFIDENTIALITY
The Consultant shall keep confidential all information of the Client and shall not use it except for performing the Services. This obligation survives termination for [TWO (2)] years.

6. WARRANTIES
The Consultant warrants that the Services will be performed with reasonable skill and care and will not infringe any third-party rights.

7. TERMINATION
Either Party may terminate this Agreement with [15/30] days' written notice. The Client shall pay for Services rendered up to the termination date.

8. LIMITATION OF LIABILITY
Neither Party shall be liable for indirect or consequential losses. The Consultant's total liability shall not exceed the fees paid under this Agreement.

9. GOVERNING LAW
This Agreement is governed by the laws of India; courts at [CITY] shall have exclusive jurisdiction.

IN WITNESS WHEREOF, the Parties have executed this Agreement.

Client                           Consultant

_____________________            _____________________
Name:                            Name:`,
  },
  {
    slug: "founders-agreement",
    title: "Founders' Agreement",
    description:
      "Aligns co-founders on equity, roles, vesting, decision-making and exit before things get complicated — the document every startup should sign early.",
    category: "Agreements & Contracts",
    icon: "Users",
    accent: "bg-cyan-50 text-cyan-600 border-cyan-100",
    format: "Editable agreement",
    fields: ["Company / venture name", "Founder names", "Equity split", "Vesting schedule", "Roles"],
    body: `FOUNDERS' AGREEMENT

This Founders' Agreement ("Agreement") is entered into on [DD/MM/YYYY] among the following founders (each a "Founder", collectively the "Founders") in relation to [COMPANY / VENTURE NAME] ("Company"):

1. [FOUNDER 1 NAME], residing at [ADDRESS];
2. [FOUNDER 2 NAME], residing at [ADDRESS];
3. [FOUNDER 3 NAME], residing at [ADDRESS].

1. BUSINESS
The Founders agree to carry on the business of [DESCRIBE BUSINESS] through the Company.

2. EQUITY & CAPITAL
The equity of the Company shall be held as follows: [FOUNDER 1] — [X]%, [FOUNDER 2] — [Y]%, [FOUNDER 3] — [Z]%. Each Founder shall contribute capital / sweat equity as set out in Annexure A.

3. ROLES & RESPONSIBILITIES
[FOUNDER 1] — [ROLE, e.g. CEO]; [FOUNDER 2] — [ROLE]; [FOUNDER 3] — [ROLE]. Each Founder shall devote [full-time] effort to the Company.

4. VESTING
Founder equity shall vest over [FOUR (4)] years with a [ONE (1)] year cliff. Unvested shares of a Founder who leaves shall be subject to buy-back at [fair value / par].

5. DECISION-MAKING
Ordinary matters shall be decided by majority. Reserved matters (fundraising, sale, new business lines, borrowing above [INR AMOUNT]) require [unanimous / super-majority] consent.

6. INTELLECTUAL PROPERTY
All IP created by any Founder in connection with the business shall belong to the Company.

7. TRANSFER OF SHARES & ROFR
No Founder shall transfer shares without first offering them to the other Founders (Right of First Refusal). Standard tag-along and drag-along rights apply.

8. LEAVER PROVISIONS
A Founder who ceases involvement shall be treated as a "Good Leaver" or "Bad Leaver" as defined in Annexure B, determining their entitlement to vested shares.

9. CONFIDENTIALITY & NON-COMPETE
Each Founder shall maintain confidentiality and shall not compete with the Company during their involvement and for [ONE (1)] year thereafter.

10. DISPUTE RESOLUTION
Disputes shall be resolved by arbitration under the Arbitration and Conciliation Act, 1996, seated at [CITY].

11. GOVERNING LAW
This Agreement is governed by the laws of India.

IN WITNESS WHEREOF, the Founders have executed this Agreement.

_____________________   _____________________   _____________________
[FOUNDER 1]             [FOUNDER 2]             [FOUNDER 3]`,
  },

  // ── Finance & Invoicing ─────────────────────────────────────────────────
  {
    slug: "gst-tax-invoice",
    title: "GST Tax Invoice",
    description:
      "A compliant tax invoice with all mandatory GST fields — GSTIN, HSN/SAC, taxable value and CGST/SGST or IGST split.",
    category: "Finance & Invoicing",
    icon: "Receipt",
    accent: "bg-green-50 text-green-600 border-green-100",
    format: "Editable invoice",
    fields: ["Your GSTIN", "Invoice no. & date", "Customer details & GSTIN", "Item, HSN/SAC, rate", "Place of supply"],
    body: `TAX INVOICE

[YOUR COMPANY NAME]
[Address]
GSTIN: [YOUR GSTIN]        State: [STATE], Code: [CODE]
Email: [EMAIL]   Phone: [PHONE]

Invoice No.: [INV-2026-001]              Invoice Date: [DD/MM/YYYY]
Place of Supply: [STATE, CODE]           Reverse Charge: [Yes/No]

BILL TO:
[CUSTOMER NAME]
[Customer Address]
GSTIN: [CUSTOMER GSTIN]     State: [STATE], Code: [CODE]

--------------------------------------------------------------------------
#  | Description        | HSN/SAC | Qty | Rate    | Taxable Value
--------------------------------------------------------------------------
1  | [ITEM/SERVICE]     | [SAC]   | [1] | [AMT]   | [AMT]
2  | [ITEM/SERVICE]     | [SAC]   | [1] | [AMT]   | [AMT]
--------------------------------------------------------------------------
                                        Taxable Value : INR [SUBTOTAL]
                                        CGST @ [9]%    : INR [AMT]
                                        SGST @ [9]%    : INR [AMT]
                          (or) IGST @ [18]%            : INR [AMT]
                                        --------------------------------
                                        TOTAL          : INR [GRAND TOTAL]

Amount in words: [RUPEES ... ONLY]

Note: For inter-state supply, charge IGST instead of CGST + SGST.

Bank Details:
A/c Name: [NAME]   A/c No.: [NUMBER]   IFSC: [IFSC]   Bank: [BANK, BRANCH]

Declaration: We declare that this invoice shows the actual price of the goods/services described and that all particulars are true and correct.

For [YOUR COMPANY NAME]

_____________________
Authorised Signatory`,
  },
  {
    slug: "proforma-invoice",
    title: "Proforma Invoice / Quotation",
    description:
      "Send a professional estimate before the sale — same look as your tax invoice but clearly marked as a non-binding quote.",
    category: "Finance & Invoicing",
    icon: "FileSpreadsheet",
    accent: "bg-blue-50 text-blue-600 border-blue-100",
    format: "Editable document",
    fields: ["Your details", "Quote no. & date", "Customer details", "Items & prices", "Validity"],
    body: `PROFORMA INVOICE / QUOTATION

[YOUR COMPANY NAME]
[Address]   GSTIN: [GSTIN]
Email: [EMAIL]   Phone: [PHONE]

Quotation No.: [QUO-2026-001]           Date: [DD/MM/YYYY]
Valid Until: [DD/MM/YYYY]

TO:
[CUSTOMER NAME]
[Customer Address]

We are pleased to quote as follows:

--------------------------------------------------------------------------
#  | Description             | Qty | Unit Price | Amount
--------------------------------------------------------------------------
1  | [ITEM/SERVICE]          | [1] | [AMT]      | [AMT]
2  | [ITEM/SERVICE]          | [1] | [AMT]      | [AMT]
--------------------------------------------------------------------------
                                     Sub-total    : INR [SUBTOTAL]
                                     GST @ [18]%   : INR [AMT]
                                     -------------------------------
                                     TOTAL         : INR [GRAND TOTAL]

Terms:
1. This is a proforma invoice / quotation and not a demand for payment.
2. Prices are valid until [DD/MM/YYYY].
3. Payment terms: [50% advance, balance on delivery].
4. Delivery: [TIMELINE] from confirmation.
5. GST and other taxes as applicable.

For [YOUR COMPANY NAME]

_____________________
Authorised Signatory`,
  },

  // ── Added Nov 2026 (keyword gap: NOC, MOU, AGM notice, deed, salary slip) ──
  {
    slug: "noc-letter",
    title: "No Objection Certificate (NOC) Format",
    description:
      "NOC format from a property owner allowing a business to run from their premises — the letter most often asked for in GST registration, Trade License and bank KYC.",
    category: "Agreements & Contracts",
    icon: "FileCheck",
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
    format: "Editable letter",
    fields: ["Owner name & address", "Business / tenant name", "Premises address", "Purpose"],
    body: `NO OBJECTION CERTIFICATE

Date: [DD/MM/YYYY]

To,
[The Concerned Authority / Whomsoever It May Concern]

I/We, [OWNER NAME], son/daughter/wife of [FATHER'S / SPOUSE'S NAME], residing at [OWNER ADDRESS], am/are the lawful owner(s) of the premises situated at:

[FULL PREMISES ADDRESS WITH PIN CODE]

I/We hereby confirm that I/we have no objection to [BUSINESS / TENANT NAME], [proprietor / partners / company] represented by [NAME OF AUTHORISED PERSON], using the above premises as its [principal place of business / registered office / branch] for carrying on the business of [NATURE OF BUSINESS].

I/We also have no objection to the above premises being used as the business address for [GST registration / Trade License / bank account / other registration].

This certificate is issued at the request of [BUSINESS / TENANT NAME] for the purpose stated above.

Enclosed: Copy of [property tax receipt / electricity bill / sale deed] as proof of ownership.

_____________________
[OWNER NAME]
(Owner of the premises)
Place: [CITY]`,
  },
  {
    slug: "mou-format",
    title: "Memorandum of Understanding (MOU) Format",
    description:
      "A simple MOU format for two parties agreeing to work together — purpose, roles, cost sharing, confidentiality and exit — before a full contract is signed.",
    category: "Agreements & Contracts",
    icon: "Handshake",
    accent: "bg-indigo-50 text-indigo-600 border-indigo-100",
    format: "Editable agreement",
    fields: ["Party names & addresses", "Purpose", "Roles of each party", "Term", "Signatories"],
    body: `MEMORANDUM OF UNDERSTANDING

This Memorandum of Understanding ("MOU") is made on [DD/MM/YYYY] at [CITY]

BETWEEN

[PARTY A NAME], [a company / LLP / firm / individual] having its office at [ADDRESS] (hereinafter "Party A")

AND

[PARTY B NAME], [a company / LLP / firm / individual] having its office at [ADDRESS] (hereinafter "Party B")

(Party A and Party B together, the "Parties")

1. PURPOSE
The Parties wish to work together on [DESCRIBE THE PROJECT / COLLABORATION].

2. ROLES AND RESPONSIBILITIES
2.1 Party A will: [RESPONSIBILITIES].
2.2 Party B will: [RESPONSIBILITIES].

3. COSTS AND REVENUE
[How costs, fees or revenue will be shared, or state that each Party bears its own costs.]

4. TERM
This MOU starts on the date above and continues for [PERIOD], unless ended earlier under clause 7.

5. CONFIDENTIALITY
Each Party will keep confidential any information marked or understood as confidential that it receives from the other Party, and use it only for the purpose of this MOU.

6. NATURE OF THIS MOU
[This MOU records the Parties' intent. Except for clauses 5, 7 and 8, it is not legally binding, and a detailed agreement will be signed before work begins.] / [This MOU is binding on the Parties.] — keep one option.

7. TERMINATION
Either Party may end this MOU by giving [NUMBER] days' written notice to the other.

8. GOVERNING LAW AND DISPUTES
This MOU is governed by the laws of India. Courts at [CITY] will have jurisdiction.

IN WITNESS WHEREOF the Parties have signed this MOU on the date first written above.

For [PARTY A NAME]                    For [PARTY B NAME]

_____________________                 _____________________
[Name, Designation]                    [Name, Designation]

Witnesses:
1. ____________________
2. ____________________`,
  },
  {
    slug: "agm-notice",
    title: "Notice of Annual General Meeting (AGM)",
    description:
      "AGM notice format for a private limited company — ordinary business (accounts, auditor, directors) and space for special business, with an explanatory statement.",
    category: "Company Secretarial",
    icon: "CalendarCheck",
    accent: "bg-rose-50 text-rose-600 border-rose-100",
    format: "Editable notice",
    fields: ["Company name & CIN", "AGM number, date, time & venue", "Financial year", "Business items"],
    body: `[COMPANY NAME]
CIN: [CIN]
Registered Office: [ADDRESS]
Email: [EMAIL]   Phone: [PHONE]

NOTICE OF [NUMBER] ANNUAL GENERAL MEETING

Notice is hereby given that the [NUMBER] Annual General Meeting of the Members of [COMPANY NAME] will be held on [DAY], [DD/MM/YYYY] at [HH:MM AM/PM] at [VENUE / through Video Conferencing] to transact the following business:

ORDINARY BUSINESS
1. To receive, consider and adopt the audited financial statements of the Company for the financial year ended [31 March YYYY], together with the reports of the Board of Directors and the Auditors thereon.
2. [To appoint / ratify the appointment of] [AUDITOR NAME], Chartered Accountants (Firm Registration No. [FRN]), as Statutory Auditors of the Company [for the term / on such remuneration as may be decided by the Board].
3. [To appoint a Director in place of [NAME] (DIN: [DIN]), who retires by rotation and, being eligible, offers himself/herself for re-appointment.] — delete if not applicable.

SPECIAL BUSINESS
4. [TITLE OF ITEM]
To consider and, if thought fit, to pass the following resolution as an [Ordinary / Special] Resolution:
"RESOLVED THAT [TEXT OF RESOLUTION]."

By order of the Board
For [COMPANY NAME]

_____________________
[NAME]
[Director / Company Secretary]
DIN / Membership No.: [NUMBER]
Place: [CITY]
Date: [DD/MM/YYYY]

NOTES
1. A member entitled to attend and vote may appoint a proxy to attend and vote instead of himself/herself. The proxy form must reach the registered office within the time stated in the Articles and the Companies Act, 2013.
2. An explanatory statement for the special business is attached.
3. [Add route map / video conferencing instructions as applicable.]

EXPLANATORY STATEMENT
Item No. 4: [Explain the reason for the resolution and any interest of directors or key managerial personnel.]

Check the notice period, mode of sending and any shorter-notice consent with your company secretary before issuing.`,
  },
  {
    slug: "partnership-deed",
    title: "Partnership Deed Format",
    description:
      "Partnership deed format in plain language — firm name, business, capital, profit sharing, duties, banking, retirement and dissolution — ready to adapt for registration.",
    category: "Agreements & Contracts",
    icon: "Users",
    accent: "bg-indigo-50 text-indigo-600 border-indigo-100",
    format: "Editable deed",
    fields: ["Partner names & details", "Firm name & address", "Capital contributions", "Profit-sharing ratio"],
    body: `PARTNERSHIP DEED

This Deed of Partnership is made on [DD/MM/YYYY] at [CITY]

BETWEEN

1. [PARTNER 1 NAME], son/daughter/wife of [NAME], aged [AGE], residing at [ADDRESS], PAN [PAN] (the "First Partner")
2. [PARTNER 2 NAME], son/daughter/wife of [NAME], aged [AGE], residing at [ADDRESS], PAN [PAN] (the "Second Partner")

(together, the "Partners")

The Partners have agreed to carry on business in partnership on the following terms:

1. NAME: The firm will carry on business under the name "[FIRM NAME]".

2. PLACE OF BUSINESS: The principal place of business will be [ADDRESS], or any other place the Partners agree on.

3. BUSINESS: The business of the firm will be [NATURE OF BUSINESS], and any other business the Partners agree on.

4. COMMENCEMENT AND DURATION: The partnership starts on [DD/MM/YYYY] and is [at will / for a period of ___ years].

5. CAPITAL: The Partners will contribute capital as follows:
   First Partner: ₹[AMOUNT]
   Second Partner: ₹[AMOUNT]
   Further capital may be brought in as the Partners agree.

6. PROFIT AND LOSS: Net profits and losses will be shared in the ratio:
   First Partner: [__]%
   Second Partner: [__]%

7. INTEREST AND REMUNERATION: [Interest on capital at ___% per year and/or remuneration to working partners as the Partners agree in writing, within the limits allowed under the income tax law for the relevant year.] — delete if not applicable.

8. BANK ACCOUNT: The firm's bank account(s) will be operated by [ANY ONE / JOINTLY BY] the Partners.

9. BOOKS OF ACCOUNT: Proper books will be kept at the principal place of business, closed on [31 March] each year, and open to every Partner.

10. DUTIES: Each Partner will work for the firm diligently, act in good faith, and not carry on a competing business without the written consent of the other Partners.

11. RETIREMENT: A Partner may retire by giving [NUMBER] months' written notice. The remaining Partners may continue the business.

12. DEATH OR INSOLVENCY: The death, retirement or insolvency of a Partner will not dissolve the firm; the remaining Partners may continue it [with the legal heirs if they agree].

13. DISSOLUTION: On dissolution, assets will be realised, liabilities paid, and any balance shared in the profit-sharing ratio.

14. DISPUTES: Disputes between the Partners will be referred to arbitration by a sole arbitrator agreed by the Partners, under the Arbitration and Conciliation Act, 1996, seated at [CITY].

15. GENERAL: Matters not covered here will be governed by the Indian Partnership Act, 1932.

IN WITNESS WHEREOF the Partners have signed this deed on the date first written above.

_____________________          _____________________
[FIRST PARTNER]                  [SECOND PARTNER]

Witnesses:
1. ____________________
2. ____________________

Print on stamp paper of the value required in your state, and have it reviewed before registration.`,
  },
  {
    slug: "salary-slip",
    title: "Salary Slip Format",
    description:
      "Monthly salary slip / payslip format with earnings, deductions and net pay — clean layout to fill in for each employee every month.",
    category: "HR & Employment",
    icon: "Receipt",
    accent: "bg-blue-50 text-blue-600 border-blue-100",
    format: "Editable payslip",
    fields: ["Employee details", "Month", "Earnings", "Deductions"],
    body: `[COMPANY NAME]
[COMPANY ADDRESS]

SALARY SLIP FOR THE MONTH OF [MONTH YYYY]

Employee Name     : [NAME]            Employee ID     : [ID]
Designation       : [DESIGNATION]     Department      : [DEPARTMENT]
Date of Joining   : [DD/MM/YYYY]      PAN             : [PAN]
Bank A/c No.      : [XXXX1234]        UAN / ESIC No.  : [IF APPLICABLE]
Days in Month     : [__]              Days Paid       : [__]

EARNINGS                     ₹         DEDUCTIONS                    ₹
Basic Salary            [AMOUNT]       Provident Fund           [AMOUNT]
House Rent Allowance    [AMOUNT]       ESIC                     [AMOUNT]
Conveyance / Travel     [AMOUNT]       Professional Tax         [AMOUNT]
Special Allowance       [AMOUNT]       TDS (Income Tax)         [AMOUNT]
Other Allowances        [AMOUNT]       Other Deductions         [AMOUNT]
--------------------------------       --------------------------------
Gross Earnings          [AMOUNT]       Total Deductions         [AMOUNT]

NET PAY: ₹[AMOUNT]
(Rupees [AMOUNT IN WORDS] only)

Payment mode: [Bank transfer] on [DD/MM/YYYY]

This is a computer-generated salary slip and does not need a signature.

Fill only the deductions that apply to the employee.`,
  },
  {
    slug: "employment-agreement",
    title: "Employment Agreement Format",
    description:
      "Employment agreement format covering role, pay, probation, working hours, leave, confidentiality, IP, notice period and termination.",
    category: "HR & Employment",
    icon: "FileSignature",
    accent: "bg-blue-50 text-blue-600 border-blue-100",
    format: "Editable agreement",
    fields: ["Employer & employee details", "Designation", "CTC", "Probation & notice period"],
    body: `EMPLOYMENT AGREEMENT

This Employment Agreement is made on [DD/MM/YYYY] at [CITY]

BETWEEN

[COMPANY NAME], having its registered office at [ADDRESS] (the "Company")

AND

[EMPLOYEE NAME], son/daughter of [NAME], residing at [ADDRESS] (the "Employee")

1. APPOINTMENT: The Company appoints the Employee as [DESIGNATION] from [DD/MM/YYYY], reporting to [MANAGER / DESIGNATION].

2. PLACE OF WORK: [OFFICE ADDRESS / Remote / Hybrid]. The Company may transfer the Employee to another location with reasonable notice.

3. REMUNERATION: The Employee's annual cost to company (CTC) is ₹[AMOUNT], with the break-up in Annexure A. Salary is paid monthly, after deductions required by law.

4. PROBATION: The first [NUMBER] months are probation. The Company may confirm, extend or end employment during or at the end of probation.

5. WORKING HOURS AND LEAVE: Working hours are [HOURS] on [DAYS]. Leave is as per the Company's leave policy.

6. DUTIES: The Employee will perform the duties of the role honestly and diligently, follow Company policies, and not take up other paid work without written consent.

7. CONFIDENTIALITY: The Employee will keep the Company's confidential information secret during and after employment.

8. INTELLECTUAL PROPERTY: All work created by the Employee in the course of employment belongs to the Company.

9. NOTICE AND TERMINATION: After confirmation, either party may end employment by giving [NUMBER] days' written notice or salary in lieu of notice. The Company may terminate immediately for serious misconduct.

10. RETURN OF PROPERTY: On leaving, the Employee will return all Company property, documents and data.

11. GOVERNING LAW: This Agreement is governed by the laws of India. Courts at [CITY] will have jurisdiction.

For [COMPANY NAME]                    Employee

_____________________                 _____________________
[Authorised Signatory]                 [EMPLOYEE NAME]

Annexure A: Salary break-up
[ADD TABLE]`,
  },
];
