"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id");

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Listing Published (Mock)</h1>
      <p className="text-gray-600 text-sm">
        Your managed vendor has been saved to this browser. In production, this would push to the LD247 database and notify the rep.
      </p>
      <div className="border rounded-2xl p-5 space-y-2">
        <div className="text-sm"><span className="font-medium">ID:</span> {id || "—"}</div>
        <div className="text-sm text-gray-500">Saved to <code>localStorage.ld247_managed_vendors</code></div>
      </div>
      <div className="flex gap-3">
        <button onClick={() => router.push("/sales/tools/referral/list")}
          className="border rounded-lg px-4 py-2 text-sm">View Managed Vendors</button>
        <button onClick={() => router.push("/sales/tools/referral/new")}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-sm">Create Another</button>
      </div>
    </div>
  );
}
