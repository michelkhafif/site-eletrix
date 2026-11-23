import type { ReactNode } from 'react';

export type Tone = 'dark' | 'ink' | 'light' | 'paper' | 'brand';

export function Section({
  tone = 'light', id, className = '', children, labelledBy, tight,
}: { tone?: Tone; id?: string; className?: string; children: ReactNode; labelledBy?: string; tight?: boolean }) {
  return (
    <section id={id} data-tone={tone} aria-labelledby={labelledBy} className={`relative ${tight ? 'py-14 md:py-20' : 'section-y'} ${className}`}>
      {children}
    </section>
  );
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`container-x ${className}`}>{children}</div>;
}

export function SectionHeader({
  eyebrow, title, lead, align = 'left', id, as: Tag = 'h2', className = '',
}: { eyebrow?: string; title: ReactNode; lead?: ReactNode; align?: 'left' | 'center'; id?: string; as?: 'h1' | 'h2'; className?: string }) {
  return (
    <header data-reveal className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow mb-3 ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <Tag id={id} className={Tag === 'h1' ? 'text-h1' : 'text-h2'}>{title}</Tag>
      {lead && <p className="mt-5 text-lead text-fg-muted">{lead}</p>}
    </header>
  );
}
