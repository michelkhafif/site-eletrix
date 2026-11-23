import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { Steps, FeatureGrid, CheckList, RelatedLinks } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { DuvidasSobre } from '@/components/sections/DuvidasSobre';
import { CTABand } from '@/components/sections/CTABand';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Section';
import { ContactForm } from '@/components/forms/ContactForm';
import { chargers } from '@/data/chargers';
import { faqs } from '@/data/faqs';
import { wa } from '@/data/whatsapp';
import { whatsappLink } from '@/config/site';

const PATH = '/instalacao-carregador-residencial/';
export const metadata = pageMeta(PATH);

export default function ResidentialPage() {
  return (
    <>
      <JsonLd data={serviceLd({ name: 'Instalação de carregador de carro elétrico em vaga privativa (Eletrix Home)', description: 'Instalação segura de carregador na vaga do condomínio, ligada ao medidor da unidade, com visita técnica gratuita, ART inclusa e suporte 24 horas.', path: PATH })} />
      <PageHero
        crumbs={[{ name: 'Instalação na vaga', href: PATH }]}
        eyebrow="01 · Para o morador · Eletrix Home"
        title="Carregue na sua vaga. Pague na sua conta de luz."
        lead="A Eletrix liga o carregador direto no medidor da sua unidade. O consumo do carro entra na sua conta de energia, sem rateio com o condomínio. A visita técnica é gratuita."
        actions={<>
          <Button href={whatsappLink(wa.morador)} icon="whatsapp" size="lg">Agendar visita técnica</Button>
          <Button href="#formulario" variant="onDark" size="lg" icon="chevronDown">Receber contato</Button>
        </>}
        chips={['Visita técnica gratuita', 'ART inclusa', 'Instalação em 3 dias úteis', 'Suporte 24 horas']}
        image={{ name: 'case-1', alt: 'Carregador Eletrix instalado em pilar de garagem, com cabo e plugue de recarga', position: '50% 50%' }}
      />

      <Band tone="light" id="o-que-e" eyebrow="O que é" title="Instalação de carregador na vaga do condomínio." lead="Você compra o carro elétrico. A Eletrix cuida do resto: visita, projeto, instalação, segurança e suporte.">
        <FeatureGrid columns={3} items={[
          { icon: 'receipt', title: 'Direto do medidor', text: 'Você paga só o que usa. O carregador é ligado ao medidor da própria unidade e o consumo entra na sua conta de luz.' },
          { icon: 'shield', title: 'Instalação segura', text: 'Seguimos as normas do Corpo de Bombeiros, com proteção contra choques, sobretensão e sobrecorrente e ART inclusa.' },
          { icon: 'clock', title: 'Pronto de manhã', text: 'A recarga acontece durante a noite. Você encosta o carro na vaga e acorda com a bateria cheia.' },
        ]} />
        <p className="mt-8 max-w-3xl text-fg-muted">Quando o empreendimento preferir, também é possível ligar o carregador no quadro da administração e estruturar a cobrança pelo uso. A forma de medir e pagar é combinada com o condomínio na visita técnica. Entenda as opções no guia <Link href="/guias/cobranca-energia-carregador-condominio/" className="font-semibold text-accent underline underline-offset-4">quem paga a energia do carregador no condomínio</Link>.</p>
      </Band>

      <Band tone="paper" id="como-funciona" eyebrow="Como funciona" title="Da visita técnica ao carro carregando." lead="O prazo típico de instalação é de 3 dias úteis a partir da data agendada.">
        <Steps columns={4} items={[
          { title: 'Visita técnica gratuita', text: 'Um técnico vai ao seu prédio, mede a distância entre a vaga e o medidor e avalia o quadro e o caminho dos cabos.', tag: 'Gratuita' },
          { title: 'Proposta com preço fechado', text: 'O preço da instalação é definido depois da visita, porque a distância da vaga ao medidor muda de caso para caso.' },
          { title: 'Aprovação no condomínio', text: <>Com projeto e ART em mãos, você protocola o pedido na administração. Em São Paulo, a <Link href="/guias/lei-carregador-condominio-sao-paulo/">Lei 18.403/2026</Link> protege o seu direito.</> },
          { title: 'Instalação e entrega', text: 'Instalação adequada à IT-41, com ART, em até 3 dias úteis a partir da data agendada.' },
        ]} />
      </Band>

      <Band tone="light" id="preco" eyebrow="Quanto custa" title="Preço depende da sua vaga. A visita é grátis." lead="Dois valores formam o investimento: o carregador, que tem preço público, e a instalação, que é definida depois da visita técnica.">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal className="card flex flex-col p-7">
            <p className="text-sm font-semibold text-accent">Instalação</p>
            <p className="mt-3 font-display text-[1.8rem] font-extrabold leading-tight">Definida após a visita técnica</p>
            <p className="mt-2 text-fg-muted">A distância entre a vaga e o medidor varia, e é ela que mais pesa no custo.</p>
            <CheckList className="mt-6 text-[0.95rem]" items={['Visita técnica gratuita', 'ART inclusa', 'Proteções contra choque, sobretensão e sobrecorrente', 'Garantia da instalação e do equipamento', 'Suporte 24 horas']} />
            <p className="mt-6 text-[0.95rem] text-fg-muted">Em prédios com infraestrutura seca da Eletrix, o morador tem <strong className="text-fg">desconto na instalação</strong> da própria vaga.</p>
          </div>
          <div data-reveal className="card p-7">
            <p className="text-sm font-semibold text-accent">Carregadores à venda · a partir de R$ 2.799</p>
            <ul className="mt-4 divide-y divide-hair">
              {chargers.map((c) => (
                <li key={c.slug} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <span><span className="block font-display font-bold">{c.fullName}</span><span className="text-sm text-fg-muted">{c.tag} · 2 anos de garantia Eletrix</span></span>
                  <span className="text-right"><span className="block text-xs text-fg-muted line-through">{c.oldPriceLabel}</span><span className="font-display text-xl font-extrabold tnum">{c.priceLabel}</span></span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.82rem] text-fg-muted">Valores referentes ao equipamento, sujeitos à disponibilidade em estoque. Instalação, infraestrutura elétrica, proteções e ART são orçadas à parte, conforme o local.</p>
            <p className="mt-4"><Button href="/carregadores/" variant="secondary" size="sm">Comparar os carregadores</Button></p>
          </div>
        </div>
      </Band>

      <Section tone="ink" id="lei" labelledBy="lei-t">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div data-reveal>
              <p className="eyebrow mb-4">Seu direito, em São Paulo</p>
              <h2 id="lei-t" className="text-h2">O condomínio pode proibir o carregador na minha vaga?</h2>
              <p className="mt-5 text-lead text-fg-muted">A Lei Estadual nº 18.403/2026 garante ao condômino o direito de instalar uma estação de recarga em vaga privativa, desde que cumpra os requisitos técnicos e de segurança. O condomínio só pode negar com justificativa técnica.</p>
              <p className="mt-4 text-fg-muted">É por isso que o projeto, a ART e a instalação conforme a IT-41 fazem parte do serviço: eles são o que sustenta o seu pedido.</p>
              <p className="mt-6"><Button href="/guias/lei-carregador-condominio-sao-paulo/" variant="onDark">Ler o guia sobre a lei</Button></p>
            </div>
            <div data-reveal className="card p-7">
              <p className="font-display text-lg font-bold">Seu pedido leva:</p>
              <CheckList className="mt-4" items={['Projeto elétrico e ART', 'Circuito exclusivo com disjuntor, DR e proteção contra sobretensão', 'Instalação adequada à IT-41', 'Definição de como a energia será medida e paga']} />
            </div>
          </div>
        </Container>
      </Section>

      <Band tone="light" id="prepared" eyebrow="Para o síndico também" title="Seu prédio ainda não está preparado?" lead="Se o condomínio hesita por causa da capacidade elétrica ou da organização das garagens, existe um caminho em quatro etapas.">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <p className="text-fg-muted">Medir com um laudo de demanda, preparar com a infraestrutura seca, controlar a carga e regularizar na IT-41. Com a infraestrutura pronta, a instalação de cada morador é mais rápida, e o morador ganha desconto.</p>
          <Button href="/condominios/" variant="dark" size="lg">Ver o caminho do prédio</Button>
        </div>
      </Band>

      <Section tone="paper" id="formulario" labelledBy="form-t">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div data-reveal>
              <p className="eyebrow mb-4">Visita técnica gratuita</p>
              <h2 id="form-t" className="text-h2">Conte sobre a sua vaga e a gente chama você.</h2>
              <p className="mt-5 text-lead text-fg-muted">Preencha o formulário ou chame direto no WhatsApp. Respondemos em horário comercial.</p>
              <p className="mt-6"><Button href={whatsappLink(wa.morador)} icon="whatsapp">Falar no WhatsApp</Button></p>
            </div>
            <div data-reveal className="card p-6 md:p-9"><ContactForm profile="morador" origin={PATH} /></div>
          </div>
        </Container>
      </Section>

      <FAQ items={faqs.instalacao} tone="light" />

      <DuvidasSobre path={PATH} />
      <Band tone="paper" id="continue" eyebrow="Continue por aqui" title="Para ir além da vaga.">
        <RelatedLinks items={[
          { href: '/carregadores/', kicker: 'Equipamento', title: 'Carregadores', text: 'WEG, Intelbras e Livoltek, 7,4 kW.' },
          { href: '/guias/quanto-custa-instalar-carregador-carro-eletrico/', kicker: 'Guia', title: 'Quanto custa instalar', text: 'O que compõe o preço, parte por parte.' },
          { href: '/sao-paulo/', kicker: 'Cidade', title: 'Recarga em São Paulo', text: 'Lei estadual, Bombeiros e onde a Eletrix opera.' },
        ]} />
      </Band>
      <CTABand title="Agende a visita técnica gratuita." text="Descubra o que o seu prédio permite e quanto custa instalar na sua vaga." whatsappMessage={wa.morador} bg="case-4" />
    </>
  );
}
