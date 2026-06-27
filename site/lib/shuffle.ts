import type { Question } from './types';

// Fisher–Yates in-place shuffle of a copy. Returns a new array.
function fyShuffle<T>(arr: readonly T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Shuffle the question order, then shuffle each question's options and remap
// correctIndex (and optionRationales, if present) so grading by index still
// resolves to the original correct option.
// id, source, topic, stem, hint, explanation, figure are preserved verbatim.
export function shuffleExam(qs: readonly Question[]): Question[] {
  const shuffledOrder = fyShuffle(qs);
  return shuffledOrder.map((q) => {
    const indices = q.options.map((_, i) => i);
    const permuted = fyShuffle(indices);
    const options = permuted.map((i) => q.options[i]);
    const correctIndex = permuted.indexOf(q.correctIndex);
    const optionRationales = q.optionRationales
      ? permuted.map((i) => q.optionRationales![i])
      : undefined;
    return { ...q, options, correctIndex, optionRationales };
  });
}