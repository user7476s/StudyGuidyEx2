'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

const k = 8.99e9;

const W = 380;
const H = 220;
const PL = 50;
const PR = 14;
const PT = 24;
const PB = 32;

function fmt(x: number) {
  if (x === 0) return '0';
  const abs = Math.abs(x);
  if (abs >= 1e4 || abs < 1e-2) {
    const exp = Math.floor(Math.log10(abs));
    const m = x / Math.pow(10, exp);
    return `${m.toFixed(2)}×10${sup(exp)}`;
  }
  return x.toFixed(2);
}
function sup(n: number) {
  const map: Record<string, string> = {
    '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  };
  return String(n).split('').map((c) => map[c] ?? c).join('');
}

function niceTicks(maxAbs: number, count = 4): number[] {
  if (maxAbs <= 0) return [0];
  const raw = maxAbs / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  let step;
  if (norm < 1.5) step = 1 * mag;
  else if (norm < 3) step = 2 * mag;
  else if (norm < 7) step = 5 * mag;
  else step = 10 * mag;
  const ticks: number[] = [];
  for (let v = 0; v <= maxAbs + step * 0.001; v += step) ticks.push(v);
  return ticks;
}

export function VrEr() {
  const [q, setQ] = useState(1);
  const [rMax, setRMax] = useState(1);
  const [rMarker, setRMarker] = useState(0.3);
  const vRef = useRef<SVGSVGElement | null>(null);
  const eRef = useRef<SVGSVGElement | null>(null);
  const cachedRect = useRef<DOMRect | null>(null);
  const rafId = useRef<number | null>(null);

  const rMin = 0.02;

  const data = useMemo(() => {
    const Nplot = 200;
    const Q = q * 1e-9;
    const pts: { r: number; V: number; E: number }[] = [];
    for (let i = 0; i < Nplot; i++) {
      const r = rMin + (rMax - rMin) * (i / (Nplot - 1));
      pts.push({ r, V: (k * Q) / r, E: (k * Q) / (r * r) });
    }
    const Vmax = Math.max(...pts.map((p) => Math.abs(p.V)));
    const Emax = Math.max(...pts.map((p) => Math.abs(p.E)));
    return { pts, Vmax, Emax };
  }, [q, rMax]);

  const clampedR = Math.max(rMin, Math.min(rMax, rMarker));
  const Q = q * 1e-9;
  const Vat = (k * Q) / clampedR;
  const Eat = (k * Q) / (clampedR * clampedR);

  const xPx = (r: number) => PL + ((W - PL - PR) * (r - rMin)) / (rMax - rMin);
  const ySign = q >= 0 ? 1 : -1;
  const yPxAbs = (v: number, vMax: number) => {
    return H - PB - ((H - PT - PB) * Math.abs(v)) / (vMax || 1);
  };

  const pathFor = (key: 'V' | 'E', vmax: number) =>
    data.pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${xPx(p.r).toFixed(1)},${yPxAbs(p[key], vmax).toFixed(1)}`).join(' ');

  const onPointerDown = useCallback((svg: SVGSVGElement | null, e: React.PointerEvent<SVGSVGElement>) => {
    if (!svg || (e.buttons & 1) === 0) return;
    cachedRect.current = svg.getBoundingClientRect();
    const rect = cachedRect.current;
    const xRel = e.clientX - rect.left;
    const xPlot = (xRel / rect.width) * W;
    const t = (xPlot - PL) / (W - PL - PR);
    const r = Math.max(rMin, Math.min(rMax, rMin + t * (rMax - rMin)));
    setRMarker(r);
  }, [rMax]);

  const onPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if ((e.buttons & 1) === 0) return;
    const rect = cachedRect.current;
    if (!rect) return;
    // Capture clientX before the rAF fires (synthetic event may be reused)
    const clientX = e.clientX;
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const xRel = clientX - rect.left;
      const xPlot = (xRel / rect.width) * W;
      const t = (xPlot - PL) / (W - PL - PR);
      const r = Math.max(rMin, Math.min(rMax, rMin + t * (rMax - rMin)));
      setRMarker(r);
    });
  }, [rMax]);

  const Vticks = niceTicks(data.Vmax);
  const Eticks = niceTicks(data.Emax);

  const markerX = xPx(clampedR);

  return (
    <div className="border rounded p-3 bg-white">
      <div className="flex gap-4 flex-wrap text-sm mb-2">
        <label>
          q = {q.toFixed(2)} nC
          <input type="range" min={-10} max={10} step={0.1} value={q} onChange={(e) => setQ(+e.target.value)} className="block w-48" />
        </label>
        <label>
          r range: {rMin} → {rMax.toFixed(2)} m
          <input type="range" min={0.1} max={5} step={0.05} value={rMax} onChange={(e) => setRMax(+e.target.value)} className="block w-48" />
        </label>
        <label>
          marker r = {clampedR.toFixed(3)} m
          <input
            type="range"
            min={rMin}
            max={rMax}
            step={0.005}
            value={clampedR}
            onChange={(e) => setRMarker(+e.target.value)}
            className="block w-48"
          />
        </label>
      </div>

      <div role="status" aria-live="polite" className="mb-2 font-mono text-xs bg-slate-50 border rounded p-2">
        at r = {clampedR.toFixed(3)} m: V = {fmt(Vat)} V, |E| = {fmt(Math.abs(Eat))} V/m
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <svg
          ref={vRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full bg-white border touch-none cursor-ew-resize"
          onPointerDown={(e) => onPointerDown(vRef.current, e)}
          onPointerMove={onPointerMove}
        >
          <text x={W / 2} y={14} textAnchor="middle" fontSize={11} fontWeight="bold">V(r) = kq/r &nbsp;[V vs m]</text>

          {Vticks.map((t, i) => (
            <g key={`vt${i}`}>
              <line x1={PL - 3} y1={yPxAbs(t, data.Vmax)} x2={W - PR} y2={yPxAbs(t, data.Vmax)} stroke="#e2e8f0" strokeWidth={0.5} />
              <text x={PL - 6} y={yPxAbs(t, data.Vmax) + 3} textAnchor="end" fontSize={9} fill="#475569">
                {fmt(ySign * t)}
              </text>
            </g>
          ))}

          <line x1={PL} y1={H - PB} x2={W - PR} y2={H - PB} stroke="#0f172a" />
          <line x1={PL} y1={PT} x2={PL} y2={H - PB} stroke="#0f172a" />

          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
            const r = rMin + t * (rMax - rMin);
            return (
              <g key={`rx${i}`}>
                <line x1={xPx(r)} y1={H - PB} x2={xPx(r)} y2={H - PB + 3} stroke="#0f172a" />
                <text x={xPx(r)} y={H - PB + 14} textAnchor="middle" fontSize={9} fill="#475569">{r.toFixed(2)}</text>
              </g>
            );
          })}
          <text x={(W + PL - PR) / 2} y={H - 4} textAnchor="middle" fontSize={10} fill="#475569">r [m]</text>
          <text x={12} y={PT - 6} fontSize={10} fill="#475569">V [V]</text>

          <path d={pathFor('V', data.Vmax)} fill="none" stroke={q >= 0 ? '#1d4ed8' : '#1e3a8a'} strokeWidth={2} />

          <line x1={markerX} y1={PT} x2={markerX} y2={H - PB} stroke="#0f172a" strokeDasharray="4 3" strokeWidth={1} />
          <circle cx={markerX} cy={yPxAbs(Vat, data.Vmax)} r={3.5} fill="#0f172a" />
        </svg>

        <svg
          ref={eRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full bg-white border touch-none cursor-ew-resize"
          onPointerDown={(e) => onPointerDown(eRef.current, e)}
          onPointerMove={onPointerMove}
        >
          <text x={W / 2} y={14} textAnchor="middle" fontSize={11} fontWeight="bold">|E(r)| = k|q|/r² &nbsp;[V/m vs m]</text>

          {Eticks.map((t, i) => (
            <g key={`et${i}`}>
              <line x1={PL - 3} y1={yPxAbs(t, data.Emax)} x2={W - PR} y2={yPxAbs(t, data.Emax)} stroke="#e2e8f0" strokeWidth={0.5} />
              <text x={PL - 6} y={yPxAbs(t, data.Emax) + 3} textAnchor="end" fontSize={9} fill="#475569">{fmt(t)}</text>
            </g>
          ))}

          <line x1={PL} y1={H - PB} x2={W - PR} y2={H - PB} stroke="#0f172a" />
          <line x1={PL} y1={PT} x2={PL} y2={H - PB} stroke="#0f172a" />

          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
            const r = rMin + t * (rMax - rMin);
            return (
              <g key={`erx${i}`}>
                <line x1={xPx(r)} y1={H - PB} x2={xPx(r)} y2={H - PB + 3} stroke="#0f172a" />
                <text x={xPx(r)} y={H - PB + 14} textAnchor="middle" fontSize={9} fill="#475569">{r.toFixed(2)}</text>
              </g>
            );
          })}
          <text x={(W + PL - PR) / 2} y={H - 4} textAnchor="middle" fontSize={10} fill="#475569">r [m]</text>
          <text x={12} y={PT - 6} fontSize={10} fill="#475569">|E| [V/m]</text>

          <path d={pathFor('E', data.Emax)} fill="none" stroke="#b91c1c" strokeWidth={2} />

          <line x1={markerX} y1={PT} x2={markerX} y2={H - PB} stroke="#0f172a" strokeDasharray="4 3" strokeWidth={1} />
          <circle cx={markerX} cy={yPxAbs(Eat, data.Emax)} r={3.5} fill="#0f172a" />
        </svg>
      </div>

      <p className="text-xs text-slate-600 mt-2">
        V falls off as 1/r; |E| as 1/r². Double r and V halves while |E| quarters. Drag in either plot or use the marker slider to confirm.
      </p>
    </div>
  );
}
