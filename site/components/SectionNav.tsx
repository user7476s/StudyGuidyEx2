'use client';

import { useEffect, useState } from 'react';

type Item = { id: string; label: string };

export function SectionNav({ sections }: { sections: Item[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  const current = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <>
      {/* Mobile: compact sticky bar — shows current section + jump dropdown */}
      <div className="md:hidden sticky top-0 z-20 -mx-4 px-4 py-1.5 bg-paper/90 backdrop-blur border-b border-slate-200 flex items-center gap-2 text-xs">
        <span className="text-slate-500 shrink-0">On:</span>
        <select
          aria-label="Jump to section"
          className="flex-1 min-w-0 bg-transparent font-semibold text-slate-800 border border-slate-300 rounded px-1 py-0.5"
          value={current?.id ?? ''}
          onChange={(e) => {
            const id = e.target.value;
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          {sections.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
        <a href="#top" className="text-accent shrink-0" aria-label="Back to top">↑ top</a>
      </div>

      {/* Desktop: sticky sidebar */}
      <aside className="hidden md:block">
        <nav
          aria-label="On this page"
          className="sticky top-4 text-sm bg-paper/90 backdrop-blur border border-slate-200 rounded p-3"
        >
          <div className="font-semibold text-slate-700 text-xs uppercase tracking-wide mb-2">
            On this page
          </div>
          <ul className="space-y-1">
            {sections.map((s) => {
              const isActive = s.id === active;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={
                      isActive
                        ? 'block border-l-2 border-accent pl-2 -ml-px font-semibold text-ink'
                        : 'block border-l-2 border-transparent pl-2 -ml-px text-slate-600 hover:text-ink hover:border-slate-300'
                    }
                  >
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href="#top"
            className="block mt-3 pt-2 border-t border-slate-200 text-xs text-accent hover:underline"
          >
            ↑ Back to top
          </a>
        </nav>
      </aside>
    </>
  );
}
