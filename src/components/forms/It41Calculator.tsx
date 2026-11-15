'use client';
import { useId, useState } from 'react';
import { whatsappLink } from '@/config/site';
import { Icon } from '@/components/ui/Icon';

const PRICE_FLOOR = 1799;
const PRICE_CHARGER = 449;
const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

function Stepper({ label, hint, value, onChange, min, max }: { label: string; hint: string; value: number; onChange: (n: number) => void; min: number; max: number }) {
  const id = useId();
  const clamp = (n: number) => Math.max(min, Math.min(max, Number.isFinite(n) ? n : min));
  return (
    <div>
      <label htmlFor={id} className="block font-display text-[1.05rem] font-bold">{label}</label>
      <p id={`${id}-h`} className="mt-0.5 text-sm text-fg-muted">{hint}</p>
      <div className="mt-3 flex items-center gap-3">
        <button type="button" aria-label={`Diminuir ${label.toLowerCase()}`} onClick={() => onChange(clamp(value - 1))} disabled={value <= min}
          className="grid h-12 w-12 place-items-center rounded-full border border-slate-300 text-xl transition hover:border-ink-900 disabled:opacity-40">−</button>
        <input id={id} type="number" inputMode="numeric" min={min} max={max} value={value} aria-describedby={`${id}-h`}
          onChange={(e) => onChange(clamp(parseInt(e.target.value, 10)))}
          className="tnum h-12 w-24 rounded-xl border border-slate-300 bg-white text-center font-display text-xl font-bold outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30" />
        <button type="button" aria-label={`Aumentar ${label.toLowerCase()}`} onClick={() => onChange(clamp(value + 1))} disabled={value >= max}
          className="grid h-12 w-12 place-items-center rounded-full border border-slate-300 text-xl transition hover:border-ink-900 disabled:opacity-40">+</button>
      </div>
    </div>
  );
}

/** Calculadora de orçamento IT-41: R$ 1.799 por pavimento + R$ 449 por carregador (preços públicos). */
export function It41Calculator() {
  const [floors, setFloors] = useState(2);
  const [chargers, setChargers] = useState(6);
  const floorsTotal = floors * PRICE_FLOOR;
  const chargersTotal = chargers * PRICE_CHARGER;
  const total = floorsTotal + chargersTotal;
  const msg = `Olá! Simulei a adequação à IT-41 no site: ${floors} pavimento(s) e ${chargers} carregador(es), estimativa de ${brl(total)}. Quero agendar a visita técnica.`;

  return (
    <div className="grid overflow-hidden rounded-3xl border border-hair bg-card shadow-card lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-8 p-7 md:p-10">
        <Stepper label="Pavimentos de garagem" hint="Quantos andares com carregadores precisam da botoeira de emergência." value={floors} onChange={setFloors} min={1} max={30} />
        <Stepper label="Carregadores" hint="Total de carregadores de até 7,4 kW já instalados conforme as normas NBR." value={chargers} onChange={setChargers} min={1} max={300} />
        <p className="text-sm text-fg-muted">Estimativa com base nos preços públicos, com materiais e mão de obra inclusos. Situações diferentes são avaliadas na visita técnica.</p>
      </div>
      <div data-tone="dark" className="flex flex-col justify-between bg-ink-900 p-7 text-white md:p-10">
        <div aria-live="polite">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-brand-400">Estimativa de adequação</p>
          <p className="tnum mt-3 font-display text-[2.8rem] font-extrabold leading-none tracking-tight">{brl(total)}</p>
          <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-[0.95rem]">
            <div className="flex justify-between gap-4"><dt className="text-muted-dark">{floors} × {brl(PRICE_FLOOR)} por pavimento</dt><dd className="tnum font-semibold">{brl(floorsTotal)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted-dark">{chargers} × {brl(PRICE_CHARGER)} por carregador</dt><dd className="tnum font-semibold">{brl(chargersTotal)}</dd></div>
          </dl>
        </div>
        <a href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer"
          className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 font-semibold text-ink-950 shadow-[0_8px_24px_-10px_rgba(16,183,255,.7)] transition hover:bg-brand-400">
          <Icon name="whatsapp" size={18} /> Enviar esta simulação ao time
        </a>
      </div>
    </div>
  );
}
