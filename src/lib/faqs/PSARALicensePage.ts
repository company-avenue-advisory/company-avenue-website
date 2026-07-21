// FAQ content for PSARALicensePage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is PSARA and why is it mandatory for security agencies?",
    a: "PSARA stands for the Private Security Agencies (Regulation) Act, 2005. It is a central legislation enacted to regulate the functioning of private security agencies across India. Under Section 4 of the Act, no person can carry on or commence the business of a private security agency without a valid license granted by the Controlling Authority (typically the District Licensing Authority or Commissioner of Police) of the respective state. Operating a security agency without PSARA license is a criminal offence punishable under Section 25 of the Act with a fine of up to ₹25,000 and/or imprisonment up to one year.",
  },
  {
    q: "What training is required for guards and supervisors under PSARA?",
    a: "Under Schedule I to the PSARA Rules, all private security guards must undergo mandatory training of at least 100 hours before deployment. Supervisors must undergo at least 160 hours of training. The training must be conducted by a training institute recognized by the state government or approved by NSDC (National Skill Development Corporation). The training covers: physical fitness, fire safety, emergency handling, first aid, laws and regulations, report writing, and behavioral skills. Failure to deploy trained guards is a violation of the PSARA license conditions.",
  },
  {
    q: "Is PSARA license state-specific or valid across India?",
    a: "PSARA license is state-specific — it is issued by the Controlling Authority of a particular state and is valid only for operations within that state. A security agency that operates in multiple states must obtain a separate PSARA license from the licensing authority in each state. For example, a security company operating in Delhi, Maharashtra, and Karnataka would need three separate PSARA licenses — one from each state&apos;s licensing authority. We assist with multi-state PSARA licensing for agencies expanding across India.",
  },
  {
    q: "Who is eligible to apply for a PSARA license?",
    a: "Under PSARA, the following persons are eligible to apply: (1) Indian citizens (foreign nationals are generally not permitted to own or operate private security agencies); (2) Companies, LLPs, firms, or individuals with no criminal record for any offence involving moral turpitude; (3) Applicants who can demonstrate they have a training arrangement with a recognized institute; (4) Persons who are not bankrupt or under any court-ordered disqualification. All directors, partners, and principal officers must submit clean police verification certificates. Persons convicted of offences are disqualified from obtaining a PSARA license.",
  },
  {
    q: "What is the fee for PSARA license and how long is it valid?",
    a: "The fee for PSARA license varies by state. Typically, the government fee ranges from ₹5,000 to ₹25,000 depending on the state and the number of guards the agency proposes to employ. The PSARA license is typically valid for 5 years from the date of issuance. Renewal application must be filed before the expiry date. Operating with an expired PSARA license is treated the same as operating without a license and attracts the same penalties under Section 25.",
  },
  {
    q: "Can a PSARA-licensed agency deploy armed guards?",
    a: "Yes, but with additional requirements. A PSARA license covers both unarmed and armed security deployment, but for armed deployment: (1) the license must specifically allow armed services (this is typically indicated on the license); (2) each armed guard must possess a valid Arms License under the Arms Act, 1959; (3) the security agency must maintain proper records of all arms, ammunition, and their deployment; and (4) state-specific rules on armed guards must be complied with. Not all states grant armed security permissions in PSARA licenses — this must be verified for each state of operation.",
  },
  {
    q: "What happens if a guard commits an offence during duty?",
    a: "Under PSARA, the private security agency is vicariously responsible for the conduct of its security personnel during the course of employment. If a guard commits an offence (e.g., assault, theft, or negligence) while on duty: (1) the agency may be held liable along with the individual; (2) the Controlling Authority can suspend or cancel the PSARA license; and (3) the agency may face civil liability to the client for damages. This is why comprehensive liability insurance, proper training documentation, and background verification of every guard are not just good practices but essential risk management for security agencies.",
  },
  {
    q: "What records must a PSARA-licensed agency maintain?",
    a: "Under PSARA Rules, every licensed security agency must maintain: (1) registers of all security guards and supervisors employed; (2) training records showing completion of mandatory training hours; (3) police verification records for each guard; (4) records of arms and ammunition (for armed agencies); (5) deployment records showing which guards are deployed at which site; (6) client contracts; and (7) records of any disciplinary actions or complaints. These records must be produced on demand before the Controlling Authority and are subject to periodic inspection by police and the licensing authority.",
  },
];
