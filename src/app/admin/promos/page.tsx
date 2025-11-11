"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

type Promo = {
  id: string;
  title: string;
  image_url: string | null;
  link_url: string | null;
  is_active: boolean;
  created_at: string;
};

export default function PromosPage() {
  const supabase = getSupabaseBrowser();
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableFound, setTableFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("promo_assets")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setTableFound(true);
        setPromos(
          data.map((p: any) => ({
            id: p.id ?? crypto.randomUUID(),
            title: p.title ?? "Untitled promo",
            image_url: p.image_url ?? p.url ?? null,
            link_url: p.link_url ?? null,
            is_active: p.is_active ?? false,
            created_at: p.created_at,
          }))
        );
      } else {
        setTableFound(false);
        setPromos([]);
      }
      setLoading(false);
    };
    load();
  }, [supabase]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Images & Promotions</h1>
        <p className="text-sm text-white/50 mt-2">
          Keep track of the hero graphics, sidebar banners, and social images we use across
          LocalDeals247.
        </p>
      </div>

      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60">
          Loading promos…
        </div>
      ) : promos.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-white/60 space-y-3">
          <p>No promo assets found.</p>
          {!tableFound ? (
            <div>
              <p className="text-xs text-white/40 mb-2">
                Create this table in Supabase:
              </p>
              <pre className="text-[10px] whitespace-pre-wrap text-white/70">
{`create table public.promo_assets (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  image_url text,
  link_url text,
  is_active boolean default false,
  created_at timestamptz default now()
);`}
              </pre>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative bg-black/30 h-40 flex items-center justify-center">
                {promo.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={promo.image_url}
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white/30 text-xs">No image</span>
                )}
                <span
                  className={`absolute top-3 right-3 text-[10px] px-3 py-1 rounded-full ${
                    promo.is_active
                      ? "bg-green-500/10 text-green-100"
                      : "bg-white/5 text-white/50"
                  }`}
                >
                  {promo.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-sm text-white font-semibold">
                  {promo.title}
                </h2>
                <p className="text-[10px] text-white/30">
                  {new Date(promo.created_at).toLocaleString()}
                </p>
                {promo.link_url ? (
                  <a
                    href={promo.link_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs bg-white/10 hover:bg-white/15 text-white px-3 py-1 rounded-lg inline-block"
                  >
                    Open link
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
