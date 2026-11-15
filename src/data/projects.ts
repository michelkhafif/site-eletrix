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
  { slug: 'aqwa-corporate', name: 'Aqwa Corporate', city: 'Rio de Janeiro', uf: 'RJ', kind: 'Corporativo', image: 'aqwa-por-do-sol', alt: 'Edifício Aqwa Corporate ao pôr do sol, na zona portuária do Rio de Janeiro', focus: '50% 35%' },
  { slug: 'thera-corporate', name: 'Thera Corporate', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'thera-praca', alt: 'Praça e torres do Thera Corporate, em São Paulo' },
  { slug: 'river-one', name: 'River One', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'river-one-fim-de-tarde', alt: 'Torre River One ao fim de tarde, às margens do Rio Pinheiros' },
  { slug: 'pinheiros-one', name: 'Pinheiros One', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'pinheiros-one-aerea', alt: 'Vista aérea do Pinheiros One, em São Paulo', focus: '50% 30%' },
  { slug: 'arquipeo', name: 'Arquipeo', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'arquipeo-aerea', alt: 'Vista aérea do complexo Arquipeo, em São Paulo' },
  { slug: 'centro-empresarial-do-aco', name: 'Centro Empresarial do Aço', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'cea-fachada', alt: 'Fachada do Centro Empresarial do Aço, em São Paulo' },
  { slug: 'faria-lima-financial-center', name: 'Faria Lima Financial Center', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'faria-lima-financial-center', alt: 'Torre do Faria Lima Financial Center, em São Paulo', focus: '50% 30%' },
  { slug: 'castelo-branco-office-park', name: 'Castelo Branco Office Park', city: 'Barueri', uf: 'SP', kind: 'Corporativo', image: 'castelo-branco-office-park', alt: 'Castelo Branco Office Park, em Barueri' },
  { slug: 'totvs-seneca', name: 'TOTVS / Sêneca', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'totvs-seneca', alt: 'Edifício Sêneca, sede da TOTVS, em São Paulo' },
  { slug: 'biosquare', name: 'Biosquare', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'biosquare', alt: 'Imagem de projeto do Biosquare, em São Paulo', soon: true, focus: '50% 30%' },
  { slug: 'berrini-500', name: 'Berrini 500', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'berrini-500', alt: 'Edifício Berrini 500, em São Paulo' },
  { slug: 'jk-360', name: 'JK 360', city: 'São Paulo', uf: 'SP', kind: 'Corporativo', image: 'jk-360', alt: 'Torre JK 360, em São Paulo', focus: '50% 25%' },
  { slug: 'botafogo-trade-center', name: 'Botafogo Trade Center', city: 'Rio de Janeiro', uf: 'RJ', kind: 'Corporativo', image: 'botafogo-trade-center', alt: 'Botafogo Trade Center, no Rio de Janeiro' },
  { slug: 'eco-sapucai', name: 'ECO Sapucaí', city: 'Rio de Janeiro', uf: 'RJ', kind: 'Corporativo', image: 'eco-sapucai', alt: 'Imagem de projeto do ECO Sapucaí, no Rio de Janeiro', soon: true },
  { slug: 'bresco-viracopos', name: 'Bresco Viracopos', city: 'Campinas', uf: 'SP', kind: 'Logístico', image: 'bresco-viracopos', alt: 'Galpão logístico Bresco Viracopos, em Campinas' },
  { slug: 'shopping-maringa-park', name: 'Shopping Maringá Park', city: 'Maringá', uf: 'PR', kind: 'Varejo', image: 'maringa-park', alt: 'Shopping Maringá Park, no Paraná' },
];

export const projectBy = (slug: string) => {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Empreendimento não encontrado: ${slug}`);
  return p;
};
