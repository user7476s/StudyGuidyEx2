'use client';

import Link from 'next/link';
import { useState } from 'react';

const LINKS = [
  { href: '/review/', label: 'Review (§5.1–6.4)' },
  { href: '/study-guide/', label: 'Study Guide' },
  { href: '/exam-traps/', label: 'Exam traps' },
  { href: '/exam-1/', label: 'Exam 1' },
  { href: '/exam-2/', label: 'Exam 2' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="font-bold" onClick={() => setOpen(false)}>
            PHY 2049 · Ch. 7–8
          </Link>

          <div className="hidden sm:flex items-center gap-4">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </div>

          <button
            type="button"
            className="sm:hidden inline-flex items-center justify-center rounded border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-expanded={open}
            aria-controls="primary-nav-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </>
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div id="primary-nav-menu" className="sm:hidden mt-2 flex flex-col gap-1 border-t border-slate-200 pt-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block px-2 py-2 rounded hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="bg-amber-50 border-t border-amber-200 text-amber-900 text-xs px-4 py-1.5 text-center">
        Personal study aid. <b>Its not official</b> — Very bodacious.
      </div>
    </nav>
  );
}
