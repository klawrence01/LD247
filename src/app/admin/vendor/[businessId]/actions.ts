'use server';

import { createClient } from '@/lib/supabaseServer';

// Example action; safe placeholder to satisfy imports at build time
export async function approveBusiness(businessId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('businesses')
    .update({ status: 'approved' })
    .eq('id', businessId);
  return { ok: !error };
}
