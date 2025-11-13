'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/utils/supabase/server';

export async function createMessage(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();

  const subject = String(formData.get('subject') ?? '').trim();
  const body_text = String(formData.get('body_text') ?? '').trim();
  const body_html = String(formData.get('body_html') ?? '').trim();
  const status = String(formData.get('status') ?? 'draft');

  if (!subject) throw new Error('Subject is required');

  const { error } = await supabase
    .from('messages')
    .insert({ subject, body_text, body_html, status });

  if (error) throw new Error(error.message);

  // Refresh any views that list messages
  revalidatePath('/dashboard/merchant/messaging/sent');
  revalidatePath('/dashboard/merchant/messaging');
}
