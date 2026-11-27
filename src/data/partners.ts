import logos from './logos.generated.json';

export type Partner = {
  slug: string;
  name: string;
  /** Aparece na seleção reduzida das páginas internas (Sobre, Hub, Empresas) */
  featured?: boolean;
  /** Faixa da página /parceiros/ (1, 2 ou 3) */
  row: 1 | 2 | 3;
};

/**
 * Lista definitiva de parceiros (28, nov/2026), em ordem fixa e embaralhada de propósito:
 * alterna logos largos e compactos, cores originais e setores, e espalha os nomes de maior peso.
 */
export const partners: Partner[] = [
  { slug: 'cbre', name: 'CBRE', featured: true, row: 1 },
  { slug: 'housi', name: 'Housi', row: 1 },
  { slug: 'weg', name: 'WEG', row: 2 },
  { slug: 'brookfield', name: 'Brookfield', featured: true, row: 2 },
  { slug: 'jaime', name: 'Jaime', row: 1 },
  { slug: 'cushman-wakefield', name: 'Cushman & Wakefield', featured: true, row: 2 },
  { slug: 'totvs', name: 'TOTVS', featured: true, row: 1 },
  { slug: 'argoplan', name: 'Argoplan', row: 1 },
  { slug: 'safra', name: 'Safra', featured: true, row: 1 },
  { slug: 'intelbras', name: 'Intelbras', row: 3 },
  { slug: 'cyrela', name: 'Cyrela', featured: true, row: 3 },
  { slug: 'bbz', name: 'BBZ', row: 3 },
  { slug: 'tishman-speyer', name: 'Tishman Speyer', featured: true, row: 1 },
  { slug: 'garageinn', name: 'GarageInn', row: 2 },
  { slug: 'kinea', name: 'Kinea', featured: true, row: 2 },
  { slug: 'atrio', name: 'Atrio', row: 2 },
  { slug: 'shpaisman', name: 'Shpaisman', row: 2 },
  { slug: 'patria', name: 'Pátria', featured: true, row: 3 },
  { slug: 'livoltek', name: 'Livoltek', row: 1 },
  { slug: 'jll', name: 'JLL', featured: true, row: 3 },
  { slug: 'elias-victor-nigri', name: 'Elias Victor Nigri', row: 3 },
  { slug: 'innova', name: 'Innova', row: 3 },
  { slug: 'bresco', name: 'Bresco', row: 3 },
  { slug: 'intercity', name: 'Intercity Hotels', row: 2 },
  { slug: 'link', name: 'Link', row: 1 },
  { slug: 'barzel', name: 'Barzel Properties', featured: true, row: 2 },
  { slug: 'vitacon', name: 'Vitacon', row: 1 },
  { slug: 'hersil', name: 'Hersil', row: 3 },
];

/** w e h em pixels do arquivo; d = densidade de tinta (0 a 1), usada no ajuste ótico. */
export type LogoInfo = { file: string; w: number; h: number; d: number };
export const logoInfo = (slug: string): LogoInfo => (logos as Record<string, LogoInfo>)[slug];
