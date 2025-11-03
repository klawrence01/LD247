"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { name: "Sales Home", href: "/sales" },
  { name: "Legacy Dashboard", href: "/sales/dashboard" },
  { name: "Leads", href: "/sales/leads" },
  { name: "Appointments", href: "/sales/appointments" },
  { name: "Vendors", href: "/sales/vendors" },          // new
  { name: "Messaging", href: "/sales/messaging" },      // new
  { name: "Commissions", href: "/sales/commissions" },  // new
  { name: "Tools", href: "/sales/tools" },
  { name: "Apply (Public Form)", href: "/sales/apply" },
];

export default function SalesLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <Link
              href="/sales"
              className="flex items-center gap-2 text-xl font-extrabold text-orange-600"
            >
              <span className="text-2xl">📈</span> LD247 Sales
            </Link>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/sales" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? "bg-orange-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <footer className="text-xs text-gray-500 mt-10 border-t border-gray-200 pt-3">
          Local Deals 24/7 • Sales
        </footer>
      </aside>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
