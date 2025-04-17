import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'viem/chains';
import { http } from 'viem';
import { storage } from '../utils/storage';

export const wagmiConfig = getDefaultConfig({
  appName: 'my-nft-dapp',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: true,
  storage,
});
