import VendorHeader from "@/components/vendor/VendorHeader";
import VendorDealCard from "@/components/vendor/VendorDealCard";
import RatingsSummary from "@/components/vendor/RatingsSummary";
import TestimonialsSection from "@/components/vendor/TestimonialsSection";
import MediaGallery from "@/components/vendor/MediaGallery";
import SurveyCTA from "@/components/vendor/SurveyCTA";
import { Deal, mockDeals } from "@/utils/deals";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type Params = { id: string };

// ---- Supabase helpers (mock fallback if env missing)
async function fetchVendor(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return {
      id,
      name: "Tony’s Pizza",
      logo_url: "",
      website: "https://tonyspizza.example.com",
      phone: "(203) 555-0123",
      address: "123 Main St, Meriden, CT 06450",
      rating: 4.3,
      ratings_count: 187,
      about:
        "Serving fresh pies and slices since 1989. Family-owned, locally loved.",
      hours: "Mon–Sun, 11 AM–9 PM",
      city: "Aruba",
      media: [
        { type: "image", url: "" },
        { type: "image", url: "" },
        { type: "video", url: "" }, // placeholder
      ],
      testimonials: [
        {
          id: "t1",
          name: "Samantha L.",
          text: "The crust is perfect. Service is fast and friendly.",
          rating: 5,
        },
        {
          id: "t2",
          name: "Marco D.",
          text: "Great lunch specials — unbeatable value.",
          rating: 4,
        },
      ],
    };
  }

  const sb = createClient(url, key, { auth: { persistSession: false } });

  const { data: vendor } = await sb
    .from("vendors")
    .select(
      `
      id, name, logo_url, website, phone, address, rating, ratings_count,
      about, hours, city,
      media:media_items ( type, url ),
      testimonials:testimonials ( id, name, text, rating )
    `
    )
    .eq("id", id)
    .maybeSingle();

  return vendor;
}

async function fetchVendorDeals(
  vendorId: string,
  vendorCity?: string
): Promise<Deal[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return mockDeals.map((d) => ({
      ...d,
      vendor: { ...d.vendor, id: vendorId, name: "Tony’s Pizza" },
      city: vendorCity ?? d.city ?? "aruba",
    }));
  }

  const sb = createClient(url, key, { auth: { persistSession: false } });

  const { data } = await sb
    .from("deals")
    .select(
      `id, title, description, category, city, image_url,
       price, original_price, start_date, end_date, address, phone, vendor_id`
    )
    .eq("vendor_id", vendorId)
    .order("start_date", { ascending: false });

  return (data ?? []).map((d: any) => ({
    id: d.id,
    title: d.title ?? "Deal",
    vendor: { id: vendorId, name: "Vendor" },
    city: d.city ?? vendorCity ?? "local",
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

// ---- Page
export default async function VendorPage({ params }: { params: Params }) {
  const vendor = await fetchVendor(params.id);

  const v =
    vendor ?? {
      id: params.id,
      name: "Local Vendor",
      logo_url: "",
      website: "",
      phone: "",
      address: "",
      rating: 4,
      ratings_count: 0,
      about: "Local business supporting the community.",
      hours: "Mon–Sun, 10 AM–7 PM",
      city: "Local",
      media: [],
      testimonials: [],
    };

  const deals = await fetchVendorDeals(v.id, v.city);

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      {/* Header: logo, name, actions (Follow / Website / Call / Directions) */}
      <VendorHeader
        id={v.id}
        name={v.name}
        logoUrl={v.logo_url ?? undefined}
        website={v.website ?? undefined}
        phone={v.phone ?? undefined}
        address={v.address ?? undefined}
        rating={v.rating ?? 4}
      />

      {/* Ratings + Survey CTA */}
      <section className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="rounded-2xl border bg-white p-6 md:flex-1">
          <RatingsSummary
            rating={v.rating ?? 0}
            count={v.ratings_count ?? 0}
          />
        </div>
        <div className="rounded-2xl border bg-white p-6 md:w-[360px]">
          <SurveyCTA vendorId={v.id} vendorName={v.name} />
        </div>
      </section>

      {/* About + Info */}
      <section className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border bg-white p-6">
          <h2 className="mb-2 text-lg font-semibold">About</h2>
          <p className="text-gray-700">{v.about}</p>
        </div>
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-2 text-lg font-semibold">Info</h2>
          <dl className="space-y-1 text-sm text-gray-700">
            <div>
              <dt className="font-medium">Hours</dt>
              <dd>{v.hours || "—"}</dd>
            </div>
            <div>
              <dt className="font-medium">Address</dt>
              <dd>{v.address || "—"}</dd>
            </div>
            <div>
              <dt className="font-medium">Phone</dt>
              <dd>{v.phone || "—"}</dd>
            </div>
            <div>
              <dt className="font-medium">City</dt>
              <dd>{v.city || "—"}</dd>
            </div>
            {v.address && (
              <div className="pt-2">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    v.address
                  )}`}
                  className="inline-block rounded-lg border px-4 py-2 text-sm"
                >
                  Get Directions
                </a>
              </div>
            )}
          </dl>
        </div>
      </section>

      {/* Active Deals */}
      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold">Active Deals</h2>
        {deals.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((d) => (
              <VendorDealCard key={d.id} deal={d} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-white p-6 text-center text-gray-500">
            No active deals right now. Follow this vendor to get notified when new deals drop.
          </div>
        )}
      </section>

      {/* Media & Testimonials */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border bg-white p-6">
          <h2 className="mb-3 text-lg font-semibold">Photos & Video</h2>
          <MediaGallery items={(v as any).media ?? []} />
        </div>
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-3 text-lg font-semibold">Testimonials</h2>
          <TestimonialsSection items={(v as any).testimonials ?? []} />
        </div>
      </section>
    </main>
  );
}
