import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { Reveal } from './Reveal';

export function Section84() {
  return (
    <section id="s84" className="mt-8">
      <h2 className="text-2xl font-bold">§8.4 — Capacitor with a Dielectric</h2>

      <h3 className="text-lg font-semibold mt-3">Definition</h3>
      <p>
        Slide an insulating slab between the plates. The molecules polarize; bound surface
        charges \(\pm\sigma_b\) appear on the slab&apos;s faces, partially cancelling the field
        produced by the free charge on the plates. The result is captured by a single number,
        the dielectric constant \(\kappa\ge 1\):
        \[\boxed&#123;\,C = \kappa C_0,\quad C_0 = \varepsilon_0 A/d.&#125;\]
        For a fully-filled parallel-plate device, \(C=\kappa\varepsilon_0 A/d\). For other
        geometries, every \(\varepsilon_0\) factor in §8.1 is replaced by \(\kappa\varepsilon_0\).
      </p>

      <h3 className="text-lg font-semibold mt-3">Two scenarios — pick the invariant</h3>

      <p>
        <b>(A) Battery remains connected — V is held fixed.</b>
      </p>
      <ul className="list-disc ml-5">
        <li>C: \(C\to\kappa C_0\)</li>
        <li>Q: \(Q = CV \to \kappa Q_0\) (battery pushes more charge in)</li>
        <li>E in gap: \(E=V/d\) unchanged</li>
        <li>U: \(U = \tfrac12 CV^2\to\kappa U_0\)</li>
        <li>Battery does work \(\Delta W_\text&#123;batt&#125; = V\Delta Q = (\kappa-1)Q_0V\); half goes to ΔU, half is dissipated.</li>
      </ul>

      <p>
        <b>(B) Battery disconnected — Q is held fixed.</b>
      </p>
      <ul className="list-disc ml-5">
        <li>C: \(C\to\kappa C_0\)</li>
        <li>V: \(V = Q/C \to V_0/\kappa\)</li>
        <li>E in gap: \(E\to E_0/\kappa\) (bound charge partially cancels free-charge field)</li>
        <li>U: \(U = Q^2/(2C)\to U_0/\kappa\) — energy drops; the dielectric was pulled into the gap by the attractive force on its bound charges.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-3">Sign conventions &amp; units</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>κ is dimensionless; κ = 1 for vacuum, ≈ 1.00059 for air, 3.7 for paper, 80 for water.</li>
        <li>Dielectric strength = maximum E before breakdown. Air ≈ 3×10⁶ V/m, mica ≈ 100×10⁶ V/m.</li>
        <li>Energy density inside the dielectric: \(u_E = \tfrac12 \kappa\varepsilon_0 E^2\), where E is the field <i>inside</i> the dielectric.</li>
      </ul>

      <Tip title="Decision tree">
        Step 1: Is the battery connected? If yes, V is fixed; if no, Q is fixed.
        Step 2: Apply C → κC₀.
        Step 3: From the fixed quantity, compute the new value of the changing quantity.
        Step 4: Compute new U with whichever form keeps you using the fixed quantity.
      </Tip>

      <Pitfall>
        Treating C as if it changed because of charge or voltage. It changes because the
        material between the plates changed. C is geometry + material; Q and V are downstream
        consequences.
      </Pitfall>

      <ExamTrap>
        Multi-step problems where the battery is connected, dielectric inserted, then the
        battery is disconnected before more changes are applied. The invariant <i>changes</i>
        mid-problem — Q after disconnection is whatever Q value applied at the moment of
        disconnect, not Q₀.
      </ExamTrap>

      <Reveal title="Example — battery connected, κ=2 dielectric inserted (C₀=4 μF, V₀=12 V)">
        <p>
          New \(C = 2\cdot 4 = 8\) μF. V stays 12 V. \(Q' = CV = 96\) μC (was 48 μC).
          \(U' = \tfrac12 CV^2 = 576\) μJ (was 288 μJ — doubled).
          Battery delivered \(\Delta Q\cdot V = 576\) μJ — twice ΔU. Half went into U, half was
          dissipated in the connecting wires.
        </p>
      </Reveal>

      <Reveal title="Example — battery disconnected, then κ=2 dielectric inserted (C₀=4 μF, V₀=12 V)">
        <p>
          Q stays \(Q_0=48\) μC. New \(C=8\) μF, so \(V'=Q/C=6\) V (halved).
          \(U' = Q^2/(2C) = (48\times10^&#123;-6&#125;)^2/(16\times10^&#123;-6&#125;) = 144\) μJ (was 288 μJ — halved).
          The energy that disappeared went into the work done by the field on the dielectric as
          it was drawn into the gap.
        </p>
      </Reveal>

      <Reveal title="CYU 8.7 — Dielectric inserted into isolated charged capacitor (book)">
        <p>
          Q fixed ⇒ V drops by factor κ; E in the gap drops by factor κ; energy drops by factor κ.
        </p>
      </Reveal>

      <Connection>
        §8.4 is the &ldquo;what changes vs what stays&rdquo; section. §8.5 explains <i>why</i>
        the field drops by κ in the dielectric: aligned dipoles produce a bound-charge field
        that opposes the free-charge field.
      </Connection>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P8.4.1 — Parallel-plate capacitor A=2.0 cm², d=0.50 mm, κ=4.0. Find C.">
        <p>
          \(C = \kappa\varepsilon_0 A/d = 4.0(8.854\times10^&#123;-12&#125;)(2\times10^&#123;-4&#125;)/(5\times10^&#123;-4&#125;)
          = 1.42\times10^&#123;-11&#125;\) F = 14.2 pF. Four times the vacuum value.
        </p>
      </Reveal>

      <Reveal title="P8.4.2 — 5.0 μF cap at 24 V, battery connected, mineral oil (κ=4.5) inserted. Find new Q, U.">
        <p>
          \(C' = 4.5(5) = 22.5\) μF. V stays 24 V.
          \(Q' = 22.5(24) = 540\) μC; \(U' = \tfrac12(22.5\times10^&#123;-6&#125;)(24)^2 = 6.48\times10^&#123;-3&#125;\) J = 6.48 mJ.
          Original Q=120 μC, U=1.44 mJ. ΔU = 5.04 mJ; battery did 24·(540−120)μC=10.08 mJ; half dissipated.
        </p>
      </Reveal>

      <Reveal title="P8.4.3 — Same 5.0 μF at 24 V, but battery disconnected before oil insertion.">
        <p>
          Q stays 120 μC. C' = 22.5 μF. V' = 120/22.5 = 5.33 V. U' = Q²/(2C') = (120e-6)²/(45e-6) = 3.2×10⁻⁴ J = 0.32 mJ.
          Original 1.44 mJ. Energy fell by factor κ=4.5.
        </p>
      </Reveal>

      <Reveal title="P8.4.4 — A dielectric (κ=3.0) only half-fills the gap (a slab of thickness d/2 plus d/2 vacuum). Find C.">
        <p>
          Treat as two capacitors in series, each with area A:
          \(C_1=\kappa\varepsilon_0 A/(d/2)=2\kappa\varepsilon_0 A/d=6\varepsilon_0 A/d\).
          \(C_2=2\varepsilon_0 A/d\). Series: \(1/C = 1/(6c)+1/(2c) = 4/(6c) = 2/(3c)\) where \(c=\varepsilon_0 A/d\).
          \(C = 1.5\,\varepsilon_0 A/d\). Compare with κC₀ = 3 — partial filling gives 1.5, less than 3.
        </p>
      </Reveal>

      <Reveal title="P8.4.5 — Maximum voltage on a 1.0 nF parallel-plate cap with κ=4, dielectric strength 20 MV/m, d=2.0 mm.">
        <p>
          \(V_\text&#123;max&#125; = E_\text&#123;break&#125;\cdot d = 2\times10^7\cdot 2\times10^&#123;-3&#125; = 4\times10^4\) V = 40 kV.
          \(Q_\text&#123;max&#125;=CV_\text&#123;max&#125;=4\times10^&#123;-5&#125;\) C = 40 μC.
          \(U_\text&#123;max&#125; = \tfrac12 CV^2 = \tfrac12(10^&#123;-9&#125;)(4\times10^4)^2 = 0.80\) J.
        </p>
      </Reveal>
    </section>
  );
}
