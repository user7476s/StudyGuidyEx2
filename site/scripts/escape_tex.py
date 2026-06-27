#!/usr/bin/env python3
"""Escape { and } inside TeX delimiters \\(...\\) and \\[...\\] in JSX files.

Within a math block, { -> &#123; and } -> &#125;.
Also escape < -> &lt; and > -> &gt; inside math (to avoid JSX tag interpretation).
"""
import re
import sys
from pathlib import Path

MATH_RE = re.compile(r'(\\\(.*?\\\)|\\\[.*?\\\])', re.DOTALL)


def escape_in_math(match: re.Match) -> str:
    s = match.group(0)
    s = s.replace('{', '&#123;').replace('}', '&#125;')
    s = s.replace('<', '&lt;').replace('>', '&gt;')
    return s


def process(path: Path) -> bool:
    text = path.read_text(encoding='utf-8')
    new = MATH_RE.sub(escape_in_math, text)
    if new != text:
        path.write_text(new, encoding='utf-8')
        return True
    return False


if __name__ == '__main__':
    targets = [Path(p) for p in sys.argv[1:]]
    changed = []
    for p in targets:
        if process(p):
            changed.append(p)
    print(f'Modified {len(changed)} file(s):')
    for p in changed:
        print(' ', p)
