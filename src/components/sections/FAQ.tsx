import { Container, Section, SectionHeader } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqLd } from '@/lib/jsonld';
import type { Tone } from '@/components/ui/Section';

export type FaqItem = { q: string; a: string };

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-hair border-y border-hair">
      {items.map((f, i) => (
        <details key={f.q} className="group" {...(i === 0 ? {} : {})}>
          <summary className="flex items-start justify-between gap-6 py-5 text-left font-display text-[1.08rem] font-semibold leading-snug text-fg transition hover:text-accent">
            <span>{f.q}</span>
            <Icon name="chevronDown" size={20} className="chev mt-1 shrink-0 text-accent transition-transform duration-200" />
          </summary>
          <div className="prose-e pb-6 pr-10">
            {f.a.split('\n\n').map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

export function FAQ({ items, title = 'Perguntas frequentes', eyebrow = 'Dúvidas comuns', tone = 'paper', id = 'faq' }: { items: FaqItem[]; title?: string; eyebrow?: string; tone?: Tone; id?: string }) {
  return (
    <Section tone={tone} labelledBy={`${id}-t`} id={id}>
      <JsonLd data={faqLd(items)} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow={eyebrow} title={title} id={`${id}-t`} lead="Não encontrou a sua? Chame o time no WhatsApp e responderemos." />
          <div data-reveal><FaqList items={items} /></div>
        </div>
      </Container>
    </Section>
  );
}
