import parseFrontMatter from 'front-matter';
import fs from 'fs/promises';
import path from 'path';
import readingTime from 'reading-time';

export type PostListItem = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
};

type PostMarkdownAttributes = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export async function getPosts(): Promise<PostListItem[]> {
  const pathToPosts = `${__dirname}/../../posts`;
  const allPostFiles = await fs.readdir(pathToPosts);

  const posts = await Promise.all(
    allPostFiles.map(async (filename) => {
      const file = await fs.readFile(path.join(pathToPosts, filename));
      const { attributes, body } = parseFrontMatter<PostMarkdownAttributes>(
        file.toString(),
      );

      const { text } = readingTime(body);

      return {
        slug: filename.replace(/\.mdx$/, ''),
        title: attributes.title,
        date: attributes.date,
        excerpt: attributes.excerpt,
        readTime: text,
      } as PostListItem;
    }),
  );

  return posts;
}
