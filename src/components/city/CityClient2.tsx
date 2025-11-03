// C:\Users\Owner\ld247\src\components\city\CityClient.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MiniCalendar from "@/components/city/MiniCalendar";
import DealRow from "@/components/city/DealRow";
import { Deal, isDealOnDate } from "@/utils/deals";

type FeaturedMerchant = {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  rating?: number;
  blurb?: string;
};

export default function CityClient({
  city,
  todayISO,
  deals,
  featuredMerchants,
}: {
  city: string;
  todayISO: string;
  deals: Deal[];
  featuredMerchants: FeaturedMerchant[];
}) {
  // --- existing date / filtering logic ---
  const today = useMemo(() => new Date(todayISO), [todayISO]);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const prettyDate = useMemo(
    () =>
      selectedDate.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    [selectedDate]
  );

  const dayDeals = useMemo(
    () => deals.filter((d) => isDealOnDate(d, selectedDate)),
    [deals, selectedDate]
  );

  // Capitalized city for display
  const cityDisplay =
    city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      {/* HEADER / SEARCH */}
      <h1 className="mb-4 text-center text-3xl font-extrabold tracking-wide">
        SEARCH LOCAL DEALS
      </h1>

      {/* City select + search */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <select className="rounded-xl border px-3 py-2 text-sm font-medium shadow-sm">
          <option>{cityDisplay} ▾</option>
        </select>
        <input
          className="flex-1 rounded-xl border px-4 py-2 text-sm shadow-sm"
          placeholder="Search for pizza, barbershop etc"
        />
      </div>

      {/* Mini calendar / date selector */}
      <MiniCalendar
        today={today}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />

      {/* CITY TITLE / SUBTITLE / SELECTED DAY */}
      <div className="mt-6 text-center">
        <div className="text-5xl font-extrabold tracking-wider">
          {city.toUpperCase()}
        </div>
        <div className="text-gray-700 font-medium">
          Everyday Deals. Everyday Heroes.
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Showing deals for: {prettyDate}
        </div>
      </div>

      {/* DEAL LIST */}
      <section className="mt-6 rounded-xl border bg-white shadow-sm divide-y">
        {dayDeals.map((d) => (
          <DealRow key={d.id} deal={d} />
        ))}

        {dayDeals.length === 0 && (
          <div className="py-10 text-center text-gray-500 text-sm">
            No deals yet. Check other days.
          </div>
        )}
      </section>

      {/* FEATURED MERCHANTS (only if we have them) */}
      {featuredMerchants && featuredMerchants.length > 0 && (
        <section className="mt-10">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-xl font-bold tracking-wide">
              Featured in {cityDisplay}
            </h2>
            <div className="text-xs text-gray-500">
              These businesses are part of our local lineup.
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMerchants.map((biz) => (
              <a
                key={biz.id}
                href={`/vendor/${biz.slug}`}
                className="group flex flex-col rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Logo / image */}
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 border">
                    {biz.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={biz.logo_url}
                        alt={biz.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                        No Logo
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold leading-tight group-hover:text-orange-600">
                      {biz.name}
                    </div>
                    {biz.rating && (
                      <div className="text-xs text-gray-500">
                        ⭐ {biz.rating.toFixed(1)} / 5
                      </div>
                    )}
                  </div>
                </div>

                {/* Blurb */}
                {biz.blurb && (
                  <div className="mb-4 text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {biz.blurb}
                  </div>
                )}

                {/* CTA */}
                <div className="mt-auto">
                  <div className="inline-block rounded-lg bg-orange-600 px-3 py-2 text-center text-xs font-semibold text-white shadow hover:bg-orange-700">
                    View Page →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* BEHIND THE HUSTLE SECTION */}
      <section className="mt-10 rounded-2xl bg-black text-white p-6 hover:bg-gray-900 transition cursor-pointer">
        <Link href="/behind-the-hustle" className="block">
          <div className="text-lg font-bold tracking-wide text-orange-400">
            Behind the Hustle
          </div>
          <div className="mt-2 text-sm leading-relaxed text-gray-200">
            Local Deals 24/7 exists for small business owners — the barbers, the
            pizza shops, the nail techs, the chiropractors, the people who keep
            your city alive. We help them get attention without paying crazy ad
            money.
          </div>
          <div className="mt-3 text-xs text-gray-400 italic">
            Your dollars stay local. Your neighbors stay in business.
          </div>
        </Link>
      </section>

      {/* OWN A BUSINESS CTA */}
      <section className="mt-8 mb-16 rounded-xl border border-orange-600 bg-orange-50 px-5 py-6 text-center shadow-sm">
        <div className="text-base font-bold text-orange-700">
          Own a local business?
        </div>
        <div className="mt-1 text-sm text-gray-700">
          Get your own page, post daily deals, and reach local buyers instantly.
        </div>
        <a
          href="/sales"
          className="mt-4 inline-block rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-700"
        >
          List My Business →
        </a>
      </section>
    </main>
  );
}
