import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/everyday-heroes");
  const files = fs.readdirSync(dir);
  return files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

export default function HeroPostPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "content/everyday-heroes", `${params.slug}.md`);
  const markdown = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(markdown);
  const html = marked(content);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{data.date}</p>
      <article
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
