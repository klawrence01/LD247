"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LS_KEY = "ld247_referral_form";

type FormData = {
  vendorName: string; category: string;
  contactName: string; contactEmail: string; contactPhone: string;
  city: string; state: string;
  referralTerms?: string; availableSlots?: string; notes?: string; logoUrl?: string;
};

function toToken(data: FormData) {
  const json = JSON.stringify(data);
  return typeof window === "undefined" ? "" : btoa(unescape(encodeURIComponent(json)));
}

export default function ReferralForm() {
  const router = useRouter();
  const [data, setData] = useState<FormData>({
    vendorName:"", category:"", contactName:"", contactEmail:"", contactPhone:"",
    city:"", state:"", referralTerms:"", availableSlots:"", notes:"", logoUrl:""
  });

  // LOAD from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setData(JSON.parse(raw));
    } catch {}
  }, []);

  // SAVE to localStorage on change (debounced-ish)
  useEffect(() => {
    const id = setTimeout(() => {
      try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
    }, 200);
    return () => clearTimeout(id);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    const { name, value } = e.target; setData(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = toToken(data);
    router.push(`/sales/tools/referral/preview?token=${encodeURIComponent(token)}`);
  };

  const clearForm = () => {
    localStorage.removeItem(LS_KEY);
    setData({
      vendorName:"", category:"", contactName:"", contactEmail:"", contactPhone:"",
      city:"", state:"", referralTerms:"", availableSlots:"", notes:"", logoUrl:""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
      {/* ...existing inputs unchanged... use value={data.field} onChange={handleChange} as you already have */}
      <div className="flex items-center justify-between">
        <button type="button" onClick={clearForm} className="border rounded-lg px-4 py-2 text-sm">
          Clear
        </button>
        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium">
          Preview Managed Listing
        </button>
      </div>
    </form>
  );
}
