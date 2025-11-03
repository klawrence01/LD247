'use client';

import React from 'react';
import Link from 'next/link';

type BlogCardProps = {
  post: {
    title: string;
    summary: string;
    slug: string;
  };
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link href={`/blogs/everyday-heroes/${post.slug}`}>
      <div className="border p-5 rounded-xl shadow-sm bg-white mb-6 transition-transform transform hover:scale-[1.02] hover:shadow-md cursor-pointer">
        <h2 className="text-xl font-semibold text-black mb-2">{post.title}</h2>
        <p className="text-gray-700 text-sm">{post.summary}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
