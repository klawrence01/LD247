'use client';

import { supabase } from '@/lib/supabaseBrowser';
import { useEffect, useState } from 'react';

type Contact = { id: string; name: string | null; email: string | null };

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from('contacts')
        .select('id,name,email')
        .limit(25);
      if (mounted) {
        setContacts(data ?? []);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Contacts</h1>
      {loading ? (
        <p>Loading…</p>
      ) : contacts.length === 0 ? (
        <p>No contacts yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {contacts.map((c) => (
            <li key={c.id}>
              <span className="font-medium">{c.name ?? 'Unnamed'}</span> — {c.email ?? 'n/a'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
