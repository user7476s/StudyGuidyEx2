import { MathStatic } from '@/components/Math';
import { SectionNav } from '@/components/SectionNav';
import { Section71 } from '../sections/Section71';
import { Section72 } from '../sections/Section72';
import { Section73 } from '../sections/Section73';
import { Section74 } from '../sections/Section74';
import { Section75 } from '../sections/Section75';
import { Section76 } from '../sections/Section76';

const SECTIONS = [
  { id: 's71', label: '§7.1 Potential Energy' },
  { id: 's72', label: '§7.2 Electric Potential' },
  { id: 's73', label: '§7.3 Equipotentials' },
  { id: 's74', label: '§7.4 V from Charges' },
  { id: 's75', label: '§7.5 Conductors' },
  { id: 's76', label: '§7.6 Applications' },
];

export default function PotentialPage() {
  return (
    <div id="top" className="md:grid md:grid-cols-[1fr_14rem] md:gap-6 md:items-start">
      <div className="space-y-4 min-w-0">
        <header>
          <h1 className="text-3xl font-bold">Chapter 7 — Electric Potential</h1>
          <p className="text-slate-600 mt-1 text-sm">
            Jump to: <a href="#s71" className="text-blue-700 underline">§7.1</a>{' · '}
            <a href="#s72" className="text-blue-700 underline">§7.2</a>{' · '}
            <a href="#s73" className="text-blue-700 underline">§7.3</a>{' · '}
            <a href="#s74" className="text-blue-700 underline">§7.4</a>{' · '}
            <a href="#s75" className="text-blue-700 underline">§7.5</a>{' · '}
            <a href="#s76" className="text-blue-700 underline">§7.6</a>
          </p>
        </header>

        <MathStatic>
          <Section71 />
          <Section72 />
          <Section73 />
          <Section74 />
          <Section75 />
          <Section76 />
        </MathStatic>
      </div>

      <SectionNav sections={SECTIONS} />
    </div>
  );
}
