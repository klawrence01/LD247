"use client";

import React, { useState } from "react";

export default function TrainingNewPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [audience, setAudience] = useState<"vendor" | "sales">("vendor");
  const [contentType, setContentType] = useState<"text" | "link" | "video">(
    "text"
  );
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    // TEMP: skip real Supabase insert so Next.js build passes
    // when you're ready, re-enable your real insert here
    await new Promise((res) => setTimeout(res, 250));

    setMessage("Lesson saved (placeholder).");
    setSaving(false);
    setTitle("");
    setDescription("");
  }

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">
          New Training Lesson
        </h1>
        <p className="text-sm text-gray-500">
          UI scaffold — backend insert is disabled for build.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-5 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2 text-sm"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Audience</label>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={audience}
              onChange={(e) =>
                setAudience(e.target.value as "vendor" | "sales")
              }
            >
              <option value="vendor">Vendor</option>
              <option value="sales">Sales</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content type</label>
          <select
            className="w-full border rounded px-3 py-2 text-sm"
            value={contentType}
            onChange={(e) =>
              setContentType(e.target.value as "text" | "link" | "video")
            }
          >
            <option value="text">Text</option>
            <option value="link">Link</option>
            <option value="video">Video</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm rounded-lg disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save lesson"}
        </button>

        {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
      </form>
    </main>
  );
}
