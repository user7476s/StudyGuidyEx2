import { Tip, Pitfall, ExamTrap, Connection } from '@/components/Callout';
import { Reveal } from './Reveal';

export function Section85() {
  return (
    <section id="s85" className="mt-8">
      <h2 className="text-2xl font-bold">§8.5 — Molecular Model of a Dielectric</h2>

      <h3 className="text-lg font-semibold mt-3">Where the &ldquo;κ factor&rdquo; really comes from</h3>
      <p>
        Two kinds of molecules contribute to dielectric behavior:
      </p>
      <ul className="list-disc ml-5">
        <li>
          <b>Polar molecules</b> (H₂O, HCl) carry a permanent dipole moment
          \(\vec p = q\vec d\). With no external field, thermal motion randomizes orientations
          and the net moment is zero. An applied field exerts a torque \(\vec\tau = \vec p\times\vec E\)
          that aligns each molecule.
        </li>
        <li>
          <b>Nonpolar molecules</b> have no built-in dipole, but the applied field deforms each
          molecule, separating its centroids of + and − charge by a small distance \(\vec d\) —
          an <i>induced</i> dipole \(\vec p = \alpha\vec E\) where α is the molecular polarizability.
        </li>
      </ul>
      <p>
        Either way, neighbouring molecules now line up like little batteries with all the + sides
        pointing the same way. Inside the bulk, adjacent + and − ends cancel pairwise. On the two
        outer faces of the slab, though, you are left with uncompensated <i>bound surface
        charge</i> \(\pm\sigma_b\). It is precisely the field of \(\sigma_b\) that opposes the
        field of the free charge \(\sigma_f\) on the capacitor plates:
        \[E_\text&#123;inside&#125; = \frac&#123;\sigma_f-\sigma_b&#125;&#123;\varepsilon_0&#125; = \frac&#123;E_0&#125;&#123;\kappa&#125;.\]
        The dielectric constant \(\kappa\) is the macroscopic shorthand for this microscopic
        cancellation.
      </p>

      <h3 className="text-lg font-semibold mt-3">Dielectric strength and breakdown</h3>
      <p>
        Past a critical field, electrons are ripped free from molecules; the material conducts
        and the capacitor fails (sometimes loudly). Air breaks down at \(\sim 3\times10^6\) V/m;
        mica at \(\sim 100\times10^6\) V/m. Larger \(\kappa\) and larger dielectric strength let
        you pack more energy into a smaller volume — the entire engineering motivation for using
        dielectrics.
      </p>

      <h3 className="text-lg font-semibold mt-3">Energy density</h3>
      <p>
        With a dielectric filling the gap, energy density becomes
        \[u_E = \tfrac12 \kappa\varepsilon_0 E^2,\]
        where \(E\) is the field <i>inside</i> the dielectric, not the unscreened vacuum field.
      </p>

      <h3 className="text-lg font-semibold mt-3">Sign conventions &amp; units</h3>
      <ul className="list-disc ml-5 text-sm">
        <li>\(\sigma_f\) on the plates (free charge); \(\sigma_b\) on the dielectric faces (bound). \(\sigma_b\) has opposite sign to the nearest \(\sigma_f\).</li>
        <li>Polarization \(\vec P\) is the dipole moment per unit volume; \(|\vec P|=\sigma_b\) at the surface.</li>
        <li>Energy density \(u_E\) in J/m³.</li>
      </ul>

      <Tip title="Polar vs nonpolar diagnostic">
        Polar molecules (water, ammonia) have very large κ (water: 80) because alignment of a
        permanent dipole is a large effect at room temperature. Nonpolar materials (Teflon,
        polystyrene) get only an induced dipole, giving κ ≈ 2–3.
      </Tip>

      <Pitfall>
        Bound charges don&apos;t conduct. They live at the surface of the dielectric and stay
        there. They are <i>not</i> the same as free charges on the capacitor plates. If you draw
        a Gaussian surface, both contribute to the enclosed charge.
      </Pitfall>

      <ExamTrap>
        Using \(u_E = \tfrac12 \varepsilon_0 E^2\) (vacuum form) when computing the energy
        stored <i>inside</i> a dielectric. The right form is \(\tfrac12\kappa\varepsilon_0 E^2\).
        With the in-dielectric \(E\) already reduced by κ, the integrated total energy comes out
        correctly factor-of-κ smaller than the vacuum case at fixed Q.
      </ExamTrap>

      <Reveal title="Example 8.11 — Parallel-plate cap with dielectric, numerical (book)">
        <p>
          Take \(C_0=20\) pF charged to V₀=40 V (battery still connected). Insert κ=3 dielectric.
          New C=60 pF. V stays 40 V; Q goes from 0.80 nC to 2.4 nC; energy goes from
          \(\tfrac12 C_0V_0^2 = 1.6\times10^&#123;-8&#125;\) J to \(\tfrac12 CV^2 = 4.8\times10^&#123;-8&#125;\) J — factor of 3 = κ.
        </p>
      </Reveal>

      <Reveal title="Example 8.12 — Same but battery disconnected (book)">
        <p>
          Q stays 0.80 nC. New C=60 pF, so V drops to 0.80nC/60pF = 13.3 V. E in gap drops to
          \(E_0/3\). Energy: \(Q^2/(2C) = (0.80\times10^&#123;-9&#125;)^2/(120\times10^&#123;-12&#125;) = 5.33\times10^&#123;-9&#125;\) J,
          one-third the original 1.6×10⁻⁸ J. ΔU = −1.07×10⁻⁸ J came out as work the field did on
          the dielectric (pulling it in).
        </p>
      </Reveal>

      <Reveal title="CYU 8.8 — Battery still connected (book)">
        <p>
          Battery does \(W_\text&#123;batt&#125; = V\,\Delta Q = (\kappa-1)C_0V^2 = (κ-1)·2U_0\).
          ΔU = (κ-1)U₀. Half of the battery&apos;s work increases U; the other half is dissipated
          in the wires.
        </p>
      </Reveal>

      <Connection>
        §8.5 closes the chapter. From here, the next leg of the course pivots to current and
        circuits (Chapter 9). Many of the capacitance ideas reappear there: dielectrics as
        insulators in RC circuits, energy storage during charging, and capacitors as the
        electric analogue of inductors.
      </Connection>

      <h3 className="text-lg font-semibold mt-3">Practice</h3>

      <Reveal title="P8.5.1 — Sketch what happens at the molecular level when a polar liquid is between plates.">
        <p>
          Random orientations with no field; partial alignment with field (against thermal
          motion). Net polarization \(\vec P\) along the field. Bound surface charges at the two
          slab faces have signs opposite to the nearest plate.
        </p>
      </Reveal>

      <Reveal title="P8.5.2 — A 1.0 mm air gap is held at E₀=2×10⁶ V/m. Insert κ=4 dielectric (battery disconnected). Find E inside dielectric and bound charge density.">
        <p>
          \(E_\text&#123;in&#125; = E_0/\kappa = 5\times10^5\) V/m.
          Free charge density unchanged: \(\sigma_f = \varepsilon_0 E_0 = 1.77\times10^&#123;-5&#125;\) C/m².
          Inside: \(\sigma_f-\sigma_b = \varepsilon_0 E_\text&#123;in&#125;\Rightarrow \sigma_b = \sigma_f(1-1/\kappa) = (3/4)\sigma_f = 1.33\times10^&#123;-5&#125;\) C/m².
        </p>
      </Reveal>

      <Reveal title="P8.5.3 — Why does water have κ ≈ 80, but Teflon only 2?">
        <p>
          Water is polar (permanent p ≈ 6.2×10⁻³⁰ C·m); aligning many large permanent dipoles is
          a huge effect, only partially defeated by thermal agitation. Teflon is nonpolar; only
          induced dipoles contribute, and α is small.
        </p>
      </Reveal>

      <Reveal title="P8.5.4 — Above dielectric strength what happens?">
        <p>
          Electrons are torn free, ionizing the material. It becomes conductive; current flows;
          the capacitor short-circuits and discharges, often destructively. Dielectric strength
          sets the absolute maximum useful V for a given d.
        </p>
      </Reveal>

      <Reveal title="P8.5.5 — Energy density inside the dielectric of the previous problem.">
        <p>
          \(u_E = \tfrac12\kappa\varepsilon_0 E_\text&#123;in&#125;^2 = \tfrac12(4)(8.854\times10^&#123;-12&#125;)(5\times10^5)^2
          = 4.43\) J/m³. (Compare: \(\tfrac12\varepsilon_0 E_0^2 = 17.7\) J/m³ — the vacuum-form
          value is four times bigger, the same factor of κ.)
        </p>
      </Reveal>
    </section>
  );
}
