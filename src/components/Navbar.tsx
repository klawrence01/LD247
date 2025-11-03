// src/components/NavBar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navCities = [
  { label: "Atlanta", href: "/city/atlanta" },
  { label: "Boston", href: "/city/boston" },
  { label: "Hartford", href: "/city/hartford" },
  { label: "New Haven", href: "/city/new-haven" },
  { label: "New-York", href: "/city/new-york" },
];

export default function NavBar() {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href;
  }

  return (
    <header className="w-full border-b border-black/20 bg-[#F15A29] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-ld247.png"
            alt="Local Deals 24/7"
            width={140}
            height={44}
            priority
            className="h-auto w-auto"
          />
        </Link>

        {/* Right: Nav links */}
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
          <Link
            href="/sales"
            className="text-white hover:text-black transition"
          >
            Sales
          </Link>

          <Link
            href="/cities"
            className="text-white hover:text-black transition"
          >
            Cities
          </Link>

          {navCities.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={
                "transition " +
                (isActive(c.href)
                  ? "text-black underline underline-offset-2"
                  : "text-white hover:text-black")
              }
            >
              {c.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
