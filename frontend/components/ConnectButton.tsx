'use client';

import { useAccount, useConnect, useDisconnect, useSwitchChain, useChainId } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { ARC_TESTNET } from '@/lib/contract';

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending } = useSwitchChain();
  const wrongNetwork = isConnected && chainId !== ARC_TESTNET.id;

  if (isConnected && wrongNetwork) {
    return (
      <button
        onClick={() => switchChain({ chainId: ARC_TESTNET.id })}
        disabled={isPending}
        className="rounded-full border border-red-300 bg-red-50 px-5 py-2.5 text-sm font-medium tracking-wide text-red-700 transition hover:bg-red-100 disabled:opacity-50"
      >
        {isPending ? 'Switching...' : 'Switch to ARC Testnet'}
      </button>
    );
  }

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="rounded-full border border-ink/20 bg-cream/70 px-5 py-2.5 font-mono text-sm text-ink/80 transition hover:border-eco-600 hover:text-eco-800"
      >
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected(), chainId: ARC_TESTNET.id })}
      className="rounded-full bg-eco-800 px-6 py-2.5 text-sm font-medium tracking-wide text-ivory shadow-soft transition hover:-translate-y-0.5 hover:bg-eco-900"
    >
      Connect wallet
    </button>
  );
}
