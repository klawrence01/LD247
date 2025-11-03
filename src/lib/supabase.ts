import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://wxmpoxzdnlhizpbvmsyf.supabase.co", // <-- Your actual Supabase project URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bXBveHpkbmxoaXpwYnZtc3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0NjYwMzEsImV4cCI6MjAzOTA0MjAzMX0.A5-fEnyF4CfBN01n7rBOW_lyyf0pn8sHWtBPiIcVKJ0" // <-- Your actual anon key
);
