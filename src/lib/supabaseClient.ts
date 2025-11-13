"use client";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function makeClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase environment variables");
  }
  return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ✅ modern way
export function createClient() {
  return makeClient();
}

// ✅ old pages using getSupabaseBrowserClient
export function getSupabaseBrowserClient() {
  return makeClient();
}

// ✅ old pages doing `import { supabase } ...`
export const supabase = makeClient();
