// components/admin/AdminHeader.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AdminHeader() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Fake numbers for now. Later we’ll load these from Supabase.
  // pendingApprovalsCount  = businesses.status = 'pending'
  // unreadIntelCount       = rep_messages where from_role='rep' and read_at is null
  const [pendingApprovalsCount] = useState<number>(2);
  const [unreadIntelCount] = useState<number>(3);

  // quick search term
  const [searchTerm, setSearchTerm] = useState("");

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    // We'll route to /admin/search?q=...
    router.push(`/admin/search?q=${encodeURIComponent(searchTerm.trim())}`);
  }

  return (
    <header className="w-full bg-neutral-900 border-b border-neutral-800 flex flex-col gap-4 px-6 py-4 rounded-t-2xl md:flex-row md:items-center md:justify-between">
      {/* Left: brand + mission */}
      <div className="flex items-start md:items-center gap-3">
        <div className="flex items-center gap-3">
          <Image
            src="/images/ld247-logo.png"
            alt="Local Deals 24/7"
            width={36}
            height={36}
            className="rounded-lg bg-neutral-800 border border-neutral-700"
          />
          <div>
            <div className="text-white text-sm font-semibold leading-tight">
              Local Deals 24/7
            </div>
            <div className="text-[11px] text-neutral-400 leading-none">
              Admin Command Center
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 ml-2">
          {/* Pending Approvals */}
          <button
            onClick={() => router.push("/admin/approvals")}
            className="relative text-[11px] font-medium bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg px-2 py-1 hover:bg-neutral-700 hover:text-white"
            title="Vendors waiting for approval"
          >
            Approvals
            {pendingApprovalsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] font-bold leading-none px-1.5 py-0.5 rounded-full border border-orange-300/40 shadow">
                {pendingApprovalsCount}
              </span>
            )}
          </button>

          {/* Field Intel / Messages from reps */}
          <button
            onClick={() => router.push("/admin/messages")}
            className="relative text-[11px] font-medium bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg px-2 py-1 hover:bg-neutral-700 hover:text-white"
            title="New notes from the field"
          >
            Intel
            {unreadIntelCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] font-bold leading-none px-1.5 py-0.5 rounded-full border border-orange-300/40 shadow">
                {unreadIntelCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Right: search + settings/signout */}
      <div className="flex flex-col gap-3 items-stretch md:flex-row md:items-center md:gap-4 md:min-w-[420px]">
        {/* Quick search bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-neutral-800 border border-neutral-700 rounded-lg px-2 h-9 flex-1"
        >
          <input
            className="bg-transparent text-[13px] text-neutral-100 placeholder-neutral-500 outline-none flex-1"
            placeholder="Search vendor, city or rep…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="text-[12px] font-medium bg-orange-600 hover:bg-orange-500 text-white rounded-md px-2 py-1 ml-2 shrink-0"
          >
            Go
          </button>
        </form>

        {/* Settings / Sign out */}
        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={() => router.push("/admin/settings")}
            className="text-neutral-300 hover:text-orange-400 font-medium"
          >
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="text-neutral-300 hover:text-orange-400 font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
