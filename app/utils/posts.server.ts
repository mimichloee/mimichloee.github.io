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

const mdxPath =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '../../posts')
    : path.join(__dirname, '../posts');

console.log('__dirname', __dirname, mdxPath);

function isValidPostAttributes(
  attributes: any,
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

export async function getPosts() {
  const postsPath = await fs.readdir(mdxPath, {
    withFileTypes: true,
  });

  return Promise.all(
    postsPath.map(async (dirnet) => {
      const file = await fs.readFile(path.join(mdxPath, dirnet.name));

      const { attributes } = parseFrontMatter<PostListItem>(file.toString());

      invariant(
        isValidPostAttributes(attributes),
        `${dirnet.name} has bad meta data!`,
      );

      return {
        slug: dirnet.name.replace(/\.mdx$/, ''),
        title: attributes.title,
      };
    }),
  );
}

export async function getPost(slug: string) {
  const filePath = path.join(mdxPath, slug + '.mdx');

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
