// C:\Users\Klawr\LD247\src\lib\supabaseBrowser.ts
"use client";

import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

// Main singleton – this is the actual client most pages use
export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Old helper name used in several files:
 *   import { getSupabaseBrowser } from "@/lib/supabaseBrowser";
 */
export function getSupabaseBrowser() {
  return supabase;
}

/**
 * Another alias used in a couple of pages:
 *   import { getSupabaseBrowserClient } from "@/lib/supabaseBrowser";
 */
export function getSupabaseBrowserClient() {
  return supabase;
}

/**
 * Some places may do:
 *   import { createClient } from "@/lib/supabaseBrowser";
 */
export function createClient() {
  return supabase;
}

// Default export just in case
export default supabase;
