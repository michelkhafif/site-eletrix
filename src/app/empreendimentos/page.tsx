import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { RelatedLinks } from '@/components/sections/Blocks';
import { CTABand } from '@/components/sections/CTABand';
import { Button } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { FeaturedLogos } from '@/components/sections/LogoMarquee';
import { projects } from '@/data/projects';
import { wa } from '@/data/whatsapp';
import { whatsappLink } from '@/config/site';

const PATH = '/empreendimentos/';
export const metadata = pageMeta(PATH);

export default function ProjectsPage() {
  const featured = projects.slice(0, 4);
  const rest = projects.slice(4);
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Empreendimentos', href: PATH }]}
        eyebrow="Empreendimentos"
        title="Os empreendimentos que escolhem a Eletrix."
        lead="Edifícios corporativos de primeira linha, centros logísticos, hotéis e shoppings. Uma seleção de lugares onde a recarga é operada com o padrão que esses empreendimentos esperam."
        actions={<>
          <Button href={whatsappLink(wa.empreendimento)} icon="whatsapp" size="lg">Quero a Eletrix no meu empreendimento</Button>
          <Button href="/estacoes/" variant="onDark" size="lg">Ver o mapa de estações</Button>
        </>}
        bg={{ name: 'river-one-fim-de-tarde', position: '50% 40%' }}
      />

      <Band tone="light" id="destaques" eyebrow="Em destaque" title="Do Rio a São Paulo, a mesma operação.">
        <ul className="grid gap-5 md:grid-cols-2">
          {featured.map((p, i) => (
            <li key={p.slug} data-reveal style={{ ['--d' as string]: `${(i % 2) * 80}ms` }} className="group">
              <figure>
                <div className="relative aspect-[16/11] overflow-hidden rounded-3xl">
                  <Picture name={p.image} alt={p.alt} fill position={p.focus} sizes="(min-width:768px) 600px, 100vw" className="transition duration-700 group-hover:scale-[1.03]" />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-xl font-bold">{p.name}</span>
                  <span className="text-fg-muted">{p.city}, {p.uf}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="paper" id="mais" eyebrow="Mais empreendimentos" title="Corporativo, logístico e varejo.">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((p, i) => (
            <li key={p.slug} data-reveal style={{ ['--d' as string]: `${(i % 4) * 60}ms` }} className="group">
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Picture name={p.image} alt={p.alt} fill position={p.focus} sizes="(min-width:1024px) 290px, (min-width:640px) 45vw, 100vw" className="transition duration-700 group-hover:scale-[1.04]" />
                  {p.soon && <span className="absolute left-3 top-3 rounded-full bg-ink-950/85 px-3 py-1 text-xs font-semibold text-brand-400 backdrop-blur">Entrando em operação</span>}
                </div>
                <figcaption className="mt-3">
                  <span className="block font-display font-bold leading-snug">{p.name}</span>
                  <span className="block text-sm text-fg-muted">{p.city}, {p.uf} · {p.kind}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-sm text-fg-muted">Imagens dos empreendimentos usadas com autorização contratual. Imagens de projeto (render) identificam empreendimentos em fase de entrada em operação.</p>
      </Band>

      <Band tone="light" id="parceiros" eyebrow="Parceiros e clientes" title="Quem confia a recarga à Eletrix.">
        <FeaturedLogos tone="light" />
        <p className="mt-10 max-w-2xl text-fg-muted">Além destes, a rede inclui hotéis, estacionamentos, escolas e condomínios. Veja os pontos em operação no <Link href="/estacoes/" className="font-semibold text-accent underline underline-offset-4">mapa de estações</Link>.</p>
      </Band>

      <Band tone="paper" id="continue" eyebrow="Continue por aqui" title="O seu pode ser o próximo.">
        <RelatedLinks items={[
          { href: '/eletrix-hub/', kicker: '06', title: 'Eletrix Hub', text: 'Comodato por 36 meses, sem mensalidade.' },
          { href: '/troca-de-operador/', kicker: 'Migração', title: 'Troca de operador', text: 'Já tem carregadores? Assumimos e regularizamos.' },
          { href: '/empresas/', kicker: 'Empresas', title: 'Para empresas', text: 'Soluções por tipo de espaço.' },
        ]} />
      </Band>
      <CTABand title="Quer a Eletrix no seu empreendimento?" text="Agende a visita técnica. Avaliamos a demanda e apresentamos a proposta." whatsappMessage={wa.empreendimento} bg="aqwa-noite" />
    </>
  );
}
