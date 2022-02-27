import { useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import invariant from 'tiny-invariant';
import { getPost, PostItem } from '~/posts.server';
import { getMDXComponent } from 'mdx-bundler/client';
import dark from 'prismjs/themes/prism-twilight.min.css';

export const loader = async ({ params }: any) => {
  invariant(params.slug, 'expected params.slug');
  return getPost(params.slug);
};

export const links = () => {
  return [{ rel: 'stylesheet', href: dark }];
};

export default function PostSlug() {
  const post = useLoaderData<PostItem>();
  const Component = useMemo(() => getMDXComponent(post.code), [post.code]);

  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <section>
        <ul>
          <li>{post.frontmatter.date}</li>
        </ul>
      </section>
      <article>
        <Component />
      </article>
    </div>
  );
}
