"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Rec = {
  id: string; createdAt: string; status: string;
  vendorName: string; category: string; city: string; state: string; contactPhone?: string;
};

export default function ManagedVendorsList() {
  const [recs, setRecs] = useState<Rec[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ld247_managed_vendors");
      setRecs(raw ? JSON.parse(raw) : []);
    } catch {}
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Managed Vendors (Local)</h1>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">{recs.length} saved</span>
          <Link
            href="/sales/tools/referral/new"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-3 py-2 text-sm font-medium"
          >
            + Add Managed Referral
          </Link>
        </div>
      </div>

      {recs.length === 0 ? (
        <div className="border rounded-2xl p-6 text-gray-600 text-sm">
          <p className="mb-3">Nothing here yet. Publish from the preview page to add items.</p>
          <Link
            href="/sales/tools/referral/new"
            className="inline-block border rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
          >
            Create your first managed referral
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recs.map(r => (
            <div key={r.id} className="border rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{r.vendorName}</div>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                  {r.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {r.category || "Local Business"} • {[r.city, r.state].filter(Boolean).join(", ")}
              </div>
              <div className="text-xs text-gray-500">Created {new Date(r.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
