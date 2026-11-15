import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta, ogUrl } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { RelatedLinks, Callout, CompareTable, MediaFrame } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { CTABand } from '@/components/sections/CTABand';
import { Container, Section } from '@/components/ui/Section';
import { Picture } from '@/components/ui/Picture';
import { guideBySlug, guides, type Block } from '@/data/guides';
import { wa } from '@/data/whatsapp';

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = guideBySlug(slug);
  return pageMeta(g.href);
}

const fmt = (iso: string) => new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p': return <p key={i} className="mt-4 text-[1.06rem] leading-[1.8] text-fg-muted">{b.text}</p>;
          case 'h3': return <h3 key={i} className="mt-8 text-h3 text-fg">{b.text}</h3>;
          case 'ul': return <ul key={i} className="mt-4 list-disc space-y-2 pl-6 text-[1.04rem] leading-relaxed text-fg-muted marker:text-brand-600">{b.items.map((t) => <li key={t}>{t}</li>)}</ul>;
          case 'ol': return <ol key={i} className="mt-4 list-decimal space-y-2 pl-6 text-[1.04rem] leading-relaxed text-fg-muted marker:font-bold marker:text-brand-700">{b.items.map((t) => <li key={t}>{t}</li>)}</ol>;
          case 'callout': return <div key={i} className="my-6"><Callout title={b.title} tone={b.tone} icon={b.tone === 'warn' ? 'alert' : 'info'}>{b.text}</Callout></div>;
          case 'table': return <div key={i} className="my-6"><CompareTable caption={b.caption} head={b.head} rows={b.rows} /></div>;
        }
      })}
    </>
  );
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  return (
    <>
      <JsonLd data={articleLd({ title: g.title, description: g.summary, path: g.href, datePublished: g.published, dateModified: g.updated, image: ogUrl(g.href) })} />
      <PageHero
        crumbs={[{ name: 'Guias', href: '/guias/' }, { name: g.title, href: g.href }]}
        eyebrow={g.kicker}
        title={g.title}
        lead={g.lead}
      >
        <p className="mt-8 text-sm text-muted-dark">Guia Eletrix · {g.minutes} min de leitura · Atualizado em {fmt(g.updated)}</p>
      </PageHero>

      <Section tone="light" className="!pt-14 md:!pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
              <nav aria-label="Neste guia" className="rounded-2xl border border-hair p-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent">Neste guia</p>
                <ol className="mt-3 space-y-2.5 text-[0.95rem]">
                  {g.sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-fg-muted transition hover:text-accent">{s.title}</a></li>)}
                  <li><a href="#faq" className="text-fg-muted transition hover:text-accent">Perguntas frequentes</a></li>
                </ol>
              </nav>
            </aside>
            <article className="min-w-0 max-w-3xl">
              <MediaFrame className="mb-12 aspect-[16/9]"><Picture name={g.image} alt={g.imageAlt} priority fill sizes="(min-width:1024px) 760px, 100vw" /></MediaFrame>
              {g.sections.map((s) => (
                <section key={s.id} id={s.id} className="mb-14 scroll-mt-28">
                  <h2 className="text-h2">{s.title}</h2>
                  <Blocks blocks={s.blocks} />
                </section>
              ))}
              <p className="rounded-2xl bg-paper p-5 text-sm text-fg-muted">Este guia tem caráter informativo e foi escrito pelo time da Eletrix com base nas normas citadas e nos preços públicos vigentes. Não substitui projeto elétrico, laudo ou orientação jurídica.</p>
            </article>
          </div>
        </Container>
      </Section>

      <FAQ items={g.faq} tone="paper" />
      <Band tone="light" id="continue" eyebrow="Continue por aqui" title="Próximos passos.">
        <RelatedLinks items={g.next.map((n) => ({ ...n, kicker: n.href.startsWith('/guias') ? 'Guia' : 'Solução' }))} />
        <p className="mt-8"><Link href="/guias/" className="font-semibold text-accent underline underline-offset-4">Ver todos os guias</Link></p>
      </Band>
      <CTABand title="Quer aplicar isso no seu prédio?" text="Fale com o time e transforme o guia em projeto, com visita técnica e proposta." whatsappMessage={wa.sindico} bg="river-one-fachada" />
    </>
  );
}
