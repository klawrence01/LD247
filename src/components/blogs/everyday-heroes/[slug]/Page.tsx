import { sampleEverydayHeroesPosts } from '@/data/samplePosts';

type Params = {
  slug: string;
};

export default function BlogPost({ params }: { params: Params }) {
  const post = sampleEverydayHeroesPosts.find(p => p.slug === params.slug);

  if (!post) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Post Not Found</h1>
        <p>Sorry, we couldn’t find that story.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 text-lg">{post.summary}</p>

      {/* More content can go here later */}
    </div>
  );
}
