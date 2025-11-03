// app/dashboard/merchant/business/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/utils/supabase/server";

export const metadata = { title: "Business | Merchant Dashboard" };

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

async function createBusiness(formData: FormData) {
  "use server";
  const supabase = createSupabaseServer();

  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) throw new Error("Not authenticated.");

  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Name is required.");

  // unique slug
  let slug = slugify(name);
  const { data: exists } = await supabase.from("businesses").select("id").eq("slug", slug).maybeSingle();
  if (exists) slug = `${slug}-${crypto.randomUUID().slice(0, 6)}`;

  const { data, error } = await supabase
    .from("businesses")
    .insert({
      owner_user_id: auth.user.id,
      name,
      slug,
      category: (formData.get("category") as string) || null,
      description: (formData.get("description") as string) || null,
      phone: (formData.get("phone") as string) || null,
      website: (formData.get("website") as string) || null,
      address: (formData.get("address") as string) || null,
      city: (formData.get("city") as string) || null,
      state: (formData.get("state") as string) || null,
      zip: (formData.get("zip") as string) || null,
      logo_url: (formData.get("logo_url") as string) || null,
    })
    .select("id")
    .single();

  if (error) throw error;
  redirect(`/dashboard/merchant/business/${data.id}`);
}

export default async function BusinessPage() {
  const supabase = createSupabaseServer();

  const { data: list } = await supabase
    .from("businesses")
    .select("id,name,slug,city,state,created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Business</h1>
        <Link href="/dashboard/merchant/preview" className="underline">Preview</Link>
      </div>

      {list && list.length > 0 && (
        <div className="mb-8 rounded-xl border p-4">
          <div className="text-sm font-medium mb-2">Existing</div>
          <ul className="grid gap-2">
            {list.map((b: any) => (
              <li key={b.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{b.name}</div>
                  <div className="text-xs text-gray-500">/vendor/{b.slug}</div>
                </div>
                <Link href={`/dashboard/merchant/business/${b.id}`} className="text-sm underline">Open</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form action={createBusiness} className="grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Name</span>
            <input name="name" required className="border rounded-md px-3 py-2" placeholder="Tony's Pizza" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Category</span>
            <input name="category" className="border rounded-md px-3 py-2" placeholder="Restaurant" />
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Description</span>
          <textarea name="description" rows={4} className="border rounded-md px-3 py-2" placeholder="What makes your business special?" />
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Phone</span>
            <input name="phone" className="border rounded-md px-3 py-2" placeholder="(555) 123-4567" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Website</span>
            <input name="website" className="border rounded-md px-3 py-2" placeholder="https://example.com" />
          </label>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <label className="grid gap-1">
            <span className="text-sm font-medium">City</span>
            <input name="city" className="border rounded-md px-3 py-2" placeholder="Meriden" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">State</span>
            <input name="state" className="border rounded-md px-3 py-2" placeholder="CT" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">ZIP</span>
            <input name="zip" className="border rounded-md px-3 py-2" placeholder="06450" />
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Logo URL</span>
          <input name="logo_url" className="border rounded-md px-3 py-2" placeholder="public-assets/business-logos/{id}/logo.webp" />
        </label>

        <div className="flex gap-3 pt-2">
          <button className="px-4 py-2 rounded-md border" formNoValidate>Save Draft</button>
          <button className="px-4 py-2 rounded-md bg-black text-white">Create & Continue</button>
        </div>
      </form>
    </div>
  );
}
