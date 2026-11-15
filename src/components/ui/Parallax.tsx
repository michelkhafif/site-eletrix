'use client';
import { useEffect, useRef, type ReactNode } from 'react';

/** Parallax muito leve (máx. 24 px) para a foto do hero. Desligado com movimento reduzido. */
export function Parallax({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 800);
        el.style.transform = `translate3d(0, ${(y / 800) * 24}px, 0) scale(1.06)`;
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className={`will-change-transform ${className}`} style={{ transform: 'scale(1.06)' }}>{children}</div>;
}
