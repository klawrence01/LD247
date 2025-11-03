"use client";

import React, { useState } from "react";

// NOTE TO FUTURE KEN/MILES:
// You'll replace the mock `contactsData` with the real data you get from Supabase.
// That data should include both:
//   - manual contacts (source = 'manual')
//   - followers collected from site (source = 'follow')

export default function ContactsPage() {
  // Mock data structure we want long-term:
  const [contactsData, setContactsData] = useState([
    // Example follower that came in automatically from the public page
    {
      id: "1",
      name: "Tasha (Hair Client)",
      email: "tasha@example.com",
      source: "follow", // auto follower
      created_at: "2025-10-28T14:30:00Z",
    },
    // Example manual add
    {
      id: "2",
      name: "Jay from Friday promo",
      email: "jay@gmail.com",
      source: "manual", // manually added from the shop
      created_at: "2025-10-27T18:00:00Z",
    },
  ]);

  // controlled inputs for Add Contact form
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  // This is where you'll call your Supabase insert:
  // Insert new contact, source = 'manual'
  async function handleAddContact(e: React.FormEvent) {
    e.preventDefault();

    if (!emailInput.trim()) {
      alert("Email is required.");
      return;
    }

    const newContact = {
      id: crypto.randomUUID(),
      name: nameInput.trim() || "",
      email: emailInput.trim(),
      source: "manual",
      created_at: new Date().toISOString(),
    };

    // TODO: replace this with Supabase insert:
    // const { error } = await supabase
    //   .from("contacts")
    //   .insert([{ business_id, name, email, source: "manual" }])
    // if (error) { ... }

    setContactsData((prev) => [newContact, ...prev]);
    setNameInput("");
    setEmailInput("");
  }

  return (
    <main className="p-6 text-gray-900">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold mb-2">Contacts</h1>
        <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
          These are your people — followers and customers who said they want to
          hear from you.
          <br />
          When someone follows you on Local Deals 24/7, they show up here. You
          can also add people manually (walk-ins, regulars, VIPs).
        </p>
      </div>

      {/* Add contact form */}
      <form
        onSubmit={handleAddContact}
        className="bg-white border border-gray-300 rounded-xl shadow-sm p-4 mb-8 max-w-xl"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-start">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Name (optional)"
            className="flex-1 rounded-md border border-gray-400 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Email *"
            className="flex-1 rounded-md border border-gray-400 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full md:w-auto bg-black text-white font-semibold text-sm rounded-md px-4 py-2 hover:bg-gray-900"
        >
          Add Contact
        </button>

        <p className="text-[13px] text-gray-500 mt-3 leading-snug max-w-lg">
          Tip: Ask “Want us to send you our specials?” and enter them here. This
          is how you build repeat customers without buying ads.
        </p>
      </form>

      {/* Contacts / Followers list */}
      <section className="bg-white border border-gray-300 rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-bold text-black mb-3">Your List</h2>
        <p className="text-sm text-gray-600 mb-4 max-w-xl leading-relaxed">
          Everyone below has asked to hear from you. You can message them in the{" "}
          <span className="font-medium text-gray-900">
            Messaging Center
          </span>{" "}
          tab.
        </p>

        {contactsData.length === 0 ? (
          <div className="text-sm text-gray-600 border border-dashed border-gray-300 rounded-lg p-4">
            No contacts yet.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm text-sm">
            {contactsData.map((c) => (
              <li
                key={c.id}
                className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
              >
                {/* Left side: name/email */}
                <div>
                  <div className="font-semibold text-black break-all">
                    {c.name ? c.name : c.email}
                  </div>
                  <div className="text-gray-600 break-all">{c.email}</div>

                  <div className="text-[13px] text-gray-500 mt-1 flex flex-wrap gap-2">
                    <span className="px-2 py-[2px] rounded-full border border-gray-300 bg-gray-50 text-gray-700">
                      {c.source === "follow" ? "Followed you" : "Added by you"}
                    </span>
                    <span>
                      {new Date(c.created_at).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>

                {/* Right side: future actions */}
                <div className="text-right md:text-left">
                  <button
                    className="text-blue-600 font-medium hover:underline"
                    // this would prefill a new message draft to that email
                    onClick={() => {
                      // TODO: route to /dashboard/merchant/messaging/new?to={c.email}
                      alert(
                        `Would start a note to ${c.email} (wire this up next).`
                      );
                    }}
                  >
                    Message →
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Footer helper */}
      <footer className="text-[13px] text-gray-500 leading-snug border-t border-gray-200 pt-4 mt-10">
        You don’t need to buy ads to keep people coming back. You just need a
        list, and a steady voice.
      </footer>
    </main>
  );
}
