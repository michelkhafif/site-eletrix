import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band, Prose } from '@/components/sections/Band';
import { Steps, FeatureGrid, CheckList, Callout, Split, MediaFrame, RelatedLinks } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { CTABand } from '@/components/sections/CTABand';
import { Button } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { faqs } from '@/data/faqs';
import { wa } from '@/data/whatsapp';
import { whatsappLink } from '@/config/site';

const PATH = '/adequacao-it-41/';
export const metadata = pageMeta(PATH);

export default function It41Page() {
  return (
    <>
      <JsonLd data={serviceLd({ name: 'Adequação à IT-41 do Corpo de Bombeiros para carregadores veiculares', description: 'Quadro identificado, botoeira de emergência por pavimento e sinalização S.A.V.E. em cada carregador.', path: PATH, areaServed: 'São Paulo' })} />
      <PageHero
        crumbs={[{ name: 'Adequação IT-41', href: PATH }]}
        eyebrow="05 · Regularizar"
        title="Adequação à IT-41: recarga regularizada e pronta para o AVCB."
        lead="A IT-41 do Corpo de Bombeiros de São Paulo passou a incluir os sistemas de recarga de veículos elétricos. A Eletrix instala o quadro identificado, a botoeira de emergência por pavimento e a sinalização em cada carregador."
        actions={<>
          <Button href={whatsappLink(wa.it41)} size="lg" icon="whatsapp">Agendar visita técnica</Button>
          <Button href="#o-que-instalamos" variant="onDark" size="lg" icon="chevronDown">Ver o que instalamos</Button>
        </>}
        chips={['Orçamento após visita técnica', 'ART inclusa', 'Materiais e mão de obra inclusos']}
        image={{ name: 'case-7', alt: 'Carregador Eletrix instalado em parede de garagem, com sinalização e numeração da vaga', position: '50% 40%' }}
      />

      <Band tone="light" id="contexto" eyebrow="O contexto" title="O que mudou com a Portaria CCB-003/970/2026." lead="Em 17 de março de 2026, o Corpo de Bombeiros do Estado de São Paulo atualizou a IT-41 para incluir os Sistemas de Alimentação de Veículos Elétricos (SAVE).">
        <Split media={<MediaFrame className="aspect-[4/3]"><Picture name="case-2" alt="Dois carregadores Eletrix lado a lado em uma parede de garagem" fill sizes="(min-width:1024px) 560px, 100vw" /></MediaFrame>}>
          <Prose>
            <p>Para <strong>edificações existentes</strong>, as exigências passam a valer na <strong>renovação do AVCB</strong>, o Auto de Vistoria do Corpo de Bombeiros que atesta que o prédio cumpre as normas de segurança contra incêndio.</p>
            <p>Na prática, o carregador deixa de ser um equipamento elétrico comum da garagem. Ele precisa de quadro identificado, de um jeito rápido de desligar tudo em emergência e de sinalização que qualquer pessoa entenda.</p>
            <p>A norma é detalhada, e a Eletrix traduz tudo em três entregas. Quer o texto completo, em linguagem simples? Leia o <Link href="/guias/it-41-carregador-veicular/">guia da IT-41</Link>.</p>
          </Prose>
        </Split>
      </Band>

      <Band tone="paper" id="o-que-instalamos" eyebrow="O que a Eletrix instala" title="Três itens que colocam a recarga dentro da norma.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { n: '1', t: 'Quadro identificado', d: 'Placa fotoluminescente IT-41 no quadro da recarga, visível mesmo no escuro.' },
            { n: '2', t: 'Botoeira de emergência por pavimento', d: 'Um botão por andar, a até 5 m da entrada, que desliga todos os carregadores do pavimento de uma vez.' },
            { n: '3', t: 'Ponto sinalizado', d: 'Cada carregador recebe sinalização S.A.V.E. e um módulo de desligamento no quadro da vaga.' },
          ].map((i) => (
            <div key={i.n} data-reveal className="card p-7">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-900 font-display font-bold text-brand-400">{i.n}</span>
              <h3 className="mt-5 text-h3">{i.t}</h3>
              <p className="mt-2 text-fg-muted">{i.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8"><Callout icon="info" title="Como funciona, na prática">A botoeira aciona o módulo no quadro de cada vaga e desliga todos os carregadores ao mesmo tempo. Uma depende da outra: para a botoeira funcionar, todos os carregadores do andar precisam ter o módulo.</Callout></div>
      </Band>

      <Band tone="dark" id="por-que" eyebrow="Por que adequar" title="Três razões para não deixar para depois." lead="A adequação não é só burocracia. Ela protege quem usa a garagem, o patrimônio do prédio e quem responde por ele.">
        <FeatureGrid items={[
          { icon: 'clipboard', title: 'Exigida para obter ou renovar o AVCB', text: 'Em edificações existentes, as exigências valem na renovação. Adequar antes evita a corrida de última hora.' },
          { icon: 'zap', title: 'Desligamento imediato em emergência', text: 'Um botão por andar corta a energia de todos os carregadores do pavimento, rapidamente.' },
          { icon: 'shield', title: 'Proteção de pessoas, patrimônio e síndico', text: 'Documentação, ART e instalação dentro da norma reduzem o risco para o prédio e para quem o administra.' },
        ]} />
      </Band>

      <Band tone="light" id="exigencias" eyebrow="A norma, em resumo" title="O que a IT-41 pede para recarga de veículos elétricos." lead="Resumo didático da Portaria CCB-003/970/2026. A leitura completa está no nosso guia.">
        <div className="grid gap-x-12 gap-y-4 md:grid-cols-2">
          <CheckList items={[
            'Responsabilidade integral do responsável técnico e do instalador, seguindo NBR 5410, NBR 17019 e NBR IEC 61851-1.',
            'Em áreas internas, só recarga em modos 3 e 4: proibido tomada comum, adaptador ou extensão.',
            'Desligamento manual entre 0,90 m e 1,80 m do piso: chave de emergência de pavimento (a até 5 m da entrada principal, da garagem ou das escadas) e chave local (a até 5 m dos equipamentos).',
            'Interligação com alarme ou detecção de incêndio para desligamento automático, quando houver.',
            'Afastamento mínimo de 5 m da rota de saída em edificações com rota única.',
          ]} />
          <CheckList items={[
            'Circuito exclusivo por estação, com disjuntor e DR de 30 mA (tipo A, F ou B) individuais e DPS nos quadros.',
            'Proibido ligar direto no disjuntor do padrão de entrada; proteção física contra impacto de veículos.',
            'Sinalização fotoluminescente do quadro, da estação (SAVE e modo) e das chaves de emergência, com instruções e contato de suporte.',
            'ART obrigatória, com estudo de demanda e curva de carga.',
            'Comunicação sem fio dos equipamentos homologada pela Anatel. Vistoria visual e por amostragem.',
          ]} />
        </div>
        <p className="mt-8 text-fg-muted">Em residências unifamiliares, a norma traz recomendação de boas práticas. <Link href="/guias/it-41-carregador-veicular/" className="font-semibold text-accent underline underline-offset-4">Leia o guia completo</Link>.</p>
      </Band>

      <Band tone="paper" id="passo-a-passo" eyebrow="Como contratar" title="Da visita técnica à entrega com ART.">
        <Steps items={[
          { title: 'Visita técnica', text: 'Levantamos pavimentos, carregadores, quadros e o que já existe.' },
          { title: 'Proposta', text: 'Você recebe o orçamento de acordo com as particularidades do prédio.' },
          { title: 'Execução', text: 'Instalamos o quadro identificado, as botoeiras, os módulos e as placas.' },
          { title: 'Entrega com ART', text: 'Vistoria final com o síndico e entrega da documentação para o AVCB.' },
        ]} />
        <div className="mt-8"><Callout icon="route" title="A medição vem antes">A IT-41 pede estudo de demanda e curva de carga. Se o prédio ainda não tem, comece pelo <Link href="/laudo-de-demanda/">laudo de demanda</Link>: são 7 dias de medição e um relatório técnico.</Callout></div>
      </Band>

      <FAQ items={faqs.it41} />
      <Band tone="light" id="continue" eyebrow="Continue por aqui" title="A sequência completa do síndico.">
        <RelatedLinks items={[
          { href: '/laudo-de-demanda/', kicker: '02 · Medir', title: 'Laudo de demanda', text: 'Sete dias de medição e relatório técnico.' },
          { href: '/troca-de-operador/', kicker: 'Migração', title: 'Troca de operador', text: 'Carregadores fora da IT-41? Assumimos e regularizamos.' },
          { href: '/guias/it-41-carregador-veicular/', kicker: 'Guia', title: 'IT-41 explicada', text: 'O que a norma exige, em linguagem simples.' },
        ]} />
      </Band>
      <CTABand title="Prédio pronto para a vistoria." text="Agende a visita técnica e receba o orçamento da adequação à IT-41." whatsappMessage={wa.it41} bg="case-8" />
    </>
  );
}
