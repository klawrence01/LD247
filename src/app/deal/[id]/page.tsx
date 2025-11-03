// C:\Users\Owner\ld247\src\app\deal\[id]\page.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type DealRow = {
  id: string;
  title: string | null;
  subtitle: string | null;
  description?: string | null;
  image_url?: string | null;
  vendor_name?: string | null;
  vendor_slug?: string | null;
  city_slug?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  limit_per_person?: number | null;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  phone?: string | null;
  likes?: number | null;
  alerts?: number | null;
};

export default function DealPage() {
  const params = useParams();
  const dealId =
    typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params?.id[0] : "";

  const [deal, setDeal] = useState<DealRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareState, setShareState] = useState<"idle" | "shared" | "error">("idle");

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    if (!dealId) return;
    async function loadDeal() {
      setLoading(true);
      const { data, error } = await supabase
        .from("deals")
        .select(
          `
          id,
          title,
          subtitle,
          description,
          image_url,
          vendor_name,
          vendor_slug,
          city_slug,
          start_date,
          end_date,
          limit_per_person,
          address_line1,
          address_line2,
          city,
          state,
          zip,
          phone,
          likes,
          alerts
        `
        )
        .eq("id", dealId)
        .maybeSingle();

      if (error) {
        console.error("Error loading deal:", error);
        setDeal(null);
      } else {
        setDeal(data);
      }
      setLoading(false);
    }

    loadDeal();
  }, [dealId, supabase]);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: deal?.title || "Local Deals 24/7",
          text: "Check out this deal on Local Deals 24/7",
          url,
        });
        setShareState("shared");
      } catch {
        setShareState("error");
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShareState("shared");
      } catch {
        setShareState("error");
      }
    }
  };

  const handleNotify = async () => {
    // bare-minimum call — you already created public.deal_alert_requests
    // here we just POST with anon user (your RLS allows public)
    const userId = "00000000-0000-0000-0000-000000000000"; // replace when auth is wired
    const { error } = await supabase
      .from("deal_alert_requests")
      .insert({
        user_id: userId,
        deal_id: dealId,
      });

    if (error) {
      console.error("Error creating alert request:", error);
      alert("Could not subscribe to alerts right now.");
    } else {
      alert("Got it — we’ll tell you when this deal returns.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center text-sm text-[#666]">
        Loading deal…
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold text-[#222]">Deal not found.</p>
        <Link
          href="/city/hartford"
          className="text-sm text-[#f97316] hover:underline"
        >
          Back to deals
        </Link>
      </div>
    );
  }

  const addressLines = [
    deal.address_line1,
    deal.address_line2,
    [deal.city, deal.state, deal.zip].filter(Boolean).join(", "),
  ].filter(Boolean);

  const mapsQuery = encodeURIComponent(
    [deal.address_line1, deal.city, deal.state, deal.zip].filter(Boolean).join(" ")
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* top/nav bar */}
      <div className="w-full bg-white border-b border-[#eee] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href={`/city/${deal.city_slug || "hartford"}`} className="text-sm text-[#555]">
            ← Back to city
          </Link>
          <span className="text-sm text-[#999]">Local Deals 24/7</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: image */}
          <div className="lg:w-[42%]">
            <div className="rounded-3xl overflow-hidden bg-white border border-[#eee]">
              {deal.image_url ? (
                <img
                  src={deal.image_url}
                  alt={deal.title || "Deal image"}
                  className="w-full h-[360px] object-cover"
                />
              ) : (
                <div className="h-[360px] flex items-center justify-center text-[#aaa] text-sm">
                  No image
                </div>
              )}
            </div>
          </div>

          {/* Right: content */}
          <div className="flex-1">
            {/* DEAL NAME - large */}
            <h1 className="text-3xl lg:text-4xl font-bold text-[#111] leading-tight">
              {deal.title || "Today’s Deal"}
            </h1>
            {/* vendor + city */}
            <p className="text-sm text-[#777] mt-2">
              {deal.vendor_name || "Vendor"}{" "}
              {deal.city_slug ? `• ${deal.city_slug.toUpperCase()}` : ""}
            </p>

            {/* pumped-up description area */}
            <p className="mt-4 text-lg font-semibold text-[#111]">
              {deal.subtitle ||
                deal.description ||
                "Show this coupon at checkout to redeem."}
            </p>

            {/* buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={handleShare}
                className="px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-[#111]"
              >
                {shareState === "shared"
                  ? "Link copied"
                  : shareState === "error"
                  ? "Couldn’t share"
                  : "Share this deal"}
              </button>
              <button className="px-5 py-2.5 rounded-full bg-white border border-[#eee] text-sm font-medium text-[#111] hover:border-[#f97316]">
                Save to My Deals
              </button>
              <button
                onClick={handleNotify}
                className="px-5 py-2.5 rounded-full bg-white border border-[#f97316] text-sm font-medium text-[#f97316] hover:bg-[#fff5ec]"
              >
                Notify me when it returns
              </button>
            </div>

            {/* engagement */}
            <div className="flex gap-3 mt-4 text-sm">
              <div className="flex items-center gap-1 text-[#a020f0]">
                <span>♥</span>
                <span>{deal.likes ?? 0}</span>
              </div>
              <div className="flex items-center gap-1 text-[#f97316]">
                <span>🔔</span>
                <span>{deal.alerts ?? 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* info panels */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {/* Business info */}
          <div className="bg-white rounded-3xl border border-[#eee] p-6">
            <h2 className="text-base font-semibold text-[#222] mb-4">
              Business info
            </h2>
            <p className="text-sm font-medium text-[#111]">
              {deal.vendor_name || "Business name"}
            </p>
            <div className="mt-2 space-y-1 text-sm text-[#555]">
              {addressLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              {deal.phone ? <p>{deal.phone}</p> : null}
            </div>
            {addressLines.length > 0 ? (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 text-sm text-[#f97316] hover:underline"
              >
                Get directions →
              </a>
            ) : null}
          </div>

          {/* Deal details */}
          <div className="bg-white rounded-3xl border border-[#eee] p-6">
            <h2 className="text-base font-semibold text-[#222] mb-4">
              Deal details
            </h2>
            <div className="space-y-2 text-sm text-[#555]">
              <p>
                <span className="font-medium text-[#222]">Valid on:</span>{" "}
                {deal.start_date
                  ? new Date(deal.start_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Today"}
              </p>
              <p>
                <span className="font-medium text-[#222]">Limit per person:</span>{" "}
                {deal.limit_per_person ?? 1}
              </p>
              <p>
                <span className="font-medium text-[#222]">Fine print:</span>{" "}
                While supplies last. Merchant may mark as “Out of stock.” Show
                this deal on your phone at the business.
              </p>
            </div>
          </div>
        </div>

        {/* how to redeem */}
        <div className="bg-white rounded-3xl border border-[#eee] p-6 mb-16">
          <h2 className="text-base font-semibold text-[#222] mb-3">
            How to redeem
          </h2>
          <ol className="list-decimal list-inside text-sm text-[#555] space-y-1">
            <li>Show this deal on your phone at the business.</li>
            <li>
              Valid on the date the deal is listed ({deal.start_date
                ? new Date(deal.start_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "today"}
              ).
            </li>
            <li>While supplies last. Merchant may mark as “Out of Stock.”</li>
            <li>
              If this deal comes back, tap “Notify me” above to get an alert.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
