'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';

// Create a singleton instance of the config
let configInstance: ReturnType<typeof getDefaultConfig> | null = null;

export function getConfig() {
  if (!configInstance) {
    configInstance = getDefaultConfig({
      appName: 'My NFT DApp',
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
      chains: [mainnet, sepolia],
      ssr: true,
    });
  }
  return configInstance;
}

export const config = getConfig();
