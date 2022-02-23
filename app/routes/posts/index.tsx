import { Link, useLoaderData } from '@remix-run/react';
import { getPosts, Post } from '~/post';

export const loader = async () => {
  return getPosts();
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();

  return (
    <div className="posts">
      <h1>Chloe's Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
