import { useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import invariant from 'tiny-invariant';
import { getPost, PostItem } from '~/utils/posts.server';
import { getMDXComponent } from 'mdx-bundler/client';
import { LinksFunction } from 'remix';

import dark from 'prism-themes/themes/prism-material-oceanic.min.css';
import postStyle from '~/styles/post.css';

export const loader = async ({ params }: any) => {
  invariant(params.slug, 'expected params.slug');
  return getPost(params.slug);
};

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: dark },
    { rel: 'stylesheet', href: postStyle },
  ];
};

export default function PostSlug() {
  const post = useLoaderData<PostItem>();
  const Component = useMemo(() => getMDXComponent(post.code), [post.code]);

  return (
    <div className="p-8 relative max-w-5xl m-auto">
      <section className="pt-10 pb-20 flex flex-col">
        <h1 className="pb-4 font-bold text-3xl md:text-4xl text-black dark:text-white">
          {post.frontmatter.title}
        </h1>
        <ul>
          <li className="font-small text-gray-400 dark:text-blueGray-500">
            {post.frontmatter.date}
          </li>
        </ul>
      </section>
      <section>
        <article className="prose max-w-none prose-light dark:prose-dark">
          <Component />
        </article>
      </section>
    </div>
  );
}
