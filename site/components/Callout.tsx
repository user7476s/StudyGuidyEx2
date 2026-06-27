import type { ReactNode } from 'react';
import { getExamTrap } from '@/data/examTraps';

export function Tip({ children, title = 'Tip' }: { children: ReactNode; title?: string }) {
  return (
    <div className="callout-tip">
      <div className="font-semibold text-emerald-800 mb-1">{title}</div>
      <div>{children}</div>
    </div>
  );
}

export function Pitfall({ children, title = 'Common pitfall' }: { children: ReactNode; title?: string }) {
  return (
    <div className="callout-pitfall">
      <div className="font-semibold text-rose-800 mb-1">{title}</div>
      <div>{children}</div>
    </div>
  );
}

export function ExamTrap({ children, title = 'Exam trap' }: { children: ReactNode; title?: string }) {
  return (
    <div className="callout-examtrap">
      <div className="font-semibold text-amber-800 mb-1">{title}</div>
      <div>{children}</div>
    </div>
  );
}

// Data-driven exam-trap callout that pulls its body from data/examTraps.ts.
// Until an entry has been transcribed into the data file, falls back to a
// visible placeholder so it's obvious which traps still need migration.
export function ExamTrapById({ id }: { id: string }) {
  const entry = getExamTrap(id);
  if (!entry) {
    return (
      <div className="callout-examtrap">
        <div className="font-semibold text-amber-800 mb-1">Exam trap</div>
        <div className="text-xs text-amber-900/70">[trap “{id}” not yet in data/examTraps.ts]</div>
      </div>
    );
  }
  return (
    <div className="callout-examtrap">
      <div className="font-semibold text-amber-800 mb-1">{entry.title ?? 'Exam trap'}</div>
      <div dangerouslySetInnerHTML={{ __html: entry.bodyHtml }} />
    </div>
  );
}

export function Connection({ children, title = 'How this connects' }: { children: ReactNode; title?: string }) {
  return (
    <div className="callout-connection">
      <div className="font-semibold text-sky-800 mb-1">{title}</div>
      <div>{children}</div>
    </div>
  );
}
