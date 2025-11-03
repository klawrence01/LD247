// app/dashboard/merchant/coupons/[couponId]/page.tsx
import Link from "next/link";
import { createSupabaseServer } from "@/utils/supabase/server";

export const metadata = { title: "Coupon Details | Merchant Dashboard" };

export default async function CouponDetailPage({ params }: { params: { couponId: string } }) {
  const supabase = createSupabaseServer();

  const { data: coupon, error } = await supabase
    .from("coupons")
    .select("id,title,status,deal_type,value,start_date,end_date,details,image_url,business_id")
    .eq("id", params.couponId)
    .single();

  if (error || !coupon) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Coupon not found</h1>
        <Link href="/dashboard/merchant/coupons" className="underline">Back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{coupon.title || "Coupon Details"}</h1>
        <Link href="/dashboard/merchant/coupons" className="underline">Back</Link>
      </div>

      <div className="rounded-xl border p-6 grid gap-4">
        <div className="text-sm text-gray-500">Coupon ID</div>
        <div className="font-mono text-sm">{coupon.id}</div>

        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-500 mb-1">Preview</div>
          <div className="aspect-[3/2] rounded-md border grid place-items-center text-sm p-2 overflow-hidden">
            {coupon.image_url ? <img src={coupon.image_url} alt="coupon" className="h-full object-contain" /> : "No image"}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-md border p-3 text-sm">
            <div className="text-gray-500">Type</div>
            <div>{coupon.deal_type} {coupon.value ?? ""}</div>
          </div>
          <div className="rounded-md border p-3 text-sm">
            <div className="text-gray-500">Dates</div>
            <div>{coupon.start_date || "—"} → {coupon.end_date || "—"}</div>
          </div>
        </div>

        <div className="rounded-md border p-3 text-sm">
          <div className="text-gray-500 mb-1">Details</div>
          <div>{coupon.details || "—"}</div>
        </div>

        <div className="flex gap-3">
          <Link href="/dashboard/merchant/advertising" className="px-3 py-2 rounded-md border">Promote</Link>
          <Link href="/dashboard/merchant/analytics" className="px-3 py-2 rounded-md border">View Analytics</Link>
          <Link href="/dashboard/merchant/preview" className="px-3 py-2 rounded-md bg-black text-white">Public Preview</Link>
        </div>
      </div>
    </div>
  );
}
