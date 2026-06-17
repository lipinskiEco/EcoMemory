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
        className="rounded-none border-2 border-red-300 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
      >
        {isPending ? 'Switching...' : 'Switch to ARC Testnet'}
      </button>
    );
  }

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="rounded-none border-2 border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition hover:border-eco-400 hover:text-eco-700"
      >
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected(), chainId: ARC_TESTNET.id })}
      className="rounded-none bg-gradient-to-r from-eco-600 to-eco-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-eco-200 transition hover:from-eco-700 hover:to-eco-600 hover:shadow-lg"
    >
      Connect wallet
    </button>
  );
}
