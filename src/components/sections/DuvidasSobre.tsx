import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { guideBySlug } from '@/data/guides';

/** Artigos de cada grupo de serviço: 4 a 5 links no fim da página (estrutura de SEO aprovada). */
const IT41 = 'it-41-carregador-veicular';
const LEI = 'lei-carregador-condominio-sao-paulo';
const CUSTO = 'quanto-custa-instalar-carregador-carro-eletrico';
const POT = 'qual-potencia-carregador-carro-eletrico';
const COBR = 'cobranca-energia-carregador-condominio';

const byPath: Record<string, { subject: string; slugs: string[] }> = {
  '/eletrix-hub/': { subject: 'recarga em empreendimentos', slugs: [POT, COBR, IT41, CUSTO] },
  '/eletrix-rent/': { subject: 'locação de carregadores', slugs: [COBR, POT, CUSTO, IT41] },
  '/instalacao-carregador-residencial/': { subject: 'instalação na vaga', slugs: [LEI, CUSTO, COBR, POT, IT41] },
  '/carregadores/': { subject: 'carregadores', slugs: [POT, CUSTO, LEI, COBR] },
  '/laudo-de-demanda/': { subject: 'laudo de demanda', slugs: [IT41, CUSTO, COBR, POT] },
  '/infraestrutura-seca/': { subject: 'infraestrutura seca', slugs: [LEI, CUSTO, IT41, COBR] },
  '/controle-de-demanda/': { subject: 'controle de demanda', slugs: [POT, COBR, IT41, CUSTO] },
  '/adequacao-it-41/': { subject: 'a IT-41', slugs: [IT41, LEI, CUSTO, POT] },
  '/troca-de-operador/': { subject: 'troca de operador', slugs: [IT41, COBR, CUSTO, POT] },
  '/empresas/': { subject: 'recarga para empresas', slugs: [COBR, IT41, POT, CUSTO] },
  '/condominios/': { subject: 'recarga em condomínios', slugs: [LEI, IT41, COBR, CUSTO, POT] },
};

export function DuvidasSobre({ path }: { path: string }) {
  const cfg = byPath[path];
  if (!cfg) return null;
  return (
    <Section tone="paper" tight labelledBy="duvidas-sobre-t">
      <Container>
        <h2 id="duvidas-sobre-t" className="text-h3 max-w-2xl">Dúvidas sobre {cfg.subject}</h2>
        <ul className="mt-6 grid gap-x-10 gap-y-1 md:grid-cols-2">
          {cfg.slugs.map((slug) => {
            const g = guideBySlug(slug);
            return (
              <li key={slug}>
                <Link href={g.href} className="group flex min-h-12 items-center justify-between gap-4 border-b border-ink-900/10 py-2.5 font-medium text-ink-900 hover:text-accent">
                  <span>{g.title}</span>
                  <Icon name="arrowRight" size={16} className="shrink-0 text-accent transition group-hover:translate-x-0.5" />
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-6"><Link href="/guias/" className="font-semibold text-accent underline underline-offset-4 hover:no-underline">Ver todas as dúvidas</Link></p>
      </Container>
    </Section>
  );
}
