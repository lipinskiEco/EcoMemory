import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Logo } from '@/components/Logo';
import { ConnectButton } from '@/components/ConnectButton';

export const metadata: Metadata = {
  title: 'EcoMemory — On-chain memorials that plant trees',
  description:
    'EcoMemory is a decentralized memorial platform on ARC Testnet. Mint a living NFT tribute for $0.10 USDC. Every donation supports remembrance and reforestation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-stone-50 text-stone-900">
        <Providers>
          <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 px-6 py-4 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <a href="/" className="transition hover:opacity-80">
                <Logo />
              </a>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/lipinskiEco/EcoMemory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 sm:inline-block"
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
