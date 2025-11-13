// src/app/vendor/[slug]/coupon/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const vendorSlug =
    props?.params?.slug ??
    props?.params?.Slug ??
    (typeof props?.params === "string" ? props.params : "unknown-vendor");

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
        Vendor Coupons
      </p>
      <h1 className="text-2xl font-bold tracking-tight mb-3">
        {vendorSlug.replace(/-/g, " ")}
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        This page will list all coupons for this vendor.
      </p>
      <div className="border rounded-xl bg-white p-5">
        <p className="text-sm text-gray-700">
          Later we’ll render the vendor’s active coupons here with status,
          expiry, and redemption counts.
        </p>
      </div>
    </main>
  );
}
