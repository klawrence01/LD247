// C:\Users\Owner\ld247\src\app\admin\approvals\page.tsx

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Local Supabase client – no dependency on "@/lib/supabase..."
const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type BusinessApproval = {
  id: string;
  name: string | null;
  city: string | null;
  status: string | null;
  created_at: string | null;
};

export default async function AdminApprovalsPage() {
  let approvals: BusinessApproval[] = [];
  let loadError: string | null = null;

  try {
    const { data, error } = await supabase
      .from("businesses")
      .select("id, name, city, status, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error loading approvals:", error.message);
      loadError = error.message;
    } else if (data) {
      approvals = data as BusinessApproval[];
    }
  } catch (err) {
    console.error("Unexpected error loading approvals:", err);
    loadError = "Unexpected error loading approvals.";
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Vendor Approvals
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Review and approve new LocalDeals247 vendors waiting for
              activation.
            </p>
          </div>
        </header>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl">
          <div className="border-b border-slate-800 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Pending applications
          </div>

          {loadError && (
            <div className="px-4 py-3 text-sm text-red-400">
              There was a problem loading approvals: {loadError}
            </div>
          )}

          {!loadError && approvals.length === 0 && (
            <div className="px-4 py-6 text-sm text-slate-400">
              No pending vendor approvals at the moment.
            </div>
          )}

          {!loadError && approvals.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full border-t border-slate-800 text-sm">
                <thead className="bg-slate-900/80">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Vendor
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      City
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                  {approvals.map((biz) => (
                    <tr key={biz.id}>
                      <td className="px-4 py-3">
                        <div className="font-medium">
                          {biz.name ?? "Unnamed Business"}
                        </div>
                        <div className="text-xs text-slate-400">ID: {biz.id}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-200">
                        {biz.city ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
                          {biz.status ?? "pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {biz.created_at
                          ? new Date(biz.created_at).toLocaleString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-4 text-xs text-slate-500">
          NOTE: Approve/deny actions can be wired up later. For now this page is
          a safe placeholder so the admin section compiles cleanly for Vercel.
        </p>
      </div>
    </div>
  );
}
