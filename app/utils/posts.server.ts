import path from 'path';
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

export async function getPost(slug: string) {
  const pathToPosts = `${__dirname}/../../posts`;
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
