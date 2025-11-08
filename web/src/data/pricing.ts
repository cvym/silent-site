export type PackageTier = "source" | "host-monthly" | "host-lifetime" | "bundle";

export interface PricingOption {
  id: PackageTier;
  title: string;
  subtitle: string;
  priceLabel: string;
  description: string[];
  highlight?: boolean;
}

export const pricingOptions: PricingOption[] = [
  {
    id: "source",
    title: "Source Code",
    subtitle: "Self-host and customize freely",
    priceLabel: "$10 one-time",
    description: [
      "Full discord bot source",
      "Documentation & setup guide",
      "1 update pass included"
    ]
  },
  {
    id: "host-monthly",
    title: "Hosted Monthly",
    subtitle: "Managed uptime, billed monthly",
    priceLabel: "$3/mo",
    description: [
      "24/7 hosting & monitoring",
      "Automatic restarts & patching",
      "Support via Discord within 24h"
    ]
  },
  {
    id: "host-lifetime",
    title: "Hosted Lifetime",
    subtitle: "One-time fee, permanent slot",
    priceLabel: "$30 one-time",
    description: [
      "Managed cloud resources",
      "Priority incident response",
      "Best for long-running projects"
    ]
  },
  {
    id: "bundle",
    title: "Bundle",
    subtitle: "Source + lifetime hosting",
    priceLabel: "$38 one-time",
    description: [
      "Everything from source & lifetime hosting",
      "Fast-track delivery",
      "Ideal for hands-off operation"
    ],
    highlight: true
  }
];

