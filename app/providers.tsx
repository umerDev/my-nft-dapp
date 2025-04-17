'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '../config/rainbowkit';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { useEffect } from 'react';

// Create a singleton QueryClient instance
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Clear any existing WalletConnect sessions
    if (typeof window !== 'undefined') {
      localStorage.removeItem('walletconnect');
      localStorage.removeItem('wc@2:client:0.3//session');
      localStorage.removeItem('wc@2:core:0.3//keychain');
    }
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={{
            lightMode: lightTheme({
              accentColor: '#8B5CF6',
            }),
            darkMode: darkTheme({
              accentColor: '#8B5CF6',
            }),
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
