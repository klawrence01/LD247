// src/app/vendor/customers/page.tsx

// @ts-nocheck
export const dynamic = "force-dynamic";

export default function VendorCustomersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-8">
      <div className="mx-auto max-w-4xl space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">
            Customers (Placeholder)
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            This page will eventually show customer stats and followers for this
            vendor. For now it&apos;s a simple static page so the site can
            deploy cleanly.
          </p>
        </header>
      </div>
    </div>
  );
}
