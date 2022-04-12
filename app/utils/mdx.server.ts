import { bundleMDX } from 'mdx-bundler';

export async function bundleMDXPost(content: string) {
  const { default: rehypePrism } = await import('rehype-prism-plus');
  const { default: remarkSlug } = await import('remark-slug');

  const { code, errors } = await bundleMDX({
    source: content,
    mdxOptions: (options) => {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkSlug];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        [rehypePrism, { ignoreMissing: true, showLineNumbers: true }],
      ];
      return options;
    },
  });

  if (errors.length > 0) {
    throw new Error('mdx bundler error!');
  }

  return code;
}
