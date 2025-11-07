const DEFAULT_API_URL = 'https://2amcreations.com';
const DEFAULT_SITE_SLUG = 'xmyxyswkj';

function getBaseUrl(): string {
  const cfg = (typeof window !== 'undefined' && (window as any).APP_CONFIG) || {};
  return cfg.apiEndpoints?.cmsBaseUrl || DEFAULT_API_URL;
}

function getSiteSlug(): string {
  const cfg = (typeof window !== 'undefined' && (window as any).APP_CONFIG) || {};
  return cfg.apiEndpoints?.cmsSiteId || DEFAULT_SITE_SLUG;
}

export function buildUrl(path: string): string {
  const base = getBaseUrl();
  if (base.endsWith('/') && path.startsWith('/')) return `${base.slice(0, -1)}${path}`;
  if (!base.endsWith('/') && !path.startsWith('/')) return `${base}/${path}`;
  return `${base}${path}`;
}

function normalizeImage(media: any): string | null {
  if (!media) return null;
  if (media.url) return buildUrl(media.url); // Strapi v5 flattened media
  const url = media?.data?.attributes?.url; // Strapi v4 nested media
  return url ? buildUrl(url) : null;
}

function normalizeField(item: any, key: string): any {
  return item?.[key] ?? item?.attributes?.[key] ?? null; // prefer v5, fallback v4
}

export type BlogPostListItem = {
  id: number;
  slug: string;
  title: string;
  createdAt: string | null;
  coverImageUrl: string | null;
  excerpt: string | null;
};

export async function fetchBlogPosts(): Promise<BlogPostListItem[]> {
  const site = getSiteSlug();
  const query = `/api/blog-posts?populate=coverImage&filters[site][slug][$eq]=${site}&sort=createdAt:desc`;
  const res = await fetch(buildUrl(query));
  if (!res.ok) throw new Error('Failed to fetch blog posts');
  const json = await res.json();
  const arr = json.data || [];
  return arr.map((item: any) => ({
    id: item.id,
    slug: String(normalizeField(item, 'slug') ?? ''),
    title: String(normalizeField(item, 'title') ?? ''),
    createdAt: normalizeField(item, 'createdAt'),
    coverImageUrl: normalizeImage(normalizeField(item, 'coverImage')),
    excerpt: normalizeField(item, 'excerpt'),
  }));
}

export type BlogPostDetail = {
  id: number;
  slug: string;
  title: string;
  createdAt: string | null;
  contentMarkdown: string;
  coverImageUrl: string | null;
};

export async function fetchBlogBySlug(slug: string): Promise<BlogPostDetail | null> {
  const site = getSiteSlug();
  const query = `/api/blog-posts?populate=*&filters[slug][$eq]=${slug}&filters[site][slug][$eq]=${site}`;
  const res = await fetch(buildUrl(query));
  if (!res.ok) throw new Error('Failed to fetch blog detail');
  const json = await res.json();
  const item = json.data?.[0];
  if (!item) return null;
  return {
    id: item.id,
    slug: String(normalizeField(item, 'slug') ?? ''),
    title: String(normalizeField(item, 'title') ?? ''),
    createdAt: normalizeField(item, 'publishedAt') || normalizeField(item, 'createdAt'),
    contentMarkdown: String(normalizeField(item, 'contentMarkdown') ?? ''),
    coverImageUrl: normalizeImage(normalizeField(item, 'coverImage')),
  };
}