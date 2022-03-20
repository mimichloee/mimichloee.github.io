import { bundleMDX } from 'mdx-bundler';

export async function bundleMDXPost(content: string) {
  const { default: rehypeHighlight } = await import('rehype-highlight');
  const { default: remarkSlug } = await import('remark-slug');

  const { code, errors } = await bundleMDX({
    source: content,
    xdmOptions: (options) => {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkSlug];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeHighlight,
      ];
      return options;
    },
  });

  if (errors.length > 0) {
    throw new Error('mdx bundler error!');
  }

  return code;
}
