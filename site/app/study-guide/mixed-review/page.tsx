import { MathStatic } from '@/components/Math';
import { MixedReview } from '../sections/MixedReview';

export default function MixedReviewPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-bold">Mixed review</h1>
        <p className="text-slate-600 mt-1 text-sm">
          Cross-section integrative problems spanning §7.1–9.4.
        </p>
      </header>

      <MathStatic>
        <MixedReview />
      </MathStatic>
    </div>
  );
}
