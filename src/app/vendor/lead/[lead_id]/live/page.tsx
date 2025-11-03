// src/app/vendor/lead/[lead_id]/live/page.tsx

import { createSupabaseServer } from "@/utils/supabase/server";

export const metadata = {
  title: "You're Live - Local Deals 24/7",
  description: "Your promo is now active.",
};

// --- helpers ---

async function getLeadData(lead_id: string) {
  const supabase = createSupabaseServer();

  const { data, error } = await supabase
    .from("vendor_leads")
    .select(
      `
      id,
      business_name,
      owner_name,
      city,
      state,
      region_tag,
      status,
      activated_at,
      trial_expires_at
    `
    )
    .eq("id", lead_id)
    .single();

  if (error) {
    console.error("Error loading lead:", error.message);
    return null;
  }

  return data;
}

// safely compute days left
function getDaysLeft(trial_expires_at: string | null): number | null {
  if (!trial_expires_at) return null;
  const expires = new Date(trial_expires_at).getTime();
  const now = Date.now();
  const diffMs = expires - now;
  const diffDaysFloat = diffMs / (1000 * 60 * 60 * 24);
  const diffDays = Math.ceil(diffDaysFloat);
  return diffDays < 0 ? 0 : diffDays;
}

export default async function LeadLivePage({
  params,
}: {
  params: { lead_id: string };
}) {
  const lead = await getLeadData(params.lead_id);

  if (!lead) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="text-xl font-semibold text-gray-900">
          We couldn’t load your promo.
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Please ask your Local Deals 24/7 rep to resend your link.
        </div>
      </div>
    );
  }

  const daysLeft = getDaysLeft(lead.trial_expires_at || null);

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8 text-center">
      {/* HEADER */}
      <section className="space-y-2">
        <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
          Local Deals 24/7
        </div>

        <div className="text-2xl font-bold text-gray-900 leading-tight">
          You’re Live 🎉
        </div>

        <div className="text-sm text-gray-700 leading-relaxed max-w-sm mx-auto">
          Your 30-day promotional period is active for{" "}
          <span className="font-semibold text-gray-900">
            {lead.business_name || "your business"}
          </span>{" "}
          in {lead.region_tag}.
        </div>

        {typeof daysLeft === "number" && (
          <div className="text-sm font-semibold text-gray-900">
            {daysLeft} day{daysLeft === 1 ? "" : "s"} left in your promo
          </div>
        )}

        <div className="text-[11px] text-gray-500 max-w-sm mx-auto leading-relaxed">
          We’re showing you to local customers in your area and helping drive
          attention to the days you need traffic most.
        </div>
      </section>

      {/* WHAT WE'RE DOING FOR YOU */}
      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 text-left space-y-4">
        <div className="text-sm font-semibold text-gray-900">
          What’s happening now:
        </div>

        <ol className="text-sm text-gray-700 space-y-3 list-decimal list-inside">
          <li>
            You’re visible in <span className="font-medium text-gray-900">{lead.region_tag}</span>.
          </li>
          <li>
            We’ll help you post attention-grabbing deals (like “Buy 1 Get 1” or
            “Free Add-On After 5pm”).
          </li>
          <li>
            We’ll track interest and engagement, and summarize it for you at the
            end of your promo.
          </li>
        </ol>

        <div className="text-[11px] text-gray-500 leading-snug">
          Many of our local merchants see 30% to 90% more activity in this
          period — sometimes turning their slowest days into their busiest —
          without spending thousands on ads.
        </div>
      </section>

      {/* COUNTDOWN / URGENCY */}
      <section className="rounded-2xl border border-orange-500 bg-orange-50 p-4 text-left space-y-3">
        <div className="text-sm font-semibold text-gray-900">
          What happens when the promo ends?
        </div>

        <div className="text-sm text-gray-700 leading-relaxed">
          You’ll get a quick results summary before your promo expires. After
          that, you pick how you want to continue.
        </div>

        {typeof daysLeft === "number" && (
          <div className="text-xs font-semibold text-orange-600">
            {daysLeft === 0
              ? "Your promo is ending. Lock in your plan now."
              : `You have ${daysLeft} day${
                  daysLeft === 1 ? "" : "s"
                } left before you choose.`}
          </div>
        )}
      </section>

      {/* PLAN CHOICES */}
      <section className="space-y-4">
        <div className="text-sm font-semibold text-gray-900">
          Pick your path going forward:
        </div>

        <div className="grid gap-4">
          {/* Self-Managed */}
          <button
            className="w-full text-left rounded-2xl border border-gray-300 bg-white shadow-sm p-4 hover:bg-gray-50"
            // TODO: hook to Stripe checkout for self-managed plan
          >
            <div className="text-base font-bold text-gray-900 leading-tight">
              $49/mo — Self-Managed
            </div>
            <div className="text-[13px] text-gray-700 leading-snug mt-1">
              You control your own specials and updates.
              Stay visible in {lead.region_tag}.
            </div>
            <div className="text-[11px] text-gray-500 leading-snug mt-2">
              Best if you like promoting certain days, happy hours, slow times.
            </div>
          </button>

          {/* Done-For-You */}
          <button
            className="w-full text-left rounded-2xl border border-gray-900 bg-gray-900 text-white shadow-sm p-4 hover:bg-gray-800"
            // TODO: hook to Stripe checkout for DFY plan
          >
            <div className="text-base font-bold leading-tight">
              $99/mo — Done For You
            </div>
            <div className="text-[13px] leading-snug mt-1">
              We create and post offers for you. You approve, we handle it.
            </div>
            <div className="text-[11px] text-gray-300 leading-snug mt-2">
              Best if you’re busy and just want results.
            </div>
          </button>
        </div>

        <div className="text-[11px] text-gray-500 leading-relaxed max-w-sm mx-auto">
          Your Local Deals 24/7 rep will stay with you either way.
        </div>
      </section>

      {/* RECEIPT / REF */}
      <div className="text-[10px] text-gray-400">
        Ref #{lead.id.slice(0, 8)}
        {lead.activated_at ? (
          <>
            {" "}
            • Activated{" "}
            {new Date(lead.activated_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </>
        ) : null}
      </div>
    </div>
  );
}
