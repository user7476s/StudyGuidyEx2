'use client';

import { useEffect, useState } from 'react';

export function PrintRevealAll() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (on) document.body.setAttribute('data-print-reveal', 'true');
    else document.body.removeAttribute('data-print-reveal');
    return () => document.body.removeAttribute('data-print-reveal');
  }, [on]);

  return (
    <div className="no-print flex items-center gap-2">
      <label className="text-sm flex items-center gap-1">
        <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} />
        Reveal all hints + answers (for print)
      </label>
      <button className="btn-ghost" onClick={() => window.print()}>Print → PDF</button>
    </div>
  );
}
