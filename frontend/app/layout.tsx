import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Logo } from '@/components/Logo';
import { ConnectButton } from '@/components/ConnectButton';

export const metadata: Metadata = {
  title: 'EcoMemory — On-chain memorials that plant trees',
  description:
    'Mint a living memorial NFT for $0.10 USDC. Share a QR code page. Every donation supports the memorial fund and tree planting.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-stone-50 text-stone-900">
        <Providers>
          <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/80 px-6 py-4 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
              <Logo />
              <ConnectButton />
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
