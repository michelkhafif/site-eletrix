import logos from './logos.generated.json';

export type Partner = { slug: string; name: string; featured?: boolean };

/** Nomes de maior peso no mercado imobiliário corporativo (vêm primeiro e ganham destaque). */
export const partners: Partner[] = [
  { slug: 'cbre', name: 'CBRE', featured: true },
  { slug: 'jll', name: 'JLL', featured: true },
  { slug: 'cushman-wakefield', name: 'Cushman & Wakefield', featured: true },
  { slug: 'brookfield', name: 'Brookfield', featured: true },
  { slug: 'tishman-speyer', name: 'Tishman Speyer', featured: true },
  { slug: 'kinea', name: 'Kinea', featured: true },
  { slug: 'patria', name: 'Pátria', featured: true },
  { slug: 'safra', name: 'Safra', featured: true },
  { slug: 'barzel', name: 'Barzel Properties', featured: true },
  { slug: 'cyrela', name: 'Cyrela', featured: true },
  { slug: 'totvs', name: 'TOTVS', featured: true },
  { slug: 'hersil', name: 'Hersil' },
  { slug: 'argoplan', name: 'Argoplan' },
  { slug: 'bresco', name: 'Bresco' },
  { slug: 'innova', name: 'Innova' },
  { slug: 'housi', name: 'Housi' },
  { slug: 'vitacon', name: 'Vitacon' },
  { slug: 'atrio', name: 'Atrio' },
  { slug: 'weg', name: 'WEG' },
  { slug: 'elias-victor-nigri', name: 'Elias Victor Nigri' },
  { slug: 'bbz', name: 'BBZ' },
  { slug: 'intercity', name: 'Intercity Hotels' },
  { slug: 'garageinn', name: 'GarageInn' },
  { slug: 'inteli', name: 'Inteli' },
  { slug: 'link', name: 'Link' },
  { slug: 'jaime', name: 'Jaime' },
  { slug: 'shpaisman', name: 'Shpaisman' },
  { slug: 'rrm-estacionamentos', name: 'RRM Estacionamentos' },
  { slug: 'paris-condominios', name: 'Paris Condomínios' },
  { slug: 'padrao-park', name: 'Padrão Park' },
  { slug: 'intelbras', name: 'Intelbras' },
  { slug: 'confiance-hotel', name: 'Confiance Hotel' },
  { slug: 'guardian', name: 'Guardian' },
  { slug: 'sl', name: 'SL' },
  { slug: 'winpark', name: 'Winpark' },
  { slug: 'plenty-park', name: 'Plenty Park' },
  { slug: 'slaviero-hoteis', name: 'Slaviero Hotéis' },
  { slug: 'pepe', name: 'Pepe' },
  { slug: 'hazak', name: 'Hazak' },
];

export type LogoInfo = { file: string; w: number; h: number };
export const logoInfo = (slug: string): LogoInfo => (logos as Record<string, LogoInfo>)[slug];
