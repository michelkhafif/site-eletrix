import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band, Prose } from '@/components/sections/Band';
import { Steps, FeatureGrid, Callout, Split, MediaFrame, RelatedLinks, CompareTable } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { CTABand } from '@/components/sections/CTABand';
import { Button } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { faqs } from '@/data/faqs';
import { wa } from '@/data/whatsapp';
import { whatsappLink } from '@/config/site';

const PATH = '/white-label/';
export const metadata = pageMeta(PATH);

export default function WhiteLabelPage() {
  return (
    <>
      <JsonLd data={serviceLd({ name: 'White label: carregadores com a sua marca, Powered by Eletrix', description: 'Personalização dos carregadores e da experiência no app com a marca do cliente, mantendo a assinatura Powered by Eletrix.', path: PATH })} />
      <PageHero
        crumbs={[{ name: 'White label', href: PATH }]}
        eyebrow="Powered by Eletrix"
        title="White label: a sua marca na recarga. A operação é da Eletrix."
        lead="Carregadores e experiência no app personalizados com a marca da sua rede, com a assinatura Powered by Eletrix. A instalação, o suporte, a manutenção e o pagamento continuam com a Eletrix."
        actions={<>
          <Button href={whatsappLink(wa.whitelabel)} icon="whatsapp" size="lg">Falar no WhatsApp</Button>
          <Button href="/contato/" variant="onDark" size="lg">Pedir proposta</Button>
        </>}
        chips={['Carregadores personalizados', 'App com a sua marca', 'Powered by Eletrix']}
        image={{ name: 'case-6', alt: 'Carregador Eletrix em totem de piso numerado, instalado em uma garagem', position: '50% 50%' }}
      />

      <Band tone="light" id="o-que-e" eyebrow="O que é" title="Recarga como parte da experiência da sua marca." lead="Para quem quer oferecer recarga com a própria identidade, sem montar uma operação de energia, de suporte e de pagamentos.">
        <Split media={<MediaFrame className="aspect-[4/3]"><Picture name="case-8" alt="Garagem com três carregadores Eletrix instalados em parede verde" fill sizes="(min-width:1024px) 560px, 100vw" /></MediaFrame>}>
          <Prose>
            <p>No white label, o morador ou o hóspede vê a <strong>sua marca</strong> no carregador e na experiência do app. Por trás, a Eletrix opera: instala, mantém, dá suporte 24 horas e processa os pagamentos.</p>
            <p>A assinatura <strong>Powered by Eletrix</strong> identifica quem está por trás da operação.</p>
            <p>Já existe um caso real com uma <strong>rede de residenciais e serviced apartments</strong>, que oferece a recarga aos moradores sob a própria marca.</p>
          </Prose>
        </Split>
      </Band>

      <Band tone="paper" id="personalizacao" eyebrow="O que é personalizado" title="Da carcaça ao aplicativo.">
        <FeatureGrid columns={3} items={[
          { icon: 'palette', title: 'Carregadores com a sua marca', text: 'Identidade visual do cliente nos equipamentos, com a assinatura Powered by Eletrix.' },
          { icon: 'phoneApp', title: 'Experiência no app', text: 'A experiência de uso no app Eletrix leva a marca do cliente.' },
          { icon: 'headset', title: 'Operação e suporte Eletrix', text: 'Instalação, manutenção, suporte 24 horas e pagamento por conta da Eletrix.' },
        ]} />
      </Band>

      <Band tone="light" id="para-quem" eyebrow="Para quem faz sentido" title="Redes, marcas e portfólios com vários endereços.">
        <FeatureGrid columns={3} items={[
          { icon: 'home', title: 'Residenciais e serviced apartments', text: 'Um padrão de recarga único em todo o portfólio, com a identidade da rede.' },
          { icon: 'building', title: 'Hotéis e redes de hospitalidade', text: 'A recarga como diferencial de hospedagem, com a marca do hotel.' },
          { icon: 'layers', title: 'Incorporadoras e administradoras', text: 'Padronização entre empreendimentos, com um operador só.' },
        ]} />
      </Band>

      <Band tone="paper" id="como-comecar" eyebrow="Como começar" title="Do briefing à operação.">
        <Steps columns={4} items={[
          { title: 'Conversa inicial', text: 'Entendemos o seu portfólio e o que a recarga precisa dizer sobre a sua marca.' },
          { title: 'Modelo', text: 'Definimos o modelo comercial mais adequado: Hub ou Rent.' },
          { title: 'Personalização', text: 'Alinhamos o escopo da personalização dos carregadores e da experiência no app.' },
          { title: 'Instalação e operação', text: 'Instalamos conforme a IT-41 e passamos a operar, com suporte 24 horas.' },
        ]} />
        <div className="mt-8"><Callout icon="info" title="Escopo definido caso a caso">O que pode ser personalizado em cada projeto é definido na proposta. Fale com o time comercial para avaliar o seu caso.</Callout></div>
      </Band>

      <Band tone="light" id="modelos" eyebrow="Modelos comerciais" title="White label funciona com Hub ou Rent.">
        <CompareTable caption="Modelos comerciais disponíveis no white label" head={['', 'Eletrix Hub', 'Eletrix Rent']} rows={[
          ['Modelo', 'Comodato por 36 meses, sem mensalidade', 'Locação com mensalidade fixa'],
          ['Ideal para', 'Alto fluxo de veículos elétricos', 'Recarga coletiva com fluxo menor'],
          ['Energia', '100% reembolsada + bônus ao local', '100% reembolsada'],
        ]} />
      </Band>

      <FAQ items={faqs.whitelabel} />
      <Band tone="light" id="continue" eyebrow="Continue por aqui" title="Modelos e operação.">
        <RelatedLinks items={[
          { href: '/eletrix-hub/', kicker: '06', title: 'Eletrix Hub', text: 'Comodato sem mensalidade.' },
          { href: '/eletrix-rent/', kicker: '07', title: 'Eletrix Rent', text: 'Locação com mensalidade fixa.' },
          { href: '/#app', kicker: 'App', title: 'App Eletrix', text: 'Como o usuário recarrega e paga.' },
        ]} />
      </Band>
      <CTABand title="Quer a recarga com a sua marca?" text="Converse com o time comercial e avalie o white label para a sua rede." whatsappMessage={wa.whitelabel} bg="thera-praca" />
    </>
  );
}
