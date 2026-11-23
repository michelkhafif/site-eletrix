// Servidor estático simples para a pasta out/ (porta 3000, ou arg 1). Opcional: base path no arg 2.
import http from 'node:http'; import zlib from 'node:zlib'; import fs from 'node:fs'; import path from 'node:path';
const port = +process.argv[2] || 3000; const root = path.resolve('out'); const bp = process.argv[3] || '';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]); if (bp && u.startsWith(bp)) u = u.slice(bp.length) || '/';
  let f = path.join(root, u); if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404, { 'content-type': 'text/html' }); return res.end(fs.readFileSync(path.join(root, '404.html'))); }
  const ext = path.extname(f); const ct = types[ext] || 'application/octet-stream';
  const gz = /\.(html|js|mjs|css|json|svg|xml|txt)$/.test(ext) && /gzip/.test(req.headers['accept-encoding'] || '');
  const cache = /^\/(_next|images|logos|mapa|brand)\//.test(u) ? 'public, max-age=31536000, immutable' : 'no-cache';
  res.writeHead(200, { 'content-type': ct, 'cache-control': cache, ...(gz ? { 'content-encoding': 'gzip' } : {}) });
  if (gz) fs.createReadStream(f).pipe(zlib.createGzip()).pipe(res); else fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log('http://localhost:' + port));
