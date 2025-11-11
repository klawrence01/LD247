// src/app/admin/static-pages/page.tsx
"use client";

import Link from "next/link";

const STATIC_PAGES = [
  {
    title: "About Us",
    slug: "about-us",
    description: "Tell visitors who LocalDeals247 is and why it exists.",
  },
  {
    title: "Contact Us",
    slug: "contact-us",
    description: "Contact form / support info for vendors and users.",
  },
  {
    title: "How It Works",
    slug: "how-it-works",
    description: "Explains daily deals, sign-in requirement, and city pages.",
  },
  {
    title: "Terms & Conditions",
    slug: "terms",
    description: "Legal usage, vendor requirements, service rules.",
  },
  {
    title: "Privacy Policy",
    slug: "privacy-policy",
    description: "How we collect, store, and use user and vendor data.",
  },
  {
    title: "Sales / Merchant Landing",
    slug: "sales-landing",
    description: "Warm page for merchants when no rep or no deals in that city.",
  },
];

export default function StaticPagesAdmin() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Static pages</h1>
          <p className="text-sm text-white/50 mt-2">
            Manage the core public pages for LocalDeals247 — about, legal, contact,
            and onboarding explainer pages.
          </p>
        </div>
        <Link
          href="/admin/static-pages/new"
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg"
        >
          + New static page
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {STATIC_PAGES.map((page) => (
          <div
            key={page.slug}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-white font-semibold text-sm">{page.title}</h2>
              <span className="text-[10px] text-white/30">{page.slug}</span>
            </div>
            <p className="text-xs text-white/50">{page.description}</p>
            <div className="flex gap-2 mt-auto">
              <Link
                href={`/admin/static-pages/${page.slug}`}
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-2 rounded-lg"
              >
                Edit
              </Link>
              <button
                type="button"
                className="text-white/30 hover:text-white text-xs px-3 py-2 rounded-lg border border-white/5"
                disabled
              >
                Preview (soon)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
