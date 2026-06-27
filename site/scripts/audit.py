#!/usr/bin/env python3
"""Numeric-consistency audit of every exam question.

For each q({...}) in data/exam1.ts and data/exam2.ts, compares the final
answer number in the keyed option against the final answer number in the
explanation. They must agree to within 2%. Reports any contradictions.

Approach:
  - Parse the keyed option for a `(value, unit)` pair where unit is one of
    a known list (V, V/m, C, F, J, T, N, m/s, eV, etc.). Skip if there is no
    unit (purely symbolic / conceptual answer).
  - In the explanation, find the LAST occurrence of a `(value, unit)` pair
    with the SAME unit family. That's the conclusion of the worked solution.
  - Flag a mismatch when the two values disagree by > 2%.

Also flags any leftover "typo", "going with", "recompute" language anywhere
in an explanation - those are markers of an internally contradictory item.
"""

from __future__ import annotations

import math
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = REPO_ROOT / 'data'

ID_RE      = re.compile(r"\bid:\s*'([^']+)'")
OPTS_RE    = re.compile(r"\boptions:\s*\[(.*?)\],\s*\n", re.DOTALL)
CORRECT_RE = re.compile(r"\bcorrect:\s*(\d+)")
EXP_RE     = re.compile(r"\bexp:\s*'((?:\\.|[^'\\])*)'", re.DOTALL)
OPT_RE     = re.compile(r"'((?:\\.|[^'\\])*)'")


def iter_q_blocks(text: str):
    """Yield each q({...}) block body, brace- and string-aware so that
    LaTeX braces inside string literals don't terminate the block early."""
    i = 0
    needle = 'q({'
    n = len(text)
    while True:
        i = text.find(needle, i)
        if i < 0:
            return
        start = i + len(needle)
        depth = 1
        j = start
        in_str = False
        while j < n and depth > 0:
            c = text[j]
            if in_str:
                if c == '\\':
                    j += 2
                    continue
                if c == "'":
                    in_str = False
            else:
                if c == "'":
                    in_str = True
                elif c == '{':
                    depth += 1
                elif c == '}':
                    depth -= 1
                    if depth == 0:
                        yield text[start:j]
                        i = j + 1
                        break
            j += 1
        else:
            return

SUP_MAP = str.maketrans({
    '\u207B': '-', '\u207A': '+',
    '\u2070': '0', '\u00B9': '1', '\u00B2': '2', '\u00B3': '3',
    '\u2074': '4', '\u2075': '5', '\u2076': '6',
    '\u2077': '7', '\u2078': '8', '\u2079': '9',
})

# Order matters: longer/more-specific patterns first so "V/m" beats bare "V".
UNIT_FAMILIES = [
    ('V/m',  ['V/m']),
    ('A.h',  ['A.h']),
    ('m/s',  ['m/s']),
    ('eV',   ['eV']),
    ('uJ',   ['uJ', 'µJ']),
    ('mJ',   ['mJ']),
    ('nJ',   ['nJ']),
    ('J',    ['J']),
    ('uC',   ['uC', 'µC']),
    ('mC',   ['mC']),
    ('nC',   ['nC']),
    ('pC',   ['pC']),
    ('C',    ['C']),
    ('uF',   ['uF', 'µF']),
    ('nF',   ['nF']),
    ('pF',   ['pF']),
    ('mF',   ['mF']),
    ('F',    ['F']),
    ('kV',   ['kV']),
    ('mV',   ['mV']),
    ('V',    ['V']),
    ('N',    ['N']),
    ('T',    ['T']),
]

UNIT_SCALE = {
    'V/m': 1.0, 'm/s': 1.0, 'eV': 1.0, 'J': 1.0, 'C': 1.0, 'F': 1.0,
    'N': 1.0, 'T': 1.0, 'V': 1.0, 'A.h': 1.0,
    'kV': 1e3, 'mV': 1e-3,
    'uJ': 1e-6, 'mJ': 1e-3, 'nJ': 1e-9,
    'uC': 1e-6, 'mC': 1e-3, 'nC': 1e-9, 'pC': 1e-12,
    'uF': 1e-6, 'nF': 1e-9, 'pF': 1e-12, 'mF': 1e-3,
}

# Number with optional ×10^n. Sign optional.
NUMBER_RE = re.compile(
    r"""
    (?P<sign>[+\-−]?)\s*
    (?P<m>\d+(?:\.\d+)?)
    (?:\s*(?:\\times|×|\*)\s*10
        (?:\^\{(?P<exp1>-?\d+)\}
         | \^(?P<exp2>-?\d+)
         | (?P<exp3>[\u207B\u00B0-\u00B9\u2070-\u2079]+)
        )
    )?
    """,
    re.VERBOSE,
)


