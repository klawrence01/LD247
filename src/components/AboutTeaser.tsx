import React from 'react';

const AboutTeaser = () => {
  return (
    <section className="bg-orange-50 p-6 rounded-xl shadow-md text-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">What Is Local Deals 24/7?</h2>
      <p className="text-gray-700 text-base sm:text-lg">
        We’re building the fastest, friendliest local marketplace to help small businesses thrive.
        <br />
        Real deals. Real people. Right in your neighborhood.
      </p>
      <a
        href="/about"
        className="inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-orange-600 transition"
      >
        Learn More
      </a>
    </section>
  );
};

export default AboutTeaser;
