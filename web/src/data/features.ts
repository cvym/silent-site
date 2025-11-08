export interface Feature {
  title: string;
  description: string;
  tags: string[];
}

export const featureList: Feature[] = [
  {
    title: "Fully Tailored Bots",
    description:
      "Moderation, economy systems, ticketing, music, AI assistants and anything bespoke: every bot is built to match your workflow.",
    tags: ["Custom logic", "Scalable", "Secure"]
  },
  {
    title: "Analytics & Automation",
    description:
      "Dashboards, activity tracking, leveling systems, webhook automations and API integrations (Trello, GitHub, Notion, Google, payments).",
    tags: ["Dashboards", "Webhooks", "Integrations"]
  },
  {
    title: "Mini-games & Engagement",
    description:
      "Reward loops, XP, leaderboards, inventories, unique mini-games and smart reminders to keep communities active.",
    tags: ["Leveling", "Rewards", "Engagement"]
  },
  {
    title: "Production-Ready Delivery",
    description:
      "Source code, hosting options, monitoring, incident response, documentation and a clear hand-off process.",
    tags: ["Docs", "Monitoring", "Support"]
  }
];

