"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const TEMPLATES = [
  {
    id: "welcome",
    name: "Welcome / thanks for joining",
    body: `Hi [Business Name], thanks for joining Local Deals 24/7. I have your info and will get your page started. If you have a photo or logo you want added, reply here.`,
  },
  {
    id: "trial",
    name: "Free trial reminder",
    body: `Quick reminder — you're in the free trial window right now, so this is the perfect time to add 3–4 deals. I can add them for you if you text them to me.`,
  },
  {
    id: "upsell",
    name: "Upgrade to managed",
    body: `You’re getting activity on your page — if you want us to post on your behalf, I can move you to the managed plan ($99) so you don’t have to log in all the time.`,
  },
];

export default function SalesMessagingPage() {
  const params = useSearchParams();
  const businessFromQuery = params.get("business") || "";
  const [business, setBusiness] = useState(businessFromQuery);
  const [message, setMessage] = useState("");

  function applyTemplate(body: string) {
    setMessage(
      body.replace("[Business Name]", business || "your business")
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-900">
      <h1 className="text-2xl font-bold mb-2">Message a Vendor</h1>
      <p className="text-sm text-gray-500 mb-6">
        Send a quick onboarding, trial, or upgrade message. This is just a
        helper — you can copy/paste into SMS, email, or your CRM.
      </p>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-1">
          Business Name
        </label>
        <input
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Tony’s Pizza"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">
          Choose a template
        </label>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => applyTemplate(tpl.body)}
              className="px-3 py-1.5 rounded-md bg-gray-100 text-sm hover:bg-gray-200"
            >
              {tpl.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-1">
          Message Content
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={8}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Type or pick a template above..."
        />
        <p className="text-xs text-gray-400 mt-1">
          Copy this and send it through your normal channel (SMS, email, FB,
          IG). We can integrate later.
        </p>
      </div>

      <div className="flex gap-2">
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold">
          Copy Message
        </button>
        <button className="border border-gray-300 px-4 py-2 rounded-md text-sm">
          Clear
        </button>
      </div>
    </main>
  );
}
