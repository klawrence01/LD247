import MiniCalendar from "@/components/city/MiniCalendar";
import DealRow from "@/components/city/DealRow";
import { addDays, Deal, isDealOnDate, mockDeals } from "@/utils/deals";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type Params = { city: string };

// Try to read deals from Supabase; if env missing, return null
async function fetchDealsFromSupabase(city: string): Promise<Deal[] | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const sb = createClient(url, key, { auth: { persistSession: false } });
  // NOTE: Adjust query to your schema if different
  const { data, error } = await sb
    .from("deals")
    .select(
      `
      id, title, description, category, city, image_url,
      price, original_price, start_date, end_date,
      vendors:vendor_id ( id, name, logo_url, website ),
      address, phone
    `
    )
    .eq("city", city.toLowerCase());

  if (error) return null;

  return (data ?? []).map((d: any) => ({
    id: d.id,
    title: d.title ?? "Deal",
    vendor: {
      id: d.vendors?.id ?? "v",
      name: d.vendors?.name ?? "Vendor",
      logo_url: d.vendors?.logo_url ?? undefined,
      website: d.vendors?.website ?? undefined,
    },
    city: d.city ?? city,
    image_url: d.image_url ?? undefined,
    category: d.category ?? undefined,
    price: d.price ?? undefined,
    original_price: d.original_price ?? undefined,
    start_date: d.start_date ?? undefined,
    end_date: d.end_date ?? undefined,
    address: d.address ?? undefined,
    phone: d.phone ?? undefined,
    rating: 4,
  })) as Deal[];
}

function weekWindow(today = new Date()) {
  const arr = [];
  for (let i = 0; i < 7; i++) arr.push(addDays(today, i));
  return arr;
}

export default async function CityPage({ params }: { params: Params }) {
  const city = params.city.toLowerCase();
  const today = new Date();
  const days = weekWindow(today);

  // data source
  const supaDeals = await fetchDealsFromSupabase(city);
  const allDeals = (supaDeals ?? mockDeals).filter((d) => d.city.toLowerCase() === city);

  // default selected day = today
  const selectedDate = today;
  const dayDeals = allDeals.filter((d) => isDealOnDate(d, selectedDate));

  const prettyDate = today.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      {/* SEARCH LOCAL DEALS header row */}
      <h1 className="text-center text-3xl font-extrabold tracking-wide mb-4">
        SEARCH LOCAL DEALS
      </h1>
      <div className="mb-4 flex gap-3">
        <div className="relative">
          <select className="rounded-xl border px-3 py-2">
            <option>{city.charAt(0).toUpperCase() + city.slice(1)} ▾</option>
          </select>
        </div>
        <input
          className="flex-1 rounded-xl border px-4 py-2"
          placeholder="Search for pizza, barbershop etc"
          defaultValue=""
        />
      </div>

      {/* Mini calendar (Today anchored at left) */}
      {/* Note: MiniCalendar is client-side; initial view shows 'today' */}
      <MiniCalendar today={today} selectedDate={selectedDate} onSelect={() => {}} />

      {/* City Title + tagline */}
      <div className="mt-6 text-center">
        <div className="text-5xl font-extrabold tracking-wider">
          {city.toUpperCase()}
        </div>
        <div className="text-gray-700">Everyday Deals. Everyday Heroes.</div>
        <div className="mt-2 text-sm text-gray-500">
          Showing deals for: {prettyDate}
        </div>
      </div>

      {/* Deal list */}
      <section className="mt-6 divide-y">
        {dayDeals.map((deal) => (
          <DealRow key={deal.id} deal={deal} />
        ))}
        {dayDeals.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No deals yet. Check other days.
          </div>
        )}
      </section>
    </main>
  );
}
