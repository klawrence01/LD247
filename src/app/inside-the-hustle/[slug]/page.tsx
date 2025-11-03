// app/inside-the-hustle/page.tsx

import Link from "next/link";
import { getPostMetadata } from "@/lib/posts";

export const metadata = {
  title: "Inside the Hustle",
  description: "Sales tips, strategy, and behind-the-scenes wisdom to help you win.",
};

export default async function InsideTheHustle() {
  const posts = await getPostMetadata("inside-the-hustle");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Inside the Hustle</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/inside-the-hustle/${post.slug}`}
            className="border rounded-lg p-5 shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500">{post.date}</p>
            <p className="text-sm mt-2 text-gray-700 line-clamp-3">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
