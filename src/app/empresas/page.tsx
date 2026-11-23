import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { FeatureGrid, Steps, RelatedLinks } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { DuvidasSobre } from '@/components/sections/DuvidasSobre';
import { FinalContact } from '@/components/sections/FinalContact';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Picture } from '@/components/ui/Picture';
import { FeaturedLogos } from '@/components/sections/LogoMarquee';
import { projects } from '@/data/projects';
import { faqs } from '@/data/faqs';
import { wa } from '@/data/whatsapp';
import { whatsappLink } from '@/config/site';

const PATH = '/empresas/';
export const metadata = pageMeta(PATH);

const segments: { icon: IconName; t: string; d: string; to: { href: string; label: string } }[] = [
  { icon: 'building', t: 'Prédios corporativos', d: 'Colaboradores e visitantes recarregam enquanto trabalham. Para quem administra, um serviço a mais e uma nova receita.', to: { href: '/eletrix-hub/', label: 'Eletrix Hub' } },
  { icon: 'layers', t: 'Shoppings e comércios', d: 'O cliente que carrega fica mais tempo. A recarga vira motivo para a visita e para a compra.', to: { href: '/eletrix-hub/', label: 'Eletrix Hub' } },
  { icon: 'home', t: 'Hotéis e hospedagem', d: 'O hóspede recarrega durante a estadia. Um diferencial que o viajante com carro elétrico procura.', to: { href: '/eletrix-rent/', label: 'Eletrix Rent ou Hub' } },
  { icon: 'route', t: 'Galpões e centros logísticos', d: 'Recarga para equipes e visitantes, com infraestrutura dimensionada ao local.', to: { href: '/eletrix-hub/', label: 'Eletrix Hub' } },
  { icon: 'key', t: 'Condomínios residenciais', d: 'Recarga coletiva para moradores e visitantes, com mensalidade fixa e sem comprar o carregador.', to: { href: '/eletrix-rent/', label: 'Eletrix Rent' } },
  { icon: 'palette', t: 'Redes e marcas', d: 'Carregadores e app com a sua marca, com operação Eletrix.', to: { href: '/white-label/', label: 'White label' } },
];

