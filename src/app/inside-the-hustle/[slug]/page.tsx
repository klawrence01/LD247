// src/app/inside-the-hustle/[slug]/page.tsx
import { notFound } from "next/navigation";

type HustlePost = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  content?: string;
};

const MOCK_POSTS: HustlePost[] = [
  {
    slug: "welcome-to-the-hustle",
    title: "Welcome to the Hustle",
    description: "Placeholder post so the dynamic route always builds.",
    date: "2025-01-01",
    content:
      "This is placeholder content for Inside the Hustle. Swap in Supabase later.",
  },
];

export default async function InsideTheHustlePostPage({
  params,
}: {
  // 👇 this matches what .next/types is expecting right now
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = MOCK_POSTS.find((p) => p.slug === slug);

  if (!post) {
    // you can use notFound() if you want
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-2">Post not found</h1>
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t find a post with slug: {slug}
        </p>
      </div>
    );
    // or: notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        {post.description ? (
          <p className="text-muted-foreground">{post.description}</p>
        ) : null}
        {post.date ? (
          <p className="text-xs text-muted-foreground">
            {new Date(post.date).toLocaleDateString()}
          </p>
        ) : null}
      </header>

      <article className="prose prose-slate max-w-none">
        <p>{post.content ?? "Placeholder content. Hook DB later."}</p>
      </article>

      <div className="mt-6">
        <a
          href="/inside-the-hustle"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          ← Back to Inside the Hustle
        </a>
      </div>
    </div>
  );
}
