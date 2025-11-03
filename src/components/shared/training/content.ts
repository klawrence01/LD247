// Simple content map for training modules.
// Edit freely: add bullets, new modules, etc.

export type TrainingModule = {
  slug: string
  title: string
  intro: string
  sections: { title: string; bullets: string[] }[]
}

export const trainingModules: TrainingModule[] = [
  {
    slug: "setup",
    title: "Account & Profile Setup",
    intro:
      "Get your merchant profile ready: logo, banner, description, hours, and contact info.",
    sections: [
      {
        title: "Profile Basics",
        bullets: [
          "Upload logo (square works best, 512×512+).",
          "Add banner image (wide, 1600×600 recommended).",
          "Write a clear, benefit-focused description.",
          "Set business hours and phone number.",
          "Add social links (optional).",
        ],
      },
      {
        title: "Quality Tips",
        bullets: [
          "Keep wording concise; avoid ALL CAPS.",
          "Use 1–2 great photos over 10 average ones.",
          "Make sure your phone number accepts calls & texts.",
        ],
      },
    ],
  },
  {
    slug: "deals",
    title: "Create Deals & Manage Slots",
    intro:
      "Publish compelling deals and manage your weekly visibility calendar.",
    sections: [
      {
        title: "Create a Deal",
        bullets: [
          "Choose a clear title (e.g., “Buy 1 Get 1 Free Pizza Slices”).",
          "Pick discount type and set Start/End dates.",
          "Set a limit per person if needed.",
          "Use the Preview button to confirm layout.",
        ],
      },
      {
        title: "Slots & Defaults",
        bullets: [
          "Book slots up to 30 days ahead (public window shows 7 days).",
          "Set a ‘Default Slot Deal’ so no day runs empty.",
          "Mark deals as Out of Stock if you run out.",
          "Enable ‘Notify Me When Deal Returns’.",
        ],
      },
    ],
  },
  {
    slug: "analytics",
    title: "Analytics & Performance",
    intro:
      "Understand what’s working: views, redemptions, ratings, and traffic sources.",
    sections: [
      {
        title: "Key Metrics",
        bullets: [
          "Views → how many people saw your deal.",
          "Redemptions → how many used it.",
          "Conversion Rate → redemptions / views.",
        ],
      },
      {
        title: "Improve Results",
        bullets: [
          "Tighten the headline and photo.",
          "Try sharper discounts midweek.",
          "Use ‘Boost Visibility’ during slow periods.",
        ],
      },
    ],
  },
  {
    slug: "testimonials",
    title: "Testimonials & Ratings",
    intro:
      "Collect social proof automatically and showcase wins on your page.",
    sections: [
      {
        title: "Collection",
        bullets: [
          "Automated email goes out 1 day after visit.",
          "You can also share a review link in messages.",
        ],
      },
      {
        title: "Display",
        bullets: [
          "Approve & pin your best testimonials.",
          "Reply to feedback to show you care.",
        ],
      },
    ],
  },
  {
    slug: "pricing",
    title: "Pricing, Billing & Upgrades",
    intro:
      "Understand your plan, city pricing, and optional upgrades for visibility.",
    sections: [
      {
        title: "Plans",
        bullets: [
          "Intro Plan: $49/mo (promo) → Standard: $79/mo.",
          "City pricing may differ (set by LD247).",
        ],
      },
      {
        title: "Upgrades",
        bullets: [
          "Extra slots (packs of 10).",
          "Boost Visibility (7-day).",
          "City Page Ad Placement.",
        ],
      },
    ],
  },
  {
    slug: "alerts",
    title: "Followers & Alerts",
    intro:
      "Let customers follow your business and get notified when you post new deals.",
    sections: [
      {
        title: "Followers",
        bullets: [
          "Users can follow your business to get alerts.",
          "More followers = faster traction for new deals.",
        ],
      },
      {
        title: "Notify Me",
        bullets: [
          "When a deal is Out of Stock, users can request alerts.",
          "They get notified automatically when it returns.",
        ],
      },
    ],
  },
]
