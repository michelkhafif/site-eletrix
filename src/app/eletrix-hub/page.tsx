import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band, Prose } from '@/components/sections/Band';
import { Steps, FeatureGrid, CheckList, CompareTable, Split, MediaFrame, RelatedLinks } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { DuvidasSobre } from '@/components/sections/DuvidasSobre';
import { CTABand } from '@/components/sections/CTABand';
import { Button } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { Container, Section } from '@/components/ui/Section';
import { FeaturedLogos } from '@/components/sections/LogoMarquee';
import { faqs } from '@/data/faqs';
import { wa } from '@/data/whatsapp';
import { whatsappLink } from '@/config/site';

const PATH = '/eletrix-hub/';
export const metadata = pageMeta(PATH);

export default function HubPage() {
  return (
    <>
      <JsonLd data={serviceLd({ name: 'Eletrix Hub', description: 'Estações de recarga tarifadas em comodato por 36 meses, com operação completa da Eletrix, para prédios corporativos e shoppings.', path: PATH })} />
      <PageHero
        crumbs={[{ name: 'Eletrix Hub', href: PATH }]}
        eyebrow="Para prédios corporativos e shoppings"
        title="Eletrix Hub: recarga tarifada para prédios corporativos e shoppings, sem mensalidade."
        lead="A Eletrix instala, opera e dá suporte às estações. O seu empreendimento oferece recarga a quem usa o espaço, tem a energia 100% reembolsada e ainda recebe um bônus. Qualidade de serviço à altura de um AAA."
        actions={<>
          <Button href={whatsappLink(wa.hub)} icon="whatsapp" size="lg">Falar no WhatsApp</Button>
          <Button href="#modelo" variant="onDark" size="lg" icon="chevronDown">Entender o modelo</Button>
        </>}
        chips={['Comodato por 36 meses', 'Rescisão sem multa', 'Suporte 24 horas', 'Energia 100% reembolsada']}
        image={{ name: 'totem-orelhao', alt: 'Totem orelhão azul da Eletrix com um carro elétrico em recarga em frente a um edifício corporativo', position: '50% 40%' }}
      />

      <Band tone="light" id="o-que-e" eyebrow="O que é" title="Uma estação de recarga completa, operada pela Eletrix." lead="O Eletrix Hub é a solução para locais com alta rotatividade de veículos elétricos: o motorista chega, carrega enquanto trabalha, compra ou se hospeda, e paga pela recarga no app.">
        <Split
          media={<MediaFrame className="aspect-[4/3]"><Picture name="hub-garagem" alt="Garagem com carregadores Eletrix instalados em parede, em fila, ao lado das vagas" fill sizes="(min-width:1024px) 560px, 100vw" /></MediaFrame>}
        >
          <Prose>
            <p>O carregador fica em <strong>comodato por 36 meses</strong>: ele é da Eletrix e não há mensalidade para o empreendimento. O investimento do local está na infraestrutura, e ela é negociável. Depois da visita técnica, a Eletrix analisa a demanda e avalia a sua participação nos custos para viabilizar a operação.</p>
            <p>É a solução indicada para <strong>prédios corporativos e shoppings</strong>. Nos dois, o objetivo para o usuário é o mesmo: aproveitar o tempo de permanência. Quem carrega, ganha conveniência. Quem administra, ganha um serviço a mais para o espaço e uma receita que não existia.</p>
            <p>Para fluxos menores, como condomínios residenciais, hotéis e pequenos comércios, existe o <Link href="/eletrix-rent/">Eletrix Rent</Link>.</p>
          </Prose>
        </Split>
      </Band>

      <Band tone="paper" id="como-funciona" eyebrow="Como funciona" title="Da visita técnica à primeira recarga." lead="Um só interlocutor em todas as etapas. O empreendimento acompanha, aprova e decide onde faz sentido.">
        <Steps items={[
          { title: 'Visita técnica', text: 'A Eletrix visita o local, entende o fluxo de veículos, avalia a demanda de energia e define onde as estações devem ficar.' },
          { title: 'Proposta e infraestrutura', text: 'Você recebe a proposta com o escopo. A infraestrutura é negociável: a Eletrix avalia a sua participação nos custos.' },
          { title: 'Instalação conforme a IT-41', text: 'Instalação com ART do serviço e do projeto elétrico, proteções, placas e comunicação visual, e adequação à IT-41.' },
          { title: 'Operação Eletrix', text: 'As estações entram no app, o motorista paga a recarga e a Eletrix cuida de suporte e manutenção, 24 horas por dia.' },
        ]} />
      </Band>

      <Section tone="dark" id="modelo" labelledBy="modelo-t">
        <Container>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div data-reveal>
              <p className="eyebrow mb-4">O modelo comercial</p>
              <h2 id="modelo-t" className="text-h2">Energia 100% reembolsada, com bônus ao local.</h2>
              <p className="mt-5 text-lead text-muted-dark">Sobre cada kWh cobrado, o empreendimento recebe de volta o custo da energia e mais um bônus. A conta é simples e transparente.</p>
              <p className="mt-6 text-muted-dark">A Eletrix <strong className="text-white">recomenda</strong> uma tarifa final ao usuário, mas <strong className="text-white">não impõe</strong>: o empreendimento participa da decisão. Os valores de tarifa variam conforme o local e são apresentados na proposta.</p>
            </div>
            <div data-reveal className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="text-sm font-semibold text-brand-400">Como a tarifa se divide, por kWh</p>
              <ul className="mt-6 space-y-4">
                {[
                  { n: '1', t: 'Parcela da Eletrix', d: 'Fixa por kWh, qualquer que seja o custo de energia do local.', tag: 'Fixa' },
                  { n: '2', t: 'Reembolso da energia', d: 'Segue o custo real de energia do local. 100% reembolsado.', tag: '100%' },
                  { n: '3', t: 'Bônus ao empreendimento', d: 'Dependendo do custo de energia do cliente, o bônus pode ser maior.', tag: 'Para o local' },
                ].map((r) => (
                  <li key={r.n} className="flex flex-wrap items-start gap-4 rounded-2xl border border-white/10 bg-ink-900 p-5 sm:flex-nowrap">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 font-display font-bold text-ink-950">{r.n}</span>
                    <span className="flex-1">
                      <span className="block font-display font-bold text-white">{r.t}</span>
                      <span className="block text-[0.95rem] text-muted-dark">{r.d}</span>
                    </span>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-brand-400">{r.tag}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-dark">O motorista paga a tarifa final pelo app Eletrix.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Band tone="light" id="incluso" eyebrow="O que está incluso" title="Tudo o que o empreendimento precisa, sem montar uma operação." lead="Do projeto ao suporte, a Eletrix assume as partes que dão trabalho.">
        <FeatureGrid items={[
          { icon: 'plug', title: 'Carregador em comodato', text: 'Equipamento da Eletrix por 36 meses, sem mensalidade para o empreendimento.' },
          { icon: 'file', title: 'ART do serviço e do projeto', text: 'Responsabilidade técnica documentada, do projeto elétrico à instalação.' },
          { icon: 'shield', title: 'Proteção elétrica', text: 'Proteção contra choque, sobretensão e sobrecorrente em todos os pontos.' },
          { icon: 'clipboard', title: 'Adequação à IT-41', text: 'Pontos de recarga sinalizados e com desligamento de emergência, prontos para o AVCB.' },
          { icon: 'palette', title: 'Placas e comunicação visual', text: 'Sinalização clara para o motorista encontrar e usar a estação.' },
          { icon: 'network', title: 'Internet para a operação', text: 'Quando necessário, a conexão que mantém a estação online também é incluída.' },
          { icon: 'headset', title: 'Suporte 24 horas', text: 'Em caso de problema, o carregador volta a funcionar em até 12 horas.' },
        ]} />
      </Band>

      <Band tone="paper" id="formatos" eyebrow="Formatos de instalação" title="A estação certa para cada espaço." lead="Parede, totem orelhão, totem com cobertura, totem sem cobertura e chapa de aço, em áreas internas e externas.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { img: 'case-7', alt: 'Carregador Eletrix fixado em parede de garagem, com a numeração da vaga', t: 'Parede', d: 'Para garagens e subsolos, com o melhor aproveitamento de espaço.' },
            { img: 'totem-orelhao', alt: 'Totem orelhão azul da Eletrix ao ar livre', t: 'Totem orelhão', d: 'Cobertura que protege a estação e o motorista em áreas externas.' },
            { img: 'case-6', alt: 'Carregador Eletrix instalado em totem de piso numerado, em garagem', t: 'Totem', d: 'Com ou sem cobertura, onde não há parede ou pilar por perto.' },
          ].map((f) => (
            <figure key={f.t} data-reveal className="card overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden"><Picture name={f.img} alt={f.alt} fill sizes="(min-width:768px) 400px, 100vw" /></div>
              <figcaption className="p-5"><span className="font-display text-lg font-bold">{f.t}</span><span className="mt-1 block text-[0.95rem] text-fg-muted">{f.d}</span></figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-fg-muted">Também há instalação em <strong className="text-fg">chapa de aço</strong>. O formato é definido na visita técnica, conforme o local.</p>
      </Band>

      <Section tone="ink" id="potencia" labelledBy="potencia-t">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div data-reveal>
              <p className="eyebrow mb-4">Equipamento</p>
              <h2 id="potencia-t" className="text-h2">7,4 kW: nem mais, nem menos.</h2>
              <p className="mt-5 text-lead text-fg-muted">As estações são de corrente alternada (AC), com conector Tipo 2, das marcas WEG, Intelbras e Livoltek.</p>
              <CheckList className="mt-8" items={[
                <span key="a"><strong className="text-white">Potência ideal.</strong> Praticamente todos os veículos elétricos vendidos no Brasil limitam a recarga AC a 7,4 kW. Instalar 11 kW ou 22 kW em AC não traz ganho real.</span>,
                <span key="b"><strong className="text-white">Nem mais, nem menos.</strong> Potências menores aumentam o tempo de recarga; maiores encarecem a infraestrutura sem benefício prático no dia a dia.</span>,
                <span key="c"><strong className="text-white">Parceiros confiáveis.</strong> Equipamentos robustos, bem documentados, com suporte técnico ágil em todo o Brasil e garantia e pós-venda entre os mais completos do mercado.</span>,
              ]} />
              <p className="mt-6"><Button href="/guias/qual-potencia-carregador-carro-eletrico/" variant="ghost">Ler o guia sobre potência</Button></p>
            </div>
            <div data-reveal className="card p-7">
              <p className="text-sm font-semibold text-accent">Ficha técnica de referência</p>
              <dl className="mt-5 divide-y divide-hair">
                {[
                  ['Entrada', '220 V, monofásico ou bifásico, 50–60 Hz'],
                  ['Potência máxima', '7,4 kW (32 A)'],
                  ['Corrente ajustável', '6 a 32 A'],
                  ['Conector', 'Tipo 2, modo 3'],
                  ['Volvo XC40 Recharge (100% elétrico)', 'de 50% a 100% em cerca de 5h40'],
                  ['BYD Song Plus (híbrido plug-in)', 'de 50% a 100% em cerca de 1h20'],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-3"><dt className="text-fg-muted">{k}</dt><dd className="font-medium text-fg">{v}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <Band tone="light" id="controle" eyebrow="Você decide" title="Controle do empreendimento sobre a operação." lead="O Hub se adapta ao jeito de cada local administrar o espaço.">
        <FeatureGrid columns={2} items={[
          { icon: 'clock', title: 'Taxa de ociosidade opcional', text: 'Se o veículo não for retirado ao fim da recarga (tolerância de, por exemplo, 20 minutos), o empreendimento pode cobrar por minuto de permanência. A decisão é do empreendimento.' },
          { icon: 'palette', title: 'White label', text: <>Carregadores e experiência no app com a sua marca e a assinatura Powered by Eletrix. <Link href="/white-label/">Saiba mais</Link>.</> },
        ]} />
      </Band>

      <Band tone="paper" id="comparativo" eyebrow="Hub ou Rent?" title="Qual modelo serve ao seu local." lead="Em ambos, a Eletrix opera a recarga e a energia é 100% reembolsada. A diferença está no fluxo esperado e no investimento.">
        <CompareTable caption="Comparativo entre Eletrix Hub e Eletrix Rent" head={['', 'Eletrix Hub', 'Eletrix Rent']} rows={[
          ['Modelo', 'Comodato por 36 meses', 'Locação com mensalidade fixa'],
          ['Ideal para', 'Prédios corporativos e shoppings, com alto fluxo de veículos', 'Condomínios residenciais, hotéis e pequenos comércios, com fluxo menor'],
          ['Investimento do local', 'Infraestrutura, negociável', 'Infraestrutura + mensalidade'],
          ['Energia', '100% reembolsada + bônus ao local', '100% reembolsada, com chance de gerar receita'],
          ['Rescisão', 'A qualquer momento, sem multa', 'Condições na proposta'],
        ]} />
        <p className="mt-6"><Button href="/eletrix-rent/" variant="secondary">Conhecer o Eletrix Rent</Button></p>
      </Band>

      <Section tone="dark" tight id="troca">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div data-reveal>
              <p className="eyebrow mb-3">Já tem carregadores?</p>
              <h2 className="text-h3 max-w-2xl text-white">Assumimos a operação e regularizamos.</h2>
              <p className="mt-3 max-w-2xl text-muted-dark">Se o seu empreendimento tem carregadores de outra operadora, com suporte ruim ou fora da IT-41, a Eletrix substitui os equipamentos e faz a adequação, com condições avaliadas por empreendimento.</p>
            </div>
            <Button href="/troca-de-operador/" size="lg">Ver a troca de operador</Button>
          </div>
        </Container>
      </Section>

      <Band tone="light" id="confianca" eyebrow="Quem já escolheu" title="Os nomes que confiam a recarga à Eletrix." tight>
        <FeaturedLogos tone="light" />
      </Band>

      <FAQ items={faqs.hub} />

      <DuvidasSobre path={PATH} />
      <Band tone="light" id="continue" eyebrow="Continue por aqui" title="Soluções que se complementam.">
        <RelatedLinks items={[
          { href: '/eletrix-rent/', kicker: '07', title: 'Eletrix Rent', text: 'Locação com mensalidade fixa para fluxos menores.' },
          { href: '/troca-de-operador/', kicker: 'Migração', title: 'Troca de operador', text: 'Assumimos a operação e regularizamos.' },
          { href: '/#estacoes', kicker: 'Rede', title: 'Onde a Eletrix opera', text: 'Empreendimentos e mapa de estações.' },
        ]} />
      </Band>
      <CTABand title="Vamos conversar sobre o seu empreendimento?" text="Agende uma visita técnica. A Eletrix analisa a demanda e apresenta a proposta, com a infraestrutura negociada." whatsappMessage={wa.empreendimento} bg="thera-praca" />
    </>
  );
}
