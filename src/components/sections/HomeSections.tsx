import Link from 'next/link';
import { Container, Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Picture } from '@/components/ui/Picture';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { PhoneMockup } from '@/components/ui/PhoneMockup';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppGlyph';
import { CheckList } from './Blocks';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqLd } from '@/lib/jsonld';
import { journey, profiles, solutions, type Profile } from '@/data/solutions';
import { carouselSlugs, projectBy } from '@/data/projects';
import { ProjectCarousel } from './ProjectCarousel';
import { press, testimonials, type Testimonial } from '@/data/content';
import { PressCard } from './PressCard';
import { homeDuvidas } from '@/data/faqs';
import mapSummary from '@/data/map.generated.json';
import { site, whatsappLink, withBase } from '@/config/site';
import { wa } from '@/data/whatsapp';
import { contactHref } from '@/data/services';

const carouselProjects = carouselSlugs.map(projectBy);

/* ------------------------------------------------------------------ QUAL É O SEU CASO */
const caseCtas: Record<Profile, { href: string; label: string }> = {
  morador: { href: contactHref({ interesse: 'instalacao-vaga' }), label: 'Pedir visita técnica' },
  sindico: { href: contactHref({ perfil: 'sindico' }), label: 'Falar com um especialista' },
  negocio: { href: contactHref({ perfil: 'empreendimento' }), label: 'Quero oferecer recarga' },
};
const casePhoto: Record<Profile, { name: string; alt: string }> = {
  morador: { name: 'caso-morador', alt: 'Carregador Eletrix azul-marinho instalado na parede da garagem, com quadro de proteção e placas S.A.V.E.' },
  sindico: { name: 'caso-sindico', alt: 'Carregador azul Eletrix em garagem de condomínio, com quadro identificado, botoeira e placas S.A.V.E.' },
  negocio: { name: 'caso-negocio', alt: 'Garagem com cinco estações de recarga Eletrix lado a lado' },
};

