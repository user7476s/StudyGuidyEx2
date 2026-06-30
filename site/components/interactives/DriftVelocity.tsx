'use client';

import { useMemo, useState } from 'react';

const e = 1.602e-19;

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

type Material = { name: string; n: number; note: string };
const MATERIALS: Material[] = [
  { name: 'Copper (metal)', n: 8.34e28, note: '~1 conduction electron per atom' },
  { name: 'Aluminum (metal)', n: 1.81e29, note: '~3 conduction electrons per atom' },
  { name: 'Silver (metal)', n: 5.86e28, note: 'highest conductivity of pure metals' },
  { name: 'Doped semiconductor', n: 1.0e22, note: 'roughly 10⁶× fewer carriers than a metal' },
  { name: 'Intrinsic semiconductor', n: 1.0e16, note: 'pure Si at room T — astronomically fewer carriers' },
];

const W = 480;
const H = 110;

export function DriftVelocity() {
  const [matIdx, setMatIdx] = useState(0);
  const [I, setI] = useState(1.0);
  const [d_mm, setD_mm] = useState(1.0);

  const mat = MATERIALS[matIdx];
  const d = d_mm * 1e-3;
  const A = Math.PI * (d / 2) ** 2;
  const v_d = I / (mat.n * e * A);

  const J = I / A;
  const tCross1m = 1 / v_d;

  // Animate a few electron dots drifting rightward at a speed visually mapped from v_d.
  const speedPxPerSec = useMemo(() => {
    // log-scale: typical metal drift ~1e-4 m/s → 4 px/s; semiconductor 1 m/s → ~80 px/s
    const logV = Math.max(-9, Math.log10(Math.max(v_d, 1e-9)));
    return 4 + 8 * (logV + 6); // tuned so metals crawl, semiconductors zoom
  }, [v_d]);

  const dots = Array.from({ length: 16 }, (_, i) => ({ i, x0: (i * 31) % (W - 30) + 10, y: 35 + (i % 3) * 20 }));

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
                <option key={m.name} value={i}>{m.name} — n = {fmt(m.n)} m⁻³</option>
              ))}
            </select>
            <span className="text-xs text-slate-500">{mat.note}</span>
          </label>
          <label className="block">I (current) = {I.toFixed(2)} A
            <input type="range" min={0.01} max={20} step={0.01} value={I} onChange={(ev) => setI(+ev.target.value)} className="w-full" />
          </label>
          <label className="block">d (wire diameter) = {d_mm.toFixed(2)} mm
            <input type="range" min={0.10} max={5.00} step={0.01} value={d_mm} onChange={(ev) => setD_mm(+ev.target.value)} className="w-full" />
          </label>
        </div>
        <div role="status" aria-live="polite" className="bg-slate-50 border rounded p-2 font-mono text-xs space-y-0.5">
          <div>A = π(d/2)² = {fmt(A)} m²</div>
          <div>J = I/A = {fmt(J)} A/m²</div>
          <div>v_d = I/(nqA) = {fmt(v_d)} m/s</div>
          <div>t to cross 1 m = {fmt(tCross1m)} s</div>
          <div className="text-slate-500">{tCross1m > 60 ? `(≈ ${(tCross1m / 60).toFixed(1)} min for one electron to drift 1 m)` : ''}</div>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full mt-2 border bg-slate-50">
        {/* wire */}
        <rect x={6} y={20} width={W - 12} height={70} fill="#fef3c7" stroke="#d97706" />
        <text x={10} y={16} fontSize={10} fill="#475569">wire (carriers drift →)</text>

        {/* field arrow above */}
        <line x1={20} y1={102} x2={W - 20} y2={102} stroke="#1d4ed8" strokeWidth={1.5} markerEnd="url(#dv-arrow)" />
        <text x={W - 60} y={108} fontSize={10} fill="#1d4ed8">E-field (instant)</text>

        <defs>
          <marker id="dv-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#1d4ed8" />
          </marker>
          <style>{`
            @keyframes dv-drift {
              from { transform: translateX(0); }
              to   { transform: translateX(${W - 30}px); }
            }
          `}</style>
        </defs>

        {dots.map((dot) => {
          const dur = Math.max(0.6, (W - 30) / speedPxPerSec); // seconds for full traverse
          return (
            <g key={dot.i} style={{ animation: `dv-drift ${dur.toFixed(2)}s linear infinite`, animationDelay: `${(-dot.i * dur / 16).toFixed(2)}s` }}>
              <circle cx={dot.x0 - W + 30} cy={dot.y} r={3} fill="#0f172a" />
            </g>
          );
        })}
      </svg>

      <p className="text-xs text-slate-600 mt-2">
        Try: keep <em>I</em> fixed and switch from Copper to <em>Doped semiconductor</em> — <em>v_d</em>
        jumps by ~10⁶ because <em>n</em> shrunk by 10⁶. Halve the diameter at fixed <em>I</em> → quarter the area → quadruple the drift speed.
        The blue arrow underneath is the field; it propagates at \u2248 <em>c</em> regardless of the dots&apos; pace.
      </p>
    </div>
  );
}
