// src/app/admin/reps/[repId]/page.tsx

// accept *anything* as the first arg so Next's generated type can't complain
export default function Page(...args: any[]) {
  // try to pull repId out of what Next sent us
  const maybeProps = args[0] ?? {};
  const repId =
    maybeProps?.params?.repId ??
    (typeof maybeProps?.params === "string" ? maybeProps.params : "unknown");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">Rep Detail</h1>
      <p className="mt-2 text-sm text-gray-600">
        Viewing rep: <span className="font-mono">{repId}</span>
      </p>
    </div>
  );
}
