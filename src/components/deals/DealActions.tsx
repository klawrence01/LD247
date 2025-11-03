"use client";

import FollowVendorButton from "@/components/follow/FollowVendorButton";

export default function DealActions({
  shareUrl,
  vendorId,
  vendorName,
}: {
  shareUrl: string;
  vendorId: string;
  vendorName?: string;
}) {
  async function handleShare() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied!");
    } catch {
      alert("Copy failed. You can manually copy this: " + shareUrl);
    }
  }

  return (
    <div className="flex flex-wrap gap-2 pt-2">
      <button className="rounded-lg bg-orange-500 px-4 py-2 text-white">
        Save to My Week
      </button>

      <FollowVendorButton vendorId={vendorId} vendorName={vendorName} />

      <button className="rounded-lg border px-4 py-2" onClick={handleShare}>
        Share
      </button>

      <button className="rounded-lg border px-4 py-2">Report Issue</button>
    </div>
  );
}
