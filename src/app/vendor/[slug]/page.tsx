"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import VendorHeader from "@/app/vendor/VendorHeader";
import VendorDealCard from "@/app/vendor/VendorDealCard";
import TestimonialsSection from "@/app/vendor/TestimonialsSection";
import SurveyCTA from "@/app/vendor/SurveyCTA";
import MediaGallery from "@/app/vendor/MediaGallery";

// MOCK DATA for now – later load by slug from Supabase
const VENDOR = {
  id: "tonys-pizza",
  name: "Tony’s Pizza",
  tagline: "Neighborhood favorite since ‘98.",
  address: "128 Maple Ave, Hartford, CT",
  phone: "(860) 555-1234",
  website: "https://example.com",
  rating: 4.8,
  about:
    "We make our pies fresh every day with a family sauce recipe. Order ahead, walk in, or catch one of our LD247 specials below.",
  story:
    "My father started Tony’s as a 2-oven shop serving the South End. We wanted to bring back the neighborhood pizza experience. Today we serve families, schools, and local teams — and we still know most of our customers by name.",
  images: [
    "/images/pizza.jpg",
    "/images/vendor-chiro.jpg",
    "/images/vendor-cafe.jpg",
    "/images/pizza.jpg",
  ],
};

// 30-day schedule idea, but we will only SHOW 7 to the public
const DEALS = [
  {
    id: "d1",
    title: "Local Deals 24/7 — Get Your Business Listed",
    dealType: "percent_off",
    value: 50,
    date: "2025-11-02",
    description:
      "We’re opening this city. Lock in your spot now and run bold offers like BOGO, 50% OFF, or limited-day promos.",
  },
  {
    id: "d2",
    title: "BOGO Large Pie",
    dealType: "bogo",
    value: null,
    date: "2025-11-03",
    description: "Buy one, get one 50% off. Today only.",
  },
  {
    id: "d3",
    title: "50% Off Lunch Slice",
    dealType: "percent_off",
    value: 50,
    date: "2025-11-04",
    description: "Mon–Thu • 11am–2pm • walk-in.",
  },
  {
    id: "d4",
    title: "Family Friday $19.99",
    dealType: "amount_off",
    value: 19.99,
    date: "2025-11-07",
    description: "Feeds 4 • pickup only.",
  },
  // scheduled future – shows in 30-day, not in 7-day public
  {
    id: "d5",
    title: "Catering 10% Off",
    dealType: "percent_off",
    value: 10,
    date: "2025-11-15",
    description: "Perfect for offices & events.",
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Tanya W.",
    text: "Best pie in Hartford. Staff is always warm.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Marcus J.",
    text: "Deal was honored, good portion. I’ll be back.",
    rating: 4,
  },
];

