export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabaseServer';

export default async function AdminDashboardPage() {
  const supabase = createClient();

  // you can add queries later; page compiles cleanly now
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <p className="text-gray-600">Server client is wired and ready.</p>
    </div>
  );
}
