// src/app/survey/[id]/thanks/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};
  const surveyId =
    props?.params?.id ??
    (typeof props?.params === "string" ? props.params : "unknown-survey");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Thanks for your feedback!
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          Response recorded for survey{" "}
          <span className="font-mono text-gray-800">{surveyId}</span>.
        </p>
        <p className="text-xs text-gray-400">
          We’ll use this to improve local deals and merchant performance.
        </p>
      </div>
    </main>
  );
}
