export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Vendors</p>
          <p className="text-xl font-bold">128</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Sales Reps</p>
          <p className="text-xl font-bold">15</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Active Deals</p>
          <p className="text-xl font-bold">73</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Pending Approvals</p>
          <p className="text-xl font-bold">4</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href="/admin/vendors" className="bg-orange-100 hover:bg-orange-200 p-4 rounded-xl shadow text-center">
          Manage Vendors
        </a>
        <a href="/admin/sales-reps" className="bg-orange-100 hover:bg-orange-200 p-4 rounded-xl shadow text-center">
          Manage Sales Reps
        </a>
        <a href="/admin/pricing" className="bg-orange-100 hover:bg-orange-200 p-4 rounded-xl shadow text-center">
          Pricing Control
        </a>
        <a href="/admin/training" className="bg-orange-100 hover:bg-orange-200 p-4 rounded-xl shadow text-center">
          Training Center
        </a>
        <a href="/admin/coupons" className="bg-orange-100 hover:bg-orange-200 p-4 rounded-xl shadow text-center">
          Coupon Slots
        </a>
        <a href="/admin/support" className="bg-orange-100 hover:bg-orange-200 p-4 rounded-xl shadow text-center">
          Support / Messages
        </a>
      </div>
    </div>
  );
}
