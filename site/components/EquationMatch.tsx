'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { MathDynamic } from './Math';
import { useScore } from './Scorebar';

export interface MatchItem {
  id: string;
  concept: string;
  correctFormulaId: string;
  explanation: string;
}

export interface FormulaChoice {
  id: string;
  tex: string;
  isDistractor?: boolean;
}

export function EquationMatchBlock({
  title,
  items,
  formulas,
}: {
  title: string;
  items: MatchItem[];
  formulas: FormulaChoice[];
}) {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const { lock } = useScore();

  function choose(itemId: string, fid: string, correctId: string) {
    if (picks[itemId]) return;
    setPicks((p) => ({ ...p, [itemId]: fid }));
    lock(itemId, fid === correctId);
  }

  return (
    <section className="my-6">
      <h2 className="font-bold text-xl mb-3">{title}</h2>
      <p className="text-sm text-slate-600 mb-3">
        Match each concept on the left to the correct formula on the right. Two formulas are intentional distractors.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2 text-sm">Concepts</h3>
          <MathDynamic>
            <ul className="space-y-2">
              {items.map((it) => {
                const picked = picks[it.id];
                const correct = picked === it.correctFormulaId;
                return (
                  <li key={it.id} className="border border-slate-200 rounded p-2 bg-white">
                    <div className="text-sm">{it.concept}</div>
                    <div className="flex gap-1 flex-wrap mt-2 no-print">
                      {formulas.map((f) => (
                        <button
                          key={f.id}
                          disabled={!!picked}
                          onClick={() => choose(it.id, f.id, it.correctFormulaId)}
                          aria-label={`Match "${it.concept}" to formula ${f.id}`}
                          title={`Formula ${f.id}`}
                          className={clsx(
                            'px-2 py-1 text-xs rounded border',
                            picked === f.id && correct && 'bg-emerald-100 border-emerald-500',
                            picked === f.id && !correct && 'bg-rose-100 border-rose-500',
                            picked && picked !== f.id && f.id === it.correctFormulaId && 'bg-emerald-50 border-emerald-400',
                            !picked && 'bg-white border-slate-300 hover:bg-slate-50'
                          )}
                        >
                          {f.id}
                        </button>
                      ))}
                    </div>
                    {picked && (
                      <MathDynamic>
                        <div className="text-xs mt-2 reveal-on-print">
                          {correct ? (
                            <span className="text-emerald-700 font-semibold">Correct. </span>
                          ) : (
                            <span className="text-rose-700 font-semibold">Not quite. Correct: {it.correctFormulaId}. </span>
                          )}
                          <span dangerouslySetInnerHTML={{ __html: it.explanation }} />
                        </div>
                      </MathDynamic>
                    )}
                  </li>
                );
              })}
            </ul>
          </MathDynamic>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-sm">Formula bank</h3>
          <MathDynamic>
            <ul className="space-y-2">
              {formulas.map((f) => (
                <li key={f.id} className="flex items-center gap-3 border border-slate-200 rounded p-2 bg-white">
                  <span className="font-mono text-xs text-slate-500 w-6">{f.id}.</span>
                  <span dangerouslySetInnerHTML={{ __html: `\\(${f.tex}\\)` }} />
                </li>
              ))}
            </ul>
          </MathDynamic>
        </div>
      </div>
    </section>
  );
}
