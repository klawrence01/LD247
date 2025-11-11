"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseBrowser"; // ✅ your new browser client
import ApproveVendorButton from "./ApproveVendorButton";
import PauseVendorButton from "./PauseVendorButton";
import AssignRepForm from "./AssignRepForm";
import FeatureDealButton from "./FeatureDealButton";

type Vendor = {
  id: string;
  name: string | null;
  status: string | null;
  city: string | null;
  // add any other columns you have
};

export default function VendorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  const businessId = params?.businessId as string;
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!businessId) return;

    async function fetchVendor() {
      const { data, error } = await supabase
        .from("vendor") // ✅ table name you used in approvals
        .select("*")
        .eq("id", businessId)
        .maybeSingle();

      if (error) {
        console.error("Error loading vendor:", error.message);
      } else {
        setVendor(data as Vendor);
      }
      setLoading(false);
    }

    fetchVendor();
  }, [businessId, supabase]);

  if (loading) {
    return <div className="p-6 text-slate-500">Loading vendor...</div>;
  }

  if (!vendor) {
    return (
      <div className="p-6">
        <p className="text-red-500 mb-4">Vendor not found.</p>
        <button
          onClick={() => router.back()}
          className="px-3 py-2 rounded bg-slate-900 text-white text-sm"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{vendor.name ?? "Unnamed Vendor"}</h1>
          <p className="text-sm text-slate-500">
            Status: <span className="font-medium">{vendor.status}</span>
          </p>
          {vendor.city ? (
            <p className="text-sm text-slate-500">City: {vendor.city}</p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <ApproveVendorButton businessId={vendor.id} />
          <PauseVendorButton businessId={vendor.id} />
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="border border-slate-200 rounded-lg p-4 bg-white">
          <h2 className="font-semibold mb-3">Assign Rep</h2>
          <AssignRepForm businessId={vendor.id} />
        </div>

        <div className="border border-slate-200 rounded-lg p-4 bg-white">
          <h2 className="font-semibold mb-3">Feature Deal</h2>
          <FeatureDealButton businessId={vendor.id} />
        </div>
      </section>
    </div>
  );
}
