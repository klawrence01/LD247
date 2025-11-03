"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseBrowser";

export default function VendorsPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadVendors() {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error } = await supabase.from("vendors").select("*");

        if (error) {
          console.error("Error loading vendors:", error);
          setErrorMsg(error.message || "Unknown error");
          setVendors([]);
        } else {
          console.log("Vendors loaded:", data);
          setVendors(data || []);
        }
      } catch (err: any) {
        console.error("Unexpected error:", err);
        setErrorMsg(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    }

    loadVendors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Vendors</h1>
      <p className="text-sm text-gray-600 mb-6">
        Find your businesses, see their plan and status, and message them.
      </p>

      {loading && <p>Loading vendors...</p>}
      {errorMsg && (
        <div className="text-red-600 mb-4">
          <strong>Error:</strong> {errorMsg}
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-3 border">Business</th>
            <th className="py-2 px-3 border">City</th>
            <th className="py-2 px-3 border">Plan</th>
            <th className="py-2 px-3 border">Status</th>
            <th className="py-2 px-3 border">Rep</th>
          </tr>
        </thead>
        <tbody>
          {vendors.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-center py-4 text-gray-500 border-t"
              >
                No vendors found.
              </td>
            </tr>
          ) : (
            vendors.map((vendor) => (
              <tr key={vendor.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-3 border">{vendor.name}</td>
                <td className="py-2 px-3 border">{vendor.city}</td>
                <td className="py-2 px-3 border">{vendor.plan}</td>
                <td className="py-2 px-3 border">{vendor.status}</td>
                <td className="py-2 px-3 border">{vendor.rep || "—"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-6 bg-gray-50 border rounded-md p-3 text-xs text-gray-700">
        <strong>Debug</strong>
        <p>Rows received: {vendors?.length || 0}</p>
        <pre>{JSON.stringify(vendors[0] || null, null, 2)}</pre>
      </div>
    </div>
  );
}
