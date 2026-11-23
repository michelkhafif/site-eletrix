import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Picture } from '@/components/ui/Picture';
import { Counter } from '@/components/ui/Counter';
import { LogoMarquee } from './LogoMarquee';
import { site } from '@/config/site';

/* ------------------------------------------------------------------ HERO */
export function Hero() {
  return (
    <section data-tone="dark" aria-labelledby="hero-t" className="relative isolate flex min-h-[min(calc(100svh-56px),880px)] flex-col justify-end overflow-hidden">
      {/* foto real do carro carregando numa estação Eletrix, escurecida */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Picture name="totem-orelhao" alt="" priority fill sizes="(max-width: 767px) 55vw, 100vw" className="object-[50%_58%] md:object-[50%_74%]" />
        <div className="absolute inset-0 bg-ink-950/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/50" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink-950/90 via-ink-950/55 to-transparent md:block" />
        {/* LED azul: um feixe de luz lento atravessa a imagem, como corrente passando */}
        <div className="absolute inset-0 overflow-hidden"><div className="led-beam" /></div>
        <div className="led-glow absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
      </div>

      <Container className="relative pb-8 pt-[calc(var(--header-h)+56px)] md:pb-12 md:pt-[calc(var(--header-h)+80px)]">
        <h1 id="hero-t" className="max-w-[18ch] text-[clamp(2.05rem,1.2rem+4.6vw,4.75rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white md:max-w-[20ch]">
          Rede de recarga para carros elétricos, do prédio à sua vaga.
        </h1>
        <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 md:mt-10">
          <Link href="/empresas/" className="group flex min-h-[3.5rem] flex-col justify-center rounded-2xl bg-brand-500 px-4 py-3 text-ink-950 shadow-[0_14px_40px_-14px_rgba(16,183,255,.85)] transition hover:bg-brand-400 active:translate-y-px md:px-5 md:py-4">
            <span className="font-display text-[0.88rem] font-bold leading-tight min-[380px]:text-[0.98rem] md:text-lg">Tenho um empreendimento</span>
            <span className="mt-0.5 hidden text-sm text-ink-950/75 md:block">Hub, Rent, troca de operador</span>
          </Link>
          <Link href="/instalacao-carregador-residencial/" className="group flex min-h-[3.5rem] flex-col justify-center rounded-2xl border border-brand-400 bg-ink-900/80 px-4 py-3 text-white transition hover:bg-brand-500/25 active:translate-y-px md:px-5 md:py-4">
            <span className="font-display text-[0.88rem] font-bold leading-tight min-[380px]:text-[0.98rem] md:text-lg">Quero carregar na minha vaga</span>
            <span className="mt-0.5 hidden text-sm text-white/75 md:block">Visita técnica gratuita</span>
          </Link>
        </div>
        <p className="mt-4 text-[0.95rem] text-white/80">
          Síndico ou gestor? <Link href="/condominios/" className="font-semibold text-brand-400 underline underline-offset-4 hover:text-brand-300">Veja o caminho do laudo à IT-41.</Link>
        </p>
        <dl className="mt-9 grid max-w-2xl grid-cols-4 gap-3 border-t border-white/15 pt-6 sm:gap-8 md:mt-12">
          {site.stats.map((s, i) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 mt-1.5 text-[0.72rem] leading-tight text-white/75 sm:text-sm">{s.label}</dt>
              <dd className="order-1 font-display text-[1.65rem] font-extrabold leading-none tracking-tight text-white sm:text-4xl md:text-[2.5rem]">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} delay={500 + i * 220} />
              </dd>
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
    <Section tone="light" tight className="!py-9 md:!py-12">
      <Container>
        <p className="mb-5 text-center text-[0.95rem] font-medium text-fg-muted">Quem já carrega com a Eletrix</p>
        <LogoMarquee tone="light" />
      </Container>
    </Section>
  );
}
