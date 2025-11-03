import React from 'react';

const HowItWorks = () => {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-orange-600 mb-6 text-center">How It Works</h1>
      <ol className="space-y-6 text-lg text-gray-700">
        <li>
          <strong className="text-orange-600">1. Browse Local Deals:</strong> 
          &nbsp;Use our platform to discover exclusive offers from small businesses in your area. No fees. No catches.
        </li>
        <li>
          <strong className="text-orange-600">2. Save & Show:</strong> 
          &nbsp;Tap “Save Deal” and it’ll be stored in your account. Just show it at the business when you’re ready to redeem.
        </li>
        <li>
          <strong className="text-orange-600">3. Support Local:</strong> 
          &nbsp;Every deal redeemed helps a local business thrive — and that helps your whole community grow stronger.
        </li>
      </ol>
    </main>
  );
};

export default HowItWorks;
