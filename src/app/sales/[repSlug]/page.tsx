// src/app/sales/[repSlug]/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const repSlug =
    props?.params?.repSlug ??
    props?.params?.repslug ??
    (typeof props?.params === "string" ? props.params : "unknown-rep");

  const ok =
    props?.searchParams?.ok ??
    (typeof props?.searchParams === "string" ? props.searchParams : "");

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        Sales Rep: {repSlug.replace(/-/g, " ")}
      </h1>
      {ok ? (
        <p className="text-sm text-green-600 mb-4">
          Status: <span className="font-mono">{ok}</span>
        </p>
      ) : (
        <p className="text-sm text-gray-500 mb-4">
          No status query provided.
        </p>
      )}
      <p className="text-sm text-gray-600">
        This page will show info, performance, and deals tied to this rep.
      </p>
    </main>
  );
}
