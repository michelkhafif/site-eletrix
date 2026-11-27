import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Counter } from '@/components/ui/Counter';
import { LogoMarquee } from './LogoMarquee';
import { HeroScene } from './HeroScene';
import { site, withBase } from '@/config/site';
import { contactHref } from '@/data/services';

/* ------------------------------------------------------------------ HERO */
export function Hero() {
  return (
    <section data-tone="dark" aria-labelledby="hero-t" className="hero relative isolate flex flex-col overflow-hidden md:justify-center">
      <div aria-hidden="true" className="hero-ambient -z-10" style={{ backgroundImage: `url(${withBase('/images/hero-ambiente.webp')})` }} />
      <div aria-hidden="true" className="hero-tint -z-10" />
      {/* foto real do carro carregando numa estação Eletrix, com a luz contornando os objetos */}
      <HeroScene />

      <Container className="pointer-events-none relative z-10 -mt-[88px] pb-8 md:mt-0 md:pb-14 md:pt-[calc(var(--header-h)+32px)]">
        <div className="pointer-events-auto md:max-w-[54%] lg:max-w-[640px] xl:max-w-[700px]">
          <h1 id="hero-t" className="max-w-[18ch] text-[clamp(1.85rem,0.45rem+6.4vw,2.9rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-white md:max-w-none md:text-[clamp(2.4rem,0.8rem+3.4vw,4.2rem)] md:leading-[1.05]">
            Rede de recarga para carros elétricos, do prédio à sua vaga.
          </h1>
          <div className="mt-6 grid max-w-xl grid-cols-2 gap-3 md:mt-9">
            <Link href={contactHref({ perfil: 'empreendimento' })} className="group flex min-h-[3.5rem] flex-col justify-center rounded-2xl bg-brand-500 px-4 py-3 text-ink-950 shadow-[0_14px_40px_-14px_rgba(16,183,255,.85)] transition hover:bg-brand-400 active:translate-y-px md:px-5 md:py-4">
              <span className="font-display text-[0.88rem] font-bold leading-tight min-[380px]:text-[0.98rem] md:text-base lg:text-lg">Tenho um empreendimento</span>
              <span className="mt-0.5 hidden text-sm text-ink-950/75 lg:block">Hub, Rent, troca de operador</span>
            </Link>
            <Link href={contactHref({ interesse: 'instalacao-vaga' })} className="group flex min-h-[3.5rem] flex-col justify-center rounded-2xl border border-brand-400 bg-ink-900/80 px-4 py-3 text-white transition hover:bg-brand-500/25 active:translate-y-px md:px-5 md:py-4">
              <span className="font-display text-[0.88rem] font-bold leading-tight min-[380px]:text-[0.98rem] md:text-base lg:text-lg">Carregar na minha vaga</span>
              <span className="mt-0.5 hidden text-sm text-white/75 lg:block">Visita técnica gratuita</span>
            </Link>
          </div>
          <p className="mt-4 text-[0.95rem] text-white/80">
            Precisa se adequar à norma? <span className="sm:hidden"><br /></span><Link href={contactHref({ interesse: 'adequacao-it-41' })} className="font-semibold text-brand-400 underline underline-offset-4 hover:text-brand-300">Adequação à norma IT-41</Link>
          </p>
          <dl className="mt-7 grid max-w-2xl grid-cols-4 gap-3 border-t border-white/15 pt-5 sm:gap-6 md:mt-11 md:pt-6">
            {site.stats.map((s, i) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-1.5 text-[0.72rem] leading-tight text-white/75 sm:text-sm">{s.label}</dt>
                <dd className="order-1 whitespace-nowrap font-display text-[1.55rem] font-extrabold leading-none tracking-tight text-white sm:text-4xl md:text-[1.9rem] lg:text-[2.35rem]">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} delay={500 + i * 220} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ LOGOS */
export function LogoStrip() {
  return (
    <Section tone="light" tight className="!py-9 md:!py-12">
      <Container>
        <p className="mb-5 text-center text-[0.95rem] font-medium text-fg-muted">Quem já carrega com a Eletrix</p>
        <LogoMarquee tone="light" />
      </Container>
    </Section>
  );
}
