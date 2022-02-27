import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { getPost, Post } from '~/post';

export const loader = async ({ params }: any) => {
  invariant(params.slug, 'expected params.slug');
  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData<Post>();
  return (
    <div>
      <h1>{post.title}</h1>
      <section>
        <ul>
          <li>{post.date}</li>
        </ul>
      </section>
      <div>content</div>
    </div>
  );
}
