export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabaseServer';

type Biz = {
  id: string;
  name: string | null;
  status: string | null;
  created_at: string | null;
};

export default async function ApprovalsPage() {
  const supabase = createClient();

  // Note: kept very safe for build. If table names differ, the page still compiles;
  // runtime is dynamic, so it won't be executed at build time.
  const { data, error } = await supabase
    .from('businesses')
    .select('id,name,status,created_at')
    .eq('status', 'pending')
    .limit(25);

  const items: Biz[] = Array.isArray(data) ? data : [];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Approvals</h1>
      {error ? (
        <p className="text-red-600">Error loading pending approvals.</p>
      ) : items.length === 0 ? (
        <p>No pending approvals.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((b) => (
            <li key={b.id} className="border rounded p-3">
              <div className="font-medium">{b.name ?? 'Untitled Business'}</div>
              <div className="text-sm text-gray-500">
                Status: {b.status ?? 'unknown'} •{' '}
                {b.created_at ? new Date(b.created_at).toLocaleString() : '—'}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
