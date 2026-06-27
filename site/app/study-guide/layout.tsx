import Link from 'next/link';
import type { ReactNode } from 'react';

export default function StudyGuideLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <nav className="border border-slate-200 rounded bg-slate-50 px-3 py-2 mb-6 text-sm flex flex-wrap gap-x-4 gap-y-1">
        <span className="font-semibold text-slate-700">Study guide:</span>
        <Link href="/study-guide/" className="text-blue-700 hover:underline">Overview &amp; formulas</Link>
        <Link href="/study-guide/potential/" className="text-blue-700 hover:underline">Ch. 7 — Potential</Link>
        <Link href="/study-guide/capacitance/" className="text-blue-700 hover:underline">Ch. 8 — Capacitance</Link>
        <Link href="/study-guide/mixed-review/" className="text-blue-700 hover:underline">Mixed review</Link>
      </nav>
      {children}
    </div>
  );
}
