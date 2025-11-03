"use client";

import { useState } from "react";

export default function FollowVendorButton({ vendorId, vendorName }: { vendorId: string; vendorName?: string }) {
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggleFollow() {
    try {
      setLoading(true);
      // TODO: replace with real API call
      await new Promise((r) => setTimeout(r, 500));
      setFollowing((f) => !f);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className="rounded-lg border px-4 py-2 disabled:opacity-60"
      onClick={toggleFollow}
      disabled={loading}
      aria-pressed={following}
    >
      {following ? "Following" : "Follow Vendor"}
      {vendorName ? ` • ${vendorName}` : ""}
    </button>
  );
}
