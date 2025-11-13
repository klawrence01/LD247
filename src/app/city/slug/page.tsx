// src/app/city/slug/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const slug =
    props?.params?.slug ??
    (typeof props?.params === "string" ? props.params : "city-page");

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">
        City: {slug.replace(/-/g, " ")}
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        Static city slug page placeholder.
      </p>
    </main>
  );
}
