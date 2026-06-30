'use client';

import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { Reveal } from './Reveal';

export function Section91() {
  return (
    <section id="s91" className="mt-8">
      <h2 className="text-2xl font-bold">§9.1 — Electrical Current</h2>

      <h3 className="text-lg font-semibold mt-3">Definition</h3>
      <p>
        Electric current is the rate at which net charge crosses a chosen cross-sectional area
        of a conductor. Picking a direction across the surface,
        \[\boxed&#123;\,I \;=\; \dfrac&#123;dQ&#125;&#123;dt&#125;\,&#125;\]
        with the SI unit the <i>ampere</i>, 1&nbsp;A = 1&nbsp;C/s. When the current is steady,
        \(I = \Delta Q / \Delta t\); when it varies in time the instantaneous current is the
        derivative and the total charge that has crossed in a time interval is
        \(Q = \int I\,dt\).
      </p>

      <h3 className="text-lg font-semibold mt-3">Conventional current vs. electron flow</h3>
      <p>
        By <i>convention</i> (Franklin&apos;s convention, set before the electron was discovered),
        the direction of \(I\) is the direction in which <i>positive</i> charge would flow. In an
        ordinary metallic wire the actual mobile carriers are the conduction electrons; they drift
        in the direction <i>opposite</i> to \(I\). The conventional-current arrow on a circuit diagram
        therefore points from the \(+\) terminal of the battery, through the external circuit, into
        the \(-\) terminal — opposite to the actual electron drift.
      </p>

      <h3 className="text-lg font-semibold mt-3">Sign conventions &amp; units</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>1&nbsp;A = 1&nbsp;C/s. Typical lab currents: mA to a few A. Lightning: \(\sim\)10⁴ A.</li>
        <li>\(I\) is a signed scalar relative to a chosen positive direction along the conductor; reversing the chosen direction flips its sign.</li>
        <li>Current has no &ldquo;velocity vector&rdquo; — drift speed is a separate quantity (§9.2).</li>
        <li>A closed (complete) circuit is required for a steady current: charge cannot pile up indefinitely on a dead end.</li>
      </ul>

      <Tip title="Average vs. instantaneous">
        For steady currents (a battery driving a resistor) \(I_\text&#123;avg&#125;=I_\text&#123;inst&#125;\),
        and dimensional analysis with \(I = Q/t\) is usually enough. For pulses (defibrillators,
        camera flashes) the instantaneous current can be many times the average — use \(I=dQ/dt\)
        and integrate.
      </Tip>

      <Pitfall title="Direction confusion">
        Drawing the arrow on a wire to show &ldquo;where the electrons go&rdquo; gives the wrong
        sign for \(I\). The arrow on \(I\) is the conventional (positive-charge-flow) direction —
        opposite to the actual electron drift in a metal.
      </Pitfall>

      <ExamTrap title="Integrating I(t)">
        When \(I\) varies (\(I = I_0 e^&#123;-t/\tau&#125;\) for an RC discharge, etc.), the charge
        that flows between \(t_1\) and \(t_2\) is \(Q = \int_&#123;t_1&#125;^&#123;t_2&#125; I\,dt\),
        <i>not</i> \(I\cdot\Delta t\). Watch the prompt: &ldquo;total charge&rdquo; almost always
        means do the integral.
      </ExamTrap>

      <Connection>
        Current is the bridge from electrostatics (Ch.&nbsp;5–8: fixed charges, fields, capacitors)
        to circuits (Ch.&nbsp;9 onward: charges in steady motion). The capacitor of Ch.&nbsp;8 stops
        being a static charge store the moment you let it discharge through a wire — at that moment
        Ch.&nbsp;9 takes over with \(I(t) = -dQ/dt\) on the capacitor.
      </Connection>

      <Reveal title="Example 9.1 — Clock battery (homework-style)">
        <p>
          A clock battery wears out after delivering \(Q = 6878\) C of charge at a steady current
          \(I = 0.612\) mA. How long did the clock run?
          \[t = \dfrac&#123;Q&#125;&#123;I&#125; = \dfrac&#123;6878&#125;&#123;0.612\times10^&#123;-3&#125;&#125; \approx 1.124\times10^&#123;7&#125;\ \text&#123;s&#125;\]
          About 130 days. The two unit slips to avoid: forgetting that mA = 10⁻³ A (off by 10³),
          and reading 0.612 mA as 0.612 A (off by 10³ the other way).
        </p>
      </Reveal>

      <Reveal title="Example 9.2 — Defibrillator pulse (instantaneous → average)">
        <p>
          A defibrillator delivers a pulse of \(Q = 2.0\) C over a duration of \(\Delta t = 0.050\) s.
          The average current is \(I_\text&#123;avg&#125; = Q/\Delta t = 2.0/0.050 = 40\) A. The
          peak instantaneous current is several times higher — but for life-saving energetics the
          average is the right quantity.
        </p>
      </Reveal>

      <Reveal title="Example 9.3 — Charge from a time-varying current">
        <p>
          An exponentially decaying current \(I(t) = (5.0\,\text&#123;A&#125;)\,e^&#123;-t/(0.20\,\text&#123;s&#125;)&#125;\)
          flows during \(0 \le t \le 1.0\) s. The total charge transferred is
          \[Q = \int_0^&#123;1.0&#125; 5.0\,e^&#123;-t/0.20&#125;\,dt = 5.0\cdot 0.20\,(1 - e^&#123;-5&#125;) \approx 0.99\ \text&#123;C&#125;.\]
        </p>
      </Reveal>

      <Reveal title="CYU 9.1 — Solar trickle (book)">
        <p>
          A small solar cell sources \(I = 0.30\) mA. How long does it take to move 1.0 C of charge?
          \(t = Q/I = 1.0/(0.30\times10^&#123;-3&#125;) \approx 3.3\times10^&#123;3&#125;\) s ≈ 56 min.
        </p>
      </Reveal>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P9.1.1 — A wire carries 4.0 C past a cross-section in 2.0 s. Find I.">
        <p>\(I = Q/t = 4.0/2.0 = 2.0\) A.</p>
      </Reveal>

      <Reveal title="P9.1.2 — A steady 5.0 A current flows for 10.0 s. Total charge?">
        <p>\(Q = I\,t = 5.0\cdot 10.0 = 50\) C.</p>
      </Reveal>

      <Reveal title="P9.1.3 — Conventional current in a metal points east. In which direction do the conduction electrons drift?">
        <p>
          West. Conventional \(I\) is the direction of positive-charge flow; electrons (negative)
          drift opposite to that.
        </p>
      </Reveal>

      <Reveal title="P9.1.4 — A current rises linearly from 0 to 4.0 A over 2.0 s. How much charge has flowed by t = 2.0 s?">
        <p>
          \(Q = \int_0^&#123;2&#125;(2t)\,dt = [t^2]_0^2 = 4.0\) C. (Equivalent: average current
          \(\bar I = 2.0\) A times \(\Delta t = 2.0\) s.)
        </p>
      </Reveal>

      <Reveal title="P9.1.5 — A 1.50 V AA battery rated 2500 mA·h. Total charge it can deliver?">
        <p>
          \(Q = I\,t = (2.500\ \text&#123;A&#125;)(3600\ \text&#123;s&#125;) = 9000\) C. The unit
          &ldquo;mA·h&rdquo; is just charge in disguise: 1&nbsp;mA·h = \(10^&#123;-3&#125;\cdot 3600\) C = 3.6&nbsp;C.
        </p>
      </Reveal>
    </section>
  );
}
