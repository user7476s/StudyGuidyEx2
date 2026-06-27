import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { Reveal } from './Reveal';

export function Section72() {
  return (
    <section id="s72" className="mt-8">
      <h2 className="text-2xl font-bold">§7.2 — Electric Potential and Potential Difference</h2>

      <h3 className="text-lg font-semibold mt-3">Stripping out the test charge</h3>
      <p>
        The potential energy \(U\) depends on the test charge \(q\) you choose to probe the
        source distribution. Dividing it out gives a quantity that belongs to the sources alone:
        \[V \equiv \frac&#123;U&#125;&#123;q&#125;,\qquad \text&#123;units&#125;\ \text&#123;V&#125;\equiv\text&#123;J/C&#125;.\]
        It is a scalar field on space. The potential difference between two points is what
        you actually measure with a voltmeter:
        \[\Delta V_&#123;BA&#125; = V_B-V_A = -\int_A^B \vec E\cdot d\vec\ell.\]
        The sign is built so that \(\vec E\) points from high \(V\) to low \(V\): along a field
        line, \(V\) decreases.
      </p>

      <h3 className="text-lg font-semibold mt-3">Two derivations that follow immediately</h3>
      <p>
        <b>(a) V of a point charge.</b> Take \(\vec E = (kq/r^2)\hat r\) and integrate radially
        from \(\infty\) to \(r\) (so \(d\vec\ell=dr\,\hat r\)):
        \[V(r) = -\int_\infty^r \frac&#123;kq&#125;&#123;r'^2&#125;dr' = \frac&#123;kq&#125;&#123;r&#125;.\]
        Zero reference at infinity again.
      </p>
      <p>
        <b>(b) Uniform field between parallel plates.</b> If \(\vec E\) is uniform and points
        from plate A to plate B over distance \(d\),
        \[V_A-V_B = \int_A^B E\,d\ell = Ed,\qquad E = \frac&#123;V_&#123;AB&#125;&#125;&#123;d&#125;.\]
        This is why &ldquo;volts per meter&rdquo; is an equivalent SI unit for electric field.
      </p>

      <h3 className="text-lg font-semibold mt-3">The electron-volt</h3>
      <p>
        A practical unit of energy: 1 eV = work done on an electron by 1 V.
        \(1\,\text&#123;eV&#125;=(1.602\times10^&#123;-19&#125;\,\text&#123;C&#125;)(1\,\text&#123;V&#125;)=1.602\times10^&#123;-19&#125;\) J.
        Convenient for atomic, nuclear, and electronics calculations because \(\Delta K = q\Delta V\)
        for accelerated point charges through a potential difference.
      </p>

      <h3 className="text-lg font-semibold mt-3">Sign conventions &amp; units</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>Positive charges accelerate from high \(V\) to low \(V\); negative charges go the opposite way.</li>
        <li>\(\Delta K = -q\Delta V = -q(V_f-V_i)\). Watch the sign of \(q\) for electrons.</li>
        <li>\(V\) is a scalar — superpose by adding signed numbers, not vectors.</li>
        <li>Reference: \(V\to 0\) at infinity for any bounded distribution.</li>
      </ul>

      <Tip title="Voltage is path-independent">
        Because \(\oint\vec E\cdot d\vec\ell=0\), the line integral
        \(-\int_A^B\vec E\cdot d\vec\ell\) gives the same answer along any path you pick.
        Choose the most convenient route — usually one that&apos;s either along the field or
        perpendicular to it.
      </Tip>

      <Pitfall>
        Mixing &ldquo;potential&rdquo; (a property of the source distribution) with
        &ldquo;potential energy&rdquo; (a property of the source–test charge pair). For an
        electron crossing 100 V, \(\Delta V\) is the same whether or not the electron is there;
        the energy gained \(qV = -1.6\times10^&#123;-17&#125;\) J belongs to the system.
      </Pitfall>

      <ExamTrap>
        Sign of \(\Delta V\) in \(\Delta K = -q\Delta V\). For an electron (\(q=-e\)) crossing
        toward higher \(V\): \(\Delta V&gt;0\), so \(\Delta K = -(-e)\Delta V = e\Delta V&gt;0\) —
        the electron <i>gains</i> KE moving toward higher \(V\). For a proton, the same
        \(\Delta V\) gives a loss. Try a worked numerical pass through both charges before the
        exam.
      </ExamTrap>

      <Reveal title="Example 7.4 — Energy stored in a 12 V, 60 A·h battery (book)">
        <p>
          Total charge \(q=60\) A·h \(=60(3600)=2.16\times10^5\) C. Total energy
          \(U=qV=(2.16\times10^5)(12)=2.59\times10^6\) J ≈ 720 W·h. Useful for sizing how long a
          headlight could run.
        </p>
      </Reveal>

      <Reveal title="Example 7.5 — Electrons through a headlight (book)">
        <p>
          A 30.0 W headlight runs on 12.0 V. Current \(I=P/V=2.50\) A means
          \(2.50\) C/s of charge. Electron rate
          \(n=I/e = 2.50/(1.602\times10^&#123;-19&#125;)=1.56\times10^&#123;19&#125;\) electrons per second.
        </p>
      </Reveal>

      <Reveal title="Example 7.6 — Accelerating an electron through 100 V (book)">
        <p>
          Electron starts at rest at the negative plate, drifts toward the positive plate.
          Energy theorem: \(\Delta K = -q\Delta V = -(-e)(+100) = 100\) eV =
          \(1.602\times10^&#123;-17&#125;\) J.
          \[v = \sqrt&#123;\frac&#123;2\Delta K&#125;&#123;m_e&#125;&#125;
              = \sqrt&#123;\frac&#123;2(1.602\times10^&#123;-17&#125;)&#125;&#123;9.11\times10^&#123;-31&#125;&#125;&#125;
              \approx 5.93\times10^6\,\text&#123;m/s&#125;.\]
          About 2% of c — relativistic corrections small but real.
        </p>
      </Reveal>

      <Reveal title="Example 7.10 — Voltage at the surface of a charged sphere (book)">
        <p>
          A 1.0-cm-radius metal sphere carries \(Q=-3.0\) nC. At the surface
          \(V=kQ/R = (8.99\times10^9)(-3.0\times10^&#123;-9&#125;)/0.010 = -2.70\times10^3\) V. Inside the
          sphere V is the same constant (-2.70 kV). At 5.00 cm from the center:
          \(V=kQ/r = -539\) V.
        </p>
      </Reveal>

      <Reveal title="CYU 7.4 — Energy of a 1.5 V AAA moving 100 C (book)">
        <p>\(U=qV=(100)(1.5)=150\) J. Enough to lift a kilogram about 15 m.</p>
      </Reveal>

      <Connection>
        §7.1 introduced \(U\); §7.2 divides it by \(q\) to make \(V\). §7.3 then exploits the
        fact that \(V\) is scalar — superposition becomes &ldquo;add numbers&rdquo; — to compute
        the potential of any distribution. §7.4 inverts the operation: \(\vec E=-\nabla V\)
        recovers the field from any \(V\) you have constructed.
      </Connection>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P7.2.1 — Through what ΔV must a proton fall to reach 2.0×10⁶ m/s?">
        <p>
          \(K=\tfrac12 m_p v^2=\tfrac12(1.673\times10^&#123;-27&#125;)(2\times10^6)^2 = 3.35\times10^&#123;-15&#125;\) J.
          \(\Delta V = K/e = 3.35\times10^&#123;-15&#125;/1.602\times10^&#123;-19&#125; \approx 2.09\times10^4\) V.
          The proton drops through 20.9 kV.
        </p>
      </Reveal>

      <Reveal title="P7.2.2 — Parallel plates 5.0 mm apart sustain 200 V. Find E.">
        <p>\(E=V/d = 200/0.005 = 4.0\times10^4\) V/m.</p>
      </Reveal>

      <Reveal title="P7.2.3 — A +2.0 μC point charge is at the origin. Find V at (3,0,0) cm and at (0,4,0) cm. Are they equal?">
        <p>
          At (3 cm): \(V=kq/r=(8.99\times10^9)(2\times10^&#123;-6&#125;)/0.03=5.99\times10^5\) V.
          At (4 cm): \(V=4.50\times10^5\) V. Not equal — different distances from the source.
          (They&apos;d be equal only on the same sphere centered at the charge.)
        </p>
      </Reveal>

      <Reveal title="P7.2.4 — Electron accelerated from rest through 5000 V. Find its KE in J and eV, and final speed.">
        <p>
          KE = \(e\Delta V = 5000\) eV \(= 8.01\times10^&#123;-16&#125;\) J.
          \(v=\sqrt&#123;2K/m_e&#125;=\sqrt&#123;2(8.01\times10^&#123;-16&#125;)/9.11\times10^&#123;-31&#125;&#125;\approx 4.19\times10^7\) m/s.
        </p>
      </Reveal>

      <Reveal title="P7.2.5 — A −3.0 nC charge is moved from a point where V = +200 V to a point where V = −300 V. Find ΔU.">
        <p>
          \(\Delta U = q\Delta V = (-3\times10^&#123;-9&#125;)((-300)-(+200))=(-3\times10^&#123;-9&#125;)(-500)=+1.5\times10^&#123;-6&#125;\) J.
          Energy of the system rose by 1.5 μJ; the external agent did +1.5 μJ of work.
        </p>
      </Reveal>
    </section>
  );
}
