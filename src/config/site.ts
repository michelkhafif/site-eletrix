/**
 * Configuração central do site. Tudo que muda entre teste (GitHub Pages) e produção (eletrix.mobi)
 * ou que o dono precisa ajustar fica aqui.
 */

const env = process.env.NEXT_PUBLIC_SITE_ENV === 'production' ? 'production' : 'test';

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (env === 'production' ? 'https://eletrix.mobi' : 'https://michelk55.github.io/site-eletrix')
).replace(/\/$/, '');

export const site = {
  env,
  isProduction: env === 'production',
  /** Em teste todas as páginas saem com noindex e robots.txt com Disallow: / */
  indexable: env === 'production',
  url: SITE_URL,
  name: 'Eletrix',
  legalName: 'Eletrix5 Comércio e Serviços Ltda',
  cnpj: '51.055.198/0001-41',
  foundedYear: 2021,
  tagline: 'Carregando seu futuro',
  motto: 'Qualidade de serviço à altura de um AAA.',
  mission: 'Ser a maior rede de recarga do Brasil, conectada à rotina real das pessoas.',
  locale: 'pt-BR',

  stats: [
    { value: 250, prefix: '+', suffix: '', label: 'estações de recarga' },
    { value: 20, prefix: '+', suffix: '', label: 'cidades' },
    { value: 10, prefix: '+', suffix: '', label: 'estados' },
    { value: 5, prefix: '+', suffix: ' mil', label: 'clientes' },
  ],

  contact: {
    // Comercial: todos os botões de WhatsApp comerciais e residenciais
    whatsappCommercial: '5511965755730',
    phoneCommercialDisplay: '+55 11 96575-5730',
    phoneCommercialTel: '+5511965755730',
    // Suporte a usuários das estações: só na área de suporte/app
    whatsappSupport: '5511919552120',
    phoneSupportDisplay: '+55 11 91955-2120',
    email: 'contato@eletrix5.com.br',
    address: {
      street: 'Av. Angélica, 688 – Conj. 801',
      district: 'Santa Cecília',
      city: 'São Paulo',
      state: 'SP',
      zip: '01228-000',
    },
  },

  social: {
    instagram: 'https://www.instagram.com/eletrix.mobi/',
    instagramHandle: '@eletrix.mobi',
    // TODO: confirmar URL oficial da página da Eletrix no LinkedIn
    linkedin: '',
  },

  app: {
    rating: '4,8',
    // TODO: confirmar links oficiais das lojas
    appStore: 'https://apps.apple.com/br/search?term=eletrix',
    playStore: 'https://play.google.com/store/search?q=eletrix&c=apps',
  },

  form: {
    // Serviço sem backend. Na primeira submissão o FormSubmit envia um e-mail de confirmação
    // para admin@eletrix5.com.br; o dono precisa clicar para ativar (ver docs/PENDENCIAS.md).
    endpoint: 'https://formsubmit.co/ajax/admin@eletrix5.com.br',
    recipient: 'admin@eletrix5.com.br',
  },

  analytics: {
    // Deixe vazio para desativar. Só carregam em produção e depois do aceite de cookies.
    ga4Id: '',
    metaPixelId: '',
  },

  flags: {
    /** Ativar quando as estações marcadas "Depois" no CSV entrarem no ar */
    showStationsComingLater: false,
    /** Depoimentos provisórios: trocar por reais antes do lançamento oficial */
    showPlaceholderTestimonials: true,
  },
} as const;

/** Prefixa caminhos de arquivos estáticos (imagens, logos) com o basePath. */
export function withBase(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
}

/** URL absoluta (canonical, OG, sitemap). Sempre com barra final. */
export function absoluteUrl(path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p.endsWith('/') ? p : `${p}/`}`;
}

export function whatsappLink(message: string, to: 'commercial' | 'support' = 'commercial'): string {
  const number = to === 'commercial' ? site.contact.whatsappCommercial : site.contact.whatsappSupport;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
