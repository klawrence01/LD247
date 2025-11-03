// src/app/follow/[vendorId]/page.tsx
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type Params = { vendorId: string };

type Vendor = {
  id: string;
  name: string;
  city?: string;
  address?: string;
  logo_url?: string;
};

async function fetchVendor(id: string): Promise<Vendor> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // mock
    return { id, name: "Local Vendor", city: "aruba" };
  }

  const sb = createClient(url, key, { auth: { persistSession: false } });
  const { data } = await sb
    .from("vendors")
    .select("id,name,city,address,logo_url")
    .eq("id", id)
    .maybeSingle();

  return (
    data ?? {
      id,
      name: "Local Vendor",
      city: "local",
    }
  );
}

export default async function FollowVendorPage({ params }: { params: Params }) {
  const vendor = await fetchVendor(params.vendorId);

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <div className="rounded-2xl border bg-white p-8 text-center">
        {vendor.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vendor.logo_url}
            alt={`${vendor.name} logo`}
            className="mx-auto mb-4 h-16 w-16 rounded-full object-cover"
          />
        ) : null}

        <h1 className="text-2xl font-extrabold">Following {vendor.name}</h1>
        <p className="mt-2 text-gray-600">
          You’ll get notified when new deals drop.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/vendor/${encodeURIComponent(vendor.id)}`}
            className="rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white"
          >
            View Vendor
          </Link>
          <Link
            href={`/city/${encodeURIComponent(vendor.city ?? "local")}`}
            className="rounded-lg border px-5 py-2 font-semibold"
          >
            Back to City
          </Link>
        </div>
      </div>
    </main>
  );
}
