import fs from 'fs';
import path from 'path';

function readLocalConfig() {
  try {
    const p = path.join(process.cwd(), 'public', 'config.json');
    const txt = fs.readFileSync(p, 'utf8');
    return JSON.parse(txt);
  } catch (e) {
    return {};
  }
}

function ensureDistDir() {
  const dist = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });
  return dist;
}

function normalizeField(item, key) {
  return item?.[key] ?? item?.attributes?.[key] ?? null; // Strapi v5 prefer, v4 fallback
}

async function fetchAllBlogPosts(baseUrl, siteSlug, token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const pageSize = 100;
  let page = 1;
  const posts = [];
  while (true) {
    const q = `/api/blog-posts?pagination[pageSize]=${pageSize}&pagination[page]=${page}&filters[site][slug][$eq]=${encodeURIComponent(siteSlug)}&sort=updatedAt:desc`;
    const url = joinUrl(baseUrl, q);
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`);
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    for (const item of data) {
      const slug = String(normalizeField(item, 'slug') ?? '');
      const lastmod = normalizeField(item, 'updatedAt') || normalizeField(item, 'publishedAt') || normalizeField(item, 'createdAt') || null;
      if (slug) posts.push({ slug, lastmod });
    }
    const meta = json?.meta?.pagination;
    if (meta && meta.pageCount && page >= meta.pageCount) break;
    if (!meta && data.length < pageSize) break;
    page += 1;
  }
  return posts;
}

function joinUrl(base, pathPart) {
  if (base.endsWith('/') && pathPart.startsWith('/')) return `${base.slice(0, -1)}${pathPart}`;
  if (!base.endsWith('/') && !pathPart.startsWith('/')) return `${base}/${pathPart}`;
  return `${base}${pathPart}`;
}

function absoluteUrl(siteUrl, routePath) {
  // siteUrl like 'https://example.com'
  return new URL(routePath, siteUrl).toString();
}

function buildSitemapXml(urls) {
  const header = '<?xml version="1.0" encoding="UTF-8"?>';
  const ns = 'http://www.sitemaps.org/schemas/sitemap/0.9';
  const body = urls
    .map((u) => {
      const lines = [
        `  <url>`,
        `    <loc>${u.loc}</loc>`,
        u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : null,
        `    <changefreq>${u.changefreq || 'weekly'}</changefreq>`,
        `    <priority>${u.priority ?? 0.5}</priority>`,
        `  </url>`,
      ].filter(Boolean);
      return lines.join('\n');
    })
    .join('\n');
  return `${header}\n<urlset xmlns="${ns}">\n${body}\n</urlset>\n`;
}

async function main() {
  const SITE_URL = process.env.SITE_URL || '';
  let CMS_BASE_URL = process.env.CMS_BASE_URL || '';
  let CMS_SITE_ID = process.env.CMS_SITE_ID || '';
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

  if (!SITE_URL) {
    throw new Error('SITE_URL env is required to generate absolute links');
  }

  // Fallback to local config.json if CMS envs missing
  if (!CMS_BASE_URL || !CMS_SITE_ID) {
    const localCfg = readLocalConfig();
    CMS_BASE_URL = CMS_BASE_URL || localCfg?.apiEndpoints?.cmsBaseUrl || '';
    CMS_SITE_ID = CMS_SITE_ID || localCfg?.apiEndpoints?.cmsSiteId || '';
  }

  const distDir = ensureDistDir();
  const nowIso = new Date().toISOString();

  const urls = [];
  // Static routes present in router
  urls.push({ loc: absoluteUrl(SITE_URL, '/'), lastmod: nowIso, changefreq: 'weekly', priority: 0.8 });
  urls.push({ loc: absoluteUrl(SITE_URL, '/blog'), lastmod: nowIso, changefreq: 'daily', priority: 0.7 });

  if (CMS_BASE_URL && CMS_SITE_ID) {
    try {
      const posts = await fetchAllBlogPosts(CMS_BASE_URL, CMS_SITE_ID, STRAPI_API_TOKEN);
      for (const p of posts) {
        urls.push({
          loc: absoluteUrl(SITE_URL, `/blog/${p.slug}`),
          lastmod: p.lastmod || nowIso,
          changefreq: 'weekly',
          priority: 0.6,
        });
      }
    } catch (e) {
      console.warn('[sitemap] Failed to fetch Strapi posts:', e?.message || e);
    }
  } else {
    console.warn('[sitemap] CMS_BASE_URL or CMS_SITE_ID missing; generating static-only sitemap');
  }

  const xml = buildSitemapXml(urls);
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);

  const robotsTxt = `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl(SITE_URL, '/sitemap.xml')}\n`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt);

  console.log(`[sitemap] Wrote ${urls.length} URLs to dist/sitemap.xml and robots.txt for`, SITE_URL);
}

main().catch((err) => {
  console.error('[sitemap] Generation failed:', err);
  process.exit(1);
});