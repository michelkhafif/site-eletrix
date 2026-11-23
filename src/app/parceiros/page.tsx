import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { RelatedLinks } from '@/components/sections/Blocks';
import { CTABand } from '@/components/sections/CTABand';
import { AllLogos } from '@/components/sections/LogoMarquee';
import { wa } from '@/data/whatsapp';

const PATH = '/parceiros/';
export const metadata = pageMeta(PATH);

export default function PartnersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Parceiros', href: PATH }]}
        eyebrow="Parceiros e clientes"
        title="Quem confia a recarga à Eletrix."
        lead="Administradoras, fundos, incorporadoras, hotéis, estacionamentos e redes de diferentes setores, além dos fabricantes dos equipamentos que usamos."
        bg={{ name: 'thera-entrada', position: '50% 40%' }}
      />
      <Band tone="light" id="logos" eyebrow="Em boa companhia" title="Parceiros e clientes." lead="Os nomes de maior peso no mercado imobiliário corporativo aparecem primeiro.">
        <AllLogos tone="light" />
        <p className="mt-8 max-w-2xl text-sm text-fg-muted">As marcas pertencem aos respectivos titulares e são exibidas para identificar relações comerciais.</p>
      </Band>
      <Band tone="paper" id="continue" eyebrow="Continue por aqui" title="Veja onde a Eletrix opera.">
        <RelatedLinks items={[
          { href: '/#estacoes', kicker: 'Rede', title: 'Onde a Eletrix opera', text: 'Empreendimentos e mapa de estações.' },
          { href: '/eletrix-hub/', kicker: '06', title: 'Eletrix Hub', text: 'O modelo para empreendimentos.' },
        ]} />
      </Band>
      <CTABand title="Quer fazer parte desta lista?" text="Agende a visita técnica e conheça o Eletrix Hub." whatsappMessage={wa.empreendimento} bg="aqwa-noite" />
    </>
  );
}
