"use client";

import React from "react";

export default function SalesRepPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <p className="text-xs uppercase tracking-wide text-orange-500 mb-2">
          Local Deals 24/7 • Your City Rep
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Meet your LD247 Sales Representative
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          We actually have someone assigned to your area. Watch the short intro and send them your
          business info — they’ll build out your page, add your deals, and get you into the rotation.
        </p>

        {/* video + contact */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-slate-200 rounded-2xl aspect-video flex items-center justify-center text-slate-500 text-sm">
            Rep intro video goes here
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Rep Info</h2>
            <p className="text-sm text-slate-700 mb-1">
              <span className="font-semibold">Name:</span> Wanda Sykes
            </p>
            <p className="text-sm text-slate-700 mb-1">
              <span className="font-semibold">Region:</span> Greater New Haven
            </p>
            <p className="text-sm text-slate-700 mb-4">
              <span className="font-semibold">Contact:</span> wanda@ld247.com • (203) 555-0199
            </p>
            <a
              href="/sales"
              className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Send My Business Info
            </a>
            <p className="text-[10px] text-slate-400 mt-2">
              Later this button can pre-fill the sales lead form with rep_id.
            </p>
          </div>
        </div>

        {/* what happens next */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
          <h2 className="text-base font-semibold text-slate-900 mb-3">
            What happens after you submit?
          </h2>
          <ol className="space-y-2 text-sm text-slate-700">
            <li>1. Rep receives your info and confirms your city.</li>
            <li>2. Rep creates your merchant page using your logo/photos.</li>
            <li>3. Rep adds 1–3 starter deals to your calendar.</li>
            <li>4. You appear in search when your city goes live.</li>
          </ol>
        </div>

        <p className="text-xs text-slate-400">
          Later we can turn this into a dynamic route: <code>/sales/rep/[slug]</code> pulling from
          the <code>sales_reps</code> table.
        </p>
      </div>
    </main>
  );
}
