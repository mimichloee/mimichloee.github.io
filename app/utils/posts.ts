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
  const pathToPosts = path.join(__dirname, '..', 'posts');

  console.log('dirname', __dirname);
  console.log('dirname', path.join(__dirname, '..'));
  console.log('pathToPosts', pathToPosts);

  // const readDir1 = await fs.readdir(path.join(`${__dirname}`, '../../../..'));
  // console.log('readDir1', JSON.stringify(readDir1));

  const readDir2 = await fs.readdir(
    '/var/task/output/server/pages/api/_build/../../posts',
  );
  console.log('readDir2', JSON.stringify(readDir2));

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
