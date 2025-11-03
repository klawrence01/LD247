"use client";

import React from "react";

export default function SalesLeadPage() {
  // mock metrics for now – later pull from DB
  const stats = [
    { label: "New Leads Today", value: 3 },
    { label: "Appointments This Week", value: 5 },
    { label: "Businesses Onboarded", value: 2 },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Rep snapshot */}
      <section className="max-w-5xl mx-auto pt-8 px-4 lg:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <p className="text-xs uppercase text-gray-500 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top hero / founder voice */}
      <section className="max-w-5xl mx-auto pt-2 px-4 lg:px-0">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight mb-3">
            Get Your Business Featured
          </h1>
          <p className="text-gray-700 leading-relaxed mt-2 max-w-3xl mx-auto">
            Local Deals 24/7 helps local businesses get attention — without
            spending crazy ad money. You get your own public page, daily deal
            slots, and real customer activity in your city.
            <strong className="block text-orange-600 mt-2">
              For a limited time, sign up now and unlock a <u>free trial</u> —
              giving your business the power to be seen everywhere.
            </strong>
          </p>
        </div>

        {/* Video + founder note – stays light, top third */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start mb-12">
          {/* Video placeholder */}
          <div className="w-full">
            <div className="relative w-full overflow-hidden rounded-2xl bg-black aspect-video flex items-center justify-center text-white text-sm">
              <span className="opacity-80">Your welcome video goes here</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Tip: record a 45–60 second personal welcome so they know it’s you.
            </p>
          </div>

          {/* Kenneth voice */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              <strong>Hi, I’m Kenneth Lawrence.</strong> I built Local Deals
              24/7 because I watched great small businesses lose visibility —
              not because they stopped trying, but because the world moved into
              our phones and big brands learned how to stay in front of people.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              Our goal is simple: make it easy for locals to find you, follow
              you, and save with you. Every follow, every saved deal, every
              testimonial — that’s your community saying, “we see you.”
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Fill out the short form below so we can set you up in the right
              city and put your first offer where people are already looking.
              This isn’t a contract — it’s just us getting you live during the
              free trial window.
            </p>
          </div>
        </div>
      </section>

      {/* Form – main focus */}
      <section className="max-w-5xl mx-auto pb-16 px-4 lg:px-0">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">
            Tell us about your business
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            This isn’t a contract. This just lets us reach out and get you set
            up on Local Deals 24/7.
          </p>

          <form className="space-y-5">
            {/* Business name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue="Tony’s Pizza"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your business name"
              />
            </div>

            {/* Business type */}
            <div>
              <label className="block text-sm font-medium mb-1">
                What kind of business are you?{" "}
                <span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">Select one…</option>
                <option>Restaurant / Food</option>
                <option>Salon / Barber</option>
                <option>Fitness / Wellness</option>
                <option>Services / Home</option>
                <option>Retail / Boutique</option>
                <option>Other local business</option>
              </select>
            </div>

            {/* City / State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="New Haven"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="CT"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Best way to reach you (phone or email){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="203-555-1234 or owner@tonyspizza.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* First deal */}
            <div>
              <label className="block text-sm font-medium mb-1">
                What kind of deal would you want to promote first?
              </label>
              <textarea
                rows={3}
                defaultValue="2 slices + drink for $5 (normally $9)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Give us something simple. We can help you make it look good in
                LD247.
              </p>
            </div>

            {/* Submit */}
            <div className="pt-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-black text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-900 transition-colors"
              >
                Start my free trial setup
              </button>
              <p className="text-xs text-gray-400 mt-2">
                A local rep will contact you to finish your listing.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