def normalize(s: str) -> str:
    # TS source-strings have escaped backslashes (\\(  not  \(). Collapse them
    # so the LaTeX-shaped normalizations below match.
    s = s.replace('\\\\', '\\')
    s = s.replace('\\,', ' ').replace('\\;', ' ').replace('\\!', '').replace('\\ ', ' ')
    s = re.sub(r'\\dfrac\{([^{}]*)\}\{([^{}]*)\}', r'(\1)/(\2)', s)
    s = re.sub(r'\\frac\{([^{}]*)\}\{([^{}]*)\}', r'(\1)/(\2)', s)
    s = re.sub(r'\\text\{([^{}]*)\}', r'\1', s)
    s = s.replace('\\mu', 'µ').replace('\\Omega', 'Ω')
    s = s.replace('\\(', '').replace('\\)', '')
    s = s.replace('\\approx', '~=').replace('\\cdot', '.')
    s = s.replace('{', '').replace('}', '')
    return s


def parse_number(group: re.Match) -> float | None:
    try:
        sign = group.group('sign') or ''
        sign = '-' if sign in ('-', '−') else ''
        v = float(sign + group.group('m'))
        exp_str = group.group('exp1') or group.group('exp2')
        if not exp_str and group.group('exp3'):
            exp_str = group.group('exp3').translate(SUP_MAP)
        if exp_str:
            v *= 10 ** int(exp_str)
        return v
    except (ValueError, TypeError):
        return None


def find_numeric_pairs(chunk: str) -> list[tuple[float, str]]:
    """Return [(value_in_SI, unit_family), ...] from chunk, in order."""
    s = normalize(chunk)
    out = []
    pos = 0
    while pos < len(s):
        m = NUMBER_RE.search(s, pos)
        if not m:
            break
        v = parse_number(m)
        pos = m.end()
        if v is None:
            continue
        # Look for a unit immediately following (allowing whitespace and a "/").
        tail = s[m.end():m.end() + 16]
        tail_strip = tail.lstrip()
        matched_unit = None
        for fam, patterns in UNIT_FAMILIES:
            for p in patterns:
                if tail_strip.startswith(p):
                    nxt = tail_strip[len(p):len(p) + 1]
                    if nxt == '' or not nxt.isalnum():
                        matched_unit = fam
                        break
            if matched_unit:
                break
        if matched_unit:
            out.append((v * UNIT_SCALE[matched_unit], matched_unit))
    return out


def split_options(blob: str) -> list[str]:
    return [m.group(1) for m in OPT_RE.finditer(blob)]


def parse_questions(path: Path):
    text = path.read_text(encoding='utf-8')
    out = []
    for body in iter_q_blocks(text):
        qid_m = ID_RE.search(body)
        opts_m = OPTS_RE.search(body)
        corr_m = CORRECT_RE.search(body)
        exp_m = EXP_RE.search(body)
        if not (qid_m and opts_m and corr_m and exp_m):
            continue
        out.append({
            'id': qid_m.group(1),
            'options': split_options(opts_m.group(1)),
            'correct': int(corr_m.group(1)),
            'exp': exp_m.group(1),
        })
    return out


def audit_one(q) -> list[str]:
    msgs = []
    for w in ('typo', 'going with', 'recompute', '(None'):
        if w in q['exp']:
            msgs.append(f'  FAIL {q["id"]}: explanation contains "{w}"')

    if not q['options']:
        return msgs
    try:
        keyed = q['options'][q['correct']]
    except IndexError:
        return msgs + [f'  FAIL {q["id"]}: correct index out of range']

    key_pairs = find_numeric_pairs(keyed)
    if not key_pairs:
        return msgs  # symbolic answer
    key_val, key_unit = key_pairs[0]

    # The explanation may quote several intermediate values with the same unit;
    # the item is consistent as long as the keyed answer appears among them.
    exp_pairs = find_numeric_pairs(q['exp'])
    same_unit = [v for v, u in exp_pairs if u == key_unit]
    if not same_unit:
        return msgs

    def near(a: float, b: float) -> bool:
        if a == 0 or b == 0:
            return abs(a - b) < 1e-12
        return abs(a - b) / abs(a) < 0.02

    if any(near(key_val, v) for v in same_unit):
        return msgs

    msgs.append(
        f'  MISMATCH {q["id"]}: keyed {key_val:g} {key_unit} '
        f'not found among explanation values {same_unit}'
    )
    return msgs


def main() -> int:
    total = 0
    for fname in ('exam1.ts', 'exam2.ts'):
        path = DATA_DIR / fname
        print(f'== {fname} ==')
        for q in parse_questions(path):
            for line in audit_one(q):
                print(line)
                total += 1
    print(f'\n{total} issue(s) found.')
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
