// src/app/dashboard/merchant/Merchant-Backup/surveys/[id]/results/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};
  const surveyId =
    props?.params?.id ??
    (typeof props?.params === "string" ? props.params : "unknown-survey");

  return (
    <main className="min-h-screen bg-neutral-950 text-gray-100 p-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        Merchant Backup – Survey Results
      </h1>
      <p className="text-sm text-gray-400 mb-4">
        Survey ID: <span className="font-mono">{surveyId}</span>
      </p>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <p className="text-sm text-gray-200 mb-2">Results placeholder</p>
        <p className="text-sm text-gray-500">
          Later we’ll render response counts, score averages, and trend charts
          here.
        </p>
      </div>
    </main>
  );
}
