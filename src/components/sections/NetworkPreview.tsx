import Link from 'next/link';
import { stations } from '@/lib/stations';
import { Icon } from '@/components/ui/Icon';

// Quadro: lng -54.5 a -37.5, lat -30.5 a -12 (Sul, Sudeste e litoral do Nordeste próximo)
const W = 640, H = 520;
const minLng = -54.5, maxLng = -37.5, minLat = -30.5, maxLat = -12;
const proj = (lat: number, lng: number): [number, number] => [((lng - minLng) / (maxLng - minLng)) * W, ((maxLat - lat) / (maxLat - minLat)) * H];

// Linha de costa simplificada (lng, lat) de norte a sul, só como pano de fundo ilustrativo
const coast: [number, number][] = [
  [-38.1, -12], [-38.5, -13], [-39, -14.8], [-39.1, -16.4], [-39.7, -18], [-40.2, -19.5], [-40.3, -20.3], [-41, -21.8], [-42, -22.9],
  [-43.2, -22.9], [-44.6, -23.1], [-45.5, -23.7], [-46.3, -24], [-47.5, -25], [-48.5, -25.5], [-48.6, -26.5], [-48.5, -27.6],
  [-48.8, -28.7], [-49.7, -29.5], [-50.5, -30.2], [-50.9, -30.5],
];
const labels: { t: string; lat: number; lng: number; dx: number; dy: number }[] = [
  { t: 'São Paulo', lat: -23.55, lng: -46.65, dx: -10, dy: 26 },
  { t: 'Rio de Janeiro', lat: -22.9, lng: -43.2, dx: 12, dy: -12 },
  { t: 'Curitiba', lat: -25.43, lng: -49.27, dx: -12, dy: 22 },
  { t: 'Porto Alegre', lat: -30.03, lng: -51.2, dx: 12, dy: -6 },
  { t: 'Salvador', lat: -12.97, lng: -38.5, dx: -14, dy: 4 },
];

/**
 * Prévia estilizada da rede: pontos públicos sobre uma silhueta simplificada do litoral.
 * Não carrega biblioteca de mapa (o mapa interativo vive em /estacoes).
 */
export function NetworkPreview() {
  const pts = stations.filter((s) => s.lng > minLng && s.lng < maxLng && s.lat > minLat && s.lat < maxLat);
  const coastPath = coast.map(([lng, lat], i) => { const [x, y] = proj(lat, lng); return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`; }).join(' ');
  const land = `${coastPath} L0,${H} L0,0 L${proj(-12, -38.1)[0].toFixed(1)},0 Z`;
  return (
    <figure className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Prévia da rede Eletrix: pontos de recarga no Sul, Sudeste e litoral do Nordeste" className="h-auto w-full">
        <defs>
          <radialGradient id="np-glow"><stop offset="0" stopColor="#10B7FF" stopOpacity=".55" /><stop offset="1" stopColor="#10B7FF" stopOpacity="0" /></radialGradient>
          <pattern id="np-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,.045)" /></pattern>
        </defs>
        <rect width={W} height={H} fill="#0A1220" />
        <rect width={W} height={H} fill="url(#np-grid)" />
        <path d={land} fill="#111E33" />
        <path d={coastPath} fill="none" stroke="#2A4468" strokeWidth="1.5" />
        {pts.map((s, i) => { const [x, y] = proj(s.lat, s.lng); return <circle key={i} cx={x} cy={y} r="13" fill="url(#np-glow)" />; })}
        {pts.map((s, i) => { const [x, y] = proj(s.lat, s.lng); return <circle key={`d${i}`} cx={x} cy={y} r="2.8" fill="#4CCBFF" stroke="#050B14" strokeWidth="1" />; })}
        {labels.map((l) => { const [x, y] = proj(l.lat, l.lng); return <text key={l.t} x={x + l.dx} y={y + l.dy} fontSize="12" fontWeight="600" fill="#9FB0C8" textAnchor={l.dx < 0 ? 'end' : 'start'}>{l.t}</text>; })}
      </svg>
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent p-6">
        <span className="max-w-[16rem] text-sm text-muted-dark">Pontos de recarga em prédios corporativos, hotéis, shoppings e estacionamentos.</span>
        <Link href="/estacoes/" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300">
          Abrir o mapa <Icon name="arrowRight" size={16} />
        </Link>
      </figcaption>
    </figure>
  );
}
