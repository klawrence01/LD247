export type TrainingModule = {
  slug: string;
  title: string;
  summary: string;
  videoUrl?: string;  // placeholder, swap with real link later
  steps: string[];
  related?: { label: string; href: string }[];
};

export const TRAINING_MODULES: TrainingModule[] = [
  {
    slug: "profile-setup",
    title: "Setting Up Your Profile",
    summary: "Add your logo, store info, and contact details so customers recognize you.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    steps: [
      "Go to Vendor → Profile.",
      "Upload your logo (PNG/JPG) and cover image.",
      "Fill out business name, short description, address, and hours.",
      "Click Save — your public merchant page will update instantly."
    ],
    related: [
      { label: "Open Merchant Preview", href: "/vendor/preview" }
    ],
  },
  {
    slug: "create-deal",
    title: "Create Your First Deal",
    summary: "Publish a clear, time-bound offer that’s easy to understand and redeem.",
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    steps: [
      "Go to Vendor → Deals → New Deal.",
      "Write a short, specific title (e.g., “Large Coffee — $1 Weekdays”).",
      "Set start/end dates and redemption rules (one per customer, etc.).",
      "Publish and confirm it appears on your city page."
    ],
    related: [
      { label: "New Deal", href: "/vendor/deals/new" }
    ],
  },
  {
    slug: "messages-center",
    title: "Using the Messages Center",
    summary: "Invite followers, request reviews, and reply to customers — all in one place.",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    steps: [
      "Open Vendor → Messages.",
      "Use the Followers tab to broadcast or message individuals.",
      "After redemptions are verified, go to System → Pending Review Requests.",
      "Copy the review link and Mark Requested."
    ],
    related: [
      { label: "Messages", href: "/vendor/messages" }
    ],
  },
  {
    slug: "reviews-testimonials",
    title: "Reviews & Testimonials",
    summary: "Turn great reviews into public testimonials with one click.",
    videoUrl: "https://www.youtube.com/embed/2Vv-BfVoq4g",
    steps: [
      "Open Vendor → Messages → Reviews.",
      "Reply to new reviews within 48 hours.",
      "Click “Post to Merchant Page” on the best reviews.",
      "Manage what’s live in the Testimonials tab."
    ],
    related: [
      { label: "Messages → Reviews", href: "/vendor/messages" }
    ],
  },
  {
    slug: "redeem-tracking",
    title: "Marking Redemptions",
    summary: "Record redemptions and (optionally) verify with the customer.",
    videoUrl: "https://www.youtube.com/embed/3GwjfUFyY6M",
    steps: [
      "Go to Vendor → Mark Redeemed.",
      "Enter deal title, code, and optional customer info.",
      "Ask the customer to confirm from their link (or use Toggle Verify in Performance).",
      "Queue a review request once verified."
    ],
    related: [
      { label: "Mark Redeemed", href: "/vendor/redeem" },
      { label: "Performance", href: "/vendor/performance" }
    ],
  },
  {
    slug: "performance",
    title: "Performance Dashboard",
    summary: "See totals, verification rate, and unique redeemers update in real time.",
    videoUrl: "https://www.youtube.com/embed/l9PxOanFjxQ",
    steps: [
      "Open Vendor → Performance.",
      "Track Total Redemptions, Verified Redemptions, and Verification Rate.",
      "Use Toggle Verify to simulate customer confirmation (demo).",
      "Click Request Review to push items into Messages → System."
    ],
    related: [
      { label: "Performance", href: "/vendor/performance" }
    ],
  },
];
