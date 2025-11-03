"use client";

import React, { useEffect, useMemo, useState } from "react";

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
  try { localStorage.setItem(REDEEMS_KEY, JSON.stringify(rows)); } catch {}
}

export default function VendorPerformancePage() {
  const [rows, setRows] = useState<Redemption[]>([]);

  useEffect(() => {
    setRows(loadRedemptions());
    const onFocus = () => setRows(loadRedemptions());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const totals = useMemo(() => {
    const total = rows.length;
    const verified = rows.filter((r) => r.vendorConfirmed && r.userConfirmed).length;
    const uniqueRedeemers = new Set(rows.map((r) => (r.customer || r.code))).size;
    const rate = total ? Math.round((verified / total) * 100) : 0;
    const pendingReviews = rows.filter(r => r.userConfirmed && !r.reviewRequested).length;
    return { total, verified, uniqueRedeemers, rate, pendingReviews };
  }, [rows]);

  function toggleVerified(id: string) {
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
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Performance</h1>
          <p className="text-sm text-gray-600">
            Real-time view of redemptions (demo data stored locally).
          </p>
        </div>
        <a
          href="/vendor/redeem"
          className="px-4 py-2 rounded-xl bg-orange-500 text-white font-medium hover:opacity-90"
        >
          Mark Redeemed
        </a>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="rounded-2xl border shadow-sm p-4 bg-white">
          <div className="text-gray-500 text-sm">Total Redemptions</div>
          <div className="text-2xl md:text-3xl font-semibold mt-1">
            {totals.total.toLocaleString()}
          </div>
        </div>
        <div className="rounded-2xl border shadow-sm p-4 bg-white">
          <div className="text-gray-500 text-sm">Verified Redemptions</div>
          <div className="text-2xl md:text-3xl font-semibold mt-1">
            {totals.verified.toLocaleString()}
          </div>
        </div>
        <div className="rounded-2xl border shadow-sm p-4 bg-white">
          <div className="text-gray-500 text-sm">Unique Redeemers</div>
          <div className="text-2xl md:text-3xl font-semibold mt-1">
            {totals.uniqueRedeemers.toLocaleString()}
          </div>
        </div>
        <div className="rounded-2xl border shadow-sm p-4 bg-white">
          <div className="text-gray-500 text-sm">Verification Rate</div>
          <div className="text-2xl md:text-3xl font-semibold mt-1">
            {totals.rate}%
          </div>
        </div>
        <a
          href="/vendor/messages#system"
          className="rounded-2xl border shadow-sm p-4 bg-white hover:bg-gray-50"
          title="Go queue review requests in Messages > System"
        >
          <div className="text-gray-500 text-sm">Pending Review Requests</div>
          <div className="text-2xl md:text-3xl font-semibold mt-1">
            {totals.pendingReviews.toLocaleString()}
          </div>
        </a>
      </div>

      {/* Table */}
      <div className="mt-6 rounded-2xl border shadow-sm bg-white">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">Recent Redemptions</h2>
          <div className="text-sm text-gray-500">Auto-refresh on focus</div>
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
                <th className="px-4 py-3 font-medium">Verified</th>
                <th className="px-4 py-3 font-medium">Review</th>
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
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${
                        r.userConfirmed
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      {r.userConfirmed ? "Yes" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {r.userConfirmed ? (
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${
                          r.reviewRequested
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-orange-50 text-orange-700 border-orange-200"
                        }`}
                      >
                        {r.reviewRequested ? "Requested" : "Pending"}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1.5 rounded border hover:bg-gray-100"
                        onClick={() => toggleVerified(r.id)}
                      >
                        Toggle Verify
                      </button>
                      <button
                        className="px-3 py-1.5 rounded border hover:bg-gray-100"
                        onClick={() => requestReview(r.id)}
                        disabled={!r.userConfirmed || !!r.reviewRequested}
                        title={
                          !r.userConfirmed
                            ? "Verify first"
                            : r.reviewRequested
                            ? "Already requested"
                            : "Mark review request as queued"
                        }
                      >
                        Request Review
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 text-sm">
        Tip: Use <a className="underline" href="/vendor/messages">Messages</a> → <b>System</b> to send the actual review links.
      </div>
    </div>
  );
}
