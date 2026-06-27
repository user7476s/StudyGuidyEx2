'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface ScoreState {
  results: Record<string, boolean>;
  // Bumped on reset and on initial client mount so the exam page can
  // re-shuffle question + option order without breaking grading.
  nonce: number;
}

type Action =
  | { type: 'lock'; id: string; correct: boolean }
  | { type: 'reset' }
  | { type: 'bump' }
  | { type: 'hydrate'; results: Record<string, boolean> };

const Ctx = createContext<{
  state: ScoreState;
  hydrated: boolean;
  storageKey?: string;
  lock: (id: string, correct: boolean) => void;
  reset: () => void;
  bumpNonce: () => void;
} | null>(null);

function reducer(state: ScoreState, a: Action): ScoreState {
  switch (a.type) {
    case 'lock':
      if (state.results[a.id] !== undefined) return state;
      return { ...state, results: { ...state.results, [a.id]: a.correct } };
    case 'reset':
      return { results: {}, nonce: state.nonce + 1 };
    case 'bump':
      return { ...state, nonce: state.nonce + 1 };
    case 'hydrate':
      return { ...state, results: a.results };
  }
}

export function ScoreProvider({
  children,
  storageKey,
}: {
  children: ReactNode;
  storageKey?: string;
}) {
  const [state, dispatch] = useReducer(reducer, { results: {}, nonce: 0 });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage exactly once after mount. Reading happens inside
  // useEffect so SSR output and the first client render are byte-identical.
  useEffect(() => {
    if (!storageKey) {
      setHydrated(true);
      return;
    }
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && parsed.results) {
          dispatch({ type: 'hydrate', results: parsed.results });
        }
      }
    } catch {
      // ignore malformed payloads — they'll be overwritten on next lock.
    }
    setHydrated(true);
  }, [storageKey]);

  // Write-through after every state change. Skipped until after the hydrate
  // pass so we don't overwrite saved data with the empty initial state.
  const writeReady = useRef(false);
  useEffect(() => {
    if (!storageKey) return;
    if (!hydrated) return;
    if (!writeReady.current) {
      writeReady.current = true;
      return;
    }
    try {
      if (Object.keys(state.results).length === 0) {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, JSON.stringify({ results: state.results }));
      }
    } catch {
      // storage full or disabled — silently degrade.
    }
  }, [state.results, storageKey, hydrated]);

  const lock = useCallback((id: string, correct: boolean) => dispatch({ type: 'lock', id, correct }), []);
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);
  const bumpNonce = useCallback(() => dispatch({ type: 'bump' }), []);
  const value = useMemo(
    () => ({ state, hydrated, storageKey, lock, reset, bumpNonce }),
    [state, hydrated, storageKey, lock, reset, bumpNonce],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useScore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useScore must be inside ScoreProvider');
  return ctx;
}

export function Scorebar({
  total,
  mcTotal,
  matchTotal,
  title,
}: {
  total?: number;
  mcTotal?: number;
  matchTotal?: number;
  title?: string;
}) {
  const { state, reset } = useScore();
  const entries = Object.entries(state.results);
  const correct = entries.filter(([, ok]) => ok).length;
  const locked = entries.length;
  const pct = locked > 0 ? Math.round((correct / locked) * 100) : 0;

  const split = mcTotal !== undefined && matchTotal !== undefined;
  let breakdown: string;
  if (split) {
    const mcEntries = entries.filter(([id]) => /^E\d-\d{3}$/.test(id));
    const mcLocked = mcEntries.length;
    const matchLocked = locked - mcLocked;
    breakdown = `Answered ${mcLocked}/${mcTotal} MC + ${matchLocked}/${matchTotal} matching`;
  } else {
    breakdown = `Answered ${locked}/${total ?? locked}`;
  }

  return (
    <div className="scorebar no-print">
      <div className="font-semibold">{title ?? 'Score'}</div>
      <div className="flex-1 text-slate-700">
        {breakdown} · Correct <b>{correct}</b> · {pct}%
      </div>
      <button className="btn-ghost" onClick={() => reset()}>Reset</button>
    </div>
  );
}
