// src/app/s/[id]/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const shortId =
    props?.params?.id ??
    (typeof props?.params === "string" ? props.params : "unknown");

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-2">Shared Link</h1>
      <p className="text-sm text-gray-600 mb-4">
        Link ID: <span className="font-mono">{shortId}</span>
      </p>
      <p className="text-sm text-gray-500">
        This is a placeholder for resolving short/shared links. We’ll swap this
        for the real redirect/content view later.
      </p>
    </main>
  );
}
