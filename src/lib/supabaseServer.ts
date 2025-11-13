// C:\Users\Owner\ld247\src\lib\supabaseServer.ts

// SSR/server-only Supabase client wired to Next.js cookies.
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Factory (named export) — this is what admin pages should import. */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // ignore cookie write errors on server
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          // ignore cookie remove errors on server
        }
      },
    },
  });
}

/** Optional aliases (exported too) */
export const supabase = createClient();         // if something imports { supabase } from "@/lib/supabaseServer"
export const supabaseServer = () => createClient();
export default createClient;
