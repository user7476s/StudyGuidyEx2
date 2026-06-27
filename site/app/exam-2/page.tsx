'use client';

import { useEffect, useState } from 'react';
import { exam2 } from '@/data/exam2';
import { QuestionCard } from '@/components/QuestionCard';
import { ScoreProvider, Scorebar, useScore } from '@/components/Scorebar';
import { ResumeBanner } from '@/components/ResumeBanner';
import { PrintRevealAll } from '@/components/PrintRevealAll';
import { shuffleExam } from '@/lib/shuffle';
import type { Question } from '@/lib/types';

export default function Exam2Page() {
  return (
    <ScoreProvider storageKey="phyexam2:exam-2:results">
      <div className="space-y-4">
        <header>
          <h1 className="text-3xl font-bold">Practice Exam 2 — §7.1–8.5</h1>
          <p className="text-slate-600 mt-1 text-sm">
            100 multiple-choice items. Question order and answer choices are randomized on each
            attempt. Same engine: <b>Hint</b> → lock → grade → <b>Explanation</b>. <b>Reset</b>
            clears the scorebar and re-shuffles the exam. Your progress is saved to this browser
            — close the tab and come back to pick up where you left off.
          </p>
        </header>

        <ResumeBanner />
        <Scorebar total={exam2.length} title="Exam 2" />
        <PrintRevealAll />

        <Exam2Body />
      </div>
    </ScoreProvider>
  );
}

function Exam2Body() {
  const { state } = useScore();
  const [mounted, setMounted] = useState(false);
  const [shuffled, setShuffled] = useState<Question[]>(exam2);
  const [filterMissed, setFilterMissed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) setShuffled(shuffleExam(exam2));
  }, [mounted, state.nonce]);

  const missedCount = Object.values(state.results).filter((ok) => ok === false).length;
  const visible = filterMissed
    ? shuffled.filter((q) => state.results[q.id] === false)
    : shuffled;

  return (
    <>
      <div className="no-print flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="btn-ghost"
          disabled={missedCount === 0}
          onClick={() => setFilterMissed((v) => !v)}
        >
          {filterMissed ? 'Show all questions' : `Review missed (${missedCount})`}
        </button>
        {filterMissed && (
          <span className="text-sm text-slate-700">
            Showing {visible.length} missed question{visible.length === 1 ? '' : 's'}.
          </span>
        )}
      </div>

      <div className="grid gap-4">
        {visible.map((q, i) => (
          <QuestionCard key={`${q.id}::${state.nonce}`} q={q} n={i + 1} />
        ))}
      </div>

      <section className="answer-key">
        <h2 className="font-bold text-lg mb-2">Answer key (only visible when printing)</h2>
        <ol className="grid grid-cols-4 gap-x-4 gap-y-1 text-sm">
          {shuffled.map((q, i) => (
            <li key={q.id}>
              <span className="font-mono text-xs text-slate-500">{i + 1}.</span> {'ABCDE'[q.correctIndex]}
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