export default function CompaniesPage() {
  const pick = ['aqwa-corporate', 'thera-corporate', 'river-one', 'bresco-viracopos'].map((s) => projects.find((p) => p.slug === s)!);
  return (
    <>
      <JsonLd data={serviceLd({ name: 'Recarga de veículos elétricos para empresas e empreendimentos', description: 'Eletrix Hub, Eletrix Rent, troca de operador e white label para prédios corporativos, shoppings, hotéis, galpões e condomínios.', path: PATH })} />
      <PageHero
        crumbs={[{ name: 'Para empresas', href: PATH }]}
        eyebrow="Para empresas e empreendimentos"
        title="Recarga de veículos elétricos para empresas e empreendimentos."
        lead="A Eletrix instala, opera e dá suporte à recarga no seu empreendimento. O local oferece o serviço, tem a energia reembolsada e não monta uma operação. Um só parceiro, do projeto ao dia a dia."
        actions={<>
          <Button href={whatsappLink(wa.empreendimento)} icon="whatsapp" size="lg">Agendar visita técnica</Button>
          <Button href="/eletrix-hub/" variant="onDark" size="lg">Conhecer o Eletrix Hub</Button>
        </>}
        bg={{ name: 'thera-praca', position: '50% 40%' }}
        chips={['Operação própria', 'Suporte 24 horas', 'Conformidade com a IT-41', 'Sem multa de rescisão (Hub)']}
      />

      <Band tone="light" id="segmentos" eyebrow="Para o seu tipo de espaço" title="Cada empreendimento tem o seu ritmo. A solução acompanha." lead="Hub para alto fluxo, Rent para fluxo menor, e a troca de operador para quem já tem carregadores.">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {segments.map((s, i) => (
            <li key={s.t} data-reveal style={{ ['--d' as string]: `${(i % 3) * 70}ms` }} className="card flex flex-col p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-accent ring-1 ring-inset ring-brand-500/20"><Icon name={s.icon} size={22} /></span>
              <h3 className="mt-5 font-display text-[1.2rem] font-bold">{s.t}</h3>
              <p className="mt-2 flex-1 text-fg-muted">{s.d}</p>
              <Link href={s.to.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">{s.to.label} <Icon name="arrowRight" size={16} /></Link>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="paper" id="como" eyebrow="Como a Eletrix entrega" title="Do projeto à operação, em quatro movimentos.">
        <Steps items={[
          { title: 'Visita técnica', text: 'Avaliamos o espaço, o fluxo de veículos e a demanda de energia.' },
          { title: 'Proposta e modelo', text: 'Hub (comodato) ou Rent (locação), conforme o fluxo e o investimento.' },
          { title: 'Instalação conforme a IT-41', text: 'ART, proteções, placas, comunicação visual e, quando preciso, internet para a operação.' },
          { title: 'Operação e suporte', text: 'App, pagamento e suporte 24 horas.' },
        ]} />
      </Band>

      <Band tone="dark" id="por-que" eyebrow="O que o gestor pede" title="Zero dor de cabeça, segurança e conformidade.">
        <FeatureGrid items={[
          { icon: 'handshake', title: 'Sem mensalidade, sem multa', text: 'No Hub, o carregador fica em comodato e o contrato pode ser rescindido a qualquer momento, por qualquer das partes, sem multa.' },
          { icon: 'headset', title: 'Suporte 24 horas', text: 'Se um carregador falhar, ele volta a funcionar em até 12 horas.' },
          { icon: 'receipt', title: 'Energia reembolsada', text: '100% da energia reembolsada, com bônus ao local sobre cada kWh cobrado no Hub.' },
          { icon: 'clipboard', title: 'IT-41 resolvida', text: 'Quadro identificado, botoeira por pavimento e sinalização em todos os pontos.' },
        ]} />
      </Band>

      <Band tone="light" id="empreendimentos" eyebrow="Onde a Eletrix opera" title="Empreendimentos que escolheram o nosso padrão.">
        <ul className="grid gap-4 md:grid-cols-4">
          {pick.map((p) => (
            <li key={p.slug} data-reveal className="group relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Picture name={p.image} alt={p.alt} fill position={p.focus} sizes="(min-width:768px) 300px, 100vw" className="transition duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5"><p className="font-display font-bold text-white">{p.name}</p><p className="text-sm text-white/70">{p.city}, {p.uf}</p></div>
            </li>
          ))}
        </ul>
        <p className="mt-6"><Button href="/#estacoes" variant="secondary">Ver onde a Eletrix opera</Button></p>
        <div className="mt-14"><FeaturedLogos tone="light" /></div>
      </Band>

      <Band tone="paper" id="troca" eyebrow="Já tem carregadores?" title="Assumimos a operação e regularizamos." lead="Para empreendimentos com carregadores de outra operadora, com suporte ruim ou fora da IT-41, a Eletrix substitui os equipamentos e adequa tudo à norma, com condições avaliadas por empreendimento.">
        <Button href="/troca-de-operador/" variant="dark">Como funciona a troca de operador</Button>
      </Band>

      <FAQ items={faqs.empresas} tone="light" />

      <DuvidasSobre path={PATH} />
      <RelatedLinks_ />
      <FinalContact initial="gestor" whatsappMessage={wa.empreendimento} title="Vamos conversar sobre o seu empreendimento?" />
    </>
  );
}

function RelatedLinks_() {
  return (
    <Band tone="paper" id="continue" eyebrow="Continue por aqui" title="Soluções para empresas.">
      <RelatedLinks items={[
        { href: '/eletrix-hub/', kicker: '06', title: 'Eletrix Hub', text: 'Comodato por 36 meses, sem mensalidade.' },
        { href: '/eletrix-rent/', kicker: '07', title: 'Eletrix Rent', text: 'Locação com mensalidade fixa.' },
        { href: '/white-label/', kicker: 'Marca', title: 'White label', text: 'Carregadores com a sua marca.' },
      ]} />
    </Band>
  );
}
