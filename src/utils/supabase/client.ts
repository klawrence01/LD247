// utils/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

const getEnv = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars.");
  return { url, key };
};

/** New name (preferred) */
export function createSupabaseBrowserClient() {
  const { url, key } = getEnv();
  return createBrowserClient(url, key);
}

/** Legacy alias so pages that import { createClient } keep working */
export const createClient = createSupabaseBrowserClient;
