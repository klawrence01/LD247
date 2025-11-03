"use client";

import { useState, useTransition } from "react";
import { claimInboundLead } from "./actions";
import { useRouter } from "next/navigation";

export default function ClaimLeadForm({
  leadId,
  reps,
}: {
  leadId: string;
  reps: { id: string; name: string; territory: string | null }[];
}) {
  const router = useRouter();
  const [selectedRep, setSelectedRep] = useState<string>("");
  const [msg, setMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!selectedRep) {
      setMsg("Pick a rep first.");
      return;
    }

    startTransition(async () => {
      const resp = await claimInboundLead({
        leadId,
        repId: selectedRep,
      });

      if (!resp.ok) {
        setMsg(resp.message || "Update failed.");
        return;
      }

      setMsg("Assigned.");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 text-[12px] text-neutral-200"
    >
      <select
        className="bg-neutral-800 border border-neutral-700 rounded-lg px-2 py-2 text-neutral-100 text-[13px] outline-none"
        value={selectedRep}
        onChange={(e) => setSelectedRep(e.target.value)}
      >
        <option value="">Select rep…</option>
        {reps.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
            {r.territory ? ` (${r.territory})` : ""}
          </option>
        ))}
      </select>

      {msg && (
        <div className="text-[11px] text-neutral-300 bg-neutral-800/40 border border-neutral-700 rounded-lg px-2 py-1 leading-snug">
          {msg}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[12px] rounded-lg px-3 py-2 border border-orange-500/40 text-center"
      >
        {isPending ? "Assigning…" : "Assign Lead"}
      </button>

      <p className="text-[10px] text-neutral-500 leading-snug">
        Sends this lead to that rep and marks it claimed.
      </p>
    </form>
  );
}
