import React from 'react';

const DealList = () => {
  const sampleDeals = [
    { title: '50% Off Pizza Night', merchant: 'Tony’s Pizzeria' },
    { title: 'Free Haircut with Color', merchant: 'Style Studio' },
    { title: '$10 Oil Change', merchant: 'QuickFix Auto' },
  ];

  return (
    <div className="px-6 py-4">
      <h3 className="text-xl font-bold mb-4">Today's Featured Deals</h3>
      <ul className="space-y-3">
        {sampleDeals.map((deal, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold">{deal.title}</h4>
            <p className="text-sm text-gray-500">at {deal.merchant}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DealList;
