'use client';

import { FormulaSheet } from '@/components/FormulaSheet';
import { Pitfall, Tip } from '@/components/Callout';
import { MathStatic } from '@/components/Math';

type FormulaRow = { name: string; tex: string };

const rows: FormulaRow[] = [
  { name: "Coulomb's law (force magnitude)", tex: 'F=\\dfrac{k|q_1 q_2|}{r^2}=k\\dfrac{|q_1 q_2|}{r^2}' },
  { name: 'k constant', tex: 'k=\\dfrac{1}{4\\pi\\varepsilon_0}=8.99\\times10^{9}\\,\\text{N}\\,\\text{m}^2/\\text{C}^2' },
  { name: 'Electric field (definition)', tex: '\\vec E=\\vec F/q_{\\text{test}}' },
  { name: 'Field of a point charge', tex: '\\vec E=\\dfrac{kq}{r^2}\\hat r' },
  { name: 'Continuous distribution', tex: '\\vec E=\\int \\dfrac{k\\,dq}{r^2}\\hat r' },
  { name: 'Dipole moment', tex: '\\vec p=q\\vec d' },
  { name: 'Dipole field (far axis)', tex: 'E\\approx \\dfrac{2kp}{r^3}' },
  { name: 'Electric flux', tex: '\\Phi_E=\\int \\vec E\\cdot d\\vec A' },
  { name: "Gauss's law", tex: '\\oint \\vec E\\cdot d\\vec A=\\dfrac{Q_{\\text{enc}}}{\\varepsilon_0}' },
  { name: 'Field of a point/sphere (outside)', tex: 'E=\\dfrac{kQ}{r^2}' },
  { name: 'Field of an infinite line', tex: 'E=\\dfrac{2k\\lambda}{r}=\\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}' },
  { name: 'Field of an infinite plane', tex: 'E=\\dfrac{\\sigma}{2\\varepsilon_0}' },
  { name: 'Two opposite planes (parallel plates)', tex: 'E=\\dfrac{\\sigma}{\\varepsilon_0}\\;\\text{between, 0 outside}' },
];

export default function Review() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Review — §5.1–6.4 (prerequisite material)</h1>
        <p className="text-slate-600 mt-1">
          Compact refresher of what feeds the Ch. 7–8 material. Density over depth.
        </p>
      </header>

      <MathStatic>
        <section>
          <h2 className="text-xl font-semibold">Coulomb&apos;s law and the electric field</h2>
          <p>
            Two point charges interact by an inverse-square force \(\vec F=\frac&#123;kq_1 q_2&#125;&#123;r^2&#125;\hat r_&#123;12&#125;\),
            repulsive for like signs, attractive for unlike. Per-test-charge, the field is
            \(\vec E=\vec F/q_&#123;\text&#123;test&#125;&#125;\). For continuous distributions, decompose into \(dq\)
            and integrate.
          </p>
          <Tip title="Symmetry first">
            Before integrating, identify symmetry. If the configuration is symmetric about an axis,
            transverse field components cancel — only the axial component survives.
          </Tip>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Field lines and dipoles</h2>
          <p>
            Field lines start on +q and end on −q (or at infinity). Their tangent gives \(\vec E\);
            density gives the magnitude. The dipole moment \(\vec p=q\vec d\) points from −q to +q
            (note: this convention matters for \(U=-\vec p\cdot\vec E\) in §7).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Flux and Gauss&apos;s law</h2>
          <p>
            Flux through a surface is \(\Phi_E=\int \vec E\cdot d\vec A\). Gauss&apos;s law says the
            flux through any closed surface equals the enclosed charge over \(\varepsilon_0\). Use it
            whenever there&apos;s spherical, cylindrical, or planar symmetry.
          </p>
          <Pitfall>
            Gauss&apos;s law is always true, but solving for E from it requires symmetry. A random
            blob of charge gives you only the total enclosed flux, not E at any individual point.
          </Pitfall>

          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Sphere (radius R, total Q, outside): \(E=kQ/r^2\). Inside a uniform shell: \(E=0\).</li>
            <li>Infinite line, charge density \(\lambda\): \(E=\lambda/(2\pi\varepsilon_0 r)\).</li>
            <li>Infinite plane, surface density \(\sigma\): \(E=\sigma/(2\varepsilon_0)\).</li>
            <li>Two oppositely charged planes (capacitor): \(E=\sigma/\varepsilon_0\) between, ≈0 outside.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Conductors in equilibrium (§6.4)</h2>
          <p>
            Inside a conductor: \(\vec E=0\) (otherwise charges would still be moving). All net
            charge sits on the surface. Just outside: \(\vec E=\sigma/\varepsilon_0\), normal to
            the surface. The whole conductor is one equipotential — the bridge into §7.5.
          </p>
        </section>

        <FormulaSheet title="Formula sheet — Ch. 5 + 6" rows={rows} />

        <section className="border border-blue-300 bg-blue-50 rounded p-4 text-sm">
          <div className="font-semibold mb-2">What carries forward into Ch. 7–8</div>
          <ul className="list-disc pl-5 space-y-1">
            <li><b>Field of a point charge → potential of a point charge.</b> Integrate \(-\int kq/r^2\,dr\) to get \(V=kq/r\).</li>
            <li><b>Superposition of field → superposition of V.</b> Same idea, but V is a scalar, so no vector components to track.</li>
            <li><b>Gauss&apos;s law on a charged plane → parallel-plate capacitance.</b> Inside the gap, \(E=\sigma/\varepsilon_0\), \(V=Ed\), and \(C=Q/V=\varepsilon_0 A/d\).</li>
            <li><b>Conductor surface is an equipotential.</b> So &ldquo;move along a conductor&rdquo; means &ldquo;V doesn&apos;t change.&rdquo;</li>
            <li><b>Inside a conductor, \(\vec E=0\).</b> Hence V is uniform inside — Faraday-cage logic underlies many §7.5 problems.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold">Quick numeric refreshers</h3>

          <details className="border rounded my-2 bg-white">
            <summary className="cursor-pointer px-3 py-2 font-medium">R1. Coulomb force between two 1.0 µC charges 5.0 cm apart.</summary>
            <div className="px-3 pb-3">
              <p>\(F=kq_1 q_2/r^2 = (8.99\times10^&#123;9&#125;)(1.0\times10^&#123;-6&#125;)^2/(0.05)^2 \approx 3.6\,\text&#123;N&#125;\).</p>
            </div>
          </details>

          <details className="border rounded my-2 bg-white">
            <summary className="cursor-pointer px-3 py-2 font-medium">R2. Field 10 cm from a 5.0 nC point charge.</summary>
            <div className="px-3 pb-3">
              <p>\(E=kQ/r^2=(8.99\times10^&#123;9&#125;)(5.0\times10^&#123;-9&#125;)/(0.10)^2 = 4.50\times10^&#123;3&#125;\,\text&#123;V/m&#125;\).</p>
            </div>
          </details>
        </section>
      </MathStatic>
    </div>
  );
}
