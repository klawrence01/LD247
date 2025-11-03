import { createSupabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const metadata = { title: "Testimonials" };

async function addTestimonial(formData: FormData) {
  "use server";
  const supabase = createSupabaseServer();
  const businessSlug = String(formData.get("business_slug") || "").trim();
  const author_name  = String(formData.get("author_name")  || "").trim();
  const rating       = Number(formData.get("rating") || 5);
  const body         = String(formData.get("body") || "").trim();
  const is_approved  = formData.get("is_approved") === "on";

  if (!businessSlug || !author_name || !body) return;

  const { data: biz } = await supabase
    .from("businesses")
    .select("id")
    .eq("slug", businessSlug)
    .single();

  if (!biz) return;

  await supabase.from("testimonials").insert({
    business_id: biz.id,
    author_name,
    rating,
    body,
    is_approved,
  });

  revalidatePath("/dashboard/merchant/testimonials");
}

async function toggleApproval(formData: FormData) {
  "use server";
  const supabase = createSupabaseServer();
  const id = String(formData.get("id") || "");
  const is_approved = formData.get("is_approved") === "true";
  if (!id) return;
  await supabase.from("testimonials").update({ is_approved: !is_approved }).eq("id", id);
  revalidatePath("/dashboard/merchant/testimonials");
}

async function deleteTestimonial(formData: FormData) {
  "use server";
  const supabase = createSupabaseServer();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/dashboard/merchant/testimonials");
}

export default async function TestimonialsPage() {
  const supabase = createSupabaseServer();

  // You likely have only one business per owner; if multiple, you can type the slug in the form.
  const [{ data: myBiz }, { data: rows }] = await Promise.all([
    supabase.from("businesses").select("name, slug").order("created_at", { ascending: true }),
    supabase.from("testimonials")
      .select("id, author_name, rating, body, is_approved, created_at, business_id, businesses!inner(slug,name)")
      .order("created_at", { ascending: false })
  ]);

  const guessSlug = myBiz?.[0]?.slug ?? "";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <Link href="/dashboard/merchant/messaging" className="text-sm underline">Back to Messaging</Link>
      </div>

      <form action={addTestimonial} className="mt-6 grid gap-3 rounded-xl border p-4">
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <label className="text-sm font-medium">Business Slug</label>
            <input name="business_slug" defaultValue={guessSlug} placeholder="e.g. pizza-palace" required className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="text-sm font-medium">Author</label>
            <input name="author_name" placeholder="Customer name" required className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="text-sm font-medium">Rating (1–5)</label>
            <input name="rating" type="number" min={1} max={5} defaultValue={5} className="mt-1 w-full border rounded-lg px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Testimonial</label>
          <textarea name="body" placeholder="What did they say?" required className="mt-1 w-full min-h-[120px] border rounded-lg px-3 py-2" />
        </div>
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_approved" defaultChecked />
          Show publicly
        </label>
        <div>
          <button className="rounded-lg bg-black text-white px-4 py-2">Add Testimonial</button>
        </div>
      </form>

      <div className="mt-8 space-y-3">
        {(rows ?? []).map((t) => (
          <div key={t.id} className="rounded-lg border p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium">{t.author_name} • {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
                <div className="text-xs text-gray-500">
                  {new Date(t.created_at).toLocaleString()} • {t.businesses?.name ?? ""} ({t.businesses?.slug ?? ""})
                </div>
              </div>
              <div className="flex items-center gap-2">
                <form action={toggleApproval}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="is_approved" value={String(t.is_approved)} />
                  <button className="rounded-lg border px-3 py-1 text-xs">
                    {t.is_approved ? "Hide" : "Show"}
                  </button>
                </form>
                <form action={deleteTestimonial}>
                  <input type="hidden" name="id" value={t.id} />
                  <button className="rounded-lg border px-3 py-1 text-xs">Delete</button>
                </form>
              </div>
            </div>
            <p className="mt-2 whitespace-pre-wrap">{t.body}</p>
          </div>
        ))}
        {(rows ?? []).length === 0 && (
          <div className="text-gray-500 text-sm">No testimonials yet.</div>
        )}
      </div>
    </div>
  );
}
