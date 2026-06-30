'use client';

import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { WireResistance } from '@/components/interactives/WireResistance';
import { Reveal } from './Reveal';

export function Section93() {
  return (
    <section id="s93" className="mt-8">
      <h2 className="text-2xl font-bold">§9.3 — Resistivity and Resistance</h2>

      <h3 className="text-lg font-semibold mt-3">From microscopic to macroscopic</h3>
      <p>
        In a Drude-style picture, applying field \(\vec E\) inside a conductor gives the carriers
        a drift \(\vec v_d\) proportional to \(\vec E\). This makes the current density
        proportional to the field:
        \[\boxed&#123;\,\vec J \;=\; \sigma\,\vec E\,&#125;\]
        with the proportionality constant \(\sigma\) called the <i>conductivity</i>
        (units (Ω·m)⁻¹). Its reciprocal is the <i>resistivity</i>
        \[\boxed&#123;\,\rho \;=\; 1/\sigma\,&#125;\quad\text&#123;(Ω·m).&#125;\]
        Both are intrinsic material properties: same for a thin wire and a fat one.
      </p>

      <h3 className="text-lg font-semibold mt-3">Resistance of a piece of wire</h3>
      <p>
        For a straight wire of length \(L\), uniform cross-section \(A\), and uniform field
        \(E = V/L\) along the wire, the relation \(J = \sigma E\) gives
        \(I/A = (1/\rho)\cdot V/L\), i.e., \(V = (\rho L/A)\,I\). Defining the <i>resistance</i>
        \(R = V/I\),
        \[\boxed&#123;\,R \;=\; \dfrac&#123;\rho L&#125;&#123;A&#125;\,&#125;\quad\text&#123;(Ω).&#125;\]
        So \(R\) doubles when you double the length, and \(R\) halves when you double the area
        (quarters when you double the radius).
      </p>

      <h3 className="text-lg font-semibold mt-3">Temperature dependence</h3>
      <p>
        Over modest temperature ranges, most pure metals have a resistivity that is nearly linear
        in temperature:
        \[\rho(T) \;=\; \rho_0\bigl[1 + \alpha\,(T - T_0)\bigr],\qquad
          R(T) \;=\; R_0\bigl[1 + \alpha\,(T - T_0)\bigr]\]
        with \(\alpha\) called the temperature coefficient of resistivity (units °C⁻¹). For tungsten
        \(\alpha\approx 4.5\times10^&#123;-3&#125;\) °C⁻¹; for carbon \(\alpha\approx -5\times10^&#123;-4&#125;\) °C⁻¹
        (negative — carbon&apos;s resistance <i>drops</i> as it warms).
      </p>

      <h3 className="text-lg font-semibold mt-3">Material classes (rough scales)</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>Metals (conductors): \(\rho \sim 10^&#123;-8&#125;\) Ω·m. Cu: 1.7×10⁻⁸ Ω·m.</li>
        <li>Semiconductors: \(\rho \sim 10^&#123;-2&#125;\) to \(10^3\) Ω·m, hugely doping-dependent.</li>
        <li>Insulators: \(\rho \sim 10^&#123;10&#125;\) Ω·m and up.</li>
        <li>Superconductors: \(\rho = 0\) below a critical temperature.</li>
      </ul>

      <Tip title="R is geometry × material">
        \(R\) hides two things: the material (through \(\rho\)) and the shape (through \(L/A\)).
        Swap copper for nichrome at the same shape and \(R\) jumps about 60×; halve the diameter
        of the same material and \(R\) quadruples.
      </Tip>

      <Pitfall title="L/A scaling">
        Doubling the wire <i>length</i> doubles \(R\). Doubling the wire <i>diameter</i> (radius)
        does NOT double \(A\) — it quadruples \(A\) and therefore quarters \(R\). A frequent
        slip is treating &ldquo;double diameter&rdquo; as if it halved \(R\).
      </Pitfall>

      <ExamTrap title="ΔT is the same in °C and K">
        Because \(T_K = T_°C + 273.15\), differences \(\Delta T\) are numerically identical in
        °C and K. The temperature-coefficient formula uses \(\Delta T\), so you never need to
        convert — provided you use one system consistently for both \(T\) and \(T_0\). Mixing
        them is the error.
      </ExamTrap>

      <div className="my-4 not-prose">
        <h3 className="text-lg font-semibold mt-3">Interactive — \(R = \rho L/A\) and \(R(T)\)</h3>
        <p className="text-sm text-slate-600 mb-2">
          Pick a material, scrub <i>L</i> and <i>d</i>, then warm the wire up to operating
          temperature. The cold and hot resistance values are both shown so you can see the
          temperature-coefficient law in real numbers — try the tungsten preset and slide
          temperature up toward 2800 °C.
        </p>
        <WireResistance />
      </div>

      <Connection>
        \(R = \rho L/A\) is the geometric companion to \(C = \varepsilon_0 A/d\) from §8.1.
        Both isolate a &ldquo;material&rdquo; piece (\(\rho\) or \(\varepsilon_0/\kappa\)) and a
        &ldquo;shape&rdquo; piece (\(L/A\) or \(A/d\)). Same recipe, different physics.
      </Connection>

      <Reveal title="Example 9.7 — Copper wire J, R, E (book Ex 9.5)">
        <p>
          A copper wire (\(\rho = 1.7\times10^&#123;-8&#125;\) Ω·m) has \(L = 5.0\) m,
          \(d = 2.053\) mm so \(A = \pi(d/2)^2 \approx 3.31\times10^&#123;-6&#125;\) m². It carries
          \(I = 10\) mA.
        </p>
        <ul className="list-disc ml-5">
          <li>\(J = I/A = 10\times10^&#123;-3&#125;/3.31\times10^&#123;-6&#125; \approx 3.02\times10^3\) A/m².</li>
          <li>\(R = \rho L/A = (1.7\times10^&#123;-8&#125;)(5.0)/(3.31\times10^&#123;-6&#125;) \approx 0.0257\) Ω.</li>
          <li>\(E = \rho J \approx (1.7\times10^&#123;-8&#125;)(3.02\times10^3) \approx 5.1\times10^&#123;-5&#125;\) V/m.</li>
        </ul>
      </Reveal>

      <Reveal title="Example 9.8 — Tungsten filament heated to 2850 °C (book Ex 9.6)">
        <p>
          A tungsten filament has \(R_0 = 0.350\) Ω at \(T_0 = 20\) °C. With \(\alpha = 4.5\times10^&#123;-3&#125;\)
          °C⁻¹ and \(\Delta T = 2830\) °C,
          \[R = R_0\bigl[1 + \alpha\,\Delta T\bigr] = 0.350\,[1 + (0.0045)(2830)]
            \approx 0.350\cdot 13.74 \approx 4.81\ \Omega.\]
          So an incandescent bulb&apos;s hot-filament resistance is more than an order of magnitude
          larger than the cold-filament resistance you measure with an ohmmeter — and that&apos;s
          why an inrush spike of current is what usually kills the bulb at the moment you switch it on.
        </p>
      </Reveal>

      <Reveal title="Example 9.9 — Coaxial cable resistance (book Ex 9.7, abbreviated)">
        <p>
          A coaxial cable conducts radially: current \(I\) flows from the inner conductor of radius
          \(a\) to the outer of radius \(b\) through a resistive medium of length \(L\). At radius
          \(r\) the relevant cross-section is the cylindrical surface \(2\pi r L\), so the elemental
          resistance \(dR = \rho\,dr/(2\pi r L)\). Integrating,
          \[R = \dfrac&#123;\rho&#125;&#123;2\pi L&#125;\int_a^b\dfrac&#123;dr&#125;&#123;r&#125; = \dfrac&#123;\rho&#125;&#123;2\pi L&#125;\ln(b/a).\]
          The pattern: when the geometry isn&apos;t a uniform prism, integrate slices of \(dR\)
          chosen so each is a uniform prism.
        </p>
      </Reveal>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P9.3.1 — Aluminum wire (ρ = 2.82×10⁻⁸ Ω·m) of length 10 m and diameter 1.0 mm. Find R.">
        <p>
          \(A = \pi(0.5\times10^&#123;-3&#125;)^2 \approx 7.85\times10^&#123;-7&#125;\) m²;
          \(R = (2.82\times10^&#123;-8&#125;)(10)/(7.85\times10^&#123;-7&#125;) \approx 0.359\) Ω.
        </p>
      </Reveal>

      <Reveal title="P9.3.2 — Same aluminum wire, but the diameter is doubled to 2.0 mm. New R?">
        <p>
          \(A\) quadruples, so \(R\) drops by 4×: \(R \approx 0.090\) Ω.
        </p>
      </Reveal>

      <Reveal title="P9.3.3 — A copper wire (α = 4.0×10⁻³ /°C) has R₀ = 5.0 Ω at 20 °C. What is R at 80 °C?">
        <p>
          \(R = R_0[1 + \alpha\Delta T] = 5.0\,[1 + (0.0040)(60)] = 5.0\cdot 1.24 = 6.2\) Ω.
        </p>
      </Reveal>

      <Reveal title="P9.3.4 — What length of #20 copper wire (A = 5.19×10⁻⁷ m²) makes a 10 Ω resistor?">
        <p>
          \(L = RA/\rho = (10)(5.19\times10^&#123;-7&#125;)/(1.7\times10^&#123;-8&#125;) \approx 305\) m.
          (That&apos;s why precision resistors use high-resistivity alloys, not pure copper.)
        </p>
      </Reveal>

      <Reveal title="P9.3.5 — A semiconductor sample has σ = 4.0 (Ω·m)⁻¹. With L = 2.0 cm and A = 1.0×10⁻⁴ m², what is R?">
        <p>
          \(\rho = 1/\sigma = 0.25\) Ω·m;
          \(R = \rho L/A = (0.25)(0.02)/(10^&#123;-4&#125;) = 50\) Ω.
        </p>
      </Reveal>
    </section>
  );
}