export function WhichCase() {
  const order: Profile[] = ['morador', 'sindico', 'negocio'];
  return (
    <Section tone="paper" labelledBy="caso-t">
      <Container>
        <SectionHeader id="caso-t" title="Qual é o seu caso?" lead="Escolha o seu perfil e veja o que a Eletrix faz por você." />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {order.map((p) => {
            const list = solutions.filter((s) => s.profile === p);
            const photo = casePhoto[p];
            return (
              <article key={p} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-900/5">
                <div className="relative aspect-[4/3] bg-ink-900">
                  <Picture name={photo.name} alt={photo.alt} fill sizes="(min-width:1024px) 400px, (min-width:640px) 90vw, 100vw" />
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink-950/20 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="font-display text-xl font-bold leading-tight text-ink-900">{profiles[p].title}</h3>
                  <p className="mt-1 text-[1.02rem] font-medium text-accent">“{profiles[p].question}”</p>
                  <ul className="mt-5 flex-1 space-y-2.5 text-[0.98rem] text-fg">
                    {[...list.map((s) => ({ slug: s.slug, href: s.href, name: s.name, icon: s.icon as IconName })), ...(p === 'morador' ? [{ slug: 'carregadores', href: '/carregadores/', name: 'Carregadores a partir de R$ 2.799', icon: 'charge' as IconName }] : []), ...(p === 'negocio' ? [{ slug: 'troca', href: '/troca-de-operador/', name: 'Troca de operador', icon: 'refresh' as IconName }] : [])].map((s) => (
                      <li key={s.slug}>
                        <Link href={s.href} className="group flex items-center gap-2.5 hover:text-accent">
                          <Icon name={s.icon} size={18} className="shrink-0 text-brand-600" />
                          <span className="underline-offset-4 group-hover:underline">{s.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6"><Button href={caseCtas[p].href} className="w-full">{caseCtas[p].label}</Button></div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ HUB */
const hubPoints: { icon: IconName; title: string; text: string; anchor?: { href: string; label: string } }[] = [
  { icon: 'key', title: 'Comodato por 36 meses', text: 'Sem mensalidade para o empreendimento.' },
  { icon: 'handshake', title: 'Rescisão sem multa', text: 'A qualquer momento, por qualquer das partes.' },
  { icon: 'receipt', title: 'Energia 100% reembolsada', text: 'Com bônus ao local sobre cada kWh cobrado.' },
  { icon: 'headset', title: 'Suporte 24 horas', text: 'Carregador funcionando em até 12 horas.' },
  { icon: 'chart', title: 'Dashboard de gerenciamento', text: 'Recargas e carregadores em um painel, mediante solicitação.' },
  { icon: 'phoneApp', title: 'Aplicativo individualizado', text: 'A experiência no app personalizada para o empreendimento.', anchor: { href: '#app', label: 'Veja o app' } },
];

/** Hub e app formam um capítulo só: o iPhone da seção seguinte "sai" daqui, e um item aponta para ele. */
export function HubFeature() {
  return (
    <Section tone="ink" id="eletrix-hub" labelledBy="hub-t" className="!pb-36 lg:!pb-44">
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 id="hub-t" className="text-h2">Eletrix Hub: recarga tarifada para prédios corporativos e shoppings.</h2>
            <p className="mt-4 max-w-xl text-lead text-fg-muted">A Eletrix instala, opera e dá suporte. O empreendimento não compra o carregador e não paga mensalidade.</p>
            <ul className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {hubPoints.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${p.anchor ? 'bg-white text-ink-950 ring-4 ring-brand-500/40' : 'bg-brand-500 text-ink-950'}`}><Icon name={p.icon} size={21} /></span>
                  <span>
                    <span className="block font-display font-bold text-white">{p.title}</span>
                    <span className="block text-[0.95rem] text-fg-muted">{p.text}</span>
                    {p.anchor && (
                      <a href={p.anchor.href} className="mt-1.5 inline-flex min-h-8 items-center gap-1 text-[0.95rem] font-semibold text-brand-400 underline-offset-4 hover:underline">
                        {p.anchor.label}<Icon name="chevronDown" size={16} />
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={contactHref({ perfil: 'empreendimento', interesse: 'eletrix-hub' })} size="lg">Quero o Eletrix Hub</Button>
              <Button href={whatsappLink(wa.hub)} variant="onDark" size="lg">
                <span className="inline-flex items-center gap-2"><WhatsAppGlyph size={18} /> Falar no WhatsApp</span>
              </Button>
            </div>
            <p className="mt-5 text-[0.97rem] text-fg-muted">Quer os detalhes do modelo? <Link href="/eletrix-hub/" className="font-semibold text-brand-400 underline underline-offset-4 hover:no-underline">Ver como funciona o Hub</Link></p>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift ring-1 ring-white/10">
              <Picture name="totem-orelhao" alt="Dois totens orelhão Eletrix com carregadores, ao lado de um carro elétrico carregando" fill sizes="(min-width:1024px) 480px, 90vw" position="42% 16%" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ APP (logo depois do Hub) */
const appSteps = ['Baixe o app e cadastre a forma de pagamento.', 'Ache a estação no mapa e conecte o carro.', 'Inicie e acompanhe a recarga pelo app.'];

export function AppSection() {
  return (
    <Section tone="paper" labelledBy="app-t" className="!pt-0 md:!pt-0">
      {/* alvo do menu "App": fica na altura do topo do iPhone, que avança sobre a seção de cima */}
      <span id="app" aria-hidden="true" className="absolute left-0 -top-28 h-px w-px lg:-top-64" />
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="relative z-10 -mt-24 lg:order-2 lg:-mt-60 lg:justify-self-center">
            <PhoneMockup className="!w-[min(236px,62vw)] lg:!w-[290px]">
              <Picture name="app-tela" alt="Tela do app Eletrix com o mapa das estações de recarga em São Paulo" fill sizes="290px" position="50% 0%" />
            </PhoneMockup>
          </div>
          <div className="lg:order-1 lg:pt-20">
            <h2 id="app-t" className="text-h2 max-w-xl">Encontre, recarregue e pague pelo celular.</h2>
            <p className="mt-4 max-w-lg text-lead text-fg-muted">O app Eletrix é a porta de entrada do motorista em cada estação, com pagamento por cartão de crédito ou saldo em carteira.</p>
            <ol className="mt-7 space-y-3.5">
              {appSteps.map((t, i) => (
                <li key={t} className="flex items-center gap-3.5 text-[1.02rem] text-fg">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-500 font-display text-sm font-extrabold text-ink-950">{i + 1}</span>{t}
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col items-start gap-4 xl:flex-row xl:items-center xl:gap-5">
              <Button href={site.app.download} size="lg" variant="dark" className="w-full sm:w-auto">
                <span className="inline-flex items-center gap-2"><Icon name="download" size={19} className="text-brand-400" /> Baixe o App</span>
              </Button>
              <StoreBadges />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ ETAPAS DO SÍNDICO */
const stepIcon: Record<string, IconName> = { Medir: 'gauge', Preparar: 'route', Controlar: 'sliders', Regularizar: 'shield' };

export function Journey() {
  return (
    <Section tone="light" labelledBy="jornada-t" className="!pb-12 md:!pb-16">
      <Container>
        <div className="max-w-2xl">
          <h2 id="jornada-t" className="text-h2">Para síndicos e gestores: medir, preparar, controlar e regularizar.</h2>
          <p className="mt-4 text-lead text-fg-muted">Contrate só o que precisa ou o pacote completo. Um só parceiro, do laudo à regularização.</p>
        </div>
        <ol className="mt-12 grid gap-y-9 lg:grid-cols-4 lg:gap-x-6">
          {journey.map((s, i) => (
            <li key={s.slug} className="relative pl-16 lg:pl-0 lg:text-center">
              {i < journey.length - 1 && (
                <span aria-hidden="true" className="absolute -bottom-9 left-5 top-12 w-0.5 -translate-x-1/2 bg-brand-500/45 lg:bottom-auto lg:left-[calc(50%+1.75rem)] lg:top-5 lg:h-0.5 lg:w-[calc(100%-2rem)] lg:translate-x-0 lg:-translate-y-1/2" />
              )}
              <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-brand-500 font-display text-lg font-extrabold text-ink-950 shadow-[0_0_0_5px_#fff] lg:static lg:mx-auto">{i + 1}</span>
              <h3 className="font-display text-[1.45rem] font-extrabold leading-none text-ink-900 lg:mt-5">{s.step}</h3>
              <p className="mt-1.5 flex items-center gap-2 font-semibold text-accent lg:justify-center"><Icon name={stepIcon[s.step!]} size={17} />{s.name}</p>
              <p className="mt-2 text-[0.97rem] text-fg-muted lg:mx-auto lg:max-w-[16rem]">{s.tagline}</p>
              {s.slug !== 'adequacao-it-41' && s.price && <p className="mt-2 text-sm font-semibold text-ink-900">{s.price}</p>}
              <Link href={s.href} className="mt-3 inline-block text-[0.95rem] font-semibold text-accent underline underline-offset-4 hover:no-underline">Saiba mais<span className="sr-only">: {s.name}</span></Link>
            </li>
          ))}
        </ol>
        {/* fechamento da seção: um bloco que encerra as quatro etapas, alinhado à mesma grade */}
        <div data-tone="ink" className="relative mt-12 overflow-hidden rounded-3xl p-6 md:mt-14 md:p-9 lg:grid lg:grid-cols-4 lg:items-center lg:gap-x-6">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-700 via-brand-500 to-brand-300" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-brand-500/25 blur-[90px]" />
          <div className="relative flex gap-4 lg:col-span-3 lg:items-center">
            <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-500 text-ink-950 sm:grid"><Icon name="clipboard" size={26} /></span>
            <div>
              <p className="font-display text-[1.45rem] font-extrabold leading-tight text-white md:text-[1.7rem]">Não sabe por onde começar?</p>
              <p className="mt-1.5 text-fg-muted">A gente avalia o seu prédio e indica o primeiro passo. <Link href="/condominios/" className="font-semibold text-brand-400 underline underline-offset-4 hover:no-underline">Ver o caminho completo</Link></p>
            </div>
          </div>
          <div className="relative mt-6 lg:mt-0 lg:justify-self-end">
            <Button href={contactHref({ perfil: 'sindico' })} size="lg" className="w-full lg:w-auto">Agendar avaliação do prédio</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ ESTAÇÕES: mapa em cima, prédios embaixo */
const regions = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

export function Stations() {
  const [estacoes, cidades, estados] = site.stats;
  return (
    <Section tone="dark" id="estacoes" labelledBy="est-t" className="scroll-mt-0 overflow-hidden !pb-14 md:!pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-24 h-[520px] w-[520px] rounded-full bg-brand-500/[0.09] blur-[140px]" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <h2 id="est-t" className="text-[clamp(2.1rem,1.4rem+2.9vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">Onde a Eletrix opera.</h2>
            <p className="mt-5 max-w-md text-lead text-fg-muted">
              Mais de <strong className="font-semibold text-white">{estacoes.value} estações de recarga</strong> em mais de {cidades.value} cidades e {estados.value} estados, nas cinco regiões do país.
            </p>
            <ul aria-label="Regiões com estações Eletrix" className="mt-7 flex max-w-lg flex-wrap gap-2">
              {regions.map((r) => (
                <li key={r} className="inline-flex items-center gap-1.5 rounded-full border border-brand-400/35 bg-brand-500/[0.08] py-1.5 pl-3 pr-3.5 text-[0.82rem] font-semibold text-white">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_10px_2px_rgba(16,183,255,.7)]" />{r}
                </li>
              ))}
            </ul>
            <p className="mt-7 hidden max-w-sm border-l-2 border-brand-500 pl-4 text-[0.97rem] text-fg-muted lg:block">Os pontos azuis marcam endereços com recarga Eletrix, em operação ou em instalação. No detalhe, a Grande São Paulo.</p>
          </div>
          <figure className="relative mx-auto w-full max-w-[560px]">
            <img
              src={withBase('/mapa/rede-brasil.svg')}
              alt={`Mapa do Brasil com as estações da Eletrix, do Pará ao Rio Grande do Sul, e um detalhe ampliado da Grande São Paulo`}
              width={mapSummary.main[0]} height={mapSummary.main[1]} loading="lazy" decoding="async"
              className="block h-auto w-full"
            />
            <figcaption className="absolute -translate-y-full pb-1.5 text-[0.72rem] font-semibold text-brand-300 sm:text-sm" style={{ left: `${mapSummary.inset.left}%`, top: `${mapSummary.inset.top}%` }}>Grande São Paulo</figcaption>
          </figure>
        </div>
      </Container>

      <div className="relative mt-14 md:mt-20">
        <div aria-hidden="true" className="absolute inset-x-0 -top-7 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent md:-top-10" />
        <ProjectCarousel
          title="Alguns endereços da rede"
          label="Prédios com recarga Eletrix"
          slides={carouselProjects.map((p) => ({
            name: p.name,
            node: (
              <article className="relative aspect-square overflow-hidden rounded-2xl bg-ink-800 ring-1 ring-white/10">
                <Picture name={p.image} alt={p.alt} fill position={p.focus} sizes="(min-width:1280px) 384px, (min-width:768px) 336px, 72vw" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
                <h4 className="absolute inset-x-0 bottom-0 p-4 font-display text-[1.05rem] font-bold leading-tight text-white md:p-5 md:text-lg">
                  {p.name}<span className="mt-0.5 block font-sans text-sm font-normal text-white/80">{p.city}, {p.uf}</span>
                </h4>
              </article>
            ),
          }))}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ POR QUE A ELETRIX */
const pillars = [
  { title: 'Padrão', line: 'Instalação dentro da norma, do projeto à ART.', proof: 'Conformidade com a IT-41 e equipamentos WEG, Intelbras e Livoltek' },
  { title: 'Operação', line: 'Time técnico próprio e suporte 24 horas.', proof: 'Carregador de Hub funcionando em até 12 horas' },
  { title: 'Confiança', line: 'Nenhuma estação desinstalada por falta de suporte.', proof: 'Contrato sem multa, com rescisão a qualquer momento' },
];

export function Why() {
  return (
    <Section tone="paper" labelledBy="why-t" className="overflow-hidden">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift lg:w-[82%]">
              <Picture name="case-4" alt="Estação de recarga Eletrix numerada em uma parede de garagem" fill sizes="(min-width:1024px) 420px, 90vw" />
            </div>
            <div className="absolute -bottom-6 right-0 aspect-[4/3] w-[58%] overflow-hidden rounded-2xl border-[6px] border-[#e3f5fe] shadow-lift">
              <Picture name="hub-recarga" alt="Técnico da Eletrix conectando o plug a uma estação de recarga" fill sizes="280px" position="60% 50%" />
            </div>
          </div>
          <div>
            <h2 id="why-t" className="text-h2">Por que a Eletrix.</h2>
            <ul className="mt-8 divide-y divide-ink-900/10 border-y border-ink-900/10">
              {pillars.map((p) => (
                <li key={p.title} className="grid gap-1 py-6 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
                  <h3 className="font-display text-2xl font-extrabold text-accent">{p.title}</h3>
                  <div>
                    <p className="font-display text-[1.2rem] font-bold leading-snug text-ink-900">{p.line}</p>
                    <p className="mt-1 text-[0.95rem] text-fg-muted">{p.proof}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ TROCA DE OPERADOR */
export function SwitchOperator() {
  return (
    <Section tone="brand" tight labelledBy="troca-t">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 id="troca-t" className="text-h2">Já tem carregadores no prédio? Assumimos a operação e regularizamos.</h2>
            <p className="mt-4 max-w-2xl text-lead">A Eletrix substitui os equipamentos, adequa tudo à IT-41 e opera, com reembolso da energia e repasse ao prédio. Mais de 50 estações já migraram para a Eletrix nos últimos meses.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/troca-de-operador/" variant="dark" size="lg">Como funciona a troca</Button>
              <Button href={whatsappLink(wa.troca)} variant="dark" size="lg" icon="whatsapp">Falar no WhatsApp</Button>
            </div>
          </div>
          <div data-tone="light" className="rounded-2xl p-7 shadow-lift">
            <p className="font-display text-lg font-bold">Em muitos casos, sem custo para o condomínio.</p>
            <p className="mt-1 text-sm text-fg-muted">As condições são avaliadas por empreendimento.</p>
            <CheckList className="mt-5" items={['Equipamentos substituídos', 'Adequação à IT-41', 'Suporte 24 horas', 'Reembolso da energia e repasse ao prédio']} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ DEPOIMENTOS (provisórios) */
/** O depoimento aparece uma vez só; o trecho que resume o resultado ganha destaque. */
function Quote({ t }: { t: Testimonial }) {
  const [before, after] = t.quote.split(t.highlight);
  return <>{before}<mark>{t.highlight}</mark>{after}</>;
}

export function Testimonials() {
  if (!site.flags.showPlaceholderTestimonials) return null;
  const [main, ...others] = testimonials;
  return (
    <Section tone="ink" labelledBy="dep-t" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-[480px] w-[480px] rounded-full bg-brand-500/10 blur-[130px]" />
      <Container className="relative">
        <SectionHeader id="dep-t" title="O que muda quando a operação funciona." />
        {/* TODO: depoimentos provisórios (placeholder: true). Substituir por reais antes do lançamento oficial. */}
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
          <figure data-placeholder={main.placeholder} className="flex flex-col overflow-hidden rounded-3xl bg-ink-800 ring-1 ring-white/10">
            <div aria-hidden="true" className="relative h-52 sm:h-64 lg:h-auto lg:min-h-[17rem] lg:flex-1">
              <div className="absolute inset-0"><Picture name={main.photo} alt="" fill sizes="(min-width:1024px) 640px, 100vw" position="50% 52%" /></div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/10 to-transparent" />
            </div>
            <div className="relative px-6 pb-7 md:px-10 md:pb-10">
              <span aria-hidden="true" className="-mt-9 block h-10 font-display text-[7rem] font-extrabold leading-[0.9] text-brand-500 drop-shadow-[0_4px_18px_rgba(5,11,20,.8)] md:-mt-12 md:h-12 md:text-[8.5rem]">“</span>
              <blockquote className="quote mt-3 font-display text-[1.3rem] font-semibold leading-[1.45] text-white/80 md:text-[1.6rem] md:leading-[1.42]"><p><Quote t={main} /></p></blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <span aria-hidden="true" className="h-10 w-1 shrink-0 rounded-full bg-brand-500" />
                <span><span className="block font-display text-lg font-bold text-white">{main.role}</span><span className="block text-sm text-fg-muted">{main.place}</span></span>
              </figcaption>
            </div>
          </figure>
          <div className="grid gap-5 lg:grid-rows-2 lg:gap-6">
            {others.map((t) => (
              <figure key={t.role} data-tone="light" data-placeholder={t.placeholder} className="grid overflow-hidden rounded-3xl shadow-lift sm:grid-cols-[38%_1fr] lg:grid-cols-[34%_1fr]">
                <div aria-hidden="true" className="relative h-36 sm:h-auto">
                  <div className="absolute inset-0"><Picture name={t.photo} alt="" fill sizes="(min-width:1024px) 200px, (min-width:640px) 38vw, 100vw" position="50% 54%" /></div>
                </div>
                <div className="flex flex-col justify-center p-6 md:p-7">
                  <blockquote className="quote quote-light text-[1.04rem] leading-[1.6] text-fg-muted"><p><span aria-hidden="true">“</span><Quote t={t} /><span aria-hidden="true">”</span></p></blockquote>
                  <figcaption className="mt-5 border-t border-hair pt-4"><span className="block font-display font-bold text-fg">{t.role}</span><span className="block text-sm text-fg-muted">{t.place}</span></figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ IMPRENSA */
export function PressSection() {
  return (
    <Section tone="paper" labelledBy="imp-t">
      <Container>
        <SectionHeader id="imp-t" title="A Eletrix no Estadão." />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {press.map((p) => (
            <li key={p.slug}><PressCard item={p} /></li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Button href="/imprensa/" variant="secondary" size="lg">Ver imprensa</Button>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ DÚVIDAS FREQUENTES */
export function HomeDuvidas() {
  return (
    <Section tone="light" labelledBy="duv-t" id="duvidas">
      <JsonLd data={faqLd(homeDuvidas.map(({ q, a }) => ({ q, a })))} />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 id="duv-t" className="text-h2">Dúvidas frequentes</h2>
            <p className="mt-4 text-lead text-fg-muted">As perguntas que mais aparecem na assembleia e na portaria.</p>
            <div className="mt-7"><Button href="/guias/" variant="secondary">Ver todas as dúvidas</Button></div>
          </div>
          <div className="divide-y divide-hair rounded-2xl border border-hair bg-card px-6 shadow-card">
            {homeDuvidas.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex items-start justify-between gap-6 py-5 text-left font-display text-[1.08rem] font-semibold leading-snug text-fg transition hover:text-accent">
                  <span>{f.q}</span>
                  <Icon name="chevronDown" size={20} className="chev mt-1 shrink-0 text-accent transition-transform duration-200" />
                </summary>
                <div className="pb-6 pr-8 text-fg-muted">
                  <p>{f.a}</p>
                  <Link href={f.href} className="mt-3 inline-block font-semibold text-accent underline underline-offset-4 hover:no-underline">Ler o guia completo</Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
