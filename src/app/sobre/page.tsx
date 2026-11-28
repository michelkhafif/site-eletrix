import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Band, Prose } from '@/components/sections/Band';
import { FeatureGrid, MediaFrame, RelatedLinks } from '@/components/sections/Blocks';
import { CTABand } from '@/components/sections/CTABand';
import { Counter } from '@/components/ui/Counter';
import { Picture } from '@/components/ui/Picture';
import { Container, Section } from '@/components/ui/Section';
import { FeaturedLogos } from '@/components/sections/LogoMarquee';
import { site } from '@/config/site';
import { wa } from '@/data/whatsapp';

const PATH = '/sobre/';
export const metadata = pageMeta(PATH);

export default function AboutPage() {
  const a = site.contact.address;
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Sobre', href: PATH }]}
        eyebrow="Sobre a Eletrix"
        title="Carregando seu futuro, desde 2021."
        lead="A Eletrix é uma operadora brasileira de recarga de veículos elétricos. Instalamos, operamos e damos suporte a estações em prédios corporativos, hotéis, shoppings, estacionamentos e condomínios, e levamos o mesmo padrão à vaga do morador."
        bg={{ name: 'thera-entrada', position: '50% 40%' }}
      />

      <Section tone="light" labelledBy="missao-t">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div data-reveal>
              <p className="eyebrow mb-4">Missão</p>
              <h2 id="missao-t" className="font-display text-[clamp(1.9rem,1.3rem+2.4vw,3.2rem)] font-extrabold leading-[1.1] tracking-tight">{site.mission}</h2>
              <Prose className="mt-8">
                <p>Recarga de carro elétrico precisa ser parte da rotina, e não uma ocasião especial. É no prédio onde se trabalha, no hotel onde se hospeda, no shopping onde se faz compras e na garagem de casa que o carro passa a maior parte do tempo parado. É ali que a Eletrix está.</p>
                <p>Não disputamos o título de maior rede em número de pontos. Disputamos <strong>padrão, operação e confiança</strong>: ser a operadora que os melhores empreendimentos do país escolhem.</p>
              </Prose>
            </div>
            <MediaFrame className="aspect-[4/5] max-h-[560px] lg:ml-auto lg:w-[85%]"><Picture name="case-6" alt="Carregador Eletrix em totem numerado, instalado em uma garagem" fill sizes="(min-width:1024px) 460px, 100vw" /></MediaFrame>
          </div>
        </Container>
      </Section>

      <Section tone="dark" labelledBy="num-t">
        <Container>
          <h2 id="num-t" className="sr-only">A Eletrix em números</h2>
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {site.stats.map((s) => (
              <div key={s.label} data-reveal className="flex flex-col-reverse border-l-2 border-brand-500 pl-5">
                <dt className="mt-2 text-muted-dark">{s.label}</dt>
                <dd className="font-display text-[2.6rem] font-extrabold leading-none tracking-tight"><Counter value={s.value} prefix={s.prefix} suffix={s.suffix} /></dd>
              </div>
            ))}
            <div data-reveal className="flex flex-col-reverse border-l-2 border-brand-500 pl-5">
              <dt className="mt-2 text-muted-dark">ano de fundação</dt>
              <dd className="font-display text-[2.6rem] font-extrabold leading-none tracking-tight">{site.foundedYear}</dd>
            </div>
          </dl>
          <p className="mt-10 max-w-2xl text-muted-dark">Até hoje, nenhuma estação foi desinstalada por falta de manutenção ou de suporte.</p>
        </Container>
      </Section>

      <Band tone="light" id="jeito" eyebrow="Jeito de trabalhar" title="O que guia as decisões da Eletrix.">
        <FeatureGrid columns={3} items={[
          { icon: 'handshake', title: 'Valor, não amarras', text: 'Bons negócios se sustentam pela entrega de valor, não por multas ou cláusulas leoninas. No Hub, o contrato pode ser rescindido a qualquer momento, sem multa.' },
          { icon: 'wrench', title: 'Operação própria', text: 'Time técnico para manutenção e atendimento. Suporte 24 horas. Quem instala é quem cuida.' },
          { icon: 'shield', title: 'Segurança antes de tudo', text: 'Instalações dentro das normas do Corpo de Bombeiros e da ABNT, com ART, proteções e sinalização. Sem improviso.' },
          { icon: 'badge', title: 'Equipamentos de referência', text: 'Carregadores WEG, Intelbras e Livoltek, 7,4 kW em corrente alternada, com 2 anos de garantia Eletrix nos modelos vendidos.' },
          { icon: 'search', title: 'Clareza', text: 'Preços públicos onde é possível, modelos explicados e prazos combinados. O cliente sabe o que está contratando.' },
          { icon: 'route', title: 'Um só parceiro', text: 'Do laudo de demanda à regularização na IT-41, do totem ao app. Contrate só o que precisar ou o pacote completo.' },
        ]} />
      </Band>

      <Band tone="light" id="parceiros" eyebrow="Parceiros e clientes" title="Em boa companhia.">
        <FeaturedLogos tone="light" />
      </Band>

      <Band tone="paper" id="dados" eyebrow="Dados da empresa" title="Quem somos, formalmente." tight>
        <dl className="grid max-w-3xl gap-6 sm:grid-cols-2">
          {[
            ['Razão social', site.legalName],
            ['CNPJ', site.cnpj],
            ['Fundação', String(site.foundedYear)],
            ['Endereço', `${a.street}, ${a.district}, ${a.city}/${a.state}, CEP ${a.zip}`],
            ['E-mail', site.contact.email],
            ['Comercial', site.contact.phoneCommercialDisplay],
          ].map(([k, v]) => (<div key={k}><dt className="text-sm text-fg-muted">{k}</dt><dd className="font-medium">{v}</dd></div>))}
        </dl>
      </Band>

      <Band tone="light" id="continue" eyebrow="Continue por aqui" title="Conheça o que fazemos.">
        <RelatedLinks items={[
          { href: '/#estacoes', kicker: 'Rede', title: 'Onde a Eletrix opera', text: 'Empreendimentos e mapa de estações.' },
          { href: '/imprensa/', kicker: 'Imprensa', title: 'Na imprensa', text: 'A Eletrix no Estadão.' },
        ]} />
      </Band>
      <CTABand title="Vamos conversar?" text="Conte o que o seu empreendimento ou condomínio precisa." whatsappMessage={wa.default} bg="aqwa-por-do-sol" />
    </>
  );
}
