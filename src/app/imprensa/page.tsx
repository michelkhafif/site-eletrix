import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { RelatedLinks } from '@/components/sections/Blocks';
import { PressCard } from '@/components/sections/PressCard';
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

      <Band tone="paper" id="materias" title="No Estadão Mobilidade, em 2025.">
        <ul className="grid gap-6 md:grid-cols-2">
          {press.map((p) => (
            <li key={p.slug}><PressCard item={p} /></li>
          ))}
        </ul>
      </Band>

      <Band tone="light" id="contato" title="Pautas e entrevistas." tight>
        <p className="max-w-2xl text-fg-muted">Para entrevistas, dados e imagens, escreva para <a href={`mailto:${site.contact.email}`} className="font-semibold text-accent underline underline-offset-4">{site.contact.email}</a>. Informe o veículo, o prazo e o tema.</p>
      </Band>

      <Band tone="paper" id="continue" title="Sobre a Eletrix.">
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
