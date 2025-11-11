// src/app/admin/sales-tools/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

type Prospect = {
  id: string;
  business_name: string;
  status: string | null;
  notes: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  created_at: string;
};

export default function SalesToolsPage() {
  const supabase = getSupabaseBrowser();
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loadingProspects, setLoadingProspects] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("sales_prospects")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      setProspects(data || []);
      setLoadingProspects(false);
    };
    load();
  }, [supabase]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales tools</h1>
          <p className="text-sm text-white/50 mt-2">
            Resources for reps and partner managers — pitch LD247, send assets, and
            onboard merchants quickly.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/training"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg"
          >
            Sales training
          </Link>
          <Link
            href="/admin/sales-tools/assets"
            className="bg-white/10 hover:bg-white/15 text-white text-sm px-4 py-2 rounded-lg"
          >
            Sales assets
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/admin/static-pages/sales-landing"
          className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 hover:bg-white/10 transition"
        >
          <p className="text-xs uppercase tracking-wide text-white/40">Asset</p>
          <h2 className="text-white font-semibold text-sm">
            Merchant landing page
          </h2>
          <p className="text-[11px] text-white/50">
            Send this when a business wants to read more before signing.
          </p>
        </Link>

        <Link
          href="/admin/qr-manager"
          className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 hover:bg-white/10 transition"
        >
          <p className="text-xs uppercase tracking-wide text-white/40">
            Merchant tool
          </p>
          <h2 className="text-white font-semibold text-sm">QR Manager</h2>
          <p className="text-[11px] text-white/50">
            Generate deal QR codes for in-store placement.
          </p>
        </Link>

        <Link
          href="/admin/images-promos"
          className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 hover:bg-white/10 transition"
        >
          <p className="text-xs uppercase tracking-wide text-white/40">
            Creative
          </p>
          <h2 className="text-white font-semibold text-sm">Images & promos</h2>
          <p className="text-[11px] text-white/50">
            Grab brand images and upload new ones for a merchant.
          </p>
        </Link>

        <Link
          href="/admin/training"
          className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 hover:bg-white/10 transition"
        >
          <p className="text-xs uppercase tracking-wide text-white/40">
            Reps
          </p>
          <h2 className="text-white font-semibold text-sm">Sales scripts</h2>
          <p className="text-[11px] text-white/50">
            Review objection handling and sales walkthroughs.
          </p>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* pitch */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
          <h2 className="text-white font-semibold text-sm">LD247 talk track</h2>
          <p className="text-xs text-white/60">
            “LocalDeals247 gives you a permanent spot in front of local buyers. You
            can turn deals on/off, change the offer whenever you want, and we keep
            the presentation consistent so you look pro. It’s cheaper than ads and
            faster than flyers.”
          </p>
          <div className="bg-black/20 rounded-lg p-3 space-y-2 text-xs text-white/70">
            <p className="font-semibold text-white/80 text-[11px]">
              Discovery questions
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>How are you promoting your specials right now?</li>
              <li>Do you run different offers on slow days?</li>
              <li>Do you want QR codes / in-store signage?</li>
            </ul>
          </div>
          <div className="bg-black/20 rounded-lg p-3 space-y-2 text-xs text-white/70">
            <p className="font-semibold text-white/80 text-[11px]">
              Handle this objection:
            </p>
            <p>
              “Totally get it — that’s why LD247 is month-to-month and you can pause
              your deals. We’re built for local businesses that don’t want a long
              contract.”
            </p>
          </div>
        </div>

        {/* prospects from Supabase */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Prospect tracker</h2>
            <span className="text-[10px] text-white/30">
              Showing latest {prospects.length}
            </span>
          </div>
          {loadingProspects ? (
            <p className="text-xs text-white/40">Loading prospects…</p>
          ) : prospects.length === 0 ? (
            <p className="text-xs text-white/40">
              No prospects yet. Insert rows in Supabase table
              <code className="ml-1">sales_prospects</code>.
            </p>
          ) : (
            <div className="space-y-3">
              {prospects.map((p) => (
                <div
                  key={p.id}
                  className="bg-black/20 rounded-lg p-3 text-xs text-white/60 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-white text-[11px]">
                      {p.business_name}
                    </p>
                    <span
                      className={`text-[9px] px-2 py-1 rounded-full ${
                        p.status === "ready"
                          ? "bg-green-500/20 text-green-100"
                          : p.status === "cold"
                          ? "bg-white/10 text-white/60"
                          : "bg-orange-500/20 text-orange-100"
                      }`}
                    >
                      {p.status ?? "follow-up"}
                    </span>
                  </div>
                  {p.notes ? <p>{p.notes}</p> : null}
                  {(p.contact_name || p.contact_phone) && (
                    <p className="text-[10px] text-white/30">
                      {p.contact_name ? p.contact_name : ""}{" "}
                      {p.contact_phone ? `• ${p.contact_phone}` : ""}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
