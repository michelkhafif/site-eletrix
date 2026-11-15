import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { CheckList, RelatedLinks } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { CTABand } from '@/components/sections/CTABand';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Section';
import { bySlug, extraSolutions } from '@/data/solutions';
import { cities, type City } from '@/data/cities';
import { stations } from '@/lib/stations';
import { whatsappLink } from '@/config/site';
import { wa } from '@/data/whatsapp';

export function CityPage({ city }: { city: City }) {
  const places = stations.filter((s) => city.stationCities.includes(s.city));
  const byCity = city.stationCities.map((c) => ({ c, list: places.filter((p) => p.city === c) })).filter((x) => x.list.length);
  const focus = city.focus.map((s) => bySlug(s));
  const others = cities.filter((c) => c.slug !== city.slug);
  return (
    <>
      <JsonLd data={serviceLd({ name: `Recarga de veículos elétricos em ${city.name}`, description: city.lead, path: city.path, areaServed: city.name })} />
      <PageHero
        crumbs={[{ name: city.name, href: city.path }]}
        eyebrow={city.eyebrow}
        title={city.h1}
        lead={city.lead}
        actions={<>
          <Button href={whatsappLink(city.ctaMessage)} icon="whatsapp" size="lg">Falar no WhatsApp</Button>
          <Button href="/estacoes/" variant="onDark" size="lg">Ver o mapa de estações</Button>
        </>}
        bg={{ name: city.heroImage, position: '50% 40%' }}
      />

      {city.sections.map((s, i) => (
        <Band key={s.id} tone={i % 2 === 0 ? 'light' : 'paper'} id={s.id} eyebrow={i === 0 ? 'Regras e operação' : 'Na prática'} title={s.title}>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="prose-e max-w-3xl text-[1.05rem] leading-[1.8]">{s.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
            {s.bullets && <div data-reveal className="card p-7"><p className="mb-4 font-display font-bold">Por perfil</p><CheckList items={s.bullets} /></div>}
          </div>
        </Band>
      ))}

      <Band tone="dark" id="locais" eyebrow="Onde a Eletrix opera" title={`Alguns locais com estações em ${city.stationCities.length > 1 ? 'a região' : city.name}.`} lead="Nomes dos locais com estações em operação, sem endereço. Confira a disponibilidade no app.">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {byCity.map(({ c, list }) => (
            <div key={c}>
              <h3 className="font-display text-lg font-bold text-white">{c}</h3>
              <ul className="mt-3 space-y-1.5 text-[0.95rem] text-muted-dark">
                {list.slice(0, 14).map((s) => <li key={s.name}>{s.name}</li>)}
                {list.length > 14 && <li className="text-white/70">e outros locais no mapa</li>}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10"><Button href="/estacoes/" variant="onDark">Abrir o mapa interativo</Button></p>
      </Band>

      <Band tone="light" id="solucoes" eyebrow="Soluções" title={city.focusIntro}>
        <RelatedLinks items={focus.map((s) => ({ href: s.href, kicker: s.code, title: s.name, text: s.tagline }))} />
        <p className="mt-8 text-fg-muted">Também: {extraSolutions.map((e, i) => (<span key={e.slug}>{i > 0 && ', '}<Link href={e.href} className="font-semibold text-accent underline underline-offset-4">{e.name.toLowerCase()}</Link></span>))}.</p>
      </Band>

      <FAQ items={city.faq} tone="paper" />

      <Section tone="light" tight id="outras-cidades">
        <Container>
          <p className="eyebrow mb-4">Outras cidades</p>
          <ul className="flex flex-wrap gap-3">
            {others.map((c) => <li key={c.slug}><Button href={c.path} variant="secondary" size="sm">{c.name}</Button></li>)}
          </ul>
        </Container>
      </Section>
      <CTABand title={`Quer falar com o time sobre ${city.name}?`} text="Conte o seu caso. A Eletrix indica o melhor caminho e agenda a visita técnica." whatsappMessage={city.ctaMessage || wa.default} bg={city.heroImage} />
    </>
  );
}
