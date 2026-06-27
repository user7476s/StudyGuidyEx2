'use client';

import { useMemo, useState } from 'react';

type Mode = 'series' | 'parallel' | 'mixed';

const W = 520;
const H = 260;

function CapSymbol({
  x,
  y,
  label,
  Cval,
  Vval,
  Qval,
  orientation = 'horizontal',
}: {
  x: number;
  y: number;
  label: string;
  Cval: number;
  Vval: number;
  Qval: number;
  orientation?: 'horizontal' | 'vertical';
}) {
  const plateLen = 18;
  const gap = 6;
  if (orientation === 'horizontal') {
    return (
      <g>
        <line x1={x - 18} y1={y} x2={x - gap / 2} y2={y} stroke="#0f172a" strokeWidth={1.5} />
        <line x1={x + gap / 2} y1={y} x2={x + 18} y2={y} stroke="#0f172a" strokeWidth={1.5} />
        <line x1={x - gap / 2} y1={y - plateLen / 2} x2={x - gap / 2} y2={y + plateLen / 2} stroke="#0f172a" strokeWidth={2} />
        <line x1={x + gap / 2} y1={y - plateLen / 2} x2={x + gap / 2} y2={y + plateLen / 2} stroke="#0f172a" strokeWidth={2} />
        <text x={x} y={y - 16} textAnchor="middle" fontSize={11} fontWeight="bold">{label}</text>
        <text x={x} y={y + 26} textAnchor="middle" fontSize={9} fill="#475569">
          {Cval.toFixed(1)} µF
        </text>
        <text x={x} y={y + 38} textAnchor="middle" fontSize={9} fill="#475569">
          V={Vval.toFixed(2)} Q={Qval.toFixed(2)} µC
        </text>
      </g>
    );
  }
  return (
    <g>
      <line x1={x} y1={y - 18} x2={x} y2={y - gap / 2} stroke="#0f172a" strokeWidth={1.5} />
      <line x1={x} y1={y + gap / 2} x2={x} y2={y + 18} stroke="#0f172a" strokeWidth={1.5} />
      <line x1={x - plateLen / 2} y1={y - gap / 2} x2={x + plateLen / 2} y2={y - gap / 2} stroke="#0f172a" strokeWidth={2} />
      <line x1={x - plateLen / 2} y1={y + gap / 2} x2={x + plateLen / 2} y2={y + gap / 2} stroke="#0f172a" strokeWidth={2} />
      <text x={x + 16} y={y - 2} fontSize={11} fontWeight="bold">{label}</text>
      <text x={x + 16} y={y + 12} fontSize={9} fill="#475569">{Cval.toFixed(1)} µF</text>
      <text x={x + 16} y={y + 24} fontSize={9} fill="#475569">V={Vval.toFixed(2)}</text>
      <text x={x + 16} y={y + 36} fontSize={9} fill="#475569">Q={Qval.toFixed(2)} µC</text>
    </g>
  );
}

function Battery({ x, y, Vs }: { x: number; y: number; Vs: number }) {
  return (
    <g>
      <line x1={x - 12} y1={y - 14} x2={x + 12} y2={y - 14} stroke="#0f172a" strokeWidth={3} />
      <line x1={x - 6} y1={y - 4} x2={x + 6} y2={y - 4} stroke="#0f172a" strokeWidth={1.5} />
      <line x1={x - 12} y1={y + 4} x2={x + 12} y2={y + 4} stroke="#0f172a" strokeWidth={3} />
      <line x1={x - 6} y1={y + 14} x2={x + 6} y2={y + 14} stroke="#0f172a" strokeWidth={1.5} />
      <text x={x + 18} y={y - 8} fontSize={10}>+ {Vs.toFixed(1)} V</text>
      <text x={x + 18} y={y + 14} fontSize={10}>−</text>
    </g>
  );
}

