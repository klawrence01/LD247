'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ApprovalsPage() {
  const supabase = createClient();
  const [vendorList, setVendorList] = useState([]);

  useEffect(() => {
    async function fetchPendingVendors() {
      const { data, error } = await supabase
        .from('vendor') // <- table name must match Supabase
        .select('*')
        .eq('status', 'pending');

      console.log('🔍 Data from Supabase:', data);
      console.log('⚠️ Error:', error);

      if (error) {
        console.error('Error fetching vendor:', error.message);
      } else {
        setVendorList(data);
      }
    }

    fetchPendingVendors();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Vendor Approvals</h1>
      {vendorList.length === 0 ? (
        <p>No pending vendors found.</p>
      ) : (
        <ul className="space-y-4">
          {vendorList.map((vendor) => (
            <li
              key={vendor.id}
              className="border p-4 rounded shadow bg-white dark:bg-gray-800"
            >
              <div><strong>Name:</strong> {vendor.name}</div>
              <div><strong>Status:</strong> {vendor.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
