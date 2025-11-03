"use server";

import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/utils/supabase/server";

export async function submitRepApplication(formData: FormData) {
  const full_name = formData.get("full_name")?.toString().trim() ?? "";
  const territory = formData.get("territory")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const experience_level =
    formData.get("experience_level")?.toString().trim() ?? "";
  const comfort_in_person =
    formData.get("comfort_in_person")?.toString().trim() ?? "";
  const start_timing = formData.get("start_timing")?.toString().trim() ?? "";

  // Basic guard. You can tighten this later.
  if (!full_name || !phone) {
    // In the future you can return an error state instead of redirect.
    // For first pass we just bounce back to form.
    redirect("/sales/apply?error=missing_required_fields");
  }

  const supabase = createSupabaseServer();

  const { error } = await supabase.from("rep_applicants").insert([
    {
      full_name,
      territory,
      phone,
      email,
      experience_level,
      comfort_in_person,
      start_timing,
      status: "new",
    },
  ]);

  if (error) {
    console.error("rep_applicants insert error:", error.message);
    redirect("/sales/apply?error=save_failed");
  }

  // Later we do a /sales/apply/success page. For now keep it simple.
  redirect("/sales/apply?submitted=1");
}
