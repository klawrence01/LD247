// src/components/BottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// We can tune these hrefs to whatever final routes we choose.
const TABS = [
  {
    label: "Deals",
    href: "/city/new-haven", // or detect closest city later
    icon: "🔥",
  },
  {
    label: "My Deals",
    href: "/mydeals",
    icon: "💼",
  },
  {
    label: "Messages",
    href: "/messages",
    icon: "💬",
  },
  {
    label: "Explore",
    href: "/explore",
    icon: "🧭",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-300 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-4 py-2 text-[11px] font-medium text-gray-700">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={`flex flex-col items-center rounded-lg px-2 py-2 transition ${
                  active
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <div
                  className={`text-lg leading-none ${
                    active ? "" : "opacity-80"
                  }`}
                >
                  {tab.icon}
                </div>
                <div
                  className={`mt-1 leading-none ${
                    active ? "font-semibold text-black" : "text-gray-600"
                  }`}
                >
                  {tab.label}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* brand bar */}
      <div className="mx-auto max-w-md px-4 pb-3">
        <div className="rounded-xl bg-[#F15A29] text-center text-[10px] font-semibold text-white py-[6px]">
          Everyday Deals. Everyday Heroes.
        </div>
      </div>
    </nav>
  );
}
