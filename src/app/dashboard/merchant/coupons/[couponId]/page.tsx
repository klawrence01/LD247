// src/app/dashboard/merchant/coupons/[couponId]/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const couponId =
    props?.params?.couponId ??
    props?.params?.CouponId ??
    (typeof props?.params === "string" ? props.params : "unknown-coupon");

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">Coupon Detail</h1>
      <p className="mt-2 text-sm text-gray-600">
        Coupon ID: <span className="font-mono">{couponId}</span>
      </p>
      <p className="mt-4 text-sm text-gray-500">
        Show coupon metadata, redemption stats, and edit actions here.
      </p>
    </main>
  );
}
