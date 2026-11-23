import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band, Prose } from '@/components/sections/Band';
import { Steps, FeatureGrid, CheckList, Callout, Split, MediaFrame, RelatedLinks, PriceCard } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { DuvidasSobre } from '@/components/sections/DuvidasSobre';
import { CTABand } from '@/components/sections/CTABand';
import { Button } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { Container, Section } from '@/components/ui/Section';
import { faqs } from '@/data/faqs';
import { wa } from '@/data/whatsapp';
import { whatsappLink } from '@/config/site';

const PATH = '/laudo-de-demanda/';
export const metadata = pageMeta(PATH);

const days = ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'];

export default function LaudoPage() {
  return (
    <>
      <JsonLd data={serviceLd({ name: 'Laudo de demanda de energia para carregadores de veículos elétricos', description: 'Medição de 7 dias no quadro geral e relatório técnico que indica quantos carregadores o prédio comporta, com que potência e como controlar a carga.', path: PATH, price: '2799', priceDescription: 'A partir de R$ 2.799' })} />
      <PageHero
        crumbs={[{ name: 'Laudo de demanda', href: PATH }]}
        eyebrow="02 · Medir"
        title="Laudo de demanda: saiba exatamente o que o seu prédio aguenta."
        lead="Um equipamento registrador mede o consumo real do prédio durante 7 dias. O relatório técnico mostra quantos carregadores cabem, com que potência e como a carga deve ser controlada. A decisão deixa de ser estimativa."
        actions={<>
          <Button href={whatsappLink(wa.laudo)} icon="whatsapp" size="lg">Contratar o laudo</Button>
          <Button href="#como-funciona" variant="onDark" size="lg" icon="chevronDown">Como funciona</Button>
        </>}
        chips={['A partir de R$ 2.799', '7 dias de medição', 'Relatório técnico']}
        image={{ name: 'hub-garagem', alt: 'Garagem com carregadores Eletrix instalados em fila, ao lado das vagas', position: '50% 50%', ratio: 'landscape' }}
      />

      <Band tone="light" id="o-que-e" eyebrow="O que é" title="Medir antes de decidir." lead="O laudo de demanda é o primeiro passo do caminho do síndico: Medir, Preparar, Controlar, Regularizar.">
        <Split media={<MediaFrame className="aspect-[4/3]"><Picture name="case-8" alt="Garagem com carregadores Eletrix instalados em parede verde, ao lado das vagas" fill sizes="(min-width:1024px) 560px, 100vw" /></MediaFrame>}>
          <Prose>
            <p>Instalar carregadores sem saber a capacidade do prédio é apostar. De um lado, o medo de sobrecarga e de multa por ultrapassar a demanda contratada. Do outro, a pressão dos moradores. O laudo resolve o impasse com um número: o que o seu edifício, de fato, aguenta.</p>
            <p>A Eletrix instala um <strong>equipamento registrador na entrada de energia ou no quadro geral</strong> e mede o consumo durante <strong>7 dias</strong>, uma semana completa, para captar a rotina real do prédio: dias úteis, fim de semana e os picos de consumo.</p>
            <p>A decisão passa a ser baseada no <strong>consumo real</strong> do edifício, não em estimativas.</p>
          </Prose>
        </Split>
      </Band>

      <Section tone="paper" id="como-funciona" labelledBy="cf-t">
        <Container>
          <header data-reveal className="max-w-3xl">
            <p className="eyebrow mb-4">Como funciona</p>
            <h2 id="cf-t" className="text-h2">Sete dias de medição, um relatório.</h2>
          </header>
          <div data-reveal className="mt-10 rounded-3xl border border-hair bg-card p-6 md:p-8">
            <p className="text-sm font-semibold text-accent">Medição contínua no quadro geral</p>
            <ol className="mt-5 grid grid-cols-7 gap-2 md:gap-3">
              {days.map((d, i) => (
                <li key={d} className="text-center">
                  <div className="flex h-24 items-end justify-center gap-0.5 rounded-xl bg-paper px-1 pb-2 md:h-28" aria-hidden="true">
                    {[0.3, 0.5, 0.8, 0.55, 0.9, 0.5, 0.35].map((h, j) => (
                      <span key={j} className="w-full max-w-[6px] rounded-t bg-brand-500/70" style={{ height: `${Math.round((h * (0.6 + ((i * 7 + j * 3) % 5) / 10)) * 100)}%` }} />
                    ))}
                  </div>
                  <p className="mt-2 text-[0.72rem] font-medium text-fg-muted md:text-sm">{d}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-fg-muted">Ilustração conceitual do registro de consumo ao longo da semana.</p>
          </div>
          <div className="mt-8">
            <Steps columns={4} items={[
              { title: 'Instalação do registrador', text: 'O equipamento é instalado na entrada de energia ou no quadro geral.' },
              { title: 'Medição de 7 dias', text: 'Uma semana completa de consumo real, com picos e vales registrados.' },
              { title: 'Análise técnica', text: 'A equipe analisa o consumo e os picos, e simula a entrada dos carregadores.' },
              { title: 'Relatório entregue', text: 'O prédio recebe o relatório técnico com as conclusões e as recomendações.' },
            ]} />
          </div>
        </Container>
      </Section>

      <Band tone="light" id="relatorio" eyebrow="O que o relatório responde" title="Três respostas que a assembleia precisa.">
        <FeatureGrid items={[
          { icon: 'car', title: 'Quantos carregadores cabem', text: 'O número que o prédio comporta hoje, sem passar do limite seguro.' },
          { icon: 'zap', title: 'Com que potência', text: 'A potência que cada carregador pode ter, de acordo com a folga real do prédio.' },
          { icon: 'sliders', title: 'Como controlar a carga', text: <>Se o controle de demanda é necessário para ter mais carregadores. <Link href="/controle-de-demanda/">Veja como funciona</Link>.</> },
        ]} />
        <div className="mt-8"><Callout icon="file" title="Também serve à IT-41">A norma pede estudo de demanda e curva de carga para a ART. O laudo é a base técnica desse estudo.</Callout></div>
      </Band>

      <Band tone="paper" id="preco" eyebrow="Quanto custa" title="Preço público, sem surpresa.">
        <div className="grid gap-6 md:grid-cols-2">
          <PriceCard highlight label="Laudo de demanda" price="A partir de R$ 2.799" note="O valor final depende do porte e das condições do local." items={['Equipamento registrador instalado no quadro geral', 'Medição de 7 dias', 'Análise do consumo e dos picos', 'Relatório técnico entregue ao prédio']} cta={<Button href={whatsappLink(wa.laudo)} icon="whatsapp">Contratar o laudo</Button>} />
          <div data-reveal className="card p-7">
            <p className="text-sm font-semibold text-accent">Contrate só o que precisa</p>
            <p className="mt-3 font-display text-xl font-bold">O laudo é o primeiro passo. Os próximos são opcionais.</p>
            <p className="mt-2 text-fg-muted">Dá para contratar só o laudo ou seguir para a infraestrutura seca, o controle de demanda e a adequação à IT-41. Um só parceiro, do laudo à regularização.</p>
            <ul className="mt-5 space-y-2 text-[0.97rem]">
              <li><Link href="/infraestrutura-seca/" className="font-semibold text-accent underline underline-offset-4">03 Infraestrutura seca</Link> (Preparar)</li>
              <li><Link href="/controle-de-demanda/" className="font-semibold text-accent underline underline-offset-4">04 Controle de demanda</Link> (Controlar)</li>
              <li><Link href="/adequacao-it-41/" className="font-semibold text-accent underline underline-offset-4">05 Adequação IT-41</Link> (Regularizar)</li>
            </ul>
          </div>
        </div>
      </Band>

      <Band tone="light" id="quando" eyebrow="Quando fazer" title="Quando o laudo faz mais diferença." tight>
        <CheckList className="max-w-3xl" items={['Mais de um morador quer carregar, e o prédio nunca mediu a carga.', 'A assembleia trava por medo de sobrecarga ou de aumento na demanda contratada.', 'O prédio vai receber carregadores coletivos (Hub ou Rent) e precisa dimensionar a infraestrutura.', 'A renovação do AVCB se aproxima e a IT-41 pede estudo de demanda e curva de carga.']} />
      </Band>

      <FAQ items={faqs.laudo} />

      <DuvidasSobre path={PATH} />
      <Band tone="light" id="continue" eyebrow="Continue por aqui" title="Depois do laudo.">
        <RelatedLinks items={[
          { href: '/infraestrutura-seca/', kicker: '03 · Preparar', title: 'Infraestrutura seca', text: 'Eletrocalhas até as vagas e padrão único.' },
          { href: '/controle-de-demanda/', kicker: '04 · Controlar', title: 'Controle de demanda', text: 'Mais carregadores, sem sobrecarga.' },
          { href: '/condominios/', kicker: 'Para síndicos', title: 'O caminho completo', text: 'Medir, preparar, controlar e regularizar.' },
        ]} />
      </Band>
      <CTABand title="Descubra o que o seu prédio aguenta." text="Contrate o laudo de demanda e leve números, não estimativas, para a assembleia." whatsappMessage={wa.laudo} bg="faria-lima-financial-center" />
    </>
  );
}
