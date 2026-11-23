import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Band, Prose } from '@/components/sections/Band';
import { FeatureGrid, Split, MediaFrame } from '@/components/sections/Blocks';
import { FAQ } from '@/components/sections/FAQ';
import { FinalContact } from '@/components/sections/FinalContact';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Picture } from '@/components/ui/Picture';
import { journey } from '@/data/solutions';
import { faqs } from '@/data/faqs';
import { wa } from '@/data/whatsapp';
import { whatsappLink } from '@/config/site';

const PATH = '/condominios/';
export const metadata = pageMeta(PATH);

export default function CondosPage() {
  return (
    <>
      <JsonLd data={serviceLd({ name: 'Carregador de carro elétrico em condomínio: laudo, infraestrutura, controle de demanda e IT-41', description: 'Do laudo de demanda à regularização na IT-41, a Eletrix prepara o condomínio para a recarga de veículos elétricos.', path: PATH })} />
      <PageHero
        crumbs={[{ name: 'Para condomínios', href: PATH }]}
        eyebrow="Para síndicos e gestores"
        title="Carregador de carro elétrico em condomínio: medir, preparar, controlar e regularizar."
        lead="Os moradores estão comprando carros elétricos. Em vez de decidir na pressão da assembleia, organize a recarga com um caminho claro, com cada morador pagando a própria energia e o prédio dentro da norma."
        actions={<>
          <Button href={whatsappLink(wa.sindico)} icon="whatsapp" size="lg">Falar com o time</Button>
          <Button href="#caminho" variant="onDark" size="lg" icon="chevronDown">Ver o caminho</Button>
        </>}
        bg={{ name: 'arquipeo-aerea', position: '50% 40%' }}
        chips={['Contrate só o que precisa', 'Cada morador paga o seu', 'ART em todas as etapas']}
      />

      <Band tone="light" id="caminho" eyebrow="O caminho" title="Quatro etapas, um só parceiro." lead="Contrate só o que precisa ou o pacote completo. Do laudo à regularização, sem dor de cabeça para o síndico.">
        <ol className="relative grid gap-5 lg:grid-cols-4">
          {journey.map((s, i) => (
            <li key={s.slug} data-reveal style={{ ['--d' as string]: `${i * 80}ms` }}>
              <Link href={s.href} className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-0.5 hover:border-brand-500/60 hover:shadow-card">
                <div className="aspect-[16/10] overflow-hidden"><Picture name={s.image} alt="" fill sizes="(min-width:1024px) 290px, 100vw" className="transition duration-500 group-hover:scale-[1.04]" /></div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between"><span className="rounded-full bg-ink-900 px-3 py-1 font-display text-[0.78rem] font-bold uppercase tracking-wider text-brand-400">{s.step}</span><span className="font-display text-sm font-bold text-fg-muted tnum">{String(i + 1).padStart(2, '0')}</span></div>
                  <h3 className="mt-4 font-display text-[1.15rem] font-bold leading-snug">{s.name}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] text-fg-muted">{s.tagline}</p>
                  {s.price && <p className="mt-4 border-t border-hair pt-3 text-sm font-semibold text-accent">{s.price}</p>}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">Ver detalhes <Icon name="arrowRight" size={16} className="transition group-hover:translate-x-0.5" /></span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </Band>

      <Band tone="paper" id="como-decidir" eyebrow="Por onde começar" title="Cada etapa responde a uma pergunta da assembleia.">
        <FeatureGrid columns={2} items={[
          { icon: 'gauge', title: '“O prédio aguenta?” → Medir', text: <>O laudo de demanda mede o consumo real por 7 dias e indica quantos carregadores cabem. <Link href="/laudo-de-demanda/">Ver laudo</Link>.</> },
          { icon: 'route', title: '“Como evitar a bagunça?” → Preparar', text: <>A infraestrutura seca leva as eletrocalhas até as vagas, com padrão único e fim dos “gatos”. <Link href="/infraestrutura-seca/">Ver infraestrutura</Link>.</> },
          { icon: 'sliders', title: '“E se todos carregarem ao mesmo tempo?” → Controlar', text: <>O controle de demanda ajusta a potência dos carregadores para nunca passar do limite seguro. <Link href="/controle-de-demanda/">Ver controle</Link>.</> },
          { icon: 'shield', title: '“E os Bombeiros?” → Regularizar', text: <>A adequação à IT-41 deixa a recarga pronta para o AVCB, com ART e documentação para o AVCB. <Link href="/adequacao-it-41/">Ver IT-41</Link>.</> },
        ]} />
      </Band>

      <Band tone="light" id="quem-paga" eyebrow="Quem paga a energia" title="Cada morador paga o seu consumo." lead="Sem rateio por estimativa e sem a conta do carro de um virando conta de todos.">
        <Split media={<MediaFrame className="aspect-[4/3]"><Picture name="case-1" alt="Carregador Eletrix instalado em pilar de garagem, ligado ao medidor da unidade" fill sizes="(min-width:1024px) 560px, 100vw" /></MediaFrame>}>
          <Prose>
            <p>Na <Link href="/instalacao-carregador-residencial/">instalação em vaga privativa</Link>, o carregador é ligado ao <strong>medidor da própria unidade</strong>: o consumo do carro entra na conta de luz do morador. Quando o condomínio preferir, também é possível ligar no quadro da administração e estruturar a cobrança pelo uso.</p>
            <p>Para <strong>vagas coletivas, visitantes e hóspedes</strong>, a solução é a recarga coletiva: <Link href="/eletrix-rent/">Eletrix Rent</Link>, em que quem recarrega paga pelo app e a energia é 100% reembolsada ao condomínio.</p>
            <p>Com a infraestrutura seca da Eletrix, o morador ainda tem <strong>desconto na instalação</strong> da própria vaga.</p>
          </Prose>
        </Split>
      </Band>

      <Band tone="ink" id="lei" eyebrow="O que diz a lei" title="O morador tem direito. O prédio precisa estar preparado." lead="Em São Paulo, a Lei Estadual nº 18.403/2026 garante ao condômino o direito de instalar a estação de recarga em vaga privativa, desde que cumpra os requisitos técnicos e de segurança.">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <p className="text-fg-muted">O condomínio só pode negar com justificativa técnica. Por isso, o melhor caminho é ter respostas técnicas prontas: um laudo que mostra o que o prédio comporta, uma infraestrutura organizada e uma instalação dentro da IT-41. Assim, a assembleia discute o “como”, não o “se”.</p>
          <div className="flex flex-wrap gap-3 lg:justify-end"><Button href="/guias/lei-carregador-condominio-sao-paulo/" variant="onDark">Guia sobre a lei</Button><Button href="/guias/it-41-carregador-veicular/" variant="onDark">Guia sobre a IT-41</Button></div>
        </div>
      </Band>

      <Band tone="light" id="porque" eyebrow="Por que a Eletrix" title="Um só parceiro, do laudo à regularização.">
        <FeatureGrid items={[
          { icon: 'handshake', title: 'Contrate só o que precisa', text: 'Cada etapa é independente. Faça só o laudo, ou o pacote completo.' },
          { icon: 'file', title: 'ART e documentação', text: 'Tudo documentado para a vistoria e para a prestação de contas do síndico.' },
          { icon: 'headset', title: 'Suporte 24 horas', text: 'Quem instala também cuida, sem empurrar o problema para a administração.' },
        ]} />
        <p className="mt-8 text-fg-muted">Já tem carregadores instalados no prédio? A <Link href="/troca-de-operador/" className="font-semibold text-accent underline underline-offset-4">troca de operador</Link> resolve suporte e IT-41 de uma vez.</p>
      </Band>

      <FAQ items={faqs.condominios} />
      <FinalContact initial="sindico" whatsappMessage={wa.sindico} title="Vamos planejar o caminho do seu condomínio?" />
    </>
  );
}
