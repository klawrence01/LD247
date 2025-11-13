// C:\Users\Owner\ld247\src\lib\supabase.ts

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Factory for pages that do: import { createClient } from "@/lib/supabase"
export function createClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase environment variables");
  }
  return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// For pages that do: import { supabase } from "@/lib/supabase"
export const supabase = createClient();

// Optional default export (if any old code uses it)
export default supabase;
