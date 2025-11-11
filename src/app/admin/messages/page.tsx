// src/app/admin/messages/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

type AdminMessage = {
  id: string;
  title: string;
  body: string;
  audience: string | null;
  created_at: string;
};

export default function AdminMessagesPage() {
  const supabase = getSupabaseBrowser();
  const router = useRouter();

  const [title, setTitle] = useState("New vendor promo for March...");
  const [body, setBody] = useState(
    "Hi team! Here is this week's LocalDeals247 update..."
  );
  const [audience, setAudience] = useState("all_vendors");
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // load recent messages
  useEffect(() => {
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("admin_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (!error && data) {
        setMessages(data as AdminMessage[]);
      }
    };

    loadMessages();
  }, [supabase]);

  const handleSave = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_messages")
      .insert({
        title,
        body,
        audience,
      })
      .select()
      .single();

    setLoading(false);

    if (error) {
      console.error(error);
      return;
    }

    // prepend to list
    setMessages((prev) => (data ? [data as AdminMessage, ...prev] : prev));
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Messaging Center</h1>
          <p className="text-neutral-300 mt-1">
            Send announcements to vendors — by state, by plan, or all at once.
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            Using table: <span className="text-orange-300">admin_messages</span>
          </p>
        </div>
      </div>

      {/* compose */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-white">Compose message</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-neutral-950/60 border border-neutral-700 rounded-lg px-3 py-2 text-white"
              placeholder="Title..."
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">
              Audience
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full bg-neutral-950/60 border border-neutral-700 rounded-lg px-3 py-2 text-white"
            >
              <option value="all_vendors">All vendors</option>
              <option value="by_state">By state</option>
              <option value="by_plan">By plan</option>
              <option value="sales_team">Sales team</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-neutral-300 mb-1">Message</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            className="w-full bg-neutral-950/60 border border-neutral-700 rounded-lg px-3 py-2 text-white"
            placeholder="Write your update..."
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 px-5 py-2 rounded-lg text-white font-medium"
          >
            {loading ? "Saving..." : "Save message"}
          </button>
        </div>
      </div>

      {/* recent messages */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Recent messages
        </h2>
        {messages.length === 0 ? (
          <div className="bg-neutral-950/30 border border-neutral-800 rounded-xl px-4 py-3 text-neutral-400">
            No messages recorded yet.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-neutral-950/40 border border-neutral-800 rounded-lg px-4 py-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-white font-medium">{msg.title}</h3>
                  <span className="text-xs text-neutral-500">
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-neutral-300 mt-1 text-sm">{msg.body}</p>
                <p className="text-xs text-neutral-500 mt-2">
                  Audience: {msg.audience ?? "—"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
