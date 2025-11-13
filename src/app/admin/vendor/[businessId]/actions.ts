// C:\Users\Owner\ld247\src\app\admin\vendor\[businessId]\actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Local Supabase client – no "@/lib/supabase..." imports
const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function updateVendorStatus(businessId: string, status: string) {
  if (!businessId) return;

  await supabase
    .from("businesses")
    .update({ status })
    .eq("id", businessId);

  // Refresh admin views that depend on vendor status
  revalidatePath("/admin/approvals");
  revalidatePath(`/admin/vendor/${businessId}`);
}

/**
 * Approve a vendor (set status to 'approved')
 */
export async function approveVendor(businessId: string) {
  await updateVendorStatus(businessId, "approved");
}

/**
 * Reject / disable a vendor (set status to 'rejected')
 */
export async function rejectVendor(businessId: string) {
  await updateVendorStatus(businessId, "rejected");
}
