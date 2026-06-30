import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { MathProvider } from '@/components/Math';
import { Nav } from '@/components/Nav';
import { VERSION, LAST_UPDATED } from '@/lib/version';

export const metadata: Metadata = {
  title: 'PHY 2049 — Potential, Capacitance, Current (Ch. 7–9)',
  description: 'Personal AI-aided study aid for §7.1–9.4. Not for graded work.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MathProvider>
          <Nav />
          <main className="max-w-5xl mx-auto px-4 py-6">
            {children}
          </main>
          <footer className="max-w-5xl mx-auto px-4 py-8 text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1 justify-between">
            <span>
              Static study aid built from OpenStax University Physics Vol. 2. Personal use only.
            </span>
            <span>
              <span className="font-mono">{VERSION}</span>
              <span className="mx-1">·</span>
              <span>Updated {LAST_UPDATED}</span>
              <span aria-hidden className="ml-2 opacity-30 hover:opacity-100 transition" title="Ding!">
                🔔
              </span>
            </span>
          </footer>
        </MathProvider>
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"a810643bda0d4df9a1a615c755265097"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
