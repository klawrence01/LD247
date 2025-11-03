"use client";

import { useState, useTransition } from "react";
import { approveBusiness } from "./actions";
import { useRouter } from "next/navigation";

export default function ApproveVendorButton({
  businessId,
  currentStatus,
}: {
  businessId: string;
  currentStatus: string | null;
}) {
  const router = useRouter();
  const [msg, setMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isAlreadyActive =
    currentStatus &&
    ["active", "live", "approved"].includes(currentStatus.toLowerCase());

  async function handleApprove() {
    setMsg(null);

    startTransition(async () => {
      const resp = await approveBusiness({ businessId });

      if (!resp.ok) {
        setMsg(resp.message || "Failed to approve vendor.");
        return;
      }

      setMsg("Vendor approved and set to active.");
      // refresh server component data so status updates on page
      router.refresh();
    });
  }

  return (
    <div className="text-[13px] bg-neutral-900 border border-neutral-800 rounded-xl p-4">
      <div className="text-neutral-400 text-[11px] uppercase font-semibold tracking-wide mb-2">
        Status Control
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-neutral-300 leading-snug text-[13px]">
          Current status:{" "}
          <span className="inline-block text-[11px] font-medium bg-neutral-800 border border-neutral-700 text-neutral-200 rounded px-2 py-1 align-middle">
            {currentStatus || "—"}
          </span>
        </div>

        {isAlreadyActive ? (
          <div className="text-[12px] text-neutral-500 leading-snug bg-neutral-800/40 border border-neutral-700 rounded-lg px-3 py-2">
            This vendor is already live.
          </div>
        ) : (
          <>
            <button
              disabled={isPending}
              onClick={handleApprove}
              className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-[12px] rounded-lg px-3 py-2 border border-orange-500/40 text-center"
            >
              {isPending ? "Approving…" : "Approve & Go Live"}
            </button>

            <p className="text-[11px] text-neutral-500 leading-snug">
              This will mark the vendor as active and visible to the network.
            </p>
          </>
        )}

        {msg && (
          <div className="text-[12px] text-neutral-300 bg-neutral-800/40 border border-neutral-700 rounded-lg px-3 py-2 leading-snug">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
