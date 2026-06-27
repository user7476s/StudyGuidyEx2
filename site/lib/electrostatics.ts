import { contours } from 'd3-contour';

export type Charge = { x: number; y: number; q: number };
export type Bounds = { xMin: number; xMax: number; yMin: number; yMax: number };

export function potentialGrid(charges: Charge[], b: Bounds, N: number): Float32Array {
  const V = new Float32Array(N * N);
  const dx = (b.xMax - b.xMin) / (N - 1);
  const dy = (b.yMax - b.yMin) / (N - 1);
  const rMin = 0.5 * Math.min(dx, dy);
  for (let j = 0; j < N; j++) {
    const y = b.yMin + j * dy;
    for (let i = 0; i < N; i++) {
      const x = b.xMin + i * dx;
      let v = 0;
      for (const c of charges) {
        const rx = x - c.x;
        const ry = y - c.y;
        let r = Math.sqrt(rx * rx + ry * ry);
        if (r < rMin) r = rMin;
        v += c.q / r;
      }
      V[j * N + i] = v;
    }
  }
  return V;
}

export function equipotentialPaths(
  grid: Float32Array,
  N: number,
  levels: number[],
  pxW: number,
  pxH: number,
) {
  const gen = contours().size([N, N]).thresholds(levels);
  const arr = gen(Array.from(grid) as any) as any[];
  const sx = pxW / (N - 1);
  const sy = pxH / (N - 1);
  const out: { level: number; d: string }[] = [];
  for (const c of arr) {
    const polys: number[][][][] = c.coordinates;
    let d = '';
    for (const poly of polys) {
      for (const ring of poly) {
        if (ring.length === 0) continue;
        d += `M${(ring[0][0] * sx).toFixed(2)},${(ring[0][1] * sy).toFixed(2)}`;
        for (let i = 1; i < ring.length; i++) {
          d += `L${(ring[i][0] * sx).toFixed(2)},${(ring[i][1] * sy).toFixed(2)}`;
        }
        d += 'Z';
      }
    }
    if (d) out.push({ level: c.value as number, d });
  }
  return out;
}

export function fieldAt(charges: Charge[], x: number, y: number, clampMag = 1e3) {
  let Ex = 0;
  let Ey = 0;
  for (const c of charges) {
    const rx = x - c.x;
    const ry = y - c.y;
    const r2 = rx * rx + ry * ry;
    if (r2 < 1e-10) continue;
    const r = Math.sqrt(r2);
    const inv3 = 1 / (r2 * r);
    Ex += c.q * rx * inv3;
    Ey += c.q * ry * inv3;
  }
  let mag = Math.sqrt(Ex * Ex + Ey * Ey);
  if (mag > clampMag) {
    const s = clampMag / mag;
    Ex *= s;
    Ey *= s;
    mag = clampMag;
  }
  return { Ex, Ey, mag };
}

export type TraceOptions = {
  step: number;
  maxSteps: number;
  bounds: Bounds;
  stopRadius: number;
  direction: 1 | -1;
};

export function traceFieldLine(
  charges: Charge[],
  x0: number,
  y0: number,
  opts: TraceOptions,
): [number, number][] {
  const pts: [number, number][] = [[x0, y0]];
  let x = x0;
  let y = y0;
  const { step, maxSteps, bounds, stopRadius, direction } = opts;

  const dirAt = (px: number, py: number): [number, number] => {
    const f = fieldAt(charges, px, py);
    if (f.mag < 1e-12) return [0, 0];
    return [(direction * f.Ex) / f.mag, (direction * f.Ey) / f.mag];
  };

  for (let s = 0; s < maxSteps; s++) {
    const [k1x, k1y] = dirAt(x, y);
    const [k2x, k2y] = dirAt(x + 0.5 * step * k1x, y + 0.5 * step * k1y);
    const [k3x, k3y] = dirAt(x + 0.5 * step * k2x, y + 0.5 * step * k2y);
    const [k4x, k4y] = dirAt(x + step * k3x, y + step * k3y);
    const nx = x + (step / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
    const ny = y + (step / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
    if (!isFinite(nx) || !isFinite(ny)) break;
    if (nx < bounds.xMin || nx > bounds.xMax || ny < bounds.yMin || ny > bounds.yMax) {
      pts.push([nx, ny]);
      break;
    }
    let stopped = false;
    for (const c of charges) {
      const d = Math.hypot(nx - c.x, ny - c.y);
      if (d < stopRadius) {
        pts.push([c.x, c.y]);
        stopped = true;
        break;
      }
    }
    if (stopped) break;
    x = nx;
    y = ny;
    pts.push([x, y]);
  }
  return pts;
}

export function pathFromPoints(
  pts: [number, number][],
  toPxX: (x: number) => number,
  toPxY: (y: number) => number,
): string {
  if (pts.length === 0) return '';
  let d = `M${toPxX(pts[0][0]).toFixed(2)},${toPxY(pts[0][1]).toFixed(2)}`;
  for (let i = 1; i < pts.length; i++) {
    d += `L${toPxX(pts[i][0]).toFixed(2)},${toPxY(pts[i][1]).toFixed(2)}`;
  }
  return d;
}

export function toPixels(
  pts: [number, number][],
  toPxX: (x: number) => number,
  toPxY: (y: number) => number,
  decimate = 3,
): [number, number][] {
  if (pts.length === 0) return [];
  const out: [number, number][] = [];
  for (let i = 0; i < pts.length; i += decimate) {
    out.push([toPxX(pts[i][0]), toPxY(pts[i][1])]);
  }
  const last = pts[pts.length - 1];
  const lp: [number, number] = [toPxX(last[0]), toPxY(last[1])];
  const tail = out[out.length - 1];
  if (!tail || tail[0] !== lp[0] || tail[1] !== lp[1]) out.push(lp);
  return out;
}

export function polylinePoints(pxPts: [number, number][]): string {
  return pxPts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
}

export function arrowOnPath(
  pxPts: [number, number][],
  frac = 0.6,
): { x: number; y: number; angle: number } | null {
  if (pxPts.length < 2) return null;
  const lens: number[] = [0];
  let total = 0;
  for (let i = 1; i < pxPts.length; i++) {
    const dx = pxPts[i][0] - pxPts[i - 1][0];
    const dy = pxPts[i][1] - pxPts[i - 1][1];
    total += Math.hypot(dx, dy);
    lens.push(total);
  }
  if (total === 0) return null;
  const target = frac * total;
  let idx = 1;
  while (idx < lens.length - 1 && lens[idx] < target) idx++;
  const a = pxPts[idx - 1];
  const b = pxPts[idx];
  const seg = lens[idx] - lens[idx - 1];
  const t = seg > 0 ? (target - lens[idx - 1]) / seg : 0;
  const x = a[0] + t * (b[0] - a[0]);
  const y = a[1] + t * (b[1] - a[1]);
  const angle = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
  return { x, y, angle };
}

export function seedRingAroundCharge(c: Charge, radius: number, count: number): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const a = (2 * Math.PI * i) / count;
    out.push([c.x + radius * Math.cos(a), c.y + radius * Math.sin(a)]);
  }
  return out;
}
