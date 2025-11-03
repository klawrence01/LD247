import React from 'react';

type Props = {
  city: string;
};

const HeroBanner = ({ city }: Props) => {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-black text-white py-16 px-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        Explore Local Deals in {city}
      </h1>
      <p className="text-lg sm:text-xl">
        Discover exclusive offers from nearby businesses and support your local community.
      </p>
    </section>
  );
};

export default HeroBanner;