export function CapNetworkSolver() {
  const [mode, setMode] = useState<Mode>('mixed');
  const [C1, setC1] = useState(2);
  const [C2, setC2] = useState(3);
  const [C3, setC3] = useState(6);
  const [Vs, setVs] = useState(12);

  const sol = useMemo(() => {
    if (mode === 'series') {
      const Ceq = 1 / (1 / C1 + 1 / C2 + 1 / C3);
      const Qt = Ceq * Vs;
      const V1 = Qt / C1, V2 = Qt / C2, V3 = Qt / C3;
      return { Ceq, Qt, U: 0.5 * Ceq * Vs * Vs, caps: [
        { V: V1, Q: Qt }, { V: V2, Q: Qt }, { V: V3, Q: Qt },
      ] };
    }
    if (mode === 'parallel') {
      const Ceq = C1 + C2 + C3;
      const Qt = Ceq * Vs;
      return { Ceq, Qt, U: 0.5 * Ceq * Vs * Vs, caps: [
        { V: Vs, Q: C1 * Vs }, { V: Vs, Q: C2 * Vs }, { V: Vs, Q: C3 * Vs },
      ] };
    }
    const CeqB = 1 / (1 / C2 + 1 / C3);
    const Ceq = C1 + CeqB;
    const Qt = Ceq * Vs;
    const Q1 = C1 * Vs;
    const QB = CeqB * Vs;
    const V2 = QB / C2, V3 = QB / C3;
    return { Ceq, Qt, U: 0.5 * Ceq * Vs * Vs, caps: [
      { V: Vs, Q: Q1 }, { V: V2, Q: QB }, { V: V3, Q: QB },
    ] };
  }, [mode, C1, C2, C3, Vs]);

  const expr =
    mode === 'series' ? '1/Cₑq = 1/C₁ + 1/C₂ + 1/C₃' :
    mode === 'parallel' ? 'Cₑq = C₁ + C₂ + C₃' :
    'Cₑq = C₁ + (C₂⁻¹ + C₃⁻¹)⁻¹';

  return (
    <div className="border rounded p-3 bg-white">
      <div className="flex flex-wrap items-center gap-3 mb-2 text-sm">
        <div className="inline-flex rounded border overflow-hidden">
          {(['series', 'parallel', 'mixed'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              className={`px-2 py-1 capitalize ${mode === m ? 'bg-slate-900 text-white' : 'bg-white'}`}
              onClick={() => setMode(m)}
            >{m}</button>
          ))}
        </div>
        <label className="flex items-center gap-1">C₁ = {C1.toFixed(1)} µF
          <input type="range" min={1} max={10} step={0.5} value={C1} onChange={(e) => setC1(+e.target.value)} className="w-28" />
        </label>
        <label className="flex items-center gap-1">C₂ = {C2.toFixed(1)} µF
          <input type="range" min={1} max={10} step={0.5} value={C2} onChange={(e) => setC2(+e.target.value)} className="w-28" />
        </label>
        <label className="flex items-center gap-1">C₃ = {C3.toFixed(1)} µF
          <input type="range" min={1} max={10} step={0.5} value={C3} onChange={(e) => setC3(+e.target.value)} className="w-28" />
        </label>
        <label className="flex items-center gap-1">Vs = {Vs.toFixed(1)} V
          <input type="range" min={1} max={50} step={1} value={Vs} onChange={(e) => setVs(+e.target.value)} className="w-28" />
        </label>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full border bg-slate-50">
        {mode === 'series' && (
          <g>
            <Battery x={40} y={H / 2} Vs={Vs} />
            <line x1={40} y1={H / 2 - 14} x2={40} y2={40} stroke="#0f172a" />
            <line x1={40} y1={40} x2={W - 40} y2={40} stroke="#0f172a" />
            <line x1={W - 40} y1={40} x2={W - 40} y2={H / 2 + 14} stroke="#0f172a" strokeOpacity={0} />
            <line x1={40} y1={H / 2 + 14} x2={W - 40} y2={H / 2 + 14} stroke="#0f172a" />
            <line x1={W - 40} y1={H / 2 + 14} x2={W - 40} y2={40} stroke="#0f172a" />
            {/* top wire holds caps */}
            <CapSymbol x={140} y={40} label="C₁" Cval={C1} Vval={sol.caps[0].V} Qval={sol.caps[0].Q} />
            <CapSymbol x={260} y={40} label="C₂" Cval={C2} Vval={sol.caps[1].V} Qval={sol.caps[1].Q} />
            <CapSymbol x={380} y={40} label="C₃" Cval={C3} Vval={sol.caps[2].V} Qval={sol.caps[2].Q} />
          </g>
        )}

        {mode === 'parallel' && (
          <g>
            <Battery x={40} y={H / 2} Vs={Vs} />
            <line x1={40} y1={H / 2 - 14} x2={40} y2={40} stroke="#0f172a" />
            <line x1={40} y1={H / 2 + 14} x2={40} y2={H - 40} stroke="#0f172a" />
            <line x1={40} y1={40} x2={W - 40} y2={40} stroke="#0f172a" />
            <line x1={40} y1={H - 40} x2={W - 40} y2={H - 40} stroke="#0f172a" />
            {[140, 260, 380].map((x, i) => (
              <line key={i} x1={x} y1={40} x2={x} y2={H - 40} stroke="#0f172a" strokeOpacity={0} />
            ))}
            <CapSymbol x={160} y={H / 2} label="C₁" Cval={C1} Vval={sol.caps[0].V} Qval={sol.caps[0].Q} orientation="vertical" />
            <line x1={160} y1={40} x2={160} y2={H / 2 - 18} stroke="#0f172a" />
            <line x1={160} y1={H / 2 + 18} x2={160} y2={H - 40} stroke="#0f172a" />
            <CapSymbol x={280} y={H / 2} label="C₂" Cval={C2} Vval={sol.caps[1].V} Qval={sol.caps[1].Q} orientation="vertical" />
            <line x1={280} y1={40} x2={280} y2={H / 2 - 18} stroke="#0f172a" />
            <line x1={280} y1={H / 2 + 18} x2={280} y2={H - 40} stroke="#0f172a" />
            <CapSymbol x={400} y={H / 2} label="C₃" Cval={C3} Vval={sol.caps[2].V} Qval={sol.caps[2].Q} orientation="vertical" />
            <line x1={400} y1={40} x2={400} y2={H / 2 - 18} stroke="#0f172a" />
            <line x1={400} y1={H / 2 + 18} x2={400} y2={H - 40} stroke="#0f172a" />
          </g>
        )}

        {mode === 'mixed' && (() => {
          const topY = 40;
          const botY = H - 40;
          const xA = 240;
          const xB = 380;
          const yC1 = (topY + botY) / 2;
          const yC2 = topY + 50;
          const yC3 = botY - 50;
          const yMid = (yC2 + yC3) / 2;
          return (
            <g>
              <Battery x={40} y={H / 2} Vs={Vs} />
              <line x1={40} y1={H / 2 - 14} x2={40} y2={topY} stroke="#0f172a" />
              <line x1={40} y1={H / 2 + 14} x2={40} y2={botY} stroke="#0f172a" />
              <line x1={40} y1={topY} x2={xB} y2={topY} stroke="#0f172a" />
              <line x1={40} y1={botY} x2={xB} y2={botY} stroke="#0f172a" />

              {/* Branch A: C1 alone, between the two rails at xA */}
              <line x1={xA} y1={topY} x2={xA} y2={yC1 - 18} stroke="#0f172a" />
              <line x1={xA} y1={yC1 + 18} x2={xA} y2={botY} stroke="#0f172a" />
              <CapSymbol x={xA} y={yC1} label="C₁" Cval={C1} Vval={sol.caps[0].V} Qval={sol.caps[0].Q} orientation="vertical" />

              {/* Branch B: C2 in series with C3, between the same two rails at xB */}
              <line x1={xB} y1={topY} x2={xB} y2={yC2 - 18} stroke="#0f172a" />
              <CapSymbol x={xB} y={yC2} label="C₂" Cval={C2} Vval={sol.caps[1].V} Qval={sol.caps[1].Q} orientation="vertical" />
              <line x1={xB} y1={yC2 + 18} x2={xB} y2={yC3 - 18} stroke="#0f172a" />
              <CapSymbol x={xB} y={yC3} label="C₃" Cval={C3} Vval={sol.caps[2].V} Qval={sol.caps[2].Q} orientation="vertical" />
              <line x1={xB} y1={yC3 + 18} x2={xB} y2={botY} stroke="#0f172a" />

              {/* Intermediate node label between C2 and C3 */}
              <text x={xB - 10} y={yMid + 3} fontSize={9} fill="#64748b" textAnchor="end">mid</text>

              {/* Junction dots where each branch meets the rails */}
              {[[xA, topY], [xA, botY], [xB, topY], [xB, botY]].map(([cx, cy], i) => (
                <circle key={`j${i}`} cx={cx} cy={cy} r={3.5} fill="#0f172a" />
              ))}
            </g>
          );
        })()}
      </svg>

      <div role="status" aria-live="polite" className="mt-2 font-mono text-xs bg-slate-50 border rounded p-2 grid md:grid-cols-3 gap-2">
        <div>{expr}</div>
        <div>Cₑq = <b>{sol.Ceq.toFixed(3)} µF</b></div>
        <div>Q_total = <b>{sol.Qt.toFixed(2)} µC</b>, U = <b>{sol.U.toFixed(2)} µJ</b></div>
      </div>

      <p className="text-xs text-slate-600 mt-2">
        {mode === 'series' && <>Try: slide any C<sub>i</sub> down — <em>Q</em> stays equal on every cap, but the voltages redistribute (the smallest C grabs the biggest V).</>}
        {mode === 'parallel' && <>Try: <em>V</em> is the same on every cap; the charges add. Change one C and watch only its Q move — the others don&apos;t budge.</>}
        {mode === 'mixed' && <>Try: C₂ and C₃ share Q (series branch), then that branch shares V with C₁ (parallel). Slide C₂ and watch C₃&apos;s voltage move while C₁&apos;s holds.</>}
      </p>
    </div>
  );
}
