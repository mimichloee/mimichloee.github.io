import { Link, useLoaderData } from 'remix';
import { getPosts, Post } from '~/post';

export const loader = async () => {
  return getPosts();
};

function Posts() {
  const posts = useLoaderData<Post[]>();

  return (
    <div className="posts">
      <h1>chloe's Posts</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
