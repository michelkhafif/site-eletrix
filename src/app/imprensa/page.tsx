import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { RelatedLinks } from '@/components/sections/Blocks';
import { Picture } from '@/components/ui/Picture';
import { Icon } from '@/components/ui/Icon';
import { CTABand } from '@/components/sections/CTABand';
import { press } from '@/data/content';
import { site } from '@/config/site';

const PATH = '/imprensa/';
export const metadata = pageMeta(PATH);

export default function PressPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Imprensa', href: PATH }]}
        eyebrow="Imprensa"
        title="A Eletrix na imprensa."
        lead="Duas matérias no Estadão Mobilidade, em 2025, contam como a recarga elétrica está mudando a rotina dos prédios e como um orelhão virou ponto de recarga."
      />

      <Band tone="light" id="materias" eyebrow="Matérias" title="No Estadão Mobilidade, em 2025.">
        <ul className="grid gap-8 md:grid-cols-2">
          {press.map((p, i) => (
            <li key={p.slug} data-reveal style={{ ['--d' as string]: `${i * 80}ms` }}>
              <article className="card overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden bg-paper"><Picture name={p.image} alt={p.imageAlt} fill sizes="(min-width:768px) 600px, 100vw" /></div>
                <div className="p-7">
                  <p className="text-sm font-semibold text-accent">{p.outlet} {p.section} · {p.year}</p>
                  <h2 className="mt-2 font-display text-[1.35rem] font-bold leading-snug">{p.title}</h2>
                  {/* TODO: inserir o link original da matéria em src/data/content.ts (press[].url). Não inventar URL. */}
                  {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 font-semibold text-accent underline underline-offset-4">Ler a matéria <Icon name="arrowUpRight" size={16} /></a>}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="paper" id="contato" eyebrow="Para jornalistas" title="Pautas e entrevistas." tight>
        <p className="max-w-2xl text-fg-muted">Para entrevistas, dados e imagens, escreva para <a href={`mailto:${site.contact.email}`} className="font-semibold text-accent underline underline-offset-4">{site.contact.email}</a>. Informe o veículo, o prazo e o tema.</p>
      </Band>

      <Band tone="light" id="continue" eyebrow="Continue por aqui" title="Sobre a Eletrix.">
        <RelatedLinks items={[
          { href: '/sobre/', kicker: 'Empresa', title: 'Sobre a Eletrix', text: 'Missão, números e jeito de trabalhar.' },
          { href: '/eletrix-hub/', kicker: 'Produto', title: 'Eletrix Hub', text: 'O modelo que é pauta nas matérias.' },
          { href: '/#estacoes', kicker: 'Rede', title: 'Onde a Eletrix opera', text: 'Empreendimentos e mapa de estações.' },
        ]} />
      </Band>
      <CTABand title="Quer a Eletrix no seu empreendimento?" whatsappMessage="Olá! Vim pelo site e quero agendar uma visita técnica para o meu empreendimento." bg="totem-orelhao" />
    </>
  );
}
