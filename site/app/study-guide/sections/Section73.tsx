'use client';

import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { Reveal } from './Reveal';
import dynamic from 'next/dynamic';
const VrEr = dynamic(
  () => import('@/components/interactives/VrEr').then((m) => ({ default: m.VrEr })),
  { ssr: false, loading: () => <div className="border rounded p-3 bg-white h-64 animate-pulse" /> },
);

export function Section73() {
  return (
    <section id="s73" className="mt-8">
      <h2 className="text-2xl font-bold">§7.3 — Calculations of Electric Potential</h2>

      <h3 className="text-lg font-semibold mt-3">Why V is easier than E</h3>
      <p>
        The potential is a scalar. Superposition therefore reduces to addition of signed
        numbers — there are no components and no angles. For a system of discrete point charges,
        \[V_P = \sum_i \frac&#123;kq_i&#125;&#123;r_i&#125;,\]
        where \(r_i\) is the distance from each source charge to the field point \(P\). For a
        continuous distribution, replace the sum by an integral over the charge element \(dq\):
        \[V_P = \int \frac&#123;k\,dq&#125;&#123;r&#125;.\]
        Once \(V\) is known everywhere, the field follows by \(\vec E=-\vec\nabla V\) (§7.4).
      </p>

      <h3 className="text-lg font-semibold mt-3">Three textbook derivations</h3>

      <p>
        <b>(a) Ring of total charge Q, radius R, on axis at distance z.</b>
        Every element of the ring sits at the same distance \(\sqrt&#123;z^2+R^2&#125;\) from the point on
        the axis, so the integral is trivial:
        \[V(z) = \frac&#123;1&#125;&#123;\sqrt&#123;z^2+R^2&#125;&#125;\int k\,dq = \frac&#123;kQ&#125;&#123;\sqrt&#123;z^2+R^2&#125;&#125;.\]
      </p>

      <p>
        <b>(b) Disk of surface density σ, radius R, on axis at distance z.</b>
        Divide into rings of radius \(r\), width \(dr\), with charge \(dq = \sigma(2\pi r)\,dr\).
        From (a),
        \[dV = \frac&#123;k(2\pi\sigma r)\,dr&#125;&#123;\sqrt&#123;z^2+r^2&#125;&#125;
          \;\Rightarrow\;
          V(z) = 2\pi k\sigma\left(\sqrt&#123;z^2+R^2&#125;-|z|\right).\]
      </p>

      <p>
        <b>(c) Dipole far-field.</b> Two charges \(\pm q\) separated by \(d\), evaluated at
        distance \(r\gg d\) and angle \(\theta\) from the dipole axis. Subtract the two point
        potentials and expand to leading order in \(d/r\):
        \[V_P = k\left(\frac&#123;q&#125;&#123;r_+&#125;-\frac&#123;q&#125;&#123;r_-&#125;\right)
              \approx \frac&#123;kqd\cos\theta&#125;&#123;r^2&#125;
              = \frac&#123;k\,\vec p\cdot\hat r&#125;&#123;r^2&#125;,\quad \vec p = q\vec d.\]
      </p>

      <VrEr />

      <h3 className="text-lg font-semibold mt-3">Sign conventions &amp; units</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>Signs of \(q_i\) feed directly into \(V\): negative charges contribute negative V.</li>
        <li>Linear density \(\lambda\) in C/m, surface \(\sigma\) in C/m², volume \(\rho\) in C/m³.</li>
        <li>\(\vec p\) points from \(-q\) to \(+q\); magnitude \(qd\). Units C·m.</li>
        <li>The infinity reference fails for distributions of infinite extent (infinite line, infinite plane). Choose a finite reference instead — see Example 7.16.</li>
      </ul>

      <Tip title="Symmetry first">
        Before integrating, ask: are all elements the same distance from the field point? If yes
        (e.g., points on the axis of a ring or sphere), pull \(1/r\) out of the integral and the
        problem is essentially done. If no, you need to parametrize properly.
      </Tip>

      <Pitfall>
        For an infinite line charge, \(\int k\lambda\,d\ell/r\) diverges if you insist on
        \(V(\infty)=0\). Take a finite reference \(r_0\) and write
        \(V(r)=-\frac&#123;\lambda&#125;&#123;2\pi\varepsilon_0&#125;\ln(r/r_0)\). Only potential <i>differences</i>
        are physical here.
      </Pitfall>

      <ExamTrap>
        Vector-summing what should be scalar-summed. Adding the four \(V_i\) at the centre of a
        square is just \(4\,kq/r\) — there are no components to break out.
      </ExamTrap>

      <Reveal title="Example 7.11 — V at the center of a square of four charges (book)">
        <p>
          Four equal charges \(q=2.0\) nC at the corners of a square of side \(a=0.10\) m. Each
          charge is at distance \(r=a/\sqrt 2 \approx 0.0707\) m from the center. By scalar
          superposition,
          \[V=4\cdot\frac&#123;kq&#125;&#123;r&#125;=\frac&#123;4(8.99\times10^9)(2.0\times10^&#123;-9&#125;)&#125;&#123;0.0707&#125;\approx 1.02\times10^3\,\text&#123;V&#125;.\]
        </p>
      </Reveal>

      <Reveal title="Example 7.13 — V on the axis of a ring of charge (book)">
        <p>
          For total charge Q on a ring of radius R, every element sits at the same distance
          from the field point on the axis, giving directly
          \[V(z)=\frac&#123;kQ&#125;&#123;\sqrt&#123;R^2+z^2&#125;&#125;.\]
          Note \(V(0)=kQ/R\) at the center, and \(V\to kQ/z\) for \(z\gg R\) (looks like a point charge).
        </p>
      </Reveal>

      <Reveal title="Example 7.15 — V on the axis of a uniform disk (book)">
        <p>
          \[V(z)=2\pi k\sigma\!\left(\sqrt&#123;z^2+R^2&#125;-|z|\right).\]
          At \(z=0\) (centre of the disk): \(V=2\pi k\sigma R\). For \(z\gg R\),
          expand \(\sqrt&#123;z^2+R^2&#125;\approx z(1+R^2/2z^2)\), giving \(V\to \pi k\sigma R^2/z = kQ/z\)
          (point-charge behaviour, with \(Q=\sigma\pi R^2\)).
        </p>
      </Reveal>

      <Reveal title="Example 7.10 — V outside a uniformly charged conducting sphere (book)">
        <p>
          For \(r&gt;R\) outside a sphere of total charge Q, Gauss treats it as a point charge:
          \(V(r)=kQ/r\). For \(r\le R\), the interior is an equipotential (the conductor case):
          \(V=kQ/R\), the surface value. So the curve is \(\propto 1/r\) outside and flat inside.
          With \(R=1.0\) cm and \(Q=-3.0\) nC: \(V_&#123;\text&#123;surf&#125;&#125;=-2.70\) kV.
        </p>
      </Reveal>

      <Reveal title="CYU 7.8 — V inside the metal sphere of Example 7.10 (book)">
        <p>The interior of a conductor in equilibrium is an equipotential, so \(V_&#123;\text&#123;inside&#125;&#125;=V_&#123;\text&#123;surface&#125;&#125;=-2.70\) kV.</p>
      </Reveal>

      <Connection>
        §7.3 hands you \(V(\vec r)\). §7.4 then takes the gradient to recover \(\vec E\) — often
        the cleanest path to the field for a complicated geometry.
      </Connection>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P7.3.1 — Two +5.0 nC charges at (±0.10 m, 0). Find V at the origin.">
        <p>By superposition, \(V=2\cdot kq/r = 2(8.99\times10^9)(5.0\times10^&#123;-9&#125;)/0.10 = 899\) V.</p>
      </Reveal>

      <Reveal title="P7.3.2 — A dipole p=2.0×10⁻³⁰ C·m. Find V at r=1.0 nm along the axis (θ=0).">
        <p>
          \(V = kp\cos\theta/r^2 = (8.99\times10^9)(2.0\times10^&#123;-30&#125;)(1)/(10^&#123;-9&#125;)^2 = 1.80\times10^&#123;-2&#125;\) V.
          Off-axis, \(\theta=90°\) gives \(V=0\) — the equatorial plane is one of the dipole's equipotentials.
        </p>
      </Reveal>

      <Reveal title="P7.3.3 — Ring of charge Q=10 nC, R=5.0 cm. Compare V at z=0 and z=5.0 cm.">
        <p>
          \(V(0)=kQ/R = (8.99\times10^9)(10\times10^&#123;-9&#125;)/0.05 = 1.80\times10^3\) V.
          \(V(0.05)=kQ/\sqrt&#123;R^2+z^2&#125; = 89.9/\sqrt&#123;0.005&#125; = 89.9/0.0707 = 1.27\times10^3\) V.
        </p>
      </Reveal>

      <Reveal title="P7.3.4 — A +q at (a, 0) and a −q at (−a, 0). Find V at (0, y).">
        <p>
          Both charges are equidistant \(\sqrt&#123;a^2+y^2&#125;\) from the point, and they have equal and
          opposite signs, so \(V=0\) for all y. The y-axis (and the entire plane x=0) is the
          equipotential V=0 of any equal-and-opposite pair.
        </p>
      </Reveal>

      <Reveal title="P7.3.5 — Half-ring of total charge Q, radius R. Find V at the center.">
        <p>
          Every element of the half-ring lies at distance R from the center, so the integral
          collapses:
          \(V=\int k\,dq/R = kQ/R\). Same answer as a full ring — V doesn't &lsquo;know&rsquo;
          about the missing half because distance to the field point is the only thing it cares
          about, and that distance hasn't changed.
        </p>
      </Reveal>
    </section>
  );
}
