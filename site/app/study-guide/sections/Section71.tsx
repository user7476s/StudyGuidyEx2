import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { Reveal } from './Reveal';

export function Section71() {
  return (
    <section id="s71">
      <h2 className="text-2xl font-bold">§7.1 — Electric Potential Energy</h2>

      <h3 className="text-lg font-semibold mt-3">Why a potential energy exists</h3>
      <p>
        The Coulomb force is conservative: the work done by it on a charge as the charge moves
        from one point to another depends only on the endpoints, not on the path. OpenStax shows
        this with a two-path comparison (Figure 7.5): the path \(P_1 \to P_3 \to P_4 \to P_2\)
        does the same work as the direct path \(P_1\to P_2\), because the arcs \(P_1P_3\) and
        \(P_4P_2\) are perpendicular to the radial Coulomb force and contribute zero work.
        Consequently the line integral of \(\vec E\) around any closed loop vanishes:
        \[\oint \vec E\cdot d\vec\ell = 0,\]
        which is the integral statement that \(\vec E\) (from static charges) is conservative.
        Because the force is conservative, a potential energy \(U\) exists; for a conservative
        force \(W=-\Delta U\), so positive work by the field corresponds to a loss in U.
      </p>

      <h3 className="text-lg font-semibold mt-3">Deriving U(r) for two point charges</h3>
      <p>
        Place \(+q\) at the origin and move \(+Q\) radially from \(r_1\) to \(r_2\). The applied
        force that quasi-statically balances the Coulomb force is \(\vec F = -kqQ\,\hat r/r^2\),
        so \(\vec F\cdot d\vec\ell = -kqQ\,dr/r^2\). The work the applied force does is
        \[W_&#123;12&#125; = \int_&#123;r_1&#125;^&#123;r_2&#125;\!\!\vec F\cdot d\vec r
           = -kqQ\int_&#123;r_1&#125;^&#123;r_2&#125;\!\frac&#123;dr&#125;&#123;r^2&#125;
           = kqQ\left(\frac&#123;1&#125;&#123;r_2&#125;-\frac&#123;1&#125;&#123;r_1&#125;\right).\]
        With the conservative-force relation \(\Delta U = -W_&#123;\text&#123;by field&#125;&#125;\) and choosing the
        zero of \(U\) at infinity,
        \[\boxed&#123;\,U(r) = \dfrac&#123;kqQ&#125;&#123;r&#125;\quad (U\to 0\ \text&#123;as&#125;\ r\to\infty).&#125;\]
        For a collection of point charges, the total stored energy is
        \[U = \frac&#123;1&#125;&#123;2&#125;\sum_&#123;i\neq j&#125;\frac&#123;kq_iq_j&#125;&#123;r_&#123;ij&#125;&#125; = \sum_&#123;i&lt;j&#125;\frac&#123;kq_iq_j&#125;&#123;r_&#123;ij&#125;&#125;,\]
        the factor \(1/2\) compensates for counting every pair twice.
      </p>

      <h3 className="text-lg font-semibold mt-3">Sign conventions &amp; units</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>\(U\) is positive for like charges (work needed to push together) and negative for unlike charges.</li>
        <li>\(W_&#123;\text&#123;by field&#125;&#125; = -\Delta U\) and \(W_&#123;\text&#123;external&#125;&#125; = +\Delta U\) when the charge moves quasi-statically.</li>
        <li>Reference: \(U=0\) at \(r=\infty\) (the only choice that makes Coulomb superposition consistent).</li>
        <li>Unit: joule (J). One eV (introduced in §7.2) is \(1.602\times10^&#123;-19&#125;\) J.</li>
      </ul>

      <Tip title="Use energy, not force, for trajectory problems">
        If a problem asks for a speed, an escape distance, or a closest approach, set up
        \(K_i+U_i=K_f+U_f\) instead of integrating Newton&apos;s second law. The Coulomb integral
        is already done for you and lives in \(U=kqQ/r\).
      </Tip>

      <Pitfall>
        Mixing the sign of \(W_&#123;\text&#123;by field&#125;&#125;\) and \(\Delta U\). If two like charges move
        closer, \(\Delta U &gt; 0\) and the field does negative work; the external agent does
        positive work. If you write \(W=\Delta U\) you have already lost the point.
      </Pitfall>

      <ExamTrap>
        The most common §7.1 multiple-choice error: forgetting the factor of \(1/2\) in the
        \(N\)-charge superposition formula, or — much worse — applying it twice. The clean
        recipe is &ldquo;sum once over all pairs (\(i&lt;j\)).&rdquo;
      </ExamTrap>

      <Reveal title="Example 7.1 — Kinetic energy of a charged particle (book)">
        <p>
          A \(+3.0\)-nC charge \(Q\), initially at rest at \(r_1=10\) cm from a fixed
          \(+5.0\)-nC charge \(q\), is released and reaches \(r_2=15\) cm. Find the work done by
          the field (and therefore the KE at \(r_2\)).
          \[W = \int_&#123;r_1&#125;^&#123;r_2&#125;\!F\,dr = -kqQ\int_&#123;r_1&#125;^&#123;r_2&#125;\!\frac&#123;dr&#125;&#123;r^2&#125;
            = kqQ\!\left(\frac&#123;1&#125;&#123;r_1&#125;-\frac&#123;1&#125;&#123;r_2&#125;\right).\]
          Plug in: \(kqQ = (8.99\times10^9)(5.0\times10^&#123;-9&#125;)(3.0\times10^&#123;-9&#125;) = 1.349\times10^&#123;-7&#125;\) J·m.
          \[W = 1.349\times10^&#123;-7&#125;\!\left(\frac&#123;1&#125;&#123;0.10&#125;-\frac&#123;1&#125;&#123;0.15&#125;\right)
                = 1.349\times10^&#123;-7&#125;(10-6.667)\approx 4.5\times10^&#123;-7&#125;\,\text&#123;J&#125;.\]
          The field did positive work on \(Q\), so \(K(r_2)=4.5\times10^&#123;-7&#125;\) J.
        </p>
      </Reveal>

      <Reveal title="Example 7.2 — Potential energy of a charged particle (book)">
        <p>
          Same configuration as Example 7.1: find \(\Delta U\) from \(r_1\) to \(r_2\).
          \[\Delta U = U(r_2)-U(r_1) = kqQ\!\left(\frac&#123;1&#125;&#123;r_2&#125;-\frac&#123;1&#125;&#123;r_1&#125;\right)
                = 1.349\times10^&#123;-7&#125;(6.667-10) \approx -4.5\times10^&#123;-7&#125;\,\text&#123;J&#125;.\]
          Equal in magnitude and opposite in sign to Example 7.1&apos;s work — exactly as
          \(W=-\Delta U\) demands.
        </p>
      </Reveal>

      <Reveal title="Example 7.3 — Assembling four positive charges (book, 57.8 J)">
        <p>
          Four charges \(q_1=2.0\,\mu\text&#123;C&#125;\), \(q_2=3.0\,\mu\text&#123;C&#125;\), \(q_3=4.0\,\mu\text&#123;C&#125;\),
          \(q_4=5.0\,\mu\text&#123;C&#125;\) at the vertices of a 1.0-cm square. Bring them in one at a time.
        </p>
        <ul>
          <li>\(W_1 = 0\) (nothing yet to feel).</li>
          <li>\(W_2 = kq_1q_2/d = (8.99\times10^9)(2\!\times\!10^&#123;-6&#125;)(3\!\times\!10^&#123;-6&#125;)/0.01 \approx 5.4\) J.</li>
          <li>\(W_3 = kq_3(q_1/(d\sqrt2) + q_2/d) \approx 15.9\) J.</li>
          <li>\(W_4 = kq_4(q_1/d + q_2/(d\sqrt2) + q_3/d) \approx 36.5\) J.</li>
        </ul>
        <p>Total \(W_T = 0+5.4+15.9+36.5 \approx 57.8\) J. Equivalently, sum \(kq_iq_j/r_&#123;ij&#125;\) over the six pairs.</p>
      </Reveal>

      <Reveal title="CYU 7.1 — If Q has mass 4.00 μg, what is its speed at r₂?">
        <p>
          From Example 7.1, \(K(r_2)=4.5\times10^&#123;-7&#125;\) J. With \(m=4.00\times10^&#123;-9&#125;\) kg,
          \(v=\sqrt&#123;2K/m&#125;=\sqrt&#123;2(4.5\times10^&#123;-7&#125;)/(4.00\times10^&#123;-9&#125;)&#125;\approx 15.0\) m/s.
        </p>
      </Reveal>

      <Connection>
        §7.1 sets the energetic vocabulary that the rest of Chapter 7 will simplify by stripping
        out the test-charge factor. Dividing \(U\) by the test charge \(q\) gives the potential
        \(V\) of §7.2 — a property of the source distribution alone — which makes the field
        problem &ldquo;scalar instead of vector.&rdquo;
      </Connection>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P7.1.1 — Bring a +1.0 μC charge from infinity to 5.0 cm from a +2.0 μC charge. Work?">
        <p>
          External work to assemble: \(W_&#123;\text&#123;ext&#125;&#125;=\Delta U = kq_1q_2/r =
          (8.99\times10^9)(1\times10^&#123;-6&#125;)(2\times10^&#123;-6&#125;)/0.05 = 0.36\) J.
        </p>
      </Reveal>

      <Reveal title="P7.1.2 — A +q and a −q sit 2.0 cm apart. Energy needed to separate them to infinity?">
        <p>
          Final \(U=0\); initial \(U=-kq^2/d\). External work \(=\Delta U = +kq^2/d\). For
          \(q=3.0\,\mu\)C, \(d=0.02\) m: \(W = 8.99\times10^9 (3\times10^&#123;-6&#125;)^2/0.02 = 4.05\) J.
        </p>
      </Reveal>

      <Reveal title="P7.1.3 — Three +q charges (q=4.0 μC) at vertices of an equilateral triangle, side 0.10 m. Total stored U?">
        <p>
          Three identical pairs: \(U = 3\cdot kq^2/d = 3(8.99\times10^9)(4\times10^&#123;-6&#125;)^2/0.10
          \approx 4.32\) J.
        </p>
      </Reveal>

      <Reveal title="P7.1.4 — Closest approach: a 2.0-μC point particle of mass 5.0 g flies at a fixed +3.0-μC charge with v₀=200 m/s from far away. Find r_min.">
        <p>
          Energy conservation, \(K_i+U_i=K_f+U_f\): at closest approach \(v=0\) (radial motion).
          \(\tfrac12 m v_0^2 = kq_1q_2/r_&#123;\min&#125;\Rightarrow
          r_&#123;\min&#125; = 2kq_1q_2/(mv_0^2)\).
          \(= 2(8.99\times10^9)(2\times10^&#123;-6&#125;)(3\times10^&#123;-6&#125;)/((5\times10^&#123;-3&#125;)(200)^2)
          \approx 5.4\times10^&#123;-4&#125;\) m \(= 0.54\) mm.
        </p>
      </Reveal>

      <Reveal title="P7.1.5 — Sign trap: two −q charges are pushed from 10 cm to 2 cm. Sign of W_field, sign of W_ext, sign of ΔU?">
        <p>
          Like charges (both negative) repel. Pushing them closer requires positive external
          work; the field opposes the motion (does negative work). U rises:
          \(\Delta U &gt; 0\), \(W_&#123;\text&#123;ext&#125;&#125; &gt; 0\), \(W_&#123;\text&#123;field&#125;&#125; &lt; 0\).
          Numerically with \(q=2\,\mu\)C: \(\Delta U = kq^2(1/0.02-1/0.10) = 8.99\times10^9
          (4\times10^&#123;-12&#125;)(40)\approx 1.44\) J.
        </p>
      </Reveal>
    </section>
  );
}
