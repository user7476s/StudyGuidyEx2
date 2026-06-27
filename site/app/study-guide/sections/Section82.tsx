'use client';

import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { Reveal } from './Reveal';
import dynamic from 'next/dynamic';
const CapNetworkSolver = dynamic(
  () => import('@/components/interactives/CapNetworkSolver').then((m) => ({ default: m.CapNetworkSolver })),
  { ssr: false, loading: () => <div className="border rounded p-3 bg-white h-48 animate-pulse" /> },
);

export function Section82() {
  return (
    <section id="s82" className="mt-8">
      <h2 className="text-2xl font-bold">§8.2 — Capacitors in Series and in Parallel</h2>

      <h3 className="text-lg font-semibold mt-3">Series — same Q, voltages add</h3>
      <p>
        Connect capacitors end-to-end across a battery. Charge \(+Q\) on the top plate of the
        first capacitor induces \(-Q\) on the facing plate of the next, and so on: every
        capacitor in a series chain carries the same \(Q\). Their voltages add to the source EMF:
        \[V = V_1+V_2+V_3+\cdots = \frac&#123;Q&#125;&#123;C_1&#125;+\frac&#123;Q&#125;&#123;C_2&#125;+\frac&#123;Q&#125;&#123;C_3&#125;+\cdots
            \;\Rightarrow\;
            \boxed&#123;\,\dfrac&#123;1&#125;&#123;C_\text&#123;eq&#125;&#125; = \sum_i \dfrac&#123;1&#125;&#123;C_i&#125;.\,&#125;\]
        \(C_\text&#123;eq&#125;\) is always <i>less</i> than the smallest \(C_i\) in the chain.
      </p>

      <h3 className="text-lg font-semibold mt-3">Parallel — same V, charges add</h3>
      <p>
        Connect capacitors with both plates wired together. Each capacitor sees the same
        terminal voltage V; charges add:
        \[Q = C_1V + C_2V + \cdots \;\Rightarrow\; \boxed&#123;\,C_\text&#123;eq&#125; = \sum_i C_i.\,&#125;\]
        \(C_\text&#123;eq&#125;\) is always <i>greater</i> than the largest \(C_i\) in the parallel
        bank.
      </p>

      <h3 className="text-lg font-semibold mt-3">Sign conventions &amp; units</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>Series: same Q on every capacitor (this is the diagnostic that tells you the rule applies).</li>
        <li>Parallel: same V across every capacitor.</li>
        <li>Reduce networks one block at a time — combine the innermost series/parallel groups first.</li>
        <li>Compare to resistors: parallel resistors invert (1/R₁+1/R₂), parallel capacitors just add. The roles flip in series too.</li>
      </ul>

      <Tip title="Read the topology, not the picture">
        Two capacitors are &ldquo;in series&rdquo; only if all the charge that lands on one of
        them comes from the other (no junction in between with another path). They are &ldquo;in
        parallel&rdquo; only if their two terminals coincide pairwise. When in doubt, redraw the
        circuit with nodes labeled.
      </Tip>

      <Pitfall>
        Adding 1/C&apos;s when capacitors are <i>parallel</i>, or adding C&apos;s when they are
        in series. This is the single most common mistake on capacitor exams — and the rule
        flips compared to resistors, which doubles the confusion.
      </Pitfall>

      <ExamTrap>
        Mixed networks: treating &ldquo;(C₁ in series with C₂) in parallel with C₃&rdquo; like a
        flat parallel network. The right order is: collapse the series block first to a single
        \(C_&#123;12&#125;=(1/C_1+1/C_2)^&#123;-1&#125;\), then add it to \(C_3\) in parallel. The book&apos;s
        Example 8.6 explicitly walks through this for C₁=1, C₂=5, C₃=8 μF (answer 8.833 μF).
      </ExamTrap>

      <CapNetworkSolver />

      <Reveal title="Example 8.4 — Three capacitors in series (book): C₁=1.0, C₂=5.0, C₃=8.0 μF">
        <p>
          \(1/C_\text&#123;eq&#125; = 1/1 + 1/5 + 1/8 = 1 + 0.2 + 0.125 = 1.325\) μF⁻¹.
          \(C_\text&#123;eq&#125; = 0.755\) μF. As promised, smaller than the smallest (1.0 μF).
        </p>
      </Reveal>

      <Reveal title="Example 8.5 — Same three capacitors in parallel (book)">
        <p>\(C_\text&#123;eq&#125; = 1.0 + 5.0 + 8.0 = 14.0\) μF. Larger than the largest (8 μF).</p>
      </Reveal>

      <Reveal title="Example 8.6 — Mixed network (book): C₁ and C₂ in series, then C₃ in parallel">
        <p>
          Series block: \(C_S=(1/1+1/5)^&#123;-1&#125; = 5/6 = 0.833\) μF.
          Total: \(C = C_S + C_3 = 0.833 + 8.0 = 8.833\) μF. Notice 1 μF + 5 μF would have given
          6 μF as a flat parallel — the series step suppresses the 1 μF down to 0.833 μF first.
        </p>
      </Reveal>

      <Reveal title="Example 8.7 — Network at V=12.0 V (book): C₁=12, C₂=2, C₃=4 μF">
        <p>
          C₂ and C₃ are in parallel: \(C_&#123;23&#125;=6.0\) μF. That block is in series with C₁:
          \(1/C_\text&#123;eq&#125; = 1/12+1/6 = 1/4\Rightarrow C_\text&#123;eq&#125;=4.0\) μF.
          Total Q drawn from battery: \(Q=C_\text&#123;eq&#125;V = 48\) μC. Across C₁: \(V_1=Q/C_1=4\) V.
          Across the parallel block: \(V_&#123;23&#125;=12-4=8\) V; same on C₂ and C₃.
          Charges: \(Q_2=C_2V_&#123;23&#125;=16\) μC; \(Q_3=C_3V_&#123;23&#125;=32\) μC. Check: \(Q_2+Q_3=48\) μC ✓.
        </p>
      </Reveal>

      <Connection>
        §8.2 lets you replace any network with a single \(C_\text&#123;eq&#125;\). §8.3 stores energy in
        whatever \(C_\text&#123;eq&#125;\) you arrive at — energies in series add (the same Q flows), and
        in parallel add (same V across each). Either way, total \(U=\tfrac12 C_\text&#123;eq&#125;V^2\)
        is consistent.
      </Connection>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P8.2.1 — 2, 3, 6 μF all in series. Find C_eq.">
        <p>\(1/C_\text&#123;eq&#125; = 1/2 + 1/3 + 1/6 = 3/6+2/6+1/6 = 1\) ⇒ \(C_\text&#123;eq&#125;=1.0\) μF.</p>
      </Reveal>

      <Reveal title="P8.2.2 — Same 2, 3, 6 μF all in parallel.">
        <p>\(C_\text&#123;eq&#125;=2+3+6=11\) μF.</p>
      </Reveal>

      <Reveal title="P8.2.3 — (4 μF in parallel with 4 μF) in series with 2 μF. Find C_eq.">
        <p>Parallel block: 8 μF. Then series with 2 μF: \(1/C_\text&#123;eq&#125;=1/8+1/2=5/8\) ⇒ 1.6 μF.</p>
      </Reveal>

      <Reveal title="P8.2.4 — Two equal capacitors C in series. Show the result equals C/2 and exceeds C/2 when you put any third (positive) C₃ in parallel with one of them.">
        <p>
          Series of two C: \(1/C_\text&#123;eq&#125;=2/C\Rightarrow C_\text&#123;eq&#125;=C/2\).
          Replace the second by C in parallel with C₃ → effective C' = C + C₃. Then series with
          the first: \(1/C_\text&#123;eq&#125;=1/C+1/(C+C_3) &gt; 2/C\) — wait, \(1/(C+C_3) &lt; 1/C\), so
          \(1/C_\text&#123;eq&#125; &lt; 2/C\) and \(C_\text&#123;eq&#125; &gt; C/2\). Adding capacitance in parallel
          to one of two series capacitors <i>raises</i> the equivalent.
        </p>
      </Reveal>

      <Reveal title="P8.2.5 — Three capacitors 6, 12, 4 μF in series across 30 V. Find Q on each and V across each.">
        <p>
          \(1/C_\text&#123;eq&#125;=1/6+1/12+1/4 = 2/12+1/12+3/12 = 6/12 = 1/2\) ⇒ \(C_\text&#123;eq&#125;=2.0\) μF.
          Total Q = CV = 2×30 = 60 μC. Series ⇒ same Q on each: 60 μC.
          \(V_1=60/6=10\) V; \(V_2=60/12=5\) V; \(V_3=60/4=15\) V. Check: 10+5+15=30 V ✓.
        </p>
      </Reveal>
    </section>
  );
}
