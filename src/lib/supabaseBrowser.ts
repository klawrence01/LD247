// ✅ Vercel-compliant Supabase client (browser-only)
"use client";

import { createBrowserClient } from "@supabase/ssr";

let supabase: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Returns a singleton browser Supabase client.
 * Works in dev, preview, and prod on Vercel.
 */
export function getSupabaseBrowser() {
  if (!supabase) {
    supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return supabase;
}
