import { bundleMDX } from 'mdx-bundler';

export async function bundleMDXPost(content: string) {
  const { default: remarkPrism } = await import('remark-prism');
  const { default: remarkSlug } = await import('remark-slug');

  const { code, errors } = await bundleMDX({
    source: content,
    xdmOptions: (options) => {
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        remarkPrism as any,
        remarkSlug,
      ];
      options.rehypePlugins = [...(options?.rehypePlugins ?? [])];
      return options;
    },
  });

  if (errors.length > 0) {
    throw new Error('mdx bundler error!');
  }

  return code;
}
