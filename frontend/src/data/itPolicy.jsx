// Content for the IT Policy walkthrough — a professional-but-friendly rewrite of
// the Ninja Van IT Policy deck. Each step renders through StepShell; an optional
// `interactive` key names a component from components/interactive/.

export const SECTIONS = [
  {
    id: "accounts",
    title: "Your account & passwords",
    blurb: "Signing in, keeping your password strong, and keeping your account alive.",
  },
  {
    id: "equipment",
    title: "Using company equipment",
    blurb: "What company devices and data are for, and who is responsible for them.",
  },
  {
    id: "liability",
    title: "Damage & liability",
    blurb: "How damage is assessed and when costs can be recovered.",
  },
  {
    id: "incidents",
    title: "Incident management",
    blurb: "Reporting security events, faults, and lost devices.",
  },
];

export const STEPS = [
  // ---- Section A — Your account & passwords ----
  {
    id: "a1",
    section: "accounts",
    title: "Your first sign-in",
    lead: "You'll get a temporary password for your first login. It's single-use and expires the moment you sign in.",
    points: [
      "Sign in with the temporary password, then set your own password immediately when prompted.",
      "Pick something you haven't used elsewhere — this is the key to all your Ninja Van access.",
    ],
  },
  {
    id: "a2",
    section: "accounts",
    title: "Forgotten your password?",
    lead: "It happens to everyone. Don't keep guessing — a few wrong attempts will lock the account.",
    points: [
      "Raise a password assistance request with the IT ServiceDesk.",
      "IT verifies your identity and resets it for you.",
    ],
  },
  {
    id: "a3",
    section: "accounts",
    title: "Passwords change once a year",
    lead: "Your password is refreshed annually.",
    points: [
      "You'll be prompted when it's due — choose a new one you haven't used before.",
      "Regular changes stop an old, possibly-leaked password from staying useful.",
    ],
  },
  {
    id: "a4",
    section: "accounts",
    title: "Locked out",
    lead: "After several failed sign-in attempts, the system suspends the account to protect it.",
    points: [
      "Re-verify through the Company SSO portal — your Ninja Van Google / Gmail login, or",
      "Contact the IT ServiceDesk to unlock it.",
    ],
  },
  {
    id: "a5",
    section: "accounts",
    title: "Keep your account active",
    lead: "Accounts that go unused are wound down automatically.",
    points: [
      "No activity for 30 days: the account is temporarily suspended.",
      "No activity for 90 days: the account is fully offboarded from our systems.",
      "A single sign-in resets the clock — log in periodically if you're away.",
    ],
    interactive: "InactivityTimeline",
  },
  {
    id: "a6",
    section: "accounts",
    title: "Never share your password",
    lead: "Your login is yours alone — treat it like a toothbrush, not for sharing.",
    points: [
      "Sharing your password is not allowed, for any reason.",
      "You are accountable for everything done under your account.",
    ],
  },
  {
    id: "a7",
    section: "accounts",
    title: "The Golden Rules: access & passwords",
    lead: "Two habits keep company data secure: least-privilege access and strong passwords.",
    points: [
      "Need-to-know access: you get only the systems and files your role actually requires. Ask if something's missing — don't borrow someone else's access.",
      "Password recipe: at least 8 characters, with an uppercase letter, a lowercase letter, a number, and a special character (! @ # $ %). Longer is stronger.",
    ],
    callout: {
      tone: "info",
      text: "Try it below. The checklist updates as you type — nothing you type here is saved or sent anywhere.",
    },
    interactive: "PasswordChecker",
  },

  // ---- Section B — Using company equipment ----
  {
    id: "b1",
    section: "equipment",
    title: "Company resources are for work",
    lead: "Laptops, phones, accounts and networks are provided for legitimate business use.",
    points: [
      "Use good judgement and keep work tools focused on work.",
      "Treat Ninja Van's gear with the respect and care it deserves.",
    ],
  },
  {
    id: "b2",
    section: "equipment",
    title: "You're responsible for your device",
    lead: "You're accountable for all activity that happens on the equipment assigned to you.",
    points: [
      "Activity on your device is attributed to you.",
      "Devices, hardware and networks remain Ninja Van property.",
      "Company information stored on them belongs to Ninja Van, regardless of the device.",
    ],
  },
  {
    id: "b3",
    section: "equipment",
    title: "Compliance & audits",
    lead: "Access to proprietary information is limited to what your job needs.",
    points: [
      "Only access, use or share information to the extent your role requires.",
      "Ninja Van may periodically monitor and audit company resources to confirm they're used in line with this policy.",
    ],
  },
  {
    id: "b4",
    section: "equipment",
    title: "Safeguard your equipment",
    lead: "Look after the kit you've been given.",
    points: [
      "Keep devices physically secure; don't leave them unattended in public.",
      "Neglecting this duty can make you accountable for resulting loss or damage.",
    ],
  },

  // ---- Section C — Damage & liability ----
  {
    id: "c1",
    section: "liability",
    title: "How incidents are assessed",
    lead: "If something happens to your equipment, it's reviewed fairly before any cost is discussed.",
    points: [
      "Group IT and your division assess the situation together.",
      "The question is whether there was genuine user fault or simply bad luck.",
      "Costs are recovered only where negligence is clearly established — for lost, stolen or badly damaged assets in your custody.",
    ],
  },
  {
    id: "c2",
    section: "liability",
    title: "Liquid damage counts as negligence",
    lead: "Spills are treated as user negligence.",
    points: [
      "All physical and water damage is deemed user negligence.",
      "Keep drinks well away from your laptop and keyboard.",
    ],
    callout: {
      tone: "warn",
      text: "A coffee next to the keyboard is a costly risk — give it some distance.",
    },
  },
  {
    id: "c3",
    section: "liability",
    title: "Genuine hardware faults are covered",
    lead: "If your device fails on its own, you're covered — it shouldn't slow you down.",
    points: [
      "Report the fault or failure to the IT ServiceDesk.",
      "IT arranges a prompt repair or replacement.",
    ],
  },

  // ---- Section D — Incident management ----
  {
    id: "d1",
    section: "incidents",
    title: "Report security events immediately",
    lead: "If a device is lost or stolen, or you suspect unauthorised access to company data, report it straight away.",
    points: [
      "Reporting fast limits potential leaks and protects customer data.",
      "It's always better to raise it early than to wait.",
    ],
  },
  {
    id: "d2",
    section: "incidents",
    title: "See something, say something",
    lead: "Know where each type of issue goes.",
    points: [
      "Cybersecurity incident or suspicious activity on your device: IT ServiceDesk.",
      "Phishing or suspicious email: don't interact with it — report it as spam to Information Security.",
      "Hardware faults, screen issues or failures: IT ServiceDesk.",
    ],
  },
  {
    id: "d3",
    section: "incidents",
    title: "Lost device: step by step",
    lead: "If you lose a portable company device — or a personal (BYOD) device with company email — follow these four steps.",
    points: [
      "Report to the IT ServiceDesk within 12 hours.",
      "IT remotely wipes company data and email from the device.",
      "File a police report and complete the ServiceDesk incident report within 48 hours.",
    ],
    interactive: "LostDeviceStepper",
  },
  {
    id: "d4",
    section: "incidents",
    title: "Incident reporting matrix",
    lead: "A quick reference for who to contact and what to do. Pick a scenario to see the details.",
    points: [],
    interactive: "IncidentMatrix",
  },
];

