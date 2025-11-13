"use client";

import React, { useState, useTransition } from "react";

export default function FeatureDealButton({
  businessId,
  city = "",
}: {
  businessId: string;
  city?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  const handleClick = () => {
    startTransition(async () => {
      try {
        // placeholder for real action later
        await new Promise((r) => setTimeout(r, 400));
        setMsg(
          city
            ? `Featured this business for ${city}.`
            : "Featured this business."
        );
      } catch (err) {
        console.error(err);
        setMsg("Failed to feature deal.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleClick}
        disabled={isPending}
        className="px-3 py-2 rounded bg-indigo-600 text-white text-sm font-medium disabled:opacity-60"
      >
        {isPending ? "Featuring..." : "Feature Deal"}
      </button>
      {msg && <p className="text-xs text-gray-600">{msg}</p>}
    </div>
  );
}
