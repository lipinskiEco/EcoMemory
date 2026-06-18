import type { Metadata } from 'next';
import { Marcellus, EB_Garamond } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ConnectButton } from '@/components/ConnectButton';

// Elegant Trajan-like caps serif display (CAPS wordmark + headlines) and body serif (incl. italic).
const display = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
});

const body = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EcoMemory — On-chain memorials that plant trees',
  description:
    'EcoMemory is a decentralized memorial platform on ARC Testnet. Mint a living NFT tribute for $0.10 USDC. Every donation supports remembrance and reforestation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-serif antialiased bg-ivory text-ink">
        <Providers>
          <header className="sticky top-0 z-40 border-b border-ink/10 bg-ivory/85 px-6 py-4 backdrop-blur-md">
            <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-4 sm:grid-cols-3">
              {/* Left: status pill */}
              <div className="flex items-center">
                <span className="pill">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-eco-500" />
                  Status · On-Chain
                </span>
              </div>

              {/* Center: serif wordmark */}
              <div className="hidden justify-center sm:flex">
                <a
                  href="/"
                  className="font-display text-2xl font-medium uppercase tracking-widest2 text-ink transition hover:opacity-70"
                >
                  EcoMemory
                </a>
              </div>

              {/* Right: GitHub text link + ConnectButton */}
              <div className="flex items-center justify-end gap-4">
                <a
                  href="https://github.com/lipinskiEco/EcoMemory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden text-xs uppercase tracking-widest2 text-ink/60 transition hover:text-ink sm:inline-block"
                >
                  GitHub
                </a>
                <ConnectButton />
              </div>
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
