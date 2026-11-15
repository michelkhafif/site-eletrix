import Link from 'next/link';
import { Container, Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Picture } from '@/components/ui/Picture';
import { Counter } from '@/components/ui/Counter';
import { Parallax } from '@/components/ui/Parallax';
import { LogoMarquee } from './LogoMarquee';
import { NetworkPreview } from './NetworkPreview';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { CheckList } from './Blocks';
import { journey, profiles, solutions, type Profile } from '@/data/solutions';
import { projects } from '@/data/projects';
import { press, testimonials, whyEletrix } from '@/data/content';
import { guides } from '@/data/guides';
import { site, whatsappLink } from '@/config/site';
import { wa } from '@/data/whatsapp';

/* ------------------------------------------------------------------ HERO */
export function Hero() {
  return (
    <section data-tone="dark" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Parallax className="h-full w-full">
          <Picture name="aqwa-por-do-sol" alt="" priority fill sizes="100vw" position="50% 38%" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-ink-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-ink-950/55" />
      </div>

      <Container className="relative flex flex-1 flex-col justify-end pb-10 pt-[calc(var(--header-h)+48px)] md:pb-14">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">Operadora de recarga para veículos elétricos</p>
          <h1 className="text-display text-white">Qualidade de serviço à altura de um AAA.</h1>
          <p className="mt-6 max-w-xl text-lead text-white/80">
            A Eletrix opera a recarga nos melhores empreendimentos do país e leva o mesmo padrão à vaga do morador. Do laudo à operação, com um só parceiro.
          </p>
        </div>

        <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          <Link href="/empresas/" className="group flex items-center justify-between gap-4 rounded-2xl bg-brand-500 p-5 text-ink-950 shadow-[0_14px_40px_-14px_rgba(16,183,255,.8)] transition hover:bg-brand-400">
            <span>
              <span className="block font-display text-lg font-bold leading-tight">Tenho um empreendimento</span>
              <span className="mt-0.5 block text-sm text-ink-950/75">Hub, Rent, troca de operador</span>
            </span>
            <Icon name="arrowRight" size={22} className="shrink-0 transition group-hover:translate-x-1" />
          </Link>
          <Link href="/instalacao-carregador-residencial/" className="group flex items-center justify-between gap-4 rounded-2xl border border-white/25 bg-white/5 p-5 text-white backdrop-blur transition hover:border-white/60 hover:bg-white/10">
            <span>
              <span className="block font-display text-lg font-bold leading-tight">Quero carregar na minha vaga</span>
              <span className="mt-0.5 block text-sm text-white/70">Visita técnica gratuita</span>
            </span>
            <Icon name="arrowRight" size={22} className="shrink-0 transition group-hover:translate-x-1" />
          </Link>
        </div>
        <p className="mt-4 text-sm text-white/70">
          Síndico ou gestor? <Link href="/condominios/" className="font-semibold text-brand-400 underline-offset-4 hover:underline">Veja o caminho do laudo à IT-41</Link>.
        </p>

        <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/15 pt-6 sm:grid-cols-4">
          {site.stats.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-3xl font-extrabold tracking-tight text-white tnum md:text-[2rem]">{s.prefix}{s.value}{s.suffix}</dd>
              <dt className="mt-0.5 text-sm text-white/65">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ LOGOS */
export function LogoStrip() {
  return (
    <Section tone="dark" tight className="border-t border-white/10 !pb-12 !pt-10 md:!pb-14 md:!pt-12">
      <Container>
        <p className="mb-6 text-center text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-muted-dark">Parceiros e clientes da Eletrix</p>
        <LogoMarquee tone="dark" />
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ CASO */
const caseCtas: Record<Profile, { href: string; label: string }> = {
  morador: { href: '/instalacao-carregador-residencial/', label: 'Instalar na minha vaga' },
  sindico: { href: '/condominios/', label: 'Ver o caminho do prédio' },
  negocio: { href: '/empresas/', label: 'Ver soluções para empresas' },
};

export function WhichCase() {
  const order: Profile[] = ['morador', 'sindico', 'negocio'];
  return (
    <Section tone="light" labelledBy="caso-t">
      <Container>
        <SectionHeader id="caso-t" eyebrow="Comece por aqui" title="Qual é o seu caso?" lead="Cada perfil tem um caminho curto. Escolha o seu e veja o que a Eletrix faz, quanto custa e qual é o próximo passo." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {order.map((p, i) => {
            const list = solutions.filter((s) => s.profile === p);
            return (
              <article key={p} data-reveal style={{ ['--d' as string]: `${i * 80}ms` }} className="card flex flex-col p-7 transition hover:shadow-card">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-accent">{profiles[p].title}</p>
                <h3 className="mt-3 font-display text-[1.5rem] font-bold leading-tight tracking-tight">“{profiles[p].question}”</h3>
                <p className="mt-3 text-fg-muted">{profiles[p].description}</p>
                <ul className="mt-6 flex-1 divide-y divide-hair border-y border-hair">
                  {list.map((s) => (
                    <li key={s.slug}>
                      <Link href={s.href} className="group flex items-center justify-between gap-3 py-3.5">
                        <span className="flex items-center gap-3">
                          <span className="font-display text-sm font-bold text-accent tnum">{s.code}</span>
                          <span className="font-medium text-fg group-hover:text-accent">{s.name}</span>
                        </span>
                        <Icon name="arrowRight" size={16} className="text-fg-muted transition group-hover:translate-x-0.5 group-hover:text-accent" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6"><Button href={caseCtas[p].href} variant="secondary" size="md">{caseCtas[p].label}</Button></div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ HUB */
const hubPoints: { icon: IconName; title: string; text: string }[] = [
  { icon: 'key', title: 'Comodato por 36 meses', text: 'Sem mensalidade para o empreendimento.' },
  { icon: 'handshake', title: 'Rescisão sem multa', text: 'A qualquer momento, por qualquer das partes.' },
  { icon: 'receipt', title: 'Energia 100% reembolsada', text: 'Com bônus ao local sobre cada kWh cobrado.' },
  { icon: 'headset', title: 'Suporte 24 horas', text: 'Carregador funcionando em até 12 horas.' },
  { icon: 'shield', title: 'Seguro de até R$ 500 mil', text: 'Instalação e manutenção, responsabilidade civil em todo o país.' },
  { icon: 'chart', title: 'Dashboard em tempo real', text: 'Todas as recargas e carregadores em um painel.' },
];

export function HubFeature() {
  return (
    <Section tone="ink" labelledBy="hub-t" className="overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-brand-500/10 blur-[130px]" aria-hidden="true" />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div data-reveal>
              <p className="eyebrow mb-4">Eletrix Hub · para empreendimentos</p>
              <h2 id="hub-t" className="text-h2">Os melhores empreendimentos do país escolhem a Eletrix.</h2>
              <p className="mt-5 max-w-xl text-lead text-fg-muted">
                No Hub, a Eletrix instala, opera e dá suporte às estações tarifadas. O empreendimento oferece recarga aos usuários, sem comprar o carregador e sem mensalidade.
              </p>
            </div>
            <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {hubPoints.map((p, i) => (
                <li key={p.title} data-reveal style={{ ['--d' as string]: `${(i % 2) * 70}ms` }} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-400 ring-1 ring-inset ring-brand-500/25"><Icon name={p.icon} size={20} /></span>
                  <span>
                    <span className="block font-display font-bold text-white">{p.title}</span>
                    <span className="block text-[0.93rem] text-fg-muted">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/eletrix-hub/" size="lg">Conhecer o Eletrix Hub</Button>
              <Button href={whatsappLink(wa.hub)} variant="onDark" size="lg" icon="whatsapp">Falar no WhatsApp</Button>
            </div>
          </div>
          <div data-reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-lift">
              <Picture name="totem-orelhao" alt="Totem orelhão azul da Eletrix com um carro elétrico em recarga em frente a um edifício corporativo" fill sizes="(min-width:1024px) 460px, 90vw" />
            </div>
            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-white/10 bg-ink-950/90 p-4 backdrop-blur sm:left-auto sm:right-[-1.25rem] sm:w-64">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-400">Formatos de instalação</p>
              <p className="mt-1 text-sm text-white/85">Parede, totem orelhão, totem com ou sem cobertura e chapa de aço, em áreas internas e externas.</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ JORNADA */
export function Journey() {
  return (
    <Section tone="paper" labelledBy="jornada-t">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeader id="jornada-t" eyebrow="Para síndicos e gestores" title="Medir, preparar, controlar e regularizar." lead="Contrate só o que precisa ou o pacote completo. Um só parceiro, do laudo à regularização." />
          <p data-reveal className="text-fg-muted lg:max-w-md lg:justify-self-end">Os carros elétricos já estão chegando às garagens. Organize a recarga antes que as ligações improvisadas cheguem primeiro.</p>
        </div>
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {journey.map((s, i) => (
            <li key={s.slug} data-reveal style={{ ['--d' as string]: `${i * 80}ms` }} className="relative">
              <Link href={s.href} className="card group flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:border-brand-500/60 hover:shadow-card">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-ink-900 px-3 py-1 font-display text-[0.78rem] font-bold uppercase tracking-wider text-brand-400">{s.step}</span>
                  <span className="font-display text-sm font-bold text-fg-muted tnum">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 font-display text-[1.2rem] font-bold leading-snug">{s.name}</h3>
                <p className="mt-2 flex-1 text-[0.95rem] text-fg-muted">{s.tagline}</p>
                {s.price && <p className="mt-5 border-t border-hair pt-4 text-sm font-semibold text-accent">{s.price}</p>}
              </Link>
              {i < journey.length - 1 && <Icon name="arrowRight" size={18} className="absolute -right-3.5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-paper text-muted lg:block" />}
            </li>
          ))}
        </ol>
        <div className="mt-10"><Button href="/condominios/" variant="dark">Ver o caminho completo para condomínios</Button></div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ EMPREENDIMENTOS */
export function ProjectsShowcase() {
  const pick = ['thera-corporate', 'river-one', 'pinheiros-one', 'arquipeo', 'faria-lima-financial-center'].map((s) => projects.find((p) => p.slug === s)!);
  const cell = (i: number) => (i === 0 ? 'md:col-span-2 md:row-span-2' : '');
  return (
    <Section tone="dark" labelledBy="proj-t">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader id="proj-t" eyebrow="Empreendimentos" title="Onde a Eletrix opera." lead="Edifícios corporativos, centros logísticos, hotéis e shoppings. Alguns dos nomes que escolheram o nosso padrão." />
          <Button href="/empreendimentos/" variant="onDark">Ver empreendimentos</Button>
        </div>
        <ul className="mt-12 grid auto-rows-[260px] gap-4 md:grid-cols-4 md:auto-rows-[230px]">
          {pick.map((p, i) => (
            <li key={p.slug} data-reveal style={{ ['--d' as string]: `${i * 60}ms` }} className={`group relative overflow-hidden rounded-3xl ${cell(i)}`}>
              <Picture name={p.image} alt={p.alt} fill position={p.focus} sizes={i === 0 ? '(min-width:768px) 620px, 100vw' : '(min-width:768px) 310px, 100vw'} className="transition duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-lg font-bold text-white md:text-xl">{p.name}</p>
                <p className="text-sm text-white/70">{p.city}, {p.uf}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ REDE */
export function Network() {
  return (
    <Section tone="light" labelledBy="rede-t">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeader id="rede-t" eyebrow="A rede" title="Presente do Sul ao Nordeste, desde 2021." lead="A rede da Eletrix cresce por onde há rotina de verdade: o prédio onde você trabalha, o hotel onde se hospeda, a garagem onde mora." />
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
              {site.stats.map((s) => (
                <div key={s.label} data-reveal className="border-l-2 border-brand-500 pl-5">
                  <dd className="font-display text-[2.5rem] font-extrabold leading-none tracking-tight text-fg"><Counter value={s.value} prefix={s.prefix} suffix={s.suffix} /></dd>
                  <dt className="mt-2 text-fg-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-fg-muted">Até hoje, nenhuma estação foi desinstalada por falta de manutenção ou de suporte.</p>
            <div className="mt-8"><Button href="/estacoes/" variant="dark">Ver o mapa de estações</Button></div>
          </div>
          <div data-reveal><NetworkPreview /></div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ POR QUE */
export function Why() {
  return (
    <Section tone="paper" labelledBy="why-t">
      <Container>
        <SectionHeader id="why-t" eyebrow="Por que a Eletrix" title="Padrão, operação e confiança." lead="Não disputamos o título de maior rede em número de pontos. Disputamos o padrão de serviço que um empreendimento AAA espera." />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyEletrix.map((w, i) => (
            <li key={w.title} data-reveal style={{ ['--d' as string]: `${(i % 3) * 70}ms` }} className="card p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink-900 text-brand-400"><Icon name={w.icon as IconName} size={22} /></span>
              <h3 className="mt-5 font-display text-[1.15rem] font-bold">{w.title}</h3>
              <p className="mt-2 text-[0.97rem] text-fg-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ TROCA */
export function SwitchOperator() {
  return (
    <Section tone="ink" tight labelledBy="troca-t">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div data-reveal>
            <p className="eyebrow mb-4">Troca de operador</p>
            <h2 id="troca-t" className="text-h2">Já tem carregadores no prédio? Assumimos a operação e regularizamos.</h2>
            <p className="mt-5 max-w-2xl text-lead text-fg-muted">
              Carregadores parados, suporte que não responde ou instalação fora da IT-41? A Eletrix substitui os equipamentos, adequa tudo à norma e opera, com reembolso da energia e repasse ao prédio. Mais de 50 estações já migraram para a Eletrix nos últimos meses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/troca-de-operador/" size="lg">Como funciona a troca</Button>
              <Button href={whatsappLink(wa.troca)} variant="onDark" size="lg" icon="whatsapp">Falar no WhatsApp</Button>
            </div>
          </div>
          <div data-reveal className="card p-7">
            <p className="font-display text-lg font-bold">Em muitos casos, sem custo para o condomínio.</p>
            <p className="mt-2 text-sm text-fg-muted">As condições são avaliadas por empreendimento.</p>
            <CheckList className="mt-6" items={['Equipamentos substituídos', 'Adequação à IT-41', 'Suporte 24 horas', 'Reembolso da energia e repasse ao prédio']} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ APP */
export function AppSection() {
  return (
    <Section tone="light" labelledBy="app-t" className="overflow-hidden">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal className="order-2 lg:order-1">
            <p className="eyebrow mb-4">App Eletrix</p>
            <h2 id="app-t" className="text-h2">Encontre, recarregue e pague pelo celular.</h2>
            <p className="mt-5 max-w-xl text-lead text-fg-muted">No app, você localiza as estações no mapa, inicia e acompanha a recarga e paga com cartão de crédito ou saldo em carteira. Para iOS e Android, com nota 4,8 na App Store.</p>
            <CheckList className="mt-6" items={['Mapa com as estações da rede', 'Início e acompanhamento da recarga', 'Pagamento por cartão de crédito ou carteira']} />
            <div className="mt-8"><StoreBadges /></div>
            <div className="mt-6"><Button href="/app/" variant="ghost">Saiba mais sobre o app</Button></div>
          </div>
          <div data-reveal className="relative order-1 mx-auto w-[min(300px,70%)] lg:order-2">
            <div className="absolute -inset-10 rounded-full bg-brand-500/15 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.4rem] border-[6px] border-ink-900 bg-ink-900 shadow-lift">
              <Picture name="app-mapa" alt="Tela do app Eletrix com o mapa de estações de recarga em São Paulo" sizes="300px" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ DEPOIMENTOS */
export function Testimonials() {
  if (!site.flags.showPlaceholderTestimonials) return null;
  return (
    <Section tone="dark" labelledBy="dep-t">
      <Container>
        <SectionHeader id="dep-t" eyebrow="Depoimentos" title="O que muda quando a operação funciona." />
        {/* TODO: depoimentos provisórios (placeholder: true). Substituir por reais antes do lançamento oficial. */}
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={i} data-reveal style={{ ['--d' as string]: `${i * 80}ms` }}>
              <figure className="card flex h-full flex-col p-7" data-placeholder={t.placeholder}>
                <span aria-hidden="true" className="font-display text-5xl leading-none text-brand-500">“</span>
                <blockquote className="mt-2 flex-1 text-[1.02rem] leading-relaxed text-white/90">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4 text-sm text-muted-dark">{t.role}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ IMPRENSA */
export function PressSection() {
  return (
    <Section tone="light" labelledBy="imp-t">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader id="imp-t" eyebrow="Na imprensa" title="A Eletrix no Estadão." />
          <Button href="/imprensa/" variant="secondary">Ver imprensa</Button>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {press.map((p, i) => (
            <li key={p.slug} data-reveal style={{ ['--d' as string]: `${i * 80}ms` }}>
              <Link href="/imprensa/" className="card group flex h-full flex-col overflow-hidden transition hover:shadow-card">
                <div className="aspect-[16/9] overflow-hidden bg-paper">
                  <Picture name={p.image} alt={p.imageAlt} fill sizes="(min-width:768px) 600px, 100vw" className="transition duration-500 group-hover:scale-[1.02]" />
                </div>
                <div className="p-6">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-accent">{p.outlet} {p.section} · {p.year}</p>
                  <h3 className="mt-2 font-display text-xl font-bold leading-snug">{p.title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ GUIAS */
export function GuidesTeaser() {
  const pick = [guides[0], guides[1], guides[2]];
  return (
    <Section tone="paper" labelledBy="guias-t">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader id="guias-t" eyebrow="Guias" title="Conteúdo que resolve a dúvida de assembleia." />
          <Button href="/guias/" variant="secondary">Todos os guias</Button>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {pick.map((g, i) => (
            <li key={g.slug} data-reveal style={{ ['--d' as string]: `${i * 80}ms` }}>
              <Link href={g.href} className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-card">
                <div className="aspect-[16/10] overflow-hidden"><Picture name={g.image} alt={g.imageAlt} fill sizes="(min-width:768px) 400px, 100vw" className="transition duration-500 group-hover:scale-[1.03]" /></div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent">{g.kicker} · {g.minutes} min</p>
                  <h3 className="mt-2 flex-1 font-display text-lg font-bold leading-snug">{g.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">Ler guia <Icon name="arrowRight" size={16} className="transition group-hover:translate-x-0.5" /></span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
