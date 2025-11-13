// src/app/VendorDashboard/training/[slug]/page.tsx

export default async function TrainingModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Next 15 typed params as a Promise
  const { slug } = await params;

  // placeholder data for now — we'll hook this to Supabase later
  const moduleData = {
    slug,
    title: `Training module: ${slug}`,
    intro: "This is a placeholder training module. Content will be pulled from Supabase later.",
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {moduleData.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            slug: <code>{moduleData.slug}</code>
          </p>
        </div>
      </div>

      <div className="rounded-2xl border bg-card text-card-foreground p-5 shadow-sm">
        <h2 className="text-lg font-medium mb-2">Overview</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {moduleData.intro}
        </p>
      </div>

      {/* later: lessons / sections list goes here */}
    </div>
  );
}
