import { bundleMDX } from 'mdx-bundler';

export async function bundleMDXPost(content: string) {
  const { default: remarkSlug } = await import('remark-slug');
  const { default: remarkPrism } = await import('remark-prism');

  const { code, errors } = await bundleMDX({
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

  if (errors.length > 0) {
    throw new Error('mdx bundler error!');
  }

  return code;
}
