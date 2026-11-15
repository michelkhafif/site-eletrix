import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbLd } from '@/lib/jsonld';

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items, tone = 'dark' }: { items: Crumb[]; tone?: 'dark' | 'light' }) {
  const all = [{ name: 'Início', href: '/' }, ...items];
  return (
    <nav aria-label="Você está em" className={`text-sm ${tone === 'dark' ? 'text-muted-dark' : 'text-muted'}`}>
      <JsonLd data={breadcrumbLd(all)} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="opacity-50">
                /
              </span>
            )}
            {i === all.length - 1 ? (
              <span aria-current="page" className={tone === 'dark' ? 'text-white' : 'text-ink-900'}>
                {c.name}
              </span>
            ) : (
              <Link href={c.href} className="underline-offset-4 hover:underline">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
