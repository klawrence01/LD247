import Link from "next/link"
import TodayDealBadge from "@/components/dashboard/TodayDealBadge"
import AccountExecutiveCard from "@/components/AccountExecutiveCard"

export default function VendorDashboard() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
      <p className="text-gray-600 mt-1">
        Quick view of what’s live today, plus your account executive details.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 space-y-4">
          <TodayDealBadge />
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/vendor/deals" className="px-3 py-2 rounded bg-orange-500 text-white text-sm">
                Create / Assign Deals
              </Link>
              <Link href="/vendor/training" className="px-3 py-2 rounded bg-gray-200 text-sm">
                Training Center
              </Link>
              <Link href="/vendor/billing" className="px-3 py-2 rounded bg-gray-200 text-sm">
                Manage Billing
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <AccountExecutiveCard />
        </div>
      </div>
    </main>
  )
}
