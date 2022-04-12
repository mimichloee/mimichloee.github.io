import { useLoaderData } from '@remix-run/react';
import { Link, LinksFunction } from 'remix';
import { marked } from 'marked';

import styles from '~/styles/$slug.css';

import { db } from '~/utils/db.server';
import { Post } from '@prisma/client';

export const loader = async ({ params }: any) => {
  const post = await db.post.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!post) {
    throw new Response('Not Found', { status: 404 });
  }

  const content = marked(post.content);
  if (!content) {
    throw new Response('Failed to compile blog post', { status: 500 });
  }

  return {
    slug: params.slug,
    title: post.title,
    date: post.date,
    content,
  };
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles, as: 'style' }];
};

export default function PostSlug() {
  const post = useLoaderData<Post>();

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
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </section>
    </div>
  );
}
