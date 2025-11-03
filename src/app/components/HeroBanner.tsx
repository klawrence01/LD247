// C:\Users\Owner\ld247\src\app\components\HeroBanner.tsx

"use client";

import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-18">
        {/* little eyebrow */}
        <p className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-gray-500 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          Local Deals 24/7 • Built for Main Street
        </p>

        {/* main block */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">
          {/* LEFT: text */}
          <div className="flex-1 w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-semibold tracking-tight text-gray-900 leading-tight mb-4">
              More foot-traffic. <span className="text-gray-500 font-normal">Less effort.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 max-w-xl">
              Publish deals in minutes, reach local shoppers, and keep them coming back — without
              paying 50% to a middleman. Your customers, your list, your community.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/vendor/start"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition"
              >
                Start 14-day free trial
              </Link>
              <Link
                href="/vendor/how-it-works"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                See how it works
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              No credit card required. Cancel anytime.
            </p>
          </div>

          {/* RIGHT: simple preview box */}
          <div className="w-full max-w-md lg:max-w-sm">
            <div className="rounded-3xl border border-gray-100 bg-white shadow-sm/50 shadow-[0_24px_60px_rgba(15,23,42,0.04)] overflow-hidden">
              <div className="bg-gray-50 px-5 py-4 border-b border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Today’s deal preview
                </p>
                <p className="text-sm text-gray-900 mt-1">“2 Slices + Drink for $6.99”</p>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Big Tony’s Pizza</p>
                  <span className="inline-flex items-center gap-1 text-xs text-amber-500">
                    ★ 4.7
                  </span>
                </div>
                <p className="text-sm text-gray-500">Neighborhood favorite since ’98.</p>
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-orange-50 text-orange-600 text-xs px-3 py-1">
                    Wed • Oct 29
                  </span>
                  <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-600 text-xs px-3 py-1">
                    12 alerts
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 pt-1">
                  Showing what your customers will see on the city page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
