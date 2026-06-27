# PHY 2049 Exam 2 — personal study site

Static Next.js site with a §5.1–6.4 refresher, a §7.1–8.5 study guide (Electric
Potential & Capacitance), and two 100-question practice exams. Built for
self-study; **AI-aided personal study aid only** — not for graded work.

## Routes

| route          | purpose                                                   |
| -------------- | --------------------------------------------------------- |
| `/`            | landing                                                   |
| `/review`      | §5.1–6.4 prerequisite refresher                           |
| `/study-guide` | §7.1–8.5 deep dive + 4 interactive demos                  |
| `/exam-1`      | Practice Exam 1 — 100 MC + equation-match (incl. iClicker items) |
| `/exam-2`      | Practice Exam 2 — 100 MC, all original                    |

## Local dev

```bash
npm install
npm run dev    # http://localhost:3000
```

## Verification

```bash
npm run verify     # counts, ids, tags, hint/exp presence, figure-leak, stem overlap
npm run rederive   # sympy-independent numeric re-derivation of every numeric Q
```

## Build + deploy to GitHub Pages

1. **Edit one line.** Open [`next.config.js`](next.config.js) and change
   `REPO_NAME` from `'REPO_NAME'` to your actual GitHub repo name, e.g.
   `'phy2049-study'`. That's it — that's the only line you need to touch.

2. **Commit + push to `main`.**

3. **Set GitHub Pages source to "GitHub Actions"** (Settings → Pages →
   Source = "GitHub Actions"). The included workflow at
   [.github/workflows/deploy.yml](.github/workflows/deploy.yml) will build
   and deploy on every push to `main`.

The build produces a fully static `out/` directory (no server needed),
including a `.nojekyll` file so GitHub Pages serves `_next/` assets correctly.

## Notes

- All math is rendered via MathJax with `\(…\)` inline and `\[…\]` display
  delimiters. **Do not** use raw `$…$` anywhere.
- Any `\(…\)` written directly into JSX text content must have its `{` and `}`
  escaped as `&#123;` and `&#125;` (the JSX parser otherwise reads them as
  expressions). The included `fix_jsx_tex.py` at the repo root automates this
  if you add more inline TeX to `/review` or `/study-guide`.
- Question objects live in [data/exam1.ts](data/exam1.ts),
  [data/exam2.ts](data/exam2.ts), and [data/equationMatch.ts](data/equationMatch.ts).
  Add new ones via the `q({...})` helper in [data/helpers.ts](data/helpers.ts).
- The print affordance on each exam page sets `body[data-print-reveal=true]`,
  which CSS uses to reveal every hint, explanation, and answer key.
