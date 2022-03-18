import { bundleMDX } from 'mdx-bundler';
import configureRehypePrettyCode from './rehype-pretty-code';

export async function bundleMDXPost(content: string) {
  const { default: remarkSlug } = await import('remark-slug');

  const configuredRehypePrettyCode = await configureRehypePrettyCode();

  const { code, errors } = await bundleMDX({
    source: content,
    xdmOptions: (options) => {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkSlug];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        configuredRehypePrettyCode,
      ];
      return options;
    },
  });

  if (errors.length > 0) {
    throw new Error('mdx bundler error!');
  }

  return code;
}
