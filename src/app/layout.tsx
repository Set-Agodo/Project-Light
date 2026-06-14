import type { Metadata } from 'next';
import { Poppins, Roboto, Caveat } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/BottomNav';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-poppins',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-caveat',
});

export const metadata: Metadata = {
  title: 'Project Light — Literacy for Life Transformation',
  description: 'Who God Is: An interactive literacy and pre-reading program built on Scripture.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="fantasy" className={`${poppins.variable} ${roboto.variable} ${caveat.variable}`}>
      <body className="min-h-screen flex flex-col font-[var(--font-roboto)]">
        {/* Wooden sign navbar */}
        <div
          className="wood-dark navbar sticky top-0 z-50 px-4"
          style={{
            boxShadow: '0 3px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 0 rgba(0,0,0,0.25)',
          }}
        >
          <div className="navbar-start gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
              <img src="/images/logo.jpg" alt="Project Light logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p className="text-sm font-black leading-tight" style={{ color: '#f5e8c8' }}>Project Light</p>
              <p className="text-xs font-semibold leading-tight" style={{ color: 'rgba(245,232,200,0.5)' }}>Literacy for Life</p>
            </div>
          </div>
          <div className="navbar-end">
            <span
              className="badge font-bold text-xs border-0"
              style={{
                background: 'linear-gradient(135deg, #c49040, #a07028)',
                color: '#3d2000',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 4px rgba(0,0,0,0.35)',
                fontFamily: 'var(--font-poppins)',
              }}
            >Who God Is</span>
          </div>
        </div>

        <main className="flex-1 pb-14">
          {children}
        </main>

        <BottomNav />
      </body>
    </html>
  );
}
