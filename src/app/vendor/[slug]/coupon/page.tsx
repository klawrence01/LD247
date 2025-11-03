// app/vendor/[slug]/coupon/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/utils/supabase/server";

type Business = {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  state: string | null;
};

type Coupon = {
  id: string;
  title: string | null;
  description: string | null;
  start_date: string; // ISO date
  end_date: string;   // ISO date
  fine_print: string | null;
  limit_per_person: number | null;
  deal_type: string | null; // e.g., "percent_off", "bogo", etc. (optional field)
  code: string | null; // optional, only if you already store a public code
};

function fmtDate(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  // show as Mon, Jan 1
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createSupabaseServer();
  const { data: business } = await supabase
    .from("businesses")
    .select("name, city, state")
    .eq("slug", params.slug)
    .single<Business>();
  if (!business) {
    return { title: "Coupon • Vendor not found • Local Deals 24/7" };
  }
  return {
    title: `Get Coupon • ${business.name} • Local Deals 24/7`,
    description: `Claim a coupon for ${business.name} in ${business.city ?? ""} ${business.state ?? ""}.`,
  };
}

export default async function CouponClaimPage({ params }: { params: { slug: string } }) {
  const supabase = createSupabaseServer();

  // 1) Business
  const { data: business } = await supabase
    .from("businesses")
    .select("id,name,slug,city,state")
    .eq("slug", params.slug)
    .single<Business>();

  if (!business) {
    return notFound();
  }

  // 2) Find the first currently-active or next-up coupon for this business
  const todayISO = new Date().toISOString().slice(0, 10);

  // Try: active first, else next upcoming
  const { data: active } = await supabase
    .from("coupons")
    .select("id,title,description,start_date,end_date,fine_print,limit_per_person,deal_type,code")
    .eq("business_id", business.id)
    .lte("start_date", todayISO)
    .gte("end_date", todayISO)
    .order("start_date", { ascending: true })
    .limit(1) as { data: Coupon[] | null };

  let coupon: Coupon | null = (active && active[0]) ?? null;

  if (!coupon) {
    const { data: upcoming } = await supabase
      .from("coupons")
      .select("id,title,description,start_date,end_date,fine_print,limit_per_person,deal_type,code")
      .eq("business_id", business.id)
      .gt("start_date", todayISO)
      .order("start_date", { ascending: true })
      .limit(1) as { data: Coupon[] | null };
    coupon = (upcoming && upcoming[0]) ?? null;
  }

  const hasCoupon = !!coupon;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link href={`/vendor/${business.slug}`} className="text-sm underline">
        ← Back to {business.name}
      </Link>

      <h1 className="mt-2 text-2xl font-bold">Get Coupon</h1>
      <p className="text-gray-600">
        {business.name} — {business.city || "—"}, {business.state || ""}
      </p>

      {!hasCoupon && (
        <div className="mt-6 rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">No coupon available right now</h2>
          <p className="mt-2 text-gray-700">
            This vendor doesn’t have a live offer at the moment. Follow them to get notified the next time a deal goes
            live.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href={`/auth/login?returnUrl=/vendor/${business.slug}/coupon`}
              className="rounded-lg bg-black text-white px-4 py-2"
            >
              Follow Vendor
            </Link>
            <Link
              href={`/vendor/${business.slug}`}
              className="rounded-lg border px-4 py-2"
            >
              View Vendor Page
            </Link>
          </div>
        </div>
      )}

      {hasCoupon && (
        <div className="mt-6 rounded-2xl border p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">{coupon!.title || "Special Offer"}</h2>
              <p className="mt-1 text-gray-600">
                Valid {fmtDate(coupon!.start_date)}–{fmtDate(coupon!.end_date)}
              </p>
            </div>
            {/* Optional badge by type */}
            {coupon!.deal_type && (
              <span className="shrink-0 rounded-full border px-3 py-1 text-xs">
                {coupon!.deal_type}
              </span>
            )}
          </div>

          {coupon!.description && (
            <p className="mt-4 text-gray-800">{coupon!.description}</p>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {/* Save / Follow – requires login */}
            <Link
              href={`/auth/login?returnUrl=/vendor/${business.slug}/coupon`}
              className="rounded-lg bg-black text-white px-4 py-3 text-center"
            >
              Save to My Deals
            </Link>

            {/* Reveal code (or go to redeem page) */}
            <Link
              href={`/auth/login?returnUrl=/vendor/${business.slug}/coupon`}
              className="rounded-lg border px-4 py-3 text-center"
            >
              Show Redemption Code
            </Link>
          </div>

          {/* If you already store a public code and want to show it without login, render it below.
              Keep it hidden by default until you’re ready to allow public display. */}
          {false && coupon!.code && (
            <div className="mt-4 rounded-lg bg-gray-50 border px-4 py-3 text-center">
              <div className="text-xs text-gray-500">Your Code</div>
              <div className="text-2xl font-mono tracking-widest">{coupon!.code}</div>
            </div>
          )}

          <div className="mt-6 border-t pt-4 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span>Limit per person</span>
              <span className="font-medium">
                {coupon!.limit_per_person != null ? coupon!.limit_per_person : "—"}
              </span>
            </div>
            {coupon!.fine_print && (
              <div className="mt-3">
                <div className="text-gray-600">Fine print</div>
                <p className="mt-1 whitespace-pre-wrap">{coupon!.fine_print}</p>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-xl bg-orange-50 border border-orange-200 p-4 text-sm">
            Tip: Be sure to show this screen at checkout so the business can confirm the active dates.
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        Powered by Local Deals 24/7
      </div>
    </div>
  );
}
