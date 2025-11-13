// C:\Users\Owner\ld247\src\app\VendorDashboard\[id]\page.tsx

type VendorDashboardPageProps = {
  params: {
    id: string;
  };
};

export default async function VendorDashboardPage({
  params,
}: VendorDashboardPageProps) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2">Vendor Dashboard</h1>

        <p className="text-sm text-slate-400 mb-4">
          This is the vendor dashboard page wired to the dynamic vendor ID from
          the URL.
        </p>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
            Vendor ID
          </div>
          <div className="font-mono text-lg break-all">{id}</div>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          You can later plug in Supabase queries here to load this vendor&apos;s
          deals, stats, and messages. For now this is a safe placeholder that
          compiles cleanly so we can get your site deployed.
        </p>
      </div>
    </div>
  );
}
