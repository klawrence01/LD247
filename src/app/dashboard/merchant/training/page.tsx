"use client";

import Link from "next/link";

const trainingModules = [
  {
    id: "profile",
    title: "1. Set Up Your Business Profile",
    description:
      "Add your logo, hours, phone, and location so you always show correctly on the city page and coupon list.",
    actionLabel: "Open Profile Setup",
    actionHref: "/dashboard/merchant", // your main overview page
  },
  {
    id: "deals",
    title: "2. Create Your First Deal",
    description:
      "How to write offers (BOGO, 50% off, New Client Special) that stand out and get saved by locals.",
    actionLabel: "Create / Manage Deals",
    actionHref: "/dashboard/merchant/coupons",
  },
  {
    id: "calendar",
    title: "3. Use the Deal Calendar",
    description:
      "Schedule deals for slow days and weekends. Never let your page go empty again.",
    actionLabel: "View Deal Calendar",
    actionHref: "/dashboard/merchant/coupons/calendar",
  },
  {
    id: "messaging",
    title: "4. Send Notes to Followers",
    description:
      "Use Messaging Center to tell people about new promos, events, and reminders.",
    actionLabel: "Go to Messaging Center",
    actionHref: "/dashboard/merchant/messaging",
  },
  {
    id: "testimonials",
    title: "5. Collect Testimonials",
    description:
      "Ask customers to leave a quick note after their visit. Social proof = more redemptions.",
    actionLabel: "Manage Testimonials",
    actionHref: "/dashboard/merchant/testimonials",
  },
  {
    id: "surveys",
    title: "6. Run a Quick Survey",
    description:
      "Ask a single question, like “What day do you visit us most?” then use the answer to post better deals.",
    actionLabel: "Open Surveys",
    actionHref: "/dashboard/merchant/surveys",
  },
  {
    id: "analytics",
    title: "7. Read Your Analytics",
    description:
      "See which offers locals liked most and which source (city page, coupon list) is sending the traffic.",
    actionLabel: "View Analytics",
    actionHref: "/dashboard/merchant/analytics",
  },
  {
    id: "advertising",
    title: "8. Get Seen More",
    description:
      "Boost a deal, request city spotlight, or talk to your rep about the $99 managed plan.",
    actionLabel: "Open Advertising",
    actionHref: "/dashboard/merchant/advertising",
  },
];

export default function TrainingPage() {
  return (
    <main className="p-6 text-gray-900">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight mb-1">
            Training & Quick Start
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
            Learn how to use Local Deals 24/7 like a pro. Start at the top and
            work your way down — each step builds on the one before it.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/merchant/trial"
            className="bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-orange-700"
          >
            Trial / Onboarding
          </Link>
          <Link
            href="/dashboard/merchant/messaging"
            className="border border-gray-300 text-gray-800 text-sm font-semibold px-4 py-2 rounded-md bg-white hover:bg-gray-50"
          >
            Messaging Center
          </Link>
        </div>
      </header>

      {/* Progress hint */}
      <div className="bg-white border border-orange-100 rounded-xl p-4 mb-8 shadow-sm">
        <p className="text-sm text-gray-800">
          📋 <span className="font-semibold">Suggested order:</span> Profile →
          Deals → Calendar → Messaging → Testimonials → Analytics → Advertising.
          Do those 7 and you’re ahead of 90% of small businesses.
        </p>
      </div>

      {/* Training cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
        {trainingModules.map((mod) => (
          <article
            key={mod.id}
            className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between shadow-sm"
          >
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-1">
                {mod.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {mod.description}
              </p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Link
                href={mod.actionHref}
                className="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                {mod.actionLabel}
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </Link>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">
                {mod.id === "profile"
                  ? "1"
                  : mod.id === "deals"
                  ? "2"
                  : mod.id === "calendar"
                  ? "3"
                  : mod.id === "messaging"
                  ? "4"
                  : mod.id === "testimonials"
                  ? "5"
                  : mod.id === "surveys"
                  ? "6"
                  : mod.id === "analytics"
                  ? "7"
                  : "8"}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* Extra resources */}
      <section className="bg-white border border-gray-200 rounded-xl p-5 mb-10 shadow-sm">
        <h2 className="text-lg font-bold mb-2 text-gray-900">Extra Help</h2>
        <p className="text-sm text-gray-600 mb-4">
          If you were onboarded by a local LD247 salesperson, they can record a
          short video for you or even set up your first 8 deals.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/merchant/messaging/new"
            className="bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-black"
          >
            Ask My Rep for Help
          </Link>
          <Link
            href="/dashboard/merchant/advertising"
            className="text-sm text-gray-700 hover:underline"
          >
            I want the managed ($99) plan →
          </Link>
        </div>
      </section>

      {/* Footer tip */}
      <footer className="text-[13px] text-gray-500 leading-snug border-t border-gray-200 pt-4">
        Keep your page from ever looking empty. Even one basic offer, scheduled
        every week, is better than silence.
      </footer>
    </main>
  );
}
