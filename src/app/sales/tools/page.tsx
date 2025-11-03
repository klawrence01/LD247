"use client";

import React from "react";

export default function SalesToolsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 text-gray-900">
      <header className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Sales Tools & Scripts</h1>
          <p className="text-sm text-gray-500">
            Use these talking points when calling or visiting local businesses.
            Keep it human. Keep it local.
          </p>
        </div>
      </header>

      {/* Quick links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h2 className="text-sm font-semibold mb-1">1. Discovery Call Script</h2>
          <p className="text-xs text-gray-500 mb-2">
            60–90 seconds to explain LD247.
          </p>
          <a
            href="#rep-intro"
            className="text-sm text-orange-600 font-semibold hover:underline"
          >
            Jump to script →
          </a>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h2 className="text-sm font-semibold mb-1">2. Free Trial Pitch</h2>
          <p className="text-xs text-gray-500 mb-2">
            How to say “it’s free right now” without sounding spammy.
          </p>
          <a
            href="#free-trial"
            className="text-sm text-orange-600 font-semibold hover:underline"
          >
            Jump to pitch →
          </a>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h2 className="text-sm font-semibold mb-1">3. Follow-Up Text / Email</h2>
          <p className="text-xs text-gray-500 mb-2">
            Send after they fill the form.
          </p>
          <a
            href="#followup"
            className="text-sm text-orange-600 font-semibold hover:underline"
          >
            Jump to follow-up →
          </a>
        </div>
      </section>

      {/* Main script */}
      <section
        id="rep-intro"
        className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm"
      >
        <h2 className="text-lg font-semibold mb-3">
          Discovery / Door-Knock Script (Human, Local)
        </h2>
        <p className="text-sm leading-relaxed mb-3">
          <strong>“Hi, my name is [Rep Name], and I’m your Local Deals 24/7
          representative here in [City].</strong> I grew up right here, and I’ve
          seen how much small businesses mean to this community — they sponsor
          our teams, hire our kids, and keep our towns alive.
        </p>
        <p className="text-sm leading-relaxed mb-3">
          Over the last few years, the world moved into our phones. Big
          companies figured out how to get attention online, and a lot of local
          heroes got left behind. <strong>That’s what we fix.</strong>
        </p>
        <p className="text-sm leading-relaxed mb-3">
          Local Deals 24/7 puts your business in front of people in your city
          who actually want to save local — with daily deals, follow buttons,
          and real customer engagement. It’s simple: shoppers save, businesses
          get visibility, the city wins.
        </p>
        <p className="text-sm leading-relaxed">
          <strong>
            Right now we’re onboarding businesses here with a free trial
          </strong>{" "}
          so you can see it working before you spend a dime. I just need a few
          details to get you listed.”
        </p>
      </section>

      {/* Free trial pitch */}
      <section
        id="free-trial"
        className="bg-orange-50 border border-orange-100 rounded-2xl p-6 mb-8"
      >
        <h2 className="text-lg font-semibold mb-3 text-orange-900">
          Free Trial Pitch (Short Version)
        </h2>
        <p className="text-sm text-orange-950 leading-relaxed mb-2">
          “We’re featuring local businesses in your city right now. If you come
          on during this window, we set up your page, add your first offer, and
          plug you into the local feed — <strong>free.</strong> It’s our way of
          jump-starting the marketplace. If you see people viewing and following
          you, we can talk about keeping it going.”
        </p>
        <p className="text-xs text-orange-900">
          *Use this right after the discovery script, before you hand them the
          form page we just built.
        </p>
      </section>

      {/* Follow up */}
      <section
        id="followup"
        className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm"
      >
        <h2 className="text-lg font-semibold mb-3">
          Follow-Up Text / Email (After They Fill the Form)
        </h2>
        <pre className="whitespace-pre-wrap text-sm bg-gray-50 border border-gray-100 rounded-lg p-4">
{`Hi [Name], this is [Rep] with Local Deals 24/7.

Thanks for sending your business info — I have you down as:
• Business: [Business Name]
• City: [City]
• First offer: [Deal]

I’ll get your page started and send you a preview link. If you like it, we keep you in the local feed. If not, no problem — it’s part of the free trial window we talked about.

– [Rep]
Local Deals 24/7`}
        </pre>
      </section>

      <p className="text-xs text-gray-400">
        Later we can make this dynamic (pulling your name/city from the session),
        but this will work today for you and any rep you hire.
      </p>
    </main>
  );
}
