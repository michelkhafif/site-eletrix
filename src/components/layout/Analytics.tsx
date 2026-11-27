'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { site } from '@/config/site';

const KEY = 'eletrix-cookies';

/**
 * Analytics preparado (GA4 / Meta Pixel), desligado por padrão: só carrega em produção,
 * com ID configurado e depois do aceite. Sem ID configurado, nada é exibido nem carregado.
 */
export function Analytics() {
  const { ga4Id, metaPixelId } = site.analytics;
  const enabled = site.isProduction && Boolean(ga4Id || metaPixelId);
  const [choice, setChoice] = useState<'accepted' | 'rejected' | 'unset'>('unset');

  useEffect(() => {
    if (!enabled) return;
    try {
      const v = localStorage.getItem(KEY);
      if (v === 'accepted' || v === 'rejected') setChoice(v);
    } catch {}
  }, [enabled]);

  useEffect(() => {
    if (!enabled || choice !== 'accepted') return;
    if (ga4Id) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
      document.head.appendChild(s);
      const w = window as unknown as { dataLayer: unknown[] };
      w.dataLayer = w.dataLayer || [];
      // o gtag.js só reconhece comandos enviados como o objeto "arguments" (um array comum é ignorado)
      const gtag: (...a: unknown[]) => void = function () {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer.push(arguments);
      };
      gtag('js', new Date());
      gtag('config', ga4Id);
    }
    if (metaPixelId) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(s);
      // mesma fila do código oficial do Pixel: o fbevents.js assume as chamadas quando termina de carregar
      type Fbq = ((...a: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[][]; loaded: boolean; version: string; push: unknown };
      const w = window as unknown as { fbq?: Fbq; _fbq?: Fbq };
      if (!w.fbq) {
        const fbq = ((...a: unknown[]) => (fbq.callMethod ? fbq.callMethod(...a) : void fbq.queue.push(a))) as Fbq;
        fbq.queue = [];
        fbq.loaded = true;
        fbq.version = '2.0';
        fbq.push = fbq;
        w.fbq = fbq;
        w._fbq = fbq;
        fbq('init', metaPixelId);
        fbq('track', 'PageView');
      }
    }
  }, [enabled, choice, ga4Id, metaPixelId]);

  if (!enabled || choice !== 'unset') return null;
  const set = (v: 'accepted' | 'rejected') => {
    try { localStorage.setItem(KEY, v); } catch {}
    setChoice(v);
  };
  return (
    <div role="region" aria-label="Aviso de cookies" data-wa-avoid className="fixed inset-x-4 bottom-20 z-50 mx-auto max-w-xl rounded-2xl border border-white/15 bg-ink-900 p-4 text-sm text-white shadow-lift md:bottom-6 md:left-6 md:right-auto">
      <p className="text-muted-dark">
        Usamos cookies de medição para entender como o site é usado. Você pode recusar. Saiba mais na{' '}
        <Link href="/politica-de-privacidade/" className="text-brand-400 underline underline-offset-4">política de privacidade</Link>.
      </p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => set('accepted')} className="h-9 rounded-full bg-brand-500 px-4 font-semibold text-ink-950 hover:bg-brand-400">Aceitar</button>
        <button onClick={() => set('rejected')} className="h-9 rounded-full border border-white/25 px-4 font-semibold hover:border-white/60">Recusar</button>
      </div>
    </div>
  );
}
