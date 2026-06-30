'use client';

import { useMemo, useState } from 'react';

function fmt(x: number) {
  if (!isFinite(x) || x === 0) return '0';
  const abs = Math.abs(x);
  if (abs >= 1e4 || abs < 1e-2) {
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
const H = 260;
const PAD_L = 50;
const PAD_R = 16;
const PAD_T = 14;
const PAD_B = 36;

// V on x-axis, I on y-axis. Plot V from 0..Vmax, I in mA.
const Vmax = 2.0; // volts
const Imax_mA = 50;

// Diode Shockley: I = I_s (e^{V/V_T} - 1). V_T ≈ 0.0259 V at room T; I_s small.
const I_S = 1.0e-9; // 1 nA reverse-saturation
const V_T = 0.0259; // thermal voltage

function diodeI_mA(V: number) {
  return 1000 * I_S * (Math.exp(V / V_T) - 1);
}

export function OhmVI() {
  // R in ohms for the ohmic device (slider). Slope = 1/R on V–I plot.
  const [R, setR] = useState(50);
  // Operating point: voltage in volts
  const [Vop, setVop] = useState(0.7);

  const xOf = (V: number) => PAD_L + (V / Vmax) * (W - PAD_L - PAD_R);
  const yOf = (I_mA: number) => H - PAD_B - (I_mA / Imax_mA) * (H - PAD_T - PAD_B);

  const ohmicPath = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 100; i++) {
      const V = (i / 100) * Vmax;
      const I_mA = Math.min(Imax_mA * 1.2, (V / R) * 1000);
      pts.push(`${xOf(V).toFixed(1)},${yOf(I_mA).toFixed(1)}`);
    }
    return 'M' + pts.join(' L');
  }, [R]);

  const diodePath = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 200; i++) {
      const V = (i / 200) * Vmax;
      const I_mA = Math.min(Imax_mA * 1.2, diodeI_mA(V));
      pts.push(`${xOf(V).toFixed(1)},${yOf(I_mA).toFixed(1)}`);
    }
    return 'M' + pts.join(' L');
  }, []);

  const Iohm_mA = (Vop / R) * 1000;
  const Idiode_mA = diodeI_mA(Vop);
  const R_ohmic = R; // by construction
  const R_diode = Idiode_mA > 0 ? Vop / (Idiode_mA / 1000) : Infinity;

  // V ticks
  const vTicks = [0, 0.5, 1.0, 1.5, 2.0];
  const iTicks = [0, 10, 20, 30, 40, 50];

  return (
    <div className="border rounded p-3 bg-white">
      <div className="grid md:grid-cols-2 gap-3 text-sm">
        <div className="space-y-2">
          <label className="block">R (ohmic resistor) = {R} Ω
            <input type="range" min={10} max={500} step={1} value={R} onChange={(e) => setR(+e.target.value)} className="w-full" />
          </label>
          <label className="block">V (operating voltage) = {Vop.toFixed(3)} V
            <input type="range" min={0} max={Vmax} step={0.005} value={Vop} onChange={(e) => setVop(+e.target.value)} className="w-full" />
          </label>
        </div>
        <div role="status" aria-live="polite" className="bg-slate-50 border rounded p-2 font-mono text-xs space-y-0.5">
          <div className="text-sky-700">Ohmic at V = {Vop.toFixed(3)} V:</div>
          <div>&nbsp;&nbsp;I = V/R = {fmt(Iohm_mA)} mA</div>
          <div>&nbsp;&nbsp;V/I = {fmt(R_ohmic)} Ω (constant — that&apos;s the slope)</div>
          <div className="text-rose-700 mt-1">Diode (silicon) at V = {Vop.toFixed(3)} V:</div>
          <div>&nbsp;&nbsp;I = I_s(e^&#123;V/V_T&#125;−1) = {fmt(Idiode_mA)} mA</div>
          <div>&nbsp;&nbsp;V/I = {isFinite(R_diode) ? fmt(R_diode) : '∞'} Ω (changes wildly with V!)</div>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full mt-2 border bg-slate-50">
        {/* axes */}
        <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="#0f172a" />
        <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke="#0f172a" />
        {vTicks.map((v) => (
          <g key={`vt${v}`}>
            <line x1={xOf(v)} y1={H - PAD_B} x2={xOf(v)} y2={H - PAD_B + 4} stroke="#0f172a" />
            <text x={xOf(v)} y={H - PAD_B + 16} fontSize={10} fill="#0f172a" textAnchor="middle">{v.toFixed(1)}</text>
          </g>
        ))}
        {iTicks.map((i) => (
          <g key={`it${i}`}>
            <line x1={PAD_L - 4} y1={yOf(i)} x2={PAD_L} y2={yOf(i)} stroke="#0f172a" />
            <text x={PAD_L - 6} y={yOf(i) + 3} fontSize={10} fill="#0f172a" textAnchor="end">{i}</text>
          </g>
        ))}
        <text x={(PAD_L + W - PAD_R) / 2} y={H - 4} fontSize={11} fill="#0f172a" textAnchor="middle">V (volts)</text>
        <text x={12} y={(PAD_T + H - PAD_B) / 2} fontSize={11} fill="#0f172a" textAnchor="middle" transform={`rotate(-90 12,${(PAD_T + H - PAD_B) / 2})`}>I (mA)</text>

        {/* curves clipped to plot area */}
        <clipPath id="ovip-clip">
          <rect x={PAD_L} y={PAD_T} width={W - PAD_L - PAD_R} height={H - PAD_T - PAD_B} />
        </clipPath>
        <g clipPath="url(#ovip-clip)">
          <path d={ohmicPath} fill="none" stroke="#0284c7" strokeWidth={1.8} />
          <path d={diodePath} fill="none" stroke="#e11d48" strokeWidth={1.8} />
        </g>

        {/* operating-point markers */}
        <line x1={xOf(Vop)} y1={PAD_T} x2={xOf(Vop)} y2={H - PAD_B} stroke="#64748b" strokeDasharray="3 3" />
        {isFinite(Iohm_mA) && Iohm_mA <= Imax_mA * 1.05 && (
          <circle cx={xOf(Vop)} cy={yOf(Math.min(Iohm_mA, Imax_mA))} r={4} fill="#0284c7" />
        )}
        {isFinite(Idiode_mA) && Idiode_mA <= Imax_mA * 1.05 && (
          <circle cx={xOf(Vop)} cy={yOf(Math.min(Idiode_mA, Imax_mA))} r={4} fill="#e11d48" />
        )}

        {/* legend */}
        <g transform={`translate(${W - PAD_R - 110}, ${PAD_T + 6})`}>
          <rect width={108} height={36} fill="white" stroke="#cbd5e1" rx={3} />
          <line x1={6} y1={12} x2={26} y2={12} stroke="#0284c7" strokeWidth={1.8} />
          <text x={32} y={15} fontSize={10}>Ohmic (V=IR)</text>
          <line x1={6} y1={28} x2={26} y2={28} stroke="#e11d48" strokeWidth={1.8} />
          <text x={32} y={31} fontSize={10}>Silicon diode</text>
        </g>
      </svg>

      <p className="text-xs text-slate-600 mt-2">
        Drag the <em>V</em> slider. For the ohmic resistor the ratio <em>V/I</em> stays at exactly <em>R</em> no
        matter where you sit — that constant slope is what &ldquo;ohmic&rdquo; means. For the diode <em>V/I</em>
        is a different number at every operating point: tens of MΩ below ~0.5 V, then collapsing to a few Ω above
        ~0.7 V as the current shoots up exponentially. That is why <em>V=IR</em> with a single <em>R</em> is meaningless for a diode.
      </p>
    </div>
  );
}
