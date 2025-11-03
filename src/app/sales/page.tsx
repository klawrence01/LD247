// src/app/sales/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List My Business • Local Deals 24/7",
  description:
    "Get your own page, post daily deals, and reach local buyers with Local Deals 24/7.",
};

export default function SalesPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-black">
          Get Your Business Featured
        </h1>
        <p className="mt-4 text-base text-gray-700">
          Local Deals 24/7 helps local businesses get attention — without
          spending crazy ad money. You get your own public page, daily deal
          slots, and real customer demand.
        </p>

        <div className="mt-6 inline-block rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white">
          Everyday Deals. Everyday Heroes.
        </div>
      </header>

      {/* Interest Form */}
      <section className="mt-10 rounded-2xl border p-6 shadow-sm bg-white">
        <h2 className="text-lg font-semibold text-black">
          Tell us about your business
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          This isn’t a contract. This just lets us reach out and get you set up.
        </p>

        <form
          action="/api/lead"
          method="POST"
          className="mt-6 grid gap-5 text-sm"
        >
          {/* Business Name */}
          <div className="grid gap-2">
            <label
              htmlFor="businessName"
              className="font-medium text-gray-800"
            >
              Business Name *
            </label>
            <input
              id="businessName"
              name="businessName"
              required
              className="w-full rounded-lg border px-3 py-2 shadow-sm"
              placeholder="Tony’s Pizza"
            />
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <label
              htmlFor="category"
              className="font-medium text-gray-800"
            >
              What kind of business are you? *
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full rounded-lg border px-3 py-2 shadow-sm"
            >
              <option value="">Select one…</option>
              <option value="food">Food / Restaurant / Pizza / Café</option>
              <option value="beauty">Nails / Barbers / Beauty / Spa</option>
              <option value="health">Chiropractor / Wellness / Fitness</option>
              <option value="retail">Retail / Shop / Boutique</option>
              <option value="services">Local Service Business</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* City / State */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label
                htmlFor="city"
                className="font-medium text-gray-800"
              >
                City *
              </label>
              <input
                id="city"
                name="city"
                required
                className="w-full rounded-lg border px-3 py-2 shadow-sm"
                placeholder="New Haven"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="state"
                className="font-medium text-gray-800"
              >
                State *
              </label>
              <input
                id="state"
                name="state"
                required
                className="w-full rounded-lg border px-3 py-2 shadow-sm"
                placeholder="CT"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid gap-2">
            <label
              htmlFor="contact"
              className="font-medium text-gray-800"
            >
              Best way to reach you (phone or email) *
            </label>
            <input
              id="contact"
              name="contact"
              required
              className="w-full rounded-lg border px-3 py-2 shadow-sm"
              placeholder="203-555-1234 or owner@tonyspizza.com"
            />
          </div>

          {/* Promo Interest */}
          <div className="grid gap-2">
            <label
              htmlFor="offer"
              className="font-medium text-gray-800"
            >
              What kind of deal would you want to promote first?
            </label>
            <textarea
              id="offer"
              name="offer"
              rows={3}
              className="w-full rounded-lg border px-3 py-2 shadow-sm"
              placeholder="2 slices + drink for $5 (normally $9)"
            />
            <p className="text-xs text-gray-500">
              Example: “20% off first visit”, “Free brow wax with manicure”, “First class $10”
            </p>
          </div>

          {/* How did you hear about us */}
          <div className="grid gap-2">
            <label
              htmlFor="source"
              className="font-medium text-gray-800"
            >
              How did you hear about Local Deals 24/7?
            </label>
            <input
              id="source"
              name="source"
              className="w-full rounded-lg border px-3 py-2 shadow-sm"
              placeholder="Friend, Instagram, you visited my shop, etc."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 inline-block rounded-lg bg-[#F15A29] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-black hover:text-white transition"
          >
            Request My Page →
          </button>
        </form>
      </section>

      {/* Promise / Social Proof */}
      <section className="mt-10 rounded-xl border bg-black p-6 text-white">
        <div className="text-lg font-semibold text-orange-400">
          Why businesses join Local Deals 24/7
        </div>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-200">
          <li>• You get a public page you can send to customers.</li>
          <li>• You can post daily/limited deals — “today only,” “this weekend,” etc.</li>
          <li>• We bring you local buyers who actually show up.</li>
          <li>• You don’t need to learn ads. We already speak customer.</li>
        </ul>
        <div className="mt-4 text-[11px] text-gray-400 italic">
          Your dollars stay local. Your neighbors stay in business.
        </div>
      </section>
    </main>
  );
}
