import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server"; // your server helper
import { cn } from "@/lib/utils"; // optional; remove if you don't use
import type { Metadata } from "next";

type PageProps = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const supabase = createClient();
  const { data: vendor } = await supabase
    .from("vendors")
    .select("name")
    .eq("id", params.id)
    .maybeSingle();

  return {
    title: vendor?.name ? `${vendor.name} — Local Deals 24/7` : "Vendor — Local Deals 24/7",
  };
}

export default async function VendorPage({ params }: PageProps) {
  const supabase = createClient();

  // 1) Fetch vendor
  const { data: vendor, error: vendorErr } = await supabase
    .from("vendors")
    .select("id, name, logo_url, website")
    .eq("id", params.id)
    .maybeSingle();

  if (vendorErr) {
    throw vendorErr;
  }
  if (!vendor) {
    // basic not-found UI (you can replace with app-level not-found.tsx if you prefer)
    return (
      <div className="container max-w-5xl py-10">
        <h1 className="text-3xl font-semibold mb-4">Vendor not found</h1>
        <Link href="/city" className="text-blue-600 hover:underline">Browse Cities</Link>
      </div>
    );
  }

  // 2) Fetch this vendor’s live deals (adjust filters to your schema)
  const { data: deals, error: dealsErr } = await supabase
    .from("deals")
    .select(
      "id, title, description, category, city, image_url, price, original_price, status, start_date, end_date"
    )
    .eq("vendor_id", vendor.id)
    .eq("status", "published")
    .or("start_date.is.null,start_date.lte.now") // start in the past or null
    .or("end_date.is.null,end_date.gte.now")     // end in future or null
    .order("title", { ascending: true });

  if (dealsErr) {
    throw dealsErr;
  }

  return (
    <div className="container max-w-6xl py-10">
      <header className="mb-8 flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-black/5">
          <Image
            src={vendor.logo_url || "https://picsum.photos/seed/vendor/120"}
            alt={vendor.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight">{vendor.name}</h1>
          {vendor.website && (
            <a
              href={vendor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              {vendor.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
      </header>

      {deals && deals.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {deals.map((deal) => (
            <article
              key={deal.id}
              className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={deal.image_url || "https://picsum.photos/seed/deal/640/420"}
                  alt={deal.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-4">
                <p className="text-sm text-neutral-500">{deal.category || "Deal"}</p>
                <h2 className="mt-1 line-clamp-2 text-xl font-medium">{deal.title}</h2>
                {deal.description && (
                  <p className="mt-2 line-clamp-2 text-neutral-600">{deal.description}</p>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-lg font-semibold">
                    {typeof deal.price === "number"
                      ? `$${deal.price.toFixed(2)}`
                      : deal.price || ""}
                    {typeof deal.original_price === "number" && (
                      <span className="ml-2 text-sm font-normal text-neutral-500 line-through">
                        ${deal.original_price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/deal/${deal.id}`}
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    View deal →
                  </Link>
                </div>

                <p className="mt-2 text-sm text-neutral-500">City: {deal.city}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-black/10 bg-white p-6 text-neutral-700">
          <p>No current deals for this vendor.</p>
        </div>
      )}

      <div className="mt-10">
        <Link href="/city" className="text-blue-600 hover:underline">
          ← Back to cities
        </Link>
      </div>
    </div>
  );
}
