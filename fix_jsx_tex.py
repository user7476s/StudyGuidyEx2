"""Multi-line, idempotent JSX-TeX brace escaper.

Replaces { and } INSIDE \(...\) and \[...\] inline TeX spans (including
multi-line spans) with HTML entities so the JSX parser does not interpret
them as expression escapes. The MathJax renderer decodes entities back into
braces transparently.

Skips spans inside JS string literals (single/double/backtick). Idempotent.
"""

import re
import sys
from pathlib import Path

# Multi-line, non-greedy matches.
INLINE_RE = re.compile(r'\\\((.*?)\\\)', re.DOTALL)
DISPLAY_RE = re.compile(r'\\\[(.*?)\\\]', re.DOTALL)


def escape_in(m: re.Match) -> str:
    return m.group(0).replace('{', '&#123;').replace('}', '&#125;')


def process_file(path: Path) -> bool:
    src = path.read_text(encoding='utf-8')
    # Track which character offsets are inside a string literal; skip those.
    in_str_mask = [False] * len(src)
    in_s = in_d = in_b = False
    i = 0
    while i < len(src):
        c = src[i]
        prev = src[i - 1] if i > 0 else ''
        if prev != '\\':
            if c == "'" and not in_d and not in_b:
                in_s = not in_s
            elif c == '"' and not in_s and not in_b:
                in_d = not in_d
            elif c == '`' and not in_s and not in_d:
                in_b = not in_b
        in_str_mask[i] = in_s or in_d or in_b
        i += 1

    def safe_sub(m: re.Match) -> str:
        if in_str_mask[m.start()]:
            return m.group(0)
        return escape_in(m)

    new_src = INLINE_RE.sub(safe_sub, src)
    # Rebuild mask for second pass since indices may shift; easier: re-run mask
    in_str_mask = [False] * len(new_src)
    in_s = in_d = in_b = False
    for i, c in enumerate(new_src):
        prev = new_src[i - 1] if i > 0 else ''
        if prev != '\\':
            if c == "'" and not in_d and not in_b:
                in_s = not in_s
            elif c == '"' and not in_s and not in_b:
                in_d = not in_d
            elif c == '`' and not in_s and not in_d:
                in_b = not in_b
        in_str_mask[i] = in_s or in_d or in_b

    def safe_sub_disp(m: re.Match) -> str:
        if in_str_mask[m.start()]:
            return m.group(0)
        return escape_in(m)

    new_src = DISPLAY_RE.sub(safe_sub_disp, new_src)
    if new_src != src:
        path.write_text(new_src, encoding='utf-8')
        return True
    return False


if __name__ == '__main__':
    for arg in sys.argv[1:]:
        p = Path(arg)
        if process_file(p):
            print(f'updated: {p}')
        else:
            print(f'no change: {p}')
