"use client";

import React, { useState, useTransition } from "react";

type RepOption = {
  id: string;
  name: string;
};

// later you can pass these in from the page
const MOCK_REPS: RepOption[] = [
  { id: "rep-1", name: "Unassigned" },
  { id: "rep-2", name: "Jane Doe" },
  { id: "rep-3", name: "John Smith" },
];

export default function AssignRepForm({ businessId }: { businessId: string }) {
  const [isPending, startTransition] = useTransition();
  const [selectedRep, setSelectedRep] = useState<string>("rep-1");
  const [msg, setMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        // placeholder for real server action
        await new Promise((res) => setTimeout(res, 400));

        console.log("assigned rep", {
          businessId,
          repId: selectedRep === "rep-1" ? null : selectedRep,
        });

        setMsg("Rep assignment saved.");
      } catch (err) {
        console.error(err);
        setMsg("Failed to save rep assignment.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded-md bg-white shadow-sm flex flex-col gap-3 max-w-md">
      <h3 className="text-sm font-semibold text-gray-900">Assign Sales Rep</h3>

      <label className="text-xs text-gray-600" htmlFor="rep">
        Select rep for this business
      </label>
      <select
        id="rep"
        className="border rounded px-2 py-1 text-sm"
        value={selectedRep}
        onChange={(e) => setSelectedRep(e.target.value)}
        disabled={isPending}
      >
        {MOCK_REPS.map((rep) => (
          <option key={rep.id} value={rep.id}>
            {rep.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center px-3 py-1.5 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save assignment"}
      </button>

      {msg && <p className="text-xs text-gray-700">{msg}</p>}

      <p className="text-[10px] text-gray-400 mt-1">
        (later this will call the real <code>assignRepToBusiness</code> server action)
      </p>
    </form>
  );
}
