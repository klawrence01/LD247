"use client";

import { useState, useTransition } from "react";
import { assignRepToBusiness } from "./actions";
import { useRouter } from "next/navigation";

export default function AssignRepForm({
  businessId,
  currentRepId,
  reps,
  hotRepIds,
}: {
  businessId: string;
  currentRepId: string | null;
  reps: { id: string; name: string; territory: string | null }[];
  hotRepIds: string[];
}) {
  const router = useRouter();
  const [selectedRep, setSelectedRep] = useState<string | "">(currentRepId || "");
  const [msg, setMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    startTransition(async () => {
      const resp = await assignRepToBusiness({
        businessId,
        repId: selectedRep === "" ? null : selectedRep,
      });

      if (!resp.ok) {
        setMsg(resp.message || "Update failed.");
        return;
      }

      setMsg("Rep updated.");
      router.refresh();
    });
  }

  function labelForRep(r: { id: string; name: string; territory: string | null }) {
    const flame = hotRepIds.includes(r.id) ? " 🔥" : "";
    const terr = r.territory ? ` (${r.territory})` : "";
    return `${r.name}${terr}${flame}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-[13px]">
      <div className="flex flex-col gap-2">
        <label className="text-[11px] text-neutral-400 uppercase tracking-wide font-semibold">
          Assign to Rep
        </label>
        <select
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-2 py-2 text-neutral-100 text-[13px] outline-none"
          value={selectedRep}
          onChange={(e) => setSelectedRep(e.target.value)}
        >
          <option value="">— Unassigned —</option>
          {reps.map((r) => (
            <option key={r.id} value={r.id}>
              {labelForRep(r)}
            </option>
          ))}
        </select>
      </div>

      {msg && (
        <div className="text-[12px] text-neutral-300 bg-neutral-800/40 border border-neutral-700 rounded-lg px-2 py-2 leading-snug">
          {msg}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-[12px] rounded-lg px-3 py-2 border border-orange-500/40 w-full text-center"
      >
        {isPending ? "Saving..." : "Update Owner"}
      </button>

      <p className="text-[10px] text-neutral-500 leading-snug">
        🔥 means that rep is already working recent inbound leads.
      </p>
    </form>
  );
}
