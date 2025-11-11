import React from "react";

export default function ChoosePlanBlock() {
  return (
    <div className="rounded-xl border border-slate-200/10 bg-slate-900/40 p-4">
      <h2 className="text-white font-semibold mb-2">Choose a plan</h2>
      <p className="text-slate-300 text-sm mb-3">
        Placeholder plan selector to satisfy build. Replace with real plan UI.
      </p>
      <div className="flex gap-2">
        <button className="px-3 py-1 rounded bg-orange-500 text-slate-950 text-sm">
          Basic
        </button>
        <button className="px-3 py-1 rounded bg-white/10 text-white text-sm">
          Pro
        </button>
      </div>
    </div>
  );
}
