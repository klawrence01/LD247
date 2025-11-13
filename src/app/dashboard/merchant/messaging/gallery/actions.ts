'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/utils/supabase/server';

export async function addGalleryImage(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();

  const url = String(formData.get('url') ?? '').trim();
  const caption = String(formData.get('caption') ?? '').trim();

  if (!url) {
    // Let Next surface this as a server action error
    throw new Error('Missing image URL.');
  }

  const { error } = await supabase.from('gallery_images').insert({ url, caption });
  if (error) {
    throw new Error(error.message);
  }

  // Ensure the listing updates
  revalidatePath('/dashboard/merchant/messaging/gallery');
}
