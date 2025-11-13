"use client";

import React, { useTransition, useState } from "react";

export default function ApproveVendorButton({ businessId }: { businessId: string }) {
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  const handleApprove = () => {
    startTransition(async () => {
      try {
        // placeholder “approve” — this is where your real server action will go later
        await new Promise((resolve) => setTimeout(resolve, 400));

        console.log("approved business", businessId);
        setMsg("Vendor approved.");
      } catch (err) {
        console.error(err);
        setMsg("Failed to approve vendor.");
      }
    });
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleApprove}
        disabled={isPending}
        className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 disabled:opacity-60"
      >
        {isPending ? "Approving..." : "Approve Vendor"}
      </button>
      {msg && <p className="text-sm text-gray-700">{msg}</p>}
    </div>
  );
}
