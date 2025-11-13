// C:\Users\Owner\ld247\src\app\admin\dashboard\page.tsx

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <header className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Admin Control Center
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              High-level overview for LocalDeals247 admin. Data hooks can be wired
              in later — this version is deployment-safe.
            </p>
          </div>
        </header>

        {/* Summary cards */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Vendors
            </div>
            <div className="mt-2 text-2xl font-semibold">—</div>
            <p className="mt-1 text-xs text-slate-500">
              Total active vendors (placeholder).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Pending Approvals
            </div>
            <div className="mt-2 text-2xl font-semibold">—</div>
            <p className="mt-1 text-xs text-slate-500">
              Vendors waiting for review. See the Approvals tab.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Cities Live
            </div>
            <div className="mt-2 text-2xl font-semibold">—</div>
            <p className="mt-1 text-xs text-slate-500">
              Number of launch cities. Metrics to be wired later.
            </p>
          </div>
        </section>

        {/* Activity / notes */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow">
            <h2 className="text-sm font-semibold tracking-tight">
              Recent Activity (Placeholder)
            </h2>
            <p className="mt-2 text-xs text-slate-400">
              This section will eventually show recent approvals, vendor sign-ups,
              and city launches. For now it&apos;s a static block so the page
              compiles cleanly for deployment.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow">
            <h2 className="text-sm font-semibold tracking-tight">
              Admin Notes
            </h2>
            <ul className="mt-2 space-y-2 text-xs text-slate-400">
              <li>• Wire live metrics from Supabase once deployment is stable.</li>
              <li>• Connect this dashboard to approvals, vendor status, and city pages.</li>
              <li>• Keep this page simple and fast — it&apos;s your command center.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
