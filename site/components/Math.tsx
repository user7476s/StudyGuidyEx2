'use client';

import { MathJax, MathJaxContext } from 'better-react-mathjax';
import type { ReactNode } from 'react';

const mathJaxConfig = {
  loader: { load: ['[tex]/ams', '[tex]/cancel'] },
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['\\[', '\\]']],
    packages: { '[+]': ['ams', 'cancel'] },
    processEscapes: true,
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
  },
};

export function MathProvider({ children }: { children: ReactNode }) {
  return (
    <MathJaxContext version={3} config={mathJaxConfig}>
      {children}
    </MathJaxContext>
  );
}

export function MathStatic({ children }: { children: ReactNode }) {
  return <MathJax>{children}</MathJax>;
}

export function MathDynamic({ children }: { children: ReactNode }) {
  return <MathJax dynamic>{children}</MathJax>;
}
