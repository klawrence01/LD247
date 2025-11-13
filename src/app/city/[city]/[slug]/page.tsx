// C:\Users\klawr\LD247\src\app\city\[city]\[slug]\page.tsx

export const dynamic = "force-dynamic";

type CitySlugPageProps = {
  params: {
    city: string;
    slug: string;
  };
};

export default function CityDealDetailPage({ params }: CitySlugPageProps) {
  const { city, slug } = params;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          City Deal Detail (Placeholder)
        </h1>
        <p className="text-sm text-slate-400">
          City:{" "}
          <span className="font-mono bg-slate-900 px-2 py-1 rounded">
            {city}
          </span>{" "}
          • Slug:{" "}
          <span className="font-mono bg-slate-900 px-2 py-1 rounded">
            {slug}
          </span>
        </p>
        <p className="text-sm text-slate-400">
          We&apos;ll hook this page to real deal data later. For now it&apos;s
          a routing placeholder to keep the build stable.
        </p>
      </div>
    </div>
  );
}
