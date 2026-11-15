'use client';
import { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Station } from '@/lib/stations';

const STYLE = 'https://tiles.openfreemap.org/styles/positron';

type Props = { stations: Station[]; ufs: string[] };

/** Mapa interativo (MapLibre GL + OpenFreeMap), carregado só no cliente e sob demanda. */
export function StationMap({ stations, ufs }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('maplibre-gl').Map | null>(null);
  const [failed, setFailed] = useState(false);
  const [uf, setUf] = useState('Todas');
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);

  // só inicia quando o contêiner chega perto da tela
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { rootMargin: '300px' });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || !el.current) return;
    let cancelled = false;
    (async () => {
      try {
        const maplibregl = await import('maplibre-gl');
        if (cancelled || !el.current) return;
        const map = new maplibregl.Map({ container: el.current, style: STYLE, center: [-47, -23.5], zoom: 4.2, attributionControl: { compact: true } });
        mapRef.current = map;
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
        map.on('error', () => { /* tiles podem falhar offline; a lista abaixo cobre */ });
        map.on('load', () => {
          map.addSource('stations', {
            type: 'geojson',
            cluster: true,
            clusterRadius: 42,
            clusterMaxZoom: 11,
            data: {
              type: 'FeatureCollection',
              features: stations.map((s) => ({ type: 'Feature', properties: { name: s.name, city: s.city, uf: s.uf, type: s.type }, geometry: { type: 'Point', coordinates: [s.lng, s.lat] } })),
            },
          });
          map.addLayer({ id: 'clusters', type: 'circle', source: 'stations', filter: ['has', 'point_count'], paint: { 'circle-color': '#0A1220', 'circle-stroke-color': '#10B7FF', 'circle-stroke-width': 2, 'circle-radius': ['step', ['get', 'point_count'], 15, 5, 19, 20, 24] } });
          map.addLayer({ id: 'cluster-count', type: 'symbol', source: 'stations', filter: ['has', 'point_count'], layout: { 'text-field': ['get', 'point_count_abbreviated'], 'text-size': 12, 'text-font': ['Noto Sans Bold'] }, paint: { 'text-color': '#ffffff' } });
          map.addLayer({ id: 'points', type: 'circle', source: 'stations', filter: ['!', ['has', 'point_count']], paint: { 'circle-color': '#10B7FF', 'circle-radius': 7, 'circle-stroke-color': '#0A1220', 'circle-stroke-width': 2 } });
          map.on('click', 'clusters', async (e: { point: import('maplibre-gl').PointLike }) => {
            const f = map.queryRenderedFeatures(e.point, { layers: ['clusters'] })[0];
            const src = map.getSource('stations') as import('maplibre-gl').GeoJSONSource;
            const zoom = await src.getClusterExpansionZoom(f.properties!.cluster_id as number);
            map.easeTo({ center: (f.geometry as unknown as { coordinates: [number, number] }).coordinates, zoom });
          });
          map.on('click', 'points', (e: { features?: import('maplibre-gl').MapGeoJSONFeature[] }) => {
            const f = e.features![0];
            const p = f.properties as { name: string; city: string; uf: string };
            const div = document.createElement('div');
            const b = document.createElement('strong'); b.textContent = p.name;
            const s = document.createElement('div'); s.textContent = `${p.city}/${p.uf}`;
            div.style.cssText = 'font:14px/1.4 Inter,system-ui,sans-serif;color:#0A1220'; div.append(b, s);
            new maplibregl.Popup({ offset: 12, closeButton: false }).setLngLat((f.geometry as unknown as { coordinates: [number, number] }).coordinates).setDOMContent(div).addTo(map);
          });
          for (const l of ['clusters', 'points']) {
            map.on('mouseenter', l, () => (map.getCanvas().style.cursor = 'pointer'));
            map.on('mouseleave', l, () => (map.getCanvas().style.cursor = ''));
          }
          const b = new maplibregl.LngLatBounds();
          stations.forEach((s) => b.extend([s.lng, s.lat]));
          map.fitBounds(b, { padding: 50, duration: 0, maxZoom: 7 });
          setReady(true);
        });
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null; };
  }, [started, stations]);

  async function focusUf(next: string) {
    setUf(next);
    const map = mapRef.current;
    if (!map) return;
    const maplibregl = await import('maplibre-gl');
    const list = next === 'Todas' ? stations : stations.filter((s) => s.uf === next);
    const b = new maplibregl.LngLatBounds();
    list.forEach((s) => b.extend([s.lng, s.lat]));
    map.fitBounds(b, { padding: 70, duration: 700, maxZoom: next === 'Todas' ? 7 : 11 });
  }

  return (
    <div>
      <div role="group" aria-label="Filtrar por estado" className="mb-4 flex flex-wrap gap-2">
        {['Todas', ...ufs].map((u) => (
          <button key={u} type="button" aria-pressed={uf === u} onClick={() => focusUf(u)} disabled={!ready}
            className={`h-9 rounded-full border px-4 text-sm font-medium transition disabled:opacity-50 ${uf === u ? 'border-brand-500 bg-brand-500 text-ink-950' : 'border-hair text-fg hover:border-brand-500'}`}>
            {u === 'Todas' ? 'Todos os estados' : u}
          </button>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-hair bg-paper shadow-lift">
        <div ref={el} className="h-[440px] w-full md:h-[560px]" role="region" aria-label="Mapa interativo das estações Eletrix" />
        {!ready && !failed && <div className="pointer-events-none absolute inset-0 grid place-items-center text-sm text-muted">Carregando mapa…</div>}
        {failed && <div className="absolute inset-0 grid place-items-center bg-paper p-8 text-center text-muted">Não foi possível carregar o mapa agora. Use a lista de locais abaixo, organizada por cidade.</div>}
      </div>
    </div>
  );
}
