// src/app/localdeals247scam/page.tsx

import Link from "next/link";

export const metadata = {
  title: "Is Local Deals 24/7 a scam?",
  description:
    "Straight answers from the founder. How it works, why we built it, and what you’re actually signing up for.",
};

export default function ScamPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-900">
      <h1 className="text-3xl font-extrabold text-black mb-4">
        Is Local Deals 24/7 a scam?
      </h1>

      <p className="text-gray-700 text-base leading-relaxed mb-6">
        Short answer: No. We’re not here to take half your sale, lock you in a
        contract you can’t escape, or embarrass your brand with “70% OFF
        EVERYTHING” blasts. We’re here to drive traffic on your slow days and
        help you build a list of customers who actually come back.
      </p>

      <div className="bg-black text-white rounded-lg p-5 mb-8">
        <h2 className="text-lg font-bold text-orange-400 mb-3">
          Why are people even asking this?
        </h2>
        <p className="text-sm leading-relaxed text-white mb-4">
          Because a lot of “deal sites” before us did you dirty. They forced you
          to slash your price to the bone, then they took a huge cut on top of
          that. You lost money just to get bodies in the door — and most of
          those people never came back.
        </p>
        <p className="text-sm leading-relaxed text-white">
          We don’t run that play.
        </p>
      </div>

      <h2 className="text-xl font-bold text-black mb-3">
        Here’s how Local Deals 24/7 actually works
      </h2>

      <ul className="list-disc pl-5 text-gray-800 text-sm leading-relaxed mb-6 space-y-2">
        <li>
          <span className="font-semibold">You keep your sale.</span> We do not
          take half the money.
        </li>
        <li>
          <span className="font-semibold">
            You control the deal calendar.
          </span>{" "}
          You pick which days you want to push traffic. Tuesday slow? Make
          Tuesday your money day.
        </li>
        <li>
          <span className="font-semibold">
            Your business gets followers.
          </span>{" "}
          People can follow <em>you</em> directly and get notified when you post
          something new — not some generic “city coupon dump.”
        </li>
        <li>
          <span className="font-semibold">
            You build repeat customers.
          </span>{" "}
          The goal is not a one-time coupon jumper. The goal is regulars.
        </li>
        <li>
          <span className="font-semibold">
            You can pause or mark “out of stock.”
          </span>{" "}
          If you run out, you’re not stuck honoring something you can’t afford.
        </li>
      </ul>

      <div className="rounded-md border border-gray-300 p-4 mb-8 text-sm leading-relaxed text-gray-800 bg-gray-50">
        <p className="mb-2">
          <strong>In plain English:</strong> We’re not here to drain you. We’re
          here to fill your slow times and keep your name in front of local
          people without you spending thousands on ads.
        </p>
        <p>That’s it. That’s the model.</p>
      </div>

      <h2 className="text-xl font-bold text-black mb-3">
        Who’s behind this?
      </h2>

      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        Local Deals 24/7 was built for small business owners — barbers, pizza
        shops, nail techs, massage therapists, coffee spots, local gyms, auto
        shops — the people who keep a city alive. We talk about that openly in{" "}
        <Link
          href="/behind-the-hustle"
          className="text-blue-600 underline hover:text-orange-600 font-semibold"
        >
          Behind the Hustle
        </Link>
        . That’s not marketing fluff. That’s the mission.
      </p>

      <p className="text-gray-700 text-sm leading-relaxed mb-8">
        We call local owners “Everyday Heroes.” We mean that. You deserve
        traffic and loyalty without getting bled out by ad spend.
      </p>

      <h2 className="text-xl font-bold text-black mb-3">
        Can I talk to a human?
      </h2>

      <p className="text-gray-700 text-sm leading-relaxed mb-2">
        Yes. When one of our reps walks in, you’re not talking to an offshore
        call center. You’re talking to somebody who lives in your state and is
        literally building this city by city.
      </p>

      <p className="text-gray-700 text-sm leading-relaxed mb-6">
        Ask them to show you your actual page, your deal calendar, and how
        followers get notified. Make them prove it. We’re fine with that.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded-md p-4 text-center">
        <p className="text-sm text-gray-800 leading-relaxed mb-2">
          Want a walkthrough instead?
        </p>
        <Link
          href="/behind-the-hustle"
          className="inline-block text-blue-600 underline hover:text-orange-600 font-semibold text-sm"
        >
          Read Behind the Hustle
        </Link>
        <p className="text-[11px] text-gray-500 mt-3">
          When you win, we win. If you’re not winning, we didn’t do our job.
        </p>
      </div>
    </main>
  );
}
