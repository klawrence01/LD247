// src/app/city/[city]/page.tsx

import CityClient from "@/components/city/CityClient";
import { createClient } from "@supabase/supabase-js";
import { Deal, mockDeals } from "@/utils/deals";
import Link from "next/link"; // ✅ Added import

export const dynamic = "force-dynamic";

type Params = { city: string };

// Fetch from Supabase if env is present; otherwise return null so we can fall back to mocks
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

  // Normalize to Deal shape used by our components
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
  const city = params.city.toLowerCase();
  const today = new Date();

  // Prefer live data; fall back to local mocks so the page always renders
  const live = await fetchDeals(city);
  const deals = (live ?? mockDeals).filter(
    (d) => d.city.toLowerCase() === city
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ New visible hero link */}
      <div className="bg-gray-100 text-center py-2">
        <Link
          href="/behind-the-hustle"
          className="text-blue-600 underline hover:text-orange-600 transition font-medium"
        >
          Meet the Local Heroes Behind the Hustle
        </Link>
      </div>

      {/* Original city page content */}
      <CityClient city={city} todayISO={today.toISOString()} deals={deals} />
    </div>
  );
}
