export type Project = {
  slug: string;
  name: string;
  city: string;
  uf: string;
  kind: string;
  image: string;
  alt: string;
  /** Render: empreendimento entrando em operação */
  soon?: boolean;
  /** Posição do recorte (object-position) */
  focus?: string;
};

/** Empreendimentos com foto e autorização contratual de uso. Curadoria: poucos, bem escolhidos. */
export const projects: Project[] = [
  { slug: 'plaza-centenario', name: 'Plaza Centenário', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'predio-plaza-centenario', alt: 'Torre do Plaza Centenário, em São Paulo, vista do outro lado do Rio Pinheiros', focus: '38% 20%' },
  { slug: 'quantum', name: 'Quantum', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'predio-quantum', alt: 'Imagem de projeto do edifício Quantum à noite, no Itaim Bibi, em São Paulo', focus: '55% 50%' },
  { slug: 'berrini-500', name: 'B500', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'predio-b500', alt: 'Fachada espelhada do edifício B500 ao anoitecer, em São Paulo', focus: '50% 25%' },
  { slug: 'centro-empresarial-do-aco', name: 'Centro Empresarial do Aço', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'predio-cea', alt: 'Vista aérea do Centro Empresarial do Aço, em São Paulo', focus: '50% 55%' },
  { slug: 'aqwa-corporate', name: 'Aqwa Corporate', city: 'Rio de Janeiro', uf: 'RJ', kind: 'Corporativo', image: 'predio-aqwa', alt: 'Edifício Aqwa Corporate de frente para a Baía de Guanabara, no Rio de Janeiro', focus: '45% 50%' },
  { slug: 'castelo-branco-office-park', name: 'Castelo Branco Office Park', city: 'Barueri', uf: 'SP', kind: 'Corporativo', image: 'predio-cbop', alt: 'Imagem de projeto das torres do Castelo Branco Office Park, em Barueri', focus: '50% 40%' },
  { slug: 'pinheiros-corporate', name: 'Pinheiros Corporate', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'predio-pinheiros-corporate', alt: 'Fachada espelhada do Pinheiros Corporate refletindo o céu, em São Paulo' },
  { slug: 'jk-square', name: 'JK Square', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'predio-jk-square', alt: 'Vista aérea das torres do JK Square, no Itaim Bibi, em São Paulo', focus: '50% 40%' },
  { slug: 'river-one', name: 'River One', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'predio-river-one', alt: 'Torre River One vista do alto, em São Paulo', focus: '45% 45%' },
  { slug: 'spazio-faria-lima', name: 'Spazio Faria Lima', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'predio-spazio-faria-lima', alt: 'Torre de vidro do Spazio Faria Lima, em São Paulo', focus: '60% 40%' },
  { slug: 'bfl1355', name: 'BFL1355', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'predio-bfl1355', alt: 'Edifício BFL1355 na Avenida Brigadeiro Faria Lima, em São Paulo', focus: '50% 20%' },
  { slug: 'thera-corporate', name: 'Thera Corporate', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'thera-praca', alt: 'Praça e torres do Thera Corporate, em São Paulo' },
  { slug: 'pinheiros-one', name: 'Pinheiros One', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'pinheiros-one-aerea', alt: 'Vista aérea do Pinheiros One, em São Paulo', focus: '50% 30%' },
  { slug: 'arquipeo', name: 'Arquipeo', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'arquipeo-aerea', alt: 'Vista aérea do complexo Arquipeo, em São Paulo' },
  { slug: 'faria-lima-financial-center', name: 'Faria Lima Financial Center', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'faria-lima-financial-center', alt: 'Torre do Faria Lima Financial Center, em São Paulo', focus: '50% 30%' },
  { slug: 'totvs-seneca', name: 'TOTVS / Sêneca', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'totvs-seneca', alt: 'Edifício Sêneca, sede da TOTVS, em São Paulo' },
  { slug: 'biosquare', name: 'Biosquare', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'biosquare', alt: 'Imagem de projeto do Biosquare, em São Paulo', soon: true, focus: '50% 30%' },
  { slug: 'jk-360', name: 'JK 360', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'jk-360', alt: 'Torre JK 360, em São Paulo', focus: '50% 25%' },
  { slug: 'botafogo-trade-center', name: 'Botafogo Trade Center', city: 'Rio de Janeiro', uf: 'RJ', kind: 'Corporativo', image: 'botafogo-trade-center', alt: 'Botafogo Trade Center, no Rio de Janeiro' },
  { slug: 'eco-sapucai', name: 'ECO Sapucaí', city: 'Rio de Janeiro', uf: 'RJ', kind: 'Corporativo', image: 'eco-sapucai', alt: 'Imagem de projeto do ECO Sapucaí, no Rio de Janeiro', soon: true },
  { slug: 'bresco-viracopos', name: 'Bresco Viracopos', city: 'Campinas', uf: 'SP', kind: 'Logístico', image: 'bresco-viracopos', alt: 'Galpão logístico Bresco Viracopos, em Campinas' },
  { slug: 'shopping-maringa-park', name: 'Shopping Maringá Park', city: 'Maringá', uf: 'PR', kind: 'Varejo', image: 'maringa-park', alt: 'Shopping Maringá Park, no Paraná' },
];

/** Carrossel da home, na ordem pedida; depois do 11º, os que já estavam no site e não se repetem. */
export const carouselSlugs = [
  'plaza-centenario', 'quantum', 'berrini-500', 'centro-empresarial-do-aco', 'aqwa-corporate', 'castelo-branco-office-park', 'pinheiros-corporate',
  'jk-square', 'river-one', 'spazio-faria-lima', 'bfl1355', 'thera-corporate', 'pinheiros-one', 'arquipeo', 'faria-lima-financial-center',
];

export const projectBy = (slug: string) => {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Empreendimento não encontrado: ${slug}`);
  return p;
};
