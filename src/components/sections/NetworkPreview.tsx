import Link from 'next/link';
import { stations } from '@/lib/stations';
import { Icon } from '@/components/ui/Icon';

/**
 * Prévia estilizada da rede: projeção dos pontos públicos sobre um painel escuro.
 * Não carrega biblioteca de mapa (o mapa interativo vive em /estacoes).
 */
export function NetworkPreview() {
  // Quadro do Brasil (aprox.): lng -54 a -37, lat -30 a -10 (recorte do Centro-Sul/Sudeste e Nordeste próximo)
  const W = 640, H = 520;
  const minLng = -54.5, maxLng = -37.5, minLat = -30.5, maxLat = -12;
  const proj = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * W;
    const y = ((maxLat - lat) / (maxLat - minLat)) * H;
    return [x, y] as const;
  };
  const pts = stations.filter((s) => s.lng > minLng && s.lng < maxLng && s.lat > minLat && s.lat < maxLat);
  return (
    <figure className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Prévia da rede Eletrix: pontos de recarga no Sul, Sudeste e Nordeste" className="h-auto w-full">
        <defs>
          <radialGradient id="np-glow"><stop offset="0" stopColor="#10B7FF" stopOpacity=".55" /><stop offset="1" stopColor="#10B7FF" stopOpacity="0" /></radialGradient>
          <pattern id="np-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,.05)" /></pattern>
        </defs>
        <rect width={W} height={H} fill="url(#np-grid)" />
        {pts.map((s, i) => {
          const [x, y] = proj(s.lat, s.lng);
          return <circle key={i} cx={x} cy={y} r="14" fill="url(#np-glow)" />;
        })}
        {pts.map((s, i) => {
          const [x, y] = proj(s.lat, s.lng);
          return <circle key={`d${i}`} cx={x} cy={y} r="3" fill="#4CCBFF" stroke="#050B14" strokeWidth="1" />;
        })}
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
