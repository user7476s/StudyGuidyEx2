'use client';

import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { OhmVI } from '@/components/interactives/OhmVI';
import { Reveal } from './Reveal';

export function Section94() {
  return (
    <section id="s94" className="mt-8">
      <h2 className="text-2xl font-bold">§9.4 — Ohm&apos;s Law</h2>

      <h3 className="text-lg font-semibold mt-3">Statement</h3>
      <p>
        For many materials over a wide range of operating conditions, the current through a piece
        of conductor is proportional to the voltage across it. With the proportionality constant
        \(R\) (the resistance of §9.3),
        \[\boxed&#123;\,V \;=\; I\,R\,&#125;\quad\Longleftrightarrow\quad I = V/R \quad\Longleftrightarrow\quad R = V/I.\]
        Materials that obey \(V\propto I\) over the range of interest are called <i>ohmic</i>;
        materials whose \(V\)–\(I\) curve is not a straight line through the origin are called
        <i>non-ohmic</i>.
      </p>

      <h3 className="text-lg font-semibold mt-3">It is empirical, not fundamental</h3>
      <p>
        Ohm&apos;s law is not a deep law of nature in the way Maxwell&apos;s equations or
        Newton&apos;s laws are. It is a useful empirical statement that <i>some</i> conductors
        (most metals at modest currents, carbon resistors, etc.) happen to have a linear V–I
        relation. Diodes, transistors, gas-discharge tubes, thermistors, light bulbs at high
        current — these are all real circuit elements that famously violate \(V = IR\) with a
        constant \(R\).
      </p>

      <h3 className="text-lg font-semibold mt-3">Microscopic version</h3>
      <p>
        The microscopic statement that hides behind \(V = IR\) is the linearity \(\vec J = \sigma\vec E\)
        from §9.3. The shape-dependence drops out, and the same proportionality applies pointwise
        inside any uniform ohmic material.
      </p>

      <h3 className="text-lg font-semibold mt-3">Measurement</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>An <b>ammeter</b> measures current; connect it in <i>series</i> with the component (it should have very low resistance so it doesn&apos;t alter \(I\)).</li>
        <li>A <b>voltmeter</b> measures voltage; connect it in <i>parallel</i> across the component (it should have very high resistance so it doesn&apos;t bleed off current).</li>
        <li>Then \(R = V/I\) operationally. For a non-ohmic device this ratio depends on the operating point.</li>
      </ul>

      <Tip title="Three faces, one equation">
        \(V = IR\), \(I = V/R\), and \(R = V/I\) are the same equation. Read the prompt for what is
        given and what is asked, then pick the form that solves for the unknown in one step.
      </Tip>

      <Pitfall title="V = IR does NOT define R">
        \(R\) is a geometric/material property of the component (\(R = \rho L/A\)). \(V = IR\)
        relates two operating quantities. For a non-ohmic device, \(V/I\) is not a single number
        and the &ldquo;resistance&rdquo; depends on where you sit on the V–I curve.
      </Pitfall>

      <ExamTrap title="Ohmic vs non-ohmic">
        A diode is the canonical non-ohmic device: above its threshold voltage the current rises
        exponentially with V, so &ldquo;use Ohm&apos;s law&rdquo; gives nonsense. Watch the prompt
        for the words &ldquo;ohmic&rdquo; or &ldquo;resistor&rdquo; — they tell you it&apos;s safe
        to use \(V = IR\) with a single \(R\).
      </ExamTrap>

      <div className="my-4 not-prose">
        <h3 className="text-lg font-semibold mt-3">Interactive — ohmic vs. non-ohmic</h3>
        <p className="text-sm text-slate-600 mb-2">
          Two devices on the same V–I axes: an ohmic resistor (slope 1/<i>R</i>, slider for <i>R</i>)
          and a silicon diode (Shockley curve). Drag the operating-voltage slider — for the resistor
          <i> V/I</i> stays at exactly <i>R</i>; for the diode, <i>V/I</i> swings by many orders of
          magnitude as <i>V</i> crosses ~0.7 V. That is the empirical content of &ldquo;ohmic&rdquo;.
        </p>
        <OhmVI />
      </div>

      <Connection>
        Ohm&apos;s law is what makes the next chapter (DC circuits, Kirchhoff&apos;s rules,
        series/parallel reduction) tractable. Combine \(V = IR\) with charge conservation at a
        junction and energy conservation around a loop and you can solve any resistor network.
      </Connection>

      <Reveal title="Example 9.10 — Carbon resistor, heated (book Ex 9.8)">
        <p>
          A carbon resistor carries \(I = 3.00\) mA when 9.00 V is across it at 20 °C.
        </p>
        <p>
          (a) Resistance at 20 °C: \(R_0 = V/I = 9.00/(3.00\times10^&#123;-3&#125;) = 3000\) Ω.
        </p>
        <p>
          (b) Heat to 60 °C. With \(\alpha_\text&#123;carbon&#125; = -5.0\times10^&#123;-4&#125;\) °C⁻¹ and
          \(\Delta T = 40\) °C,
          \[R(60\,°\text&#123;C&#125;) = R_0[1 + \alpha\,\Delta T] = 3000\,[1 + (-5\times10^&#123;-4&#125;)(40)] = 3000\cdot 0.98 = 2940\ \Omega.\]
          Apply 9.00 V again: \(I = V/R = 9.00/2940 \approx 3.06\) mA. Carbon&apos;s resistance
          dropped when heated, so the current rose slightly. (Compare a tungsten filament, where
          the resistance <i>rises</i> with T.)
        </p>
      </Reveal>

      <Reveal title="Example 9.11 — Solving for V, I, or R">
        <p>
          (a) Given \(R = 220\) Ω, \(I = 25\) mA: \(V = IR = (25\times10^&#123;-3&#125;)(220) = 5.5\) V.<br/>
          (b) Given \(V = 12\) V, \(R = 4.0\) Ω: \(I = V/R = 3.0\) A.<br/>
          (c) Given \(V = 9.0\) V, \(I = 0.30\) A: \(R = V/I = 30\) Ω.
        </p>
      </Reveal>

      <Reveal title="Example 9.12 — Non-ohmic counterexample: a diode">
        <p>
          A silicon diode has \(I = 0\) until about \(V_D \approx 0.7\) V, beyond which \(I\)
          rises sharply (exponentially with V). The ratio \(V/I\) at one operating point is not
          predictive of the ratio at another — there is no single &ldquo;resistance&rdquo;. Ohm&apos;s
          law does not apply.
        </p>
      </Reveal>

      <Reveal title="CYU 9.7 — A 12 V battery drives 0.50 A through an ohmic device. What is R? (book)">
        <p>\(R = V/I = 12/0.50 = 24\) Ω.</p>
      </Reveal>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P9.4.1 — V = 12 V across R = 4.0 Ω. Find I. Then T rises so that R increases by 10%. Find new I.">
        <p>
          \(I = V/R = 12/4 = 3.0\) A. With \(R \to 1.10\cdot R = 4.4\) Ω,
          \(I = 12/4.4 \approx 2.73\) A.
        </p>
      </Reveal>

      <Reveal title="P9.4.2 — A 60-W light bulb is rated at 120 V. What is the operating-temperature R? Operating I?">
        <p>
          \(P = V^2/R\Rightarrow R = V^2/P = (120)^2/60 = 240\) Ω. \(I = V/R = 0.50\) A. (At room
          temperature the same filament typically reads \(\sim\)20 Ω with an ohmmeter — much lower,
          because tungsten&apos;s α is positive and large.)
        </p>
      </Reveal>

      <Reveal title="P9.4.3 — An ohmic component reads V = 4.5 V at I = 30 mA. Predict V when I = 50 mA.">
        <p>
          \(R = V/I = 4.5/0.030 = 150\) Ω. Same component (ohmic), so
          \(V = IR = (0.050)(150) = 7.5\) V.
        </p>
      </Reveal>

      <Reveal title="P9.4.4 — Which of these is non-ohmic: (i) a copper wire near room T; (ii) a diode; (iii) a carbon resistor at 25 °C; (iv) a tungsten lamp filament cycling from cold to hot?">
        <p>
          (ii) The diode is non-ohmic by design. (iv) The tungsten filament is non-ohmic across the
          large cold→hot temperature swing — \(R\) more than 10× larger when hot. (i) and (iii) are
          effectively ohmic in normal operation.
        </p>
      </Reveal>

      <Reveal title="P9.4.5 — A wire of R = 8.0 Ω is cut in half and the two halves are connected in parallel. New equivalent R?">
        <p>
          Each half has \(R/2 = 4.0\) Ω. Two 4-Ω in parallel: \(R_\text&#123;eq&#125; = 2.0\) Ω. (One
          quarter of the original — \(R\propto L/A\), so halving \(L\) halves \(R\), then paralleling
          halves it again.)
        </p>
      </Reveal>
    </section>
  );
}
