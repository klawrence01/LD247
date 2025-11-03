"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseBrowser";

export default function VendorUpdatesPage() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUpdates() {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.from("vendor_updates").select("*");

      if (error) {
        console.error("Error loading vendor updates:", error);
      } else {
        console.log("Vendor updates:", data);
        setUpdates(data || []);
      }

      setLoading(false);
    }

    loadUpdates();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Vendor Updates</h1>

      {loading ? (
        <p>Loading updates...</p>
      ) : updates.length === 0 ? (
        <p>No updates found.</p>
      ) : (
        <ul className="space-y-2">
          {updates.map((item) => (
            <li key={item.id} className="border p-2 rounded-md bg-white">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
