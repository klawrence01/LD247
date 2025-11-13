// C:\Users\Owner\ld247\src\app\admin\vendor\[businessId]\page.tsx

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Local Supabase client – no "@/lib/supabase..." imports
const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type VendorPageProps = {
  params: {
    businessId: string;
  };
};

type Business = {
  id: string;
  name: string | null;
  city: string | null;
  status: string | null;
  category?: string | null;
  created_at: string | null;
};

export default async function AdminVendorDetailPage({
  params,
}: VendorPageProps) {
  const { businessId } = params;

  let business: Business | null = null;
  let loadError: string | null = null;

  try {
    const { data, error } = await supabase
      .from("businesses")
      .select("id, name, city, status, category, created_at")
      .eq("id", businessId)
      .single();

    if (error) {
      console.error("Error loading vendor:", error.message);
      loadError = error.message;
    } else {
      business = data as Business;
    }
  } catch (err) {
    console.error("Unexpected error loading vendor:", err);
    loadError = "Unexpected error loading vendor.";
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">
            Vendor Details
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Admin view for a single LocalDeals247 business. Actions can be wired
            up later.
          </p>
        </header>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
          {loadError && (
            <p className="text-sm text-red-400">
              There was a problem loading this vendor: {loadError}
            </p>
          )}

          {!loadError && !business && (
            <p className="text-sm text-slate-400">
              No vendor found for ID <span className="font-mono">{businessId}</span>.
            </p>
          )}

          {business && (
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Vendor Name
                </div>
                <div className="text-lg font-semibold">
                  {business.name ?? "Unnamed Business"}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    City
                  </div>
                  <div className="text-sm text-slate-200">
                    {business.city ?? "—"}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Category
                  </div>
                  <div className="text-sm text-slate-200">
                    {business.category ?? "—"}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </div>
                  <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                    {business.status ?? "pending"}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Created At
                  </div>
                  <div className="text-sm text-slate-200">
                    {business.created_at
                      ? new Date(business.created_at).toLocaleString()
                      : "—"}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                NOTE: Approve / deny / edit actions will be hooked up via server
                actions later. This version is intention
