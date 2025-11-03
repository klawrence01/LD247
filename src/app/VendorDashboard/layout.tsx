import Link from "next/link"

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[70vh]">
      <aside className="w-72 p-6 bg-orange-500 text-white shrink-0">
        <h2 className="text-2xl font-bold mb-6">Vendor Panel</h2>
        <nav className="space-y-3">
          <Link href="/vendor/dashboard" className="block hover:underline">Dashboard</Link>
          <Link href="/vendor/setup" className="block hover:underline">Setup</Link>
          <Link href="/vendor/training" className="block hover:underline">Training</Link>
          <Link href="/vendor/deals" className="block hover:underline">Deals</Link>
          <Link href="/vendor/performance" className="block hover:underline">Performance</Link>
          <Link href="/vendor/messages" className="block hover:underline">Messages</Link>
          <Link href="/vendor/billing" className="block hover:underline">Billing</Link>
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  )
}
