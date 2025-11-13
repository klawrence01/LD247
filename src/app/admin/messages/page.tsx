"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseBrowser"; // keep your path

type AdminMessageForm = {
  title: string;
  body: string;
  audience: string;
};

export default function AdminMessagesPage() {
  const [form, setForm] = useState<AdminMessageForm>({
    title: "",
    body: "",
    audience: "all",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    const payload = {
      title: form.title,
      body: form.body,
      audience: form.audience,
    };

    // TS doesn’t know table shape -> tell it to ignore this insert
    // @ts-ignore – table type for admin_messages is not declared yet
    const { error } = await supabase.from("admin_messages").insert(payload);

    if (error) {
      console.error(error);
      setStatus("Failed to send message.");
    } else {
      setStatus("Message saved/sent.");
      setForm({ title: "", body: "", audience: "all" });
    }

    setSaving(false);
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        Admin – Messages
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Compose a message to admins, vendors, or everyone.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-5 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full border rounded px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Audience</label>
          <select
            value={form.audience}
            onChange={(e) =>
              setForm((f) => ({ ...f, audience: e.target.value }))
            }
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="vendors">Vendors</option>
            <option value="merchants">Merchants</option>
            <option value="admins">Admins</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Body</label>
          <textarea
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            rows={5}
            className="w-full border rounded px-3 py-2 text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm rounded-lg disabled:opacity-60"
        >
          {saving ? "Saving..." : "Send message"}
        </button>

        {status && (
          <p className="text-sm text-gray-500 mt-2" role="status">
            {status}
          </p>
        )}
      </form>
    </main>
  );
}
