// src/app/dashboard/merchant/Merchant-Backup/business/[businessId]/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};
  const businessId =
    props?.params?.businessId ??
    (typeof props?.params === "string" ? props.params : "unknown-business");

  return (
    <main className="p-6 bg-neutral-950 text-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        Merchant Backup Business
      </h1>
      <p className="text-sm text-gray-400">
        Business ID: <span className="font-mono">{businessId}</span>
      </p>
      <div className="mt-4 text-gray-300">
        <p>
          This page will serve as a backup business dashboard for merchants.
          It will include analytics, deal history, and contact support options.
        </p>
      </div>
    </main>
  );
}
