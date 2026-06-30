// Source of truth for every "Exam trap" callout used across the study guide
// sections. Section pages render entries by id via <ExamTrapById id="..." />,
// and the /exam-traps aggregator page maps over the whole array grouped by
// section. Body text is HTML with \(...\) inline math (MathJax conventions
// matching the question data).

export interface ExamTrapEntry {
  id: string;
  section: string; // e.g. '7.1'
  sectionAnchor: string; // e.g. '/study-guide/potential/#s71'
  topic: string; // short label shown in the archive
  title?: string; // optional override for the callout header
  bodyHtml: string;
}

export const examTraps: ExamTrapEntry[] = [
  {
    id: 's71-superposition-half',
    section: '7.1',
    sectionAnchor: '/study-guide/potential/#s71',
    topic: 'N-charge superposition',
    bodyHtml:
      'The most common §7.1 multiple-choice error: forgetting the factor of \\(1/2\\) in the ' +
      '\\(N\\)-charge superposition formula, or — much worse — applying it twice. The clean ' +
      'recipe is &ldquo;sum once over all pairs (\\(i&lt;j\\)).&rdquo;',
  },
  {
    id: 's72-sign-delta-v',
    section: '7.2',
    sectionAnchor: '/study-guide/potential/#s72',
    topic: 'sign of ΔV in ΔK',
    bodyHtml:
      'Sign of \\(\\Delta V\\) in \\(\\Delta K = -q\\Delta V\\). For an electron (\\(q=-e\\)) crossing ' +
      'toward higher \\(V\\): \\(\\Delta V&gt;0\\), so \\(\\Delta K = -(-e)\\Delta V = e\\Delta V&gt;0\\) — ' +
      'the electron <i>gains</i> KE moving toward higher \\(V\\). For a proton, the same ' +
      '\\(\\Delta V\\) gives a loss. Try a worked numerical pass through both charges before the exam.',
  },
  {
    id: 's73-scalar-vs-vector',
    section: '7.3',
    sectionAnchor: '/study-guide/potential/#s73',
    topic: 'scalar vs. vector sum',
    bodyHtml:
      'Vector-summing what should be scalar-summed. Adding the four \\(V_i\\) at the centre of a ' +
      'square is just \\(4\\,kq/r\\) — there are no components to break out.',
  },
  {
    id: 's74-gradient-factors',
    section: '7.4',
    sectionAnchor: '/study-guide/potential/#s74',
    topic: 'spherical gradient factors',
    bodyHtml:
      'Forgetting the \\(1/r\\) and \\(1/(r\\sin\\theta)\\) factors in cylindrical/spherical gradients. ' +
      'If V depends on θ, the θ-component of E is \\((-1/r)\\partial V/\\partial\\theta\\), not ' +
      '\\(-\\partial V/\\partial\\theta\\). Lose this and your dipole-field answer is off by a factor of r.',
  },
  {
    id: 's75-equipotential-spacing',
    section: '7.5',
    sectionAnchor: '/study-guide/potential/#s75',
    topic: 'equipotential ring spacing',
    bodyHtml:
      'For a point charge in 2D, the equipotential <i>circles</i> are at radii \\(r=kq/V\\), ' +
      'spaced as \\(1/V\\), not equally. A common multiple-choice trap shows equally-spaced ' +
      'concentric rings (which are <i>wrong</i> as equipotentials of equal V step). Pick the ' +
      'diagram with rings that crowd near the charge.',
  },
  {
    id: 's81-c-vs-v',
    section: '8.1',
    sectionAnchor: '/study-guide/capacitance/#s81',
    topic: 'C independent of V',
    bodyHtml:
      'Saying C depends on V. It doesn&apos;t. C depends on geometry (and on κ if dielectric is ' +
      'present). What V does affect: the stored energy \\(U=\\tfrac12 CV^2\\) and the charge ' +
      '\\(Q=CV\\) — but not C itself.',
  },
  {
    id: 's82-mixed-networks',
    section: '8.2',
    sectionAnchor: '/study-guide/capacitance/#s82',
    topic: 'series/parallel order',
    bodyHtml:
      'Mixed networks: treating &ldquo;(C₁ in series with C₂) in parallel with C₃&rdquo; like a ' +
      'flat parallel network. The right order is: collapse the series block first to a single ' +
      '\\(C_{12}=(1/C_1+1/C_2)^{-1}\\), then add it to \\(C_3\\) in parallel. The book&apos;s ' +
      'Example 8.6 explicitly walks through this for C₁=1, C₂=5, C₃=8 μF (answer 8.833 μF).',
  },
  {
    id: 's83-invariant-disconnected',
    section: '8.3',
    sectionAnchor: '/study-guide/capacitance/#s83',
    topic: 'Q vs V invariant',
    bodyHtml:
      'Choosing the wrong invariant when the problem says &ldquo;battery disconnected, then the ' +
      'plates are pulled apart.&rdquo; Q is fixed (no current path), so use \\(U=Q^2/(2C)\\). ' +
      'With d↑, C↓, U↑ — the external agent did work against the attractive force between ' +
      'plates. Choose \\(\\tfrac12CV^2\\) here and you compute the wrong direction of energy change.',
  },
  {
    id: 's84-invariant-mid-problem',
    section: '8.4',
    sectionAnchor: '/study-guide/capacitance/#s84',
    topic: 'mid-problem invariant change',
    bodyHtml:
      'Multi-step problems where the battery is connected, dielectric inserted, then the ' +
      'battery is disconnected before more changes are applied. The invariant <i>changes</i> ' +
      'mid-problem — Q after disconnection is whatever Q value applied at the moment of ' +
      'disconnect, not Q₀.',
  },
  {
    id: 's91-integrate-i-of-t',
    section: '9.1',
    sectionAnchor: '/study-guide/current/#s91',
    topic: 'integrate I(t) for total Q',
    bodyHtml:
      'When the current varies in time (\\(I = I_0 e^{-t/\\tau}\\) for an RC discharge, a defibrillator pulse, etc.), ' +
      'the total charge between \\(t_1\\) and \\(t_2\\) is \\(Q = \\int_{t_1}^{t_2} I\\,dt\\), <i>not</i> ' +
      '\\(I\\cdot\\Delta t\\). Whenever the prompt says &ldquo;total charge,&rdquo; check whether \\(I\\) is constant ' +
      'before reaching for \\(Q = I\\,t\\).',
  },
  {
    id: 's92-units-of-n',
    section: '9.2',
    sectionAnchor: '/study-guide/current/#s92',
    topic: 'mixing cm and m in nqAv_d',
    bodyHtml:
      'A frequent slip in \\(I = n\\,q\\,A\\,v_d\\) is writing \\(n\\) in cm⁻³ (chemist&apos;s habit) while \\(v_d\\) ' +
      'is in m/s and \\(A\\) in m². That mismatch is off by a factor of \\(10^6\\). Keep all lengths in SI before ' +
      'multiplying.',
  },
  {
    id: 's93-delta-t-units',
    section: '9.3',
    sectionAnchor: '/study-guide/current/#s93',
    topic: 'ΔT same in °C and K',
    bodyHtml:
      'Because \\(T_K = T_{°C} + 273.15\\), <i>differences</i> \\(\\Delta T\\) are numerically identical in °C and K. ' +
      'The temperature-coefficient formula \\(R(T) = R_0[1 + \\alpha\\,\\Delta T]\\) uses \\(\\Delta T\\), so no ' +
      'conversion is ever needed — but mixing systems between \\(T\\) and \\(T_0\\) is the slip that catches people.',
  },
  {
    id: 's94-ohmic-vs-nonohmic',
    section: '9.4',
    sectionAnchor: '/study-guide/current/#s94',
    topic: 'ohmic vs. non-ohmic',
    bodyHtml:
      'A diode is the canonical non-ohmic device: above the threshold voltage the current rises <i>exponentially</i> ' +
      'with V, so trying to apply \\(V = IR\\) with a single \\(R\\) gives nonsense. Scan the prompt for the word ' +
      '&ldquo;ohmic&rdquo; or &ldquo;resistor&rdquo; — those signal that \\(V = IR\\) with a constant \\(R\\) is safe.',
  },
  {
    id: 's85-energy-density-dielectric',
    section: '8.5',
    sectionAnchor: '/study-guide/capacitance/#s85',
    topic: 'energy density in dielectric',
    bodyHtml:
      'Using \\(u_E = \\tfrac12 \\varepsilon_0 E^2\\) (vacuum form) when computing the energy ' +
      'stored <i>inside</i> a dielectric. The right form is \\(\\tfrac12\\kappa\\varepsilon_0 E^2\\). ' +
      'With the in-dielectric \\(E\\) already reduced by κ, the integrated total energy comes out ' +
      'correctly factor-of-κ smaller than the vacuum case at fixed Q.',
  },
];

const byId = new Map(examTraps.map((e) => [e.id, e]));

export function getExamTrap(id: string): ExamTrapEntry | undefined {
  return byId.get(id);
}

export function examTrapsBySection(): { section: string; entries: ExamTrapEntry[] }[] {
  const grouped = new Map<string, ExamTrapEntry[]>();
  for (const e of examTraps) {
    const arr = grouped.get(e.section) ?? [];
    arr.push(e);
    grouped.set(e.section, arr);
  }
  return [...grouped.entries()]
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([section, entries]) => ({ section, entries }));
}
