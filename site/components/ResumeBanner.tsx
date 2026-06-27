'use client';

import { useState } from 'react';
import { useScore } from './Scorebar';

// Shown after the ScoreProvider rehydrates results from localStorage on a
// returning visit. The user gets a one-time prompt to continue or start over.
// Hidden entirely until hydration completes, which keeps the SSR markup and
// first client render byte-identical.
export function ResumeBanner() {
  const { state, hydrated, reset } = useScore();
  const [dismissed, setDismissed] = useState(false);

  if (!hydrated || dismissed) return null;
  const entries = Object.entries(state.results);
  if (entries.length === 0) return null;

  const correct = entries.filter(([, ok]) => ok).length;

  return (
    <div
      role="status"
      className="no-print border-l-4 border-blue-400 bg-blue-50 p-3 rounded-r text-sm flex flex-wrap items-center gap-3"
    >
      <span className="text-blue-800">
        <b>Resuming previous attempt:</b> {entries.length} answered · {correct} correct.
        Your previous picks aren't shown, only correctness.
      </span>
      <div className="flex gap-2 ml-auto">
        <button className="btn-ghost" onClick={() => setDismissed(true)}>
          Continue
        </button>
        <button
          className="btn-ghost"
          onClick={() => {
            reset();
            setDismissed(true);
          }}
        >
          Start over
        </button>
      </div>
    </div>
  );
}
