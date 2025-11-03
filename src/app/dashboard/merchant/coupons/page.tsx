// app/dashboard/merchant/coupons/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/utils/supabase/server";

export const metadata = { title: "Coupons | Merchant Dashboard" };

async function createCoupon(formData: FormData) {
  "use server";
  const supabase = createSupabaseServer();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) throw new Error("Not authenticated.");

  const business_id = formData.get("business_id") as string | null;
  if (!business_id) throw new Error("Select a business.");

  const { data, error } = await supabase
    .from("coupons")
    .insert({
      business_id,
      title: (formData.get("title") as string) || null,
      deal_type: (formData.get("deal_type") as string) || "percent",
      value: formData.get("value") ? Number(formData.get("value")) : null,
      start_date: (formData.get("start_date") as string) || null,
      end_date: (formData.get("end_date") as string) || null,
      limit_per_person: formData.get("limit_per_person") ? Number(formData.get("limit_per_person")) : null,
      stock: formData.get("stock") ? Number(formData.get("stock")) : null,
      status: (formData.get("status") as string) || "draft",
      details: (formData.get("details") as string) || null,
      image_url: (formData.get("image_url") as string) || null,
    })
    .select("id")
    .single();

  if (error) throw error;
  redirect(`/dashboard/merchant/coupons/${data.id}`);
}

export default async function CouponsPage() {
  const supabase = createSupabaseServer();

  const { data: businesses } = await supabase
    .from("businesses")
    .select("id,name")
    .order("created_at", { ascending: false });

  const { data: myCoupons } = await supabase
    .from("coupons")
    .select("id,title,status,created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create Coupon</h1>
        <Link href="/dashboard/merchant/preview" className="underline">Preview</Link>
      </div>

      {myCoupons && myCoupons.length > 0 && (
        <div className="mb-8 rounded-xl border p-4">
          <div className="text-sm font-medium mb-2">Existing Coupons</div>
          <ul className="grid gap-2">
            {myCoupons.map((c: any) => (
              <li key={c.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.title || "(untitled)"}</div>
                  <div className="text-xs text-gray-500">{c.status}</div>
                </div>
                <Link href={`/dashboard/merchant/coupons/${c.id}`} className="text-sm underline">Open</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form action={createCoupon} className="grid gap-4">
        <label className="grid gap-1">
          <span className="text-sm font-medium">Business</span>
          <select name="business_id" required className="border rounded-md px-3 py-2">
            <option value="">Select...</option>
            {(businesses || []).map((b: any) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Title</span>
            <input name="title" required className="border rounded-md px-3 py-2" placeholder="30% Off Large Pizza" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Deal Type</span>
            <select name="deal_type" className="border rounded-md px-3 py-2">
              <option value="percent">Percent Off</option>
              <option value="flat">Flat Discount</option>
              <option value="bogo">BOGO</option>
            </select>
          </label>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Value</span>
            <input name="value" className="border rounded-md px-3 py-2" placeholder="30 or 5.00" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Start Date</span>
            <input type="date" name="start_date" className="border rounded-md px-3 py-2" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">End Date</span>
            <input type="date" name="end_date" className="border rounded-md px-3 py-2" />
          </label>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Limit per Person</span>
            <input name="limit_per_person" className="border rounded-md px-3 py-2" placeholder="1" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Stock (optional)</span>
            <input name="stock" className="border rounded-md px-3 py-2" placeholder="e.g., 100" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Status</span>
            <select name="status" className="border rounded-md px-3 py-2">
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="live">Live</option>
            </select>
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Fine Print / Details</span>
          <textarea name="details" rows={3} className="border rounded-md px-3 py-2" placeholder="Valid Mon–Thu. Dine-in only." />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Image URL</span>
          <input name="image_url" className="border rounded-md px-3 py-2" placeholder="public-assets/coupons/{businessId}/{couponId}.webp" />
        </label>

        <div className="flex gap-3 pt-2">
          <button className="px-4 py-2 rounded-md border" formNoValidate>Save Draft</button>
          <button className="px-4 py-2 rounded-md bg-black text-white">Create & Continue</button>
        </div>
      </form>
    </div>
  );
}
