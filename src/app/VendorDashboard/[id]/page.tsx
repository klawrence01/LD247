import { createClient } from '@/lib/supabaseServer';

export default async function VendorDashboardPage({
  params,
  // include searchParams in the signature to satisfy Next’s generic constraint
  searchParams,
}: {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const supabase = createClient();
  const vendorId = params.id;

  // Example safe query (replace with your real fields)
  const { data, error } = await supabase
    .from('vendors')
    .select('id,name')
    .eq('id', vendorId)
    .single();

  if (error) {
    console.error('Vendor load error:', error);
    return <div className="p-6 text-red-600">Failed to load vendor data.</div>;
  }

  if (!data) {
    return <div className="p-6">No vendor found for ID: {vendorId}</div>;
  }

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-semibold">{data.name}</h1>
      <p className="text-gray-600">Vendor ID: {data.id}</p>
    </div>
  );
}
