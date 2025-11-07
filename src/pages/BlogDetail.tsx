import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchBlogBySlug, BlogPostDetail } from '../lib/strapi';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    if (slug) {
      fetchBlogBySlug(slug)
        .then((data) => { if (mounted) setPost(data); })
        .catch((e: any) => { if (mounted) setError(e?.message || 'Error loading blog'); })
        .finally(() => { if (mounted) setLoading(false); });
    } else {
      setLoading(false);
    }
    return () => { mounted = false; };
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!post) return <p>Not found</p>;

  const formatDate = (value: string | null): string => {
    if (!value) return '';
    const iso = String(value);
    const datePart = iso.includes('T') ? iso.split('T')[0] : iso.slice(0, 10);
    return datePart;
  };

  return (
    <article className="prose max-w-none">
      <div className="mb-4">
        <Link className="text-sm text-blue-600 hover:underline" to="/blog">← Back to Blog</Link>
      </div>
      <h1 className="mb-2">{post.title}</h1>
      <small className="text-gray-500">{formatDate(post.createdAt)}</small>
      <div className="mt-4 text-left">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.contentMarkdown}</ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogDetail;