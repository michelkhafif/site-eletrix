import type { ReactNode } from 'react';
import { Container, Section, SectionHeader, type Tone } from '@/components/ui/Section';

/** Seção padrão: cabeçalho (eyebrow, H2, lead) + conteúdo. */
export function Band({
  tone = 'light', id, eyebrow, title, lead, children, align = 'left', tight, className,
}: { tone?: Tone; id: string; eyebrow?: string; title: ReactNode; lead?: ReactNode; children?: ReactNode; align?: 'left' | 'center'; tight?: boolean; className?: string }) {
  return (
    <Section tone={tone} id={id} labelledBy={`${id}-t`} tight={tight} className={className}>
      <Container>
        <SectionHeader id={`${id}-t`} eyebrow={eyebrow} title={title} lead={lead} align={align} />
        {children && <div className="mt-10 md:mt-12">{children}</div>}
      </Container>
    </Section>
  );
}

/** Parágrafos de texto corrido com estilo editorial. */
export function Prose({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`prose-e text-[1.05rem] leading-[1.75] ${className}`}>{children}</div>;
}
