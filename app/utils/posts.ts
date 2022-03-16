import parseFrontMatter from 'front-matter';
import fs from 'fs/promises';
import path from 'path';

export type PostListItem = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

type PostMarkdownAttributes = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export async function getPosts(): Promise<PostListItem[]> {
  const pathToPosts = `${__dirname}/../../posts`;
  const allPostFiles = await fs.readdir(pathToPosts, {
    withFileTypes: true,
  });

  const posts = await Promise.all(
    allPostFiles.map(async (dirnet) => {
      const file = await fs.readFile(path.join(pathToPosts, dirnet.name));
      const { attributes } = parseFrontMatter<PostMarkdownAttributes>(
        file.toString(),
      );

      return {
        slug: dirnet.name.replace(/\.mdx$/, ''),
        title: attributes.title,
        date: attributes.date,
        excerpt: attributes.excerpt,
      } as PostListItem;
    }),
  );

  return posts;
}
