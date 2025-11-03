// src/app/deals/[id]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type Params = { id: string };

type VendorMini = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  logo_url?: string;
  city?: string;
};

type Deal = {
  id: string;
  title: string;
  description?: string;
  category?: string;
  city?: string;
  image_url?: string;
  price?: number;
  original_price?: number;
  start_date?: string;
  end_date?: string;
  valid_days?: string; // e.g., "Mon–Sun, 11 AM–9 PM"
  limit_per_person?: number;
  min_purchase?: number;
  code?: string;
  address?: string;
  phone?: string;
  vendor: VendorMini;
};

function pctOff(price?: number, orig?: number) {
  if (price == null || orig == null || orig === 0) return null;
  return Math.round(100 * (1 - price / orig));
}

// --- Data loader with mock fallback so page always works
async function fetchDeal(id: string): Promise<Deal> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Mock deal so the page is functional out of the box
    const start = new Date();
    const end = new Date(Date.now() + 7 * 864e5);
    return {
      id,
      title: "Buy 1 Get 1 50% Off",
      description:
        "Show this deal at checkout. Not valid with other offers. Use code LD247.",
      category: "Beverage",
      city: "aruba",
      image_url: "",
      price: 7,
      original_price: 10,
      start_date: start.toISOString(),
      end_date: end.toISOString(),
      valid_days: "Mon–Sun, 10 AM–7 PM",
      limit_per_person: 1,
      min_purchase: 0,
      code: "LD247",
      address: "123 Maple St, Anytown, USA",
      phone: "(555) 123-4567",
      vendor: { id: "vendor-tonys", name: "Juice Oasis", city: "aruba" },
    };
  }

  const sb = createClient(url, key, { auth: { persistSession: false } });

  const { data } = await sb
    .from("deals")
    .select(
      `id,title,description,category,city,image_url,price,original_price,
       start_date,end_date,valid_days,limit_per_person,min_purchase,code,
       address,phone,
       vendors:vendor_id(id,name,logo_url,address,phone,city)`
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    // missing row fallback
    return {
      id,
      title: "Local Deal",
      vendor: { id: "vendor", name: "Local Vendor", city: "local" },
    } as Deal;
  }

  const v = data.vendors || {};
  return {
    id: data.id,
    title: data.title ?? "Deal",
    description: data.description ?? "",
    category: data.category ?? "",
    city: data.city ?? v.city ?? "",
    image_url: data.image_url ?? "",
    price: data.price ?? undefined,
    original_price: data.original_price ?? undefined,
    start_date: data.start_date ?? undefined,
    end_date: data.end_date ?? undefined,
    valid_days: data.valid_days ?? undefined,
    limit_per_person: data.limit_per_person ?? undefined,
    min_purchase: data.min_purchase ?? undefined,
    code: data.code ?? undefined,
    address: data.address ?? v.address ?? undefined,
    phone: data.phone ?? v.phone ?? undefined,
    vendor: {
      id: v.id ?? "vendor",
      name: v.name ?? "Vendor",
      address: v.address ?? undefined,
      phone: v.phone ?? undefined,
      logo_url: v.logo_url ?? undefined,
      city: v.city ?? data.city ?? undefined,
    },
  };
}

