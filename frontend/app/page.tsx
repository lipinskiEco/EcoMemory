import { MintForm } from '@/components/MintForm';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="bg-eco-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            EcoMemory
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-eco-100">
            Living memorials on-chain. Mint a page for $0.10 USDC. Share a QR code.
            Every visitor can leave a micro-donation that splits between the memorial
            fund and a tree-planting fund.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-6 text-center">
          <a
            href="/deploy"
            className="inline-block rounded-full border border-stone-300 bg-white px-5 py-2 text-sm font-medium text-stone-700 transition hover:border-eco-400 hover:text-eco-700"
          >
            Deploy the contract first
          </a>
        </div>
        <MintForm />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center">
            <p className="text-2xl font-semibold text-eco-700">$0.10</p>
            <p className="mt-1 text-sm text-stone-600">Mint cost in USDC</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center">
            <p className="text-2xl font-semibold text-eco-700">50/50</p>
            <p className="mt-1 text-sm text-stone-600">Memorial / trees split</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center">
            <p className="text-2xl font-semibold text-eco-700">ARC</p>
            <p className="mt-1 text-sm text-stone-600">Deployed on ARC Testnet</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 py-8 text-center text-sm text-stone-500">
        EcoMemory · Built for ARC Testnet
      </footer>
    </main>
  );
}
