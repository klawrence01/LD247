"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

type VendorRow = {
  id: string;
  name: string | null;
  city: string | null;
  state: string | null;
  logo_url?: string | null;
};

export default function VendorJoinChooser() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const vendorId = searchParams.get("v");
  const citySlug = searchParams.get("city");

  const [vendor, setVendor] = useState<VendorRow | null>(null);
  const [loadingVendor, setLoadingVendor] = useState(false);

  useEffect(() => {
    if (!vendorId) return;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;
    const supabase = createClient(url, key);
    const fetchVendor = async () => {
      setLoadingVendor(true);
      const { data } = await supabase
        .from("vendors")
        .select("id,name,city,state,logo_url")
        .eq("id", vendorId)
        .maybeSingle();
      setVendor(data as VendorRow);
      setLoadingVendor(false);
    };
    fetchVendor();
  }, [vendorId]);

  const handleGoToVendor = () => vendorId && router.push(`/vendors/${vendorId}`);
  const handleGoToCityDeals = () =>
    router.push(citySlug ? `/city/${citySlug}` : "/city");

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <p className="text-xs tracking-[0.3em] uppercase text-amber-400 mb-2">
          LocalDeals247
        </p>
        <h1 className="text-3xl font-semibold mb-2">
          How do you want to continue?
        </h1>
        <p className="text-neutral-300 mb-6">
          You scanned a LocalDeals247 code. You can visit the vendor or see
          daily deals for this city.
        </p>

        {loadingVendor ? (
          <div className="mb-6 rounded-lg bg-neutral-800 p-4 text-neutral-400">
            Loading vendor...
          </div>
        ) : vendor ? (
          <div className="mb-6 rounded-lg bg-neutral-800 p-4 flex gap-4 items-center">
            {vendor.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={vendor.logo_url}
                alt={vendor.name ?? "Vendor"}
                className="w-14 h-14 rounded-lg object-cover bg-neutral-800"
              />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-neutral-700 flex items-center justify-center text-sm text-neutral-400">
                {vendor.name?.charAt(0) ?? "V"}
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-lg font-semibold truncate">
                {vendor.name ?? "Local vendor"}
              </h2>
              <p className="text-xs text-neutral-500">
                {vendor.city
                  ? `${vendor.city}${
                      vendor.state ? ", " + vendor.state : ""
                    }`
                  : ""}
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-6 rounded-lg bg-neutral-800 border border-neutral-700 p-4 text-neutral-400">
            No vendor ID was provided, but you can still view daily deals.
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoToVendor}
            disabled={!vendorId}
            className={`w-full inline-flex items-center justify-between rounded-lg px-4 py-3 text-left transition-all ${
              vendorId
                ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-neutral-950 font-semibold"
                : "bg-neutral-800/60 text-neutral-500 cursor-not-allowed"
            }`}
          >
            <span>
              Visit {vendor?.name ? vendor.name : "vendor"} to redeem deal
            </span>
            <span aria-hidden>→</span>
          </button>

          <button
            onClick={handleGoToCityDeals}
            className="w-full inline-flex items-center justify-between rounded-lg px-4 py-3 bg-gradient-to-r from-neutral-700 to-neutral-600 hover:from-neutral-600 hover:to-neutral-500 transition-all text-white font-semibold"
          >
            <span>
              View daily deals{citySlug ? ` in ${prettyCity(citySlug)}` : ""}
            </span>
            <span aria-hidden>→</span>
          </button>
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          After login we can auto-follow the vendor so they stay in the
          customer’s feed.
        </p>
      </div>
    </div>
  );
}

function prettyCity(slug: string) {
  const parts = slug.split("-");
  const last = parts[parts.length - 1];
  if (last.length === 2) {
    const city = parts.slice(0, -1).map(capitalize).join(" ");
    return `${city}, ${last.toUpperCase()}`;
  }
  return parts.map(capitalize).join(" ");
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
