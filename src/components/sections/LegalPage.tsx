import type { ReactNode } from 'react';
import { PageHero } from './PageHero';
import { Container, Section } from '@/components/ui/Section';

export function LegalPage({ path, title, name, lead, updated, children }: { path: string; title: string; name: string; lead: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ name, href: path }]} eyebrow="Documento legal" title={title} lead={lead}>
        <p className="mt-8 text-sm text-muted-dark">Última atualização: {updated}</p>
      </PageHero>
      <Section tone="light" className="!pt-14 md:!pt-20">
        <Container>
          <div className="legal max-w-3xl [&_h2]:mt-12 [&_h2]:text-h3 [&_h2]:text-fg [&_li]:mt-2 [&_p]:mt-4 [&_p]:leading-[1.8] [&_p]:text-fg-muted [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-fg-muted [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-fg">
            {children}
          </div>
        </Container>
      </Section>
    </>
  );
}
