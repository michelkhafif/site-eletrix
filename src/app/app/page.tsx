import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/config/site';
import { orgId } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { FeatureGrid, Steps, RelatedLinks } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { CTABand } from '@/components/sections/CTABand';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { Picture } from '@/components/ui/Picture';
import { Container, Section } from '@/components/ui/Section';
import { faqs } from '@/data/faqs';

const PATH = '/app/';
export const metadata = pageMeta(PATH);

const appLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'Eletrix',
  operatingSystem: 'iOS, Android',
  applicationCategory: 'UtilitiesApplication',
  url: absoluteUrl(PATH),
  publisher: { '@id': orgId },
};

export default function AppPage() {
  return (
    <>
      <JsonLd data={appLd} />
      <PageHero
        crumbs={[{ name: 'App Eletrix', href: PATH }]}
        eyebrow="App Eletrix · iOS e Android"
        title="App para recarregar o carro elétrico: encontre, carregue e pague pelo celular."
        lead={`Localize as estações no mapa, inicie e acompanhe a recarga e pague com cartão de crédito ou saldo em carteira.`}
        actions={<StoreBadges />}
        image={{ name: 'app-mapa', alt: 'Tela do app Eletrix com o mapa de estações de recarga em São Paulo, com aglomerados numerados e pinos verdes', position: '50% 0%' }}
      />

      <Band tone="light" id="recursos" eyebrow="O que você faz no app" title="Tudo da recarga em um só lugar.">
        <FeatureGrid columns={3} items={[
          { icon: 'pin', title: 'Encontre estações no mapa', text: 'Veja as estações da rede ao redor de você e escolha a mais conveniente.' },
          { icon: 'charge', title: 'Inicie e acompanhe a recarga', text: 'Selecione o carregador ou leia o QR code da estação e acompanhe a recarga pelo celular.' },
          { icon: 'receipt', title: 'Pague pelo app', text: 'Cartão de crédito ou saldo em carteira, sem precisar de outro meio de pagamento.' },
        ]} />
      </Band>

      <Band tone="paper" id="passo-a-passo" eyebrow="Passo a passo" title="Da estação ao carro carregando.">
        <Steps items={[
          { title: 'Baixe o app', text: 'Na App Store ou no Google Play. Cada estação traz um QR code para baixar.' },
          { title: 'Conecte o plugue', text: 'Encaixe o plugue no seu veículo. As estações têm conector Tipo 2.' },
          { title: 'Selecione o carregador', text: 'Escolha a estação no app ou leia o QR code da placa.' },
          { title: 'Finalize a recarga', text: 'Termine pelo app e retire o plugue. O pagamento é feito no app.' },
        ]} />
      </Band>

      <Section tone="dark" id="compat" labelledBy="compat-t">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div data-reveal>
              <p className="eyebrow mb-4">Compatibilidade</p>
              <h2 id="compat-t" className="text-h2">Estações de 7,4 kW, conector Tipo 2.</h2>
              <p className="mt-5 text-lead text-muted-dark">A rede é de corrente alternada (AC), pensada para o tempo em que o carro já fica parado: no trabalho, no hotel, no shopping, na garagem. Praticamente todos os veículos elétricos e híbridos plug-in vendidos no Brasil são compatíveis.</p>
              <p className="mt-4 text-muted-dark">Quer saber quanto tempo leva? Veja o <Link href="/guias/qual-potencia-carregador-carro-eletrico/" className="text-brand-400 underline underline-offset-4">guia sobre a potência do carregador</Link>.</p>
            </div>
            <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
              <Picture name="hub-recarga" alt="Mão conectando o plugue do carregador Eletrix ao carro elétrico, com o QR code da estação à vista" fill sizes="(min-width:1024px) 560px, 100vw" />
            </div>
          </div>
        </Container>
      </Section>

      <FAQ items={faqs.app} tone="light" />
      <Band tone="paper" id="continue" eyebrow="Continue por aqui" title="Para o usuário da rede.">
        <RelatedLinks items={[
          { href: '/#estacoes', kicker: 'Mapa', title: 'Onde a Eletrix opera', text: 'Veja onde estão as estações.' },
          { href: '/suporte/', kicker: 'Ajuda', title: 'Suporte 24 horas', text: 'Se algo não funcionar, fale com a gente.' },
          { href: '/carregadores/', kicker: 'Em casa', title: 'Carregadores', text: 'Leve a recarga para a sua vaga.' },
        ]} />
      </Band>
      <CTABand title="Quer a recarga na sua vaga?" text="A Eletrix instala o carregador direto no seu medidor, com visita técnica gratuita." whatsappMessage="Olá! Vim pelo site e quero agendar a visita técnica gratuita para instalar um carregador na minha vaga." whatsappLabel="Agendar visita técnica" bg="case-4" />
    </>
  );
}
