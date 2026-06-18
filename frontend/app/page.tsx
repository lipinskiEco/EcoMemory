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
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-eco-700/25 bg-eco-100/60 text-eco-700">
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {!CONTRACT_ADDRESS_CONFIGURED && (
        <div className="border-b border-amber-300/60 bg-amber-50 px-6 py-3 text-center text-sm text-amber-900">
          <span className="font-medium">Contract address not configured.</span>{' '}
          Deploy EcoMemory from your wallet, then set
          <code className="mx-1 rounded bg-amber-100 px-1 font-mono text-xs">NEXT_PUBLIC_ECOMEMORY_CONTRACT_ADDRESS</code>
          in your environment.
        </div>
      )}

      {/* ---- HERO ---- */}
      <section className="relative isolate overflow-hidden">
        {/* layered background: gradient (+ optional photo), drifting light, grain, vignette */}
        <div className="absolute inset-0 -z-10 hero-bg" />
        <div className="absolute inset-0 -z-10 hero-photo opacity-0" aria-hidden />
        <div className="absolute inset-0 -z-10 animate-drift-light hero-light" aria-hidden />
        <div className="absolute inset-0 -z-10 grain opacity-[0.12]" aria-hidden />
        <div className="absolute inset-0 -z-10 hero-vignette" aria-hidden />

        <div className="mx-auto max-w-4xl px-6 py-32 text-center text-ivory sm:py-40">
          <div className="reveal reveal-1 flex justify-center">
            <span className="pill border-ivory/25 bg-ivory/10 text-ivory/80">
              Remembrance · Vol. 01
            </span>
          </div>
          <h1 className="reveal reveal-2 mt-8 font-display text-5xl font-medium uppercase leading-[1.05] tracking-wide text-ivory drop-shadow-sm sm:text-6xl lg:text-7xl text-balance">
            Honor a life.
            <br />
            Plant a future.
          </h1>
          <p className="reveal reveal-3 mx-auto mt-7 max-w-2xl font-serif text-xl italic leading-relaxed text-ivory/85">
            EcoMemory turns personal memorials into living digital gardens — each
            tribute funds remembrance and the planting of trees, transparently and
            on-chain.
          </p>
          <div className="reveal reveal-4 mx-auto mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#mint"
              className="inline-flex items-center justify-center rounded-full bg-ivory px-8 py-3.5 text-sm font-medium tracking-wide text-eco-900 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              Mint a memorial
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full border border-ivory/40 px-8 py-3.5 text-sm font-medium tracking-wide text-ivory transition duration-300 hover:-translate-y-0.5 hover:bg-ivory/10"
            >
              How it works
            </a>
          </div>
          <p className="reveal reveal-5 mt-10 text-xs uppercase tracking-widest2 text-ivory/55">
            Built on ARC Testnet · USDC-native · Low fees
          </p>
        </div>
      </section>

      {/* ---- ABOUT ---- */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest2 text-eco-700">The Idea</p>
          <h2 className="section-title mt-3">What is EcoMemory?</h2>
          <p className="section-subtitle">
            EcoMemory is a decentralized memorial platform. It lets anyone create a
            permanent, shareable NFT tribute for a loved one, a pet, or a meaningful
            cause. Every interaction is recorded on-chain and every contribution
            supports both remembrance and reforestation.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card card-hover">
            <IconBox>
              <Leaf size={20} strokeWidth={1.75} />
            </IconBox>
            <h3 className="font-display text-xl font-medium tracking-wide text-ink">Eco-friendly tribute</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              A memorial that gives back: 50% of every donation goes to the memorial
              beneficiary, 50% funds tree planting.
            </p>
          </div>
          <div className="card card-hover">
            <IconBox>
              <Link2 size={20} strokeWidth={1.75} />
            </IconBox>
            <h3 className="font-display text-xl font-medium tracking-wide text-ink">On-chain forever</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Names, dates, messages, and donation history are stored permanently on
              ARC Testnet. No platform can delete them.
            </p>
          </div>
          <div className="card card-hover">
            <IconBox>
              <QrCode size={20} strokeWidth={1.75} />
            </IconBox>
            <h3 className="font-display text-xl font-medium tracking-wide text-ink">Shareable QR page</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Each memorial gets a beautiful page with a QR code. Visitors can view it
              and leave a micro-donation in seconds.
            </p>
          </div>
          <div className="card card-hover">
            <IconBox>
              <Coins size={20} strokeWidth={1.75} />
            </IconBox>
            <h3 className="font-display text-xl font-medium tracking-wide text-ink">Micro-donations</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Donate as little as $0.05 USDC. Small contributions add up and every
              one is split 50/50 between people and trees.
            </p>
          </div>
          <div className="card card-hover">
            <IconBox>
              <TreeDeciduous size={20} strokeWidth={1.75} />
            </IconBox>
            <h3 className="font-display text-xl font-medium tracking-wide text-ink">Transparent split</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              The smart contract enforces the 50/50 split automatically. No hidden
              fees, no middlemen, no trust required.
            </p>
          </div>
          <div className="card card-hover">
            <IconBox>
              <Heart size={20} strokeWidth={1.75} />
            </IconBox>
            <h3 className="font-display text-xl font-medium tracking-wide text-ink">Meaningful giving</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Turn remembrance into real-world impact. Every memorial is a seed for
              ecological restoration and a lasting legacy.
            </p>
          </div>
        </div>
      </section>

      {/* ---- WHY ARC ---- */}
      <section className="bg-eco-100/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest2 text-eco-700">The Network</p>
            <h2 className="section-title mt-3">Why ARC Testnet?</h2>
            <p className="section-subtitle">
              EcoMemory is built on ARC because the network aligns with the project
              values: low environmental footprint, fast transactions, and near-zero
              fees that make micro-donations practical.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            <div className="card text-center">
              <p className="font-display text-4xl font-medium text-eco-800">$0.10</p>
              <p className="mt-2 text-xs uppercase tracking-widest2 text-ink/55">Mint cost in USDC</p>
            </div>
            <div className="card text-center">
              <p className="font-display text-4xl font-medium text-eco-800">50/50</p>
              <p className="mt-2 text-xs uppercase tracking-widest2 text-ink/55">Memorial / trees split</p>
            </div>
            <div className="card text-center">
              <p className="font-display text-4xl font-medium text-eco-800">Fast</p>
              <p className="mt-2 text-xs uppercase tracking-widest2 text-ink/55">ARC Testnet finality</p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card card-hover text-center">
              <div className="mb-3 flex items-center justify-center text-eco-700">
                <Leaf size={22} strokeWidth={1.75} />
              </div>
              <h4 className="font-display text-lg font-medium tracking-wide text-ink">Low carbon</h4>
              <p className="mt-1 text-sm leading-relaxed text-ink/65">Efficient consensus keeps energy use minimal.</p>
            </div>
            <div className="card card-hover text-center">
              <div className="mb-3 flex items-center justify-center text-eco-700">
                <Wallet size={22} strokeWidth={1.75} />
              </div>
              <h4 className="font-display text-lg font-medium tracking-wide text-ink">Tiny fees</h4>
              <p className="mt-1 text-sm leading-relaxed text-ink/65">Micro-donations only make sense with near-zero fees.</p>
            </div>
            <div className="card card-hover text-center">
              <div className="mb-3 flex items-center justify-center text-eco-700">
                <Globe size={22} strokeWidth={1.75} />
              </div>
              <h4 className="font-display text-lg font-medium tracking-wide text-ink">USDC-native</h4>
              <p className="mt-1 text-sm leading-relaxed text-ink/65">ARC uses USDC for gas, making payments familiar.</p>
            </div>
            <div className="card card-hover text-center">
              <div className="mb-3 flex items-center justify-center text-eco-700">
                <Shield size={22} strokeWidth={1.75} />
              </div>
              <h4 className="font-display text-lg font-medium tracking-wide text-ink">Stable testnet</h4>
              <p className="mt-1 text-sm leading-relaxed text-ink/65">ARC Testnet is reliable for real-world dApp demos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- MINT ---- */}
      <section id="mint" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest2 text-eco-700">Create</p>
          <h2 className="section-title mt-3">Create a living memorial</h2>
          <p className="section-subtitle">
            Fill in the details, approve 0.10 USDC, and mint. Your memorial page
            will be ready to share immediately.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-display text-xl font-medium tracking-wide text-ink">How to mint</h3>
              <ol className="mt-5 space-y-4 text-sm text-ink/70">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-eco-700/30 bg-eco-100/60 text-xs font-medium text-eco-700">
                    1
                  </span>
                  Connect your wallet on ARC Testnet.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-eco-700/30 bg-eco-100/60 text-xs font-medium text-eco-700">
                    2
                  </span>
                  Approve 0.10 USDC for the EcoMemory contract.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-eco-700/30 bg-eco-100/60 text-xs font-medium text-eco-700">
                    3
                  </span>
                  Fill in name, dates, message, and beneficiary address.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-eco-700/30 bg-eco-100/60 text-xs font-medium text-eco-700">
                    4
                  </span>
                  Mint and share the QR code page with friends and family.
                </li>
              </ol>
            </div>

            <div className="card bg-eco-100/50">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-eco-700/25 bg-cream text-eco-700">
                  <Heart size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium tracking-wide text-ink">Every memorial plants trees</h3>
                  <p className="text-sm leading-relaxed text-ink/65">
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

      {/* ---- FOOTER ---- */}
      <footer className="border-t border-ink/10 bg-cream/60 py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="font-display text-2xl font-medium uppercase tracking-widest2 text-ink">EcoMemory</p>
              <p className="mt-1 font-serif text-sm italic text-ink/55">On-chain memorials that plant trees.</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/lipinskiEco/EcoMemory"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-xs uppercase tracking-widest2"
              >
                GitHub
              </a>
            </div>
          </div>
          <p className="mt-10 text-center text-xs uppercase tracking-widest2 text-ink/40">
            Built for ARC Testnet · EcoMemory © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}
