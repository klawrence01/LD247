"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Data = {
  vendorName: string;
  category: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  city: string;
  state: string;
  referralTerms?: string;
  availableSlots?: string;
  notes?: string;
  logoUrl?: string;
};

function fromToken(token: string | null): Data | null {
  if (!token) return null;
  try {
    const json = decodeURIComponent(escape(atob(token)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function saveManagedVendor(data: Data) {
  const rec = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "published", // mock status
    ...data,
  };
  try {
    const raw = localStorage.getItem("ld247_managed_vendors");
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(rec);
    localStorage.setItem("ld247_managed_vendors", JSON.stringify(arr));
    return rec.id as string;
  } catch {
    return null;
  }
}

export default function PreviewPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const data = useMemo(() => fromToken(token), [token]);

  if (!data) {
    return (
      <div className="p-6 md:p-10">
        <p className="text-sm text-red-600">No data found. Please go back and fill the form.</p>
        <button
          onClick={() => router.push("/sales/tools/referral/new")}
          className="mt-4 border rounded-lg px-4 py-2 text-sm"
        >
          Back to Form
        </button>
      </div>
    );
  }

  const cityDisplay = [data.city, data.state].filter(Boolean).join(", ");

  return (
    <div className="p-6 md:p-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{data.vendorName}</h1>
          <p className="text-sm text-gray-500">
            {data.category || "Local Business"} • {cityDisplay || "Your City"}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          Referral Managed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Hero / Logo + Contact */}
          <div className="border rounded-2xl p-4 flex items-center gap-4">
            {data.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoUrl} alt="Vendor Logo" className="h-16 w-16 rounded-xl object-cover border" />
            ) : (
              <div className="h-16 w-16 rounded-xl bg-gray-100 border flex items-center justify-center text-gray-400 text-xs">
                No Logo
              </div>
            )}
            <div>
              <div className="text-sm text-gray-600">Managed by LD247 Sales Rep</div>
              <div className="text-xs text-gray-500">
                Contact: {data.contactName || "—"} • {data.contactPhone || "—"} • {data.contactEmail || "—"}
              </div>
            </div>
          </div>

          {/* Offer Preview */}
          <div className="border rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Starter Coupon (Preview)</h2>
              <span className="text-xs text-gray-500">Static mockup</span>
            </div>
            <p className="text-sm">
              New Patient Special — <strong>Free Consultation</strong> + <strong>10% Off First Visit</strong>
            </p>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Show this coupon at check-in</li>
              <li>Not valid with other offers</li>
              <li>Limit 1 per new customer</li>
            </ul>
            {data.availableSlots && (
              <div className="text-sm">
                <span className="font-medium">Available Times:</span> {data.availableSlots}
              </div>
            )}
          </div>

          {/* Terms + Notes */}
          {(data.referralTerms || data.notes) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {data.referralTerms && (
                <div className="border rounded-2xl p-5">
                  <h3 className="font-semibold mb-2">Referral Fee Terms</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{data.referralTerms}</p>
                </div>
              )}
              {data.notes && (
                <div className="border rounded-2xl p-5">
                  <h3 className="font-semibold mb-2">Rep Notes (Private)</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{data.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="border rounded-2xl p-5 space-y-3">
            <div className="text-sm text-gray-500">Business Info</div>
            <div className="text-sm">
              <span className="font-medium">Category:</span> {data.category || "—"}
            </div>
            <div className="text-sm">
              <span className="font-medium">City:</span> {cityDisplay || "—"}
            </div>
            <div className="text-sm">
              <span className="font-medium">Phone:</span> {data.contactPhone || "—"}
            </div>
            <div className="text-sm">
              <span className="font-medium">Email:</span> {data.contactEmail || "—"}
            </div>
          </div>

          <div className="border rounded-2xl p-5 space-y-3">
            <div className="text-sm text-gray-500">Actions</div>
            <button
              onClick={() => router.push("/sales/tools/referral/new")}
              className="w-full bg-white border hover:bg-gray-50 rounded-lg px-4 py-2 text-sm"
            >
              Edit Details
            </button>
            <button
              onClick={() => {
                const id = saveManagedVendor(data);
                if (id) router.push(`/sales/tools/referral/success?id=${id}`);
                else alert("Could not save locally. (Storage blocked?)");
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-sm font-medium"
            >
              Publish (Mock)
            </button>
          </div>

          <div className="text-xs text-gray-500">Last updated just now</div>
        </aside>
      </div>
    </div>
  );
}
