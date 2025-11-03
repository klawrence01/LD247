// src/components/site-header.tsx
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          Local Deals 24/7
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/sales" className="hover:underline">
            Sales
          </Link>
          <Link href="/city" className="hover:underline">
            Cities
          </Link>
          {/* quick city shortcuts */}
          <Link href="/city/atlanta" className="hover:underline">
            Atlanta
          </Link>
          <Link href="/city/boston" className="hover:underline">
            Boston
          </Link>
          <Link href="/city/hartford" className="hover:underline">
            Hartford
          </Link>
          <Link href="/city/new-york" className="hover:underline">
            New-York
          </Link>
        </nav>
      </div>
    </header>
  );
}
