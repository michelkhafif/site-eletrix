import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band, Prose } from '@/components/sections/Band';
import { Steps, FeatureGrid, Callout, Split, RelatedLinks } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { CTABand } from '@/components/sections/CTABand';
import { Button } from '@/components/ui/Button';
import { DemandDiagram } from '@/components/sections/DemandDiagram';
import { faqs } from '@/data/faqs';
import { wa } from '@/data/whatsapp';
import { whatsappLink } from '@/config/site';

const PATH = '/controle-de-demanda/';
export const metadata = pageMeta(PATH);

export default function DemandControlPage() {
  return (
    <>
      <JsonLd data={serviceLd({ name: 'Controle de demanda para carregadores veiculares', description: 'Monitora o consumo de energia do prédio em tempo real e ajusta automaticamente a potência dos carregadores, sem ultrapassar o limite seguro.', path: PATH })} />
      <PageHero
        crumbs={[{ name: 'Controle de demanda', href: PATH }]}
        eyebrow="04 · Controlar"
        title="Controle de demanda: mais carregadores, sem sobrecarregar o prédio."
        lead="O sistema monitora o consumo de energia do prédio em tempo real, ajusta a potência dos carregadores sozinho e nunca deixa passar do limite seguro. Ideal quando a carga é limitada e vários moradores querem carregar."
        actions={<>
          <Button href={whatsappLink(wa.demanda)} icon="whatsapp" size="lg">Falar com o time</Button>
          <Button href="#como-funciona" variant="onDark" size="lg" icon="chevronDown">Como funciona</Button>
        </>}
        chips={['Monitoramento em tempo real', 'Ajuste automático de potência', 'Limite seguro respeitado']}
        image={{ name: 'case-2', alt: 'Dois carregadores Eletrix numerados instalados na parede da garagem', position: '50% 40%', ratio: 'landscape' }}
      />

      <Band tone="light" id="o-que-e" eyebrow="O que é" title="Um gerente de carga para a garagem." lead="Quando o prédio não tem folga para todos os carregadores ligados ao mesmo tempo, o controle de demanda distribui a energia disponível.">
        <Split media={<div className="card p-5 text-fg md:p-7"><DemandDiagram /></div>}>
          <Prose>
            <p>Todo prédio tem uma <strong>demanda contratada</strong>, a potência reservada junto à distribuidora. Passar dela custa caro e sobrecarrega a instalação. Com vários carros carregando de uma vez, esse limite fica perto.</p>
            <p>O controle de demanda <strong>monitora em tempo real</strong> o consumo do edifício e <strong>ajusta automaticamente a potência</strong> de cada carregador. Quando o prédio está perto do limite, a recarga desacelera. Quando há folga, volta a toda potência.</p>
            <p>Resultado: o prédio comporta <strong>mais carregadores</strong> do que comportaria sem o sistema, e continua dentro do limite seguro.</p>
          </Prose>
        </Split>
      </Band>

      <Band tone="paper" id="como-funciona" eyebrow="Como funciona" title="Medir, decidir, ajustar." lead="O ciclo acontece o tempo todo, sem ninguém precisar intervir.">
        <Steps columns={3} items={[
          { title: 'Monitora', text: 'Um medidor acompanha o consumo total do prédio em tempo real.' },
          { title: 'Decide', text: 'O sistema compara o consumo com o limite seguro e calcula a potência disponível aos carregadores.' },
          { title: 'Ajusta', text: 'A potência de cada carregador sobe ou desce de acordo, sem passar do limite seguro.' },
        ]} />
        <div className="mt-8"><Callout icon="clock" title="E a recarga noturna?">Como a maior parte das recargas acontece à noite, quando o consumo do prédio é menor, na prática o carro costuma estar pronto de manhã. O controle atua nos momentos de pico.</Callout></div>
      </Band>

      <Band tone="light" id="quando" eyebrow="Quando vale a pena" title="Para quem o controle de demanda faz sentido." lead="É a escolha certa quando a carga do prédio é limitada e vários moradores ou usuários querem carregar.">
        <FeatureGrid items={[
          { icon: 'building', title: 'Prédio com carga limitada', text: 'A demanda contratada é justa e não há folga para todos os carregadores a plena potência.' },
          { icon: 'car', title: 'Vários carros ao mesmo tempo', text: 'A fila de moradores com carro elétrico cresce, e todos chegam e conectam no mesmo horário.' },
          { icon: 'shield', title: 'Segurança da instalação', text: 'Evita sobrecarga e o risco que a acompanha, além de proteger a demanda contratada.' },
        ]} />
        <p className="mt-8 max-w-3xl text-fg-muted">O ponto de partida é o <Link href="/laudo-de-demanda/" className="font-semibold text-accent underline underline-offset-4">laudo de demanda</Link>: ele mostra se o seu prédio precisa de controle e qual limite adotar.</p>
      </Band>

      <FAQ items={faqs.demanda} />
      <Band tone="light" id="continue" eyebrow="Continue por aqui" title="O caminho do síndico.">
        <RelatedLinks items={[
          { href: '/laudo-de-demanda/', kicker: '02 · Medir', title: 'Laudo de demanda', text: 'Meça a folga real do prédio.' },
          { href: '/infraestrutura-seca/', kicker: '03 · Preparar', title: 'Infraestrutura seca', text: 'Eletrocalhas até as vagas.' },
          { href: '/adequacao-it-41/', kicker: '05 · Regularizar', title: 'Adequação IT-41', text: 'Pronta para o AVCB.' },
        ]} />
      </Band>
      <CTABand title="Mais carregadores, dentro do limite." text="Fale com o time e descubra se o controle de demanda é o que o seu prédio precisa." whatsappMessage={wa.demanda} bg="river-one-fim-de-tarde" />
    </>
  );
}
