// src/app/vendor/[slug]/coupon/[couponId]/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const vendorSlug =
    props?.params?.slug ??
    props?.params?.Slug ??
    (typeof props?.params === "string" ? props.params : "unknown-vendor");

  const couponId =
    props?.params?.couponId ??
    props?.params?.CouponId ??
    "unknown-coupon";

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
        Vendor Coupon
      </p>
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        {vendorSlug.replace(/-/g, " ")}
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Coupon ID: <span className="font-mono">{couponId}</span>
      </p>
      <div className="border rounded-xl bg-white p-5">
        <p className="text-sm text-gray-700">
          Placeholder for showing this vendor’s specific coupon (description,
          discount, expiration, redemption button).
        </p>
      </div>
    </main>
  );
}
