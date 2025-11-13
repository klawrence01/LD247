// src/app/vendor/survey/[id]/thanks/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};
  const surveyId =
    props?.params?.id ??
    (typeof props?.params === "string" ? props.params : "unknown-survey");

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-slate-900">
          Thanks for completing the vendor survey!
        </h1>
        <p className="text-sm text-slate-600 mb-4">
          Recorded for survey{" "}
          <span className="font-mono text-slate-900">{surveyId}</span>.
        </p>
        <p className="text-xs text-slate-400">
          We’ll share this feedback with the business owner.
        </p>
      </div>
    </main>
  );
}
