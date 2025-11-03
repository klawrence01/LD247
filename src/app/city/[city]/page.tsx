import CityClient from "@/components/city/CityClient";
import { createClient } from "@supabase/supabase-js";
import { Deal, mockDeals } from "@/utils/deals";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Params = { city: string };

// 🔹 Normalize the city slug to a display name and canonical slug
function normalizeCity(slug: string): { slug: string; name: string } {
  const s = slug.toLowerCase();

  const map: Record<string, string> = {
    "hartford": "Hartford",
    "new-haven": "New Haven",
    "new_haven": "New Haven",
    "new-york": "New York",
    "new_york": "New York",
    "atlanta": "Atlanta",
    "boston": "Boston",
  };

  if (map[s]) {
    return { slug: s, name: map[s] };
  }

  // fallback: convert slug to title case
  return {
    slug: s,
    name: s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}

// 🔹 Fetch deals from Supabase
async function fetchDeals(city: string): Promise<Deal[] | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const sb = createClient(url, key, { auth: { persistSession: false } });

  const { data, error } = await sb
    .from("deals")
    .select(`
      id, title, description, category, city, image_url,
      price, original_price, start_date, end_date, address, phone,
      vendors:vendor_id ( id, name, logo_url, website )
    `)
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

export default async function CityPage({ params }: { params: Params }) {
  const { slug: citySlug, name: cityName } = normalizeCity(params.city);
  const today = new Date();

  // 1️⃣ Get live deals from Supabase (if configured)
  const live = await fetchDeals(citySlug);

  // 2️⃣ Fallback to mock deals if none exist
  let deals = (live ?? mockDeals).filter(
    (d) => d.city.toLowerCase() === citySlug
  );

  // 3️⃣ Inject 24-hour “fake” spotlight deal when no results
  if (deals.length === 0) {
    deals = [
      {
        id: "ld247-spotlight",
        title: "Local Deals 24/7 — Get Your Business Listed",
        description:
          "We’re opening this city. Lock in your spot now and run bold offers like **BOGO**, **50% OFF**, or **limited-day promos**. Be the first business your customers see every day.",
        city: citySlug,
        image_url: "/images/vendor-pizza.jpg", // default fallback image
        category: "Promoted",
        price: 0,
        original_price: 0,
        start_date: today.toISOString(),
        end_date: today.toISOString(),
        address: `${cityName}, CT`,
        phone: "—",
        rating: 5,
        vendor: {
          id: "ld247",
          name: "Local Deals 24/7",
          logo_url: "/images/ld247-logo.png",
          website: `/sales/${citySlug}`,
        },
      } as Deal,
    ];
  }

  // 4️⃣ Render page
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f3ee]">
      {/* Top strip with blog link */}
      <div className="bg-gray-100 text-center py-2">
        <Link
          href="/blog"
          className="text-orange-600 hover:text-orange-700 transition font-medium"
        >
          Blog (Behind the Hustle)
        </Link>
      </div>

      {/* Main client component — retains mini calendar, centered city, deal cards */}
      <CityClient
        city={citySlug}
        cityName={cityName}
        todayISO={today.toISOString()}
        deals={deals}
      />
    </div>
  );
}
