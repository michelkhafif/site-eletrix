import { pageMeta } from '@/lib/seo';
import { FAQ } from '@/components/sections/FAQ';
import { CheckList } from '@/components/sections/Blocks';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container, Section } from '@/components/ui/Section';
import { SupportOptions } from '@/components/support/SupportOptions';
import { faqs } from '@/data/faqs';

const PATH = '/suporte/';
export const metadata = pageMeta(PATH);

/** Versão em página do popup de suporte (sem JavaScript e para o Google). Mesmo conteúdo, enxuto. */
export default function SupportPage() {
  return (
    <>
      <section data-tone="dark" aria-labelledby="sup-t" className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+28px)] md:pb-24 md:pt-[calc(var(--header-h)+48px)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-500/15 blur-[120px]" />
        <Container className="relative">
          <div className="max-w-3xl">
            <div className="mb-6 hidden sm:block"><Breadcrumbs items={[{ name: 'Suporte', href: PATH }]} /></div>
            <h1 id="sup-t" className="text-h1 text-white">Suporte Eletrix</h1>
            <p className="mt-3 max-w-xl text-lead text-muted-dark">Problema em uma estação? Tenha em mãos o local e o número que está na placa do carregador.</p>
            <div data-tone="light" className="mt-7 rounded-3xl p-3 shadow-lift sm:p-5">
              <SupportOptions columns />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="paper" tight labelledBy="antes-t">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <h2 id="antes-t" className="text-h3">A recarga não iniciou? Confira antes de ligar</h2>
            <CheckList items={[
              'O plugue está totalmente encaixado no carro, e o carro está destravado.',
              'No app, a estação escolhida é a certa (ou você leu o QR code da placa).',
              'Há cartão de crédito válido ou saldo em carteira no app.',
              'O app está atualizado na App Store ou no Google Play.',
            ]} />
          </div>
        </Container>
      </Section>

      <FAQ items={faqs.suporte} tone="light" />
    </>
  );
}
