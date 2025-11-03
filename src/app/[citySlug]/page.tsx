import { createSupabaseServer } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Local Deals 24/7",
  description:
    "Real local deals from real local businesses — not corporate chains.",
};

// helper: turn "new-haven" or "meriden" into "New Haven" / "Meriden"
function toDisplayName(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function CityDealsPage({
  params,
}: {
  params: { citySlug: string };
}) {
  const supabase = createSupabaseServer();

  // normalize slug for display and lookup
  const rawSlug = params.citySlug || "";
  const cityDisplay = toDisplayName(rawSlug); // e.g. "New Haven"
  const cityQuery = rawSlug.replace(/-/g, " ").toLowerCase(); // "new haven"

  // pull businesses for THIS city only (not the whole region; [citySlug] is fallback)
  const { data: bizList, error } = await supabase
    .from("businesses")
    .select(
      "id, name, city, state, logo_url, description, slug"
    )
    .ilike("city", cityQuery);

  if (error) {
    console.error("Error loading businesses for slug route:", error);
  }

  // make sure we always have an array to render, even if null / undefined
  const safeBizList = Array.isArray(bizList) ? bizList : [];

  // build next 7 days for the mini calendar
  const today = new Date();
  const days = [...Array(7)].map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return {
      weekday: d
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase(), // e.g. WED
      month: d.toLocaleDateString("en-US", { month: "short" }), // e.g. Oct
      dayNum: d.getDate(), // e.g. 29
      full: d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }), // e.g. Wednesday, October 29
    };
  });

  const selectedDay = days[0];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* =========================
          SEARCH BAR / MARKET HEADER
         ========================= */}
      <section className="bg-white border border-gray-300 rounded-xl shadow-sm p-4 mb-8">
        <div className="text-[13px] font-semibold text-gray-800 tracking-wide mb-2 text-center md:text-left">
          SEARCH LOCAL DEALS
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* City dropdown (static for now) */}
          <select className="border border-gray-400 rounded-md px-3 py-2 text-sm text-black bg-white w-full md:w-auto">
            <option>{cityDisplay || "Select City"}</option>
            <option>New Haven</option>
            <option>Hartford</option>
            <option>Boston</option>
            <option>Atlanta</option>
            <option>New York</option>
          </select>

          {/* Keyword search field */}
          <input
            className="border border-gray-400 rounded-md px-3 py-2 text-sm text-black bg-white flex-1"
            placeholder="Search for pizza, barbershop etc"
          />
        </div>
      </section>

      {/* =========================
          HERO BLOCK
         ========================= */}
      <section className="bg-black text-white p-6 md:p-8 rounded-xl mb-10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <p className="uppercase text-yellow-400 font-semibold tracking-wide mb-3 text-sm">
          {cityDisplay || "This City"} • SURROUNDING AREA
        </p>

        <h1 className="text-3xl font-extrabold leading-snug mb-4">
          Real Local Deals. Posted by Real Local Businesses.
        </h1>

        <p className="max-w-2xl text-gray-300 leading-relaxed text-[15px] mb-6">
          We help local shops drive traffic, stay independent, and fill the
          moments that matter most — without giving up half their sale to a
          giant middleman. When you support small businesses, you support
          families, dreams, and neighborhoods.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href="/everyday-heroes"
            className="text-blue-400 underline hover:text-orange-400 font-semibold text-sm"
          >
            Meet the Local Heroes
          </Link>

          <Link
            href="/explore"
            className="inline-block px-4 py-2 rounded-lg bg-white text-black font-semibold text-sm hover:bg-gray-100"
          >
            Today’s Deals
          </Link>
        </div>
      </section>

      {/* =========================
          CITY HEADER ("NEW HAVEN")
         ========================= */}
      <section className="text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-black mb-2">
          {(cityDisplay || "Local Area").toUpperCase()}
        </h2>
        <p className="text-gray-700 text-base mb-1">
          Everyday Deals. Everyday Heroes.
        </p>
        <p className="text-gray-500 text-sm">
          Showing deals for: {selectedDay.full}
        </p>
      </section>

      {/* =========================
          MINI CALENDAR (7-day pills)
         ========================= */}
      <section className="mb-10">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((d, idx) => (
            <button
              key={idx}
              className={`border rounded-lg px-4 py-2 text-center min-w-[90px] text-sm leading-tight ${
                idx === 0
                  ? "border-orange-500 text-orange-600 font-semibold"
                  : "border-gray-300 text-black bg-white"
              }`}
            >
              <div className="uppercase">{d.weekday}</div>
              <div className="text-xs text-gray-600">
                {d.month} {d.dayNum}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* =========================
          DEAL LIST / PLACEHOLDER
         ========================= */}
      {safeBizList.length === 0 ? (
        <div className="text-gray-600 text-center border border-dashed border-gray-300 p-6 rounded-lg text-sm leading-relaxed">
          No other live deals here yet. We’re still out in the field signing
          people up.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeBizList.map((biz: any) => (
            <div
              key={biz.id}
              className="flex border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm"
            >
              {/* Logo / thumbnail */}
              <div className="w-24 h-24 bg-gray-100 flex items-center justify-center flex-shrink-0">
                {biz.logo_url ? (
                  <Image
                    src={biz.logo_url}
                    alt={biz.name}
                    width={96}
                    height={96}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span className="text-gray-500 text-[11px] px-2 text-center leading-tight">
                    No Logo
                  </span>
                )}
              </div>

              {/* Biz info */}
              <div className="flex flex-col flex-1 p-3">
                <div className="text-sm font-semibold text-black leading-tight">
                  {biz.name || "Local Business"}
                </div>

                <div className="text-[12px] text-gray-700 leading-snug">
                  {biz.city}
                  {biz.state ? `, ${biz.state}` : ""}
                </div>

                <div className="text-[12px] text-gray-600 leading-snug line-clamp-2 mt-1">
                  {biz.description ||
                    "Local business serving the community."}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                  <Link
                    href={biz.slug ? `/vendor/${biz.slug}` : "#"}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md px-2 py-1"
                  >
                    VIEW DEAL
                  </Link>
                  <button className="text-[11px] text-gray-500 hover:text-gray-700 underline">
                    SHARE THIS DEAL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
