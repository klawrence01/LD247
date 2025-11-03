import React from 'react';

const merchants = ['Glow Spa', 'Muscle Gym', 'Sunset Café'];

const FeaturedMerchants = () => {
  return (
    <section className="px-6 py-6 bg-white">
      <h3 className="text-xl font-semibold mb-4">Featured Merchants</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {merchants.map((name) => (
          <div key={name} className="p-4 border rounded-lg shadow-sm w-40 text-center">
            <div className="h-20 bg-gray-200 mb-2" />
            <p className="text-sm font-medium">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMerchants;
