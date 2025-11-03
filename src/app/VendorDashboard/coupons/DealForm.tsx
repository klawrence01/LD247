"use client";

import { useState } from "react";

export default function DealForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [limitPerPerson, setLimitPerPerson] = useState("");
  const [dealType, setDealType] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      description,
      startDate,
      endDate,
      limitPerPerson,
      dealType,
      address,
      phone,
    });
    alert("Deal submitted! (This is placeholder functionality)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md bg-white shadow">
      <h2 className="text-xl font-bold">Create a New Deal</h2>

      <input
        type="text"
        placeholder="Deal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Deal Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <input
        type="number"
        placeholder="Limit Per Person"
        value={limitPerPerson}
        onChange={(e) => setLimitPerPerson(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Deal Type (e.g., % Off)"
        value={dealType}
        onChange={(e) => setDealType(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
        Save Deal
      </button>
    </form>
  );
}
