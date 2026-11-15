import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Section';
import { Picture } from '@/components/ui/Picture';

type Props = {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead: ReactNode;
  actions?: ReactNode;
  image?: { name: string; alt: string; position?: string; ratio?: 'portrait' | 'landscape' };
  /** Foto de fundo sutil (em vez da coluna de imagem) */
  bg?: { name: string; position?: string };
  chips?: string[];
  children?: ReactNode;
};

/** Hero de páginas internas. Sempre escuro: o header é transparente sobre ele. */
export function PageHero({ crumbs, eyebrow, title, lead, actions, image, bg, chips, children }: Props) {
  return (
    <section data-tone="dark" className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+40px)] md:pb-24 md:pt-[calc(var(--header-h)+64px)]">
      {bg && (
        <div className="absolute inset-0" aria-hidden="true">
          <Picture name={bg.name} alt="" priority fill position={bg.position} sizes="100vw" className="opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/50" />
        </div>
      )}
      {!bg && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="bg-dots absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent_85%)]" />
          <div className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-brand-500/15 blur-[120px]" />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" aria-hidden="true" />
      <Container className="relative">
        {crumbs && <div className="mb-8"><Breadcrumbs items={crumbs} /></div>}
        <div className={image ? 'grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]' : 'max-w-4xl'}>
          <div>
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            <h1 className="text-h1 text-white">{title}</h1>
            <p className="mt-6 max-w-2xl text-lead text-muted-dark">{lead}</p>
            {actions && <div className="mt-9 flex flex-wrap items-center gap-3">{actions}</div>}
            {chips && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <li key={c} className="rounded-full border border-white/15 px-3.5 py-1.5 text-[0.82rem] text-white/80">{c}</li>
                ))}
              </ul>
            )}
            {children}
          </div>
          {image && (
            <div className={`relative overflow-hidden rounded-3xl border border-white/10 shadow-lift ${image.ratio === 'landscape' ? 'aspect-[4/3]' : 'aspect-[4/5] max-h-[560px] lg:ml-auto lg:w-[88%]'}`}>
              <Picture name={image.name} alt={image.alt} priority fill position={image.position} sizes="(min-width:1024px) 480px, 100vw" />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
