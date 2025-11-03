// app/city/[city]/page.tsx
import Link from "next/link";
import MiniCalendar from "@/components/MiniCalendar";

// --- helpers ---
function startOfDay(d: Date) { const x = new Date(d); x.setHours(0,0,0,0); return x; }
function endOfDay(d: Date)   { const x = new Date(d); x.setHours(23,59,59,999); return x; }
const toISODate = (d: Date) => d.toISOString().slice(0,10);

function parseISODate(s?: string) {
  if (!s) return undefined;
  const d = new Date(s);
  return isNaN(d.getTime()) ? undefined : d;
}

// Prefer explicit from/to; else fall back to range buttons
function getRange(params: { range?: string; from?: string; to?: string }) {
  const { range, from, to } = params;

  const fromD = parseISODate(from);
  const toD = parseISODate(to);
  if (fromD && toD) {
    return {
      label: from === to ? "date" : "custom range",
      start: startOfDay(fromD),
      end: endOfDay(toD),
    };
  }

  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd   = endOfDay(now);

  if (range === "tomorrow") {
    const t = new Date(now); t.setDate(t.getDate() + 1);
    return { label: "tomorrow", start: startOfDay(t), end: endOfDay(t) };
  }

  if (range === "weekend") {
    const day = now.getDay(); // 0 Sun ... 6 Sat
    const diffToFri = ((5 - day) + 7) % 7;
    const fri = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() + diffToFri));
    const sun = endOfDay(new Date(fri.getFullYear(), fri.getMonth(), fri.getDate() + 2));
    return { label: "this weekend", start: fri, end: sun };
  }

  return { label: "today", start: todayStart, end: todayEnd };
}

// --- keep your Deal type / mockDeals / overlaps() as-is below this line ---

// ... (your Deal type, mockDeals, overlaps, CityDeals stay exactly as you have them)

export default function CityPage({
  params,
  searchParams,
}: {
  params: { city: string };
  searchParams: { range?: string; from?: string; to?: string };
}) {
  const city = params.city;
  const range = searchParams.range;
  const from = searchParams.from;
  const to = searchParams.to;

  const { label, start, end } = getRange({ range, from, to });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-2 capitalize">
        {city.replace("-", " ")}
      </h1>
      <p className="text-gray-600 mb-6">Find the best local deals.</p>

      {/* Buttons */}
      <div className="flex gap-3 mb-4">
        <Link href={`/city/${city}?range=today`} className={`px-4 py-2 rounded-full border ${!from && !to && range !== "tomorrow" && range !== "weekend" ? "bg-black text-white" : ""}`}>Today</Link>
        <Link href={`/city/${city}?range=tomorrow`} className={`px-4 py-2 rounded-full border ${range === "tomorrow" ? "bg-black text-white" : ""}`}>Tomorrow</Link>
        <Link href={`/city/${city}?range=weekend`} className={`px-4 py-2 rounded-full border ${range === "weekend" ? "bg-black text-white" : ""}`}>This Weekend</Link>
      </div>

      {/* Range summary */}
      <p className="text-gray-600 mb-6">
        Showing: <strong>{label}</strong>
        <span className="ml-2">({toISODate(start)} → {toISODate(end)})</span>
      </p>

      {/* Calendar + deals */}
      <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
        <MiniCalendar city={city} />
        {/* Your existing <CityDeals .../> component call */}
        <CityDeals city={city} rangeParam={range} />
      </div>
    </main>
  );
}
