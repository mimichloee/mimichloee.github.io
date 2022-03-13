import parseFrontMatter from 'front-matter';
import fs from 'fs/promises';
import path from 'path';

export type PostListItem = {
  slug: string;
  title: string;
};

type PostMarkdownAttributes = {
  title: string;
  date: string;
};

export async function getPosts(): Promise<PostListItem[]> {
  const pathToPosts =
    process.env.NODE_ENV === 'production'
      ? path.join(__dirname, '../..', 'posts')
      : path.join(__dirname, '..', 'posts');

  console.log('postsPath', __dirname, pathToPosts);

  const allPostFiles = await fs.readdir(pathToPosts);

  const posts = await Promise.all(
    allPostFiles.map(async (filename) => {
      const file = await fs.readFile(path.join(pathToPosts, filename));
      const { attributes } = parseFrontMatter<PostMarkdownAttributes>(
        file.toString(),
      );

      return {
        slug: filename.replace(/\.mdx$/, ''),
        title: attributes.title,
      };
    }),
  );

  return posts;
}
