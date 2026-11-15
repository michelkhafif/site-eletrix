import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { RelatedLinks } from '@/components/sections/Blocks';
import { CTABand } from '@/components/sections/CTABand';
import { Icon } from '@/components/ui/Icon';
import { Picture } from '@/components/ui/Picture';
import { guides } from '@/data/guides';
import { wa } from '@/data/whatsapp';

const PATH = '/guias/';
export const metadata = pageMeta(PATH);

export default function GuidesIndex() {
  const [first, ...rest] = guides;
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Guias', href: PATH }]}
        eyebrow="Guias Eletrix"
        title="Guias sobre recarga de carro elétrico em prédios e condomínios."
        lead="Respostas claras para as dúvidas que aparecem em toda assembleia: norma, lei, custo, potência e cobrança de energia. Escritos pelo time técnico da Eletrix, com os números e a norma na mão."
        bg={{ name: 'pinheiros-one-aerea', position: '50% 30%' }}
      />

      <Band tone="light" id="lista" eyebrow="Leia primeiro" title="Cinco guias para decidir com segurança.">
        <Link href={first.href} className="card group grid overflow-hidden transition hover:shadow-card md:grid-cols-2">
          <div className="aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[320px]"><Picture name={first.image} alt={first.imageAlt} fill sizes="(min-width:768px) 600px, 100vw" className="transition duration-500 group-hover:scale-[1.03]" /></div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-accent">{first.kicker} · {first.minutes} min de leitura</p>
            <h2 className="mt-3 text-h3 !text-[1.7rem]">{first.title}</h2>
            <p className="mt-3 text-fg-muted">{first.summary}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-accent">Ler guia <Icon name="arrowRight" size={18} className="transition group-hover:translate-x-0.5" /></span>
          </div>
        </Link>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((g, i) => (
            <li key={g.slug} data-reveal style={{ ['--d' as string]: `${(i % 2) * 70}ms` }}>
              <Link href={g.href} className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-card sm:flex-row">
                <div className="aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-2/5"><Picture name={g.image} alt={g.imageAlt} fill sizes="(min-width:640px) 240px, 100vw" className="transition duration-500 group-hover:scale-[1.04]" /></div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent">{g.kicker} · {g.minutes} min</p>
                  <h3 className="mt-2 flex-1 font-display text-[1.1rem] font-bold leading-snug">{g.title}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{g.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="paper" id="solucoes" eyebrow="Do guia à prática" title="Quando a leitura vira projeto.">
        <RelatedLinks items={[
          { href: '/condominios/', kicker: 'Síndicos', title: 'Para condomínios', text: 'Medir, preparar, controlar e regularizar.' },
          { href: '/instalacao-carregador-residencial/', kicker: 'Moradores', title: 'Instalação na vaga', text: 'Visita técnica gratuita.' },
          { href: '/perguntas-frequentes/', kicker: 'Dúvidas', title: 'Perguntas frequentes', text: 'Respostas rápidas por público.' },
        ]} />
      </Band>
      <CTABand title="Ficou com alguma dúvida?" text="O time técnico responde no WhatsApp, sem compromisso." whatsappMessage={wa.geral} bg="pinheiros-one-fachada" />
    </>
  );
}
