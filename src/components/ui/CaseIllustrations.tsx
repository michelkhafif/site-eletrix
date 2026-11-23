import type { ReactElement } from 'react';
/**
 * Ilustrações próprias dos três perfis ("Qual é o seu caso?"). Mesmo traço (2 px, pontas redondas),
 * mesma paleta: azul da marca sobre azul-marinho, com branco para os contornos.
 */
const stroke = { fill: 'none', stroke: '#fff', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Car({ x = 0, y = 0, plug = false }: { x?: number; y?: number; plug?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path {...stroke} d="M8 44h74c4 0 6-2 6-6v-8c0-3-2-5-5-6l-14-3-11-11c-2-2-4-3-7-3H34c-3 0-5 1-7 3L19 23l-10 2c-3 1-5 3-5 6v7c0 4 2 6 4 6Z" />
      <path {...stroke} d="M30 14h14l8 9H24l6-9Z" fill="#10b7ff" fillOpacity=".25" />
      <circle cx="24" cy="44" r="7" fill="#0a1220" stroke="#fff" strokeWidth="2" />
      <circle cx="68" cy="44" r="7" fill="#0a1220" stroke="#fff" strokeWidth="2" />
      {plug && <circle cx="86" cy="29" r="2.5" fill="#10b7ff" />}
    </g>
  );
}

function Charger({ x, y, h = 46 }: { x: number; y: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="22" height={h} rx="4" fill="#10b7ff" />
      <circle cx="11" cy="14" r="5" fill="#0a1220" />
      <path d="M8 26h6M11 23v6" stroke="#0a1220" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export function MoradorArt() {
  return (
    <svg viewBox="0 0 320 190" role="presentation" aria-hidden="true" className="h-full w-full">
      {/* vaga: parede, piso e faixas */}
      <path d="M0 150h320" {...stroke} strokeOpacity=".5" />
      <path d="M30 150l-10 30M150 150l-10 30M270 150l10 30" {...stroke} stroke="#10b7ff" strokeOpacity=".6" />
      <Charger x={226} y={78} />
      <path d="M237 124c-14 14-26 18-44 16" {...stroke} stroke="#10b7ff" strokeWidth={2.5} />
      <Car x={92} y={102} plug />
      {/* medidor da unidade */}
      <rect x="258" y="40" width="34" height="30" rx="4" {...stroke} />
      <path d="M279 48l-7 11h9l-6 9" {...stroke} stroke="#10b7ff" />
      <path d="M270 70v22c0 8-3 14-9 20" {...stroke} strokeOpacity=".55" strokeDasharray="3 5" />
    </svg>
  );
}

export function SindicoArt() {
  const win: ReactElement[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) win.push(<rect key={`${r}${c}`} x={72 + c * 26} y={32 + r * 24} width="14" height="14" rx="2" fill={(r + c) % 3 === 0 ? '#10b7ff' : 'none'} fillOpacity=".5" stroke="#fff" strokeWidth="1.6" />);
  return (
    <svg viewBox="0 0 320 190" role="presentation" aria-hidden="true" className="h-full w-full">
      <path d="M0 160h320" {...stroke} strokeOpacity=".5" />
      <rect x="58" y="14" width="116" height="146" rx="4" {...stroke} />
      {win}
      <rect x="104" y="128" width="24" height="32" rx="2" {...stroke} />
      {/* escudo com check: segurança e regularização */}
      <path d="M232 50l46 14v34c0 28-18 46-46 56-28-10-46-28-46-56V64l46-14Z" fill="#10b7ff" />
      <path d="M212 104l14 14 26-30" fill="none" stroke="#0a1220" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NegocioArt() {
  return (
    <svg viewBox="0 0 320 190" role="presentation" aria-hidden="true" className="h-full w-full">
      <path d="M0 166h320" {...stroke} strokeOpacity=".5" />
      {/* torre ao fundo */}
      <rect x="120" y="10" width="80" height="102" rx="3" {...stroke} strokeOpacity=".7" />
      {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={132 + c * 24} y={22 + r * 22} width="12" height="10" rx="1.5" {...stroke} strokeWidth={1.4} strokeOpacity=".6" />))}
      {/* garagem com várias estações */}
      <path d="M20 112h280v54H20z" {...stroke} />
      <Charger x={44} y={120} h={40} />
      <Charger x={146} y={120} h={40} />
      <Charger x={248} y={120} h={40} />
      <path d="M66 148c8 6 12 8 18 8M168 148c8 6 12 8 18 8" {...stroke} stroke="#10b7ff" strokeWidth={2.5} />
      <g transform="translate(80 126) scale(.62)"><Car plug /></g>
      <g transform="translate(182 126) scale(.62)"><Car plug /></g>
    </svg>
  );
}
