import type { Metadata } from 'next';
import pages from '@/data/pages.json';
import { SITE_URL, absoluteUrl, site } from '@/config/site';

type PageMeta = { title: string; description: string; og: { headline: string; kicker: string; bg: string } };
const table = pages as Record<string, PageMeta>;

export const ogSlug = (path: string) => (path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '--'));
export const ogUrl = (path: string) => `${SITE_URL}/og/${ogSlug(path)}.png`;

/** Metadata completa de uma página a partir de src/data/pages.json. */
export function pageMeta(path: string, overrides: Partial<Metadata> = {}): Metadata {
  const m = table[path];
  if (!m) throw new Error(`Página sem metadata em pages.json: ${path}`);
  const url = absoluteUrl(path);
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: { canonical: url },
    robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: site.name,
      title: m.title,
      description: m.description,
      url,
      images: [{ url: ogUrl(path), width: 1200, height: 630, alt: m.og.headline }],
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: [ogUrl(path)] },
    ...overrides,
  };
}

export const allPageKeys = Object.keys(table);
