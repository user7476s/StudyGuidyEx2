'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Charge,
  potentialGrid,
  equipotentialPaths,
  traceFieldLine,
  seedRingAroundCharge,
  toPixels,
  polylinePoints,
  arrowOnPath,
} from '@/lib/electrostatics';

const N = 160;
const W = 380;
const H = 380;
const DOMAIN = 1.5;

export function PointCharge() {
  const [sign, setSign] = useState<1 | -1>(1);
  const [mag, setMag] = useState(2);
  const [magD, setMagD] = useState(2);

  useEffect(() => {
    const t = setTimeout(() => setMagD(mag), 80);
    return () => clearTimeout(t);
  }, [mag]);

  const data = useMemo(() => {
    const charges: Charge[] = [{ x: 0, y: 0, q: sign * magD }];
    const bounds = { xMin: -DOMAIN, xMax: DOMAIN, yMin: -DOMAIN, yMax: DOMAIN };
    const grid = potentialGrid(charges, bounds, N);

    const Vunit = magD;
    const stops = [-8, -4, -2, -1, -0.5, 0.5, 1, 2, 4, 8];
    const levels = stops.map((s) => s * Vunit).sort((a, b) => a - b);

    const contoursOut = equipotentialPaths(grid, N, levels, W, H);

    const toPxX = (x: number) => ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * W;
    const toPxY = (y: number) => H - ((y - bounds.yMin) / (bounds.yMax - bounds.yMin)) * H;

    const seedCount = Math.max(8, 6 * magD);
    const seeds = seedRingAroundCharge(charges[0], 0.06, seedCount);
    const posCharges: Charge[] = [{ x: 0, y: 0, q: Math.abs(magD) }];
    const lines = seeds.map((s) =>
      traceFieldLine(posCharges, s[0], s[1], {
        step: 0.02,
        maxSteps: 400,
        bounds,
        stopRadius: 0.04,
        direction: 1,
      }),
    );
    const orientedLines = sign > 0 ? lines : lines.map((pts) => [...pts].reverse());
    const pxLines = orientedLines.map((pts) => toPixels(pts, toPxX, toPxY, 4));
    const linePolylines = pxLines.map((px) => polylinePoints(px));
    const arrows = pxLines.map((px) => arrowOnPath(px, 0.6));

    // Equipotential ring labels. V = k*q/r so sign(V) = sign(q). Pick three radii
    // and label them with the corresponding (signed) potential.
    const magnitudes = [1, 2, 4];
    const labelPoints = magnitudes.map((m) => {
      const lv = sign * m * Vunit;
      const r = magD / m;
      const px = toPxX(r);
      const py = toPxY(0);
      return { lv, px, py };
    });

    return { charges, toPxX, toPxY, contoursOut, linePolylines, arrows, labelPoints };
  }, [sign, magD]);

  const cx = data.toPxX(0);
  const cy = data.toPxY(0);

  return (
    <div className="border rounded p-3 bg-white">
      <div className="flex flex-wrap items-center gap-3 mb-2 text-sm">
        <div className="inline-flex rounded border overflow-hidden">
          <button
            type="button"
            className={`px-2 py-1 ${sign > 0 ? 'bg-rose-600 text-white' : 'bg-white'}`}
            onClick={() => setSign(1)}
          >+ charge</button>
          <button
            type="button"
            className={`px-2 py-1 ${sign < 0 ? 'bg-blue-700 text-white' : 'bg-white'}`}
            onClick={() => setSign(-1)}
          >− charge</button>
        </div>
        <label className="flex items-center gap-2">
          |q| = {mag}
          <input
            type="range"
            min={1}
            max={6}
            step={1}
            value={mag}
            onChange={(e) => setMag(+e.target.value)}
            className="w-40"
          />
        </label>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full border bg-slate-50">
        {data.contoursOut.map((c, i) => {
          const stroke = c.level > 0 ? '#b91c1c' : c.level < 0 ? '#1d4ed8' : '#64748b';
          return (
            <path
              key={i}
              d={c.d}
              fill="none"
              stroke={stroke}
              strokeWidth={1}
              strokeDasharray="4 3"
              opacity={0.85}
            />
          );
        })}

        {data.labelPoints.map((p, i) => (
          <g key={`l${i}`}>
            <rect
              x={p.px - 18}
              y={p.py - 8}
              width={36}
              height={14}
              fill="white"
              opacity={0.85}
              rx={2}
            />
            <text
              x={p.px}
              y={p.py + 3}
              textAnchor="middle"
              fontSize={10}
              fill="#0f172a"
            >
              {p.lv.toFixed(1)} V
            </text>
          </g>
        ))}

        {data.linePolylines.map((pts, i) => (
          <polyline
            key={i}
            points={pts}
            fill="none"
            stroke="#0f172a"
            strokeWidth={1.4}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

        {data.arrows.map((a, i) =>
          a ? (
            <polygon
              key={`a${i}`}
              points="0,-4 8,0 0,4"
              fill="#0f172a"
              transform={`translate(${a.x},${a.y}) rotate(${a.angle})`}
            />
          ) : null,
        )}

        <circle cx={cx} cy={cy} r={10} fill={sign > 0 ? '#dc2626' : '#1e3a8a'} />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontSize={14}
          fontWeight="bold"
          fill="white"
        >
          {sign > 0 ? '+' : '−'}
        </text>

        <g transform={`translate(${W - 130}, 12)`}>
          <rect width={122} height={42} fill="white" stroke="#cbd5e1" rx={3} />
          <line x1={6} y1={14} x2={26} y2={14} stroke="#0f172a" strokeWidth={1.4} />
          <text x={32} y={17} fontSize={10}>field line</text>
          <line x1={6} y1={30} x2={26} y2={30} stroke={sign > 0 ? '#b91c1c' : '#1d4ed8'} strokeWidth={1} strokeDasharray="4 3" />
          <text x={32} y={33} fontSize={10}>equipotential</text>
        </g>
      </svg>

      <p className="text-xs text-slate-600 mt-2">
        Equipotential rings crowd toward the charge — equal voltage steps mean shorter radial steps where the field is strong.
        Field lines meet every dashed ring at 90°.
      </p>
    </div>
  );
}
