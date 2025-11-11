// src/app/admin/page.tsx

export default function AdminHomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Admin Dashboard
        </h1>
        <p className="text-sm text-white/60 mt-2">
          Welcome back, Ken. Manage vendor activity, blog content, and approvals
          from one place.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <DashboardCard
          title="Pending Approvals"
          value="—"
          hint="Vendors waiting for review"
        />
        <DashboardCard
          title="New Vendors This Week"
          value="—"
          hint="Auto-populated from Supabase"
        />
        <DashboardCard
          title="Blog Queue"
          value="—"
          hint="Draft, scheduled, and published"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            Quick Actions
            <span className="text-[10px] uppercase tracking-wide bg-orange-500/20 text-orange-200 px-2 py-1 rounded-full">
              admin
            </span>
          </h2>
          <p className="text-sm text-white/50 mb-4">
            Jump straight to common admin tasks.
          </p>
          <div className="flex flex-wrap gap-3">
            <QuickLink href="/admin/approvals" label="Review Vendor Approvals" />
            <QuickLink href="/admin/blogs/queue" label="View Blog Queue" />
            <QuickLink href="/admin/vendors" label="Manage Vendors" />
            <QuickLink href="/admin" label="System Overview" />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-white">System Status</h2>
          <StatusRow label="Supabase Connection" status="OK" tone="good" />
          <StatusRow label="Admin Layout" status="Active" tone="good" />
          <StatusRow label="Approvals Page" status="Needs Data" tone="warn" />
          <p className="text-[11px] text-white/30 mt-2">
            *Wire these to real values once Supabase tables are finalized.
          </p>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 p-5 flex flex-col gap-3 shadow-sm">
      <p className="text-sm text-white/50">{title}</p>
      <p className="text-3xl font-semibold text-white">{value}</p>
      {hint ? <p className="text-xs text-white/30">{hint}</p> : null}
      <div className="h-1 w-10 rounded-full bg-orange-400/80 mt-1" />
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white transition"
    >
      <span>{label}</span>
      <span aria-hidden className="text-xs">
        →
      </span>
    </a>
  );
}

function StatusRow({
  label,
  status,
  tone = "good",
}: {
  label: string;
  status: string;
  tone?: "good" | "warn" | "bad";
}) {
  const color =
    tone === "good"
      ? "bg-emerald-400"
      : tone === "warn"
      ? "bg-amber-400"
      : "bg-red-400";

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-white/70">{label}</span>
      <span className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        <span className="text-xs text-white/40">{status}</span>
      </span>
    </div>
  );
}
