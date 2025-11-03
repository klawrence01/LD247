"use client";

import React from "react";
import Link from "next/link";
// (Keeping your existing data loading logic here, assuming you already
// fetch drafts and sent messages from Supabase in this page.)

export default function MessagingHome() {
  // TODO: plug in your real data the same way you were doing before
  // For now I'm mocking the shape you already had: drafts and sent.
  // You can replace these arrays with the real results
  // from your Supabase calls.
  const drafts = [
    {
      id: "d1",
      subject: "Weekend Special",
      created_at: "2025-10-27T15:45:00Z",
    },
    {
      id: "d2",
      subject: "Thank you for visiting us",
      created_at: "2025-10-26T11:20:00Z",
    },
  ];

  const sent = [
    {
      id: "s1",
      subject: "Halloween Flash Deal",
      created_at: "2025-10-25T18:10:00Z",
    },
    {
      id: "s2",
      subject: "We appreciate you",
      created_at: "2025-10-22T09:05:00Z",
    },
  ];

  return (
    <main className="p-6 text-gray-900">
      {/* Header / Actions */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold mb-1">Messaging Center</h1>
          <p className="text-sm text-gray-600 max-w-xl leading-relaxed">
            Send announcements, thank-you notes, weekend specials, and quick
            check-ins to people who asked to hear from you. This is how you keep
            repeat customers coming back.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <Link
            href="/dashboard/merchant/messaging/new"
            className="inline-block bg-orange-600 text-white font-semibold rounded-md px-4 py-2 text-center hover:bg-orange-700"
          >
            ✉️ Send a Note
          </Link>

          <div className="flex gap-2">
            <Link
              href="/dashboard/merchant/messaging/contacts"
              className="text-blue-600 hover:underline"
            >
              Contacts
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/dashboard/merchant/messaging/sent"
              className="text-blue-600 hover:underline"
            >
              Sent
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/dashboard/merchant/messaging/gallery"
              className="text-blue-600 hover:underline"
            >
              Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Your list / followers explanation */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-4 mb-10">
        <h2 className="text-lg font-semibold text-black mb-2">
          Your List (Followers / Contacts)
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
          These are people who said “keep me in the loop.” When you post a new
          deal or want to say thank you, you don’t have to start from zero —
          you’re talking to people who already care.
        </p>
        <div className="mt-3">
          <Link
            href="/dashboard/merchant/messaging/contacts"
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            View / add contacts →
          </Link>
        </div>
      </div>

      {/* Drafts */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-black mb-3">
          Saved Drafts (Not Sent Yet)
        </h2>

        {drafts.length === 0 ? (
          <div className="text-sm text-gray-600 border border-dashed border-gray-300 rounded-lg p-4">
            No drafts saved.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
            {drafts.map((msg) => (
              <li key={msg.id} className="p-4 text-sm flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-2 md:mb-0">
                  <div className="font-semibold text-black">{msg.subject}</div>
                  <div className="text-gray-500">
                    Saved{" "}
                    {new Date(msg.created_at).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </div>
                <Link
                  href={`/dashboard/merchant/messaging/new?edit=${msg.id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Continue &rarr;
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Recently Sent */}
      <section className="mb-16">
        <h2 className="text-lg font-bold text-black mb-3">
          Recently Sent
        </h2>

        {sent.length === 0 ? (
          <div className="text-sm text-gray-600 border border-dashed border-gray-300 rounded-lg p-4">
            You haven’t sent anything yet.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
            {sent.map((msg) => (
              <li key={msg.id} className="p-4 text-sm flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-2 md:mb-0">
                  <div className="font-semibold text-black">{msg.subject}</div>
                  <div className="text-gray-500">
                    Sent{" "}
                    {new Date(msg.created_at).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </div>
                <Link
                  href={`/dashboard/merchant/messaging/sent`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  View &rarr;
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Footer tip */}
      <footer className="text-[13px] text-gray-500 leading-snug border-t border-gray-200 pt-4">
        Talk like a person, not an ad. A simple “Thanks for supporting us”
        goes further than shouting “SALE!”.
      </footer>
    </main>
  );
}
