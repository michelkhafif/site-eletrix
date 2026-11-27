/**
 * Converte _materiais/predios_eletrix.csv em src/data/stations.json e junta os pontos novos de
 * _materiais/rodada-3/novos_pontos_mapa_nov2026.csv (coordenadas em scripts/geocode-cache.json)
 * no arquivo do mapa estático, src/data/estacoes.json.
 *
 * Regras (CLAUDE.md §2.2): só "Sim" vai para o mapa público; "Depois" fica em um arquivo
 * separado; "Não" nunca sai. Só nome, cidade, UF, tipo, lat, lng.
 */
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

const ROOT = path.resolve(import.meta.dirname, '..');
const raw = fs.readFileSync(path.join(ROOT, '_materiais', 'predios_eletrix.csv'), 'utf8').replace(/^﻿/, '');
const rows = parse(raw, { columns: true, skip_empty_lines: true });

const pick = (r) => ({
  name: r['Nome do local'].trim(),
  city: r['Cidade'].trim(),
  uf: r['UF'].trim(),
  type: r['Tipo'].trim(),
  lat: Number(r['Latitude']),
  lng: Number(r['Longitude']),
});

const isPublicType = (t) => !/residencial \(/i.test(t) || /housi/i.test(t);
const show = rows.filter((r) => r['Mostrar no mapa do site'].trim() === 'Sim' && !Number.isNaN(Number(r['Latitude'])));
const later = rows.filter((r) => r['Mostrar no mapa do site'].trim() === 'Depois' && !Number.isNaN(Number(r['Latitude'])));

const out = (list) => list.map(pick).filter((s) => isPublicType(s.type)).sort((a, b) => a.uf.localeCompare(b.uf) || a.city.localeCompare(b.city) || a.name.localeCompare(b.name, 'pt'));
fs.writeFileSync(path.join(ROOT, 'src/data/stations.json'), JSON.stringify(out(show)));
fs.writeFileSync(path.join(ROOT, 'src/data/stations-later.json'), JSON.stringify(out(later)));
console.log('mostrar:', out(show).length, 'depois:', out(later).length);

// Arquivo único para o mapa estático da home: operando + a instalar (nunca residenciais privativos).
const tag = (list, status) => out(list).map((s) => ({ name: s.name, city: s.city, uf: s.uf, lat: s.lat, lng: s.lng, status, pins: 1 }));
const stations = [...tag(show, 'operando'), ...tag(later, 'a-instalar')];

// --- pontos novos (nov/2026): três pins por endereço; sem duplicar o que já existe (mesmo local ou a menos de 150 m)
const sameAs = {
  Totvs: 'TOTVS', Biosquare: 'Ed. Biosquare', 'Eco Sapucai': 'Ed. Eco Sapucaí', 'Gabriel 1825': 'Ed. Gabriel', Denver: 'Ed. Denver', 'Plaza I': 'Edifício Plaza I',
  'Golden Light': 'Ed. Golden Light', 'JK Tower': 'Ed. JK Tower', 'Padrão Park Bom Retiro': 'Padrão Park Bom Retiro', 'Clube de Campo SP': 'Clube de Campo de São Paulo',
  'Shopping Park Europeu': 'Park Europeu',
};
const meters = (a, b) => Math.hypot((a.lng - b.lng) * 111320 * Math.cos((a.lat * Math.PI) / 180), (a.lat - b.lat) * 110570);
const cache = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/geocode-cache.json'), 'utf8'));
const novos = parse(fs.readFileSync(path.join(ROOT, '_materiais/rodada-3/novos_pontos_mapa_nov2026.csv'), 'utf8').replace(/^﻿/, ''), { columns: true, delimiter: ';', skip_empty_lines: true });
const log = { novos: 0, jaExistiam: [] };
for (const row of novos) {
  const name = row.nome.trim();
  const geo = cache[`${name}|${row.cidade.trim()}|${row.uf.trim()}`];
  if (!geo) throw new Error(`Sem coordenada para ${name}. Rode node scripts/geocode.mjs`);
  const alias = sameAs[name];
  const found = stations.find((s) => alias && s.name === alias && s.city === geo.city)
    ?? stations.find((s) => s.name === name && s.city === geo.city)
    ?? stations.find((s) => s.uf === geo.uf && meters(s, geo) < 150);
  if (found) {
    if (found.pins < 3) log.jaExistiam.push(`${name} -> ${found.name}`);
    found.pins = 3;
  } else {
    stations.push({ name, city: geo.city, uf: geo.uf, lat: geo.lat, lng: geo.lng, status: 'operando', pins: 3 });
    log.novos += 1;
  }
}
fs.writeFileSync(path.join(ROOT, 'src/data/estacoes.json'), JSON.stringify(stations));

const cities = [...new Set(stations.map((s) => `${s.city}/${s.uf}`))];
const states = [...new Set(stations.map((s) => s.uf))];
console.log(`estacoes.json: ${stations.length} locais (${log.novos} novos), ${stations.reduce((n, s) => n + s.pins, 0)} pins`);
console.log(`já existiam (viram 3 pins): ${log.jaExistiam.join('; ')}`);
console.log(`${cities.length} cidades; ${states.length} estados: ${states.join(', ')}`);
