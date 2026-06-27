import type { Question, Source } from '@/lib/types';

export function q(o: {
  id: string;
  src: Source;
  topic: string;
  stem: string;
  options: string[];
  correct: number;
  hint: string;
  exp: string;
  figure?: { svg: string; caption: string };
  rationales?: string[];
}): Question {
  return {
    id: o.id,
    source: o.src,
    topic: o.topic,
    stem: o.stem,
    options: o.options,
    correctIndex: o.correct,
    hint: o.hint,
    explanation: o.exp,
    figure: o.figure,
    optionRationales: o.rationales,
  };
}
