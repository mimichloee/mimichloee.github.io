import path from 'path';
import fs from 'fs/promises';
import { bundleMDX } from 'mdx-bundler';

export type PostItem = {
  slug: string;
  frontmatter: Record<string, any>;
  code: string;
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

  return {
    slug,
    frontmatter,
    code,
  } as PostItem;
}
