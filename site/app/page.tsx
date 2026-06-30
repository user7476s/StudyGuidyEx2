import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">PHY 2049 — Potential, Capacitance, Current</h1>
        <p className="text-slate-600 mt-2">
          OpenStax <i>University Physics</i> Vol. 2, §7.1–9.4. A self-study aid:
          quick refresher on the prior chapters, a comprehensive guide for the new
          material with interactive demos, and two distinct ~100-question practice
          exams. <b>Personal use only — not for graded work.</b>
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-4">
        <Link href="/review/" className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow">
          <div className="font-semibold">Review (§5.1–6.4)</div>
          <div className="text-sm text-slate-600">
            Compact refresher for the prerequisite material — Coulomb&apos;s law, electric field,
            flux, Gauss&apos;s law, conductors — with notes on what carries forward into Ch. 7–8.
          </div>
        </Link>
        <Link href="/study-guide/" className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow">
          <div className="font-semibold">Study Guide (§7.1–9.4)</div>
          <div className="text-sm text-slate-600">
            Definitions, key formulas, worked examples, tips and pitfalls, interactive
            demos for V(r), equipotentials, parallel-plate capacitors, series/parallel networks,
            and now current &amp; resistance (Ch. 9).
          </div>
        </Link>
        <Link href="/exam-1/" className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow">
          <div className="font-semibold">Practice Exam 1</div>
          <div className="text-sm text-slate-600">116 multiple-choice questions across §7.1–9.4, including every in-scope iClicker and graded-homework item plus extra Ch. 9 practice.</div>
        </Link>
        <Link href="/exam-2/" className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow">
          <div className="font-semibold">Practice Exam 2</div>
          <div className="text-sm text-slate-600">114 entirely different multiple-choice questions covering the same §7.1–9.4 material.</div>
        </Link>
      </section>

      <section className="border border-amber-300 bg-amber-50 rounded p-4 text-sm">
        <div className="font-semibold mb-1">How to use this site</div>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>On each exam, hit <b>Hint</b> for a conceptual nudge (no answer); pick an option to lock it and reveal the worked solution.</li>
          <li>Score updates live in the sticky bar at top. Reset anytime.</li>
          <li>Use <b>Print → PDF</b> with &quot;Reveal all&quot; checked to get a paper copy with hints, full solutions, and an answer key.</li>
        </ul>
      </section>
    </div>
  );
}
