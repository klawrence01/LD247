// src/app/admin/vendor/[businessId]/page.tsx

// @ts-nocheck
export const dynamic = "force-dynamic";

export default async function AdminVendorDetailPage({ params }: any) {
  const { businessId } = params ?? { businessId: "unknown" };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">
            Vendor Details (Placeholder)
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Admin view for a single LocalDeals247 business. We&apos;ll wire in
            live Supabase data after deployment. For now we just confirm routing
            works.
          </p>
        </header>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
          <p className="text-sm text-slate-300">
            Business ID from URL:{" "}
            <span className="font-mono bg-slate-950 px-2 py-1 rounded">
              {businessId}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
