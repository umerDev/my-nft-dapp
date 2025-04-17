'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { http } from 'viem';

export const wagmiConfig = getDefaultConfig({
  appName: 'my-nft-dapp',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
});
