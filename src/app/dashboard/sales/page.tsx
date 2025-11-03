// app/dashboard/sales/page.tsx

import Link from "next/link";

export const metadata = {
  title: "Sales Dashboard",
  description: "Manage leads, track progress, and level up your sales strategy.",
};

export default function SalesDashboard() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Sales Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Inside the Hustle Blog Link */}
        <Link
          href="/inside-the-hustle"
          className="block bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500 rounded-xl p-5 shadow transition-all"
        >
          <h2 className="text-xl font-bold text-blue-700 mb-1">Inside the Hustle</h2>
          <p className="text-sm text-gray-700">
            Smart tactics, tools, and motivation to help you sell like a pro.
          </p>
        </Link>

        {/* Example: View Leads */}
        <Link
          href="/dashboard/sales/leads"
          className="block bg-white hover:bg-gray-100 border border-gray-200 rounded-xl p-5 shadow transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-1">View Leads</h2>
          <p className="text-sm text-gray-600">Track your active leads and recent activity.</p>
        </Link>

        {/* Example: Appointments */}
        <Link
          href="/dashboard/sales/appointments"
          className="block bg-white hover:bg-gray-100 border border-gray-200 rounded-xl p-5 shadow transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Appointments</h2>
          <p className="text-sm text-gray-600">Manage upcoming demos and follow-ups.</p>
        </Link>
      </div>
    </div>
  );
}
