import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { Reveal } from './Reveal';

export function Section83() {
  return (
    <section id="s83" className="mt-8">
      <h2 className="text-2xl font-bold">§8.3 — Energy Stored in a Capacitor</h2>

      <h3 className="text-lg font-semibold mt-3">Derivation 1 — work to charge the capacitor</h3>
      <p>
        Imagine charging the capacitor incrementally: when its plates already carry charge q, the
        voltage across the gap is \(V(q)=q/C\). To move the next \(dq\) from one plate to the
        other against this voltage costs
        \[dW = V(q)\,dq = \frac&#123;q&#125;&#123;C&#125;\,dq.\]
        Integrate from 0 to \(Q\):
        \[U = \int_0^Q \frac&#123;q&#125;&#123;C&#125;\,dq = \frac&#123;Q^2&#125;&#123;2C&#125;.\]
        Using \(Q=CV\), the energy can be rewritten in three equivalent forms:
        \[\boxed&#123;\,U = \frac&#123;Q^2&#125;&#123;2C&#125; = \tfrac12 CV^2 = \tfrac12 QV.\,&#125;\]
        The factor of \(1/2\) is the average voltage during charging.
      </p>

      <h3 className="text-lg font-semibold mt-3">Derivation 2 — energy density in the field</h3>
      <p>
        For a parallel-plate capacitor, \(U=\tfrac12 CV^2 = \tfrac12(\varepsilon_0 A/d)(Ed)^2
        = \tfrac12 \varepsilon_0 E^2 \cdot (Ad)\). The volume of the field region is \(Ad\),
        so the energy per unit volume is
        \[\boxed&#123;\,u_E = \tfrac12 \varepsilon_0 E^2.\,&#125;\]
        Although derived for parallel plates, this is the general energy density of an
        electrostatic field in vacuum. With a dielectric (§8.4), it generalizes to
        \(u_E = \tfrac12 \kappa\varepsilon_0 E^2\).
      </p>

      <h3 className="text-lg font-semibold mt-3">Sign conventions &amp; units</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>U is always positive; the capacitor stores energy whether charged + or −.</li>
        <li>Pick the form of U that uses the variables held fixed: \(\tfrac12CV^2\) when V is fixed, \(Q^2/(2C)\) when Q is fixed.</li>
        <li>u_E in J/m³.</li>
      </ul>

      <Tip title="Energy lives in the field">
        Although we derived \(U\) from work done on charges, the same energy is exactly what you
        get by integrating \(u_E\) over the volume between the plates. The &ldquo;energy lives in
        the field&rdquo; viewpoint is the one that generalizes to radiation, capacitor
        re-shaping, and dielectric work in §8.4.
      </Tip>

      <Pitfall>
        Using \(\tfrac12 CV^2\) with the original V <i>after</i> changing geometry. If the plate
        separation changes while Q is held fixed (battery disconnected), V is the variable that
        changed — switch to \(Q^2/(2C)\), or recompute \(V_\text&#123;new&#125;=Q/C_\text&#123;new&#125;\) before
        plugging in.
      </Pitfall>

      <ExamTrap>
        Choosing the wrong invariant when the problem says &ldquo;battery disconnected, then the
        plates are pulled apart.&rdquo; Q is fixed (no current path), so use \(U=Q^2/(2C)\).
        With d↑, C↓, U↑ — the external agent did work against the attractive force between
        plates. Choose \(\tfrac12CV^2\) here and you compute the wrong direction of energy
        change.
      </ExamTrap>

      <Reveal title="Example 8.8 — Defibrillator (book)">
        <p>
          Therapy capacitor C = 8.00 μF charged to ΔV = 10.0 kV.
          \(U = \tfrac12 CV^2 = \tfrac12(8\times10^&#123;-6&#125;)(10^4)^2 = 400\) J.
          Discharged through the chest in roughly 2 ms, peak power
          \(P \sim U/\tau \approx 400/2\times10^&#123;-3&#125; = 2\times10^5\) W (200 kW peak).
        </p>
      </Reveal>

      <Reveal title="Example — Energy density in 1.0 mm gap at 100 V">
        <p>
          \(E = V/d = 10^5\) V/m.
          \(u_E = \tfrac12\varepsilon_0 E^2 = \tfrac12(8.854\times10^&#123;-12&#125;)(10^5)^2 = 4.43\times10^&#123;-2&#125;\) J/m³.
          Multiply by volume \(Ad=A\cdot10^&#123;-3&#125;\): for A=1 m², \(U=4.43\times10^&#123;-5&#125;\) J. Same as
          \(\tfrac12 CV^2\) with C=8.85 nF — verify yourself.
        </p>
      </Reveal>

      <Reveal title="CYU 8.6 — 5.0 pF cap at ΔV = 0.40 V (book): find Q, U">
        <p>
          \(Q = CV = (5\times10^&#123;-12&#125;)(0.40) = 2.0\times10^&#123;-12&#125;\) C = 2.0 pC.
          \(U = \tfrac12 QV = \tfrac12(2.0\times10^&#123;-12&#125;)(0.40) = 4.0\times10^&#123;-13&#125;\) J.
          If V doubles to 0.80 V, Q doubles (linear) and U quadruples (square).
        </p>
      </Reveal>

      <Connection>
        §8.3 ties C and V (or Q) to a single number, U. §8.4 perturbs the geometry/material and
        asks how U changes — the answer depends on whether Q or V is held fixed, which is the
        battery-connected/disconnected dichotomy.
      </Connection>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P8.3.1 — 100 μF charged to 50 V, then disconnected and plate separation doubled. Find new V and U.">
        <p>
          Q fixed: \(Q = CV = (100\times10^&#123;-6&#125;)(50)=5.0\times10^&#123;-3&#125;\) C.
          New \(C' = C/2 = 50\) μF (d doubles, C halves).
          New \(V' = Q/C' = 100\) V; new \(U' = Q^2/(2C') = (5\times10^&#123;-3&#125;)^2/(10^&#123;-4&#125;) = 0.25\) J.
          Original U was 0.125 J — energy doubled, supplied by the external agent pulling plates apart.
        </p>
      </Reveal>

      <Reveal title="P8.3.2 — 10 μF charged to 12 V is connected in parallel with an uncharged 30 μF. Find common V and total U.">
        <p>
          Q is conserved: \(Q_0 = 120\) μC. After connection: total C = 40 μF;
          \(V = Q_0/C = 3.0\) V.
          New \(U = \tfrac12(40\times10^&#123;-6&#125;)(3.0)^2 = 1.8\times10^&#123;-4&#125;\) J = 0.18 mJ.
          Original \(U_0 = \tfrac12(10\times10^&#123;-6&#125;)(12)^2 = 7.2\times10^&#123;-4&#125;\) J = 0.72 mJ.
          Half a millijoule dissipated in the connecting wires.
        </p>
      </Reveal>

      <Reveal title="P8.3.3 — Battery still connected to 100 μF at 50 V; separation doubled. Find new Q and U.">
        <p>
          V fixed at 50 V. New C = 50 μF. New \(Q' = C'V = 2.5\times10^&#123;-3&#125;\) C (half the original).
          New \(U' = \tfrac12 C'V^2 = \tfrac12(50\times10^&#123;-6&#125;)(50)^2 = 6.25\times10^&#123;-2&#125;\) J = 62.5 mJ
          (half the original). The battery pulled the half-charge out and reabsorbed energy.
        </p>
      </Reveal>

      <Reveal title="P8.3.4 — A 2.0 nF capacitor in series with a 6.0 nF, both across 12 V. Find U in each and total U.">
        <p>
          \(1/C_\text&#123;eq&#125;=1/2+1/6=2/3\Rightarrow C_\text&#123;eq&#125;=1.5\) nF.
          Total Q = (1.5 nF)(12 V) = 18 nC. Same on each (series).
          \(V_1 = 18/2 = 9\) V, \(V_2 = 18/6 = 3\) V.
          \(U_1 = \tfrac12(2)(81)= 81\) nJ; \(U_2 = \tfrac12(6)(9)= 27\) nJ; total 108 nJ.
          Cross-check: \(\tfrac12(1.5)(144)=108\) nJ ✓.
        </p>
      </Reveal>

      <Reveal title="P8.3.5 — Energy density 1 mm from a 1.0 nC point charge.">
        <p>
          \(E = kQ/r^2 = 8.99\times10^9 \cdot 10^&#123;-9&#125;/(10^&#123;-3&#125;)^2 = 8.99\times10^6\) V/m.
          \(u_E = \tfrac12\varepsilon_0 E^2 \approx 358\) J/m³. Energy density falls as \(r^&#123;-4&#125;\).
        </p>
      </Reveal>
    </section>
  );
}
