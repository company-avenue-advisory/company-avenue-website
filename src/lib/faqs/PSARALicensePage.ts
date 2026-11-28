// FAQ content for PSARALicensePage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is PSARA and why is it mandatory for security agencies?",
    a: "PSARA stands for the Private Security Agencies (Regulation) Act, 2005. It is a central law that regulates private security agencies across India. Under Section 4 of the Act, no one can start or run a private security agency without a valid license. The license comes from the Controlling Authority of the state, usually the District Licensing Authority or Commissioner of Police. Running an agency without a PSARA license is a crime under Section 25 of the Act. The punishment is a fine of up to ₹25,000 and/or up to one year in prison.",
  },
  {
    q: "What training is required for guards and supervisors under PSARA?",
    a: "Under Schedule I to the PSARA Rules, every private guard must complete at least 100 hours of training before deployment. Supervisors need at least 160 hours. The institute must be recognized by the state government or approved by NSDC (National Skill Development Corporation). Training covers fitness, fire safety, emergencies, first aid, laws, report writing and behaviour. Deploying untrained guards breaks your PSARA license conditions.",
  },
  {
    q: "Is PSARA license state-specific or valid across India?",
    a: "A PSARA license is state-specific. One state's Controlling Authority issues it, and it is valid only in that state. If you operate in several states, you need a separate license in each. For example, a company in Delhi, Maharashtra and Karnataka needs three licenses, one from each state. We help agencies get licenses in multiple states as they grow.",
  },
  {
    q: "Who is eligible to apply for a PSARA license?",
    a: "Under PSARA, these can apply: (1) Indian citizens (foreign nationals usually cannot own or run a security agency); (2) companies, LLPs, firms or individuals with no record of any offence involving moral turpitude; (3) applicants who can show a training tie-up with a recognized institute; (4) people who are not bankrupt or barred by a court. All directors, partners and principal officers must give clean police verification certificates. Anyone convicted of an offence cannot get a PSARA license.",
  },
  {
    q: "What is the fee for PSARA license and how long is it valid?",
    a: "The PSARA license fee differs by state. The government fee is usually ₹5,000 to ₹25,000, based on the state and how many guards you plan to employ. The license is usually valid for 5 years from the date of issue. File for renewal before it expires. An expired license counts as no license and draws the same penalties under Section 25.",
  },
  {
    q: "Can a PSARA-licensed agency deploy armed guards?",
    a: "Yes, but with extra conditions. A PSARA license can cover armed and unarmed guards. For armed guards: (1) the license must allow armed services (this is usually shown on it); (2) each armed guard needs a valid Arms License under the Arms Act, 1959; (3) the agency must keep proper records of all arms, ammunition and where they are used; and (4) you must follow the state's rules on armed guards. Not every state allows armed security under PSARA. Check this for each state you work in.",
  },
  {
    q: "What happens if a guard commits an offence during duty?",
    a: "Under PSARA, the agency is responsible for how its guards act on the job. If a guard commits an offence on duty, such as assault, theft or negligence: (1) the agency may be held liable along with the guard; (2) the Controlling Authority can suspend or cancel the license; and (3) the client may sue the agency for damages. So full liability insurance, proper training records and a background check on every guard are essential, not optional.",
  },
  {
    q: "What records must a PSARA-licensed agency maintain?",
    a: "Under PSARA Rules, every licensed agency must keep: (1) registers of all guards and supervisors; (2) records showing the mandatory training was completed; (3) police verification for each guard; (4) arms and ammunition records (for armed agencies); (5) records of which guard is at which site; (6) client contracts; and (7) records of disciplinary action or complaints. You must show these to the Controlling Authority when asked. Police and the licensing authority also inspect them from time to time.",
  },
];
