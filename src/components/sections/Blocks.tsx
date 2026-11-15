import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

/* ---------- Passos numerados ---------- */
export type Step = { title: string; text: ReactNode; tag?: string };

export function Steps({ items, columns = 4, startAt = 1 }: { items: Step[]; columns?: 2 | 3 | 4; startAt?: number }) {
  const grid = columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
  return (
    <ol className={`grid gap-5 ${grid}`}>
      {items.map((s, i) => (
        <li key={s.title} data-reveal style={{ ['--d' as string]: `${i * 70}ms` }} className="card relative flex flex-col p-6">
          <span className="font-display text-sm font-bold tnum text-accent">{String(i + startAt).padStart(2, '0')}</span>
          {s.tag && <span className="absolute right-5 top-5 rounded-full border border-hair px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-wider text-fg-muted">{s.tag}</span>}
          <h3 className="mt-3 text-h3 text-fg">{s.title}</h3>
          <div className="prose-e mt-2 text-[0.97rem] leading-relaxed">{s.text}</div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Grade de recursos ---------- */
export type Feature = { icon: IconName; title: string; text: ReactNode };

export function FeatureGrid({ items, columns = 3 }: { items: Feature[]; columns?: 2 | 3 | 4 }) {
  const grid = columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2';
  return (
    <ul className={`grid gap-5 ${grid}`}>
      {items.map((f, i) => (
        <li key={f.title} data-reveal style={{ ['--d' as string]: `${(i % 3) * 70}ms` }} className="card p-6">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-accent ring-1 ring-inset ring-brand-500/20">
            <Icon name={f.icon} size={22} />
          </span>
          <h3 className="mt-5 font-display text-[1.15rem] font-bold leading-snug text-fg">{f.title}</h3>
          <div className="prose-e mt-2 text-[0.97rem] leading-relaxed">{f.text}</div>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Lista de checagem ---------- */
export function CheckList({ items, className = '' }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((t, i) => (
        <li key={i} className="flex gap-3 text-fg-muted">
          <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-accent"><Icon name="check" size={13} strokeWidth={2.4} /></span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Cartão de preço / modelo ---------- */
export function PriceCard({ label, price, note, items, cta, highlight }: { label: string; price: string; note?: string; items?: string[]; cta?: ReactNode; highlight?: boolean }) {
  return (
    <div className={`flex h-full flex-col rounded-3xl border p-7 ${highlight ? 'border-brand-500/50 bg-card shadow-glow' : 'border-hair bg-card'}`}>
      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-accent">{label}</p>
      <p className="mt-3 font-display text-[2rem] font-extrabold leading-tight tracking-tight text-fg tnum">{price}</p>
      {note && <p className="mt-2 text-sm text-fg-muted">{note}</p>}
      {items && <CheckList items={items} className="mt-6 flex-1 text-[0.95rem]" />}
      {cta && <div className="mt-7">{cta}</div>}
    </div>
  );
}

/* ---------- Faixa de destaque (callout) ---------- */
export function Callout({ icon = 'info', title, children, tone = 'brand' }: { icon?: IconName; title?: string; children: ReactNode; tone?: 'brand' | 'warn' }) {
  return (
    <aside className={`flex gap-4 rounded-2xl border p-5 ${tone === 'warn' ? 'border-amber-400/40 bg-amber-400/10' : 'border-brand-500/30 bg-brand-500/[0.07]'}`}>
      <span className={`mt-0.5 shrink-0 ${tone === 'warn' ? 'text-amber-500' : 'text-accent'}`}><Icon name={icon} size={22} /></span>
      <div className="prose-e text-[0.97rem] leading-relaxed">
        {title && <p className="mb-1 font-display font-bold text-fg">{title}</p>}
        {children}
      </div>
    </aside>
  );
}

/* ---------- Tabela comparativa ---------- */
export function CompareTable({ head, rows, caption }: { head: string[]; rows: (string | ReactNode)[][]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-hair bg-card">
      <table className="w-full min-w-[560px] border-collapse text-left text-[0.95rem]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-hair">
            {head.map((h, i) => (
              <th key={i} scope="col" className={`px-5 py-4 font-display text-sm font-bold ${i === 0 ? 'text-fg-muted' : 'text-fg'}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-hair last:border-0">
              {r.map((c, j) => (j === 0 ? (
                <th key={j} scope="row" className="px-5 py-4 font-medium text-fg-muted">{c}</th>
              ) : (
                <td key={j} className="px-5 py-4 text-fg">{c}</td>
              )))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Links relacionados ---------- */
export type Related = { href: string; title: string; text: string; kicker?: string };

export function RelatedLinks({ items }: { items: Related[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {items.map((r) => (
        <li key={r.href} data-reveal>
          <Link href={r.href} className="card group flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:border-brand-500/60 hover:shadow-card">
            {r.kicker && <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent">{r.kicker}</span>}
            <span className="mt-2 font-display text-lg font-bold text-fg">{r.title}</span>
            <span className="mt-2 flex-1 text-[0.95rem] text-fg-muted">{r.text}</span>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">Ver mais <Icon name="arrowRight" size={16} className="transition group-hover:translate-x-0.5" /></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Duas colunas: texto + mídia ---------- */
export function Split({ media, children, reverse, align = 'center' }: { media: ReactNode; children: ReactNode; reverse?: boolean; align?: 'center' | 'start' }) {
  return (
    <div className={`grid gap-12 lg:grid-cols-2 lg:gap-16 ${align === 'center' ? 'items-center' : 'items-start'}`}>
      <div data-reveal className={reverse ? 'lg:order-2' : ''}>{children}</div>
      <div data-reveal className={reverse ? 'lg:order-1' : ''}>{media}</div>
    </div>
  );
}

export function MediaFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`relative overflow-hidden rounded-3xl border border-hair shadow-lift ${className}`}>{children}</div>;
}

export { Button };
