"use client";

import { useState } from "react";

type Business = {
  name?: string;
  plan_type?: string; // "99", "49", etc.
  is_trial?: boolean; // true during 30-day free period
  trial_ends_at?: string; // ISO date string if you have it
};

export default function AdvertisingPage({
  business,
}: {
  business?: Business;
}) {
  const [selectedDeal, setSelectedDeal] = useState("");
  const [duration, setDuration] = useState("24 hours");

  // helper to show human-ish trial end date if we have one
  const trialEnd = business?.trial_ends_at
    ? new Date(business.trial_ends_at).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "soon";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* OUR CURRENT PLANS */}
      <section className="bg-white border border-gray-300 rounded-xl shadow-sm p-5 mb-10">
        <h2 className="text-xl font-extrabold mb-4 text-gray-900">
          Our Current Plans
        </h2>

        <p className="text-sm text-gray-700 mb-6 max-w-2xl">
          Local Deals 24/7 was built to make small business marketing simple.
          Below is your current plan and what’s available if you want to grow
          your reach.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT CARD: YOUR PLAN */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="text-lg font-bold mb-2 text-gray-900">Your Plan</h3>

            {/* PRIORITY 1: Trial view */}
            {business?.is_trial ? (
              <>
                <p className="font-semibold text-orange-700 mb-1">
                  30-Day Free Trial (Active)
                </p>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  You’re currently on the Managed Plan ($99/mo) at no cost
                  during your trial. Your rep is helping build and promote your
                  deals for you.
                  <br />
                  <span className="font-semibold">
                    Trial ends: {trialEnd}.
                  </span>
                </p>

                <ul className="list-disc ml-5 text-sm text-gray-700 leading-relaxed mb-4">
                  <li>We schedule and promote your deals for you.</li>
                  <li>You’re visible on your city page and coupon list.</li>
                  <li>You’re building followers right now.</li>
                  <li>
                    You’ll roll into $99/mo unless you tell us to stop.
                  </li>
                </ul>

                {/* CTA: What happens after my trial */}
                <button
                  onClick={() =>
                    (window.location.href =
                      "/dashboard/merchant/trial")
                  }
                  className="bg-orange-600 text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-orange-700 w-full md:w-auto"
                >
                  What Happens After My Trial?
                </button>

                <p className="text-xs text-gray-600 mt-2 leading-snug">
                  Get set up now so you’re ready when the trial flips to live
                  billing. You’ll also see how to pull your QR code, gather
                  followers, and send everything your rep needs.
                </p>
              </>
            ) : business?.plan_type === "99" ? (
              /* PRIORITY 2: Managed plan */
              <>
                <p className="font-semibold text-green-700 mb-1">
                  Managed Plan – $99/month
                </p>
                <ul className="list-disc ml-5 text-sm text-gray-700 leading-relaxed">
                  <li>We help manage and schedule your deals.</li>
                  <li>Up to 8 active slots at a time.</li>
                  <li>
                    Includes Messaging Center / Announcements so you can reach
                    followers.
                  </li>
                  <li>Personal assistance from your LD247 rep.</li>
                </ul>
                <p className="text-xs text-gray-600 mt-3">
                  Your rep can help you get more from your plan — reach out any
                  time.
                </p>
              </>
            ) : (
              /* PRIORITY 3: Self-managed plan */
              <>
                <p className="font-semibold text-orange-700 mb-1">
                  Self-Managed Plan – $49/month
                </p>
                <ul className="list-disc ml-5 text-sm text-gray-700 leading-relaxed">
                  <li>You post and control your own deals.</li>
                  <li>Up to 10 active slots at a time.</li>
                  <li>Visible on your city page and coupon list.</li>
                  <li>
                    Basic tools for surveys, analytics, and testimonials.
                  </li>
                </ul>

                <div className="mt-4">
                  <button
                    onClick={() =>
                      (window.location.href =
                        "/dashboard/merchant/training")
                    }
                    className="bg-orange-600 text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-orange-700 w-full md:w-auto"
                  >
                    Open Your Training Section
                  </button>
                  <p className="text-xs text-gray-600 mt-2 leading-snug">
                    Get set up to place your business right in the palms of
                    thousands of customers who are just waiting to do business
                    with you.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* RIGHT CARD: WAYS TO UPGRADE */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-gray-900">
              Ways to Upgrade
            </h3>

            {business?.is_trial ? (
              <>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  You’re in your trial on our Managed Plan. Here’s what stays
                  on if you continue after the trial:
                </p>
                <ul className="list-disc ml-5 text-sm text-gray-700 leading-relaxed mb-4">
                  <li>
                    <strong>Managed Support</strong> – We keep building and
                    promoting your deals for you.
                  </li>
                  <li>
                    <strong>Announcement Tools</strong> – Reach your
                    followers with special promos and events.
                  </li>
                  <li>
                    <strong>Priority Placement</strong> – Better visibility on
                    the city page.
                  </li>
                </ul>
                <button
                  onClick={() =>
                    (window.location.href =
                      "/dashboard/merchant/trial")
                  }
                  className="bg-orange-600 text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-orange-700 w-full md:w-auto"
                >
                  See Trial Next Steps
                </button>
              </>
            ) : business?.plan_type === "99" ? (
              <>
                <p className="text-sm text-gray-700 mb-3">
                  You’re on our managed plan — great choice. Want even more
                  visibility?
                </p>
                <ul className="list-disc ml-5 text-sm text-gray-700 leading-relaxed">
                  <li>
                    <strong>City Spotlight</strong> – Get featured as a local
                    favorite at the top of your city.
                  </li>
                  <li>
                    <strong>Boost This Deal</strong> – Push a deal higher on
                    your city page for 24–72 hours.
                  </li>
                  <li>
                    <strong>Announcement Blasts</strong> – We send a special
                    message to local followers for your event or promo.
                  </li>
                </ul>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  You’re on our entry plan. Upgrade to unlock managed features
                  and stronger reach:
                </p>
                <ul className="list-disc ml-5 text-sm text-gray-700 leading-relaxed">
                  <li>
                    <strong>Managed Support</strong> – We build, schedule, and
                    promote your deals for you.
                  </li>
                  <li>
                    <strong>Announcement Tools</strong> – Message your
                    followers directly through LD247.
                  </li>
                  <li>
                    <strong>Priority Placement</strong> – Get better visibility
                    on the city page.
                  </li>
                </ul>
                <div className="mt-4">
                  <button
                    onClick={() =>
                      alert(
                        "Contact your rep to upgrade to the $99/month Managed Plan."
                      )
                    }
                    className="bg-orange-600 text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-orange-700 w-full md:w-auto"
                  >
                    Talk to a Rep About Upgrading
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* VISIBILITY TOOLS */}
      <section>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Visibility Tools
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Simple tools to help your business get seen by more locals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* BOOST THIS DEAL */}
          <div className="border rounded-lg p-5 shadow-sm bg-white">
            <h3 className="text-lg font-semibold mb-2">Boost This Deal</h3>
            <p className="text-sm text-gray-600 mb-3">
              Put one of your live offers at the top of your city page for 24
              hours. Great for weekends or slow times.
            </p>

            <label className="text-sm font-semibold block mb-1">
              Which deal?
            </label>
            <select
              value={selectedDeal}
              onChange={(e) => setSelectedDeal(e.target.value)}
              className="border rounded-md px-2 py-1 w-full mb-2"
            >
              <option>Select a deal…</option>
              <option>Example Deal 1</option>
              <option>Example Deal 2</option>
            </select>

            <label className="text-sm font-semibold block mb-1">
              How long?
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border rounded-md px-2 py-1 w-full mb-4"
            >
              <option>24 hours</option>
              <option>48 hours</option>
              <option>72 hours</option>
            </select>

            <button className="bg-black text-white w-full py-2 rounded-md font-semibold hover:bg-gray-800">
              Request Boost
            </button>

            <p className="text-xs text-gray-500 mt-2">
              We’ll move this deal up where locals can’t miss it.
            </p>
          </div>

          {/* CITY SPOTLIGHT */}
          <div className="border rounded-lg p-5 shadow-sm bg-white">
            <h3 className="text-lg font-semibold mb-2">City Spotlight</h3>
            <p className="text-sm text-gray-600 mb-4">
              Be featured as a “Local Favorite” in your city. Strong if you
              want attention without a deep discount.
            </p>

            <button className="bg-orange-600 text-white w-full py-2 rounded-md font-semibold hover:bg-orange-700">
              Request Spotlight
            </button>

            <p className="text-xs text-gray-500 mt-2">
              We’ll reach out to confirm timing and placement.
            </p>
          </div>

          {/* ANNOUNCE ME TO LOCALS */}
          <div className="border rounded-lg p-5 shadow-sm bg-white">
            <h3 className="text-lg font-semibold mb-2">
              Announce Me to Locals
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              We’ll work with you to send a special announcement to local
              followers. Great for events and limited-time promos.
            </p>

            <button className="bg-gray-300 text-gray-800 w-full py-2 rounded-md font-semibold cursor-not-allowed">
              Upgrade to Unlock
            </button>

            <p className="text-xs text-gray-500 mt-2">
              A rep will confirm the message before it goes out. We don’t spam.
            </p>
          </div>
        </div>

        {/* YOUR REQUESTS */}
        <div className="border rounded-lg p-5 shadow-sm bg-white">
          <h3 className="text-lg font-semibold mb-2">Your Requests</h3>
          <p className="text-sm text-gray-600">
            You haven’t requested anything yet.
          </p>
        </div>
      </section>
    </div>
  );
}
