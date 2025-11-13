// src/app/sales/apply/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "@/utils/supabase/server"; // compat alias OK

export async function submitRepApplication(formData: FormData) {
  // 1) Read & validate
  const full_name = String(formData.get("full_name") ?? "").trim();
  const territory = String(formData.get("territory") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!full_name || !territory) {
    return { ok: false, error: "Full name and territory are required." };
  }

  // 2) Create SSR client (IMPORTANT: await)
  const supabase = await createSupabaseServer();

  // 3) Insert
  const { error } = await supabase.from("rep_applicants").insert([
    {
      full_name,
      territory,
      email: email || null,
      phone: phone || null,
    },
  ]);

  if (error) {
    return { ok: false, error: error.message };
  }

  // 4) Revalidate any page that lists applicants (adjust path if needed)
  revalidatePath("/sales/apply");

  return { ok: true };
}
