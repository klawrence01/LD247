// app/admin/layout.tsx
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Admin Panel | Local Deals 24/7",
  description: "Manage users, vendors, pricing, and platform activity.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-neutral-100">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-neutral-100 border-r border-neutral-300 text-neutral-900 p-5 flex flex-col justify-between">
        <div>
          <div className="text-2xl font-extrabold mb-8 text-orange-600">
            LD247 Admin
          </div>

          <nav className="flex flex-col space-y-3 text-sm font-medium">
            <Link href="/admin/dashboard" className="hover:text-orange-500">
              Dashboard
            </Link>
            <Link href="/admin/users" className="hover:text-orange-500">
              Users
            </Link>
            <Link href="/admin/coupons" className="hover:text-orange-500">
              Coupons
            </Link>
            <Link href="/admin/reports" className="hover:text-orange-500">
              Reports
            </Link>
            <Link href="/admin/billing" className="hover:text-orange-500">
              Billing
            </Link>
            <Link
              href="/admin/pricing-control"
              className="hover:text-orange-500"
            >
              Pricing Control
            </Link>
            <Link href="/admin/approvals" className="hover:text-orange-500">
              Approvals
            </Link>
            <Link href="/admin/settings" className="hover:text-orange-500">
              Settings
            </Link>
            <Link href="/admin/logs" className="hover:text-orange-500">
              Logs
            </Link>
          </nav>
        </div>

        <div className="mt-8 text-[11px] text-neutral-500">
          © {new Date().getFullYear()} Local Deals 24/7
        </div>
      </aside>

      {/* RIGHT CONTENT AREA */}
      <main className="flex-1 bg-neutral-950 text-neutral-100 min-h-screen overflow-y-auto">
        {/* Admin Header */}
        <div className="sticky top-0 z-50">
          <AdminHeader />
        </div>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
