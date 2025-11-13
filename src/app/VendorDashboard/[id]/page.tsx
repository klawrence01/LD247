// C:\Users\klawr\LD247\src\app\VendorDashboard\[id]\page.tsx

export const dynamic = "force-dynamic";

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
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-8">
      <div className="mx-auto max-w-4xl space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">
            Vendor Dashboard (Placeholder)
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            This page is wired only for routing right now. ID from the URL:
            <span className="ml-1 font-mono text-xs bg-slate-900 px-2 py-1 rounded">
              {id}
            </span>
          </p>
        </header>

        <p className="text-sm text-slate-400">
          Once deployment is stable, we&apos;ll hook this up to real vendor
          stats and tools.
        </p>
      </div>
    </div>
  );
}
