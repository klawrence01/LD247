'use client';

import { supabase } from '@/lib/supabaseBrowser';
import { useEffect, useState } from 'react';

type Survey = { id: string; title: string; created_at: string };

export default function SurveysPage() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from('surveys')
        .select('id,title,created_at')
        .order('created_at', { ascending: false })
        .limit(20);
      if (mounted) {
        setSurveys(data ?? []);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Surveys</h1>
      {loading ? (
        <p>Loading…</p>
      ) : surveys.length === 0 ? (
        <p>No surveys yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {surveys.map((s) => (
            <li key={s.id}>
              <span className="font-medium">{s.title}</span>{' '}
              <span className="text-sm text-gray-500">
                ({new Date(s.created_at).toLocaleDateString()})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
