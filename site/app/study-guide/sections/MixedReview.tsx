import { Connection } from '@/components/Callout';
import { Reveal } from './Reveal';

export function MixedReview() {
  return (
    <section id="mixed" className="mt-8">
      <h2 className="text-2xl font-bold">Mixed review — cross-section integrative problems</h2>
      <p>
        These problems each span two or more of §7.1–8.5. They are the closest in spirit to a
        real exam question, where you have to identify which tool from which section applies and
        in what order.
      </p>

      <Reveal title="M1 — Ring → V → E → KE (combines §7.3, §7.4, §7.1)">
        <p>
          A ring of radius \(R=0.20\) m carries \(Q=+5.0\) nC. A point charge \(q=+2.0\) nC of
          mass \(m=1.0\times10^&#123;-9&#125;\) kg is released from rest at \(z=0.50\) m on the axis.
          (a) Find \(V(z)\) on the axis. (b) Find \(E_z(z)\) by gradient. (c) Find the speed of
          \(q\) as it passes through the ring's center.
        </p>
        <p>
          (a) \(V(z) = kQ/\sqrt&#123;R^2+z^2&#125;\). At \(z=0.50\):
          \(V = (8.99\times10^9)(5\times10^&#123;-9&#125;)/\sqrt&#123;0.04+0.25&#125; = 44.95/0.539 = 83.4\) V.
          At \(z=0\): \(V_0 = kQ/R = 44.95/0.20 = 224.8\) V.
        </p>
        <p>
          (b) \(E_z = -dV/dz = kQz/(R^2+z^2)^&#123;3/2&#125;\). At \(z=0.50\):
          \(E_z = (44.95)(0.50)/(0.29)^&#123;3/2&#125; = 22.5/0.156 = 144\) V/m. Points away from ring.
        </p>
        <p>
          (c) Energy conservation: \(q[V(0.5)-V(0)] = -\tfrac12 m v^2\) (charge gains KE moving
          to lower V). \(\Delta U = q\Delta V = (2\times10^&#123;-9&#125;)(83.4-224.8) = -2.83\times10^&#123;-7&#125;\) J.
          \(v = \sqrt&#123;2\cdot 2.83\times10^&#123;-7&#125;/10^&#123;-9&#125;&#125; = \sqrt&#123;565&#125; \approx 23.8\) m/s.
        </p>
      </Reveal>

      <Reveal title="M2 — Spherical capacitor + dielectric + energy (combines §8.1, §8.3, §8.4)">
        <p>
          Concentric spherical capacitor: \(a=2.0\) cm, \(b=4.0\) cm, fill with κ=2.5 dielectric.
          Charge to \(V=200\) V. Find C, Q, U, and the energy density at \(r=3.0\) cm.
        </p>
        <p>
          \(C_0 = 4\pi\varepsilon_0\,ab/(b-a) = (0.02)(0.04)/(8.99\times10^9 \cdot 0.02) = 4.45\) pF.
          \(C = \kappa C_0 = 11.1\) pF. \(Q = CV = 11.1\times10^&#123;-12&#125;\cdot 200 = 2.22\) nC.
          \(U = \tfrac12 CV^2 = \tfrac12(11.1\times10^&#123;-12&#125;)(200)^2 = 2.22\times10^&#123;-7&#125;\) J = 222 nJ.
        </p>
        <p>
          At \(r=3\) cm, the field inside the dielectric is \(E = kQ/(\kappa r^2) =
          (8.99\times10^9)(2.22\times10^&#123;-9&#125;)/(2.5\cdot 9\times10^&#123;-4&#125;) = 8.87\times10^3\) V/m.
          Energy density \(u_E = \tfrac12 \kappa\varepsilon_0 E^2 = \tfrac12(2.5)(8.854\times10^&#123;-12&#125;)(8870)^2
          = 8.71\times10^&#123;-4&#125;\) J/m³.
        </p>
      </Reveal>

      <Reveal title="M3 — Network reduction + energy distribution (combines §8.2, §8.3)">
        <p>
          C₁=4 μF in series with the parallel combination of C₂=6 μF and C₃=3 μF, across 24 V.
          Find U on each capacitor.
        </p>
        <p>
          Parallel block: \(C_&#123;23&#125; = 6+3 = 9\) μF. Series with C₁:
          \(1/C_\text&#123;eq&#125; = 1/4 + 1/9 = 13/36\Rightarrow C_\text&#123;eq&#125; = 36/13 = 2.77\) μF.
          Total Q from battery = \(2.77\times10^&#123;-6&#125;\cdot 24 = 66.5\) μC.
          \(V_1 = Q/C_1 = 66.5/4 = 16.6\) V; \(V_&#123;23&#125; = 24-16.6 = 7.38\) V.
          \(Q_2 = 6\cdot 7.38 = 44.3\) μC; \(Q_3 = 3\cdot 7.38 = 22.2\) μC.
          \(U_1 = \tfrac12(4)(16.6)^2 = 553\) μJ;
          \(U_2 = \tfrac12(6)(7.38)^2 = 163\) μJ;
          \(U_3 = \tfrac12(3)(7.38)^2 = 81.7\) μJ.
          Sum: 798 μJ. Cross-check: \(\tfrac12 C_\text&#123;eq&#125;V^2 = \tfrac12(2.77\times10^&#123;-6&#125;)(24)^2 = 798\) μJ ✓.
        </p>
      </Reveal>

      <Reveal title="M4 — V(x,y,z) → E → force → trajectory (combines §7.4, §7.1)">
        <p>
          A region has \(V(x,y,z) = 2x^2 - 3yz + 5z\) V (x,y,z in meters). A proton (q = +e,
          m = 1.67×10⁻²⁷ kg) sits at rest at (1, 1, 1). Find the initial force vector and the
          initial acceleration magnitude.
        </p>
        <p>
          \(\vec E = -\nabla V\). \(E_x = -4x = -4\); \(E_y = 3z = 3\); \(E_z = 3y - 5 = -2\).
          \(\vec E (1,1,1) = (-4, 3, -2)\) V/m.
          \(\vec F = e\vec E = (1.6\times10^&#123;-19&#125;)(-4, 3, -2) = (-6.4, 4.8, -3.2)\times10^&#123;-19&#125;\) N.
          \(|\vec F| = 1.6\times10^&#123;-19&#125;\sqrt&#123;16+9+4&#125; = 1.6\times10^&#123;-19&#125;\sqrt&#123;29&#125; = 8.62\times10^&#123;-19&#125;\) N.
          \(|\vec a| = F/m = 8.62\times10^&#123;-19&#125;/1.67\times10^&#123;-27&#125; = 5.16\times10^8\) m/s².
        </p>
      </Reveal>

      <Reveal title="M5 — Battery-connected vs disconnected dielectric swap (combines §8.3, §8.4)">
        <p>
          C₀ = 10 μF charged through a battery to V₀ = 50 V. A κ=4 dielectric is then inserted.
          Compare two protocols: (A) battery stays connected; (B) battery disconnected before
          insertion. For each, find final Q, V, U, and the energy supplied by the battery.
        </p>
        <p>
          Initial: \(Q_0 = 500\) μC, \(U_0 = \tfrac12(10\mu)(50)^2 = 12.5\) mJ.
        </p>
        <p>
          (A) Battery on, V fixed at 50 V. \(C = 40\) μF. \(Q = 2000\) μC. \(U = \tfrac12(40\mu)(50)^2 = 50\) mJ.
          ΔQ = 1500 μC. \(W_\text&#123;batt&#125; = V\Delta Q = 50\cdot 1.5\times10^&#123;-3&#125; = 75\) mJ.
          ΔU = 37.5 mJ. Dissipated: 37.5 mJ. Half-and-half, as expected.
        </p>
        <p>
          (B) Battery off, Q fixed at 500 μC. \(C = 40\) μF. \(V = Q/C = 12.5\) V (dropped by κ).
          \(U = Q^2/(2C) = (5\times10^&#123;-4&#125;)^2/(8\times10^&#123;-5&#125;) = 3.125\) mJ (dropped by κ).
          Battery does no work (disconnected). Missing 9.375 mJ went into work done by the field
          pulling the dielectric in.
        </p>
      </Reveal>

      <Reveal title="M6 — Work to assemble a 4-charge square + V at center (combines §7.1, §7.3)">
        <p>
          Four point charges \(q=+2.0\) nC sit at the corners of a square of side \(L=0.10\) m.
          (a) Find the total work needed to assemble the configuration. (b) Find \(V\) at the
          center.
        </p>
        <p>
          (a) Sum once over distinct pairs \(i&lt;j\) (6 pairs total): 4 side pairs at \(L\) plus
          2 diagonal pairs at \(L\sqrt&#123;2&#125;\).
          \(U=kq^2\left[\dfrac&#123;4&#125;&#123;L&#125;+\dfrac&#123;2&#125;&#123;L\sqrt&#123;2&#125;&#125;\right]
          =\dfrac&#123;kq^2&#125;&#123;L&#125;(4+\sqrt&#123;2&#125;)
          =\dfrac&#123;(8.99\times10^9)(2\times10^&#123;-9&#125;)^2&#125;&#123;0.10&#125;(5.414)
          \approx 1.95\) μJ.
        </p>
        <p>
          (b) Each corner sits at distance \(L\sqrt&#123;2&#125;/2\) from the center.
          \(V_&#123;center&#125;=4\cdot\dfrac&#123;kq&#125;&#123;L\sqrt&#123;2&#125;/2&#125;
          =\dfrac&#123;8kq&#125;&#123;L\sqrt&#123;2&#125;&#125;
          \approx 1.02\times 10^3\) V. Common trap: forgetting that \(V\) sums scalarly while
          forces would cancel by symmetry — the answer is not zero.
        </p>
      </Reveal>

      <Reveal title="M7 — Conducting shell + point charge: V(r) piecewise (combines §7.5, §5.6 review)">
        <p>
          A point charge \(q=+5.0\) nC sits at the center of an uncharged thick conducting shell
          with inner radius \(a=2.0\) cm and outer radius \(b=5.0\) cm. Find \(V(r)\) at three
          locations: just outside the outer surface, anywhere inside the conductor, and at the
          inner cavity surface. Find \(\vec E\) at those same points.
        </p>
        <p>
          Induced charges: inner surface gets \(-q\), outer surface gets \(+q\) (shell stays
          neutral overall). Outside (\(r&gt;b\)): the shell acts as a single point charge \(+q\)
          at the origin. \(V(b)=kq/b=(8.99\times10^9)(5\times10^&#123;-9&#125;)/0.05=899\) V.
          \(E(b^+) = kq/b^2 = 1.80\times10^4\) V/m.
        </p>
        <p>
          Inside the conductor (\(a&lt;r&lt;b\)): \(\vec E=0\) and \(V\) is constant at the
          conductor's value, which equals \(V(b)=899\) V.
        </p>
        <p>
          At the inner cavity surface (\(r=a\)): \(V\) is continuous, so \(V(a)=V(b)=899\) V.
          \(E(a^+)=kq/a^2=1.12\times10^5\) V/m (from the central charge, since the induced
          \(-q\) is on the surface). The classic trap: the inner cavity sits at the
          <i>conductor's</i> potential, not at \(kq/a\).
        </p>
      </Reveal>

      <Reveal title="M8 — Two parallel-plate caps in series with different κ slabs (combines §8.2, §8.4)">
        <p>
          Two identical empty parallel-plate capacitors of area \(A\) and gap \(d\) are wired in
          series across a battery. Cap 1 is filled with a slab of \(\kappa_1=2\), Cap 2 with
          \(\kappa_2=5\). The series combination is connected to \(V=12\) V. Find \(C_&#123;eq&#125;\),
          \(Q\) on each, and \(V_1, V_2\).
        </p>
        <p>
          Each empty cap: \(C_0=\varepsilon_0 A/d\). With dielectric, \(C_i=\kappa_i C_0\). In
          series, \(\dfrac&#123;1&#125;&#123;C_&#123;eq&#125;&#125;
          =\dfrac&#123;1&#125;&#123;\kappa_1 C_0&#125;+\dfrac&#123;1&#125;&#123;\kappa_2 C_0&#125;
          \Rightarrow C_&#123;eq&#125;=\dfrac&#123;\kappa_1\kappa_2&#125;&#123;\kappa_1+\kappa_2&#125;C_0
          =\dfrac&#123;10&#125;&#123;7&#125;C_0\).
        </p>
        <p>
          Series ⇒ same \(Q\) on both: \(Q=C_&#123;eq&#125;V\). Then
          \(V_1=Q/C_1=Q/(2C_0)\) and \(V_2=Q/C_2=Q/(5C_0)\). Ratio
          \(V_1/V_2=\kappa_2/\kappa_1=5/2\) — the <i>smaller</i> dielectric constant takes the
          <i>larger</i> share of the voltage, because it's the weaker capacitor. With
          \(V_1+V_2=12\) V: \(V_1=12\cdot 5/7 \approx 8.57\) V, \(V_2=12\cdot 2/7 \approx 3.43\) V.
          Common trap: swapping which slab gets which voltage.
        </p>
      </Reveal>

      <Reveal title="M9 — Disk charge → V on axis → small/large-z limits + E_z (combines §7.3, §7.4)">
        <p>
          A uniformly charged disk of radius \(R=0.10\) m carries surface density
          \(\sigma=1.0\) μC/m². (a) Find \(V(z)\) on the axis. (b) Take the
          \(z\to 0^+\) limit. (c) Take the \(z\gg R\) limit and reconcile with the point-charge
          formula. (d) Differentiate to get \(E_z(z)\) and evaluate at \(z=0.20\) m.
        </p>
        <p>
          (a) Integrate over thin rings:
          \(V(z)=\dfrac&#123;\sigma&#125;&#123;2\varepsilon_0&#125;\bigl(\sqrt&#123;R^2+z^2&#125;-|z|\bigr)\).
        </p>
        <p>
          (b) At \(z=0\): \(V(0)=\sigma R/(2\varepsilon_0)
          =(10^&#123;-6&#125;)(0.10)/(2\cdot 8.854\times10^&#123;-12&#125;)
          \approx 5.65\times10^3\) V — finite, despite the \(1/r\) singularity in each
          element. The integral tames the divergence.
        </p>
        <p>
          (c) For \(z\gg R\): \(\sqrt&#123;R^2+z^2&#125;\approx z+R^2/(2z)\), so
          \(V\to \sigma R^2/(4\varepsilon_0 z)=kQ/z\) with \(Q=\sigma\pi R^2\). Recovers the
          point-charge potential, as required.
        </p>
        <p>
          (d) \(E_z=-dV/dz=\dfrac&#123;\sigma&#125;&#123;2\varepsilon_0&#125;\Bigl[1-\dfrac&#123;z&#125;&#123;\sqrt&#123;R^2+z^2&#125;&#125;\Bigr]\).
          At \(z=0.20\): \(E_z=\dfrac&#123;10^&#123;-6&#125;&#125;&#123;2(8.854\times10^&#123;-12&#125;)&#125;
          \bigl[1-0.20/\sqrt&#123;0.05&#125;\bigr]\approx 5.96\times10^3\) V/m.
        </p>
      </Reveal>

      <Reveal title="M10 — Charging a capacitor through a resistor: energy budget (§8.3)">
        <p>
          A 100 μF capacitor is charged from 0 to \(V=12\) V through a series resistor by an
          ideal battery. Without solving the time evolution, do an energy budget: how much work
          does the battery do, how much is stored on the capacitor, how much is dissipated in
          the resistor? Show the answer is independent of \(R\).
        </p>
        <p>
          The battery moves total charge \(Q=CV\) across its terminals at fixed terminal voltage
          \(V\). \(W_&#123;batt&#125;=QV=CV^2=(100\times10^&#123;-6&#125;)(144)=14.4\) mJ.
        </p>
        <p>
          Final stored energy: \(U=\tfrac12 CV^2 = 7.2\) mJ.
        </p>
        <p>
          Energy conservation: \(W_&#123;diss&#125;=W_&#123;batt&#125;-U=7.2\) mJ. Exactly half the
          battery's work ends up in the resistor — no matter how big or small \(R\) is. (For
          smaller \(R\) the current is briefly larger but the dissipation duration is shorter;
          the integral is invariant.) Universal "factor of 2" result that often surprises
          students.
        </p>
      </Reveal>

      <Reveal title="M11 — Two charged caps reconnected in parallel: where did the energy go? (§8.2, §8.3)">
        <p>
          Cap C₁ = 6 μF is charged to V_a = 10 V; Cap C₂ = 3 μF is charged independently to
          V_b = 4 V (same polarity). The batteries are disconnected, then the two caps are
          wired plate-to-plate in parallel. Find the final common voltage, and compute the
          energy stored before vs. after.
        </p>
        <p>
          Charge is conserved (isolated system): \(Q_&#123;tot&#125;=C_1 V_a+C_2 V_b=60+12=72\) μC.
          \(V_f=Q_&#123;tot&#125;/(C_1+C_2)=72/9=8\) V.
        </p>
        <p>
          \(U_i=\tfrac12 C_1 V_a^2+\tfrac12 C_2 V_b^2=300+24=324\) μJ.
          \(U_f=\tfrac12(C_1+C_2)V_f^2=\tfrac12(9)(64)=288\) μJ.
          \(\Delta U=-36\) μJ — energy is <i>lost</i>, despite both caps being passive components.
          It dissipates as Joule heating in the connecting wires (and as EM radiation in the
          idealized R=0 limit). The classic confusion: students often expect energy to be
          conserved when charge is — but only one of those is conserved here.
        </p>
      </Reveal>

      <Reveal title="M12 — Cylindrical capacitor with dielectric: C/L, σ, energy per length (§8.1, §8.4)">
        <p>
          A cylindrical capacitor has inner radius \(a=5.0\) mm, outer radius \(b=20\) mm, and a
          dielectric of \(\kappa=3.0\) fills the gap. Across \(V=60\) V, find: (a)
          capacitance per length; (b) surface charge density on the inner conductor; (c) stored
          energy per length, via two routes (formula and field-energy integral).
        </p>
        <p>
          (a) \(C/L=\dfrac&#123;2\pi\kappa\varepsilon_0&#125;&#123;\ln(b/a)&#125;
          =\dfrac&#123;2\pi(3)(8.854\times10^&#123;-12&#125;)&#125;&#123;\ln 4&#125;
          \approx 1.20\times10^&#123;-10&#125;\) F/m = 120 pF/m.
        </p>
        <p>
          (b) Charge per length \(\lambda=(C/L)V\approx 7.22\times10^&#123;-9&#125;\) C/m.
          \(\sigma_&#123;inner&#125;=\lambda/(2\pi a)
          =7.22\times10^&#123;-9&#125;/(2\pi\cdot 0.005)\approx 2.30\times10^&#123;-7&#125;\) C/m².
        </p>
        <p>
          (c) Route 1 — formula: \(U/L=\tfrac12 (C/L) V^2\approx 2.17\times10^&#123;-7&#125;\) J/m.
          Route 2 — integrate \(u_E=\tfrac12\kappa\varepsilon_0 E^2\) with
          \(E(r)=\lambda/(2\pi\kappa\varepsilon_0 r)\):
          \(U/L=\displaystyle\int_a^b u_E\,(2\pi r)\,dr
          =\dfrac&#123;\lambda^2&#125;&#123;4\pi\kappa\varepsilon_0&#125;\ln(b/a)
          \approx 2.17\times10^&#123;-7&#125;\) J/m. Routes agree — as required by
          \(U=Q^2/(2C)\) with \(Q=\lambda L\). Worth doing both: in the integral, the κ in the
          denominator of \(E\) and the κ in \(u_E\) combine to give a single 1/κ — exactly what
          makes the dielectric <i>store</i> energy more efficiently at fixed Q.
        </p>
      </Reveal>
    </section>
  );
}
