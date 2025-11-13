// src/app/everyday-heroes/[slug]/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};

  const slug =
    props?.params?.slug ??
    (typeof props?.params === "string" ? props.params : "unknown-hero");

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
        Everyday Heroes
      </p>
      <h1 className="text-3xl font-bold tracking-tight mb-3">
        {slug.replace(/-/g, " ")}
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Profile placeholder for a featured community member / hero.
      </p>
      <div className="bg-white border rounded-xl p-5">
        <p className="text-sm text-gray-700">
          Later we can pull this from the CMS and add images, quotes, and
          impact stats.
        </p>
      </div>
    </main>
  );
}
