import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';

export type Post = {
  slug: string;
  title: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

const postsPath = path.join(__dirname, '../app', 'posts');

function isValidPostAttributes(
  attributes: any,
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

export async function getPosts() {
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(postsPath, filename));

      const { attributes } = parseFrontMatter<Post>(file.toString());

      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data!`,
      );

      return {
        slug: filename.replace(/\.mdx$/, ''),
        title: attributes.title,
      };
    }),
  );
}

export async function getPost(slug: string) {
  const filePath = path.join(postsPath, slug + '.mdx');
  const file = await fs.readFile(filePath);
  const { attributes } = parseFrontMatter(file.toString());

  invariant(
    isValidPostAttributes(attributes),
    `Post ${filePath} is missing attributes`,
  );

  return {
    slug,
    title: attributes.title,
  };
}
