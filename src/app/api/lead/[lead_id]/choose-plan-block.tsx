// src/app/api/lead/[lead_id]/choose-plan-block.tsx
import React from "react";

export default function ChoosePlanBlock() {
  return (
    <div className="rounded-xl border border-slate-200/20 bg-slate-900/40 p-4">
      <h2 className="text-white font-semibold mb-2">Choose a plan</h2>
      <p className="text-slate-300 text-sm mb-3">
        This is a placeholder block so the Vercel build can succeed. Replace
        with real lead / plan selection UI.
      </p>
      <div className="flex gap-2">
        <button className="px-3 py-1 rounded-lg bg-orange-500 text-sm text-slate-950">
          Basic
        </button>
        <button className="px-3 py-1 rounded-lg bg-white/10 text-sm text-white">
          Pro
        </button>
      </div>
    </div>
  );
}
