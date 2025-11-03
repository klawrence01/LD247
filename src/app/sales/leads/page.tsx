// src/app/dashboard/sales/leads/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

const mockLeads = [
  {
    id: 1,
    business: "Tony’s Pizza",
    city: "New Haven",
    contact: "tony@example.com",
    status: "New",
    source: "Apply Form",
  },
  {
    id: 2,
    business: "Bella Nail Spa",
    city: "Hartford",
    contact: "(203) 555-0199",
    status: "Follow-up",
    source: "Rep",
  },
  {
    id: 3,
    business: "Coach’s Diner",
    city: "Boston",
    contact: "coach@example.com",
    status: "Closed / Won",
    source: "Inbound",
  },
];

export default function SalesLeadsPage() {
  const [filter, setFilter] = useState("All");

  const filtered = mockLeads.filter((lead) =>
    filter === "All" ? true : lead.status === filter
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-sm text-gray-500">
            All businesses that have shown interest or were added by a rep.
          </p>
        </div>
        <Link
          href="/dashboard/sales"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Sales Dashboard
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5">
        {["All", "New", "Follow-up", "Closed / Won"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-sm border ${
              filter === f
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Business</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Source</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {lead.business}
                </td>
                <td className="px-4 py-3">{lead.city}</td>
                <td className="px-4 py-3 text-gray-700">{lead.contact}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      lead.status === "New"
                        ? "bg-green-100 text-green-800"
                        : lead.status === "Follow-up"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{lead.source}</td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-400 text-sm"
                >
                  No leads match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Later we can hook this table up to Supabase / Prisma / whatever you end
        up using.
      </p>
    </div>
  );
}
