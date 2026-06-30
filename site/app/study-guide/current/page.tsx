import { MathStatic } from '@/components/Math';
import { SectionNav } from '@/components/SectionNav';
import { Section91 } from '../sections/Section91';
import { Section92 } from '../sections/Section92';
import { Section93 } from '../sections/Section93';
import { Section94 } from '../sections/Section94';

const SECTIONS = [
  { id: 's91', label: '§9.1 Electrical Current' },
  { id: 's92', label: '§9.2 Conduction Model' },
  { id: 's93', label: '§9.3 Resistivity & Resistance' },
  { id: 's94', label: '§9.4 Ohm\u2019s Law' },
];

export default function CurrentPage() {
  return (
    <div id="top" className="md:grid md:grid-cols-[1fr_14rem] md:gap-6 md:items-start">
      <div className="space-y-4 min-w-0">
        <header>
          <h1 className="text-3xl font-bold">Chapter 9 — Current and Resistance</h1>
          <p className="text-slate-600 mt-1 text-sm">
            Jump to: <a href="#s91" className="text-blue-700 underline">§9.1</a>{' · '}
            <a href="#s92" className="text-blue-700 underline">§9.2</a>{' · '}
            <a href="#s93" className="text-blue-700 underline">§9.3</a>{' · '}
            <a href="#s94" className="text-blue-700 underline">§9.4</a>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            §9.1–9.2 are confirmed on-scope from iClicker/homework evidence. §9.3–9.4 are included
            for coverage safety.
          </p>
        </header>

        <MathStatic>
          <Section91 />
          <Section92 />
          <Section93 />
          <Section94 />
        </MathStatic>
      </div>

      <SectionNav sections={SECTIONS} />
    </div>
  );
}
