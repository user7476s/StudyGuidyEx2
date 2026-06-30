'use client';

import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { DriftVelocity } from '@/components/interactives/DriftVelocity';
import { Reveal } from './Reveal';

export function Section92() {
  return (
    <section id="s92" className="mt-8">
      <h2 className="text-2xl font-bold">§9.2 — Model of Conduction in Metals</h2>

      <h3 className="text-lg font-semibold mt-3">Picture</h3>
      <p>
        Free electrons in a metal move at high thermal speeds (\(\sim 10^6\) m/s) in random
        directions, colliding constantly with lattice ions. When an external field \(\vec E\) is
        applied, a small, steady <i>drift</i> velocity \(\vec v_d\) is superimposed on top of the
        random motion — slow (mm/s) but unidirectional. That tiny biased drift is what carries
        the current.
      </p>

      <h3 className="text-lg font-semibold mt-3">Derivation of \(I = nqv_d A\)</h3>
      <p>
        Let \(n\) = number density of mobile carriers (carriers per m³), \(q\) = charge per carrier,
        \(A\) = cross-sectional area, and \(v_d\) = drift speed. In a small time \(dt\) every
        carrier within a distance \(v_d\,dt\) of the chosen cross-section will cross it. The number
        of such carriers is \((n)\cdot(A\cdot v_d\,dt)\); the charge that crosses is
        \(dQ = q\,n\,A\,v_d\,dt\). Dividing by \(dt\),
        \[\boxed&#123;\,I \;=\; n\,q\,A\,v_d\,&#125;\]
        and the corresponding <i>current density</i> (current per unit area) is
        \[\boxed&#123;\,J \;=\; I/A \;=\; n\,q\,v_d\,&#125;\quad\text&#123;(A/m²).&#125;\]
        For metals, \(q = -e\) (negative); for ionic solutions both signs contribute.
      </p>

      <h3 className="text-lg font-semibold mt-3">Sign conventions &amp; units</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>\(n\) has units of m⁻³. For copper, \(n \approx 8.34\times10^&#123;28&#125;\) m⁻³ (one conduction electron per atom).</li>
        <li>\(v_d\) is a drift <i>vector</i>; its sign in the wire is set by the sign of \(q\) and the direction of \(\vec E\).</li>
        <li>For electrons (\(q&lt;0\)), \(\vec v_d\) points opposite to \(\vec E\), so positive-current direction (\(\vec J\propto +q\vec v_d\)) still points along \(\vec E\).</li>
        <li>\(J\) is in A/m²; do not confuse with current \(I\) in A.</li>
      </ul>

      <Tip title="Why signals are fast but drift is slow">
        Flipping a light switch turns the bulb on essentially instantly because the electric field
        propagates at \(\sim c\) — every electron in the wire feels the push almost simultaneously.
        Individual electrons crawl at \(\sim\) mm/s. The signal speed and the drift speed are
        completely different quantities.
      </Tip>

      <Pitfall title="n is a density, not a count">
        \(n\) is &ldquo;carriers per cubic meter,&rdquo; not a total count \(N\). Doubling the wire
        length increases \(N\) but leaves \(n\) unchanged, so it leaves \(I\) at fixed \(v_d\)
        unchanged too.
      </Pitfall>

      <ExamTrap title="Units of n">
        A frequent slip is writing \(n\) in cm⁻³ (a chemist&apos;s habit) but \(v_d\) in m/s and
        \(A\) in m². Mixing m and cm in \(I = nqAv_d\) misses by 10⁶. Keep all lengths in SI.
      </ExamTrap>

      <div className="my-4 not-prose">
        <h3 className="text-lg font-semibold mt-3">Interactive — drift velocity</h3>
        <p className="text-sm text-slate-600 mb-2">
          Watch \(v_d = I/(n\,q\,A)\) live as you change the current, the wire diameter, and the
          carrier population. The blue arrow underneath the wire represents the field, which
          propagates at \(\sim c\) regardless of how slowly the carriers actually drift.
        </p>
        <DriftVelocity />
      </div>

      <Connection>
        \(I = nqAv_d\) connects the microscopic picture (carriers, density, individual speed) to
        the macroscopic measurement (current). When you take this picture and tack on collisions
        producing an effective &ldquo;friction&rdquo;, the next section&apos;s definitions of
        resistivity and resistance fall right out.
      </Connection>

      <Reveal title="Example 9.4 — Drift velocity in 12-gauge Cu carrying 20 A (book Ex 9.3)">
        <p>
          12-gauge copper has diameter \(d = 2.053\) mm, area
          \(A = \pi(d/2)^2 \approx 3.31\times10^&#123;-6&#125;\) m². With copper&apos;s mass density
          \(\rho_m = 8.80\times10^3\) kg/m³ and molar mass 63.5 g/mol, one conduction electron
          per atom gives
          \(n = N_A\,\rho_m/M \approx 8.34\times10^&#123;28&#125;\) m⁻³. Then
          \[v_d = \dfrac&#123;I&#125;&#123;n\,e\,A&#125; = \dfrac&#123;20&#125;&#123;(8.34\times10^&#123;28&#125;)(1.6\times10^&#123;-19&#125;)(3.31\times10^&#123;-6&#125;)&#125; \approx 4.5\times10^&#123;-4&#125;\ \text&#123;m/s&#125;.\]
          About 0.45&nbsp;mm/s — the &ldquo;painfully slow&rdquo; intuition.
        </p>
      </Reveal>

      <Reveal title="Example 9.5 — Current density in a 100 W lamp filament wire (book Ex 9.4)">
        <p>
          A 100 W bulb draws \(I = 0.87\) A through a 10-gauge copper wire (\(d = 2.588\) mm,
          \(A \approx 5.26\times10^&#123;-6&#125;\) m²). Then
          \(J = I/A \approx 1.65\times10^5\) A/m². The number density \(n\) is the same as 12-gauge
          (it&apos;s the same copper), so the drift speed scales down with \(J\):
          \(v_d = J/(n\,e) \approx 1.2\times10^&#123;-5&#125;\) m/s.
        </p>
      </Reveal>

      <Reveal title="Example 9.6 — Effect of wire gauge (smaller wire, same I)">
        <p>
          The 12-gauge wire above at 20 A gave \(v_d \approx 4.5\times10^&#123;-4&#125;\) m/s. Move
          to 14-gauge (\(d = 1.628\) mm, \(A \approx 2.08\times10^&#123;-6&#125;\) m²) at the same
          20 A: \(v_d\) scales as \(1/A\), so \(v_d \approx 7.2\times10^&#123;-4&#125;\) m/s. Same
          \(n\), same \(I\) — narrower wire means faster drift.
        </p>
      </Reveal>

      <Reveal title="CYU 9.3 — Number of electrons crossing in 1 s (book)">
        <p>
          In the 12-gauge / 20 A example, the number of electrons per second crossing any cross
          section is \(N/\text&#123;s&#125; = I/e = 20/(1.6\times10^&#123;-19&#125;) \approx 1.25\times10^&#123;20&#125;\)
          per second. (Even at glacial individual speeds, the carrier supply is vast.)
        </p>
      </Reveal>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P9.2.1 — A copper wire of area A = 1.0×10⁻⁶ m² carries I = 2.0 A. Find v_d.">
        <p>
          \(v_d = I/(nqA) = 2.0/((8.34\times10^&#123;28&#125;)(1.6\times10^&#123;-19&#125;)(1.0\times10^&#123;-6&#125;))
          \approx 1.5\times10^&#123;-4&#125;\) m/s ≈ 0.15 mm/s.
        </p>
      </Reveal>

      <Reveal title="P9.2.2 — Same copper wire, but I drops to 0.50 A. New drift speed?">
        <p>
          \(v_d \propto I\) at fixed \(n,A\), so \(v_d\) drops to \(\tfrac14\) of P9.2.1:
          \(\approx 3.8\times10^&#123;-5&#125;\) m/s.
        </p>
      </Reveal>

      <Reveal title="P9.2.3 — Find the current density when I = 0.50 A in a wire of diameter 0.50 mm.">
        <p>
          \(A = \pi(0.25\times10^&#123;-3&#125;)^2 \approx 1.96\times10^&#123;-7&#125;\) m²;
          \(J = I/A \approx 2.55\times10^6\) A/m².
        </p>
      </Reveal>

      <Reveal title="P9.2.4 — A semiconductor has n = 1.0×10²² m⁻³, A = 1.0×10⁻⁶ m². I = 1.0 mA. Find v_d.">
        <p>
          \(v_d = I/(nqA) = 10^&#123;-3&#125;/((10^&#123;22&#125;)(1.6\times10^&#123;-19&#125;)(10^&#123;-6&#125;))
          \approx 0.63\) m/s. Far faster than in a metal because \(n\) is many orders smaller.
        </p>
      </Reveal>

      <Reveal title="P9.2.5 — In Cu, how does v_d in a 24-gauge wire (A ≈ 2.05×10⁻⁷ m²) at 0.50 A compare to v_d in a 12-gauge wire at 20 A?">
        <p>
          24-gauge / 0.50 A: \(v_d = (0.50)/((8.34\times10^&#123;28&#125;)(1.6\times10^&#123;-19&#125;)(2.05\times10^&#123;-7&#125;))
          \approx 1.83\times10^&#123;-4&#125;\) m/s. 12-gauge / 20 A from Ex&nbsp;9.4: \(4.5\times10^&#123;-4&#125;\) m/s.
          The 24-gauge case is slower despite being a narrower wire, because the current is 40× smaller.
        </p>
      </Reveal>
    </section>
  );
}
