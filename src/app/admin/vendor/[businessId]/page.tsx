export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabaseServer';

export default async function AdminVendorDetailPage({
  params,
  searchParams,
}: {
  params: { businessId: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const supabase = createClient();
  const id = params.businessId;

  const { data, error } = await supabase
    .from('businesses')
    .select('id,name,status,created_at')
    .eq('id', id)
    .single();

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-semibold">Vendor</h1>
      {error || !data ? (
        <p>No business found for ID: {id}</p>
      ) : (
        <>
          <div className="text-lg font-medium">{data.name ?? 'Untitled Business'}</div>
          <div className="text-gray-600">ID: {data.id}</div>
          <div className="text-gray-600">Status: {data.status ?? 'unknown'}</div>
          <div className="text-gray-600">
            Created: {data.created_at ? new Date(data.created_at).toLocaleString() : '—'}
          </div>
        </>
      )}
    </div>
  );
}
