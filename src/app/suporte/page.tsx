import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { FeatureGrid, Steps, Callout } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Section';
import { faqs } from '@/data/faqs';
import { site, whatsappLink } from '@/config/site';
import { wa } from '@/data/whatsapp';

const PATH = '/suporte/';
export const metadata = pageMeta(PATH);

export default function SupportPage() {
  const msg = 'Olá! Preciso de suporte em uma estação Eletrix.';
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Suporte', href: PATH }]}
        eyebrow="Suporte ao usuário · 24 horas"
        title="Suporte Eletrix: ajuda para recarga e estações, a qualquer hora."
        lead="Se a recarga não iniciou, foi interrompida ou você tem uma dúvida sobre o app, chame o suporte no WhatsApp. Informe o local e o número da estação, que está na placa do carregador."
        actions={<>
          <Button href={whatsappLink(msg, 'support')} icon="whatsapp" size="lg">Chamar o suporte no WhatsApp</Button>
          <Button href="/app/" variant="onDark" size="lg">Ver como usar o app</Button>
        </>}
        chips={[`WhatsApp ${site.contact.phoneSupportDisplay}`, 'Atendimento 24 horas']}
      />

      <Band tone="light" id="antes" eyebrow="Antes de chamar" title="O que costuma resolver a recarga que não inicia.">
        <Steps columns={4} items={[
          { title: 'Plugue bem encaixado', text: 'Confirme que o plugue está totalmente conectado ao carro e que o carro está destravado.' },
          { title: 'Estação selecionada', text: 'No app, selecione a estação correta ou leia o QR code da placa.' },
          { title: 'Pagamento válido', text: 'Verifique se há cartão de crédito válido ou saldo em carteira no app.' },
          { title: 'App atualizado', text: 'Atualize o app na App Store ou no Google Play e tente novamente.' },
        ]} />
        <div className="mt-8"><Callout icon="info" title="Ainda não resolveu?">Chame o suporte no WhatsApp e informe o local, o número da estação e o que aparece no app. A equipe atende 24 horas.</Callout></div>
      </Band>

      <Band tone="paper" id="quem" eyebrow="Quem chamar" title="Cada canal para um assunto.">
        <FeatureGrid columns={2} items={[
          { icon: 'headset', title: 'Suporte às estações', text: <>Usuários, moradores e gestores com problema em uma estação em operação. WhatsApp <a href={whatsappLink(msg, 'support')} target="_blank" rel="noopener noreferrer">{site.contact.phoneSupportDisplay}</a>, 24 horas.</> },
          { icon: 'handshake', title: 'Comercial e orçamentos', text: <>Visita técnica, proposta, Hub, Rent, laudo e IT-41. WhatsApp <a href={whatsappLink(wa.default)} target="_blank" rel="noopener noreferrer">{site.contact.phoneCommercialDisplay}</a>.</> },
        ]} />
      </Band>

      <Section tone="dark" tight id="gestores" labelledBy="g-t">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div data-reveal>
              <p className="eyebrow mb-3">Para gestores de empreendimentos</p>
              <h2 id="g-t" className="text-h3 max-w-2xl text-white">Carregador parado em um Hub?</h2>
              <p className="mt-3 max-w-2xl text-muted-dark">O suporte funciona 24 horas e, em caso de problema, o carregador volta a funcionar em até 12 horas. Acione o mesmo canal de suporte.</p>
            </div>
            <Button href={whatsappLink(msg, 'support')} size="lg" icon="whatsapp">Acionar o suporte</Button>
          </div>
        </Container>
      </Section>

      <FAQ items={faqs.suporte} tone="light" />
    </>
  );
}
