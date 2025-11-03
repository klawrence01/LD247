// app/vendor/[slug]/coupon/[couponId]/page.tsx
import { createSupabaseServer } from "@/utils/supabase/server";

export const metadata = { title: "Coupon" };

export default async function CouponPrintPage({
  params,
}: { params: { slug: string; couponId: string } }) {
  const supabase = createSupabaseServer();

  const { data: business } = await supabase
    .from("businesses")
    .select("id,name,slug,address,city,state,zip,phone,logo_url")
    .eq("slug", params.slug)
    .single();

  const { data: coupon } = await supabase
    .from("coupons")
    .select("id,title,deal_type,value,start_date,end_date,image_url,status")
    .eq("id", params.couponId)
    .single();

  if (!business || !coupon) {
    return <div className="max-w-3xl mx-auto px-4 py-10">Coupon not found.</div>;
  }

  const addr = [business.address, [business.city, business.state].filter(Boolean).join(", "), business.zip]
    .filter(Boolean)
    .join(", ");

  const fmtDate = (d?: string | null) =>
    d ? new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—";

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 print:px-0">
      <div className="rounded-2xl border shadow-sm overflow-hidden bg-white">
        <div className="grid gap-6 p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 border rounded-md grid place-items-center overflow-hidden bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {business.logo_url ? <img src={business.logo_url} alt="" className="max-h-full object-contain" /> : "Logo"}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{business.name}</h1>
              <div className="text-sm text-gray-600">{addr}</div>
              {business.phone && <div className="text-sm text-gray-600">{business.phone}</div>}
            </div>
          </div>

          <div className="rounded-xl border p-6 grid gap-3">
            <div className="text-xl font-semibold">{coupon.title ?? "Deal"}</div>
            <div className="text-sm text-gray-700">
              Valid {fmtDate(coupon.start_date)} – {fmtDate(coupon.end_date)}
            </div>
            {coupon.image_url && (
              <div className="aspect-[16/9] bg-gray-50 rounded-md overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coupon.image_url} alt="" className="h-full w-full object-contain" />
              </div>
            )}
            <div className="text-xs text-gray-500">
              Show this coupon at checkout. One per customer unless otherwise stated.
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Print
            </button>
            <a
              href={`/vendor/${business.slug}`}
              className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Back to Vendor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
