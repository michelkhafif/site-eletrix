import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Band } from '@/components/sections/Band';
import { FAQ } from '@/components/sections/FAQ';
import { CTABand } from '@/components/sections/CTABand';
import { StationMap } from '@/components/sections/StationMap';
import { Steps } from '@/components/sections/Blocks';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { Button } from '@/components/ui/Button';
import { stations, stationsByCity, ufs } from '@/lib/stations';
import { faqs } from '@/data/faqs';
import { wa } from '@/data/whatsapp';

const PATH = '/estacoes/';
export const metadata = pageMeta(PATH);

const ufOrder = ['SP', 'RJ', 'PR', 'SC', 'RS', 'BA'];
const ufName: Record<string, string> = { SP: 'São Paulo', RJ: 'Rio de Janeiro', PR: 'Paraná', SC: 'Santa Catarina', RS: 'Rio Grande do Sul', BA: 'Bahia' };

export default function StationsPage() {
  const orderedUfs = [...ufs].sort((a, b) => ufOrder.indexOf(a) - ufOrder.indexOf(b));
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Estações', href: PATH }]}
        eyebrow="Mapa de estações"
        title="Onde carregar carro elétrico em São Paulo e no Brasil."
        lead="Prédios corporativos, hotéis, shoppings, estacionamentos e condomínios com estações Eletrix. Encontre o ponto mais próximo e recarregue pelo app, com cartão de crédito ou saldo em carteira."
        actions={<StoreBadges />}
      />

      <Band tone="light" id="mapa" eyebrow="Mapa" title="Estações Eletrix em operação." lead="Aproxime e toque em um ponto para ver o nome e a cidade. Confira no app a disponibilidade da estação antes de ir.">
        <StationMap stations={stations} ufs={orderedUfs} />
      </Band>

      <Band tone="paper" id="lista" eyebrow="Lista por cidade" title="Todos os locais, em texto." lead="A mesma informação do mapa, organizada por estado e cidade.">
        <div className="space-y-4">
          {orderedUfs.map((uf) => (
            <details key={uf} className="card group" open={uf === 'SP'}>
              <summary className="flex items-center justify-between gap-4 px-6 py-5 font-display text-xl font-bold">
                <span>{ufName[uf] ?? uf}</span>
                <span className="chev text-accent transition-transform duration-200" aria-hidden="true">▾</span>
              </summary>
              <div className="grid gap-x-10 gap-y-8 border-t border-hair px-6 py-6 md:grid-cols-2 lg:grid-cols-3">
                {stationsByCity.filter((c) => c.uf === uf).sort((a, b) => (a.city === 'São Paulo' ? -1 : b.city === 'São Paulo' ? 1 : a.city.localeCompare(b.city, 'pt'))).map((c) => (
                  <div key={c.city}>
                    <h3 className="font-display text-base font-bold">{c.city}</h3>
                    <ul className="mt-2 space-y-1 text-[0.95rem] text-fg-muted">
                      {c.items.map((s) => <li key={s.name}>{s.name}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </Band>

      <Band tone="light" id="como-usar" eyebrow="Como recarregar" title="Quatro passos no seu carro.">
        <Steps items={[
          { title: 'Baixe o app Eletrix', text: 'Disponível para iOS e Android. A placa da estação traz um QR code para baixar.' },
          { title: 'Conecte o plugue', text: 'Encaixe o plugue Tipo 2 no seu veículo.' },
          { title: 'Selecione o carregador', text: 'Escolha a estação no app ou leia o QR code que está nela.' },
          { title: 'Finalize no app', text: 'Termine a recarga pelo app e retire o plugue. O pagamento é feito no próprio app.' },
        ]} />
        <p className="mt-8"><Button href="/app/" variant="secondary">Conhecer o app</Button></p>
      </Band>

      <FAQ items={faqs.app} tone="paper" />
      <CTABand title="Quer uma estação no seu empreendimento?" text="O Eletrix Hub leva recarga a prédios, hotéis, shoppings e galpões, com operação completa da Eletrix." whatsappMessage={wa.empreendimento} bg="botafogo-trade-center" />
    </>
  );
}
