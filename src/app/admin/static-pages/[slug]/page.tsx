// src/app/admin/static-pages/[slug]/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};
  const slug =
    props?.params?.slug ??
    (typeof props?.params === "string" ? props.params : "unknown");

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold tracking-tight mb-3">
        Static Page: {slug}
      </h1>
      <p className="text-sm text-gray-600">
        This is a placeholder for admin-managed static pages.
      </p>
    </main>
  );
}
