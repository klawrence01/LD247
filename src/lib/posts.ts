import fs from "fs";
import path from "path";
import matter from "gray-matter";

const rootDir = path.join(process.cwd(), "content");

export async function getPostMetadata(folder: string) {
  const dir = path.join(rootDir, folder);
  const files = fs.readdirSync(dir);
  return files.map((filename) => {
    const file = fs.readFileSync(path.join(dir, filename), "utf8");
    const { data } = matter(file);
    return { ...data, slug: filename.replace(".md", "") };
  });
}

export async function getPostContent(folder: string, slug: string) {
  const filePath = path.join(rootDir, folder, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  return { metadata: data, content };
}
