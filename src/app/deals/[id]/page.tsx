// src/app/deals/[id]/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const dealId =
    props?.params?.id ??
    (typeof props?.params === "string" ? props.params : "unknown-deal");

  return (
    <main className="p-6 min-h-screen bg-white">
      <h1 className="text-2xl font-bold tracking-tight mb-2">Deal Detail</h1>
      <p className="text-sm text-gray-600 mb-4">
        Deal ID: <span className="font-mono">{dealId}</span>
      </p>

      <div className="border rounded-xl bg-gray-50 p-5">
        <p className="text-sm text-gray-700">
          This is a placeholder for showing a single deal’s info (title,
          discount, vendor, dates, redemptions).
        </p>
      </div>
    </main>
  );
}
