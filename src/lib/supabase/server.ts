// src/lib/supabase/server.ts
// unified server/browser supabase helper so all pages can import from here

import { createBrowserClient } from "@supabase/ssr";

// the function most pages want:
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// some of your pages do `import { supabase } ...`
// so give them a ready-made client too:
export const supabase = createClient();

// and if anything was doing a default import, this keeps it happy:
export default createClient;