function getNextNDates(n: number) {
  const out: { label: string; iso: string; weekday: string }[] = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(now.getDate() + i);
    out.push({
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      iso: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }
  return out;
}

export default function VendorPublicPage() {
  const ALL_30 = getNextNDates(30);
  const PUBLIC_WINDOW_DAYS = 7;

  const [selectedDate, setSelectedDate] = useState<string>(ALL_30[0].iso);
  const [show30, setShow30] = useState(false);

  // group deals by date so we can show “This week’s deals”
  const dealsByDate = useMemo(() => {
    const map: Record<string, typeof DEALS> = {};
    DEALS.forEach((d) => {
      if (!map[d.date]) map[d.date] = [];
      map[d.date].push(d);
    });
    return map;
  }, []);

  const dates7 = ALL_30.slice(0, PUBLIC_WINDOW_DAYS);
  const selectedDeals = dealsByDate[selectedDate] || [];

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      {/* TOP ORANGE BAR (from your site) */}
      <div className="w-full bg-[#f0472c] text-white flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          {/* use your real logo here */}
          <span className="text-lg font-semibold tracking-tight">
            Local Deals 24/7
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/sales">Sales</Link>
          <Link href="/city">Cities</Link>
          <Link href="/blog/behind-the-hustle">Behind the Hustle</Link>
          <Link href="/blog/everyday-heroes">Everyday Heroes</Link>
          <Link href="/founder">Founder&apos;s Desk</Link>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <span className="bg-black text-white rounded-full px-4 py-1 text-sm">
            LD247
          </span>
        </div>
      </div>

      {/* PAGE BODY */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 py-6 space-y-6">
        {/* back link */}
        <Link
          href="/city"
          className="text-sm text-slate-400 hover:text-slate-700"
        >
          ← Back to cities
        </Link>

        {/* 1. HEADER / HERO */}
        <VendorHeader
          id={VENDOR.id}
          name={VENDOR.name}
          logoUrl="/images/pizza.jpg"
          website={VENDOR.website}
          phone={VENDOR.phone}
          address={VENDOR.address}
          rating={VENDOR.rating}
          tagline={VENDOR.tagline}
        />

        {/* 2. ABOUT STRIP (the peach bar) */}
        <div className="bg-[#fff5f0] rounded-2xl px-4 py-3 text-sm text-slate-700">
          <span className="font-semibold text-[#f0472c] mr-2">
            About {VENDOR.name}:
          </span>
          {VENDOR.about}
        </div>

        {/* 3. DEALS SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-[#0f172a]">
              This Week’s Deals
            </h2>
            <button
              onClick={() => setShow30((p) => !p)}
              className="text-sm text-[#f0472c] hover:underline"
            >
              {show30 ? "Hide 30-day calendar" : "View next 30 days"}
            </button>
          </div>

          {/* 7-day mini calendar (public) */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {dates7.map((d) => {
              const isActive = d.iso === selectedDate;
              const count = dealsByDate[d.iso]?.length || 0;
              return (
                <button
                    key={d.iso}
                    onClick={() => setSelectedDate(d.iso)}
                    className={`min-w-[82px] rounded-2xl border px-3 py-2 text-center flex flex-col gap-1 transition ${
                        isActive
                            ? "bg-black text-white border-black"
                            : "bg-white text-slate-700 border-slate-200 hover:border-black"
                    }`}
                >
                  <span className="text-[0.63rem] uppercase tracking-wide">
                    {d.weekday}
                  </span>
                  <span className="text-sm font-semibold">{d.label}</span>
                  <span
                    className={`text-[0.6rem] ${
                      isActive ? "text-white/70" : "text-slate-300"
                    }`}
                  >
                    {count ? `${count} deal${count > 1 ? "s" : ""}` : ""}
                  </span>
                </button>
              );
            })}
          </div>

          {/* deals for selected day (use YOUR card) */}
          <div className="grid gap-3 md:grid-cols-2">
            {selectedDeals.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-[#f5eee7] p-5 text-sm text-slate-500">
                No specials for this day. 👋 Check upcoming days or view the
                30-day schedule.
              </div>
            ) : (
              selectedDeals.map((deal) => (
                <VendorDealCard
                  key={deal.id}
                  title={deal.title}
                  imageUrl="/images/pizza.jpg"
                  dealType={deal.dealType}
                  value={deal.value as number | null}
                  startDate={deal.date}
                  endDate={deal.date}
                  businessName={VENDOR.name}
                  businessSlug={VENDOR.id}
                  ctaText="View deal"
                  // extra label so the card can show the actual date
                  dateLabel={new Date(deal.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                  description={deal.description}
                />
              ))
            )}
          </div>

          {/* 30-day grid (just like you wanted, but collapsible) */}
          {show30 ? (
            <div className="bg-white rounded-2xl border border-[#f5eee7] p-4 space-y-3">
              <p className="text-xs text-slate-400">
                Showing 30-day schedule. First {PUBLIC_WINDOW_DAYS} days are
                public. Rest are future/scheduled.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ALL_30.map((d, idx) => {
                  const dayDeals = dealsByDate[d.iso] || [];
                  const isPublic = idx < PUBLIC_WINDOW_DAYS;
                  return (
                    <div
                      key={d.iso}
                      className={`rounded-2xl p-3 border ${
                        isPublic
                          ? "bg-[#fff5f0] border-[#f0472c]/50"
                          : "bg-slate-50 border-slate-100 opacity-85"
                      }`}
                    >
                      <p className="text-xs text-slate-500">{d.weekday}</p>
                      <p className="text-sm font-semibold text-[#0f172a]">
                        {d.label}
                      </p>
                      {dayDeals.length ? (
                        <ul className="mt-2 space-y-1">
                          {dayDeals.map((dl) => (
                            <li
                              key={dl.id}
                              className="text-[0.65rem] text-slate-700 leading-snug"
                            >
                              • {dl.title}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[0.6rem] text-slate-300 mt-2">
                          (no deal)
                        </p>
                      )}
                      {!isPublic ? (
                        <p className="text-[0.55rem] text-slate-400 mt-2">
                          scheduled
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </section>

        {/* 4. ACTION BAR: reviews / testimonials / survey */}
        <div className="bg-white rounded-2xl border border-[#f5eee7] px-4 py-3 flex flex-wrap gap-3 items-center">
          <p className="text-sm font-medium text-[#0f172a]">
            Love this business? Help them grow:
          </p>
          <a
            href="#testimonials"
            className="text-sm rounded-full bg-black text-white px-4 py-1.5"
          >
            ⭐ Read reviews ({TESTIMONIALS.length})
          </a>
          <a
            href={`/review/${VENDOR.id}`}
            className="text-sm rounded-full border border-slate-200 px-4 py-1.5"
          >
            ✍️ Leave a testimonial
          </a>
          <a
            href={`/survey/${VENDOR.id}`}
            className="text-sm rounded-full border border-slate-200 px-4 py-1.5"
          >
            📝 Take our survey
          </a>
          <p className="text-xs text-slate-400 ml-auto">
            (survey results → vendor only)
          </p>
        </div>

        {/* 5. 2-COLUMN LAYOUT: story + testimonials + business info + gallery */}
        <section className="grid lg:grid-cols-[1.1fr_0.65fr] gap-6 items-start">
          {/* LEFT side */}
          <div className="space-y-6">
            {/* mission / story */}
            <div className="bg-white rounded-3xl border border-[#f5eee7] p-5">
              <h2 className="text-lg font-semibold text-[#0f172a] mb-2">
                Mission / Our Story
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {VENDOR.story}
              </p>
              <p className="mt-4 text-sm text-[#f0472c] font-semibold">
                “Good people. Great pizza.”
              </p>
            </div>

            {/* testimonials */}
            <div
              id="testimonials"
              className="bg-white rounded-3xl border border-[#f5eee7] p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#0f172a]">
                  Customer Reviews
                </h2>
                <Link
                  href={`/review/${VENDOR.id}`}
                  className="text-sm text-[#f0472c] hover:underline"
                >
                  Leave one
                </Link>
              </div>
              <TestimonialsSection items={TESTIMONIALS} />
            </div>

            {/* survey cta (for visitors) */}
            <div className="bg-white rounded-3xl border border-[#f5eee7] p-5">
              <SurveyCTA vendorId={VENDOR.id} vendorName={VENDOR.name} />
            </div>
          </div>

          {/* RIGHT side */}
          <div className="space-y-6">
            {/* business info */}
            <div className="bg-white rounded-3xl border border-[#f5eee7] p-5 space-y-2">
              <h2 className="text-lg font-semibold text-[#0f172a]">
                Visit {VENDOR.name}
              </h2>
              <p className="text-sm text-slate-700">{VENDOR.address}</p>
              <p className="text-sm text-slate-700">Mon–Sat: 11–9 • Sun: 12–6</p>
              <p className="text-sm text-slate-700">{VENDOR.phone}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  VENDOR.address
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center mt-3 rounded-full bg-black text-white px-4 py-1.5 text-sm"
              >
                Get Directions
              </a>
            </div>

            {/* photo gallery */}
            <div className="bg-white rounded-3xl border border-[#f5eee7] p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-[#0f172a]">
                  Photo gallery
                </h2>
                <span className="text-xs text-slate-400">
                  (vendor-editable later)
                </span>
              </div>
              <MediaGallery images={VENDOR.images} />
            </div>
          </div>
        </section>
      </div>

      <div className="h-10" />
    </div>
  );
}
