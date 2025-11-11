// src/lib/supabase/server.ts
// unified supabase helper so all pages that do
// "@/lib/supabase/server" will work (admin, merchant, city, etc.)

import { createBrowserClient } from "@supabase/ssr";

// the main helper most pages expect
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// some of your pages do: `import { supabase } from "@/lib/supabase/server"`
export const supabase = createClient();

// some may even do a default import
export default createClient;
