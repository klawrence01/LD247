"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type PageProps = {
  params: {
    id: string; // this is reward_claims.id
  };
};

type RewardClaimRow = {
  id: string;
  business_id: string;
  reward_text: string | null;
  code: string | null;
  expires_at: string | null;
};

type BusinessRow = {
  name: string | null;
  city: string | null;
  state: string | null;
  // if you later add logo_url, we can show that instead of initials
  logo_url?: string | null;
};

// helper to get initials for the logo box
function initialsFromName(name: string | null | undefined) {
  if (!name || !name.trim()) return "LD";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

// helper to compute "X min left" given expires_at
function minutesRemaining(expires_at: string | null): number {
  if (!expires_at) return 0;
  const end = new Date(expires_at).getTime();
  const now = Date.now();
  const diffMs = end - now;
  if (diffMs <= 0) return 0;
  const diffMinFloat = diffMs / 1000 / 60;
  return Math.ceil(diffMinFloat);
}

export default function SurveyThanksPage({ params }: PageProps) {
  const claimId = params.id;

  // data we load from Supabase
  const [reward, setReward] = useState<RewardClaimRow | null>(null);
  const [business, setBusiness] = useState<BusinessRow | null>(null);

  // derived live countdown
  const [minsLeft, setMinsLeft] = useState<number>(0);

  // loading/error
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // 1. Load reward_claims row and its business
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setNotFound(false);

      const supabase = getSupabaseBrowserClient();

      // get reward_claims row
      const { data: rewardRow, error: rewardErr } = await supabase
        .from("reward_claims")
        .select("id, business_id, reward_text, code, expires_at")
        .eq("id", claimId)
        .limit(1)
        .single();

      if (rewardErr || !rewardRow) {
        console.error("reward_claims fetch error:", rewardErr);
        setNotFound(true);
        setLoading(false);
        return;
      }

      setReward(rewardRow);

      // get business info
      const { data: bizRow, error: bizErr } = await supabase
        .from("businesses")
        .select("name, city, state, logo_url")
        .eq("id", rewardRow.business_id)
        .limit(1)
        .single();

      if (bizErr) {
        console.error("business fetch error:", bizErr);
      }

      setBusiness(bizRow || null);

      // set initial minutes remaining
      setMinsLeft(minutesRemaining(rewardRow.expires_at));

      setLoading(false);
    }

    fetchData();
  }, [claimId]);

  // 2. Keep updating the countdown every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (reward?.expires_at) {
        setMinsLeft(minutesRemaining(reward.expires_at));
      }
    }, 30_000);
    return () => clearInterval(interval);
  }, [reward?.expires_at]);

  // Visual fallback text
  const businessName = business?.name || "Local Business";
  const locationLine =
    business?.city && business?.state
      ? `${business.city}, ${business.state}`
      : business?.city
      ? business.city
      : "Local Deals 24/7";

  const rewardText =
    reward?.reward_text || "10% OFF your next order TODAY";
  const codeText = reward?.code || "LD-0000";

  // if expired, minsLeft may become 0
  const expired = minsLeft <= 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center text-sm text-gray-600">
          Loading your reward…
        </div>
      </div>
    );
  }

  if (notFound || !reward) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center">
          <div className="text-base font-semibold text-gray-900 mb-2">
            Reward not found
          </div>
          <div className="text-sm text-gray-600">
            Ask the cashier for help or request a new link.
          </div>
        </div>
      </div>
    );
  }

  // Logo display logic:
  const initials = initialsFromName(businessName);
  const logoUrl = (business as any)?.logo_url || null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        {/* Business header */}
        <div className="flex items-start gap-4 mb-6">
          {/* Logo / fallback initials box */}
          {logoUrl ? (
            <div className="h-12 w-12 rounded-xl bg-gray-200 overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt={`${businessName} logo`}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-xl bg-gray-800 text-white flex items-center justify-center text-sm font-bold">
              {initials}
            </div>
          )}

          <div className="flex-1">
            <div className="text-base font-semibold text-gray-900 leading-tight">
              {businessName}
            </div>
            <div className="text-[12px] text-gray-500 leading-tight">
              {locationLine}
            </div>

            <div className="mt-1 inline-flex items-center gap-2 rounded-lg bg-[#ff7a00] px-2 py-1 text-[11px] font-semibold text-white shadow">
              <span>Reward Unlocked</span>
            </div>
          </div>
        </div>

        {/* Reward block */}
        <div className="rounded-xl border border-gray-300 bg-gray-50 p-4 mb-4 text-center">
          <div className="text-[13px] font-bold text-gray-900 leading-snug mb-3">
            {rewardText}
          </div>

          <div className="text-[12px] text-gray-700 leading-snug mb-4">
            Show this screen at the counter before you pay. One per customer.
            Good for today only.
          </div>

          <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold mb-1">
            SHOW THIS CODE TO THE CASHIER:
          </div>

          <div className="text-2xl font-extrabold text-gray-900 tracking-wider mb-2">
            {codeText}
          </div>

          {expired ? (
            <div className="text-[11px] text-red-600 font-semibold">
              Expired
            </div>
          ) : (
            <div className="text-[11px] text-gray-500 leading-tight">
              Expires in{" "}
              <span className="font-semibold text-gray-800">
                {minsLeft} min
              </span>
            </div>
          )}
        </div>

        {/* Thank-you + follow notice */}
        <div className="rounded-xl bg-white border border-gray-200 p-4 mb-4 text-center">
          <div className="text-[13px] font-semibold text-gray-900 leading-snug mb-1">
            Thank you for supporting a local business.
          </div>
          <div className="text-[12px] text-gray-600 leading-snug">
            You’re now following {businessName} on Local Deals 24/7.
            Whenever they post a new deal, you’ll see it.
          </div>
        </div>

        {/* future marketing */}
        <div className="text-[12px] text-gray-600 leading-relaxed text-center">
          <p className="mb-2 font-semibold text-gray-800">
            Watch for new specials:
          </p>
          <p>
            {businessName} can now send you “today only” offers, early
            discounts, and limited slots. Check back anytime to grab them
            first.
          </p>
        </div>

        {/* If expired we can surface a softer CTA to ask staff for another reward */}
        {expired && (
          <div className="mt-4 text-center text-[11px] text-gray-500 leading-snug">
            This reward timed out. Ask the cashier if they can issue you a
            fresh one.
          </div>
        )}
      </div>

      {/* brand footer */}
      <div className="w-full max-w-md text-center mt-6 text-[11px] text-gray-500 leading-snug">
        <div className="font-semibold text-gray-800">
          Local Deals 24/7
        </div>
        <div>Support local. Save money. Come back again.</div>
      </div>
    </div>
  );
}
