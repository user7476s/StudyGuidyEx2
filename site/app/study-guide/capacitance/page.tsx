import { MathStatic } from '@/components/Math';
import { SectionNav } from '@/components/SectionNav';
import { Section81 } from '../sections/Section81';
import { Section82 } from '../sections/Section82';
import { Section83 } from '../sections/Section83';
import { Section84 } from '../sections/Section84';
import { Section85 } from '../sections/Section85';

const SECTIONS = [
  { id: 's81', label: '§8.1 Capacitors' },
  { id: 's82', label: '§8.2 Series & Parallel' },
  { id: 's83', label: '§8.3 Stored Energy' },
  { id: 's84', label: '§8.4 Dielectrics' },
  { id: 's85', label: '§8.5 Molecular Model' },
];

export default function CapacitancePage() {
  return (
    <div id="top" className="md:grid md:grid-cols-[1fr_14rem] md:gap-6 md:items-start">
      <div className="space-y-4 min-w-0">
        <header>
          <h1 className="text-3xl font-bold">Chapter 8 — Capacitance</h1>
          <p className="text-slate-600 mt-1 text-sm">
            Jump to: <a href="#s81" className="text-blue-700 underline">§8.1</a>{' · '}
            <a href="#s82" className="text-blue-700 underline">§8.2</a>{' · '}
            <a href="#s83" className="text-blue-700 underline">§8.3</a>{' · '}
            <a href="#s84" className="text-blue-700 underline">§8.4</a>{' · '}
            <a href="#s85" className="text-blue-700 underline">§8.5</a>
          </p>
        </header>

        <MathStatic>
          <Section81 />
          <Section82 />
          <Section83 />
          <Section84 />
          <Section85 />
        </MathStatic>
      </div>

      <SectionNav sections={SECTIONS} />
    </div>
  );
}
