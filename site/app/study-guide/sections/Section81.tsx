'use client';

import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { Reveal } from './Reveal';
import dynamic from 'next/dynamic';
const ParallelPlate = dynamic(
  () => import('@/components/interactives/ParallelPlate').then((m) => ({ default: m.ParallelPlate })),
  { ssr: false, loading: () => <div className="border rounded p-3 bg-white h-48 animate-pulse" /> },
);

export function Section81() {
  return (
    <section id="s81" className="mt-8">
      <h2 className="text-2xl font-bold">§8.1 — Capacitors and Capacitance</h2>

      <h3 className="text-lg font-semibold mt-3">Definition</h3>
      <p>
        A capacitor is a pair of conductors (the &ldquo;plates&rdquo;) that store equal and
        opposite charges \(\pm Q\) when a potential difference \(V\) is maintained between them.
        The <i>capacitance</i> is defined as
        \[\boxed&#123;\,C = \dfrac&#123;Q&#125;&#123;V&#125;\,&#125;\]
        with units of farads (1 F = 1 C/V). This is purely a geometric (and material) property:
        if you double \(Q\), the field doubles, \(V\) doubles, and \(C\) is unchanged.
      </p>

      <h3 className="text-lg font-semibold mt-3">Three derivations from Gauss + V = −∫E·dl</h3>

      <p>
        <b>Parallel-plate, area A, gap d, vacuum.</b> Surface density \(\sigma=Q/A\). For
        infinite-plate idealization, \(E=\sigma/\varepsilon_0\) between the plates and zero
        outside. The gap voltage is \(V = Ed = Qd/(\varepsilon_0 A)\), giving
        \[C = \dfrac&#123;\varepsilon_0 A&#125;&#123;d&#125;.\]
      </p>

      <p>
        <b>Isolated sphere, radius R.</b> Outside the conductor \(V(r)=kQ/r\); at the surface
        \(V=kQ/R\). With reference at infinity, \(C = Q/V = R/k = 4\pi\varepsilon_0 R\).
      </p>

      <p>
        <b>Concentric spherical capacitor, inner a, outer b.</b> By Gauss, \(E(r)=kQ/r^2\) for
        \(a&lt;r&lt;b\). The potential difference is
        \[V = \int_a^b E\,dr = kQ\!\left(\frac&#123;1&#125;&#123;a&#125;-\frac&#123;1&#125;&#123;b&#125;\right) = \frac&#123;kQ(b-a)&#125;&#123;ab&#125;.\]
        Hence \(C = 4\pi\varepsilon_0\,ab/(b-a)\). Taking \(b\to\infty\) recovers the isolated sphere.
      </p>

      <p>
        <b>Cylindrical, inner a, outer b, length L (ignoring fringing).</b> Linear density \(\lambda=Q/L\),
        \(E(r)=\lambda/(2\pi\varepsilon_0 r)\), and
        \[V=\int_a^b E\,dr = \frac&#123;\lambda&#125;&#123;2\pi\varepsilon_0&#125;\ln(b/a)
          \Rightarrow C = \frac&#123;2\pi\varepsilon_0 L&#125;&#123;\ln(b/a)&#125;.\]
      </p>

      <h3 className="text-lg font-semibold mt-3">Sign conventions &amp; units</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>+Q lives on one plate, −Q on the other; the net charge of the capacitor is zero.</li>
        <li>V is conventionally the magnitude of the potential difference, taken positive.</li>
        <li>1 F is huge: typical capacitors are pF (10⁻¹²) to mF (10⁻³). 1 μF parallel-plate at d=1 mm needs A = 1.13×10⁵ m².</li>
        <li>The geometric formulas assume vacuum; multiply by κ if a dielectric fills the gap (§8.4).</li>
      </ul>

      <Tip title="Spot the geometry">
        Almost every textbook capacitor problem fits one of three templates: parallel plate
        (\(\varepsilon_0 A/d\)), spherical (\(4\pi\varepsilon_0 ab/(b-a)\)), or cylindrical
        (\(2\pi\varepsilon_0 L/\ln(b/a)\)). Identify the template before you start integrating.
      </Tip>

      <Pitfall>
        C does <i>not</i> depend on the charge stored. Doubling Q doubles V and leaves C the
        same. &ldquo;Putting more charge on a 1 μF cap makes it a 2 μF cap&rdquo; is a popular
        and wrong answer.
      </Pitfall>

      <ExamTrap>
        Saying C depends on V. It doesn&apos;t. C depends on geometry (and on κ if dielectric is
        present). What V does affect: the stored energy \(U=\tfrac12 CV^2\) and the charge
        \(Q=CV\) — but not C itself.
      </ExamTrap>

      <Reveal title="Example 8.1 — Parallel-plate capacitor (book)">
        <p>
          A=1.00 m², d=1.00 mm. \(C = \varepsilon_0 A/d = (8.854\times10^&#123;-12&#125;)(1.00)/0.001 = 8.85\times10^&#123;-9&#125;\) F
          = 8.85 nF. Connected to 3.00 V: \(Q=CV = 2.66\times10^&#123;-8&#125;\) C ≈ 26.6 nC.
        </p>
      </Reveal>

      <Reveal title="Example 8.2 — Capacitance of Earth as an isolated sphere (book)">
        <p>
          R_Earth ≈ 6.378×10⁶ m. \(C = 4\pi\varepsilon_0 R = (6.378\times10^6)/(8.99\times10^9) \approx 7.10\times10^&#123;-4&#125;\) F = 710 μF.
          The planet&apos;s &ldquo;ground&rdquo; is, electrostatically, a finite capacitor — just an
          enormous one compared to lab devices.
        </p>
      </Reveal>

      <Reveal title="Example 8.3 — Spherical capacitor (book)">
        <p>
          With a=1.0 cm, b=2.0 cm in vacuum:
          \(C = (1/k)\cdot ab/(b-a) = (1/8.99\times10^9)\cdot(0.01\cdot0.02)/0.01 = 2.22\times10^&#123;-12&#125;\) F = 2.22 pF.
          For a single isolated 1.0-cm sphere: \(C=4\pi\varepsilon_0 R=1.11\) pF — the outer
          shell at 2 cm exactly doubles the capacitance.
        </p>
      </Reveal>

      <Reveal title="CYU 8.1 — Parallel-plate at 2.0 pF; if A doubles, what is C? (book)">
        <p>C ∝ A, so C doubles to 4.0 pF.</p>
      </Reveal>

      <Reveal title="CYU 8.4 — Cylindrical capacitor: Q=0.500 nC produces V=20.0 V. Find C. (book)">
        <p>\(C=Q/V = 5.0\times10^&#123;-10&#125;/20.0 = 2.5\times10^&#123;-11&#125;\) F = 25 pF.</p>
      </Reveal>

      <ParallelPlate />

      <Connection>
        §8.1 sets up the &ldquo;C as Q/V&rdquo; framework. §8.2 will combine multiple capacitors;
        §8.3 stores energy in the field between the plates; §8.4–§8.5 fill the gap with a
        dielectric and re-scale C by κ.
      </Connection>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P8.1.1 — Parallel plates A=4.0 cm², d=0.20 mm. Find C.">
        <p>\(C = (8.854\times10^&#123;-12&#125;)(4\times10^&#123;-4&#125;)/(2\times10^&#123;-4&#125;) = 1.77\times10^&#123;-11&#125;\) F = 17.7 pF.</p>
      </Reveal>

      <Reveal title="P8.1.2 — How much area is needed to make a 1.0 μF vacuum parallel-plate cap with d=10 μm?">
        <p>\(A = Cd/\varepsilon_0 = (10^&#123;-6&#125;)(10^&#123;-5&#125;)/(8.854\times10^&#123;-12&#125;) = 1.13\) m².</p>
      </Reveal>

      <Reveal title="P8.1.3 — Spherical capacitor: a=2.0 cm, b=5.0 cm. Find C.">
        <p>
          \(C = 4\pi\varepsilon_0 ab/(b-a) = (0.02\cdot0.05)/(8.99\times10^9 \cdot 0.03) = 3.71\times10^&#123;-12&#125;\) F ≈ 3.71 pF.
        </p>
      </Reveal>

      <Reveal title="P8.1.4 — Cylindrical capacitor a=1.0 mm, b=5.0 mm, length 0.10 m. Find C.">
        <p>
          \(C = 2\pi\varepsilon_0 L/\ln(b/a) = 2\pi(8.854\times10^&#123;-12&#125;)(0.10)/\ln 5 = 3.46\times10^&#123;-12&#125;\) F ≈ 3.46 pF.
        </p>
      </Reveal>

      <Reveal title="P8.1.5 — A 47 μF capacitor stores 23.5 μC. What ΔV is across it?">
        <p>\(V = Q/C = 23.5\times10^&#123;-6&#125;/47\times10^&#123;-6&#125; = 0.50\) V.</p>
      </Reveal>
    </section>
  );
}
