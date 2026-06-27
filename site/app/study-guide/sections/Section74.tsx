import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { Reveal } from './Reveal';

export function Section74() {
  return (
    <section id="s74" className="mt-8">
      <h2 className="text-2xl font-bold">§7.4 — Determining Field from Potential</h2>

      <h3 className="text-lg font-semibold mt-3">Why the gradient?</h3>
      <p>
        Start with the definition \(\Delta V = -\int \vec E\cdot d\vec\ell\). For an infinitesimal
        step \(d\vec\ell\),
        \[dV = -\vec E\cdot d\vec\ell.\]
        Comparing with the total differential \(dV = \nabla V\cdot d\vec\ell\) gives
        \[\boxed&#123;\vec E = -\vec\nabla V.&#125;\]
        Cartesian:
        \(E_x=-\partial V/\partial x,\ E_y=-\partial V/\partial y,\ E_z=-\partial V/\partial z\).
        Cylindrical:
        \(E_r=-\partial V/\partial r,\ E_\phi=-(1/r)\partial V/\partial\phi,\ E_z=-\partial V/\partial z\).
        Spherical:
        \(E_r=-\partial V/\partial r,\ E_\theta=-(1/r)\partial V/\partial\theta,\
        E_\phi=-(1/(r\sin\theta))\partial V/\partial\phi\).
      </p>

      <h3 className="text-lg font-semibold mt-3">When V depends only on r</h3>
      <p>
        For spherically symmetric distributions, only the radial derivative is nonzero:
        \(\vec E = -(dV/dr)\hat r\). For cylindrically symmetric distributions with no z or φ
        dependence, \(\vec E = -(dV/dr)\hat r\) too — same shortcut, different \(\hat r\).
      </p>

      <h3 className="text-lg font-semibold mt-3">Sign conventions &amp; units</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>The minus sign in \(\vec E=-\nabla V\) is non-optional. It keeps E pointing from high V to low V.</li>
        <li>Units: V/m equals N/C exactly.</li>
        <li>When V depends on multiple coordinates, use <i>partial</i> derivatives; total derivatives are wrong unless reduced to a one-variable problem.</li>
      </ul>

      <Tip title="Cleanest route to E">
        For nontrivial distributions where direct integration of \(\vec E\) is messy
        (multiple components and angles), compute \(V\) first (scalar superposition!) and
        differentiate. The disk and ring examples are the canonical demonstrations.
      </Tip>

      <Pitfall>
        Dropping the minus sign or forgetting that you took \(\partial/\partial z\) at fixed
        \((x,y)\). On axis problems, &ldquo;at fixed (x,y)=(0,0)&rdquo; matters only because the
        symmetry then guarantees \(E_x=E_y=0\) — but you should state it.
      </Pitfall>

      <ExamTrap>
        Forgetting the \(1/r\) and \(1/(r\sin\theta)\) factors in cylindrical/spherical gradients.
        If V depends on θ, the θ-component of E is \((-1/r)\partial V/\partial\theta\), not
        \(-\partial V/\partial\theta\). Lose this and your dipole-field answer is off by a factor
        of r.
      </ExamTrap>

      <Reveal title="Example 7.17 — E of a point charge from V (book)">
        <p>
          Take \(V(r)=kq/r\). Spherical symmetry leaves only the radial component:
          \[E_r = -\frac&#123;dV&#125;&#123;dr&#125; = -\frac&#123;d&#125;&#123;dr&#125;\left(\frac&#123;kq&#125;&#123;r&#125;\right) = \frac&#123;kq&#125;&#123;r^2&#125;.\]
          Recover Coulomb&apos;s law for the field. (The textbook does this with the full spherical
          gradient operator to make the technique transparent.)
        </p>
      </Reveal>

      <Reveal title="Example 7.18 — E on the axis of a ring of charge (book)">
        <p>
          From \(V(z)=kQ/\sqrt&#123;R^2+z^2&#125;\), the axis has \(E_x=E_y=0\) by symmetry. The remaining
          z-component:
          \[E_z = -\frac&#123;dV&#125;&#123;dz&#125; = \frac&#123;kQz&#125;&#123;(R^2+z^2)^&#123;3/2&#125;&#125;.\]
          Vanishes at \(z=0\) (centre) and falls as \(1/z^2\) for \(z\gg R\).
        </p>
      </Reveal>

      <Reveal title="Derived for you — E on the axis of a uniform disk">
        <p>
          From \(V(z)=2\pi k\sigma(\sqrt&#123;z^2+R^2&#125;-|z|)\), differentiate with respect to z (for z &gt; 0):
          \[E_z = -\frac&#123;dV&#125;&#123;dz&#125; = 2\pi k\sigma\!\left(1-\frac&#123;z&#125;&#123;\sqrt&#123;z^2+R^2&#125;&#125;\right).\]
          Limits: \(R\to\infty\) (infinite sheet) gives \(E=2\pi k\sigma = \sigma/(2\varepsilon_0)\) — the standard sheet result.
        </p>
      </Reveal>

      <Reveal title="CYU 7.11 — Which coordinate system for a dipole? (book)">
        <p>
          The dipole&apos;s axial symmetry begs for spherical coordinates with the dipole moment
          along \(\hat z\): \(V(r,\theta)=k p\cos\theta/r^2\). Then
          \(E_r = -\partial V/\partial r = 2kp\cos\theta/r^3\) and
          \(E_\theta = -(1/r)\partial V/\partial\theta = kp\sin\theta/r^3\). On the axis
          (\(\theta=0\)): \(E_r=2kp/r^3,\ E_\theta=0\).
        </p>
      </Reveal>

      <Connection>
        §7.4 closes the V ↔ E loop. §7.3 took the field and produced the potential; §7.4 reverses
        it. Together they let you pick whichever side of the equation is easier for the geometry
        at hand. §7.5 uses the same \(\vec E = -\nabla V\) to argue that <i>equipotential
        surfaces are perpendicular to field lines</i>.
      </Connection>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P7.4.1 — V(x,y,z)=3x²−2yz. Find E at (1,1,1).">
        <p>\(E_x=-6x=-6\); \(E_y=2z=2\); \(E_z=2y=2\). \(\vec E=(-6,2,2)\) V/m.</p>
      </Reveal>

      <Reveal title="P7.4.2 — V(r)=A/r². Find E(r).">
        <p>\(E_r = -dV/dr = 2A/r^3\). For \(A&gt;0\), E points outward.</p>
      </Reveal>

      <Reveal title="P7.4.3 — V(x,y) = 100 V − (50 V/m) x. Find vector E.">
        <p>
          \(E_x = -\partial V/\partial x = +50\) V/m. \(E_y=0\). Uniform field along +x, value 50 V/m.
          Equivalently this is a parallel-plate setup with plate spacing 2 m and 100 V drop.
        </p>
      </Reveal>

      <Reveal title="P7.4.4 — Charged sphere, V = kQ/R for r≤R and kQ/r for r&gt;R. Sketch and compute E(r).">
        <p>
          Inside: V constant ⇒ \(E=0\). Outside: \(E=-dV/dr = kQ/r^2\). At the surface, there is
          a step in E equal to \(\sigma/\varepsilon_0\) (Gauss at conductor surface).
        </p>
      </Reveal>

      <Reveal title="P7.4.5 — V(r,θ) = (kp cos θ)/r² (dipole, far field). Find E_r and E_θ.">
        <p>
          \(E_r = -\partial V/\partial r = 2kp\cos\theta/r^3\).
          \(E_\theta = -(1/r)\partial V/\partial\theta = kp\sin\theta/r^3\).
          Magnitude: \(|\vec E| = (kp/r^3)\sqrt&#123;4\cos^2\theta+\sin^2\theta&#125; = (kp/r^3)\sqrt&#123;1+3\cos^2\theta&#125;\).
        </p>
      </Reveal>
    </section>
  );
}
