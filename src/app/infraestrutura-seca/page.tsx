import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band, Prose } from '@/components/sections/Band';
import { Steps, FeatureGrid, CheckList, Callout, Split, MediaFrame, RelatedLinks, CompareTable } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { CTABand } from '@/components/sections/CTABand';
import { Button } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { faqs } from '@/data/faqs';
import { wa } from '@/data/whatsapp';
import { whatsappLink } from '@/config/site';

const PATH = '/infraestrutura-seca/';
export const metadata = pageMeta(PATH);

export default function InfraPage() {
  return (
    <>
      <JsonLd data={serviceLd({ name: 'Infraestrutura seca para carregadores de veículos elétricos em prédios', description: 'Eletrocalhas galvanizadas até as vagas, caminho único e organizado para os cabos, adequação dos pavimentos à IT-41, estudo de demanda e ART.', path: PATH })} />
      <PageHero
        crumbs={[{ name: 'Infraestrutura seca', href: PATH }]}
        eyebrow="03 · Preparar"
        title="Infraestrutura seca: um padrão único e seguro de recarga para todo o prédio."
        lead="Eletrocalhas levam um caminho único e organizado do centro de medição até as vagas. Cada morador instala depois, mais rápido e com desconto. E o prédio se despede dos “gatos” e das ligações improvisadas."
        actions={<>
          <Button href={whatsappLink(wa.infra)} icon="whatsapp" size="lg">Pedir orçamento</Button>
          <Button href="#etapas" variant="onDark" size="lg" icon="chevronDown">Ver as etapas</Button>
        </>}
        chips={['Eletrocalhas até as vagas', 'ART inclusa', 'Desconto ao morador']}
        image={{ name: 'case-8', alt: 'Garagem com parede verde e três carregadores Eletrix instalados lado a lado', position: '50% 50%' }}
      />

      <Band tone="light" id="o-que-e" eyebrow="O que é" title="O caminho pronto antes de o carro chegar." lead="Infraestrutura seca é a parte fixa da instalação: tudo o que não é cabo de morador nem carregador.">
        <Split media={<MediaFrame className="aspect-[4/3]"><Picture name="case-2" alt="Carregadores Eletrix numerados instalados em fila na parede da garagem" fill sizes="(min-width:1024px) 560px, 100vw" /></MediaFrame>}>
          <Prose>
            <p>A Eletrix instala <strong>eletrocalhas galvanizadas e perfuradas</strong> (por exemplo, de 150 × 50 mm) até as vagas, com um caminho único e organizado do centro de medição até a garagem. Quando é preciso, abrimos o furo de laje. Os pavimentos já saem adequados à IT-41, com estudo de demanda e ART.</p>
            <p>O <strong>cabeamento individual e os carregadores</strong> ficam para a fase de cada morador, no ritmo em que a frota elétrica do prédio cresce.</p>
            <p>O resultado é uma garagem limpa e padronizada, que escala sem retrabalho.</p>
          </Prose>
        </Split>
      </Band>

      <Band tone="paper" id="beneficios" eyebrow="Por que preparar" title="Organizar custa menos do que corrigir.">
        <FeatureGrid columns={4} items={[
          { icon: 'layers', title: 'Visual limpo e organizado', text: 'Cabos em eletrocalhas, não soltos pelo teto e pelos pilares.' },
          { icon: 'receipt', title: 'Menos custo no futuro', text: 'Com o caminho pronto, cada instalação custa menos do que custaria sem ele.' },
          { icon: 'clock', title: 'Agilidade para o morador', text: 'A instalação de cada vaga é mais rápida, porque o trabalho pesado já foi feito.' },
          { icon: 'chart', title: 'Escalável', text: 'O prédio acompanha o crescimento da frota elétrica sem refazer nada.' },
        ]} />
        <div className="mt-8"><Callout icon="home" title="O morador também ganha">Em prédios com infraestrutura seca da Eletrix, o morador tem <strong>desconto na instalação</strong> da própria vaga. Isso ajuda a levar a proposta à assembleia.</Callout></div>
      </Band>

      <Band tone="light" id="etapas" eyebrow="Etapas" title="Da aprovação à entrega com ART." lead="Cinco etapas, com o síndico acompanhando cada uma.">
        <Steps columns={3} items={[
          { title: 'Aprovação', text: 'Visita técnica, orçamento e aprovação pelo condomínio.' },
          { title: 'Projeto executivo', text: 'Desenhamos o trajeto das eletrocalhas e validamos com o condomínio antes de executar.' },
          { title: 'Execução', text: 'Instalação das eletrocalhas, furos de laje quando necessário e adequação dos pavimentos.' },
          { title: 'Vistoria final', text: 'Percorremos a obra com o síndico para conferir tudo.' },
          { title: 'Entrega com ART', text: 'Entregamos a obra com a documentação técnica e a ART.' },
        ]} />
      </Band>

      <Band tone="paper" id="comparativo" eyebrow="Com e sem infraestrutura" title="O que muda na prática.">
        <CompareTable caption="Prédio com e sem infraestrutura seca" head={['', 'Sem infraestrutura seca', 'Com infraestrutura seca da Eletrix']} rows={[
          ['Caminho dos cabos', 'Cada instalação cria o seu', 'Um caminho único e organizado'],
          ['Ligações improvisadas', 'Risco de “gatos” e de remendos', 'Fim dos “gatos”'],
          ['Custo de cada morador', 'Mais alto', 'Com desconto na instalação da vaga'],
          ['Prazo de instalação', 'Mais longo', 'Mais ágil'],
          ['Adequação à IT-41', 'A fazer, pavimento a pavimento', 'Pavimentos já adequados à IT-41'],
        ]} />
      </Band>

      <Band tone="light" id="incluso" eyebrow="O que está incluso" title="Escopo da infraestrutura seca." tight>
        <CheckList className="max-w-3xl" items={['Eletrocalhas galvanizadas e perfuradas até as vagas', 'Furo de laje, quando necessário', 'Adequação dos pavimentos à IT-41', 'Estudo de demanda', 'ART do projeto e da execução']} />
        <p className="mt-6 max-w-3xl text-fg-muted">O valor depende do prédio (pavimentos, distâncias e passagens) e é apresentado depois da visita técnica. Antes de tudo, vale <Link href="/laudo-de-demanda/" className="font-semibold text-accent underline underline-offset-4">medir a demanda</Link>.</p>
      </Band>

      <FAQ items={faqs.infra} />
      <Band tone="light" id="continue" eyebrow="Continue por aqui" title="O caminho do síndico.">
        <RelatedLinks items={[
          { href: '/laudo-de-demanda/', kicker: '02 · Medir', title: 'Laudo de demanda', text: 'O primeiro passo do caminho.' },
          { href: '/controle-de-demanda/', kicker: '04 · Controlar', title: 'Controle de demanda', text: 'Para ter mais carregadores sem sobrecarga.' },
          { href: '/adequacao-it-41/', kicker: '05 · Regularizar', title: 'Adequação IT-41', text: 'Quadro, botoeira e sinalização.' },
        ]} />
      </Band>
      <CTABand title="Prédio pronto antes de os carros chegarem." text="Agende a visita técnica e receba o orçamento com projeto executivo." whatsappMessage={wa.infra} bg="arquipeo-jardim" />
    </>
  );
}
