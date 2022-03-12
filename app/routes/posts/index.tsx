import path from 'path';

function Posts() {
  const postsPath = path.join(__dirname, '../app', 'posts');
  console.log('postPath', postsPath);

  return (
    <div className="posts p-8">
      <ul>
        {/* {posts.map((post: PostListItem) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default Posts;
