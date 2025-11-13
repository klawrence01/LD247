// C:\Users\Klawr\LD247\src\lib\supabase.ts

// Re-export the browser client so imports like
//   import { supabase } from "@/lib/supabase";
// keep working.
export { supabase } from "./supabaseBrowser";

// If you ever need the raw browser createClient, you can also do:
//   import { createClient as createSupabaseClient } from "@/lib/supabase";
export { createClient as createSupabaseClient } from "./supabaseBrowser";
