"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// little helper to style the active link
function NavItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={
        "flex items-center justify-between rounded-xl px-4 py-2 text-sm font-semibold " +
        (isActive
          ? "bg-[#ff7a00] text-white shadow"
          : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50")
      }
    >
      <span>{label}</span>
      {isActive && (
        <span className="text-[10px] font-bold uppercase tracking-wide">
          LIVE
        </span>
      )}
    </Link>
  );
}

export default function VendorNav() {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="space-y-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-2">
            Manage
          </div>
          <div className="grid gap-2">
            <NavItem href="/vendor" label="Dashboard Home" />
            <NavItem href="/vendor/surveys" label="Surveys & Feedback" />
            <NavItem href="/vendor/updates" label="Post an Update" />
            <NavItem href="/vendor/analytics" label="Analytics" />
            <NavItem href="/vendor/messages" label="Messages / Inbox" />
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-2">
            Tools & Support
          </div>
          <div className="grid gap-2">
            <NavItem href="/vendor/training" label="Training Center" />
            <NavItem href="/vendor/advertising" label="Advertising / Boosts" />
            <NavItem href="/vendor/billing" label="Billing" />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow">
          <div className="text-[12px] font-semibold text-gray-900 leading-tight mb-1">
            Your Reach
          </div>
          <div className="text-[12px] text-gray-600 leading-tight">
            Followers are people who scanned your code, filled your survey, and
            said “yes, tell me when you’ve got something.”
          </div>
        </div>
      </div>
    </aside>
  );
}
