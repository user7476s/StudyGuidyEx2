'use client';

import { useState, type ReactNode } from 'react';
import { MathDynamic } from '@/components/Math';

export function Reveal({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="reveal-details border border-slate-200 rounded my-2 bg-white"
    >
      <summary className="reveal-summary cursor-pointer select-none flex items-center gap-2 px-3 py-3 sm:py-2 font-medium rounded hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <span
          aria-hidden="true"
          className="reveal-chevron inline-block w-3 text-slate-500 transition-transform"
        >
          ▶
        </span>
        <span className="flex-1">{title}</span>
      </summary>
      <div className="px-3 pb-3">
        <MathDynamic>{children}</MathDynamic>
      </div>
    </details>
  );
}
