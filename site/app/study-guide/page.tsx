import Link from 'next/link';
import { FormulaSheet } from '@/components/FormulaSheet';
import { MathStatic } from '@/components/Math';

type FormulaRow = { name: string; tex: string };

const ch7Rows: FormulaRow[] = [
  { name: 'Potential energy of two point charges', tex: 'U(r)=\\dfrac{kqQ}{r}' },
  { name: 'Definition of electric potential', tex: 'V=\\dfrac{U}{q}' },
  { name: 'Potential difference from field', tex: 'V_B-V_A=-\\int_A^B \\vec E\\cdot d\\vec\\ell' },
  { name: 'Potential of a point charge', tex: 'V(r)=\\dfrac{kq}{r}' },
  { name: 'Superposition (discrete)', tex: 'V_P=\\sum_i \\dfrac{kq_i}{r_i}' },
  { name: 'Continuous distribution', tex: 'V_P=\\int \\dfrac{k\\,dq}{r}' },
  { name: 'Field from potential (gradient)', tex: '\\vec E=-\\vec\\nabla V' },
  { name: 'Cartesian components', tex: 'E_x=-\\dfrac{\\partial V}{\\partial x}\\;\\; E_y=-\\dfrac{\\partial V}{\\partial y}\\;\\; E_z=-\\dfrac{\\partial V}{\\partial z}' },
  { name: 'Electron-volt', tex: '1\\,\\text{eV}=1.602\\times 10^{-19}\\,\\text{J}' },
  { name: 'Dipole potential (far field)', tex: 'V=\\dfrac{k\\,\\vec p\\cdot\\hat r}{r^2}' },
];

const ch8Rows: FormulaRow[] = [
  { name: 'Capacitance', tex: 'C=\\dfrac{Q}{V}' },
  { name: 'Parallel-plate', tex: 'C=\\dfrac{\\varepsilon_0 A}{d}' },
  { name: 'Isolated sphere', tex: 'C=4\\pi\\varepsilon_0 R' },
  { name: 'Cylindrical (length \\(\\ell\\))', tex: 'C=\\dfrac{2\\pi\\varepsilon_0 \\ell}{\\ln(b/a)}' },
  { name: 'Spherical (inner a, outer b)', tex: 'C=4\\pi\\varepsilon_0\\,\\dfrac{ab}{b-a}' },
  { name: 'Series', tex: '\\dfrac{1}{C_{eq}}=\\sum_i \\dfrac{1}{C_i}' },
  { name: 'Parallel', tex: 'C_{eq}=\\sum_i C_i' },
  { name: 'Energy stored', tex: 'U=\\tfrac12 QV=\\tfrac12 CV^2=\\dfrac{Q^2}{2C}' },
  { name: 'Energy density (vacuum)', tex: 'u_E=\\tfrac12 \\varepsilon_0 E^2' },
  { name: 'Dielectric constant', tex: '\\kappa=\\dfrac{C}{C_0}' },
  { name: 'With dielectric', tex: 'C=\\kappa \\varepsilon_0 \\dfrac{A}{d},\\;\\; u_E=\\tfrac12 \\kappa\\varepsilon_0 E^2' },
];

const ch9Rows: FormulaRow[] = [
  { name: 'Current (definition)', tex: 'I=\\dfrac{dQ}{dt}' },
  { name: 'Microscopic current', tex: 'I=n\\,q\\,A\\,v_d' },
  { name: 'Current density', tex: 'J=\\dfrac{I}{A}=n\\,q\\,v_d' },
  { name: 'Microscopic Ohm', tex: '\\vec J=\\sigma\\vec E' },
  { name: 'Conductivity / resistivity', tex: '\\rho=1/\\sigma' },
  { name: 'Resistance of a wire', tex: 'R=\\dfrac{\\rho L}{A}' },
  { name: 'Temperature dependence', tex: 'R(T)=R_0\\bigl[1+\\alpha\\,(T-T_0)\\bigr]' },
  { name: "Ohm's law (macroscopic)", tex: 'V=I\\,R' },
];

