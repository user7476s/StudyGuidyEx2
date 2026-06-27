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

const N = 180;
const W = 480;
const H = 360;
const DX = 2.0;
const DY = 1.5;

export function Dipole() {
  const [sep, setSep] = useState(0.6);
  const [sepD, setSepD] = useState(0.6);
  const [mag, setMag] = useState(2);
  const [magD, setMagD] = useState(2);

  useEffect(() => {
    const t = setTimeout(() => setSepD(sep), 80);
    return () => clearTimeout(t);
  }, [sep]);

  useEffect(() => {
    const t = setTimeout(() => setMagD(mag), 80);
    return () => clearTimeout(t);
  }, [mag]);

  const data = useMemo(() => {
    const charges: Charge[] = [
      { x: -sepD / 2, y: 0, q: +magD },
      { x: +sepD / 2, y: 0, q: -magD },
    ];
    const bounds = { xMin: -DX, xMax: DX, yMin: -DY, yMax: DY };
    const grid = potentialGrid(charges, bounds, N);

    const Vunit = magD / sepD;
    const stops = [-6, -3, -1.5, -0.7, -0.3, 0.3, 0.7, 1.5, 3, 6];
    const levels = stops.map((s) => s * Vunit).sort((a, b) => a - b);
    const contoursOut = equipotentialPaths(grid, N, levels, W, H);

    const toPxX = (x: number) => ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * W;
    const toPxY = (y: number) => H - ((y - bounds.yMin) / (bounds.yMax - bounds.yMin)) * H;

    const seedCount = Math.max(10, 8 * magD);
    const seeds = seedRingAroundCharge(charges[0], 0.08, seedCount);
    const lines = seeds.map((s) =>
      traceFieldLine(charges, s[0], s[1], {
        step: 0.025,
        maxSteps: 500,
        bounds,
        stopRadius: 0.06,
        direction: 1,
      }),
    );
    const pxLines = lines.map((pts) => toPixels(pts, toPxX, toPxY, 4));
    const linePolylines = pxLines.map((px) => polylinePoints(px));
    const arrows = pxLines.map((px) => arrowOnPath(px, 0.55));

    return { charges, toPxX, toPxY, contoursOut, linePolylines, arrows };
  }, [sepD, magD]);

  return (
    <div className="border rounded p-3 bg-white">
      <div className="flex flex-wrap items-center gap-3 mb-2 text-sm">
        <label className="flex items-center gap-2">
          separation = {sep.toFixed(2)}
          <input
            type="range"
            min={0.2}
            max={1.4}
            step={0.05}
            value={sep}
            onChange={(e) => setSep(+e.target.value)}
            className="w-40"
          />
        </label>
        <label className="flex items-center gap-2">
          |q| = {mag}
          <input
            type="range"
            min={1}
            max={5}
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
              opacity={0.8}
            />
          );
        })}

        <line
          x1={data.toPxX(0)}
          y1={data.toPxY(-DY)}
          x2={data.toPxX(0)}
          y2={data.toPxY(DY)}
          stroke="#64748b"
          strokeDasharray="6 4"
          strokeWidth={1}
          opacity={0.6}
        />

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

        {data.charges.map((c, i) => (
          <g key={i}>
            <circle cx={data.toPxX(c.x)} cy={data.toPxY(c.y)} r={10} fill={c.q > 0 ? '#dc2626' : '#1e3a8a'} />
            <text
              x={data.toPxX(c.x)}
              y={data.toPxY(c.y) + 4}
              textAnchor="middle"
              fontSize={14}
              fontWeight="bold"
              fill="white"
            >
              {c.q > 0 ? '+' : '−'}
            </text>
          </g>
        ))}

        <g transform={`translate(${W - 130}, 12)`}>
          <rect width={122} height={56} fill="white" stroke="#cbd5e1" rx={3} />
          <line x1={6} y1={14} x2={26} y2={14} stroke="#0f172a" strokeWidth={1.4} />
          <text x={32} y={17} fontSize={10}>field line</text>
          <line x1={6} y1={30} x2={26} y2={30} stroke="#b91c1c" strokeWidth={1} strokeDasharray="4 3" />
          <text x={32} y={33} fontSize={10}>+V equipotential</text>
          <line x1={6} y1={46} x2={26} y2={46} stroke="#1d4ed8" strokeWidth={1} strokeDasharray="4 3" />
          <text x={32} y={49} fontSize={10}>−V equipotential</text>
        </g>
      </svg>

      <p className="text-xs text-slate-600 mt-2">
        Solid field lines leave the + charge and land on the −. They cross every dashed equipotential at 90° — that&apos;s
        <span> </span>
        <span className="font-mono">E = −∇V</span> in pictures.
      </p>
    </div>
  );
}
