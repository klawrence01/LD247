'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AdminSectionPage() {
  const params = useParams();
  const section = params?.section;

  const renderContent = () => {
    switch (section) {
      case 'users':
        return <h1 className="text-2xl font-bold">Users Page</h1>;
      case 'coupons':
        return <h1 className="text-2xl font-bold">Coupons Page</h1>;
      case 'reports':
        return <h1 className="text-2xl font-bold">Reports Page</h1>;
      case 'billing':
        return <h1 className="text-2xl font-bold">Billing Page</h1>;
      case 'pricing-control':
        return <h1 className="text-2xl font-bold">Pricing Control Page</h1>;
      case 'approvals':
        return <ApprovalsManager />;
      case 'settings':
        return <h1 className="text-2xl font-bold">Settings Page</h1>;
      case 'logs':
        return <h1 className="text-2xl font-bold">Logs Page</h1>;
      default:
        return <h1 className="text-2xl font-bold">Admin Dashboard</h1>;
    }
  };

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  );
}

function ApprovalsManager() {
  const supabase = createClient();
  const [pendingItems, setPendingItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('vendors')
      .select('id, name, created_at')
      .eq('status', 'pending');

    if (error) {
      console.error('Error fetching vendors:', error);
    } else {
      const formatted = data.map((item) => ({
        id: item.id,
        type: 'Vendor',
        name: item.name,
        submitted: item.created_at.split('T')[0],
      }));
      setPendingItems(formatted);
    }

    setLoading(false);
  };

  const handleAction = async (id: number, action: 'approve' | 'reject') => {
    const { error } = await supabase
      .from('vendors')
      .update({ status: action === 'approve' ? 'approved' : 'rejected' })
      .eq('id', id);

    if (error) {
      console.error(`Failed to ${action}:`, error);
    } else {
      setPendingItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Approvals Manager</h1>

      {loading ? (
        <p>Loading...</p>
      ) : pendingItems.length === 0 ? (
        <p>No pending vendors right now.</p>
      ) : (
        <table className="w-full border border-gray-200 rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-2">Type</th>
              <th className="p-2">Name</th>
              <th className="p-2">Submitted</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingItems.map((item) => (
              <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="p-2">{item.type}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.submitted}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleAction(item.id, 'approve')}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'reject')}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
