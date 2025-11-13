"use server";

import {
  createSupabaseServerClient,
  createSupabaseServer,
} from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addGalleryImage(formData: FormData) {
  const supabase = await createSupabaseServerClient(); // or: await createSupabaseServer();

  const url = String(formData.get("url") || "").trim();
  const caption = String(formData.get("caption") || "").trim();

  if (!url) return;

  const { error } = await supabase
    .from("gallery_images")
    .insert({ url, caption });

  if (error) {
    console.error("gallery insert failed", error);
  }

  // refresh the page
  revalidatePath("/dashboard/merchant/messaging/gallery");
}
