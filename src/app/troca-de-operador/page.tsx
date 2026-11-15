import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { Steps, FeatureGrid, CheckList, Callout, RelatedLinks, CompareTable } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { CTABand } from '@/components/sections/CTABand';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Section';
import { ContactForm } from '@/components/forms/ContactForm';
import { faqs } from '@/data/faqs';
import { wa } from '@/data/whatsapp';
import { whatsappLink } from '@/config/site';

const PATH = '/troca-de-operador/';
export const metadata = pageMeta(PATH);

export default function SwitchPage() {
  return (
    <>
      <JsonLd data={serviceLd({ name: 'Troca de operador de carregadores de veículos elétricos', description: 'A Eletrix assume a operação dos carregadores já instalados no prédio, substitui os equipamentos e faz a adequação à IT-41, com reembolso da energia e repasse ao prédio.', path: PATH })} />
      <PageHero
        crumbs={[{ name: 'Troca de operador', href: PATH }]}
        eyebrow="Para prédios que já têm carregadores"
        title="Já tem carregadores no prédio? Assumimos a operação e regularizamos."
        lead="Se os carregadores estão parados, o suporte não responde ou a instalação está fora da IT-41, a Eletrix substitui os equipamentos, faz a adequação e opera. Com reembolso da energia e repasse ao prédio."
        actions={<>
          <Button href={whatsappLink(wa.troca)} icon="whatsapp" size="lg">Falar no WhatsApp</Button>
          <Button href="#formulario" variant="onDark" size="lg" icon="chevronDown">Pedir avaliação</Button>
        </>}
        chips={['Em muitos casos, sem custo para o condomínio', 'IT-41 resolvida', 'Mais de 50 estações já migraram']}
        image={{ name: 'case-4', alt: 'Carregador Eletrix instalado em pilar de garagem, ao lado de um carro estacionado', position: '50% 50%' }}
      />

      <Band tone="light" id="sinais" eyebrow="Quando faz sentido" title="Sinais de que o prédio pode trocar de operador." lead="Qualquer um desses sinais já é motivo para pedir uma avaliação.">
        <FeatureGrid columns={3} items={[
          { icon: 'alert', title: 'Carregadores parados', text: 'Equipamentos que quebraram, ficam offline ou esperam peça, e reclamação toda semana na administração.' },
          { icon: 'headset', title: 'Suporte que não responde', text: 'Usuários ligam, escrevem e ninguém resolve. O telefone da administração vira o canal de atendimento.' },
          { icon: 'clipboard', title: 'Instalação fora da IT-41', text: 'Sem botoeira, sem sinalização, sem ART. Um problema na renovação do AVCB.' },
          { icon: 'receipt', title: 'Energia sem retorno', text: 'O prédio paga a energia e não recebe de volta, ou recebe sem clareza.' },
          { icon: 'clock', title: 'Contrato sem flexibilidade', text: 'Multas e cláusulas que prendem o prédio mesmo quando o serviço não entrega.' },
          { icon: 'network', title: 'Equipamento sem conexão', text: 'Carregadores sem internet, sem app ou sem dashboard para o gestor acompanhar.' },
        ]} />
      </Band>

      <Band tone="paper" id="como-funciona" eyebrow="Como funciona" title="Quatro passos, sem dor de cabeça para a administração." lead="A Eletrix cuida da transição. O prédio aprova e acompanha.">
        <Steps items={[
          { title: 'Diagnóstico', text: 'Visita técnica para avaliar os equipamentos, os quadros, o estado da instalação e a situação contratual.' },
          { title: 'Substituição', text: 'A Eletrix substitui os carregadores por equipamentos WEG, Intelbras ou Livoltek, de 7,4 kW.' },
          { title: 'Adequação à IT-41', text: 'Quadro identificado, botoeira por pavimento e sinalização S.A.V.E., com ART.' },
          { title: 'Operação e repasse', text: 'A Eletrix passa a operar com suporte 24 horas, reembolsa a energia e repassa ao prédio.' },
        ]} />
      </Band>

      <Band tone="light" id="condicoes" eyebrow="Condições" title="Em muitos casos, sem custo para o condomínio." lead="As condições são avaliadas por empreendimento. O que está no escopo:">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <CheckList items={['Substituição dos equipamentos', 'Adequação à IT-41, com ART', 'Reembolso da energia ao prédio', 'Repasse ao empreendimento', 'Suporte 24 horas', 'Dashboard de gestão, mediante solicitação']} />
          <div data-reveal>
            <Callout icon="handshake" title="O foco é o prédio">A troca não é sobre quem estava antes. É sobre o prédio ter, daqui para a frente, um serviço que funciona, está na norma e rende. Se a operadora atual estiver cumprindo o que prometeu, a Eletrix também terá prazer em conversar sobre o Rent ou o Hub para as próximas vagas.</Callout>
          </div>
        </div>
      </Band>

      <Band tone="paper" id="comparativo" eyebrow="Antes e depois" title="O que muda para o prédio.">
        <CompareTable caption="Situação do prédio antes e depois da troca de operador" head={['', 'Antes', 'Com a Eletrix']} rows={[
          ['Equipamentos', 'Parados ou instáveis', 'Substituídos por WEG, Intelbras ou Livoltek, 7,4 kW'],
          ['Suporte', 'Sem resposta', '24 horas, com carregador funcionando em até 12 horas (Hub)'],
          ['IT-41', 'Fora da norma', 'Adequação com ART'],
          ['Energia', 'Sem retorno claro', '100% reembolsada, com repasse ao prédio'],
          ['Contrato', 'Com multas e amarras', 'Sem multa de rescisão (Hub)'],
        ]} />
        <p className="mt-6 text-fg-muted">Mais de 50 estações já migraram para a Eletrix nos últimos meses. <Link href="/eletrix-hub/" className="font-semibold text-accent underline underline-offset-4">Conheça o Eletrix Hub</Link>.</p>
      </Band>

      <Section tone="light" id="formulario" labelledBy="form-t">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div data-reveal>
              <p className="eyebrow mb-4">Pedir avaliação</p>
              <h2 id="form-t" className="text-h2">Conte como estão os carregadores do seu prédio.</h2>
              <p className="mt-5 text-lead text-fg-muted">Informe os dados do empreendimento e quantos carregadores existem. A equipe comercial entra em contato para agendar a visita técnica.</p>
            </div>
            <div data-reveal className="card p-6 md:p-9"><ContactForm profile="gestor" origin={PATH} /></div>
          </div>
        </Container>
      </Section>

      <FAQ items={faqs.troca} tone="paper" />
      <Band tone="light" id="continue" eyebrow="Continue por aqui" title="Ao assumir, a Eletrix também:">
        <RelatedLinks items={[
          { href: '/adequacao-it-41/', kicker: '05', title: 'Adequação IT-41', text: 'Preços públicos e simulador.' },
          { href: '/eletrix-hub/', kicker: '06', title: 'Eletrix Hub', text: 'O modelo comercial para alto fluxo.' },
          { href: '/guias/it-41-carregador-veicular/', kicker: 'Guia', title: 'IT-41 explicada', text: 'O que a norma exige.' },
        ]} />
      </Band>
      <CTABand title="Peça uma avaliação dos carregadores do seu prédio." text="Sem compromisso. A Eletrix faz o diagnóstico e apresenta as condições." whatsappMessage={wa.troca} bg="thera-entrada" />
    </>
  );
}
