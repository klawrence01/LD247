"use client";

import React from "react";

type Props = {
  review: {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
    featured?: boolean; // when true → posted on merchant page
  };
  onToggleFeatured: () => void;
};

const star = "★";

export default function ReviewRow({ review, onToggleFeatured }: Props) {
  return (
    <div className="p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <div className="font-medium">{review.name}</div>
          <div className="text-orange-500 text-sm">{star.repeat(review.rating)}</div>
          <div className="text-xs text-gray-500">• {review.date}</div>
          {review.featured && (
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
              Posted on Merchant Page
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-700 leading-snug">{review.comment}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button className="px-3 py-1.5 rounded border hover:bg-gray-100 text-sm">Reply</button>
        <button onClick={onToggleFeatured} className="px-3 py-1.5 rounded bg-orange-500 text-white text-sm">
          {review.featured ? "Remove from Page" : "Post to Merchant Page"}
        </button>
        <button className="px-3 py-1.5 rounded border hover:bg-gray-100 text-sm">Report</button>
      </div>
    </div>
  );
}
