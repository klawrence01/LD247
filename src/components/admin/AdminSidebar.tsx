// components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  Store,
  CreditCard,
  MessageSquare,
  GraduationCap,
  Image as ImageIcon,
  QrCode,
  Settings,
} from "lucide-react";
import clsx from "clsx";

const adminNav = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Approvals", href: "/admin/approvals", icon: CheckSquare },
  { name: "Blogs", href: "/admin/blogs/queue", icon: FileText },
  { name: "Vendors", href: "/admin/vendors", icon: Store },
  { name: "Billing", href: "/admin/billing", icon: CreditCard },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Training", href: "/admin/training", icon: GraduationCap },
  { name: "Static pages", href: "/admin/static-pages", icon: FileText },
  { name: "Images / promos", href: "/admin/images-promos", icon: ImageIcon },
  { name: "QR Manager", href: "/admin/qr-manager", icon: QrCode },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-60 bg-black/90 border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/5">
        <h1 className="text-white text-lg font-bold leading-tight">
          LD247 Admin
        </h1>
        <p className="text-white/40 text-[11px] mt-1">Control Center</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {adminNav.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/5 text-[11px] text-white/30">
        LocalDeals247 • Admin
      </div>
    </aside>
  );
}
