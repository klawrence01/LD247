// src/components/blogs/everyday-heroes/[slug]/Page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { sampleEverydayHeroesPosts } from "@/data/samplePosts";

type Params = {
  slug: string;
};

export default function EverydayHeroPostPage({ params }: { params: Params }) {
  const post = sampleEverydayHeroesPosts.find(
    (p) => p.slug === params.slug
  );

  if (!post) {
    // keep Next happy
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link
          href="/blogs/everyday-heroes"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Everyday Heroes
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          {post.title}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString()}
        </p>

        <div className="mt-6 rounded-lg bg-card p-6 shadow-sm">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        </div>

        {/* scaffold area for later content */}
        <div className="mt-8 rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          More content (images, quotes, related posts) can go here later.
        </div>
      </div>
    </div>
  );
}
