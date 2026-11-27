import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, absoluteUrl, site, whatsappLink } from '@/config/site';
import { orgId } from '@/lib/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Section';
import { Picture } from '@/components/ui/Picture';
import { Icon } from '@/components/ui/Icon';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppGlyph';
import { ContactForm } from '@/components/forms/ContactForm';
import { wa } from '@/data/whatsapp';

const PATH = '/contato/';
export const metadata = pageMeta(PATH);

const a = site.contact.address;
const ld = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: absoluteUrl(PATH),
  mainEntity: {
    '@type': ['LocalBusiness', 'Organization'],
    '@id': orgId,
    name: site.name,
    image: `${SITE_URL}/og/home.png`,
    telephone: site.contact.phoneCommercialTel,
    email: site.contact.email,
    address: { '@type': 'PostalAddress', streetAddress: a.street, addressLocality: a.city, addressRegion: a.state, postalCode: a.zip, addressCountry: 'BR' },
  },
};

/**
 * Contato curto: título, os três canais em cima (compactos) e o formulário logo abaixo no celular,
 * ao lado no desktop. No celular, o começo do formulário já aparece na primeira tela.
 */
export default function ContactPage() {
  const channel = 'group flex h-full flex-col items-center justify-center gap-1.5 rounded-2xl bg-white/[0.06] px-2 py-3 text-center ring-1 ring-white/10 transition hover:bg-white/[0.1] hover:ring-brand-400/60 lg:flex-row lg:justify-start lg:gap-4 lg:p-4 lg:text-left';
  const bubble = 'grid h-9 w-9 shrink-0 place-items-center rounded-full lg:h-12 lg:w-12';
  const title = 'block text-[0.8rem] font-semibold leading-tight text-white lg:text-sm lg:font-medium lg:text-muted-dark';
  const value = 'hidden min-w-0 font-display text-lg font-bold leading-snug text-white [overflow-wrap:anywhere] lg:block';
  return (
    <>
      <JsonLd data={ld} />
      <section data-tone="dark" aria-labelledby="contato-t" className="relative isolate overflow-hidden pb-14 pt-[calc(var(--header-h)+12px)] md:pb-20 md:pt-[calc(var(--header-h)+32px)] lg:pt-[calc(var(--header-h)+40px)]">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <Picture name="aqwa-noite" alt="" priority fill sizes="100vw" className="opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/90 to-ink-950" />
          <div className="absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-brand-500/20 blur-[130px]" />
        </div>
        <Container>
          <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div>
              <div className="mb-5 hidden lg:block"><Breadcrumbs items={[{ name: 'Contato', href: PATH }]} /></div>
              <h1 id="contato-t" className="font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-white lg:text-[3.25rem] lg:leading-[1.06]">Fale com a Eletrix</h1>
              <p className="mt-1 text-[0.97rem] text-muted-dark lg:mt-4 lg:text-lead">Escolha um canal ou envie o formulário.</p>
              <ul data-wa-avoid className="mt-4 grid grid-cols-3 gap-2 lg:mt-8 lg:grid-cols-1 lg:gap-3" aria-label="Canais de contato">
                <li>
                  <a href={whatsappLink(wa.default)} target="_blank" rel="noopener noreferrer" className={channel}>
                    <span className={`${bubble} bg-[#25D366] text-white`}><WhatsAppGlyph size={22} /></span>
                    <span className="min-w-0"><span className={title}>WhatsApp<span className="hidden lg:inline"> comercial</span></span><span className={value}>{site.contact.phoneCommercialDisplay}</span></span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contact.email}`} className={channel}>
                    <span className={`${bubble} bg-brand-500 text-ink-950`}><Icon name="mail" size={20} strokeWidth={1.9} /></span>
                    <span className="min-w-0"><span className={title}>E-mail</span><span className={value}>{site.contact.email}</span></span>
                  </a>
                </li>
                <li>
                  <Link href="/suporte/" aria-haspopup="dialog" className={channel}>
                    <span className={`${bubble} bg-white text-ink-950`}><Icon name="headset" size={20} strokeWidth={1.9} /></span>
                    <span className="min-w-0"><span className={title}>Suporte<span className="hidden lg:inline"> das estações</span></span><span className={value}>{site.contact.support0800Display}</span></span>
                  </Link>
                </li>
              </ul>
            </div>
            <div data-tone="light" className="rounded-3xl p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)] sm:p-8">
              <h2 className="sr-only">Formulário de contato</h2>
              <ContactForm origin={PATH} readParams />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
