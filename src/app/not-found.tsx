import Link from 'next/link';
import type { Metadata } from 'next';
import { Container, Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { solutions } from '@/data/solutions';
import { whatsappLink } from '@/config/site';
import { wa } from '@/data/whatsapp';

export const metadata: Metadata = { title: 'Página não encontrada | Eletrix', robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <Section tone="dark" className="!pt-[calc(var(--header-h)+80px)]">
      <Container>
        <p className="eyebrow mb-5">Erro 404</p>
        <h1 className="text-h1 max-w-3xl">Essa página não está por aqui.</h1>
        <p className="mt-6 max-w-xl text-lead text-muted-dark">O endereço pode ter mudado ou ter sido digitado errado. Estes caminhos devem ajudar.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" size="lg">Ir para a página inicial</Button>
          <Button href={whatsappLink(wa.geral)} variant="onDark" size="lg" icon="whatsapp">Falar com a Eletrix</Button>
        </div>
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <li key={s.slug}>
              <Link href={s.href} className="card group flex items-center justify-between gap-3 p-5 transition hover:border-brand-500/60">
                <span><span className="block text-xs text-muted-dark">{s.code}</span><span className="font-display font-bold">{s.name}</span></span>
                <Icon name="arrowRight" size={18} className="text-brand-400 transition group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-muted-dark">Ou veja o <Link href="/#estacoes" className="text-brand-400 underline underline-offset-4">mapa de estações</Link>, os <Link href="/guias/" className="text-brand-400 underline underline-offset-4">guias</Link>, o <Link href="/suporte/" className="text-brand-400 underline underline-offset-4">suporte das estações</Link> e a página de <Link href="/contato/" className="text-brand-400 underline underline-offset-4">contato</Link>.</p>
      </Container>
    </Section>
  );
}
