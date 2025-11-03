"use client";

import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Promo ribbon */}
      <div className="w-full bg-orange-600 text-white text-center text-sm py-2 px-3">
        <span className="font-semibold">New vendors:</span> 14-day free trial
        <span className="mx-2">•</span>
        <span className="font-semibold">Bonus:</span> Get <b>30 visitors</b> in your first 30 days and your <b>next month is free</b>.
        <button
          onClick={() => alert("We’ll validate visitors via your vendor analytics. Applies to new accounts only.")}
          className="ml-2 underline"
        >
          Details
        </button>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-10 lg:px-16 py-14 md:py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600 mb-3 bg-white">
              Local Deals 24/7 • Built for Main Street
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
              More foot-traffic. <span className="text-orange-600">Less effort.</span>
            </h1>
            <p className="mt-4 text-gray-700 text-lg">
              Publish deals in minutes, message followers, and turn happy customers
              into testimonials — all in one vendor dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/signin?trial=1"
                className="px-5 py-3 rounded-xl bg-orange-600 text-white font-medium hover:opacity-95"
              >
                Start 14-day free trial
              </Link>
              <Link
                href="/vendor/training"
                className="px-5 py-3 rounded-xl border hover:bg-gray-100"
              >
                See how it works
              </Link>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              No credit card required to start. Cancel anytime.
            </div>
          </div>

          {/* Right: product snapshot */}
          <div className="rounded-2xl border shadow-sm bg-white p-4">
            <div className="aspect-video rounded-lg bg-black/5 overflow-hidden grid place-items-center">
              <div className="text-center text-sm text-gray-600">
                Product preview
                <div className="mt-2 text-xs text-gray-500">
                  (Drop a screenshot/gif here later)
                </div>
              </div>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {[
                "One-click testimonials",
                "Followers & messaging",
                "Deal calendar & slots",
                "Redemption tracking",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-600" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Logos / trust */}
      <section className="px-6 md:px-10 lg:px-16 py-10">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-600">
          Trusted by local restaurants, salons, gyms, and retailers.
        </div>
      </section>

      {/* Feature rows */}
      <section className="px-6 md:px-10 lg:px-16 py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
          {[
            {
              t: "Publish deals fast",
              d: "Clear, time-bound offers customers understand and redeem.",
            },
            { t: "Grow followers", d: "Invite customers to follow and message them anytime." },
            {
              t: "Collect reviews",
              d: "Request reviews after verified redemptions and post the best as testimonials.",
            },
          ].map((x, i) => (
            <div key={i} className="rounded-2xl border shadow-sm bg-white p-5">
              <div className="text-lg font-semibold">{x.t}</div>
              <p className="text-sm text-gray-700 mt-2">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 md:px-10 lg:px-16 py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">Simple pricing</h2>
            <p className="text-sm text-gray-600 mt-1">Start free. Upgrade when you’re ready.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: "Starter",
                price: "Free",
                badge: "14-day free trial",
                features: ["Unlimited deals", "Basic analytics", "Email support"],
                cta: "Create free account",
                href: "/signin?trial=1",
              },
              {
                name: "Pro",
                price: "$49/mo",
                badge: "Most popular",
                features: [
                  "Followers & messaging",
                  "Testimonials",
                  "Priority support",
                ],
                cta: "Start Pro trial",
                href: "/signin?trial=1&plan=pro",
                highlight: true,
              },
              {
                name: "Plus",
                price: "$99/mo",
                badge: "Growing teams",
                features: ["Advanced analytics", "3 seats", "Everything in Pro"],
                cta: "Start Plus trial",
                href: "/signin?trial=1&plan=plus",
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border shadow-sm bg-white p-5 ${
                  p.highlight ? "ring-2 ring-orange-600" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">{p.name}</div>
                  <span className="text-xs px-2 py-1 rounded-full border bg-orange-50 text-orange-700 border-orange-200">
                    {p.badge}
                  </span>
                </div>
                <div className="text-2xl font-semibold mt-2">{p.price}</div>
                <ul className="text-sm text-gray-700 mt-3 space-y-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-orange-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className="mt-4 block text-center px-4 py-2 rounded-xl bg-orange-600 text-white hover:opacity-95"
                >
                  {p.cta}
                </Link>
                <div className="text-[11px] text-gray-500 mt-2">
                  Hit 30 visitors in your first 30 days — your next month is free.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section className="px-6 md:px-10 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto rounded-2xl border shadow-sm bg-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xl font-semibold">Ready to get results?</div>
            <p className="text-sm text-gray-700">
              Launch your first deal in under 10 minutes.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/signin?trial=1"
              className="px-5 py-3 rounded-xl bg-orange-600 text-white font-medium hover:opacity-95"
            >
              Start free trial
            </Link>
            <Link href="/vendor/training" className="px-5 py-3 rounded-xl border hover:bg-gray-100">
              Watch training
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
