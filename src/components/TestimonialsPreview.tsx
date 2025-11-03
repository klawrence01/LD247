import React from 'react';

const testimonials = [
  {
    name: "Tina from The Nail Spot",
    quote: "Local Deals 24/7 brought in more new clients in one week than my old ads did all month!"
  },
  {
    name: "Mike from Grill King",
    quote: "Finally — a platform built for small businesses, not big corporations. I love it!"
  },
  {
    name: "Jasmine, local shopper",
    quote: "I saved money and discovered amazing places right in my neighborhood. I'm hooked."
  }
];

const TestimonialsPreview = () => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">What People Are Saying</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t, index) => (
          <div key={index} className="bg-orange-50 p-4 rounded-lg shadow-sm">
            <p className="italic text-gray-700">"{t.quote}"</p>
            <p className="mt-2 text-sm font-semibold text-gray-900">– {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsPreview;
