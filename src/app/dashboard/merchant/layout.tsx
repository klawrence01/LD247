"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { name: "Dashboard", href: "/dashboard/merchant" },
  { name: "Coupons", href: "/dashboard/merchant/coupons" },
  { name: "Surveys", href: "/dashboard/merchant/surveys" },
  { name: "Testimonials", href: "/dashboard/merchant/testimonials" },
  { name: "Messaging Center", href: "/dashboard/merchant/messaging" },
  { name: "Analytics", href: "/dashboard/merchant/analytics" },
  { name: "Advertising", href: "/dashboard/merchant/advertising" },
  { name: "Training", href: "/dashboard/merchant/training" },
  { name: "Trial / Next Steps", href: "/dashboard/merchant/trial" },
  { name: "Everyday Heroes Blog", href: "/dashboard/merchant/everyday-heroes" },
];

export default function MerchantLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <Link
              href="/dashboard/merchant"
              className="flex items-center gap-2 text-xl font-extrabold text-orange-600"
            >
              <span className="text-2xl">🏪</span> LD247
            </Link>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
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

        {/* Footer */}
        <footer className="text-xs text-gray-500 mt-10 border-t border-gray-200 pt-3">
          Local Deals 24/7 © {new Date().getFullYear()}
        </footer>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
