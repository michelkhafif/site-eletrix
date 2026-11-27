import { pageMeta } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { PartnerRows } from '@/components/sections/LogoMarquee';
import { contactHref } from '@/data/services';

const PATH = '/parceiros/';
export const metadata = pageMeta(PATH);

/** Página curta: título, os 28 logos em três faixas e um convite discreto para conversar. */
export default function PartnersPage() {
  return (
    <section data-tone="dark" aria-labelledby="parceiros-t" className="relative isolate overflow-hidden pb-16 pt-[calc(var(--header-h)+28px)] md:pb-24 md:pt-[calc(var(--header-h)+44px)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[34%] h-[420px] w-[min(900px,90vw)] -translate-x-1/2 rounded-full bg-brand-500/[0.16] blur-[130px]" />
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
      </div>
      <Container>
        <Breadcrumbs items={[{ name: 'Parceiros', href: PATH }]} />
        <div className="mx-auto mt-8 max-w-3xl text-center md:mt-10">
          <h1 id="parceiros-t" className="text-h1 text-white">Quem confia na Eletrix</h1>
          <p className="mt-4 text-lead text-muted-dark">Administradoras, fundos, incorporadoras, hotéis, redes e os fabricantes dos equipamentos que instalamos.</p>
        </div>
      </Container>

      <div className="mt-10 md:mt-14">
        <PartnerRows />
      </div>

      <Container>
        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 border-t border-white/10 pt-10 text-center md:mt-16 md:flex-row md:justify-between md:text-left">
          <p className="font-display text-xl font-bold text-white">Quer a Eletrix no seu empreendimento?</p>
          <Button href={contactHref({ perfil: 'empreendimento' })} size="lg">Falar com um especialista</Button>
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-dark">As marcas pertencem aos respectivos titulares e são exibidas para identificar relações comerciais.</p>
      </Container>
    </section>
  );
}
