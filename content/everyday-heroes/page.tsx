import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export const metadata = {
  title: "Everyday Heroes",
  description: "Meet the local business owners making a difference in their cities.",
};

export default function EverydayHeroesPage() {
  const dir = path.join(process.cwd(), "content/everyday-heroes");
  const files = fs.readdirSync(dir);
  const posts = files.map((filename) => {
    const markdown = fs.readFileSync(path.join(dir, filename), "utf-8");
    const { data } = matter(markdown);
    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      description: data.description,
      date: data.date,
    };
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Everyday Heroes</h1>
      <p className="text-lg text-gray-700 mb-10">
        These are the barbers, shop owners, nail techs, gym owners, late-night food spots,
        and weekend hustlers who keep this city running. We call them Everyday Heroes for a reason —
        they’re not chains, they’re people.
      </p>

      {posts.length === 0 ? (
        <p>No stories yet. Come back soon!</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-gray-300 pb-4">
              <Link
                href={`/everyday-heroes/${post.slug}`}
                className="text-2xl font-semibold text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-gray-600">{post.description}</p>
              <p className="text-sm text-gray-400 mt-1">{post.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
