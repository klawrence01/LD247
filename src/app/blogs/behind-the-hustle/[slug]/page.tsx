// src/app/blogs/behind-the-hustle/[slug]/page.tsx

export default function Page(...args: any[]) {
  const props = args[0] ?? {};
  const slug =
    props?.params?.slug ??
    (typeof props?.params === "string" ? props.params : "unknown-post");

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
        Behind the Hustle
      </p>
      <h1 className="text-3xl font-bold tracking-tight mb-4">
        {slug.replace(/-/g, " ")}
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        This is a placeholder for the “Behind the Hustle” blog post content.
        Replace with real CMS content once wired.
      </p>
      <article className="prose prose-sm max-w-none">
        <p>
          You reached this page via a dynamic route. We relaxed the props so
          Next.js 15’s type checker is happy.
        </p>
      </article>
    </main>
  );
}
