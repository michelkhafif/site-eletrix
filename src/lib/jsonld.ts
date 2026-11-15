import { SITE_URL, absoluteUrl, site } from '@/config/site';

export const orgId = `${SITE_URL}/#organization`;

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl('/'),
    logo: `${SITE_URL}/brand/eletrix-logo-claro.svg`,
    foundingDate: String(site.foundedYear),
    slogan: site.tagline,
    taxID: site.cnpj,
    email: site.contact.email,
    telephone: site.contact.phoneCommercialTel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.city,
      addressRegion: site.contact.address.state,
      postalCode: site.contact.address.zip,
      addressCountry: 'BR',
    },
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'sales', telephone: site.contact.phoneCommercialTel, email: site.contact.email, availableLanguage: 'pt-BR' },
      { '@type': 'ContactPoint', contactType: 'customer support', telephone: `+${site.contact.whatsappSupport}`, availableLanguage: 'pt-BR' },
    ],
    sameAs: [site.social.instagram, site.social.linkedin].filter(Boolean),
  };
}

export function websiteLd() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: absoluteUrl('/'), inLanguage: 'pt-BR', publisher: { '@id': orgId } };
}

export function breadcrumbLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absoluteUrl(c.href) })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function serviceLd(o: { name: string; description: string; path: string; areaServed?: string; price?: string; priceDescription?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: o.name,
    description: o.description,
    url: absoluteUrl(o.path),
    provider: { '@id': orgId },
    areaServed: o.areaServed ?? { '@type': 'Country', name: 'Brasil' },
    ...(o.price ? { offers: { '@type': 'Offer', priceCurrency: 'BRL', price: o.price, description: o.priceDescription } } : {}),
  };
}

export function articleLd(o: { title: string; description: string; path: string; datePublished: string; dateModified: string; image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: o.title,
    description: o.description,
    mainEntityOfPage: absoluteUrl(o.path),
    datePublished: o.datePublished,
    dateModified: o.dateModified,
    inLanguage: 'pt-BR',
    author: { '@id': orgId },
    publisher: { '@id': orgId },
    ...(o.image ? { image: o.image } : {}),
  };
}
