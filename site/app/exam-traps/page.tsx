import Link from 'next/link';
import { MathStatic } from '@/components/Math';
import { examTrapsBySection } from '@/data/examTraps';

export const metadata = {
  title: 'Exam traps — every callout, in one place',
};

export default function ExamTrapsPage() {
  const groups = examTrapsBySection();
  const total = groups.reduce((n, g) => n + g.entries.length, 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Exam traps</h1>
        <p className="text-slate-600 mt-1 text-sm">
          Every <b>Exam trap</b> callout from the study guide, gathered in one place and grouped
          by section. These are the failure modes most likely to bite you on a real exam — sign
          flips, factor-of-2 omissions, field-vs-potential confusion, series/parallel inversions.
          Each entry links back to where it appears in context.
        </p>
      </header>

      {total === 0 ? (
        <div className="border-l-4 border-amber-400 bg-amber-50 p-3 rounded-r text-sm text-amber-900">
          The trap archive is being populated section-by-section. Once
          <code className="mx-1 font-mono text-xs">data/examTraps.ts</code>
          has entries, they appear here grouped by section.
        </div>
      ) : (
        <MathStatic>
          <div className="space-y-8">
            {groups.map((g) => (
              <section key={g.section}>
                <h2 className="text-xl font-semibold border-b border-slate-200 pb-1 mb-3">
                  §{g.section}
                </h2>
                <div className="grid gap-3">
                  {g.entries.map((e) => (
                    <article key={e.id} className="callout-examtrap">
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <div className="font-semibold text-amber-800">
                          {e.title ?? 'Exam trap'}
                          <span className="ml-2 text-xs font-normal text-amber-900/70">
                            {e.topic}
                          </span>
                        </div>
                        <Link
                          href={e.sectionAnchor}
                          className="text-xs text-blue-700 hover:underline whitespace-nowrap"
                        >
                          §{e.section} in context →
                        </Link>
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: e.bodyHtml }} />
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </MathStatic>
      )}
    </div>
  );
}
