// app/dashboard/merchant/business/[businessId]/page.tsx
import Link from "next/link";
import { createSupabaseServer } from "@/utils/supabase/server";

export const metadata = { title: "Business Details | Merchant Dashboard" };

export default async function BusinessDetailPage({ params }: { params: { businessId: string } }) {
  const supabase = createSupabaseServer();

  const { data: business, error } = await supabase
    .from("businesses")
    .select("id,name,slug,city,state,logo_url,description")
    .eq("id", params.businessId)
    .single();

  if (error || !business) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Business not found</h1>
        <Link href="/dashboard/merchant/business" className="underline">Back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{business.name}</h1>
        <Link href="/dashboard/merchant/business" className="underline">Back</Link>
      </div>

      <div className="rounded-xl border p-6 grid gap-4">
        <div className="text-sm text-gray-500">Business ID</div>
        <div className="font-mono text-sm">{business.id}</div>

        <div className="text-sm text-gray-500 mt-4">Public URL</div>
        <div className="text-sm">/vendor/{business.slug}</div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="rounded-lg border p-4">
            <div className="text-sm text-gray-500 mb-1">Logo</div>
            <div className="aspect-[3/2] rounded-md border grid place-items-center text-sm overflow-hidden">
              {business.logo_url ? <img src={business.logo_url} alt="logo" className="h-full object-contain" /> : "No logo"}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-sm text-gray-500 mb-1">About</div>
            <p className="text-sm">{business.description || "Add a description in Business page."}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <Link href="/dashboard/merchant/hours" className="px-3 py-2 rounded-md border">Edit Hours</Link>
          <Link href="/dashboard/merchant/advertising" className="px-3 py-2 rounded-md border">Advertising</Link>
          <Link href="/dashboard/merchant/analytics" className="px-3 py-2 rounded-md border">Analytics</Link>
          <Link href="/dashboard/merchant/testimonial" className="px-3 py-2 rounded-md border">Testimonials</Link>
          <Link href="/dashboard/merchant/preview" className="px-3 py-2 rounded-md bg-black text-white">Preview Page</Link>
        </div>
      </div>
    </div>
  );
}
