// src/app/dashboard/merchant/surveys/[id]/results/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};
  const surveyId =
    props?.params?.id ??
    (typeof props?.params === "string" ? props.params : "unknown-survey");

  return (
    <main className="p-6 min-h-screen bg-white">
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        Survey Results
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Survey ID: <span className="font-mono">{surveyId}</span>
      </p>

      <div className="border rounded-xl bg-gray-50 p-5">
        <p className="text-sm text-gray-700">
          Placeholder for merchant survey analytics (responses, avg score,
          yes/no %, timeline).
        </p>
      </div>
    </main>
  );
}
