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
        className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition hover:border-eco-400 hover:text-eco-700"
      >
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="rounded-full bg-gradient-to-r from-eco-600 to-eco-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-eco-200 transition hover:from-eco-700 hover:to-eco-600 hover:shadow-lg"
    >
      Connect wallet
    </button>
  );
}
