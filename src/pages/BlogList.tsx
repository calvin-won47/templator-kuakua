import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogPosts, BlogPostListItem } from '../lib/strapi';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    fetchBlogPosts()
      .then((data) => { if (mounted) setPosts(data); })
      .catch((e: any) => { if (mounted) setError(e?.message || 'Error loading posts'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const formatDate = (value: string | null): string => {
    if (!value) return '';
    const iso = String(value);
    const datePart = iso.includes('T') ? iso.split('T')[0] : iso.slice(0, 10);
    return datePart;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="border border-gray-200 rounded-md p-4">
            {post.coverImageUrl && (
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-auto rounded mb-2"
              />
            )}
            <h2 className="text-xl font-semibold mb-1">
              <Link className="hover:underline" to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <small className="text-gray-500">{formatDate(post.createdAt)}</small>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;