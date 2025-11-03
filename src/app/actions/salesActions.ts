'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/utils/supabase/server';

/**
 * submitRepLead
 * Called by /sales/[repSlug] form.
 */
export async function submitRepLead(formData: FormData) {
  const supabase = createSupabaseServer();

  const rep_slug = formData.get('rep_slug') as string;
  const business_name = formData.get('business_name') as string;
  const contact_phone = formData.get('contact_phone') as string;
  const best_time = formData.get('best_time') as string;

  if (!rep_slug || !business_name) {
    return { success: false, error: 'Missing required fields.' };
  }

  // Look up rep ID
  const { data: repData, error: repErr } = await supabase
    .from('sales_reps')
    .select('id')
    .eq('slug', rep_slug)
    .single();

  if (repErr) {
    // If no rep found we still don't want to crash — just bail gracefully
    return { success: false, error: 'Rep not found for this URL.' };
  }

  // Insert lead
  const { error: insertErr } = await supabase.from('rep_leads').insert([
    {
      sales_rep_id: repData?.id ?? null,
      business_name,
      contact_phone,
      best_time,
      stage: 'new',
    },
  ]);

  if (insertErr) {
    return { success: false, error: insertErr.message };
  }

  revalidatePath(`/sales/${rep_slug}`);

  // Redirect back to the rep page with a success flag
  redirect(`/sales/${rep_slug}?ok=1`);
}

/**
 * submitRepApplication
 * Called by /sales/apply form.
 */
export async function submitRepApplication(formData: FormData) {
  const supabase = createSupabaseServer();

  const full_name = formData.get('full_name') as string;
  const territory = formData.get('territory') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const experience_level = formData.get('experience_level') as string;
  const comfort_in_person = formData.get('comfort_in_person') as string;
  const start_timing = formData.get('start_timing') as string;

  if (!full_name || !email) {
    return { success: false, error: 'Missing name or email.' };
  }

  const { error: insertErr } = await supabase.from('rep_applicants').insert([
    {
      full_name,
      territory,
      phone,
      email,
      experience_level,
      comfort_in_person,
      start_timing,
      status: 'new',
    },
  ]);

  if (insertErr) {
    return { success: false, error: insertErr.message };
  }

  revalidatePath('/sales/apply');

  // Redirect back to /sales/apply with success flag
  redirect('/sales/apply?ok=1');
}
