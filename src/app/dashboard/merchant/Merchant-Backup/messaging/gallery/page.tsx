import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "@/utils/supabase/server";
import Link from "next/link";

export const metadata = { title: "Gallery" };

async function addImage(formData: FormData) {
  "use server";
  const supabase = createSupabaseServer();
  const url = String(formData.get("url") || "").trim();
  const caption = String(formData.get("caption") || "").trim();
  if (!url) return;
  await supabase.from("gallery_images").insert({ url, caption });
  revalidatePath("/dashboard/merchant/messaging/gallery");
}

async function deleteImage(formData: FormData) {
  "use server";
  const supabase = createSupabaseServer();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await supabase.from("gallery_images").delete().eq("id", id);
  revalidatePath("/dashboard/merchant/messaging/gallery");
}

export default async function GalleryPage() {
  const supabase = createSupabaseServer();
  const { data } = await supabase
    .from("gallery_images")
    .select("id,url,caption,created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <Link href="/dashboard/merchant/messaging/new" className="text-sm underline">Use in a Note</Link>
      </div>

      <form action={addImage} className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input name="url" placeholder="Image URL *" className="border rounded-lg px-3 py-2 sm:col-span-2" required />
        <input name="caption" placeholder="Caption (optional)" className="border rounded-lg px-3 py-2 sm:col-span-1" />
        <button className="rounded-lg bg-black text-white px-4 py-2 sm:col-span-3">Add to Gallery</button>
      </form>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {(data ?? []).map(img => (
          <div key={img.id} className="rounded-lg border overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.caption || "gallery"} className="w-full h-32 object-cover" />
            <div className="px-2 py-2 text-xs text-gray-600 line-clamp-2">{img.caption}</div>
            <form action={deleteImage} className="px-2 pb-2">
              <input type="hidden" name="id" value={img.id} />
              <button className="text-xs underline">Remove</button>
            </form>
          </div>
        ))}
        {(data ?? []).length === 0 && <div className="text-gray-500 text-sm">No images yet. Add one above.</div>}
      </div>
    </div>
  );
}
