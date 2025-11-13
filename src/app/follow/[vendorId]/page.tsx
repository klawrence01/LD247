// src/app/follow/[vendorId]/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const vendorId =
    props?.params?.vendorId ??
    props?.params?.VendorId ??
    (typeof props?.params === "string" ? props.params : "unknown-vendor");

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        Follow Vendor
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Vendor ID: <span className="font-mono">{vendorId}</span>
      </p>
      <p className="text-sm text-gray-500">
        This page will let users follow / subscribe to updates from a specific
        local business.
      </p>
    </main>
  );
}
