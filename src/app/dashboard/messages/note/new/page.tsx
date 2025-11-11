// src/app/dashboard/messages/note/new/page.tsx
import React from "react";

export const dynamic = "force-dynamic";

export default function NewNotePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-4">
        Create dashboard note
      </h1>
      <p className="text-slate-300 text-sm mb-6">
        This is a placeholder page so the Vercel build succeeds. Hook it up to
        your real note/message model later.
      </p>
      <form className="space-y-4 bg-slate-900/40 border border-slate-200/10 rounded-xl p-6">
        <div className="space-y-1">
          <label className="text-sm text-slate-200">Title</label>
          <input
            className="w-full rounded-lg bg-slate-950/40 border border-slate-700 px-3 py-2 text-sm text-white outline-none"
            placeholder="Message title"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-200">Body</label>
          <textarea
            className="w-full rounded-lg bg-slate-950/40 border border-slate-700 px-3 py-2 text-sm text-white outline-none"
            rows={5}
            placeholder="Write your note..."
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-orange-400"
        >
          Save note
        </button>
      </form>
    </div>
  );
}
