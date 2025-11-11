"use client";

import React from "react";

export default function SalesAnalyticsPage() {
  const cards = [
    { label: "Leads this week", value: 11 },
    { label: "Contacted", value: 7 },
    { label: "Onboarded", value: 3 },
    { label: "Conversion Rate", value: "27%" },
  ];

  const topCities = [
    { city: "New Haven, CT", leads: 4 },
    { city: "Hartford, CT", leads: 3 },
    { city: "Meriden, CT", leads: 2 },
    { city: "Springfield, MA", leads: 2 },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Sales Analytics</h1>
        <p className="text-sm text-slate-500 mb-6">
          Quick snapshot of how your LD247 sales funnel is performing.
        </p>

        {/* cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <div key={card.label} className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-xs uppercase text-slate-500 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
            </div>
          ))}
        </div>

        {/* chart placeholder + city leads */}
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6">
          {/* simple chart placeholder */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Leads over last 7 days</h2>
            <div className="h-40 bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400">
              Chart placeholder (wire later)
            </div>
            <p className="text-xs text-slate-400 mt-3">
              Later: replace with Recharts pulling from sales_leads table.
            </p>
          </div>

          {/* top cities */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Top cities</h2>
            <ul className="divide-y divide-slate-100">
              {topCities.map((c) => (
                <li key={c.city} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-slate-800">{c.city}</p>
                    <p className="text-xs text-slate-400">LD247</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{c.leads}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          To make this live, point to Supabase view: <code>sales_leads_daily</code>.
        </p>
      </div>
    </main>
  );
}
