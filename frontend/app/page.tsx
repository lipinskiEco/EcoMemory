import { MintForm } from '@/components/MintForm';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden gradient-eco py-24 text-white leaf-pattern">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 -top-20 h-96 w-96 animate-float rounded-full bg-eco-400 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse-slow rounded-full bg-emerald-300 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-eco-300" />
            Living memories on ARC Testnet
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Honor a life. Plant a future.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-eco-100">
            EcoMemory turns personal memorials into living digital gardens. Each NFT
            funds remembrance and tree planting — transparently, on-chain.
          </p>
          <div className="mx-auto mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#mint" className="btn-primary">
              Mint a memorial
            </a>
            <a href="#about" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              How it works
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="section-title">What is EcoMemory?</h2>
          <p className="section-subtitle">
            EcoMemory is a decentralized memorial platform. It lets anyone create a
            permanent, shareable NFT tribute for a loved one, a pet, or a meaningful
            cause. Every interaction is recorded on-chain and every contribution
            supports both remembrance and reforestation.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card card-hover">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-eco-100 text-2xl">🌿</div>
            <h3 className="text-lg font-semibold text-stone-900">Eco-friendly tribute</h3>
            <p className="mt-2 text-sm text-stone-600">
              A memorial that gives back: 50% of every donation goes to the memorial
              beneficiary, 50% funds tree planting.
            </p>
          </div>
          <div className="card card-hover">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-eco-100 text-2xl">🔗</div>
            <h3 className="text-lg font-semibold text-stone-900">On-chain forever</h3>
            <p className="mt-2 text-sm text-stone-600">
              Names, dates, messages, and donation history are stored permanently on
              ARC Testnet. No platform can delete them.
            </p>
          </div>
          <div className="card card-hover">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-eco-100 text-2xl">📱</div>
            <h3 className="text-lg font-semibold text-stone-900">Shareable QR page</h3>
            <p className="mt-2 text-sm text-stone-600">
              Each memorial gets a beautiful page with a QR code. Visitors can view it
              and leave a micro-donation in seconds.
            </p>
          </div>
          <div className="card card-hover">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-eco-100 text-2xl">⚡</div>
            <h3 className="text-lg font-semibold text-stone-900">Micro-donations</h3>
            <p className="mt-2 text-sm text-stone-600">
              Donate as little as $0.05 USDC. Small contributions add up and every
              one is split 50/50 between people and trees.
            </p>
          </div>
          <div className="card card-hover">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-eco-100 text-2xl">🌳</div>
            <h3 className="text-lg font-semibold text-stone-900">Transparent split</h3>
            <p className="mt-2 text-sm text-stone-600">
              The smart contract enforces the 50/50 split automatically. No hidden
              fees, no middlemen, no trust required.
            </p>
          </div>
          <div className="card card-hover">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-eco-100 text-2xl">🤖</div>
            <h3 className="text-lg font-semibold text-stone-900">AI agent (soon)</h3>
            <p className="mt-2 text-sm text-stone-600">
              An on-chain agent will soon visit memorial pages, leave symbolic
              micro-donations, and report the health of the fund autonomously.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-eco-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="section-title">Why ARC Testnet?</h2>
            <p className="section-subtitle">
              EcoMemory is built on ARC because the network aligns with the project
              values: low environmental footprint, fast transactions, and near-zero
              fees that make micro-donations practical.
            </p>
          </div>

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
              <p className="text-3xl font-semibold text-eco-700">Fast</p>
              <p className="mt-1 text-sm text-stone-600">ARC Testnet finality</p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-eco-100 bg-white p-6 text-center">
              <div className="mb-3 text-2xl">🌱</div>
              <h4 className="font-semibold text-stone-900">Low carbon</h4>
              <p className="mt-1 text-sm text-stone-600">Efficient consensus keeps energy use minimal.</p>
            </div>
            <div className="rounded-2xl border border-eco-100 bg-white p-6 text-center">
              <div className="mb-3 text-2xl">💸</div>
              <h4 className="font-semibold text-stone-900">Tiny fees</h4>
              <p className="mt-1 text-sm text-stone-600">Micro-donations only make sense with near-zero fees.</p>
            </div>
            <div className="rounded-2xl border border-eco-100 bg-white p-6 text-center">
              <div className="mb-3 text-2xl">🌐</div>
              <h4 className="font-semibold text-stone-900">USDC-native</h4>
              <p className="mt-1 text-sm text-stone-600">ARC uses USDC for gas, making payments familiar.</p>
            </div>
            <div className="rounded-2xl border border-eco-100 bg-white p-6 text-center">
              <div className="mb-3 text-2xl">🛡️</div>
              <h4 className="font-semibold text-stone-900">Stable testnet</h4>
              <p className="mt-1 text-sm text-stone-600">ARC Testnet is reliable for real-world dApp demos.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="mint" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="section-title">Create a living memorial</h2>
          <p className="section-subtitle">
            Fill in the details, approve 0.10 USDC, and mint. Your memorial page
            will be ready to share immediately.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-stone-900">How to mint</h3>
              <ol className="mt-4 space-y-3 text-sm text-stone-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-eco-100 text-xs font-semibold text-eco-700">1</span>
                  Connect your wallet on ARC Testnet.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-eco-100 text-xs font-semibold text-eco-700">2</span>
                  Approve 0.10 USDC for the EcoMemory contract.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-eco-100 text-xs font-semibold text-eco-700">3</span>
                  Fill in name, dates, message, and beneficiary address.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-eco-100 text-xs font-semibold text-eco-700">4</span>
                  Mint and share the QR code page with friends and family.
                </li>
              </ol>
            </div>

            <div className="card border-eco-100 bg-eco-50">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl">💚</div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">Every memorial plants trees</h3>
                  <p className="text-sm text-stone-600">
                    50% of mint cost and donations go to the tree fund recipient,
                    supporting ecological restoration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <MintForm />
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-stone-900">EcoMemory</p>
              <p className="text-sm text-stone-500">On-chain memorials that plant trees.</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/deploy" className="btn-ghost">
                Deploy contract
              </a>
              <a
                href="https://github.com/lipinskiEco/EcoMemory"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                GitHub
              </a>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Built for ARC Testnet · EcoMemory © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}
