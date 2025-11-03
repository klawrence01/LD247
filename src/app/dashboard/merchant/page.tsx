// src/app/dashboard/merchant/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function MerchantDashboardPage() {
  const [businessName, setBusinessName] = useState("Business Name");
  const [city, setCity] = useState("New Haven");
  const [state, setState] = useState("CT");
  const [website, setWebsite] = useState("");
  const [slug, setSlug] = useState("business-name");
  const [logoUrl, setLogoUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [about, setAbout] = useState(
    "Tell customers who you are, what you offer, and why you started."
  );

  const publicPath = `/${city.toLowerCase()}/${slug}`;

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Basic Info</h1>
        <p className="text-sm text-gray-500 mt-1">
          This is what locals see on your public page. Keep it accurate — it helps you get found.
        </p>
      </div>

      <div className="px-6 py-6 max-w-6xl mx-auto flex flex-col gap-6">
        {/* Rating + preview */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3">
            <span className="text-orange-500 text-lg">★★★★★</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">4.5</p>
              <p className="text-xs text-gray-500">(210 reviews)</p>
            </div>
          </div>

          <Link
            href={publicPath}
            className="text-sm bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-900"
          >
            Preview public page
          </Link>

          <p className="text-xs text-gray-400">
            Tip: your city + business name should match how people search for you.
          </p>
        </div>

        {/* Basic profile card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {/* Business name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          {/* Slug / public URL */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Public Page Slug
            </label>
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-sm text-gray-500">
                https://localdeals247.com/{city.toLowerCase()}/
              </span>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              This is what your public link will look like when you share it.
            </p>
          </div>

          {/* City / state */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>

          {/* Website */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website (optional)
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://yourbusiness.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {/* Save */}
          <div className="flex gap-3">
            <button className="bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-orange-700">
              Save Changes
            </button>
            <p className="text-xs text-gray-400 self-center">
              Saved info shows on your public page and in city search.
            </p>
          </div>
        </div>

        {/* Brand & story row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          {/* Brand / images */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold mb-4">Brand & Images</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="https://…"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1">
                We can swap this later for an actual upload button.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image URL
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="https://…"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1">
                Shown at the top of your public page if present.
              </p>
            </div>
          </div>

          {/* About / story */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold mb-4">About / Your Story</h2>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-2">
              This shows on your public page. Tell people what makes you local and different.
            </p>
          </div>
        </div>

        {/* Secondary tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold mb-2">Business Hours</h3>
            <p className="text-xs text-gray-500 mb-3">
              Set open/close times so customers know when to visit.
            </p>
            <Link
              href="/dashboard/merchant/hours"
              className="text-xs text-orange-600 font-semibold hover:underline"
            >
              Go to Hours →
            </Link>
          </div>

          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold mb-2">Deals / Coupons</h3>
            <p className="text-xs text-gray-500 mb-3">
              Add your current promo — it will show up on your public page.
            </p>
            <Link
              href="/dashboard/merchant/coupons"
              className="text-xs text-orange-600 font-semibold hover:underline"
            >
              Manage Coupons →
            </Link>
          </div>

          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold mb-2">Testimonials</h3>
            <p className="text-xs text-gray-500 mb-3">
              Add real quotes from happy customers — not fake reviews.
            </p>
            <Link
              href="/dashboard/merchant/testimonials"
              className="text-xs text-orange-600 font-semibold hover:underline"
            >
              Manage Testimonials →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
