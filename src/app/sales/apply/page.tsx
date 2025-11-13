// src/app/sales/apply/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const ok =
    props?.searchParams?.ok ??
    (typeof props?.searchParams === "string" ? props.searchParams : "");

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        Apply to Join Sales
      </h1>
      {ok ? (
        <p className="text-sm text-green-600 mb-4">
          Application status: <span className="font-mono">{ok}</span>
        </p>
      ) : (
        <p className="text-sm text-gray-500 mb-4">
          Fill out the form below to apply.
        </p>
      )}

      <div className="border rounded-xl bg-white p-5">
        <p className="text-sm text-gray-600">
          (Form placeholder) — later we’ll add name, email, territory, and
          referral fields here.
        </p>
      </div>
    </main>
  );
}
