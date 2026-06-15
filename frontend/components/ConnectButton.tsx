'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="rounded-full bg-stone-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
      >
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="rounded-full bg-eco-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-eco-700"
    >
      Connect wallet
    </button>
  );
}
