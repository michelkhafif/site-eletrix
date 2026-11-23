import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band, Prose } from '@/components/sections/Band';
import { Steps, FeatureGrid, CompareTable, Split, MediaFrame, RelatedLinks, PriceCard } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { DuvidasSobre } from '@/components/sections/DuvidasSobre';
import { CTABand } from '@/components/sections/CTABand';
import { Button } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { faqs } from '@/data/faqs';
import { wa } from '@/data/whatsapp';
import { whatsappLink } from '@/config/site';

const PATH = '/eletrix-rent/';
export const metadata = pageMeta(PATH);

export default function RentPage() {
  return (
    <>
      <JsonLd data={serviceLd({ name: 'Eletrix Rent', description: 'Locação de carregador de carro elétrico com mensalidade fixa, para condomínios residenciais, hotéis e pequenos comércios.', path: PATH })} />
      <PageHero
        crumbs={[{ name: 'Eletrix Rent', href: PATH }]}
        eyebrow="07 · Para condomínios, hotéis e comércios"
        title="Eletrix Rent: ofereça recarga sem comprar o carregador."
        lead="O carregador é da Eletrix e a operação também. O seu condomínio, hotel ou comércio investe na infraestrutura e paga uma mensalidade fixa. Quem recarrega paga pela recarga, e a energia é 100% reembolsada."
        actions={<>
          <Button href={whatsappLink(wa.rent)} icon="whatsapp" size="lg">Falar no WhatsApp</Button>
          <Button href="/contato/" variant="onDark" size="lg">Pedir proposta</Button>
        </>}
        chips={['Mensalidade fixa', 'Sem comprar o equipamento', 'Energia 100% reembolsada', 'Suporte 24 horas']}
        image={{ name: 'case-5', alt: 'Carregador Eletrix instalado em pedestal numerado em uma garagem', position: '50% 45%' }}
      />

      <Band tone="light" id="o-que-e" eyebrow="O que é" title="Locação de carregador para recarga coletiva." lead="Para quem quer oferecer recarga a moradores, hóspedes ou clientes, mas ainda não tem o fluxo que justifica um Hub.">
        <Split media={<MediaFrame className="aspect-[4/3]"><Picture name="case-2" alt="Dois carregadores Eletrix numerados instalados lado a lado na parede da garagem" fill sizes="(min-width:1024px) 560px, 100vw" /></MediaFrame>}>
          <Prose>
            <p>No Eletrix Rent, a Eletrix fornece o carregador, instala, opera e dá suporte. O local não compra o equipamento: paga uma <strong>mensalidade fixa</strong> e investe na infraestrutura elétrica.</p>
            <p>Os usuários pagam pela recarga no app Eletrix. A <strong>energia é 100% reembolsada</strong> ao local, que ainda tem a chance de gerar receita com o serviço.</p>
            <p>É o modelo pensado para <strong>condomínios residenciais, hotéis e pequenos comércios</strong>, onde o fluxo de veículos elétricos é menor e previsível.</p>
          </Prose>
        </Split>
      </Band>

      <Band tone="paper" id="modelo" eyebrow="O modelo" title="Quanto o local investe, e o que recebe." >
        <div className="grid gap-6 md:grid-cols-2">
          <PriceCard label="Investimento do local" price="Infraestrutura + mensalidade fixa" note="Sem comprar o carregador. O valor da mensalidade é apresentado na proposta, depois da visita técnica." items={['Carregador fornecido pela Eletrix', 'Instalação com ART e proteções', 'Operação, app e suporte 24 horas']} />
          <PriceCard highlight label="O que o local recebe" price="Energia 100% reembolsada" note="E a chance de gerar receita ao local." items={['Usuários pagam pela recarga no app', 'Reembolso integral da energia consumida', 'Serviço novo para moradores, hóspedes ou clientes']} />
        </div>
      </Band>

      <Band tone="light" id="como-funciona" eyebrow="Como funciona" title="Quatro passos até a primeira recarga.">
        <Steps items={[
          { title: 'Visita técnica', text: 'Avaliamos a garagem, o quadro de energia e o fluxo esperado de veículos.' },
          { title: 'Proposta', text: 'Você recebe o valor da mensalidade e da infraestrutura necessária.' },
          { title: 'Instalação', text: 'Instalação conforme a IT-41, com ART, proteções, placas e sinalização.' },
          { title: 'Operação Eletrix', text: 'O carregador entra no app, os usuários pagam a recarga e a Eletrix cuida do suporte.' },
        ]} />
      </Band>

      <Band tone="paper" id="comparativo" eyebrow="Rent ou Hub?" title="Como escolher entre locação e comodato.">
        <CompareTable caption="Comparativo entre Eletrix Rent e Eletrix Hub" head={['', 'Eletrix Rent', 'Eletrix Hub']} rows={[
          ['Modelo', 'Locação com mensalidade fixa', 'Comodato por 36 meses, sem mensalidade'],
          ['Fluxo de veículos', 'Menor, recarga coletiva', 'Alto, com rotatividade'],
          ['Ideal para', 'Condomínios residenciais, hotéis e pequenos comércios', 'Prédios corporativos e shoppings'],
          ['Investimento do local', 'Infraestrutura + mensalidade', 'Infraestrutura, negociável'],
          ['Energia', '100% reembolsada', '100% reembolsada + bônus ao local'],
        ]} />
        <p className="mt-6 text-fg-muted">Não precisa decidir antes. Na visita técnica, a Eletrix avalia o seu caso e recomenda o modelo mais adequado. <Link href="/eletrix-hub/" className="font-semibold text-accent underline underline-offset-4">Conheça o Eletrix Hub</Link>.</p>
      </Band>

      <Band tone="light" id="por-que" eyebrow="Por que a Eletrix" title="O que o seu local ganha ao contratar." >
        <FeatureGrid items={[
          { icon: 'headset', title: 'Suporte próprio, 24 horas', text: 'Time técnico para manutenção e atendimento. Você não precisa responder a usuários.' },
          { icon: 'shield', title: 'Segurança e IT-41', text: 'Instalação dentro das normas do Corpo de Bombeiros, com ART, proteção e sinalização.' },
          { icon: 'receipt', title: 'Sem rateio de energia', text: 'Quem recarrega paga pelo uso, e a energia consumida é reembolsada ao local.' },
          { icon: 'palette', title: 'Sua marca, se quiser', text: <>No modelo white label, os carregadores levam a marca do cliente com a assinatura Powered by Eletrix. <Link href="/white-label/">Saiba mais</Link>.</> },
          { icon: 'wrench', title: 'Equipamentos de marcas reconhecidas', text: 'WEG, Intelbras e Livoltek, com 7,4 kW e conector Tipo 2.' },
          { icon: 'handshake', title: 'Contrato sem surpresas', text: 'Bons negócios se sustentam pela entrega de valor, não por multas ou cláusulas leoninas.' },
        ]} />
      </Band>

      <FAQ items={faqs.rent} />

      <DuvidasSobre path={PATH} />
      <Band tone="light" id="continue" eyebrow="Continue por aqui" title="Outras soluções para o seu local.">
        <RelatedLinks items={[
          { href: '/eletrix-hub/', kicker: '06', title: 'Eletrix Hub', text: 'Comodato sem mensalidade para alto fluxo.' },
          { href: '/condominios/', kicker: 'Síndicos', title: 'Para condomínios', text: 'Do laudo à regularização na IT-41.' },
          { href: '/troca-de-operador/', kicker: 'Migração', title: 'Troca de operador', text: 'Já tem carregadores? Assumimos e regularizamos.' },
        ]} />
      </Band>
      <CTABand title="Quer saber o valor para o seu local?" text="Fale com o time comercial. Depois da visita técnica, você recebe a proposta com a mensalidade e a infraestrutura." whatsappMessage={wa.rent} bg="arquipeo-aerea" />
    </>
  );
}
