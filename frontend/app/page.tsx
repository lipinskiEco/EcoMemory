import { MintForm } from '@/components/MintForm';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-eco-900 via-eco-800 to-stone-900 py-24 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-eco-400 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-300 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            Living memories, on-chain.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-eco-100">
            Mint a memorial NFT for $0.10 USDC. Share a QR code page. Every
            micro-donation splits 50/50 between the memorial fund and planting
            trees.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <MintForm />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="card text-center">
            <p className="text-3xl font-semibold text-eco-700">$0.10</p>
            <p className="mt-1 text-sm text-stone-600">Mint cost in USDC</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-semibold text-eco-700">50/50</p>
            <p className="mt-1 text-sm text-stone-600">Memorial / trees split</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-semibold text-eco-700">ARC</p>
            <p className="mt-1 text-sm text-stone-600">Deployed on ARC Testnet</p>
          </div>
        </div>

        <div className="mt-12 card">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eco-100 text-2xl">🌱</div>
            <div>
              <h2 className="text-xl font-semibold text-stone-900">EcoMemory AI Agent</h2>
              <p className="text-sm text-stone-500">Coming soon</p>
            </div>
          </div>
          <p className="mt-4 text-stone-600">
            An on-chain agent will soon visit memorial pages, leave symbolic
            micro-donations, and report the health of the living memory fund —
            all autonomously and transparently.
          </p>
        </div>
      </section>

      <footer className="border-t border-stone-200 py-10 text-center text-sm text-stone-500">
        <p>EcoMemory · Built for ARC Testnet</p>
        <a href="/deploy" className="mt-2 inline-block text-eco-600 hover:text-eco-800">
          Deploy a new EcoMemory contract
        </a>
      </footer>
    </main>
  );
}
