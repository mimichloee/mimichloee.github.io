import path from 'path';
import fs from 'fs/promises';
import { bundleMDX } from 'mdx-bundler';
import { db } from './db.server';

export type PostItem = {
  slug: string;
  code: string;
  title: string;
  date: Date;
};

export type PostMarkdownAttributes = {
  title: string;
};

export async function getPost(slug: string) {
  const post = await db.post.findUnique({
    where: {
      slug,
    },
  });

  if (!post) {
    // TODO: error 처리 (try-catch적용, error처리 둘다 해야함)
    return;
  }

  const { default: remarkSlug } = await import('remark-slug');
  const { default: remarkPrism } = await import('remark-prism');

  const { code } = await bundleMDX({
    source: post.content,
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
    code,
    title: post.title,
    date: post.date,
  } as PostItem;
}
