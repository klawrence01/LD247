// src/app/admin/search/page.tsx

export default function Page(...args: any[]) {
  // Next will pass the real props as the first arg, so grab it
  const props = args[0] ?? {};

  // safely read searchParams.q
  const q =
    props?.searchParams?.q ??
    (typeof props?.searchParams === "string" ? props.searchParams : "");

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold tracking-tight mb-3">Admin Search</h1>
      <p className="text-sm text-gray-600 mb-4">
        Search admins, vendors, or reps.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 max-w-xl">
        <p className="text-sm text-gray-700">
          Current query:{" "}
          <span className="font-mono text-black">
            {q ? q : "(none supplied)"}
          </span>
        </p>
      </div>
    </main>
  );
}
