import { Link, useLoaderData } from 'remix';
import { getPosts, PostListItem } from '~/utils/posts';

export const loader = async () => {
  return getPosts();
};

function Posts() {
  const posts = useLoaderData<PostListItem[]>();

  return (
    <div className="p-8 relative max-w-5xl m-auto">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post: PostListItem) => (
          <Link to={post.slug} key={post.slug} className="pt-5 pb-5">
            <dl>
              <dt className="pb-7">
                <div
                  style={{ width: '100%', height: '180px' }}
                  className="bg-gray-300 dark:bg-gray-500 text-gray-300 dark:text-gray-500 rounded-lg"
                >
                  image
                </div>
              </dt>
              <dd>
                <p className="pb-2 text-xs md:text-sm text-gray-400">
                  {post.date} ({post.readTime})
                </p>
                <h3 className="pb-4 text-xl md:text-2xl text-teal-500 dark:text-teal-400 font-medium">
                  {post.title}
                </h3>
                <div className="pb-4 text-sm md:text-base font-normal">
                  {post.excerpt}
                </div>
                <p className="text-xs md:text-sm text-gray-400">read more</p>
              </dd>
            </dl>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Posts;
