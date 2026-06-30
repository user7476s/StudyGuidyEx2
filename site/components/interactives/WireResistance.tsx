'use client';

import { useState } from 'react';

function fmt(x: number) {
  if (!isFinite(x) || x === 0) return '0';
  const abs = Math.abs(x);
  if (abs >= 1e3 || abs < 1e-2) {
    const exp = Math.floor(Math.log10(abs));
    const m = x / Math.pow(10, exp);
    return `${m.toFixed(2)}×10${sup(exp)}`;
  }
  return x.toPrecision(3);
}
function sup(n: number) {
  const map: Record<string, string> = {
    '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  };
  return String(n).split('').map((c) => map[c] ?? c).join('');
}

type Material = { name: string; rho20: number; alpha: number; color: string };
const MATERIALS: Material[] = [
  { name: 'Copper',   rho20: 1.7e-8,  alpha:  4.0e-3, color: '#b45309' },
  { name: 'Aluminum', rho20: 2.82e-8, alpha:  3.9e-3, color: '#a3a3a3' },
  { name: 'Tungsten', rho20: 5.6e-8,  alpha:  4.5e-3, color: '#475569' },
  { name: 'Nichrome', rho20: 1.1e-6,  alpha:  4.0e-4, color: '#92400e' },
  { name: 'Carbon',   rho20: 3.5e-5,  alpha: -5.0e-4, color: '#1e293b' },
];

const W = 480;
const H = 130;

export function WireResistance() {
  const [matIdx, setMatIdx] = useState(0);
  const [L, setL] = useState(5.0);
  const [d_mm, setD_mm] = useState(1.0);
  const [T, setT] = useState(20);

  const mat = MATERIALS[matIdx];
  const d = d_mm * 1e-3;
  const A = Math.PI * (d / 2) ** 2;
  const R0 = (mat.rho20 * L) / A;
  const dT = T - 20;
  const R = R0 * (1 + mat.alpha * dT);
  const rhoT = mat.rho20 * (1 + mat.alpha * dT);

  // Draw a wire whose length / diameter visually scale
  const wireMaxLenPx = W - 60;
  const wireLenPx = 40 + wireMaxLenPx * Math.min(1, L / 30);
  const wireDiamPx = Math.max(4, Math.min(40, d_mm * 8));
  const cy = H / 2;
  const x0 = 30;
  const x1 = x0 + wireLenPx;

  return (
    <div className="border rounded p-3 bg-white">
      <div className="grid md:grid-cols-2 gap-3 text-sm">
        <div className="space-y-2">
          <label className="block">Material — <b>{mat.name}</b>
            <select
              className="block w-full mt-1 border border-slate-300 rounded px-2 py-1 text-xs"
              value={matIdx}
              onChange={(ev) => setMatIdx(+ev.target.value)}
            >
              {MATERIALS.map((m, i) => (
                <option key={m.name} value={i}>
                  {m.name} — ρ₂₀ = {fmt(m.rho20)} Ω·m, α = {fmt(m.alpha)} /°C
                </option>
              ))}
            </select>
          </label>
          <label className="block">L (length, m) = {L.toFixed(2)}
            <input type="range" min={0.1} max={50} step={0.1} value={L} onChange={(ev) => setL(+ev.target.value)} className="w-full" />
          </label>
          <label className="block">d (diameter, mm) = {d_mm.toFixed(2)}
            <input type="range" min={0.10} max={5.00} step={0.01} value={d_mm} onChange={(ev) => setD_mm(+ev.target.value)} className="w-full" />
          </label>
          <label className="block">T (operating temperature, °C) = {T.toFixed(0)}
            <input type="range" min={-50} max={3000} step={5} value={T} onChange={(ev) => setT(+ev.target.value)} className="w-full" />
          </label>
        </div>
        <div role="status" aria-live="polite" className="bg-slate-50 border rounded p-2 font-mono text-xs space-y-0.5">
          <div>A = π(d/2)² = {fmt(A)} m²</div>
          <div>ρ(T) = ρ₀[1+αΔT] = {fmt(rhoT)} Ω·m</div>
          <div>R₀ at 20°C = ρ₂₀L/A = {fmt(R0)} Ω</div>
          <div>R(T) = R₀[1+αΔT] = {fmt(R)} Ω</div>
          <div>R(T) / R₀ = {(R / R0).toFixed(3)}×</div>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full mt-2 border bg-slate-50">
        <rect x={x0} y={cy - wireDiamPx / 2} width={wireLenPx} height={wireDiamPx} fill={mat.color} stroke="#0f172a" />
        {/* terminals */}
        <line x1={6} y1={cy} x2={x0} y2={cy} stroke="#0f172a" strokeWidth={2} />
        <line x1={x1} y1={cy} x2={W - 6} y2={cy} stroke="#0f172a" strokeWidth={2} />
        <text x={W / 2} y={cy + wireDiamPx / 2 + 18} fontSize={11} fill="#0f172a" textAnchor="middle">
          {mat.name}, L = {L.toFixed(2)} m, d = {d_mm.toFixed(2)} mm
        </text>
        <text x={W / 2} y={20} fontSize={11} fontWeight="bold" fill="#0f172a" textAnchor="middle">
          R(T = {T.toFixed(0)}°C) = {fmt(R)} Ω
        </text>

        {/* heat tint when hot */}
        {T > 200 && (
          <rect
            x={x0}
            y={cy - wireDiamPx / 2}
            width={wireLenPx}
            height={wireDiamPx}
            fill="#ef4444"
            opacity={Math.min(0.6, (T - 200) / 2800)}
          />
        )}
      </svg>

      <p className="text-xs text-slate-600 mt-2">
        Try: double <em>L</em> → <em>R</em> doubles (linear in length). Double the <em>diameter</em>
        → <em>R</em> drops to a <em>quarter</em> (area quadruples). Heat tungsten from 20°C up toward 2800°C
        and watch <em>R</em> climb by &gt;12×: that&apos;s the inrush spike that kills incandescent bulbs at switch-on.
        Switch the material to <em>Carbon</em> and warm it — α is negative, so <em>R drops</em>.
      </p>
    </div>
  );
}
