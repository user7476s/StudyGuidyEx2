import type { Source } from '@/lib/types';
import clsx from 'clsx';

const labels: Record<Source, string> = {
  iclicker: 'iclicker',
  textbook: 'textbook',
  generated: 'generated',
  homework: 'homework',
};

export function SourceChip({ source }: { source: Source }) {
  return (
    <span
      className={clsx('chip', {
        'chip-iclicker': source === 'iclicker',
        'chip-textbook': source === 'textbook',
        'chip-generated': source === 'generated',
        'chip-homework': source === 'homework',
      })}
      title={`Source: ${labels[source]}`}
    >
      {labels[source]}
    </span>
  );
}
