'use client';

import { createConfig, http } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { ARC_TESTNET } from './contract';

export const config = createConfig({
  chains: [ARC_TESTNET],
  connectors: [injected()],
  transports: {
    [ARC_TESTNET.id]: http(),
  },
});
