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

// const __dirname = path.resolve();

function isValidPostAttributes(
  attributes: any,
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

export async function getPosts() {
  const postsPath = await fs.readdir(`${process.cwd()}/posts`, {
    withFileTypes: true,
  });

  return Promise.all(
    postsPath.map(async (dirnet) => {
      const file = await fs.readFile(
        path.join(`${process.cwd()}/posts`, dirnet.name),
      );

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
  const pathToPosts = `${process.cwd()}/posts`;
  const filePath = path.join(pathToPosts, slug + '.mdx');

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
