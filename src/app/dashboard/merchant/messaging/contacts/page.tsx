"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Contact = {
  id: string;
  name: string | null;
  email: string;
  source: string | null;
  created_at: string;
};

type Message = {
  id: string;
  subject: string | null;
  body: string;
  created_at: string;
  contact_id: string | null;
};

const MERCHANT_ID = "demo-merchant"; // TODO: swap for real merchant/user id

export default function MerchantMessagingContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [sendTo, setSendTo] = useState<"all" | string>("all");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState(
    "Hi! Thanks for following us on Local Deals 24/7. This week we’re running..."
  );
  const [statusMsg, setStatusMsg] = useState("");
  const [sending, setSending] = useState(false);

  const [recentMessages, setRecentMessages] = useState<Message[]>([]);

  const [search, setSearch] = useState("");

  // load contacts + messages
  useEffect(() => {
    async function loadContacts() {
      setLoadingContacts(true);
      const { data } = await supabase
        .from("merchant_contacts")
        .select("id, name, email, source, created_at")
        .eq("merchant_id", MERCHANT_ID)
        .order("created_at", { ascending: false });
      if (data) setContacts(data as Contact[]);
      setLoadingContacts(false);
    }

    async function loadMessages() {
      const { data } = await supabase
        .from("merchant_messages")
        .select("id, subject, body, contact_id, created_at")
        .eq("merchant_id", MERCHANT_ID)
        .order("created_at", { ascending: false })
        .limit(5);
      if (data) setRecentMessages(data as Message[]);
    }

    loadContacts();
    loadMessages();
  }, []);

  const filteredContacts = contacts.filter((c) => {
    const term = search.toLowerCase();
    return (
      c.email.toLowerCase().includes(term) ||
      (c.name || "").toLowerCase().includes(term)
    );
  });

  async function addContact() {
    if (!newEmail.trim()) return;

    const { data, error } = await supabase
      .from("merchant_contacts")
      .insert({
        merchant_id: MERCHANT_ID,
        name: newName.trim() || null,
        email: newEmail.trim(),
        source: "added",
      })
      .select()
      .single();

    if (!error && data) {
      setContacts((prev) => [data as Contact, ...prev]);
      setNewName("");
      setNewEmail("");
      setStatusMsg("Contact added.");
    }
  }

  async function sendMessage() {
    if (!body.trim()) {
      setStatusMsg("Please enter a message.");
      return;
    }

    setSending(true);
    setStatusMsg("");

    const payload = {
      merchant_id: MERCHANT_ID,
      contact_id: sendTo === "all" ? null : sendTo,
      subject: subject.trim() || null,
      body: body.trim(),
    };

    const { error } = await supabase.from("merchant_messages").insert(payload);

    if (error) {
      setStatusMsg("Could not send message (saved locally).");
    } else {
      setStatusMsg(
        sendTo === "all"
          ? `Message saved – send to ${contacts.length} contacts.`
          : "Message saved for that contact."
      );
      // refresh recent messages
      const { data } = await supabase
        .from("merchant_messages")
        .select("id, subject, body, contact_id, created_at")
        .eq("merchant_id", MERCHANT_ID)
        .order("created_at", { ascending: false })
        .limit(5);
      if (data) setRecentMessages(data as Message[]);
    }

    setSending(false);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Messaging Contacts</h1>
        <p className="text-sm text-gray-500 mt-1">
          These are your people — followers and customers who said they want to
          hear from you. Send to one or everyone.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col gap-6">
        {/* Compose */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold mb-3">
            Create a Note / Announcement
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Send to</label>
              <select
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value as any)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All contacts</option>
                {filteredContacts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name || c.email}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Type below to filter, or pick “All contacts”.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Subject (optional)
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Weekend Special, New Hours…"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Hi! Thanks for following us on Local Deals 24/7. This week we’re running…"
            />
            <p className="text-xs text-gray-400 mt-1">
              Keep it short and friendly. Mention the deal or update. You can
              copy/paste this into email or SMS.
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={sendMessage}
              disabled={sending}
              className="bg-black text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-gray-900 disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send Message"}
            </button>
            {statusMsg ? (
              <p className="text-xs text-gray-500">{statusMsg}</p>
            ) : null}
          </div>
        </div>

        {/* Add Contact */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold mb-3">Add Contact</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name (optional)"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm flex-1"
            />
            <input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email *"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm flex-1"
            />
            <button
              onClick={addContact}
              className="bg-black text-white rounded-md px-4 py-2 text-sm font-semibold"
            >
              Add Contact
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Tip: ask “Want us to send you our specials?” and enter them here.
          </p>
        </div>

        {/* Your List */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-sm font-semibold">Your List</h2>
              <p className="text-xs text-gray-500">
                Everyone below has asked to hear from you.
              </p>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email..."
              className="border border-gray-200 rounded-md px-3 py-1.5 text-sm"
            />
          </div>

          {loadingContacts ? (
            <p className="text-xs text-gray-400">Loading contacts…</p>
          ) : filteredContacts.length === 0 ? (
            <p className="text-xs text-gray-400">
              No contacts match that search.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredContacts.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-3 border border-gray-100 rounded-xl px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {c.name || c.email}
                    </p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                    <div className="flex gap-2 mt-1 items-center">
                      {c.source ? (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                          {c.source}
                        </span>
                      ) : null}
                      <span className="text-[10px] text-gray-400">
                        {new Date(c.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSendTo(c.id);
                      setStatusMsg("");
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Message →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent messages */}
        {recentMessages.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-sm font-semibold mb-3">Recent Messages</h2>
            <div className="flex flex-col gap-3">
              {recentMessages.map((m) => (
                <div key={m.id} className="border border-gray-100 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">
                    {new Date(m.created_at).toLocaleString()} •{" "}
                    {m.contact_id ? "1 recipient" : "All contacts"}
                  </p>
                  {m.subject ? (
                    <p className="text-sm font-semibold">{m.subject}</p>
                  ) : null}
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {m.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
