'use client';
import { useEffect, useRef } from 'react';

/** Mostra o valor final no HTML (SEO, sem JS) e, ao entrar na tela, conta uma vez até ele. */
export function Counter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !document.documentElement.classList.contains('motion')) return;
    const fmt = (n: number) => `${prefix}${Math.round(n)}${suffix}`;
    if (el.getBoundingClientRect().top > window.innerHeight) el.textContent = fmt(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1100;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          el.textContent = fmt(value * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, prefix, suffix]);
  return (
    <span ref={ref} className="tnum">
      {`${prefix}${value}${suffix}`}
    </span>
  );
}
