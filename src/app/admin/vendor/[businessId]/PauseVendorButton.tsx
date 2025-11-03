"use client";

import { useState, useTransition } from "react";
import { pauseBusiness } from "./actions";
import { useRouter } from "next/navigation";

export default function PauseVendorButton({
  businessId,
  currentStatus,
}: {
  businessId: string;
  currentStatus: string | null;
}) {
  const router = useRouter();
  const [msg, setMsg] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isOnHold =
    currentStatus &&
    ["on_hold", "paused", "suspended"].includes(
      currentStatus.toLowerCase()
    );

  async function handlePause() {
    setMsg(null);

    startTransition(async () => {
      const resp = await pauseBusiness({ businessId });

      if (!resp.ok) {
        setMsg(resp.message || "Failed to pause vendor.");
        return;
      }

      setMsg("Vendor set to on_hold.");
      router.refresh();
    });
  }

  return (
    <div className="text-[13px] bg-neutral-900 border border-neutral-800 rounded-xl p-4">
      <div className="text-neutral-400 text-[11px] uppercase font-semibold tracking-wide mb-2">
        Pause / Take Offline
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-neutral-300 leading-snug text-[13px]">
          Current status:{" "}
          <span className="inline-block text-[11px] font-medium bg-neutral-800 border border-neutral-700 text-neutral-200 rounded px-2 py-1 align-middle">
            {currentStatus || "—"}
          </span>
        </div>

        {isOnHold ? (
          <div className="text-[12px] text-neutral-500 leading-snug bg-neutral-800/40 border border-neutral-700 rounded-lg px-3 py-2">
            This vendor is already paused / on hold.
          </div>
        ) : (
          <>
            {!confirming ? (
              <>
                <button
                  disabled={isPending}
                  onClick={() => setConfirming(true)}
                  className="bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-[12px] rounded-lg px-3 py-2 border border-red-500/40 text-center"
                >
                  {isPending ? "Working..." : "Pause Vendor"}
                </button>
                <p className="text-[11px] text-neutral-500 leading-snug">
                  Use this if billing failed, offer is out of control, or you
                  got a complaint. Vendor will not appear as active.
                </p>
              </>
            ) : (
              <>
                <button
                  disabled={isPending}
                  onClick={handlePause}
                  className="bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-[12px] rounded-lg px-3 py-2 border border-red-500/40 text-center"
                >
                  {isPending ? "Pausing…" : "Confirm Pause"}
                </button>
                <button
                  disabled={isPending}
                  onClick={() => setConfirming(false)}
                  className="bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-200 font-medium text-[12px] rounded-lg px-3 py-2 border border-neutral-700 text-center"
                >
                  Cancel
                </button>
                <p className="text-[11px] text-neutral-500 leading-snug">
                  This will immediately mark status as on_hold.
                </p>
              </>
            )}
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
