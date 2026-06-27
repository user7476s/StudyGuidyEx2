'use client';

import { MathStatic } from './Math';

export interface FormulaRow {
  name: string;
  tex: string; // bare TeX without delimiters
}

export function FormulaSheet({ rows, title }: { rows: FormulaRow[]; title?: string }) {
  return (
    <section className="my-6">
      {title && <h3 className="font-semibold text-lg mb-2">{title}</h3>}
      <div className="rounded border border-slate-200 bg-white p-4">
        <MathStatic>
          <div>
            {rows.map((r) => (
              <div key={r.name} className="formula-row">
                <div className="text-sm text-slate-700">{r.name}</div>
                <div className="md:justify-self-end">{`\\(${r.tex}\\)`}</div>
              </div>
            ))}
          </div>
        </MathStatic>
      </div>
    </section>
  );
}
