// src/app/dashboard/merchant/Merchant-Backup/coupons/[couponId]/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const couponId =
    props?.params?.couponId ??
    props?.params?.CouponId ??
    (typeof props?.params === "string" ? props.params : "unknown-coupon");

  return (
    <main className="p-6 bg-neutral-950 text-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        Merchant Backup – Coupon
      </h1>
      <p className="text-sm text-gray-400 mb-4">
        Coupon ID: <span className="font-mono">{couponId}</span>
      </p>
      <p className="text-sm text-gray-300">
        This view will show coupon details, redemption history, and merchant
        actions.
      </p>
    </main>
  );
}
