import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  slug: string;
  published?: boolean;
};

export async function getPostMetadata(folder: string): Promise<PostMeta[]> {
  const dir = path.join(process.cwd(), "posts", folder);
  const files = fs.readdirSync(dir);
  const today = new Date();

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const content = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(content);
      return {
        title: data.title,
        description: data.description,
        date: data.date,
        published: data.published,
        slug: file.replace(/\.mdx$/, ""),
      } as PostMeta;
    })
    .filter((post) => {
      const postDate = new Date(post.date);
      return post.published !== false && postDate <= today;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
