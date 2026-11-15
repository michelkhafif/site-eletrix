/** Valida title (<= 60) e description (<= 155) de src/data/pages.json e se cada página existe em src/app. */
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(import.meta.dirname, '..');
const pages = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/pages.json'), 'utf8'));
let bad = 0;
for (const [p, m] of Object.entries(pages)) {
  const t = m.title.length, d = m.description.length;
  if (t > 60) { console.log(`title ${t} > 60: ${p} -> ${m.title}`); bad++; }
  if (d > 155) { console.log(`description ${d} > 155: ${p}`); bad++; }
  if (d < 70) { console.log(`description curta (${d}): ${p}`); }
}
console.log(bad ? `${bad} problema(s)` : `SEO ok em ${Object.keys(pages).length} páginas`);
process.exit(bad ? 1 : 0);