export const RECAP = [
  "Change your temporary password on first sign-in, and never share it.",
  "Use 8+ characters with an uppercase, a lowercase, a number and a special character.",
  "Sign in at least every 30 days to keep your account active.",
  "Company equipment and data stay Ninja Van property — look after them.",
  "Keep drinks away from your laptop; spills count as negligence.",
  "Report a lost device to the IT ServiceDesk within 12 hours; police report within 48.",
  "Phishing goes to Information Security; faults and security incidents go to the IT ServiceDesk.",
];

// ---- Data for the interactive elements ----

export const INACTIVITY_MARKERS = [
  {
    day: 0,
    label: "Active",
    heading: "Account active",
    text: "You're signed in and using your account normally. The inactivity clock is at zero.",
  },
  {
    day: 30,
    label: "30 days",
    heading: "Temporarily suspended",
    text: "After 30 days with no activity, your account is temporarily suspended to prevent idle-access risk. Signing in — re-verifying your identity if asked — restores it.",
  },
  {
    day: 90,
    label: "90 days",
    heading: "Fully offboarded",
    text: "After 90 days with no activity, your account is fully offboarded from Ninja Van systems and has to be re-provisioned from scratch.",
  },
];

export const LOST_DEVICE_STEPS = [
  {
    n: 1,
    title: "The loss",
    text: "You lose a portable company IT asset, or a personal (BYOD) mobile device that has company email on it.",
  },
  {
    n: 2,
    title: "Report within 12 hours",
    text: "Report the loss to the IT ServiceDesk immediately — within 12 hours of the incident.",
    deadline: "12 hours",
  },
  {
    n: 3,
    title: "Remote wipe",
    text: "IT remotely wipes all company data and email from the device to prevent a privacy leak.",
  },
  {
    n: 4,
    title: "Police report within 48 hours",
    text: "File a police report and complete the ServiceDesk incident report attachment — within 48 hours.",
    deadline: "48 hours",
  },
];

export const INCIDENT_MATRIX = [
  {
    id: "cyber",
    scenario: "Cybersecurity incident",
    contact: "IT ServiceDesk",
    action: "Report suspicious or malicious activity on company equipment straight away.",
  },
  {
    id: "phish",
    scenario: "Phishing / suspicious email",
    contact: "Information Security",
    action: "Don't click or reply — report the email as spam in your mail client.",
  },
  {
    id: "hardware",
    scenario: "Hardware fault or failure",
    contact: "IT ServiceDesk",
    action: "Open a standard fault ticket for a repair or replacement.",
  },
  {
    id: "loss",
    scenario: "Laptop or mobile loss",
    contact: "IT ServiceDesk + Police",
    action: "Report to IT within 12 hours; file a police report within 48 hours.",
  },
];

export function sectionById(id) {
  return SECTIONS.find((s) => s.id === id) || null;
}

export function sectionIndex(id) {
  return SECTIONS.findIndex((s) => s.id === id);
}
