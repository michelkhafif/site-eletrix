import stationsJson from '@/data/stations.json';
import laterJson from '@/data/stations-later.json';
import { site } from '@/config/site';

export type Station = { name: string; city: string; uf: string; type: string; lat: number; lng: number };

const now = stationsJson as Station[];
const later = laterJson as Station[];

/** Só entram os locais marcados "Sim" no CSV. Os "Depois" só aparecem quando a flag é ligada em config. */
export const stations: Station[] = site.flags.showStationsComingLater ? [...now, ...later] : now;

export const stationsByCity = (() => {
  const m = new Map<string, { city: string; uf: string; items: Station[] }>();
  for (const s of stations) {
    const k = `${s.city}|${s.uf}`;
    if (!m.has(k)) m.set(k, { city: s.city, uf: s.uf, items: [] });
    m.get(k)!.items.push(s);
  }
  return [...m.values()].sort((a, b) => a.uf.localeCompare(b.uf) || a.city.localeCompare(b.city, 'pt'));
})();

export const stationsInCity = (city: string) => stations.filter((s) => s.city === city);
export const ufs = [...new Set(stations.map((s) => s.uf))];