export default async function DealPage({ params }: { params: Params }) {
  const deal = await fetchDeal(params.id);
  const off = pctOff(deal.price, deal.original_price);

  return (
    <main className="mx-auto max-w-4xl px-6 pb-16 pt-6">
      {/* HERO */}
      <div className="overflow-hidden rounded-2xl border bg-gray-100">
        <div className="relative aspect-[16/9] w-full">
          {deal.image_url ? (
            <Image
              src={deal.image_url}
              alt={deal.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full bg-[url('/placeholder.svg')] bg-cover bg-center" />
          )}
        </div>
      </div>

      {/* BREADCRUMB */}
      <div className="mt-4 text-sm text-gray-600">
        <Link
          href={`/city/${encodeURIComponent(deal.city ?? "local")}`}
          className="underline"
        >
          {(deal.city ?? "city").toUpperCase()}
        </Link>{" "}
        • {deal.category ?? "Deal"}
      </div>

      {/* TITLE + PRICE/BADGE + VENDOR */}
      <header className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">{deal.title}</h1>
          <Link
            href={`/vendor/${encodeURIComponent(deal.vendor.id)}`}
            className="text-orange-600 underline"
          >
            {deal.vendor.name}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {off != null && (
            <span className="rounded-md bg-orange-500 px-2 py-1 text-sm font-bold text-white">
              {off}% OFF
            </span>
          )}
          {deal.price != null && deal.original_price != null ? (
            <div className="text-lg font-semibold">
              ${deal.price.toFixed(2)}{" "}
              <span className="text-gray-400 line-through">
                ${deal.original_price.toFixed(2)}
              </span>
            </div>
          ) : null}
        </div>
      </header>

      {/* DETAILS CARD */}
      <section className="mt-4 rounded-2xl border bg-white p-6">
        <dl className="grid gap-3 sm:grid-cols-2">
          {deal.start_date && deal.end_date && (
            <div>
              <dt className="text-sm font-medium text-gray-600">Valid</dt>
              <dd className="text-gray-900">
                {new Date(deal.start_date).toLocaleDateString()} –{" "}
                {new Date(deal.end_date).toLocaleDateString()}
                {deal.valid_days ? ` • ${deal.valid_days}` : ""}
              </dd>
            </div>
          )}
          {deal.limit_per_person != null && (
            <div>
              <dt className="text-sm font-medium text-gray-600">Limit</dt>
              <dd className="text-gray-900">
                {deal.limit_per_person} per person
              </dd>
            </div>
          )}
          {deal.min_purchase != null && (
            <div>
              <dt className="text-sm font-medium text-gray-600">
                Min Purchase
              </dt>
              <dd className="text-gray-900">
                ${deal.min_purchase.toFixed(2)}
              </dd>
            </div>
          )}
          {deal.code && (
            <div>
              <dt className="text-sm font-medium text-gray-600">Code</dt>
              <dd className="font-semibold text-gray-900">{deal.code}</dd>
            </div>
          )}
          {deal.address && (
            <div>
              <dt className="text-sm font-medium text-gray-600">Address</dt>
              <dd className="text-gray-900">{deal.address}</dd>
            </div>
          )}
          {deal.phone && (
            <div>
              <dt className="text-sm font-medium text-gray-600">Phone</dt>
              <dd className="text-gray-900">{deal.phone}</dd>
            </div>
          )}
        </dl>

        {deal.description && (
          <div className="mt-4 text-gray-800">{deal.description}</div>
        )}

        {/* ACTIONS (link-only, no client handlers) */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/vendor/${encodeURIComponent(deal.vendor.id)}`}
            className="rounded-lg border px-4 py-2 font-semibold"
          >
            View Vendor
          </Link>

          {deal.address ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                deal.address
              )}`}
              className="rounded-lg border px-4 py-2 font-semibold"
            >
              Get Directions
            </a>
          ) : null}

          {deal.phone ? (
            <a
              href={`tel:${deal.phone}`}
              className="rounded-lg border px-4 py-2 font-semibold"
            >
              Call
            </a>
          ) : null}

          <Link
            href={`/save/${encodeURIComponent(deal.id)}`}
            className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white"
          >
            Save to My Week
          </Link>
          <Link
            href={`/share/${encodeURIComponent(deal.id)}`}
            className="rounded-lg border px-4 py-2 font-semibold"
          >
            Share
          </Link>
          <Link
            href={`/report/${encodeURIComponent(deal.id)}`}
            className="rounded-lg border px-4 py-2 font-semibold"
          >
            Report Issue
          </Link>
        </div>
      </section>

      {/* Optional: small embedded map below if you want it visible here too */}
      {deal.address && (
        <section className="mt-6 overflow-hidden rounded-2xl border">
          <iframe
            title="map"
            width="100%"
            height="220"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              deal.address
            )}&output=embed`}
          />
        </section>
      )}
    </main>
  );
}
