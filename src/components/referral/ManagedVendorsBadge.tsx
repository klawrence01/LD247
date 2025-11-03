"use client";

import { useEffect, useState } from "react";

export default function ManagedVendorsBadge({ className = "" }: { className?: string }) {
  const [count, setCount] = useState<number>(0);

  const refresh = () => {
    try {
      const raw = localStorage.getItem("ld247_managed_vendors");
      const arr = raw ? JSON.parse(raw) : [];
      setCount(Array.isArray(arr) ? arr.length : 0);
    } catch {
      setCount(0);
    }
  };

  useEffect(() => {
    refresh();
    // update if another tab changes storage
    const onStorage = (e: StorageEvent) => {
      if (e.key === "ld247_managed_vendors") refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${className}`}>
      <span>Managed Vendors</span>
      <span className="rounded-full bg-orange-500 text-white text-xs px-2 py-0.5">{count}</span>
    </span>
  );
}
