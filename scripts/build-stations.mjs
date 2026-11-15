/**
 * Converte _materiais/predios_eletrix.csv em src/data/stations.json.
 * Regras (CLAUDE.md §2.2): só "Sim" vai para o mapa público; "Depois" fica em um arquivo
 * separado, ativado por flag; "Não" nunca sai. Só nome, cidade, UF, tipo, lat, lng.
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
const cities = [...new Set(out(show).map((s) => `${s.city}/${s.uf}`))];
console.log(cities.length, 'cidades', cities.join(' | '));
