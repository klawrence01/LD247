import { getPostContent } from "@/lib/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const { getPostMetadata } = await import("@/lib/posts");
  const posts = await getPostMetadata("everyday-heroes");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function EverydayHeroPost({
  params,
}: {
  params: { slug: string };
}) {
  const { getPostContent } = await import("@/lib/posts");
  const post = await getPostContent("everyday-heroes", params.slug);

  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-900">
      <article>
        <h1 className="text-3xl font-bold mb-4">{post.metadata.title}</h1>
        <p className="text-sm text-gray-600 mb-8">
          {post.metadata.date
            ? new Date(post.metadata.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : ""}
        </p>
        <ReactMarkdown className="prose prose-sm sm:prose-base dark:prose-invert">
          {post.content}
        </ReactMarkdown>
      </article>

      <div className="mt-12">
        <a
          href="/everyday-heroes"
          className="text-blue-500 underline hover:text-orange-500 text-sm"
        >
          ← Back to Everyday Heroes
        </a>
      </div>
    </main>
  );
}
