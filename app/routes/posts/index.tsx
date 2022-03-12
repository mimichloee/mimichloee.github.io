import { Link, useLoaderData } from 'remix';
import { getPosts, PostListItem } from '~/posts.server';

export const loader = async () => {
  return getPosts();
};

function Posts() {
  const posts = useLoaderData<PostListItem[]>();

  return (
    <div className="posts p-8">
      <ul>
        {posts.map((post: PostListItem) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
