"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type ThreadMsg = {
  id: number;
  from: string;     // "You" or a name
  role: "vendor" | "customer" | "system";
  body: string;
  date: string;     // short for demo
};

type Thread = {
  id: number;
  subject: string;
  participants: string[];
  messages: ThreadMsg[];
};

// --- Demo data (matches the inbox ids) ---
const THREADS: Thread[] = [
  {
    id: 1,
    subject: "Welcome to Local Deals 24/7!",
    participants: ["LD247 Admin", "You"],
    messages: [
      {
        id: 101,
        from: "LD247 Admin",
        role: "system",
        body:
          "Your vendor account is set up and ready to go. Here are a few tips to get started:\n• Add your business logo\n• Create your first week of deals\n• Invite customers to follow you",
        date: "Aug 10, 9:12 AM",
      },
    ],
  },
  {
    id: 2,
    subject: "Loved your weekend deal!",
    participants: ["Customer: Maria T.", "You"],
    messages: [
      {
        id: 201,
        from: "Customer: Maria T.",
        role: "customer",
        body:
          "Hi! I just wanted to say thanks for the amazing discount last Saturday. My family loved it!",
        date: "Aug 8, 6:41 PM",
      },
      {
        id: 202,
        from: "You",
        role: "vendor",
        body:
          "That makes our day, Maria — thank you! Follow us for more pop-up deals.",
        date: "Aug 8, 7:03 PM",
      },
    ],
  },
  {
    id: 3,
    subject: "Slot Reminder",
    participants: ["LD247 System", "You"],
    messages: [
      {
        id: 301,
        from: "LD247 System",
        role: "system",
        body:
          "Don’t forget to secure your coupon slots before Friday’s cutoff. Need help? Visit Training in your dashboard.",
        date: "Aug 6, 8:00 AM",
      },
    ],
  },
  {
    id: 4,
    subject: "Question about redemption",
    participants: ["Customer: Dave R.", "You"],
    messages: [
      {
        id: 401,
        from: "Customer: Dave R.",
        role: "customer",
        body:
          "Can I use your coffee coupon with my existing punch card?",
        date: "Aug 4, 1:19 PM",
      },
      {
        id: 402,
        from: "You",
        role: "vendor",
        body:
          "Hi Dave! The coupon can’t be combined with other offers, but the punch still counts for the purchase. See you soon!",
        date: "Aug 4, 1:47 PM",
      },
    ],
  },
];

export default function MessageThreadPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const threadId = Number(params?.id);
  const thread = useMemo(
    () => THREADS.find((t) => t.id === threadId),
    [threadId]
  );

  const [draft, setDraft] = useState("");

  if (!thread) {
    return (
      <div className="p-6 md:p-8">
        <button
          className="mb-4 px-3 py-1.5 rounded border hover:bg-gray-100"
          onClick={() => router.push("/vendor/messages")}
        >
          ← Back to Messages
        </button>
        <h1 className="text-xl font-semibold">Message not found</h1>
        <p className="text-sm text-gray-600 mt-1">Try returning to the inbox.</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          className="px-3 py-1.5 rounded border hover:bg-gray-100"
          onClick={() => router.push("/vendor/messages")}
        >
          ← Back to Messages
        </button>
        <div className="text-sm text-gray-500">
          Participants: {thread.participants.join(" • ")}
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold">{thread.subject}</h1>

      {/* Thread */}
      <div className="mt-4 rounded-2xl border shadow-sm bg-white">
        <ul className="divide-y">
          {thread.messages.map((m) => (
            <li key={m.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  {m.from}
                  <span
                    className={`ml-2 text-xs px-2 py-0.5 rounded-full border ${
                      m.role === "vendor"
                        ? "bg-orange-50 text-orange-700 border-orange-200"
                        : m.role === "system"
                        ? "bg-gray-50 text-gray-700 border-gray-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {m.role}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{m.date}</div>
              </div>
              <p className="mt-2 whitespace-pre-wrap leading-6 text-sm text-gray-800">
                {m.body}
              </p>
            </li>
          ))}
        </ul>

        {/* Reply box */}
        <div className="p-4 border-t bg-gray-50/60">
          <label className="text-sm font-medium">Reply</label>
          <textarea
            className="mt-1 w-full border rounded-lg px-3 py-2 h-32 leading-6"
            placeholder="Type your message…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="mt-2 flex justify-end gap-2">
            <button className="px-4 py-2 rounded-xl border hover:bg-white">
              Save Draft
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-orange-500 text-white disabled:opacity-50"
              disabled={!draft.trim()}
              onClick={() => {
                setDraft("");
                alert("Message sent (demo)");
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="px-3 py-1.5 rounded border hover:bg-gray-100">
          Mark as Resolved
        </button>
        <button className="px-3 py-1.5 rounded border hover:bg-gray-100">
          Archive Thread
        </button>
        <button className="px-3 py-1.5 rounded border hover:bg-gray-100">
          Report
        </button>
      </div>
    </div>
  );
}
