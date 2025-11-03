'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ApprovalsPage() {
  const supabase = createClient();
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    async function fetchPendingVendors() {
      const { data, error } = await supabase
        .from('vendor') // ✅ correct table name
        .select('*')
        .eq('status', 'pending');

      console.log('Fetched data:', data);
      console.log('Error:', error);

      if (error) {
        console.error('Error fetching vendors:', error.message);
      } else {
        setVendors(data);
      }
    }

    fetchPendingVendors();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Vendor Approvals</h1>
      {vendors.length === 0 ? (
        <p>No pending vendors found.</p>
      ) : (
        <ul className="space-y-4">
          {vendors.map((vendor) => (
            <li
              key={vendor.id}
              className="border p-4 rounded shadow bg-white dark:bg-gray-800"
            >
              <div><strong>Name:</strong> {vendor.name}</div>
              <div><strong>Status:</strong> {vendor.status}</div>
              {/* Add more vendor info here as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
