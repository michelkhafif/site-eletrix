'use client';
import { useEffect, useRef } from 'react';

const FADE_IN = 0.12;
const FADE_OUT = 0.22;
/** Quadros por segundo: suficiente para o movimento parecer contínuo gastando metade do processador. */
const FRAME = 1000 / 32;

/**
 * Anima a "cobrinha de luz": a cada quadro mexe só nos trechos acesos naquele instante (stroke-dashoffset e
 * opacity). Começa depois do carregamento, para quando o hero sai da tela ou a aba é escondida, e não roda
 * com movimento reduzido. Para conferência: window.dispatchEvent(new CustomEvent('led:seek', { detail: 5.6 })).
 */
export function LedRunner({ total }: { total: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>('.hero-media');
    if (!root) return;
    const segments = Array.from(root.querySelectorAll<SVGGElement>('.led-seg')).map((g) => ({
      g, on: false, start: Number(g.dataset.start), end: Number(g.dataset.end), travel: Number(g.dataset.travel),
      paths: Array.from(g.querySelectorAll<SVGPathElement>('path')).map((p) => ({ p, dash: Number(p.dataset.dash) })),
    }));
    const render = (t: number) => {
      for (const s of segments) {
        if (t < s.start || t > s.end) {
          if (s.on) { s.g.style.opacity = '0'; s.g.style.display = 'none'; s.on = false; }
          continue;
        }
        if (!s.on) { s.g.style.display = ''; s.on = true; }
        const k = (t - s.start) / (s.end - s.start);
        s.g.style.opacity = String(Math.min(1, (t - s.start) / FADE_IN, (s.end - t) / FADE_OUT));
        for (const { p, dash } of s.paths) p.style.strokeDashoffset = String(dash - k * s.travel);
      }
    };

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0, last = 0, clock = 0, visible = true, ready = false;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < FRAME - 4) return;
      clock = (clock + Math.min(now - last, 100) / 1000) % total;
      last = now;
      render(clock);
    };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const update = () => {
      const run = ready && visible && !motion.matches && !document.hidden;
      if (run && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
      if (!run) stop();
      if (motion.matches) render(-1);
    };
    const seek = (e: Event) => { ready = false; stop(); render((e as CustomEvent<number>).detail); };
    let timer: ReturnType<typeof setTimeout> | undefined;
    const begin = () => { timer = setTimeout(() => { ready = true; update(); }, 500); };
    if (document.readyState === 'complete') begin(); else window.addEventListener('load', begin, { once: true });
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    io.observe(root);
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('led:seek', seek);
    return () => {
      stop(); clearTimeout(timer); io.disconnect();
      window.removeEventListener('load', begin);
      motion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('led:seek', seek);
    };
  }, [total]);
  return <span ref={ref} hidden />;
}
