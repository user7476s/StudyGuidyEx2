'use client';

import { memo, useState } from 'react';
import clsx from 'clsx';
import type { Question } from '@/lib/types';
import { SourceChip } from './SourceChip';
import { MathDynamic } from './Math';
import { useScore } from './Scorebar';

interface InnerProps {
  q: Question;
  n: number;
  persistedResult: boolean | undefined;
  lock: (id: string, correct: boolean) => void;
}

const QuestionCardInner = memo(
  function QuestionCardInner({ q, n, persistedResult, lock }: InnerProps) {
    const [picked, setPicked] = useState<number | null>(null);
    const [hintOpen, setHintOpen] = useState(false);

    const isLocked = picked !== null || persistedResult !== undefined;

    function choose(i: number) {
      if (isLocked) return;
      setPicked(i);
      lock(q.id, i === q.correctIndex);
    }

    const correctLetter = 'ABCDE'[q.correctIndex];
    const isCorrect =
      picked !== null ? picked === q.correctIndex : persistedResult === true;
    const reviewMatch = q.topic.match(/^(\d+)\.(\d+)/);
    const reviewHref = reviewMatch
      ? reviewMatch[1] === '7'
        ? `/study-guide/potential/#s7${reviewMatch[2]}`
        : reviewMatch[1] === '8'
        ? `/study-guide/capacitance/#s8${reviewMatch[2]}`
        : null
      : null;
    const reviewLabel = reviewMatch ? `§${reviewMatch[1]}.${reviewMatch[2]}` : null;

    return (
      <article className="question-card" id={q.id}>
        <header className="flex justify-between items-start gap-2 mb-2">
          <div>
            <div className="text-sm text-slate-700">{q.id} · {q.topic}</div>
            <h3 className="font-semibold">Question {n}</h3>
          </div>
          <SourceChip source={q.source} />
        </header>

        {isLocked && (
          <div
            role="status"
            aria-live="polite"
            className={clsx(
              'no-print w-full rounded p-2 mb-3 text-sm font-semibold border-l-4',
              isCorrect
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                : 'bg-rose-50 border-rose-500 text-rose-800',
            )}
          >
            {isCorrect
              ? `Correct — answer ${correctLetter}.`
              : `Incorrect — correct answer: ${correctLetter}.`}
          </div>
        )}

        <MathDynamic>
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: q.stem }} />
        </MathDynamic>

        {q.figure && (
          <figure className="my-3">
            <div className="border border-slate-200 rounded bg-white inline-block p-1" dangerouslySetInnerHTML={{ __html: q.figure.svg }} />
            <figcaption className="text-xs text-slate-600 mt-1">{q.figure.caption}</figcaption>
          </figure>
        )}

        <div className="my-3">
          <MathDynamic>
            <ol className="list-none p-0">
              {q.options.map((opt, i) => {
                const showResult = isLocked;
                const isCorrect = i === q.correctIndex;
                const isPicked = i === picked;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      className={clsx('option', {
                        'option-locked': isLocked,
                        'option-correct': showResult && isCorrect,
                        'option-wrong': showResult && isPicked && !isCorrect,
                      })}
                      onClick={() => choose(i)}
                    >
                      <span className="font-mono text-xs text-slate-500 mr-2">{'ABCDE'[i]}.</span>
                      <span dangerouslySetInnerHTML={{ __html: opt }} />
                      {isCorrect && (
                        <span className="reveal-correct-marker font-bold text-emerald-700 ml-2">★ Answer</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </MathDynamic>
        </div>

        <div className="flex gap-2 flex-wrap items-center no-print">
          <button className="btn-ghost" onClick={() => setHintOpen((v) => !v)}>
            {hintOpen ? 'Hide hint' : 'Hint'}
          </button>
          {isLocked && reviewHref && (
            <a
              href={reviewHref}
              className="text-sm text-accent underline underline-offset-2 hover:text-blue-700"
            >
              Review {reviewLabel} →
            </a>
          )}
        </div>

        {(hintOpen || isLocked) && (
          <MathDynamic>
            <div className="reveal-on-print mt-3 grid gap-3">
              {(hintOpen || isLocked) && (
                <div className="border-l-4 border-amber-400 bg-amber-50 p-3 rounded-r text-sm">
                  <div className="font-semibold text-amber-800 mb-1">Hint</div>
                  <div dangerouslySetInnerHTML={{ __html: q.hint }} />
                </div>
              )}
              {isLocked && (
                <div className="border-l-4 border-blue-400 bg-blue-50 p-3 rounded-r text-sm">
                  <div className="font-semibold text-blue-800 mb-1">Explanation</div>
                  <div dangerouslySetInnerHTML={{ __html: q.explanation }} />
                </div>
              )}
              {isLocked &&
                picked !== null &&
                !isCorrect &&
                q.optionRationales?.[picked] && (
                  <div className="border-l-4 border-rose-400 bg-rose-50 p-3 rounded-r text-sm">
                    <div className="font-semibold text-rose-800 mb-1">
                      Why {'ABCDE'[picked]} is wrong
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: q.optionRationales[picked] }}
                    />
                  </div>
                )}
            </div>
          </MathDynamic>
        )}

        {/* Reveal-all block: hidden by default, shown when reveal-all toggle is on (screen + print) */}
        <div className="reveal-on-toggle reveal-on-print mt-3 grid gap-3">
          <MathDynamic>
            <div className="border-l-4 border-amber-400 bg-amber-50 p-3 rounded-r text-sm">
              <div className="font-semibold text-amber-800 mb-1">Hint</div>
              <div dangerouslySetInnerHTML={{ __html: q.hint }} />
            </div>
            <div className="border-l-4 border-blue-400 bg-blue-50 p-3 rounded-r text-sm">
              <div className="font-semibold text-blue-800 mb-1">Explanation</div>
              <div dangerouslySetInnerHTML={{ __html: q.explanation }} />
            </div>
            {q.optionRationales && (
              <div className="border-l-4 border-rose-400 bg-rose-50 p-3 rounded-r text-sm">
                <div className="font-semibold text-rose-800 mb-1">Why the distractors fail</div>
                <ul className="list-none p-0 space-y-1">
                  {q.optionRationales.map((r, i) =>
                    i === q.correctIndex || !r ? null : (
                      <li key={i}>
                        <span className="font-mono text-xs text-rose-700 mr-2">
                          {'ABCDE'[i]}.
                        </span>
                        <span dangerouslySetInnerHTML={{ __html: r }} />
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
            <div className="text-sm font-semibold">Answer: {'ABCDE'[q.correctIndex]}</div>
          </MathDynamic>
        </div>
      </article>
    );
  },
  (prev, next) =>
    prev.q === next.q &&
    prev.n === next.n &&
    prev.persistedResult === next.persistedResult,
);

export function QuestionCard({ q, n }: { q: Question; n: number }) {
  const { state, lock } = useScore();
  return (
    <QuestionCardInner
      q={q}
      n={n}
      persistedResult={state.results[q.id]}
      lock={lock}
    />
  );
}