const ch7Sections = [
  { id: '7.1', title: 'Electric Potential Energy' },
  { id: '7.2', title: 'Electric Potential and Potential Difference' },
  { id: '7.3', title: 'Calculations of Electric Potential' },
  { id: '7.4', title: 'Determining Field from Potential' },
  { id: '7.5', title: 'Equipotential Surfaces and Conductors' },
  { id: '7.6', title: 'Applications of Electrostatics' },
];

const ch8Sections = [
  { id: '8.1', title: 'Capacitors and Capacitance' },
  { id: '8.2', title: 'Capacitors in Series and in Parallel' },
  { id: '8.3', title: 'Energy Stored in a Capacitor' },
  { id: '8.4', title: 'Capacitor with a Dielectric' },
  { id: '8.5', title: 'Molecular Model of a Dielectric' },
];

const ch9Sections = [
  { id: '9.1', title: 'Electrical Current' },
  { id: '9.2', title: 'Model of Conduction in Metals' },
  { id: '9.3', title: 'Resistivity and Resistance' },
  { id: '9.4', title: "Ohm's Law" },
];

export default function StudyGuideIndex() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Study Guide — §7.1–9.4</h1>
        <p className="text-slate-600 mt-1">
          Verbatim-faithful to OpenStax <i>University Physics Vol. 2</i>. Worked examples,
          per-section practice, tip / pitfall / exam-trap callouts, and five interactive demos.
        </p>
      </header>

      <section>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-slate-200 rounded p-4">
            <h2 className="text-xl font-semibold">
              <Link href="/study-guide/potential/" className="text-blue-700 hover:underline">
                Chapter 7 — Electric Potential
              </Link>
            </h2>
            <ul className="mt-2 space-y-1 text-sm">
              {ch7Sections.map((s) => (
                <li key={s.id}>
                  <Link href={`/study-guide/potential/#s${s.id.replace('.', '')}`} className="text-blue-700 hover:underline">
                    §{s.id}
                  </Link>{' — '}
                  {s.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-slate-200 rounded p-4">
            <h2 className="text-xl font-semibold">
              <Link href="/study-guide/capacitance/" className="text-blue-700 hover:underline">
                Chapter 8 — Capacitance
              </Link>
            </h2>
            <ul className="mt-2 space-y-1 text-sm">
              {ch8Sections.map((s) => (
                <li key={s.id}>
                  <Link href={`/study-guide/capacitance/#s${s.id.replace('.', '')}`} className="text-blue-700 hover:underline">
                    §{s.id}
                  </Link>{' — '}
                  {s.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-slate-200 rounded p-4">
            <h2 className="text-xl font-semibold">
              <Link href="/study-guide/current/" className="text-blue-700 hover:underline">
                Chapter 9 — Current and Resistance
              </Link>
            </h2>
            <ul className="mt-2 space-y-1 text-sm">
              {ch9Sections.map((s) => (
                <li key={s.id}>
                  <Link href={`/study-guide/current/#s${s.id.replace('.', '')}`} className="text-blue-700 hover:underline">
                    §{s.id}
                  </Link>{' — '}
                  {s.title}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 mt-2">
              §9.1–9.2 confirmed on-scope; §9.3–9.4 included for coverage safety.
            </p>
          </div>
        </div>

        <div className="mt-4 border border-slate-200 rounded p-4">
          <h2 className="text-xl font-semibold">
            <Link href="/study-guide/mixed-review/" className="text-blue-700 hover:underline">
              Mixed review
            </Link>
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Twelve cross-section integrative problems (M1–M12). Each spans two or more sections —
            the closest in spirit to a real exam item.
          </p>
        </div>
      </section>

      <MathStatic>
        <section>
          <h2 className="text-2xl font-bold">Consolidated formula sheet</h2>
          <p className="text-sm text-slate-600 mb-2">
            Cheat-sheet for quick reference. Full derivations are on the chapter pages above.
          </p>
          <FormulaSheet title="Chapter 7 — Potential" rows={ch7Rows} />
          <FormulaSheet title="Chapter 8 — Capacitance" rows={ch8Rows} />
          <FormulaSheet title="Chapter 9 — Current and Resistance" rows={ch9Rows} />
        </section>
      </MathStatic>
    </div>
  );
}
