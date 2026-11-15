/** Ilustração conceitual: o controle de demanda reduz a potência dos carregadores quando o prédio se aproxima do limite. */
export function DemandDiagram() {
  const W = 720, H = 320, padL = 44, padR = 20, padT = 24, padB = 42;
  const iw = W - padL - padR, ih = H - padT - padB;
  // consumo do prédio (0..1) ao longo de 24 pontos (horas). Curva ilustrativa.
  const building = [0.34, 0.32, 0.3, 0.3, 0.32, 0.4, 0.55, 0.7, 0.82, 0.88, 0.9, 0.92, 0.9, 0.9, 0.92, 0.9, 0.85, 0.78, 0.68, 0.58, 0.48, 0.42, 0.38, 0.35];
  const limit = 0.95;
  const x = (i: number) => padL + (i / (building.length - 1)) * iw;
  const y = (v: number) => padT + (1 - v) * ih;
  const line = building.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L${x(building.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;
  // potência dos carregadores: o que sobra até o limite, com teto de 0,5
  const chargers = building.map((v) => Math.min(0.5, Math.max(0.03, limit - v)));
  const top = chargers.map((c, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(building[i] + c).toFixed(1)}`).join(' ');
  const bottom = building.map((v, i) => `L${x(building.length - 1 - i)},${y(building[building.length - 1 - i])}`).join(' ');
  const band = `${top} ${bottom} Z`;
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="dd-t dd-d" className="h-auto w-full">
        <title id="dd-t">Ilustração do controle de demanda</title>
        <desc id="dd-d">Gráfico conceitual: o consumo do prédio sobe durante o dia e a potência disponível aos carregadores diminui para que o total nunca ultrapasse o limite seguro. À noite, com o consumo baixo, os carregadores operam com potência máxima.</desc>
        {[0, 0.25, 0.5, 0.75, 1].map((g) => <line key={g} x1={padL} x2={W - padR} y1={y(g)} y2={y(g)} stroke="currentColor" strokeOpacity=".1" />)}
        <path d={band} fill="#10B7FF" fillOpacity=".35" />
        <path d={area} fill="currentColor" fillOpacity=".12" />
        <path d={line} fill="none" stroke="currentColor" strokeOpacity=".75" strokeWidth="2" />
        <line x1={padL} x2={W - padR} y1={y(limit)} y2={y(limit)} stroke="#10B7FF" strokeWidth="2" strokeDasharray="6 5" />
        <text x={W - padR} y={y(limit) - 8} textAnchor="end" fontSize="13" fontWeight="600" fill="#10B7FF">Limite seguro de demanda</text>
        {[0, 6, 12, 18, 23].map((h) => <text key={h} x={x(h)} y={H - 14} textAnchor="middle" fontSize="12" fill="currentColor" fillOpacity=".6">{String(h).padStart(2, '0')}h</text>)}
        <text x={x(10)} y={y(0.55)} textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor" fillOpacity=".8">Consumo do prédio</text>
        <text x={x(3)} y={y(0.74)} textAnchor="middle" fontSize="13" fontWeight="600" fill="#10B7FF">Carregadores: potência ajustada</text>
      </svg>
      <figcaption className="mt-3 text-sm text-fg-muted">Ilustração conceitual. Quando o consumo do prédio sobe, a potência dos carregadores desce. À noite, com folga, eles voltam à potência máxima.</figcaption>
    </figure>
  );
}
