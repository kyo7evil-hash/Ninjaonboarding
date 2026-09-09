// Registry of onboarding modules shown on the hub. Adding a new module is a new
// entry here plus a content file (see data/itPolicy.jsx) and a route in App.jsx.

export const MODULES = [
  {
    id: "it-policy",
    title: "IT Policy",
    blurb:
      "Your accounts and passwords, using company equipment, damage liability, and how to report an incident.",
    minutes: 10,
    status: "available",
    accent: "#E1231A",
    icon: "shield",
  },
  {
    id: "company-culture",
    title: "Company & Culture",
    blurb: "Who we are, how we work, and what we expect of each other.",
    minutes: 8,
    status: "coming-soon",
    accent: "#6B7280",
    icon: "compass",
  },
  {
    id: "tools-accounts",
    title: "Tools & Accounts",
    blurb: "The core systems you'll use day to day and how to get access.",
    minutes: 6,
    status: "coming-soon",
    accent: "#6B7280",
    icon: "grid",
  },
  {
    id: "hr-benefits",
    title: "HR & Benefits",
    blurb: "Leave, payroll, benefits, and where to go with questions.",
    minutes: 7,
    status: "coming-soon",
    accent: "#6B7280",
    icon: "heart",
  },
];

export function getModule(id) {
  return MODULES.find((m) => m.id === id) || null;
}
