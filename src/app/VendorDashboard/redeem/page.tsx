"use client";

import React, { useEffect, useState } from "react";

type Redemption = {
  id: string;
  code: string;
  dealTitle: string;
  customer?: string;
  date: string; // ISO
  vendorConfirmed: boolean;
  userConfirmed: boolean;
  reviewRequested?: boolean;
};

const REDEEMS_KEY = "ld247_redemptions";

function loadRedemptions(): Redemption[] {
  try {
    const raw = localStorage.getItem(REDEEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveRedemptions(rows: Redemption[]) {
  try {
    localStorage.setItem(REDEEMS_KEY, JSON.stringify(rows));
  } catch {}
}

export default function RedeemPage() {
  const [rows, setRows] = useState<Redemption[]>([]);
  const [dealTitle, setDealTitle] = useState("Any Deal");
  const [code, setCode] = useState("");
  const [customer, setCustomer] = useState("");

  useEffect(() => setRows(loadRedemptions()), []);

  function addRedemption() {
    if (!code.trim()) return;
    const now = new Date().toISOString();
    const id = Math.random().toString(36).slice(2, 10);
    const next = [
      {
        id,
        code: code.trim(),
        dealTitle: dealTitle.trim() || "Deal",
        customer: customer.trim() || undefined,
        date: now,
        vendorConfirmed: true,
        userConfirmed: false,
      },
      ...rows,
    ];
    setRows(next);
    saveRedemptions(next);
    setCode("");
    setCustomer("");
    alert("Marked as redeemed (demo). This will show on Performance.");
  }

  function toggleUserConfirm(id: string) {
    const next = rows.map((r) =>
      r.id === id ? { ...r, userConfirmed: !r.userConfirmed } : r
    );
    setRows(next);
    saveRedemptions(next);
  }

  function requestReview(id: string) {
    const next = rows.map((r) =>
      r.id === id ? { ...r, reviewRequested: true } : r
    );
    setRows(next);
    saveRedemptions(next);
    alert("Review request queued (demo).");
  }

  function resetAll() {
    if (!confirm("Clear all demo redemptions?")) return;
    setRows([]);
    saveRedemptions([]);
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-semibold">Mark a Coupon as Redeemed</h1>
      <p className="text-sm text-gray-600 mt-1">Demo flow that feeds the Performance page.</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Deal title (optional)"
          value={dealTitle}
          onChange={(e) => setDealTitle(e.target.value)}
        />
        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Redemption code (required)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Customer name/email (optional)"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </div>

      <div className="mt-3 flex gap-2">
        <button
          className="px-4 py-2 rounded-xl bg-orange-500 text-white"
          onClick={addRedemption}
        >
          Mark Redeemed
        </button>
        <button className="px-4 py-2 rounded-xl border" onClick={resetAll}>
          Clear Demo Data
        </button>
      </div>

      <div className="mt-6 rounded-2xl border shadow-sm bg-white">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Recent Redemptions</h2>
        </div>
        {rows.length === 0 ? (
          <div className="p-4 text-sm text-gray-600">No redemptions yet.</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Deal</th>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-3">
                    {new Date(r.date).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{r.dealTitle}</td>
                  <td className="px-4 py-3">{r.code}</td>
                  <td className="px-4 py-3">{r.customer ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-full border bg-orange-50 text-orange-700 border-orange-200">
                      Vendor marked
                    </span>
                    {r.userConfirmed && (
                      <span className="ml-2 text-xs px-2 py-1 rounded-full border bg-green-50 text-green-700 border-green-200">
                        User confirmed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1.5 rounded border hover:bg-gray-100"
                        onClick={() => toggleUserConfirm(r.id)}
                      >
                        Toggle User Confirm
                      </button>
                      <button
                        className="px-3 py-1.5 rounded border hover:bg-gray-100"
                        onClick={() => requestReview(r.id)}
                        disabled={r.reviewRequested}
                        title={
                          r.reviewRequested ? "Already requested" : "Queue review request"
                        }
                      >
                        {r.reviewRequested ? "Review Requested" : "Request Review"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4">
        <a href="/vendor/performance" className="text-sm underline">
          Go to Performance →
        </a>
      </div>
    </div>
  );
}
