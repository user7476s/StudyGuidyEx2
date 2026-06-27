export type Source = 'iclicker' | 'textbook' | 'generated';

export interface QuestionFigure {
  svg: string;
  caption: string;
}

export interface Question {
  id: string;
  source: Source;
  topic: string;
  stem: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
  figure?: QuestionFigure;
  // Optional one-line rationale per option explaining why each wrong answer is
  // tempting and what mistake it represents. Length must match `options`; the
  // slot at `correctIndex` is unused (typically '').
  optionRationales?: string[];
}

export interface EquationMatch {
  formula: string;
  description: string;
}
