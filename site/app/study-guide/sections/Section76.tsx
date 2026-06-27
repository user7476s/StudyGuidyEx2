import { Tip, Connection } from '@/components/Callout';
import { Reveal } from './Reveal';

export function Section76() {
  return (
    <section id="s76" className="mt-8">
      <h2 className="text-2xl font-bold">§7.6 — Applications of Electrostatics</h2>

      <p>
        Every device in §7.6 exploits one of three ideas from §§7.1–7.5:
        (i) charge transport raises potential, (ii) potential differences drive charges, and
        (iii) the field concentrates at sharp points.
      </p>

      <h3 className="text-lg font-semibold mt-3">Five devices, one principle each</h3>
      <ul className="list-disc ml-5">
        <li>
          <b>Van de Graaff generator.</b> A moving belt continuously deposits charge onto an
          isolated metal sphere of radius R. Since C of an isolated sphere is \(4\pi\varepsilon_0 R\)
          (geometric — see §8.1), the potential climbs as \(V=Q/C\). Limiting voltage is set by
          dielectric breakdown of the surrounding air (≈3×10⁶ V/m).
        </li>
        <li>
          <b>Xerography (photocopy).</b> A photoconductive drum is uniformly charged, then a
          bright image discharges illuminated regions. Charged toner is attracted to the
          remaining charge pattern and transferred to paper. The principle is &ldquo;V controls
          where Q sticks.&rdquo;
        </li>
        <li>
          <b>Laser printer.</b> Same as xerography but the discharge is created by a scanned
          laser, allowing fine digital control over the image.
        </li>
        <li>
          <b>Ink-jet printer.</b> Charged ink droplets pass between deflection plates; the field
          steers each droplet to its target row. Position = field strength × time-of-flight.
        </li>
        <li>
          <b>Electrostatic precipitator.</b> A high-voltage corona ionizes air, charging
          particulate pollutants; oppositely-charged collector plates then pull them out of the
          gas stream. Used in smokestack scrubbers and home air cleaners.
        </li>
      </ul>

      <Tip title="Field enhancement at sharp tips">
        The reason both corona discharges (precipitators, Van de Graaff terminals) and
        lightning rods favour points: a small radius of curvature concentrates surface charge
        density, and therefore field, until the air ionizes. The book derives
        \(\sigma_1/\sigma_2 = R_2/R_1\) in §7.5; §7.6 just applies it.
      </Tip>

      <Reveal title="Quick numerical — How much charge brings a 25-cm-diameter sphere to 100 kV?">
        <p>
          Isolated sphere: \(C = 4\pi\varepsilon_0 R = 4\pi(8.854\times10^&#123;-12&#125;)(0.125) = 1.39\times10^&#123;-11&#125;\) F.
          \(Q = CV = 1.39\times10^&#123;-11&#125;\cdot10^5 = 1.39\times10^&#123;-6&#125;\) C = 1.39 μC.
          (Mirrors the book&apos;s Van de Graaff example.)
        </p>
      </Reveal>

      <Connection>
        §7.6 is also the conceptual bridge to Chapter 8: the Van de Graaff sphere is the first
        explicit appearance of capacitance \(C=Q/V\) as a useful diagnostic. §8.1 promotes it to
        a defining quantity.
      </Connection>
    </section>
  );
}
