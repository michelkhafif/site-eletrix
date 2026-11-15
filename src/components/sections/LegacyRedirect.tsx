import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { withBase } from '@/config/site';

/**
 * Rota antiga do site anterior (ainda indexada no Google). Em hospedagem estática, o redirecionamento
 * é feito por meta refresh. No domínio definitivo, devem virar redirecionamentos 301 (docs/PENDENCIAS.md).
 */
export function LegacyRedirect({ to, label }: { to: string; label: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${withBase(to)}`} />
      <Section tone="dark" className="!pt-[calc(var(--header-h)+80px)]">
        <Container>
          <p className="eyebrow mb-4">Página movida</p>
          <h1 className="text-h2 max-w-2xl">Esta página tem um novo endereço.</h1>
          <p className="mt-4 text-lead text-muted-dark">
            Você será redirecionado. Se não acontecer, <Link href={to} className="font-semibold text-brand-400 underline underline-offset-4">acesse {label}</Link>.
          </p>
        </Container>
      </Section>
    </>
  );
}
