'use client';

import { useRouter } from 'next/navigation';

type Props = {
  cities: string[];
  currentCity: string;
  range: string;
  category?: string;
  q?: string;
};

export default function CitySelect({ cities, currentCity, range, category = 'all', q = '' }: Props) {
  const router = useRouter();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const city = e.target.value;
    const params = new URLSearchParams();
    params.set('range', range);
    if (category) params.set('category', category);
    if (q) params.set('q', q);
    router.push(`/city/${city}?${params.toString()}`);
  }

  return (
    <select
      className="w-40 rounded-lg border px-3 py-2 text-sm"
      value={currentCity}
      onChange={onChange}
    >
      {cities.map((c) => (
        <option key={c} value={c}>
          {c.replace(/-/g, ' ')}
        </option>
      ))}
    </select>
  );
}
