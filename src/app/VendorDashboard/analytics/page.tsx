// C:\Users\Owner\ld247\src\app\vendor\analytics\page.tsx
"use client";

import React from "react";

type DealRow = {
  name: string;
  views: number;
  redemptions: number;
};

const star = "★";

function pct(n: number) {
  return `${(n * 100).toFixed(0)}%`;
}

export default function VendorAnalyticsPage() {
  // ---- Fake demo data (no Supabase today) ----
  const kpis = [
    { label: "Total Views (7d)", value: "12,487" },
    { label: "Coupon Redemptions (7d)", value: "1,046" },
    { label: "Avg Rating", value: "4.7 / 5" },
    { label: "View → Redeem Rate", value: "8.4%" },
  ];

  const deals: DealRow[] = [
    { name: "2 Slices & Soda – $5", views: 2480, redemptions: 220 },
    { name: "Chiro Adjustment – $29", views: 1895, redemptions: 173 },
    { name: "Large Coffee – $1", views: 3120, redemptions: 288 },
    { name: "Wash & Wax – $15 Off", views: 1544, redemptions: 102 },
    { name: "Matinee Tickets – $6", views: 1448, redemptions: 108 },
  ];

  const traffic = [
    { label: "City Page", value: 58 },
    { label: "Coupon List", value: 22 },
    { label: "Direct / QR", value: 12 },
    { label: "Shared Links", value: 8 },
  ];

  const testimonials = [
    {
      name: "A. Rivera",
      rating: 5,
      text:
        "Deal was exactly as listed. Staff was friendly — will be back next week!",
    },
    {
      name: "Marcus P.",
      rating: 5,
      text: "Super easy to redeem. This platform is clean and legit.",
    },
    {
      name: "J. Chen",
      rating: 4,
      text: "Great value. Would love to see more weekday lunch specials.",
    },
  ];

  const totalViews = deals.reduce((s, d) => s + d.views, 0);
  const maxTraffic = Math.max(...traffic.map((t) => t.value));

  return (
    <div className="p-6 md:p-8">
      {/* Page Title */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Analytics
          </h1>
          <p className="text-sm text-gray-600">
            Snapshot of your performance. (Demo data)
          </p>
        </div>

        {/* Date Chips (non-functional placeholders) */}
        <div className="flex gap-2">
          {["Today", "7 Days", "30 Days"].map((d, i) => (
            <button
              key={d}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                i === 1
                  ? "bg-orange-500 text-white border-orange-500"
                  : "hover:bg-gray-100"
              }`}
              type="button"
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border shadow-sm p-4 bg-white"
          >
            <div className="text-gray-500 text-sm">{k.label}</div>
            <div className="text-2xl md:text-3xl font-semibold mt-1">
              {k.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Deal Performance (Table) */}
        <div className="xl:col-span-2 rounded-2xl border shadow-sm bg-white">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold">Deal Performance</h2>
            <span className="text-xs text-gray-500">
              Views, redemptions, and rates
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="px-4 py-3 font-medium">Deal</th>
                  <th className="px-4 py-3 font-medium">Views</th>
                  <th className="px-4 py-3 font-medium">Redemptions</th>
                  <th className="px-4 py-3 font-medium">Rate</th>
                  <th className="px-4 py-3 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((d, i) => {
                  const rate = d.redemptions / d.views;
                  return (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-3">{d.name}</td>
                      <td className="px-4 py-3">{d.views.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        {d.redemptions.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{pct(rate)}</td>
                      {/* Simple bar trend (no external chart lib) */}
                      <td className="px-4 py-3">
                        <div className="h-2 w-40 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange-500"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(8, (d.views / totalViews) * 100 * 3)
                              ).toFixed(0)}%`,
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="rounded-2xl border shadow-sm bg-white">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Traffic Sources</h2>
            <p className="text-xs text-gray-500">
              Where deal views came from
            </p>
          </div>
          <div className="p-4 space-y-4">
            {traffic.map((t) => (
              <div key={t.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t.label}</span>
                  <span>{t.value}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500"
                    style={{
                      width: `${(t.value / maxTraffic) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-3 text-xs text-gray-500">
              Tip: Boost City Page placement with frequent, high-quality deals.
            </div>
          </div>
        </div>

        {/* Testimonials & Rating */}
        <div className="rounded-2xl border shadow-sm bg-white xl:col-span-1">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Recent Testimonials</h2>
            <p className="text-xs text-gray-500">
              Highlights from the last week
            </p>
          </div>
          <div className="p-4 space-y-4">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-xl border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-orange-500 text-sm">
                    {star.repeat(t.rating)}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-1 leading-snug">
                  {t.text}
                </p>
              </div>
            ))}
            <button
              type="button"
              className="w-full rounded-xl bg-orange-500 text-white py-2.5 font-medium hover:opacity-90"
            >
              View All Testimonials
            </button>
          </div>
        </div>

        {/* Boost Visibility Card */}
        <div className="xl:col-span-3 rounded-2xl border shadow-sm bg-gradient-to-r from-orange-500 to-orange-400 text-white p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">Boost Visibility</div>
            <p className="text-sm opacity-90">
              Climb the city rankings: add a deal for every day, keep ratings
              high, and respond to testimonials. Consistency wins.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/vendor/deals/new"
              className="px-4 py-2.5 rounded-xl bg-white text-orange-600 font-semibold"
            >
              Create a New Deal
            </a>
            <a
              href="/vendor/training"
              className="px-4 py-2.5 rounded-xl ring-1 ring-white/80 font-semibold hover:bg-white/10"
            >
              Training Tips
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
