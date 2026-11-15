import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl, whatsappLink } from '@/config/site';
import { orgId } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { CheckList, CompareTable, Callout, RelatedLinks } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { CTABand } from '@/components/sections/CTABand';
import { Button } from '@/components/ui/Button';
import { chargers, chargerNote } from '@/data/chargers';
import { faqs } from '@/data/faqs';
import { wa } from '@/data/whatsapp';

const PATH = '/carregadores/';
export const metadata = pageMeta(PATH);

const productLd = chargers.map((c) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: c.fullName,
  brand: { '@type': 'Brand', name: c.brand },
  description: c.pitch,
  category: 'Carregador de veículo elétrico (wallbox)',
  seller: { '@id': orgId },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'BRL',
    price: String(c.price),
    availability: 'https://schema.org/InStock',
    url: absoluteUrl(PATH),
    seller: { '@id': orgId },
    warranty: undefined,
  },
  additionalProperty: [{ '@type': 'PropertyValue', name: 'Garantia Eletrix', value: '2 anos' }, { '@type': 'PropertyValue', name: 'Potência', value: c.model.includes('7,3') ? '7,3 kW' : '7,4 kW' }],
}));

export default function ChargersPage() {
  return (
    <>
      {productLd.map((p) => <JsonLd key={p.name} data={p} />)}
      <PageHero
        crumbs={[{ name: 'Carregadores', href: PATH }]}
        eyebrow="Linha residencial · 7,4 kW"
        title="Carregadores veiculares 7,4 kW com garantia Eletrix."
        lead="Três wallboxes das marcas WEG, Intelbras e Livoltek para recarregar em casa ou no condomínio. Conector Tipo 2, ideal para recarga noturna e 2 anos de garantia Eletrix em todos os modelos."
        actions={<>
          <Button href={whatsappLink(wa.carregador)} icon="whatsapp" size="lg">Comprar pelo WhatsApp</Button>
          <Button href="#comparativo" variant="onDark" size="lg" icon="chevronDown">Comparar modelos</Button>
        </>}
        chips={['A partir de R$ 2.799', '2 anos de garantia Eletrix', 'Conector Tipo 2', 'Ideal para recarga noturna']}
        image={{ name: 'case-3', alt: 'Carregador Eletrix instalado em parede de garagem', position: '50% 55%' }}
      />

      <Band tone="light" id="modelos" eyebrow="Os três modelos" title="Escolha pelo que importa para você." lead="Todos têm 7,4 kW, conector Tipo 2 e 2 anos de garantia Eletrix. O que muda é o perfil de uso e o investimento.">
        <ul className="grid gap-6 lg:grid-cols-3">
          {chargers.map((c, i) => (
            <li key={c.slug} data-reveal style={{ ['--d' as string]: `${i * 80}ms` }} className="card flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-7 pt-7">
                <span className="rounded-full bg-ink-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-400">{c.tag}</span>
                <span className="font-display text-sm font-bold text-fg-muted">{c.brand}</span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-[1.6rem] font-extrabold leading-tight tracking-tight">{c.brand}<br />{c.model}</h3>
                <p className="mt-3 text-fg-muted">{c.pitch}</p>
                <div className="mt-6 border-y border-hair py-5">
                  <p className="text-sm text-fg-muted line-through">de {c.oldPriceLabel}</p>
                  <p className="font-display text-[2.4rem] font-extrabold leading-none tracking-tight tnum">{c.priceLabel}</p>
                </div>
                <CheckList className="mt-6 flex-1 text-[0.95rem]" items={c.specs} />
                <p className="mt-6 rounded-xl bg-paper p-4 text-[0.92rem] text-fg-muted"><strong className="text-fg">Escolha se:</strong> {c.chooseIf}</p>
                <div className="mt-6"><Button href={whatsappLink(`Olá! Vim pelo site e quero comprar o carregador ${c.fullName}. Pode me passar os detalhes e a visita técnica?`)} icon="whatsapp" className="w-full">Quero este modelo</Button></div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-fg-muted">{chargerNote} Imagens ilustrativas.</p>
      </Band>

      <Band tone="paper" id="comparativo" eyebrow="Comparativo rápido" title="Lado a lado.">
        <CompareTable
          caption="Comparativo entre os três carregadores residenciais"
          head={['', ...chargers.map((c) => c.fullName)]}
          rows={[
            ['Preço do equipamento', ...chargers.map((c) => c.priceLabel)],
            ['Cabo', ...chargers.map((c) => c.compare.cabo)],
            ['Proteção contra água e poeira', ...chargers.map((c) => c.compare.protecao)],
            ['Conectividade', ...chargers.map((c) => c.compare.conectividade)],
            ['Liberação da recarga', ...chargers.map((c) => c.compare.liberacao)],
            ['Display', ...chargers.map((c) => c.compare.display)],
            ['Garantia Eletrix', ...chargers.map(() => '2 anos')],
          ]}
        />
      </Band>

      <Band tone="light" id="qual" eyebrow="Qual é o ideal para você?" title="Três perguntas, uma resposta.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { q: 'Quer o essencial pelo menor investimento?', a: 'Livoltek ATOM 7,3 kW', d: 'App, Wi-Fi, Bluetooth e Ethernet, botão de emergência e cabo de 5 m.' },
            { q: 'Quer a marca mais reconhecida do Brasil?', a: 'WEG WEMOB Wall 7,4 kW', d: 'Confiabilidade nacional, cabo longo de 5 m e IP65 para chuva, sol e poeira.' },
            { q: 'Quer acompanhar tudo e ter mais conexões?', a: 'Intelbras Business 7,4 kW', d: 'Display LCD, 4G, Wi-Fi, Ethernet e Bluetooth, com IDR e disjuntor internos.' },
          ].map((x) => (
            <div key={x.a} data-reveal className="card p-7">
              <p className="font-display text-[1.1rem] font-bold">{x.q}</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-accent">Vá de</p>
              <p className="font-display text-xl font-extrabold">{x.a}</p>
              <p className="mt-2 text-fg-muted">{x.d}</p>
            </div>
          ))}
        </div>
      </Band>

      <Band tone="dark" id="instalacao" eyebrow="Compra e instalação" title="O carregador é só uma parte. A Eletrix cuida do resto." lead="O preço dos carregadores é do equipamento. A instalação é orçada depois da visita técnica gratuita, porque a distância entre a vaga e o medidor muda de caso para caso.">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div data-reveal>
            <CheckList items={['Visita técnica gratuita antes de fechar', 'Instalação adequada à IT-41, com ART inclusa', 'Proteção contra choque, sobretensão e sobrecorrente', 'Suporte 24 horas, garantia da instalação e do equipamento', 'Desconto na instalação para moradores de prédios com infraestrutura seca da Eletrix']} />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/instalacao-carregador-residencial/" size="lg">Ver instalação na vaga</Button>
              <Button href="/guias/qual-potencia-carregador-carro-eletrico/" variant="onDark" size="lg">Por que 7,4 kW</Button>
            </div>
          </div>
          <div data-reveal><Callout icon="info" title="Por que 7,4 kW">Praticamente todos os veículos elétricos vendidos no Brasil limitam a recarga AC a 7,4 kW. Um carregador de 11 kW ou 22 kW em AC não carrega mais rápido e encarece a infraestrutura.</Callout></div>
        </div>
      </Band>

      <FAQ items={faqs.carregadores} />
      <Band tone="light" id="continue" eyebrow="Continue por aqui" title="Antes de comprar, vale ler.">
        <RelatedLinks items={[
          { href: '/instalacao-carregador-residencial/', kicker: 'Morador', title: 'Instalação na vaga', text: 'Visita técnica gratuita.' },
          { href: '/guias/quanto-custa-instalar-carregador-carro-eletrico/', kicker: 'Guia', title: 'Quanto custa instalar', text: 'O que compõe o preço total.' },
          { href: '/guias/lei-carregador-condominio-sao-paulo/', kicker: 'Guia', title: 'Lei 18.403/2026', text: 'O que o condomínio pode exigir.' },
        ]} />
      </Band>
      <CTABand title="Quer ajuda para escolher o modelo?" text="Conte o seu caso. O time indica o carregador ideal e agenda a visita técnica gratuita." whatsappMessage={wa.carregador} bg="case-8" />
    </>
  );
}
