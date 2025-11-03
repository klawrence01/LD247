import React from 'react';

const categories = ['Food', 'Beauty', 'Health', 'Auto', 'Fitness', 'Retail'];

const CategoryFilter = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-6">
      {categories.map((category) => (
        <button
          key={category}
          className="px-4 py-2 rounded-full border border-gray-300 hover:bg-orange-100 text-sm"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
