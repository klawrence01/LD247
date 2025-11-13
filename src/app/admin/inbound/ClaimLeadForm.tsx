"use client";

import { useState, useTransition } from "react";
import { claimInboundLead } from "./actions";
import { useRouter } from "next/navigation";

export default function ClaimLeadForm({
  leadId,
  reps,
}: {
  leadId: string;
  reps: Array<{ id: string; name: string }>;
}) {
  const [selectedRep, setSelectedRep] = useState(reps[0]?.id ?? "");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          await claimInboundLead({
            leadId,
            repId: selectedRep,
          });

          // optional refresh
          router.refresh();
        });
      }}
      className="space-y-3"
    >
      <label className="block text-sm font-medium">Assign to rep</label>
      <select
        value={selectedRep}
        onChange={(e) => setSelectedRep(e.target.value)}
        className="border rounded px-2 py-1 w-full"
      >
        {reps.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={isPending}
        className="bg-orange-500 text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {isPending ? "Assigning..." : "Assign Lead"}
      </button>
    </form>
  );
}
