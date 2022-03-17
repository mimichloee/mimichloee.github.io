import { useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import { bundleMDXPost } from '~/utils/mdx.server';
import { getMDXComponent } from 'mdx-bundler/client';
import { LinksFunction, Link } from 'remix';

import dark from 'prism-themes/themes/prism-material-oceanic.min.css';
import postStyle from '~/styles/post.css';
import { db } from '~/utils/db.server';
import { Post } from '@prisma/client';

export const loader = async ({ params }: any) => {
  const post = await db.post.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!post) {
    throw new Error('Post does not exist!');
  }

  const content = await bundleMDXPost(post.content);

  return {
    slug: params.slug,
    title: post.title,
    date: post.date,
    content,
  };
};

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: dark },
    { rel: 'stylesheet', href: postStyle },
  ];
};

export default function PostSlug() {
  const post = useLoaderData<Post>();
  const Component = useMemo(
    () => getMDXComponent(post.content),
    [post.content],
  );

  return (
    <div className="p-8 relative max-w-5xl m-auto">
      <p>
        <Link to="/posts">back to posts</Link>
      </p>
      <section className="pt-10 pb-15 md:pb-16 flex flex-col">
        <h1 className="pb-4 font-bold text-3xl md:text-4xl text-teal-500 dark:text-teal-400">
          {post.title}
        </h1>
        <ul>
          <li className="font-small text-gray-400 dark:text-blueGray-500">
            {post.date}
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
