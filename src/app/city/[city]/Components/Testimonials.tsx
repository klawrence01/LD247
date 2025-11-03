import React from 'react';

const testimonials = [
  { name: 'Maria R.', quote: 'Best burger deal I’ve ever found. Love this app!' },
  { name: 'Jason K.', quote: 'I saved $45 in one week. Real talk.' },
  { name: 'Denise T.', quote: 'LocalDeals247 helps me shop small and save big!' },
];

const TestimonialSlider = () => {
  return (
    <div className="bg-white py-6 px-6">
      <h3 className="text-xl font-bold mb-4 text-center">What Locals Are Saying</h3>
      <div className="space-y-4">
        {testimonials.map((t, index) => (
          <div key={index} className="border rounded p-4 shadow-sm">
            <p className="italic">"{t.quote}"</p>
            <p className="text-sm mt-2 text-right font-medium">– {t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;


