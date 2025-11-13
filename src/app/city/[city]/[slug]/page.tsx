export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabaseServer';

export default async function CitySlugPage({
  params,
  searchParams,
}: {
  params: { city: string; slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const supabase = createClient();

  // Example minimal query; keep or replace later.
  const { data, error } = await supabase
    .from('vendors')
    .select('id,name,slug,city')
    .eq('slug', params.slug)
    .eq('city', params.city)
    .single();

  if (error || !data) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Vendor not found</h1>
        <p className="text-gray-600">
          {params.city} / {params.slug}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-semibold">{data.name}</h1>
      <p className="text-gray-600">
        {data.city} • {data.slug}
      </p>
    </div>
  );
}
