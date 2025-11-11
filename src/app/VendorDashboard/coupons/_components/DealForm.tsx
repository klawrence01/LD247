"use client";

import React, { useState } from "react";

export default function DealForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <form className="space-y-4 rounded-xl border border-slate-200/10 bg-slate-900/40 p-6">
      <h2 className="text-lg font-semibold text-white">Create New Deal</h2>

      <div className="space-y-1">
        <label className="text-sm text-slate-200">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg bg-slate-950/40 border border-slate-700 px-3 py-2 text-sm text-white outline-none"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-slate-200">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg bg-slate-950/40 border border-slate-700 px-3 py-2 text-sm text-white outline-none"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-orange-400"
      >
        Save Deal
      </button>
    </form>
  );
}
