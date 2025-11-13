// src/app/api/lead/[lead_id]/live/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const leadId =
    props?.params?.lead_id ??
    (typeof props?.params === "string" ? props.params : "unknown");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">Live Lead</h1>
      <p className="mt-2 text-sm text-gray-600">
        Lead ID: <span className="font-mono">{leadId}</span>
      </p>
      <p className="mt-4 text-sm text-gray-500">
        (Stream lead details here once the page is wired up.)
      </p>
    </div>
  );
}
