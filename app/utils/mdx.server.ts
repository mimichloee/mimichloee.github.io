import { bundleMDX } from 'mdx-bundler';

export type PostItem = {
  slug: string;
  code: string;
  title: string;
  date: Date;
};

export type PostMarkdownAttributes = {
  title: string;
};

export async function bundleMDXPost(content: string) {
  const { default: remarkSlug } = await import('remark-slug');
  const { default: remarkPrism } = await import('remark-prism');

  const { code } = await bundleMDX({
    source: content,
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

  return code;
}
