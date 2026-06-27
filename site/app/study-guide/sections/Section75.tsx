'use client';

import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { Reveal } from './Reveal';
import dynamic from 'next/dynamic';
const PointCharge = dynamic(
  () => import('@/components/interactives/PointCharge').then((m) => ({ default: m.PointCharge })),
  { ssr: false, loading: () => <div className="border rounded p-3 bg-white h-96 animate-pulse" /> },
);
const Dipole = dynamic(
  () => import('@/components/interactives/Dipole').then((m) => ({ default: m.Dipole })),
  { ssr: false, loading: () => <div className="border rounded p-3 bg-white h-96 animate-pulse" /> },
);

export function Section75() {
  return (
    <section id="s75" className="mt-8">
      <h2 className="text-2xl font-bold">§7.5 — Equipotential Surfaces and Conductors</h2>

      <h3 className="text-lg font-semibold mt-3">Definition and the perpendicularity property</h3>
      <p>
        An <i>equipotential surface</i> is a locus of points where \(V\) takes the same value.
        Move along the surface and \(dV=0\); but \(dV = \nabla V\cdot d\vec\ell\), so
        \(\nabla V\) is perpendicular to every tangent direction of the surface. With
        \(\vec E = -\nabla V\), this means
        \[\boxed&#123;\vec E\ \text&#123;is always perpendicular to equipotential surfaces.&#125;&#125;\]
        Where the surfaces bunch tightly, \(|\vec E|=|dV/dn|\) is large; where they fan apart,
        the field is weak. This is exactly the topographic-map analogy of Figure 7.35: dense
        contour lines = steep slope = strong gravity.
      </p>

      <h3 className="text-lg font-semibold mt-3">Conductors in electrostatic equilibrium</h3>
      <p>
        Free charges in a conductor rearrange until the interior field is zero (otherwise they
        would still be accelerating). Three consequences follow:
      </p>
      <ul className="list-disc ml-5">
        <li><b>The interior is an equipotential</b>: \(\vec E=0 \Rightarrow \nabla V=0 \Rightarrow V=\text&#123;const&#125;\).</li>
        <li><b>The surface is the same equipotential</b>: V is continuous.</li>
        <li><b>E at the surface is perpendicular to the surface</b>, magnitude \(E=\sigma/\varepsilon_0\) (Gauss with a pillbox).</li>
      </ul>
      <p>
        A corollary: on an irregularly shaped conductor, σ piles up where the radius of curvature
        is small. Two connected spheres at the same V satisfy \(\sigma_1/\sigma_2 = R_2/R_1\) —
        sharper points hold more charge, and the local field is larger there. That is why
        lightning rods, corona discharges, and Van de Graaff terminals all involve sharp points.
      </p>

      <h3 className="text-lg font-semibold mt-3">Sign conventions &amp; units</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>Field lines start on +charge, end on −charge, and cross equipotentials at 90°.</li>
        <li>Surface charge density \(\sigma\) measured in C/m². \(E_&#123;\perp&#125;=\sigma/\varepsilon_0\) at a conductor face.</li>
        <li>For a single point charge, equipotential spheres are spaced unevenly: at radii \(r=kq/V\), so they crowd near the charge.</li>
      </ul>

      <Tip title="Reading the spacing">
        Equipotentials labeled in equal V steps automatically map the field strength: closely
        spaced ⇒ strong field, widely spaced ⇒ weak field. Don&apos;t expect them to be equally
        spaced in <i>space</i> for any nonuniform geometry.
      </Tip>

      <Pitfall>
        Field lines must intersect equipotential surfaces at 90°. Drawing them parallel — or
        even slightly tilted — is wrong. The same is true near a conductor: field lines hit the
        surface at 90°, never tangentially.
      </Pitfall>

      <ExamTrap>
        For a point charge in 2D, the equipotential <i>circles</i> are at radii \(r=kq/V\),
        spaced as \(1/V\), not equally. A common multiple-choice trap shows equally-spaced
        concentric rings (which are <i>wrong</i> as equipotentials of equal V step). Pick the
        diagram with rings that crowd near the charge.
      </ExamTrap>

      <PointCharge />
      <Dipole />

      <Reveal title="Example 7.19 — Equipotential surfaces around a +10 nC charge (book)">
        <p>
          Set \(V=kq/r\) equal to constants:
          \(r=kq/V = (8.99\times10^9)(10\times10^&#123;-9&#125;)/V = 89.9/V\) m.
          So \(V=100\) V ⇒ \(r=0.90\) m; \(V=50\) V ⇒ \(1.80\) m;
          \(V=20\) V ⇒ \(4.50\) m; \(V=10\) V ⇒ \(9.00\) m. Equal V-steps give exponentially
          spreading surfaces.
        </p>
      </Reveal>

      <Reveal title="Example 7.20 — Two parallel plates with σ = 6.81×10⁻⁷ C/m², gap 6.50 mm (book)">
        <p>
          (a) Treat as infinite sheets:
          \(E = \sigma/\varepsilon_0 = 6.81\times10^&#123;-7&#125;/8.854\times10^&#123;-12&#125; = 7.69\times10^4\) V/m.
          (b) ΔV across gap: \(V = E\cdot d = 7.69\times10^4 \cdot 6.50\times10^&#123;-3&#125; = 500\) V.
          (c) Distance for ΔV=100 V: same field, so \(\Delta d = 100/E = 1.30\) mm.
          Equipotential planes parallel to the plates.
        </p>
      </Reveal>

      <Reveal title="CYU 7.12 — Equipotentials of an infinite line charge (book)">
        <p>
          \(V(r) = -(\lambda/2\pi\varepsilon_0)\ln(r/r_0)\) depends only on r, so the
          equipotentials are coaxial cylinders around the line. Field lines radiate radially
          outward, perpendicular to those cylinders.
        </p>
      </Reveal>

      <Connection>
        §7.5 is the geometric pay-off of §7.1–§7.4. It also seeds Chapter 8: a parallel-plate
        capacitor is literally two facing equipotential surfaces, and its capacitance follows
        from V = Ed across the gap.
      </Connection>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P7.5.1 — Sketch the equipotentials and field lines near a +q and a −q (dipole). Where is V=0?">
        <p>
          The V=0 surface is the perpendicular bisector plane of the dipole — every point is
          equidistant from +q and −q, so the two scalar contributions cancel. Field lines emanate
          from +q and terminate at −q, cutting that plane at 90°.
        </p>
      </Reveal>

      <Reveal title="P7.5.2 — A solid metal sphere has +5.0 nC. R=2.0 cm. Plot V(r) for r=0 to 10 cm.">
        <p>
          Inside (r ≤ R): \(V=kq/R=(8.99\times10^9)(5\times10^&#123;-9&#125;)/0.02 = 2.25\times10^3\) V (flat).
          Outside: \(V=kq/r\). At r=5 cm, V=899 V; at 10 cm, 450 V. Discontinuity in slope at r=R; V itself is continuous.
        </p>
      </Reveal>

      <Reveal title="P7.5.3 — Two conductors connected by a wire, R₁=1.0 cm and R₂=5.0 cm. If σ on the small one is 8.0 μC/m², find σ on the large one.">
        <p>
          Same V on both ⇒ \(\sigma_1 R_1 = \sigma_2 R_2\). \(\sigma_2 = \sigma_1 R_1/R_2 = 8.0\cdot 1/5 = 1.6\) μC/m².
          The small ball has the higher σ — and therefore the higher local field.
        </p>
      </Reveal>

      <Reveal title="P7.5.4 — A neutral solid conductor sits in an external field E₀=1000 V/m. What is E inside?">
        <p>
          Zero. The induced surface charges arrange themselves to exactly cancel the external
          field in the interior. Outside, E lines bend to meet the conductor surface at 90°.
        </p>
      </Reveal>

      <Reveal title="P7.5.5 — Parallel plates with σ=±2.0×10⁻⁶ C/m², gap 1.0 mm. Find ΔV and the equipotential spacing for 50 V steps.">
        <p>
          \(E=\sigma/\varepsilon_0 = 2.26\times10^5\) V/m. ΔV = Ed = 226 V across the gap.
          For 50 V step: \(\Delta d = 50/E = 2.21\times10^&#123;-4&#125;\) m = 0.221 mm. Four such steps
          fit, plus a 38 V remainder.
        </p>
      </Reveal>
    </section>
  );
}
