"use client";

import React from "react";

type Lead = {
  id: string;
  business: string;
  contact: string;
  city: string;
  status: "new" | "contacted" | "closed";
  note?: string;
  createdAt: string;
};

const mockLeads: Lead[] = [
  {
    id: "LD247-001",
    business: "Tony’s Pizza",
    contact: "Ken (203-555-0188)",
    city: "New Haven, CT",
    status: "new",
    note: "Wants daily lunch deal.",
    createdAt: "2025-11-03 10:14am",
  },
  {
    id: "LD247-002",
    business: "Hartford Wellness Spa",
    contact: "Lisa (860-555-1122)",
    city: "Hartford, CT",
    status: "contacted",
    note: "Asked about 7-day promo.",
    createdAt: "2025-11-03 9:40am",
  },
  {
    id: "LD247-003",
    business: "Cut Kings Barbershop",
    contact: "Mike (text only)",
    city: "Meriden, CT",
    status: "closed",
    note: "Onboarded to trial.",
    createdAt: "2025-11-02 4:20pm",
  },
];

export default function SalesMessagesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Messages & Leads</h1>
            <p className="text-sm text-slate-500">
              These are the businesses that filled out your LD247 sales page. Call or text them first.
            </p>
          </div>
          <a
            href="/sales/messages/note/new"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600"
          >
            + New Note
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">Business</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">Contact</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">City</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">Status</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">Note</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-900">{lead.business}</p>
                    <p className="text-xs text-slate-400">{lead.id}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{lead.contact}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{lead.city}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold " +
                        (lead.status === "new"
                          ? "bg-green-100 text-green-700"
                          : lead.status === "contacted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-200 text-slate-700")
                      }
                    >
                      {lead.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 max-w-xs">{lead.note}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{lead.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-400 mt-4">
          Later we point this table at Supabase → sales_leads.
        </p>
      </div>
    </main>
  );
}
