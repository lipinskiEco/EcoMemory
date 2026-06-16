import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'EcoMemory — On-chain memorials that plant trees',
  description:
    'Mint a living memorial NFT for $0.10 USDC. Share a QR code page. Every donation supports the memorial fund and tree planting.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-stone-50 text-stone-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
