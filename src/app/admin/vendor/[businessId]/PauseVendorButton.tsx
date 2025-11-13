"use client";

import React, { useTransition, useState } from "react";

export default function PauseVendorButton({
  businessId,
  currentStatus = "active",
}: {
  businessId: string;
  currentStatus?: "active" | "paused" | string;
}) {
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [status, setStatus] = useState(currentStatus);

  const handleToggle = () => {
    startTransition(async () => {
      try {
        // placeholder: flip active/paused locally
        const next = status === "paused" ? "active" : "paused";
        await new Promise((r) => setTimeout(r, 400));
        setStatus(next);
        setMsg(`Vendor is now ${next}.`);
      } catch (e) {
        console.error(e);
        setMsg("Failed to update vendor status.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`px-3 py-2 rounded text-sm font-medium text-white ${
          status === "paused" ? "bg-green-600" : "bg-red-600"
        } disabled:opacity-60`}
      >
        {isPending
          ? "Updating..."
          : status === "paused"
          ? "Unpause Vendor"
          : "Pause Vendor"}
      </button>
      {msg && <p className="text-xs text-gray-600">{msg}</p>}
    </div>
  );
}
