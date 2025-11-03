'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Users', href: '/admin/Users' },
  { label: 'Coupons', href: '/admin/Coupons' },
  { label: 'Reports', href: '/admin/Reports' },
  { label: 'Billing', href: '/admin/Billing' },
  { label: 'Pricing Control', href: '/admin/PricingControl' },
  { label: 'Approvals', href: '/admin/Approvals' },
  { label: 'Settings', href: '/admin/Settings' },
  { label: 'Logs', href: '/admin/Logs' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-gray-100 border-r p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-black text-white'
                : 'text-gray-800 hover:bg-gray-200'
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
