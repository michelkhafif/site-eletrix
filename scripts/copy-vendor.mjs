/** Copia o worker do MapLibre para public/vendor (o bundler quebra o import.meta.url do worker). */
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(import.meta.dirname, '..');
const src = path.join(ROOT, 'node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs');
const outDir = path.join(ROOT, 'public/vendor');
fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(src, path.join(outDir, 'maplibre-gl-worker.mjs'));
console.log('vendor: maplibre-gl-worker.mjs copiado');
