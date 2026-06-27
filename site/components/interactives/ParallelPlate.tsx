'use client';

import { useMemo, useState } from 'react';

const eps0 = 8.854e-12;

function fmt(x: number) {
  if (x === 0) return '0';
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

const W = 480;
const H = 240;

export function ParallelPlate() {
  const [A, setA] = useState(0.01);
  const [d, setD] = useState(1e-3);
  const [kappa, setKappa] = useState(1);
  const [V, setV] = useState(12);

  const { C, Q, U, E } = useMemo(() => {
    const C = (kappa * eps0 * A) / d;
    const Q = C * V;
    const U = 0.5 * C * V * V;
    const E = V / d;
    return { C, Q, U, E };
  }, [A, d, kappa, V]);

  const plateWidth = 120 + 320 * Math.min(1, A / 0.05);
  const gap = 30 + 130 * Math.min(1, d / 5e-3);
  const cx = W / 2;
  const yTop = H / 2 - gap / 2;
  const yBot = H / 2 + gap / 2;
  const xLeft = cx - plateWidth / 2;
  const xRight = cx + plateWidth / 2;

  const numLines = 12;
  const fieldLines = [] as { x: number }[];
  for (let i = 0; i < numLines; i++) {
    const t = (i + 0.5) / numLines;
    fieldLines.push({ x: xLeft + t * plateWidth });
  }

  const eqStops = [0, 0.25, 0.5, 0.75, 1];

  const fringeCount = 4;
  const fringeLines: { d: string }[] = [];
  for (let i = 0; i < fringeCount; i++) {
    const t = (i + 1) / (fringeCount + 1);
    const xOff = 16 + i * 14;
    const yMid = yTop + t * gap;
    fringeLines.push({
      d: `M${xLeft},${yTop} C${xLeft - xOff},${yTop} ${xLeft - xOff},${yBot} ${xLeft},${yBot}`,
    });
    fringeLines.push({
      d: `M${xRight},${yTop} C${xRight + xOff},${yTop} ${xRight + xOff},${yBot} ${xRight},${yBot}`,
    });
    void yMid;
  }

  return (
    <div className="border rounded p-3 bg-white">
      <div className="grid md:grid-cols-2 gap-3 text-sm">
        <div className="space-y-2">
          <label className="block">A (plate area, m²) = {A.toFixed(4)}
            <input type="range" min={0.001} max={0.05} step={0.0005} value={A} onChange={(e) => setA(+e.target.value)} className="w-full" />
          </label>
          <label className="block">d (separation, mm) = {(d * 1000).toFixed(2)}
            <input type="range" min={0.1} max={5} step={0.05} value={d * 1000} onChange={(e) => setD((+e.target.value) / 1000)} className="w-full" />
          </label>
          <label className="block">κ (dielectric) = {kappa.toFixed(1)}
            <input type="range" min={1} max={10} step={0.1} value={kappa} onChange={(e) => setKappa(+e.target.value)} className="w-full" />
          </label>
          <label className="block">V (applied voltage) = {V.toFixed(1)} V
            <input type="range" min={1} max={100} step={1} value={V} onChange={(e) => setV(+e.target.value)} className="w-full" />
          </label>
        </div>
        <div role="status" aria-live="polite" className="bg-slate-50 border rounded p-2 font-mono text-xs space-y-0.5">
          <div>C = κε₀A/d = {fmt(C)} F</div>
          <div>Q = CV = {fmt(Q)} C</div>
          <div>U = ½CV² = {fmt(U)} J</div>
          <div>E = V/d = {fmt(E)} V/m</div>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full mt-2 border bg-slate-50">
        <defs>
          <marker id="pp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#0f172a" />
          </marker>
        </defs>

        {fringeLines.map((l, i) => (
          <path key={`f${i}`} d={l.d} fill="none" stroke="#94a3b8" strokeWidth={1} />
        ))}

        {eqStops.map((t, i) => {
          const y = yTop + t * gap;
          const Vlabel = V * (1 - t);
          return (
            <g key={`eq${i}`}>
              <line x1={xLeft + 6} y1={y} x2={xRight - 6} y2={y} stroke="#b91c1c" strokeWidth={1} strokeDasharray="4 3" opacity={0.85} />
              <text x={xRight - 4} y={y - 2} fontSize={9} fill="#7f1d1d" textAnchor="start">{Vlabel.toFixed(1)} V</text>
            </g>
          );
        })}

        {fieldLines.map((fl, i) => (
          <line
            key={`fl${i}`}
            x1={fl.x}
            y1={yTop + 2}
            x2={fl.x}
            y2={yBot - 2}
            stroke="#0f172a"
            strokeWidth={1.2}
            markerEnd="url(#pp-arrow)"
          />
        ))}

        <rect x={xLeft - 4} y={yTop - 6} width={plateWidth + 8} height={6} fill="#0f172a" />
        <rect x={xLeft - 4} y={yBot} width={plateWidth + 8} height={6} fill="#0f172a" />

        <text x={xLeft - 8} y={yTop - 8} textAnchor="end" fontSize={11} fontWeight="bold" fill="#0f172a">+V</text>
        <text x={xLeft - 8} y={yBot + 14} textAnchor="end" fontSize={11} fontWeight="bold" fill="#0f172a">0</text>

        <text x={W - 8} y={H - 10} fontSize={9} fill="#64748b" textAnchor="end">
          idealized model — uniform interior field, fringing exaggerated
        </text>

        <g transform={`translate(8, 8)`}>
          <rect width={130} height={42} fill="white" stroke="#cbd5e1" rx={3} />
          <line x1={6} y1={14} x2={26} y2={14} stroke="#0f172a" strokeWidth={1.2} />
          <text x={32} y={17} fontSize={10}>field line</text>
          <line x1={6} y1={30} x2={26} y2={30} stroke="#b91c1c" strokeDasharray="4 3" />
          <text x={32} y={33} fontSize={10}>equipotential</text>
        </g>
      </svg>

      <p className="text-xs text-slate-600 mt-2">
        Try: double <em>d</em> → <em>C</em> halves and <em>E</em> halves (V is fixed by the slider, mimicking a battery). Slide κ up → <em>C</em> rises but <em>E</em> stays fixed (the dielectric is doing the work, not the field). Why?
      </p>
    </div>
  );
}
