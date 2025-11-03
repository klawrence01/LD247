// src/app/coupon/[claimId]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { createClient } from "@supabase/supabase-js";

type ClaimRow = {
  id: string;
  status: "active" | "redeemed" | "expired";
  created_at: string | null;
  redeemed_at: string | null;

  user_id: string | null;
  deal_id: string;
  business_id: string | null;

  deal_title: string | null;
  business_name: string | null;
  business_city: string | null;
  you_saved: number | null;
};

function sb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

async function fetchClaim(claimId: string): Promise<ClaimRow | null> {
  const { data, error } = await sb()
    .from("coupon_claims")
    .select(
      `
      id,
      status,
      created_at,
      redeemed_at,
      user_id,
      deal_id,
      business_id,
      deal_title,
      business_name,
      business_city,
      you_saved
    `
    )
    .eq("id", claimId)
    .maybeSingle();

  if (error) {
    console.error("fetchClaim error:", error);
    return null;
  }
  return (data as ClaimRow) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: { claimId: string };
}): Promise<Metadata> {
  // We won't block render on this. Safe static metadata.
  return {
    title: "Your Coupon • Local Deals 24/7",
    description:
      "Show this screen in-store to redeem your local deal. Everyday Deals. Everyday Heroes.",
  };
}

export default async function CouponScreen({
  params,
}: {
  params: { claimId: string };
}) {
  const claim = await fetchClaim(params.claimId);

  if (!claim) {
    return (
      <main className="mx-auto max-w-sm px-6 py-10 pb-24 text-center">
        <div className="text-xl font-semibold text-black">
          Coupon not found
        </div>
        <div className="mt-2 text-sm text-gray-600">
          This coupon may have expired or was never claimed.
        </div>

        <div className="mt-6">
          <Link
            href="/mydeals"
            className="inline-block rounded-lg bg-[#F15A29] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-black hover:text-white transition"
          >
            Go to My Deals
          </Link>
        </div>

        <div className="h-10" />
        <BottomNav />
      </main>
    );
  }

  // prepare view data
  const businessName = claim.business_name ?? "Local Business";
  const businessCity = claim.business_city ?? "Your City";
  const dealTitle = claim.deal_title ?? "Special Offer";
  const youSavedDisplay =
    claim.you_saved != null
      ? `$${Number(claim.you_saved).toFixed(2)}`
      : null;

  // we don't have logos stored in coupon_claims snapshot yet,
  // so just use a neutral block for now
  const businessLogo = "/images/vendor-placeholder.jpg";

  // badge colors
  let badgeText = "";
  let badgeColor = "";
  if (claim.status === "active") {
    badgeText = "ACTIVE";
    badgeColor =
      "bg-green-100 text-green-700 border-green-300";
  } else if (claim.status === "redeemed") {
    badgeText = "REDEEMED";
    badgeColor =
      "bg-blue-100 text-blue-700 border-blue-300";
  } else {
    badgeText = "EXPIRED";
    badgeColor =
      "bg-gray-200 text-gray-600 border-gray-300";
  }

  const isRedeemed = claim.status === "redeemed";
  const isExpired = claim.status === "expired";

  return (
    <main className="mx-auto max-w-sm px-6 py-10 pb-24">
      {/* HEADER / SUMMARY */}
      <header className="text-center">
        <div className="mx-auto flex flex-col items-center text-center">
          {/* Logo placeholder */}
          <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-100 border">
            <Image
              src={businessLogo}
              alt={businessName}
              fill
              className="object-cover"
            />
          </div>

          {/* Business name, city */}
          <div className="mt-3 text-base font-semibold text-black">
            {businessName}
          </div>
          <div className="text-xs text-gray-600">
            {businessCity}
          </div>

          {/* Deal title */}
          <div className="mt-2 text-sm font-bold text-black leading-tight text-center">
            {dealTitle}
          </div>

          {/* Meta row */}
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-600">
            {/* We don't have per-claim expiry snapshot yet; that's fine for now */}
            <span>ID: {claim.id}</span>
          </div>

          {/* Status badge */}
          <div className="mt-3">
            <span
              className={
                "inline-block rounded-md border px-2 py-[2px] text-[10px] font-bold " +
                badgeColor
              }
            >
              {badgeText}
            </span>
          </div>
        </div>
      </header>

      {/* QR / ACTION AREA */}
      <section className="mt-8 rounded-2xl border bg-white p-6 text-center shadow-sm">
        {/* QR placeholder box */}
        <div className="mx-auto h-40 w-40 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 grid place-items-center text-[10px] uppercase tracking-wide font-semibold">
          {/* later this becomes a real QR PNG */}
          QR-CODE-HERE
        </div>

        {/* Instructions / status text */}
        {!isRedeemed && !isExpired && (
          <div className="mt-4 text-xs text-gray-600">
            Show this screen at checkout. Staff can scan the code or
            tap Redeem.
          </div>
        )}

        {isRedeemed && (
          <div className="mt-4 text-sm font-semibold text-blue-700">
            This coupon was redeemed. Thank you for supporting
            local.
          </div>
        )}

        {isExpired && (
          <div className="mt-4 text-sm font-semibold text-gray-600">
            This coupon expired. Want it back? Get alerts when{" "}
            {businessName} runs this deal again.
          </div>
        )}

        {/* PRIMARY BUTTON AREA */}
        <div className="mt-6 flex flex-col gap-3">
          {/* Mark as Redeemed (only if still active) */}
          {!isRedeemed && !isExpired && (
            <form
              action="/api/redeemCoupon"
              method="POST"
              className="w-full"
            >
              <input
                type="hidden"
                name="claim_id"
                value={claim.id}
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-[#F15A29] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-black hover:text-white transition"
              >
                Mark as Redeemed
              </button>
            </form>
          )}

          {/* After redemption: ask for rating */}
          {isRedeemed && (
            <Link
              href="#rate"
              className="w-full rounded-lg border border-blue-600 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 text-center hover:bg-blue-100 transition"
            >
              Rate Your Experience →
            </Link>
          )}

          {/* Expired: Notify me next time */}
          {isExpired && (
            <Link
              href={`/notify?business_id=${encodeURIComponent(
                claim.business_id ?? ""
              )}`}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 text-center hover:bg-gray-100 transition"
            >
              Notify Me When It’s Back →
            </Link>
          )}
        </div>
      </section>

      {/* IMPACT / GRATITUDE BOX */}
      {!isExpired && (
        <section className="mt-6 rounded-xl border bg-black p-5 text-white text-center">
          {!isRedeemed ? (
            <>
              <div className="text-orange-400 text-base font-semibold">
                {youSavedDisplay
                  ? `You’re about to save ${youSavedDisplay}`
                  : "Support a local business"}
              </div>
              <div className="mt-2 text-[13px] text-gray-300">
                Your dollars stay local.
              </div>
              <div className="text-[13px] text-gray-300">
                Your neighbors stay in business.
              </div>
            </>
          ) : (
            <>
              <div className="text-orange-400 text-base font-semibold">
                {youSavedDisplay
                  ? `You saved ${youSavedDisplay} 🎉`
                  : "Thanks for supporting local 🎉"}
              </div>
              <div className="mt-2 text-[13px] text-gray-300">
                Want more like this? We’ll send them.
              </div>
            </>
          )}
        </section>
      )}

      {/* FINE PRINT + VENDOR LINK */}
      <section className="mt-6 text-center text-xs text-gray-500 leading-relaxed">
        <div className="font-semibold text-gray-700 mb-1">
          Fine Print
        </div>
        <div>
          Limit 1 per customer. Dine-in or takeout only. Ask
          business for any questions.
        </div>

        <div className="mt-4">
          <Link
            href={`/vendor/${claim.business_id ?? ""}`}
            className="text-[#F15A29] font-semibold underline underline-offset-2"
          >
            View {businessName} →
          </Link>
        </div>
      </section>

      <div className="h-10" />

      <BottomNav />
    </main>
  );
}
