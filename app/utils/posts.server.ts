import path from 'path';
import fs from 'fs/promises';
import { bundleMDX } from 'mdx-bundler';
import readingTime from 'reading-time';

export type PostListItem = {
  slug: string;
  title: string;
  readTime: string;
};

export type PostItem = {
  slug: string;
  frontmatter: Record<string, any>;
  code: string;
  readTime: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

export async function getPost(slug: string) {
  const pathToPosts = `${__dirname}/../../posts`;
  const source = await fs.readFile(
    path.join(pathToPosts, slug + '.mdx'),
    'utf-8',
  );

  const { default: remarkSlug } = await import('remark-slug');
  const { default: remarkPrism } = await import('remark-prism');

  const { code, frontmatter } = await bundleMDX({
    source,
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

  const { text } = readingTime(code);

  return {
    slug,
    frontmatter,
    code,
    readTime: text,
  } as PostItem;
}
