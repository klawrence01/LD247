"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseBrowser";

export default function AdminDashboardPage() {
  const [vendorCount, setVendorCount] = useState<number | null>(null);
  const [pendingCount, setPendingCount] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      setErrorMsg(null);

      // total vendors
      const { count: totalVendors, error: vendorsError } = await supabase
        .from("vendors")
        .select("id", { count: "exact", head: true });

      if (vendorsError) {
        console.error(vendorsError);
        setErrorMsg(vendorsError.message);
        return;
      }

      // pending vendors
      const { count: pendingVendors, error: pendingError } = await supabase
        .from("vendors")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending");

      if (pendingError) {
        console.error(pendingError);
        setErrorMsg(pendingError.message);
        return;
      }

      setVendorCount(totalVendors ?? 0);
      setPendingCount(pendingVendors ?? 0);
    };

    load();
  }, [supabase]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {errorMsg && <p className="text-red-500">Error: {errorMsg}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-md p-4">
          <p className="text-sm text-gray-500">Total Vendors</p>
          <p className="text-3xl font-bold">
            {vendorCount !== null ? vendorCount : "…"}
          </p>
        </div>
        <div className="border rounded-md p-4">
          <p className="text-sm text-gray-500">Pending Approvals</p>
          <p className="text-3xl font-bold">
            {pendingCount !== null ? pendingCount : "…"}
          </p>
        </div>
        <div className="border rounded-md p-4">
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-lg font-medium">
            {errorMsg ? "Check logs" : "OK"}
          </p>
        </div>
      </div>
    </div>
  );
}
