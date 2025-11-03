"use client";

import React, { useState } from "react";

interface DealFormProps {
  onSubmit?: (formData: DealFormData) => void;
}

interface DealFormData {
  title: string;
  description: string;
  price: string;
  startDate: string;
  endDate: string;
  limitPerPerson: string;
  dealType: string;
  address: string;
  phone: string;
}

export default function DealForm({ onSubmit }: DealFormProps) {
  const [formData, setFormData] = useState<DealFormData>({
    title: "",
    description: "",
    price: "",
    startDate: "",
    endDate: "",
    limitPerPerson: "",
    dealType: "",
    address: "",
    phone: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    console.log("Deal submitted:", formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <div>
        <label className="block font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Price</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
      </div>

      <div>
        <label className="block font-semibold">Limit Per Person</label>
        <input
          type="number"
          name="limitPerPerson"
          value={formData.limitPerPerson}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Deal Type</label>
        <select
          name="dealType"
          value={formData.dealType}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Type</option>
          <option value="percentage">Percentage Off</option>
          <option value="bogo">Buy One Get One</option>
          <option value="fixed">Fixed Price</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Save Deal
      </button>
    </form>
  );
}
