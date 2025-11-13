// src/app/dashboard/merchant/business/[businessId]/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const businessId =
    props?.params?.businessId ??
    props?.params?.BusinessId ??
    (typeof props?.params === "string" ? props.params : "unknown-business");

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">Business Dashboard</h1>
      <p className="mt-2 text-sm text-gray-600">
        Viewing business: <span className="font-mono">{businessId}</span>
      </p>
      <p className="mt-4 text-sm text-gray-500">
        TODO: fetch business details, offers, surveys, and messages for this
        merchant.
      </p>
    </main>
  );
}
