/** Varre out/ e confere se todos os links e assets internos existem (considera NEXT_PUBLIC_BASE_PATH). */
import fs from 'node:fs';
import path from 'node:path';
const OUT = path.resolve(import.meta.dirname, '..', 'out');
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); f.isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(OUT);
const missing = new Map();
const exists = (u) => {
  let p = decodeURIComponent(u.split('#')[0].split('?')[0]);
  if (base && p.startsWith(base)) p = p.slice(base.length);
  if (!p.startsWith('/')) return true;
  const fp = path.join(OUT, p);
  return fs.existsSync(fp) && (fs.statSync(fp).isFile() || fs.existsSync(path.join(fp, 'index.html')));
};
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/(?:href|src|content)="(\/[^"]*)"/g)) {
    const u = m[1];
    if (u.startsWith('//') || u.startsWith('/_next/') && false) continue;
    if (!exists(u)) { const k = u; (missing.get(k) ?? missing.set(k, []).get(k)).push(path.relative(OUT, f)); }
  }
  for (const m of html.matchAll(/srcSet="([^"]+)"/gi)) {
    for (const part of m[1].split(',')) { const u = part.trim().split(' ')[0]; if (u.startsWith('/') && !exists(u)) (missing.get(u) ?? missing.set(u, []).get(u)).push(path.relative(OUT, f)); }
  }
}
for (const [u, from] of missing) console.log('QUEBRADO', u, '<-', [...new Set(from)].slice(0, 3).join(', '));
console.log(missing.size ? `${missing.size} link(s) quebrado(s)` : `Links ok em ${files.length} páginas`);
process.exit(missing.size ? 1 : 0);
