// src/app/vendor/lead/[lead_id]/live/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const leadId =
    props?.params?.lead_id ??
    props?.params?.leadId ??
    (typeof props?.params === "string" ? props.params : "unknown-lead");

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        Vendor Lead (Live)
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Lead ID: <span className="font-mono">{leadId}</span>
      </p>
      <div className="border rounded-xl bg-white p-5">
        <p className="text-sm text-gray-700 mb-2">
          This page will show real-time info about a lead for this vendor.
        </p>
        <p className="text-xs text-gray-400">
          Later we can add status, contact info, and activity stream here.
        </p>
      </div>
    </main>
  );
}
