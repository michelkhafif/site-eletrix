import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, absoluteUrl, site, whatsappLink } from '@/config/site';
import { orgId } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section } from '@/components/ui/Section';
import { Icon, type IconName } from '@/components/ui/Icon';
import { ContactTabs } from '@/components/forms/ContactForm';
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
    openingHoursSpecification: [],
  },
};

const channels: { icon: IconName; title: string; value: string; href: string; note: string; ext?: boolean }[] = [
  { icon: 'whatsapp', title: 'WhatsApp comercial', value: site.contact.phoneCommercialDisplay, href: whatsappLink(wa.default), note: 'Orçamentos, visita técnica e propostas.', ext: true },
  { icon: 'phone', title: 'Telefone', value: site.contact.phoneCommercialDisplay, href: `tel:${site.contact.phoneCommercialTel}`, note: 'O mesmo número do comercial.' },
  { icon: 'mail', title: 'E-mail', value: site.contact.email, href: `mailto:${site.contact.email}`, note: 'Para assuntos gerais, imprensa e parcerias.' },
  { icon: 'headset', title: 'Suporte às estações', value: site.contact.phoneSupportDisplay, href: whatsappLink('Olá! Preciso de suporte em uma estação Eletrix.', 'support'), note: 'WhatsApp, 24 horas. Só para quem já usa as estações.', ext: true },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        crumbs={[{ name: 'Contato', href: PATH }]}
        eyebrow="Contato"
        title="Fale com a Eletrix: orçamento, visita técnica e dúvidas."
        lead="Escolha o canal mais cômodo. Para morador, a visita técnica de instalação na vaga é gratuita. Para empreendimentos e condomínios, o time agenda a visita e apresenta a proposta."
      />

      <Section tone="light" labelledBy="contato-t">
        <Container>
          <h2 id="contato-t" className="sr-only">Canais e formulário</h2>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <ul className="space-y-4">
                {channels.map((c) => (
                  <li key={c.title} data-reveal>
                    <a href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="card group flex items-start gap-4 p-5 transition hover:border-brand-500/60 hover:shadow-card">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-accent ring-1 ring-inset ring-brand-500/20"><Icon name={c.icon} size={22} /></span>
                      <span>
                        <span className="block text-sm text-fg-muted">{c.title}</span>
                        <span className="block font-display text-lg font-bold">{c.value}</span>
                        <span className="block text-sm text-fg-muted">{c.note}</span>
                      </span>
                    </a>
                  </li>
                ))}
                <li data-reveal className="card flex items-start gap-4 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-accent ring-1 ring-inset ring-brand-500/20"><Icon name="pin" size={22} /></span>
                  <span>
                    <span className="block text-sm text-fg-muted">Escritório</span>
                    <address className="not-italic font-medium leading-snug">{a.street}<br />{a.district}, {a.city}/{a.state}<br />CEP {a.zip}</address>
                  </span>
                </li>
              </ul>
              <p className="mt-6 text-sm text-fg-muted">{site.legalName} · CNPJ {site.cnpj}</p>
            </div>
            <div data-reveal className="card p-6 md:p-9">
              <h3 className="mb-6 font-display text-2xl font-bold">Envie uma mensagem</h3>
              <ContactTabs initial="gestor" origin={PATH} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
