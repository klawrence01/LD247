"use client";

import ManagedVendorsBadge from "@/components/referral/ManagedVendorsBadge";

export default function SalesDashboard() {
  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Welcome, Kenneth</h1>
          <p className="text-sm text-gray-500">Your Sales Performance Overview</p>
        </div>

        {/* BADGE + LINK */}
        <div className="flex items-center gap-3">
          <ManagedVendorsBadge />
          <a
            href="/sales/tools/referral/list"
            className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg"
          >
            View List
          </a>
        </div>
      </div>

      {/* DASHBOARD STATS (example placeholders) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-xl p-5 space-y-2">
          <div className="text-sm text-gray-500">Referrals This Month</div>
          <div className="text-2xl font-bold">8</div>
        </div>
        <div className="border rounded-xl p-5 space-y-2">
          <div className="text-sm text-gray-500">Pipeline Value</div>
          <div className="text-2xl font-bold">$2,450</div>
        </div>
        <div className="border rounded-xl p-5 space-y-2">
          <div className="text-sm text-gray-500">Lifetime Referrals</div>
          <div className="text-2xl font-bold">33</div>
        </div>
      </div>

      {/* ADD YOUR OTHER DASHBOARD CONTENT BELOW */}
    </div>
  );
}
