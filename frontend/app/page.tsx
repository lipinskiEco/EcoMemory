import { MintForm } from '@/components/MintForm';
import { CONTRACT_ADDRESS_CONFIGURED } from '@/lib/contract';
import {
  Leaf,
  Link2,
  QrCode,
  Coins,
  TreeDeciduous,
  Heart,
  Globe,
  Shield,
  Wallet,
} from 'lucide-react';

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-none border-2 border-eco-200 bg-eco-100 text-eco-700">
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {!CONTRACT_ADDRESS_CONFIGURED && (
        <div className="border-b-2 border-amber-200 bg-amber-50 px-6 py-3 text-center text-sm text-amber-800">
          <span className="font-semibold">Contract address not configured.</span>{' '}
          Deploy EcoMemory from your wallet, then set
          <code className="mx-1 rounded bg-amber-100 px-1 font-mono">NEXT_PUBLIC_ECOMEMORY_CONTRACT_ADDRESS</code>
          in your environment.
        </div>
      )}

      <section className="relative overflow-hidden hero-bg py-24 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 -top-20 h-96 w-96 animate-float rounded-full bg-eco-400 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse-slow rounded-full bg-emerald-300 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white shadow-sm backdrop-blur-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-eco-300" />
            Built on ARC Testnet — USDC-native, low fees, eco-friendly
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-6xl lg:text-7xl">
            Honor a life. Plant a future.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
            EcoMemory turns personal memorials into living digital gardens. Each NFT
            funds remembrance and tree planting — transparently, on-chain.
          </p>
          <div className="mx-auto mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#mint" className="btn-primary">
              Mint a memorial
            </a>
            <a
              href="#about"
              className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/20"
            >
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
            <IconBox>
              <Leaf size={22} strokeWidth={2.5} />
            </IconBox>
            <h3 className="text-lg font-semibold text-stone-900">Eco-friendly tribute</h3>
            <p className="mt-2 text-sm text-stone-600">
              A memorial that gives back: 50% of every donation goes to the memorial
              beneficiary, 50% funds tree planting.
            </p>
          </div>
          <div className="card card-hover">
            <IconBox>
              <Link2 size={22} strokeWidth={2.5} />
            </IconBox>
            <h3 className="text-lg font-semibold text-stone-900">On-chain forever</h3>
            <p className="mt-2 text-sm text-stone-600">
              Names, dates, messages, and donation history are stored permanently on
              ARC Testnet. No platform can delete them.
            </p>
          </div>
          <div className="card card-hover">
            <IconBox>
              <QrCode size={22} strokeWidth={2.5} />
            </IconBox>
            <h3 className="text-lg font-semibold text-stone-900">Shareable QR page</h3>
            <p className="mt-2 text-sm text-stone-600">
              Each memorial gets a beautiful page with a QR code. Visitors can view it
              and leave a micro-donation in seconds.
            </p>
          </div>
          <div className="card card-hover">
            <IconBox>
              <Coins size={22} strokeWidth={2.5} />
            </IconBox>
            <h3 className="text-lg font-semibold text-stone-900">Micro-donations</h3>
            <p className="mt-2 text-sm text-stone-600">
              Donate as little as $0.05 USDC. Small contributions add up and every
              one is split 50/50 between people and trees.
            </p>
          </div>
          <div className="card card-hover">
            <IconBox>
              <TreeDeciduous size={22} strokeWidth={2.5} />
            </IconBox>
            <h3 className="text-lg font-semibold text-stone-900">Transparent split</h3>
            <p className="mt-2 text-sm text-stone-600">
              The smart contract enforces the 50/50 split automatically. No hidden
              fees, no middlemen, no trust required.
            </p>
          </div>
          <div className="card card-hover">
            <IconBox>
              <Heart size={22} strokeWidth={2.5} />
            </IconBox>
            <h3 className="text-lg font-semibold text-stone-900">Meaningful giving</h3>
            <p className="mt-2 text-sm text-stone-600">
              Turn remembrance into real-world impact. Every memorial is a seed for
              ecological restoration and a lasting legacy.
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
            <div className="card text-center">
              <div className="mb-3 flex items-center justify-center text-eco-700">
                <Leaf size={24} strokeWidth={2.5} />
              </div>
              <h4 className="font-semibold text-stone-900">Low carbon</h4>
              <p className="mt-1 text-sm text-stone-600">Efficient consensus keeps energy use minimal.</p>
            </div>
            <div className="card text-center">
              <div className="mb-3 flex items-center justify-center text-eco-700">
                <Wallet size={24} strokeWidth={2.5} />
              </div>
              <h4 className="font-semibold text-stone-900">Tiny fees</h4>
              <p className="mt-1 text-sm text-stone-600">Micro-donations only make sense with near-zero fees.</p>
            </div>
            <div className="card text-center">
              <div className="mb-3 flex items-center justify-center text-eco-700">
                <Globe size={24} strokeWidth={2.5} />
              </div>
              <h4 className="font-semibold text-stone-900">USDC-native</h4>
              <p className="mt-1 text-sm text-stone-600">ARC uses USDC for gas, making payments familiar.</p>
            </div>
            <div className="card text-center">
              <div className="mb-3 flex items-center justify-center text-eco-700">
                <Shield size={24} strokeWidth={2.5} />
              </div>
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
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none border-2 border-eco-200 bg-eco-100 text-xs font-semibold text-eco-700">
                    1
                  </span>
                  Connect your wallet on ARC Testnet.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none border-2 border-eco-200 bg-eco-100 text-xs font-semibold text-eco-700">
                    2
                  </span>
                  Approve 0.10 USDC for the EcoMemory contract.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none border-2 border-eco-200 bg-eco-100 text-xs font-semibold text-eco-700">
                    3
                  </span>
                  Fill in name, dates, message, and beneficiary address.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none border-2 border-eco-200 bg-eco-100 text-xs font-semibold text-eco-700">
                    4
                  </span>
                  Mint and share the QR code page with friends and family.
                </li>
              </ol>
            </div>

            <div className="card border-eco-100 bg-eco-50">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none border-2 border-eco-200 bg-white text-eco-700">
                  <Heart size={22} strokeWidth={2.5} />
                </div>
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

      <footer className="border-t-2 border-stone-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-stone-900">EcoMemory</p>
              <p className="text-sm text-stone-500">On-chain memorials that plant trees.</p>
            </div>
            <div className="flex items-center gap-4">
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
