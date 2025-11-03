"use client";

import React, { useState } from 'react';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const [term, setTerm] = useState('');

  const handleSearch = () => {
    alert(`Searching for "${term}" in ${city}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-4 bg-white rounded-xl shadow-md">
      <input
        type="text"
        placeholder="Enter your city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Search deals or businesses"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-md"
      />
      <button
        onClick={handleSearch}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
