import { Picture } from '@/components/ui/Picture';
import { LedRunner } from './LedRunner';
import led from '@/data/hero-led.json';

/**
 * Foto do hero com a "cobrinha de luz": um segmento curto de LED azul, com rastro que esmaece,
 * que percorre os contornos reais dos objetos (cabo, plugue, carro, orelhões, carregador e prédio).
 *
 * A foto e o SVG ficam em molduras idênticas (.cover-frame), com a proporção exata da foto original,
 * recortadas por CSS (unidades de container). Assim a luz fica em cima das bordas em qualquer tela.
 * Só stroke-dashoffset e opacity mudam, e só nos trechos acesos (ver LedRunner). Com movimento reduzido, nada aparece.
 */

type Seg = { id: string; d: string };

/** Comprimento aproximado de um caminho SVG com comandos M, L e C absolutos. */
function pathLen(d: string): number {
  const tokens = d.match(/[MLC]|-?[\d.]+/g) ?? [];
  let i = 0, x = 0, y = 0, total = 0, cmd = 'M';
  const n = () => Number(tokens[i++]);
  while (i < tokens.length) {
    if (/[MLC]/.test(tokens[i])) cmd = tokens[i++];
    if (cmd === 'M') { x = n(); y = n(); cmd = 'L'; }
    else if (cmd === 'L') { const nx = n(), ny = n(); total += Math.hypot(nx - x, ny - y); x = nx; y = ny; }
    else {
      const [ax, ay, bx, by, cx, cy] = [n(), n(), n(), n(), n(), n()];
      let px = x, py = y;
      for (let k = 1; k <= 24; k++) {
        const t = k / 24, u = 1 - t;
        const qx = u * u * u * x + 3 * u * u * t * ax + 3 * u * t * t * bx + t * t * t * cx;
        const qy = u * u * u * y + 3 * u * u * t * ay + 3 * u * t * t * by + t * t * t * cy;
        total += Math.hypot(qx - px, qy - py); px = qx; py = qy;
      }
      x = cx; y = cy;
    }
  }
  return total;
}

/** Coreografia: cada passo começa quando a luz do anterior está quase no fim. Itens juntos correm em paralelo. */
const choreography = [['cabo'], ['plugue'], ['porta', 'tampa'], ['carro', 'paralama'], ['totem'], ['carregador'], ['tomada'], ['orelhao2'], ['predio', 'predio2']];
const SPEED = 540; // unidades da foto por segundo
const SNAKE = { head: 34, body: 110, tail: 240 };
const REST = 1.1; // pausa entre voltas (s)

const segments = led.segments as Seg[];

function timeline() {
  let t = 0.4;
  const plan: { seg: Seg; start: number; len: number; tail: number }[] = [];
  for (const group of choreography) {
    let longest = 0;
    for (const id of group) {
      const seg = segments.find((s) => s.id === id)!;
      const len = pathLen(seg.d);
      plan.push({ seg, start: t, len, tail: Math.min(SNAKE.tail, len * 0.7) });
      longest = Math.max(longest, len);
    }
    t += (longest / SPEED) * 0.82;
  }
  const end = Math.max(...plan.map((p) => p.start + (p.len + p.tail) / SPEED));
  return { plan, total: end + REST };
}

const { plan, total } = timeline();
const f = (v: number) => Number(v.toFixed(4));

/** Camadas do traço: brilho largo, rastro, corpo, brilho da ponta e ponta quase branca. */
const layers: { cls: string; dash: 'head' | 'body' | 'tail' }[] = [
  { cls: 'led-halo', dash: 'body' },
  { cls: 'led-tail', dash: 'tail' },
  { cls: 'led-body', dash: 'body' },
  { cls: 'led-glow', dash: 'head' },
  { cls: 'led-head', dash: 'head' },
];

export function HeroScene() {
  return (
    <div className="hero-media" aria-hidden="true">
      <div className="hero-photo">
        <div className="cover-frame">
          <Picture name="totem-orelhao" alt="" priority fill sizes="(max-width: 767px) 80vw, 780px" />
        </div>
        <div className="hero-shade" />
      </div>
      <div className="hero-led">
        <div className="cover-frame">
          <svg viewBox={`0 0 ${led.w} ${led.h}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full" focusable="false">
            {plan.map((p) => {
              // comprimentos em frações do caminho (pathLength = 1)
              const dash = { head: Math.min(SNAKE.head, p.len * 0.2) / p.len, body: Math.min(SNAKE.body, p.len * 0.4) / p.len, tail: p.tail / p.len };
              return (
                <g key={p.seg.id} className="led-seg" data-seg={p.seg.id} data-start={f(p.start)} data-end={f(p.start + (p.len + p.tail) / SPEED)} data-travel={f(1 + dash.tail)} style={{ display: 'none' }}>
                  {layers.map((l) => (
                    <path key={l.cls} d={p.seg.d} pathLength={1} className={l.cls} data-dash={f(dash[l.dash])} style={{ strokeDasharray: `${f(dash[l.dash])} 3`, strokeDashoffset: f(dash[l.dash]) }} />
                  ))}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      <LedRunner total={f(total)} />
    </div>
  );
}
