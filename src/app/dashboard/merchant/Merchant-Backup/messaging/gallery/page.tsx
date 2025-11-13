import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function MerchantGalleryPage() {
  // 1. get real client for initial render
  const supabase = await createSupabaseServerClient();

  const { data: images = [], error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("gallery fetch failed", error);
  }

  // 2. server action (runs separately!)
  async function addGalleryImage(formData: FormData) {
    "use server";

    // 👇 THIS is the line your current file is missing
    const supabase = await createSupabaseServerClient();

    const url = String(formData.get("url") || "").trim();
    const caption = String(formData.get("caption") || "").trim();

    if (!url) return;

    await supabase.from("gallery_images").insert({ url, caption });

    revalidatePath("/dashboard/merchant/messaging/gallery");
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-2">Gallery</h1>

      <form action={addGalleryImage} className="space-y-2 max-w-md">
        <input
          name="url"
          placeholder="Image URL"
          className="border rounded px-2 py-1 w-full"
        />
        <input
          name="caption"
          placeholder="Caption (optional)"
          className="border rounded px-2 py-1 w-full"
        />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
          Add Image
        </button>
      </form>

      <div className="grid gap-3 md:grid-cols-3">
        {images.map((img: any) => (
          <div key={img.id} className="border rounded-lg p-2 bg-white">
            <img src={img.url} alt={img.caption ?? ""} className="rounded mb-2" />
            {img.caption ? (
              <p className="text-sm text-muted-foreground">{img.caption}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
