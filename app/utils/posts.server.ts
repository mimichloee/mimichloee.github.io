import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';
import { bundleMDX } from 'mdx-bundler';

export type PostListItem = {
  slug: string;
  title: string;
};

export type PostItem = {
  slug: string;
  frontmatter: Record<string, any>;
  code: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

const __dirname = path.resolve();
console.log('__dirname', __dirname);

function isValidPostAttributes(
  attributes: any,
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

export async function getPosts() {
  const postsPath = path.join(__dirname, 'app', 'posts');
  const dir = await fs.readdir(postsPath);

  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(postsPath, filename));

      const { attributes } = parseFrontMatter<PostListItem>(file.toString());

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
  const postsPath = path.join(__dirname, 'app', 'posts');
  const filePath = path.join(postsPath, slug + '.mdx');

  const { default: remarkSlug } = await import('remark-slug');
  const { default: remarkPrism } = await import('remark-prism');

  const { code, frontmatter } = await bundleMDX({
    file: filePath,
    xdmOptions: (options) => {
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        remarkSlug,
        remarkPrism as any,
      ];
      options.rehypePlugins = [...(options?.rehypePlugins ?? [])];
      return options;
    },
  });

  return {
    slug,
    frontmatter,
    code,
  } as PostItem;
}
